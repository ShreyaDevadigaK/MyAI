"use client"

import { Button } from "@/components/ui/button"
import { Clock, Target, Users, Star, Building } from "lucide-react"
import { Mic, Phone, Bot, Calendar, MessageCircle, BarChart2 } from "lucide-react";
import { Navbar } from "@/components/Navbar"
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter"
import { BadgeCheck, Languages, FolderKanban, ShieldCheck, PhoneForwarded, Zap, ClipboardList } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";

// export default function FeaturesPage() {
//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <main>
//         {/* Hero Section */}
//         <section className="px-6 pt-24 lg:px-8 bg-gradient-to-b  from-[#0f172a] to-gray-900">
//           <div className="mx-auto max-w-4xl text-center  mt-12">
//             <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
//               Designed To{" "}
//               <span className="bg-gradient-to-r  from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa] bg-clip-text text-transparent">
//                 Never Miss a Call
//               </span>
//             </h1>
//             <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
//               Discover how MYAI receptionist transforms every phone interaction into a business opportunity
//               with advanced features that work seamlessly together.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
//               <Button  size="lg" onClick={() => router.push('/meet')} className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
//                 See Features in Action →
//               </Button>
//               <Button size="lg" onClick={() => router.push('/pricing')} variant="outline" className="border-gray-300 text-white px-8 py-3 bg-transparent">
//                 View Pricing
//               </Button>
//             </div>
//           </div>
//         </section>

//         {/* Why Choose Dialzara's AI Receptionist Section */}
//         <section className="bg-white py-16">
//           <div className="mx-auto max-w-6xl px-6 lg:px-8 -mt-14  text-center">
//             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">
//               Why Choose MY AI Receptionist
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//               <div className="flex flex-col items-center p-6">
//                 <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
//                   <Clock className="h-6 w-6 text-pink-600" />
//                 </div>
//                 <p className="text-3xl font-bold text-pink-600 mb-2">24/7</p>
//                 <p className="text-lg font-medium text-pink-800 mb-1">Availability</p>
//                 <p className="text-sm text-gray-600">Never miss a call, even after hours</p>
//               </div>

//               <div className="flex flex-col items-center p-6">
//                 <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
//                   <Target className="h-6 w-6 text-pink-600" />
//                 </div>
//                 <p className="text-3xl font-bold text-pink-600 mb-2">95%</p>
//                 <p className="text-lg font-medium text-gray-800 mb-1">Accuracy</p>
//                 <p className="text-sm text-gray-600">Precise information capture every time</p>
//               </div>

//               <div className="flex flex-col items-center p-6">
//                 <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
//                   <Users className="h-6 w-6 text-pink-600" />
//                 </div>
//                 <p className="text-3xl font-bold text-pink-600 mb-2">90%</p>
//                 <p className="text-lg font-medium text-gray-800 mb-1">Cost Savings</p>
//                 <p className="text-sm text-gray-600">Reduce staffing costs vs traditional receptionists</p>
//               </div>

//               <div className="flex flex-col items-center p-6">
//                 <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
//                   <Star className="h-6 w-6 text-pink-600" />
//                 </div>
//                 <p className="text-3xl font-bold text-pink-600 mb-2">4.9/5</p>
//                 <p className="text-lg font-medium text-gray-800 mb-1">Customer Rating</p>
//                 <p className="text-sm text-gray-600">Exceptional customer experience scores</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Powerful Features That Work Together Section (Placeholder) */}
//         <section className="bg-white text-white py-20 px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto text-center mb-16">
//             <h2 className="text-3xl font-bold text-gray-900">Powerful Features, Built for Your Business</h2>
//             <p className="mt-4 text-gray-600 text-lg">Every feature is designed to enhance your customer experience while streamlining your operations.</p>
//           </div>

//           <div className="space-y-12 max-w-5xl mx-auto">
//             {features.map((feature, idx) => (
//               <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-start gap-6">
//                 <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-purple-100 text-pink-600 shrink-0">
//                   <feature.icon className="w-8 h-8" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
//                   <p className="text-gray-600 mt-2">{feature.description}</p>
//                   <div className="mt-4 inline-block text-sm font-medium text-pink-700 bg-orange-100 px-3 py-1 rounded-md">
//                     {feature.punchline}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>



//       </main>

//       <ComprehensiveFooter /> 
//     </div>

//   )
// }


// Data for the Features section
const features = [
  {
    icon: Mic,
    title: "AI-Powered Call Answering",
    description: "Our AI receptionist answers every call promptly, professionally, and in a natural-sounding voice, ensuring a positive first impression.",
    punchline: "Automated, always-on phone support",
  },
  {
    icon: Calendar,
    title: "Instant Appointment Booking",
    description: "The AI can seamlessly book, reschedule, or cancel appointments based on your calendar availability, directly from a phone call.",
    punchline: "Streamline your scheduling effortlessly",
  },
  {
    icon: MessageCircle,
    title: "Intelligent Lead Capture",
    description: "Don't miss a lead. Our AI captures caller details, a brief summary of their request, and logs it directly into your CRM or a dashboard.",
    punchline: "Never lose a valuable lead",
  },
  {
    icon: BarChart2,
    title: "24/7 Performance Analytics",
    description: "Gain valuable insights into call volume, peak times, and customer interactions with a comprehensive dashboard that tracks key metrics.",
    punchline: "Data-driven decisions, around the clock",
  },
];

const MyAiPage = () => {
  const router= useRouter();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 px-6 lg:px-8 pb-32 bg-background">
          <div className="relative z-10 mx-auto max-w-7xl flex flex-col items-center pt-12">
            {/* Side-by-Side Section */}
            <div className="w-full max-w-6xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Left Side: The main headline, sub-headline, and CTA buttons */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight mb-6 animate-fade-in-up animation-delay-100">
                  Revolutionize Your <br />
                  <span className="bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] dark:from-[#c4b5fd] dark:to-[#8b5cf6] bg-clip-text text-transparent">
                    Customer Service
                  </span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
                  Our AI-powered receptionist seamlessly integrates into your workflow, providing instant support, capturing every lead, and elevating your brand's presence 24/7.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-300">
                  <Button size="lg" variant="outline" className="bg-primary hover:bg-purple-700 text-white dark:bg-primary dark:hover:bg-purple-600 px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105"
                   onClick={() => router.push('/meet')}>
                    <Mic className="h-5 w-5 mr-2" /> Watch Demo
                  </Button>
                </div>
              </div>

              {/* Right Side: The feature list */}
              <div className="w-full p-8 bg-card dark:bg-gray-900 rounded-2xl shadow-xl border border-border dark:border-gray-800 animate-fade-in-up animation-delay-500">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-left">
                  Key Features for Your Business
                </h3>
                <ul className="text-left space-y-4 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-1 shrink-0" />
                    <span>Our AI handles booking services and appointments with precision, ensuring your schedule is always optimized.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-1 shrink-0" />
                    <span>Easily buy phone numbers directly through our platform to streamline your communication setup.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-1 shrink-0" />
                    <span>Intelligent call transfer capabilities ensure customers are always connected to the right department or person.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-1 shrink-0" />
                    <span>Our AI is tailored to various industries, providing specialized call handling and support for your specific business needs.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="bg-white dark:bg-gray-950 py-16 px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-12 animate-fade-in-up">
              Why Choose MY AI Receptionist
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center p-6 bg-card dark:bg-gray-900 rounded-2xl shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl animate-fade-in-up animation-delay-100">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-4xl font-extrabold text-purple-600 dark:text-purple-400 mb-2">24/7</p>
                <p className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-1">Availability</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Never miss a call, even after hours</p>
              </div>

              <div className="flex flex-col items-center p-6 bg-card dark:bg-gray-900 rounded-2xl shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl animate-fade-in-up animation-delay-200">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-4xl font-extrabold text-purple-600 dark:text-purple-400 mb-2">95%</p>
                <p className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-1">Accuracy</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Precise information capture every time</p>
              </div>

              <div className="flex flex-col items-center p-6 bg-card dark:bg-gray-900 rounded-2xl shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl animate-fade-in-up animation-delay-300">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-4xl font-extrabold text-purple-600 dark:text-purple-400 mb-2">90%</p>
                <p className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-1">Cost Savings</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Reduce staffing costs vs traditional receptionists</p>
              </div>

              <div className="flex flex-col items-center p-6 bg-card dark:bg-gray-900 rounded-2xl shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-xl animate-fade-in-up animation-delay-400">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-4xl font-extrabold text-purple-600 dark:text-purple-400 mb-2">4.9/5</p>
                <p className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-1">Customer Rating</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Exceptional customer experience scores</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white dark:bg-gray-950 py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white animate-fade-in-up">Powerful Features, Built for Your Business</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg animate-fade-in-up animation-delay-100">Every feature is designed to enhance your customer experience while streamlining your operations.</p>
          </div>

          <div className="space-y-12 max-w-5xl mx-auto">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-card dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-border dark:border-gray-800 flex flex-col md:flex-row items-start gap-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-fade-in-up" style={{ animationDelay: `${200 + idx * 100}ms` }}>
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-purple-200 dark:bg-purple-800 text-purple-600 dark:text-purple-300 shrink-0">
                  <feature.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{feature.description}</p>
                  <div className="mt-4 inline-block text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900 px-3 py-1 rounded-full">
                    {feature.punchline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <ComprehensiveFooter />
    </div>
  );
};

export default MyAiPage;
