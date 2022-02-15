
const mail = require('@sendgrid/mail')
mail.setApiKey(process.env.SENDGRID_API_KEY)
export default (req, res) => {
    const body = JSON.parse(req.body)
    console.log("body", body)
    const message = `
    ProductName:${body[0].ProductName.en}\r\n
    Qty:${body[0].qty}\r\n
    Price:${body[0].Price}`
    const data = {
        from: 'travo.socialmedia@gmail.com',
        replyTo: 'travo.socialmedia@gmail.com',
        // subject: "Invoice",
        // text: message
        templateId:'d-3039277b3eca416aa5b730a5e75a6ba1 ',
        personlizations:{
            to: 'mohammedhafizba@gmail.com',
            dynamicTemplateData:{
                orderDetails:'invoice',
            },
        },
    }
    mail.send(data)
    res.status(200).json({ status: 'OK' });
}

