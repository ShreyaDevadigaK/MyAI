

import twilio from 'twilio';
import { NextResponse } from 'next/server';


// export async function GET(request: Request) {

//   const accountSid = process.env.TWILIO_ACCOUNT_SID;
//   const authToken = process.env.TWILIO_AUTH_TOKEN;

//   const client = twilio(accountSid, authToken);


//   const { searchParams } = new URL(request.url);


//   const country = searchParams.get('country') || 'US';
//   const type = searchParams.get('type') || 'Local'; 
//   const areaCode = searchParams.get('areaCode'); 
//   const smsEnabled = searchParams.get('smsEnabled') === 'true'; 
//   const mmsEnabled = searchParams.get('mmsEnabled') === 'true';
//   const voiceEnabled = searchParams.get('voiceEnabled') === 'true';

//   try {
//     let availableNumbers;


//     const listOptions: any = { 
//       smsEnabled: smsEnabled,
//       mmsEnabled: mmsEnabled,
//       voiceEnabled: voiceEnabled,
//       limit: 50, 
//     };


//     if (areaCode) {
//       listOptions.areaCode = areaCode;
//     }


//     if (type === 'Local') {
//       availableNumbers = await client.availablePhoneNumbers(country).local.list(listOptions);
//     } else if (type === 'Mobile') {
//       delete listOptions.areaCode; 
//       availableNumbers = await client.availablePhoneNumbers(country).mobile.list(listOptions);
//     } else if (type === 'TollFree') {
//       delete listOptions.areaCode; 
//       availableNumbers = await client.availablePhoneNumbers(country).tollFree.list(listOptions);
//     } else {
//       return NextResponse.json({ success: false, message: 'Invalid phone number type specified.' }, { status: 400 });
//     }

//     // --- Fetch Pricing Information ---
//     let monthlyPrice = 'Pricing unavailable'; 
//     try {
//       const pricing = await client.pricing.phoneNumbers.countries(country).fetch();
//       const numberTypeLower = type.toLowerCase(); 


//        if (pricing?.phoneNumbers && Array.isArray(pricing.phoneNumbers) && pricing.phoneNumbers.length > 0) {
//         // Find a matching price for the specific number type (local, mobile, tollFree)
//         const priceEntry = pricing.phoneNumbers.find((p: any) => p.numberType.toLowerCase() === numberTypeLower);
//         if (priceEntry && priceEntry.basePrice) {
//           monthlyPrice = `${priceEntry.basePrice} ${priceEntry.priceUnit || 'USD'} / month`;
//         } else {
//           // Fallback if specific type not found, try general pricing (this might vary per country)
//           const firstPrice = pricing.phoneNumbers[0]; // Access first element safely since length > 0
//           if (firstPrice && firstPrice.basePrice) {
//             monthlyPrice = `${firstPrice.basePrice} ${firstPrice.priceUnit || 'USD'} / month (Approx)`;
//           } else {
//              monthlyPrice = 'Pricing details missing for this type'; // More specific fallback
//           }
//         }
//       } else {

//         monthlyPrice = 'No specific pricing found for this country/type.';
//       }
//     } catch (pricingError: any) { 
//       console.warn(`Could not fetch pricing for ${country} - ${type}:`, pricingError.message);
//       monthlyPrice = 'Error fetching pricing';
//     }


//     // Attach the fetched pricing to each available number
//     const numbersWithPrice = availableNumbers.map((num: any) => ({
//       ...num,
//       price: monthlyPrice, 
//     }));

//     return NextResponse.json({ success: true, numbers: numbersWithPrice });

//   } catch (error: any) {
//     console.error('Error searching for Twilio numbers:', error);
//     return NextResponse.json({ success: false, message: 'Failed to search for numbers', error: error.message }, { status: 500 });
//   }
// }


export async function GET(request: Request) {

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;


  const client = twilio(accountSid, authToken);


  const { searchParams } = new URL(request.url);


  const country = searchParams.get('country') || 'US';
  const type = searchParams.get('type') || 'Local';
  const areaCode = searchParams.get('areaCode');
  const smsEnabled = searchParams.get('smsEnabled') === 'true';
  const mmsEnabled = searchParams.get('mmsEnabled') === 'true';
  const voiceEnabled = searchParams.get('voiceEnabled') === 'true';

  try {
    let availableNumbers;


    const listOptions: any = {
      // smsEnabled: smsEnabled,
      // mmsEnabled: mmsEnabled,
      // voiceEnabled: voiceEnabled,
      limit: 50,
    };


    if (areaCode) {
      listOptions.areaCode = areaCode;
    }


    if (type === 'Local') {
      availableNumbers = await client.availablePhoneNumbers(country).local.list(listOptions);
    } else if (type === 'Mobile') {
      if (country !== 'US') {
        availableNumbers = await client.availablePhoneNumbers(country).mobile.list(listOptions);
      } else {
        return NextResponse.json({ success: false, message: 'Mobile numbers are not available for US via API.' }, { status: 400 });
      }
    } else if (type === 'TollFree') {
      delete listOptions.areaCode;
      availableNumbers = await client.availablePhoneNumbers(country).tollFree.list(listOptions);
    } else {
      return NextResponse.json({ success: false, message: 'Invalid phone number type specified.' }, { status: 400 });
    }

    availableNumbers.forEach(num => {
      console.log('Number:', num.phoneNumber, 'Capabilities:', num.capabilities);
    });

    // --- Fetch Pricing Information ---
    let monthlyPrice = 'Pricing unavailable';
    try {

      // Corrected: Map UI type to Twilio Pricing API type
      const typeMap: { [key: string]: string } = {
        'Local': 'local',
        'Mobile': 'mobile',
        'TollFree': 'toll free'
      };
      const numberTypeForPricing = typeMap[type] || type.toLowerCase();

      const pricing: any = await client.pricing.v1.phoneNumbers.countries("US").fetch();

      console.log('Country:', country);
      console.log('Pricing API response:', pricing);

      if (pricing && pricing.phoneNumberPrices && Array.isArray(pricing.phoneNumberPrices) && pricing.phoneNumberPrices.length > 0) {
        // Debugging logs to inspect the pricing response
        console.log('Pricing API response:', pricing?.phoneNumberPrices);
        console.log('Looking for type:', numberTypeForPricing);

        //const numberTypeLower = type.toLowerCase();

        let priceEntry;
        // Case 1: Search for an exact match first
        priceEntry = pricing.phoneNumberPrices.find((p: any) => p.number_type.toLowerCase() === numberTypeForPricing);


        // Case 2: If still no match, use the first available price as a last resort, but add a note
        if (priceEntry?.base_price) {
          monthlyPrice = `${priceEntry.base_price} ${priceEntry.priceUnit || 'USD'} / month`;
        }
        // else {

        //   const firstPrice = pricing.phoneNumbers[0];
        //   if (firstPrice && firstPrice.basePrice) {
        //     monthlyPrice = `${firstPrice.basePrice} ${firstPrice.priceUnit || 'USD'} / month (Approx)`;
        //   } else {
        //     monthlyPrice = 'Pricing details missing for this type';
        //   }
        // }
        else {

          monthlyPrice = 'No specific pricing found for this country/type.';
        }
      } else {
        monthlyPrice = 'Pricing data not available for this country.';
      }
    } catch (pricingError: any) {
      console.warn(`Could not fetch pricing for ${country} - ${type}:`, pricingError.message);
      monthlyPrice = 'Error fetching pricing';
    }




    const numbersWithPrice = availableNumbers.map((num: any) => ({
      phoneNumber: num.phoneNumber,
      isoCountry: num.isoCountry,
      capabilities: {
        voice: !!num.capabilities?.voice,
        sms: !!(num.capabilities?.sms ?? num.capabilities?.SMS),
        mms: !!(num.capabilities?.mms ?? num.capabilities?.MMS),
      },
      price: monthlyPrice,
    }));




    return NextResponse.json({ success: true, numbers: numbersWithPrice });

  } catch (error: any) {
    console.error('Error searching for Twilio numbers:', error);
    return NextResponse.json({ success: false, message: 'Failed to search for numbers', error: error.message }, { status: 500 });
  }
}


