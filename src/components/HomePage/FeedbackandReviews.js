"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/styles/HomePage/FeedbackandReviews.module.css";

const FeedbackAndReviews = () => {
  const reviews = [
    {
      name: "Niveath P",
      review:
        "I completed the SAP HCM course at Connecting Dots ERP in Mumbai, where expert instructors guided me through SAP complexities with clarity. The comprehensive, well-designed course covered all essential modules.",
      image: "/FeedbacksandReviews/review image 3.avif",
      rating: 5,
    },
    {
      name: "Shweta Udainiya",
      review:
        "Connecting Dots Advancements offers top SAP training in Mumbai with expert coaches, flexible learning, and strong job support. I completed my SAP SD Course here, highly recommending it for a successful SAP career.",
      image: "/FeedbacksandReviews/review image 1.avif",
      rating: 5,
    },
    {
      name: "Seshu Tamma",
      review:
        "In my opinion, Connecting Dots is Mumbai's best SAP training center, offering top-notch SAP Aruba courses with a comprehensive curriculum, expert instructors, and excellent placement assistance.",
      image: "/FeedbacksandReviews/review image 2.avif",
      rating: 4,
    },
    {
      name: "Shreyansh Gupta",
      review:
        "Connecting Dots Advancements offers top SAP training in Mumbai with expert coaches, flexible learning, and strong job support. I completed my SAP SD Course here, highly recommending it for a successful SAP career.",
      image: "/FeedbacksandReviews/review image 4.avif",
      rating: 5,
    },
    {
      name: "Sai Srujan",
      review:
        "I completed the SAP HCM course at Connecting Dots ERP in Mumbai, where expert instructors guided me through SAP complexities with clarity. The comprehensive, well-designed course covered all essential modules.",
      image: "/FeedbacksandReviews/review image 5.avif",
      rating: 5,
    },
    {
      name: "Seshu Tamma",
      review:
        "In my opinion, Connecting Dots is Mumbai's best SAP training center, offering top-notch SAP Aruba courses with a comprehensive curriculum, expert instructors, and excellent placement assistance.",
      image: "/FeedbacksandReviews/review image 2.avif",
      rating: 5,
    },
  ];

  const marqueeRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Handle mouse events for pausing the marquee
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (marquee) {
      marquee.style.animationPlayState = isPaused ? "paused" : "running";
    }
  }, [isPaused]);

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={i < rating ? styles.starFilled : styles.starEmpty}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <section className={styles.feedbackSection}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className={styles.sectionTitle}>What Our Students Say</h2>
            <div className={styles.titleUnderline}></div>
            <p className={styles.sectionSubtitle}>
              Hear from our successful students about their learning experience
              with Connecting Dots
            </p>
          </div>
        </div>

        <div className={styles.marqueeWrapper}>
          <div
            className={styles.marquee}
            ref={marqueeRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {reviews.map((review, index) => (
              <div className={styles.reviewCard} key={index}>
                <div className={styles.reviewCardInner}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={review.image}
                      alt={`${review.name}'s photo`}
                      width={120}
                      height={120}
                      className={styles.reviewImage}
                    />
                    <div className={styles.studentBadge}>Verified Student</div>

                    <div className={styles.imageBorder}></div>
                  </div>
                  <div className={styles.reviewContent}>
                    <h4 className={styles.reviewName}>{review.name}</h4>
                    <div className={styles.starRating}>
                      {renderStars(review.rating)}
                    </div>
                    <p className={styles.reviewText}>"{review.review}"</p>
                  </div>
                  <div className={styles.quoteIcon}>"</div>
                </div>
              </div>
            ))}

            {/* Duplicate reviews for seamless infinite loop */}
            {reviews.map((review, index) => (
              <div className={styles.reviewCard} key={`duplicate-${index}`}>
                <div className={styles.reviewCardInner}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={review.image}
                      alt={`${review.name}'s photo`}
                      width={120}
                      height={120}
                      className={styles.reviewImage}
                    />
                    <div className={styles.studentBadge}>Verified Student</div>

                    <div className={styles.imageBorder}></div>
                  </div>
                  <div className={styles.reviewContent}>
                    <h4 className={styles.reviewName}>{review.name}</h4>
                    <div className={styles.starRating}>
                      {renderStars(review.rating)}
                    </div>
                    <p className={styles.reviewText}>"{review.review}"</p>
                  </div>
                  <div className={styles.quoteIcon}>"</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackAndReviews;
