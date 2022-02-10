import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY

 const supabase = createClient(supabaseUrl, supabaseAnonKey)
 const supabaseAdmin = createClient(supabaseUrl, supabaseSecretKey)
 
 export { supabase, supabaseAdmin }