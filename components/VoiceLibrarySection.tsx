'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import VoiceCard from './VoiceCard';

interface Voice {
  id: string;
  name: string;
  gender: 'Female' | 'Male';
  description: string;
  previewUrl: string;
}

const allVoices: Voice[] = [
  { id: 'f0ed7e07-0e85-4853-a8f5-e09c627cf944', name: 'Cassidy-English', gender: 'Female', description: 'English. Female.', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/database/workspace/1da06ea679a54975ad96a2221fe6530d/voices/56AoDkrOh6qfVPDXZ7Pt/oEgVi6mikkKcpVcTFfj5.mp3' },
  { id: '87edb04c-06d4-47c2-bd94-683bc47e8fbe', name: 'Monika-English-Indian', gender: 'Female', description: 'Indian English accent. Female.', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/database/workspace/514d94e9241c48e8b7905375729c436f/voices/2zRM7PkgwBPiau2jvVXc/NcEOQ9awTZvgwUoqtmU9.mp3' },
  { id: 'd2d3f512-55a1-4e14-8322-1626efd1c531', name: 'Denisa - Czech', gender: 'Female', description: 'Calm and soft young female voice.', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/7G095XVHsmgoCnhxJhLJeLZUzAR2/voices/OAAjJsQDvpg3sVjiLgyl/4cc64654-5542-4ff8-bfa7-67cf38c8c906.mp3' },
  { id: 'e194185b-cb4e-43ab-9bef-e2a88530090d', name: 'Francisco-Portuguese', gender: 'Male', description: 'European (Portugal) accent. Male.', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/database/workspace/1da06ea679a54975ad96a2221fe6530d/voices/WsQeRzWJvoDvhPPJj5r7/2198749f-0444-4a8c-aba5-65d581483f86.mp3' },
  { id: 'af750274-1a66-4b7c-ae41-e1a196fbe285', name: 'Peter - Slovak', gender: 'Male', description: 'Middle aged male.', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/database/user/HOZrfHdrnpe9pZlWrIwZoq4cDsX2/voices/d6IbhdqAKkXCCVuJjbie/KdiAikWHzYiPnLKFP9Qv.mp3' },
  { id: '3a645332-ab59-485a-83ed-2fc0c79815f1', name: 'David-English-British', gender: 'Male', description: 'Default Male', previewUrl: 'https://storage.googleapis.com/eleven-public-prod/custom/voices/BNgbHR0DNeZixGQVzloa/40VSLvxrLAkmQgyrEA4t.mp3' },
];

type FilterType = 'All Voices' | 'Female' | 'Male';

const VoiceLibrarySection = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const genderParam = searchParams.get('gender');
  const currentFilter: FilterType = genderParam === 'Female' || genderParam === 'Male' ? genderParam : 'All Voices';

  const filteredVoices = allVoices.filter((voice) =>
    currentFilter === 'All Voices' ? true : voice.gender === currentFilter
  );

  return (
    <section className="py-20 bg-white pb-32 ">
      <div className="container mx-auto px-8 max-w-7xl ">

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 bg-gray-100 p-2 rounded-lg">
            {['All Voices', 'Female', 'Male'].map((filter) => {
              const isActive = currentFilter === filter;
              const search = new URLSearchParams(searchParams.toString());

              if (filter === 'All Voices') {
                search.delete('gender');
              } else {
                search.set('gender', filter);
              }

              return (
                <Link
                  key={filter}
                  href={`${pathname}?${search.toString()}`}
                  scroll={false}
                  className={`py-2 px-6 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive ? 'bg-purple-700  text-white' : 'text-purple-800 hover:bg-purple-300'
                  }`}
                >
                  {filter} (
                    {filter === 'All Voices'
                      ? allVoices.length
                      : allVoices.filter((v) => v.gender === filter).length}
                  )
                </Link>
              );
            })}
          </div>
        </div>

        {/* Voice Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVoices.map((voice) => (
            <VoiceCard key={voice.id} voice={voice} />
          ))}
        </div>
      </div>
    </section>

  
  );
};

export default VoiceLibrarySection;





