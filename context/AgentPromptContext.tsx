'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import industryData from '@/lib/industryPrompts'

type AgentPromptContextType = {
  greeting: string
  setGreeting: React.Dispatch<React.SetStateAction<string>>
  trainingGuide: string
  setTrainingGuide: React.Dispatch<React.SetStateAction<string>>
  // knowledgeBase: string[]
  // setKnowledgeBase: React.Dispatch<React.SetStateAction<string[]>>
  industry: string
  setIndustry: React.Dispatch<React.SetStateAction<string>>
}

const AgentPromptContext = createContext<AgentPromptContextType | undefined>(undefined)

export function AgentPromptProvider({ children }: { children: ReactNode }) {
  const [greeting, setGreeting] = useState('')
  const [trainingGuide, setTrainingGuide] = useState('')
  // const [knowledgeBase, setKnowledgeBase] = useState<string[]>([])
  const [industry, setIndustry] = useState('')

  useEffect(() => {
    if (industry) {
      console.log('Industry:', industry);
      const normalizedIndustry = industry.replace(/-/g, '');
      console.log('Normalized Industry:', normalizedIndustry);
      if (industryData[normalizedIndustry]) {
        const prompt = industryData[normalizedIndustry];
        //console.log('Prompt:', prompt);
        setTrainingGuide(prompt);

        // Extract greeting line from prompt by line parsing
        const lines = prompt.split(/\r?\n/);
        const greetingIndex = lines.findIndex(line => line.includes('1. **Greeting:**'));
        let extractedGreeting = '';
        if (greetingIndex !== -1) {
          for (let i = greetingIndex + 1; i < lines.length; i++) {
            const line = lines[i].trim();
            const match = line.match(/^"(.+)"$/);
            if (match) {
              extractedGreeting = match[1];
              break;
            }
          }
        }
        console.log('Extracted Greeting:', extractedGreeting);
        if (extractedGreeting) {
          setGreeting(extractedGreeting);
        } else {
          setGreeting('');
        }
      }
    }
  }, [industry])

  return (
    <AgentPromptContext.Provider
      value={{ greeting, setGreeting, trainingGuide, setTrainingGuide,  industry, setIndustry }}
    >
      {children}
    </AgentPromptContext.Provider>
  )
}

export function useAgentPrompt() {
  const context = useContext(AgentPromptContext)
  if (!context) {
    throw new Error('useAgentPrompt must be used within an AgentPromptProvider')
  }
  return context
}
