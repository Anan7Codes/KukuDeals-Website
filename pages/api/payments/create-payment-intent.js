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
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'POST') {
        if(req.body.user_id === '') return res.send({ success: false, message: "Unauthorized"})
        // const { user } = await supabase.auth.api.getUserByCookie(req)
        // console.log("user cookie promo code", user)
        // if(!user) return res.status(401).send({ success: false, message: "Unauthorized"})

        const { total, success, donated } = await TotalPrice(req.body.cart)
        if(!success) return res.status(404).json({ success: false, message: "Failed to calculate total amount" })

        let finalTotal = total
        if(req.body.promoCode) {
            let promo_code = await supabase
                .from('promo_codes')
                .select('type,value,max_amount')
                .eq("name", req.body.promoCode)
            if(promo_code.data[0].type) {
                finalTotal = total - promo_code.data[0].value                
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
    
                if(index !== -1) {
                    if(parseInt(promo_codes_used[index].split(':::')[1]) >= promo_code.data[0].cap) {
                        return res.json({ success: false, messsage: "Promo Code usage limit has been reached" })
                    }
                }                
            } 
        }

        console.log("Amount log" + total, success, donated, donated ? finalTotal.toFixed() * 100 : (finalTotal+35).toFixed() * 100)
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
            amount: donated ? finalTotal.toFixed() * 100 : (finalTotal+35).toFixed() * 100,
            currency: 'AED',
            customer: data[0].stripe_customer_id,
            automatic_payment_methods: {
                enabled: true,
            },
        })

        console.log("paymentIntent", paymentIntent)
       
        const initiated_orders_response = await supabase
            .from('initiated_orders')
            .insert([
                { 
                    cart: req.body.cart, 
                    amount: donated ? total.toFixed() : (total+35).toFixed(), 
                    final_amount: donated ? finalTotal.toFixed() : (finalTotal+35).toFixed(),
                    verification_secret: paymentIntent.id,
                    user_id: req.body.user_id,
                    promo_code_used: req.body.promoCode
                },
            ])
        console.log("initiated_orders pi", initiated_orders_response)

        res.json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: data[0].stripe_customer_id,
        });
    }
}
