"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import BackgroundAnimation from "@/components/Common/BackgroundAnimation";

const SAPCompassDial = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [rotation, setRotation] = useState(0);

  const modules = [
    {
      id: "fico",
      name: "SAP FICO",
      description: "Financial Accounting & Controlling",
      percentage: 98,
      color: "#1E40AF",
      angle: 0,
      icon: "💰",
      details:
        "Master financial processes, reporting, and compliance with industry-leading placement rates",
      slug: "sap-fico-course-in-pune",
    },
    {
      id: "mm",
      name: "SAP MM",
      description: "Materials Management",
      percentage: 95,
      color: "#2563EB",
      angle: 45,
      icon: "📦",
      details:
        "Optimize procurement, inventory, and supply chain operations with proven success",
      slug: "sap-mm-course-in-pune",
    },
    {
      id: "sd",
      name: "SAP SD",
      description: "Sales & Distribution",
      percentage: 93,
      color: "#3B82F6",
      angle: 90,
      icon: "🚚",
      details:
        "Streamline sales processes and customer management for career advancement",
      slug: "sap-sd-course-in-pune",
    },
    {
      id: "abap",
      name: "SAP ABAP",
      description: "Development & Programming",
      percentage: 90,
      color: "#60A5FA",
      angle: 135,
      icon: "⚡",
      details:
        "Build custom solutions and enhance SAP functionality with cutting-edge skills",
      slug: "sap-abap-course-in-pune",
    },
    {
      id: "hcm",
      name: "SAP HCM",
      description: "Human Capital Management",
      percentage: 88,
      color: "#93C5FD",
      angle: 180,
      icon: "👥",
      details:
        "Manage workforce, payroll, and talent development with comprehensive training",
      slug: "sap-hr-hcm-course-in-pune",
    },
    {
      id: "basis",
      name: "SAP Basis",
      description: "System Administration",
      percentage: 85,
      color: "#60A5FA",
      angle: 225,
      icon: "🔧",
      details:
        "Maintain system performance and security with expert-level knowledge",
      slug: "sap-basis-course-in-pune",
    },
    {
      id: "hana",
      name: "SAP S/4 HANA",
      description: "Next-Gen ERP Suite",
      percentage: 92,
      color: "#1D4ED8",
      angle: 270,
      icon: "🚀",
      details:
        "Lead digital transformation with in-memory computing and next-gen capabilities",
      slug: "sap-hana-course-in-pune",
    },
    {
      id: "pp",
      name: "SAP PP",
      description: "Production Planning",
      percentage: 87,
      color: "#3B82F6",
      angle: 315,
      icon: "🏭",
      details:
        "Optimize manufacturing and production workflows with industry best practices",
      slug: "sap-pp-course-in-pune",
    },
  ];

  // Auto-rotate functionality - always on
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModule((prev) => {
        const currentIndex = prev
          ? modules.findIndex((m) => m.id === prev.id)
          : -1;
        const nextIndex = (currentIndex + 1) % modules.length;
        const nextModule = modules[nextIndex];

        setRotation(-nextModule.angle);
        return nextModule;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [modules]);

  const handleModuleClick = (module) => {
    setActiveModule(module);
    setRotation(-module.angle);
  };

  const CompassPoint = ({ module, isActive, isMobile }) => {
    // Responsive sizing - 550x550 desktop dimensions
    const centerX = isMobile ? 160 : 275;
    const centerY = isMobile ? 160 : 275;
    const radius = isMobile ? 120 : 220;

    const pointX =
      centerX + radius * Math.cos(((module.angle - 90) * Math.PI) / 180);
    const pointY =
      centerY + radius * Math.sin(((module.angle - 90) * Math.PI) / 180);

    return (
      <g>
        {/* Connection Line */}
        <line
          x1={centerX}
          y1={centerY}
          x2={pointX}
          y2={pointY}
          stroke={isActive ? module.color : "#374151"}
          strokeWidth={isActive ? (isMobile ? "2" : "4") : isMobile ? "1" : "2"}
          strokeDasharray={isActive ? "0" : "5,5"}
          className="transition-all duration-500"
        />

        {/* Module Point */}
        <circle
          cx={pointX}
          cy={pointY}
          r={isActive ? (isMobile ? "18" : "30") : isMobile ? "12" : "22"}
          fill={isActive ? module.color : "#1F2937"}
          stroke={module.color}
          strokeWidth={isMobile ? "2" : "3"}
          className="cursor-pointer transition-all duration-500 hover:r-20"
          onClick={() => handleModuleClick(module)}
        />

        {/* Module Icon */}
        <text
          x={pointX}
          y={pointY + (isMobile ? 4 : 8)}
          textAnchor="middle"
          fontSize={
            isActive ? (isMobile ? "16" : "25") : isMobile ? "10" : "17"
          }
          className="pointer-events-none select-none transition-all duration-500"
        >
          {module.icon}
        </text>
      </g>
    );
  };

  const StaticLabels = ({ isMobile }) => {
    const centerX = isMobile ? 160 : 275;
    const centerY = isMobile ? 160 : 275;
    const radius = isMobile ? 120 : 220;

    // Fixed positions for 8 compass points
    const fixedPositions = [
      { angle: 0, name: "North" }, // Top
      { angle: 45, name: "NE" }, // Top-right
      { angle: 90, name: "East" }, // Right
      { angle: 135, name: "SE" }, // Bottom-right
      { angle: 180, name: "South" }, // Bottom
      { angle: 225, name: "SW" }, // Bottom-left
      { angle: 270, name: "West" }, // Left
      { angle: 315, name: "NW" }, // Top-left
    ];

    return (
      <g>
        {fixedPositions.map((position, index) => {
          const pointX =
            centerX +
            radius * Math.cos(((position.angle - 90) * Math.PI) / 180);
          const pointY =
            centerY +
            radius * Math.sin(((position.angle - 90) * Math.PI) / 180);

          // Calculate which module should appear at this position based on rotation
          const rotationOffset = Math.round(rotation / 45); // Each step is 45 degrees
          const moduleIndex =
            (index - rotationOffset + modules.length * 10) % modules.length;
          const currentModule = modules[moduleIndex];

          const isActive = activeModule?.id === currentModule.id;

          return (
            <g key={`label-${position.angle}`}>
              {/* Module Label */}
              <text
                x={pointX}
                y={
                  pointY +
                  (isActive ? (isMobile ? 38 : 55) : isMobile ? 28 : 42)
                }
                textAnchor="middle"
                fill="#E5E7EB"
                fontSize={
                  isActive ? (isMobile ? "10" : "16") : isMobile ? "8" : "12"
                }
                fontWeight={isActive ? "bold" : "normal"}
                className="pointer-events-none select-none transition-all duration-500"
              >
                {currentModule.name}
              </text>

              {/* Percentage */}
              <text
                x={pointX}
                y={
                  pointY +
                  (isActive ? (isMobile ? 52 : 70) : isMobile ? 40 : 56)
                }
                textAnchor="middle"
                fill={currentModule.color}
                fontSize={
                  isActive ? (isMobile ? "9" : "14") : isMobile ? "6" : "10"
                }
                fontWeight="bold"
                className="pointer-events-none select-none transition-all duration-500"
              >
                {currentModule.percentage}%
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <div className="min-h-[700px] max-w-[1800px] mx-auto text-white p-4 md:p-8 relative">
      <BackgroundAnimation />
      {/* Header */}
      <div className="text-center mb-8 relative z-10">
      <div className="text-center">
  <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 text-white">
    SAP Placement Rate
  </h1>
  <span className="block w-40 h-1 mx-auto bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 rounded-full opacity-70"></span>
</div>

        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6">
          Navigate your SAP journey with our interactive compass. Click any
          module to explore opportunities.
        </p>
      </div>

      {/* Main Compass Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 max-w-7xl mx-auto relative z-10">
        {/* Compass Dial */}
        <div className="relative">
          {/* Desktop Compass (hidden on mobile) - 550x550 size */}
          <svg
            width="550"
            height="550"
            viewBox="0 0 550 550"
            className="hidden md:block drop-shadow-2xl"
          >
            {/* Outer Ring */}
            <circle
              cx="275"
              cy="275"
              r="260"
              fill="none"
              stroke="#374151"
              strokeWidth="3"
              strokeDasharray="12,6"
            />

            {/* Inner Ring */}
            <circle
              cx="275"
              cy="275"
              r="195"
              fill="none"
              stroke="#4B5563"
              strokeWidth="2"
              strokeDasharray="8,8"
            />

            {/* Compass Needle - Now behind center text */}
            <g
              className="transition-transform duration-1000 ease-in-out"
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: "275px 275px",
              }}
            >
              <polygon
                points="275,85 282,275 275,290 268,275"
                fill="#1E40AF"
                className="drop-shadow-lg"
              />
            </g>

            {/* Compass Rose Background - Only rotating elements */}
            <g
              className="transition-transform duration-1000 ease-in-out"
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: "275px 275px",
              }}
            >
              {/* Cardinal Direction Lines */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1="275"
                  y1="60"
                  x2="275"
                  y2="85"
                  stroke="#6B7280"
                  strokeWidth="3"
                  transform={`rotate(${angle} 275 275)`}
                />
              ))}

              {/* Module Points (without labels) */}
              {modules.map((module) => (
                <CompassPoint
                  key={module.id}
                  module={module}
                  isActive={activeModule?.id === module.id}
                  isMobile={false}
                />
              ))}
            </g>

            {/* Static Labels - These don't rotate */}
            <StaticLabels isMobile={false} />

            {/* Center Core - Above needle */}
            <circle
              cx="275"
              cy="275"
              r="65"
              fill="url(#centerGradient)"
              stroke="#3B82F6"
              strokeWidth="4"
              className="drop-shadow-lg"
            />

            {/* Center Text - Above needle */}
            <text
              x="275"
              y="270"
              textAnchor="middle"
              fill="white"
              fontSize="17"
              fontWeight="bold"
            >
              PLACEMENT
            </text>
            <text
              x="275"
              y="290"
              textAnchor="middle"
              fill="#3B82F6"
              fontSize="20"
              fontWeight="bold"
            >
              CORE
            </text>

            {/* Gradients */}
            <defs>
              <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1F2937" />
                <stop offset="100%" stopColor="#111827" />
              </radialGradient>
            </defs>
          </svg>

          {/* Mobile Compass (visible only on mobile) */}
          <svg
            width="320"
            height="380"
            viewBox="0 0 320 380"
            className="block md:hidden drop-shadow-2xl"
          >
            {/* Outer Ring */}
            <circle
              cx="160"
              cy="160"
              r="140"
              fill="none"
              stroke="#374151"
              strokeWidth="2"
              strokeDasharray="8,4"
            />

            {/* Inner Ring */}
            <circle
              cx="160"
              cy="160"
              r="105"
              fill="none"
              stroke="#4B5563"
              strokeWidth="1"
              strokeDasharray="4,4"
            />

            {/* Compass Needle - Behind center text */}
            <g
              className="transition-transform duration-1000 ease-in-out"
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: "160px 160px",
              }}
            >
              <polygon
                points="160,65 164,160 160,168 156,160"
                fill="#1E40AF"
                className="drop-shadow-lg"
              />
            </g>

            {/* Compass Rose Background - Only rotating elements */}
            <g
              className="transition-transform duration-1000 ease-in-out"
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: "160px 160px",
              }}
            >
              {/* Cardinal Direction Lines */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1="160"
                  y1="55"
                  x2="160"
                  y2="70"
                  stroke="#6B7280"
                  strokeWidth="2"
                  transform={`rotate(${angle} 160 160)`}
                />
              ))}

              {/* Module Points (without labels) */}
              {modules.map((module) => (
                <CompassPoint
                  key={module.id}
                  module={module}
                  isActive={activeModule?.id === module.id}
                  isMobile={true}
                />
              ))}
            </g>

            {/* Static Labels - These don't rotate */}
            <StaticLabels isMobile={true} />

            {/* Center Core - Above needle */}
            <circle
              cx="160"
              cy="160"
              r="38"
              fill="url(#centerGradientMobile)"
              stroke="#3B82F6"
              strokeWidth="2"
              className="drop-shadow-lg"
            />

            {/* Center Text - Above needle */}
            <text
              x="160"
              y="155"
              textAnchor="middle"
              fill="white"
              fontSize="10"
              fontWeight="bold"
            >
              PLACEMENT
            </text>
            <text
              x="160"
              y="170"
              textAnchor="middle"
              fill="#3B82F6"
              fontSize="12"
              fontWeight="bold"
            >
              CORE
            </text>

            {/* Gradients */}
            <defs>
              <radialGradient
                id="centerGradientMobile"
                cx="50%"
                cy="50%"
                r="50%"
              >
                <stop offset="0%" stopColor="#1F2937" />
                <stop offset="100%" stopColor="#111827" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Module Details Panel */}
        <div className="bg-gray-900 rounded-2xl p-4 md:p-8 border border-gray-700 max-w-md w-full">
          {activeModule ? (
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl md:text-2xl"
                  style={{
                    backgroundColor: activeModule.color + "20",
                    border: `2px solid ${activeModule.color}`,
                  }}
                >
                  {activeModule.icon}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {activeModule.name}
                  </h3>
                  <p className="text-sm md:text-base text-blue-100">
                    {activeModule.description}
                  </p>
                </div>
              </div>

              {/* Success Rate */}
              <div className="bg-[#1B263B] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 text-sm md:text-base">
                    Success Rate
                  </span>
                  <span
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: activeModule.color }}
                  >
                    {activeModule.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-1000"
                    style={{
                      width: `${activeModule.percentage}%`,
                      backgroundColor: activeModule.color,
                    }}
                  />
                </div>
              </div>

              {/* Details */}
              <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">
                  Key Benefits
                </h4>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {activeModule.details}
                </p>
              </div>

              {/* CTA */}
              <a
                href={`/${activeModule.slug}`}
                className="bg-gradient-to-r from-[#1471D8] to-[#013383] hover:from-[#1E80F0] hover:to-[#0142a3] text-white font-semibold py-3 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-block text-center text-sm md:text-base"
                style={{ willChange: "transform" }}
              >
                START LEARNING {activeModule.name}
              </a>
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <div className="text-4xl md:text-6xl mb-4">🧭</div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Choose Your Path
              </h3>
              <p className="text-sm md:text-base text-gray-400">
                Click on any module point on the compass to explore career
                opportunities and placement rates.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Statistics Footer */}
      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-4xl mx-auto relative z-10">
        <div className="text-center bg-gray-900 rounded-2xl p-4 md:p-6 border border-gray-700">
          <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 font-mono">
            5000+
          </div>
          <div className="text-gray-300 uppercase tracking-wide text-xs md:text-sm">
            Students Guided
          </div>
        </div>
        <div className="text-center bg-gray-900 rounded-2xl p-4 md:p-6 border border-gray-700">
          <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2 font-mono">
            95%
          </div>
          <div className="text-gray-300 uppercase tracking-wide text-xs md:text-sm">
            Average Success
          </div>
        </div>
        <div className="text-center bg-gray-900 rounded-2xl p-4 md:p-6 border border-gray-700">
          <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2 font-mono">
            200+
          </div>
          <div className="text-gray-300 uppercase tracking-wide text-xs md:text-sm">
            Partner Companies
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAPCompassDial;
