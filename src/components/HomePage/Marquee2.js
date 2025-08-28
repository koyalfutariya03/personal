import React from 'react';
import styles from "@/styles/Common/Marquee.module.css";

const Marquee2 = () => {
  return (
    <div className={styles.mainContainerMarquee}>
      <div className={styles.mainContainerMarqueeTrack}>
        <div className={styles.mainContainerMarqueeItems}>
          <span className={styles.mainContainerMarqueeItem}>
            Transforming Careers with SAP Mastery.
          </span>
          <span className={styles.mainContainerMarqueeItem}>
            Connect Your Dots to a Brighter Tech Future.
          </span>
        </div>
        <div aria-hidden="true" className={styles.mainContainerMarqueeItems}>
          <span className={styles.mainContainerMarqueeItem}>
            Decode Data, Drive Innovation.
          </span>
          <span className={styles.mainContainerMarqueeItem}>
            Empower Your Career with SAP Mastery.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Marquee2;