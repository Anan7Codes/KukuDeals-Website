import { createClient } from '@supabase/supabase-js'

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY
const supabase = createClient(supabaseUrl, supabaseSecretKey)

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'POST') {
        console.log(req.body)
        client.verify.services('VA9c35e8f467b51d0b2d49f3cc26f69718')
            .verificationChecks
            .create({to: `+${req.body.phoneNumber}`, code: req.body.code})
            .then(async (verification_check) => {
                if(verification_check.status === 'approved') {
                    const { error } = await supabase
                        .from('phone_numbers')
                        .update({ number: verification_check.to })
                        .eq('id', req.body.uid)
                    if(error) return res.json({ success: false })
                    return res.send({ success: true })
                }
            });
    }
}