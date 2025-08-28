"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Card from './ui/Card.js';

// Animation styles
const floatingStyles = `
  @keyframes float-1 {
    0%, 100% { transform: translateY(0px) rotate(12deg); }
    50% { transform: translateY(-20px) rotate(12deg); }
  }
  @keyframes float-2 {
    0%, 100% { transform: translateY(0px) rotate(-6deg); }
    50% { transform: translateY(-15px) rotate(-6deg); }
  }
  .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
  .animate-float-2 { animation: float-2 7s ease-in-out infinite; }
`;

const InterviewCard = ({ 
  imageUrl,
  title,
  description,
  buttonText = 'View Questions',
  viewMoreLink
}) => {
  return (
    <div className="h-full">
      <Card
        title={title}
        description={description}
        image={imageUrl}
        buttonText={buttonText}
        href={viewMoreLink}
        isClickable={true}
        contentClassName="p-3 sm:p-4 md:p-5"
        imageClassName="h-36 sm:h-40 md:h-48"
        className="h-full transform transition-all duration-300 hover:scale-97 hover:shadow-xl hover:-translate-y-1"
        buttonClassName="inline-block w-full sm:w-auto px-4 sm:px-6 py-1.5 sm:py-2 mx-auto text-center bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-100 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg whitespace-nowrap"
      />
    </div>
  );
};

const InterviewCards = () => {
  const [interviewData, setInterviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Jsonfolder/interview.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setInterviewData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-12">Error: {error}</div>;

  // Extract category from heading (first word)
  const getCategory = (heading) => {
    return heading.split(' ')[0];
  };

  return (
    <div id="interview-question" className="relative w-full max-w-[1800px] mx-auto overflow-hidden px-4 sm:px-6 py-8 md:py-12 lg:py-16" style={{ backgroundColor: '#0a2a43' }}>
      <style dangerouslySetInnerHTML={{ __html: floatingStyles }} />
      
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12 md:mb-16 pt-4 sm:pt-8 relative">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-white mb-2 sm:mb-3">
          Popular <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Interview Questions</span>
        </h1>
        <div className="w-32 sm:w-48 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-2 rounded-full"></div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {interviewData.map((item, index) => (
            <InterviewCard
              key={index}
              title={item.heading}
              description={item.description}
              imageUrl={item.initialImage}
              buttonText="View Questions"
              viewMoreLink={`/interview/${getCategory(item.heading).toLowerCase()}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewCards;
