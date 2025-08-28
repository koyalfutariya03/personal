"use client";

import { useState, useEffect } from "react";
import AnimatedLogo from "./AnimatedLogo";
import styles from "@/styles/Loader.module.css";

const Loader = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);

  useEffect(() => {
    // Fade in the scroll down message after a delay
    const fadeInTimeout = setTimeout(() => {
      setScrollOpacity(1);
    }, 200);

    return () => clearTimeout(fadeInTimeout);
  }, []);
  
  // Mouse interaction effects
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div 
      className={styles.loaderContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={styles.loaderContent} 
        style={{ 
          transform: isHovering ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
        }}
      >
        <div className={styles.logoWrapper}>
          <AnimatedLogo />
        </div>
        
        <div className={styles.scrollMessage} style={{ opacity: scrollOpacity }}>
          <p>Scroll down if page is not loading...</p>
          <div className={styles.scrollArrow}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <div className={styles.loadingDots}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;