// components/CoursesComponents/RelatedCourses.js (Updated CoursesRelated)
"use client";

import { useState, useEffect, useMemo, useCallback } from "react"; // Removed useContext
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "@/styles/CoursesComponents/RelatedCourses.module.css";
import ContactForm from "@/components/HomePage/Btnform"; // Assuming Btnform is your ContactForm
// Removed: import { CityContext } from "@/context/CityContext"; // Not needed
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import dynamic from "next/dynamic";

// CoursesRelated now directly receives the 'data' prop
const CoursesRelated = ({ data, currentCityName }) => {
  // Added currentCityName prop to get actual city
  // Removed: [relatedCourses, setRelatedCourses] = useState([]);
  // Removed: [loading, setLoading] = useState(true);
  // Removed: [error, setError] = useState(null);
  // Removed: const { city } = useContext(CityContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const router = useRouter();

  // Comprehensive course name to URL mapping (moved to masterData.js or a separate utility if needed globally)
  // For now, let's keep it here for this specific component, but ideally it's centralized.
  const courseNameToUrlMapping = {
    // Data Science & Analytics
    "Chat GPT & AI": "chatgpt-course",
    "Masters in Data Science": "data-science-course",
    "Master in Data Science": "data-science-course",
    "Masters in Data Analytics": "data-analytics-course",
    "Business Analytics": "business-analytics-course",

    // Development & Programming
    "Full-Stack Python": "python-course",
    "Full-Stack Java": "java-course",
    "Reactjs Framework": "reactjs-framework-course", // Adjusted to be more specific
    "Mern Stack": "mern-stack-course",
    "UI/UX Design": "ui-ux-course",

    // Data Visualization & BI
    Tableau: "tableau-course",
    PowerBI: "power-bi-course",
    "Power BI": "power-bi-course",
    SQL: "sql-course",

    // CRM & Sales
    Salesforce: "salesforce-training",

    // SAP Modules - ENSURE THESE SLUGS MATCH YOUR MASTERDATA.JS SLUGS
    "SAP HANA": "sap-s4-hana-course",
    "SAP BW/BI": "sap-bwbi-course",
    "SAP BASIS": "sap-basis-course",
    "SAP ABAP": "sap-abap-course",
    "SAP FICO": "sap-fico-course",
    "SAP MM": "sap-mm-course",
    "SAP SD": "sap-sd-course",
    "SAP HR/HCM": "sap-hr-hcm-course",
    "SAP PM": "sap-pm-course",
    "SAP PP": "sap-pp-course",
    "SAP PS": "sap-ps-course",
    "SAP QM": "sap-qm-course",
    "SAP SCM": "sap-scm-course",
    "SAP EWM": "sap-ewm-course",
    "SAP SUCCESSFACTOR": "sap-successfactors-course",
    "SAP ARIBA": "sap-ariba-course",

    // HR & Management
    "HR Training": "hr-training-course",
    "HR Analytics": "hr-analytics-course",
    "Core HR": "core-hr-course",
    "HR Management": "hr-management-course",
    "HR Payroll": "hr-payroll-course",
    "HR Generalist": "hr-generalist-course",

    // Digital Marketing
    "Digital Marketing": "digital-marketing-course",

    // IT & General
    "IT Course": "it-course",
    "Data Visualisation": "data-visualization-course",

    // Add any other course mappings you might have
  };

  useEffect(() => {
    const updateScreenSize = () => {
      setViewportWidth(window.innerWidth);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // Removed: useEffect for data fetching and localStorage logic.
  // Data is now expected in the 'data' prop.

  // Function to normalize city name for URL
  const normalizeCityForUrl = (cityName) => {
    return cityName.toLowerCase().replace(/\s+/g, "-");
  };

  // Function to handle course click and redirect
  const handleCourseClick = useCallback(
    (courseName) => {
      // Look up the base slug for the course
      const courseBaseSlug = courseNameToUrlMapping[courseName];

      if (courseBaseSlug && currentCityName) {
        const normalizedCity = normalizeCityForUrl(currentCityName);
        // Construct the URL using the base slug and normalized city
        const redirectUrl = `/${courseBaseSlug}-in-${normalizedCity}`; // Adjust this pattern if your URLs are different

        console.log(`Redirecting to: ${redirectUrl}`); // For debugging
        router.push(redirectUrl);
      } else {
        console.warn(
          `No URL mapping found for course: ${courseName} or city: ${currentCityName}`
        );
        setSelectedCourse(courseName);
        setShowModal(true); // Fallback to showing modal if URL can't be formed
      }
    },
    [currentCityName, router, courseNameToUrlMapping]
  ); // Depend on currentCityName

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedCourse(null);
  }, []);

  const handleSelect = useCallback((selectedIndex) => {
    setActiveIndex(selectedIndex);
  }, []);

  const renderRelatedCourses = useMemo(() => {
    if (!data || !data.items || data.items.length === 0) return null; // Use 'data.items'

    const relatedCoursesToRender = data.items; // Use data.items directly
    // Align with CSS breakpoints
    let cardsPerSlide = 5; // default desktop
    if (viewportWidth <= 480) {
      cardsPerSlide = 1; // small mobile
    } else if (viewportWidth <= 768) {
      cardsPerSlide = 2; // mobile
    } else if (viewportWidth <= 1024) {
      cardsPerSlide = 3; // tablet
    }
    const slides = [];

    for (let i = 0; i < relatedCoursesToRender.length; i += cardsPerSlide) {
      slides.push(
        <Carousel.Item key={i}>
          <div className={styles.relatedCoursesGrid}>
            {relatedCoursesToRender
              .slice(i, i + cardsPerSlide)
              .map((relcourse, index) => (
                <div
                  key={index}
                  className={styles.relatedCourseCard}
                  onClick={() => handleCourseClick(relcourse.name)}
                  style={{ cursor: "pointer" }}
                  title={`Click to view ${relcourse.name} course in ${currentCityName}`} // Helpful tooltip
                >
                  <div className={styles.relatedIconContainer}>
                    {relcourse.icon.endsWith(".mp4") ? (
                      <video
                        src={relcourse.icon}
                        alt={relcourse.alt}
                        className={styles.relatedCourseIcon}
                        loop
                        autoPlay
                        muted
                      />
                    ) : (
                      <Image
                        src={relcourse.icon}
                        alt={relcourse.alt}
                        width={100}
                        height={100}
                        className={styles.relatedCourseIcon}
                      />
                    )}
                  </div>
                  <h3>{relcourse.name}</h3>
                  <p>{relcourse.description}</p>
                </div>
              ))}
          </div>
        </Carousel.Item>
      );
    }

    return slides;
  }, [data, handleCourseClick, viewportWidth, currentCityName]); // Re-render on viewportWidth changes

  // Simplified loading/error handling as data is passed directly
  if (!data) {
    return null;
  }
  // No separate error state, as `data` would be null if there was an upstream error.

  return (
    <div className={styles.relatedCoursesContainer}>
      <div className={styles.relatedCoursesTitle}>
        <h2 className={styles.relatedCoursesTitleh2}>{data.title}</h2>{" "}
        {/* Use data.title */}
      </div>
      <Carousel
        activeIndex={activeIndex}
        onSelect={handleSelect}
        interval={3000}
        indicators={true}
        controls={true}
        pause="hover"
      >
        {renderRelatedCourses}
      </Carousel>

      {showModal && (
        <ContactForm onClose={handleCloseModal} course={selectedCourse} />
      )}
    </div>
  );
};

// Removed the dynamic wrapper here, as it's a client component by default and `[slug]/page.js` handles client-only wrapper for all.
export default CoursesRelated;
