const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const TotalPrice = async (cart) => {
    let total = 0
    let success = true
    await map(cart, async (item) => {
        let { data, error } = await supabase
        .from('campaigns')
        .select('Price')
        .eq("id", item.id)
        if(error) return success = false
        total += data[0].Price * item.qty
    })
    return { total, success }
}

export default async function handler(req, res) {
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if (req.method === 'POST') {
        try {
        
            if(req.body.user_id === '') return res.send({ success: false, message: "Unauthorized"})

            const { total, success } = await TotalPrice(req.body.cart)
            if(!success) return res.status(404).json({ success: false, message: "Failed to calculate total amount"})

            let finalTotal = total
            if(req.body.promoCode) {
                let promo_code = await supabase
                    .from('promo_codes')
                    .select('type,value')
                    .eq("name", req.body.promoCode)
                if(promo_code.data[0].type) {
                    finalTotal = total - promo_code.data[0].value
                } else {
                    finalTotal = total - (total * promo_code.data[0].value / 100)
                }
                console.log(finalTotal)
            }

            let { data, error } = await supabase
                .from('profiles')
                .select('stripe_customer_id')
                .eq("id", req.body.user_id)
            if(error) return res.status(404).json({ success: false, message: "Failed authorization"})

            const session = await stripe.checkout.sessions.create({
                customer: data[0].stripe_customer_id,
                line_items: [
                    {price: finalTotal.toFixed() * 100}
                ],
                mode: 'payment',
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            });
                res.redirect(303, session.url);
            } catch (err) {
                res.status(err.statusCode || 500).json(err.message);
            }
        } else {
            res.setHeader('Allow', 'POST');
            res.status(405).end('Method Not Allowed');
    }
}