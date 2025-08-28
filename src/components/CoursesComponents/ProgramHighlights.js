'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import BackgroundAnimation from "@/components/Common/BackgroundAnimation";

const ProgramHighlights = () => {
  // Mobile view states (simplified - no animation)
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Desktop view states
  const [animatedCards, setAnimatedCards] = useState([]);
  const [animationKey, setAnimationKey] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [instantHideLogo, setInstantHideLogo] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  // Refs for intersection observer and animation control
  const componentRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  const rafRef = useRef(null);

  const cardData = [
    {
      id: 1,
      title: '11+ Assignments',
      subtitle: 'ConnectingDotsERP has tied up with 2000+ Companies to provide Jobs to Many Students.',
      img: "https://res.cloudinary.com/dudu879kr/image/upload/v1754313384/assingments-proghigh_aw4yku.webp",
      iconBg: "bg-indigo-500",
      accentColor: "border-indigo-500",
      description: "Work on 10+ assignments to enhance practical skills and hands-on learning.These assignments help reinforce real-world application of concepts."
    },
    {
      id: 2,
      title: 'Tied-up with 200+ Companies',
      subtitle: 'Sophisticated matte finish with elegant applications',
      img: "https://res.cloudinary.com/dudu879kr/image/upload/v1754376143/Services_qaamnb.webp",
      iconBg: "bg-indigo-500",
      accentColor: "border-indigo-500",
      description: "ConnectingDotsERP has tied up with 250+ Companies to provide Jobs to Many Students."
    },
    {
      id: 3,
      title: 'Experience Alteration System',
      subtitle: 'A dedicated placement for those who completed the course.',
      img: "https://res.cloudinary.com/dudu879kr/image/upload/v1754377173/Expertguidance_w6beel.webp",
      iconBg: "bg-indigo-500",
      accentColor: "border-indigo-500",
      description: "A Dedicated placement support is provided upon successful completion of the SAP course."
    },
    {
      id: 4,
      title: 'Job Readiness Program',
      subtitle: 'A dedicated placement for those who completed the course.',
      img: "https://res.cloudinary.com/dudu879kr/image/upload/v1754387689/imgi_126_pngtree-career-counseling-and-job-placement-platform-with-3d-icon-isolated-on-png-image_20374379_ncqv3k.webp",
      iconBg: "bg-indigo-500",
      accentColor: "border-indigo-500",
      description: "The Job Readiness Program prepares learners with industry-required skills."
    }
  ];

  // Desktop animation function with proper timing controls
  const startAnimation = () => {
    // Clear any existing animation timeouts
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Only start animation if component is fully mounted and ready
    if (!isMounted || !isReady) return;

    // Use requestAnimationFrame to ensure smooth animation start
    rafRef.current = requestAnimationFrame(() => {
      // Reset animation state
      setAnimatedCards([]);
      setShowLogo(false);
      
      // Animate cards with proper timing
      cardData.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedCards(prev => [...prev, index]);
        }, (index + 1) * 30);
      });
      
      // Show logo after all bars have finished animating out
      // Cards: 4 * 300ms = 1200ms, Bars transition duration: 700ms, Last bar starts at 1200ms
      // So last bar finishes at 1200ms + 700ms = 1900ms, add small buffer
setTimeout(() => {
  setShowLogo(true);
}, (cardData.length * 150) + 1000);

  });
  };

  // Debounced animation trigger to prevent multiple rapid calls
  const triggerAnimation = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    animationTimeoutRef.current = setTimeout(() => {
      startAnimation();
    }, 100); // Small delay to ensure DOM stability
  };

  // Component mounting and readiness effect
  useEffect(() => {
    // Set mounted state
    setIsMounted(true);
    
    // Use requestAnimationFrame to ensure DOM is fully rendered
    const readyTimeout = setTimeout(() => {
      requestAnimationFrame(() => {
        setIsReady(true);
      });
    }, 50); // Small delay to ensure layout stability

    return () => {
      clearTimeout(readyTimeout);
      setIsMounted(false);
      setIsReady(false);
    };
  }, []);

  // Intersection Observer for desktop animation trigger
  useEffect(() => {
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isReady) {
            // Reset and trigger animation when component enters viewport
            setAnimatedCards([]);
            setShowLogo(false);
            setInstantHideLogo(false);
            setAnimationKey(prev => prev + 1);
          } else if (!entry.isIntersecting) {
            // Instantly hide logo if scrolled out
            setShowLogo(false);
            setInstantHideLogo(true);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the component is visible
        rootMargin: '0px 0px -50px 0px' // Adjust this to fine-tune when animation triggers
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
      // Clean up animation references
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMounted, isReady]);

  // Start animation when animationKey changes and component is ready
  useEffect(() => {
    if (animationKey > 0 && isReady) {
      triggerAnimation();
    }
  }, [animationKey, isReady]);

  return (
    <div ref={componentRef} className="relative">
      <BackgroundAnimation />
      {/* Mobile View - Only show on screens smaller than 768px */}
      <div className="md:hidden min-h-* text-white p-4 relative z-10">
        <div className="max-w-sm mx-auto">
          <div className="text-center mb-8">
            <h1
  className="text-2xl font-extrabold tracking-wider mb-3 text-white text-center"
  style={{
    textShadow: '0 0 16px #fff, 0 0 32px #80d8ff',
    fontFamily: 'Montserrat, Quicksand, Arial, sans-serif',
    letterSpacing: '0.12em',
    lineHeight: 1.1
  }}
>
  PROGRAM HIGHLIGHTS
</h1>
<div 
            style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #a76b2e, #f18436)',
              margin: '5px auto 10px',
              borderRadius: '2px',
              marginBottom: '1rem'
            }}
          />
                    </div>

          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="relative w-80 h-60 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl shadow-2xl border border-gray-500 overflow-hidden">

                <div className="absolute bottom-4 left-4 right-4 top-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-inner border border-gray-700 overflow-hidden">
                  <div className="relative w-full h-full p-3 flex items-end justify-center gap-1.5">
                    {cardData.map((card, index) => (
                      <div
                        key={card.id}
                        className="relative cursor-pointer transition-all duration-300 ease-out opacity-100 translate-y-0 transform"
                        style={{
                          zIndex: 4 - index
                        }}
                        onMouseEnter={() => setHoveredCard(card.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        <div
                          className="absolute bg-gradient-to-b from-gray-700 to-gray-800 rounded-r-lg"
                          style={{
                            width: '4px',
                            height: '150px',
                            right: '-4px',
                            top: '3px',
                            transform: 'skewY(-2deg)',
                            zIndex: -1
                          }}
                        />
                        <div
                          className={`w-16 h-36 rounded-lg ${card.bgGradient} relative overflow-hidden shadow-lg`}
                          style={{
                            transform: hoveredCard === card.id 
                              ? 'translateY(-6px) scale(1.02)' 
                              : 'translateY(0px) scale(1)',
                            boxShadow: hoveredCard === card.id
                              ? '0 12px 25px rgba(0,0,0,0.4), inset 0 1px 3px rgba(255,255,255,0.2)'
                              : '0 6px 15px rgba(0,0,0,0.3), inset 0 1px 3px rgba(255, 255, 255, 0.2)'
                          }}
                        >
                          <div className="h-full flex flex-col p-2">
                            <div className="flex justify-end mb-1">
                              <div className="w-5 h-5 bg-black/30 rounded-full flex items-center justify-center">
                                <span className="text-xs text-white font-bold">
                                  {String(index + 1).padStart(2, '0')}
                                </span>
                              </div>
                            </div>
                            <div className="flex justify-center mb-2">
                              <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                                {card.img ? (
                                  <Image
                                    src={card.img}
                                    alt={card.title}
                                    width={32}
                                    height={32}
                                    className="w-full h-full object-cover rounded-full"
                                  />
                                ) : (
                                  <span className="text-lg text-white">{card.icon}</span>
                                )}
                              </div>
                            </div>
                            <div className="flex-1 flex items-center justify-center px-1">
                              <h3 className="text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs font-bold text-white text-center leading-tight break-words">
                                {card.title.length > 20 ? card.title.substring(0, 18) + '...' : card.title}
                              </h3>
                            </div>
                          </div>
                          <div 
                            className="absolute inset-0 opacity-20"
                            style={{
                              background: `repeating-linear-gradient(
                                45deg,
                                transparent,
                                transparent 1px,
                                rgba(255,255,255,0.1) 1px,
                                rgba(255,255,255,0.1) 2px
                              )`
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-gray-800/50 to-transparent rounded-b-2xl"></div>
              </div>
              <div className="absolute -bottom-2 left-1 right-1 h-3 bg-black/20 rounded-2xl blur-sm"></div>
            </div>
          </div>

          <div className="space-y-4">
            {cardData.map((card, index) => (
              <div
                key={card.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-600 shadow-lg relative overflow-hidden opacity-100 translate-y-0"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient}`} />
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg mb-3 shadow-md overflow-hidden bg-white/10`}>
                  {card.img ? (
                    <Image
                      src={card.img}
                      alt={card.title}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-white">{card.icon}</span>
                  )}
                </div>
                <h3 className="text-xs xs:text-sm sm:text-base md:text-lg font-semibold mb-1 text-white leading-tight truncate">
                  {card.title}
                </h3>
                <p className="text-[10px] xs:text-xs sm:text-sm md:text-base text-gray-400 mb-2 font-light truncate">
                  {card.material || 'Material'}
                </p>
                <p className="text-[10px] xs:text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed mb-3 line-clamp-2">
                  {card.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop/Tablet View - Show on 768px and above */}
      <div className="hidden md:flex min-h-* items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 relative z-10">
        <div className="w-full max-w-7xl flex flex-col items-center justify-center gap-10 lg:gap-20">
          
          {/* Desktop Heading */}
          <div className="text-center mb-8">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              letterSpacing: '4px',
              textShadow: `
                0 0 0px #fff,
                0 0 10px #fff,
                0 0 10px #0073e6,
                0 0 20px #182e4a,
                0 0 20px #182e4a,
                0 0 30px #182e4a,
                0 0 30px #182e4a
              `,
              background: 'linear-gradient(90deg, #fff 35%, rgba(3, 163, 196, 1) 49%, #fff 62%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center'
            }}
          >
            PROGRAM HIGHLIGHTS
          </h2>
          
          {/* Custom Underline */}
          <div 
            style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #a76b2e, #f18436)',
              margin: '5px auto 10px',
              borderRadius: '2px',
              marginBottom: '1rem'
            }}
          />
          
          </div>

          <div className="w-full flex flex-col md:flex-row items-start justify-between gap-6 lg:gap-12 xl:gap-20">

          {/* Card Rack/Container with Logo */}
          <div className="w-full md:w-auto flex justify-center">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:w-80 h-[360px] sm:h-[400px] md:h-[440px] lg:h-[600px] bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-600 rounded-2xl shadow-2xl overflow-hidden relative">

              {/* Rack Cards */}
              <div className="pt-6 pb-4 px-4 sm:px-5 h-full flex flex-col gap-2 items-center justify-center">
                {cardData.map((card, index) => (
                  <div
                    key={`rack-card-${card.id}-${animationKey}`}
                    className={`w-full max-w-xs sm:w-56 h-14 sm:h-16 bg-gradient-to-r from-slate-600 to-slate-700 border border-slate-500 border-l-4 ${card.accentColor} rounded-xl flex items-center gap-3 p-3 shadow-lg transition-all duration-700 ease-in-out ${
                      animatedCards.includes(index)
                        ? 'transform translate-x-full opacity-0'
                        : 'transform translate-x-0 opacity-100'
                    }`}
                    style={{
                      animationDelay: `${(index + 1) * 0.3}s`,
                      transitionDelay: `${(index + 1) * 0.3}s`
                    }}
                  >
                    <div className={`w-12 h-12 ${card.iconBg} rounded-full flex items-center justify-center text-xl shadow-md flex-shrink-0 overflow-hidden`}>
                      {card.img ? (
                        <Image
                          src={card.img}
                          alt={card.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <span>{card.icon}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-sm font-bold leading-tight mb-1 truncate">
                        {card.title}
                      </h3>
                      <p className="text-slate-400 text-xs truncate">
                        {card.material}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Logo Container - Appears after all cards animate out */}
              <div className={`absolute inset-0 flex items-center justify-center ${
                instantHideLogo ? '' : 'transition-all duration-500 ease-in-out'
              } ${showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-[350px] h-[180px] rounded-2xl shadow-xl flex items-center justify-center p-4">

                <Image
                 src="/Navbar/Connecting Logo New.png"  
                  alt="Logo"
                  width={200}         
                  height={100}          
                 />

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Display Cards Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-0 flex-1">
            {cardData.map((card, index) => (
              <div
                key={`display-card-${card.id}-${animationKey}`}
                className={`w-full h-72 md:h-[210px] lg:h-72 bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-slate-600 border-t-4 ${card.accentColor} rounded-2xl p-6 shadow-2xl transition-all duration-700 ease-in-out transform ${
                  animatedCards.includes(index)
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                } hover:scale-105 hover:shadow-3xl cursor-pointer relative`}
                style={{
                  transitionDelay: `${(index + 1) * 0.3}s`
                }}
              >
                <div className={`w-16 h-16 ${card.iconBg} rounded-full flex items-center justify-center text-2xl shadow-lg mb-6 overflow-hidden`}>
                  {card.img ? (
                    <Image
                      src={card.img}
                      alt={card.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span>{card.icon}</span>
                  )}
                </div>
                <h3 className="text-white text-xl font-bold mb-2 leading-tight">
                  {card.title}
                </h3>
                <p className="text-slate-400 text-sm font-semibold mb-4">
                  {card.material}
                </p>
                <p className="hidden lg:block text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
                  {card.description}
                </p>

              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramHighlights;