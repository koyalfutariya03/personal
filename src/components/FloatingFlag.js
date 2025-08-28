"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
// A globally sticky floating button that opens the PopupForm on click
// Uses a placeholder image for the "Book For DEMO" design
export default function FloatingFlag() {
  const pathname = usePathname();
  // Hide on admin-like paths
  const hiddenPaths = ["/dashboard", "/superadmin", "/adminlogin", "/blogsadmin"];
  const isHidden = (pathname || "").toLowerCase().startsWith("/admin") ||
                   hiddenPaths.some(p => (pathname || "").toLowerCase().startsWith(p));
  useEffect(() => {
    // preload any required assets in future
  }, []);
  if (isHidden) return null;
  const handleClick = () => {
    // Fire a custom event that PopupForm listens to
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-popup-form", {
        detail: { source: "floating-flag" }
      }));
      
      // Debug log
      console.log("FloatingFlag clicked - attempting to open popup");
    }
  };
  const containerStyle = {
    position: "fixed",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1500,
    cursor: "pointer",
    overflow: "hidden",
  };
  const imageButtonStyle = {
    display: "block",
    transition: "transform 0.3s ease, filter 0.3s ease",
    position: "relative",
    animation: "waveRipple 4s ease-in-out infinite, waveFlow 2s ease-in-out infinite",
    filter: "drop-shadow(2px 2px 8px rgba(0,0,0,0.3))",
    transformStyle: "preserve-3d",
    willChange: "transform",
    transformOrigin: "left center",
  };
  return (
    <>
      <style jsx>{`
        @keyframes waveRipple {
          0% {
            transform: rotateY(0deg) rotateX(0deg);
          }
          25% {
            transform: rotateY(-5deg) rotateX(2deg) translateZ(5px);
          }
          50% {
            transform: rotateY(0deg) rotateX(-3deg) translateZ(8px);
          }
          75% {
            transform: rotateY(5deg) rotateX(2deg) translateZ(5px);
          }
          100% {
            transform: rotateY(0deg) rotateX(0deg);
          }
        }
        
        @keyframes waveFlow {
          0% {
            transform: skewY(0deg) translateY(0px);
          }
          25% {
            transform: skewY(2deg) translateY(-2px);
          }
          50% {
            transform: skewY(0deg) translateY(-4px);
          }
          75% {
            transform: skewY(-2deg) translateY(-2px);
          }
          100% {
            transform: skewY(0deg) translateY(0px);
          }
        }
        
        @keyframes shine {
          0% {
            left: -100%;
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            left: 100%;
            opacity: 0;
          }
        }
        
        .floating-flag-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.4), 
            rgba(255, 255, 255, 0.6), 
            rgba(255, 255, 255, 0.4), 
            transparent
          );
          animation: shine 2.5s ease-in-out infinite;
          z-index: 1;
          pointer-events: none;
        }
        
        .floating-flag-container {
          position: relative;
          overflow: hidden;
        }
      `}</style>
      <div style={containerStyle} aria-label="Open registration form" className="floating-flag-container">
      <button
        type="button"
        onClick={handleClick}
        style={{ 
          background: "none", 
          border: "none", 
          padding: 0,
          cursor: "pointer"
        }}
        aria-haspopup="true"
        aria-controls="popup-form"
        title="Book For DEMO - Flat 5000 Rs. OFF"
        onMouseEnter={(e) => {
          const img = e.currentTarget.querySelector('img');
          if (img) {
            img.style.transform = "translateX(8px) scale(1.05)";
            img.style.filter = "drop-shadow(4px 4px 12px rgba(0,0,0,0.4)) brightness(1.1)";
          }
        }}
        onMouseLeave={(e) => {
          const img = e.currentTarget.querySelector('img');
          if (img) {
            img.style.transform = "translateX(0) scale(1)";
            img.style.filter = "drop-shadow(2px 2px 8px rgba(0,0,0,0.3))";
          }
        }}
        onMouseDown={(e) => {
          const img = e.currentTarget.querySelector('img');
          if (img) {
            img.style.transform = "translateX(4px) scale(0.98)";
          }
        }}
        onMouseUp={(e) => {
          const img = e.currentTarget.querySelector('img');
          if (img) {
            img.style.transform = "translateX(8px) scale(1.05)";
          }
        }}
      >
        <Image
          src="/OurClientsLogo/discount.avif" // Replace with your actual image path
          alt="Book For DEMO - Flat 5000 Rs. OFF"
          width={140}
          height={100}
          style={imageButtonStyle}
          priority={true}
          // Fallback placeholder while image loads or if image fails
          onError={(e) => {
            // Create a simple fallback if image fails to load
            e.currentTarget.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.innerHTML = '📞 DEMO';
            fallback.style.cssText = `
              background: linear-gradient(to bottom, #FF7F00 0%, #FF7F00 33%, #FFFFFF 33%, #FFFFFF 66%, #128807 66%, #128807 100%);
              width: 140px;
              height: 100px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 0 8px 8px 0;
              color: white;
              font-weight: bold;
              font-size: 14px;
            `;
            e.currentTarget.parentNode.appendChild(fallback);
          }}
        />
      </button>
    </div>
    </>
  );
}