"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";

const Modules = ({ data, courseId, key }) => { // Add key prop to force re-render
  const [activeTab, setActiveTab] = useState("");
  const [activeModule, setActiveModule] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [bannerImage, setBannerImage] = useState("");
  const moduleRef = useRef(null);
  const observerRef = useRef(null);

  // Define course images - similar to SapModComponent
  const courseImages = {
    sap: "https://res.cloudinary.com/dudu879kr/image/upload/v1752142527/SAP_cderp_bperso.webp",
    digitalMarketing: "https://res.cloudinary.com/drvug594q/image/upload/v1754983203/Digital_marketing_bnmku7.webp",
    hr: "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/HR_course_image.webp", // Add your HR image URL
    dataVisualization: "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/Data_Visualization_course.webp", // Add your Data Viz image URL
    default: "https://res.cloudinary.com/dudu879kr/image/upload/v1752142527/SAP_cderp_bperso.webp"
  };

  // Function to determine course type and set appropriate banner image
  const setBannerImageBasedOnType = (courseData) => {
    if (!courseData) return;

    const rawTitle = courseData.title || courseData.banner?.title || "";
    const cleanTitle = rawTitle.replace(/<[^>]*>/g, "").toLowerCase();
    const title = cleanTitle;
    const description = (courseData.description || courseData.banner?.subtitle || "").toLowerCase();
    const courseType = courseData.courseType?.toLowerCase() || "";
    const slug = courseData.slug?.toLowerCase() || "";
    const summary = (courseData.summary || "").toLowerCase();
    const bannerTitle = (courseData.banner?.title || "").toLowerCase();
    const bannerSubtitle = (courseData.banner?.subtitle || "").toLowerCase();
    const technologies = courseData.banner?.technologies ? 
      courseData.banner.technologies.join(" ").toLowerCase() : "";

    console.log('=== BANNER IMAGE DETECTION DEBUG ===');
    console.log('Raw Course Data:', courseData);
    console.log('Processed Values:', {
      rawTitle: courseData.title || courseData.banner?.title,
      cleanTitle: title,
      description,
      courseType,
      slug,
      summary,
      bannerTitle,
      bannerSubtitle,
      technologies
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
      slug.includes('digital') ||
      bannerTitle.includes('digital') ||
      bannerTitle.includes('marketing') ||
      bannerSubtitle.includes('digital') ||
      bannerSubtitle.includes('marketing') ||
      technologies.includes('digital') ||
      technologies.includes('marketing')
    ) {
      console.log('✅ DETECTED: Digital Marketing Course');
      setBannerImage(courseImages.digitalMarketing);
    }
    // Check for HR courses
    else if (
      title.includes('hr') || 
      title.includes('human resource') ||
      title.includes('human resources') ||
      description.includes('hr') || 
      description.includes('human resource') ||
      description.includes('human resources') ||
      courseType.includes('hr') ||
      courseType.includes('human') ||
      slug.includes('hr') ||
      slug.includes('human') ||
      bannerTitle.includes('hr') ||
      bannerTitle.includes('human') ||
      bannerSubtitle.includes('hr') ||
      bannerSubtitle.includes('human') ||
      technologies.includes('hr') ||
      technologies.includes('human')
    ) {
      console.log('✅ DETECTED: HR Course');
      setBannerImage(courseImages.hr);
    }
    // Check for Data Visualization courses
    else if (
      title.includes('data visualization') ||
      title.includes('data viz') ||
      title.includes('visualization') ||
      title.includes('analytics') ||
      title.includes('tableau') ||
      title.includes('power bi') ||
      title.includes('dashboard') ||
      description.includes('data visualization') ||
      description.includes('visualization') ||
      description.includes('analytics') ||
      description.includes('tableau') ||
      description.includes('power bi') ||
      courseType.includes('data') ||
      courseType.includes('analytics') ||
      slug.includes('data') ||
      slug.includes('analytics') ||
      slug.includes('visualization') ||
      bannerTitle.includes('data') ||
      bannerTitle.includes('visualization') ||
      bannerTitle.includes('analytics') ||
      bannerSubtitle.includes('data') ||
      bannerSubtitle.includes('visualization') ||
      technologies.includes('tableau') ||
      technologies.includes('power bi') ||
      technologies.includes('analytics')
    ) {
      console.log('✅ DETECTED: Data Visualization Course');
      setBannerImage(courseImages.dataVisualization);
    }
    // Check for SAP courses
    else if (
      title.includes('sap') || 
      description.includes('sap') || 
      courseType.includes('sap') || 
      slug.includes('sap') ||
      bannerTitle.includes('sap') ||
      bannerSubtitle.includes('sap') ||
      technologies.includes('sap')
    ) {
      console.log('✅ DETECTED: SAP Course');
      setBannerImage(courseImages.sap);
    }
    // Add more conditions for other course types as needed
    else {
      console.log('⚠️ NO MATCH: Using Default Image');
      setBannerImage(courseImages.default);
    }
    console.log('Selected Banner Image:', bannerImage);
    console.log('=== END BANNER DEBUG ===');
  };

  // Reset component state when data changes (crucial for different courses)
  useEffect(() => {
    if (data && data.tabs && data.tabs.length > 0) {
      setActiveTab(data.tabs[0].type || `tab-${0}`);
      setActiveModule(0); // Reset to first module when data changes
      
      // Set banner image based on course type
      setBannerImageBasedOnType(data);
    }
  }, [data]); // This will trigger when different course data is passed

  // Set initial activeTab once data is available
  useEffect(() => {
    if (data && data.tabs && data.tabs.length > 0) {
      setActiveTab(data.tabs[0].type || `tab-${0}`);
    }
  }, [data]);

  // Setup intersection observer
  useEffect(() => {
    if (!moduleRef.current || observerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerRef.current.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(moduleRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  // Force visibility after timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isVisible) setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [isVisible]);

  const handleModuleClick = useCallback((moduleIndex) => {
    if (activeModule !== moduleIndex) setActiveModule(moduleIndex);
  }, [activeModule]);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setActiveModule(0);
  }, []);

  const activeContent = useMemo(() => {
    if (data && data.tabs) {
      const activeTabData = data.tabs.find(
        (tab, idx) => (tab.type || `tab-${idx}`) === activeTab
      );
      if (activeTabData?.modules?.length > activeModule) {
        return activeTabData.modules[activeModule];
      }
    }
    return null;
  }, [data, activeTab, activeModule]);

  // Function to get alt text based on course type
  const getBannerImageAltText = () => {
    const title = (data?.title || data?.banner?.title || "").toLowerCase();
    if (title.includes('sap')) return "SAP Course Banner";
    if (title.includes('marketing')) return "Digital Marketing Course Banner";
    if (title.includes('hr') || title.includes('human')) return "HR Course Banner";
    if (title.includes('data') || title.includes('visualization') || title.includes('analytics')) return "Data Visualization Course Banner";
    return "Course Banner";
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-8">
        <div className="text-center text-gray-600">
          No Modules data available (check masterData.js or prop passing).
        </div>
      </div>
    );
  }

  const currentTabData = data.tabs.find(
    (tab, idx) => (tab.type || `tab-${idx}`) === activeTab
  );

  if (!currentTabData) {
    return (
      <div className="flex items-center justify-center min-h-[400px] p-8">
        <div className="text-center text-red-600">
          Selected tab data not found.
        </div>
      </div>
    );
  }

  return (
    <div
      key={`modules-${courseId || 'default'}-${data?.title || 'untitled'}`} // Force re-render with unique key
      ref={moduleRef}
      className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-lg overflow-hidden"
    >
      {/* Banner - with dynamic image based on course type */}
      {data.banner && (
        <div className="mb-8" key={`banner-${courseId || 'default'}`}>
          <div className="flex flex-col lg:flex-row items-center gap-6 bg-gray-50 rounded-lg p-6 border border-gray-200">
            {/* Use dynamic banner image if available, otherwise use original */}
            <img
              src={bannerImage || data.banner?.image}
              alt={getBannerImageAltText()}
              className="w-full lg:w-1/3 rounded-lg object-cover"
              onLoad={() => {
                console.log('🖼️ Banner image loaded successfully:', bannerImage || data.banner?.image);
              }}
              onError={(e) => {
                console.log('❌ Banner image failed to load:', bannerImage || data.banner?.image);
                console.log('🔄 Falling back to default image');
                if (e.target.src !== courseImages.default) {
                  e.target.src = courseImages.default;
                }
              }}
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {data.banner?.title}
              </h2>
              <p className="text-gray-600 mt-2">
                {data.banner?.subtitle}
              </p>
              {data.banner?.technologies.length > 0 && (
                <ul className="flex flex-wrap gap-2 mt-4">
                  {data.banner?.technologies.map((tech, index) => (
                    <li
                      key={`${courseId || 'default'}-tech-${index}-${tech}`}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
          {data.title}
        </h1>
      </div>

      {/* Tabs */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 border-b-2 border-gray-200 overflow-x-auto">
          {data.tabs.map((tab, idx) => {
            const tabId = tab.type || `tab-${idx}`;
            return (
              <div
                key={`${courseId}-${tabId}`} // Unique key per course
                className={`flex-1 min-w-0 p-3 sm:p-4 cursor-pointer transition-all duration-300 rounded-t-lg ${
                  activeTab === tabId
                    ? "bg-blue-600 text-white border-b-2 border-blue-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => handleTabChange(tabId)}
              >
                <div className="text-center">
                  <p className="font-semibold text-sm sm:text-base mb-1">
                    {tab.type
                      ? tab.type.charAt(0).toUpperCase() + tab.type.slice(1)
                      : "Curriculum"}
                  </p>
                  {tab.duration && (
                    <span
                      className={`text-xs sm:text-sm ${
                        activeTab === tabId ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {tab.duration}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 sm:mb-8">
        {/* Modules List */}
        <div className="order-2 lg:order-1">
          <div className="space-y-3 sm:space-y-4 max-h-[500px] lg:max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {currentTabData.modules.map((module, index) => (
              <div
                key={`${courseId}-module-${index}`} // Unique key per course
                className={`p-4 sm:p-5 border-2 rounded-lg cursor-pointer transition-all duration-300 transform ${
                  activeModule === index
                    ? "border-blue-500 bg-blue-50 shadow-md scale-[1.02]"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm hover:scale-[1.01] text-gray-900 hover:text-black"
                }`}
                onClick={() => handleModuleClick(index)}
              >
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    MODULE - {index + 1}
                  </p>
                  <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 leading-tight line-clamp-2 hover:text-black">
                    {module.title}
                  </h2>
                  <span className="inline-block text-sm sm:text-base text-gray-600 font-medium">
                    {module.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Module Details */}
        <div className="order-1 lg:order-2">
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6 lg:p-8 border border-gray-200 min-h-[300px] lg:min-h-[500px]">
            {activeContent ? (
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">
                  {activeContent.title}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">Duration:</span>
                  <span className="text-gray-600 font-medium">
                    {activeContent.duration}
                  </span>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    What you'll learn:
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {activeContent.content.map((item, index) => (
                      <li
                        key={`${courseId}-content-${index}`} // Unique key per course
                        className="flex items-start gap-3 text-sm sm:text-base text-gray-700 leading-relaxed"
                      >
                        <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base">
                    Select a module to view details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-6 sm:pt-8">
        <div className="text-center">
          <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base">
            Download Curriculum
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modules;