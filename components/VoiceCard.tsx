'use client';

import React, { useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

interface VoiceCardProps {
  voice: {
    id: string;
    name: string;
    gender: 'Female' | 'Male';
    description: string;
    previewUrl: string;
  };
}

const VoiceCard: React.FC<VoiceCardProps> = ({ voice }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handlePlayClick = () => {
    if (isPlaying) {
      if (audio) {
        audio.pause();
        setIsPlaying(false);
      }
      return;
    }

    const audioInstance = new Audio(voice.previewUrl);
    setAudio(audioInstance);
    setIsPlaying(true);
    audioInstance.play();

    audioInstance.onended = () => {
      setIsPlaying(false);
    };

    audioInstance.onerror = () => {
      console.error('Error playing audio');
      setIsPlaying(false);
    };
  };


  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 relative group hover:border-blue-300 transition-colors duration-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{voice.name}</h3>
        <button
          onClick={handlePlayClick}
          className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
        >
          {isPlaying ? <FaPause className="text-lg" /> : <FaPlay className="text-lg" />}
        </button>
      </div>

      <div className="flex space-x-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${voice.gender === 'Female' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>
          {voice.gender}
        </span>
      </div>

      <p className="text-gray-600 text-sm">{voice.description}</p>

      {/* Optional overlay button */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
        <button
          onClick={handlePlayClick}
          className="bg-white text-blue-600 p-3 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300"
        >
          {isPlaying ? <FaPause className="text-2xl" /> : <FaPlay className="text-2xl" />}
        </button>
      </div>
    </div>
  );
};

export default VoiceCard;
