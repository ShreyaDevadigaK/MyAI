import { NextRequest, NextResponse } from 'next/server'
import { createEvent, fetchUserEvents, updateEvent, deleteEvent } from '@/lib/calendar-service'

// POST - Create new event
// GET - Fetch user events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, event } = body

    if (!userId || !event) {
      return NextResponse.json({ error: 'Missing userId or event data' }, { status: 400 })
    }

    const result = await createEvent(userId, event)

    if (!result) {
      return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
    }

    return NextResponse.json({ data: result }, { status: 201 })
  } catch (err) {
    console.error('Error in calendar POST:', err)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    const startDate = request.nextUrl.searchParams.get('startDate')
    const endDate = request.nextUrl.searchParams.get('endDate')

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const events = await fetchUserEvents(userId, startDate || undefined, endDate || undefined)

    return NextResponse.json({ data: events })
  } catch (err) {
    console.error('Error in calendar GET:', err)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

// PUT - Update event
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, eventId, updates } = body

    if (!userId || !eventId || !updates) {
      return NextResponse.json({ error: 'Missing userId, eventId, or updates' }, { status: 400 })
    }

    const result = await updateEvent(userId, eventId, updates)

    if (!result) {
      return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
    }

    return NextResponse.json({ data: result })
  } catch (err) {
    console.error('Error in calendar PUT:', err)
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
  }
}

// DELETE - Delete event
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    const eventId = request.nextUrl.searchParams.get('eventId')

    if (!userId || !eventId) {
      return NextResponse.json({ error: 'Missing userId or eventId' }, { status: 400 })
    }

    const success = await deleteEvent(userId, eventId)

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Event deleted successfully' })
  } catch (err) {
    console.error('Error in calendar DELETE:', err)
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
  }
}
