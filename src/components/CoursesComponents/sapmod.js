"use client";

import React, { useState, useEffect } from "react";
import Btnform from "@/components/HomePage/Btnform";
import BackgroundAnimation from "@/components/Common/BackgroundAnimation";

// SapModComponent receives data prop directly from parent
const SapModComponent = ({ data }) => {
  const [curriculum, setCurriculum] = useState([]);
  const [stats, setStats] = useState([]);
  const [openIdx, setOpenIdx] = useState(0);
  const [cardPopStates, setCardPopStates] = useState([]);
  const [hoveredModuleIdx, setHoveredModuleIdx] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [courseImage, setCourseImage] = useState("");
  const [isTouch, setIsTouch] = useState(false);

  // Detect if device supports touch
  useEffect(() => {
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    
    checkTouch();
    window.addEventListener('touchstart', checkTouch, { once: true });
    
    return () => {
      window.removeEventListener('touchstart', checkTouch);
    };
  }, []);

  // Define course images
  const courseImages = {
    sap: "https://res.cloudinary.com/dudu879kr/image/upload/v1752142527/SAP_cderp_bperso.webp",
    digitalMarketing: "https://res.cloudinary.com/drvug594q/image/upload/v1754983203/Digital_marketing_bnmku7.webp",
    default: "https://res.cloudinary.com/dudu879kr/image/upload/v1752142527/SAP_cderp_bperso.webp"
  };

  // Function to determine course type and set appropriate image
  const setCourseImageBasedOnType = (courseData) => {
    if (!courseData) return;

    const rawTitle = courseData.title || courseData.title2 || "";
    const cleanTitle = rawTitle.replace(/<[^>]*>/g, "").toLowerCase();
    const title = cleanTitle;
    const description = (courseData.description || "").toLowerCase();
    const courseType = courseData.courseType?.toLowerCase() || "";
    const slug = courseData.slug?.toLowerCase() || "";
    const summary = (courseData.summary || "").toLowerCase();

    console.log('=== COURSE DETECTION DEBUG ===');
    console.log('Raw Course Data:', courseData);
    console.log('Processed Values:', {
      rawTitle: courseData.title || courseData.title2,
      cleanTitle: title,
      description,
      courseType,
      slug,
      summary
    });

    // Check for Digital Marketing courses first (more specific)
    if (
      title.includes('digital marketing') || 
      title.includes('digital') || 
      title.includes('marketing') || 
      description.includes('digital marketing') || 
      description.includes('digital') ||
      description.includes('marketing') ||
      summary.includes('digital marketing') ||
      summary.includes('digital') ||
      summary.includes('marketing') ||
      courseType.includes('marketing') ||
      courseType.includes('digital') ||
      slug.includes('marketing') ||
      slug.includes('digital')
    ) {
      console.log('✅ DETECTED: Digital Marketing Course');
      setCourseImage(courseImages.digitalMarketing);
    }
    // Check for SAP courses
    else if (title.includes('sap') || description.includes('sap') || courseType.includes('sap') || slug.includes('sap')) {
      console.log('✅ DETECTED: SAP Course');
      setCourseImage(courseImages.sap);
    }
    // Add more conditions for other course types
    else {
      console.log('⚠️ NO MATCH: Using Default Image');
      setCourseImage(courseImages.default);
    }
    console.log('=== END DEBUG ===');
  };

  // Transform data when the data prop changes
  useEffect(() => {
    if (!data) return;

    // Set course image based on course type
    setCourseImageBasedOnType(data);

    // Transform curriculum data - FIXED LOGIC
    let transformedCurriculum = [];

    console.log('=== CURRICULUM TRANSFORMATION DEBUG ===');
    console.log('Input data structure:', data);

    // Check different data structures for curriculum
    if (data.overview?.modules && Array.isArray(data.overview.modules)) {
      console.log('Using overview.modules structure');
      transformedCurriculum = data.overview.modules.map((mod, index) => {
        console.log(`Module ${index}:`, mod);
        return {
          title: mod.title || mod.name, // Check both title and name
          labelColor: "bg-lime-300",
          duration: mod.duration || "1-2 weeks",
          topics: Array.isArray(mod.subtopics) ? mod.subtopics : [], // Ensure it's an array
        };
      });
    } else if (data.modules && Array.isArray(data.modules)) {
      console.log('Using direct modules structure');
      transformedCurriculum = data.modules.map((mod, index) => {
        console.log(`Module ${index}:`, mod);
        return {
          title: mod.title || mod.name, // Check both title and name
          labelColor: "bg-lime-300",
          duration: mod.duration || "1-2 weeks",
          topics: Array.isArray(mod.subtopics) ? mod.subtopics : [], // Ensure it's an array
        };
      });
    } else if (typeof data.modules === 'object' && data.modules !== null) {
      // Handle case where modules is an object with string keys
      console.log('Using modules object structure');
      const moduleKeys = Object.keys(data.modules);
      transformedCurriculum = moduleKeys.map((key, index) => {
        const mod = data.modules[key];
        console.log(`Module ${index} (${key}):`, mod);
        return {
          title: mod.title || mod.name || key,
          labelColor: "bg-lime-300", 
          duration: mod.duration || "1-2 weeks",
          topics: Array.isArray(mod.subtopics) ? mod.subtopics : 
                   Array.isArray(mod.topics) ? mod.topics : [],
        };
      });
    }

    console.log('Final transformed curriculum:', transformedCurriculum);
    console.log('=== END CURRICULUM DEBUG ===');

    setCurriculum(transformedCurriculum);

    // Transform stats data from features
    const features = data.features || [];
    const transformedStats = features.map((feature) => ({
      value: feature.label,
      label: feature.description,
      icon: feature.description?.toLowerCase().includes("languages") ? (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="12" fill="#e3eaf2" />
          <path
            d="M12 7v10m5-5H7"
            stroke="#4a90e2"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <rect width="24" height="24" rx="12" fill="#e3eaf2" />
          <path
            d="M12 8v4l3 3"
            stroke="#4a90e2"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    }));

    setStats(transformedStats);
    setCardPopStates(Array(transformedCurriculum.length).fill(false));
    setOpenIdx(0);
  }, [data]);

  // Card animation effect
  useEffect(() => {
    if (curriculum.length > 0) {
      let timeouts = [];
      for (let i = 0; i < curriculum.length; i++) {
        timeouts.push(
          setTimeout(() => {
            setCardPopStates((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }, i * 120)
        );
      }
      return () => timeouts.forEach(clearTimeout);
    }
  }, [curriculum]);

  // Form handling
  const handleDownloadBrochureClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFormSubmit = () => {
    setFormSubmitted(true);
    setShowForm(false);

    setTimeout(() => {
      if (data && data.downloadLink) {
        const link = document.createElement("a");
        link.href = data.downloadLink;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("Download link is not available.");
      }
    }, 1000);
  };

  // Function to get alt text based on course type
  const getImageAltText = () => {
    const title = (data?.title || data?.title2 || "").toLowerCase();
    if (title.includes('sap')) return "SAP Course";
    if (title.includes('marketing')) return "Digital Marketing Course";
    return "Course Image";
  };

  // Handle module interaction - separated for touch vs mouse
  const handleModuleInteraction = (idx, isHover = false) => {
    if (isTouch && isHover) return; // Skip hover events on touch devices
    
    if (isHover) {
      setOpenIdx(idx);
      setHoveredModuleIdx(idx);
    } else {
      // Click/tap handler
      setOpenIdx(openIdx === idx ? -1 : idx);
    }
  };

  const handleModuleLeave = () => {
    if (isTouch) return; // Skip mouse leave on touch devices
    setHoveredModuleIdx(null);
  };

  // No data state
  if (!data) {
    return (
      <div className="w-full bg-[#2d2d2d] mb-16 sm:mb-20 lg:mb-24">
        <div className="flex items-center justify-center py-16">
          <div className="text-white text-xl text-center">
            No SAP Modules data available (check masterData.js or prop passing).
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mb-4 sm:mb-4 lg:mb-4 relative">
      <BackgroundAnimation />
      <div className="flex flex-col items-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 min-h-[600px] relative z-10">
        {/* Header */}
        <div className="w-full max-w-6xl mb-6 sm:mb-8">
          <h1
            className="text-4xl font-extrabold tracking-wider mb-3 text-white text-center"
            style={{
              textShadow: '0 0 16px #fff, 0 0 32px #80d8ff',
              fontFamily: 'Montserrat, Quicksand, Arial, sans-serif',
              letterSpacing: '0.12em',
              lineHeight: 1.1
            }}
          >
            SYLLABUS
          </h1>
          <div 
            style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #a76b2e, #f18436)',
              margin: '5px auto 10px',
              borderRadius: '2px',
              marginBottom: '1rem'
            }}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 w-full max-w-6xl items-start">
          {/* Left Card */}
          <div
            className="group bg-[#162e5b] rounded-lg p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-6 w-full md:w-96 text-white shadow-lg relative overflow-hidden"
            style={{ minHeight: "500px" }}
          >
            {/* Neon blue grid effect */}
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-100 transition-opacity duration-500"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(75,121,210,0.15) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(75,121,210,0.15) 0 1px, transparent 1px 40px)",
                boxShadow: "0 0 40px 10px #4b79d2",
                filter: "drop-shadow(0 0 12px #4b79d2)",
                borderRadius: "inherit",
                transition: "opacity 0.5s",
              }}
            />

            {/* Content above the effect */}
            <div className="relative z-10 flex flex-col gap-4">
              <div>
                <h2
                  className="text-lg sm:text-xl font-bold leading-tight mb-2"
                  style={{ color: "#ffffff" }}
                >
                  {(data.title2 || data.title || "Course Title").replace(
                    /<[^>]+>/g,
                    ""
                  )}
                </h2>

                <p className="text-xs sm:text-sm text-blue-100 mb-4">
                  {data.description || "Course description"}
                  <br className="hidden sm:block" />
                  {data.summary || "Course summary"}
                </p>
              </div>

              {/* Stats from features */}
              <div className="flex flex-col gap-2 w-full max-w-xs mx-auto">
                {stats
                  .filter((stat) => stat.label !== "Case Studies & Projects")
                  .map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-white/80 rounded-xl p-2 px-3 w-full text-xs scale-105 shadow-lg transition-all duration-300"
                      style={{ minWidth: 120, color: "#23608a" }}
                    >
                      <div className="w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center">
                        {stat.icon}
                      </div>
                      <div>
                        <div
                          className="text-sm sm:text-lg font-bold"
                          style={{ color: "#23608a" }}
                        >
                          {stat.value}
                        </div>
                        <div
                          className="text-xs sm:text-sm font-semibold"
                          style={{ color: "#23608a" }}
                        >
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Dynamic Course Image */}
              <div className="mt-4 flex justify-center">
                {courseImage && (
                  <img
                    src={courseImage}
                    alt={getImageAltText()}
                    className="w-full max-w-xs rounded-lg shadow-lg transition-opacity duration-300"
                    style={{ maxWidth: "100%" }}
                    onLoad={() => {
                      console.log('🖼️ Image loaded successfully:', courseImage);
                    }}
                    onError={(e) => {
                      console.log('❌ Image failed to load:', courseImage);
                      console.log('🔄 Falling back to default image');
                      if (e.target.src !== courseImages.default) {
                        e.target.src = courseImages.default;
                      }
                    }}
                  />
                )}
              </div>

              {/* Download Brochure button for desktop */}
              <button
                onClick={handleDownloadBrochureClick}
                className="mt-4 font-bold rounded-full py-2 px-6 transition-all duration-200 items-center justify-center gap-2 text-base hidden sm:flex shadow-lg border-0 bg-[#091327] text-white"
                style={{ boxShadow: "0 4px 16px 0 rgba(0,0,0,0.18)" }}
              >
                Download Syllabus
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="16"
                    rx="4"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M16 3v4M8 3v4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>

              {/* Note master */}
              {data.noteMaster && (
                <p className="text-white text-center text-sm mt-2">
                  {data.noteMaster}
                </p>
              )}
            </div>
          </div>

          {/* Progress Bar - Hidden on mobile and tablet */}
          <div className="hidden lg:flex flex-col items-center justify-center px-4 mt-2">
            <ProgressBar steps={curriculum.length} activeStep={openIdx} />
          </div>

          {/* Right Curriculum Content */}
          <div className="flex-1 w-full max-w-3xl relative">
            <div className="relative z-10 flex flex-col px-1 sm:px-0">
              {curriculum.map((mod, idx) => (
                <div
                  key={`${mod.title}-${idx}`}
                  className={`flex mb-2 items-start transition-all duration-500 relative ${
                    cardPopStates[idx]
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90"
                  }`}
                  style={{
                    minHeight: "52px",
                    marginLeft: "2px",
                    position: "relative",
                    transitionDelay: `${idx * 80}ms`,
                  }}
                  // Only add mouse events for non-touch devices
                  {...(!isTouch && {
                    onMouseEnter: () => handleModuleInteraction(idx, true),
                    onMouseLeave: handleModuleLeave
                  })}
                  onClick={() => handleModuleInteraction(idx, false)}
                >
                  {/* Blue card background */}
                  <div
                    className="absolute -left-0.5 top-0.5 w-full bg-[#4b79d2] rounded-xl shadow-lg"
                    style={{
                      height: "calc(70% - 2px)",
                      boxShadow: "0 2px 8px 0 #4b79d2",
                      zIndex: 10,
                    }}
                  />

                  {/* Module Card */}
                  <div
                    className="flex-1 bg-white rounded-[10px] shadow transition-all relative"
                    style={{
                      width: "100%",
                      marginLeft: 0,
                      paddingLeft: 0,
                      zIndex: 20,
                    }}
                  >
                    <div className="flex items-center justify-between px-2 sm:px-4 py-2 cursor-pointer select-none relative">
                      <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                        <span className="text-xs font-bold px-2 py-1 rounded text-gray-900 whitespace-nowrap">
                          #{idx + 1}
                        </span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base truncate relative">
                          {mod.title}
                          {/* Hover tooltip for subtopics - Only show on desktop non-touch devices */}
                          {!isTouch &&
                            hoveredModuleIdx === idx &&
                            mod.topics &&
                            mod.topics.length > 0 && (
                              <div
                                className="absolute left-0 top-full mt-2 w-80 bg-white text-black rounded-lg shadow-2xl p-4 border border-gray-200"
                                style={{ zIndex: 1000 }}
                              >
                                <div className="text-sm font-semibold mb-2 text-blue-600">
                                  Module Topics:
                                </div>
                                <ul className="space-y-1 text-xs text-gray-700">
                                  {mod.topics.map((topic, topicIdx) => (
                                    <li
                                      key={topicIdx}
                                      className="leading-snug flex items-start"
                                    >
                                      <span className="text-lime-400 mr-2 flex-shrink-0">•</span>
                                      <span>{topic}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                        <span className="text-xs text-gray-700 font-semibold flex items-center gap-1">
                          <svg
                            width="14"
                            height="14"
                            className="sm:w-4 sm:h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="#666666"
                              strokeWidth="2"
                            />
                            <path
                              d="M12 8v4l2 2"
                              stroke="#666666"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="hidden sm:inline">
                            {mod.duration}
                          </span>
                          <span className="sm:hidden text-xs">
                            {mod.duration.replace(" Weeks", "w")}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Expanded content for subtopics (click to expand) - IMPROVED */}
                    {openIdx === idx && mod.topics && mod.topics.length > 0 && (
                      <div className="px-4 sm:px-8 pb-4 pt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-800">
                          {mod.topics.map((topic, topicIdx) => (
                            <div
                              key={`${topic}-${topicIdx}`}
                              className="flex items-start py-1"
                            >
                              <span className="text-lime-400 mr-2 flex-shrink-0 mt-1">•</span>
                              <span className="leading-relaxed">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Show message if no topics available - ADDED */}
                    {openIdx === idx && (!mod.topics || mod.topics.length === 0) && (
                      <div className="px-4 sm:px-8 pb-4 pt-2 text-sm text-gray-500 italic">
                        No detailed topics available for this module.
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Note */}
              {curriculum.length > 0 && (
                <p className="text-center text-white text-sm mt-6">
                  *Note: To see the complete Modules Click on 'Download
                  Syllabus' button
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Download Brochure button */}
        <div className="flex sm:hidden w-full justify-center items-center mt-6 mb-4">
          <button
            onClick={handleDownloadBrochureClick}
            className="font-bold rounded-full py-3 px-6 transition-all duration-200 flex items-center justify-center gap-2 text-base mx-auto shadow-lg border-0 bg-[#091327] text-white"
            style={{ boxShadow: "0 4px 16px 0 rgba(0,0,0,0.18)" }}
          >
            Download Brochure
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              fill="none"
              viewBox="0 0 24 24"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="16"
                rx="4"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M16 3v4M8 3v4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M3 9h18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>

        {/* Note section */}
        {data.note && (
          <div className="w-full max-w-6xl mt-8 text-center">
            <p
              className="text-white text-sm"
              dangerouslySetInnerHTML={{
                __html: data.note.replace(/\n/g, "<br/>"),
              }}
            />
          </div>
        )}
      </div>

      {/* Simple Form Connection */}
      {showForm && (
        <Btnform onClose={handleCloseForm} onSubmit={handleFormSubmit} />
      )}

      {/* Success Message */}
      {formSubmitted && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-500">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Thank you! Download will start shortly.
          </div>
        </div>
      )}
    </div>
  );
};

function ProgressBar({ steps, activeStep }) {
  const dotSize = 16;
  const cardHeight = 74;
  const barHeight = steps * cardHeight;
  const offset = cardHeight / 2 - dotSize / 2;
  const lineTop = offset + dotSize;
  const lineHeight = (steps - 1) * cardHeight;

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ height: barHeight, width: "40px", justifyContent: "center" }}
    >
      {/* Vertical line */}
      <div
        className="absolute left-1/2"
        style={{
          top: lineTop,
          height: lineHeight,
          width: "2px",
          background: "#f3f3f3",
          transform: "translateX(-50%)",
        }}
      />

      {/* Progress dots */}
      {[...Array(steps)].map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center relative"
          style={{
            width: 24,
            position: "absolute",
            top: offset + idx * cardHeight,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
          }}
        >
          <div
            className="w-4 h-4 rounded-full border-2 transition-all duration-200"
            style={{
              background: "#f3f3f3",
              borderColor: "#f3f3f3",
              boxShadow: activeStep === idx ? "0 0 0 4px #4b79d2" : "none",
              transition: "box-shadow 0.2s",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default SapModComponent;