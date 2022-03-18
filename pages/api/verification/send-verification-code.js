const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'POST') {
        console.log(req.body)
        client.verify.services('VA9c35e8f467b51d0b2d49f3cc26f69718')
             .verifications
             .create({locale: req.body.lang === 'ar' ? 'ar' : 'en-GB', to: `+${req.body.phoneNumber}`, channel: 'sms'})
             .then(verification => console.log(verification));
        return res.send({ success: true })
    }
}
