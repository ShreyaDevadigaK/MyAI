#!/usr/bin/env node

const https = require('https');
const fetch = require('node-fetch');

// Test script to check inbound call configuration
async function testInboundConfiguration() {
  console.log('🔍 Testing Inbound Call Configuration\n');
  
  // Check if required environment variables are set
  const requiredEnvVars = [
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN', 
    'TWILIO_PHONE_NUMBER',
    'ULTRAVOX_API_KEY',
    'BASE_URL'
  ];
  
  console.log('📋 Checking Environment Variables:');
  let allEnvVarsSet = true;
  
  requiredEnvVars.forEach(envVar => {
    if (process.env[envVar]) {
      console.log(`✅ ${envVar}: Set`);
    } else {
      console.log(`❌ ${envVar}: NOT SET`);
      allEnvVarsSet = false;
    }
  });
  
  if (!allEnvVarsSet) {
    console.log('\n⚠️  Missing required environment variables. Please check your .env file.');
    return;
  }
  
  console.log('\n✅ All required environment variables are set');
  
  // Test BASE_URL accessibility
  console.log('\n🌐 Testing BASE_URL accessibility:');
  try {
    const baseUrl = process.env.BASE_URL;
    console.log(`Testing: ${baseUrl}`);
    
    const response = await fetch(baseUrl, { method: 'HEAD' });
    console.log(`✅ BASE_URL is accessible (Status: ${response.status})`);
  } catch (error) {
    console.log(`❌ BASE_URL is not accessible: ${error.message}`);
    return;
  }
  
  // Test inbound endpoint
  console.log('\n📞 Testing /api/inbound endpoint:');
  try {
    const inboundUrl = `${process.env.BASE_URL}/api/inbound`;
    console.log(`Testing: ${inboundUrl}`);
    
    // Test with a simple GET request first
    const response = await fetch(inboundUrl);
    console.log(`✅ /api/inbound endpoint responds (Status: ${response.status})`);
    
    if (response.status === 405) {
      console.log('ℹ️  Endpoint requires POST method (expected for Twilio webhook)');
    }
  } catch (error) {
    console.log(`❌ /api/inbound endpoint error: ${error.message}`);
  }
  
  // Test call endpoint
  console.log('\n📱 Testing /api/call endpoint:');
  try {
    const callUrl = `${process.env.BASE_URL}/api/call`;
    console.log(`Testing: ${callUrl}`);
    
    const testPayload = {
      phoneNumber: process.env.TWILIO_PHONE_NUMBER,
      prompt: 'Test call configuration'
    };
    
    const response = await fetch(callUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload)
    });
    
    const data = await response.json();
    console.log(`✅ /api/call endpoint responds (Status: ${response.status})`);
    
    if (response.status !== 200) {
      console.log(`Error details: ${JSON.stringify(data, null, 2)}`);
    }
  } catch (error) {
    console.log(`❌ /api/call endpoint error: ${error.message}`);
  }
  
  // Check Twilio credentials
  console.log('\n🔐 Testing Twilio credentials:');
  try {
    const twilio = require('twilio');
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    
    // Try to list numbers to verify credentials
    const numbers = await client.incomingPhoneNumbers.list({ limit: 1 });
    console.log('✅ Twilio credentials are valid');
    console.log(`ℹ️  Found ${numbers.length} phone number(s) in account`);
  } catch (error) {
    console.log(`❌ Twilio credentials error: ${error.message}`);
  }
  
  console.log('\n🎯 Configuration Test Complete');
  console.log('\nNext steps:');
  console.log('1. Ensure your BASE_URL is publicly accessible');
  console.log('2. Check Twilio number configuration in Twilio console');
  console.log('3. Verify voiceUrl points to your /api/inbound endpoint');
  console.log('4. Test with actual phone call');
}

// Run the test
testInboundConfiguration().catch(console.error);
