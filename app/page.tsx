"use client"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { Phone, Clock, Users, Star, ArrowRight, Sparkles, Zap, Shield } from "lucide-react"
import { FAQSection } from "@/components/FaqSection"
import { ComprehensiveFooter } from "@/components/ComprehensiveFooter"
import { Navbar } from "@/components/Navbar"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section */}


        <section className="relative py-20 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-primary/5 to-secondary/10 animate-pulse"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>

          {/* Animated mesh overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/3 to-transparent animate-shimmer"></div>

          {/* Enhanced floating geometric shapes with glow effects */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-secondary/30 to-accent/20 rounded-full animate-float shadow-lg shadow-secondary/20"></div>
          <div
            className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-primary/30 to-secondary/20 rounded-lg animate-float shadow-lg shadow-primary/20"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-40 left-1/4 w-12 h-12 bg-gradient-to-br from-accent/30 to-primary/20 rounded-full animate-float shadow-lg shadow-accent/20"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/3 w-8 h-8 bg-gradient-to-br from-secondary/25 to-primary/15 rounded-full animate-float shadow-md shadow-secondary/15"
            style={{ animationDelay: "3s" }}
          ></div>

          <div className="mx-auto mt-16 max-w-7xl relative z-10 px-8 lg:px-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Sparkles className="h-4 w-4" />
                  Revolutionary AI Technology
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-8">
                  Your Business
                  <span className="block bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#a78bfa]  bg-clip-text text-transparent">
                    Never Sleeps
                  </span>
                </h1>

                <p className="text-2xl text-muted-foreground mb-10 max-w-2xl lg:mx-0 mx-auto leading-relaxed">
                  Meet your AI receptionist that captures every opportunity, books appointments instantly, and delights
                  customers around the clock.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12">
                  <Button
                    onClick={() => router.push("/industries")}
                    size="lg"
                    className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white px-10 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 animate-pulse-glow"
                  >
                    <Zap className="mr-3 h-6 w-6" />
                    Start Free Trial
                  </Button>

                  <Button
                    onClick={() => router.push("/meet")}
                    size="lg"
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-6 text-xl font-semibold transition-all duration-300 bg-transparent"
                  >
                    <Play className="mr-3 h-6 w-6" />
                    Watch Demo
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-8 text-center lg:text-left mt-24">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Always Available</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Call Capture</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent mb-2">0</div>
                    <div className="text-sm text-muted-foreground">Setup Fees</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative">
                  <img
                    src="images/aidashboard1.jpg"
                    alt="Modern Office with AI Technology"
                    className="w-full h-auto rounded-3xl shadow-2xl"
                  />

                  {/* Floating status indicators */}
                  <div className="absolute -top-6 -left-6 bg-card border-2 border-secondary rounded-2xl p-4 shadow-xl animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold">Live & Active</span>
                    </div>
                  </div>

                  <div
                    className="absolute -bottom-6 -right-6 bg-card border-2 border-primary rounded-2xl p-4 shadow-xl animate-float"
                    style={{ animationDelay: "1.5s" }}
                  >
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <span className="text-sm font-semibold">24/7 Calls Today</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Steps Section */}
        <section className="py-24 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Shield className="h-4 w-4" />
                Simple & Secure Setup
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                From Setup to
                <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mt-2">
                  Success in Minutes
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our intelligent setup process adapts to your business needs automatically
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: 1,
                  title: "Smart Setup",
                  description:
                    "Answer a few questions about your business. Our AI automatically creates a customized receptionist tailored to your industry and customer needs.",
                  color: "from-primary to-primary/80",
                },
                {
                  step: 2,
                  title: "Voice & Number",
                  description:
                    "Choose from 40+ professional voices and get a dedicated local or toll-free number. Your AI receptionist gets a personality that matches your brand.",
                  color: "from-secondary to-accent",
                },
                {
                  step: 3,
                  title: "Flow Design",
                  description:
                    "Easily add or edit prompts, include a custom greeting, and set up transfer numbers to streamline your call handling.",
                  color: "from-accent to-secondary",
                },
                {
                  step: 4,
                  title: "Go Live",
                  description:
                    "Activate your AI receptionist instantly. Watch real-time analytics as it handles calls, books appointments, and captures leads automatically.",
                  color: "from-primary to-secondary",
                },
              ].map((item, i) => (
                <div key={i} className="group relative">
                  <div className="bg-card rounded-2xl shadow-md border border-border p-6 text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden h-full flex flex-col max-h-[420px]">
                    {/* Gradient hover background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`}
                    ></div>

                    {/* Step Badge */}
                    <div
                      className={`absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${item.color} text-white w-10 h-10 flex items-center justify-center rounded-full font-bold text-base shadow-md z-10`}
                    >
                      {item.step}
                    </div>

                    <div className="mt-6 mb-6 relative z-10"></div>

                    <h3 className="text-xl font-bold mb-3 text-card-foreground relative z-10">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 relative z-10">
                      {item.description}
                    </p>

                    {/* Spacer keeps button area aligned */}
                    <div className="flex-grow"></div>

                    <div className="h-10 mt-3 relative z-10">
                      {i === 0 && (
                        <Button
                          onClick={() =>
                            router.push("/sign-up?redirect_url=/")
                          }
                          variant="outline"
                          className="bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm px-3 py-1.5"
                        >
                          Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>



          </div>
        </section>


        {/* Statistics Section */}
        <section className="py-20 bg-gradient-to-br from-muted/40 via-card/30 to-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tl from-secondary/5 via-transparent to-accent/5 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
                  The Business Phone System
                </span>
                <br />
                <span className="text-foreground">That Answers Every Call You Can't</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  percent: "60%",
                  description: "of customers prefer to call local businesses after finding them online.",
                  icon: <Phone className="h-8 w-8 text-secondary" />,
                },
                {
                  percent: "38%",
                  description: "But only 38% of these calls get answered.",
                  icon: <Clock className="h-8 w-8 text-secondary" />,
                },
                {
                  percent: "80%",
                  description:
                    "of callers don't leave a voicemail, resulting in countless lost opportunities for businesses.",
                  icon: <Users className="h-8 w-8 text-secondary" />,
                },
              ].map(({ percent, description, icon }, i) => (
                <div
                  key={i}
                  className="bg-card rounded-2xl p-8 shadow-lg border border-border text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">{icon}</div>
                  <div className="text-4xl font-bold text-secondary mb-4">{percent}</div>
                  <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Testimonials Section */}
        <section className="py-24 overflow-hidden bg-gradient-to-br from-card/60 via-muted/40 to-primary/10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent animate-shimmer"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-accent/10 to-primary/5 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>

          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Star className="h-4 w-4" />
                Customer Success Stories
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Real Results from
                <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mt-2">
                  Real Businesses
                </span>
              </h2>
            </div>

            {/* First Row - Moving Left */}
            <div className="mb-8">
              <div className="flex animate-scroll-left space-x-8">
                {[
                  {
                    name: "Corner Auto",
                    initials: "CA",
                    rating: 5,
                    text: "We LOVE it, Its like set it and forget it. I can load all the questions that we get asked, and have it automated. so easy to work it, And very responsive. The MYAI Support is amazing as well, they've kept in contact and are there every step of the way.",
                    bgColor: "bg-gradient-to-br from-primary to-primary/80",
                  },
                  {
                    name: "Davide C.",
                    initials: "DC",
                    rating: 5,
                    text: "Very happy so far with the service. The price is right, user interface is very intuitive and easy to navigate and the quality of the interaction with the virtual agent is very good.",
                    bgColor: "bg-gradient-to-br from-green-500 to-green-600",
                  },
                  {
                    name: "Bernie Lynch",
                    initials: "BL",
                    rating: 5,
                    text: "Highly Recommend MYAI! MYAI was so easy to set up and it is amazing the interaction created between the attendant and the caller. From a price point perspective, it has tremendous value and has taken on a very labor-intensive part of our businesses.",
                    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
                  },
                  {
                    name: "Martin Hinshaw",
                    initials: "MH",
                    rating: 5,
                    text: "Amazing customer service saves me so much time. I needed an area code that wasn't available, within minutes they found a solution and had that number. Wow, efficient and a huge logistic help to our company.",
                    bgColor: "bg-gradient-to-br from-secondary to-accent",
                  },
                ].map((testimonial, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 bg-card rounded-lg p-6 shadow-sm border border-border w-96 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="flex items-center mb-6">
                      <div
                        className={`w-12 h-1 ${testimonial.bgColor} rounded-full flex items-center justify-center mr-4 shadow-lg`}
                      >
                        <span className="text-white font-bold text-lg">{testimonial.initials}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-lg text-card-foreground">{testimonial.name}</div>
                        <div className="flex text-yellow-400 text-lg mt-1">
                          {Array.from({ length: testimonial.rating }, (_, i) => (
                            <Star key={i} className="h-5 w-5 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Second Row - Moving Right */}
            <div>
              <div className="flex animate-scroll-right space-x-8">
                {[
                  {
                    name: "Robert Haney",
                    initials: "RH",
                    rating: 5,
                    text: "Great experience and they are very helpful with customer support. I would definitely recommend it to anyone looking for an automated phone service.",
                    bgColor: "bg-gradient-to-br from-green-500 to-green-600",
                  },
                  {
                    name: "Crystal Clear",
                    initials: "CC",
                    location: "Arizona",
                    rating: 5,
                    text: "Excellent service and support. The AI receptionist handles our calls professionally and we never miss important business opportunities anymore.",
                    bgColor: "bg-gradient-to-br from-gray-500 to-gray-600",
                  },
                  {
                    name: "Kelby Steele",
                    initials: "K",
                    rating: 5,
                    text: "The setup was incredibly easy and the results have been fantastic. Our customers love the professional service and we love not missing any calls.",
                    bgColor: "bg-gradient-to-br from-secondary to-accent",
                  },
                  {
                    name: "Marcela Braka",
                    initials: "MB",
                    rating: 5,
                    text: "Outstanding AI receptionist service. It's like having a full-time receptionist at a fraction of the cost. Highly recommend to any business owner.",
                    bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
                  },
                ].map((testimonial, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 bg-card rounded-lg p-8 shadow-xl border border-border w-96 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="flex items-center mb-6">
                      <div
                        className={`w-16 h-16 ${testimonial.bgColor} rounded-full flex items-center justify-center mr-4 shadow-lg`}
                      >
                        <span className="text-white font-bold text-lg">{testimonial.initials}</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-lg text-card-foreground">{testimonial.name}</div>
                        {testimonial.location && (
                          <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                        )}
                        <div className="flex text-yellow-400 text-lg mt-1">
                          {Array.from({ length: testimonial.rating }, (_, i) => (
                            <Star key={i} className="h-5 w-5 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>




        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <ComprehensiveFooter />


    </div>
  )
}




// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       {/* Header */}
//       <Navbar />

//       {/* Main Content */}
//       <main>
//         {/* Hero Section */}
//         <section className="relative px-6 py-20 lg:px-8 overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
//           <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-primary/5 to-secondary/10 animate-pulse"></div>
//           <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>

//           {/* Animated mesh overlay */}
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/3 to-transparent animate-shimmer"></div>

//           {/* Enhanced floating geometric shapes with glow effects */}
//           <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-secondary/30 to-accent/20 rounded-full animate-float shadow-lg shadow-secondary/20"></div>
//           <div
//             className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-primary/30 to-secondary/20 rounded-lg animate-float shadow-lg shadow-primary/20"
//             style={{ animationDelay: "1s" }}
//           ></div>
//           <div
//             className="absolute bottom-40 left-1/4 w-12 h-12 bg-gradient-to-br from-accent/30 to-primary/20 rounded-full animate-float shadow-lg shadow-accent/20"
//             style={{ animationDelay: "2s" }}
//           ></div>
//           <div
//             className="absolute top-1/2 right-1/3 w-8 h-8 bg-gradient-to-br from-secondary/25 to-primary/15 rounded-full animate-float shadow-md shadow-secondary/15"
//             style={{ animationDelay: "3s" }}
//           ></div>

//           <div className="mx-auto mt-16 max-w-7xl relative z-10">
//             <div className="grid lg:grid-cols-2 gap-16 items-center">
//               <div className="text-center lg:text-left">
//                 <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-6">
//                   <Sparkles className="h-4 w-4" />
//                   Revolutionary AI Technology
//                 </div>

//                 <h1 className="text-6xl lg:text-8xl font-bold leading-tight mb-8">
//                   Your Business
//                   <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
//                     Never Sleeps
//                   </span>
//                 </h1>

//                 <p className="text-2xl text-muted-foreground mb-10 max-w-2xl lg:mx-0 mx-auto leading-relaxed">
//                   Meet your AI receptionist that captures every opportunity, books appointments instantly, and delights
//                   customers around the clock.
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12">
//                   <Button
//                     size="lg"
//                     className="bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white px-10 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 animate-pulse-glow"
//                   >
//                     <Zap className="mr-3 h-6 w-6" />
//                     Start Free Trial
//                   </Button>

//                   <Button
//                     size="lg"
//                     variant="outline"
//                     className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-10 py-6 text-xl font-semibold transition-all duration-300 bg-transparent"
//                   >
//                     <Play className="mr-3 h-6 w-6" />
//                     Watch Demo
//                   </Button>
//                 </div>

//                 <div className="grid grid-cols-3 gap-8 text-center lg:text-left">
//                   <div>
//                     <div className="text-3xl font-bold text-primary mb-2">24/7</div>
//                     <div className="text-sm text-muted-foreground">Always Available</div>
//                   </div>
//                   <div>
//                     <div className="text-3xl font-bold text-secondary mb-2">100%</div>
//                     <div className="text-sm text-muted-foreground">Call Capture</div>
//                   </div>
//                   <div>
//                     <div className="text-3xl font-bold text-accent mb-2">0</div>
//                     <div className="text-sm text-muted-foreground">Setup Fees</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="relative">
//                 <div className="relative">
//                   <img
//                     src="/ai-office-dashboard.png"
//                     alt="Modern Office with AI Technology"
//                     className="w-full h-auto rounded-3xl shadow-2xl"
//                   />

//                   {/* Floating status indicators */}
//                   <div className="absolute -top-6 -left-6 bg-card border-2 border-secondary rounded-2xl p-4 shadow-xl animate-float">
//                     <div className="flex items-center gap-3">
//                       <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
//                       <span className="text-sm font-semibold">Live & Active</span>
//                     </div>
//                   </div>

//                   <div
//                     className="absolute -bottom-6 -right-6 bg-card border-2 border-primary rounded-2xl p-4 shadow-xl animate-float"
//                     style={{ animationDelay: "1.5s" }}
//                   >
//                     <div className="flex items-center gap-3">
//                       <Phone className="h-5 w-5 text-primary" />
//                       <span className="text-sm font-semibold">247 Calls Today</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Trust Indicators */}
//         <section className="py-16 px-6 lg:px-8 bg-gradient-to-r from-muted/40 via-card/20 to-muted/40 relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 animate-pulse"></div>
//           <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

//           <div className="mx-auto max-w-6xl text-center">
//             <p className="text-muted-foreground mb-12 text-lg font-medium">
//               Trusted by innovative businesses worldwide
//             </p>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center">
//               {[1, 2, 3, 4].map((i) => (
//                 <div key={i} className="group">
//                   <div className="w-20 h-20 mx-auto rounded-full bg-card border-2 border-border shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center">
//                     <img
//                       src={`/generic-company-logo.png?key=6l5et&height=60&width=60&query=company logo ${i}`}
//                       alt={`Company ${i}`}
//                       className="w-12 h-12 rounded-full grayscale group-hover:grayscale-0 transition-all duration-300"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Steps Section */}
//         <section className="py-24 px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="text-center mb-20">
//               <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
//                 <Shield className="h-4 w-4" />
//                 Simple & Secure Setup
//               </div>
//               <h2 className="text-5xl lg:text-6xl font-bold mb-6">
//                 From Setup to
//                 <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
//                   Success in Minutes
//                 </span>
//               </h2>
//               <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//                 Our intelligent setup process adapts to your business needs automatically
//               </p>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {[
//                 {
//                   step: 1,
//                   title: "Smart Setup",
//                   description:
//                     "Answer a few questions about your business. Our AI automatically creates a customized receptionist tailored to your industry and customer needs.",
//                   color: "from-primary to-primary/80",
//                   image: "AI business setup interface with smart customization",
//                 },
//                 {
//                   step: 2,
//                   title: "Voice & Number",
//                   description:
//                     "Choose from 40+ professional voices and get a dedicated local or toll-free number. Your AI receptionist gets a personality that matches your brand.",
//                   color: "from-secondary to-accent",
//                   image: "voice selection interface with professional options",
//                 },
//                 {
//                   step: 3,
//                   title: "Flow Design",
//                   description:
//                     "Customize call flows, greetings, and transfer rules with our visual editor. No coding required - just drag, drop, and deploy.",
//                   color: "from-accent to-secondary",
//                   image: "visual call flow designer with drag and drop interface",
//                 },
//                 {
//                   step: 4,
//                   title: "Go Live",
//                   description:
//                     "Activate your AI receptionist instantly. Watch real-time analytics as it handles calls, books appointments, and captures leads automatically.",
//                   color: "from-primary to-secondary",
//                   image: "live dashboard with real-time call analytics and bookings",
//                 },
//               ].map((item, i) => (
//                 <div key={i} className="group relative">
//                   <div className="bg-card rounded-3xl shadow-lg border border-border p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 relative overflow-hidden">
//                     {/* Gradient background on hover */}
//                     <div
//                       className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
//                     ></div>

//                     <div
//                       className={`absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${item.color} text-white w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg shadow-lg z-10`}
//                     >
//                       {item.step}
//                     </div>

//                     <div className="mt-8 mb-8 relative z-10">
//                       <img
//                         src={`/abstract-geometric-shapes.png?key=w0pby&height=160&width=240&query=${item.image}`}
//                         alt={item.title}
//                         className="w-full h-32 object-cover rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-500"
//                       />
//                     </div>

//                     <h3 className="text-2xl font-bold mb-4 text-card-foreground relative z-10">{item.title}</h3>
//                     <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">{item.description}</p>

//                     {i === 0 && (
//                       <Button
//                         variant="outline"
//                         className="mt-4 bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-foreground relative z-10"
//                       >
//                         Get Started <ArrowRight className="ml-2 h-4 w-4" />
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Statistics Section */}
//         <section className="py-20 bg-gradient-to-br from-muted/40 via-card/30 to-primary/5 relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-tl from-secondary/5 via-transparent to-accent/5 animate-pulse"></div>
//           <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>

//           <div className="mx-auto max-w-6xl px-6 lg:px-8">
//             <div className="text-center mb-16">
//               <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
//                 <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
//                   The Business Phone System
//                 </span>
//                 <br />
//                 <span className="text-foreground">That Answers Every Call You Can't</span>
//               </h2>
//             </div>

//             <div className="grid md:grid-cols-3 gap-8">
//               {[
//                 {
//                   percent: "60%",
//                   description: "of customers prefer to call local businesses after finding them online.",
//                   icon: <Phone className="h-8 w-8 text-secondary" />,
//                 },
//                 {
//                   percent: "38%",
//                   description: "But only 38% of these calls get answered.",
//                   icon: <Clock className="h-8 w-8 text-secondary" />,
//                 },
//                 {
//                   percent: "80%",
//                   description:
//                     "of callers don't leave a voicemail, resulting in countless lost opportunities for businesses.",
//                   icon: <Users className="h-8 w-8 text-secondary" />,
//                 },
//               ].map(({ percent, description, icon }, i) => (
//                 <div
//                   key={i}
//                   className="bg-card rounded-2xl p-8 shadow-lg border border-border text-center hover:shadow-xl transition-all duration-300"
//                 >
//                   <div className="flex justify-center mb-4">{icon}</div>
//                   <div className="text-4xl font-bold text-secondary mb-4">{percent}</div>
//                   <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Testimonials Section */}
//         <section className="py-24 overflow-hidden bg-gradient-to-br from-card/60 via-muted/40 to-primary/10 relative">
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/5 to-transparent animate-shimmer"></div>
//           <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-full blur-3xl animate-float"></div>
//           <div
//             className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-accent/10 to-primary/5 rounded-full blur-3xl animate-float"
//             style={{ animationDelay: "2s" }}
//           ></div>

//           <div className="mx-auto max-w-6xl px-6 lg:px-8">
//             <div className="text-center mb-20">
//               <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-6">
//                 <Star className="h-4 w-4" />
//                 Customer Success Stories
//               </div>
//               <h2 className="text-5xl lg:text-6xl font-bold mb-6">
//                 Real Results from
//                 <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
//                   Real Businesses
//                 </span>
//               </h2>
//             </div>

//             {/* First Row - Moving Left */}
//             <div className="mb-8">
//               <div className="flex animate-scroll-left space-x-8">
//                 {[
//                   {
//                     name: "Corner Auto",
//                     initials: "CA",
//                     rating: 5,
//                     text: "We LOVE it, Its like set it and forget it. I can load all the questions that we get asked, and have it automated. so easy to work it, And very responsive. The MYAI Support is amazing as well, they've kept in contact and are there every step of the way.",
//                     bgColor: "bg-gradient-to-br from-primary to-primary/80",
//                   },
//                   {
//                     name: "Davide C.",
//                     initials: "DC",
//                     rating: 5,
//                     text: "Very happy so far with the service. The price is right, user interface is very intuitive and easy to navigate and the quality of the interaction with the virtual agent is very good.",
//                     bgColor: "bg-gradient-to-br from-green-500 to-green-600",
//                   },
//                   {
//                     name: "Bernie Lynch",
//                     initials: "BL",
//                     rating: 5,
//                     text: "Highly Recommend MYAI! MYAI was so easy to set up and it is amazing the interaction created between the attendant and the caller. From a price point perspective, it has tremendous value and has taken on a very labor-intensive part of our businesses.",
//                     bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
//                   },
//                   {
//                     name: "Martin Hinshaw",
//                     initials: "MH",
//                     rating: 5,
//                     text: "Amazing customer service saves me so much time. I needed an area code that wasn't available, within minutes they found a solution and had that number. Wow, efficient and a huge logistic help to our company.",
//                     bgColor: "bg-gradient-to-br from-secondary to-accent",
//                   },
//                 ].map((testimonial, i) => (
//                   <div
//                     key={i}
//                     className="flex-shrink-0 bg-card rounded-3xl p-8 shadow-xl border border-border w-96 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
//                   >
//                     <div className="flex items-center mb-6">
//                       <div
//                         className={`w-16 h-16 ${testimonial.bgColor} rounded-full flex items-center justify-center mr-4 shadow-lg`}
//                       >
//                         <span className="text-white font-bold text-lg">{testimonial.initials}</span>
//                       </div>
//                       <div className="flex-1">
//                         <div className="font-bold text-lg text-card-foreground">{testimonial.name}</div>
//                         <div className="flex text-yellow-400 text-lg mt-1">
//                           {Array.from({ length: testimonial.rating }, (_, i) => (
//                             <Star key={i} className="h-5 w-5 fill-current" />
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                     <p className="text-muted-foreground leading-relaxed text-lg">{testimonial.text}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Second Row - Moving Right */}
//             <div>
//               <div className="flex animate-scroll-right space-x-8">
//                 {[
//                   {
//                     name: "Robert Haney",
//                     initials: "RH",
//                     rating: 5,
//                     text: "Great experience and they are very helpful with customer support. I would definitely recommend it to anyone looking for an automated phone service.",
//                     bgColor: "bg-gradient-to-br from-green-500 to-green-600",
//                   },
//                   {
//                     name: "Crystal Clear",
//                     initials: "CC",
//                     location: "Arizona",
//                     rating: 5,
//                     text: "Excellent service and support. The AI receptionist handles our calls professionally and we never miss important business opportunities anymore.",
//                     bgColor: "bg-gradient-to-br from-gray-500 to-gray-600",
//                   },
//                   {
//                     name: "Kelby Steele",
//                     initials: "K",
//                     rating: 5,
//                     text: "The setup was incredibly easy and the results have been fantastic. Our customers love the professional service and we love not missing any calls.",
//                     bgColor: "bg-gradient-to-br from-secondary to-accent",
//                   },
//                   {
//                     name: "Marcela Braka",
//                     initials: "MB",
//                     rating: 5,
//                     text: "Outstanding AI receptionist service. It's like having a full-time receptionist at a fraction of the cost. Highly recommend to any business owner.",
//                     bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
//                   },
//                 ].map((testimonial, i) => (
//                   <div
//                     key={i}
//                     className="flex-shrink-0 bg-card rounded-3xl p-8 shadow-xl border border-border w-96 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
//                   >
//                     <div className="flex items-center mb-6">
//                       <div
//                         className={`w-16 h-16 ${testimonial.bgColor} rounded-full flex items-center justify-center mr-4 shadow-lg`}
//                       >
//                         <span className="text-white font-bold text-lg">{testimonial.initials}</span>
//                       </div>
//                       <div className="flex-1">
//                         <div className="font-bold text-lg text-card-foreground">{testimonial.name}</div>
//                         {testimonial.location && (
//                           <div className="text-sm text-muted-foreground">{testimonial.location}</div>
//                         )}
//                         <div className="flex text-yellow-400 text-lg mt-1">
//                           {Array.from({ length: testimonial.rating }, (_, i) => (
//                             <Star key={i} className="h-5 w-5 fill-current" />
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                     <p className="text-muted-foreground leading-relaxed text-lg">{testimonial.text}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* FAQ Section */}
//         <FAQSection />
//       </main>

//       {/* Footer */}
//       <ComprehensiveFooter />
//     </div>
//   )
// }


