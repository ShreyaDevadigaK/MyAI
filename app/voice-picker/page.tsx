"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { createPortal } from 'react-dom';

interface Voice {
  voiceId: string;
  name: string;
  gender: 'Female' | 'Male';
  description: string;
  previewUrl: string;
}


const ChooseVoicePage: React.FC = () => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [error, setError] = useState('')
  const router = useRouter();
  const searchParams = useSearchParams();
  const industryRaw = searchParams.get('industry') || '';
  const industry = industryRaw.toLowerCase().replace(/-/g, '');
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);





  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const res = await fetch('/api/listvoice');
        if (!res.ok) {
          throw new Error(`API returned ${res.status}`);
        }
        const data = await res.json();
        console.log('Fetched voices:', data);
        const voiceList = data.results || [];
        if (voiceList.length === 0) {
          setError('No voices available from API');
        } else {
          setVoices(voiceList);
        }
      } catch (err) {
        console.error('Error fetching voices:', err);
        setError(`Failed to fetch voices: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    };

    fetchVoices();
  }, []);

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [open]);



  const handleNext = () => {
    if (!selectedVoice) return;

    // Save to localStorage
    localStorage.setItem('selectedVoice', JSON.stringify(selectedVoice));

    router.push(`/phonenoselection?industry=${industry}`)
    // Navigate to dashboard
    //router.push(`/Dashboard?industry=${industry}`)
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Top right Log out button */}
      <div className="absolute top-4 right-4">
        {/* <button
          className="flex items-center text-gray-700 hover:text-gray-900"
          onClick={() => router.push('/')}
        >
          <svg
            className="w-5 h-5 mr-1"
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
          Log out
        </button> */}
      </div>

      {/* Progress bar */}
      <div className="flex items-center justify-center gap-6 mb-8 mt-2">

        <div className="w-10 h-1 bg-green-600 rounded"></div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">
            2
          </div>
          <span className="text-blue-600 mt-1 text-sm font-semibold">Step 2</span>
        </div>
        <div className="w-10 h-1 bg-gray-300 rounded"></div>

      </div>




      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Choose a voice for your AI</h2>
        <p className="text-gray-600 mb-6">Select a voice that best represents your brand.</p>

        {/* Custom Dropdown */}
        <div className="mb-6">
          <button
            ref={buttonRef}
            onClick={() => setOpen(!open)}
            className="w-full flex justify-between items-center px-4 py-3 border border-blue-500 rounded-md shadow-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span>{selectedVoice ? selectedVoice.name : "Select a voice"}</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>

          {mounted && open && createPortal(
            <div
              className="fixed z-50 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg"
              style={{
                top: `${dropdownPos.top}px`,
                left: `${dropdownPos.left}px`,
                width: `${dropdownPos.width}px`,
              }}
            >
              {error ? (
                <div className="px-4 py-2 text-red-600">{error}</div>
              ) : voices.length > 0 ? (
                <ul>
                  {voices.map((voice) => (
                    <li
                      key={voice.voiceId}
                      onClick={() => {
                        setSelectedVoice(voice);
                        setOpen(false);
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${selectedVoice?.voiceId === voice.voiceId ? "bg-blue-50 font-medium" : ""
                        }`}
                    >
                      {voice.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-2 text-gray-500">Loading voices...</div>
              )}
            </div>,
            document.body
          )}
        </div>

        {/* Voice preview */}
        {selectedVoice && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">{selectedVoice.name}</h2>
            <p className="text-gray-600 mt-2">
              {selectedVoice.description || "A natural and expressive voice."}
            </p>
            <audio
              className="w-full mt-4"
              controls
              src={selectedVoice.previewUrl}
              autoPlay
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => router.push("/test-chat")}
            className="px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!selectedVoice}
            className={`px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${selectedVoice
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-300 cursor-not-allowed"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
};

export default ChooseVoicePage;


