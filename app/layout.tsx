import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { cn } from '@/lib/utils';
import { Playfair_Display, Source_Sans_3 as Source_Sans_Pro } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const sourceSans = Source_Sans_Pro({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-source-sans",
})



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
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
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
