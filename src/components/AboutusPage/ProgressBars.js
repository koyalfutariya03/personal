"use client";
import React, { useEffect, useState } from "react";

const ProgressBars = () => {
  const [isVisible, setIsVisible] = useState(false);

  const courses = [
    { name: "SAP FICO", percentage: 98, icon: "💼", description: "Financial Accounting & Controlling" },
    { name: "SAP MM", percentage: 95, icon: "🛒", description: "Materials Management" },
    { name: "SAP SD", percentage: 93, icon: "🚚", description: "Sales & Distribution" },
    { name: "SAP ABAP", percentage: 90, icon: "💻", description: "Development & Programming" },
    { name: "SAP HCM", percentage: 88, icon: "👥", description: "Human Capital Management" },
    { name: "SAP Basis", percentage: 85, icon: "🔧", description: "System Administration" },
    { name: "SAP S/4 HANA", percentage: 92, icon: "📊", description: "Next-Gen ERP Suite" },
  ];

  const industryData = [
    { name: "Manufacturing", adoption: 90 },
    { name: "IT & Consulting", adoption: 95 },
    { name: "Retail & FMCG", adoption: 75 },
    { name: "Banking & Finance", adoption: 80 },
    { name: "Healthcare", adoption: 70 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const progressSection = document.querySelector('.progress-container');
    if (progressSection) {
      observer.observe(progressSection);
    }

    return () => {
      if (progressSection) {
        observer.unobserve(progressSection);
      }
    };
  }, []);

  return (
    <div className="progress-container py-8 sm:py-12 lg:py-16 px-3 sm:px-4 lg:px-8 bg-gray-50 text-gray-800 overflow-hidden">
      <div className="container mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#01021d] mb-3 sm:mb-4 relative inline-block px-2">
            SAP Ecosystem Expertise
            <span className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 w-16 sm:w-20 h-0.5 sm:h-1 bg-gradient-to-r from-[#462ded] to-[#f2a624] rounded-full"></span>
          </h1>
          <p className="text-gray-600 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto text-sm sm:text-base lg:text-lg px-4">
            Our comprehensive curriculum covers the entire SAP landscape, with specialized focus on high-demand modules
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
          {/* Left Side: SAP Module Progress Bars - Mobile Optimized */}
          <div className="w-full lg:w-1/2 bg-white p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800 border-l-4 border-[#f2a624] pl-3 sm:pl-4">
              SAP Module Placement Success Rate
            </h2>

            {courses.map((course, index) => (
              <div
                className={`mb-4 sm:mb-6 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                }`}
                key={index}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center flex-1 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#462ded] to-[#6246ea] rounded-full flex items-center justify-center mr-3 sm:mr-4 text-sm sm:text-lg shadow-lg shadow-[#462ded]/30 flex-shrink-0">
                      {course.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg truncate">{course.name}</div>
                      <div className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-none">{course.description}</div>
                    </div>
                  </div>
                  <div className="font-bold text-[#f2a624] text-base sm:text-lg lg:text-xl min-w-[3rem] sm:min-w-12 text-right flex-shrink-0 ml-2">
                    {isVisible ? course.percentage : 0}%
                  </div>
                </div>
                <div className="h-2 sm:h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#462ded] to-[#f2a624] rounded-full transition-all duration-1000 ease-in-out relative"
                    style={{
                      width: isVisible ? `${course.percentage}%` : '0%',
                    }}
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-2 sm:w-2.5 bg-[#f2a624] rounded-r-full"></div>
                  </div>
                </div>
              </div>
            ))}

            {/* Stats Section - Mobile Optimized */}
            <div className="flex flex-wrap justify-around sm:justify-between mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 gap-4 sm:gap-0">
              <div className="text-center flex-1 min-w-[80px]">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#462ded] mb-1 sm:mb-2">2500+</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">Students Trained</div>
              </div>
              <div className="text-center flex-1 min-w-[80px]">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#462ded] mb-1 sm:mb-2">95%</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">Placement Rate</div>
              </div>
              <div className="text-center flex-1 min-w-[80px]">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#462ded] mb-1 sm:mb-2">100+</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">Corporate Partners</div>
              </div>
            </div>
          </div>

          {/* Right Side: Description and Industry Adoption - Mobile Optimized */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#01021d] mb-4 sm:mb-6 relative pb-3 sm:pb-4">
                SAP Skills in High Demand
                <span className="absolute bottom-0 left-0 w-12 sm:w-15 h-0.5 sm:h-1 bg-gradient-to-r from-[#f2a624] to-[#462ded] rounded-full"></span>
              </h2>
              
              <div className="text-gray-700 leading-relaxed">
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  The SAP ecosystem continues to dominate the ERP market, with over
                  400,000 customers worldwide and a growing demand for skilled professionals.
                  At Connecting Dots ERP, we focus on high-demand SAP modules that offer
                  excellent career growth potential.
                </p>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  Our training programs are continuously updated to align with the latest
                  SAP innovations, including S/4HANA, SAP Cloud Platform, and industry-specific
                  solutions. With over 10 years of experience in SAP training, we've developed
                  partnerships with leading implementation companies to ensure our curriculum
                  meets current industry needs.
                </p>

                <h3 className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-3 sm:mb-4 text-gray-800">
                  SAP Adoption by Industry
                </h3>
                
                <div className="mb-6 sm:mb-8">
                  {industryData.map((industry, index) => (
                    <div key={index} className="mb-3 sm:mb-4">
                      <div className="flex justify-between items-center mb-1 sm:mb-2">
                        <span className="font-medium text-gray-700 text-sm sm:text-base">{industry.name}</span>
                        <span className="text-xs sm:text-sm font-semibold text-[#f2a624]">{industry.adoption}%</span>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden relative">
                        <div
                          className="h-full bg-gradient-to-r from-[#f2a624] to-[#462ded] rounded-full transition-all duration-1000 ease-in-out"
                          style={{
                            width: isVisible ? `${industry.adoption}%` : '0%',
                            transitionDelay: `${0.5 + index * 0.2}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button className="w-full sm:w-auto bg-[#462ded] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded font-semibold shadow-lg shadow-[#462ded]/30 hover:bg-[#f2a624] hover:shadow-[#f2a624]/40 hover:-translate-y-1 transition-all duration-300 uppercase tracking-wider text-xs sm:text-sm cursor-pointer border-none touch-manipulation">
                    Explore SAP Courses
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBars;