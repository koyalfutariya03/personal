// components/CourseComponentLoader.js (Updated)
// Removed from src/app/(routes)/[slug]/page.js (as it imports specific course pages)

"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Loader from "./Loader"; // Assuming Loader is in the same directory or common
import { coursesData } from "@/lib/masterData"; // Import your master data

const CourseComponentLoader = ({ formattedCourse, city, course }) => {
  // `course` prop here is the original normalized slug (e.g., 'sap-fico', 'core-hr')
  // This is what we use to look up in coursesData.

  const [currentCity, setCurrentCity] = useState(city);
  const [componentLoaded, setComponentLoaded] = useState(false);
  const componentRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    setCurrentCity(city);
    // When city changes, force re-evaluation of componentLoaded state to potentially re-trigger lazy loading
    setComponentLoaded(false); 
  }, [city]);

  useEffect(() => {
    if (!observerRef.current && componentRef.current && !componentLoaded) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            setComponentLoaded(true);
            observerRef.current.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observerRef.current.observe(componentRef.current);
    }
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [componentLoaded]);

  useEffect(() => {
    // Fallback for very fast loads or small screens where IntersectionObserver might not fire promptly
    const timer = setTimeout(() => {
      if (!componentLoaded) {
        setComponentLoaded(true);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [componentLoaded]);

  let SpecificCoursePage = null; // Renamed from CourseComponent to avoid confusion with shared components

  console.log(`CourseComponentLoader: course slug for lookup: "${course}"`);
  console.log(`CourseComponentLoader: city received: "${city}"`);

  // Get the componentPath from masterData based on the course slug
  const courseInfo = coursesData[course];
  const componentPath = courseInfo?.componentPath;

  if (componentPath) {
    try {
      // Use dynamic import with the path from masterData
      SpecificCoursePage = dynamic(() => import(`@/app/(routes)/${componentPath}`), {
        ssr: false, // Ensure these are client-side components as per your current setup
        loading: () => <Loader />,
      });
      console.log(`CourseComponentLoader: Dynamically importing: "@/app/(routes)/${componentPath}"`);
    } catch (error) {
      console.error(`Error dynamically loading component for ${course}:`, error);
      SpecificCoursePage = dynamic(() => import("@/app/(routes)/default-page.js"), {
        ssr: false,
        loading: () => <Loader />,
      });
    }
  } else {
    console.warn(`CourseComponentLoader: No componentPath found in masterData for course: "${course}". Loading default-page.`);
    SpecificCoursePage = dynamic(() => import("@/app/(routes)/default-page.js"), {
      ssr: false,
      loading: () => <Loader />,
    }); // Fallback to default page
  }

  return (
    <div ref={componentRef} style={{ minHeight: "100vh" }}>
      {componentLoaded && SpecificCoursePage ? (
        // Pass props to the specific course page component if it expects them
        // Your existing course page components (like Sap-Courses/SAP-FICO/page.js)
        // do not currently take props, they directly render shared components.
        // If they ever need the city/course, pass it here.
        <SpecificCoursePage city={currentCity} course={course} />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CourseComponentLoader;