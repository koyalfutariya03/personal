// components/CoursesComponents/Description.js (Updated Description - Continued)
"use client";

import React, { useEffect, useState, useRef } from "react";
// Removed: import { CityContext } from "@/context/CityContext"; // Not directly needed
import styles from "@/styles/CoursesComponents/Description.module.css";
import { FaCheckCircle, FaChevronRight } from "react-icons/fa";

const Description = ({ data, sectionIndex = 0 }) => { // Renamed 'content' prop to 'data' for consistency
  // Removed: const [content, setContent] = useState(null);
  // Removed: const [error, setError] = useState("");
  // Removed: const { city } = useContext(CityContext);
  const [isVisible, setIsVisible] = useState(false);
  const descriptionRef = useRef(null);
  const observerRef = useRef(null);

  // Setup intersection observer to detect when component is visible
  useEffect(() => {
    if (!descriptionRef.current || observerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerRef.current.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(descriptionRef.current);

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Force visibility after a timeout to ensure rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isVisible) {
        setIsVisible(true);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [isVisible]);

  // Removed: useEffect for data fetching and localStorage logic

  const applyHighlights = (text, highlights) => {
    if (!highlights || highlights.length === 0) return text;
    const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const validHighlights = highlights.filter(
      (w) => typeof w === "string" && w.trim() !== ""
    );
    if (validHighlights.length === 0) return text;
    const regex = new RegExp(
      `(${validHighlights.map(escapeRegex).join("|")})`,
      "gi"
    );
    return text.split(regex).map((part, i) =>
      validHighlights.some(
        (word) => word.toLowerCase() === part.toLowerCase()
      ) ? (
        <span key={i} className={styles.highlightDescJson}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Simplified error/loading handling as data is passed directly
  if (!data) {
    return (
      <div /* Add loading/error styling */>
        <p>No description data available (check masterData.js or prop passing).</p>
      </div>
    );
  }

  // Figure out if/where to split paragraphs for the list
  const insertListAfter =
    typeof data.listItemAfterIndex === "number"
      ? data.listItemAfterIndex
      : -1;

  const paragraphsBeforeList =
    insertListAfter >= 0
      ? data.paragraphs.slice(0, insertListAfter + 1)
      : data.paragraphs;
  const paragraphsAfterList =
    insertListAfter >= 0 ? data.paragraphs.slice(insertListAfter + 1) : [];

  // Helper to render list with icons
  const renderList = (
    items,
    style,
    icon = <FaCheckCircle className={styles.bulletIcon} />
  ) => (
    <ul className={style}>
      {items.map((item, i) => (
        <li key={i}>
          {icon}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      ref={descriptionRef}
      className={`${styles.descriptionContainer} ${
        sectionIndex % 2 === 0 ? styles.videoLeft : styles.videoRight
      }`}
    >
      {data.videoUrl && ( // Use data.videoUrl instead of content.videoUrl
        <div className={styles.descriptionVideo}>
          <video src={data.videoUrl} loop autoPlay muted playsInline />
        </div>
      )}

      <div className={styles.descriptionContent}>
        <h2 className={styles.descriptionTitle}>{data.title}</h2> {/* Use data.title */}

        {/* Paragraphs BEFORE list */}
        {paragraphsBeforeList.map(
          (p, i) =>
            p.trim() && (
              <p key={`before-${i}`} className={styles.descriptionParagraph}>
                {applyHighlights(p, data.highlights)}
              </p>
            )
        )}

        {/* Insert feature list here if present */}
        {data.listItem1 && data.listItem1.length > 0 && (
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              {data.listItem1Header
                ? data.listItem1Header
                : "What sets us apart:"}
            </div>
            {renderList(data.listItem1, styles.featureList)}
          </div>
        )}

        {/* Paragraphs AFTER list from "paragraphs" array */}
        {paragraphsAfterList.map(
          (p, i) =>
            p.trim() && (
              <p key={`after-${i}`} className={styles.descriptionParagraph}>
                {applyHighlights(p, data.highlights)}
              </p>
            )
        )}

        {/* Paragraphs AFTER feature list (for the paragraphsAfterList property) */}
        {data.paragraphsAfterList &&
          data.paragraphsAfterList.map(
            (p, i) =>
              p.trim() && (
                <p
                  key={`afterlist-${i}`}
                  className={styles.descriptionParagraph}
                >
                  {applyHighlights(p, data.highlights)}
                </p>
              )
          )}

        {/* Optionally render listItem2 (eg for your SAP closing statement) */}
        {data.listItem2 &&
          data.listItem2.length > 0 &&
          renderList(
            data.listItem2,
            styles.listItem2,
            <FaChevronRight className={styles.arrowIcon} />
          )}

        {/* Second section (What Will You Learn, etc.) */}
        {data.secondTitle && (
          <div className={styles.sectionCardAlt}>
            <div className={styles.secondTitle}>{data.secondTitle}</div>
            {data.secondParagraphs.map(
              (p, i) =>
                p.trim() && (
                  <p key={i} className={styles.descriptionParagraphAlt}>
                    {applyHighlights(p, data.highlights)}
                  </p>
                )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Description;