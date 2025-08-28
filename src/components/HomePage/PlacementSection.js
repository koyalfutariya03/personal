"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "@/styles/HomePage/Placement.module.css";

const PlacementSection = () => {
  const placementStories = [
    {
      name: "Preetesh Pardeshi",
      salary: "24 LPA",
      degree: "Trained on- SAP ABAP",
      company: "Placed in",
      logo: "/Placementsection/agconsultancy.avif",
      alt: "Agricultural consultancy logo",
      topImage: "/Placementsection/pic1pp.avif",
    },
    {
      name: "Nikhilesh Landge",
      salary: "12 LPA",
      degree: "Trained on- SAP SD",
      company: "Placed in",
      logo: "/Placementsection/cltech.avif",
      alt: "CLTech logo",
      topImage: "/Placementsection/pic2pp.avif",
    },
    {
      name: "Shubham Desale",
      salary: "9 LPA",
      degree: "Trained on- SAP MM",
      company: "Placed in",
      logo: "/Placementsection/deloitte1.avif",
      alt: "Deloitte logo",
      topImage: "/Placementsection/pic3pp.avif",
    },
    {
      name: "Nitesh Kumar",
      salary: "15 LPA",
      degree: "Trained on- SAP FICO",
      company: "Placed in",
      logo: "/Placementsection/marketlegos.avif",
      alt: "Market Legos logo",
      topImage: "/Placementsection/pic4pp.avif",
    },
    {
      name: "Seshu Tamma",
      salary: "11 LPA",
      degree: "Trained on- SAP Security",
      company: "Placed in",
      logo: "/Placementsection/deloitte1.avif",
      alt: "Deloitte logo",
      topImage: "/Placementsection/pic5pp.avif",
    },
    {
      name: "Sai Srujan",
      salary: "18 LPA",
      degree: "Trained on- SAP FICO",
      company: "Placed in",
      logo: "/Placementsection/deloitte1.avif",
      alt: "Deloitte logo",
      topImage: "/FeedbacksandReviews/review image 5.avif",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Standard sliding interval (3 seconds)
    const slideInterval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex(
          (prevIndex) => (prevIndex + 1) % placementStories.length
        );
      }
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [isPaused, placementStories.length]);

  const handleMouseEnter = () => {
    setIsPaused(false);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  const renderCards = () => {
    return placementStories.map((story, index) => {
      // Calculate distance from active index for scaling effect
      let position = index - activeIndex;

      // Handle wrapping for infinite effect
      if (position < -Math.floor(placementStories.length / 2)) {
        position += placementStories.length;
      } else if (position > Math.floor(placementStories.length / 2)) {
        position -= placementStories.length;
      }

      // Create class based on position
      let cardClass = "";

      if (position === 0) {
        cardClass = styles.activeCard;
      } else if (Math.abs(position) === 1) {
        cardClass = position < 0 ? styles.prevCard : styles.nextCard;
      } else if (Math.abs(position) === 2) {
        cardClass = position < 0 ? styles.farPrevCard : styles.farNextCard;
      } else if (Math.abs(position) === 3) {
        cardClass =
          position < 0 ? styles.extraFarPrevCard : styles.extraFarNextCard;
      } else {
        cardClass = styles.hiddenCard;
      }

      return (
        <div
          key={index}
          className={`${styles.placementCard} ${cardClass}`}
          onClick={() => handleCardClick(index)}
        >
          <div className={styles.cardContent}>
            <div className={styles.topImageContainer}>
              <Image
                src={story.topImage}
                alt={`${story.name}'s photo`}
                width={150}
                height={150}
                className={styles.personImage}
              />
            </div>

            <div className={styles.cardInfo}>
              <h3 className={styles.personName}>{story.name}</h3>
              <p className={styles.salaryInfo}>{story.salary}</p>
              <p className={styles.degreeInfo}>{story.degree}</p>

              <div className={styles.companyInfo}>
                <div>
                  <p>{story.company}</p>
                </div>
                <div className={styles.logoContainer}>
                  <Image
                    src={story.logo}
                    alt={story.alt}
                    width={
                      story.alt.includes("Deloitte") ||
                      story.alt.includes("Market Legos")
                        ? 80
                        : 40
                    }
                    height={
                      story.alt.includes("Deloitte logo") ||
                      story.alt.includes("Market Legos")
                        ? 80
                        : 40
                    }
                    className={styles.companyLogo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <section className={styles.placementSection}>
      <div className={styles.sectionHeading}>
        <h2>Success Stories</h2>
        <div className={styles.titleUnderline}></div>
        <p>Our alumni are making remarkable strides in top organizations</p>
      </div>

      <div
        className={styles.carouselContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={carouselRef}
      >
        <div className={styles.carouselBackground}></div>
        <div className={styles.carouselTrack}>{renderCards()}</div>

        <div className={styles.carouselIndicators}>
          {placementStories.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === activeIndex ? styles.activeIndicator : ""
              }`}
              onClick={() => handleCardClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlacementSection;
