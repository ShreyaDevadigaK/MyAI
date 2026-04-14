"use client"

import { Navbar } from "@/components/Navbar"
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter"
import { Volume2 } from "lucide-react"
import { Zap, Mic, Phone, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import VoiceLibrarySection from "@/components/VoiceLibrarySection"
import { CalendarDays } from "lucide-react"
import { useRouter } from "next/navigation"

// export default function VoicesPage() {
//    const router = useRouter();
//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <main>
//         {/* Hero Section for Voices */}
//         <section className="px-6 pt-24 lg:px-8 bg-gradient-to-b from-white to-gray-50">
//           <div className="mx-auto max-w-4xl  mt-4 text-center">
//             <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
//               Choose Your AI Receptionist{" "}
//               <span className="bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">Voice</span>
//             </h1>
//             <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//               Select from a variety of natural-sounding AI voices to perfectly match your brand's personality and tone.
//             </p>

//             <p className="mt-4 flex items-center justify-center gap-2 text-orange-600 font-medium text-sm">
//               <Volume2 className="w-5 h-5" />
//               <span>Click play to hear each voice in action</span>
//             </p>

//           </div>
//         </section>

//         {/* Voice Options Section */}
//         <VoiceLibrarySection />

//         <section className="bg-gray-800 text-white py-20 px-6 text-center">
//           <div className="max-w-4xl mx-auto">
//             <h2 className="text-3xl sm:text-4xl font-bold mb-4">
//               Ready to Experience These Features?
//             </h2>
//             <p className="text-lg sm:text-xl mb-8">
//               See how MYAI features work together to transform your phone system in a personalized 30-minute demo.
//             </p>

//             <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
//               <button onClick={() => router.push('/meet')} className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
//                 Schedule Live Demo <CalendarDays size={18} />
//               </button>
//               <button onClick={() => router.push('/pricing')} className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition">
//                 View Pricing Plans
//               </button>
//             </div>
//           </div>
//         </section>



//       </main>
//       <ComprehensiveFooter />
//     </div>
//   )
// }


const MyAiPageVoices = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section for Voices */}
        <section className="relative px-6 pt-24 lg:px-8 pb-22 overflow-hidden">
          {/* Background gradient and shapes */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f3e8ff] via-white to-[#f3e8ff] dark:from-[#1b1029] dark:via-[#0f0a1a] dark:to-[#1b1029] opacity-80 z-0"></div>
          <div className="absolute top-1/4 left-10 w-48 h-48 bg-purple-200 dark:bg-[#2d1b69] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float-enhanced"></div>
          <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-purple-300 dark:bg-[#4a2e8c] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float-enhanced animation-delay-500"></div>

          <div className="relative z-10 mx-auto max-w-4xl mt-4 text-center mt-12">
            {/* Tagline */}
            <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-purple-800 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 rounded-full animate-pulse-glow">
              <Mic className="h-4 w-4 inline-block mr-2 text-purple-600 dark:text-purple-400" />
              The Sound of Professionalism
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6 animate-fade-in-up">
              Find the Perfect AI Receptionist{" "}
              <span className="bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] dark:from-[#c4b5fd] dark:to-[#8b5cf6] bg-clip-text text-transparent">
                Voice
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
              Select from a variety of natural-sounding AI voices to perfectly match your brand's personality and tone.
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-purple-600 dark:text-purple-400 font-medium text-sm animate-fade-in-up animation-delay-200">
              <Volume2 className="w-5 h-5" />
              <span>Click a voice to hear a sample and select it</span>
            </div>
          </div>
        </section>

        {/* Audio Playing Animation Section */}
        <section className="bg-gray-100 dark:bg-gray-800 py-8 px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl text-center">
            <div className="relative w-full overflow-hidden rounded-xl shadow-lg h-24 md:h-28 lg:h-32">
              <img
                src="/images/audio.gif"
                alt="Audio wave animation"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </section>

        {/* Voice Options Section (VoiceLibrarySection component remains the same for functionality) */}
        <VoiceLibrarySection />

        {/* CTA Section */}
        <section className="bg-gray-950 text-white py-12 px-6 lg:px-8 text-center rounded-tl-[60px] rounded-tr-[60px] -mt-10 relative z-20 shadow-inner-top-lg">
          <div className="max-w-4xl mx-auto m">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white animate-fade-in-up">
              Ready to Experience the Difference?
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-gray-300 animate-fade-in-up animation-delay-100">
              See how MYAI's features work together to transform your phone system in a personalized demo.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-200">
              <Button onClick={() => router.push('/meet')} className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg">
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
};

export default MyAiPageVoices;