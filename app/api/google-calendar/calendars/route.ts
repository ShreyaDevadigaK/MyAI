import { NextRequest, NextResponse } from 'next/server'
import { getCalendarFromClerk } from '@/lib/google-from-clerk'
import { auth } from '@clerk/nextjs/server'
import { calendar_v3 } from 'googleapis'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const calendar = await getCalendarFromClerk(request.nextUrl.origin)

    let calendars: calendar_v3.Schema$CalendarListEntry[] = []
    
    try {
      const calendarsResponse = await calendar.calendarList.list() as calendar_v3.Schema$CalendarList

      console.log('Full calendars response:', calendarsResponse);
      
      calendars = calendarsResponse.items || []
      
      console.log('Available calendars:', calendars.length);
      if (calendars.length > 0) {
        calendars.forEach((cal: calendar_v3.Schema$CalendarListEntry) => {
          console.log('Calendar:', cal.summary, 'ID:', cal.id, 'Primary:', cal.primary);
        });
      } else {
        console.log('No calendars found in the response');
      }
    } catch (error) {
      console.error('Error fetching calendar list:', error);
      throw error;
    }

    return NextResponse.json({
      calendars: calendars.map(cal => ({
        id: cal.id,
        summary: cal.summary,
        description: cal.description,
        timeZone: cal.timeZone,
        primary: cal.primary,
        backgroundColor: cal.backgroundColor,
        foregroundColor: cal.foregroundColor
      }))
    })

  } catch (error: unknown) {
    console.error('Error fetching calendars:', error)
    
    const errorMessage = error instanceof Error ? error.message : '';

    if (errorMessage === 'Google not connected') {
      return NextResponse.json({ 
        error: 'Google account not connected. Please connect your Google account to view calendars.',
        requiresAuth: true 
      }, { status: 401 })
    }

    if (errorMessage === 'Missing Google OAuth env vars') {
      return NextResponse.json({ 
        error: 'Google OAuth configuration is missing. Please check server configuration.',
        requiresConfig: true 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      error: errorMessage || 'Failed to fetch calendars' 
    }, { status: 500 })
  }
}
