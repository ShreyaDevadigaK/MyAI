
import { NextResponse } from 'next/server';
import { fetchSheetData } from '@/lib/sheet';

export async function GET() {
  try {
    const data = await fetchSheetData();
    console.log('Fetched data from sheet:', data);
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    
    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ 
      error: 'Failed to fetch data',
      details: errorMessage 
    }, { status: 500 });
  }
}
