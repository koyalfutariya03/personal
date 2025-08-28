"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";
import styles from "@/styles/HomePage/OurStats.module.css";

// Memoized card component to prevent unnecessary re-renders
const StatCard = memo(({ card, isFlipped, onMouseEnter, onMouseLeave, index }) => {
  return (
    <div
      className={styles.cardT2pContainer}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave(index)}
    >
      <div
        className={`${styles.cardT2p} ${isFlipped ? styles.rotated : ""}`}
      >
        <div className={`${styles.cardT2pContents} ${styles.cardT2pFront}`}>
          <div className={styles.cardT2pDepth}>
            <div className={styles.cardT2pImg1}>
              <Image
                src={card.img}
                alt={card.alt}
                width={100}
                height={100}
                className={styles.cardT2pLogo}
                loading="lazy"
              />
            </div>
            <h2 dangerouslySetInnerHTML={{ __html: card.frontText }} />
          </div>
        </div>
        <div className={`${styles.cardT2pContents} ${styles.cardT2pBack}`}>
          <div className={styles.cardT2pDepth}>
            <h2 dangerouslySetInnerHTML={{ __html: card.backText }} />
          </div>
        </div>
      </div>
    </div>
  );
});

StatCard.displayName = "StatCard";

const OurStats = () => {
  const [cardStates, setCardStates] = useState(new Array(6).fill(false));

  // Memoize event handlers to prevent recreating functions on each render
  const handleMouseEnter = useCallback((index) => {
    setCardStates((prev) => prev.map((state, i) => (i === index ? true : state)));
  }, []);

  const handleMouseLeave = useCallback((index) => {
    setCardStates((prev) => prev.map((state, i) => (i === index ? false : state)));
  }, []);

  // Predefined card data
  const cardData = [
    {
      img: "/Stats gifs/10years.avif",
      alt: "A circular emblem featuring the 10 Plus logo, showcasing a sleek and contemporary design.",
      frontText: `Years of Legacy in <span class="${styles.highlightF}">IT</span>`,
      backText: `<span class="${styles.highlightB}">Our Institute</span>, with over <span class="${styles.highlightB}">10+ Years</span> of excellence, consistently provides top-notch instruction and services.`,
    },
    {
      img: "/Stats gifs/cv.avif",
      alt: "A person examines a document closely using a magnifying glass for detailed inspection.",
      frontText: `10000+ <span class="${styles.highlightF}">Students</span>`,
      backText: `Our institute has educated over <span class="${styles.highlightB}">10000+ Students</span>, consistently providing top-notch instruction and services.`,
    },
    {
      img: "/Stats gifs/growth.avif",
      alt: "A person sprinting with the number 100 prominently displayed, symbolizing speed and achievement in athletics.",
      frontText: `100x <span class="${styles.highlightF}">Growth</span>`,
      backText: `Our institute boosts a <span class="${styles.highlightB}">100 x Growth</span>, with graduates securing top salaries up to <span class="${styles.highlightB}">24 lakh</span> per annum`,
    },
    {
      img: "/Stats gifs/mentors.avif",
      alt: "A meeting room filled with people seated around a large conference table engaged in discussion.",
      frontText: `100+ <span class="${styles.highlightF}">Mentors</span>`,
      backText: `Our institute features over <span class="${styles.highlightB}">100+ MNC professionals</span> as <span class="${styles.highlightB}">Mentors</span>, providing expert guidance and support.`,
    },
    {
      img: "/Stats gifs/certificate.avif",
      alt: "A document featuring a ribbon and a certificate icon, symbolizing achievement and official recognition.",
      frontText: `100% <span class="${styles.highlightF}">Practical</span> Based Courses`,
      backText: `Our institute offers <span class="${styles.highlightB}">100% Practical</span>-based  <span class="${styles.highlightB}">Courses</span> tailored for industry needs.`,
    },
    {
      img: "/Stats gifs/jobs.avif",
      alt: "Job search icon featuring a magnifying glass over a briefcase, symbolizing employment opportunities and career exploration.",
      frontText: `100+ <span class="${styles.highlightF}">Hiring</span> Partner`,
      backText: `Our institute has over  <span class="${styles.highlightB}">100+ Hiring</span> partners, including <span class="${styles.highlightB}">Giants</span> like <span class="${styles.highlightB}">Google</span> and <span class="${styles.highlightB}">Microsoft</span>, as well as leading  <span class="${styles.highlightB}">MNCs</span>`,
    },
  ];

  return (
    <section className={styles.t2p} aria-labelledby="stats-title">
      <div className={styles.t2pTitle}>
        <h2 id="stats-title">Our Stats At A Glance</h2>
        <div className={styles.titleUnderline} aria-hidden="true"></div>
      </div>
      <div className={styles.cardsT2pWrapper}>
        {cardData.map((card, index) => (
          <StatCard
            key={index}
            card={card}
            index={index}
            isFlipped={cardStates[index]}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>
    </section>
  );
};

export default OurStats;