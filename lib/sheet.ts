// lib/sheets.ts
import { google } from 'googleapis';

export async function fetchSheetData() {
  try {
    // Validate environment variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS environment variable is missing');
    }
    
    if (!process.env.SHEET_ID) {
      throw new Error('SHEET_ID environment variable is missing');
    }

    let credentials;
    try {
      credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);
    } catch {
      throw new Error('Invalid JSON format in GOOGLE_SERVICE_ACCOUNT_CREDENTIALS');
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: 'Sheet1!A1:E', 
    });

    return res.data.values || [];
  } catch (error) {
    console.error('Error in fetchSheetData:', error);
    throw error;
  }
}
