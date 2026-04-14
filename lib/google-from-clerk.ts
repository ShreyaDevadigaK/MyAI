import { google } from 'googleapis'
import { auth, clerkClient } from '@clerk/nextjs/server'


export async function getGoogleAuthFromClerk(origin: string) {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID || ''
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET || ''
  if (!clientId || !clientSecret) throw new Error('Missing Google OAuth env vars')
  const redirectUri = `${origin}/api/google/oauth`
  const oauth2 = new google.auth.OAuth2({ clientId, clientSecret, redirectUri })

  const { userId } = await auth()
  if (!userId) throw new Error('Unauthenticated')
  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  const tokens = (user.privateMetadata as { googleTokens?: unknown })?.googleTokens as { access_token?: string } | undefined;
  if (!tokens?.access_token) throw new Error('Google not connected')
  oauth2.setCredentials(tokens)
  return oauth2
}

export async function getCalendarFromClerk(origin: string) {
  const auth = await getGoogleAuthFromClerk(origin)
  return google.calendar({ version: 'v3', auth })
}

export async function getSheetsFromClerk(origin: string) {
  const auth = await getGoogleAuthFromClerk(origin)
  return google.sheets({ version: 'v4', auth })
}

export async function getUserSpreadsheetId(): Promise<string | undefined> {
  const { userId } = await auth()
  if (!userId) return undefined
  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  return (user.privateMetadata as { userSpreadsheetId?: string })?.userSpreadsheetId;
}

export async function validateSpreadsheetExists(sheets: { spreadsheets: any }, spreadsheetId: string): Promise<boolean> {
  try {
    await sheets.spreadsheets.get({ spreadsheetId })
    return true
  } catch (error) {
    console.error('Spreadsheet validation error:', error)
    return false
  }
}

export async function createSpreadsheet(sheets: { spreadsheets: any }, title: string): Promise<string> {
  const resource = {
    properties: {
      title: title,
    },
  };
  const response = await sheets.spreadsheets.create({ resource });
  return response.data.spreadsheetId;
}

export async function validateSheetExists(sheets: { spreadsheets: any }, spreadsheetId: string, sheetName: string): Promise<boolean> {
  try {
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId })
    const sheetsList = spreadsheet.data.sheets || []
    
    return sheetsList.some((sheet: { properties?: { title?: string } }) => 
      sheet.properties?.title?.toLowerCase() === sheetName.toLowerCase()
    )
  } catch (error) {
    console.error('Sheet validation error:', error)
    return false
  }
}

export async function listAvailableSheets(sheets: { spreadsheets: any }, spreadsheetId: string): Promise<string[]> {
  try {
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId })
    const sheetsList = spreadsheet.data.sheets || []
    
    return sheetsList.map((sheet: { properties?: { title?: string } }) => sheet.properties?.title || 'Untitled Sheet')
  } catch (error) {
    console.error('Error listing sheets:', error)
    return []
  }
}









