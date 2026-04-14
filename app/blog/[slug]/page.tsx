

import Image from 'next/image';
import Link from 'next/link';

export interface BlogPost {
  title: string;
  date: string;
  team: string;
  content: string[];
  image?: string;
  tags?: string[];
  excerpt?: string;
}

export const blogPosts: Record<string, BlogPost> = {
  "how-ai-automates-real-estate-client-follow-ups": {
    title: "How AI Automates Real Estate Client Follow-Ups",
    date: "July 28, 2025",
    team: "Dialzara Team",
    excerpt: "Explore how AI is reshaping the way real estate professionals follow up with clients and leads.",
    image: "/images/real-estate-ai.png",
    tags: ["AI", "Real Estate", "Automation"],
    content: [
      "Artificial Intelligence is transforming how real estate professionals manage client relationships.",
      "By automating follow-up messages, AI helps agents stay in touch with leads at the right time, personalize responses based on behavior, and streamline scheduling through intelligent chatbots.",
      "This level of automation allows agents to focus more on relationship-building and closing deals, rather than managing repetitive communication tasks."
    ],
  },
  "evaluating-ai-vendors-partner-ecosystem-strength": {
    title: "Evaluating AI Vendors: Partner Ecosystem Strength",
    date: "July 29, 2025",
    team: "Dialzara Team",
    excerpt: "Understand how strong partnerships and ecosystems play a vital role in AI vendor reliability.",
    image: "/images/ai-vendor-evaluation.png",
    tags: ["Vendors", "Ecosystem", "Partnerships"],
    content: [
      "Choosing the right AI vendor isn’t just about the technology.",
      "Evaluate vendors by their ecosystem maturity, availability of APIs, developer community engagement, and cross-platform support.",
      "A strong partner network means faster deployments, richer functionality, and long-term scalability."
    ],
  },
  "top-use-cases-for-ai-text-summarization-in-business": {
    title: "Top Use Cases for AI Text Summarization in Business",
    date: "July 30, 2025",
    team: "Dialzara Team",
    excerpt: "Discover how AI-powered text summarization helps legal, HR, and customer support teams save time.",
    image: "/images/ai-text-summarization.png",
    tags: ["Summarization", "Productivity", "Business"],
    content: [
      "AI-powered text summarization is revolutionizing how businesses process large volumes of data.",
      "Legal teams use it to extract key points from contracts, while HR departments use it to summarize job applications and internal reports.",
      "Customer support teams benefit from real-time summarization of support tickets, enabling faster resolution and better satisfaction."
    ],
  },
  "ai-in-customer-support-automation": {
    title: "AI in Customer Support Automation",
    date: "August 2, 2025",
    team: "Dialzara Team",
    excerpt: "Explore how AI chatbots, NLP, and sentiment analysis transform customer support.",
    image: "/images/support.jpg",
    tags: ["AI", "Customer Support", "NLP"],
    content: [
      "Customer support has embraced AI through intelligent bots and smart ticket routing.",
      "Natural Language Processing enables AI to understand intent and resolve common queries instantly.",
      "It also provides analytics on customer sentiment, helping companies identify issues before they escalate."
    ],
  }
};


export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];

  if (!post) {
    return (
      <div className="p-10 text-center text-red-600">
        Post not found
      </div>
    );
  }



  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition"
        >
          ← Back to All Posts
        </Link>
      </div>

      {post.image && (
        <div className="mb-6">
          <Image
            src={post.image}
            alt={post.title}
            width={900}
            height={400}
            className="rounded-xl object-cover w-full h-[300px]"
          />
        </div>
      )}

      <p className="text-sm text-gray-500 mb-2">{post.team} • {post.date}</p>

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      {post.tags && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose prose-gray max-w-none text-lg leading-8 text-gray-800 space-y-5">
        {post.content.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </div>

  );
}
