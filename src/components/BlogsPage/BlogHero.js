"use client";
import React from "react";
import CoursesList from "./coursesList";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative w-full max-w-[1800px] mx-auto overflow-hidden" style={{ background: "#05334b" }}>
      {/* Floating geometric elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-12 sm:top-20 left-2 sm:left-4 md:left-20 w-12 sm:w-16 md:w-24 h-16 sm:h-20 md:h-32 bg-blue-600/20 rounded-lg transform rotate-12 animate-float-1"></div>
        <div className="absolute top-24 sm:top-32 right-2 sm:right-4 md:right-32 w-10 sm:w-14 md:w-20 h-8 sm:h-10 md:h-16 bg-blue-500/15 rounded-lg transform -rotate-6 animate-float-2"></div>
        <div className="absolute top-12 sm:top-16 left-1/2 w-2 sm:w-3 h-2 sm:h-3 bg-white/40 rounded-full animate-float-3"></div>
        <div className="absolute top-1/3 right-2 sm:right-4 md:right-20 w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 bg-blue-400/30 rounded-full animate-float-4"></div>
        <div className="absolute bottom-24 sm:bottom-32 left-2 sm:left-4 md:left-16 w-10 sm:w-12 md:w-16 h-12 sm:h-16 md:h-20 bg-blue-600/15 rounded-lg transform rotate-45 animate-float-5"></div>
        <div className="absolute bottom-28 sm:bottom-40 right-2 sm:right-4 md:right-24 w-16 sm:w-20 md:w-28 h-12 sm:h-14 md:h-20 bg-blue-500/20 rounded-lg transform -rotate-12 animate-float-6"></div>
        <div className="absolute top-2/3 left-1/4 w-2 sm:w-3 h-2 sm:h-3 bg-white/20 rounded-full animate-float-7"></div>
        <div className="absolute bottom-1/4 right-1/3 w-10 sm:w-14 md:w-18 h-12 sm:h-16 md:h-24 bg-blue-600/10 rounded-lg transform rotate-30 animate-float-8"></div>
        <div className="absolute top-3/4 left-1/4 sm:left-1/3 w-4 sm:w-5 md:w-6 h-6 sm:h-7 md:h-8 bg-blue-400/20 rounded-lg transform -rotate-45 animate-float-1"></div>
        <div className="absolute top-1/2 left-4 sm:left-8 md:left-10 w-2 sm:w-3 h-2 sm:h-3 bg-white/30 rounded-full animate-float-2"></div>
        <div className="absolute top-1/2 right-4 sm:right-8 md:right-10 w-3 sm:w-4 md:w-5 h-3 sm:h-4 md:h-5 bg-blue-300/25 rounded-full animate-float-3"></div>
      </div>

      {/* Hero Section Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-3 sm:px-4 text-center pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-12 md:pb-16" style={{ background: "#0a2a43" }}>
        <div className="max-w-4xl mx-auto">
          <div className="relative inline-block w-full">
            {/* Glowing background */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div
                className="w-full h-full max-w-2xl mx-auto rounded-2xl blur-2xl opacity-60 bg-blue-300"
                style={{ filter: "blur(40px)" }}
              ></div>
            </div>
            <h1 className="relative mt-4 sm:mt-8 md:mt-12 text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight text-center z-10 px-2 sm:px-4">
                <span className="relative z-10">
                  The Blog That Keeps
                  <span className="block xs:inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent xs:ml-2 sm:ml-3">
                    Curiosity Alive
                  </span>
                </span>
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 blur-xl animate-pulse"></div>
              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-300"></div>
              {/* Sparkle effects */}
              <div className="absolute -top-8 left-1/4 w-1 h-1 bg-white rounded-full animate-twinkle"></div>
              <div className="absolute -top-6 right-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-twinkle delay-500"></div>
              <div className="absolute -bottom-6 left-2/3 w-1 h-1 bg-purple-300 rounded-full animate-twinkle delay-700"></div>
            </h1>
          </div>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
            From trending ideas to timeless lessons, we cover it all. Stay inspired with content that sparks new ways of thinking
            </p>
          <div className="flex flex-row flex-nowrap gap-2 sm:gap-4 justify-center items-center px-2 sm:px-4 w-full sm:w-auto">
            <Link 
              href="#trending-blogs" 
              className="w-auto sm:w-auto px-3 sm:px-8 py-2 sm:py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-full text-sm sm:text-base hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-md sm:shadow-lg hover:shadow-xl border-2 sm:border-4 border-white whitespace-nowrap"
            >
              Trending Blogs
            </Link>
            <Link 
              href="#interview-question" 
              className="w-auto px-3 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 border-2 border-blue-300 text-blue-100 font-semibold rounded-full hover:bg-blue-100 hover:text-blue-900 transition-all duration-300 transform hover:scale-105 block text-center text-sm sm:text-base whitespace-nowrap"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('interview-question');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Interview Questions
            </Link>
          </div>
        </div>
      </div>
      <CoursesList />
      {/* Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"></div>
    </div>
  );
}