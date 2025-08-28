"use client";
 
import React from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/HomePage/HeaderCarousel.module.css";
 
// simple visual fallback used for loading/errors
const FallbackBlock = () => (
<div
    style={{ backgroundColor: "#f3f4f6", minHeight: "420px", width: "100%" }}
    aria-hidden={true}
  />
);
 
// Robust loader: import the module, log its keys, and return the component under several possible names.
const importGanesha = async () => {
  try {
    const mod = await import("./Ganesha");
    // Log shape so we can see what the module actually exports during runtime
    if (typeof window !== "undefined") {
      // safe console logging only on client
      // eslint-disable-next-line no-console
      console.log("[HeaderCarousel] imported Ganesha module:", Object.keys(mod));
    }
    const comp = mod.default || mod.LandingPage || mod.Ganesha || mod;
    if (!comp) {
      // eslint-disable-next-line no-console
      console.warn("[HeaderCarousel] Ganesha module loaded but no usable export found.");
      return FallbackBlock;
    }
    return comp;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[HeaderCarousel] failed to import Ganesha:", err);
    return FallbackBlock;
  }
};
 
// Dynamically import Ganesha (handles default, named LandingPage or Ganesha export).
const LazyGanesha = dynamic(importGanesha, {
  ssr: false,
  loading: () => <FallbackBlock />,
});
 
const HeaderCarousel = () => {
  return (
<section
      aria-label="Featured Programs and Training Information"
      className={styles.carouselWrapper}
>
<LazyGanesha />
</section>
  );
};
 
export default HeaderCarousel;