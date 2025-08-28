"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";

// Optimized dynamic imports with better loading states
const IconCloud = dynamic(() => import("./IconCloud"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full min-h-[200px]">
      <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 border-b-2 border-yellow-400"></div>
    </div>
  ),
});

const Btnform = dynamic(() => import("../HomePage/Btnform"), {
  ssr: false,
});

export default function Hero() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);
  const [vantaLoaded, setVantaLoaded] = useState(false);
  const [screenSize, setScreenSize] = useState("desktop");
  const [scriptsLoaded, setScriptsLoaded] = useState({
    three: false,
    vanta: false,
  });

  // Form state management
  const [showForm, setShowForm] = useState(false);
  const handleButtonClick = useCallback(() => setShowForm(true), []);
  const handleCloseForm = useCallback(() => setShowForm(false), []);

  // Enhanced screen size detection with more precise tablet breakpoints
  const checkScreenSize = useCallback(() => {
    const width = window.innerWidth;
    let newSize;

    if (width < 640) newSize = "mobile";
    else if (width < 768) newSize = "sm";
    else if (width < 1024) newSize = "tablet";
    else if (width < 1280) newSize = "laptop";
    else if (width < 1536) newSize = "desktop";
    else newSize = "xl";

    setScreenSize((prev) => (prev !== newSize ? newSize : prev));
  }, []);

  // Optimized Vanta configuration with better tablet settings
  const vantaConfig = useMemo(() => {
    const isMobile = ["mobile", "sm"].includes(screenSize);
    const isTablet = screenSize === "tablet";

    return {
      el: null,
      mouseControls: !isMobile,
      touchControls: true,
      gyroControls: false,
      minHeight: isMobile ? 400 : isTablet ? 500 : 200,
      minWidth: isMobile ? 320 : isTablet ? 768 : 200,
      scale: isMobile ? 0.6 : isTablet ? 0.75 : 1.0,
      scaleMobile: 0.6,
      color: 0x60707,
      shininess: isMobile ? 15 : isTablet ? 20 : 30,
      waveHeight: isMobile ? 8 : isTablet ? 12 : 20,
      waveSpeed: isMobile ? 0.7 : isTablet ? 0.8 : 1.0,
      zoom: isMobile ? 0.5 : isTablet ? 0.55 : 0.65,
    };
  }, [screenSize]);

  // Optimized script loading with better caching
  const loadScript = useCallback(
    (src, name) => {
      return new Promise((resolve, reject) => {
        if (scriptsLoaded[name]) {
          resolve();
          return;
        }

        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          if (existingScript.dataset.loaded === "true") {
            setScriptsLoaded((prev) => ({ ...prev, [name]: true }));
            resolve();
          } else {
            existingScript.addEventListener("load", () => {
              setScriptsLoaded((prev) => ({ ...prev, [name]: true }));
              resolve();
            });
          }
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.dataset.loaded = "false";

        script.onload = () => {
          script.dataset.loaded = "true";
          setScriptsLoaded((prev) => ({ ...prev, [name]: true }));
          resolve();
        };

        script.onerror = () => {
          console.warn(`Failed to load ${name} script`);
          reject(new Error(`Failed to load ${name}`));
        };

        document.head.appendChild(script);
      });
    },
    [scriptsLoaded]
  );

  // Debounced resize handler with better performance
  useEffect(() => {
    let timeoutId;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkScreenSize, 100);
    };

    checkScreenSize();
    window.addEventListener("resize", debouncedResize, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedResize);
    };
  }, [checkScreenSize]);

  // Optimized Vanta initialization with better error handling
  useEffect(() => {
    let mounted = true;
    let loadTimeout;

    const initializeVanta = async () => {
      const isMobile = ["mobile", "sm"].includes(screenSize);
      
      // Skip Vanta on slow connections
      if (isMobile && window.navigator?.connection?.effectiveType === "2g") {
        setVantaLoaded(true);
        return;
      }

      try {
        // Load scripts with timeout
        await Promise.race([
          loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js",
            "three"
          ),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), 8000)
          ),
        ]);

        if (!mounted) return;

        await Promise.race([
          loadScript(
            "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.waves.min.js",
            "vanta"
          ),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Timeout")), 8000)
          ),
        ]);

        if (!mounted || !window.VANTA || !vantaRef.current) return;

        // Clean up existing effect
        if (vantaEffect.current) {
          vantaEffect.current.destroy();
        }

        // Initialize Vanta with optimized settings
        vantaEffect.current = window.VANTA.WAVES({
          ...vantaConfig,
          el: vantaRef.current,
        });

        if (mounted) {
          setVantaLoaded(true);
        }
      } catch (error) {
        console.warn("Vanta.js initialization failed:", error);
        if (mounted) {
          setVantaLoaded(true);
        }
      }
    };

    // Use requestIdleCallback for better performance
    if ("requestIdleCallback" in window) {
      loadTimeout = requestIdleCallback(initializeVanta, { timeout: 3000 });
    } else {
      loadTimeout = setTimeout(initializeVanta, 200);
    }

    return () => {
      mounted = false;
      if ("requestIdleCallback" in window) {
        cancelIdleCallback(loadTimeout);
      } else {
        clearTimeout(loadTimeout);
      }
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [vantaConfig, loadScript]);

  // Enhanced icon cloud props with better tablet optimization
  const getIconCloudProps = useMemo(() => {
    const props = {
      mobile: {
        size: 28,
        height: 240,
        rotationSpeed: 0.6,
        radius: 160,
        maxSpeed: 0.04,
        initialSpeed: 0.015,
      },
      sm: {
        size: 32,
        height: 280,
        rotationSpeed: 0.65,
        radius: 170,
        maxSpeed: 0.04,
        initialSpeed: 0.015,
      },
      tablet: {
        size: 40, // Optimized for tablet
        height: 320, // Better height for tablet
        rotationSpeed: 0.7,
        radius: 180, // Better radius for tablet
        maxSpeed: 0.04,
        initialSpeed: 0.02,
      },
      laptop: {
        size: 42,
        height: 350,
        rotationSpeed: 0.75,
        radius: 190,
        maxSpeed: 0.04,
        initialSpeed: 0.02,
      },
      desktop: {
        size: 48,
        height: 400,
        rotationSpeed: 0.8,
        radius: 200,
        maxSpeed: 0.04,
        initialSpeed: 0.02,
      },
      xl: {
        size: 55,
        height: 450,
        rotationSpeed: 0.85,
        radius: 220,
        maxSpeed: 0.04,
        initialSpeed: 0.02,
      },
    };

    return {
      ...props[screenSize],
      bgColor: "transparent",
      glowEffect: true,
      iconOpacity: 0.9,
      cloudRadius: props[screenSize].radius,
      minDistance: 40,
      maxDistance: props[screenSize].radius,
    };
  }, [screenSize]);

  return (
    <div className="relative overflow-hidden bg-[#1a1f36] max-w-[1800px] mx-auto">
      {/* Vanta.js Background with optimized loading */}
      <div
        ref={vantaRef}
        className={`absolute inset-0 z-0 transition-opacity duration-700 ${
          vantaLoaded ? "opacity-100" : "opacity-0"
        } w-full h-full`}
        style={{ 
          willChange: "opacity",
          minHeight: "100vh"
        }}
      />

      {/* Optimized fallback gradient */}
      <div
        className={`absolute inset-0 z-0 bg-gradient-to-br from-[#1a1f36] via-[#2a2d47] to-[#1a1f36] w-full h-full transition-opacity duration-700 ${
          vantaLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Reduced floating particles for better performance */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400/20 rounded-full animate-ping animation-delay-0"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400/30 rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-purple-400/20 rounded-full animate-bounce animation-delay-2000"></div>
      </div>

      {/* Desktop Icon Cloud - Optimized positioning */}
      <div className="absolute right-16 md:right-20 lg:right-24 xl:right-28 top-1/2 transform -translate-y-1/2 w-1/3 lg:w-2/5 xl:w-1/3 z-10 opacity-90 hidden lg:block">
        <div className="flex items-center justify-center h-full">
          <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg">
            <IconCloud {...getIconCloudProps} />
          </div>
        </div>
      </div>

      {/* Main Content with better responsive spacing */}
      <main className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Content with improved tablet spacing */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
              {/* Brand Badge */}
              <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 backdrop-blur-sm">
                <span className="text-yellow-400 text-xs sm:text-sm font-medium">
                  🏆 #1 SAP Training Institute
                </span>
              </div>

              {/* Main Heading with better tablet typography */}
              <div className="space-y-2 sm:space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                  <span className="mr-2">Connecting</span>
                  <span className="text-yellow-400">Dots ERP</span>
                </h1>

                {/* Animated accent line */}
                <div className="relative">
                  <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-4 h-1 bg-white rounded-full animate-ping"></div>
                </div>
              </div>

              {/* Description with better tablet sizing */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                Transform your career with industry-leading SAP training.
                <span className="text-yellow-400 font-semibold">
                  {" "}
                  Expert-led courses
                </span>{" "}
                with
                <span className="text-yellow-400 font-semibold">
                  {" "}
                  hands-on experience
                </span>{" "}
                to excel in the ERP industry.
              </p>

              {/* Mobile/Tablet Icon Cloud with better positioning */}
              <div className="block py-6 md:py-8 lg:hidden">
                <div className="flex justify-center">
                  <div
                    className="relative"
                    style={{
                      width: `${Math.min(getIconCloudProps.height * 1.2, 380)}px`,
                      height: `${getIconCloudProps.height + 20}px`,
                      transform: "translateZ(0)",
                    }}
                  >
                    <IconCloud {...getIconCloudProps} />
                  </div>
                </div>
              </div>

              {/* Stats Section with better tablet layout */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 py-4 sm:py-6">
                <div className="text-center group">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-yellow-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                    No.1
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-400 leading-tight">
                    Training Center
                  </div>
                </div>

                <div className="text-center group">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-yellow-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                    5K+
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-400 leading-tight">
                    Students Trained
                  </div>
                </div>

                <div className="text-center group">
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-yellow-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                    10+
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-gray-400 leading-tight">
                    Years Experience
                  </div>
                </div>
              </div>

              {/* CTA Button with better responsive sizing */}
              <div className="flex justify-center md:justify-start lg:justify-start xl:justify-start pt-2">
                <button
                  className="group relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 text-black font-bold px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg shadow-2xl shadow-yellow-500/25 hover:shadow-yellow-500/40 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
                  onClick={handleButtonClick}
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></div>

                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    🚀 Enroll Now
                  </span>

                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 transform transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>

                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-yellow-400/50 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
                </button>
              </div>

              {/* Trust indicators with better tablet layout */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 pt-4 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <span className="text-green-400">✓</span>
                  <span>100% Placement Support</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-400">✓</span>
                  <span>Industry Experts</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-400">✓</span>
                  <span>Live Projects</span>
                </div>
              </div>
            </div>

            {/* Right Content - Empty for mobile, reserved for desktop */}
            <div className="hidden lg:block">
              {/* This space is used by the absolutely positioned desktop icon cloud */}
            </div>
          </div>
        </div>
      </main>

      {/* Optimized Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleCloseForm}
          ></div>

          {/* Modal Content */}
          <div className="relative z-[10000] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <Btnform onClose={handleCloseForm} />
          </div>
        </div>
      )}

      {/* Custom CSS for animation delays */}
      <style jsx>{`
        .animation-delay-0 {
          animation-delay: 0s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}