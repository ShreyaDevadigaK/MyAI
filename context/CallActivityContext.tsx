'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CallActivity {
  id: string;
  date: string;
  time: string;
  from: string;
  duration: string;
  summary: string;
}

interface CallActivityContextType {
  callActivities: CallActivity[];
  addCallActivity: (activity: CallActivity) => void;
}

const CallActivityContext = createContext<CallActivityContextType | undefined>(undefined);

export const CallActivityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [callActivities, setCallActivities] = useState<CallActivity[]>([]);

  const addCallActivity = (activity: CallActivity) => {
    setCallActivities((prev) => [activity, ...prev]);
  };

  return (
    <CallActivityContext.Provider value={{ callActivities, addCallActivity }}>
      {children}
    </CallActivityContext.Provider>
  );
};

export const useCallActivity = (): CallActivityContextType => {
  const context = useContext(CallActivityContext);
  if (!context) {
    throw new Error('useCallActivity must be used within a CallActivityProvider');
  }
  return context;
};
