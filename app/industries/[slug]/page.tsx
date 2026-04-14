"use client"
import React from 'react';
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Navbar"
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useRouter } from 'next/navigation';

import {
  Phone,
  FileText,
  Clock,
  ArrowRight,
  Wrench,
  MessageSquare,
  CalendarCheck,
  Scale,
  Briefcase,
  AlertTriangle,
  DollarSign,
  Users,

} from "lucide-react"

interface IndustryPageProps {
  params: {
    slug: string
  }
}

interface IndustryInfo {
  title: string
  description: string
  heroImageQuery: string
  heroImageAlt: string
  whyChooseTitle: string
  whyChooseDescription: string
  step1: string
  step2: string
  step3: string
  step4: string
  features: { icon: any; title: string; description: string }[]

}

const industryData: Record<string, IndustryInfo> = {
  realestate: {
    title: "AI answering service for real estate agents",
    description:
      "Dialzara helps real estate agents capture leads, schedule showings, and answer property inquiries 24/7—so you never miss a deal.",
    heroImageQuery: "real estate agent on phone in front of house",
    heroImageAlt: "Real estate agent talking on phone outside a listed property",
    whyChooseTitle: "Why real estate agents choose Dialzara",
    whyChooseDescription:
      "Stay connected to every buyer and seller lead, even while you're showing homes or in meetings. Let AI handle scheduling, follow-ups, and FAQs around the clock.",
    step1: "Sign up and enter details about your listings, areas served, and preferred appointment types.",
    step2: "Choose your voice and assign a local or toll-free number to your AI agent.",
    step3: "Upload listing information, FAQs, or scripts, or connect your MLS website for automatic knowledge syncing.",
    step4: "Forward your business line and start converting leads while you're out showing homes.",
    features: [
      { icon: Briefcase, title: "Lead Qualification", description: "Screen buyer and seller leads and collect essential info." },
      { icon: CalendarCheck, title: "Showings Scheduling", description: "Book appointments and open house slots automatically." },
      { icon: MessageSquare, title: "Instant Property Info", description: "Provide details about listings instantly, anytime." },
      { icon: Clock, title: "24/7 Availability", description: "Never miss a lead again, even after hours." },
      { icon: Users, title: "Client Communication", description: "Follow up with prospects and answer common questions." },
      { icon: DollarSign, title: "Boost Closings", description: "Improve response time and convert more leads into clients." },
    ],
  },

  lawfirms: {
    title: "AI receptionist for law firms",
    description:
      "Dialzara provides AI-powered receptionists for law firms to help capture client inquiries, schedule consultations, and screen leads 24/7.",
    heroImageQuery: "lawyer at desk on phone",
    heroImageAlt: "Lawyer at desk speaking on the phone in a legal office",
    whyChooseTitle: "Why law firms use Dialzara",
    whyChooseDescription:
      "Our AI receptionists ensure your firm never misses a call or a qualified client inquiry, no matter how busy your staff is.",
    step1: "Create your law firm profile and define your areas of practice.",
    step2: "Pick a voice for your AI assistant and secure your custom phone number.",
    step3: "Upload intake forms, FAQs, and firm info for personalized client responses.",
    step4: "Enable call forwarding and let AI handle client intake and screening.",
    features: [
      { icon: Briefcase, title: "Client Intake", description: "Gather case details and schedule consultations automatically." },
      { icon: Clock, title: "After-hours Coverage", description: "Respond to potential clients even when your office is closed." },
      { icon: MessageSquare, title: "Legal FAQs", description: "Answer basic questions about legal services and process." },
      { icon: CalendarCheck, title: "Consultation Scheduling", description: "Let clients book directly into your calendar." },
      { icon: Users, title: "Lead Filtering", description: "Prioritize qualified leads based on practice area and urgency." },
      { icon: DollarSign, title: "Increase Billable Work", description: "Let your staff focus on legal work, not phone calls." },
    ],
  },

  hvac: {
    title: "AI receptionist for HVAC companies",
    description:
      "MYAI helps HVAC businesses answer every call, book service appointments, and handle emergency requests 24/7 — without needing extra staff.",
    heroImageQuery: '/images/hvac.png',
    heroImageAlt: "HVAC technician repairing an outdoor AC unit",
    whyChooseTitle: "Why HVAC companies use MYAI",
    whyChooseDescription:
      "Our AI receptionists make sure no customer is left waiting. Whether it’s emergency calls, maintenance bookings, or general inquiries — we’ve got it covered.",
    step1: "Create your HVAC business profile and list the services you provide.",
    step2: "Choose a voice for your AI receptionist and get your custom phone number.",
    step3: "Upload service area details, pricing, and scheduling preferences.",
    step4: "Forward your calls and let AI handle booking, FAQs, and emergencies.",
    features: [
      { icon: CalendarCheck, title: "Appointment Booking", description: "Schedule repair or installation appointments automatically." },
      { icon: AlertTriangle, title: "Emergency Call Handling", description: "Ensure urgent service calls are prioritized 24/7." },
      { icon: MessageSquare, title: "Service FAQs", description: "Answer common HVAC questions like pricing, service windows, and maintenance plans." },
      { icon: Clock, title: "After-hours Support", description: "Keep your business responsive even when your office is closed." },
      { icon: Users, title: "Lead Qualification", description: "Capture and screen leads based on urgency, location, and service type." },
      { icon: Wrench, title: "Focus on Field Work", description: "Let your team focus on repairs while AI handles the phones." },
    ],
  },

  plumbingservices: {
  title: "AI receptionist for plumbing companies",
  description:
    "MYAI helps plumbing businesses answer every call, schedule service visits, and manage emergency plumbing issues 24/7 — without hiring extra staff.",
  heroImageQuery: '/images/plumbing.png',
  heroImageAlt: "Plumber repairing a leaking pipe under a kitchen sink",
  whyChooseTitle: "Why plumbing companies use MYAI",
  whyChooseDescription:
    "Our AI receptionists ensure no customer is left waiting. From clogged drains and leak reports to general plumbing inquiries — MYAI handles it all.",
  step1: "Create your plumbing business profile and list the services you offer.",
  step2: "Choose a voice for your AI receptionist and receive a dedicated phone number.",
  step3: "Upload your service area, rates, and booking availability.",
  step4: "Forward your calls so AI can manage scheduling, FAQs, and emergency requests.",
  features: [
    { icon: CalendarCheck, title: "Appointment Booking", description: "Automatically schedule plumbing inspections, repairs, and installations." },
    { icon: AlertTriangle, title: "Emergency Call Handling", description: "Respond to burst pipes, leaks, and urgent service calls any time." },
    { icon: MessageSquare, title: "Service FAQs", description: "Answer common plumbing questions like service types, pricing, and availability." },
    { icon: Clock, title: "After-hours Support", description: "Provide 24/7 call handling even when your team is off the clock." },
    { icon: Users, title: "Lead Qualification", description: "Filter leads by job urgency, service type, and location." },
    { icon: Wrench, title: "Focus on the Fix", description: "Let your crew handle the tools while AI handles the phones." },
  ],
},

  restaurants: {
    title: "AI phone assistant for restaurants",
    description:
      "Let Dialzara handle phone reservations, takeout orders, and guest inquiries, so your staff can focus on food and service.",
    heroImageQuery: "restaurant staff answering phone",
    heroImageAlt: "Restaurant employee taking a phone order",
    whyChooseTitle: "Why restaurants choose Dialzara",
    whyChooseDescription:
      "Reduce missed calls and streamline customer communication with an AI that handles orders, reservations, and FAQs 24/7.",
    step1: "Set up your restaurant profile including menu, hours, and services offered.",
    step2: "Select a friendly voice and get a dedicated phone number.",
    step3: "Upload menus, policies, and delivery links to the AI’s knowledge base.",
    step4: "Forward your phone line and let the AI take calls during busy hours.",
    features: [
      { icon: Briefcase, title: "Reservation Handling", description: "Book tables and manage seating requests automatically." },
      { icon: Clock, title: "24/7 Order Line", description: "Accept takeout orders even after business hours." },
      { icon: CalendarCheck, title: "Event Booking", description: "Capture and qualify private dining or catering inquiries." },
      { icon: MessageSquare, title: "Menu Inquiries", description: "Answer questions about dishes, ingredients, and allergens." },
      { icon: Users, title: "Customer Support", description: "Reduce missed calls and improve guest satisfaction." },
      { icon: DollarSign, title: "Drive More Orders", description: "Increase revenue by answering every customer call." },
    ],
  },

  ecommerce: {
    title: "AI customer service for eCommerce",
    description:
      "Dialzara helps online retailers handle support calls, track orders, and answer common customer questions 24/7.",
    heroImageQuery: "ecommerce customer on phone with package",
    heroImageAlt: "Online shopper calling customer support with parcel in hand",
    whyChooseTitle: "Why eCommerce brands choose Dialzara",
    whyChooseDescription:
      "Deliver responsive, round-the-clock support without hiring a full team. Let AI manage order updates, returns, and FAQs by phone.",
    step1: "Input your brand and support info, including order policies and return steps.",
    step2: "Choose an AI voice and set up your customer support phone number.",
    step3: "Connect your website or help center to power the agent’s answers.",
    step4: "Forward your phone line and instantly scale your support team.",
    features: [
      { icon: Briefcase, title: "Order Tracking", description: "Give real-time updates on order status and shipping." },
      { icon: Clock, title: "24/7 Support", description: "Assist customers around the clock without staffing constraints." },
      { icon: MessageSquare, title: "Return & Refund Info", description: "Answer return policy and exchange questions instantly." },
      { icon: CalendarCheck, title: "Delivery Scheduling", description: "Coordinate delivery time windows or updates." },
      { icon: Users, title: "Multilingual Support", description: "Assist customers in different languages using AI." },
      { icon: DollarSign, title: "Increase Retention", description: "Keep shoppers happy and loyal through responsive service." },
    ],
  },

  automotive: {
    title: "AI answering service for auto repair & dealers",
    description:
      "Dialzara handles service appointments, part inquiries, and follow-ups for your shop or dealership, 24/7.",
    heroImageQuery: "auto mechanic answering phone",
    heroImageAlt: "Auto repair technician answering a customer call",
    whyChooseTitle: "Why auto shops choose Dialzara",
    whyChooseDescription:
      "Free up your team and never miss a service call again. Our AI can schedule repairs, answer questions, and qualify leads.",
    step1: "Enter your services, vehicle types, and appointment preferences.",
    step2: "Select a voice and assign your shop’s phone number to the AI.",
    step3: "Upload service menus and FAQs or link to your website.",
    step4: "Forward calls and reduce time spent answering the phone.",
    features: [
      { icon: Briefcase, title: "Appointment Booking", description: "Schedule oil changes, diagnostics, and inspections automatically." },
      { icon: Clock, title: "24/7 Call Handling", description: "Answer customer calls at all hours, especially weekends." },
      { icon: CalendarCheck, title: "Maintenance Reminders", description: "Proactively remind clients about upcoming services." },
      { icon: MessageSquare, title: "Service FAQs", description: "Explain costs, timelines, and warranty terms clearly." },
      { icon: Users, title: "Customer Follow-up", description: "Confirm appointments or follow up after services." },
      { icon: DollarSign, title: "Boost Shop Revenue", description: "Convert more inbound calls into service jobs." },
    ],
  },

  accounting: {
    title: "AI receptionist for accounting firms",
    description:
      "Dialzara helps accounting and bookkeeping firms answer inquiries, schedule consultations, and manage client interactions.",
    heroImageQuery: "accountant on phone at desk",
    heroImageAlt: "Accountant on phone with documents on desk",
    whyChooseTitle: "Why accountants use Dialzara",
    whyChooseDescription:
      "Let AI answer tax season questions, book calls, and screen leads—so you stay focused on client work.",
    step1: "Describe your firm’s services and preferred meeting types.",
    step2: "Pick a professional AI voice and assign a phone number.",
    step3: "Upload tax info, FAQs, and policies to train your AI.",
    step4: "Forward your firm’s number and automate inbound communication.",
    features: [
      { icon: Briefcase, title: "Client Intake", description: "Collect info about tax needs or bookkeeping requests." },
      { icon: CalendarCheck, title: "Meeting Booking", description: "Let clients schedule directly into your calendar." },
      { icon: MessageSquare, title: "Tax FAQs", description: "Answer common tax deadlines, document needs, and refund times." },
      { icon: Clock, title: "After-Hours Calls", description: "Help clients even during tax season crunch time." },
      { icon: Users, title: "Client Support", description: "Offer routine support without adding admin workload." },
      { icon: DollarSign, title: "Improve Productivity", description: "Let staff focus on client work, not the phone." },
    ],
  },

  insurance: {
    title: "AI phone assistant for insurance agents",
    description:
      "Dialzara handles quote requests, policy questions, and claims intake for insurance offices with 24/7 AI assistance.",
    heroImageQuery: "insurance agent phone call at office",
    heroImageAlt: "Insurance agent speaking on the phone with a client",
    whyChooseTitle: "Why insurance agents use Dialzara",
    whyChooseDescription:
      "Let AI handle call volume, qualify leads, and provide instant answers about coverage or claims, even after hours.",
    step1: "Input your agency details, plans offered, and FAQ topics.",
    step2: "Choose a voice and assign a phone number to your agent.",
    step3: "Train the AI with policy documents and claims steps.",
    step4: "Forward your number and handle calls automatically.",
    features: [
      { icon: Briefcase, title: "Quote Requests", description: "Collect information for fast quoting." },
      { icon: Clock, title: "24/7 Service", description: "Assist customers around the clock with policy and claims support." },
      { icon: MessageSquare, title: "Policy FAQs", description: "Answer questions about deductibles, coverages, and more." },
      { icon: CalendarCheck, title: "Appointment Scheduling", description: "Book meetings with clients directly." },
      { icon: Users, title: "Lead Qualification", description: "Screen inquiries and route high-value leads to your team." },
      { icon: DollarSign, title: "Boost Conversions", description: "Turn more calls into policyholders." },
    ],
  },

  propertymanagers: {
    title: "AI assistant for property managers",
    description:
      "Dialzara helps property managers handle tenant calls, maintenance requests, and rental inquiries with ease.",
    heroImageQuery: "property manager on phone at apartment complex",
    heroImageAlt: "Property manager answering phone in residential complex",
    whyChooseTitle: "Why property managers choose Dialzara",
    whyChooseDescription:
      "Streamline tenant communication and reduce missed calls for maintenance, leasing, or general questions.",
    step1: "List your properties, services, and contact protocols.",
    step2: "Pick a voice and assign your AI assistant a phone number.",
    step3: "Upload FAQs, leasing info, and maintenance policies.",
    step4: "Forward your main line and manage tenant calls with AI.",
    features: [
      { icon: Briefcase, title: "Tenant Support", description: "Log maintenance requests or rental concerns automatically." },
      { icon: Clock, title: "24/7 Call Handling", description: "Handle urgent after-hours issues like plumbing or access." },
      { icon: CalendarCheck, title: "Tour Booking", description: "Let prospects schedule showings automatically." },
      { icon: MessageSquare, title: "Lease FAQs", description: "Answer common questions about rent, pets, and policies." },
      { icon: Users, title: "Communication Hub", description: "Act as a single point of contact for tenants and owners." },
      { icon: DollarSign, title: "Retain Tenants", description: "Provide fast, helpful responses to keep tenants satisfied." },
    ],
  },

  cleaningcompanies: {
    title: "AI receptionist for cleaning companies",
    description:
      "MYAI helps cleaning businesses answer calls, schedule services, and quote new jobs 24/7.",
    heroImageQuery: '/images/cleaning.png',
    heroImageAlt: "Cleaning worker answering call while on site",
    whyChooseTitle: "Why cleaning companies use MYAI",
    whyChooseDescription:
      "Never miss a new job opportunity again. Let AI book appointments, answer FAQs, and capture new leads anytime.",
    step1: "Create a company profile and select your services and locations.",
    step2: "Choose a friendly AI voice and assign a number.",
    step3: "Upload your pricing, policies, and service details.",
    step4: "Forward your calls and grow your client base with AI support.",
    features: [
      { icon: Briefcase, title: "Quote Intake", description: "Collect job details and customer info automatically." },
      { icon: Clock, title: "24/7 Availability", description: "Take calls even when you're out cleaning." },
      { icon: CalendarCheck, title: "Service Scheduling", description: "Book recurring or one-time cleanings directly." },
      { icon: MessageSquare, title: "Service FAQs", description: "Answer questions about pricing, availability, and supplies." },
      { icon: Users, title: "Client Communication", description: "Stay in touch with clients before and after jobs." },
      { icon: DollarSign, title: "Boost Revenue", description: "Turn more inquiries into booked appointments." },
    ],
  },
}

const isCallBookingFeature = (title: string, description: string) => {
  const lowerTitle = title.toLowerCase();
  const lowerDescription = description.toLowerCase();
  return (
    lowerTitle.includes("call") ||
    lowerTitle.includes("phone") ||
    lowerTitle.includes("booking") ||
    lowerTitle.includes("schedule") ||
    lowerTitle.includes("appointment") ||
    lowerTitle.includes("inquiry") ||
    lowerTitle.includes("intake") ||
    lowerTitle.includes("reservation") ||
    lowerTitle.includes("dispatch") ||
    lowerDescription.includes("call") ||
    lowerDescription.includes("phone") ||
    lowerDescription.includes("booking") ||
    lowerDescription.includes("schedule") ||
    lowerDescription.includes("appointment") ||
    lowerDescription.includes("inquiry") ||
    lowerDescription.includes("intake") ||
    lowerDescription.includes("reservation") ||
    lowerDescription.includes("dispatch")
  );
};



// export default function IndustryPage() {
// // //   const router = useRouter();

// // //   const { slug } = useParams() as { slug: string }

// // //   // Normalize slug: remove dashes if needed
// // //   const normalizedSlug = slug.replace(/-/g, "")
// // //   const data = industryData[normalizedSlug]

// // //   if (!data) {
// // //     return (
// // //       <div className="min-h-screen bg-white flex flex-col">
// // //         <Navbar />
// // //         <main className="min-h-screen flex items-start justify-center pt-24 px-4">
// // //           <div className="text-center">
// // //             <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Industry Not Found</h1>
// // //             <p className="text-lg text-gray-600 mb-6">
// // //               The industry page you are looking for does not exist.
// // //             </p>
// // //             <Button
// // //               className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2"
// // //               onClick={() => (window.location.href = "/")}
// // //             >
// // //               Go to Homepage
// // //             </Button>
// // //           </div>
// // //         </main>

// // //         <ComprehensiveFooter />
// // //       </div>
// // //     )
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-white">
// // //       <Navbar />
// // //       <main>
// // //         {/* Hero Section */}
// // //         <section className="px-6 py-16 lg:px-8 bg-gradient-to-b from-white to-gray-50">
// // //           <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center  mt-4">
// // //             <div className="text-center lg:text-left">
// // //               <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">{data.title}</h1>
// // //               <p className="text-xl text-gray-600 mb-8 max-w-2xl lg:mx-0 mx-auto">{data.description}</p>
// // //               <Button
// // //                 onClick={() =>
// // //                   router.push(
// // //                     `/sign-up?redirect_url=${encodeURIComponent(
// // //                       `/subscription-plan?next=${encodeURIComponent(`/test-chat?industry=${slug}`)}`
// // //                     )}`
// // //                   )
// // //                 }

                
// // //               size="lg"
// // //               className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3"
// // //               >
// // //               Get Started
// // //             </Button>
// // //           </div>
// // //           <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl mt-4">
// // //             <Image
// // //               // src={`/placeholder.svg?height=500&width=700&query=${encodeURIComponent(data.heroImageQuery)}`}
// // //               src={data.heroImageQuery}
// // //               alt={data.heroImageAlt}
// // //               fill
// // //               style={{ objectFit: "cover" }}
// // //               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
// // //             />
// // //           </div>
// // //         </div>
// // //       </section>



// // //       {/* Why Choose Section */}
// // //       <section className="bg-white py-16">
// // //         <div className="mx-auto max-w-6xl px-6 lg:px-8 text-center">
// // //           <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{data.whyChooseTitle}</h2>
// // //           <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">{data.whyChooseDescription}</p>
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// // //             {data.features.map((feature, index) => (
// // //               <div key={index} className="flex flex-col items-center p-6">
// // //                 <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
// // //                   <feature.icon className="h-8 w-8 text-pink-600" />
// // //                 </div>
// // //                 <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
// // //                 <p className="text-gray-600 text-center">{feature.description}</p>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </section>


// // //       {/*working steps*/}
// // //       <section className="bg-white py-16 px-4 md:px-8">
// // //         <div className="max-w-6xl mx-auto text-center">
// // //           <h2 className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-400">
// // //             Fast, Easy Setup
// // //           </h2>
// // //           <p className="text-gray-500 mb-12">
// // //             How our AI virtual receptionists work
// // //           </p>

// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// // //             {/* Step 1 */}
// // //             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-left relative">
// // //               <div className="absolute -top-4 left-4 bg-pink-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shadow">
// // //                 1
// // //               </div>
// // //               <div className="mt-6">
// // //                 <div className="text-pink-500 mb-2 text-2xl">📄</div>
// // //                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Set up</h3>
// // //                 <p className="text-sm text-gray-600 mb-2">
// // //                   {data.step1}
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             {/* Step 2 */}
// // //             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-left relative">
// // //               <div className="absolute -top-4 left-4 bg-pink-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shadow">
// // //                 2
// // //               </div>
// // //               <div className="mt-6">
// // //                 <div className="text-pink-500 mb-2 text-2xl">🎙️</div>
// // //                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Choose a voice and a phone number</h3>
// // //                 <p className="text-sm text-gray-600">
// // //                   {data.step2}
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             {/* Step 3 */}
// // //             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-left relative">
// // //               <div className="absolute -top-4 left-4 bg-pink-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shadow">
// // //                 3
// // //               </div>
// // //               <div className="mt-6">
// // //                 <div className="text-pink-500 mb-2 text-2xl">💬</div>
// // //                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Train and Refine</h3>
// // //                 <p className="text-sm text-gray-600">
// // //                   {data.step3}
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             {/* Step 4 */}
// // //             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-left relative">
// // //               <div className="absolute -top-4 left-4 bg-pink-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shadow">
// // //                 4
// // //               </div>
// // //               <div className="mt-6">
// // //                 <div className="text-pink-500 mb-2 text-2xl">👍</div>
// // //                 <h3 className="text-lg font-semibold mb-2 text-gray-800">Go live</h3>
// // //                 <p className="text-sm text-gray-600 mb-2">
// // //                   {data.step4}
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       <section className="bg-gray-700 py-20 text-white text-center">
// // //         <div className="container mx-auto px-4 max-w-4xl">
// // //           {/* Main heading */}
// // //           <h2 className="text-4xl md:text-5xl font-bold mb-6">
// // //             Ready to never miss a lead again?
// // //           </h2>

// // //           {/* Sub-description */}
// // //           <p className="text-lg md:text-xl mb-10 leading-relaxed">
// // //             Join real estate agents who capture every opportunity with Dialzara's AI
// // //             answering service.
// // //           </p>

// // //           {/* Call to action button */}
// // //           <button onClick={() => router.push('/sign-up?redirect_url=/test-chat')}
// // //             className="bg-white text-pink-700 font-semibold py-3 px-8 rounded-full
// // //                      shadow-lg hover:bg-gray-100 transition-colors duration-300
// // //                      focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
// // //           >
// // //             Start Free Trial
// // //           </button>
// // //         </div>
// // //       </section>

// // //     </main>

  

// // //   <ComprehensiveFooter />
// // //     </div >
// // //   )
//  }




import { useState } from "react";

export default function IndustryPage() {
  const router = useRouter();
  const { slug } = useParams() as { slug: string };
  const [showAgentChat, setShowAgentChat] = useState(false);

  // Normalize slug: remove dashes if needed
  const normalizedSlug = slug.replace(/-/g, "");
  const data = industryData[normalizedSlug];

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="min-h-screen flex items-start justify-center pt-24 px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Industry Not Found</h1>
            <p className="text-lg text-gray-600 mb-6">
              The industry page you are looking for does not exist.
            </p>
            <Button
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2"
              onClick={() => (window.location.href = "/")}
            >
              Go to Homepage
            </Button>
          </div>
        </main>
        <ComprehensiveFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative px-6 py-24 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f3e8ff] via-white to-[#f3e8ff] dark:from-[#1b1029] dark:via-[#0f0a1a] dark:to-[#1b1029] opacity-80 z-0"></div>
          <div className="absolute top-1/4 left-10 w-48 h-48 bg-purple-200 dark:bg-[#2d1b69] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float-enhanced"></div>
          <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-purple-300 dark:bg-[#4a2e8c] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float-enhanced animation-delay-500"></div>

          <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 mt-12">
            {/* Agent Intro */}
            <div className="text-center lg:text-left animate-fade-in-up">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                {data.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl lg:mx-0 mx-auto">
                {data.description}
              </p>
              <div className="flex items-center space-x-3 mb-8 justify-center lg:justify-start">
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping"></span>
                  <span className="text-white font-bold text-lg">AI</span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl shadow-md text-sm text-gray-700 dark:text-gray-300">
                  👋 Hi! I’m your AI Agent for {data.title}. Ready to help?
                </div>
              </div>
              <Button
                onClick={() => {
                  // Skip authentication, go directly to test-chat
                  router.push(`/test-chat?industry=${encodeURIComponent(slug)}`)
                }}
                size="lg"
                className="bg-primary hover:bg-purple-700 text-white px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
              >
                Get Started with Your Agent
              </Button>
            </div>

            {/* Hero Visual */}
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02] animate-fade-in-right">
              <Image
                src={data.heroImageQuery}
                alt={data.heroImageAlt}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="bg-white dark:bg-gray-950 py-20 px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 animate-fade-in-up">
              {data.whyChooseTitle}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-16 animate-fade-in-up animation-delay-100">
              {data.whyChooseDescription}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.features.map((feature, index) => {
                const isRelated = isCallBookingFeature(feature.title, feature.description);
                return (
                  <div
                    key={index}
                    className="group relative p-8 rounded-3xl bg-gray-100 dark:bg-gray-800 border border-transparent dark:border-gray-700 transition-all duration-500 shadow-xl hover:shadow-3xl hover:border-primary transform hover:-translate-y-3 hover:rotate-1 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {isRelated && (
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary/20 dark:bg-primary/30 flex items-center justify-center animate-pulse-slow">
                        {feature.icon === CalendarCheck ? (
                          <CalendarCheck className="w-5 h-5 text-primary opacity-70" />
                        ) : (
                          <Phone className="w-5 h-5 text-primary opacity-70" />
                        )}
                      </div>
                    )}
                    <div className="relative w-16 h-16 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="h-8 w-8 text-secondary group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Meet Your AI Agent Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10 text-center relative overflow-hidden">
          <h2 className="text-4xl font-bold mb-6">Meet Your AI Agent</h2>
          <p className="max-w-2xl mx-auto text-lg mb-10">
            Personalized for the {data.title} industry — handling calls, bookings, and customer care 24/7.
          </p>
          <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
                AI
              </div>
              <div className="text-left">
                <p className="font-semibold">Your AI Agent</p>
                <span className="text-xs text-green-500">● Online</span>
              </div>
            </div>
            <div className="space-y-3 text-left">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl max-w-xs">📞 Hi, I can schedule a booking for tomorrow at 3 PM. Works for you?</div>
              <div className="bg-primary text-white px-4 py-2 rounded-2xl max-w-xs ml-auto">✅ Yes, book it!</div>
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl max-w-xs">Great! You’re all set. ✅</div>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="bg-white dark:bg-gray-900 py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-fade-in-up">
              How Your AI Agent Works
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-12 animate-fade-in-up animation-delay-100">
              Four simple steps to launch your intelligent industry agent.
            </p>

            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary opacity-20 hidden lg:block"></div>
              {[
                { icon: '📄', title: 'Define Your Needs', description: data.step1 },
                { icon: '🎙️', title: 'Choose Voice & Number', description: data.step2 },
                { icon: '🤖', title: 'Train & Personalize', description: data.step3 },
                { icon: '📊', title: 'Activate & Optimize', description: data.step4 }
              ].map((step, index) => (
                <div
                  key={index}
                  className="relative z-10 flex flex-col items-center text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full border-4 border-primary bg-white dark:bg-gray-900 text-primary font-bold text-xl shadow-lg mb-6">
                    {index + 1}
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 h-full flex flex-col items-center justify-center border border-border dark:border-gray-700 transition-transform duration-300 hover:scale-105">
                    <div className="text-4xl mb-4 text-primary">{step.icon}</div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}


        <section className="bg-gray-950 text-white py-12 px-6 lg:px-8 text-center rounded-tl-[60px] rounded-tr-[60px] -mt-10 relative z-20 shadow-inner-top-lg">
          <div className="max-w-4xl mx-auto m">
            <h2 className="text-xl md:text-2xl font-bold mb-6 animate-fade-in-up">
              I’m your AI Agent for {data.title}. Let’s get started together.
            </h2>
            <p className="text-lg mb-8 text-gray-200 animate-fade-in-up animation-delay-100">
              Always online, always learning, always booking.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-200">
              <Button onClick={() => router.push('/meet')} variant="outline" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-lg border-2 border-purple-600">
                Start Trial
              </Button>
            </div>
          </div>
        </section>

      </main>

      {/* Floating Agent Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          className="relative w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg flex items-center justify-center animate-pulse-slow hover:scale-110 transition-transform"
          onClick={() => setShowAgentChat(true)}
        >
          <Phone className="w-7 h-7" />
          <span className="absolute -top-2 -right-2 bg-green-500 text-xs px-2 py-1 rounded-full">Online</span>
        </button>
      </div>

      {/* Agent Chat Modal */}
      {showAgentChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowAgentChat(false)}
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4">Chat with your AI Agent</h3>
            <div className="space-y-3 text-left max-h-60 overflow-y-auto">
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl max-w-xs">👋 Hi! How can I help you today?</div>
              <div className="bg-primary text-white px-4 py-2 rounded-2xl max-w-xs ml-auto">Book a demo call</div>
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl max-w-xs">Sure! How about tomorrow at 2 PM?</div>
            </div>
            <input
              type="text"
              placeholder="Type your message..."
              className="mt-4 w-full border rounded-full px-4 py-2 dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
        </div>
      )}

      <ComprehensiveFooter />
    </div>
  );
}

