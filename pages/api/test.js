import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

const supabase = createClient(supabaseUrl, supabaseSecretKey)

const Handler = async (req, res) => {
    if(req.method !== 'GET') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'GET') {
        let initiated_orders = await supabase
            .from('initiated_orders')
            .select('*')
            .eq("verification_secret", "pi_3KUw3YLSsCUq84XE1c4GgqIF")
            .eq("status", true)
            .single()

        res.send({ success: false, initiated_orders, test: initiated_orders.data.promo_code_used ? true : false })
    }


    let output = await map(completed_orders, async ((order, index) => {
        let file = {
            content:
                `<html>
                    ${order.cart}
                </html>`
        }
    }))
}

export default Handler