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
        
        let initiated_orders = await supabase
            .from('initiated_orders')
            .select('*')
            .eq("id", "51819eb7-9b61-4de5-a89b-7ef84fc3e640")
            .eq("user_id", "37dec8a5-b519-4fa6-ad59-08dfc5359688")
            .eq("verification_secret", "ek_test_YWNjdF8xS1JKek9MU3NDVXE4NFhFLEZWQ3p5d1Y4aU84WXBPaERVRXBTYmRIMWw1ZlpjQko_00zNpVW3me")
            .single()

        let completed_orders = await supabase
            .from('completed_orders')
            .select('*', { count: 'exact' }) 


        let ordered_coupons = []
        let donated_coupons = []
        let coupons = []
        await map(initiated_orders.data.cart, async (order, index) => {
            coupons.push({ product_id: JSON.parse(order).id, product_coupons: [], product_qty: JSON.parse(order).qty})
            for (let i = 1; i <= JSON.parse(order).qty; i++) {
                ordered_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length + 1}O`)
                coupons[index].product_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length}O`)
                if(JSON.parse(order).donate === "true") {
                    donated_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length}D`)
                    coupons[index].product_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length}D`)
                }
            }
        })
        console.log("coupons", ordered_coupons)
        console.log("donated_coupons", donated_coupons)
        console.log("product_coupons", coupons)

        const { data, error } = await supabase
            .from('completed_orders')
            .insert([
                { 
                    coupons, 
                    user_id: initiated_orders.data.user_id,
                    transaction_number: completed_orders.count + 1
                },
            ])
        console.log(data, error)
        
        
        return res.send({ message: 'success', initiated_orders, error})
    }
}
