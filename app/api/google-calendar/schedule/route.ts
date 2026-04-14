import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { getCalendarFromClerk, getSheetsFromClerk } from '@/lib/google-from-clerk'
import { auth } from '@clerk/nextjs/server'
import twilio from 'twilio'
import { createEvent } from '@/lib/calendar-service'

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
  return ''
}

function extractCustomerName(detailsText: string): string {
  const nameMatch = detailsText.match(/for\s+([A-Za-z\s]+?)\s+at/i)
  return nameMatch ? nameMatch[1].trim() : ''
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

function toISTISOString(dateObj: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0')
  const year = dateObj.getFullYear()
  const month = pad(dateObj.getMonth() + 1)
  const day = pad(dateObj.getDate())
  const hour = pad(dateObj.getHours())
  const minute = pad(dateObj.getMinutes())
  const second = pad(dateObj.getSeconds())
  return `${year}-${month}-${day}T${hour}:${minute}:${second}+05:30`
}

function formatSMSWindow(startISO: string, endISO: string) {
  const start = new Date(startISO)
  const end = new Date(endISO)
  const timeOptions: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true }
  const dateOptions: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Kolkata', day: '2-digit', month: '2-digit', year: '2-digit' }
  const formattedDate = start.toLocaleDateString('en-GB', dateOptions)
  const formattedStartTime = start.toLocaleTimeString('en-IN', timeOptions)
  const formattedEndTime = end.toLocaleTimeString('en-IN', timeOptions)
  return { formattedDate, formattedStartTime, formattedEndTime }
}

async function createCalendarEvent({ summary, description, startISO, endISO, origin, calendarId }: { summary: string; description: string; startISO: string; endISO: string; origin: string; calendarId?: string }) {
  const calendar = await getCalendarFromClerk(origin)
  const res = await calendar.events.insert({
    calendarId: calendarId || 'primary',
    requestBody: {
      summary,
      description,
      start: { dateTime: startISO, timeZone: 'Asia/Kolkata' },
      end: { dateTime: endISO, timeZone: 'Asia/Kolkata' },
    },
  })
  return res.data
}

async function appendBookingRow({
  spreadsheetId,
  range,
  phone,
  customerName,
  smsStatus,
  dateScheduled,
  serviceType,
  origin,
  conversationHistory,
  eventId,
}: { 
  spreadsheetId: string; 
  range?: string; 
  phone: string; 
  customerName: string; 
  smsStatus: string; 
  dateScheduled: string; 
  serviceType: string; 
  origin: string;
  conversationHistory?: string;
  eventId?: string;
}) {
  if (!spreadsheetId) return
  const sheets = await getSheetsFromClerk(origin)
  
  // Use the same column structure as reschedule API (A-I)
  const timestamp = new Date().toISOString()
  const rowData = [
    timestamp,                    // A: Timestamp
    'SCHEDULE',                  // B: Activity Type
    phone,                       // C: Phone Number
    customerName,                // D: Customer Name
    serviceType,                 // E: Service Type
    dateScheduled,               // F: Date/Time
    '',                          // G: New Date/Time (empty for schedule)
    conversationHistory || '',    // H: Conversation History
    `Scheduled via AI call - Event ID: ${eventId || 'N/A'}` // I: Notes
  ]
  
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: range || 'Call Activities!A:I',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [rowData],
    },
  })
}

// export async function POST(request: NextRequest) {
//   try {
//     // const { userId } = await auth()
//     // if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//     const body = await request.json()
//     const detailsText: string = body?.event_details || ''
//     const history: ConversationEntry[] = body?.conversation_history || []

//     // Parse
//     let phone = extractPhoneFromHistory(history)
//     const service_type = extractServiceType(detailsText)
//     const customer_name = extractCustomerName(detailsText)

//     let datetime_input = ''
//     let date_scheduled = ''
//     let end = ''

//     for (const entry of [...history].reverse()) {
//       if (entry.role === 'MESSAGE_ROLE_USER' && /\b(tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|august|september|am|pm|\d{1,2}[:.]\d{2})\b/i.test(entry.text)) {
//         datetime_input = entry.text
//         try {
//           const startDateObj = parseDatePhrase(datetime_input)
//           const endDateObj = new Date(startDateObj.getTime() + 60 * 60 * 1000)
//           date_scheduled = toISTISOString(startDateObj)
//           end = toISTISOString(endDateObj)
//         } catch {
//           date_scheduled = ''
//           end = ''
//         }
//         break
//       }
//     }

//     // Create Calendar event (user calendar)
//     const summary = `${customer_name || 'Customer'} - ${service_type || 'Service'}`
//     const description = `${phone || 'N/A'}\n${detailsText || ''}`
//     const event = await createCalendarEvent({
//       summary,
//       description,
//       startISO: date_scheduled,
//       endISO: end,
//       origin: request.nextUrl.origin,
//       calendarId: body?.calendarId || 'primary',
//     })

//     // Compose SMS
//     const { formattedDate, formattedStartTime, formattedEndTime } = formatSMSWindow(date_scheduled, end)
//     const smsText = `Hi ${customer_name || 'Customer'}, your ${service_type || 'Service'} appointment is scheduled for ${formattedDate} at ${formattedStartTime} – ${formattedEndTime}`

//     // Send SMS via Twilio
//     const accountSid = process.env.TWILIO_ACCOUNT_SID
//     const authToken = process.env.TWILIO_AUTH_TOKEN
//     const fromNumber = process.env.TWILIO_FROM || process.env.TWILIO_PHONE_NUMBER
//     let smsStatus = 'skipped'
//     if (accountSid && authToken && fromNumber && phone) {
//       try {
//         const client = twilio(accountSid, authToken)
//         const res = await client.messages.create({ from: fromNumber, to: phone, body: smsText })
//         smsStatus = res.status || 'sent'
//       } catch (e) {
//         smsStatus = 'failed'
//       }
//     }

//     // Append to user's Google Sheet (use provided spreadsheetId or user's saved default)
//     const defaultSpreadsheetId = (await (await import('@/lib/google-from-clerk')).getUserSpreadsheetId())
//     const spreadsheetIdToUse = body?.spreadsheetId || defaultSpreadsheetId
//     if (spreadsheetIdToUse) {
//       await appendBookingRow({
//         spreadsheetId: spreadsheetIdToUse,
//         range: body?.range || 'Sheet1!A:I',
//         phone,
//         customerName: customer_name,
//         smsStatus,
//         dateScheduled: `${formattedDate} at ${formattedStartTime} – ${formattedEndTime}`,
//         serviceType: service_type,
//         origin: request.nextUrl.origin,
//         conversationHistory: JSON.stringify(history),
//         eventId: event.id || 'N/A',
//       })
//     }

//     return NextResponse.json({
//       message: 'Event scheduled successfully',
//       eventId: event.id,
//       phone,
//       customer_name,
//       service_type,
//       date_scheduled,
//       end,
//       sms_status: smsStatus,
//     })
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message || 'Scheduling failed' }, { status: 500 })
//   }
// }


export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()
    console.log("📥 Body received:", body)

    const detailsText: string = body?.event_details || ''
    const history: ConversationEntry[] = body?.conversation_history || []

    let phone = extractPhoneFromHistory(history)
    const service_type = extractServiceType(detailsText)
    const customer_name = extractCustomerName(detailsText)

    console.log("✅ Parsed inputs:", { phone, service_type, customer_name })

    let datetime_input = ''
    let date_scheduled = ''
    let end = ''
    let startDateObj = new Date()
    let endDateObj = new Date()

    for (const entry of [...history].reverse()) {
      if (entry.role === 'MESSAGE_ROLE_USER' && /\b(tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|august|september|am|pm|\d{1,2}[:.]\d{2})\b/i.test(entry.text)) {
        datetime_input = entry.text
        try {
          startDateObj = parseDatePhrase(datetime_input)
          endDateObj = new Date(startDateObj.getTime() + 60 * 60 * 1000)
          date_scheduled = toISTISOString(startDateObj)
          end = toISTISOString(endDateObj)
        } catch {
          date_scheduled = ''
          end = ''
        }
        break
      }
    }

    console.log("🕒 Scheduling:", { datetime_input, date_scheduled, end })

    // ✅ Google Calendar
    console.log("📅 Creating calendar event...")
    const event = await createCalendarEvent({
      summary: `${customer_name || 'Customer'} - ${service_type || 'Service'}`,
      description: `${phone || 'N/A'}\n${detailsText || ''}`,
      startISO: date_scheduled,
      endISO: end,
      origin: request.nextUrl.origin,
      calendarId: body?.calendarId || 'primary',
    })
    console.log("✅ Calendar event created:", event.id)

    // ✅ Supabase - Save event to database
    console.log("💾 Saving event to Supabase...")
    const supabaseEvent = await createEvent(userId, {
      title: `${customer_name || 'Customer'} - ${service_type || 'Service'}`,
      description: detailsText,
      start_time: startDateObj.toISOString(),
      end_time: endDateObj.toISOString(),
      event_type: 'appointment',
      status: 'scheduled',
      customer_name: customer_name || undefined,
      customer_phone: phone || undefined,
      service_type: service_type || undefined,
      notes: `Scheduled via AI call - Google Calendar ID: ${event.id}`
    })
    console.log("✅ Event saved to Supabase:", supabaseEvent?.id)

    // ✅ Twilio
    const { formattedDate, formattedStartTime, formattedEndTime } = formatSMSWindow(date_scheduled, end)
    const smsText = `Hi ${customer_name || 'Customer'}, your ${service_type || 'Service'} appointment is scheduled for ${formattedDate} at ${formattedStartTime} – ${formattedEndTime}`

    let smsStatus = 'skipped'
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && (process.env.TWILIO_FROM || process.env.TWILIO_PHONE_NUMBER) && phone) {
      try {
        console.log("📲 Sending SMS to", phone)
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
        const res = await client.messages.create({ from: process.env.TWILIO_FROM || process.env.TWILIO_PHONE_NUMBER, to: phone, body: smsText })
        smsStatus = res.status || 'sent'
        console.log("✅ SMS status:", smsStatus)
      } catch (e) {
        console.error("❌ SMS failed:", e)
        smsStatus = 'failed'
      }
    }

    // ✅ Google Sheets
    console.log("📊 Appending booking row...")
    const defaultSpreadsheetId = (await (await import('@/lib/google-from-clerk')).getUserSpreadsheetId())
    const spreadsheetIdToUse = body?.spreadsheetId || defaultSpreadsheetId
    if (spreadsheetIdToUse) {
      await appendBookingRow({
        spreadsheetId: spreadsheetIdToUse,
        range: body?.range || 'Sheet1!A:I',
        phone,
        customerName: customer_name,
        smsStatus,
        dateScheduled: `${formattedDate} at ${formattedStartTime} – ${formattedEndTime}`,
        serviceType: service_type,
        origin: request.nextUrl.origin,
        conversationHistory: JSON.stringify(history),
        eventId: event.id || 'N/A',
      })
      console.log("✅ Row appended to sheet")
    }

    return NextResponse.json({
      message: 'Event scheduled successfully',
      eventId: event.id,
      googleEventId: event.id,
      supabaseEventId: supabaseEvent?.id,
      phone,
      customer_name,
      service_type,
      date_scheduled,
      end,
      sms_status: smsStatus,
    })
  } catch (error: unknown) {
    console.error("❌ Schedule API error:", error)
    const errorMessage = error instanceof Error ? error.message : 'Scheduling failed'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}



