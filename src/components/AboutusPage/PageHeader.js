"use client";
import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/AboutPage/PageHeader.module.css";

// Dynamically import components to prevent SSR-related issues
const IconCloud = dynamic(() => import("@/components/AboutusPage/IconCloud"), {
  ssr: false,
});

const Btnform = dynamic(() => import("@/components/HomePage/Btnform"), {
  ssr: false,
});

const PageHeader = ({
  speed = 1,
  borderColor = "#444",
  squareSize = 40,
  slant = 15,
  colors = ["#FF6B6B", "#6BFF95", "#6B95FF", "#FFD36B", "#D36BFF"],
}) => {
  const canvasRef = useRef(null);
  const contentRef = useRef(null);
  const textSectionRef = useRef(null);
  const iconSectionRef = useRef(null);
  const requestRef = useRef(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [isInteractiveElement, setIsInteractiveElement] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trustedByCount, setTrustedByCount] = useState(0);
  const [isBrowser, setIsBrowser] = useState(false);
  const targetCount = 5000;

  // Set isBrowser to true once component is mounted
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Animation for entrance effects
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Counter animation for trusted by numbers
  useEffect(() => {
    if (isVisible) {
      // Small delay before starting the counter animation
      const counterDelay = setTimeout(() => {
        const duration = 2000; // 2 seconds duration
        const steps = 50; // Number of steps
        const increment = Math.ceil(targetCount / steps);
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= targetCount) {
            setTrustedByCount(targetCount);
            clearInterval(timer);
          } else {
            setTrustedByCount(current);
          }
        }, duration / steps);
        
        return () => clearInterval(timer);
      }, 800);
      
      return () => clearTimeout(counterDelay);
    }
  }, [isVisible]);

  // Canvas and grid animation
  useEffect(() => {
    // Only run this effect on the client side
    if (!isBrowser) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const textSection = textSectionRef.current;
    const iconSection = iconSectionRef.current;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          const p1 = { x: squareX, y: squareY };
          const p2 = { x: squareX + squareSize - slant, y: squareY };
          const p3 = { x: squareX + squareSize, y: squareY + squareSize };
          const p4 = { x: squareX + slant, y: squareY + squareSize };

          // Add color if hovered and not over interactive elements
          if (
            hoveredSquare.current &&
            Math.floor((x - startX) / squareSize) === hoveredSquare.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquare.current.y &&
            !isInteractiveElement
          ) {
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineTo(p3.x, p3.y);
            ctx.lineTo(p4.x, p4.y);
            ctx.closePath();
            ctx.fill();
          }

          // Draw grid lines
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();
          ctx.stroke();
        }
      }
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed * 0.03, 0.3);
      gridOffset.current.x =
        (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
      gridOffset.current.y =
        (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const hoveredSquareX = Math.floor(mouseX / squareSize);
      const hoveredSquareY = Math.floor(mouseY / squareSize);

      hoveredSquare.current = { x: hoveredSquareX, y: hoveredSquareY };
    };

    const handleMouseLeave = () => {
      hoveredSquare.current = null;
    };

    // Check if mouse is over text or icon sections
    const isMouseOverInteractiveElements = (event) => {
      if (!textSection || !iconSection) return false;

      const textRect = textSection.getBoundingClientRect();
      const iconRect = iconSection.getBoundingClientRect();
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const isOverText =
        mouseX >= textRect.left &&
        mouseX <= textRect.right &&
        mouseY >= textRect.top &&
        mouseY <= textRect.bottom;

      const isOverIcon =
        mouseX >= iconRect.left &&
        mouseX <= iconRect.right &&
        mouseY >= iconRect.top &&
        mouseY <= iconRect.bottom;

      return isOverText || isOverIcon;
    };

    const handleCanvasMouseMove = (event) => {
      handleMouseMove(event);
      setIsInteractiveElement(isMouseOverInteractiveElements(event));
    };

    canvas.addEventListener("mousemove", handleCanvasMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      canvas.removeEventListener("mousemove", handleCanvasMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [speed, borderColor, colors, squareSize, slant, isInteractiveElement, isBrowser]);

  const handleButtonClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <div className={styles.pageHeader}>
      <canvas ref={canvasRef} className={styles.squaresCanvas}></canvas>

      <div
        ref={contentRef}
        className={`${styles.content} ${
          isVisible ? styles.contentVisible : ""
        }`}
      >
        <div ref={textSectionRef} className={styles.textSection}>
          <div className={styles.contentContainer}>
            <div
              className={`${styles.titleWrapper} ${
                isVisible ? styles.animateTitle : ""
              }`}
            >
              <h1 className={styles.title}>Connecting Dots ERP</h1>
              <div className={styles.titleUnderline}></div>
            </div>

            <p
              className={`${styles.description} ${
                isVisible ? styles.animateDescription : ""
              }`}
            >
              We are a leading SAP training institute dedicated to shaping
              skilled professionals for the ever-growing ERP industry. Our
              expert-led courses equip you with real-world knowledge and
              hands-on experience to excel in your SAP career.
            </p>
            <div
              className={`${styles.statsContainer} ${
                isVisible ? styles.animateStats : ""
              }`}
            >
              <div className={styles.statItem}>
                <span className={styles.statNumber}>No.1</span>
                <span className={styles.statLabel}>
                  Training & Placement Center
                </span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Trusted By</span>
                <span className={`${styles.statNumber} ${styles.countingNumber}`}>
                  {trustedByCount.toLocaleString()}+
                </span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
            </div>
            <div
              className={`${styles.buttonContainer} ${
                isVisible ? styles.animateButton : ""
              }`}
            >
              <button
                className={styles.enrollButton}
                onClick={handleButtonClick}
              >
                <span className={styles.buttonText}>Enroll Now</span>
                <span className={styles.buttonIcon}>→</span>
              </button>
            </div>
          </div>
        </div>

        <div ref={iconSectionRef} className={styles.iconCloudSection}>
          <IconCloud />
        </div>
      </div>

      {showForm && <Btnform onClose={handleCloseForm} />}
    </div>
  );
};

export default PageHeader;