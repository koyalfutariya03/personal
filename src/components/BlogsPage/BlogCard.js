// src/components/BlogsPage/BlogCard.js
"use client";

import Link from "next/link";
import styles from "@/styles/BlogPage/Components/BlogCard.module.css";

// CHANGED: Access NEXT_PUBLIC_API_URL_BLOG directly
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL_BLOG;

// REMOVED: BASE_URL from props
const BlogCard = ({ blog }) => {
  return (
    <div className={styles.blogCard}>
      {/* CHANGED: Use blog.slug for the Link href, with _id fallback */}
      <Link href={`/blogs/${blog.category}/${blog.slug || blog._id}`} className={styles.linkTag}>
        <div className={styles.imageContainer}>
          <img
            // CHANGED: Use API_BASE_URL
            src={blog.image?.startsWith("http") ? blog.image : `${API_BASE_URL}${blog.image}`}
            alt={blog.title}
            className={styles.blogImage}
            loading="lazy"
          />
        </div>
        <div className={styles.overlay}>
          <h3 className={styles.blogTitle}>{blog.title}</h3>
          <p className={styles.blogCategory}>
            {blog.category} • {blog.subcategory}
          </p>
          <p className={styles.blogAuthor}>By {blog.author}</p>
          <span className={styles.readMore}>Read More →</span>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;