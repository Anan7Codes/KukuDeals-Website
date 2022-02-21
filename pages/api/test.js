import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

const supabase = createClient(supabaseUrl, supabaseSecretKey)

const Handler = async (req, res) => {
    if(req.method !== 'GET') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'GET') {
        let campaigns_for_qty = await supabase
            .from('campaigns')
            .select('SoldOutCoupons')
            .eq("id", "998895d2-a6aa-404a-9f60-76880b8c2273")
            .single()
        console.log(campaigns_for_qty)
    }
}

export default Handler