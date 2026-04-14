import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { getCalendarFromClerk, getSheetsFromClerk } from '@/lib/google-from-clerk';
import { updateEvent } from '@/lib/calendar-service';
import { supabase } from '@/lib/supabase-client';
import twilio from 'twilio';
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
      newDateTime, 
      customerPhone, 
      customerName, 
      serviceType,
      originalDateTime,
      conversationHistory,
      supabaseEventId
    } = body;

    if (!eventId || !newDateTime) {
      return NextResponse.json({ 
        error: 'Missing required fields: eventId and newDateTime' 
      }, { status: 400 });
    }

    // Get Google Calendar client
    const calendar = await getCalendarFromClerk(request.nextUrl.origin);
    
    // Get the existing event to preserve details
    const existingEvent = await calendar.events.get({
      calendarId: 'primary',
      eventId: eventId
    });

    if (!existingEvent.data) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Parse the new date time
    const newDate = new Date(newDateTime);
    const endDate = new Date(newDate.getTime() + 60 * 60 * 1000); // 1 hour duration

    // Update the event in Google Calendar
    const updatedEvent = await calendar.events.update({
      calendarId: 'primary',
      eventId: eventId,
      requestBody: {
        ...existingEvent.data,
        start: {
          dateTime: newDate.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        description: `Rescheduled from ${originalDateTime} to ${newDateTime}\n\n${conversationHistory || ''}`,
        attendees: existingEvent.data.attendees || []
      }
    });

    // Update in Supabase if supabaseEventId is provided
    if (supabaseEventId) {
      await updateEvent(userId, supabaseEventId, {
        start_time: newDate.toISOString(),
        end_time: endDate.toISOString(),
        notes: `Rescheduled from ${originalDateTime} to ${newDateTime}`
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
            start_time: newDate.toISOString(),
            end_time: endDate.toISOString(),
            notes: `Rescheduled from ${originalDateTime} to ${newDateTime}`
          });
        }
      } catch (lookupError) {
        console.error('Supabase fallback lookup failed for reschedule:', lookupError);
      }
    }

    // Send SMS notification if Twilio is configured
    if (customerPhone && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
      try {
        const twilioClient = twilio(
          process.env.TWILIO_ACCOUNT_SID,
          process.env.TWILIO_AUTH_TOKEN
        );

        const message = await twilioClient.messages.create({
          body: `Hi ${customerName || 'there'}! Your ${serviceType || 'appointment'} has been rescheduled to ${newDate.toLocaleString()}. If you have any questions, please call us.`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: customerPhone
        });

        console.log('SMS sent:', message.sid);
      } catch (smsError) {
        console.error('SMS sending failed:', smsError);
        // Don't fail the whole request if SMS fails
      }
    }

    // Update Google Sheets with reschedule activity
    try {
      const sheets = await getSheetsFromClerk(request.nextUrl.origin);
      const user = await (await clerkClient()).users.getUser(userId);
      const userSpreadsheetId = user.privateMetadata?.userSpreadsheetId as string;
      
      if (userSpreadsheetId) {
        const timestamp = new Date().toISOString();
        const rowData = [
          timestamp,
          'RESCHEDULE',
          customerPhone || 'N/A',
          customerName || 'N/A',
          serviceType || 'N/A',
          originalDateTime || 'N/A',
          newDateTime,
          conversationHistory || 'N/A',
          'Rescheduled via AI call'
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
      message: 'Event rescheduled successfully',
      eventId: updatedEvent.data.id,
      newDateTime: newDateTime,
      smsSent: !!customerPhone
    });

  } catch (error: unknown) {
    console.error('Reschedule error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Failed to reschedule event',
      details: errorMessage 
    }, { status: 500 });
  }
}
