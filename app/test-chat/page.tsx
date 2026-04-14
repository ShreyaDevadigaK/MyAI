'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { useAgentPrompt } from '@/context/AgentPromptContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User, Send, Trash2, Sparkles, LoaderCircle, Settings2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

import industryData from '@/lib/industryPrompts';

type Message = {
  role: 'user' | 'ai';
  content: string;
};

import { useSearchParams } from 'next/navigation';

const initialPromptDefault = "Hi, thanks for calling! This is the virtual receptionist. How can I help you today — are you looking to schedule a service, report an issue, or ask a question?"

export default function Home() {
  const { toast } = useToast();
  const { setIndustry, trainingGuide, setTrainingGuide } = useAgentPrompt();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const industryRaw = searchParams.get('industry') || '';
  const industry = industryRaw.toLowerCase().replace(/-/g, '');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    setIndustry(industry);
    if (industry && industryData[industry]) {
      setTrainingGuide(industryData[industry]);
    } else {
      setTrainingGuide(initialPromptDefault);
    }
  }, [industry, setIndustry, setTrainingGuide]);

  const handleSetPrompt = () => {
    setTrainingGuide(trainingGuide);
    toast({
      title: "Prompt Updated",
      description: "The AI will now use the new system prompt.",
    });
  };

  const handleClearPrompt = () => {
    setTrainingGuide('');
  };

  const handleSendMessage = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessageContent = userInput;
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessageContent }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    try {
      const apiMessages = newMessages.map(msg => ({
        sender: msg.role === 'user' ? 'user' : 'assistant',
        text: msg.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: apiMessages,
          systemPrompt: trainingGuide,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.response }]);
    } catch (error) {
      console.error("Error calling chat API:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem with the AI response. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col h-screen overflow-hidden">
          {/* Header */}
          <header className="relative flex items-center justify-center py-4 sm:py-6 border-b">
            <div className="flex items-center">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-primary" />
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">
                Preview Your Agent
              </h1>
            </div>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-black transition"
              onClick={() => router.push(`/voice-picker?industry=${industryRaw}`)}
              aria-label="Next Step"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </header>

          {/* Main Content */}
          <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 py-4 lg:py-6 min-h-0">
            {/* Left Side: Prompt Editor */}
            {/* <Card className="flex flex-col h-full bg-white shadow-lg">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Settings2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  System Prompt
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Define the AI's personality and instructions
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 gap-4 p-4 sm:p-6">
                <Textarea
                  value={trainingGuide}
                  onChange={(e) => setTrainingGuide(e.target.value)}
                  placeholder="e.g., You are a Shakespearean poet..."
                  className="flex-1 text-sm resize-none"
                  rows={4}
                />
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleSetPrompt} size="sm">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Set Prompt
                  </Button>
                  <Button variant="outline" onClick={handleClearPrompt} size="sm">
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card> */}

            <Card className="flex flex-col h-full min-h-0 bg-white shadow-lg">
              {/* Fixed Header */}
              <CardHeader className="p-4 sm:p-6 sticky top-0 bg-white z-10 border-b">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Settings2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  System Prompt
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Define the AI's personality and instructions
                </CardDescription>
              </CardHeader>

              {/* Scrollable Content */}
              <CardContent className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6">
                <Textarea
                  value={trainingGuide}
                  onChange={(e) => setTrainingGuide(e.target.value)}
                  placeholder="e.g., You are a Shakespearean poet..."
                  className="w-full text-sm resize-none min-h-[200px]"
                />
              </CardContent>

              {/* Fixed Footer */}
              <div className="sticky bottom-0 bg-white border-t p-4 flex gap-2 justify-end z-10">
                <Button onClick={handleSetPrompt} size="sm">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Set Prompt
                </Button>
                <Button variant="outline" onClick={handleClearPrompt} size="sm">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              </div>
            </Card>



            {/* Right Side: Chat Interface */}
            <Card className="flex flex-col h-full min-h-0 bg-white shadow-lg">
              {/* Fixed Header */}
              <CardHeader className="p-4 sm:p-6 flex flex-row items-center justify-between sticky top-0 bg-white z-10 border-b">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                  <CardTitle className="text-base sm:text-lg">Chat</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearChat}
                  disabled={messages.length === 0}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>

              {/* Scrollable Messages */}
              <CardContent className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-8">
                      <Bot className="w-8 h-8 mb-3" />
                      <p className="text-sm sm:text-base">Your chat begins here</p>
                      <p className="text-xs">Send a message to start the conversation</p>
                    </div>
                  )}
                  {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                  ))}
                  {isLoading && <LoadingMessage />}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              {/* Fixed Footer (Message Input) */}
              <div className="sticky bottom-0 bg-white border-t p-4 flex items-start gap-2 z-10">
                <form onSubmit={handleSendMessage} className="flex items-start gap-2 w-full">
                  <Textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleTextareaKeyDown}
                    placeholder="Type your message..."
                    className="flex-1 text-sm resize-none"
                    rows={2}
                    disabled={isLoading}
                  />
                  <Button type="submit" size="sm" disabled={isLoading || !userInput.trim()}>
                    {isLoading ? (
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </form>
              </div>
            </Card>

          </main>
        </div>
      </div>
    </div>
  );
}

const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={cn('flex items-start gap-2 sm:gap-3', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <Avatar className="w-8 h-8">
          <AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback>
        </Avatar>
      )}
      <div className={cn(
        'max-w-[85%] sm:max-w-[80%] rounded-lg p-2 sm:p-3 text-sm',
        isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
      )}>
        {message.content}
      </div>
      {isUser && (
        <Avatar className="w-8 h-8">
          <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

const LoadingMessage = () => (
  <div className="flex items-start gap-3">
    <Avatar className="w-8 h-8">
      <AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback>
    </Avatar>
    <div className="bg-muted rounded-lg p-3">
      <LoaderCircle className="w-4 h-4 animate-spin" />
    </div>
  </div>
);
