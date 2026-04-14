"use client"

import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ComprehensiveFooter } from '@/components/ComprehensiveFooter';
import { CheckCircle, XCircle } from "lucide-react";
import { Clock, PhoneCall, Shield } from "lucide-react";

function Page() {

  const router = useRouter()
  const benefits = [
    {
      title: "Never Miss a Lead",
      description:
        "Capture every potential customer, even when you're not available. Our AI qualifies leads and schedules follow-ups.",
    },
    {
      title: "Cost Effective",
      description:
        "Save thousands compared to hiring a full-time receptionist or overnight staff.",
    },
    {
      title: "Improved Customer Satisfaction",
      description:
        "Customers appreciate getting immediate responses, even outside business hours.",
    },
    {
      title: "Competitive Advantage",
      description:
        "Stand out from competitors who don’t answer calls outside business hours.",
    },
    {
      title: "Emergency Response",
      description:
        "Critical calls are identified and escalated immediately to the right person.",
    },
    {
      title: "Peace of Mind",
      description:
        "Sleep better knowing your business is always accessible to customers.",
    },
  ];

  const steps = [
    {
      title: "Quick Setup",
      description:
        "Configure your AI receptionist with your business information, hours, and call handling preferences.",
    },
    {
      title: "Forward Your Calls",
      description:
        "Forward your business line to your dedicated MYAI number. We'll handle the rest.",
    },
    {
      title: "Get Notifications",
      description:
        "Receive instant notifications and summaries of all calls, messages, and appointments.",
    },
  ];


  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>

        
        <section className="bg-gradient-to-b from-[#ede9fe] to-[#ddd6fe] text-gray-700 py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto mt-24">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              After Hours Phone Answering Service
            </h1>
            <p className="text-lg md:text-xl text-gray-500 mb-8">
            Our AI receptionist handles your calls 24/7, captures leads, and ensures professional customer service even when you&apos;re sleeping
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-purple-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-100"
              onClick={() => router.push("/sign-up")}>
                Start Free Trial
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What’s the best solution for phone answering services?
          </h2>
          <p className="text-gray-500 mb-12">
            Traditional receptionists vs. AI receptionists
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Traditional */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col items-center mb-4">
                <div className="text-red-500 text-4xl mb-2">👤</div>
                <h3 className="text-xl font-semibold text-red-700">
                  Traditional Receptionist
                </h3>
                <p className="text-red-500 text-sm">Human-based phone answering</p>
              </div>
              <ul className="text-left space-y-3 mt-4 text-red-700">
                <li className="flex items-center">
                  <XCircle className="w-5 h-5 mr-2" /> Limited to business hours only
                </li>
                <li className="flex items-center">
                  <XCircle className="w-5 h-5 mr-2" /> $35,000–$45,000 annual salary
                </li>
                <li className="flex items-center">
                  <XCircle className="w-5 h-5 mr-2" /> Additional benefits & taxes
                </li>
                <li className="flex items-center">
                  <XCircle className="w-5 h-5 mr-2" /> Training costs & sick days
                </li>
                <li className="flex items-center">
                  <XCircle className="w-5 h-5 mr-2" /> Equipment & workspace needed
                </li>
              </ul>
            </div>

            {/* AI Receptionist */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col items-center mb-4">
                <div className="text-green-600 text-4xl mb-2">🎧</div>
                <h3 className="text-xl font-semibold text-green-700">
                  MY AI Receptionist
                </h3>
                <p className="text-green-500 text-sm">AI-powered phone answering</p>
              </div>
              <ul className="text-left space-y-3 mt-4 text-green-700">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" /> 24/7/365 availability
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" /> Starting at $29/month
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" /> No additional costs
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" /> Instant setup & deployment
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" /> Cloud-based, no equipment
                </li>
              </ul>
            </div>
          </div>
        </section>




        <section className="bg-gray-50 py-16 px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our After Hours Phone Answering Service?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <Clock className="w-10 h-10 mx-auto text-violet-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">24/7 Availability</h3>
              <p className="text-gray-600">
                Our AI receptionist never sleeps. Handle calls, capture leads, and provide
                customer service around the clock.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <PhoneCall className="w-10 h-10 mx-auto text-violet-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Professional Call Handling</h3>
              <p className="text-gray-600">
                Every call is answered professionally with your custom greeting and brand voice.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <Shield className="w-10 h-10 mx-auto text-violet-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Emergency Handling</h3>
              <p className="text-gray-600">
                Urgent calls are identified and escalated immediately to ensure critical issues are addressed.
              </p>
            </div>
          </div>
        </section>

        {/*benefits*/}

        <section className="bg-white py-16 px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
            Benefits of After Hours Phone Answering
          </h2>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="text-green-600 mt-1 w-5 h-5" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Working  */}
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
              How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md text-center"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>








      </main>

      <ComprehensiveFooter />


    </div>

  )
}

export default Page
