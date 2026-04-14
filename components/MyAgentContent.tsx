
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';

// interface Voice {
//   voiceId: string;
//   name: string;
//   description: string;
//   previewUrl: string;
// }

// export default function MyAgentContent() {
//   const [voice, setVoice] = useState<Voice | null>(null);
//   const [phoneNumber, setPhoneNumber] = useState<string>('');
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const industryRaw = searchParams.get('industry') || '';

//   useEffect(() => {
//     const stored = localStorage.getItem('selectedVoice');
//     if (stored) {
//       try {
//         setVoice(JSON.parse(stored));
//       } catch (err) {
//         console.error('Error parsing voice from localStorage:', err);
//       }
//     }

//     // Get phone number from URL parameter or localStorage
//     const urlPhoneNumber = searchParams.get('phoneNumber');
//     const storedPhoneNumber = localStorage.getItem('purchasedPhoneNumber');

//     if (urlPhoneNumber) {
//       setPhoneNumber(urlPhoneNumber);
//       // Update localStorage with the URL parameter
//       localStorage.setItem('purchasedPhoneNumber', urlPhoneNumber);
//     } else if (storedPhoneNumber) {
//       setPhoneNumber(storedPhoneNumber);
//     } else {
//       // Fallback to default if no phone number is found
//       setPhoneNumber('+1 (978) 570-8611');
//     }
//   }, [searchParams]);

//   const goToTab = (tab: string) => {
//     router.push(`/agent-configuration?tab=${encodeURIComponent(tab)}&industry=${industryRaw}`);
//   };




//   return (

//     <div className="p-6 bg-gradient-to-b from-blue-50 to-white rounded-2xl shadow-lg max-w-xl mx-auto space-y-6 border border-gray-200">
//       {/* Header */}
//       <div className="flex justify-center border-b pb-4">
//         <h2 className="text-2xl font-bold mb-4 text-purple-700">👩‍💼 My Agent</h2>
//       </div>

//       {/* Agent Avatar */}
//       <div className="flex flex-col items-center">
//         <img
//           src="/images/agent-avatar.jpg"
//           alt="Agent"
//           className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-md"
//         />
//         <span className="mt-2 text-sm text-gray-600">Virtual Assistant</span>
//       </div>

//       {/* Voice Info */}
//       {voice ? (
//         <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm">
//           <div className="text-center">
//             <h3 className="text-lg font-semibold text-blue-800">{voice.name}</h3>
//             <p className="text-sm text-blue-700 mt-1">
//               {voice.description || 'A natural and expressive voice.'}
//             </p>
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm font-medium text-blue-700 mb-1">🎧 Voice Preview</label>
//             <audio className="w-full" controls src={voice.previewUrl} />
//           </div>

//           {/* Change Voice Button */}
//           <div className="mt-4 flex justify-center">
//             <button
//               onClick={() => router.push('/voice-picker')}
//               className="text-blue-700 hover:text-blue-900 text-sm font-medium mt-3 underline transition"
//             >
//               ✏️ Change Agent Voice
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="text-sm text-gray-500 italic text-center">
//           No voice selected. Please choose one on the previous screen.
//         </div>
//       )}

//       {/* Phone Number */}
//       <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
//         <label className="block text-sm font-medium text-gray-700">📱 Phone Number</label>
//         <p className="text-lg font-semibold text-gray-900 mt-1">{phoneNumber}</p>
//       </div>  

//     </div>




//   );
// };




'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';


interface Voice {
  voiceId: string;
  name: string;
  description: string;
  previewUrl: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function MyAgentContent() {
  const [voice, setVoice] = useState<Voice | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [showTestModal, setShowTestModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const industryRaw = searchParams.get('industry') || '';

  useEffect(() => {
    const stored = localStorage.getItem('selectedVoice');
    if (stored) {
      try {
        setVoice(JSON.parse(stored));
      } catch (err) {
        console.error('Error parsing voice from localStorage:', err);
      }
    }

    const urlPhoneNumber = searchParams.get('phoneNumber');
    const storedPhoneNumber = localStorage.getItem('purchasedPhoneNumber');

    if (urlPhoneNumber) {
      setPhoneNumber(urlPhoneNumber);
      localStorage.setItem('purchasedPhoneNumber', urlPhoneNumber);
    } else if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    } else {
      setPhoneNumber('+1 (978) 570-8611');
    }
  }, [searchParams]);

  const goToTab = (tab: string) => {
    router.push(`/agent-configuration?tab=${encodeURIComponent(tab)}&industry=${industryRaw}`);
  };

  const handleTestAgent = () => {
    setShowTestModal(true);
  };

  const handleCallAgent = () => {
    setShowTestModal(false);
    router.push('/agent-configuration');
  };

  return (
<div className="relative p-8 bg-[#f2f0f5] min-h-screen">
  {/* Main Container - Light gradient card */}
  <div className="relative z-10 mx-auto max-w-6xl flex gap-0 rounded-2xl shadow-2xl overflow-hidden border border-[#b48ef7] 
    bg-gradient-to-br from-[#e9d8fd]  to-[#f3ebff]">
    
    {/* Left Column: Agent Profile */}
    <motion.div
      className="w-1/3 flex flex-col items-center p-8 text-gray-900 border-r border-[#b48ef7] 
      bg-gradient-to-b from-[#ede9fe]/70 to-[#d8b4fe]/70"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Profile Image */}
      <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-purple-300/40 shadow-lg">
        <img
          src="/images/agent-avatar.jpg"
          alt="Agent Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name + Description */}
      <div className="mt-6 text-center">
        <h2 className="text-xl font-bold text-purple-900">{voice ? voice.name : 'No Voice Selected'}</h2>
        <div className="mt-2 text-sm text-purple-800">
          <span className=" px-3 py-1 rounded-full shadow">
            {voice ? voice.description : 'Please select a voice to activate your agent.'}
          </span>
        </div>
      </div>

      {/* Phone Number */}
      <div className="mt-6 w-full p-4 rounded-lg border border-purple-300/40 shadow-sm text-center ">
        <label className="block text-sm text-purple-800">📱 Phone Number</label>
        <p className="text-lg font-semibold mt-1 text-purple-900">{phoneNumber}</p>
      </div>

      {/* Social Icons */}
      <div className="mt-12 flex gap-6 text-purple-700">
        <span className="text-2xl hover:text-purple-900 transition-colors">in</span>
        <span className="text-2xl hover:text-purple-900 transition-colors">f</span>
        <span className="text-2xl hover:text-purple-900 transition-colors">x</span>
        <span className="text-2xl hover:text-purple-900 transition-colors">p</span>
      </div>
    </motion.div>

    {/* Right Column: Agent Info */}
    <div className="w-2/3 p-8 space-y-8 text-purple-900">
      
      {/* Heading */}
      <motion.div variants={cardVariants}>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700  to-purple-600 bg-clip-text text-transparent drop-shadow">
          My Virtual Agent
        </h1>
        <p className="text-sm text-purple-700 mt-2">
          Your AI assistant, ready to work.
        </p>
      </motion.div>

      {/* About Agent */}
      <motion.div
        className="p-6 rounded-xl  border border-purple-300/40 shadow-lg"
        variants={cardVariants}
      >
        <h3 className="text-xl font-semibold text-purple-900">About Agent</h3>
        <p className="mt-4 text-sm text-purple-800">
          As an agent who is an expert to answer your calls and help you book schedules with ease
        </p>
      </motion.div>

      {/* Agent Voice */}
      <motion.div
        className="p-6 rounded-xl bg-white/120 border border-purple-300/40 shadow-lg"
        variants={cardVariants}
      >
        <h4 className="text-xl font-semibold mb-4 text-purple-900">Agent Voice</h4>
        {voice ? (
          <>
            <audio className="w-full rounded-full border border-purple-300/40 shadow-inner" controls src={voice.previewUrl} />
            <div className="flex justify-center mt-4">
              <button
                onClick={() => router.push('/voice-picker')}
                className="text-purple-700 hover:text-purple-900 text-sm font-medium underline"
              >
                ✏️ Change Agent Voice
              </button>
            </div>
          </>
        ) : (
          <p className="text-sm text-purple-700 italic text-center">No voice selected. Please choose one to activate your agent.</p>
        )}
      </motion.div>

      {/* Test Button */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
      >
        <button
          onClick={handleTestAgent}
          className="w-full py-4 px-6 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-semibold shadow-lg transition-all"
        >
          📞 Test My Agent
        </button>
      </motion.div>
    </div>
  </div>

  {/* Test Agent Modal */}
  <AnimatePresence>
    {showTestModal && (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowTestModal(false)}
      >
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 border border-purple-300"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-2xl font-bold text-purple-900 text-center mb-4">Test Your Agent</h3>
          <p className="text-sm text-purple-700 text-center mb-6">
            Select how you would like to test your agent's voice and functionality.
          </p>
          <div className="space-y-3">
            <button 
              onClick={handleCallAgent}
              className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all"
            >
              Call Agent Now
            </button>
            <button 
              onClick={() => {
                setShowTestModal(false);
                router.push('/agent-configuration?tab=chat-simulation');
              }}
              className="w-full py-3 rounded-lg bg-purple-200 text-purple-800 font-semibold transition-all hover:bg-purple-300"
            >
              Send Test SMS
            </button>
            <button
              onClick={() => setShowTestModal(false)}
              className="w-full py-3 rounded-lg text-purple-600 hover:underline mt-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

  );
}


// {/* <div className="relative p-8 bg-[#ece6fb] text-white min-h-screen">
//   {/* Main Container - Adjusted for new layout */}
//   <div className="relative z-10 mx-auto max-w-5xl flex gap-12">
//     {/* Left Column: Agent Profile */}
//     <motion.div
//       className="w-1/3 flex flex-col items-center p-8 bg-[#753c9b] rounded-md shadow-lg border border-[#563c78] glow-card"
//       variants={cardVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {/* Profile Image */}
//       <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-[#3b2152] shadow-lg">
//         <img
//           src="/images/agent-avatar.jpg"
//           alt="Agent Profile"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Name and License */}
//       <div className="mt-6 text-center">
//         <h2 className="text-xl font-bold text-white">{voice ? voice.name : 'No Voice Selected'}</h2>
//         <div className="mt-2 text-sm text-gray-400 font-sans">
//           <span className="bg-[#3b2152] px-3 py-1 rounded-full border border-[#563c78]">
//             {voice ? voice.description : 'Please select a voice to activate your agent.'}</span>
//         </div>
//       </div>

//       {/* Phone Number Section */}
//       <div className="mt-6 w-full p-4 rounded-lg border border-[#563c78] shadow-sm text-center bg-[#3b2152]">
//         <label className="block text-sm font-medium text-gray-400">📱 Phone Number</label>
//         <p className="text-lg font-semibold text-white mt-1">{phoneNumber}</p>
//       </div>

//       {/* Social Icons */}
//       <div className="mt-12 flex gap-6 text-gray-400">
//         {/* Replace with actual icons */}
//         <span className="text-2xl hover:text-primary transition-colors">in</span>
//         <span className="text-2xl hover:text-primary transition-colors">f</span>
//         <span className="text-2xl hover:text-primary transition-colors">x</span>
//         <span className="text-2xl hover:text-primary transition-colors">p</span>
//       </div>
//     </motion.div>

//     {/* Right Column: Information Sections */}
//     <div className="w-2/3 space-y-8">
//       {/* Top Contact and Name Section */}
//       <motion.div
//         className="flex flex-col md:flex-row justify-between items-center p-6 bg-[#20102b] rounded-xl shadow-lg border border-[#563c78]"
//         variants={cardVariants}
//       >
//         <div>
//           <h1 className="text-4xl font-bold drop-shadow-lg bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
//             My Virtual Agent
//           </h1>
//           <p className="text-sm text-muted-foreground mt-2 font-serif">
//             Your AI assistant, ready to work.
//           </p>
//         </div>
//       </motion.div>

//       {/* About Agent Section */}
//       <motion.div
//         className="p-6 bg-[#20102b] rounded-xl shadow-lg border border-[#563c78]"
//         variants={cardVariants}
//       >
//         <h3 className="text-xl font-semibold text-white">About Agent</h3>
//         <p className="mt-4 text-sm text-gray-300">
//           As an agent who is an expert in this local area, Brandy Pennington brings a wealth of knowledge and expertise about buying and selling real estate here. It is not the same everywhere, so you need someone you can trust for up-to-date information. She is eager to serve you...
//         </p>
//       </motion.div>

//       {/* Agent voice Section */}
//       <motion.div
//         className="p-6 bg-[#20102b] rounded-xl shadow-lg border border-[#563c78]"
//         variants={cardVariants}
//       >
//         <h4 className="text-xl font-semibold text-white mb-4">Agent Voice</h4>

//         {voice ? (
//           <div className="space-y-4">
//             <div>
//               <audio className="w-full rounded-full border border-[#563c78] shadow-inner" controls src={voice.previewUrl} />
//             </div>
//             <div className="flex justify-center mt-4">
//               <button
//                 onClick={() => router.push('/voice-picker')}
//                 className="text-primary hover:text-secondary text-sm font-medium underline transition-colors"
//               >
//                 ✏️ Change Agent Voice
//               </button>
//             </div>
//           </div>
//         ) : (
//           <p className="text-sm text-gray-400 italic text-center message-animate">
//             No voice selected. Please choose one to activate your agent.
//           </p>
//         )}
//       </motion.div>

//       {/* Test Agent Button */}
//       <motion.div
//         className="w-full mt-8"
//         initial={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
//       >
//         <button
//           onClick={handleTestAgent}
//           className="w-full py-4 px-6 rounded-lg bg-primary text-primary-foreground font-semibold shadow-2xl animate-pulse-glow transition-all hover:scale-[1.01] active:scale-[0.99]"
//         >
//           📞 Test My Agent
//         </button>
//       </motion.div>
//     </div>
//   </div>

//   {/* Test Agent Modal */}
//   <AnimatePresence>
//     {showTestModal && (
//       <motion.div
//         className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={() => setShowTestModal(false)}
//       >
//         <motion.div
//           className="bg-[#20102b] p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 border border-[#563c78]"
//           initial={{ scale: 0.9, y: 20 }}
//           animate={{ scale: 1, y: 0 }}
//           exit={{ scale: 0.9, y: 20 }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <h3 className="text-2xl font-sans text-white text-center mb-4">Test Your Agent</h3>
//           <p className="text-sm text-gray-400 text-center font-serif mb-6">
//             Select how you would like to test your agent's voice and functionality.
//           </p>
//           <div className="space-y-3">
//             <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold transition-all hover:bg-secondary active:scale-95">
//               Call Agent Now
//             </button>
//             <button className="w-full py-3 rounded-lg bg-[#3b2152] text-white font-semibold transition-all hover:bg-muted-foreground/10 active:scale-95">
//               Send Test SMS
//             </button>
//             <button
//               onClick={() => setShowTestModal(false)}
//               className="w-full py-3 rounded-lg text-gray-400 hover:underline mt-2 transition-colors"
//             >
//               Cancel
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>
//     )}
//   </AnimatePresence>
// </div> */}





// const MyAgent: React.FC<{
//   selectedVoiceId: string;
//   setSelectedVoiceId: React.Dispatch<React.SetStateAction<string>>;
// }> = ({ selectedVoiceId, setSelectedVoiceId }) => {
//   const audioRef = React.useRef<HTMLAudioElement | null>(null);

//   const handleVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedVoiceId(event.target.value);
//   };

//   const handlePlayPreview = () => {
//     const voice = voices.find((v) => v.id === selectedVoiceId);
//     if (!voice) return;

//     if (!audioRef.current) {
//       audioRef.current = new Audio(voice.previewUrl);
//     }

//     const audio = audioRef.current;

//     // If the selected voice has changed, reset audio source
//     if (audio.src !== voice.previewUrl) {
//       audio.src = voice.previewUrl;
//     }

//     if (isPlaying) {
//       audio.pause();
//       setIsPlaying(false);
//     } else {
//       audio.play();
//       setIsPlaying(true);
//     }

//     // Reset isPlaying when audio ends
//     audio.onended = () => setIsPlaying(false);
//   };



//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);


//   return (


//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {/* Voice selection */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-1">Voice</label>
//         <div className="flex items-center space-x-2">
//           <select
//             value={selectedVoiceId}
//             onChange={handleVoiceChange}
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
//           >
//             {voices.map((voice) => (
//               <option key={voice.id} value={voice.id}>
//                 {voice.name}
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={handlePlayPreview}
//             className="p-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
//             aria-label="Play voice preview"
//           >
//             {isPlaying ? "⏸️" : "▶️"}
//           </button>
//         </div>
//       </div>


//     </div>

//       {/* Feature cards */ }


//   {/* Buttons */ }


//   <audio ref={audioRef} />
//     </div >

//   );
// };
