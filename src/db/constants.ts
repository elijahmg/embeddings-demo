import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.BUN_PUBLIC_DB_URL
const SUPABASE_KEY = process.env.BUN_PUBLIC_DB_API_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing required Supabase environment variables: BUN_PUBLIC_DB_URL and BUN_PUBLIC_DB_API_KEY');
}

export const SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
