import { buffer } from 'micro'
import { map } from 'modern-async'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'})

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

const supabase = createClient(supabaseUrl, supabaseSecretKey)

const endpointSecret = process.env.WEBHOOK_SECRET

export const config = {
    api: {
      bodyParser: false,
    },
}

const webhookHandler = async (req, res) => {
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'POST') {
        const buf = await buffer(req)
        const sig = req.headers['stripe-signature'];
        let event;
        let user_id = ''
        let res_charge

        try {
            event = stripe.webhooks.constructEvent(buf.toString(), sig, endpointSecret);
        } catch (err) {
            console.log("err webhook", err)
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object            
            const initiated_orders = await supabase
                .from('initiated_orders')
                .update({ status: true })
                .eq('verification_secret', paymentIntent.id)
            if(initiated_orders.error) {
                console.log(initiated_orders.error)
                return res.send({ success: false, message: "Initiated order doesn't exist", error: initiated_orders.error})
            }
            return res.send({ success: true, initiated_orders: initiated_orders.data })
        } else if (event.type === 'charge.succeeded') {
            const charge = event.data.object
            console.log("charge", charge)
            let initiated_orders = await supabase
                .from('initiated_orders')
                .select('*')
                .eq("verification_secret", charge.payment_intent)
                .eq("status", true)
                .single()

            let completed_orders = await supabase
                .from('completed_orders')
                .select('*', { count: 'exact' }) 
            
            let ordered_coupons = []
            let donated_coupons = []
            let coupons = []
            await map(initiated_orders.data.cart, async (order, index) => {
                coupons.push({ product_id: JSON.parse(order).id, product_coupons: [], product_qty: JSON.parse(order).qty, product_price: JSON.parse(order).Price})
                for (let i = 1; i <= JSON.parse(order).qty; i++) {
                    ordered_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length + 1}O`)
                    coupons[index].product_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length}O`)
                    if(JSON.parse(order).donate === "true") {
                        donated_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length}D`)
                        coupons[index].product_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length}D`)
                    }
                }
            })
            console.log("coupons", coupons)
    
            const { data, error } = await supabase
                .from('completed_orders')
                .insert([
                    { 
                        coupons, 
                        user_id: initiated_orders.data.user_id,
                        final_amount: initiated_orders.data.final_amount,
                        transaction_number: completed_orders.count + 1
                    },
                ])
            console.log("final", data, error)     
            
            if(initiated_orders.data.promo_code_used) {
                let profile = await supabase
                .from('profiles')
                .select('promo_codes_used')
                .eq("id", initiated_orders.data.user_id)

                let promo_codes_used = profile.data[0].promo_codes_used
                promo_codes_used.push(initiated_orders.data.promo_code_used)
                
                const updated_promo_codes = await supabase
                    .from('profiles')
                    .update({ promo_codes_used: promo_codes_used })
                    .eq('id', initiated_orders.data.user_id)
                console.log("updated promo code", updated_promo_codes)
            }            
            
            user_id = initiated_orders.data.user_id
            res_charge = charge

        } else {
            console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`)
        }            
        
        return res.send({ message: 'success', user_id, res_charge})
    }
}

export default webhookHandler