import { supabase } from './supabase-client'

export interface CalendarEvent {
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

// Create a new event
export async function createEvent(userId: string, event: Omit<CalendarEvent, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('events')
      .insert([{ user_id: userId, ...event }])
      .select()

    if (error) {
      console.error('Error creating event:', error)
      return null
    }

    return data?.[0] || null
  } catch (err) {
    console.error('Failed to create event:', err)
    return null
  }
}

// Fetch events for a user (with optional date range)
export async function fetchUserEvents(
  userId: string,
  startDate?: string,
  endDate?: string
): Promise<CalendarEvent[]> {
  try {
    let query = supabase
      .from('events')
      .select('*')
      .eq('user_id', userId)
      .order('start_time', { ascending: true })

    if (startDate) {
      query = query.gte('start_time', startDate)
    }

    if (endDate) {
      query = query.lte('end_time', endDate)
    }

    const { data, error } = await query

    if (error) {
      const message =
        error.message ||
        (typeof error === 'string' ? error : undefined) ||
        JSON.stringify(error) ||
        'Unknown Supabase error while fetching events'
      console.error('Error fetching events:', message, error)
      throw new Error(message)
    }

    return data || []
  } catch (err) {
    console.error('Failed to fetch events:', err)
    return []
  }
}

// Update an event
export async function updateEvent(userId: string, eventId: string, updates: Partial<CalendarEvent>) {
  try {
    const { data, error } = await supabase
      .from('events')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', eventId)
      .eq('user_id', userId)
      .select()

    if (error) {
      console.error('Error updating event:', error)
      return null
    }

    return data?.[0] || null
  } catch (err) {
    console.error('Failed to update event:', err)
    return null
  }
}

// Delete an event
export async function deleteEvent(userId: string, eventId: string) {
  try {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', eventId)
      .eq('user_id', userId)

    if (error) {
      console.error('Error deleting event:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Failed to delete event:', err)
    return false
  }
}

// Get a single event by ID
export async function getEvent(userId: string, eventId: string): Promise<CalendarEvent | null> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .eq('user_id', userId)
      .single()

    if (error) {
      console.error('Error fetching event:', error)
      return null
    }

    return data || null
  } catch (err) {
    console.error('Failed to fetch event:', err)
    return null
  }
}
