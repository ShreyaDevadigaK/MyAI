import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-client'

async function resolveSupabaseUserId(rawUserId: string) {
  // If a valid UUID is supplied, use it directly.
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (uuidPattern.test(rawUserId)) {
    return rawUserId
  }

  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('clerk_id', rawUserId)
    .limit(1)
    .single()

  if (error) {
    console.error('Failed to resolve Supabase user id:', error)
    return null
  }

  return data?.id || null
}

// Save activity to Supabase
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, activity } = body

    if (!userId || !activity) {
      return NextResponse.json({ error: 'Missing userId or activity' }, { status: 400 })
    }

    const resolvedUserId = await resolveSupabaseUserId(userId)
    if (!resolvedUserId) {
      return NextResponse.json({ error: 'Unable to resolve Supabase user id for activity' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('activities')
      .insert([
        {
          user_id: resolvedUserId,
          call_id: activity.id,
          phone_from: activity.from || '',
          phone_to: activity.to || '',
          activity_type: activity.type || 'outbound',
          date: activity.date,
          time: activity.time,
          duration: activity.duration,
          summary: activity.summary
        }
      ])
      .select()

    if (error) {
      const message =
        error.message ||
        error.details ||
        error.hint ||
        JSON.stringify(error) ||
        'Unknown error saving activity'
      console.error('Error saving activity:', message, error)
      return NextResponse.json({ error: message }, { status: 500 })
    }

    return NextResponse.json({ data }, { status: 201 })
  } catch (err) {
    console.error('Error in activities POST:', err)
    return NextResponse.json({ error: 'Failed to save activity' }, { status: 500 })
  }
}

// Fetch activities for a user from Supabase
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const resolvedUserId = await resolveSupabaseUserId(userId)
    if (!resolvedUserId) {
      return NextResponse.json({ error: 'Unable to resolve Supabase user id for activities' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', resolvedUserId)
      .order('created_at', { ascending: false })

    if (error) {
      const message =
        error.message ||
        error.details ||
        error.hint ||
        JSON.stringify(error) ||
        'Unknown error fetching activities'
      console.error('Error fetching activities:', message, error)
      return NextResponse.json({ error: message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (err) {
    console.error('Error in activities GET:', err)
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 })
  }
}
