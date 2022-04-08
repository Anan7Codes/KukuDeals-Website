import { createClient } from '@supabase/supabase-js'
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_KEY, url: 'https://api.eu.mailgun.net'});
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

const supabase = createClient(supabaseUrl, supabaseSecretKey)

const webhookHandler = async (req, res) => {

    const rows = {
        product_price: 3,
        product_qty: 1 
    }

    console.log("1st", rows.product_price.toString())
    console.log("2st", (rows.product_price * rows.product_qty * 0.95).toFixed(2).toString())
    console.log("3st", (rows.product_price* rows.product_qty * 0.05).toFixed(2).toString())
    console.log("4st", (rows.product_price * rows.product_qty).toFixed(2).toString())
    return res.json({
        success: true
    })
//     const coupons = [
//         {product_id:"a57e5c22-a0c7-4fd7-84eb-0b7b5f85ab8d",product_coupons:["KUKU00006-20220407-1O","KUKU00006-20220407-1D"],product_qty:1,product_price:10,name:"Artistic Graphite Pencil/Apple iphone 13",image:"https://jipvpsiwfwiyqyxpssli.supabase.in/storage/v1/object/public/campaigns/iphone13-draw.webp",donated:true,purchase_date:"Apr 7, 2022"},
//         {product_id:"b0791f6f-ca97-42b8-b715-c843b4b7b666",product_coupons:["KUKU00006-20220407-2O","KUKU00006-20220407-2D","KUKU00006-20220407-2E"],product_qty:1,product_price:3,name:"EarlyBird/EarlyBird",image:"https://jipvpsiwfwiyqyxpssli.supabase.in/storage/v1/object/public/campaigns/5kgold-crypto.webp",donated:true,purchase_date:"Apr 7, 2022"}
//     ]

//     var headers = {
//         fila_0: {
//             col_1: { text: 'SL', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [0, 10, 0, 0] },
//             col_2: { text: 'Product(s)', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
//             col_3: { text: 'Quantity', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
//             col_4: { text: 'UnitPrice', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
//             col_5: { text: 'Amount Excluding Tax', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
//             col_6: { text: 'Tax Rate %', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
//             col_7: { text: 'Tax Payable ', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
//             col_8: { text: 'Amount Including Tax', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },           
//         },
//         fila_1: {
//         }
//     }
//     var rows = coupons

//     var body = [];
//     for (var key in headers) {
//         if (headers.hasOwnProperty(key)) {
//             var header = headers[key];
//             var row = new Array();
//             row.push(header.col_1);
//             row.push(header.col_2);
//             row.push(header.col_3);
//             row.push(header.col_4);
//             row.push(header.col_5);
//             row.push(header.col_6);
//             row.push(header.col_7);
//             row.push(header.col_8);
//             body.push(row);
//         }
//     }
//     for (var i = 0; i < rows.length; i++) {
//         var row = new Array();
//         console.log(i)
//         row.push({text:(i + 1),style:'tableValue'})
//         row.push({ text: rows[i].name.toString(), style: 'tableValue' });
//         row.push({ text: rows[i].product_qty.toString(), style: 'tableValue' });
//         row.push({ text: `AED${rows[i].product_price.toString()}`, style: 'tableValue' });
//         row.push({
//             text: `AED${rows[i].product_price.toString() * rows[i].product_qty.toString() * 0.95}`,
//             style: 'tableValue'
//         });
//         row.push({ text: "5%", style: 'tableValue' });
//         row.push({text:`AED${rows[i].product_price* rows[i].product_qty * 0.05}`,style:'tableValue'});
//         row.push({
//             text: `AED${rows[i].product_price.toString() * rows[i].product_qty.toString()}`,
//             style: 'finalAmount'
//         });
//         body.push(row);
//     }

//     const document = {
//         pageMargins: [30, 155, 40, 55],
//         pageOrientation: 'portrait',
//         format: 'A4',
//         header: {
//             columns: [
//                {

//                 width: 120,
//                 style: 'documentHeaderLeft'
//             },
//             { text: 'TAX INVOICE ', style: 'documentHeaderRightFirst' },
//             { text: 'Shivon General Trading LLC\nBur Dubai, Dubai\n', style: 'documentHeaderRightSecond' },                    ]
//         },
//     footer: function (currentPage, pageCount) {
//         return { text: "support@kukudeals.com | 08909090 | www.kukudeals.com" ,alignment: 'center', margin: [0, 30, 0, 0] ,color:"#674736"};

//     },
//     content: [
//         '\n\n\n\n',
//         {
//             columns: [
                
//             {
//                 text: 'Customer Name:',
//                 style: 'invoiceSubTitle',
//                 alignment: 'left',
//                 margin: [0, -110, 0, 0]
//             },
//                 {
//                     text: 'Anandhu',
//                     style: 'invoiceSubValue',
//                     alignment: 'left',
//                     margin: [-76, -110, 0, 0]
//                 },
//                 {
//                     text: 'Invoice No: ',
//                     style: 'invoiceSubTitle',
//                     alignment: 'right',
//                     margin: [0, -110, 24, 0]
//                 },
//                 {
//                     text: `00040-20220312`,
//                     style: 'invoiceSubValue',
//                     alignment: 'right',
//                     margin: [-42, -110, 105, 0]
//                 },
//             ]
//         },
//         {
//             columns: [
//                 {
//                     text: 'Email: ',
//                     style: 'invoiceSubTitle',
//                     alignment: 'left',
//                     margin: [0, -90, 0, 0]
//                 },
//                 {
//                     text: "anan07dhU@outlook.com",
//                     style: 'invoiceSubValue',
//                     alignment: 'left',
//                     margin: [-101, -90, 0, 0]
//                 },
//                 {
//                     text: 'Invoice Date: ',
//                     style: 'invoiceSubTitle',
//                     alignment: 'right',
//                     margin: [0, -90, -78, 0]
//                 },
//                 {
//                     text: "2020/12/12",
//                     style: 'invoiceSubValue',
//                     alignment: 'right',
//                     margin: [0, -90, -9, 0]
//                 },
//             ]
//         },
//         {
//             style: 'tableExample',
//             table: {
//                 widths: [24, 100, '*', '*', '*', '*', '*','*'],
//                 headerRows: 2,
//                 // keepWithHeaderRows: 1,
//                 body: body
//             }
//         },
//         {
//             table: {
//                 headerRows: 0,
//                 widths: [442, 80],

//                 body: [
//                     [
//                         {
//                             text: 'GRAND TOTAL',
//                             style: 'itemsFooterTotalTitle'
//                         },
//                         {
//                             text: `AED 123`,
//                             style: 'itemsFooterTotal'
//                         }
//                     ],
//                 ]
//             },
//             layout: 'lightHorizontalLines'
//         },
//     ],
//     styles: {
//         documentHeaderLeft: {
//             fontSize: 10,
//             margin: [25, 15, 15, 15],
//             alignment: 'left'
//         },
//         documentHeaderCenter: {
//             fontSize: 10,
//             margin: [75, 15, 15, 15],
//             alignment: 'center'
//         },
//         documentHeaderRightFirst: {
//             fontSize: 18,
//             margin: [15, 16, -220, 15],
//             alignment: 'right',
//             bold: true,
//         },
//         documentHeaderRightSecond: {
//             fontSize: 8,
//             margin: [15, 40, 19, 15],
//             alignment: 'right',
//             bold: true,
//         },
//         documentHeaderRight: {
//             fontSize: 10,
//             margin: [15, 15, 30, 15],
//             alignment: 'right',
//             bold: true,

//         },
//         // Invoice Title
//         invoiceTitle: {
//             fontSize: 22,
//             bold: true,
//             alignment: 'right',
//             margin: [0, 0, 0, 15]
//         },
//         // Invoice Details
//         invoiceSubTitle: {
//             fontSize: 12,
//             alignment: 'right'
//         },
//         invoiceSubValue: {
//             fontSize: 12,
//             alignment: 'right'
//         },
//         // Items Footer (Subtotal, Total, Tax, etc)
//         itemsFooterSubTitle: {
//             margin: [20,55, 0, 5],
//             alignment: 'left',
//             fillColor: '#F0E2B6',
//         },
//         itemsFooterSubValue: {
//             margin: [-20, 55, -20, 5],
//             bold: true,
//             alignment: 'left',
//             fillColor: '#F0E2B6',
//         },
//         tableExample: {
//             margin: [0, -60, 0, 50],
//             fontSize: 9,
//             alignment: 'center',

//         },
//         itemsFooterTotalValue: {
//             margin: [0, 5, 0, 5],
//             bold: true,
//             alignment: 'center',
//         },
//         itemsFooterTotalTitle:{
//             margin: [0, -30, 0, 40],
//                 bold: true,
//                 alignment: 'left',
//             //   color:'green',
//                 fontSize: 20,
//             //   fillColor: '#F0E2B6',

//         },
//         finalAmount:{
//             margin: [0, 5, 0, 5],
//                 bold: true,
//                 alignment: 'center',
//                 color:'#E0A526',
//         },
//         tableValue:{
//             margin: [0, 5, 0, 5],
//                 alignment: 'center',
//         },
//         itemsFooterTotal:{
//             fontSize: 20,
//             margin: [-20, -30, -10, 5],
//                 bold: true,
//                 alignment: 'right',
//             //   fillColor: '#F0E2B6',
                
//         },
//         center: {
//             alignment: 'center',
//         },
//     },
//     defaultStyle: {
//         columnGap: 20,
//     }
// }
//     console.log('start pdf')
//     let pdfDoc = await pdfmake.createPdfKitDocument(document);
//     var chunks = [];
//     var result
//     pdfDoc.on('data', function (chunk) {
//         chunks.push(chunk);
//     });
//     pdfDoc.on('end', async function () {
//         result = Buffer.concat(chunks);      
//         const data = {
//             from: 'KukuDeals <no-reply@kukudeals.com>',
//             to: `anandhu@rough-paper.com`,
//             subject: `00040-20220312تأكيد الطلب - ` ,
//             template: 'receipt',
//             'h:X-Mailgun-Variables': JSON.stringify({
//                 name: "name_Value",
//                 transactionNumber: "transactionNumber_Value",
//                 purchaseDate: "purchaseDate_Value",
//                 totalBeforeVat: "totalBeforeVat_Value",
//                 vatAmount: "vatAmount_Value",
//                 total: "total_Value",
//                 coupons: [
//                     {
//                         name: "name_Value",
//                         purchase_date: "purchase_date_Value",
//                         product_coupons: [
//                             "product_coupons_1",
//                             "product_coupons_2",
//                             "product_coupons_3"
//                         ]
//                     }
//                 ],
//             }),
//             attachment: [{
//                 data: result,
//                 filename: "TEst"
//             }]
//         }; 
//         try {            
//             await mg.messages.create("kukudeals.com", data)
//             .then((res) => {
//                 console.log("Email Delivery", res)
//             })
//         } catch(e) {
//             return res.json({ success: false, message: "Email did not deliver" })
//         }
//     });
//     pdfDoc.end();
    // try {
    //     const data = {
    //         from: 'KukuDeals <no-reply@kukudeals.com>',
    //         to: 'anandhu@rough-paper.com',
    //         subject: 'Hello',
    //         template: 'receipt-arabic',
    //         'h:X-Mailgun-Variables': JSON.stringify({
    //             name: "name_Value",
    //             transactionNumber: "transactionNumber_Value",
    //             purchaseDate: "purchaseDate_Value",
    //             totalBeforeVat: "totalBeforeVat_Value",
    //             vatAmount: "vatAmount_Value",
    //             total: "total_Value",
    //             coupons: [
    //                 {
    //                     name: "name_Value",
    //                     purchase_date: "purchase_date_Value",
    //                     product_coupons: [
    //                         "product_coupons_1",
    //                         "product_coupons_2",
    //                         "product_coupons_3"
    //                     ]
    //                 }
    //             ],
    //         })
    //     };
    //     await mg.messages().send(data, function (error, body) {
    //         console.log(body);
    //         console.log(error)
    //     });
    // } catch(e) {
    //     return res.json({ success: false, message: "Email did not deliver" })
    // }
    // let initiated_orders = await supabase
    //     .from('initiated_orders')
    //     .select('*')
    //     .eq("verification_secret", "pi_3KkoYULSsCUq84XE0bVGamY5")
    //     // .eq("status", true)
    //     .single()
    // let completed_orders = await supabase
    //     .from('completed_orders')
    //     .select('*', { count: 'exact' })

    // let ordered_coupons = []
    // let donated_coupons = []
    // let earlybird_coupons = []
    // let coupons = []

    // await map(initiated_orders.data.cart, async (order, index) => {
    //     coupons.push({ product_id: JSON.parse(order).id, product_coupons: [], product_qty: JSON.parse(order).qty, product_price: JSON.parse(order).Price, name: JSON.parse(order).ProductName.en + "/" + JSON.parse(order).GiftName.en, image: JSON.parse(order).Image, donated: JSON.parse(order).donate, purchase_date: `${moment(new Date().toLocaleString()).format('ll')}`})

    //     let earlybirdcampaign = await supabase
    //         .from('campaigns')
    //         .select('EarlyBirdValue, EarlyBirdFrequency')
    //         .eq("id", JSON.parse(order).id)
    //         .single()
    //     const timediff = moment(new Date(JSON.parse(order).created_at)).add(earlybirdcampaign.data.EarlyBirdValue, earlybirdcampaign.data.EarlyBirdFrequency).diff(new Date())
    //     console.log("timediff", timediff, "id", JSON.parse(order).id)

    //     for (let i = 1; i <= JSON.parse(order).qty; i++) {
    //         ordered_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(5, '0')}-${moment(new Date().toLocaleString()).format('YYYYMMDD')}-${ordered_coupons.length + 1}O`)
    //         coupons[index].product_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(5, '0')}-${moment(new Date().toLocaleString()).format('YYYYMMDD')}-${ordered_coupons.length}O`)

    //         if (JSON.parse(order).donate === "true") {
    //             donated_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(5, '0')}-${moment(new Date().toLocaleString()).format('YYYYMMDD')}-${ordered_coupons.length}D`)
    //             coupons[index].product_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(5, '0')}-${moment(new Date().toLocaleString()).format('YYYYMMDD')}-${ordered_coupons.length}D`)
    //         }

    //         if(timediff > 0) {
    //             earlybird_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(5, '0')}-${moment(new Date().toLocaleString()).format('YYYYMMDD')}-${ordered_coupons.length}E`)
    //             coupons[index].product_coupons.push(`KUKU${String(completed_orders.count + 1).padStart(5, '0')}-${moment(new Date().toLocaleString()).format('YYYYMMDD')}-${ordered_coupons.length}E`)
    //         }
    //         if(earlybirdcampaign.error) return res.send({ success: false, message: "Fetching early bird values wrong", error })
    //     }        
    // })

    // return res.json({
    //     success: true,
    //     coupons
    // })
}

export default webhookHandler