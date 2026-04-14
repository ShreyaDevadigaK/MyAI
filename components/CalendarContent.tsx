'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Calendar, Plus, X, Check } from 'lucide-react'
import { fetchUserEvents, updateEvent } from '@/lib/calendar-service'

interface CalendarEvent {
  id: string
  user_id: string
  title: string
  description?: string
  start_time: string
  end_time: string
  location?: string
  event_type: string
  status: 'scheduled' | 'completed' | 'cancelled'
  customer_name?: string
  customer_phone?: string
  service_type?: string
  notes?: string
  created_at?: string
  updated_at?: string
}

export default function CalendarContent() {
  const { user, isLoaded } = useUser()
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const loadEvents = async (userId: string, showLoading = true) => {
    if (showLoading) {
      setLoading(true)
    }

    try {
      const events = await fetchUserEvents(userId)
      setEvents(events)
      setError('')
    } catch (error: any) {
      console.error('Error fetching events:', error)
      setError(
        error?.message ||
          (typeof error === 'string' ? error : 'Failed to load calendar events')
      )
    } finally {
      if (showLoading) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (!isLoaded) return

    if (!user?.id) {
      setLoading(false)
      setError('Please sign in to view calendar events')
      return
    }

    loadEvents(user.id)
  }, [isLoaded, user?.id])

  useEffect(() => {
    if (!user?.id) return

    const interval = setInterval(() => {
      loadEvents(user.id, false)
    }, 15000)

    return () => clearInterval(interval)
  }, [user?.id])

  const handleCompleteEvent = async (event: CalendarEvent) => {
    if (!user?.id) return

    try {
      const updated = await updateEvent(user.id, event.id, { status: 'completed' })
      if (updated) {
        setEvents(events.map(e => e.id === event.id ? updated : e))
        setSelectedEvent(updated)
      }
    } catch (err) {
      console.error('Error updating event:', err)
    }
  }

  const handleCancelEvent = async (event: CalendarEvent) => {
    if (!user?.id) return

    try {
      const updated = await updateEvent(user.id, event.id, { status: 'cancelled' })
      if (updated) {
        setEvents(events.map(e => e.id === event.id ? updated : e))
        setSelectedEvent(updated)
      }
    } catch (err) {
      console.error('Error cancelling event:', err)
    }
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(e => e.start_time.startsWith(dateStr))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading events...</div>
  }

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Calendar
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              ←
            </button>
            <span className="px-4 py-1 font-semibold">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              →
            </button>
          </div>
        </div>

        {/* Mini Calendar */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-sm text-gray-600">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, i) => (
              <div key={`empty-${i}`} className="text-center text-sm text-gray-400 h-8" />
            ))}
            {Array.from({ length: getDaysInMonth(currentMonth) }).map((_, i) => {
              const day = i + 1
              const dayEvents = getEventsForDate(day)
              return (
                <div
                  key={day}
                  className={`text-center text-sm h-8 flex items-center justify-center rounded cursor-pointer transition-colors ${
                    dayEvents.length > 0
                      ? 'bg-blue-100 text-blue-900 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => dayEvents.length > 0 && setSelectedEvent(dayEvents[0])}
                >
                  {day}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Events */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {events
              .filter(e => e.status === 'scheduled')
              .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
              .map(event => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {event.event_type}
                    </span>
                  </div>
                  {event.customer_name && (
                    <p className="text-sm text-gray-600 mb-1">Customer: {event.customer_name}</p>
                  )}
                  <p className="text-sm text-gray-600 mb-2">
                    {formatDate(event.start_time)} - {new Date(event.end_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {event.service_type && (
                    <p className="text-sm text-gray-500">Service: {event.service_type}</p>
                  )}
                </div>
              ))}
            {events.filter(e => e.status === 'scheduled').length === 0 && (
              <p className="text-gray-500 text-center py-8">No upcoming events scheduled</p>
            )}
          </div>
        </div>

        {/* Event Details Sidebar */}
        {selectedEvent ? (
          <div className="bg-white rounded-lg shadow p-4 h-fit sticky top-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-xs text-gray-500 uppercase">Status</p>
                <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${getStatusColor(selectedEvent.status)}`}>
                  {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                </span>
              </div>

              {selectedEvent.customer_name && (
                <div>
                  <p className="text-xs text-gray-500 uppercase">Customer</p>
                  <p className="text-sm font-medium text-gray-900">{selectedEvent.customer_name}</p>
                </div>
              )}

              {selectedEvent.customer_phone && (
                <div>
                  <p className="text-xs text-gray-500 uppercase">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{selectedEvent.customer_phone}</p>
                </div>
              )}

              {selectedEvent.service_type && (
                <div>
                  <p className="text-xs text-gray-500 uppercase">Service Type</p>
                  <p className="text-sm font-medium text-gray-900">{selectedEvent.service_type}</p>
                </div>
              )}

              <div>
                <p className="text-xs text-gray-500 uppercase">Start Time</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(selectedEvent.start_time)}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">End Time</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(selectedEvent.end_time)}</p>
              </div>

              {selectedEvent.notes && (
                <div>
                  <p className="text-xs text-gray-500 uppercase">Notes</p>
                  <p className="text-sm text-gray-700">{selectedEvent.notes}</p>
                </div>
              )}

              {selectedEvent.description && (
                <div>
                  <p className="text-xs text-gray-500 uppercase">Description</p>
                  <p className="text-sm text-gray-700">{selectedEvent.description}</p>
                </div>
              )}
            </div>

            {selectedEvent.status === 'scheduled' && (
              <div className="space-y-2">
                <button
                  onClick={() => handleCompleteEvent(selectedEvent)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Mark Complete
                </button>
                <button
                  onClick={() => handleCancelEvent(selectedEvent)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel Event
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-4 h-fit sticky top-4 text-center text-gray-500">
            <p>Select an event to view details</p>
          </div>
        )}
      </div>

      {/* Completed Events Section */}
      {events.filter(e => e.status === 'completed').length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Completed Events</h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {events
              .filter(e => e.status === 'completed')
              .sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime())
              .map(event => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500 opacity-75"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Completed
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{formatDate(event.start_time)}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
