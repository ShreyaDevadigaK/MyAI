import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase-client'
import https from 'https'
import { getUltravoxIdByTwilioSid } from '@/lib/call-mappings-persistent'

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

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const formData = await request.formData()
    const callSid = formData.get('CallSid')?.toString() || ''
    const callStatus = formData.get('CallStatus')?.toString() || ''
    const from = formData.get('From')?.toString() || ''
    const to = formData.get('To')?.toString() || ''
    const duration =
      formData.get('CallDuration')?.toString() ||
      formData.get('Duration')?.toString() ||
      '0'

    if (!callSid) {
      return NextResponse.json({ error: 'Missing CallSid' }, { status: 400 })
    }

    const resolvedUserId = await resolveSupabaseUserId(userId)
    if (!resolvedUserId) {
      return NextResponse.json({ error: 'Unable to resolve Supabase user id' }, { status: 400 })
    }

    const ultravoxCallId = getUltravoxIdByTwilioSid(callSid)
    const candidateCallIds = [callSid, ultravoxCallId].filter(
      (value): value is string => Boolean(value)
    )
    const existing = await supabase
      .from('activities')
      .select('*')
      .in('call_id', candidateCallIds)
      .limit(1)
      .maybeSingle()

    if (existing.error) {
      console.error('Error checking existing call activity:', existing.error)
    }

    let ultravoxDetails: UltravoxCallResponse | null = null

    if (ultravoxCallId && ULTRAVOX_API_KEY) {
      try {
        ultravoxDetails = await getUltravoxCallDetails(ultravoxCallId)
      } catch (error) {
        console.error('Error fetching Ultravox call details:', error)
      }
    }

    const resolvedCallId = ultravoxDetails?.callId || ultravoxCallId || callSid
    const resolvedFrom = ultravoxDetails?.medium?.twilio?.outgoing?.from || from
    const resolvedTo = ultravoxDetails?.medium?.twilio?.outgoing?.to || to
    const endedAt = ultravoxDetails?.ended || ultravoxDetails?.joined || ultravoxDetails?.created
    const { date, time } = formatDateAndTime(endedAt)
    const resolvedDuration = ultravoxDetails?.billedDuration || duration
    const resolvedSummary =
      ultravoxDetails?.shortSummary ||
      ultravoxDetails?.summary ||
      `Outbound call ${callStatus}${ultravoxDetails?.endReason ? ` (${ultravoxDetails.endReason})` : ''}`
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

    if (existing.data?.id) {
      const { data, error } = await supabase
        .from('activities')
        .update(activity)
        .eq('id', existing.data.id)
        .select()

      if (error) {
        console.error('Error updating call status activity:', error)
        return NextResponse.json({ error: error.message || 'Failed to update activity' }, { status: 500 })
      }

      return NextResponse.json({ data, updated: true })
    }

    const { data, error } = await supabase.from('activities').insert([activity]).select()

    if (error) {
      console.error('Error saving call status activity:', error)
      return NextResponse.json({ error: error.message || 'Failed to save activity' }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('Error in call-status webhook:', error)
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 })
  }
}
