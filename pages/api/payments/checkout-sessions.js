const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 10500,
                currency: 'AED',
                customer: 'cus_LC2S4YrghBk60u',
                automatic_payment_methods: {
                    enabled: true,
                },
            })

			const session = await stripe.checkout.sessions.create({
				payment_intent_data: paymentIntent,
				payment_method_types: ['card'],
				mode: 'payment',
				success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${req.headers.origin}/?canceled=true`,
			});
			res.redirect(303, session.url);
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}