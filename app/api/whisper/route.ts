import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const transferReason = searchParams.get('reason') || 'Call transfer'
  const toolBaseUrl = (process.env.toolBaseUrl || process.env.ULTRAVOX_TOOL_BASE_URL || '').replace(/\/$/, '')

  // Return TwiML for whisper message to agent
  return new NextResponse(
    `<Response>
      <Say>You have an incoming transfer: ${transferReason}. Press any key to accept.</Say>
      <Gather numDigits="1" timeout="10"  action="${toolBaseUrl}/api/accept-transfer">>
        <Say>Press any key to connect to the caller.</Say>
      </Gather>
      <Say>Transfer declined. Goodbye.</Say>
      <Hangup/>
    </Response>`,
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  )
}