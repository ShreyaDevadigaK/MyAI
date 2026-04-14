import React from 'react'
import { Navbar } from '@/components/Navbar'
import { ComprehensiveFooter } from '@/components/ComprehensiveFooter'

function page() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>

        <section className="bg-gradient-to-b from-[#ede9fe] to-[#ddd6fe] text-gray-700  py-20 px-4 text-center pb-20">
          <div className="max-w-5xl mx-auto mt-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About MYAI</h2>
            <p className="text-lg leading-relaxed">
              At MYAI, we believe businesses should never miss a customer call — even after hours.
              That’s why we built an AI-powered answering solution to help you capture leads, support clients, and grow revenue 24/7.
              Our technology is designed to be simple, smart, and scalable — tailored to fit businesses of any size.
            </p>
          </div>
        </section>

        <section id="#contact" className="min-h-screen bg-gradient-to-b from-[#ede9fe] to-[#ddd6fe] py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-8 text-[#0b1c2b]">Contact Us</h1>
            <p className="text-gray-700 mb-12">
              We&apos;d love to hear from you. Fill out the form and our team will get back to you shortly.
            </p>
            <form className="space-y-6 text-left">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0b1c2b]"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0b1c2b]"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  placeholder="Company Inc."
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0b1c2b]"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  placeholder="(123) 456-7890"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0b1c2b]"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">How Can We Help You?</label>
                <textarea
                  rows={5}
                  placeholder="Let us know what you're looking for..."
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0b1c2b]"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#0b1c2b] text-white py-3 rounded hover:bg-[#0b1c2b]/90 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>


      </main>

      <ComprehensiveFooter />

    </div>
  )
}

export default page