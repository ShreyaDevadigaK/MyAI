import type { Metadata } from "next";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";






const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MYAI - AI Agent for Business",
  description: "Intelligent AI voice agent for customer service, scheduling, and business automation",
  icons: {
    icon: '/favicon.svg',
  },
};

import { CallActivityProvider } from '@/context/CallActivityContext'
import { SelectedVoiceProvider } from '@/context/SelectedVoiceContext'
import { AgentPromptProvider } from '@/context/AgentPromptContext'
import SupabaseUserSync from '@/components/SupabaseUserSync'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <CallActivityProvider>
    <SelectedVoiceProvider>
    <AgentPromptProvider>
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SupabaseUserSync />
        {children}
        <Toaster />
      </body>
    </html>
    </AgentPromptProvider>
    </SelectedVoiceProvider>
    </CallActivityProvider>
    </ClerkProvider>
  );
}
