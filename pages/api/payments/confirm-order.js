import { buffer } from 'micro'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import { map } from 'modern-async'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'})

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

const supabase = createClient(supabaseUrl, supabaseSecretKey)

const endpointSecret = process.env.WEBHOOK_SECRET

let customerName, amount, display
const mail = require('@sendgrid/mail')
mail.setApiKey(process.env.SENDGRID_API_KEY)
const html_to_pdf = require('html-pdf-node');
let options = { format: 'A3' };

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
            console.log("charge", charge.payment_intent)
            let initiated_orders = await supabase
                .from('initiated_orders')
                .select('*')
                .eq("verification_secret", charge.payment_intent)
                .eq("status", true)
                .single()
            console.log("Line 60 IO", initiated_orders)
            console.log("cart", initiated_orders.data.cart)
            let completed_orders = await supabase
                .from('completed_orders')
                .select('*', { count: 'exact' }) 
            
            let ordered_coupons = []
            let donated_coupons = []
            let coupons = []

            await map(initiated_orders.data.cart, async (order, index) => {
                coupons.push({ product_id: JSON.parse(order).id, product_coupons: [], product_qty: JSON.parse(order).qty, product_price: JSON.parse(order).Price, name: JSON.parse(order).ProductName.en + "/" + JSON.parse(order).GiftName.en, image: JSON.parse(order).Image })
                for (let i = 1; i <= JSON.parse(order).qty; i++) {
                    ordered_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length + 1}O`)
                    coupons[index].product_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length}O`)
                    if(JSON.parse(order).donate === "true") {
                        donated_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length}D`)
                        coupons[index].product_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length}D`)
                    }
                }
            })
    
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
            if(error) return res.send({ success: false, message: "Completed orders insertion error", error: data.error})
            
            
            
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
                if(updated_promo_codes.error) return res.send({ success: false, message: "Promo Code Update Error", error: updated_promo_codes.error})
            }   
            
            await map(coupons, async (item, i) => {
                const campaign_for_qty = await supabase
                    .from('campaigns')
                    .select('SoldOutCoupons')
                    .eq("id", item.product_id)
                    .single()

                if(campaign_for_qty.error) return res.send({ success: false, message: "Campaign Doesn't Exist", error: campaign_for_qty.error})

                const campaign_update_qty = await supabase
                    .from('campaigns')
                    .update({ SoldOutCoupons: campaign_for_qty.data.SoldOutCoupons + item.product_qty })
                    .eq("id", item.product_id)

                if(campaign_update_qty.error) return res.send({ success: false, message: "Campaign Qty Doesn't Exist", error: campaign_update_qty.error})
            })      

            
            user_id = initiated_orders.data.user_id
            res_charge = charge

            return res.send({ success: true, user_id, res_charge})

        } else {
            console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`)
        }            
        
        
    }
}

export default webhookHandler