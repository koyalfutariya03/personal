import React, { useEffect, useState, useRef } from "react";
import { Cloud, renderSimpleIcon, fetchSimpleIcons } from "react-icon-cloud";

const IconsCloud = (props) => {
  const [icons, setIcons] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });
  const cloudRef = useRef(null);
  const canvasRef = useRef(null);
  const isHovering = useRef(false);
  const normalSpeedTimer = useRef(null);

  // Extract props with defaults
  const {
    size = 45,
    bgColor = "transparent",
    height = 400,
    minContrastRatio = 1.5,
    containerStyle = {},
    fallbackColor = "#ffffff",
    glowEffect = true,
    hoverEffectScale = 1.25,
    textShadow = true,
    rotationSpeed = 1,
    autoRotate = true,
    depth = 0.95,
    rotateDirection = "both",
  } = props;

  // Responsive adjustments
  const isMobile = windowSize.width < 768;
  const adjustedSize = isMobile ? size * 0.75 : size;
  const mobileHeight = isMobile ? height * 0.7 : height;
  const actualHeight = height || mobileHeight;

  // Technology slugs - Using only verified simple-icons slugs
  const technologySlugs = [
    // Core Technologies
    "sap",
    "salesforce",

    // Databases
    "mysql",
    "postgresql",
    "mongodb",
    "redis",

    // Data Science & Analytics
    "python",
    "r",
    "tensorflow",
    "pytorch",
    "pandas",
    "jupyter",
    "numpy",
    "scikitlearn",
    "openai",
    "anaconda",

    // Web Development
    "javascript",
    "typescript",
    "react",
    "nodedotjs",
    "express",
    "html5",
    "css3",
    "npm",
    "yarn",
    "webpack",
    "vite",

    // Design Tools
    "figma",
    "sketch",
    "canva",
    "photoshop",

    // Social Media & Marketing
    "facebook",
    "instagram",
    "youtube",
    "mailchimp",
    "hubspot",
    "google",
    "googleanalytics",

    // Development Tools
    "git",
    "github",
    "gitlab",
    "docker",
    "kubernetes",
    "jenkins",
    "postman",
    "swagger",
    "jira",
    "confluence",
    "slack",
    "notion",
    "trello",

    // Cloud Services
    "googlecloud",
    "firebase",
    "netlify",
    "vercel",
    "heroku",

    // Data Visualization
    "grafana",
    "elasticsearch",
    "kibana",

    // Programming Languages
    "go",
    "rust",
    "cplusplus",
    "csharp",
    "php",
    "ruby",
    "swift",
    "kotlin",

    // Frameworks
    "nextdotjs",
    "vue",
    "angular",
    "django",
    "flask",
    "laravel",
    "spring",
    "bootstrap",
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Intersection Observer for viewport visibility
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting);
      });
    }, options);

    if (cloudRef.current) {
      observer.observe(cloudRef.current);
    }

    return () => {
      if (cloudRef.current) {
        observer.unobserve(cloudRef.current);
      }
    };
  }, [cloudRef]);

  // Updated restart animation function with proper speed control
  const restartAnimation = (useNormalSpeed = true) => {
    if (!canvasRef.current || !window.TagCanvas) return;

    try {
      // Clear any existing timer
      if (normalSpeedTimer.current) {
        clearTimeout(normalSpeedTimer.current);
        normalSpeedTimer.current = null;
      }

      // Stop current animation
      window.TagCanvas.Pause(canvasRef.current);

      // Get current options with proper speed
      const options = getCloudOptions(useNormalSpeed);

      // Update the TagCanvas with new options
      window.TagCanvas.SetSpeed(canvasRef.current, [
        options.maxSpeed,
        options.initSpeed,
      ]);

      // Resume with controlled speed
      setTimeout(() => {
        try {
          if (!isHovering.current) {
            window.TagCanvas.Resume(canvasRef.current);
          }
        } catch (e) {
          console.error("Error resuming TagCanvas:", e);
        }
      }, 100);
    } catch (e) {
      console.error("Error restarting TagCanvas:", e);
    }
  };

  // Enhanced mouse leave handler with gradual speed normalization
  const handleMouseLeave = () => {
    isHovering.current = false;

    // Gradually return to normal speed
    normalSpeedTimer.current = setTimeout(() => {
      restartAnimation(true);
    }, 300); // Small delay for smooth transition
  };

  // Mouse enter handler
  const handleMouseEnter = () => {
    isHovering.current = true;

    // Clear any pending normal speed timer
    if (normalSpeedTimer.current) {
      clearTimeout(normalSpeedTimer.current);
      normalSpeedTimer.current = null;
    }
  };

  useEffect(() => {
    // Load icons
    const loadIcons = async () => {
      try {
        const iconsData = await fetchSimpleIcons({ slugs: technologySlugs });
        setIcons(iconsData);
      } catch (error) {
        console.error("Error loading icons:", error);
      }
    };

    loadIcons();

    setTimeout(() => {
      if (cloudRef.current) {
        const canvas = cloudRef.current.querySelector("canvas");
        if (canvas) {
          canvasRef.current = canvas;

          // Updated event listeners with proper speed control
          canvas.addEventListener("mouseleave", handleMouseLeave);
          canvas.addEventListener("mouseenter", handleMouseEnter);
          canvas.addEventListener("mouseout", handleMouseLeave);

          canvas.addEventListener("touchend", () => {
            setTimeout(() => restartAnimation(true), 200);
          });

          // Maintain consistent rotation when visible
          const rotationInterval = setInterval(() => {
            if (isVisible && autoRotate && !isHovering.current) {
              try {
                if (window.TagCanvas && canvasRef.current) {
                  const currentSpeed = window.TagCanvas.GetSpeed
                    ? window.TagCanvas.GetSpeed(canvasRef.current)
                    : null;
                  if (
                    !currentSpeed ||
                    (currentSpeed[0] < 0.01 && currentSpeed[1] < 0.01)
                  ) {
                    window.TagCanvas.Resume(canvasRef.current);
                  }
                }
              } catch (e) {
                // Ignore errors during periodic refresh
              }
            }
          }, 3000);

          return () => {
            clearInterval(rotationInterval);
            if (normalSpeedTimer.current) {
              clearTimeout(normalSpeedTimer.current);
            }
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            canvas.removeEventListener("mouseenter", handleMouseEnter);
            canvas.removeEventListener("mouseout", handleMouseLeave);
          };
        }
      }
    }, 1000);
  }, [isVisible, autoRotate]);

  // Calculate initial rotation based on direction with speed control
  const getCloudOptions = (useNormalSpeed = true) => {
    let initialX = 0;
    let initialY = 0;

    if (rotateDirection === "cw") {
      initialX = 0.14;
      initialY = 0.1;
    } else if (rotateDirection === "ccw") {
      initialX = -0.14;
      initialY = -0.1;
    } else if (rotateDirection === "both") {
      initialX = 0.12;
      initialY = 0.06;
    }

    // Adjust speed based on context
    const speedMultiplier = useNormalSpeed
      ? rotationSpeed
      : rotationSpeed * 0.6;

    return {
      // Core configuration
      radius: adjustedSize * 3.2,
      maxSpeed: 0.072 * speedMultiplier,
      initSpeed: 0.06 * speedMultiplier,
      direction: 135,
      keep: true,

      // 3D effects
      depth,
      wheelZoom: false,
      reverse: true,
      freezeActive: false,
      pinchZoom: false,

      // Interactive features
      activeCursor: "pointer",
      clickToFront: 600,
      imageScale: 2,

      // Visual effects
      shuffleTags: true,
      frontSelect: true,
      outlineMethod: glowEffect ? "colour" : "none",
      outlineColour: glowEffect ? "rgba(15, 170, 255, 0.5)" : "rgba(0,0,0,0.2)",
      outlineOffset: 4,
      outlineRadius: 8,
      outlineThickness: 3,

      // Animation with controlled deceleration
      fadeIn: 800,
      initial: autoRotate ? [initialX, initialY] : [0, 0],
      decel: 0.98, // Increased deceleration for smoother stops
      shadow: textShadow ? "#ffffff" : false,
      shadowBlur: textShadow ? 5 : 0,

      // Responsive behavior
      weight: true,
      zoom: 1.0,
      zoomMax: 1.0,
      zoomMin: 1.0,
      pauseOnTag: false,

      // Only animate when visible for performance
      lock: !isVisible ? "xy" : null,

      // Enhanced rotation settings
      freezeDecel: false,
      animTiming: "Smooth",
      dragControl: false,
      noSelect: true,
      noMouse: false,

      animation: autoRotate ? "both" : "none",
      activeScale: hoverEffectScale,
      textHeight: 20,

      tooltip: "native",
      tooltipDelay: 50,

      minSpeed: 0.015 * speedMultiplier, // Controlled minimum speed
      dragThreshold: 4,

      interval: 20,
      persistent: true,
      continuousRotation: true,
    };
  };

  // Loading state
  if (!icons) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: `${actualHeight}px`,
          width: "100%",
          background: bgColor,
          borderRadius: "8px",
          ...containerStyle,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              border: "4px solid rgba(0, 0, 0, 0.1)",
              borderTop: "4px solid #3498db",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
          <div>Loading course icons...</div>
        </div>
      </div>
    );
  }

  // Process icons
  const renderedIcons = Object.values(icons.simpleIcons)
    .filter((icon) => icon)
    .map((icon) => {
      const iconColor = icon.hex.toLowerCase();
      const isDarkIcon =
        iconColor === "000" ||
        iconColor === "000000" ||
        iconColor === "111" ||
        iconColor === "111111" ||
        iconColor === "222" ||
        iconColor === "222222";

      return renderSimpleIcon({
        icon,
        size: adjustedSize,
        bgHex: bgColor === "transparent" ? "#ffffff00" : bgColor,
        fallbackHex: isDarkIcon ? "#ffffff" : fallbackColor,
        minContrastRatio,
        aProps: {
          onClick: (e) => {
            e.preventDefault();
            // Gentle resume after click
            setTimeout(() => {
              if (
                canvasRef.current &&
                window.TagCanvas &&
                !isHovering.current
              ) {
                try {
                  restartAnimation(true);
                } catch (e) {
                  console.error("Error resuming TagCanvas:", e);
                }
              }
            }, 100);
          },
          href: `#${icon.slug}`,
          title: icon.title,
          "aria-label": icon.title,
          style: {
            display: "inline-block",
            transition: "all 0.3s ease",
            filter: isDarkIcon
              ? "drop-shadow(0 0 2px rgba(255, 255, 255, 0.7))"
              : "none",
            touchAction: "manipulation",
          },
        },
      });
    });

  // Enhanced container style
  const containerStyleWithDefaults = {
    background: bgColor,
    padding: isMobile ? "20px" : "30px",
    borderRadius: "12px",
    boxShadow:
      bgColor === "transparent" ? "none" : "0 15px 35px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    perspective: "1200px",
    perspectiveOrigin: "center center",
    overflow: "visible",
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...containerStyle,
  };

  return (
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
            height: `${actualHeight}px`,
            overflow: "visible",
            transform: "translateZ(0)",
            position: "relative",
          },
        }}
      >
        {renderedIcons}
      </Cloud>

      {/* Enhanced CSS */}
      <style>
        {`
          .icons-cloud-container {
            width: 100% !important;
            max-width: 100% !important;
          }
          
          .icons-cloud-container canvas {
            touch-action: manipulation;
            backface-visibility: hidden;
            will-change: transform;
            opacity: 0.95;
            max-width: none !important;
            max-height: none !important;
            transition: all 0.3s ease;
          }

          .icons-cloud-container a {
            transition: transform 0.3s ease, filter 0.3s ease, opacity 0.3s ease !important;
          }

          .icons-cloud-container a:hover {
            filter: ${glowEffect ? "drop-shadow(0 0 12px rgba(15, 170, 255, 0.8))" : "none"};
            z-index: 1000;
            opacity: 1;
          }

          .icons-cloud-container:hover canvas, 
          .icons-cloud-container canvas:hover {
            animation-play-state: running !important;
          }
          
          .tagcloud {
            position: relative !important;
            width: 100% !important;
            height: 100% !important;
          }

          /* Mobile optimizations */
          @media (max-width: 768px) {
            .icons-cloud-container canvas {
              max-height: none !important;
            }
            
            .icons-cloud-container {
              padding: 15px !important;
            }
          }
          
          /* Ensure proper circular display */
          .icons-cloud-container > div {
            width: 80% !important;
            height: 80% !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
          }
        `}
      </style>
    </div>
  );
};

export default IconsCloud;
