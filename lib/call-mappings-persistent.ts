import fs from 'fs';
import path from 'path';

const MAPPINGS_FILE = path.join(process.cwd(), 'call-mappings.json');

// Load existing mappings from file
const loadMappings = (): Map<string, string> => {
  try {
    if (fs.existsSync(MAPPINGS_FILE)) {
      const data = fs.readFileSync(MAPPINGS_FILE, 'utf8');
      const jsonData = JSON.parse(data);
      return new Map(Object.entries(jsonData));
    }
  } catch (error) {
    console.error('Error loading call mappings:', error);
  }
  return new Map();
};

// Save mappings to file
const saveMappings = (mappings: Map<string, string>) => {
  try {
    const jsonData = Object.fromEntries(mappings);
    fs.writeFileSync(MAPPINGS_FILE, JSON.stringify(jsonData, null, 2));
  } catch (error) {
    console.error('Error saving call mappings:', error);
  }
};

// Initialize mappings
const callMappings = loadMappings();

export const storeCallMapping = (ultravoxId: string, twilioSid: string) => {
  callMappings.set(ultravoxId, twilioSid);
  saveMappings(callMappings);
};

export const getCallMapping = (ultravoxId: string): string | undefined => {
  const mapping = callMappings.get(ultravoxId);
  if (!mapping) {
    console.warn(`No Twilio Call SID found for Ultravox ID: ${ultravoxId}`);
    console.log('Available mappings:', Array.from(callMappings.entries()));
  }
  return mapping;
};

export const getUltravoxIdByTwilioSid = (twilioSid: string): string | undefined => {
  for (const [ultravoxId, mappedTwilioSid] of callMappings.entries()) {
    if (mappedTwilioSid === twilioSid) {
      return ultravoxId;
    }
  }

  console.warn(`No Ultravox Call ID found for Twilio SID: ${twilioSid}`);
  console.log('Available mappings:', Array.from(callMappings.entries()));
  return undefined;
};

// Utility to get all mappings for debugging
export const getAllMappings = () => {
  return Array.from(callMappings.entries());
};

// Utility to clear all mappings (for testing)
export const clearAllMappings = () => {
  callMappings.clear();
  saveMappings(callMappings);
};
