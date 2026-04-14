import React from 'react'
import useSWR from 'swr'
import { useAuth } from '@clerk/nextjs'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
    },
  })

  const contentType = res.headers.get('content-type') || ''
  const text = await res.text()

  if (!res.ok) {
    let message = res.statusText
    try {
      const json = JSON.parse(text)
      message = json.error || json.message || message
    } catch (_error) {
      // ignore parse failure
    }
    throw new Error(message || `Request failed with status ${res.status}`)
  }

  if (!contentType.includes('application/json')) {
    throw new Error(
      `Invalid JSON response from ${url}: ${text.slice(0, 250).replace(/\s+/g, ' ')}${text.length > 250 ? '...' : ''}`
    )
  }

  return JSON.parse(text)
}
const localizer = momentLocalizer(moment)

export default function MyCalendar() {
  const { isLoaded, isSignedIn } = useAuth()
  const { data: eventsData, error: eventsError, isLoading: eventsLoading, mutate: mutateEvents } = useSWR(
    isLoaded && isSignedIn ? '/api/google-calendar/events?maxResults=50' : null,
    fetcher,
    {
      refreshInterval: 10000,
      revalidateOnFocus: true,
    }
  )
  const { data: calendarsData, error: calendarsError, isLoading: calendarsLoading, mutate: mutateCalendars } = useSWR(
    isLoaded && isSignedIn ? '/api/google-calendar/calendars' : null,
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    }
  )
  const [view, setView] = React.useState('month')
  const [date, setDate] = React.useState(new Date())
  const [selectedCalendar, setSelectedCalendar] = React.useState('primary')

  const handleConnectGoogle = () => {
    window.location.href = '/api/google/auth/start?redirect=/Dashboard'
  }

  // Check if user is signed in but Google is not connected
  const isGoogleNotConnected = eventsError?.message?.includes('Google not connected') || 
                              eventsError?.message?.includes('Please connect your Google account')

  // Transform Google Calendar events to react-big-calendar format
  const calendarEvents = React.useMemo(() => {
    if (!eventsData?.events) return []
    
    console.log('Received events from API:', eventsData.events.length);
    eventsData.events.forEach((event: any) => {
      console.log('Event:', event.summary, 'Start:', event.start?.dateTime || event.start?.date);
    });
    
    return eventsData.events.map((event: any) => ({
      id: event.id,
      title: event.summary || 'Untitled event',
      start: new Date(event.start?.dateTime || event.start?.date),
      end: new Date(event.end?.dateTime || event.end?.date),
      allDay: !event.start?.dateTime, // If no time specified, it's an all-day event
      resource: {
        location: event.location,
        description: event.description,
        status: event.status,
        htmlLink: event.htmlLink
      }
    }))
  }, [eventsData])

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-100 pt-2 px-6 pb-6 -mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-100 pt-2 px-6 pb-6 -mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-purple-700">My Calendar</h1>
          </div>
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">Please sign in to view your calendar</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-2 px-6 pb-6 -mt-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-purple-700">My Calendar</h1>
          {isGoogleNotConnected && (
            <button 
              onClick={handleConnectGoogle}
              className="text-sm text-blue-600 hover:underline"
            >
              Connect Google
            </button>
          )}
        </div>
        
        {eventsLoading && <p className="text-gray-600">Loading events…</p>}
        
        {eventsError && (
          <div className="text-center py-10">
            <p className="text-red-600 mb-4">Failed to load events: {eventsError.message || 'Please connect your Google account'}</p>
            <button
              onClick={() => mutateEvents()}
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              Retry
            </button>
          </div>
        )}
        
        {!eventsLoading && !eventsError && (
          <div className="h-[600px] w-full">
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              views={['month', 'week', 'day', 'agenda']}
              view={view}
              date={date}
              onView={(newView: string) => setView(newView)}
              onNavigate={(newDate: Date) => setDate(newDate)}
              popup
              toolbar={true}
              eventPropGetter={(event: any) => ({
                style: {
                  backgroundColor: '#6b46c1',
                  borderRadius: '4px',
                  opacity: 0.8,
                  color: 'white',
                  border: 'none',
                  display: 'block',
                },
              })}
              onSelectEvent={(event: any) => {
                // Open event details or Google Calendar link
                if (event.resource.htmlLink) {
                  window.open(event.resource.htmlLink, '_blank')
                }
              }}
              messages={{
                next: "Next",
                previous: "Previous",
                today: "Today",
                month: "Month",
                week: "Week",
                day: "Day",
                agenda: "Agenda",
                date: "Date",
                time: "Time",
                event: "Event",
                noEventsInRange: "No events in this range"
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
