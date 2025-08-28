"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const AboutGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  const images = [
    "https://i.imgur.com/rZohnIF.jpg",
    "https://i.imgur.com/vt6WzGJ.jpg",
    "https://i.imgur.com/UZSH8He.jpg",
    "https://i.imgur.com/AQjU01z.jpg",
    "https://i.imgur.com/iPTLXnY.jpg",
    "https://i.imgur.com/your4dg.jpg",
    "https://i.imgur.com/ZN86VMR.jpg",
    "https://i.imgur.com/qhMS713.jpg",
    "https://i.imgur.com/KJ5KL2n.jpg",
    "https://i.imgur.com/ADghQbm.jpg",
    "https://i.imgur.com/8FfQnL9.jpg",
    "https://i.imgur.com/ZXHDRNs.jpg",
    "https://i.imgur.com/iNrXB47.jpg",
    "https://i.imgur.com/GgPrUXL.jpg",
    "https://i.imgur.com/N9jG1Ir.jpg",
    "https://i.imgur.com/MjScSi9.jpg",
    "https://i.imgur.com/0eKfhXd.jpg",
    "https://i.imgur.com/xz6STYH.jpg",
    "https://i.imgur.com/FXN1ezN.jpg",
  ];

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (!isBrowser) return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const interval =
      !isMobile &&
      setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % images.length);
      }, 4000);

    return () => {
      window.removeEventListener("resize", handleResize);
      interval && clearInterval(interval);
    };
  }, [images.length, isMobile, isBrowser]);

  const handleImageClick = (index) => {
    setActiveIndex(index);
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="relative px-3 sm:px-4 lg:px-20 py-4 sm:py-6 lg:py-10 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      <div className="container mx-auto relative z-10">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-4 leading-tight px-2">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl lg:max-w-2xl mx-auto leading-relaxed px-4">
            Discover our journey through milestones and success stories
          </p>
        </div>

        {/* Gallery Container - Mobile First */}
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
          {/* Featured Image - Mobile Optimized */}
          <div className="lg:col-span-3 group order-1">
            <div className="relative aspect-[4/3] sm:aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg sm:rounded-xl lg:rounded-2xl xl:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl lg:shadow-2xl border border-slate-700/50">
              {/* Main Image */}
              <div
                className="relative w-full h-full transition-all duration-700 ease-out"
                style={{
                  transform: `scale(${isHovered === "featured" ? 1.02 : 1})`,
                }}
                onMouseEnter={() => setIsHovered("featured")}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Image
                  src={images[activeIndex]}
                  alt={`Achievement ${activeIndex + 1}`}
                  fill
                  className="object-cover transition-all duration-1000 ease-out group-hover:scale-105"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 66vw"
                />

                {/* Gradient Overlay - Always visible on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Image Counter - Mobile Optimized */}
                <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 px-2 sm:px-3 py-1 bg-black/60 backdrop-blur-sm rounded-md sm:rounded-full text-white text-xs sm:text-sm font-medium border border-white/20">
                  {activeIndex + 1} / {images.length}
                </div>
              </div>

              {/* Navigation Arrows - Always visible on mobile */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 sm:px-3 lg:px-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={prevImage}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 active:bg-white/40 hover:scale-110 transition-all duration-300 shadow-lg touch-manipulation"
                  aria-label="Previous image"
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={nextImage}
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 active:bg-white/40 hover:scale-110 transition-all duration-300 shadow-lg touch-manipulation"
                  aria-label="Next image"
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Progress Bar - Mobile Optimized */}
              <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-2 sm:left-3 lg:left-4 right-2 sm:right-3 lg:right-4">
                <div className="w-full h-0.5 sm:h-1 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300"
                    style={{
                      width: `${((activeIndex + 1) / images.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Grid - Mobile Optimized */}
          <div className="lg:col-span-1 order-2">
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-1 gap-2 sm:gap-3 lg:gap-4 max-h-[120px] sm:max-h-[140px] lg:max-h-[550px] overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto lg:scrollbar-thin lg:scrollbar-thumb-slate-600 lg:scrollbar-track-slate-800">
              {images.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  onClick={() => handleImageClick(index)}
                  onMouseEnter={() => setIsHovered(index)}
                  onMouseLeave={() => setIsHovered(null)}
                  className={`
                    relative aspect-square cursor-pointer rounded-md sm:rounded-lg lg:rounded-xl xl:rounded-2xl overflow-hidden transition-all duration-300 group/thumb touch-manipulation
                    ${
                      activeIndex === index
                        ? "ring-1 sm:ring-2 ring-blue-400 ring-offset-1 sm:ring-offset-2 ring-offset-slate-900 scale-105 shadow-md sm:shadow-lg shadow-blue-500/25"
                        : "hover:scale-105 hover:shadow-md hover:shadow-white/10 opacity-70 hover:opacity-100"
                    }
                  `}
                  style={{
                    transform: `translateY(${isHovered === index ? -1 : 0}px)`,
                    minWidth: isMobile ? '60px' : 'auto'
                  }}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover transition-all duration-500 group-hover/thumb:scale-110"
                    sizes="(max-width: 768px) 60px, (max-width: 1024px) 80px, 120px"
                  />

                  {/* Overlay - Simplified for mobile */}
                  <div
                    className={`
                    absolute inset-0 transition-all duration-300
                    ${
                      activeIndex === index
                        ? "bg-blue-500/20"
                        : "bg-black/30 group-hover/thumb:bg-black/10"
                    }
                  `}
                  ></div>

                  {/* Active Indicator - Mobile Optimized */}
                  {activeIndex === index && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <svg
                          className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutGallery;