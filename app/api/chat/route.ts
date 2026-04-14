import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// Retry helper
async function retrySendMessage(chat: { sendMessage: (text: string) => Promise<unknown> }, text: string, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await chat.sendMessage(text);
      return result;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : '';
      if (errorMessage.includes('503') && i < retries - 1) {
        console.warn(`Gemini API overloaded. Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages, systemPrompt } = await request.json();

    // Validation
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid or empty messages array' }, { status: 400 });
    }

    if (!systemPrompt || typeof systemPrompt !== 'string') {
      return NextResponse.json({ error: 'Invalid systemPrompt' }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage?.text || typeof lastMessage.text !== 'string') {
      return NextResponse.json({ error: 'Last message must contain valid text' }, { status: 400 });
    }

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json({ 
        error: 'Google API key not configured' 
      }, { status: 500 });
    }

    // Format conversation history
    const history = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }],
      },
      ...messages.map((msg: { sender: string; text: string }) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
    ];

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const chat = model.startChat({ history });

    const result = await retrySendMessage(chat, lastMessage.text);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });

  } catch (error: unknown) {
    console.error('Error in Gemini chat API:', error);

    const errorMessage = error instanceof Error ? error.message : '';

    if (errorMessage.includes('503')) {
      return NextResponse.json({
        error: 'AI service temporarily unavailable',
        details: 'The AI service is currently overloaded. Please try again shortly.',
        retryAfter: 5
      }, { status: 503 });
    }

    if (errorMessage.includes('401') || errorMessage.includes('API key')) {
      return NextResponse.json({
        error: 'Authentication error',
        details: 'Invalid API key or not authorized. Please check your configuration.'
      }, { status: 401 });
    }

    if (errorMessage.includes('429')) {
      return NextResponse.json({
        error: 'Rate limit exceeded',
        details: 'Too many requests to Gemini API. Please slow down.',
        retryAfter: 10
      }, { status: 429 });
    }

    return NextResponse.json({
      error: 'Internal server error',
      details: errorMessage || 'Unknown error occurred'
    }, { status: 500 });
  }
}
