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
        const { total, success } = await TotalPrice(req.body.cart)
        if(!success) return res.status(404).json({ success: false, message: "Failed to calculate total amount"})

        let { data, error } = await supabase
            .from('profiles')
            .select('stripe_customer_id')
            .eq("id", req.body.user_id)
        if(error) return res.status(404).json({ success: false, message: "Failed authorization"})

        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: data[0].stripe_customer_id },
            { apiVersion: '2020-08-27' }
        );

        const paymentIntent = await stripe.paymentIntents.create({
            amount: total * 100,
            currency: 'AED',
            customer: data[0].stripe_customer_id,
            automatic_payment_methods: {
                enabled: true,
            },
        })

        console.log("paymentIntent", paymentIntent)
        console.log("ephmeralKey", ephemeralKey)
        
        res.json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: data[0].stripe_customer_id,
        });
    }
}
