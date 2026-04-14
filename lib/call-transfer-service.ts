import { google } from 'googleapis';

const SPREADSHEET_ID = process.env.CALL_TRANSFERS_SHEET_ID || '';
const GOOGLE_SERVICE_ACCOUNT_CREDENTIALS = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS || '';

if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_CREDENTIALS) {
  console.error('Google Sheets configuration missing for call transfers');
}

let credentials: Record<string, unknown> | undefined;
try {
  credentials = JSON.parse(GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);
} catch {
  console.error('Invalid JSON in GOOGLE_SERVICE_ACCOUNT_CREDENTIALS');
}

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

export async function getActivePhoneNumberFromCallTransfers(): Promise<string | null> {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:E',
    });

    const rows = response.data.values || [];
    
    // Skip header row and find active transfer
    const activeTransfer = rows.slice(1).find(row => 
      row[4]?.toLowerCase() === 'true'
    );

    if (!activeTransfer) {
      console.log('No active call transfer found');
      return null;
    }

    const rawPhoneNumber = activeTransfer[1] || null;
    if (!rawPhoneNumber) {
      return null;
    }

    // Format phone number with +91 country code
    const cleaned = rawPhoneNumber.replace(/\D/g, '');
    
    // Handle different phone number formats
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      return `+${cleaned}`;
    }
    
    if (cleaned.startsWith('0')) {
      return `+91${cleaned.substring(1)}`;
    }
    
    if (cleaned.length === 10) {
      return `+91${cleaned}`;
    }
    
    // If already has +91 or other format, return as-is
    if (rawPhoneNumber.trim().startsWith('+')) {
      return rawPhoneNumber.trim();
    }
    
    return `+91${cleaned}`;
  } catch (error: unknown) {
    console.error('Error fetching active phone number from call transfers:', error);
    return null;
  }
}
