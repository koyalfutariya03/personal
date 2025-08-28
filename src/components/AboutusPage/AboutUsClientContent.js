// src/components/AboutusPage/AboutUsClientContent.js
"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import all potentially problematic components
const PageHeader = dynamic(
  () => import("@/components/AboutusPage/PageHeader"),
  { ssr: false, loading: () => <p>Loading Header...</p> }
);
const StickyScrollReveal = dynamic(
  () => import("@/components/AboutusPage/StickyScrollReveal"),
  { ssr: false, loading: () => <p>Loading Scroll...</p> }
);
const ProgressBars = dynamic(
  () => import("@/components/AboutusPage/ProgressBars"),
  { ssr: false, loading: () => <p>Loading Progress...</p> }
);
const AboutGallery = dynamic(
  () => import("@/components/AboutusPage/AboutGallery"),
  { ssr: false, loading: () => <p>Loading Gallery...</p> }
);
const Branches = dynamic(() => import("@/components/AboutusPage/Branches"), {
  ssr: false,
  loading: () => <p>Loading Branches...</p>,
});

import styles from "@/styles/AboutPage.module.css";

const AboutUsClientContent = () => {
  return (
    <div className={styles.container} id="dynamic-about-content">
      <div id="PageHeader" className={styles.section}>
        <PageHeader />
      </div>
      <div id="StickyScrollReveal" className={styles.section}>
        <StickyScrollReveal />
      </div>
      <div id="progressbar" className={styles.section}>
        <ProgressBars />
      </div>
      <div id="gallery" className={styles.section}>
        <AboutGallery />
      </div>
      <div id="branches" className={styles.section}>
        <Branches />
      </div>
    </div>
  );
};

export default AboutUsClientContent;
