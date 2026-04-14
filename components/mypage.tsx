 'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/Navbar'
import { FAQSection } from '@/components/FaqSection'
import { ComprehensiveFooter } from '@/components/ComprehensiveFooter'

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#070e1f]  text-white">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}

             <section className="px-6 py-16  lg:px-8">
          <div className="mx-auto  mt-24 max-w-4xl text-center">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              AI receptionists that{" "}
              <span className="bg-gradient-to-r from-[#6d28d9] via-[#9d7bf6] to-[#c4b5fd] bg-clip-text text-transparent">
                happily answer
              </span>{" "}
              the phone 24/7.
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Capture 100% of calls, book appointments automatically, and qualify leads 24/7
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 mt-12">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
                onClick={() => router.push("/industries")}
              >
                Start Free Trial
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-white px-8 py-3 bg-transparent"
                onClick={() => router.push("/meet")}
              >
                <Play className="mr-2 h-4 w-4" />
                Book a Demo
              </Button>
            </div>

            {/* <p className="text-sm text-gray-400 mb-12">7-day free trial • No setup fees • Cancel anytime</p> */}

            {/* <div className="bg-gray-800 rounded-lg p-6 mb-16 max-w-md mx-auto">
              <p className="text-gray-300 mb-2">Call our AI receptionist for a live demo:</p>
              <p className="text-lg font-semibold text-white">866-545-ZARA</p>
            </div> */}
          </div>
        </section>
   





        {/* Company Logos */}
        {/* <section className="px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex justify-center">
              <img
                src="/images/company-logos.png"
                alt="Company logos"
                className="w-full max-w-5xl opacity-80"
              />
            </div>
          </div>
        </section> */}

        {/* Steps Section */}
        <section className="bg-[#000000] py-16 px-4 md:px-8 mt-24">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent ">
              Fast, Easy Setup
            </h2>
            <p className="text-gray-400 mb-12">
              How our AI virtual receptionists work
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6 text-left relative">
                  <div className="absolute -top-4 left-4 bg-purple-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shadow">
                    {i + 1}
                  </div>
                  <div className="mt-6">
                    <div className="text-purple-400 mb-2 text-2xl">{["📄", "🎙️", "📚", "👍"][i]}</div>
                    <h3 className="text-lg font-semibold mb-2">{
                      ["Set up", "Choose a voice and a phone number", "Call Flow Enhancements", "Go live"][i]
                    }</h3>
                    <p className="text-sm text-gray-300 mb-2">
                      {[
                        "Create an account and answer a few questions about your business and your typical customers. We'll tackle the hard part by automatically transforming the details you provide into a customized prompt.",
                        "Select from over 40 different voices for your agent, and pick a dedicated local or toll-free number (included in your plan).",
                        "Easily add or edit prompts, include a custom greeting, and set up transfer numbers to streamline your call handling.",
                        "Enable your line now and let customers call, connect, and book their appointments in seconds — never miss a lead again!"
                      ][i]}
                    </p>
                    {i === 0 && (
                      <Link href="/sign-up?redirect_url=/" className="text-sm text-indigo-400 hover:underline font-medium">Sign up →</Link>
                    )}

                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="bg-[#000000] py-16 mt-16 w-full">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-[#6d28d9] via-[#9d7bf6] to-[#c4b5fd] bg-clip-text text-transparent">
                  The Business Phone Answering System
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#9d53c8] via-[#E879F9] to-[#7e21a8] bg-clip-text text-transparent">
                  That Answers Every Call You Can&apos;t
                </span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                ["60%", "of customers prefer to call local businesses after finding them online."],
                ["38%", "But only 38% of these calls get answered."],
                ["80%", "of callers don't leave a voicemail, resulting in countless lost opportunities for businesses."]
              ].map(([percent, desc], i) => (
                <div key={i} className="bg-gray-900 rounded-lg p-8 shadow-sm border border-gray-700 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-4">{percent}</div>
                  <p className="text-gray-300 text-lg leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-[#070e1f] py-16 overflow-hidden w-full">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                What people say about our{" "}
                <span className="bg-gradient-to-r from-[#6d28d9] via-[#9d7bf6] to-[#c4b5fd] bg-clip-text text-transparent">
                  AI receptionists
                </span>
              </h2>
            </div>

            {/* First Row - Moving Left */}
            <div className="mb-8">
              <div className="flex animate-scroll-left space-x-6">
                {/* All testimonials remain the same */}
                <div className="flex-shrink-0 bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-80">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-sm">CA</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Corner Auto</div>
                      <div className="flex text-yellow-400 text-sm">{"★".repeat(5)}</div>
                    </div>
                    <div className="ml-auto text-green-500">★</div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    We LOVE it, Its like set it and forget it. I can load all the questions that we get asked, and have
                    it automated. so easy to work it, And very responsive. The MYAI Support is amazing as well,
                    they&apos;ve kept in contact and are there every step of the way.
                  </p>
                </div>

                {/* Continue with other testimonials... */}
                <div className="flex-shrink-0 bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-80">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-800 font-bold text-sm">DC</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Davide C.</div>
                      <div className="flex text-yellow-400 text-sm">{"★".repeat(5)}</div>
                    </div>
                    <div className="ml-auto text-green-500">★</div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Very happy so far with the service. The price is right, user interface is very intuitive and easy to
                    navigate and the quality of the interaction with the virtual agent is very good.
                  </p>
                </div>

                <div className="flex-shrink-0 bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-80">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-800 font-bold text-sm">BL</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Bernie Lynch</div>
                      <div className="flex text-yellow-400 text-sm">{"★".repeat(5)}</div>
                    </div>
                    <div className="ml-auto text-green-500">★</div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Highly Recommend MYAI! MYAI was so easy to set up and it is amazing the interaction
                    created between the attendant and the caller. From a price point perspective, it has tremendous
                    value and has taken on a very labor-intensive part of our businesses. The call transcript via text
                    and email insures we don&apos;t miss calls.
                  </p>
                </div>

                <div className="flex-shrink-0 bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-80">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-300 rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-800 font-bold text-sm">MH</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Martin Hinshaw</div>
                      <div className="flex text-yellow-400 text-sm">{"★".repeat(5)}</div>
                    </div>
                    <div className="ml-auto text-green-500">★</div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Amazing customer service saves me so much time. Amazing customer service saves me so much time. I
                    needed an area code that wasn&apos;t available, within minutes they found a solution and had that number.
                    Wow, efficient and a huge logistic help to our company.
                  </p>
                </div>
              </div>
            </div>

            {/* Second Row - Moving Right */}
            <div>
              <div className="flex animate-scroll-right space-x-6">
                <div className="flex-shrink-0 bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-80">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-4">
                      <span className="text-green-800 font-bold text-sm">RH</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Robert Haney</div>
                      <div className="flex text-yellow-400 text-sm">{"★".repeat(5)}</div>
                    </div>
                    <div className="ml-auto text-green-500">★</div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Great experience and they are very helpful with customer support. I would definitely recommend it to
                    anyone looking for an automated phone service.
                  </p>
                </div>

                <div className="flex-shrink-0 bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-80">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                      <span className="text-gray-800 font-bold text-xs">CC</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Crystal Clear</div>
                      <div className="text-sm text-gray-500">Arizona</div>
                      <div className="flex text-yellow-400 text-sm">{"★".repeat(5)}</div>
                    </div>
                    <div className="ml-auto text-green-500">★</div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Excellent service and support. The AI receptionist handles our calls professionally and we never
                    miss important business opportunities anymore.
                  </p>
                </div>

                <div className="flex-shrink-0 bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-80">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-sm">K</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Kelby Steele</div>
                      <div className="flex text-yellow-400 text-sm">{"★".repeat(5)}</div>
                    </div>
                    <div className="ml-auto text-green-500">★</div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    The setup was incredibly easy and the results have been fantastic. Our customers love the
                    professional service and we love not missing any calls.
                  </p>
                </div>

                <div className="flex-shrink-0 bg-white rounded-lg p-6 shadow-sm border border-gray-100 w-80">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-sm">MB</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Marcela Braka</div>
                      <div className="flex text-yellow-400 text-sm">{"★".repeat(5)}</div>
                    </div>
                    <div className="ml-auto text-green-500">★</div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Outstanding AI receptionist service. It's like having a full-time receptionist at a fraction of the
                    cost. Highly recommend to any business owner.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <ComprehensiveFooter />

      {/* Bottom CTA Bar */}
      {/* <section>
        <div className="fixed bottom-0 z-50 bg-[#A447B9] text-white py-4 w-full">
          <div className="px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-lg font-medium">Call our AI receptionist</span>
              <Button
                variant="secondary"
                className="bg-white text-[#A447B9] hover:bg-gray-100 font-semibold px-6"
              >
                866-545-ZARA
              </Button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}
