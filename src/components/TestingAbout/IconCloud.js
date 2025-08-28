"use client";
import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { Cloud, renderSimpleIcon, fetchSimpleIcons } from "react-icon-cloud";

// Move static data outside component to prevent recreation
const TECHNOLOGY_SLUGS = [
  // Core Technologies
  "sap", "salesforce",
  // Databases
  "mysql", "postgresql", "mongodb", "redis",
  // Data Science & Analytics
  "python", "r", "tensorflow", "pytorch", "pandas", "jupyter", "numpy", "scikitlearn", "openai", "anaconda",
  // Web Development
  "javascript", "typescript", "react", "nodedotjs", "express", "html5", "css3", "npm", "yarn", "webpack", "vite",
  // Design Tools
  "figma", "sketch", "canva", "photoshop",
  // Social Media & Marketing
  "facebook", "instagram", "youtube", "mailchimp", "hubspot", "google", "googleanalytics",
  // Development Tools
  "git", "github", "gitlab", "docker", "kubernetes", "jenkins", "postman", "swagger", "jira", "confluence", "slack", "notion", "trello",
  // Cloud Services
  "googlecloud", "firebase", "netlify", "vercel", "heroku",
  // Data Visualization
  "grafana", "elasticsearch", "kibana",
  // Programming Languages
  "go", "rust", "cplusplus", "csharp", "php", "ruby", "swift", "kotlin",
  // Frameworks
  "nextdotjs", "vue", "angular", "django", "flask", "laravel", "spring", "bootstrap",
];

// Static configuration to prevent recreation
const PERFORMANCE_CONFIG = {
  RESIZE_DEBOUNCE: 250,
  ANIMATION_FRAME_THROTTLE: 16,
  INTERSECTION_THRESHOLD: 0.1,
  ROTATION_CHECK_INTERVAL: 5000,
  HOVER_TRANSITION_DELAY: 200,
};

const IconsCloud = React.memo((props) => {
  // State management with performance optimizations
  const [icons, setIcons] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [windowSize, setWindowSize] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  }));

  // Refs for performance
  const cloudRef = useRef(null);
  const canvasRef = useRef(null);
  const isHovering = useRef(false);
  const normalSpeedTimer = useRef(null);
  const rotationInterval = useRef(null);
  const resizeTimeout = useRef(null);
  const intersectionObserver = useRef(null);
  const loadingPromise = useRef(null);

  // Extract and memoize props
  const config = useMemo(() => ({
    size: props.size || 45,
    bgColor: props.bgColor || "transparent",
    height: props.height || 400,
    minContrastRatio: props.minContrastRatio || 1.5,
    containerStyle: props.containerStyle || {},
    fallbackColor: props.fallbackColor || "#ffffff",
    glowEffect: props.glowEffect !== false,
    hoverEffectScale: props.hoverEffectScale || 1.25,
    textShadow: props.textShadow !== false,
    rotationSpeed: props.rotationSpeed || 1,
    autoRotate: props.autoRotate !== false,
    depth: props.depth || 0.95,
    rotateDirection: props.rotateDirection || "both",
  }), [
    props.size, props.bgColor, props.height, props.minContrastRatio,
    props.containerStyle, props.fallbackColor, props.glowEffect,
    props.hoverEffectScale, props.textShadow, props.rotationSpeed,
    props.autoRotate, props.depth, props.rotateDirection
  ]);

  // Memoized responsive calculations
  const responsive = useMemo(() => {
    const isMobile = windowSize.width < 768;
    const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
    
    return {
      isMobile,
      isTablet,
      adjustedSize: isMobile ? config.size * 1.5 : isTablet ? config.size * 0.9 : config.size,
      actualHeight: isMobile ? config.height * 0.8 : config.height,
    };
  }, [windowSize.width, config.size, config.height]);

  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (resizeTimeout.current) {
      clearTimeout(resizeTimeout.current);
    }
    
    resizeTimeout.current = setTimeout(() => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }, PERFORMANCE_CONFIG.RESIZE_DEBOUNCE);
  }, []);

  // Optimized intersection observer
  const setupIntersectionObserver = useCallback(() => {
    if (intersectionObserver.current) {
      intersectionObserver.current.disconnect();
    }

    intersectionObserver.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "50px",
        threshold: PERFORMANCE_CONFIG.INTERSECTION_THRESHOLD,
      }
    );

    if (cloudRef.current) {
      intersectionObserver.current.observe(cloudRef.current);
    }
  }, []);

  // Memoized cloud options
  const getCloudOptions = useCallback((useNormalSpeed = true) => {
    let initialX = 0;
    let initialY = 0;

    if (config.rotateDirection === "cw") {
      initialX = 0.14;
      initialY = 0.1;
    } else if (config.rotateDirection === "ccw") {
      initialX = -0.14;
      initialY = -0.1;
    } else if (config.rotateDirection === "both") {
      initialX = 0.12;
      initialY = 0.06;
    }

    const speedMultiplier = useNormalSpeed ? config.rotationSpeed : config.rotationSpeed * 0.6;
    const baseRadius = responsive.adjustedSize * (responsive.isMobile ? 2.8 : 3.2);
    const finalRadius = baseRadius * (responsive.isMobile ? 1.0 : 1);

    return {
      radius: finalRadius,
      maxSpeed: 0.072 * speedMultiplier,
      initSpeed: 0.06 * speedMultiplier,
      direction: 135,
      keep: true,
      depth: config.depth,
      wheelZoom: false,
      reverse: true,
      freezeActive: false,
      pinchZoom: false,
      activeCursor: "pointer",
      clickToFront: 600,
      imageScale: responsive.isMobile ? 2.4 : 2,
      shuffleTags: true,
      frontSelect: true,
      outlineMethod: config.glowEffect ? "colour" : "none",
      outlineColour: config.glowEffect ? "rgba(15, 170, 255, 0.5)" : "rgba(0,0,0,0.2)",
      outlineOffset: 4,
      outlineRadius: 8,
      outlineThickness: 3,
      fadeIn: 800,
      initial: config.autoRotate ? [initialX, initialY] : [0, 0],
      decel: 0.98,
      shadow: config.textShadow ? "#ffffff" : false,
      shadowBlur: config.textShadow ? (responsive.isMobile ? 6 : 5) : 0,
      weight: true,
      zoom: 1.0,
      zoomMax: 1.0,
      zoomMin: 1.0,
      pauseOnTag: false,
      lock: !isVisible ? "xy" : null,
      freezeDecel: false,
      animTiming: "Smooth",
      dragControl: false,
      noSelect: true,
      noMouse: false,
      animation: config.autoRotate ? "both" : "none",
      activeScale: responsive.isMobile ? 1.3 : config.hoverEffectScale,
      textHeight: responsive.isMobile ? 22 : 20,
      tooltip: "native",
      tooltipDelay: 50,
      minSpeed: 0.015 * speedMultiplier,
      dragThreshold: 4,
      interval: 20,
      persistent: true,
      continuousRotation: true,
    };
  }, [config, responsive, isVisible]);

  // Optimized animation restart
  const restartAnimation = useCallback((useNormalSpeed = true) => {
    if (!canvasRef.current || !window.TagCanvas) return;

    try {
      if (normalSpeedTimer.current) {
        clearTimeout(normalSpeedTimer.current);
        normalSpeedTimer.current = null;
      }

      window.TagCanvas.Pause(canvasRef.current);
      const options = getCloudOptions(useNormalSpeed);
      
      window.TagCanvas.SetSpeed(canvasRef.current, [options.maxSpeed, options.initSpeed]);

      setTimeout(() => {
        try {
          if (!isHovering.current && canvasRef.current) {
            window.TagCanvas.Resume(canvasRef.current);
          }
        } catch (e) {
          console.warn("TagCanvas resume error:", e);
        }
      }, 100);
    } catch (e) {
      console.warn("TagCanvas restart error:", e);
    }
  }, [getCloudOptions]);

  // Optimized event handlers
  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    normalSpeedTimer.current = setTimeout(() => {
      requestAnimationFrame(() => restartAnimation(true));
    }, PERFORMANCE_CONFIG.HOVER_TRANSITION_DELAY);
  }, [restartAnimation]);

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
    if (normalSpeedTimer.current) {
      clearTimeout(normalSpeedTimer.current);
      normalSpeedTimer.current = null;
    }
  }, []);

  // Optimized icon loading with caching
  const loadIcons = useCallback(async () => {
    if (loadingPromise.current) {
      return loadingPromise.current;
    }

    loadingPromise.current = fetchSimpleIcons({ 
      slugs: TECHNOLOGY_SLUGS 
    }).then(iconsData => {
      setIcons(iconsData);
      return iconsData;
    }).catch(error => {
      console.error("Error loading icons:", error);
      return null;
    });

    return loadingPromise.current;
  }, []);

  // Memoized rendered icons with performance optimizations
  const renderedIcons = useMemo(() => {
    if (!icons) return [];

    return Object.values(icons.simpleIcons)
      .filter(Boolean)
      .map((icon) => {
        const iconColor = icon.hex.toLowerCase();
        const isDarkIcon = ["000", "000000", "111", "111111", "222", "222222"].includes(iconColor);

        return renderSimpleIcon({
          icon,
          size: responsive.adjustedSize,
          bgHex: config.bgColor === "transparent" ? "#ffffff00" : config.bgColor,
          fallbackHex: isDarkIcon ? "#ffffff" : config.fallbackColor,
          minContrastRatio: config.minContrastRatio,
          aProps: {
            onClick: (e) => {
              e.preventDefault();
              setTimeout(() => {
                if (canvasRef.current && window.TagCanvas && !isHovering.current) {
                  requestAnimationFrame(() => restartAnimation(true));
                }
              }, 100);
            },
            href: `#${icon.slug}`,
            title: icon.title,
            "aria-label": icon.title,
            style: {
              display: "inline-block",
              transition: "all 0.3s ease",
              filter: isDarkIcon ? `drop-shadow(0 0 ${responsive.isMobile ? 3 : 2}px rgba(255, 255, 255, 0.7))` : "none",
              touchAction: "manipulation",
              willChange: "transform",
            },
          },
        });
      });
  }, [icons, responsive.adjustedSize, responsive.isMobile, config, restartAnimation]);

  // Main effects with cleanup
  useEffect(() => {
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout.current) clearTimeout(resizeTimeout.current);
    };
  }, [handleResize]);

  useEffect(() => {
    setupIntersectionObserver();
    return () => {
      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect();
      }
    };
  }, [setupIntersectionObserver]);

  useEffect(() => {
    loadIcons();
  }, [loadIcons]);

  useEffect(() => {
    const setupCanvas = () => {
      if (!cloudRef.current) return;

      const canvas = cloudRef.current.querySelector("canvas");
      if (!canvas) return;

      canvasRef.current = canvas;

      // Add event listeners with passive flags for better performance
      canvas.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      canvas.addEventListener("mouseenter", handleMouseEnter, { passive: true });
      canvas.addEventListener("mouseout", handleMouseLeave, { passive: true });
      canvas.addEventListener("touchend", () => {
        setTimeout(() => requestAnimationFrame(() => restartAnimation(true)), 200);
      }, { passive: true });

      // Optimized rotation maintenance
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current);
      }

      rotationInterval.current = setInterval(() => {
        if (isVisible && config.autoRotate && !isHovering.current) {
          try {
            if (window.TagCanvas && canvasRef.current) {
              const currentSpeed = window.TagCanvas.GetSpeed?.(canvasRef.current);
              if (!currentSpeed || (currentSpeed[0] < 0.01 && currentSpeed[1] < 0.01)) {
                window.TagCanvas.Resume(canvasRef.current);
              }
            }
          } catch (e) {
            // Ignore periodic refresh errors
          }
        }
      }, PERFORMANCE_CONFIG.ROTATION_CHECK_INTERVAL);

      return () => {
        if (rotationInterval.current) clearInterval(rotationInterval.current);
        if (normalSpeedTimer.current) clearTimeout(normalSpeedTimer.current);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        canvas.removeEventListener("mouseenter", handleMouseEnter);
        canvas.removeEventListener("mouseout", handleMouseLeave);
      };
    };

    // Delay canvas setup to ensure DOM is ready
    const timer = setTimeout(setupCanvas, 1000);
    return () => {
      clearTimeout(timer);
      if (rotationInterval.current) clearInterval(rotationInterval.current);
      if (normalSpeedTimer.current) clearTimeout(normalSpeedTimer.current);
    };
  }, [isVisible, config.autoRotate, handleMouseLeave, handleMouseEnter, restartAnimation]);

  // Memoized container styles
  const containerStyleWithDefaults = useMemo(() => ({
    background: config.bgColor,
    padding: responsive.isMobile ? "15px" : "30px",
    borderRadius: "12px",
    boxShadow: config.bgColor === "transparent" ? "none" : "0 15px 35px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    perspective: "1200px",
    perspectiveOrigin: "center center",
    overflow: "visible",
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    willChange: "transform",
    contain: "layout",
    ...config.containerStyle,
  }), [config.bgColor, config.containerStyle, responsive.isMobile]);

  // Optimized loading state
  if (!icons) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: `${responsive.actualHeight}px`,
        width: "100%",
        background: config.bgColor,
        borderRadius: "8px",
        ...config.containerStyle,
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}>
          <div style={{
            width: "50px",
            height: "50px",
            border: "4px solid rgba(0, 0, 0, 0.1)",
            borderTop: "4px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }} />
          <div>Loading course icons...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        ref={cloudRef}
        style={containerStyleWithDefaults}
        className="icons-cloud-container"
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <Cloud
          options={getCloudOptions()}
          containerProps={{
            style: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: `${responsive.actualHeight}px`,
              overflow: "visible",
              transform: "translateZ(0)",
              position: "relative",
              contain: "layout",
            },
          }}
        >
          {renderedIcons}
        </Cloud>
      </div>

      {/* Optimized CSS with critical styles only */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .icons-cloud-container {
          width: 100% !important;
          max-width: 100% !important;
          contain: layout;
        }
        
        .icons-cloud-container canvas {
          touch-action: manipulation;
          backface-visibility: hidden;
          will-change: transform;
          opacity: 0.95;
          max-width: none !important;
          max-height: none !important;
          transition: opacity 0.3s ease;
        }

        .icons-cloud-container a {
          transition: transform 0.3s ease !important;
          will-change: transform;
        }

        .icons-cloud-container a:hover {
          ${config.glowEffect ? "filter: drop-shadow(0 0 12px rgba(15, 170, 255, 0.8));" : ""}
          z-index: 1000;
          opacity: 1;
        }
        
        .tagcloud {
          position: relative !important;
          width: 100% !important;
          height: 100% !important;
        }

        @media (max-width: 768px) {
          .icons-cloud-container {
            padding: 10px !important;
          }

          .icons-cloud-container svg {
            min-width: ${responsive.adjustedSize}px !important;
            min-height: ${responsive.adjustedSize}px !important;
            width: ${responsive.adjustedSize}px !important;
            height: ${responsive.adjustedSize}px !important;
          }
          
          .icons-cloud-container a {
            padding: 4px !important;
            margin: 2px !important;
          }
        }

        .icons-cloud-container > div {
          width: ${responsive.isMobile ? "100%" : "80%"} !important;
          height: ${responsive.isMobile ? "100%" : "80%"} !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
        }
      `}</style>
    </>
  );
});

IconsCloud.displayName = 'IconsCloud';

export default IconsCloud;