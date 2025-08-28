"use client";

import { useEffect, useState } from "react";
import styles from "@/styles/Common/Marquee.module.css";

// Helper function to get the ordinal suffix (st, nd, rd, th)
const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return "th"; // Covers 4th to 20th
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

// Helper function to format the date
const formatDate = (date) => {
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const suffix = getOrdinalSuffix(day);
  return `${day}${suffix} ${monthNames[date.getMonth()]}`;
};

// Helper function to calculate the next target date
const getNextTargetDate = () => {
  const targetDays = [5, 10, 15, 20, 25, 30];
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  let nextDay = -1;

  // Find the first target day strictly greater than the current day
  for (const day of targetDays) {
    if (day > currentDay) {
      nextDay = day;
      break;
    }
  }

  let nextDate;
  if (nextDay !== -1) {
    // Found a target day in the current month
    nextDate = new Date(currentYear, currentMonth, nextDay);
  } else {
    // No target day left in the current month, go to the 5th of the next month
    nextDate = new Date(currentYear, currentMonth + 1, 5);
  }

  return nextDate;
};

const Marquee = () => {
  const [displayDate, setDisplayDate] = useState("");

  useEffect(() => {
    // Function to calculate and update the displayed date
    const updateDate = () => {
      const nextTargetDate = getNextTargetDate();
      const formattedDate = formatDate(nextTargetDate);
      setDisplayDate(formattedDate);
      // console.log(`Today: ${new Date().toLocaleDateString()}, Displaying: ${formattedDate}`); // For debugging
    };

    // Calculate date initially
    updateDate();

    // Set up an interval to check and potentially update the date every minute.
    // This ensures reasonably timely updates around midnight.
    const intervalId = setInterval(updateDate, 60000); // Check every 60 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  // Use the same dynamic date for all relevant items
  const dynamicDateText = displayDate ? ` ${displayDate}` : ""; // Add space prefix

  return (
    <div className={styles.mainContainerMarquee}>
      <div className={styles.mainContainerMarqueeTrack}>
        {/* First Set of Items */}
        <div className={styles.mainContainerMarqueeItems}>
          <span className={styles.mainContainerMarqueeItem}>
            SAP FICO Batch Starting Soon!
          </span>

          <span className={styles.mainContainerMarqueeItem}>
            {/* Dynamically update date here */}
            Data Science A1 batch starting from{dynamicDateText}!
          </span>
        </div>

        {/* Second Set of Items (Duplicate for seamless loop) */}
        <div className={styles.mainContainerMarqueeItems} aria-hidden="true">
          <span className={styles.mainContainerMarqueeItem}>
            {/* Dynamically update date here */}
            Get exciting benefits by registering before{dynamicDateText}!
          </span>

          <span className={styles.mainContainerMarqueeItem}>
            {/* Dynamically update date here */}
            SAP HANA batch commencing on{dynamicDateText}!
          </span>
        </div>
      </div>
    </div>
  );  
};

export default Marquee;
 