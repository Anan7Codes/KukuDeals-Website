import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import { map } from 'modern-async'

const stripe = Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'})

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY
const supabase = createClient(supabaseUrl, supabaseSecretKey)

const TotalPrice = async (cart) => {
    let total = 0
    let success = true
    await map(cart, async (item) => {
        let { data, error } = await supabase
        .from('campaigns')
        .select('Price')
        .eq("id", item.id)
        if(error) return success = false
        total += data[0].Price * item.qty
    })
    return { total, success }
}

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'POST') {
        const { user } = await supabase.auth.api.getUserByCookie(req)
        if(!user) return res.status(401).send("Unauthorized")

        const { total, success } = await TotalPrice(req.body.cart)
        if(!success) return res.status(404).json({ success: false, message: "Failed to calculate total amount"})

        let finalTotal = total
        if(req.body.promoCode) {
            let promo_code = await supabase
                .from('promo_codes')
                .select('type,value')
                .eq("name", req.body.promoCode)
            if(promo_code.data[0].type) {
                finalTotal = total - promo_code.data[0].value
            } else {
                finalTotal = total - (total * promo_code.data[0].value / 100)
            }
            console.log(finalTotal)
        }

        let { data, error } = await supabase
            .from('profiles')
            .select('stripe_customer_id')
            .eq("id", user.id)
        if(error) return res.status(404).json({ success: false, message: "Failed authorization"})

        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: data[0].stripe_customer_id },
            { apiVersion: '2020-08-27' }
        );

        const paymentIntent = await stripe.paymentIntents.create({
            amount: finalTotal.toFixed() * 100,
            currency: 'AED',
            customer: data[0].stripe_customer_id,
            automatic_payment_methods: {
                enabled: true,
            },
        })
       
        const initiated_orders_response = await supabase
            .from('initiated_orders')
            .insert([
                { 
                    cart: req.body.cart, 
                    amount: total, 
                    verification_secret: paymentIntent.id,
                    user_id: user.id,
                    promo_code_used: req.body.promoCode
                },
            ])
        console.log(initiated_orders_response)

        res.json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: data[0].stripe_customer_id,
        });
    }
}
