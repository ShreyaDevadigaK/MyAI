// app/api/inbound/route.ts

import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: Request) {
  try {
    const bodyText = await request.text();
    const params = new URLSearchParams(bodyText);

    const from = params.get('From');
    const to = params.get('To');

    if (!from || !to) {
      const twiml = new twilio.twiml.VoiceResponse();
      twiml.say('Invalid call parameters.');
      return new NextResponse(twiml.toString(), {
        headers: { 'Content-Type': 'text/xml' },
      });
    }

    // Prepare payload for your existing /api/call
    const payload = {
      phoneNumber: from,
      prompt: `Inbound call from ${from}`,
      voice: undefined,
      transferNumbers: [],
    };

    const toolBaseUrl = (process.env.toolBaseUrl || process.env.ULTRAVOX_TOOL_BASE_URL || '').replace(/\/$/, '')
    let res, data;
    try {
      res = await fetch(`${toolBaseUrl}/api/inboundcall`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      data = await res.json();
    } catch (err) {
      console.error('Error calling /api/inboundcall:', err);
    }

    const joinUrl = data?.joinUrl;
    if (!res?.ok || typeof joinUrl !== 'string') {
      const twiml = new twilio.twiml.VoiceResponse();
      twiml.say('We are unable to connect you at the moment. Please try again later.');
      return new NextResponse(twiml.toString(), {
        headers: { 'Content-Type': 'text/xml' },
      });
    }

    const twiml = new twilio.twiml.VoiceResponse();
    twiml.connect().stream({ url: joinUrl });

    return new NextResponse(twiml.toString(), {
      headers: { 'Content-Type': 'text/xml' },
    });
  } catch (err: unknown) {
    console.error('Inbound handler error:', err);
    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say('An unexpected error occurred. Please try again later.');
    return new NextResponse(twiml.toString(), {
      headers: { 'Content-Type': 'text/xml' },
    });
  }
}

