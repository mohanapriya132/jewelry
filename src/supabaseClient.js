import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// DEBUG: Remove these logs after confirming env vars are loaded on Vercel
console.log("VITE_SUPABASE_URL:", supabaseUrl)
console.log("VITE_SUPABASE_ANON_KEY exists:", !!supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
