'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SelectedVoiceContextType {
  selectedVoiceId: string;
  setSelectedVoiceId: React.Dispatch<React.SetStateAction<string>>;
}

const SelectedVoiceContext = createContext<SelectedVoiceContextType | undefined>(undefined);

export const SelectedVoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('');

  return (
    <SelectedVoiceContext.Provider value={{ selectedVoiceId, setSelectedVoiceId }}>
      {children}
    </SelectedVoiceContext.Provider>
  );
};

export const useSelectedVoice = (): SelectedVoiceContextType => {
  const context = useContext(SelectedVoiceContext);
  if (!context) {
    throw new Error('useSelectedVoice must be used within a SelectedVoiceProvider');
  }
  return context;
};
