import { buffer } from 'micro'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import { map } from 'modern-async'
const mail = require('@sendgrid/mail')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2020-08-27'})

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

const supabase = createClient(supabaseUrl, supabaseSecretKey)

const endpointSecret = process.env.WEBHOOK_SECRET

mail.setApiKey(process.env.SENDGRID_API_KEY)
const html_to_pdf = require('html-pdf-node');
let amount, display
let options = { format: 'A3' };

export const config = {
    api: {
      bodyParser: false,
    },
}

const webhookHandler = async (req, res) => {
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'POST') {
        const buf = await buffer(req)
        const sig = req.headers['stripe-signature'];
        let event;
        let user_id = ''
        let res_charge
        let mailres

        try {
            event = stripe.webhooks.constructEvent(buf.toString(), sig, endpointSecret);
        } catch (err) {
            console.log("err webhook", err)
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object            
            const initiated_orders = await supabase
                .from('initiated_orders')
                .update({ status: true })
                .eq('verification_secret', paymentIntent.id)
            if(initiated_orders.error) {
                console.log(initiated_orders.error)
                return res.send({ success: false, message: "Initiated order doesn't exist", error: initiated_orders.error})
            }
            return res.send({ success: true, initiated_orders: initiated_orders.data })
        } else if (event.type === 'charge.succeeded') {
            const charge = event.data.object
            console.log("charge", charge.payment_intent)
            let initiated_orders = await supabase
                .from('initiated_orders')
                .select('*')
                .eq("verification_secret", charge.payment_intent)
                .eq("status", true)
                .single()
            console.log("Line 60 IO", initiated_orders)
            console.log("cart", initiated_orders.data.cart)
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
                    if(JSON.parse(order).donate === "true") {
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
            if(error) return res.send({ success: false, message: "Completed orders insertion error", error: data.error})
                       
            let profile = await supabase
                .from('profiles')
                .select('promo_codes_used', 'name')
                .eq("id", initiated_orders.data.user_id)

            if(initiated_orders.data.promo_code_used) {               

                let promo_codes_used = profile.data[0].promo_codes_used
                promo_codes_used.push(initiated_orders.data.promo_code_used)
                
                const updated_promo_codes = await supabase
                    .from('profiles')
                    .update({ promo_codes_used: promo_codes_used })
                    .eq('id', initiated_orders.data.user_id)
                if(updated_promo_codes.error) return res.send({ success: false, message: "Promo Code Update Error", error: updated_promo_codes.error})
            }   
            
            await map(coupons, async (item, i) => {
                const campaign_for_qty = await supabase
                    .from('campaigns')
                    .select('SoldOutCoupons')
                    .eq("id", item.product_id)
                    .single()

                if(campaign_for_qty.error) return res.send({ success: false, message: "Campaign Doesn't Exist", error: campaign_for_qty.error})

                const campaign_update_qty = await supabase
                    .from('campaigns')
                    .update({ SoldOutCoupons: campaign_for_qty.data.SoldOutCoupons + item.product_qty })
                    .eq("id", item.product_id)

                if(campaign_update_qty.error) return res.send({ success: false, message: "Campaign Qty Doesn't Exist", error: campaign_update_qty.error})
            })      

            user_id = initiated_orders.data.user_id
            res_charge = charge

            const header = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Tailwind CSS Invoce </title>
                    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
                </head>
                <body>
                    <div class="flex min-h-screen bg-gray-100">
                    <div class="w-full bg-white shadow-lg">
                        <div class="flex justify-between m-6">
                            <img src="https://i.postimg.cc/j2znKT6V/kukudealslogo-black.png"
                            class="flex items-center w-28 h-10 relative cursor-pointer" layout="fill" alt="kuku logo" />
                            <div class="">
                                <ul class="flex">
                                    <li class="flex flex-col ">
                                <span class="text-sm font-bold">
                                    kukudeals Enterprises LLC
                                </span>
                                <span class="text-xs">
                                    Address: Box Park, Al Wasl Rd, Dubai
                                </span>
                                <span class="text-xs">
                                    TRN: 1008786483676343
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li class="flex flex-col ">
                                <span class="text-base font-bold text-gray-700">
                                    Tax Invoice
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <br />
                <div class="flex text-xs m-6 justify-between p-4">
                    <div>
                        <div>
                            <h6 class="font-bold">Customer Name: <span class=" font-medium">${profile.data[0].name}</span></h6>
                        </div>

                        <h6 class="font-bold">Address : <span class=" font-medium"> United Arab Emirates</span></h6>
                    </div>
                    <div class="">
                        <div>
                            <h6 class="font-bold">Invoice No : <span class=" font-medium">${String(completed_orders.count + 1).padStart(10, '0')}</span></h6>
                            <h6 class="font-bold">Invoice Date : <span class=" font-medium"> ${new Date().toLocaleString()}</span></h6>
                            <h6 class="font-bold">Order Status : <span class=" font-medium"> Completed</span></h6>
                        </div>
                    </div>
                </div>
                <div class=" justify-center ">
                    <div class="shadow m-6">
                        <table class=" table-fixed w-full">
                            <thead class=" bg-gray-50">
                                <tr>
                                    <th class="w-24 border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
                                        Sr.No
                                    </th>
                                    <th class=" border-collapse w-52 border border-slate-500  py-2 text-xs text-gray-500 ">
                                        Product(s)
                                    </th>
                                    <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
                                        Quantity
                                    </th>
                                    <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
                                        UnitPrice
                                    </th>
                                    <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
                                        Amount Excluding Tax
                                    </th>
                                    <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
                                        Tax Rate %
                                    </th>
                                    <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
                                        Tax Payable
                                    </th>
                                    <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
                                        Amount Including Tax
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white text-xs text-center">`
            const body1 = await map(coupons, async (item, i) => {
                return (
                    `<tr class="border-collapse border  border-slate-500 whitespace-nowrap ">
                        <td class="  border-collapse border border-slate-500  py-4 text-sm text-gray-500">
                            ${i + 1}
                        </td>
                        <td class="border-collapse border border-slate-500  py-4">
                            <div class=" text-gray-900">
                                ${item.name}
                            </div>
                        </td>
                        <td class=" border-collapse border border-slate-500   py-4 text-sm text-gray-500">
                        ${item.product_qty}
                        </td>
                        <td class=" border-collapse border border-slate-500   py-4">
                            AED${item.product_qty * item.product_price * 0.95}
                        </td>
                        <td class=" border-collapse border border-slate-500   py-4">
                        AED${item.product_price}
                        </td>
                        <td class=" border-collapse border border-slate-500   py-4">
                            5%
                        </td>
                        <td class=" border-collapse border border-slate-500   py-4">
                        AED${item.product_qty * item.product_price * 0.05}
                        </td>
                        <td class=" border-collapse border border-slate-500   py-4">
                        AED${item.product_qty * item.product_price}
                        </td>
                    </tr>    
                    `
                    )
            })

            const footer = `
            <tr class="whitespace-nowrap border-2 border-black">
                <td class=" border-collapse border border-slate-500  py-4  text-gray-500">
                    Grand Total
                </td>
                <td class=" border-collapse border border-slate-500  py-4 text-sm text-gray-500">
                </td>
                <td class=" border-collapse border border-slate-500  py-4">

                </td>
                <td class=" border-collapse border border-slate-500  py-4">
                </td>
                <td class=" border-collapse border border-slate-500  py-4">

                </td>
                <td class=" border-collapse border border-slate-500  py-4">
                </td>
                <td class=" border-collapse border border-slate-500  py-4">
                </td>
                <td class=" border-collapse border border-slate-500  py-4">
                ${initiated_orders.data.promo_code_used ? `AED${amount}<br/>(Promocode used)` : `AED${amount}`}
                </td>
            </tr>
                </tbody>
                    </table>
                    </div>
                    </div>
                    </div>
                </div>
                </body>
            </html>
                `
            const body2 = await map(coupons, async (items, index) => {
                display = items.product_coupons
                return (`
                        <div class="m-4 grid grid-cols-5 gap-1 pt-6 text-sm">
                        <div>Product Name : ${items.name}</div>
                        <div>Qty : ${items.product_qty}</div>
                        <div>Price : ${items.product_price}</div>
                        <div class = "border border-black text-center py-4">Coupon No: ${display}</div>
                        </div>`
                    )
                })

            let image = `<img class="items-center justify-center w-32 h-14" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ9hpbDkb5HdKE1RLtaMig_Gs24n8VsRIJ7KStu3T_1mX4kDaM23z2RXm8Z5Gd31QftaM&usqp=CAU" alt="HTML tutorial" style="width:200px;height:200px;border:0">`;
            let file = { content: header + body1 + footer + body2 }
            const pdfBuffer = await html_to_pdf.generatePdf(file, options)
            const data1 = {
                from: 'travo.socialmedia@gmail.com',
                personalizations: [
                    {
                        to: ['mohammedhafizba@gmail.com', 'anandhu@rough-paper.com'], 
                        subject: 'Order Confirmation'
                    },
                ],
                content: [{ type: "text/html", value: image + header + body1 + footer + body2 },],
                attachments: [
                    {
                        content: pdfBuffer.toString('base64'),
                        filename: 'invoice.pdf',
                        type: 'application/pdf',
                        disposition: 'attachment',
                        content_id: 'mytext',
                    },
                ],
            }
            try {
                const resp = await mail.send(data1)
                mailres = resp
                console.log(resp)
            } catch (e) {
                return res.send({ success: false, message: 'Email failed', mailres})
            }            
            
            return res.send({ success: true, user_id, res_charge, mailres})

        } else {
            console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`)
        }            
        
        
    }
}

export default webhookHandler