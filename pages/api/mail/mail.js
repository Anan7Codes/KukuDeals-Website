
const mail = require('@sendgrid/mail')
mail.setApiKey(process.env.SENDGRID_API_KEY)
const fs = require('fs')
var html_to_pdf = require('html-pdf-node');
const invoice = fs.readFileSync('./test/invoice.html', 'utf-8')


let options = { format: 'A3' ,path: './invoice.pdf'};
// let file = { content: invoice };
let file = { content:
    `
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
                <!-- <div class="flex items-center w-28 h-10 relative cursor-pointer"> -->
                <!-- <img src="file:///C:/Users/hp/Desktop/KukuLogos&Icons/kuku%20deals%20logo%20file%20variants-1.png" -->
                <img src="https://i.postimg.cc/hGy4v1JQ/kukudealslogo-black.png"
                    class="flex items-center w-28 h-10 relative cursor-pointer" layout="fill" alt="kuku logo" />
                <!-- </div> -->
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
                            <tr class="border-collapse border border-slate-500 whitespace-nowrap ">
                                <td class=" border-collapse border border-slate-500  py-4 text-sm text-gray-500">
                                    1
                                </td>
                                <td class="border-collapse border border-slate-500  py-4">
                                    <div class=" text-gray-900">
                                        Zorro Pencil
                                    </div>
                                </td>
                                <td class="border-collapse border border-slate-500  py-4">
                                    <div class=" text-gray-500">LS-003455</div>
                                </td>
                                <td class=" border-collapse border border-slate-500   py-4 text-sm text-gray-500">
                                    4
                                </td>
                                <td class=" border-collapse border border-slate-500   py-4">
                                    AED5.00
                                </td>
                                <td class=" border-collapse border border-slate-500   py-4">
                                    AED4.70
                                </td>
                                <td class=" border-collapse border border-slate-500   py-4">
                                    5%
                                </td>
                                <td class=" border-collapse border border-slate-500   py-4">
                                    AED0.34
                                </td>
                                <td class=" border-collapse border border-slate-500   py-4">
                                    AED5.00
                                </td>
                            </tr>

                            <div class="pt-5 text-xs ">
                                <tr class="whitespace-nowrap">
                                    <td class=" py-4 text-gray-500">

                                    </td>

                                    <td class=" py-4">
                                        <div class=" text-gray-500"></div>
                                    </td>
                                    <td class=" py-4 text-gray-500">
                                    </td>
                                    <td class=" py-4">

                                    </td>
                                    <td class=" py-4">

                                    </td>
                                    <td class=" py-4">

                                    </td>
                                    <td class="  py-4">

                                    </td>
                                    <td class="  py-4">

                                    </td>
                                    <td class="  py-4">

                                    </td>
                                </tr>
                                <tr class="whitespace-nowrap">
                                    <td class=" border-collapse border border-slate-500  py-4 text-gray-500">
                                        Total
                                    </td>

                                    <td class=" border-collapse border border-slate-500  py-4">
                                        <div class=" text-gray-500"></div>
                                    </td>
                                    <td class=" border-collapse border border-slate-500  py-4 text-gray-500">
                                    </td>
                                    <td class=" border-collapse border border-slate-500  py-4">

                                    </td>
                                    <td class=" t  border-collapse border border-slate-500  py-4">
                                        AED4.70
                                    </td>
                                    <td class=" border-collapse border border-slate-500  py-4">

                                    </td>
                                    <td class="  border-collapse border border-slate-500  py-4">
                                        AED0.34
                                    </td>
                                    <td class="  border-collapse border border-slate-500  py-4">
                                        AED5.00
                                    </td>
                                    <td class="  border-collapse border border-slate-500  py-4">
                                        AED5.00
                                    </td>
                                </tr>


                                <tr class="whitespace-nowrap">
                                    <td class=" border-collapse border border-slate-500  py-4  text-gray-500">
                                        Pay using card
                                    </td>
                                    <td class=" border-collapse border border-slate-500  py-4">
                                        <div class="text-sm text-gray-500"></div>
                                    </td>
                                    <td class=" border-collapse border border-slate-500  py-4  text-gray-500">

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
                                        AED5.00
                                    </td>
                                    <td class=" border-collapse border border-slate-500  py-4">
                                        AED5.00
                                    </td>
                                </tr>


                                <tr class="whitespace-nowrap">
                                    <td class=" border-collapse border border-slate-500  py-4  text-gray-500">
                                        Pay using iPoints
                                    </td>

                                    <td class=" border-collapse border border-slate-500  py-4">
                                        <div class=" text-gray-500"></div>
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
                                        AED5.00
                                    </td>
                                </tr>
                                <tr class="whitespace-nowrap border-2 border-black">
                                    <td class=" border-collapse border border-slate-500  py-4  text-gray-500">
                                        Grand Total
                                    </td>

                                    <td class=" border-collapse border border-slate-500  py-4">
                                        <div class="text-sm text-gray-500"></div>
                                    </td>
                                    <td class=" border-collapse border border-slate-500  py-4 text-sm text-gray-500">

                                    </td>
                                    <td class=" border-collapse border border-slate-500  py-4">

                                    </td>
                                    <td class=" border-collapse border border-slate-500  py-4">
                                        AED4.70
                                    </td>
                                    <td class=" border-collapse border border-slate-500  py-4">

                                    </td>
                                    <td class=" border-collapse border border-slate-500  py-4">
                                        AED0.34
                                    </td>
                                    <td class=" border-collapse border border-slate-500  py-4">
                                        AED5.00
                                    </td>
                                    <td class=" border-collapse border border-slate-500  py-4">
                                        AED5.00
                                    </td>
                                </tr>
                            </div>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>

</html>
    ` 

    };

export default async function handler (req, res) {
    const pdfBuffer = await html_to_pdf.generatePdf(file, options)
    console.log("pdfBuffer",pdfBuffer)
    const body = JSON.parse(req.body)
    console.log("body", body)
    const message = `
    ProductName:${body[0].ProductName.en}\r\n
    Qty:${body[0].qty}\r\n
    Price:${body[0].Price}`
    fs.readFile(('invoice.pdf'),async(err, datas) => {
        console.log("datas",datas)
    const data = {
        from: 'travo.socialmedia@gmail.com',
        // replyTo: 'travo.socialmedia@gmail.com',
        // subject: "Invoice",
        // text: message
        template_id: 'd-3039277b3eca416aa5b730a5e75a6ba1',
        personalizations: [
            {
                // to: 'mohammedhafizba@gmail.com',
                to: 'anandhu@rough-paper.com',
                dynamic_template_data: {
                    orderDetails: "invoice",
                    greeting: message
                },

            },
        ],
        attachments: [
            {
                content:datas.toString('base64'),
                filename: 'invoice.pdf',
                type: 'application/pdf',
                disposition: 'attachment',
                content_id: 'mytext',
              },
          ],
        }
        const resp = await mail.send(data)
        res.status(200).json({ status: 'OK' });
})
}

