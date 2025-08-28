"use client";

import Image from "next/image";
import styles from "@/styles/AnimatedLogo2.module.css";

const AnimatedLogo2 = () => {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.linesContainer}>
        <div className={`${styles.arcLine} ${styles.line1}`}></div>
        <div className={`${styles.arcLine} ${styles.line2}`}></div>
        <div className={`${styles.arcLine} ${styles.line3}`}></div>
      </div>
      <div className={styles.centerArrow}>
        <Image
          src="/Navbar/arrow.png"
          alt="Connecting Dots Logo"
          width={120}
          height={120}
          priority={true}
        />
      </div>
    </div>
  );
};

export default AnimatedLogo2;