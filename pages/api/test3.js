import { createClient } from '@supabase/supabase-js'
import { map } from 'modern-async'
const mail = require('@sendgrid/mail')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY
const supabase = createClient(supabaseUrl, supabaseSecretKey)
const Pdfmake = require('pdfmake');
const fonts = require('pdfmake/build/vfs_fonts.js');
const fontsDesc = {
    Roboto: {
        normal: Buffer.from(fonts.pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
        bold: Buffer.from(fonts.pdfMake.vfs['Roboto-Medium.ttf'], 'base64'),
        italics: Buffer.from(fonts.pdfMake.vfs['Roboto-Italic.ttf'], 'base64'),
        bolditalics: Buffer.from(fonts.pdfMake.vfs['Roboto-Italic.ttf'], 'base64'),
    }
};
let pdfmake = new Pdfmake(fontsDesc);

let customerName, amount, display

mail.setApiKey(process.env.SENDGRID_API_KEY)

const Handler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.send({ success: false, message: 'Wrong request made' })
    }
    if (req.method === 'GET') {
        let initiated_orders = await supabase
            .from('initiated_orders')
            .select('*')
            // .eq("verification_secret", charge.payment_intent)
            .eq("verification_secret", "pi_3KcUWVLSsCUq84XE13Qwhe5w")
            .eq("status", true)
            .single()
        // console.log("initiated_orders", initiated_orders)
        if (initiated_orders.data.promo_code_used === null) {
            amount = initiated_orders.data.amount
        } else {
            amount = initiated_orders.data.final_amount
        }
        let coupons = [
            {
              product_id: 'ec3e130d-766e-4f3f-ace2-50ffee8ae458',
              product_coupons: [ 'KUKU0000012-1O', 'KUKU0000012-1D' ],
              product_qty: 1,
              product_price: 15,
              name: 'Zorno Pencil/AED 10,000 Cash'
            },
            {
              product_id: '998895d2-a6aa-404a-9f60-76880b8c2273',
              product_coupons: [
                'KUKU0000012-2O',
                'KUKU0000012-2D',
                'KUKU0000012-3O',
                'KUKU0000012-3D',
                'KUKU0000012-4O',
                'KUKU0000012-4D'
              ],
              product_qty: 3,
              product_price: 50,
              name: 'Zorno Pencil/AED 10,000 Cash'
            },
            {
              product_id: 'a415a869-6ebe-4d67-901c-b92b7e02dbac',
              product_coupons: [ 'KUKU0000012-5O', 'KUKU0000012-5D' ],
              product_qty: 1,
              product_price: 55,
              name: 'Zorno Pencil/AED 10,000 Cash'
            }
        ]

        const header1 = `
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
                    <h6 class="font-bold">Customer Name: <span class=" font-medium">Test</span></h6>
                </div>
                <h6 class="font-bold">Address : <span class=" font-medium"> United Arab Emirates</span></h6>
            </div>
            <div class="">
                <div>
                    <h6 class="font-bold">Invoice No : <span class=" font-medium">1</span></h6>
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
                </td>np
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
        var headers = {
            fila_0: {
                col_1: { text: 'SL', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
                col_2: { text: 'Product(s)', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
                col_3: { text: 'Quantity', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
                col_4: { text: 'UnitPrice', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
                col_5: { text: 'Amount Excluding Tax', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
                col_6: { text: 'Tax Rate %', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
                col_7: { text: 'Amount Including Tax', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
            },
            fila_1: {
            }
        }
        var rows = coupons

        var body = [];
        for (var key in headers) {
            if (headers.hasOwnProperty(key)) {
                var header = headers[key];
                var row = new Array();
                row.push(header.col_1);
                row.push(header.col_2);
                row.push(header.col_3);
                row.push(header.col_4);
                row.push(header.col_5);
                row.push(header.col_6);
                row.push(header.col_7);
                body.push(row);
            }
        }
        for (var i = 0; i < rows.length; i++) {
            var row = new Array();
            console.log(i)
            row.push(i + 1)
            console.log("check", rows[i].product_price.toString())

            // row.push(rows[i].name.toString());
            // row.push(rows[i].product_qty.toString());
            // row.push(`AED${rows[i].product_price.toString()}`);
            // row.push(`AED${rows[i].product_price.toString() * rows[i].product_qty.toString() * 0.95}`);
            // row.push("5%");
            // row.push(`AED${rows[i].product_price.toString() * rows[i].product_qty.toString()}`);
            // body.push(row);

            row.push({ text: rows[i].name.toString(), style: 'tableValue' });
            row.push({ text: rows[i].product_qty.toString(), style: 'tableValue' });
            row.push({ text: `AED${rows[i].product_price.toString()}`, style: 'tableValue' });
            row.push({
                text: `AED${rows[i].product_price.toString() * rows[i].product_qty.toString() * 0.95}`,
                style: 'tableValue'
            });
            row.push({ text: "5%", style: 'tableValue' });
            row.push({
                text: `AED${rows[i].product_price.toString() * rows[i].product_qty.toString()}`,
                style: 'finalAmount'
            });
            body.push(row);
        }


        const document = {
            pageMargins: [40, 155, 40, 55],
            pageOrientation: 'landscape',
            header: {
                columns: [
                    {
                        image:
                            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB88AAAL3CAYAAAAEDAQ1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAGymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA1LTA5VDE4OjQ3OjUyKzA0OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMS0xM1QxMToxMTo0NyswNDowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wMS0xM1QxMToxMTo0NyswNDowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowNGY2ODgxMy1kNDJjLWZlNDAtOGM4ZC00MmQwMWZlZDk3ZjMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5NTFlN2E5MS1hMTI2LTFlNDQtYjk1MS01ZDRlYzI1MzhkMzgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5NGJmNDU4YS00NGRhLThiNGMtOTNmZS1kMGIyYjNlYWFkZWIiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjk0YmY0NThhLTQ0ZGEtOGI0Yy05M2ZlLWQwYjJiM2VhYWRlYiIgc3RFdnQ6d2hlbj0iMjAyMS0wNS0wOVQxODo0Nzo1MiswNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpmZmQ3MjhjZC03Y2M4LTU4NDUtYmNlMy0zNzM4OGY1OTg0MmMiIHN0RXZ0OndoZW49IjIwMjEtMDktMjhUMDU6Mzg6MjYrMDQ6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MDRmNjg4MTMtZDQyYy1mZTQwLThjOGQtNDJkMDFmZWQ5N2YzIiBzdEV2dDp3aGVuPSIyMDIyLTAxLTEzVDExOjExOjQ3KzA0OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+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',
                        width: 120,
                        style: 'documentHeaderLeft'
                    },
                    // {
                    //     text: 'Shivon General Trading LLC\nBur Dubai, Dubai\n',
                    //     style: 'documentHeaderCenter'
                    // },

                    { text: 'TAX INVOICE ', style: 'documentHeaderRightFirst' },
                    { text: 'Shivon General Trading LLC\nBur Dubai, Dubai\n', style: 'documentHeaderRightSecond' }
                ]
            },
            footer: function (currentPage, pageCount) {
                return { text: "support@kukudeals.com | 08909090 | www.kukudeals.com" ,
                alignment: 'center', margin: [0, 30, 0, 0] ,color:"#674736"};
            },
            content: [
                '\n\n\n\n',
                {
                    columns: [
                        {
                            text: 'Customer Name:',
                            style: 'invoiceSubTitle',
                            alignment: 'left',
                            margin: [0, -120, 0, 0]
                        },
                        {
                            text: "Customer name",
                            style: 'invoiceSubValue',
                            alignment: 'left',
                            margin: [-102, -120, 0, 0]
                        },
                        {
                            text: 'Invoice No :',
                            style: 'invoiceSubTitle',
                            alignment: 'right',
                            margin: [0, -120, -60, 0]
                        },
                        {
                            text: "000000001",
                            style: 'invoiceSubValue',
                            alignment: 'right',
                            margin: [0, -120, 80, 0]
                        },
                    ]
                },
                {
                    columns: [
                        {
                            text: 'Email :',
                            style: 'invoiceSubTitle',
                            alignment: 'left',
                            margin: [0, -100, 0, 0]
                        },
                        {
                            text: "mohammedhafiz@gmail.com",
                            style: 'invoiceSubValue',
                            alignment: 'left',
                            margin: [-156, -100, 0, 0]
                        },
                        {
                            text: 'Invoice Date :',
                            style: 'invoiceSubTitle',
                            alignment: 'right',
                            margin: [0, -100, -69, 0]
                        },
                        {
                            text: new Date().toLocaleString(),
                            style: 'invoiceSubValue',
                            alignment: 'right',
                            margin: [0, -100, 0, 0]
                        },
                    ]
                },
                {
                    columns: [

                        {
                            text: 'Order Status:',
                            style: 'invoiceSubTitle',
                            alignment: 'right',
                            margin: [0, -80, -266, 0]
                        },
                        {
                            text: 'Completed',
                            style: 'invoiceSubValue',
                            alignment: 'right',
                            margin: [0, -80, 65, 0]
                        },

                    ]
                },
                '\n\n',
                {
                    style: 'tableExample',
                    table: {
                        widths: [40, 200, '*', '*', '*', '*', '*'],
                        headerRows: 2,
                        // keepWithHeaderRows: 1,
                        body: body
                    }
                },
                {
                    table: {
                        headerRows: 0,
                        widths: ['*', 80],

                        body: [

                            [
                                {
                                    text: 'ORDER STATUS',
                                    style: 'itemsFooterSubTitle'
                                },
                                {
                                    text: 'GRAND TOTAL',
                                    style: 'itemsFooterSubValue'
                                }
                            ],

                            [
                                {
                                    text: 'COMPLETED',
                                    style: 'itemsFooterTotalTitle'
                                },
                                {
                                    text: "AED 500",
                                    style: 'itemsFooterTotal'
                                }
                            ],
                        ]
                    },
                    layout: 'lightHorizontalLines'
                },
            ],
            styles: {
                documentHeaderLeft: {
                    fontSize: 10,
                    margin: [35, 15, 15, 15],
                    alignment: 'left'
                },
                documentHeaderCenter: {
                    fontSize: 10,
                    margin: [75, 15, 15, 15],
                    alignment: 'center'
                },
                documentHeaderRightFirst: {
                    fontSize: 20,
                    margin: [15, 15, -320, 15],
                    alignment: 'right',
                    bold: true,
                },
                documentHeaderRightSecond: {
                    fontSize: 10,
                    margin: [15, 40, 40, 15],
                    alignment: 'right',
                    bold: true,
                },
                // Invoice Title
                invoiceTitle: {
                    fontSize: 22,
                    bold: true,
                    alignment: 'right',
                    margin: [0, 0, 0, 15]
                },
                // Invoice Details
                invoiceSubTitle: {
                    fontSize: 12,
                    alignment: 'right'
                },
                invoiceSubValue: {
                    fontSize: 12,
                    alignment: 'right'
                },
                // Items Footer (Subtotal, Total, Tax, etc)
                itemsFooterSubTitle: {
                    margin: [20,55, 0, 5],
                    alignment: 'left',
                    fillColor: '#F0E2B6',
                },
                itemsFooterSubValue: {
                    margin: [-40, 55, -20, 5],
                    bold: true,
                    alignment: 'left',
                    fillColor: '#F0E2B6',
                },
                tableExample: {
                    margin: [0, -60, 0, 50],
                    alignment: 'center',

                },
                itemsFooterTotalValue: {
                    margin: [0, 5, 0, 5],
                    bold: true,
                    alignment: 'center',
                },
                itemsFooterTotalTitle:{
                     margin: [20, 10, 0, 105],
                      bold: true,
                      alignment: 'left',
                      color:'green',
                      fontSize: 25,
                      fillColor: '#F0E2B6',

                },
                finalAmount:{
                     margin: [0, 5, 0, 5],
                      bold: true,
                      alignment: 'center',
                      color:'#E0A526',
                },
                tableValue:{
                     margin: [0, 5, 0, 5],
                      alignment: 'center',
                },
                itemsFooterTotal:{
                     fontSize: 25,
                     margin: [-40, 5, -20, 5],
                      bold: true,
                      alignment: 'left',
                      fillColor: '#F0E2B6',
                      
                },
                center: {
                    alignment: 'center',
                },
            },
            defaultStyle: {
                columnGap: 20,
            }
        }
        console.log("doc", document)
        console.log('start pdf')
        try {
            let pdfDoc = await pdfmake.createPdfKitDocument(document);
            var chunks = [];
            var result, buffer;
            pdfDoc.on('data', function (chunk) {
                console.log("Chunks")
                chunks.push(chunk);
            });
            pdfDoc.on('end', async function () {
                console.log("12")
                result = Buffer.concat(chunks);
                buffer = 'data:application/pdf;base64,' + result.toString('base64')
                const data1 = {
                    from: 'KukuDeals <no-reply@kukudeals.com>',
                    templateId: 'd-7ea5058b9a69441b961d23407bc143d3',
                    personalizations: [
                        {
                            to: ['anandhu@rough-paper.com','mohammedhafizba@gmail.com'],
                            subject: 'Order Confirmation',
                            dynamicTemplateData: {
                                transactionNumber: `KUKU${String(7 + 1).padStart(7, '0')}`,
                                purchaseDate: `${new Date().toLocaleString()}`,
                                totalBeforeVat: `AED ${(amount*0.95).toString()}`,
                                vatAmount: `AED ${(amount*0.05).toString()}`,
                                total: `AED ${(amount).toString()}`,
                            }
                        },
                    ],
                    // content: [{ type: "text/html", value: image + header1 + body1 + footer },],
                    // content: [{"type": "text/html", "value": document.toString() }],
                    attachments: [
                        {
                            content: result.toString('base64'),
                            filename:`KUKU${String(7 + 1).padStart(7, '0')}.pdf`,
                            type: 'application/pdf',
                            disposition: 'attachment',
                            content_id: 'mytext',
                        },
                    ],
                }
                try {
                    const resp = await mail.send(data1)
                    console.log(resp)
                } catch (err){
                    return res.status(401).json({ status: 'Email sending failed' });
                }           
            });
            pdfDoc.end();
        } catch (err) {
            console.log("Catch Error")
            return res.json({status: 'Failed'})
        }
        
        return res.status(200).json({ status: 'OK' });

    }
}

export default Handler