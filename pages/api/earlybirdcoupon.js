import { createClient } from '@supabase/supabase-js'
import { map } from 'modern-async'
import moment from 'moment'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

const supabase = createClient(supabaseUrl, supabaseSecretKey)

const webhookHandler = async (req, res) => {
    let initiated_orders = await supabase
        .from('initiated_orders')
        .select('*')
        .eq("verification_secret", "pi_3KkoYULSsCUq84XE0bVGamY5")
        // .eq("status", true)
        .single()
    let completed_orders = await supabase
        .from('completed_orders')
        .select('*', { count: 'exact' })

    let ordered_coupons = []
    let donated_coupons = []
    let earlybird_coupons = []
    let coupons = []

    await map(initiated_orders.data.cart, async (order, index) => {
        coupons.push({ product_id: JSON.parse(order).id, product_coupons: [], product_qty: JSON.parse(order).qty, product_price: JSON.parse(order).Price, name: JSON.parse(order).ProductName.en + "/" + JSON.parse(order).GiftName.en, image: JSON.parse(order).Image, donated: JSON.parse(order).donate, purchase_date: `${moment(new Date().toLocaleString()).format('ll')}`})

        let earlybirdcampaign = await supabase
            .from('campaigns')
            .select('EarlyBirdValue, EarlyBirdFrequency')
            .eq("id", JSON.parse(order).id)
            .single()
        const timediff = moment(new Date(JSON.parse(order).created_at)).add(earlybirdcampaign.data.EarlyBirdValue, earlybirdcampaign.data.EarlyBirdFrequency).diff(new Date())
        console.log("timediff", timediff, "id", JSON.parse(order).id)

        for (let i = 1; i <= JSON.parse(order).qty; i++) {
            ordered_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(5, '0')}-${moment(new Date().toLocaleString()).format('YYYYMMDD')}-${ordered_coupons.length + 1}O`)
            coupons[index].product_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(5, '0')}-${moment(new Date().toLocaleString()).format('YYYYMMDD')}-${ordered_coupons.length}O`)

            if (JSON.parse(order).donate === "true") {
                donated_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(5, '0')}-${moment(new Date().toLocaleString()).format('YYYYMMDD')}-${ordered_coupons.length}D`)
                coupons[index].product_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(5, '0')}-${moment(new Date().toLocaleString()).format('YYYYMMDD')}-${ordered_coupons.length}D`)
            }

            if(timediff > 0) {
                earlybird_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(5, '0')}-${moment(new Date().toLocaleString()).format('YYYYMMDD')}-${ordered_coupons.length}E`)
                coupons[index].product_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(5, '0')}-${moment(new Date().toLocaleString()).format('YYYYMMDD')}-${ordered_coupons.length}E`)
            }
            if(earlybirdcampaign.error) return res.send({ success: false, message: "Fetching early bird values wrong", error })
        }        
    })

    return res.json({
        success: true,
        coupons
    })
}

export default webhookHandler