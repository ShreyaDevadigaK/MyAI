

import Image from 'next/image';
import Link from 'next/link';

import { blogPosts } from '@/lib/blog-posts';


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
