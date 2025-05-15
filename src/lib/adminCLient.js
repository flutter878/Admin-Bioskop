// lib/adminClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ANON_KEY // Hanya digunakan di server!
)

export default supabaseAdmin;