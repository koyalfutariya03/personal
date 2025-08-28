// src/components/CitySitemap/CityCoursePage.js
"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import styles from "@/styles/CitySitemap/CityCoursePage.module.css";

// Move course data outside component to make it static
const getCourseCategories = (city) => [
  {
    id: "sap",
    name: "SAP S/4 HANA Courses",
    subcategories: [
      {
        title: "SAP Functional",
        courses: [
          { name: "SAP", slug: `/sap-course-in-${city}` },
          { name: "SAP FICO", slug: `/sap-fico-course-in-${city}` },
          { name: "SAP Ariba", slug: `/sap-ariba-course-in-${city}` },
          { name: "SAP MM", slug: `/sap-mm-course-in-${city}` },
          { name: "SAP SD", slug: `/sap-sd-course-in-${city}` },
          { name: "SAP HR/HCM", slug: `/sap-hr-hcm-course-in-${city}` },
          { name: "SAP PP", slug: `/sap-pp-course-in-${city}` },
          { name: "SAP QM", slug: `/sap-qm-course-in-${city}` },
          { name: "SAP PM", slug: `/sap-pm-course-in-${city}` },
          { name: "SAP PS", slug: `/sap-ps-course-in-${city}` },
          { name: "SAP EWM", slug: `/sap-ewm-course-in-${city}` },
          { name: "SAP SCM", slug: `/sap-scm-course-in-${city}` },
          { name: "SAP SUCCESSFACTOR", slug: `/sap-successfactors-course-in-${city}` },
        ],
      },
      {
        title: "SAP Technical",
        courses: [
          { name: "SAP ABAP", slug: `/sap-abap-course-in-${city}` },
          { name: "SAP S/4 HANA", slug: `/sap-s4-hana-course-in-${city}` },
          { name: "SAP BW/BI", slug: `/sap-bwbi-course-in-${city}` },
          { name: "SAP BASIS", slug: `/sap-basis-course-in-${city}` },
        ],
      },
    ],
  },
  {
    id: "it",
    name: "IT Courses",
    subcategories: [
      {
        title: "Data Science",
        courses: [
          { name: "MASTERS IN DATA ANALYTICS", slug: `/data-analytics-course-in-${city}` },
          { name: "MASTERS IN DATA SCIENCE", slug: `/data-science-course-in-${city}` },
          { name: "MASTERS IN BUSINESS ANALYTICS", slug: `/business-analytics-course-in-${city}` },
          { name: "CHAT GPT & AI", slug: `/chatgpt-course-in-${city}` },
        ],
      },
    ],
    courses: [
      { name: "IT Course", slug: `/it-course-in-${city}` },
      { name: "Full Stack Training", slug: `/full-stack-developer-course-in-${city}` },
      { name: "JAVA", slug: `/java-course-in-${city}` },
      { name: "MERN Stack", slug: `/mern-stack-course-in-${city}` },
      { name: "UI/UX Design", slug: `/ui-ux-course-in-${city}` },
      { name: "Python", slug: `/python-course-in-${city}` },
      { name: "Salesforce", slug: `/salesforce-training-in-${city}` },
    ],
  },
  {
    id: "data-viz",
    name: "Data Visualisation Courses",
    courses: [
      { name: "Data Visualisation Course", slug: `/data-visualisation-course-in-${city}` },
      { name: "Tableau", slug: `/tableau-training-in-${city}` },
      { name: "Power BI", slug: `/power-bi-course-in-${city}` },
      { name: "SQL", slug: `/sql-course-in-${city}` },
    ],
  },
  {
    id: "digital",
    name: "Digital Marketing Courses",
    courses: [
      { name: "Advance Digital Marketing", slug: `/digital-marketing-course-in-${city}` },
      { name: "Pay Per Click Training", slug: `/digital-marketing-course-in-${city}#pay-per-click` },
      { name: "Search Engine Optimization", slug: `/digital-marketing-course-in-${city}#search-engine-optimization` },
      { name: "Social Media Marketing", slug: `/digital-marketing-course-in-${city}#social-media-marketing` },
      { name: "Advance Google Analytics Training", slug: `/digital-marketing-course-in-${city}#advance-analytics` },
    ],
  },
  {
    id: "hr",
    name: "HR Courses",
    courses: [
      { name: "HR Training", slug: `/hr-training-course-in-${city}` },
      { name: "Core HR", slug: `/core-hr-course-in-${city}` },
      { name: "HR Payroll", slug: `/hr-payroll-course-in-${city}` },
      { name: "HR Management", slug: `/hr-management-course-in-${city}` },
      { name: "HR Generalist", slug: `/hr-generalist-course-in-${city}` },
      { name: "HR Analytics", slug: `/hr-analytics-course-in-${city}` },
    ],
  },
];

// Server-side component for SEO
const ServerSideLinks = ({ city, courseCategories }) => (
  <div className={styles.seoLinksContainer} style={{ display: 'none' }}>
    {courseCategories.map((category) => (
      <div key={category.id}>
        <h3>{category.name} in {city}</h3>
        {category.subcategories && category.subcategories.map((subcategory, index) => (
          <div key={index}>
            <h4>{subcategory.title}</h4>
            {subcategory.courses.map((course, idx) => (
              <Link key={idx} href={course.slug}>
                {course.name} in {city}
              </Link>
            ))}
          </div>
        ))}
        {category.courses && category.courses.map((course, idx) => (
          <Link key={idx} href={course.slug}>
            {course.name} in {city}
          </Link>
        ))}
      </div>
    ))}
  </div>
);

const CityCoursePage = ({ city, cityInfo }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  
  const courseCategories = getCourseCategories(city);

  // Initialize filtered categories on first render
  useEffect(() => {
    setFilteredCategories(courseCategories);
  }, []);

  // Filter courses by search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCategories(courseCategories);
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    
    const filtered = courseCategories.filter(category => {
      // Check category name
      if (category.name.toLowerCase().includes(lowerSearchTerm)) {
        return true;
      }

      // Check direct courses
      if (category.courses && category.courses.some(course => 
        course.name.toLowerCase().includes(lowerSearchTerm)
      )) {
        return true;
      }

      // Check subcategory courses
      if (category.subcategories && category.subcategories.some(sub => 
        sub.title.toLowerCase().includes(lowerSearchTerm) || 
        sub.courses.some(course => course.name.toLowerCase().includes(lowerSearchTerm))
      )) {
        return true;
      }

      return false;
    });

    setFilteredCategories(filtered);
  }, [searchTerm]);

  return (
    <div className={styles.cityPageContainer}>
      {/* Server-side links for SEO - hidden from users but visible to crawlers */}
      <ServerSideLinks city={city} courseCategories={courseCategories} />
      
      {/* City Header Section */}
      <div className={styles.cityHeader}>
        <h1>Courses in {cityInfo.name}</h1>
        <p>{cityInfo.description}</p>
        
        {/* Search Bar */}
        <div className={styles.searchBox}>
          <FaSearch className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder={`Find a course in ${cityInfo.name}...`} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput} 
          />
        </div>
      </div>

      {/* No Results Message */}
      {filteredCategories.length === 0 && (
        <div className={styles.noResults}>
          <h3>No courses found matching "{searchTerm}"</h3>
          <button 
            className={styles.resetButton} 
            onClick={() => setSearchTerm("")}
          >
            View All Courses
          </button>
        </div>
      )}

      {/* Main Course Categories */}
      <div className={styles.categoriesContainer}>
        {filteredCategories.map((category) => (
          <div key={category.id} className={styles.categorySection}>
            <div className={styles.categoryTitle}>
              <h2>{category.name}</h2>
            </div>
            
            <div className={styles.categoryContent}>
              {/* Display subcategories if present */}
              {category.subcategories && (
                <div className={styles.subcategoriesContainer}>
                  {category.subcategories.map((subcategory, index) => (
                    <div key={index} className={styles.subcategorySection}>
                      <h3 className={styles.subcategoryTitle}>
                        {subcategory.title}
                      </h3>
                      <div className={styles.horizontalCourseList}>
                        {subcategory.courses
                          .filter(course => !searchTerm || course.name.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map((course, idx) => (
                          <div key={idx} className={styles.courseItem}>
                            <Link
                              href={course.slug}
                              className={styles.courseLink}
                            >
                              {course.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Display direct courses if present */}
              {category.courses && (
                <div className={styles.horizontalCourseList}>
                  {category.courses
                    .filter(course => !searchTerm || course.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((course, idx) => (
                    <div key={idx} className={styles.courseItem}>
                      <Link href={course.slug} className={styles.courseLink}>
                        {course.name}
                        {course.section && (
                          <span className={styles.sectionTag}>Section</span>
                        )}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CityCoursePage;