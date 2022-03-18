import { createClient } from '@supabase/supabase-js'
import { map } from 'modern-async'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY
const supabase = createClient(supabaseUrl, supabaseSecretKey) 
const nodeHtmlToImage = require('node-html-to-image')
const fs = require('fs')

const Handler = async (req, res) => {

  let completed_orders  = await supabase.from('completed_orders').select('*')
  console.log("completed_orders",completed_orders)


  let profile = await supabase
  .from('profiles')
  .select('name, email')
  .eq("id", completed_orders.data.user_id)
  console.log("profile",profile)
  

  const image = fs.readFileSync('./public/icons/kukudealslogo-black.png');
  const base64Image = new Buffer.from(image).toString('base64');
  const dataURI = 'data:image/jpeg;base64,' + base64Image
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); 
  let yyyy = today.getFullYear();
  today = dd + '-' + mm + '-' + yyyy;
  console.log("today",today)
  

  nodeHtmlToImage({
    // output: `./${today}.png`,
    output: `./coupon-images/${today}.png`,
    html: `<html>
      <head>
      <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
        <style>    
          body {
            width: 697.632px;
            height: 308.832px;
          }
        </style>  
      </head>
      <body>
      <div class="grid grid-cols-2 p-5 gap-12 h-64 w-full ">
              <div class="">
              <p class="font-bold text-xl pt-2">COUPON NUMBER :</p>
              <p class="font-bold text-xl ">HO2000000881-16O<p>
              <p class="pt-2">Purcahsed by : <span> Mohammed Hafiz </span></p>
              <p class="pt-2"> Prize :<span> 65" TV and Sound Bar </span></p>
              <p class="pt-2">Purchased on :<span> 15 | 09 | 2021 | 20:42 pm </span></p>
              <p class="pt-2">Mobile no :<span> 0971554411476 </span></p>
          </div>
          <div class="">
              <img class="w-32 h-12 ml-32" src="{{imageSource}}" />
              <p class="mt-8 ml-32">Image2</p>
          </div>
      </div>
          <div class="bg-yellow-300 w-full h-full">
          </div>
      </body>
    </html>`,
    content: { imageSource: dataURI }
        })

  return res.status(200).json({ status: 'Image generated successfully' });
}

export default Handler