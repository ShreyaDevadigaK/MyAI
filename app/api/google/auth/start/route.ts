import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { google } from 'googleapis'

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID || ''
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET || ''
  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'Missing Google OAuth env vars' }, { status: 500 })
  }

  const redirectUri = `${request.nextUrl.origin}/api/google/oauth`
  const oauth2Client = new google.auth.OAuth2({ clientId, clientSecret, redirectUri })

  const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/spreadsheets',
    'openid',
    'email',
    'profile',
  ]

  const state = Math.random().toString(36).slice(2)
  const res = NextResponse.redirect(oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
    state,
  }))

  // Store state and redirect destination
  res.cookies.set('google_oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 10 * 60,
  })

  // Store where to redirect after OAuth (from query params)
let redirectDestination = request.nextUrl.searchParams.get('redirect') || '/Dashboard'; // Change to let for reassignment
const industrySlug = request.nextUrl.searchParams.get('industry'); // Get the industry slug
if (industrySlug) {
    redirectDestination = `/test-chat?industry=${industrySlug}`; // Redirect to test-chat with industry slug
    // Also store the industry slug in a separate cookie for the callback route
    res.cookies.set('industry_slug', industrySlug, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 10 * 60,
    });
}
  res.cookies.set('google_oauth_redirect', redirectDestination, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 10 * 60,
  })

  return res
}


