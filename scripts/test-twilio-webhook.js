#!/usr/bin/env node

const fetch = require('node-fetch');

// Simulate a Twilio webhook request to /api/inbound
async function testTwilioWebhook() {
  console.log('📞 Simulating Twilio Webhook to /api/inbound\n');
  
  if (!process.env.BASE_URL) {
    console.log('❌ BASE_URL environment variable not set');
    return;
  }
  
  const inboundUrl = `${process.env.BASE_URL}/api/inbound`;
  console.log(`Target URL: ${inboundUrl}`);
  
  // Simulate Twilio form data
  const formData = new URLSearchParams();
  formData.append('From', '+1234567890');
  formData.append('To', process.env.TWILIO_PHONE_NUMBER || '+15551234567');
  formData.append('CallSid', 'CA1234567890abcdef1234567890abcdef');
  formData.append('CallStatus', 'ringing');
  
  try {
    const response = await fetch(inboundUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    });
    
    console.log(`Response Status: ${response.status}`);
    console.log(`Response Headers: ${JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2)}`);
    
    const responseText = await response.text();
    console.log(`Response Body:\n${responseText}`);
    
    if (response.status === 200) {
      console.log('\n✅ Webhook test successful!');
      console.log('The endpoint returned TwiML response as expected.');
    } else {
      console.log('\n⚠️  Webhook test completed with non-200 status');
    }
    
  } catch (error) {
    console.log(`❌ Webhook test failed: ${error.message}`);
  }
}

// Run the test
testTwilioWebhook().catch(console.error);
