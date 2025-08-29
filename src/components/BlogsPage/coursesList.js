"use client";
import React, { useState, useEffect } from 'react';
import { Brain, 
  Cog, Cloud,Database, Shield, BarChart3, Code, Zap,Smartphone,TrendingUp,Palette,MessageSquare,
Rocket,Globe,Settings,Users,BookOpen,Target,LineChart,Briefcase,ChevronRight,Star,Clock, Award } from 'lucide-react';
import Link from 'next/link';

const CoursesList = ({ initialCategory = 'all' }) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [hoveredTopic, setHoveredTopic] = useState(null);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (initialCategory && initialCategory !== selectedCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const categories = [
    { id: 'all', name: 'All Topics', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { id: 'tech', name: 'Technology', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { id: 'business', name: 'Business', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { id: 'creative', name: 'Creative', color: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { id: 'analytics', name: 'Analytics', color: 'bg-gradient-to-r from-indigo-500 to-purple-500' }
  ];

  const learningTopics = [
    { name: 'SAP', icon: Settings, category: 'business', courses: 12, duration: '8-12 weeks', level: 'Intermediate', rating: 4.7, gradient: '', description: 'Enterprise resource planning systems' },
    { name: 'Data Science', icon: Database, category: 'analytics', courses: 18, duration: '10-14 weeks', level: 'Intermediate', rating: 4.8, gradient: '', description: 'Extract insights from complex datasets' },
    { name: 'HR Course', icon: Users, category: 'business', courses: 10, duration: '6-10 weeks', level: 'Beginner', rating: 4.5, gradient: '', description: 'People management and HR strategies' },
    { name: 'Python', icon: Code, category: 'tech', courses: 20, duration: '8-12 weeks', level: 'Beginner', rating: 4.9, gradient: '', description: 'Programming with Python' },
    { name: 'JAVA', icon: Code, category: 'tech', courses: 16, duration: '8-12 weeks', level: 'Intermediate', rating: 4.6, gradient: '', description: 'Programming with Java' },
    { name: 'MERN Stack', icon: Code, category: 'tech', courses: 14, duration: '12-16 weeks', level: 'Intermediate', rating: 4.7, gradient: '', description: 'Full stack web development with MongoDB, Express, React, Node' },
    { name: 'Salesforce', icon: Cloud, category: 'business', courses: 12, duration: '8-12 weeks', level: 'Intermediate', rating: 4.5, gradient: '', description: 'CRM and cloud solutions with Salesforce' },
    { name: 'Digital Marketing', icon: TrendingUp, category: 'business', courses: 15, duration: '6-10 weeks', level: 'Beginner', rating: 4.4, gradient: '', description: 'Modern marketing in the digital age' },
    { name: 'DevOps', icon: Cog, category: 'tech', courses: 14, duration: '8-12 weeks', level: 'Advanced', rating: 4.6, gradient: '', description: 'Development and operations workflows' },
    { name: 'AWS', icon: Cloud, category: 'tech', courses: 18, duration: '10-14 weeks', level: 'Intermediate', rating: 4.8, gradient: '', description: 'Amazon Web Services cloud platform' },
    { name: 'Machine Learning', icon: Brain, category: 'tech', courses: 16, duration: '12-16 weeks', level: 'Intermediate', rating: 4.9, gradient: '', description: 'Machine learning fundamentals and applications' },
    { name: 'Data Analytics', icon: BarChart3, category: 'analytics', courses: 13, duration: '8-10 weeks', level: 'Intermediate', rating: 4.7, gradient: '', description: 'Analyze and interpret complex data' },
    { name: 'Power BI', icon: BarChart3, category: 'analytics', courses: 10, duration: '6-8 weeks', level: 'Beginner', rating: 4.5, gradient: '', description: 'Business intelligence with Power BI' },
    { name: 'UI/UX', icon: Palette, category: 'creative', courses: 12, duration: '8-12 weeks', level: 'Beginner', rating: 4.6, gradient: '', description: 'User interface and user experience design' },
    { name: 'AI/ML', icon: Brain, category: 'tech', courses: 18, duration: '12-16 weeks', level: 'Advanced', rating: 4.8, gradient: '', description: 'Artificial Intelligence and Machine Learning' },
    { name: 'Cloud Computing', icon: Cloud, category: 'tech', courses: 20, duration: '10-14 weeks', level: 'Intermediate', rating: 4.7, gradient: '', description: 'Cloud architecture and deployment' },
    { name: 'Azure', icon: Cloud, category: 'tech', courses: 14, duration: '8-12 weeks', level: 'Intermediate', rating: 4.6, gradient: '', description: 'Microsoft Azure cloud platform' },
    { name: 'Blockchain', icon: Database, category: 'tech', courses: 10, duration: '12-16 weeks', level: 'Advanced', rating: 4.7, gradient: '', description: 'Blockchain technology and development' },
    { name: 'Business Intelligence', icon: BarChart3, category: 'analytics', courses: 12, duration: '8-12 weeks', level: 'Intermediate', rating: 4.6, gradient: '', description: 'Business intelligence tools and techniques' },
    { name: 'Cyber Security', icon: Shield, category: 'tech', courses: 15, duration: '10-14 weeks', level: 'Advanced', rating: 4.8, gradient: '', description: 'Protect systems and networks' },
    { name: 'Software Testing', icon: Zap, category: 'tech', courses: 11, duration: '6-10 weeks', level: 'Intermediate', rating: 4.5, gradient: '', description: 'Testing and quality assurance' },
    { name: 'SQL', icon: Database, category: 'tech', courses: 13, duration: '8-10 weeks', level: 'Beginner', rating: 4.6, gradient: '', description: 'Structured Query Language for databases' },
    { name: 'Web Development', icon: Code, category: 'tech', courses: 20, duration: '12-16 weeks', level: 'Intermediate', rating: 4.7, gradient: '', description: 'Frontend and backend web development' },
    { name: 'Software Engineering', icon: Cog, category: 'tech', courses: 18, duration: '12-16 weeks', level: 'Advanced', rating: 4.8, gradient: '', description: 'Software design and engineering principles' },
  ];

  const filteredTopics = selectedCategory === 'all' 
    ? learningTopics 
    : learningTopics.filter(topic => topic.category === selectedCategory);

  // Determine how many topics to show based on device and showAllCourses state
  const getTopicsToShow = () => {
    if (!isMobile) {
      return filteredTopics; // Show all on tablet and desktop
    }
    return showAllCourses ? filteredTopics : filteredTopics.slice(0, 3);
  };

  const topicsToShow = getTopicsToShow();

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return 'text-blue-600 bg-blue-100';
      case 'Intermediate': return 'text-blue-600 bg-blue-100';
      case 'Advanced': return 'text-blue-600 bg-blue-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const handleReadMoreClick = () => {
    setShowAllCourses(!showAllCourses);
  };

  return (
    <>
      <div className="relative w-full max-w-[1800px] mx-auto overflow-hidden p-6" style={{background: '#0a2a43'}}>
        {/* Floating geometric elements for background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Large rectangle - top left */}
          <div className="absolute top-20 left-4 sm:left-20 w-16 sm:w-24 h-20 sm:h-32 bg-blue-600/20 rounded-lg transform rotate-12 animate-pulse"></div>
          {/* Medium rectangle - top right */}
          <div className="absolute top-32 right-4 sm:right-32 w-14 sm:w-20 h-10 sm:h-16 bg-blue-500/15 rounded-lg transform -rotate-6 animate-pulse"></div>
          {/* Small circle - top center */}
          <div className="absolute top-16 left-1/2 w-3 h-3 bg-white/40 rounded-full animate-ping"></div>
          {/* Medium circle - right side */}
          <div className="absolute top-1/3 right-4 sm:right-20 w-4 sm:w-6 h-4 sm:h-6 bg-blue-400/30 rounded-full animate-pulse"></div>
          {/* Rectangle - bottom left */}
          <div className="absolute bottom-32 left-4 sm:left-16 w-12 sm:w-16 h-16 sm:h-20 bg-blue-600/15 rounded-lg transform rotate-45 animate-pulse"></div>
          {/* Rectangle - bottom right */}
          <div className="absolute bottom-40 right-4 sm:right-24 w-20 sm:w-28 h-14 sm:h-20 bg-blue-500/20 rounded-lg transform -rotate-12 animate-pulse"></div>
          {/* Additional floating elements in middle section */}
          <div className="absolute top-2/3 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 right-1/3 w-14 sm:w-18 h-18 sm:h-24 bg-blue-600/10 rounded-lg transform rotate-30 animate-pulse"></div>
          {/* Extra elements for continuity */}
          <div className="absolute top-3/4 left-1/3 w-6 h-8 bg-blue-400/20 rounded-lg transform -rotate-45 animate-pulse"></div>
          <div className="absolute top-1/2 left-10 w-3 h-3 bg-white/30 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 right-10 w-5 h-5 bg-blue-300/25 rounded-full animate-pulse"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-left">
              Start Your Learning Journey
            </h1>
            <div className="w-64 h-1 mb-2 sm:mb-4 rounded-full bg-gradient-to-r from-blue-700 to-cyan-400"></div>
            <p className="hidden sm:block text-base sm:text-xl text-gray-300 max-w-2xl text-left leading-relaxed sm:leading-normal">
              Discover cutting-edge skills and advance your career with our comprehensive learning paths
            </p>
          </div>

          {/* Category Filter - sticky horizontal chips on mobile, wrapped on larger screens */}
          <div className="sticky top-0 z-20 -mx-6 px-6 py-2 mb-6 bg-[#0a2a43]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a2a43]/70">
            <div className="flex gap-2 sm:gap-4 overflow-x-auto sm:overflow-visible whitespace-nowrap sm:whitespace-normal snap-x snap-mandatory sm:flex-wrap sm:justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`snap-start px-3 py-1.5 sm:px-6 sm:py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs sm:text-base border
                    ${selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white border-transparent shadow-lg' 
                      : 'bg-white/10 text-white border-white/10 hover:bg-white/20'}
                  `}
                  style={selectedCategory === category.id ? { boxShadow: '0 0 0 2px #1e90ff, 0 2px 8px rgba(0,0,0,0.08)' } : {}}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Learning Topics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {topicsToShow.map((topic, index) => {
              const IconComponent = topic.icon;
              const isSap = topic.name === 'SAP';
              const isHR = topic.name === 'HR Course';
              const cardContent = (
                <div
                  key={topic.name}
                  className="group relative flex w-full items-start sm:items-center gap-3 rounded-xl border bg-white/5 border-white/10 p-3 sm:px-5 sm:py-1 shadow-sm hover:shadow-md transition-all duration-200 sm:hover:scale-105 sm:bg-white sm:border-gray-200"
                >
                  {/* Icon */}
                  <div className="w-9 h-9 sm:w-7 sm:h-7 rounded-lg bg-white/10 sm:bg-transparent flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5 sm:w-7 sm:h-7 text-cyan-300 sm:text-blue-900" />
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white sm:text-gray-800 text-sm sm:text-base truncate">{topic.name}</div>
                  </div>
                  {/* CTA chevron mobile only */}
                  <button aria-hidden className="ml-2 inline-flex sm:hidden items-center justify-center w-7 h-7 rounded-full bg-blue-500 text-white">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              );
              
              if (isSap) {
                return (
                  <Link href="/courses/sap" key={topic.name}>
                    {cardContent}
                  </Link>
                );
              } else if (isHR) {
                return (
                  <Link href="/courses/hr" key={topic.name}>
                    {cardContent}
                  </Link>
                );
              } else {
                return (
                  <Link href={`/courses?category=${encodeURIComponent(topic.name)}`} key={topic.name}>
                    {cardContent}
                  </Link>
                );
              }
            })}
          </div>

          {/* Read More Button - Only visible on mobile when there are more than 3 courses */}
          {isMobile && filteredTopics.length > 3 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleReadMoreClick}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium rounded-full hover:from-blue-600 hover:to-cyan-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0a2a43]"
              >
                {showAllCourses ? 'Show Less' : 'Read More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CoursesList;
