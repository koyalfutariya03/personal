'use client';
import React from 'react';
import CourseCard from '@/components/BlogsPage/CourseListCard';
import { 
  Settings, BarChart3, Database, Users, Code, Cog, Activity, Globe, Monitor, 
  Cloud, TestTube, TrendingUp, Shield, Palette, Lock 
} from 'lucide-react';
export default function SAPCourses() {
  const courses = [
    { icon: Settings, title: "SAP FICO", iconColor: "text-purple-500" },
    { icon: BarChart3, title: "SAP SD", iconColor: "text-blue-500" },
    { icon: Database, title: "SAP MM", iconColor: "text-green-500" },
    { icon: Users, title: "SAP HCM", iconColor: "text-pink-500" },
    { icon: Code, title: "SAP ABAP", iconColor: "text-yellow-500" },
    { icon: Cog, title: "SAP Basis", iconColor: "text-indigo-500" },
    { icon: Activity, title: "SAP PP", iconColor: "text-red-500" },
    { icon: Globe, title: "SAP SCM", iconColor: "text-cyan-500" },
    { icon: Monitor, title: "SAP IBP", iconColor: "text-teal-500" },
    { icon: Cloud, title: "SAP EWM", iconColor: "text-blue-400" },
    { icon: TestTube, title: "SAP QM", iconColor: "text-purple-400" },
    { icon: BarChart3, title: "SAP BI", iconColor: "text-blue-400" },
    { icon: TrendingUp, title: "SAP Ariba", iconColor: "text-green-400" },
    { icon: Shield, title: "SAP PM", iconColor: "text-gray-500" },
    { icon: Users, title: "SAP SuccessFactors", iconColor: "text-pink-400" },
    { icon: Palette, title: "SAP Fiori", iconColor: "text-indigo-400" },
    { icon: Globe, title: "SAP NetWeaver", iconColor: "text-blue-500" },
    { icon: Lock, title: "SAP GRC", iconColor: "text-red-400" },
  ];

  return (
    <div className="relative w-full max-w-[1800px] mx-auto overflow-hidden p-8 flex items-center justify-center" style={{background: 'linear-gradient(to bottom, #002A4C, #16588C, #072E4F)'}}>
      {/* Navy blue overlay */}
      <div className="absolute inset-0 bg-[#0a2a43] opacity-90 z-0"></div>
      {/* Floating geometric elements for background */}
      <div className="absolute inset-0 pointer-events-none z-10">
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
      <div className="relative z-20 max-w-6xl w-full mx-auto">
        {/* Hero Section */}
        <div className="mb-10 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8" style={{ background: '#0a2a43', boxShadow: '0 8px 32px 0 rgba(10,42,67,0.5)' }}>
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">Master SAP with Expert-Led Courses</h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-2 max-w-2xl">Explore a curated selection of SAP modules and technologies. Boost your career with in-depth, hands-on learning for every SAP specialization.</p>
          </div>
          <img 
            src="https://res.cloudinary.com/decptkmx7/image/upload/v1752653658/Media_1_ccfn03.png" 
            alt="SAP Illustration" 
            className="w-[280px] h-auto rounded-xl shadow-lg" 
          />
        </div>
        <h1 className="text-3xl font-bold text-white mb-8 text-left">SAP Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {courses.map((course, index) => (
            <CourseCard 
              key={index}
              icon={course.icon}
              title={course.title}
              iconColor={course.iconColor}
              href={`/courses?category=${encodeURIComponent(course.title)}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
