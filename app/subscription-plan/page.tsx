'use client';

import React, { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import { PricingTable } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';

function page() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next') || '/test-chat';

  useEffect(() => {
    if (isLoaded && user) {
      console.log('User object:', user);
      const hasActiveSubscription = user.publicMetadata?.subscriptionActive || false;
      if (hasActiveSubscription) {
        router.push('/Dashboard');
      }
    }
  }, [isLoaded, user, router]);

  const handleNext = () => {
    try {
      const decodedNext = decodeURIComponent(nextUrl);
      router.push(decodedNext);
    } catch (error) {
      console.error('Failed to decode next URL:', error);
      router.push('/test-chat');
    }
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
    //     {/* Heading Section */}
    //     <div className="text-center mb-12 sm:mb-16 lg:mb-20">
    //       <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
    //         Choose Your Plan
    //       </h1>
    //       <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
    //         Start a trial to reserve a phone number for your agent
    //       </p>

    //       {/* Mobile-friendly next button */}
    //       <div className="mt-6 sm:mt-8">
    //         <button
    //           className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    //           onClick={handleNext}
    //           aria-label="Next Step"
    //         >
    //           <span className="mr-2">Continue</span>
    //           <ArrowRight className="w-5 h-5" />
    //         </button>
    //       </div>
    //     </div>

    //     {/* Pricing Section */}
    //     <div className="w-full max-w-5xl mx-auto mt-24">
    //       <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
    //         <div className="p-4 sm:p-6 lg:p-8">
    //           <PricingTable />
    //         </div>
    //       </div>
    //     </div>

    //     {/* Additional mobile-friendly info */}
    //     <div className="mt-12 text-center">
    //       <div className="max-w-md mx-auto">
    //         <div className="bg-white rounded-lg p-6 shadow-sm">
    //           <h3 className="text-lg font-semibold text-gray-900 mb-2">Need help choosing?</h3>
    //           <p className="text-sm text-gray-600">
    //             All plans include a 7-day free trial. No credit card required to start.
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>



    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

        {/* Heading Section */}
        <div className="relative text-center mb-12 sm:mb-16 lg:mb-20">
          {/* Top-right arrow button */}
          <div className="absolute top-0 right-0">
            <button
              className="inline-flex items-center justify-center p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              onClick={handleNext}
              aria-label="Next Step"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Choose Your Plan
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Start a trial to reserve a phone number for your agent
          </p>
        </div>

        {/* Pricing Section */}
        <div className="w-full max-w-5xl mx-auto -mt-10">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <PricingTable />
            </div>
          </div>
        </div>


        {/* Additional mobile-friendly info */}
        <div className="mt-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need help choosing?</h3>
              <p className="text-sm text-gray-600">
                All plans include a 7-day free trial. No credit card required to start.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default page;
