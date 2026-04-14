import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Activity = {
  id: string
  user_id: string
  call_id: string
  phone_from: string
  phone_to: string
  activity_type: 'inbound' | 'outbound'
  date: string
  time: string
  duration: string
  summary: string
  created_at: string
}
