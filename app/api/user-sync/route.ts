import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''
const supabaseKey = supabaseServiceRoleKey || supabaseAnonKey
const usingServiceRole = Boolean(supabaseServiceRoleKey)

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or key environment variables')
}

const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
})

if (!usingServiceRole) {
  console.warn('Warning: /api/user-sync is running with Supabase anon key. For production, set SUPABASE_SERVICE_ROLE_KEY.')
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const email = body.email?.toString() || ''
    const name = body.name?.toString() || ''

    async function tryQueryByColumn(column: string, value: string) {
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq(column, value)
        .limit(1)

      if (error) {
        console.error(`Supabase lookup error for ${column}:`, error)
        return null
      }

      return data?.[0] || null
    }

    let existing = null

    const existingByClerkId = await tryQueryByColumn('clerk_id', userId)
    const existingByEmail = !existingByClerkId && email ? await tryQueryByColumn('email', email) : null
    existing = existingByClerkId || existingByEmail

    if (existing) {
      const updatePayload: Record<string, any> = { email, name }
      if (existingByEmail && !existingByClerkId) {
        updatePayload.clerk_id = userId
      }

      const { data: updated, error: updateError } = await supabaseAdmin
        .from('users')
        .update(updatePayload)
        .eq('id', existing.id)
        .select()

      if (updateError) {
        console.error('Supabase user update error:', updateError)
        return NextResponse.json({ error: 'Failed to update user record' }, { status: 500 })
      }

      return NextResponse.json({ data: updated, action: 'updated' })
    }

    const newUser = {
      clerk_id: userId,
      email,
      name,
      created_at: new Date().toISOString(),
    }

    const { data: inserted, error: insertError } = await supabaseAdmin
      .from('users')
      .insert([newUser])
      .select()

    if (insertError) {
      console.error('Supabase user insert error:', insertError)
      return NextResponse.json({ error: 'Failed to insert user record' }, { status: 500 })
    }

    return NextResponse.json({ data: inserted, action: 'created' })
  } catch (error: any) {
    console.error('User sync error:', error)
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
}
