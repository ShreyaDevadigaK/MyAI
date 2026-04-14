"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "How does the MYAI work?",
      answer:
        "Our AI receptionist uses advanced natural language processing to understand and respond to customer calls in real-time. It can answer questions, book appointments, take messages, and transfer calls to the right person when needed.",
    },
    {
      question: "Can I customize MYAI's responses?",
      answer:
        "You can customize greetings, responses, and call flows to match your business needs. The AI learns from your business information and can be trained on your specific services and policies.",
    },
    {
      question: "What happens if the AI can't handle a call?",
      answer:
        "If the AI encounters a situation it can't handle, it will seamlessly transfer the call to a designated human representative. You can set up transfer rules and backup numbers to ensure no call goes unanswered.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "No setup fees! We believe in transparent pricing. You only pay the monthly subscription fee, and we'll help you get everything configured at no additional cost.",
    },
    {
      question: "Does MYAI require any technical experience to setup?",
      answer:
        "Not at all! MYAI is designed for business owners, not tech experts. Our setup process takes just minutes - simply forward your calls to your Agent number and customize your greeting through our user-friendly dashboard. No coding or technical knowledge required.",
    },
  ]

  return (
   <section id="faq" className="py-20 px-6 lg:px-8 bg-muted/30">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our AI receptionist service
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-md font-semibold text-card-foreground hover:text-secondary py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@aireceptionist.com" className="text-secondary hover:text-secondary/80 font-medium">
              Contact Support
            </a>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <a href="/meet" className="text-secondary hover:text-secondary/80 font-medium">
              Schedule a Demo
            </a>
          </div>
        </div>
      </div>
    </section>

  )
}
