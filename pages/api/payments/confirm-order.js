import { createClient } from '@supabase/supabase-js'
import { map } from 'modern-async'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

const supabase = createClient(supabaseUrl, supabaseSecretKey)

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'POST') {
        
        let { data: initiated_orders, error } = await supabase
            .from('initiated_orders')
            .select('*')
            .eq("id", "ddbc706d-4892-40cb-bc7e-c70675ffc6db")
            .eq("user_id", "37dec8a5-b519-4fa6-ad59-08dfc5359688")
            .eq("verification_secret", "ek_test_YWNjdF8xS1JKek9MU3NDVXE4NFhFLGVEdnpsRHgwYjFPWlZVbzVId29WMkFYU3JKRnFiMDA_002jzuR7sH")
            .single()
        console.log(initiated_orders)
        let regular_orders = await supabase
            .from('regular_orders')
            .select('*', { count: 'exact' }) 
        console.log(regular_orders.data, "count", regular_orders.count)
        // await map(initiated_orders.cart, async (order) => {
        //     console.log(JSON.parse(order))
        //     const { data, error } = await supabase
        //     .from('regular_orders')
        //     .insert([
        //         { 
        //             product_id: JSON.parse(order).id, 
        //             user_id: initiated_orders.user_id
        //         },
        //     ])
        //     console.log(data, error)
        // })
        
        
        return res.send({ message: 'success', initiated_orders, error})
    }
}
