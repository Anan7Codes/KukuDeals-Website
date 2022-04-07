const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_KEY, url: 'https://api.eu.mailgun.net'});

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'POST') {
        const data = {
            from: "Contact Website <contact@kukudeals.com>",
            to: `support@kukudeals.com`,
            subject: "Form from website",
            html: `<div>Full Name: ${req.body.fullname}<br/>Email: ${req.body.email}<br/>Message: ${req.body.message}</div>`
        }
        try {
            await mg.messages.create("kukudeals.com", data)
            .then((res) => {
                console.log("Email Delivery", res)
            })
            return res.json({ success: true })
        } catch (e) {
            console.log("Contact form error", e)
            return res.json({ success: false })
        }
    }
}