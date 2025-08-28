"use client";
import React from "react";
import {
  Award,
  Trophy,
  Star,
  Target,
  Zap,
  Shield,
  Users,
  Globe,
} from "lucide-react";

const AchievementsSection = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  // Top carousel achievements (10 images)
  const topAchievements = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683518/nw5iepebayoajxp8esww_b59oz2.avif",
      name: "Goal Achievement",
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683518/i06ypluultnhfliv82gy_kj0obe.avif",
      name: "Best Innovation",
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683830/bgl3w8lvskxfyhj515cx_dcaoe6.avif",
      name: "Global Recognition",
    },
    {
      id: 4,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683830/cdb8nkgkykuqoy0jfg9r_uplreg.avif",
      name: "5-Star Rating",
    },
    {
      id: 5,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683834/xtmfl5q45977ojac7anx_dlofev.avif",
      name: "Tech Innovation",
    },
    {
      id: 6,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683518/gmapy0fxdnqxpfbm83cb_r0z2fd.avif",
      name: "Industry Award 2024",
    },
    {
      id: 7,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683829/amfowsm7hpqd7teaxi3j_ysysvo.avif",
      name: "Leadership Award",
    },
    {
      id: 8,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683518/cqqyqsin3zqmard5alpa_ksnda9.avif",
      name: "Team Excellence",
    },
    {
      id: 9,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683833/utc7v1i3i7yppqi32bse_yhxtvi.avif",
      name: "Performance Excellence",
    },
    {
      id: 10,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683834/xtmfl5q45977ojac7anx_dlofev.avif",
      name: "Security Certification",
    },
  ];
  // Bottom carousel achievements (10 different images)
  const bottomAchievements = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683518/gmapy0fxdnqxpfbm83cb_r0z2fd.avif",
      name: "Industry Award 2024",
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683518/i06ypluultnhfliv82gy_kj0obe.avif",
      name: "Best Innovation",
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683830/cdb8nkgkykuqoy0jfg9r_uplreg.avif",
      name: "5-Star Rating",
    },
    {
      id: 4,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683518/nw5iepebayoajxp8esww_b59oz2.avif",
      name: "Goal Achievement",
    },
    {
      id: 5,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683833/utc7v1i3i7yppqi32bse_yhxtvi.avif",
      name: "Performance Excellence",
    },
    {
      id: 6,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683834/xtmfl5q45977ojac7anx_dlofev.avif",
      name: "Security Certification",
    },
    {
      id: 7,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683518/cqqyqsin3zqmard5alpa_ksnda9.avif",
      name: "Team Excellence",
    },
    {
      id: 8,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683830/bgl3w8lvskxfyhj515cx_dcaoe6.avif",
      name: "Global Recognition",
    },
    {
      id: 9,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683829/amfowsm7hpqd7teaxi3j_ysysvo.avif",
      name: "Leadership Award",
    },
    {
      id: 10,
      image:
        "https://res.cloudinary.com/drvug594q/image/upload/v1753683834/xtmfl5q45977ojac7anx_dlofev.avif",
      name: "Tech Innovation",
    },
  ];

  return (
    <section 
      className="py-10 sm:py-16 lg:py-20 overflow-hidden relative max-w-[1800px] mx-auto"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-6 lg:gap-8">
          {/* Vertical Rectangle Featured Achievement - Left Side (Box 1) */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl lg:rounded-4xl mb-4 lg:mb-4 h-64 sm:h-64 lg:h-96">
                <img
                  src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=320&h=480&fit=crop"
                  alt="Featured Achievement"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="flex-1 w-full">
            {/* Top Carousel (right to left) */}
            <div className="mb-4 sm:mb-6 lg:mb-8 mt-2 sm:mt-4">
              <div className="relative h-20 sm:h-24 lg:h-32 overflow-hidden">
                {/* Gradient overlays for fade effect */}
                <div className="absolute left-0 top-0 w-8 sm:w-12 lg:w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 w-8 sm:w-12 lg:w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
                {/* Scrolling container (reverse direction) */}
                <div className="flex items-center animate-scroll-right gap-0">
                  {topAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-2 sm:mx-4 lg:mx-6 bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden"
                    >
                      <img
                        src={achievement.image}
                        alt={achievement.name}
                        className="min-w-full min-h-full object-cover transform scale-125"
                      />
                    </div>
                  ))}

                  {/* Duplicate set for seamless loop */}
                  {topAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-2 sm:mx-4 lg:mx-6 bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden"
                    >
                      <img
                        src={achievement.image}
                        alt={achievement.name}
                        className="min-w-full min-h-full object-cover transform scale-125"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Heading and Subtitle */}
            <div className="mb-4 sm:mb-6 lg:mb-8 mt-6 sm:mt-8 lg:mt-12 -translate-x-16">
  <div className="w-full flex flex-col items-center">
    <h2 className="text-center text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-2 sm:mb-4">
      Our Achievements
    </h2>
    <span className="w-40 h-1 bg-gradient-to-r from-black via-gray-800 to-black rounded-full opacity-90"></span>
  </div>

  <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto text-center">
    Discover our journey through milestones and success stories
  </p>
</div>

            {/* Bottom Carousel (left to right) */}
            <div className="mb-4 sm:mb-6 lg:mb-8 mt-6 sm:mt-8 lg:mt-12">
              <div className="relative h-20 sm:h-24 lg:h-32 overflow-hidden ">
                {/* Gradient overlays for fade effect */}
                <div className="absolute left-0 top-0 w-8 sm:w-12 lg:w-20 h-full bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 w-8 sm:w-12 lg:w-20 h-full bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

                {/* Scrolling container */}
                <div className="flex animate-scroll-left">
                  {/* First set of achievements */}
                  {bottomAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-2 sm:mx-4 lg:mx-6 bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden"
                    >
                      <img
                        src={achievement.image}
                        alt={achievement.name}
                        className="min-w-full min-h-full object-cover transform scale-125"
                      />
                    </div>
                  ))}
                  {/* Duplicate set for seamless loop */}
                  {bottomAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-2 sm:mx-4 lg:mx-6 bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden"
                    >
                      <img
                        src={achievement.image}
                        alt={achievement.name}
                        className="min-w-full min-h-full object-cover transform scale-125"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
        .animate-scroll-right {
          animation: scroll-right 20s linear infinite;
        }
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default AchievementsSection;
