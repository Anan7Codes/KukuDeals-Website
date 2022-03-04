const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { map } from 'modern-async'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY
const supabase = createClient(supabaseUrl, supabaseSecretKey)

export default async function handler(req, res) {
	if (req.method === 'GET') {
    const coupons = [
      {
      product_id: 'ec3e130d-766e-4f3f-ace2-50ffee8ae458',
      product_coupons: [ 'KUKU0000018-1O', 'KUKU0000018-1D' ],
      product_qty: 1,
      product_price: 15,
      name: 'Zorno Pencil/AED 10,000 Cash'
    },
    {
      product_id: '998895d2-a6aa-404a-9f60-76880b8c2273',
      product_coupons: [
        'KUKU0000018-2O',
        'KUKU0000018-2D',
        'KUKU0000018-3O',
        'KUKU0000018-3D',
        'KUKU0000018-4O',
        'KUKU0000018-4D'
      ],
      product_qty: 3,
      product_price: 50,
      name: 'Zorno Pencil/AED 10,000 Cash'
    },
    {
      product_id: 'a415a869-6ebe-4d67-901c-b92b7e02dbac',
      product_coupons: [ 'KUKU0000018-5O', 'KUKU0000018-5D' ],
      product_qty: 1,
      product_price: 55,
      name: 'Zorno Pencil/AED 10,000 Cash'
    }
      ]
    var headers = {
      fila_0: {
          col_1: { text: 'Sr.No', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
          col_2: { text: 'Product(s)', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
          col_3: { text: 'Quantity', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
          col_4: { text: 'UnitPrice', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
          col_5: { text: 'Amount Excluding Tax', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
          col_6: { text: 'Tax Rate %', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
          col_7: { text: 'Amount Including Tax', style: 'tableHeader', rowSpan: 2, alignment: 'center', margin: [10, 10, 10, 10] },
      },
    }

    let body = [];
    let header = headers.fila_0;
    var row = new Array();
    row.push(header.col_1);
    row.push(header.col_2);
    row.push(header.col_3);
    row.push(header.col_4);
    row.push(header.col_5);
    row.push(header.col_6);
    row.push(header.col_7);
    body.push(row);

    await map(coupons, async (coupon,i) => {
          var row = new Array();
          console.log("rows of i", coupon)
          console.log("to string", coupon.product_price.toString())
          row.push(i + 1)
          console.log("cjeck", coupon.product_price.toString())
          row.push(coupon.name.toString());
          console.log("coupon", coupon.name.toString())
          row.push(coupon.product_qty.toString());
          console.log("coupon", coupon.product_qty.toString())
          row.push(`AED${coupon.product_price.toString()}`);
          console.log("coupon", coupon.product_price.toString())
          row.push(`AED${(coupon.product_price * coupon?.product_qty * 0.95).toString()}`);
          console.log("coupon", `AED${(coupon.product_price * coupon?.product_qty * 0.95).toString()}`)
          row.push("5%");
          row.push(`AED${(coupon.product_price * coupon?.product_qty).toString()}`);
          console.log("coupon", `AED${(coupon.product_price * coupon?.product_qty).toString()}`)
          body.push(row);
    }) 
    // for (var i = 0; i < rows.length; i++) {
    //     var row = new Array();
    //     console.log("rows of i", rows[i])
    //     console.log("to string", rows[i].product_price.toString())
    //     row.push(i + 1)
    //     console.log("cjeck", rows[i].product_price.toString())
    //     row.push(rows[i].name.toString());
    //     row.push(rows[i].product_qty.toString());
    //     row.push(`AED${rows[i].product_price.toString()}`);
    //     row.push(`AED${rows[i].product_price.toString() * rows[i]?.product_qty.toString() * 0.95}`);
    //     row.push("5%");
    //     row.push(`AED${rows[i].product_price.toString() * rows[i]?.product_qty.toString()}`);
    //     body.push(row);
    //     console.log("row", row)
    // }

    console.log("body", body)
    return res.json({ body })
	} else {
		res.setHeader('Allow', 'POST');
		res.status(405).end('Method Not Allowed');
	}
}