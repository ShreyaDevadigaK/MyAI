import { google } from 'googleapis'
import { cookies } from 'next/headers'

export function getUserOAuthClient(origin: string) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID || ''
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET || ''
  if (!clientId || !clientSecret) throw new Error('Missing Google OAuth env vars')
  const redirectUri = `${origin}/api/google/oauth`
  const oauth2 = new google.auth.OAuth2({ clientId, clientSecret, redirectUri })
  const cs = cookies()
  const access_token = cs.get('google_access_token')?.value
  const refresh_token = cs.get('google_refresh_token')?.value
  const expiry_date = cs.get('google_token_expiry')?.value
  oauth2.setCredentials({ access_token, refresh_token, expiry_date: expiry_date ? Number(expiry_date) : undefined })
  return oauth2
}

export function getUserCalendar(origin: string) {
  const auth = getUserOAuthClient(origin)
  return google.calendar({ version: 'v3', auth })
}

export function getUserSheets(origin: string) {
  const auth = getUserOAuthClient(origin)
  return google.sheets({ version: 'v4', auth })
}


