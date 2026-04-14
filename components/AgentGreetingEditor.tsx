'use client'

import { useAgentPrompt } from '@/context/AgentPromptContext'

export default function AgentGreetingEditor() {
  const { greeting, setGreeting } = useAgentPrompt()

  const handleUpdate = () => {
    alert(`Greeting updated: ${greeting}`)
  }

  return (
    <div className="p-6">
      
      <p className="text-sm text-gray-600 mb-4">
        Customize the initial greeting for your AI agent
      </p>

      <textarea
        rows={6}
        className="w-full border rounded p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Enter your agent's greeting..."
        value={greeting}
        onChange={(e) => setGreeting(e.target.value)}
      />

      <button
        onClick={handleUpdate}
        className="mt-4 bg-purple-600 text-white text-sm px-6 py-2 rounded hover:bg-purple-700"
      >
        Update
      </button>
    </div>
  )
}
