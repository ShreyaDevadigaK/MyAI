
import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'
import { getCallMapping } from '@/lib/call-mappings-persistent'
import { getActivePhoneNumberFromCallTransfers } from '@/lib/call-transfer-service'
const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { transferReason, call_id } = body
    const toolBaseUrl = (process.env.toolBaseUrl || process.env.ULTRAVOX_TOOL_BASE_URL || '').replace(/\/$/, '')

    // Get active phone number from call-transfers API
    const activePhoneNumber = await getActivePhoneNumberFromCallTransfers()

    if (!activePhoneNumber) {
      throw new Error('No active phone number found in call transfers')
    }

    // Get Twilio Call SID from mapping
    const twilioCallSid = getCallMapping(call_id)

    if (!twilioCallSid) {
      throw new Error('Twilio Call SID not found for this call')
    }

    // Use the active phone number from call-transfers as destination
    const destinationNumber = activePhoneNumber

    // Simple attended transfer using Twilio's dial with whisper
    await client.calls(twilioCallSid).update({
      twiml: `<Response>
    <Say>Transferring you now. Please hold.</Say>
    <Dial>
      <Number url="${toolBaseUrl}/api/whisper?reason=${encodeURIComponent(transferReason)}">
       ${destinationNumber}
      </Number>
    </Dial>
  </Response>`
    })

    return NextResponse.json({
      success: true,
      destinationNumber: activePhoneNumber
    })
  } catch (error) {
    console.error('Transfer error:', error)
    return NextResponse.json({ error: 'Transfer failed' }, { status: 500 })
  }
}
