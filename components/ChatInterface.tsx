"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { ArrowUp } from "lucide-react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText || "Failed to fetch")
      }

      const data = await res.json()

      const assistantMessage: Message = {
        id: data.id || Date.now().toString() + "-ai",
        role: "assistant",
        content: data.choices?.[0]?.message?.content || "No response.",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err: unknown) {
      console.error("Error sending message", err)
      const errorMessage = err instanceof Error ? err.message : "Error sending message";
      setErrorMessage(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex flex-col h-full bg-gray-50">
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="mb-4 text-lg font-semibold">Chat with Test Agent</h2>
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  m.role === "user" ? "bg-yellow-200 text-gray-800" : "bg-gray-200 text-gray-800"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-200 text-gray-800">Agent is typing...</div>
            </div>
          )}
        </div>
      </div>
      <div className="sticky bottom-0 p-4 bg-white border-t">
        {errorMessage && (
          <div className="mb-2 text-sm text-red-600">
            Error: {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <Textarea
            placeholder="Type your message..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              if (errorMessage) setErrorMessage(null)
            }}
            className="min-h-[48px] rounded-lg resize-none pr-12"
            rows={1}
          />
          <Button type="submit" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2" disabled={isLoading}>
            <ArrowUp className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
