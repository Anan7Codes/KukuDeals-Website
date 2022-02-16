import { buffer } from 'micro'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'})

const endpointSecret = "whsec_aNIcwFv9jP5EcTDKftddfNTP6AWAU6XW";

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

        try {
            event = stripe.webhooks.constructEvent(buf.toString(), sig, endpointSecret);
            console.log("event webhook", event)
        } catch (err) {
            console.log("err webhook", err)
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        if (event.type === 'charge.succeeded') {
            const charge = event.data.object
            console.log("charged webhook", charge)
        }

        // if (event.type === 'payment_intent.succeeded') {
        //     const paymentIntent = event.data.object
        //     console.log("paymentIntent webhook", paymentIntent)
        // } else if (event.type === 'payment_intent.payment_failed') {
        //     const paymentIntent = event.data.object
        //     console.log(
        //         `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
        //     )
        // } else if (event.type === 'charge.succeeded') {
        //     const charge = event.data.object
        //     console.log("charged webhook", charge)
        // } else {
        //     console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`)
        // }
            
        
        return res.send({ message: 'success'})
    }
}

export default webhookHandler