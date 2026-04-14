"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="flex items-center justify-between px-6 py-4 lg:px-8">
      <div className="flex items-center">
        <div className="text-2xl font-bold text-gray-900">
          DIAL<span className="text-purple-600">ZARA</span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        <a href="/" className="text-gray-700 hover:text-gray-900">
          Home
        </a>
        <a href="/features" className="text-gray-700 hover:text-gray-900">
          Features
        </a>
        <div className="relative group">
          <a href="#" className="text-gray-700 hover:text-gray-900 flex items-center">
            Industries
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
        <a href="/pricing" className="text-gray-700 hover:text-gray-900">
          Pricing
        </a>
      </nav>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="text-gray-700 hidden md:block">
          Login
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white hidden md:block">Free Trial</Button>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 md:hidden">
          <nav className="px-6 py-4 space-y-4">
            <a href="/" className="block text-gray-700 hover:text-gray-900">
              Home
            </a>
            <a href="/features" className="block text-gray-700 hover:text-gray-900">
              Features
            </a>
            <a href="#" className="block text-gray-700 hover:text-gray-900">
              Industries
            </a>
            <a href="/pricing" className="block text-gray-700 hover:text-gray-900">
              Pricing
            </a>
            <div className="pt-4 space-y-2">
              <Button variant="ghost" className="w-full text-gray-700">
                Login
              </Button>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Free Trial</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
