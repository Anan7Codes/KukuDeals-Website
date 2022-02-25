const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { map } from 'modern-async'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY
const supabase = createClient(supabaseUrl, supabaseSecretKey)

const TotalPrice = async (cart) => {
    let total = 0
    let success = true
    let donated = true
    await map(cart, async (item) => {
        let { data, error } = await supabase
        .from('campaigns')
        .select('Price')
        .eq("id", item.id)
        if(error) return success = false
        total += data[0].Price * item.qty
        if(item.donate === 'false') {
            donated = false
        }
    })
    return { total, success, donated }
}

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
            const cart = [
                {
                  "DrawDate": "2022-03-03",
                  "GiftDescription": {
                    "ar": "10،000 درهم إماراتي نقدًا إذا كنت محظوظًا بما يكفي للفوز على ما أعتقد",
                    "en": "AED 10,000 Cash if you are lucky enough to win I guess",
                  },
                  "GiftName": {
                    "ar": "10،000 درهم كاش",
                    "en": "AED 10,000 Cash",
                  },
                  "Image": "https://jipvpsiwfwiyqyxpssli.supabase.in/storage/v1/object/public/campaigns/sampleproduct.png",
                  "Price": 50,
                  "ProductDescription": {
                    "ar": "Zorno Pencil هو قلم رصاص جيد للأطفال حتى سن 13 عامًا",
                    "en": "Zorno Pencil is a good pencil for kids until the age of 13",
                  },
                  "ProductName": {
                    "ar": "قلم رصاص زورنو",
                    "en": "Zorno Pencil",
                  },
                  "SoldOut": false,
                  "SoldOutCoupons": 131,
                  "TotalCoupons": 200,
                  "created_at": "2022-02-10T04:57:32+00:00",
                  "donate": "true",
                  "id": "998895d2-a6aa-404a-9f60-76880b8c2273",
                  "qty": 3,
                },
                {
                  "DrawDate": "2022-03-23",
                  "GiftDescription": {
                    "ar": "10،000 درهم إماراتي نقدًا إذا كنت محظوظًا بما يكفي للفوز على ما أعتقد",
                    "en": "AED 10,000 Cash if you are lucky enough to win I guess",
                  },
                  "GiftName": {
                    "ar": "10،000 درهم كاش",
                    "en": "AED 10,000 Cash",
                  },
                  "Image": "https://jipvpsiwfwiyqyxpssli.supabase.in/storage/v1/object/public/campaigns/sampleproduct.png",
                  "Price": 100,
                  "ProductDescription": {
                    "ar": "Zorno Pencil هو قلم رصاص جيد للأطفال حتى سن 13 عامًا",
                    "en": "Zorno Pencil is a good pencil for kids until the age of 13",
                  },
                  "ProductName": {
                    "ar": "قلم رصاص زورنو",
                    "en": "Zorno Pencil",
                  },
                  "SoldOut": false,
                  "SoldOutCoupons": 134,
                  "TotalCoupons": 200,
                  "created_at": "2022-02-23T05:04:21+00:00",
                  "donate": "false",
                  "id": "64f180cd-ed43-4b51-aa0a-c26c029e70e0",
                  "qty": 3,
                },
              ]

            const { total, success, donated } = await TotalPrice(cart)
            let finalTotal = total
            if(false) {
                finalTotal = total - 30
            } else {
                finalTotal = total - (total * 30 / 100)
            }
            console.log(total, success, donated, finalTotal.toFixed() * 100, (finalTotal+35).toFixed() * 100)
            res.json({ total, success, donated, unit_amount: donated ? finalTotal.toFixed() * 100 : (finalTotal+35).toFixed() * 100 })
		} catch (err) {
			res.status(err.statusCode || 500).json(err.message);
		}
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}