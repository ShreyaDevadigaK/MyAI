'use client';

import { useUser, useClerk, UserButton, PricingTable } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter";
import { FAQSection } from "@/components/FaqSection";
import { Navbar } from "@/components/Navbar";

export default function PricingPage() {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Navbar/>

      {/* Main */}
      <main className="flex-grow pt-32 px-6 pb-24 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your business needs. All plans include our core AI receptionist features.
            </p>
          </div>

          {/* Pricing Table */}
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            <PricingTable />
          </div>
        </div>
      </main>

      {/* <FAQSection/> */}

      <ComprehensiveFooter/>
    </div>
  );
}
