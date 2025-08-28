"use client";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";

const INDUSTRIES_DATA = [
  {
    name: "Manufacturing",
    percentage: 92,
    color: "from-orange-400 to-purple-600",
    description:
      "Leading in digital transformation with comprehensive ERP solutions",
  },
  {
    name: "IT & Consulting",
    percentage: 89,
    color: "from-blue-400 to-purple-600",
    description: "High adoption driving client implementations and services",
  },
  {
    name: "Retail & FMCG",
    percentage: 78,
    color: "from-green-400 to-blue-600",
    description: "Streamlining supply chain and customer experience",
  },
  {
    name: "Banking & Finance",
    percentage: 85,
    color: "from-purple-400 to-pink-600",
    description: "Regulatory compliance and risk management solutions",
  },
  {
    name: "Healthcare",
    percentage: 71,
    color: "from-cyan-400 to-blue-600",
    description: "Patient data management and operational efficiency",
  },
];

// Simple solid colors for mobile - much more visible
const MOBILE_COLORS = {
  Manufacturing: "#3B82F6", // Blue-500
  "IT & Consulting": "#2563EB", // Blue-600
  "Retail & FMCG": "#1D4ED8", // Blue-700
  "Banking & Finance": "#1E40AF", // Blue-800
  Healthcare: "#1E3A8A", // Blue-900
};

// Desktop gradient colors
const DESKTOP_COLORS = {
  Manufacturing: { start: "#60A5FA", end: "#2563EB" }, // Light to mid blue
  "IT & Consulting": { start: "#3B82F6", end: "#1D4ED8" }, // Blue-500 to Blue-700
  "Retail & FMCG": { start: "#2563EB", end: "#1E40AF" }, // Blue-600 to Blue-800
  "Banking & Finance": { start: "#1D4ED8", end: "#1E3A8A" }, // Blue-700 to Blue-900
  Healthcare: { start: "#60A5FA", end: "#1E3A8A" }, // Light Blue to Deep Navy
};

const CIRCLE_CONFIG = {
  desktop: { radius: 60, strokeWidth: 8 },
  mobile: { radius: 65, strokeWidth: 14 }, // Even larger radius and thicker stroke for 2x2 grid
  get circumference() {
    return 2 * Math.PI * this.radius;
  },
};

const CircularProgress = React.memo(
  ({ industryName, percentage, index, isVisible, isMobile = false }) => {
    const [animatedPercentage, setAnimatedPercentage] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const animationRef = useRef(null);
    const rafRef = useRef(null);

    const config = isMobile ? CIRCLE_CONFIG.mobile : CIRCLE_CONFIG.desktop;
    const circumference = 2 * Math.PI * config.radius;

    const gradientId = useMemo(
      () =>
        `gradient-${industryName.replace(/\s+/g, "-").toLowerCase()}-${index}`,
      [industryName, index]
    );

    const circleProps = useMemo(() => {
      const strokeDashoffset =
        circumference - (animatedPercentage / 100) * circumference;
      const centerPoint = isMobile ? 75 : 76; // Adjusted center point for larger mobile circles
      return {
        strokeDasharray: circumference,
        strokeDashoffset,
        cx: centerPoint,
        cy: centerPoint,
        r: config.radius,
        strokeWidth: config.strokeWidth,
      };
    }, [animatedPercentage, config, circumference, isMobile]);

    const animateToPercentage = useCallback(() => {
      if (hasAnimated) return;

      let startTime = null;
      const duration = 1000;
      const startValue = 0;
      const endValue = percentage;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue =
          startValue + (endValue - startValue) * easeOutQuart;

        setAnimatedPercentage(Math.round(currentValue));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setHasAnimated(true);
        }
      };

      animationRef.current = setTimeout(() => {
        rafRef.current = requestAnimationFrame(animate);
      }, index * 200);
    }, [percentage, index, hasAnimated]);

    useEffect(() => {
      if (isVisible && !hasAnimated) {
        animateToPercentage();
      }

      return () => {
        if (animationRef.current) clearTimeout(animationRef.current);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, [isVisible, animateToPercentage, hasAnimated]);

    const svgSize = isMobile ? 150 : 152; // Larger SVG for mobile
    const viewBox = isMobile ? "0 0 150 150" : "0 0 152 152";

    // Get stroke color - solid for mobile, gradient for desktop
    const getStrokeColor = () => {
      if (isMobile) {
        return MOBILE_COLORS[industryName] || "#FF6B35";
      } else {
        return `url(#${gradientId})`;
      }
    };

    const desktopColors = DESKTOP_COLORS[industryName] || {
      start: "#f97316",
      end: "#9333ea",
    };

    return (
      <div className="relative flex flex-col items-center">
        {/* Progress Circle Container */}
        <div
          className={`${isMobile ? "w-46 h-46" : "w-52 h-52"} relative`} // Increased to w-36 h-36 for 2x2 grid
          style={{
            backgroundColor: isMobile
              ? "rgba(255, 255, 255, 0.9)"
              : "transparent",
            borderRadius: "50%",
            padding: isMobile ? "4px" : "0",
          }}
        >
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox={viewBox}
            style={{ transform: "rotate(-90deg) translateZ(0)" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Gradient definition for desktop */}
            {!isMobile && (
              <defs>
                <linearGradient
                  id={gradientId}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={desktopColors.start} />
                  <stop offset="100%" stopColor={desktopColors.end} />
                </linearGradient>
              </defs>
            )}

            {/* Background circle - more visible on mobile */}
            <circle
              cx={circleProps.cx}
              cy={circleProps.cy}
              r={circleProps.r}
              stroke={isMobile ? "#D1D5DB" : "#E5E7EB"}
              strokeWidth={circleProps.strokeWidth}
              fill="none"
              opacity={isMobile ? "0.5" : "1"}
            />

            {/* Progress circle with enhanced visibility */}
            <circle
              cx={circleProps.cx}
              cy={circleProps.cy}
              r={circleProps.r}
              stroke={getStrokeColor()}
              strokeWidth={circleProps.strokeWidth}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circleProps.strokeDasharray}
              strokeDashoffset={circleProps.strokeDashoffset}
              className="transition-all duration-75 ease-out"
              style={{
                willChange: "stroke-dashoffset",
                filter: isMobile
                  ? "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                  : "none",
              }}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div
              className={`${isMobile ? "text-xl font-bold" : "text-2xl font-bold"} text-gray-800`} // Increased to text-xl for larger circles
              style={
                isMobile
                  ? { textShadow: "1px 1px 2px rgba(255,255,255,0.8)" }
                  : {}
              }
            >
              {animatedPercentage}%
            </div>
            <div
              className={`${isMobile ? "text-sm" : "text-sm"} font-medium text-gray-600 leading-tight text-center px-1`}
              style={
                isMobile
                  ? { textShadow: "1px 1px 2px rgba(255,255,255,0.8)" }
                  : {}
              }
            >
              {industryName}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CircularProgress.displayName = "CircularProgress";

const SAPAdoptionRings = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const observerRef = useRef(null);
  const router = useRouter();

  const industries = useMemo(() => INDUSTRIES_DATA, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleIntersection = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      }
    },
    [isVisible]
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: "50px",
    });

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection]);

  const handleExploreClick = useCallback(() => {
    router.push("/sap-course-in-pune");
  }, [router]);

  return (
    <div 
      className="min-h-[700px] max-w-[1800px] mx-auto p-4 md:p-8 relative overflow-hidden"
      style={{
        background: isMobile ? '#ffffff' : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      }}
    >
      {/* Dot pattern overlay - hidden on mobile */}
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23bfc5ca' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            opacity: 0.5,
            zIndex: 0,
          }}
        />
      )}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
        <div className="relative inline-block">
  <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-2 sm:mb-4">
  SAP Skills in High Demand
  </h2>
  <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-40 h-1 bg-gradient-to-r from-black via-gray-800 to-black rounded-full opacity-90"></span>
</div>
<span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-40 h-1 bg-gradient-to-r from-black via-gray-800 to-black rounded-full opacity-90"></span>

          <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            The SAP ecosystem continues to dominate the ERP market, with over
            400,000 customers worldwide and a growing demand for skilled
            professionals. At Connecting Dots ERP, we focus on high-demand SAP
            modules that offer excellent career growth potential.
          </p>
        </div>

        <div ref={sectionRef} className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8 md:mb-12">
            SAP Adoption by Industry
          </h2>

          {/* Desktop Grid - Shows all 5 industries */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
            {industries.map((industry, index) => (
              <CircularProgress
                key={industry.name}
                industryName={industry.name}
                percentage={industry.percentage}
                index={index}
                isVisible={isVisible}
                isMobile={false}
              />
            ))}
          </div>

          {/* Mobile 2x2 Grid Layout - Shows only first 4 industries */}
          <div className="md:hidden bg-white/50 rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-6 justify-items-center">
              {industries.slice(0, 4).map((industry, index) => (
                <CircularProgress
                  key={industry.name}
                  industryName={industry.name}
                  percentage={industry.percentage}
                  index={index}
                  isVisible={isVisible}
                  isMobile={true}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
          <p className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base">
            Our training programs are continuously updated to align with the
            latest SAP innovations, including S/4HANA, SAP Cloud Platform, and
            industry-specific solutions. With over 10 years of experience in SAP
            training, we've developed partnerships with leading implementation
            companies to ensure our curriculum meets current industry needs.
          </p>

          <div className="text-center">
            <a
              href="/sap-course-in-pune"
              className="no-underline bg-gradient-to-r from-[#1471D8] to-[#013383] hover:from-[#1E80F0] hover:to-[#0142a3] text-white font-semibold py-3 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block text-center text-sm md:text-base"
              style={{ willChange: "transform" }}
            >
              EXPLORE SAP COURSES
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAPAdoptionRings;
