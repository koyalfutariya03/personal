'use client';
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';

const InterviewCategoryPage = () => {
  const { category } = useParams();
  const router = useRouter();
  const [interviewData, setInterviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResource, setSelectedResource] = useState('');
  const questionsRef = useRef(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        const response = await fetch('/Jsonfolder/interview.json');
        if (!response.ok) {
          throw new Error('Failed to fetch interview data');
        }
        const data = await response.json();
        const categoryData = data.find(item => 
          item.heading.toLowerCase().includes(category?.toLowerCase() || '')
        );
        
        if (!categoryData) {
          throw new Error('Category not found');
        }
        
        setInterviewData(categoryData);
        setSelectedResource(categoryData.resources?.[0] || '');
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching interview data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchInterviewData().then(() => {
        // Check if we should scroll to questions
        const scrollToQuestions = searchParams.get('scroll') === 'questions';
        if (scrollToQuestions && questionsRef.current) {
          setTimeout(() => {
            questionsRef.current.scrollIntoView({ behavior: 'smooth' });
            // Update URL without the scroll parameter
            const url = new URL(window.location.href);
            url.searchParams.delete('scroll');
            window.history.replaceState({}, '', url.toString());
          }, 100);
        }
      });
    }
  }, [category, searchParams]);

  const handleResourceSelect = (resource) => {
    setSelectedResource(resource);
  };

  const getReorderedQuestions = () => {
    if (!interviewData?.qaData || !selectedResource) return [];
    const targetQuestion = interviewData.topicMap?.[selectedResource];
    if (!targetQuestion) return interviewData.qaData;
    
    const reorderedData = [...interviewData.qaData];
    const targetIndex = reorderedData.findIndex(item => item.question === targetQuestion);
    if (targetIndex > 0) {
      const targetItem = reorderedData.splice(targetIndex, 1)[0];
      reorderedData.unshift(targetItem);
    }
    return reorderedData;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <button
          onClick={() => router.push('/interview')}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Interview Categories
        </button>
      </div>
    );
  }

  if (!interviewData) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center">
        <p>No interview data available for this category.</p>
        <button
          onClick={() => router.push('/interview')}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Interview Categories
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-8xl max-w-[1800px] mx-auto overflow-hidden  p-6 bg-white">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{interviewData.heading}</h1>
        <p className="text-gray-600 mb-6">{interviewData.description}</p>
      </div>
      
      <div ref={questionsRef} className="flex flex-col lg:flex-row gap-8">
        {interviewData.resources?.length > 0 && (
          <div className="lg:w-1/4 order-2 lg:order-1">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Trending Questions
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {interviewData.resources.map((resource, index) => (
                  <div key={index} className="group">
                    <button
                      onClick={() => handleResourceSelect(resource)}
                      className={`block w-full text-left text-sm leading-relaxed transition-colors duration-200 hover:text-blue-600 ${
                        resource === selectedResource
                          ? "text-orange-600 font-medium bg-orange-50 px-3 py-2 rounded-lg"
                          : "text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg"
                      }`}
                    >
                      {resource}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className={`${interviewData.resources?.length ? 'lg:w-3/4' : 'w-full'} order-1 lg:order-2`}>
          {interviewData.qaData?.length > 0 ? (
            <div className="space-y-6">
              {getReorderedQuestions().map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
                >
                  <h2 className="text-xl font-bold text-blue-800 mb-4">
                    {idx + 1}. {item.question}
                  </h2>
                  <div 
                    className="text-gray-700 leading-relaxed" 
                    dangerouslySetInnerHTML={{ __html: item.answer }} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No questions available for this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewCategoryPage;
