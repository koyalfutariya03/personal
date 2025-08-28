// components/CoursesComponents/FAQ.js (Updated FAQ)
"use client";

import { useState, useEffect } from 'react';
import styles from '@/styles/CoursesComponents/FAQ.module.css';
// Removed: import { CityContext } from '@/context/CityContext'; // Not needed here anymore

const FAQAccordion = ({ data }) => { // Renamed prop to 'data' for consistency
  // Removed: const [data, setData] = useState(null);
  // Removed: const [loading, setLoading] = useState(true);
  // Removed: const [error, setError] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  // Removed: const { city } = useContext(CityContext);

  // Removed: useEffect for data fetching

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Simplified loading/error handling as data is passed directly
  if (!data) {
    return (
      <div /* Add loading/error styling */>
        <p>No FAQ data available (check masterData.js or prop passing).</p>
      </div>
    );
  }

  return (
    <div className={styles.containerFaqDs}>
      <h2 className={styles.containerFaqDsh2}>{data.title}</h2>
      <p>{data.description}</p>
      <div className={styles.faqContent}>
        <div className={styles.faqImage}>
          {/* Ensure video source exists in data */}
          {data.video && (
            <video loop autoPlay muted>
              <source src={data.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className={styles.faqQuestions}>
          {data.items && data.items.length > 0 ? (
            data.items.map((item, index) => (
              <div key={index} className={styles.accordionItem}>
                <button
                  aria-expanded={expandedIndex === index}
                  onClick={() => handleToggle(index)}
                  className={styles.accordionButton}
                >
                  <span className={styles.accordionTitle}>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true"></span>
                </button>
                <div
                  className={styles.accordionContent}
                  style={{
                    opacity: expandedIndex === index ? 1 : 0,
                    maxHeight: expandedIndex === index ? '9em' : 0, /* Adjust max-height if content is longer */
                  }}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No FAQs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQAccordion;