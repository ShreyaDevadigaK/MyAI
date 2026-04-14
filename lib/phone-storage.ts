// Utility functions for storing and retrieving phone numbers for outbound calls

export interface StoredPhoneNumber {
  id: string;
  phoneNumber: string;
  name?: string;
  createdAt: Date;
}

const STORAGE_KEY = 'outboundPhoneNumbers';

export const getStoredPhoneNumbers = (): StoredPhoneNumber[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading stored phone numbers:', error);
    return [];
  }
};

export const savePhoneNumber = (phoneNumber: string, name?: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const numbers = getStoredPhoneNumbers();
    const newNumber: StoredPhoneNumber = {
      id: Date.now().toString(),
      phoneNumber,
      name,
      createdAt: new Date()
    };
    
    const updatedNumbers = [...numbers, newNumber];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNumbers));
  } catch (error) {
    console.error('Error saving phone number:', error);
  }
};

export const deletePhoneNumber = (id: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const numbers = getStoredPhoneNumbers();
    const updatedNumbers = numbers.filter(num => num.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNumbers));
  } catch (error) {
    console.error('Error deleting phone number:', error);
  }
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  // Basic validation - can be enhanced with more complex regex if needed
  const cleaned = phoneNumber.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  // Simple formatting for display
  const cleaned = phoneNumber.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phoneNumber;
};
