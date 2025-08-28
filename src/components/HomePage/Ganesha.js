"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";

const LandingPage = () => {
  const toranRef = useRef(null);
  const containerRef = useRef(null);
  const idleCallback =
    typeof window !== "undefined" &&
    (window.requestIdleCallback || ((cb) => setTimeout(cb, 1)));

  // JS-measured connectors: compute exact coordinates for each diya
  const [connectorLines, setConnectorLines] = useState([]);

  // Ensure portal rendering only on client
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Defer heavy decorations (SVGs, background) until the browser is idle
  const [deferReady, setDeferReady] = useState(false);
  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    idleCallback(() => {
      if (!cancelled) setDeferReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [mounted]);

  useEffect(() => {
    function computeConnectors() {
      if (!containerRef.current || !toranRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const svg = toranRef.current?.querySelector(".toran-svg");
      if (!svg) return;

      const svgRect = svg.getBoundingClientRect();
      // toran path is drawn at y=48 in a 140px-high SVG viewBox
      const anchorY =
        svgRect.top - containerRect.top + (48 / 140) * svgRect.height;

      const selectors = [
        "diya-left-1",
        "diya-left-2",
        "diya-right-1",
        "diya-right-2",
      ];
      const lines = selectors
        .map((cls) => {
          const diyaContainer = container.querySelector(`.${cls}`);
          if (!diyaContainer) return null;

          // try to read the inner SVG and the line element that defines the string length
          const innerSvg = diyaContainer.querySelector("svg");
          if (innerSvg) {
            const sRect = innerSvg.getBoundingClientRect();
            const svgW =
              parseFloat(innerSvg.getAttribute("width")) || sRect.width;
            const svgH =
              parseFloat(innerSvg.getAttribute("height")) || sRect.height;
            const lineEl = innerSvg.querySelector("line");

            const xAttr = lineEl
              ? parseFloat(lineEl.getAttribute("x1"))
              : svgW / 2;
            const y2Attr = lineEl
              ? parseFloat(lineEl.getAttribute("y2"))
              : svgH;

            // compute coordinates relative to container
            const xPage = Math.round(
              sRect.left - containerRect.left + (xAttr / svgW) * sRect.width
            );
            const yDiya = Math.round(
              sRect.top - containerRect.top + (y2Attr / svgH) * sRect.height
            );

            return {
              id: cls,
              x: xPage,
              y1: Math.round(anchorY),
              y2: yDiya - 4,
            };
          }

          // fallback: use container center
          const r = diyaContainer.getBoundingClientRect();
          const x = Math.round(r.left - containerRect.left + r.width / 2);
          const yDiya = Math.round(r.top - containerRect.top + r.height * 0.6);
          return { id: cls, x, y1: Math.round(anchorY), y2: yDiya - 4 };
        })
        .filter(Boolean);

      setConnectorLines(lines);
    }

    // compute on mount and keep updated during resize/scroll
    computeConnectors();
    let raf = null;
    const handler = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeConnectors);
    };
    window.addEventListener("resize", handler, { passive: true });
    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mounted]);

  // generate non-overlapping positions (percent coordinates) for Om background
  function generateOmPositions(count) {
    const positions = [];
    const maxAttempts = 15000;
    let attempts = 0;

    const sizeToRadius = {
      "om-small": 5,
      "om-medium": 8,
      "om-large": 12,
    };

    function randSize() {
      const r = Math.random();
      if (r < 0.28) return "om-large";
      if (r < 0.62) return "om-medium";
      return "om-small";
    }

    while (positions.length < count && attempts < maxAttempts) {
      attempts++;
      const left = Math.round(Math.random() * 100);
      const top = Math.round(Math.random() * 100);
      const sizeClass = randSize();
      const radius = sizeToRadius[sizeClass];

      let ok = true;
      for (const p of positions) {
        const dx = left - p.left;
        const dy = top - p.top;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minAllowed = (radius + sizeToRadius[p.sizeClass]) * 0.9;
        if (dist < minAllowed) {
          ok = false;
          break;
        }
      }

      if (top < 8) ok = false;

      if (ok) {
        const delay = (positions.length * 0.7).toFixed(2) + "s";
        const duration = 10 + (positions.length % 5) * 2 + "s";
        positions.push({ left, top, sizeClass, delay, duration });
      }
    }

    if (positions.length < count) {
      positions.length = 0;
      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols && positions.length < count; c++) {
          const left = Math.round(((c + 0.5) * 100) / cols);
          const top = Math.round(((r + 0.5) * 100) / rows) + 6;
          positions.push({
            left,
            top,
            sizeClass: "om-medium",
            delay: "0s",
            duration: "12s",
          });
        }
      }
    }

    return positions;
  }

  const [omPositions, setOmPositions] = useState([]);

  useEffect(() => {
    setOmPositions(generateOmPositions(36));
  }, []);

  // Memoize static large SVG (toran) to avoid re-creating on re-renders
  const toranMemo = useMemo(() => (
      <div className="toran-wrapper" ref={toranRef} aria-hidden="true">
        <div className="relative left-0 right-0 px-0">
          <svg
            className="toran-svg"
            viewBox="0 0 1400 140"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
          >
            <defs>
              <linearGradient id="flowerGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#ffb300" />
                <stop offset="50%" stopColor="#ff6a00" />
                <stop offset="100%" stopColor="#ffd54a" />
              </linearGradient>
              <linearGradient id="tasselGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#ff4b6b" />
                <stop offset="100%" stopColor="#ffcc00" />
              </linearGradient>
              <linearGradient id="leafGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#2f9e44" />
                <stop offset="100%" stopColor="#71BF54" />
              </linearGradient>

              <radialGradient id="bulbGrad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#fffbe6" stopOpacity="1" />
                <stop offset="35%" stopColor="#fff59d" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#ffb300" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ff6a00" stopOpacity="0" />
              </radialGradient>

              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter
                id="toranShadow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feDropShadow
                  dx="0"
                  dy="6"
                  stdDeviation="6"
                  floodColor="rgba(0,0,0,0.18)"
                />
              </filter>
            </defs>

            <path
              d="M0 48 Q100 12 200 48 T400 48 T600 48 T800 48 T1000 48 T1200 48 T1400 48"
              stroke="#a55e00"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />

            {(() => {
              const elements = [];
              const totalWidth = 1400;
              const count = 48;
              const amplitude = 18;
              const cycles = 2;

              let d = "";
              for (let i = 0; i < count; i++) {
                const t = i / (count - 1);
                const bx = Math.round(t * totalWidth);
                const angle = t * Math.PI * 2 * cycles;
                const by = 48 + Math.round(Math.sin(angle) * amplitude);
                d += i === 0 ? `M ${bx} ${by}` : ` L ${bx} ${by}`;
              }

              elements.push(
                <path
                  key="toran-string"
                  d={d}
                  stroke="#8a4a00"
                  strokeWidth={1}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.95}
                >
                  <animate attributeName="stroke-opacity" values="0.6;0.98;0.6" dur="3.6s" repeatCount="indefinite" />
                  <animate attributeName="stroke-width" values="1;1.8;1" dur="3.6s" repeatCount="indefinite" />
                </path>
              );

              for (let i = 0; i < count; i++) {
                const t = i / (count - 1);
                const bx = Math.round(t * totalWidth);
                const angle = t * Math.PI * 2 * cycles;
                const baseBy = 48 + Math.round(Math.sin(angle) * amplitude);

                elements.push(
                  <g key={`bulb-${i}`} transform={`translate(${bx},${baseBy})`} filter="url(#glow)">
                    <g>
                      <circle r="12" fill="url(#bulbGrad)" opacity="0.28" />
                      <g>
                        <circle r="6" fill="url(#bulbGrad)" opacity="0.98">
                          <animate attributeName="opacity" values="0.7;1;0.7" dur={`${2.2 + (i % 4) * 0.18}s`} repeatCount="indefinite" />
                        </circle>
                        <animateTransform attributeName="transform" type="scale" values="0.88;1.08;0.88" dur={`${2.2 + (i % 4) * 0.18}s`} begin={`${(i % 6) * 0.06}s`} repeatCount="indefinite" />
                      </g>
                      <circle r="2" fill="#fffdf2" cx="-1" cy="-2" opacity="0.95" />
                    </g>
                  </g>
                );
              }

              return elements;
            })()}

            {Array.from({ length: 7 }).map((_, i) => {
              const cx = 100 + i * 200;
              return (
                <g key={`cluster-${i}`} transform={`translate(${cx},48)`}>
                  <g transform="translate(-36,8) rotate(-12)">
                    <path d="M0 0 C 6 -10 20 -10 36 0 C 20 -2 6 -2 0 0 Z" fill="url(#leafGrad)" opacity="0.95" />
                  </g>
                  <g transform="translate(36,8) rotate(12)">
                    <path d="M0 0 C -6 -10 -20 -10 -36 0 C -20 -2 -6 -2 0 0 Z" fill="url(#leafGrad)" opacity="0.95" />
                  </g>

                  <g transform="translate(0,26)">
                    <path d="M0 0 C 4 8 12 16 0 32 C -12 16 -4 8 0 0 Z" fill="url(#tasselGrad)" opacity="0.95" />
                    <g stroke="#ffb300" strokeWidth="1.5" strokeLinecap="round" opacity="0.95">
                      <line x1="-6" y1="6" x2="-6" y2="22" />
                      <line x1="-2" y1="6" x2="-2" y2="26" />
                      <line x1="2" y1="6" x2="2" y2="26" />
                      <line x1="6" y1="6" x2="6" y2="22" />
                    </g>
                  </g>

                  <g filter="url(#toranShadow)">
                    {Array.from({ length: 12 }).map((_, p) => (
                      <ellipse key={`petal-${i}-${p}`} rx="10" ry="22" fill="url(#flowerGrad)" opacity={0.98} transform={`rotate(${p * 30}) translate(0,-6)`} />
                    ))}

                    {Array.from({ length: 8 }).map((_, p) => (
                      <ellipse key={`petal2-${i}-${p}`} rx="6" ry="14" fill="#ff8f00" opacity={0.95} transform={`rotate(${p * 45 + 22.5}) translate(0,-4)`} />
                    ))}

                    <g filter="url(#glow)" transform="translate(0,0)">
                      <circle r="10" fill="url(#bulbGrad)" opacity="0.22" />
                      <g>
                        <circle r="6" fill="url(#bulbGrad)" opacity="0.98">
                          <animate attributeName="opacity" values="0.7;1;0.7" dur={`${2 + (i % 3) * 0.45}s`} repeatCount="indefinite" />
                        </circle>
                        <animateTransform attributeName="transform" type="scale" values="0.9;1.18;0.9" dur={`${2 + (i % 3) * 0.45}s`} begin={`${(i % 6) * 0.06}s`} repeatCount="indefinite" />
                      </g>
                      <circle r="2" fill="#fffdf2" cx="-1" cy="-2" opacity="0.95" />
                    </g>
                  </g>
                </g>
              );
            })}

            {Array.from({ length: 6 }).map((_, j) => {
              const x = 200 + j * 200;
              return (
                <g key={`loop-${j}`} transform={`translate(${x},48)`}>
                  <path d="M-28 6 C -12 14 12 14 28 6" stroke="#eaa23a" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.95" />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
  ), []);

  // Memoize Om background nodes
  const omBackgroundMemo = useMemo(() => (
    <div className="om-bg min-h-screen">
      {omPositions.length > 0 &&
        omPositions.map((pos, i) => {
          if (!pos) return null;
          const { left, top, sizeClass, delay, duration } = pos;
          return (
            <div
              key={`om-full-${i}`}
              className={`om-char ${sizeClass}`}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                color: `rgba(255, ${165 - i * 2}, ${0 + i * 1}, 0.14)`,
                animation: `om-float ${duration} ease-in-out ${delay} infinite`,
              }}
            >
              ॐ
            </div>
          );
        })}
    </div>
  ), [omPositions]);

  return (
    <div
      ref={containerRef}
      className="min-h-[700px] pt-50 pb-50 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
    >
      <Head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </Head>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@400;600&display=swap");

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .chakra-rotate {
          animation: spin-slow 20s linear infinite;
        }

        .hero-heading {
          font-family: "Playfair Display", serif;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #6a3600;
          line-height: 1.05;
          text-transform: none;
          font-size: clamp(25px, 4vw, 46px);
        }

        .hero-subheading {
          font-family: "Poppins", sans-serif;
          font-weight: 500;
          color: #7b3f00;
          text-align: left;
          font-size: clamp(16px, 2.8vw, 24px);
          letter-spacing: 0.02em;
        }

        .om-bg {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        @media (max-width: 1024px) {
          .om-bg {
            width: 100%;
          }
        }
        .om-char {
  position: absolute;
  font-size: 64px;
  color: rgba(255, 165, 0, 0.2); /* base orange */
  filter: drop-shadow(0 0 20px rgba(255, 165, 0, 0.6))
          drop-shadow(0 0 40px rgba(255, 140, 0, 0.4))
          drop-shadow(0 0 60px rgba(255, 100, 0, 0.2));
  pointer-events: none;

  background: linear-gradient(90deg,
    rgba(255,140,0,0.2) 0%,
    rgba(255,180,50,0.9) 50%,
    rgba(255,140,0,0.2) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: om-shine 4s linear infinite;
}

@keyframes om-shine {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.om-small {
  font-size: 32px;
}
.om-medium {
  font-size: 56px;
}
.om-large {
  font-size: 96px;
}
       /* Toran positioning - adjusted for mobile */
        .toran-wrapper {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          pointer-events: none;
          z-index: 60;
        }
        .toran-svg {
          width: 100vw;
          max-width: none;
          height: 140px;
          overflow: visible;
          display: block;
        }
        .toran-flower {
          filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.25));
        }
        .toran-loop {
          fill: rgba(165, 94, 0, 0.9);
        }

        /* Diya positioning variables */
        :root {
          --diya-top: 300px;
          --diya-left-1: 1%;
          --diya-left-2: 5%;
          --diya-right-1: 1%;
          --diya-right-2: 5%;
        }
        .diya-container {
          position: absolute;
          top: var(--diya-top);
          pointer-events: none;
          z-index: 50;
        }

        .diya-left-1 {
          left: var(--diya-left-1);
        }
        .diya-left-2 {
          left: var(--diya-left-2);
        }
        .diya-right-1 {
          right: var(--diya-right-1);
        }
        .diya-right-2 {
          right: var(--diya-right-2);
        }

        /* Mobile/Tablet layout styles */
        .mobile-reorder-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          align-items: center;
          text-align: center;
        }

        .mobile-banner {
          width: 100%;
          max-width: 600px;
        }

        .mobile-text {
          transform: none !important;
          padding-top: 8px;
          max-width: none;
        }

        /* Mobile adjustments - move toran up and spread diyas wider */
        @media (max-width: 1024px) {
          :root {
            --diya-top: 180px;
            --diya-left-1: 0%;
            --diya-left-2: 3%;
            --diya-right-1: 0%;
            --diya-right-2: 3%;
          }

          .hero-heading {
            padding-left: 0 !important;
            margin-left: 0 !important;
          }

          .hero-subheading-wrapper {
            margin-left: 0 !important;
            justify-content: center;
          }

          /* Move toran up by 50% of its current position */
          .toran-wrapper {
            top: -40px; /* Move up significantly on mobile */
          }
          .diya-container {
            top: var(--diya-top);
          }
        }

        @media (max-width: 768px) {
          :root {
            --diya-top: 150px;
            --diya-left-1: -1%;
            --diya-left-2: 2%;
            --diya-right-1: -1%;
            --diya-right-2: 2%;
          }
          /* Move toran even higher on smaller screens */
          .toran-wrapper {
            top: -40px;
          }
        }

        /* Very small screens - even more spacing */
        @media (max-width: 390px) {
          :root {
            --diya-top: 150px;
            --diya-left-1: -2%;
            --diya-left-2: 1%;
            --diya-right-1: -2%;
            --diya-right-2: 1%;
          }
          .toran-wrapper {
            top: -40px;
          }
        }

        .diya-string,
        .diya-string-reverse {
          transform-origin: top center;
        }

        .diya-flame,
        .diya-flame-alt {
          transform-origin: bottom center;
        }

        @keyframes flame-sway {
          0% {
            transform: translateX(0px) rotate(0deg) scale(1);
          }
          30% {
            transform: translateX(1.2px) rotate(-0.8deg) scale(1.01);
          }
          60% {
            transform: translateX(-0.9px) rotate(0.6deg) scale(0.995);
          }
          100% {
            transform: translateX(0px) rotate(0deg) scale(1);
          }
        }

        .diya-flame {
          animation: flame-sway 3s ease-in-out infinite;
          transform-origin: 60px bottom;
        }
        .diya-flame-alt {
          animation: flame-sway 3.6s ease-in-out infinite;
          transform-origin: 60px bottom;
        }

        .diya-glow {
          filter: drop-shadow(0 0 20px rgba(255, 165, 0, 0.6))
            drop-shadow(0 0 40px rgba(255, 69, 0, 0.4));
        }

        @media (max-width: 1024px) {
          .diya-scale {
            transform: scale(0.8);
          }
        }

        @media (max-width: 768px) {
          .diya-scale {
            transform: scale(0.6);
          }
        }

        @media (max-width: 480px) {
          .diya-scale {
            transform: scale(0.5);
          }
        }

        .diya-connector-overlay line {
          stroke: #8a4a00;
          stroke-width: 1;
          stroke-linecap: round;
          opacity: 0.95;
        }
        .diya-connector-overlay circle {
          fill: #8a4a00;
        }

        .left-content {
        }
        .image-stage {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .chakra-img {
          width: clamp(280px, 36vw, 500px);
          height: auto;
          display: block;
          transform: translateY(2%);
         filter: drop-shadow(0 0 20px rgba(255, 165, 0, 0.6)) 
        drop-shadow(0 0 40px rgba(255, 69, 0, 0.4))
        drop-shadow(0 0 60px rgba(255, 140, 0, 0.2));
        }
        .ganesh-img {
          width: clamp(260px, 30vw, 520px);
          height: auto;
          display: block;
          position: relative;
        }
        .diya-svg {
          max-width: 120px;
          width: 120px;
          height: auto;
          display: block;
        }

        @media (max-width: 1024px) {
          .left-content {
            transform: none !important;
            padding-top: 8px;
          }
          .image-stage {
            width: 92%;
            max-width: 720px;
          }
          .chakra-img {
            width: clamp(240px, 38vw, 500px);
            transform: translateY(2%);
          }
          .ganesh-img {
            width: clamp(240px, 36vw, 460px);
          }
          .diya-scale {
            transform: scale(0.9);
          }
          .diya-connector-overlay line {
            stroke-width: 1.2;
          }
          .diya-connector-overlay circle {
            r: 3.5;
          }
        }

        @media (max-width: 768px) {
          .container {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }
          .hero-heading {
            font-size: clamp(22px, 7.5vw, 38px);
            line-height: 1.02;
          }
          .image-stage {
            width: 100%;
            max-width: 560px;
          }
          .chakra-img {
            width: clamp(240px, 44vw, 520px);
            transform: translateY(3%);
          }
          .ganesh-img {
            width: clamp(220px, 40vw, 420px);
          }
          .diya-scale {
            transform: scale(0.72);
          }
        }

        @media (max-width: 480px) {
          .hero-heading {
            font-size: 22px;
          }
          .image-stage {
            width: 100%;
            max-width: 420px;
          }
          .chakra-img {
            width: clamp(180px, 48vw, 340px);
            transform: translateY(3%);
          }
          .ganesh-img {
            width: clamp(180px, 56vw, 360px);
          }
          .diya-scale {
            transform: scale(0.55);
          }
        }
      `}</style>

      {/* Om animated background */}
      {deferReady && omBackgroundMemo}

      {/* Toran Garland at top - now positioned to avoid text overlap on mobile */}
      {deferReady && toranMemo}

      <div className="container mx-auto px-6 py-12 flex items-center min-h-* relative z-20">
        {/* Desktop/Laptop Layout (≥1024px) - ORIGINAL STRUCTURE PRESERVED */}
        <div className="hidden lg:block w-full">
          <div className="flex items-center justify-between w-full">
            {/* Left Content */}
            <div
              className="flex-1 max-w-2xl left-content"
              style={{ transform: "translate(24px, 70px)" }}
            >
              <div className="ml-0 lg:ml-16">
                <h2 className="hero-heading text-5xl leading-tight mb-6">
                  PROFESSIONAL
                  <br />
                  SAP & IT TRAINING
                  <br />
                  INSTITUTE
                </h2>
              </div>

              {/* Banner Image */}
              <div className="relative w-full max-w-xl mt-4 mb-8 ml-0 lg:ml-16 overflow-hidden rounded-lg">
  {/* Shining Border */}
  <div className="absolute inset-0 rounded-lg p-[2px] bg-gradient-to-r from-orange-400 via-yellow-300 to-red-500 animate-shine"></div>

  <Image
    src="https://res.cloudinary.com/dujw4np0d/image/upload/v1755863184/Media_kwhvxn.jpg"
    alt="Professional Training Programs"
    width={1200}
    height={600}
    className="relative w-full h-auto object-cover rounded-lg"
    priority
    unoptimized
  />
</div>


              <div className="mt-12 flex justify-center lg:justify-start ml-0 lg:ml-16">
                <p className="hero-subheading text-2xl font-semibold text-center">
                  Advance your skills in{" "}
                  <strong className="text-[#fb650b] text-3xl">SAP & IT </strong>
                  
                  with our expert led programs
                </p>
              </div>
            </div>

            {/* Right Content - Image with Chakra Background */}
            <div className="flex-1 flex justify-center items-center relative image-stage transition-transform translate-y-14">
              {/* Chakra Background */}
              <div
                className="absolute inset-0 flex justify-center items-center"
                aria-hidden="true"
                style={{ zIndex: 20 }}
              >
                <Image
                  src="https://res.cloudinary.com/dujw4np0d/image/upload/v1755691814/2-removebg-preview_rotdja.png"
                  alt="Chakra"
                  width={300}
                  height={300}
                  className="opacity-100 object-contain chakra-rotate chakra-img"
                  priority
                  unoptimized
                />
              </div>
              {/* Ganesh Image */}
              <div
                className="relative"
                style={{ zIndex: 40, position: "relative" }}
              >
                <Image
                  src="https://res.cloudinary.com/dujw4np0d/image/upload/v1755693805/imgi_108_a-vibrant-illustration-of-lor-removebg-preview_kns23j.avif"
                  alt="Ganesh"
                  width={350}
                  height={490}
                  className="object-contain ganesh-img"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout (<1024px) - NEW REORDERED STRUCTURE */}
        <div className="block lg:hidden w-full">
          <div className="mobile-reorder-container">
            {/* Banner Image - First on mobile */}
            <div className="mobile-banner">
              <div className="relative w-full max-w-xl overflow-hidden rounded-lg shadow-[0_0_40px_10px_rgba(255,255,255,0.5)]">
                <Image
                  src="https://res.cloudinary.com/dujw4np0d/image/upload/v1755863184/Media_kwhvxn.jpg"
                  alt="Professional Training Programs"
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>

            {/* Ganesh Content - Second on mobile */}
            <div className="flex justify-center items-center relative image-stage">
              {/* Chakra Background */}
              <div
                className="absolute inset-0 flex justify-center items-center"
                aria-hidden="true"
                style={{ zIndex: 20 }}
              >
                <Image
                  src="https://res.cloudinary.com/dujw4np0d/image/upload/v1755691814/2-removebg-preview_rotdja.png"
                  alt="Chakra"
                  width={300}
                  height={300}
                  className="opacity-100 object-contain chakra-rotate chakra-img"
                  priority
                  unoptimized
                />
              </div>
              {/* Ganesh Image */}
              <div
                className="relative"
                style={{ zIndex: 40, position: "relative" }}
              >
                <Image
                  src="https://res.cloudinary.com/dujw4np0d/image/upload/v1755693805/imgi_108_a-vibrant-illustration-of-lor-removebg-preview_kns23j.avif"
                  alt="Ganesh"
                  width={350}
                  height={490}
                  className="object-contain ganesh-img"
                  priority
                  unoptimized
                />
              </div>
            </div>

            {/* Text Content - Third on mobile */}
            <div className="mobile-text">
              <h2 className="hero-heading text-5xl leading-tight mb-6">
                PROFESSIONAL
                <br />
                SAP & IT TRAINING
                <br />
                INSTITUTE
              </h2>

              <div className="mt-12 flex justify-center hero-subheading-wrapper">
                <p className="hero-subheading text-2xl font-semibold text-center">
                  Advance your skills in{" "}
                  <strong className="text-[#fb650b] text-2xl">SAP & IT </strong>
                  
                  with our expert led programs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JS-drawn connector overlay: now uses absolute positioning */}
      {deferReady && (
      <svg
        aria-hidden="true"
        className="diya-connector-overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 49,
        }}
      >
        {connectorLines.map((ln) => (
          <g key={ln.id}>
            <line x1={ln.x} y1={ln.y1} x2={ln.x} y2={ln.y2} strokeWidth={1} />
            <circle cx={ln.x} cy={ln.y2} r={3} />
          </g>
        ))}
      </svg>
      )}

      {/* Hanging Diyas */}
      {deferReady && <HangingDiyas />}
    </div>
  );
};

// Hanging Diya Component (unchanged)
const HangingDiyaBase = ({
  position = "left",
  animationDelay = "0s",
  stringLength = 120,
  offsetX = 0,
}) => {
  const flickerDur1 = position.includes("2") ? "1.6s" : "1.4s";
  const flickerDur2 = position.includes("right") ? "1.5s" : "1.3s";
  const flickerBegin = position.includes("right") ? "0.22s" : "0s";
  return (
    <div className={`diya-container diya-${position}`}>
      <div
        className={`${position.includes("1") ? "diya-string" : "diya-string-reverse"} diya-scale`}
        style={{ animationDelay: animationDelay }}
      >
        <svg
          width="120"
          height={200 + stringLength}
          viewBox={`0 0 120 ${200 + stringLength}`}
          className="diya-glow diya-svg"
        >
          <defs>
            <linearGradient
              id={`stringGrad-${position}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#8B4513" />
              <stop offset="100%" stopColor="#A0522D" />
            </linearGradient>
            <linearGradient
              id={`diyaBodyGrad-${position}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="30%" stopColor="#FFA500" />
              <stop offset="70%" stopColor="#FF8C00" />
              <stop offset="100%" stopColor="#CD853F" />
            </linearGradient>
            <linearGradient
              id={`flameGrad-${position}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#FFE135" />
              <stop offset="30%" stopColor="#FF6B35" />
              <stop offset="70%" stopColor="#FF4500" />
              <stop offset="100%" stopColor="#DC143C" />
            </linearGradient>
            <radialGradient
              id={`glowGrad-${position}`}
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop offset="0%" stopColor="rgba(255, 165, 0, 0.8)" />
              <stop offset="70%" stopColor="rgba(255, 69, 0, 0.4)" />
              <stop offset="100%" stopColor="rgba(255, 69, 0, 0)" />
            </radialGradient>
          </defs>

          <line
            x1="60"
            y1="0"
            x2="60"
            y2={stringLength + 30}
            stroke={`url(#stringGrad-${position})`}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          <ellipse
            cx="60"
            cy={stringLength + 60}
            rx="35"
            ry="15"
            fill={`url(#diyaBodyGrad-${position})`}
          />
          <ellipse
            cx="60"
            cy={stringLength + 55}
            rx="32"
            ry="12"
            fill="#FFD700"
            opacity="0.8"
          />
          <ellipse
            cx="60"
            cy={stringLength + 52}
            rx="28"
            ry="8"
            fill="#FFFF99"
            opacity="0.6"
          />

          <ellipse
            cx="60"
            cy={stringLength + 53}
            rx="25"
            ry="6"
            fill="#8B4513"
            opacity="0.7"
          />

          <rect
            x="59"
            y={stringLength + 45}
            width="2"
            height="10"
            fill="#654321"
          />

          <g
            className={position.includes("1") ? "diya-flame" : "diya-flame-alt"}
            style={{
              animationDelay: position.includes("right") ? "0.5s" : "0s",
            }}
          >
            <ellipse
              cx="60"
              cy={stringLength + 35}
              rx="8"
              ry="15"
              fill={`url(#flameGrad-${position})`}
              opacity="0.9"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 1.2 0; -0.8 0; 0 0"
                dur={flickerDur1}
                begin={flickerBegin}
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="scale"
                values="1;1.03;1"
                dur={flickerDur1}
                begin={flickerBegin}
                repeatCount="indefinite"
                additive="sum"
              />
            </ellipse>
            <ellipse
              cx="60"
              cy={stringLength + 38}
              rx="5"
              ry="10"
              fill="#FFE135"
              opacity="0.8"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0.9 0; -0.6 0; 0 0"
                dur={flickerDur2}
                begin={flickerBegin}
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="scale"
                values="1;1.025;1"
                dur={flickerDur2}
                begin={flickerBegin}
                repeatCount="indefinite"
                additive="sum"
              />
            </ellipse>
            <ellipse
              cx="60"
              cy={stringLength + 40}
              rx="3"
              ry="6"
              fill="#FFFF99"
              opacity="0.9"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0.6 0; -0.4 0; 0 0"
                dur={flickerDur2}
                begin={flickerBegin}
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="scale"
                values="1;1.02;1"
                dur={flickerDur2}
                begin={flickerBegin}
                repeatCount="indefinite"
                additive="sum"
              />
            </ellipse>
          </g>

          <ellipse
            cx="60"
            cy={stringLength + 35}
            rx="25"
            ry="25"
            fill={`url(#glowGrad-${position})`}
            opacity="0.3"
          />
        </svg>
      </div>
    </div>
  );
};

const HangingDiya = React.memo(HangingDiyaBase);

const HangingDiyasBase = () => {
  return (
    <>
      <HangingDiya position="left-1" stringLength={100} />
      <HangingDiya position="left-2" stringLength={140} />
      <HangingDiya position="right-1" stringLength={120} />
      <HangingDiya position="right-2" stringLength={160} />
    </>
  );
};

const HangingDiyas = React.memo(HangingDiyasBase);

export default LandingPage;
export { LandingPage, LandingPage as Ganesha };