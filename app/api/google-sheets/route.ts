import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getSheetsFromClerk, getUserSpreadsheetId, validateSpreadsheetExists, validateSheetExists } from '@/lib/google-from-clerk'

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const range = request.nextUrl.searchParams.get('range') || 'Call Activities!A1:I'
    const spreadsheetId = request.nextUrl.searchParams.get('spreadsheetId') || (await getUserSpreadsheetId())
    
    if (!spreadsheetId) {
      return NextResponse.json({ 
        error: 'Google Sheets not configured. Please connect your Google account and set up a spreadsheet.' 
      }, { status: 400 })
    }

    const sheets = await getSheetsFromClerk(request.nextUrl.origin)
    
    // Validate that the spreadsheet exists
    const spreadsheetExists = await validateSpreadsheetExists(sheets, spreadsheetId)
    if (!spreadsheetExists) {
      return NextResponse.json({ 
        error: `Spreadsheet with ID ${spreadsheetId} not found or access denied. Please check your Google Sheets configuration.` 
      }, { status: 404 })
    }

    // Extract sheet name from range (e.g., "Call Activities!A1:I" -> "Call Activities")
    const sheetName = range.split('!')[0];
    
    // Validate that the sheet exists
    const sheetExists = await validateSheetExists(sheets, spreadsheetId, sheetName)
    if (!sheetExists) {
      return NextResponse.json({ 
        error: `Sheet "${sheetName}" not found in the spreadsheet. Please ensure the sheet exists or use a different range.`,
        suggestion: 'Available sheets can be viewed after connecting your Google account'
      }, { status: 404 })
    }

    const res = await sheets.spreadsheets.values.get({ spreadsheetId, range })
    return NextResponse.json({ values: res.data.values || [] })
  } catch (error: unknown) {
    console.error('Google Sheets API Error:', error)
    
    const errorMessage = error instanceof Error ? error.message : '';

    // Handle specific Google API errors
    if (errorMessage?.includes('Unable to parse range')) {
      return NextResponse.json({ 
        error: `Invalid range format. Please check the range syntax.`,
        suggestion: 'Format should be: SheetName!A1:Z100'
      }, { status: 400 })
    }
    
    if (errorMessage?.includes('PERMISSION_DENIED')) {
      return NextResponse.json({ 
        error: 'Permission denied. Please ensure your Google account has access to this spreadsheet.' 
      }, { status: 403 })
    }
    
    if (errorMessage?.includes('NOT_FOUND')) {
      return NextResponse.json({ 
        error: 'Spreadsheet or sheet not found. Please check your Google Sheets configuration.' 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      error: errorMessage || 'Failed to fetch data from Google Sheets. Please try again.' 
    }, { status: 500 })
  }
}


