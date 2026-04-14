"use client"

import React from 'react'
import { Navbar } from '@/components/Navbar'
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ComprehensiveFooter } from '@/components/ComprehensiveFooter';

function ServicesForSmallPage() {
  const { user } = useUser();
  const router = useRouter()
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>


        <section className="bg-gradient-to-b from-[#ede9fe] to-[#ddd6fe] text-gray-700 py-20 px-6 text-center relative overflow-hidden">
          {/* Decorative background blobs */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 -right-24 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30"></div>

          <div className="relative max-w-4xl mx-auto mt-24">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Answering Service for <br className="hidden md:block" />
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 bg-clip-text text-transparent">
                Small Business
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              AI receptionists available 24/7 — never miss a lead, booking, or customer call again.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition transform hover:scale-105"
               onClick={() => router.push("/sign-up")}>
                🚀 Start Free Trial
              </button>
              <button className="bg-white text-gray-800 font-semibold px-8 py-4 rounded-lg shadow-md hover:bg-gray-100 transition"
               onClick={() => router.push("/meet")}>
                🎥 See Live Demo
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                ✅ No credit card required
              </div>
              <div className="flex items-center gap-2">
                🔒 Secure & private
              </div>
              <div className="flex items-center gap-2">
                ⚡ Instant setup
              </div>
            </div>
          </div>
        </section>



        <section className="bg-white py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-lg aspect-video">
              <iframe
                src="https://www.youtube.com/embed/AIpR42SDhOY?si=-CGnB2BUVTqKQSVw"
                title="How to Create An After Hours Answering Service for Your Business using AI"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </section>




        <section className="bg-blue-950 text-white py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Try our small business answering service for free
            </h2>
            <p className="text-lg sm:text-xl mb-8">
              Join thousands of small businesses using Dialzara to never miss another call. Start your free trial today.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              {user ? (
                <Button />
              ) : (
                <Button size="lg" className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
                  onClick={() => router.push("/sign-up")}>
                  Start Free Trial
                </Button>
              )}

              <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg transition"
                onClick={() => router.push("/pricing")}>
                View Pricing Plans
              </Button>
            </div>
          </div>
        </section>

      </main>

      <ComprehensiveFooter />


    </div>
  )
}

export default ServicesForSmallPage