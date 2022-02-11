import initStripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

const supabase = createClient(supabaseUrl, supabaseSecretKey)

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'POST') {
        if(req.query.API_ROUTE_SECRET !== process.env.RANDOM_CRYPTO_HASH) {
            return res.status(401).send({ success: false, message: 'You are not authorized to make this call'})
        }
        console.log(req.body)
        const stripe = initStripe(process.env.STRIPE_SECRET_KEY)
        const customer = await stripe.customers.create({
            email: req.body.record.email
        })
        console.log(customer)

        const { data, error } = await supabase
            .from('profiles')
            .update({ stripe_customer_id: customer.id })
            .eq('id', req.body.record.id)
        console.log(data, error)
        return res.send({ message: `stripe customer created: ${customer.id}`})
    }
}
