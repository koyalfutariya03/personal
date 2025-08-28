"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "@/styles/BlogPage/Components/CategoryFilter.module.css";

const CategoryFilter = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Set active category based on URL path
  useEffect(() => {
    const currentCategory = pathname.split("/blogs/")[1];
    setActiveCategory(currentCategory || "");

    // Check if mobile view
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, [pathname]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    router.push(`/blogs/${encodeURIComponent(category)}`); // Redirect to the category page
  };

  // Define which categories to show
  const visibleCategories =
    isMobile && !showAllCategories ? categories.slice(0, 4) : categories;

  return (
    <div className={styles.categoryFilterContainer}>
      <h2 className={styles.filterHeading}>Explore Courses</h2>

      <div className={styles.categoryFilter}>
        {visibleCategories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category)}
            className={`
              ${styles.categoryButton} 
              ${activeCategory === category ? styles.active : ""}
            `}
          >
            <span className={styles.categoryIcon}>
              {getCourseIcon(category)}
            </span>
            <span className={styles.categoryName}>
              {getCourseFullName(category)}
            </span>
          </button>
        ))}

        {isMobile && categories.length > 4 && (
          <button
            className={styles.moreButton}
            onClick={() => setShowAllCategories(!showAllCategories)}
          >
            {showAllCategories ? (
              <>
                <span>Show Less</span>
                <span className={styles.moreIcon}>↑</span>
              </>
            ) : (
              <>
                <span>Show More</span>
                <span className={styles.moreIcon}>↓</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

// Helper function to get icons based on course code
function getCourseIcon(courseCode) {
  const code = courseCode.toUpperCase();

  switch (code) {
    case "SAP":
      return "💼"; // Briefcase for enterprise software
    case "AI":
      return "🤖"; // Robot for artificial intelligence
    case "IT":
      return "💻"; // Computer for information technology
    case "DV":
      return "📊"; // Chart for data visualization
    case "DM":
      return "📱"; // Mobile for digital marketing
    case "DS":
      return "📈"; // Graph for data science
    case "HR":
      return "👥"; // People for human resources
    default:
      return "🎓"; // Default graduation cap
  }
}

// Helper function to get full course names
function getCourseFullName(courseCode) {
  const code = courseCode.toUpperCase();

  switch (code) {
    case "SAP":
      return "SAP Solutions";
    case "AI":
      return "Artificial Intelligence";
    case "IT":
      return "Information Technology";
    case "DV":
      return "Data Visualization";
    case "DM":
      return "Digital Marketing";
    case "DS":
      return "Data Science";
    case "HR":
      return "Human Resources";
    default:
      return courseCode; // Return the original if no match
  }
}

export default CategoryFilter;
