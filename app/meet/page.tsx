"use client";

import React from 'react'
import { Navbar } from '@/components/Navbar'
import { CalendarDays, X, MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { PlayCircle, CheckCircle } from "lucide-react"
import { ComprehensiveFooter } from '@/components/ComprehensiveFooter'
import { useState } from 'react'
import { useRouter } from 'next/navigation';

// function page() {
//   return (
//     <div className="min-h-screen bg-gray-800">
//       <Navbar />
//       <main>

//             {/* Hero Section */}
//             <section className="bg-gray-900 py-20 px-6 text-center text-white">
//               <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
//                 Experience <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#EF4C75] to-pink-200">MYAI Receptionist</span> in Action
//               </h1>
//               <p className="max-w-2xl mx-auto text-lg text-white/80 mb-8">
//                 See how MYAI can handle calls, chat with customers, book appointments, and transfer calls — just like a real receptionist.
//               </p>
//               <Button className="bg-[#EF4C75] text-white hover:bg-[#d63e65] px-8 py-3 rounded-lg shadow-lg transition-transform hover:scale-105">
//                 Schedule Live Demo
//               </Button>
//             </section>

//             {/* Demo Simulation Section */}
//             <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//               {/* Left Panel - Explanation */}
//               <div className="text-white">
//                 <div className="flex items-center text-sm font-semibold bg-white/10 rounded-full px-3 py-1 mb-4 w-fit backdrop-blur-sm">
//                   <div className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
//                   Live Demo Preview
//                 </div>

//                 <h2 className="text-3xl sm:text-4xl font-bold mb-6">
//                   Try a <span className="text-[#EF4C75]">Realistic AI Simulation</span>
//                 </h2>
//                 <p className="text-lg text-white/80 mb-6">
//                   Interact with our sample chat to see how MYAI greets callers, books appointments, and confirms schedules. Then, book your own live demo slot directly below.
//                 </p>

//                 <ul className="space-y-4 text-white/90">
//                   <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-400 mr-2" /> AI Call & Chat Simulation</li>
//                   <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-400 mr-2" /> Calendar Booking Integration</li>
//                   <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-400 mr-2" /> Instant Confirmation</li>
//                 </ul>
//               </div>

//               {/* Right Panel - Interactive Demo */}
//               <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
//                 {/* Chat Window */}
//                 <div className="bg-gray-50 p-6 h-72 overflow-y-auto space-y-4">
//                   <div className="flex items-start">
//                     <div className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 shadow">
//                       Hi, I’d like to schedule an appointment.
//                     </div>
//                   </div>
//                   <div className="flex items-start justify-end">
//                     <div className="bg-[#EF4C75] text-white rounded-lg px-4 py-2 shadow">
//                       I'd be happy to help! What day works best for you?
//                     </div>
//                   </div>
//                   <div className="flex items-start justify-end">
//                     <div className="bg-[#EF4C75]/20 text-[#EF4C75] rounded-lg px-3 py-1 text-sm italic animate-pulse">
//                       AI is typing...
//                     </div>
//                   </div>
//                 </div>

//                 {/* Input */}
//                 <div className="flex items-center gap-2 border-t border-gray-200 p-4 bg-white">
//                   <input
//                     type="text"
//                     placeholder="Type your reply..."
//                     disabled
//                     className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm bg-gray-100"
//                   />
//                   <button className="bg-[#EF4C75] text-white px-4 py-2 rounded-lg opacity-50 cursor-not-allowed">
//                     Send
//                   </button>
//                 </div>

//                 {/* Calendar Booking */}
//                 <div className="p-6 border-t border-gray-200 bg-gray-50 text-center">
//                   <h4 className="text-md font-semibold text-gray-800 mb-3">Book Your Demo Slot</h4>
//                   <div className="grid grid-cols-3 gap-3 text-sm">
//                     {["10:00 AM", "1:00 PM", "3:00 PM"].map((slot) => (
//                       <button
//                         key={slot}
//                         className="px-4 py-2 bg-white rounded-lg border hover:bg-[#EF4C75]/10 hover:border-[#EF4C75] hover:text-[#EF4C75] transition"
//                       >
//                         {slot}
//                       </button>
//                     ))}
//                   </div>
//                   <p className="mt-3 text-xs text-gray-500">Select a time to confirm your demo</p>
//                 </div>
//               </div>

//             </section>



//             {/* Final CTA Section */}
//             <section className="bg-gray-800 text-white py-20 px-6 text-center">
//               <div className="max-w-4xl mx-auto">
//                 <h2 className="text-3xl sm:text-4xl font-bold mb-4">
//                   Ready to Experience MYAI for Real?
//                 </h2>
//                 <p className="text-lg sm:text-xl mb-8">
//                   Book your personalized 30‑minute live demo and see how MYAI transforms your customer calls instantly.
//                 </p>
//                 <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
//                   <button className="inline-flex items-center justify-center gap-2 bg-white text-[#EF4C75] font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
//                     Book Your Demo <CalendarDays size={18} />
//                   </button>
//                 </div>
//                 <div className="flex flex-col sm:flex-row justify-center gap-10 text-center text-sm sm:text-base">
//                   <div>
//                     <p className="font-bold text-white">30-minute</p>
//                     <p className="text-purple-200">Live demo call</p>
//                   </div>
//                   <div>
//                     <p className="font-bold text-white">No setup</p>
//                     <p className="text-purple-200">Required to see features</p>
//                   </div>
//                   <div>
//                     <p className="font-bold text-white">Custom</p>
//                     <p className="text-purple-200">Business scenarios</p>
//                   </div>
//                 </div>
//               </div>
//             </section>


//       </main>
//           <ComprehensiveFooter />
//       </div>






//   )
// }

// export default page





export default function DemoPage() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const slots = ["10:00 AM", "11:30 AM", "2:00 PM", "4:00 PM"];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "user" | "ai"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [clicked, setClicked] = useState(false);


  const getAIResponse = (msg: string) => {
    if (msg.toLowerCase().includes("appointment")) {
      return "Of course! What day works best for you?";
    } else if (msg.toLowerCase().includes("hi") || msg.toLowerCase().includes("hello")) {
      return "Hello! I&apos;m MYAI, your virtual receptionist. How can I help today?";
    } else if (msg.toLowerCase().includes("tomorrow")) {
      return "Perfect! Here are some available slots:";
    }
    return "Got it! I&apos;ll help you with that.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user" as const, text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      const aiMsg = { from: "ai" as const, text: getAIResponse(userMsg.text) };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navbar />
      <main>
        {/* Demo Section */}
        <section className="relative py-20 px-6 lg:px-12 bg-gradient-to-b from-purple-50 via-purple-100/40 to-white overflow-hidden">
          {/* Floating background orbs */}
          <div className="absolute top-20 left-10 w-48 h-48 bg-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center lg:items-start mt-12 relative z-10">
            {/* Left Panel */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start text-sm font-semibold text-purple-700 bg-purple-100 rounded-full px-3 py-1 mb-4 w-fit mx-auto lg:mx-0">
                <div className="h-2 w-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                Live Demo Available
              </div>

              <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 text-gray-900">
                See <span className="bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent">MYAI Receptionist</span> in Action
              </h2>

              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Experience a real conversation with our AI receptionist. Try the interactive chat and
                book an appointment in seconds.
              </p>

              <button
                onClick={() => {
                  setClicked(true);
                  setIsOpen(true);
                }}
                className={`relative bg-purple-600 text-white hover:bg-purple-700 px-8 py-3 rounded-md shadow-lg transition duration-300 ease-in-out transform ${clicked ? "" : "zoom-animate"
                  }`}
              >
                <PlayCircle className="h-5 w-5 mr-2 inline" />
                Try Live Demo
                {!clicked && (
                  <span className="absolute inset-0 rounded-md ring-2 ring-purple-400/60 animate-pulse"></span>
                )}
              </button>


              <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 sm:gap-6 text-gray-700 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-1" /> Chat Demo
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-1" /> Live call examples
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-1" /> No commitment
                </div>
              </div>
            </div>

            {/* Right Panel: Preview Phone */}
            <div className="flex-1 flex justify-center">
              <div className="bg-white border border-purple-200 shadow-xl rounded-3xl w-72 h-[480px] flex flex-col overflow-hidden relative glow-card">
                {/* Header */}
                <div className="bg-purple-600 text-white text-center py-2 font-medium text-sm animate-pulse">
                  MYAI Chat Preview
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-purple-50">
                  <div className="flex justify-start message-animate">
                    <div className="bg-white border border-purple-200 px-3 py-2 rounded-lg text-sm text-gray-800 shadow-sm">
                      Hello! I&apos;m MYAI, your receptionist.
                    </div>
                  </div>
                  <div className="flex justify-end message-animate" style={{ animationDelay: "0.4s" }}>
                    <div className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm shadow-sm">
                      Hi, I&apos;d like to book an appointment.
                    </div>
                  </div>
                  <div className="flex justify-start message-animate" style={{ animationDelay: "0.8s" }}>
                    <div className="bg-white border border-purple-200 px-3 py-2 rounded-lg text-sm text-gray-800 shadow-sm">
                      Sure! What day works best for you?
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={() => setIsOpen(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 animate-bounce"
                    >
                      <MessageCircle className="w-4 h-4" /> Chat Live Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Popup Chat Modal */}
          {isOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-fade-in">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  💬 Chat with <span className="text-purple-600">MYAI</span>
                </h3>

                {/* Chat Window */}
                <div className="h-64 overflow-y-auto border border-purple-200 rounded-lg p-4 space-y-3 mb-4 bg-purple-50">
                  {messages.length === 0 && (
                    <p className="text-gray-500 text-sm italic">Start the conversation...</p>
                  )}
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"
                        }`}
                    >
                      <div
                        className={`px-3 py-2 rounded-lg max-w-xs ${msg.from === "user"
                          ? "bg-purple-600 text-white"
                          : "bg-white border border-purple-200 text-gray-800"
                          }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {/* Auto-show slots if AI mentioned them */}
                  {messages.some((m) => m.text.includes("available slots")) && !selectedSlot && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className="px-3 py-2 text-sm rounded-md bg-purple-100 hover:bg-purple-200 transition"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                  {selectedSlot && (
                    <div className="text-green-700 text-sm mt-3 font-medium">
                      ✅ Appointment confirmed for {selectedSlot}
                    </div>
                  )}
                </div>

                {/* Input Box */}
                {!selectedSlot && (
                  <div className="flex gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1 px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      placeholder="Type your message..."
                    />
                    <Button
                      onClick={sendMessage}
                      className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-lg"
                    >
                      Send
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>



        {/* CTA Section */}
        <section className="bg-gray-950 text-white py-12 px-6 lg:px-8 text-center rounded-tl-[60px] rounded-tr-[60px] -mt-10 relative z-20 shadow-inner-top-lg">
          <div className="max-w-4xl mx-auto m">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white animate-fade-in-up">
              Ready to Experience the Difference?
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-gray-300 animate-fade-in-up animation-delay-100">
              See how MYAI&apos;s features work together to transform your phone system in a personalized demo.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-200">
              <Button onClick={() => setIsOpen(true)} className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
                Schedule Live Demo <CalendarDays size={18} />
              </Button>
              <Button onClick={() => router.push('/pricing')} variant="outline" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-lg border-2 border-purple-600">
                View Pricing Plans
              </Button>
            </div>
          </div>
        </section>
      </main>

      <ComprehensiveFooter />
    </div>
  );
}



