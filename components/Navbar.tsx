"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  const industries = [
    "Real Estate", "Law Firms", "Contractors", "Churches", "Locksmiths",
    "Plumbing", "MSP & IT Services", "HVAC Companies", "Restaurants",
    "Accounting Firms", "E-commerce", "Automotive Services", "Veterinary Clinics",
    "Electricians", "Towing Companies", "Dental Offices", "Insurance Agents",
    "Roofing Companies", "Property Managers", "Cleaning Companies",
  ]

  return (
    <header className="fixed z-50 w-full bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa]">
      <div className="flex items-center justify-between px-6 py-4 lg:px-8 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-3xl font-bold text-white flex items-center">
          <span className="animate-pulse">MY</span>
          <span className="text-black animate-gradient-x">
            AI
          </span>
        </div>


        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/features" className="text-black text-lg font-semibold transition duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]">Features</a>
          <a href="/voices" className="text-black text-lg  font-semibold ttransition duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]">Voices</a>
          <a href="/industries" className="flex items-center text-black  text-lg font-semibold transition duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]">
            Industries
          </a>
          <a href="/pricing" className="text-black text-lg font-semibold transition duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]">Pricing</a>
        </nav>

        {/* Auth + Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          {user ? (
            <UserButton />
          ) : (
            <Button
              onClick={() => router.push("/sign-in?redirect_url=/")}
              variant="ghost"
              className="text-purple-800 bg-white text-lg hover:bg-white hover:text-[#a909e3] hover:scale-110"
            >
              Login
            </Button>
          )}


          {/* Mobile Menu Icon */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className=" absolute top-full left-0 right-0 
        bg-gradient-to-r from-purple-500/80 via-purple-400/70 to-pink-300/60 
        backdrop-blur-md 
        border-b border-pink-200/40 
        shadow-lg 
        md:hidden
        ">
          <nav className="px-6 py-4 space-y-4">
            <a href="/" className="block text-white font-semibold hover:underline">Home</a>
            <a href="/features" className="block text-white font-semibold hover:underline">Features</a>
            <a href="/industries" className="block text-white font-semibold hover:underline">Industries</a>
            <a href="/pricing" className="block text-white font-semibold hover:underline">Pricing</a>
          </nav>
        </div>
      )}
    </header>
  )
}
