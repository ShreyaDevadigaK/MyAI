import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createEvent, updateEvent, deleteEvent } from '@/lib/calendar-service'
import twilio from 'twilio'

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || ''
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || ''
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || ''

type ConversationEntry = { role: string; text: string }

function extractPhoneFromHistory(history: ConversationEntry[]): string {
  for (const entry of history) {
    if (entry.role === 'MESSAGE_ROLE_USER' && /\d[\d\s\-]{6,}/.test(entry.text)) {
      const digits = entry.text.replace(/\D/g, '')
      if (digits.length >= 10) return '+91' + digits.slice(-10)
    }
  }
  return ''
}

function extractServiceType(detailsText: string): string {
  if (/residential/i.test(detailsText)) return 'Residential'
  if (/commercial/i.test(detailsText)) return 'Commercial'
  if (/deep/i.test(detailsText)) return 'Deep Cleaning'
  if (/move/i.test(detailsText)) return 'Move-In/Move-Out'
  return 'Service'
}

function extractCustomerName(detailsText: string): string {
  const nameMatch = detailsText.match(/for\s+([A-Za-z\s]+?)\s+at/i)
  return nameMatch ? nameMatch[1].trim() : 'Customer'
}

const weekdays = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']

function parseDatePhrase(text: string): Date {
  const lower = text.toLowerCase()
  let date = new Date()

  if (lower.includes('tomorrow')) {
    date.setDate(date.getDate() + 1)
  } else {
    for (let i = 0; i < weekdays.length; i++) {
      if (lower.includes(weekdays[i])) {
        const todayIndex = date.getDay()
        let diff = (i - todayIndex + 7) % 7
        if (diff === 0) diff = 7
        date.setDate(date.getDate() + diff)
        break
      }
    }

    const monthMatch = lower.match(/(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})/)
    if (monthMatch) {
      const month = new Date(`${monthMatch[1]} 1`).getMonth()
      const day = parseInt(monthMatch[2], 10)
      const year = new Date().getFullYear()
      date = new Date(year, month, day)
    }
  }

  const timeMatch = lower.match(/(\d{1,2})([:.](\d{2}))?\s*(am|pm)?/)
  if (timeMatch) {
    let hour = parseInt(timeMatch[1], 10)
    const minute = timeMatch[3] ? parseInt(timeMatch[3], 10) : 0
    const ampm = timeMatch[4]

    if (ampm === 'pm' && hour < 12) hour += 12
    if (ampm === 'am' && hour === 12) hour = 0

    date.setHours(hour)
    date.setMinutes(minute)
    date.setSeconds(0)
  }

  return date
}

function formatSMSWindow(startDate: Date, endDate: Date) {
  const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit', hour12: true }
  const dateOptions: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: '2-digit' }
  const formattedDate = startDate.toLocaleDateString('en-GB', dateOptions)
  const formattedStartTime = startDate.toLocaleTimeString('en-IN', timeOptions)
  const formattedEndTime = endDate.toLocaleTimeString('en-IN', timeOptions)
  return { formattedDate, formattedStartTime, formattedEndTime }
}

async function sendSMS(phoneNumber: string, message: string) {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
    console.log('Twilio not configured, skipping SMS')
    return { success: false, message: 'SMS not configured' }
  }

  try {
    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    const result = await client.messages.create({
      body: message,
      from: TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    })
    return { success: true, sid: result.sid }
  } catch (error) {
    console.error('SMS send error:', error)
    return { success: false, error }
  }
}

// POST - Schedule new event
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const detailsText: string = body?.event_details || ''
    const history: ConversationEntry[] = body?.conversation_history || []

    // Parse details from conversation
    const phone = extractPhoneFromHistory(history)
    const serviceType = extractServiceType(detailsText)
    const customerName = extractCustomerName(detailsText)

    // Parse date/time
    let startDate = new Date()
    let endDate = new Date()
    let datetime_input = ''

    for (const entry of [...history].reverse()) {
      if (entry.role === 'MESSAGE_ROLE_USER' && /\b(tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|august|september|am|pm|\d{1,2}[:.]\d{2})\b/i.test(entry.text)) {
        datetime_input = entry.text
        try {
          startDate = parseDatePhrase(datetime_input)
          endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // 1 hour duration
        } catch (e) {
          console.error('Error parsing date:', e)
        }
        break
      }
    }

    // Create event in Supabase
    const event = await createEvent(userId, {
      title: `${customerName} - ${serviceType}`,
      description: detailsText,
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
      event_type: 'appointment',
      status: 'scheduled',
      customer_name: customerName,
      customer_phone: phone,
      service_type: serviceType,
      notes: `Scheduled via AI call`
    })

    if (!event) {
      return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
    }

    // Send SMS confirmation
    if (phone) {
      const { formattedDate, formattedStartTime, formattedEndTime } = formatSMSWindow(startDate, endDate)
      const smsMessage = `Your appointment has been scheduled for ${formattedDate} from ${formattedStartTime} to ${formattedEndTime}. Thank you!`
      await sendSMS(phone, smsMessage)
    }

    return NextResponse.json({
      success: true,
      event,
      message: 'Event scheduled successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error in schedule route:', error)
    return NextResponse.json({ error: 'Failed to schedule event' }, { status: 500 })
  }
}

// PUT - Reschedule event
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { eventId, conversation_history } = body

    if (!eventId) {
      return NextResponse.json({ error: 'Missing eventId' }, { status: 400 })
    }

    const history: ConversationEntry[] = conversation_history || []
    let startDate = new Date()
    let endDate = new Date()

    // Parse new date from conversation
    for (const entry of [...history].reverse()) {
      if (entry.role === 'MESSAGE_ROLE_USER' && /\b(tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|am|pm|\d{1,2}[:.]\d{2})\b/i.test(entry.text)) {
        try {
          startDate = parseDatePhrase(entry.text)
          endDate = new Date(startDate.getTime() + 60 * 60 * 1000)
        } catch (e) {
          console.error('Error parsing date:', e)
        }
        break
      }
    }

    // Update event
    const updated = await updateEvent(userId, eventId, {
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
      status: 'scheduled'
    })

    if (!updated) {
      return NextResponse.json({ error: 'Failed to reschedule event' }, { status: 500 })
    }

    // Send SMS notification
    if (updated.customer_phone) {
      const { formattedDate, formattedStartTime, formattedEndTime } = formatSMSWindow(startDate, endDate)
      const smsMessage = `Your appointment has been rescheduled to ${formattedDate} from ${formattedStartTime} to ${formattedEndTime}. Thank you!`
      await sendSMS(updated.customer_phone, smsMessage)
    }

    return NextResponse.json({ success: true, event: updated })
  } catch (error) {
    console.error('Error in reschedule route:', error)
    return NextResponse.json({ error: 'Failed to reschedule event' }, { status: 500 })
  }
}

// DELETE - Cancel event
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const eventId = request.nextUrl.searchParams.get('eventId')

    if (!eventId) {
      return NextResponse.json({ error: 'Missing eventId' }, { status: 400 })
    }

    const success = await deleteEvent(userId, eventId)

    if (!success) {
      return NextResponse.json({ error: 'Failed to cancel event' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Event cancelled successfully' })
  } catch (error) {
    console.error('Error in cancel route:', error)
    return NextResponse.json({ error: 'Failed to cancel event' }, { status: 500 })
  }
}
