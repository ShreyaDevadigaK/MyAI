import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { cookies } from 'next/headers'
import { auth, clerkClient } from '@clerk/nextjs/server'

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID || '';
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET || '';
  
  console.log('Client ID:', clientId);
  console.log('Client Secret:', clientSecret);
  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: 'Missing Google OAuth env vars' }, { status: 500 })
  }

  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const cookieStore = await cookies()
  const expectedState = cookieStore.get('google_oauth_state')?.value
  if (!code) return NextResponse.json({ error: 'Missing code' }, { status: 400 })
  if (expectedState && state && state !== expectedState) return NextResponse.json({ error: 'Invalid state' }, { status: 400 })

  const redirectUri = `${request.nextUrl.origin}/api/google/oauth`
  const oauth2Client = new google.auth.OAuth2({ clientId, clientSecret, redirectUri })
  const { tokens } = await oauth2Client.getToken(code)

  console.log('Tokens:', tokens); // Log the tokens

  // Get the stored redirect destination
  const redirectDestination = cookieStore.get('google_oauth_redirect')?.value || '/Dashboard'
  
  // If no specific redirect was set, default to Dashboard
  let finalRedirect = redirectDestination;
  const industrySlug = cookieStore.get('industry_slug')?.value; // Get the industry slug from cookies
  if (industrySlug) {
      finalRedirect = `/test-chat?industry=${industrySlug}`; // Redirect to test-chat with industry slug
  }
  
  const res = NextResponse.redirect(new URL(finalRedirect, request.url))
  const cookieOptions = { httpOnly: true, secure: true, sameSite: 'lax' as const, path: '/', maxAge: 60 * 60 * 24 * 30 }
  if (tokens.access_token) res.cookies.set('google_access_token', tokens.access_token, cookieOptions)
  if (tokens.refresh_token) res.cookies.set('google_refresh_token', tokens.refresh_token, cookieOptions)
  if (tokens.expiry_date) res.cookies.set('google_token_expiry', String(tokens.expiry_date), cookieOptions)
  res.cookies.set('google_oauth_state', '', { ...cookieOptions, maxAge: 0 })
  res.cookies.set('google_oauth_redirect', '', { ...cookieOptions, maxAge: 0 })

  // Persist tokens in Clerk privateMetadata for server-side usage (optional - only if user is authenticated)
  try {
    const { userId } = await auth()
    if (userId) {
      const client = await clerkClient()
      
      // Set credentials on the OAuth client before using it
      oauth2Client.setCredentials(tokens)
      
      // Create or get user's spreadsheet
      const spreadsheetId = await createOrGetUserSpreadsheet(oauth2Client, userId)
      
      await client.users.updateUser(userId, {
        privateMetadata: {
          googleTokens: {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expiry_date: tokens.expiry_date,
          },
          userSpreadsheetId: spreadsheetId
        }
      })
    } else {
      // User is not authenticated with Clerk, but Google OAuth was successful
      // They can still proceed with Google tokens via cookies (optional sign-up)
      console.log('User proceeded with Google OAuth without Clerk authentication')
    }
  } catch (error) {
    console.error('Error storing Google tokens:', error)
    // Don't block the user if Clerk metadata storage fails - they can still use Google tokens
  }
  return res
}

async function createOrGetUserSpreadsheet(auth: unknown, userId: string): Promise<string> {
  console.log('Attempting to create or get spreadsheet for user:', userId);
  try {
    console.log('Creating spreadsheet for user:', userId);
    const sheets = google.sheets({ version: 'v4', auth })
    
    // Try to create a new spreadsheet
    console.log('Attempting to create spreadsheet...');
    const spreadsheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: `Dialzara Activity - User ${userId}`,
        },
        sheets: [
          {
            properties: {
              title: 'Call Activities',
              gridProperties: {
                rowCount: 1000,
                columnCount: 9,
              }
            }
          }
        ]
      }
    })
    
    if (spreadsheet.data.spreadsheetId) {
      // Set up headers for the activity sheet
      await sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheet.data.spreadsheetId,
        range: 'Call Activities!A1:I1',
        valueInputOption: 'RAW',
        requestBody: {
          values: [[
            'Timestamp',
            'Activity Type',
            'Phone Number',
            'Customer Name',
            'Service Type',
            'Date/Time',
            'New Date/Time',
            'Conversation History',
            'Notes'
          ]]
        }
      })
      
      return spreadsheet.data.spreadsheetId
    }
  } catch (error) {
    console.error('Error creating spreadsheet:', error)
    // Fallback to using the default sheet ID from environment
    return process.env.SHEET_ID || ''
  }
  
  return process.env.SHEET_ID || ''
}


