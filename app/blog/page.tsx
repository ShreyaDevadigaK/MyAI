"use client"

import React from 'react'
import { Navbar } from '@/components/Navbar'
import { ComprehensiveFooter } from '@/components/ComprehensiveFooter'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { blogPosts } from '@/lib/blog-posts';


function BlogPage() {
  const router = useRouter()



  return (
    <div className="min-h-screen bg-white">

      <Navbar />
      <main>

        <section className="px-6 pt-24 lg:px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="mx-auto max-w-4xl text-center mt-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              AI Receptionist Blog
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Stay updated with the latest AI receptionist tips, industry insights, and best practices for small businesses
            </p>
          </div>
        </section>

        <section className="py-10 px-5 bg-gray-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(blogPosts).map(([slug, post]) => (
              <div
                key={slug}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-sm text-gray-500">
                    {post.team} • {post.date}
                  </p>
                  <h3 className="text-lg font-bold mt-2 mb-2">{post.title}</h3>
                  <p className="text-gray-700 text-sm">{post.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/blog/${slug}`)}
                      className="text-blue-600 font-medium text-sm hover:underline"
                    >
                      Read more →
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>



      </main>
      <ComprehensiveFooter />

    </div>
  )
}

export default BlogPage