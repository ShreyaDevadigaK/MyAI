/**
 * Phone number formatting utilities for adding country codes
 */

export function formatPhoneNumber(phoneNumber: string, countryCode: string = '+91'): string {
  if (!phoneNumber) return '';
  
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // If already has country code (starts with +), return as-is
  if (phoneNumber.trim().startsWith('+')) {
    return phoneNumber.trim();
  }
  
  // If starts with country code without +, add +
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    return `+${cleaned}`;
  }
  
  // If starts with 0, remove it and add country code
  if (cleaned.startsWith('0')) {
    return `${countryCode}${cleaned.substring(1)}`;
  }
  
  // If 10 digits, add country code
  if (cleaned.length === 10) {
    return `${countryCode}${cleaned}`;
  }
  
  // Return as-is if already formatted
  return phoneNumber;
}

export function validatePhoneNumber(phoneNumber: string): boolean {
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Valid formats:
  // +91XXXXXXXXXX (12 digits with +91)
  // 0XXXXXXXXXX (11 digits starting with 0)
  // XXXXXXXXXX (10 digits)
  const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
  
  return phoneRegex.test(phoneNumber);
}
