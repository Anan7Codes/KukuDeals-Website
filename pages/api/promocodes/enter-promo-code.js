import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

const supabase = createClient(supabaseUrl, supabaseSecretKey)

const Handler = async (req, res) => {
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'POST') {
        console.log(req.body)
        if(req.body.promoCode === '') return res.send({ success: false, message: "Please enter a value"})
        const { user } = await supabase.auth.api.getUserByCookie(req)
        console.log("user cookie promo code", user)
        if(!user) return res.status(401).send({ success: false, message: "Unauthorized"})
        
        let promo_codes = await supabase
            .from('promo_codes')
            .select('value,type')
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
            .eq("id", user.id)
        if(profile.error) {
            return res.send({ success: false, message: "Something went wrong! Contact Us!"})
        }
        if(profile.data[0].promo_codes_used.includes(req.body.promoCode)) {
            return res.send({ success: false, message: "Promo code has already been used"})
        }

        res.send({ success: true, message: `Apply promo code ${req.body.promoCode}?`, data: promo_codes.data})
    }
}

export default Handler