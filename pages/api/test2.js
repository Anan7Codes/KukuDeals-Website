const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { map } from 'modern-async'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY
const supabase = createClient(supabaseUrl, supabaseSecretKey)

export default async function handler(req, res) {
	if (req.method === 'GET') {
    let profile = await supabase
        .from('profiles')
        .select('promo_codes_used, name, email')
        .eq("id", "7033c330-1d82-469c-8bdf-78195936563c")
    console.log("profile",profile.data[0].name)
    return res.json({ profile })
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}