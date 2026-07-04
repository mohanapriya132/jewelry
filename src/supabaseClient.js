import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// DEBUG: Remove after confirming Vercel env vars are set
console.log("VITE_SUPABASE_URL:", supabaseUrl)
console.log("VITE_SUPABASE_ANON_KEY exists:", !!supabaseAnonKey)

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "❌ Supabase env vars missing!\n" +
    "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Vercel Environment Variables.\n" +
    "See: https://vercel.com/docs/projects/environment-variables"
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

