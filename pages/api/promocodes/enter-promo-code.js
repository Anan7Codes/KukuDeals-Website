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
        if(!user) return res.status(401).send({ success: false, message: "Unauthorized"})
        
        let { data: promo_codes, error } = await supabase
            .from('promo_codes')
            .select('value,type')
            .eq('name', req.body.promoCode)
            .single()
        if(error) {
            console.log(error)
            return res.send({ success: false, message: "Promo code does not exist"})
        }
        console.log(promo_codes)
        
        if(promo_codes.length === 0) {
            return res.send({ success: false, message: "Promo code does not exist"})
        }  



        //check if promo code exists
        
        //check if promo code has been used
        res.send({ success: true, message: `Apply promo code ${req.body.promoCode}?`, data: promo_codes})
    }
}

export default Handler