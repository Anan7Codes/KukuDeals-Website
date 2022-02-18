import { supabase } from "@/utils/supabaseClient"

const Handler = async (req, res) => {
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'POST') {
        const response = await supabase.auth.api.setAuthCookie(req, res)
        console.log(response)
    }
}

export default Handler