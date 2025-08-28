"use client"; //  Next.js Client Component

import React, { useEffect, useState } from "react";
import Btnform from "@/components/HomePage/Btnform";
import styles from "@/styles/CoursesComponents/Councelor.module.css";
import AOS from 'aos'
import 'aos/dist/aos.css'

const Councelor = () => {
  const [showForm, setShowForm] = useState(false)

  const handleButtonClick = () => {
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init({ duration: 100 });
    }
  }, []);

  return (
    <div>
      <div className={styles.counselorContainer}>
        <video
          className={styles.backgroundVideo}
          src="https://i.imgur.com/OKLCgpA.mp4"
          autoPlay
          muted
          loop
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        />
        <div className={styles.counselorContent} data-aos="zoom-in">
          <div className={styles.counselorText} data-aos="fade-right">
            {/* Your text or other content goes here */}
          </div>
          <div className={styles.buttonContainer} data-aos="fade-left">
            <button
              className={styles.requestButton}
              onClick={handleButtonClick}
            >
              Request Callback
            </button>
          </div>
        </div>
      </div>
      {showForm && <Btnform onClose={handleCloseForm} />}
    </div>
  )
}

export default Councelor
