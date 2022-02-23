import { createClient } from '@supabase/supabase-js'
import { map } from 'modern-async'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY
const supabase = createClient(supabaseUrl, supabaseSecretKey)
let customerName, amount, display
const mail = require('@sendgrid/mail')
mail.setApiKey(process.env.SENDGRID_API_KEY)
const fs = require('fs')
var html_to_pdf = require('html-pdf-node');

let options = { format: 'A3', path: './invoice.pdf' };
const Handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made' })
    }
    if (req.method === 'POST') {
        let initiated_orders = await supabase
            .from('initiated_orders')
            .select('*')
            // .eq("verification_secret", charge.payment_intent)
            .eq("verification_secret", "pi_3KViy4LSsCUq84XE0qx29IKS")
            .eq("status", true)
            .single()
        console.log("initiated_orders", initiated_orders)
        if (initiated_orders.data.promo_code_used === null) {
            amount = initiated_orders.data.amount
        } else {
            amount = initiated_orders.data.final_amount
        }
        console.log("initiated_orders amount", initiated_orders.data.amount)
        let completed_orders = await supabase
            .from('completed_orders')
            .select('*', { count: 'exact' })

        let ordered_coupons = []
        let donated_coupons = []
        let coupons = []
        await map(initiated_orders.data.cart, async (order, index) => {
            coupons.push({ product_id: JSON.parse(order).id, product_coupons: [], product_qty: JSON.parse(order).qty, product_price: JSON.parse(order).Price, name: JSON.parse(order).ProductName.en + "/" + JSON.parse(order).GiftName.en })
            for (let i = 1; i <= JSON.parse(order).qty; i++) {
                ordered_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length + 1}O`)
                coupons[index].product_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length}O`)
                if (JSON.parse(order).donate === "true") {
                    donated_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length}D`)
                    coupons[index].product_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(7, '0')}-${ordered_coupons.length}D`)
                }
            }
        })
        console.log("coupons", coupons)
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
        data.map((i, index) => {
            if (i.id === initiated_orders.data.user_id) {
                customerName = i.name
            }
        })
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
                        <h6 class="font-bold">Customer Name: <span class=" font-medium">${customerName}</span></h6>
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
        fs.readFile(('invoice.pdf'), async (err, datas) => {
            const data = {
                from: 'travo.socialmedia@gmail.com',
                // template_id: 'd-3039277b3eca416aa5b730a5e75a6ba1',
                personalizations: [
                    {
                        to: 'mohammedhafizba@gmail.com',
                        // to: 'anandhu@rough-paper.com',    
                        subject: 'Order Confirmation'
                    },
                ],
                content: [{ type: "text/html", value: image + header + body1 + footer + body2 },],
                attachments: [
                    {
                        content: datas.toString('base64'),
                        filename: 'invoice.pdf',
                        type: 'application/pdf',
                        disposition: 'attachment',
                        content_id: 'mytext',
                    },
                ],
            }
            const resp = await mail.send(data)
            console.log(resp)
            res.status(200).json({ status: 'OK' });
        })
        return res.send({ success: true, message: 'request has been made' })

    }
    // if(req.method === 'GET') {
    //     let campaigns_for_qty = await supabase
    //         .from('campaigns')
    //         .select('SoldOutCoupons')
    //         .eq("id", "998895d2-a6aa-404a-9f60-76880b8c2273")
    //         .single()
    //     console.log(campaigns_for_qty)

    // }
}

export default Handler