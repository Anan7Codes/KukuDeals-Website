const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { map } from 'modern-async'
import { createClient } from '@supabase/supabase-js'
const fs = require('fs')
// fs.readFile('font/roboto/Roboto/Roboto-Black.ttf', (err, data) => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log(data)
// })
const RobotoBlack = fs.readFile('font/roboto/Roboto/Roboto-Black.ttf')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY
const supabase = createClient(supabaseUrl, supabaseSecretKey)
const fonts = {
  Roboto: {
    normal: RobotoBlack,
    bold: '/font/roboto/Roboto/Roboto-Medium.ttf',
    italics: '/font/roboto/Roboto/Roboto-Italic.ttf',
    bolditalics: '/font/roboto/Roboto/Roboto-MediumItalic.ttf'
}
};

export default async function handler(req, res) {
	if (req.method === 'GET') {
    return res.json({ fonts })
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}