import { supabase } from "@/utils/supabaseClient"

const Handler = async (req, res) => {
    if(req.method !== 'POST') {
        return res.send({ success: false, message: 'Wrong request made'})
    }
    if(req.method === 'POST') {
        await supabase.auth.api.setAuthCookie(req, res)
    }
}

export default Handler