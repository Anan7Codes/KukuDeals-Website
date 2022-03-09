const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { map } from 'modern-async'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY
const supabase = createClient(supabaseUrl, supabaseSecretKey)

const TotalPrice = async (cart) => {
    let total = 0
    let success = true
    let donated = true
    await map(cart, async (item) => {
        let { data, error } = await supabase
        .from('campaigns')
        .select('Price')
        .eq("id", item.id)
        if(error) return success = false
        total += data[0].Price * item.qty
        if(item.donate === 'false') {
            donated = false
        }
    })
    return { total, success, donated }
}

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
            if(req.body.user_id === '') return res.send({ success: false, message: "Unauthorized"})

            const { total, success, donated } = await TotalPrice(req.body.cart)
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

                let profile = await supabase
                    .from('profiles')
                    .select('promo_codes_used')
                    .eq("id", req.body.user_id)
                if(profile.error) {
                    return res.send({ success: false, message: "Something went wrong! Contact Us!"})
                }
                if(profile.data[0].promo_codes_used.includes(req.body.promoCode)) {
                    return res.send({ success: false, message: "Promo code has already been used"})
                }
            }

            console.log("Amount log" + total, success, donated, donated ? finalTotal.toFixed() * 100 : (finalTotal+35).toFixed() * 100)

            let { data, error } = await supabase
                .from('profiles')
                .select('stripe_customer_id')
                .eq("id", req.body.user_id)
            if(error) return res.status(404).json({ success: false, message: "Failed authorization"})

			const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                      price_data: {
                        currency: 'AED',
                        unit_amount: donated ? finalTotal.toFixed() * 100 : (finalTotal+35).toFixed() * 100,
                        product_data: {
                            name: 'Kuku Deals Draw',
                        },
                      },
                      quantity: 1,
                    },
                    
                ],
                customer: data[0].stripe_customer_id,
				payment_method_types: ['card'],
				mode: 'payment',
				success_url: req.body.locale === 'ar' ? `${req.headers.origin}/ar/status/success?success=true` : `${req.headers.origin}/status/success?success=true`,
				cancel_url: req.body.locale === 'ar' ? `${req.headers.origin}/ar/status/cancel` : `${req.headers.origin}/status/cancel`,
			});
            console.log("session", session)

            const initiated_orders_response = await supabase
                .from('initiated_orders')
                .insert([
                    { 
                        cart: req.body.cart, 
                        amount: donated ? total : total + 35, 
                        final_amount: donated ? finalTotal : finalTotal + 35,
                        verification_secret: session.payment_intent,
                        user_id: req.body.user_id,
                        promo_code_used: req.body.promoCode
                    },
                ])

            console.log("initiated_orders cs", initiated_orders_response)
			res.json({ success: true, url: session.url})
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}