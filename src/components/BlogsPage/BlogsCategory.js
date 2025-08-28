"use client";

import styles from "@/styles/BlogPage/Components/BlogsCategory.module.css";

const BlogsCategory = ({
  selectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  subcategories,
}) => {
  // Handle subcategory selection
  const handleSubcategoryClick = (sub) => {
    setSelectedSubcategory(sub.toLowerCase()); // Normalize case
  };

  return (
    <div className={styles.blogsCategory}>
      <h3>{selectedCategory} Categories</h3>
      <ul>
        {subcategories.map((sub, index) => (
          <li
            key={index}
            className={
              selectedSubcategory.toLowerCase() === sub.toLowerCase()
                ? styles.active
                : ""
            }
            onClick={() => handleSubcategoryClick(sub)}
          >
            {sub}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogsCategory;
