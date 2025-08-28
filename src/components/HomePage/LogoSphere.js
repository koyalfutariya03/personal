// components/HomePage/LogoSphere.js (NEW FILE - This is the wrapper)
"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';

// Dynamically import the heavy Three.js component (now named LogoSphereCore)
// Add a loading placeholder to prevent layout shift before the real content loads
const LogoSphereCore = dynamic(() => import('./LogoSphereCore'), {
  ssr: false, // This component relies heavily on browser APIs, so always render on client
  loading: () => (
    // This div will be rendered instantly, providing a placeholder for the 3D canvas
    <div style={{
      width: '340px', // These dimensions should match the expected render size of the 3D canvas
      height: '340px',
      minHeight: '340px', // Prevent layout shifts
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent', // Match your background
      borderRadius: '50%',
      // You can add a subtle animation here to indicate loading if desired
      animation: 'pulse-bg 2s infinite alternate',
    }}>
      {/* Fallback image or a simple spinner while Three.js loads */}
      <img src="/Navbar/arrow.avif" alt="Loading Logo" style={{ width: '80px', height: '80px', opacity: 0.5 }} />
    </div>
  ),
});

export default function LogoSphereWrapper() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State to tell LogoSphereCore if it's visible
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // Update visibility
        if (entry.isIntersecting && !shouldLoad) {
          // Trigger loading only when the component enters the viewport
          setShouldLoad(true);
        }
      },
      { 
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '100px' // Start loading 100px before it enters the viewport
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
    };
  }, [shouldLoad]); // Dependency on shouldLoad ensures observer setup only once

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%", // This container will manage the actual size of the logo sphere
        height: "100%",
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {shouldLoad ? (
        // Only render the heavy Three.js component when it's needed
        <LogoSphereCore isVisible={isVisible} /> 
      ) : (
        // Render the lightweight placeholder until then
        <div style={{
          width: '340px', // Matches the LogoSphereCore's expected width/height
          height: '340px',
          minHeight: '340px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          borderRadius: '50%',
          animation: 'pulse-bg 2s infinite alternate',
        }}>
          <img src="/Navbar/arrow.avif" alt="Connecting Dots ERP Logo" style={{ width: '80px', height: '80px', opacity: 0.5 }} />
        </div>
      )}
    </div>
  );
}