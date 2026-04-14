import React from 'react'
import { PricingTable } from '@clerk/nextjs'

function page() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <h1 className="text-2xl font-bold mb-4 text-purple-700">
              Choose Your Plan
            </h1>
            <p className="text-gray-600 mb-6">
              Start a trial to reserve a phone number for your agent
            </p>
          </div>

          {/* Pricing Table */}
          <div >
            <PricingTable />
          </div>
      </div>
    </div>
  )
}

export default page