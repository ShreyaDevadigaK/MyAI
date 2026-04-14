// app/api/twilio/buy-number/route.ts

import twilio from 'twilio';
import { NextResponse } from 'next/server';


// export async function POST(request: Request) {

//   const accountSid = process.env.TWILIO_ACCOUNT_SID;
//   const authToken = process.env.TWILIO_AUTH_TOKEN;

//   const client = twilio(accountSid, authToken);

 
//   const { phoneNumber, areaCode, addressSid, bundleSid } = await request.json();


//   if (!phoneNumber && !areaCode) {
//     return NextResponse.json({ success: false, message: 'Either phoneNumber or areaCode is required to purchase a number.' }, { status: 400 });
//   }

//   try {
//     let incomingPhoneNumber;

//     if (phoneNumber) {
 
//       incomingPhoneNumber = await client.incomingPhoneNumbers.create({
//         phoneNumber: phoneNumber,
//         addressSid: addressSid,
//         bundleSid: bundleSid,   
//       });
//     } else if (areaCode) {
     
//       incomingPhoneNumber = await client.incomingPhoneNumbers.create({
//         areaCode: areaCode,
//         addressSid: addressSid,
//         bundleSid: bundleSid,
//       });
//     } else {
  
//       return NextResponse.json({ success: false, message: 'Invalid request payload.' }, { status: 400 });
//     }


   
//     return NextResponse.json({ success: true, purchasedNumber: incomingPhoneNumber });

//   } catch (error: any) {
//     console.error('Error buying Twilio number:', error);

//     return NextResponse.json({ success: false, message: 'Failed to buy number', error: error.message }, { status: error.status || 500 });
//   }
// }




export async function POST(request: Request) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID!;
  const authToken = process.env.TWILIO_AUTH_TOKEN!;

  const client = twilio(accountSid, authToken);

  const { phoneNumber, areaCode, addressSid, bundleSid } = await request.json();

  if (!phoneNumber && !areaCode) {
    return NextResponse.json({
      success: false,
      message: 'Either phoneNumber or areaCode is required to purchase a number.',
    }, { status: 400 });
  }

  try {
    const toolBaseUrl = (process.env.toolBaseUrl || process.env.ULTRAVOX_TOOL_BASE_URL || '').replace(/\/$/, '')
    const params: Record<string, any> = {
      addressSid,
      bundleSid,
      voiceUrl: `${toolBaseUrl}/api/inbound`,
      voiceMethod: 'POST',
    };

    if (phoneNumber) {
      params.phoneNumber = phoneNumber;
    } else {
      params.areaCode = areaCode;
    }

    const incomingPhoneNumber = await client.incomingPhoneNumbers.create(params);

    return NextResponse.json({
      success: true,
      purchasedNumber: incomingPhoneNumber,
    });
  } catch (error: any) {
    console.error('Error buying Twilio number:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to buy number',
      error: error.message,
    }, { status: error.status || 500 });
  }
}
