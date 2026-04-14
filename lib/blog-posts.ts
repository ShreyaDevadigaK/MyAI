export interface BlogPost {
  title: string;
  date: string;
  team: string;
  description: string;
  content: string[];
  image: string;
  tags: string[];
}

export const blogPosts: Record<string, BlogPost> = {
  'how-ai-automates-real-estate-client-follow-ups': {
    title: 'How AI Automates Real Estate Client Follow-Ups',
    date: 'July 28, 2025',
    team: 'Dialzara Team',
    description:
      'Explore how AI revolutionizes real estate follow-ups by automating responses, nurturing leads, and streamlining workflows.',
    image: '/images/real-estate-ai.png',
    tags: ['AI', 'Real Estate', 'Automation'],
    content: [
      "Artificial Intelligence is transforming how real estate professionals manage client relationships.",
      "By automating follow-up messages, AI helps agents stay in touch with leads at the right time, personalize responses based on behavior, and streamline scheduling through intelligent chatbots.",
      "This level of automation allows agents to focus more on relationship-building and closing deals, rather than managing repetitive communication tasks."
    ],
  },
  'evaluating-ai-vendors-partner-ecosystem-strength': {
    title: 'Evaluating AI Vendors: Partner Ecosystem Strength',
    date: 'July 29, 2025',
    team: 'Dialzara Team',
    description:
      'Understand how to evaluate AI vendors based on their ecosystem partnerships and integration capabilities.',
    image: '/images/ai-vendor-evaluation.png',
    tags: ['Vendors', 'AI', 'Integration'],
    content: [
      "Choosing the right AI vendor isn’t just about the technology.",
      "Evaluate vendors by their ecosystem maturity, availability of APIs, developer community engagement, and cross-platform support.",
      "A strong partner network means faster deployments, richer functionality, and long-term scalability."
    ],
  },
  'top-use-cases-for-ai-text-summarization-in-business': {
    title: 'Top Use Cases for AI Text Summarization in Business',
    date: 'July 30, 2025',
    team: 'Dialzara Team',
    description:
      'AI summarization is helping legal, HR, and support teams save time and improve clarity. Explore its top applications.',
    image: '/images/ai-text-summarization.png',
    tags: ['Summarization', 'AI', 'Productivity'],
    content: [
      "AI-powered text summarization is revolutionizing how businesses process large volumes of data.",
      "Legal teams use it to extract key points from contracts, while HR departments use it to summarize job applications and internal reports.",
      "Customer support teams benefit from real-time summarization of support tickets, enabling faster resolution and better satisfaction."
    ],
  },
  'ai-in-customer-support-automation': {
    title: 'AI in Customer Support Automation',
    date: 'August 2, 2025',
    team: 'Dialzara Team',
    image: '/images/support.jpg',
    tags: ['AI', 'Customer Support', 'NLP'],
    description: 
      'Customer support has embraced AI through intelligent bots and smart ticket routing. Natural Language Processing enables AI to understand intent and resolve common queries instantly.',
    content: [
      "Customer support has embraced AI through intelligent bots and smart ticket routing.",
      "Natural Language Processing enables AI to understand intent and resolve common queries instantly.",
      "It also provides analytics on customer sentiment, helping companies identify issues before they escalate."
    ],
  }
};
