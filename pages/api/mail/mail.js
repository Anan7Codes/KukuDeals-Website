
const mail = require('@sendgrid/mail')
mail.setApiKey(process.env.SENDGRID_API_KEY)
const fs = require('fs')
var html_to_pdf = require('html-pdf-node');
const invoice = fs.readFileSync('./test/invoice.html', 'utf-8')


let options = { format: 'A3' ,path: './invoice.pdf'};
let file = { content: invoice };
// let file = { content:
//     <div>
//     <span class="text-base font-bold text-gray-700">
//     Tax Invoice
// </span>
//    <span class="text-xs">
//    Address: Box Park, Al Wasl Rd, Dubai
// </span>
// <span class="text-xs">
//    TRN: 1008786483676343
// </span>
// </div>

//     };
// html_to_pdf.generatePdf(file, options).then(pdfBuffer => {
//     console.log("PDF Buffer:-", pdfBuffer);
//     console.log("options",options)
//   });
  


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

