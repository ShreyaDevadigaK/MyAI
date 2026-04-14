import { Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"



export function ComprehensiveFooter() {
  return (
    <>
      {/* Main Footer */}
      <footer className="bg-[#070e1f] py-16 px-4 md:px-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Column */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Company</h3>
              <ul className="space-y-4">
                <li><a href="/ServicesForSmall" className="text-white/80 hover:text-white">Answering Service for Small Business</a></li>
                <li><a href="/Afterhours" className="text-white/80 hover:text-white">After Hours Phone Answering Service</a></li>
                <li><a href="#faq" className="text-white/80 hover:text-white">FAQs</a></li>
                <li><a href="/About" className="text-white/80 hover:text-white">About Us</a></li>
                <li><a href="#contact" className="text-white/80 hover:text-white">Contact Us</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Resources</h3>
              <ul className="space-y-4">
                <li><a href="/blog" className="text-white/80 hover:text-white">What is an AI Receptionist?</a></li>
                <li><a href="/meet" className="text-white/80 hover:text-white">Schedule a Demo</a></li>
                <li><a href="/voices" className="text-white/80 hover:text-white">AI Receptionist Voices</a></li>
                <li><a href="/blog" className="text-white/80 hover:text-white">Blog</a></li>
                <li><a href="/sign-in" className="text-white/80 hover:text-white">Login</a></li>
              </ul>
            </div>

            {/* Industries Column */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Industries</h3>
              <ul className="space-y-4">
                <li><a href="/industries/hvac" className="text-white/80 hover:text-white">HVAC Industry Answering Service</a></li>
                 <li><a href="/industries/restaurants" className="text-white/80 hover:text-white">Restaurant Answering Service</a></li>
                 <li><a href="/industries/plumbingservices" className="text-white/80 hover:text-white">Plumbing Industry Answering Service</a></li>
                <li><a href="/industries/law-firms" className="text-white/80 hover:text-white">Law Firm Answering Service</a></li>
                <li><a href="/industries/cleaning-companies" className="text-white/80 hover:text-white">Cleaning Company Answering Service</a></li>
                <li><a href="/industries" className="text-white/80 hover:text-white">View All Industries</a></li>
              </ul>
            </div>

            {/* Follow Us Column */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Follow us</h3>
              <div className="flex space-x-4 mb-8">
                <a href="#" className="text-white/80 hover:text-white"><Facebook className="h-6 w-6" /></a>
                <a href="#" className="text-white/80 hover:text-white"><Twitter className="h-6 w-6" /></a>
                <a href="#" className="text-white/80 hover:text-white"><Linkedin className="h-6 w-6" /></a>
              </div>
              <div className="text-2xl font-bold">
                MY<span className="text-white/80">AI</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/30 mt-12 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div className="flex flex-wrap gap-6 mb-4 lg:mb-0">
                <a href="#" className="text-white/80 hover:text-white text-sm">Privacy Policy</a>
                <a href="#" className="text-white/80 hover:text-white text-sm">Terms of Use</a>
              </div>
              <div className="text-white/70 text-sm text-center lg:text-right">
                <p>© 2025 AI LLC. All Rights Reserved.</p>
                <p className="mt-1">Pacewisdom Solution PVT, IND 575004</p>
              </div>
            </div>
          </div>
        </div>
      </footer>



    </>
  )
}
