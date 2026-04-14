'use client'

import { useAgentPrompt } from '@/context/AgentPromptContext'
import { useEffect } from 'react'

const defaultText ='Hi, thanks for calling! This is the virtual receptionist. How can I help you today — are you looking to schedule a service, report an issue, or ask a question?'

export default function TrainingGuideEditor() {
  const { trainingGuide, setTrainingGuide } = useAgentPrompt()

  useEffect(() => {
    if (!trainingGuide) {
      setTrainingGuide(defaultText)
    }
  }, [trainingGuide, setTrainingGuide])

  const handleUpdate = () => {
    alert('Training Guide Updated:\n\n' + trainingGuide)
  }

  return (
    <div>
      <textarea
        className="w-full h-96 p-3 border rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
        value={trainingGuide}
        onChange={(e) => setTrainingGuide(e.target.value)}
      />
      <button
        onClick={handleUpdate}
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Update Training Guide
      </button>
    </div>
  )
}
