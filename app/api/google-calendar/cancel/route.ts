import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { getCalendarFromClerk, getSheetsFromClerk } from '@/lib/google-from-clerk';
import { updateEvent } from '@/lib/calendar-service';
import { supabase } from '@/lib/supabase-client';

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const body = await request.json();
    const { 
      eventId, 
      customerPhone, 
      customerName, 
      serviceType,
      originalDateTime,
      conversationHistory,
      supabaseEventId
    } = body;

    if (!eventId) {
      return NextResponse.json({ 
        error: 'Missing required field: eventId' 
      }, { status: 400 });
    }

    // Get Google Calendar client
    const calendar = await getCalendarFromClerk(request.nextUrl.origin);
    
    // Delete the event from Google Calendar
    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId
    });

    // Cancel in Supabase if supabaseEventId is provided
    if (supabaseEventId) {
      await updateEvent(userId, supabaseEventId, {
        status: 'cancelled',
        notes: `Cancelled via AI call`
      });
    } else {
      try {
        const lookup = await supabase
          .from('events')
          .select('id')
          .eq('user_id', userId)
          .ilike('notes', `%Google Calendar ID: ${eventId}%`)
          .limit(1)

        if (!lookup.error && lookup.data?.length) {
          await updateEvent(userId, lookup.data[0].id, {
            status: 'cancelled',
            notes: `Cancelled via AI call`
          });
        }
      } catch (lookupError) {
        console.error('Supabase fallback lookup failed for cancel:', lookupError);
      }
    }

    // Update Google Sheets with cancel activity (NO SMS as requested)
    try {
      const sheets = await getSheetsFromClerk(request.nextUrl.origin);
      const user = await (await clerkClient()).users.getUser(userId);
      const userSpreadsheetId = user.privateMetadata?.userSpreadsheetId as string;
      
      if (userSpreadsheetId) {
        const timestamp = new Date().toISOString();
        const rowData = [
          timestamp,                    // A: Timestamp
          'CANCEL',                    // B: Activity Type
          customerPhone || 'N/A',      // C: Phone Number
          customerName || 'N/A',       // D: Customer Name
          serviceType || 'N/A',        // E: Service Type
          originalDateTime || 'N/A',   // F: Original Date/Time
          '',                          // G: New Date/Time (empty for cancel)
          conversationHistory || 'N/A', // H: Conversation History
          'Cancelled via AI call'      // I: Notes
        ];

        await sheets.spreadsheets.values.append({
          spreadsheetId: userSpreadsheetId,
          range: 'Sheet1!A:I',
          valueInputOption: 'RAW',
          requestBody: {
            values: [rowData]
          }
        });
      }
    } catch (sheetsError) {
      console.error('Google Sheets update failed:', sheetsError);
      // Don't fail the whole request if Sheets update fails
    }

    return NextResponse.json({
      success: true,
      message: 'Event cancelled successfully',
      eventId: eventId,
      supabaseEventId: supabaseEventId,
      smsSent: false // Explicitly indicate no SMS was sent
    });

  } catch (error: any) {
    console.error('Cancel error:', error);
    
    // Handle specific error cases
    if (error.code === 404) {
      return NextResponse.json({ 
        error: 'Event not found',
        details: 'The specified event ID does not exist'
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to cancel event',
      details: error.message 
    }, { status: 500 });
  }
}
