'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Tabs from '@/components/Tabs'
import TrainingGuideEditor from '@/components/TrainingGuideEditor'
import AgentGreetingEditor from '@/components/AgentGreetingEditor'
import CallTransfersEditor from '@/components/CallTransfersEditor'
import ChatSimulationEditor from '@/components/ChatSimulationEditor'
import OutboundCallPopup from '@/components/OutboundCallPopup'
import { useAgentPrompt } from '@/context/AgentPromptContext'
import { useState as useReactState } from 'react'
import { useCallActivity } from '@/context/CallActivityContext'
import { useSelectedVoice } from '@/context/SelectedVoiceContext'
import { useUser } from '@clerk/nextjs'
import { Phone } from 'lucide-react'

function CallAssistantButton() {
  const { greeting, trainingGuide } = useAgentPrompt()
  const [loading, setLoading] = useReactState(false)
  const [message, setMessage] = useReactState('')
  const [showOutboundPopup, setShowOutboundPopup] = useReactState(false)
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useReactState('')
  const { addCallActivity } = useCallActivity()
  const { selectedVoiceId } = useSelectedVoice()
  const { user } = useUser()

  const composePrompt = () => {
    let prompt = ''
    if (greeting) {
      prompt += greeting + '\n\n'
    }
    if (trainingGuide) {
      prompt += trainingGuide + '\n\n'
    }
    return prompt
  }

  const handleOutbound = async (phoneNumber?: string) => {
    const targetNumber = phoneNumber || selectedPhoneNumber;
    
    if (!targetNumber) {
      setMessage('Please select a phone number first');
      return;
    }

    setLoading(true);
    setMessage('');
    const prompt = composePrompt();
    try {
      const response = await fetch('/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt, 
          voice: selectedVoiceId,
          phoneNumber: targetNumber,
          greeting: greeting,
          userId: user?.id
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Outbound call to ${targetNumber} initiated successfully!`);
        
        const activity = {
          id: data.ultravoxCallId || data.callSid,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          from: data.from || '',
          to: targetNumber,
          type: 'outbound',
          duration: 'N/A',
          summary: 'Outbound call',
        };
        
        // Add to context (in-memory)
        addCallActivity(activity);
        
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err: unknown) {
      setMessage(err instanceof Error ? `Error: ${err.message}` : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleInbound = () => {
    // Simulate activity or rely on webhook logs
    setMessage('Inbound call received — check activity log or backend.');
    addCallActivity({
      id: `inbound-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      from: 'Caller Number',
      duration: 'N/A',
      summary: 'Inbound call handled',
    });
  };

  const handleNumberSelect = (phoneNumber: string) => {
    setSelectedPhoneNumber(phoneNumber);
    handleOutbound(phoneNumber);
  };

  return (
    <div className="p-4 space-y-3">
      {message && <p className="text-sm text-gray-700">{message}</p>}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() => setShowOutboundPopup(true)}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 transition flex items-center gap-2"
        >
          <Phone className="h-4 w-4" />
          {loading ? 'Calling...' : 'Make Outbound Call'}
        </button>
        <button
          onClick={handleInbound}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Inbound Call (Simulated)
        </button>
      </div>
      
      <OutboundCallPopup
        isOpen={showOutboundPopup}
        onClose={() => setShowOutboundPopup(false)}
        onNumberSelect={handleNumberSelect}
      />
    </div>
  );

  
}




export default function AgentConfiguration() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get('tab') || 'Training Guide'
  const [selectedTab, setSelectedTab] = useState(defaultTab)

  const { setIndustry } = useAgentPrompt()

  useEffect(() => {
    const newTab = searchParams.get('tab')
    if (newTab) setSelectedTab(newTab)
  }, [searchParams])

  useEffect(() => {
    const industry = searchParams.get('industry')
    if (industry) {
      // Handle both formats: plumbing-services and plumbingservices
      const normalizedIndustry = industry.toLowerCase().replace(/-/g, '')
      setIndustry(normalizedIndustry)
    }
  }, [searchParams, setIndustry])

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'Training Guide':
        return <TrainingGuideEditor />
      case 'Agent Greeting':
        return <AgentGreetingEditor />
      case 'Chat Simulation':
        return <ChatSimulationEditor />
      case 'Call Transfers':
        return <CallTransfersEditor />
      default:
        return null
    }
  }

  return (
    <div className="w-full mt-2">
      <h1 className="text-2xl font-bold mb-4 text-purple-700">Agent Configuration</h1>
      <CallAssistantButton />
      <Tabs selectedTab={selectedTab} onTabChange={setSelectedTab} />
      <div className="mt-4 border rounded-md p-4 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">{selectedTab}</h2>
        {renderTabContent()}
      </div>
    </div>
  )
}
