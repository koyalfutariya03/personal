'use client';
 
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Tag, Calendar, Clock, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
 
 
export default function BlogPost({ params }) {
  // Unwrap the params Promise using React.use()
  const { slug } = React.use(params);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // API Configuration - Connect to your Express backend
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5002';
 
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching blog post with slug:', slug);
        
        // Fetch from your Express backend
        const response = await fetch(`${API_BASE_URL}/api/blogs/slug/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Blog post not found');
          }
          const errorText = await response.text();
          throw new Error(`Failed to fetch blog post: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Blog data received:', data);
        setBlog(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
 
    if (slug) {
      fetchBlogPost();
    }
  }, [slug, API_BASE_URL]);
 
  const shareOnSocial = (platform) => {
    const url = window.location.href;
    const title = blog?.title || '';
    const text = blog?.content?.replace(/<[^>]*>?/gm, '').substring(0, 100) || '';
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        // You could add a toast notification here
        alert('Link copied to clipboard!');
        return;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };
 
  if (loading) {
    return (
      <div className="min-h-screen relative w-full max-w-[1800px] mx-auto overflow-hidden flex items-center justify-center bg-[#072E4F]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-blue-100">Loading blog post...</p>
        </div>
      </div>
    );
  }
 
  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#072E4F]">
        <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl max-w-2xl mx-4">
          <h2 className="text-2xl font-bold text-white mb-4">Blog Post Not Found</h2>
          <p className="text-blue-100 mb-6">
            {error || "The blog post you're looking for doesn't exist or may have been removed."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
            <Link
              href="/blogs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors"
            >
              Browse All Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }
 
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
 
  const readingTime = Math.ceil((blog.content?.split(/\s+/).length || 0) / 200);
 
  return (
    <div className="relative w-full max-w-[1800px] mx-auto overflow-hidden bg-[#072E4F] text-white">
      {/* Back Button (hidden on mobile) */}
      <div className="hidden md:block absolute top-6 left-6 z-20">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-blue-200 hover:text-white cursor-pointer text-base font-medium bg-blue-900/40 px-3 py-2 rounded-full shadow transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>

      {/* Mobile Back Button */}
      <div className="md:hidden absolute top-4 left-4 z-20">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-blue-200 hover:text-white cursor-pointer text-sm font-medium bg-blue-900/40 px-2 py-1.5 rounded-full shadow transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>
 
      {/* Floating geometric elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-24 h-32 bg-blue-600/20 rounded-lg transform rotate-12 animate-float-1"></div>
        <div className="absolute top-32 right-32 w-20 h-16 bg-blue-500/15 rounded-lg transform -rotate-6 animate-float-2"></div>
        <div className="absolute top-16 left-1/2 w-3 h-3 bg-white/40 rounded-full animate-float-3"></div>
        <div className="absolute top-1/3 right-20 w-6 h-6 bg-blue-400/30 rounded-full animate-float-4"></div>
        <div className="absolute bottom-32 left-16 w-16 h-20 bg-blue-600/15 rounded-lg transform rotate-45 animate-float-5"></div>
        <div className="absolute bottom-40 right-24 w-28 h-20 bg-blue-500/20 rounded-lg transform -rotate-12 animate-float-6"></div>
        <div className="absolute top-2/3 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-float-7"></div>
        <div className="absolute bottom-1/4 right-1/3 w-18 h-24 bg-blue-600/10 rounded-lg transform rotate-30 animate-float-8"></div>
      </div>
     
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-slate-300 rounded-full mix-blend-multiply filter blur-xl"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl"></div>
        </div>
      </div>
 
      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-sm shadow-lg border border-blue-400/30 rounded-full px-3 py-2 md:px-6 md:py-3 mb-8">
            <Tag className="w-4 h-4 md:w-5 md:h-5 text-blue-300" />
            <span className="text-blue-100 font-semibold text-sm md:text-base">{blog.category || 'Blog Post'}</span>
          </div>
         
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight max-w-4xl mx-auto">
            {blog.title}
            {blog.subtitle && (
              <>
                <br />
                <span className="bg-gradient-to-r from-blue-300 to-blue-400 bg-clip-text text-transparent">
                  {blog.subtitle}
                </span>
              </>
            )}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-blue-100 mb-8">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>By {blog.author || 'Admin'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{readingTime} min read</span>
            </div>
          </div>
           
          {/* Featured Image - Check both image and featuredImage fields */}
          {(blog.image || blog.featuredImage) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-4xl mx-auto h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden mb-12 shadow-xl border border-blue-400/20"
            >
              <Image
                src={blog.image || blog.featuredImage}
                alt={blog.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 90vw, 80vw"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </motion.div>
          )}
        </motion.header>
 
        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose prose-invert prose-sm md:prose-base lg:prose-lg prose-p:text-justify lg:prose-p:text-left max-w-4xl mx-auto px-4 md:px-6"
        >
          <div
            className="leading-relaxed blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </motion.article>
 
        {/* Share Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto mt-12 pt-8 border-t border-blue-400/20"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center justify-center gap-2">
              <Share2 className="w-5 h-5" />
              Share this article
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => shareOnSocial('twitter')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Twitter
              </button>
              <button
                onClick={() => shareOnSocial('facebook')}
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
              <button
                onClick={() => shareOnSocial('linkedin')}
                className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </button>
              <button
                onClick={() => shareOnSocial('copy')}
                className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Link
              </button>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to All Blogs
            </Link>
            <Link
              href={`/blogs?category=${encodeURIComponent(blog.category || '')}`}
              className="inline-flex items-center gap-2 text-blue-300 hover:text-white transition-colors duration-200"
            >
              More in {blog.category}
            </Link>
          </div>
        </motion.div>
      </div>
 
      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        .animate-float-1 { animation: float 8s ease-in-out infinite; }
        .animate-float-2 { animation: float 10s ease-in-out infinite 1s; }
        .animate-float-3 { animation: float 12s ease-in-out infinite 2s; }
        .animate-float-4 { animation: float 9s ease-in-out infinite 1.5s; }
        .animate-float-5 { animation: float 11s ease-in-out infinite 2.5s; }
        .animate-float-6 { animation: float 9.5s ease-in-out infinite 1.2s; }
        .animate-float-7 { animation: float 10.5s ease-in-out infinite 3s; }
        .animate-float-8 { animation: float 12.5s ease-in-out infinite 0.5s; }
       
        /* Customize prose styles */
        .prose-invert {
          --tw-prose-body: #e2e8f0;
          --tw-prose-headings: #ffffff;
          --tw-prose-links: #60a5fa;
          --tw-prose-links-hover: #3b82f6;
          --tw-prose-underline: rgba(56, 182, 255, 0.2);
          --tw-prose-underline-hover: #3b82f6;
          --tw-prose-bold: #ffffff;
          --tw-prose-counters: #9ca3af;
          --tw-prose-bullets: #4b5563;
          --tw-prose-hr: #374151;
          --tw-prose-quote: #f3f4f6;
          --tw-prose-quote-borders: #4b5563;
          --tw-prose-captions: #9ca3af;
          --tw-prose-code: #f3f4f6;
          --tw-prose-pre-code: #d1d5db;
          --tw-prose-pre-bg: #1f2937;
          --tw-prose-th-borders: #4b5563;
          --tw-prose-td-borders: #374151;
        }
       
        .prose-invert a {
          text-decoration: none;
          font-weight: 500;
          border-bottom: 2px solid var(--tw-prose-underline);
          transition: all 0.2s ease;
        }
       
        .prose-invert a:hover {
          color: var(--tw-prose-links-hover);
          border-bottom-color: var(--tw-prose-links-hover);
        }
       
        .prose-invert h1,
        .prose-invert h2,
        .prose-invert h3,
        .prose-invert h4 {
          margin-top: 2em;
          margin-bottom: 0.75em;
          font-weight: 700;
          line-height: 1.3;
        }
       
        .prose-invert h1 { font-size: 2.25em; }
        .prose-invert h2 { font-size: 1.75em; }
        .prose-invert h3 { font-size: 1.5em; }
        .prose-invert h4 { font-size: 1.25em; }
       
        .prose-invert p {
          margin-top: 1.25em;
          margin-bottom: 1.25em;
          line-height: 1.7;
        }
       
        .prose-invert img {
          border-radius: 0.75rem;
          margin-top: 2em;
          margin-bottom: 2em;
        }
        
        /* Blog content specific styles */
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .blog-content blockquote {
          border-left: 4px solid #3b82f6;
          background: rgba(59, 130, 246, 0.1);
          padding: 1rem 1.5rem;
          margin: 2rem 0;
          border-radius: 0.5rem;
        }
        
        .blog-content code {
          background: rgba(59, 130, 246, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
        }
        
        .blog-content pre {
          background: #1f2937;
          padding: 1.5rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          border: 1px solid #374151;
        }
        
        .blog-content pre code {
          background: transparent;
          padding: 0;
        }
      `}</style>
    </div>
  );
}
