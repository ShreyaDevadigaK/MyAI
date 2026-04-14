import { NextResponse } from 'next/server'

export async function POST() {
  return new NextResponse(
    `<Response>
      <Say>Connecting you now.</Say>
    </Response>`,
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  )
}