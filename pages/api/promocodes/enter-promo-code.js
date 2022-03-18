import { createClient } from '@supabase/supabase-js'
import { map } from 'modern-async'

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

const Handler = async (req, res) => {
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'POST') {
        console.log(req.body)
        if(req.body.promoCode === '') return res.send({ success: false, message: "Please enter a value"})
        if(req.body.user_id === '') return res.send({ success: false, message: "Unauthorized"})
        // const { user } = await supabase.auth.api.getUserByCookie(req)
        // console.log("user cookie promo code", user)
        // if(!user) return res.status(401).send({ success: false, message: "Unauthorized"})
        
        let promo_codes = await supabase
            .from('promo_codes')
            .select('value,type,min_amount,max_amount')
            .eq('name', req.body.promoCode)
            .single()
        if(promo_codes.error) {
            console.log(promo_codes.error)
            return res.send({ success: false, message: "Promo code does not exist"})
        }
        
        if(promo_codes.data.length === 0) {
            return res.send({ success: false, message: "Promo code does not exist"})
        }  
        
        let profile = await supabase
            .from('profiles')
            .select('promo_codes_used')
            .eq("id", req.body.user_id)
        if(profile.error) {
            return res.send({ success: false, message: "Something went wrong! Contact Us!" })
        }

        let promo_codes_used = profile.data[0].promo_codes_used

        if(profile.data[0].promo_codes_used.length !== 0) {
            const index = promo_codes_used.findIndex(promo_code_qty => {
                if (promo_code_qty.includes(req.body.promoCode)) {
                  return true;
                }
            });

            if(parseInt(promo_codes_used[index].split(':::')[1]) >= promo_codes.data.cap) {
                return res.json({ success: false, messsage: "Promo Code usage limit has been reached" })
            }
        } 

        const { total, success } = await TotalPrice(req.body.cart)
        if(!success) return res.status(404).json({ success: false, message: "Failed to calculate total amount"})
        if(total < promo_codes.data.min_amount) return res.send({ success: false, message: `Minimum amount for this promo code is AED${promo_codes.data.min_amount}`})
        res.send({ success: true, message: `Apply promo code ${req.body.promoCode}?`, data: promo_codes.data})
    }
}

export default Handler