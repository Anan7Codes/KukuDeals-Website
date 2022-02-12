import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

const stripe = Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'})

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY
const supabase = createClient(supabaseUrl, supabaseSecretKey)

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'POST') {
        const ephemeralKey = await stripe.ephemeralKeys.create(
            {customer: "cus_L7s9dLjYRS2qbw"},
            {apiVersion: '2020-08-27'}
        );
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1099,
            currency: 'AED',
            customer: 'cus_L7s9dLjYRS2qbw',
            automatic_payment_methods: {
                enabled: true,
            },
        })

        console.log("paymentIntent", paymentIntent)
        console.log("ephmeralKey", ephemeralKey)
        
        res.json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: "cus_L7s9dLjYRS2qbw",
        });
    }
}
