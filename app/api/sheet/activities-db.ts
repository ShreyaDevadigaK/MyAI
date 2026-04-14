import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-client'

// Save activity to Supabase
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, activity } = body

    if (!userId || !activity) {
      return NextResponse.json({ error: 'Missing userId or activity' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('activities')
      .insert([
        {
          user_id: userId,
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
      console.error('Error saving activity:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
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

    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching activities:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (err) {
    console.error('Error in activities GET:', err)
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 })
  }
}
