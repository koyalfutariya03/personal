// File: components/Chevron.js

import React from "react";
import styles from "@/styles/HomePage/Chevron.module.css";

const Phases = () => {
  // Using an array to reduce repeated code while maintaining the same structure
  const phaseItems = [
    {
      id: "1",
      title: "Enroll",
      className: styles.highestSalary,
      marginTop: "10px",
    },
    {
      id: "2",
      title: "Corporate Style Training",
      className: styles.highestSalary,
      marginTop: "0",
    },
    {
      id: "3",
      title: "Real-Time Projects",
      className: styles.studentsTrained,
      marginTop: "0",
    },
    {
      id: "4",
      title: "Interview Preparation",
      className: styles.hiringCompanies,
      marginTop: "0",
    },
    {
      id: "5",
      title: "Experience Alteration",
      className: styles.totalBranches,
      marginTop: "0",
    },
    {
      id: "6",
      title: "Job Assistance",
      className: styles.highestSalary,
      marginTop: "0",
    },
  ];

  return (
    <div className={styles.containerCH}>
      <h2 className={styles.sectionTitle}>Training To Placement Approach</h2>
      <div className={styles.titleUnderline}></div>
      <div className={styles.phases}>
        <ul>
          {phaseItems.map((phase) => (
            <li
              key={phase.id}
              className={`${styles.chevronItem} ${phase.className}`}
            >
              <a href={`#${phase.id}`}>
                <h4 style={{ marginTop: phase.marginTop }}>{phase.title}</h4>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Phases;
