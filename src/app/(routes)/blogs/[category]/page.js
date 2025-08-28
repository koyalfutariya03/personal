// src/app/(routes)/blogs/[category]/page.js
"use client";
 
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "@/styles/BlogPage/CategoryPage.module.css";
import Card from "@/components/BlogsPage/ui/Card"; // Make sure this component is updated
import Breadcrumb from "@/components/BlogsPage/Breadcrumb";
 
// CHANGED: Use process.env.NEXT_PUBLIC_API_URL_BLOG
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL_BLOG;
 
const CategoryPage = () => {
  const { category } = useParams() || {};
  const [blogs, setBlogs] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState("All");
  const [loading, setLoading] = useState(true); // Loading state
 
  useEffect(() => {
    if (category) {
      fetchAllSubcategories();
      fetchBlogs();
    }
  }, [category, selectedSubcategory]);
 
  const fetchAllSubcategories = async () => {
    try {
      // CHANGED: Use API_BASE_URL
      const response = await fetch(
        `${API_BASE_URL}/api/blogs?category=${encodeURIComponent(category)}`
      );
      const data = await response.json(); // Note: Your API currently returns { blogs: [], hasMore: bool }
 
      // Assuming your backend /api/blogs endpoint returns { blogs: Array, hasMore: Boolean }
      // The old code assumed `data` was directly an array, which might be incorrect based on your blogsPanel.js.
      // Adjusting to correctly extract `blogs` array.
      const blogsData = Array.isArray(data.blogs) ? data.blogs : [];
 
      const uniqueSubcategories = [
        "All",
        ...new Set(
          blogsData.map((blog) => blog.subcategory?.trim()).filter(Boolean)
        ),
      ];
 
      setSubcategories(uniqueSubcategories);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };
 
  const fetchBlogs = async () => {
    setLoading(true); // Start loading
    try {
      // CHANGED: Use API_BASE_URL
      let url = `${API_BASE_URL}/api/blogs?category=${encodeURIComponent(category)}`;
 
      if (selectedSubcategory.toLowerCase() !== "all") {
        url += `&subcategory=${encodeURIComponent(selectedSubcategory.trim())}`;
      }
 
      const response = await fetch(url);
      const data = await response.json(); // Note: Your API currently returns { blogs: [], hasMore: bool }
 
      if (!response.ok || !Array.isArray(data.blogs)) { // CHANGED: Check data.blogs for array
        throw new Error("Invalid response format");
      }
 
      setBlogs(data.blogs); // CHANGED: Set blogs from data.blogs
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false); // End loading
    }
  };
 
  return (
    <div className="p-4">
      <Breadcrumb />
      <div className={styles.categoryPage}>
        <h1 className={styles.categoryTitle}>{category?.toUpperCase()}</h1>
 
        <div className={styles.subcategoryContainer}>
          {subcategories.map((sub, index) => (
            <button
              key={index}
              className={selectedSubcategory === sub ? styles.active : ""}
              onClick={() => setSelectedSubcategory(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
 
        {/* Loading Indicator */}
        {loading ? (
          <div className={styles.loadingIndicator}>
            <p>Loading blogs...</p>
            <div className={styles.spinner}></div> {/* Add spinner styles */}
          </div>
        ) : (
          <div className={styles.blogsContainer}>
            {blogs.length === 0 ? (
              <p className={styles.noBlogs}>
                No blogs found for {category}
                {selectedSubcategory !== "All"
                  ? ` - ${selectedSubcategory}`
                  : ""}
                .
              </p>
            ) : (
              // Ensure BlogCard is updated to use blog.slug
              blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
};
 
export default CategoryPage;
 