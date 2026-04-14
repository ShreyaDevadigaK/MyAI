// app/api/listvoice/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.ULTRAVOX_API_KEY;

  try {
    if (!apiKey) {
      console.error('ULTRAVOX_API_KEY is not set');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    const res = await fetch('https://api.ultravox.ai/api/voices?primaryLanguage=en', {
      headers: {
        'X-API-Key': apiKey,
      },
    });

    if (!res.ok) {
      console.error(`Ultravox API returned ${res.status}:`, await res.text());
      return NextResponse.json({ error: `API returned ${res.status}` }, { status: 500 });
    }

    const data = await res.json();
    console.log('Ultravox API response:', data);

    // Handle different response formats
    const voices = data.results || data.voices || data || [];
    
    return NextResponse.json({ results: Array.isArray(voices) ? voices : [] });
  } catch (err) {
    console.error('Error fetching voices:', err);
    return NextResponse.json({ error: 'Failed to fetch voices', details: String(err) }, { status: 500 });
  }
}
