import { supabase } from "@/utils/supabaseClient"
import cookie from 'cookie'

const Handler = async (req, res) => {
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'POST') {
        console.log(req.body)
        const { user } = await supabase.auth.api.getUserByCookie(req)
        console.log(user)

        const token = cookie.parse(req.headers.cookie)['sb:token']
        supabase.auth.session = () => ({
            access_token: token
        })

        let { data: profiles, error } = await supabase
            .from('profiles')
            .select('stripe_customer_id')

        res.send({ success: false, user: profiles})
    }
}

export default Handler