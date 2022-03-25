const mail = require('@sendgrid/mail')
mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'POST') {
        try {
            await mail.send({
                to: "kukudealsdev@kukudeals.com",
                from: "Contact Website <contact@kukudeals.com>",
                subject: "Form from website",
                html: `<div>Full Name: ${req.body.fullname}<br/>Email: ${req.body.email}<br/>Message: ${req.body.message}</div>`
            })
            return res.json({ success: true })
        } catch (e) {
            console.log("Contact form error", e)
            return res.json({ success: false })
        }
    }
}