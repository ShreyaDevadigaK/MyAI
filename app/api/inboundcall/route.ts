import twilio from 'twilio';
import https from 'https';
import { NextRequest, NextResponse } from 'next/server';

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || '';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '';
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || '';
const ULTRAVOX_API_KEY = process.env.ULTRAVOX_API_KEY || '';

function createUltravoxCall(ultravoxCallConfig: any) {
  const ULTRAVOX_API_URL = 'https://api.ultravox.ai/api/calls';

  const request = https.request(ULTRAVOX_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': ULTRAVOX_API_KEY,
    },
  });

  return new Promise((resolve, reject) => {
    let data = '';
    request.on('response', (response) => {
      response.on('data', (chunk) => (data += chunk));
      response.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
            resolve(parsedData);
          } else {
            reject(new Error(`Ultravox API error (${response.statusCode}): ${data}`));
          }
        } catch (parseError) {
          reject(new Error(`Failed to parse Ultravox response: ${data}`));
        }
      });
    });
    request.on('error', (error) => {
      reject(new Error(`Network error calling Ultravox: ${error.message}`));
    });
    request.write(JSON.stringify(ultravoxCallConfig));
    request.end();
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, phoneNumber, voice, transferNumbers, greeting } = body;

    if (!prompt || !phoneNumber) {
      return NextResponse.json({ error: 'Missing prompt or phoneNumber' }, { status: 400 });
    }

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER || !ULTRAVOX_API_KEY) {
      return NextResponse.json({ error: 'Server configuration missing' }, { status: 500 });
    }

    const transferNumbersList = transferNumbers && transferNumbers.length > 0
      ? transferNumbers.join(', ')
      : 'No transfer numbers configured';

    const origin = new URL(request.url).origin;
    const requestedToolBaseUrl = (process.env.toolBaseUrl || process.env.ULTRAVOX_TOOL_BASE_URL || '').replace(/\/$/, '')
    let toolBaseUrl = requestedToolBaseUrl || origin;

    if (!toolBaseUrl.startsWith('https://')) {
      console.warn('Warning: toolBaseUrl is not HTTPS. Falling back to secure public URL for Ultravox tool webhook callbacks.')
      toolBaseUrl = 'https://myai.loca.lt'
    }

    const systemPrompt = prompt + `

GOOGLE CALENDAR TOOL USAGE:
When user says: 'schedule a meeting', 'book a call', 'book services' or 'schedule this'
You should: Immediately call google_calendar_schedule with event_details='Conversation-derived event summary'
When user says: 'reschedule this', 'reschedule my services'
You should: Immediately call google_calendar_reschedule
When user says: 'cancel the service', 'delete the event'
You should: Immediately call google_calendar_cancel
Always call the tool immediately without asking for confirmation.

CALL TRANSFER USAGE:
When user asks to transfer the call or speak to a human agent or service provider or some other people or manager, use the transferCall tool with one of the configured phone numbers.
Available transfer numbers: ${transferNumbersList}
`;

    const ULTRAVOX_CALL_CONFIG = {
      systemPrompt,
      model: 'fixie-ai/ultravox',
      voice: voice || 'f0ed7e07-0e85-4853-a8f5-e09c627cf944',
      temperature: 0.4,
      firstSpeakerSettings: { 
        agent: {
          uninterruptible: true,
          text: greeting || "Hello",
        }
      },
      medium: { twilio: {} },
      selectedTools: [
        {
          temporaryTool: {
            modelToolName: 'google_calendar_schedule',
            description: 'Schedules a new event in Google Calendar when user asks to schedule or book.',
            dynamicParameters: [
              {
                name: 'event_details',
                location: 'PARAMETER_LOCATION_BODY',
                schema: {
                  type: 'string',
                  description: 'Details of the event to schedule',
                },
                required: true,
              },
            ],
            automaticParameters: [
              { name: 'conversation_history', location: 'PARAMETER_LOCATION_BODY', knownValue: 'KNOWN_PARAM_CONVERSATION_HISTORY' },
              { name: 'call_id', location: 'PARAMETER_LOCATION_BODY', knownValue: 'KNOWN_PARAM_CALL_ID' },
              { name: 'call_state', location: 'PARAMETER_LOCATION_BODY', knownValue: 'KNOWN_PARAM_CALL_STATE' },
            ],
            http: {
              baseUrlPattern: `${toolBaseUrl}/api/google-calendar/schedule`,
              httpMethod: 'POST',
            },
          },
        },
        {
          temporaryTool: {
            modelToolName: 'google_calendar_reschedule',
            description: 'Reschedules an existing event in Google Calendar.',
            dynamicParameters: [
              {
                name: 'event_details',
                location: 'PARAMETER_LOCATION_BODY',
                schema: {
                  type: 'string',
                  description: 'Details needed to reschedule the event',
                },
                required: true,
              },
            ],
            automaticParameters: [
              { name: 'conversation_history', location: 'PARAMETER_LOCATION_BODY', knownValue: 'KNOWN_PARAM_CONVERSATION_HISTORY' },
              { name: 'call_id', location: 'PARAMETER_LOCATION_BODY', knownValue: 'KNOWN_PARAM_CALL_ID' },
              { name: 'call_state', location: 'PARAMETER_LOCATION_BODY', knownValue: 'KNOWN_PARAM_CALL_STATE' },
            ],
            http: {
              baseUrlPattern: `${toolBaseUrl}/api/google-calendar/reschedule`,
              httpMethod: 'POST',
            },
          },
        },
        {
          temporaryTool: {
            modelToolName: 'google_calendar_cancel',
            description: 'Cancels an existing event in Google Calendar.',
            dynamicParameters: [
              {
                name: 'event_id',
                location: 'PARAMETER_LOCATION_BODY',
                schema: {
                  type: 'string',
                  description: 'The ID or info about the event to cancel',
                },
                required: true,
              },
            ],
            automaticParameters: [
              { name: 'conversation_history', location: 'PARAMETER_LOCATION_BODY', knownValue: 'KNOWN_PARAM_CONVERSATION_HISTORY' },
              { name: 'call_id', location: 'PARAMETER_LOCATION_BODY', knownValue: 'KNOWN_PARAM_CALL_ID' },
              { name: 'call_state', location: 'PARAMETER_LOCATION_BODY', knownValue: 'KNOWN_PARAM_CALL_STATE' },
            ],
            http: {
              baseUrlPattern: `${toolBaseUrl}/api/google-calendar/cancel`,
              httpMethod: 'POST',
            },
          },
        },
        {
          temporaryTool: {
            modelToolName: 'transferCall',
            description: 'Transfer the current call to the active phone number from call-transfers API when requested by the user or when call transfer is needed.',
            dynamicParameters: [
              {
                name: 'transferReason',
                location: 'PARAMETER_LOCATION_BODY',
                schema: {
                  type: 'string',
                  description: 'Brief explanation of why the call is being transferred',
                },
                required: true,
              },
            ],
            automaticParameters: [
              { name: 'conversation_history', location: 'PARAMETER_LOCATION_BODY', knownValue: 'KNOWN_PARAM_CONVERSATION_HISTORY' },
              { name: 'call_id', location: 'PARAMETER_LOCATION_BODY', knownValue: 'KNOWN_PARAM_CALL_ID' },
              { name: 'call_state', location: 'PARAMETER_LOCATION_BODY', knownValue: 'KNOWN_PARAM_CALL_STATE' },
            ],
            http: {
              baseUrlPattern: `${toolBaseUrl}/api/transfer-call`,
              httpMethod: 'POST',
            },
          },
        },
      ],
    };

    const ultravoxResponse: any = await createUltravoxCall(ULTRAVOX_CALL_CONFIG);

    if (!ultravoxResponse.joinUrl) {
      return NextResponse.json({ error: 'No joinUrl received from Ultravox API' }, { status: 500 });
    }

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    const call = await client.calls.create({
      twiml: `<Response><Connect><Stream url="${ultravoxResponse.joinUrl}"/></Connect></Response>`,
      to: phoneNumber,
      from: TWILIO_PHONE_NUMBER,
    });

    return NextResponse.json({
      message: 'Call initiated successfully',
      callSid: call.sid,
      ultravoxCallId: ultravoxResponse.callId,
      joinUrl: ultravoxResponse.joinUrl,
      to: phoneNumber,
    });

  } catch (error: any) {
    console.error('Error in POST /api/inboundcall:', error);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
