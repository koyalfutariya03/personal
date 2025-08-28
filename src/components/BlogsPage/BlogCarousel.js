// src/components/BlogsPage/BlogCarousel.js
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "@/styles/BlogPage/Components/BlogCarousel.module.css";

// CHANGED: Access NEXT_PUBLIC_API_URL_BLOG directly
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL_BLOG;

// REMOVED: BASE_URL from props
const BlogCarousel = ({ blogs, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);
  const visibleSlides = 3;

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex + 1) % Math.max(blogs.length - (visibleSlides - 1), 1)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(blogs.length - visibleSlides, 0)
        : prevIndex - 1
    );
  };

  // Reset autoplay when currentIndex changes
  useEffect(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    autoPlayRef.current = setInterval(() => {
      if (blogs.length > visibleSlides) {
        handleNext();
      }
    }, 3000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, blogs.length]);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      handleNext();
    } else if (touchEnd - touchStart > 75) {
      // Swipe right
      handlePrev();
    }
  };

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    autoPlayRef.current = setInterval(() => {
      if (blogs.length > visibleSlides) {
        handleNext();
      }
    }, 3000);
  };

  // Calculate correct grid view based on screen size
  const getGridClass = () => {
    return styles.gridView;
  };

  if (!blogs || blogs.length === 0) {
    return <div className={styles.noBlogs}>No blogs available</div>;
  }

  return (
    <div className={styles.carouselSection}>
      <div className={styles.carouselHeader}>
        <h2 className={styles.carouselTitle}>{title}</h2>
      </div>

      <div
        className={styles.carouselContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={carouselRef}
      >
        {/* Previous Button - Positioned on left side */}
        <button
          className={`${styles.prev} ${styles.sideButton}`}
          onClick={handlePrev}
          aria-label="Previous slide"
        >
          <span>&#10094;</span>
        </button>

        <div
          className={`${styles.carousel} ${getGridClass()}`}
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
          }}
        >
          {blogs.map((blog, index) => (
            <div
              key={blog._id}
              className={styles.carouselItem}
              style={{ minWidth: `${100 / visibleSlides}%` }}
            >
              {/* CHANGED: Use blog.slug for the Link href, with _id fallback */}
              <Link href={`/blogs/${blog.category}/${blog.slug || blog._id}`} className={styles.linkTag}>
                <div className={styles.blogCard}>
                  <div className={styles.imageContainer}>
                    <img
                      // CHANGED: Use API_BASE_URL
                      src={
                        blog.image?.startsWith("http")
                          ? blog.image
                          : `${API_BASE_URL}${blog.image}`
                      }
                      alt={blog.title}
                      className={styles.blogImage}
                      loading="lazy"
                    />
                    <div className={styles.statusBadge}>{blog.status}</div>
                  </div>
                  <div className={styles.overlay}>
                    <h3 className={styles.blogTitle}>{blog.title}</h3>
                    <p className={styles.blogCategory}>
                      {blog.category} • {blog.subcategory}
                    </p>
                    <p className={styles.blogAuthor}>By {blog.author}</p>
                    <span className={styles.readMore}>Read More →</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Next Button - Positioned on right side */}
        <button
          className={`${styles.next} ${styles.sideButton}`}
          onClick={handleNext}
          aria-label="Next slide"
        >
          <span>&#10095;</span>
        </button>
      </div>

      {/* Navigation Dots */}
      <div className={styles.dots}>
        {Array.from({ length: Math.ceil(blogs.length / visibleSlides) }).map(
          (_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                index === Math.floor(currentIndex / visibleSlides)
                  ? styles.active
                  : ""
              }`}
              onClick={() => setCurrentIndex(index * visibleSlides)}
              aria-label={`Go to slide group ${index + 1}`}
            ></span>
          )
        )}
      </div>
    </div>
  );
};

export default BlogCarousel;