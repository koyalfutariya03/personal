// src/components/BlogsPage/BlogHorizontalCarousel.js
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/BlogPage/Components/BlogHorizontalCarousel.module.css";

// CHANGED: Access NEXT_PUBLIC_API_URL_BLOG directly
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL_BLOG;

// REMOVED: BASE_URL from props
const BlogHorizontalCarousel = ({ blogs, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);

  const handleNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === blogs.length - 1 ? 0 : prevIndex + 1
    );

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const handlePrev = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? blogs.length - 1 : prevIndex - 1
    );

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Reset autoplay when currentIndex changes
  useEffect(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    autoPlayRef.current = setInterval(() => {
      if (blogs.length > 1) {
        handleNext();
      }
    }, 5000);

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
      if (blogs.length > 1) {
        handleNext();
      }
    }, 5000);
  };

  if (!blogs || blogs.length === 0) {
    return <div className={styles.noBlogs}>No blogs available</div>;
  }

  return (
    <div className={styles.carouselSection}>
      {title && (
        <div className={styles.carouselHeader}>
          <h2 className={styles.carouselTitle}>{title}</h2>
          <div className={styles.carouselControls}>
            <button
              className={styles.arrowBtn}
              onClick={handlePrev}
              aria-label="Previous blog"
              disabled={isTransitioning}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>
            <button
              className={styles.arrowBtn}
              onClick={handleNext}
              aria-label="Next blog"
              disabled={isTransitioning}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div
        className={styles.carouselContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {blogs.map((blog, index) => (
          // CHANGED: Use blog.slug for the Link href, with _id fallback
          <Link
            key={blog._id}
            href={`/blogs/${blog.category}/${blog.slug || blog._id}`}
            className={`${styles.blogLink} ${
              index === currentIndex ? styles.active : ""
            }`}
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 1 : 0,
            }}
          >
            <div className={styles.blogHorizontal}>
              <div className={styles.imageWrapper}>
                <Image
                  // CHANGED: Use API_BASE_URL
                  src={
                    blog.image?.startsWith("http")
                      ? blog.image
                      : `${API_BASE_URL}${blog.image}`
                  }
                  alt={blog.title}
                  className={styles.blogImage}
                  width={300}
                  height={200}
                  loading="lazy"
                />
              </div>
              <div className={styles.blogContent}>
                <div className={styles.blogMeta}>
                  {blog.category && (
                    <span className={styles.blogCategory}>
                      {blog.category}
                      {blog.subcategory && ` • ${blog.subcategory}`}
                    </span>
                  )}
                  {blog.status && (
                    <span className={styles.blogStatus}>{blog.status}</span>
                  )}
                </div>
                <h2 className={styles.blogTitle}>{blog.title}</h2>
                <p className={styles.blogDescription}>
                  {blog.content?.slice(0, 150).replace(/<[^>]*>/g, "")}...
                </p>
                <div className={styles.blogFooter}>
                  <p className={styles.blogAuthor}>
                    By <span>{blog.author}</span>
                  </p>
                  <span className={styles.readMore}>
                    Read More <span className={styles.arrow}>→</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Progress indicator */}
      <div className={styles.progressIndicator}>
        {blogs.map((_, index) => (
          <button
            key={index}
            className={`${styles.progressDot} ${
              currentIndex === index ? styles.active : ""
            }`}
            onClick={() => {
              if (!isTransitioning) {
                setIsTransitioning(true);
                setCurrentIndex(index);
                setTimeout(() => setIsTransitioning(false), 500);
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogHorizontalCarousel;