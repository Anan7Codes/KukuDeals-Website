import { createClient } from '@supabase/supabase-js'
import { map } from 'modern-async'

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

const Handler = async (req, res) => {
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'POST') {
        if(req.body.promoCode === '') return res.send({ success: false, message: "Please enter a value"})
        if(req.body.user_id === '') return res.send({ success: false, message: "Unauthorized"})
        

        if(req.body.event === "epc") {
            let promo_codes = await supabase
                .from('promo_codes')
                .select('value,type,min_amount,max_amount,cap')
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

            console.log("epc length", profile.data[0].promo_codes_used.length)
            if(profile.data[0].promo_codes_used.length !== 0) {
                const index = promo_codes_used.findIndex(promo_code_qty => {
                    if (promo_code_qty.includes(req.body.promoCode)) {
                    return true;
                    }
                });

                console.log("EPC index", index, "cap", parseInt(promo_codes_used[index].split(':::')[1]) >= promo_codes.data.cap)

                if(parseInt(promo_codes_used[index].split(':::')[1]) >= promo_codes.data.cap) {
                    return res.json({ success: false, messsage: "Promo Code usage limit has been reached" })
                }
            } 
            const { total, success } = await TotalPrice(req.body.cart)
            return res.json({ response: req.body, total, success })
        } else if(req.body.event === 'cs') {
            const { total, success, donated } = await TotalPrice(req.body.cart)
            if(!success) return res.status(404).json({ success: false, message: "Failed to calculate total amount"})

            let finalTotal = total
            if(req.body.promoCode) {
                let promo_code = await supabase
                    .from('promo_codes')
                    .select('type,value,max_amount,cap')
                    .eq("name", req.body.promoCode)
                console.log("cs promo code", promo_code)
                if(promo_code.data[0].type) {
                    if((total - promo_code.data[0].value) < promo_code.data[0].max_amount) {
                        finalTotal = total - promo_code.data[0].value
                    } else {
                        finalTotal = total - promo_code.data[0].max_amount
                    }
                    
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
                    
                    console.log("CS index", index, "cap", parseInt(promo_codes_used[index].split(':::')[1]) >= promo_code.data[0].cap)

                    if(parseInt(promo_codes_used[index].split(':::')[1]) >= promo_code.data[0].cap) {
                        return res.json({ success: false, messsage: "Promo Code usage limit has been reached" })
                    }
                } 
            }

            console.log("Amount log" + total, success, donated, donated ? finalTotal.toFixed() * 100 : (finalTotal+35).toFixed() * 100, 52.5.toFixed())

            let { data, error } = await supabase
                .from('profiles')
                .select('stripe_customer_id')
                .eq("id", req.body.user_id)
            if(error) return res.status(404).json({ success: false, message: "Failed authorization"})

            return res.json({ response: "cs", data})
        } else if (req.body.event === 'confirm') {
            let initiated_orders = await supabase
                .from('initiated_orders')
                .select('*')
                .eq("verification_secret", req.body.payment_intent)
                // .eq("status", true)
                .single()
            let completed_orders = await supabase
                .from('completed_orders')
                .select('*', { count: 'exact' })

            let ordered_coupons = []
            let donated_coupons = []
            let coupons = []

            await map(initiated_orders.data.cart, async (order, index) => {
                coupons.push({ product_id: JSON.parse(order).id, product_coupons: [], product_qty: JSON.parse(order).qty, product_price: JSON.parse(order).Price, name: JSON.parse(order).ProductName.en + "/" + JSON.parse(order).GiftName.en, image: JSON.parse(order).Image })
                for (let i = 1; i <= JSON.parse(order).qty; i++) {
                    ordered_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length + 1}O`)
                    coupons[index].product_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length}O`)
                    if (JSON.parse(order).donate === "true") {
                        donated_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length}D`)
                        coupons[index].product_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length}D`)
                    }
                }
            })

            const { data, error } = await supabase
                .from('completed_orders')
                .insert([
                    {
                        coupons,
                        user_id: initiated_orders.data.user_id,
                        final_amount: initiated_orders.data.final_amount,
                        transaction_number: completed_orders.count + 1
                    },
                ])
            if (error) return res.send({ success: false, message: "Completed orders insertion error", error: data.error })

            let profile = await supabase
                .from('profiles')
                .select('promo_codes_used, name, email')
                .eq("id", initiated_orders.data.user_id)

            if (initiated_orders.data.promo_code_used) {

                let promo_codes_used = profile.data[0].promo_codes_used
                if(profile.data[0].promo_codes_used.length === 0) {
                    promo_codes_used.push(initiated_orders.data.promo_code_used + ":::" + 1)
                    console.log("pcu1", promo_codes_used)
                    const { error } = await supabase
                        .from('profiles')
                        .update({ promo_codes_used: promo_codes_used })
                        .eq('id', initiated_orders.data.user_id)
                    if(error) {
                        return res.json({ success: false, message: "Something went wrong while updating promo code"})
                    }
                } else {
                    let promo_codes = await supabase
                        .from('promo_codes')
                        .select('value,type,min_amount,max_amount,cap')
                        .eq('name', initiated_orders.data.promo_code_used)
                        .single()

                    const index = promo_codes_used.findIndex(promo_code_qty => {
                        if (promo_code_qty.includes(initiated_orders.data.promo_code_used)) {
                          return true;
                        }
                    });
        
                    if(parseInt(promo_codes_used[index].split(':::')[1]) >= promo_codes.data.cap) {
                        return res.json({ success: false, messsage: "Promo Code usage limit has been reached" })
                    }
        
                    promo_codes_used[index] = promo_codes_used[index].split(':::')[0] + ":::" + (parseInt(promo_codes_used[index].split(':::')[1]) + 1)
                    const { error } = await supabase
                        .from('profiles')
                        .update({ promo_codes_used: promo_codes_used })
                        .eq('id', initiated_orders.data.user_id)
                    if(error) {
                        return res.json({ success: false, message: "Something went wrong while updating promo code" })
                    }
                }
            }

            await map(coupons, async (item, i) => {
                console.log("item", item, "type", typeof(item))
                const campaign_for_qty = await supabase
                    .from('campaigns')
                    .select('SoldOutCoupons,TotalCoupons')
                    .eq("id", item.product_id)
                    .single()
                console.log("cfq", campaign_for_qty)
                if (campaign_for_qty.error) return res.send({ success: false, message: "Campaign Doesn't Exist", error: campaign_for_qty.error })

                if(campaign_for_qty.data.SoldOutCoupons + item.product_qty >= campaign_for_qty.data.TotalCoupons) {
                    const campaign_update_qty = await supabase
                    .from('campaigns')
                    .update({ SoldOutCoupons: campaign_for_qty.data.SoldOutCoupons + item.product_qty, SoldOut: true })
                    .eq("id", item.product_id)

                    console.log("cuq", campaign_update_qty)
                    if (campaign_update_qty.error) return res.send({ success: false, message: "Campaign Qty Doesn't Exist", error: campaign_update_qty.error })
                } else {
                    const campaign_update_qty = await supabase
                    .from('campaigns')
                    .update({ SoldOutCoupons: campaign_for_qty.data.SoldOutCoupons + item.product_qty })
                    .eq("id", item.product_id)

                    console.log("cuq2", campaign_update_qty)
                    if (campaign_update_qty.error) return res.send({ success: false, message: "Campaign Qty Doesn't Exist", error: campaign_update_qty.error })
                }
                
            })
            return res.json({ response: "confirm", initiated_orders })
        }
        
    }
}

export default Handler