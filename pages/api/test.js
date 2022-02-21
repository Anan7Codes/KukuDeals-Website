import { createClient } from '@supabase/supabase-js'
import { map } from 'modern-async'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY
const supabase = createClient(supabaseUrl, supabaseSecretKey)


const mail = require('@sendgrid/mail')
mail.setApiKey(process.env.SENDGRID_API_KEY)
const fs = require('fs')
var html_to_pdf = require('html-pdf-node');
const invoice = fs.readFileSync('./test/invoice.html', 'utf-8')


let options = { format: 'A3', path: './invoice.pdf' };
// let file = { content: invoice };

const Handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made' })
    }
    if (req.method === 'POST') {
        let initiated_orders = await supabase
            .from('initiated_orders')
            .select('*')
            // .eq("verification_secret", charge.payment_intent)
            .eq("verification_secret", "pi_3KUr4PLSsCUq84XE0wYUtHH8")
            .eq("status", true)
            .single()
        console.log("initiated_orders", initiated_orders)
        console.log("initiated_orders amount", initiated_orders.data.amount)
        let completed_orders = await supabase
            .from('completed_orders')
            .select('*', { count: 'exact' })
        console.log("completed_orders", completed_orders)
        console.log("initiated_orders Price", initiated_orders.data.cart)


        let ordered_coupons = []
        let donated_coupons = []
        let coupons = []
        await map(initiated_orders.data.cart, async (order, index) => {
            coupons.push({ product_id: JSON.parse(order).id, product_coupons: [], product_qty: JSON.parse(order).qty, product_price: JSON.parse(order).Price })
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
            .from('completed_orders')
            .insert([
                {
                    coupons,
                    user_id: initiated_orders.data.user_id,
                    final_amount: initiated_orders.data.final_amount,
                    transaction_number: completed_orders.count + 1
                },
            ])
        console.log("final", data, error)
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
                <img src="https://i.postimg.cc/hGy4v1JQ/kukudealslogo-black.png"
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
                        <h6 class="font-bold">Customer Name: <span class=" font-medium">Hafiz</span></h6>
                    </div>

                    <h6 class="font-bold">Address : <span class=" font-medium"> United Arab Emirates</span></h6>
                </div>
                <div class="">
                    <div>
                        <h6 class="font-bold">Invoice No.: <span class=" font-medium"> 013498947</span></h6>
                        <h6 class="font-bold">Invoice Date <span class=" font-medium"> 11.03.2022</span></h6>
                        <h6 class="font-bold">Order Status <span class=" font-medium"> Completed</span></h6>
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
                                <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
                                    Product(s)
                                </th>
                                <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
                                    Campaign No.
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
                        <tbody class="bg-white text-xs justify-center items-center">
            `
        const body1 = await map(coupons, async(item,i)=>{return(
            `
        <tr class="border-collapse border border-slate-500 whitespace-nowrap ">
            <td class=" border-collapse border border-slate-500  py-4 text-sm text-gray-500">
                ${i+1}
            </td>
            <td class="border-collapse border border-slate-500  py-4">
                <div class=" text-gray-900">
                    Zorro Pencil
                </div>
            </td>
            <td class="border-collapse border border-slate-500  py-4">
                <div class=" text-gray-500">${item.product_id}</div>
            </td>
            <td class=" border-collapse border border-slate-500   py-4 text-sm text-gray-500">
            ${item.product_qty}
            </td>
            <td class=" border-collapse border border-slate-500   py-4">
                AED${item.product_qty*item.product_price*0.95}
            </td>
            <td class=" border-collapse border border-slate-500   py-4">
            AED${item.product_price}
            </td>
            <td class=" border-collapse border border-slate-500   py-4">
                5%
            </td>
            <td class=" border-collapse border border-slate-500   py-4">
            AED${item.product_qty*item.product_price*0.05}
            </td>
            <td class=" border-collapse border border-slate-500   py-4">
            AED${item.product_qty*item.product_price}
            </td>
        </tr>    
        `
        )})
        const footer = `
            </tbody>
                </table>
                     </div>
                    </div>
                    </div>
                    </div>
                </body>
                </html>
            `
        let file = { content: header + body1 + footer }

        // let file = {
        //     content:
        //         `
        //     <!DOCTYPE html>
        // <html lang="en">

        // <head>
        //     <meta charset="UTF-8">
        //     <meta http-equiv="X-UA-Compatible" content="IE=edge">
        //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //     <title>Tailwind CSS Invoce </title>
        //     <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">

        // </head>

        // <body>
        //     <div class="flex min-h-screen bg-gray-100">
        //         <div class="w-full bg-white shadow-lg">
        //             <div class="flex justify-between m-6">
        //                 <img src="https://i.postimg.cc/hGy4v1JQ/kukudealslogo-black.png"
        //                     class="flex items-center w-28 h-10 relative cursor-pointer" layout="fill" alt="kuku logo" />
        //                 <div class="">
        //                     <ul class="flex">
        //                         <li class="flex flex-col ">
        //                             <span class="text-sm font-bold">
        //                                 kukudeals Enterprises LLC
        //                             </span>
        //                             <span class="text-xs">
        //                                 Address: Box Park, Al Wasl Rd, Dubai
        //                             </span>
        //                             <span class="text-xs">
        //                                 TRN: 1008786483676343
        //                             </span>
        //                         </li>

        //                     </ul>
        //                 </div>
        //                 <div>
        //                     <ul>
        //                         <li class="flex flex-col ">
        //                             <span class="text-base font-bold text-gray-700">
        //                                 Tax Invoice
        //                             </span>
        //                         </li>
        //                     </ul>
        //                 </div>
        //             </div>
        //             <br />
        //             <div class="flex text-xs m-6 justify-between p-4">
        //                 <div>
        //                     <div>
        //                         <h6 class="font-bold">Customer Name: <span class=" font-medium">Hafiz</span></h6>
        //                     </div>

        //                     <h6 class="font-bold">Address : <span class=" font-medium"> United Arab Emirates</span></h6>
        //                 </div>
        //                 <div class="">
        //                     <div>
        //                         <h6 class="font-bold">Invoice No.: <span class=" font-medium"> 013498947</span></h6>
        //                         <h6 class="font-bold">Invoice Date <span class=" font-medium"> 11.03.2022</span></h6>
        //                         <h6 class="font-bold">Order Status <span class=" font-medium"> Completed</span></h6>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div class=" justify-center ">
        //                 <div class="shadow m-6">
        //                     <table class=" table-fixed w-full">
        //                         <thead class=" bg-gray-50">
        //                             <tr>
        //                                 <th class="w-24 border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
        //                                     Sr.No
        //                                 </th>
        //                                 <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
        //                                     Product(s)
        //                                 </th>
        //                                 <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
        //                                     Campaign No.
        //                                 </th>
        //                                 <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
        //                                     Quantity
        //                                 </th>
        //                                 <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
        //                                     UnitPrice
        //                                 </th>
        //                                 <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
        //                                     Amount Excluding Tax
        //                                 </th>
        //                                 <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
        //                                     Tax Rate %
        //                                 </th>
        //                                 <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
        //                                     Tax Payable
        //                                 </th>
        //                                 <th class=" border-collapse border border-slate-500  py-2 text-xs text-gray-500 ">
        //                                     Amount Including Tax
        //                                 </th>
        //                             </tr>
        //                         </thead>
        //                         <tbody class="bg-white text-xs justify-center items-center">

        //                  ${await map(coupons, async (order, index) => {
        //                      `<tr class="border-collapse border border-slate-500 whitespace-nowrap ">
        //                      <td class=" border-collapse border border-slate-500  py-4 text-sm text-gray-500">
        //                                    ${index + 1}
        //                                    ${console.log(order)}
        //                                    ${console.log(typeof (order))}
        //                                 </td>
        //                                 <td class="border-collapse border border-slate-500  py-4">
        //                                     <div class=" text-gray-900">
        //                                         Zorro Pencil
        //                                     </div>
        //                                 </td>
        //                                 <td class="border-collapse border border-slate-500  py-4">
        //                                     <div class=" text-gray-500">LS-003455</div>
        //                                 </td>
        //                                 <td class=" border-collapse border border-slate-500   py-4 text-sm text-gray-500">
        //                                     abcd
        //                                 </td>
        //                                 <td class=" border-collapse border border-slate-500   py-4">
        //                                     efghi
        //                                 </td>
        //                                 <td class=" border-collapse border border-slate-500   py-4">
        //                                    455
        //                                 </td>
        //                                 <td class=" border-collapse border border-slate-500   py-4">
        //                                    777
        //                                 </td>
        //                                 <td class=" border-collapse border border-slate-500   py-4">
        //                                    777
        //                                 </td>
        //                                 <td class=" border-collapse border border-slate-500   py-4">
        //                                     AED
        //                                 </td> 
        //                                 </tr>`

        //         }
        //         )}


        //                             <div class="pt-5 text-xs ">
        //                                 <tr class="whitespace-nowrap">
        //                                     <td class=" py-4 text-gray-500">

        //                                     </td>

        //                                     <td class=" py-4">
        //                                         <div class=" text-gray-500"></div>
        //                                     </td>
        //                                     <td class=" py-4 text-gray-500">
        //                                     </td>
        //                                     <td class=" py-4">

        //                                     </td>
        //                                     <td class=" py-4">

        //                                     </td>
        //                                     <td class=" py-4">

        //                                     </td>
        //                                     <td class="  py-4">

        //                                     </td>
        //                                     <td class="  py-4">

        //                                     </td>
        //                                     <td class="  py-4">

        //                                     </td>
        //                                 </tr>
        //                                 <tr class="whitespace-nowrap">
        //                                     <td class=" border-collapse border border-slate-500  py-4 text-gray-500">
        //                                         Total
        //                                     </td>

        //                                     <td class=" border-collapse border border-slate-500  py-4">
        //                                         <div class=" text-gray-500"></div>
        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4 text-gray-500">
        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">

        //                                     </td>
        //                                     <td class=" t  border-collapse border border-slate-500  py-4">
        //                                         AED4.70
        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">

        //                                     </td>
        //                                     <td class="  border-collapse border border-slate-500  py-4">
        //                                         AED0.34
        //                                     </td>
        //                                     <td class="  border-collapse border border-slate-500  py-4">
        //                                         AED5.00
        //                                     </td>
        //                                     <td class="  border-collapse border border-slate-500  py-4">
        //                                         AED5.00
        //                                     </td>
        //                                 </tr>


        //                                 <tr class="whitespace-nowrap">
        //                                     <td class=" border-collapse border border-slate-500  py-4  text-gray-500">
        //                                         Pay using card
        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">
        //                                         <div class="text-sm text-gray-500"></div>
        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4  text-gray-500">

        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">

        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">

        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">

        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">

        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">
        //                                         AED5.00
        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">
        //                                         AED5.00
        //                                     </td>
        //                                 </tr>


        //                                 <tr class="whitespace-nowrap">
        //                                     <td class=" border-collapse border border-slate-500  py-4  text-gray-500">
        //                                         Pay using iPoints
        //                                     </td>

        //                                     <td class=" border-collapse border border-slate-500  py-4">
        //                                         <div class=" text-gray-500"></div>
        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4 text-sm text-gray-500">

        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">

        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">

        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">

        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">

        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">

        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">
        //                                         AED5.00
        //                                     </td>
        //                                 </tr>
        //                                 <tr class="whitespace-nowrap border-2 border-black">
        //                                     <td class=" border-collapse border border-slate-500  py-4  text-gray-500">
        //                                         Grand Total
        //                                     </td>

        //                                     <td class=" border-collapse border border-slate-500  py-4">
        //                                         <div class="text-sm text-gray-500"></div>
        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4 text-sm text-gray-500">

        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">

        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">
        //                                         AED4.70
        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">

        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">
        //                                         AED0.34
        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">
        //                                         AED5.00
        //                                     </td>
        //                                     <td class=" border-collapse border border-slate-500  py-4">
        //                                         AED5.00
        //                                     </td>
        //                                 </tr>
        //                             </div>
        //                         </tbody>
        //                     </table>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </body>

        // </html>
        //     `

        // }
        const pdfBuffer = await html_to_pdf.generatePdf(file, options)
        console.log("pdfBuffer", pdfBuffer)
        const body = JSON.parse(req.body)
        // const body = req.body
        console.log("body", body)
        const message = `
            ProductName: ${body[0].ProductName.en}\r\n
        Qty:${body[0].qty} \r\n
        Price:${body[0].Price} `
        fs.readFile(('invoice.pdf'), async (err, datas) => {
            console.log("datas", datas)
            const data = {
                from: 'travo.socialmedia@gmail.com',
                // replyTo: 'travo.socialmedia@gmail.com',
                // subject: "Invoice",
                // text: message
                template_id: 'd-3039277b3eca416aa5b730a5e75a6ba1',
                personalizations: [
                    {
                        to: 'mohammedhafizba@gmail.com',
                        // to: 'anandhu@rough-paper.com',
                        dynamic_template_data: {
                            orderDetails: "invoice",
                            greeting: message
                        },

                    },
                ],
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





        // let ordered_coupons = []
        // let donated_coupons = []
        // let coupons = []
        // console.log(intiated_orders)
        // await map(initiated_orders.data.cart, async (order, index) => {
        //     coupons.push({ product_id: JSON.parse(order).id, product_coupons: [], product_qty: JSON.parse(order).qty })
        //     for (let i = 1; i <= JSON.parse(order).qty; i++) {
        //         ordered_coupons.push(`KUKU${ String(completed_orders.count + 1).padStart(7, '0') } -${ ordered_coupons.length + 1 } O`)
        //         coupons[index].product_coupons.push(`KUKU${ String(completed_orders.count + 1).padStart(7, '0') } -${ ordered_coupons.length } O`)
        //         if (JSON.parse(order).donate === "true") {
        //             donated_coupons.push(`KUKU${ String(completed_orders.count + 1).padStart(7, '0') } -${ ordered_coupons.length } D`)
        //             coupons[index].product_coupons.push(`KUKU${ String(completed_orders.count + 1).padStart(7, '0') } -${ ordered_coupons.length } D`)
        //         }
        //     }
        // })

        // const { data, error } = await supabase
        //     .from('completed_orders')
        //     .insert([
        //         {
        //             coupons,
        //             user_id: initiated_orders.data.user_id,
        //             transaction_number: completed_orders.count + 1
        //         },
        //     ])
        // console.log("final", data, error)

        // let profile = await supabase
        //     .from('profiles')
        //     .select('promo_codes_used')
        //     .eq("id", initiated_orders.data.user_id)

        // let promo_codes_used = profile.data[0].promo_codes_used
        // promo_codes_used.push(initiated_orders.data.promo_code_used)

        // const updated_promo_codes = await supabase
        //     .from('profiles')
        //     .update({ promo_codes_used: promo_codes_used })
        //     .eq('id', initiated_orders.data.user_id)
        // console.log("updated promo code", updated_promo_codes)

        return res.send({ success: true, message: 'request has been made' })
    }
}

export default Handler 