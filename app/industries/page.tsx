// app/industries/page.tsx
"use client"

import { Navbar } from "@/components/Navbar"
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const industryData = {
  hvac: {
    title: "AI answering service for HVAC companies",
    description: "Never miss a service call — we help you book appointments, handle emergencies, and capture new leads 24/7.",
    image: "/images/hvacback.jpg",
  },

  // lawfirms: {
  //   title: "AI receptionist for law firms",
  //   description: "Capture inquiries and screen leads 24/7.",
  // },

  // restaurants:{
  //   title: "AI phone assistant for restaurants",
  //     description:
  //       "Let Dialzara handle phone reservations, takeout orders, and guest inquiries, so your staff can focus on food and service.",
  // },
  // ecommerce: {
  //     title: "AI customer service for eCommerce",
  //     description:
  //       "Dialzara helps online retailers handle support calls, track orders, and answer common customer questions 24/7.",
  // },
  //  automotive: {
  //     title: "AI answering service for auto repair & dealers",
  //     description:
  //       "Dialzara handles service appointments, part inquiries, and follow-ups for your shop or dealership, 24/7.",
  //  },
  //   accounting: {
  //     title: "AI receptionist for accounting firms",
  //     description:
  //       "Dialzara helps accounting and bookkeeping firms answer inquiries, schedule consultations, and manage client interactions.",
  //   },
  //   insurance: {
  //     title: "AI phone assistant for insurance agents",
  //     description:
  //       "Dialzara handles quote requests, policy questions, and claims intake for insurance offices with 24/7 AI assistance.",
  //   },
  plumbingservices: {
    title: "AI assistant for plumbing services",
    description:
      "MYAI helps plumbing service providers handle customer calls, schedule repairs, and manage service inquiries with ease.",
    image: "/images/plumback.jpg",
  },

  cleaningcompanies: {
    title: "AI receptionist for cleaning companies",
    description:
      "MYAI helps cleaning businesses answer calls, schedule services, and quote new jobs 24/7.",
    image: "/images/cleanback.jpg",
  },


}

export default function IndustriesOverviewPage() {
  const router = useRouter()

  return (
    <>
      <Navbar />
      {/* <main className="py-16 px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl mt-12 lg:text-5xl font-bold text-gray-900 mb-4">
          Industries We Serve
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
          Explore how MYAI receptionist can help across industries.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(industryData).map(([slug, { title, description }]) => (
            <div
              key={slug}
              className="group p-6 rounded-xl bg-white border border-transparent hover:border-[#EF4C75] transition-all duration-300 shadow-xl hover:shadow-md"
            >
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
                <p className="text-gray-600 mb-6">{description}</p>
              </div>
              <Button
                className="bg-pink-500 hover:bg-pink-700 text-white px-6 py-2 self-start"
                onClick={() => router.push(`/industries/${slug}`)}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </main> */}

      <section className="relative overflow-hidden py-16 px-6 lg:px-8 bg-gray-50 dark:bg-gray-950">
        {/* Gradient background with floating shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0e8f7] via-[#faf5ff] to-[#f0e8f7] dark:from-[#0a0613] dark:via-[#1e1b31] dark:to-[#0a0613] z-0 opacity-80"></div>
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-purple-200 dark:bg-[#2d1b69] rounded-full mix-blend-multiply filter blur-2xl opacity-70 animate-float-enhanced"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-purple-300 dark:bg-[#4a2e8c] rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-float-enhanced animation-delay-500"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center mt-18">
          <h1 className="text-4xl mt-12 lg:text-5xl font-bold mb-4 animate-fade-in-up">
            <span className="bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent">
              We Serve
            </span>{" "}
            <span className="text-gray-900 dark:text-white">
              Industries 
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-100">
            Explore how MYAI receptionist can help across various industries with tailored solutions.
          </p>

          <div className="space-y-16">
            {Object.entries(industryData).map(([slug, { title, description, image }], idx) => (
              <div key={slug} className="relative">
                {/* One industry block */}
                <div
                  className={`flex flex-col lg:flex-row items-center gap-8 ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                >
                  {/* Image Card */}
                  <div
                    className="flex-1 rounded-lg overflow-hidden shadow-xl bg-cover bg-center min-h-[250px] relative"
                    style={{ backgroundImage: `url(${image})` }}
                  >
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>

                  {/* Text & Button */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
                    <button
                      className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
                      onClick={() => router.push(`/industries/${slug}`)}
                    >
                      Get Started
                    </button>
                  </div>
                </div>

                {/* Separator Line */}
                {idx < Object.entries(industryData).length - 1 && (
                  <div className="mt-12 border-t border-gray-300 dark:border-gray-700 w-3/4 mx-auto"></div>
                )}
              </div>
            ))}
          </div>




        </div>
      </section>



      <ComprehensiveFooter />
    </>
  )
}
