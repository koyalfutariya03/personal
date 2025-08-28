import React, { useState } from "react";
import styles from "@/styles/CoursesComponents/CurriculumAccordion.module.css";

const CurriculumAccordion = ({ sections }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleSection = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.curriculumAccordion}>
      {sections.map((section, index) => (
        <div key={index} className={styles.accordionItem}>
          <div
            className={`${styles.accordionTitle} ${
              activeIndex === index ? styles.active : ""
            }`}
            onClick={() => toggleSection(index)}
          >
            <h3>{section.title}</h3>
            <span className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{ width: `${section.progress}%` }}
              ></div>
            </span>
          </div>
          {activeIndex === index && (
            <div className={styles.accordionContent}>
              {section.content.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CurriculumAccordion;
