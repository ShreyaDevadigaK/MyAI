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

    const { searchParams } = new URL(request.url)
    const maxResults = parseInt(searchParams.get('maxResults') || '50')
    const timeMin = searchParams.get('timeMin')
    const timeMax = searchParams.get('timeMax')
    const calendarId = searchParams.get('calendarId') || 'primary'

    const calendar = await getCalendarFromClerk(request.nextUrl.origin)

    // Fetch events from 1 year ago to 1 year in the future to ensure we capture all events
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    const eventsResponse = await calendar.events.list({
      calendarId: calendarId as string,
      maxResults,
      timeMin: timeMin || oneYearAgo.toISOString(),
      timeMax: timeMax || oneYearLater.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    }) as calendar_v3.Schema$Events;

    console.log('Full events response structure:', eventsResponse);
    
    const events: calendar_v3.Schema$Event[] = eventsResponse.items || []
    
    console.log('Fetched events count:', events.length);
    if (events.length > 0) {
      events.forEach(event => {
        console.log('Event:', event.summary, 'Start:', event.start?.dateTime || event.start?.date);
      });
    } else {
      console.log('No events found in the response');
    }

    return NextResponse.json({
      events: events.map(event => ({
        id: event.id,
        summary: event.summary,
        description: event.description,
        start: event.start,
        end: event.end,
        location: event.location,
        status: event.status,
        htmlLink: event.htmlLink,
        created: event.created,
        updated: event.updated,
      })),
      nextPageToken: eventsResponse.nextPageToken,
    })

  } catch (error: unknown) {
    console.error('Error fetching calendar events:', error)
    
    const errorMessage = error instanceof Error ? error.message : '';

    if (errorMessage === 'Google not connected') {
      return NextResponse.json({ 
        error: 'Google account not connected. Please connect your Google account to view calendar events.',
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
      error: errorMessage || 'Failed to fetch calendar events' 
    }, { status: 500 })
  }
}
