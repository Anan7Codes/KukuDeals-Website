import { createClient } from '@supabase/supabase-js'
import { map } from 'modern-async'
import moment from 'moment'

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
    if(req.method !== 'GET') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'GET') {
        if(req.body.promoCode === '') return res.send({ success: false, message: "Please enter a value"})
        if(req.body.user_id === '') return res.send({ success: false, message: "Unauthorized"})
        // const { user } = await supabase.auth.api.getUserByCookie(req)
        // console.log("user cookie promo code", user)
        // if(!user) return res.status(401).send({ success: false, message: "Unauthorized"})
        const tn = moment(new Date().toLocaleString()).format('YYYYMMDD')

        return res.json({ tn: tn})
    }
}

export default Handler