import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.CALL_TRANSFERS_SHEET_ID || '';
const GOOGLE_SERVICE_ACCOUNT_CREDENTIALS = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS || '';

if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_CREDENTIALS) {
  console.error('Google Sheets configuration missing for call transfers');
}

let credentials;
try {
  credentials = JSON.parse(GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);
} catch (e) {
  console.error('Invalid JSON in GOOGLE_SERVICE_ACCOUNT_CREDENTIALS');
}

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function GET() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:E',
    });

    const rows = response.data.values || [];
    
    // Skip header row and map data
    const transfers = rows.slice(1).map(row => ({
      id: row[0] || '',
      phoneNumber: row[1] || '',
      createdAt: row[2] || '',
      updatedAt: row[3] || '',
      isActive: row[4]?.toLowerCase() === 'true',
    }));

    return NextResponse.json({ transfers });
  } catch (error: unknown) {
    console.error('Error fetching call transfers:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber } = body;

    if (!phoneNumber) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const timestamp = new Date().toISOString();
    const id = `transfer_${Date.now()}`;
    
    const values = [[id, phoneNumber, timestamp, timestamp, 'true']];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    return NextResponse.json({ 
      message: 'Call transfer added successfully',
      transfer: { id, phoneNumber, createdAt: timestamp, updatedAt: timestamp, isActive: true }
    });
  } catch (error: unknown) {
    console.error('Error adding call transfer:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    // Get current data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:E',
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex(row => row[0] === id);

    if (rowIndex === -1) {
      return NextResponse.json({ error: 'Transfer not found' }, { status: 404 });
    }

    // Update the row to mark as inactive
    const range = `Sheet1!E${rowIndex + 1}`;
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [['false']] },
    });

    return NextResponse.json({ message: 'Call transfer deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting call transfer:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, isActive } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    if (typeof isActive !== 'boolean') {
      return NextResponse.json({ error: 'isActive must be a boolean' }, { status: 400 });
    }

    // Get current data
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:E',
    });

    const rows = response.data.values || [];
    const rowIndex = rows.findIndex(row => row[0] === id);

    if (rowIndex === -1) {
      return NextResponse.json({ error: 'Transfer not found' }, { status: 404 });
    }

    // Update the active state
    const range = `Sheet1!E${rowIndex + 1}`;
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [[isActive.toString()]] },
    });

    // Update the updatedAt timestamp
    const updatedAtRange = `Sheet1!D${rowIndex + 1}`;
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: updatedAtRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [[new Date().toISOString()]] },
    });

    return NextResponse.json({ 
      message: 'Call transfer updated successfully',
      transfer: { id, isActive }
    });
  } catch (error: unknown) {
    console.error('Error updating call transfer:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
