'use client'

import React, { useState } from 'react'
import { useAgentPrompt } from '@/context/AgentPromptContext'

type Message = {
  id: number
  sender: 'user' | 'agent'
  text: string
}

export default function ChatSimulationEditor() {
  const { greeting, trainingGuide} = useAgentPrompt()
  const [messages, setMessages] = useState<Message[]>(() => 
    greeting ? [{
      id: Date.now(),
      sender: 'agent',
      text: greeting,
    }] : []
  )
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)


  const systemPrompt = `
${greeting}

${trainingGuide}
  `

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: input.trim(),
    }

    setMessages((prev: Message[]) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          systemPrompt,
        }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      const data = await response.json()

      const agentMessage: Message = {
        id: Date.now() + 1,
        sender: 'agent',
        text: data.response || 'No response from agent.',
      }

      setMessages((prev: Message[]) => [...prev, agentMessage])
    } catch (error) {
      console.error('Error calling API:', error)
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: 'agent',
        text: 'Error: Unable to get response from agent.',
      }
      setMessages((prev: Message[]) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full p-4 bg-white border rounded-md shadow">
      <h2 className="text-lg font-semibold mb-4">Chat Simulation</h2>
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 p-2 border rounded">
        {messages.length === 0 && (
          <p className="text-gray-500 italic">Start the conversation by typing a message below.</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end max-w-xs space-x-2 px-4 py-2 rounded-lg ${
              msg.sender === 'user' ? 'bg-blue-500 text-white self-end ml-auto rounded-br-none' : 'bg-gray-200 text-gray-900 self-start mr-auto rounded-bl-none'
            }`}
          >
            {msg.sender === 'agent' && (
              <div className="w-20 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold">
                
              </div>
            )}
            <div className="whitespace-pre-wrap break-words">{msg.text}</div>
            {msg.sender === 'user' && (
              <div className="w-5 h-5 rounded-full flex items-center justify-center  text-white text-xs font-bold">
                
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSend()
            }
          }}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={!input.trim() || loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
