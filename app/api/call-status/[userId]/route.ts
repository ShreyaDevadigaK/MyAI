import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-client'
import https from 'https'
import { getUltravoxIdByTwilioSid } from '@/lib/call-mappings-persistent'
import { getSheetsFromClerk, getUserSpreadsheetId } from '@/lib/google-from-clerk'

const ULTRAVOX_API_KEY = process.env.ULTRAVOX_API_KEY || ''
const ULTRAVOX_API_URL = 'https://api.ultravox.ai/api/calls'

type UltravoxCallResponse = {
  callId?: string
  created?: string
  joined?: string
  ended?: string
  endReason?: string
  billedDuration?: string
  shortSummary?: string
  summary?: string
  medium?: {
    twilio?: {
      outgoing?: {
        to?: string
        from?: string
      }
    }
  }
}

async function resolveSupabaseUserId(rawUserId: string) {
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

function getUltravoxCallDetails(callId: string): Promise<UltravoxCallResponse> {
  return new Promise((resolve, reject) => {
    const request = https.request(`${ULTRAVOX_API_URL}/${callId}`, {
      method: 'GET',
      headers: {
        'X-API-Key': ULTRAVOX_API_KEY,
      },
    })

    let data = ''
    request.on('response', (response) => {
      response.on('data', (chunk) => (data += chunk))
      response.on('end', () => {
        try {
          const parsedData = JSON.parse(data)
          if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
            resolve(parsedData)
            return
          }
          reject(new Error(`Ultravox API error (${response.statusCode}): ${data}`))
        } catch {
          reject(new Error(`Failed to parse Ultravox response: ${data}`))
        }
      })
    })

    request.on('error', (error) => {
      reject(new Error(`Network error calling Ultravox: ${error.message}`))
    })

    request.end()
  })
}

function formatDateAndTime(value?: string) {
  if (!value) {
    const now = new Date()
    return {
      date: now.toLocaleDateString('en-US'),
      time: now.toLocaleTimeString('en-US'),
    }
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    const now = new Date()
    return {
      date: now.toLocaleDateString('en-US'),
      time: now.toLocaleTimeString('en-US'),
    }
  }

  return {
    date: parsed.toLocaleDateString('en-US'),
    time: parsed.toLocaleTimeString('en-US'),
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params
    const url = new URL(request.url)

    if (!userId) {
      console.error('Missing userId in call-status webhook')
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const contentType = request.headers.get('content-type') || ''
    let callSid = ''
    let callStatus = ''
    let from = ''
    let to = ''
    let duration = '0'
    let ultravoxCallId = url.searchParams.get('ultravoxCallId') || ''
    let summary = ''
    let endReason = ''

    // 1. Parse Request Payload
    if (contentType.includes('application/json')) {
      try {
        const body = await request.json()
        // Check both top-level and nested call object
        ultravoxCallId = body.callId || body.call?.callId || ultravoxCallId
        endReason = body.endReason || body.call?.endReason || ''
        summary = body.shortSummary || body.summary || body.call?.shortSummary || body.call?.summary || ''
        console.log(`Ultravox callback/payload received for ID: ${ultravoxCallId}`)
      } catch (e) {
        console.warn('Non-JSON or malformed body received in JSON-labeled request')
      }
    } else {
      try {
        const formData = await request.formData()
        callSid = formData.get('CallSid')?.toString() || ''
        callStatus = formData.get('CallStatus')?.toString() || ''
        from = formData.get('From')?.toString() || ''
        to = formData.get('To')?.toString() || ''
        duration = formData.get('CallDuration')?.toString() || formData.get('Duration')?.toString() || '0'
        
        if (callSid && !ultravoxCallId) {
          ultravoxCallId = getUltravoxIdByTwilioSid(callSid) || ''
        }
        console.log(`Twilio callback received for SID ${callSid}, resolved Ultravox ID: ${ultravoxCallId}`)
      } catch (e) {
        console.warn('Error parsing form data from Twilio callback')
      }
    }

    // 2. Resolve User
    const resolvedUserId = await resolveSupabaseUserId(userId)
    if (!resolvedUserId) {
      return NextResponse.json({ error: 'Unable to resolve Supabase user id' }, { status: 400 })
    }

    // 3. Fetch Full Details if possible
    let ultravoxDetails: UltravoxCallResponse | null = null
    if (ultravoxCallId && ULTRAVOX_API_KEY) {
      try {
        ultravoxDetails = await getUltravoxCallDetails(ultravoxCallId)
      } catch (error) {
        console.error('Error fetching Ultravox call details:', error)
      }
    }

    // 4. Consolidate Details
    const resolvedCallId = ultravoxDetails?.callId || ultravoxCallId || callSid
    const resolvedFrom = ultravoxDetails?.medium?.twilio?.outgoing?.from || from
    const resolvedTo = ultravoxDetails?.medium?.twilio?.outgoing?.to || to
    const endedAt = ultravoxDetails?.ended || ultravoxDetails?.joined || ultravoxDetails?.created
    const { date, time } = formatDateAndTime(endedAt)
    const resolvedDuration = ultravoxDetails?.billedDuration || duration
    const resolvedSummary =
      summary ||
      ultravoxDetails?.shortSummary ||
      ultravoxDetails?.summary ||
      (callStatus ? `Outbound call ${callStatus}${endReason || ultravoxDetails?.endReason ? ` (${endReason || ultravoxDetails?.endReason})` : ''}` : '')

    // If we have no call ID and no summary, don't save an empty record
    if (!resolvedCallId && !resolvedSummary) {
      return NextResponse.json({ success: false, message: 'No call data found to store' })
    }

    const activity = {
      user_id: resolvedUserId,
      call_id: resolvedCallId,
      phone_from: resolvedFrom,
      phone_to: resolvedTo,
      activity_type: 'outbound',
      date,
      time,
      duration: resolvedDuration,
      summary: resolvedSummary
    }

    // 5. Update/Save to Supabase
    const candidateCallIds = [resolvedCallId, callSid, ultravoxCallId].filter(
      (value): value is string => Boolean(value)
    )
    const existing = await supabase
      .from('activities')
      .select('*')
      .in('call_id', candidateCallIds)
      .limit(1)
      .maybeSingle()

    let dbResult
    if (existing.data?.id) {
      dbResult = await supabase
        .from('activities')
        .update(activity)
        .eq('id', existing.data.id)
        .select()
    } else {
      dbResult = await supabase.from('activities').insert([activity]).select()
    }

    if (dbResult.error) {
      console.error('Error saving activity to DB:', dbResult.error)
    }

    // 6. Update Google Sheets
    try {
      const spreadsheetId = await getUserSpreadsheetId(userId)
      if (spreadsheetId && resolvedSummary) {
        const sheets = await getSheetsFromClerk(url.origin, userId)
        const timestamp = new Date().toISOString()
        const rowData = [
          timestamp,
          'CALL_LOG',
          resolvedTo || 'N/A',
          'Customer',
          'N/A',
          `${date} ${time}`,
          '',
          resolvedSummary || 'N/A',
          `Duration: ${resolvedDuration}, Status: ${callStatus || endReason || 'Completed'}`
        ]

        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: 'Call Activities!A:I',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [rowData],
          },
        })
      }
    } catch (sheetError) {
      console.error('Error appending call log to Google Sheet:', sheetError)
    }

    return NextResponse.json({ success: true, callId: resolvedCallId })
  } catch (error: unknown) {
    console.error('Error in call-status webhook:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
