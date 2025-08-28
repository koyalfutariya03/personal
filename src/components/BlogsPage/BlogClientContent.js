"use client";
 
import { useEffect, useState, useRef } from "react"; // useRef is unused, consider removing
// Import necessary components used previously in blogs/page.js
import Breadcrumb from "@/components/BlogsPage/Breadcrumb";
import BlogHero from "./BlogHero";
import TrendingBlogs from "./trendBlogs";
import InterviewCard from "./interview";
 
// CHANGED: Use process.env.NEXT_PUBLIC_API_URL_BLOG directly
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL_BLOG;
 
const BlogClientContent = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [blogs, setBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [recommendedBlogs, setRecommendedBlogs] = useState([]);  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
 
 
 
  return (
    <div >
      <Breadcrumb />
      {/* New Hero Section */}
      <BlogHero />
      <TrendingBlogs />
      <InterviewCard />
   
   
 
   
    </div>
  );
};
 
export default BlogClientContent;