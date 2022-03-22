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
                    .select('type,value,max_amount,cap')
                    .eq("name", req.body.promoCode)
                console.log("cs promo code", promo_code)
                if(promo_code.data[0].type) {
                    if((total - promo_code.data[0].value) < promo_code.data[0].max_amount) {
                        finalTotal = total - promo_code.data[0].value
                    } else {
                        finalTotal = total - promo_code.data[0].max_amount
                    }
                    
                } else {
                    if((finalTotal = total - (total * promo_code.data[0].value / 100)) < promo_code.data[0].max_amount) {
                        finalTotal = total - (total * promo_code.data[0].value / 100)
                    } else {
                        finalTotal = total - promo_code.data[0].max_amount
                    }                
                }

                let profile = await supabase
                    .from('profiles')
                    .select('promo_codes_used')
                    .eq("id", req.body.user_id)
                if(profile.error) {
                    return res.send({ success: false, message: "Something went wrong! Contact Us!"})
                }
                
                let promo_codes_used = profile.data[0].promo_codes_used
                if(profile.data[0].promo_codes_used.length !== 0) {
                    const index = promo_codes_used.findIndex(promo_code_qty => {
                        if (promo_code_qty.includes(req.body.promoCode)) {
                            return true;
                        }
                    });
                    
                    console.log("CS index", index, "cap", parseInt(promo_codes_used[index].split(':::')[1]) >= promo_code.data[0].cap)

                    if(parseInt(promo_codes_used[index].split(':::')[1]) >= promo_code.data[0].cap) {
                        return res.json({ success: false, messsage: "Promo Code usage limit has been reached" })
                    }
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
                        amount: donated ? total.toFixed() : (total+35).toFixed(), 
                        final_amount: donated ? finalTotal.toFixed() : (finalTotal+35).toFixed(),
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