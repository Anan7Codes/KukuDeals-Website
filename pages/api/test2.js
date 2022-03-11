var pdf = require('html-pdf');

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Node PDF Creator</title>
    <!-- Bootstrap CSS -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <h1>User List</h1>
    <ul>
      <li>Name: {{this.type}}</li>
      <li>Age: {{this.address}}</li>
      <br />
      {{/ifCond}} {{#ifCond this.order "===" 2}}

      <li>Name: {{this.type}}</li>
      <li>Age: {{this.description}}</li>
      <li>price: {{this.price}}</li>

      <br />

      <li>Address: {{this.Address}}</li>
      <li>Address: {{this.address}}</li>
      <br />

    </ul>

    <h1>Server Image</h1>
    <img
      src="https://miro.medium.com/max/3840/1*tRp3G6ffXDMDVOvMebzYgg.jpeg"
      class="img-fluid"
      alt="Responsive image"
    />

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script
      src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
      integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
      integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
      integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
      crossorigin="anonymous"
    ></script>
  </body>
</html>`;

var options = { format: 'A3', type: 'pdf', timeout: 999999 };
  
const mail = require('@sendgrid/mail')
mail.setApiKey(process.env.SENDGRID_API_KEY)

const Handler = async (req, res) => {
    if (req.method !== 'GET') {
        return res.send({ success: false, message: 'Wrong request made' })
    }
    if (req.method === 'GET') {        
        pdf.create(html, options).toBuffer(async function(err, buffer){
            if(err) return res.json("Some creation Error", err)
            console.log("Buffer", buffer)
            const data1 = {
                from: 'travo.socialmedia@gmail.com',
                personalizations: [
                    {
                        to: ['anandhu@rough-paper.com'],
                        subject: 'Order Confirmation'
                    },
                ],
                content: [{ type: "text/html", value: html },],
                attachments: [
                    {
                        content: buffer.toString('base64'),
                        filename:`123.pdf`,
                        type: 'application/pdf',
                        disposition: 'attachment',
                        content_id: 'mytext',
                    },
                ],
            }
            try {
                const resp = await mail.send(data1)
                console.log("mail",resp)
            } catch (err){
                return res.status(401).json({ status: 'Email sending failed' });
            }
        });

        return res.json({ success: 'true' })
    }
}

export default Handler 