"use client";


import React, { useState, useEffect } from "react";
import SubscriptionContent from "@/components/SubscriptionContent";
import ProfileContent from "@/components/ProfileContent";
import ActivityContent from "@/components/ActivityContent";
import CalendarContent from "@/components/CalendarContent";
import MyAgentContent from "@/components/MyAgentContent";
import CallTransfersEditor from "@/components/CallTransfersEditor";
import AgentConfiguration from "../agent-configuration/page";
import { useRouter } from "next/navigation";
import { useSelectedVoice } from '@/context/SelectedVoiceContext'
import { useCallActivity } from '@/context/CallActivityContext'
import { useSearchParams } from 'next/navigation'

// const voices = [
//   { id: "f0ed7e07-0e85-4853-a8f5-e09c627cf944", name: "Cassidy-English", gender: "Female", description: "English. Female.", previewUrl: "https://storage.googleapis.com/eleven-public-prod/database/workspace/1da06ea679a54975ad96a2221fe6530d/voices/56AoDkrOh6qfVPDXZ7Pt/oEgVi6mikkKcpVcTFfj5.mp3", phoneNumber: "+14027966599" },
//   { id: "87edb04c-06d4-47c2-bd94-683bc47e8fbe", name: "Monika-English-Indian", gender: "Female", description: "Indian English accent. Female.", previewUrl: "https://storage.googleapis.com/eleven-public-prod/database/workspace/514d94e9241c48e8b7905375729c436f/voices/2zRM7PkgwBPiau2jvVXc/NcEOQ9awTZvgwUoqtmU9.mp3", phoneNumber: "+14027966599" },
//   { id: "d2d3f512-55a1-4e14-8322-1626efd1c531", name: "Denisa - Czech", gender: "Female", description: "Calm and soft young female voice.", previewUrl: "https://storage.googleapis.com/eleven-public-prod/7G095XVHsmgoCnhxJhLJeLZUzAR2/voices/OAAjJsQDvpg3sVjiLgyl/4cc64654-5542-4ff8-bfa7-67cf38c8c906.mp3", phoneNumber: "+14027966599" },
//   { id: "e194185b-cb4e-43ab-9bef-e2a88530090d", name: "Francisco-Portuguese", gender: "Male", description: "European (Portugal) accent. Male.", previewUrl: "https://storage.googleapis.com/eleven-public-prod/database/workspace/1da06ea679a54975ad96a2221fe6530d/voices/WsQeRzWJvoDvhPPJj5r7/2198749f-0444-4a8c-aba5-65d581483f86.mp3", phoneNumber: "+14027966599" },
//   { id: "af750274-1a66-4b7c-ae41-e1a196fbe285", name: "Peter - Slovak", gender: "Male", description: "Middle aged male.", previewUrl: "https://storage.googleapis.com/eleven-public-prod/database/user/HOZrfHdrnpe9pZlWrIwZoq4cDsX2/voices/d6IbhdqAKkXCCVuJjbie/KdiAikWHzYiPnLKFP9Qv.mp3", phoneNumber: "+14027966599" },
//   { id: "3a645332-ab59-485a-83ed-2fc0c79815f1", name: "David-English-British", gender: "Male", description: "Default Male", previewUrl: "https://storage.googleapis.com/eleven-public-prod/custom/voices/BNgbHR0DNeZixGQVzloa/40VSLvxrLAkmQgyrEA4t.mp3", phoneNumber: "+14027966599" },
// ];

const sidebarItems = [
  { id: "my-agent", label: "My Agent" },
  { id: "agent-configuration", label: "My Agent Configuration" },
  { id: "activity", label: "Activity" },
  { id: "call-transfer", label: "Call Transfers" },
  { id: "calendar", label: "My Calendar" },
  { id: "profile", label: "Profile" },
  // { id: "more-settings", label: "More Settings" },
  { id: "subscription", label: "Subscription" },
];




const DashboardPage: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>("my-agent");
  const { setSelectedVoiceId } = useSelectedVoice();

  const searchParams = useSearchParams();
  const industryRaw = searchParams.get('industry') || '';

  const router = useRouter();

  // Load selected voice from localStorage on component mount
  useEffect(() => {
    const storedVoice = localStorage.getItem('selectedVoice');
    if (storedVoice) {
      try {
        const voice = JSON.parse(storedVoice);
        // Set the voice ID in the context
        if (voice.voiceId) {
          setSelectedVoiceId(voice.voiceId);
        }
      } catch (err) {
        console.error('Error parsing voice from localStorage:', err);
      }
    }
  }, [setSelectedVoiceId]);

  useEffect(() => {
    
    if (industryRaw) {
      router.push(`/agent-configuration?industry=${industryRaw}`);
    }
  }, [industryRaw, router]);



  const renderContent = () => {
    switch (selectedMenu) {
      case "my-agent":
        return <MyAgentContent />;
      case "activity":
        return <ActivityContent />;
      case "profile":
        return <ProfileContent />;
      case "subscription":
        return <SubscriptionContent />;
      case "agent-configuration":
        return <AgentConfiguration />;
      case "call-transfer":
        return<CallTransfersEditor/>;
      case "calendar":
        return <CalendarContent />;
    }
  }



 return (
     <div className="flex h-screen bg-gray-100 text-gray-800 overflow-hidden">
       {/* Sidebar */}
       <nav className="w-56 bg-gradient-to-b from-purple-800 to-purple-900 text-white flex flex-col shadow-lg overflow-y-auto">
         <div className="p-6 font-bold text-2xl border-b border-purple-700 tracking-wide">
           MYAI
         </div>
 
         <ul className="flex-1 mt-4 space-y-1">
           {sidebarItems.map((item) => (
             <li key={item.id}>
               <button
                 onClick={() => setSelectedMenu(item.id)}
                 className={`w-full text-left px-6 py-3 rounded-l-full transition-all duration-200 ${selectedMenu === item.id
                   ? "bg-white text-purple-800 font-semibold shadow-md"
                   : "hover:bg-purple-700"
                   }`}
               >
                 {item.label}
               </button>
             </li>
           ))}
         </ul>
 
         {/* Logout button - Improved styling and positioning */}
         <div className="mt-auto p-4 border-t border-purple-700">
           <button
             onClick={() => router.push('/')}
             className="w-full flex items-center justify-center px-4 py-3 text-white bg-purple-700 hover:bg-purple-600 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
           >
             <svg
               className="w-5 h-5 mr-2"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth="2"
                 d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
               ></path>
             </svg>
             Logout
           </button>
         </div>
       </nav>
 
       {/* Main content - Scrollable */}
       <main className="flex-1 bg-white p-6 shadow-inner rounded-tl-3xl overflow-y-auto">
         <div className="max-w-7xl mx-auto">
           {renderContent()}
         </div>
       </main>
     </div>
   );
 };
 
 
 
 
 export default DashboardPage;
 