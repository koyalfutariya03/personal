'use client';
import React from "react";
import { useRef, useEffect } from "react";
import { Star, Users, Building, TrendingUp, Award, Globe } from "lucide-react";
 
const TrustUs = () => {
  // Using actual logo filenames from public directory
  const logoFilenames = [
    "airmeet.avif", "Aru.avif", "ask.avif", "bharatgri.avif", "Baj.avif",
    "Binary.avif", "bostonbyte.avif", "caprium.avif", "capita.avif", "crisil.avif",
    "cummins.avif", "Dconverge.avif", "dream11.avif", "eatfit.avif", "exl.avif",
    "firstcry.avif", "genius.avif", "gns(1).avif", "God.avif", "hdfc.avif",
    "homelane.avif", "Ibmm.avif", "intelliswift.avif", "iss.avif", "jindal.avif",
    "john.avif", "Kelly (1).avif", "Koh.avif", "leapfinance.avif",
    "moneytap.avif", "monginis.avif", "Na (1).avif"
  ];
 
 
  const logoPaths = logoFilenames.map((name) => `/OurClientsLogo/${name}`);
 
  const splitLogos = (logos) => {
    const third = Math.ceil(logos.length / 3);
    return [
      logos.slice(0, third),
      logos.slice(third, third * 2),
      logos.slice(third * 2)
    ];
  };
 
  const logoColumns = splitLogos(logoPaths);
 
  return (
    <div className="relative w-full max-w-[1800px] mx-auto overflow-hidden">
    <div
      className="relative w-full object-cover max-w-8xl bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-6 sm:py-8 md:py-12"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dujw4np0d/image/upload/v1751885009/.bg_tpqc0t.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <style jsx>{`
        @keyframes marqueeUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
       
        @keyframes marqueeDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
       
        .animate-marquee-up {
          animation: marqueeUp 20s linear infinite;
        }
       
        .animate-marquee-down {
          animation: marqueeDown 22s linear infinite;
        }
        .animate-marquee-up2 {
          animation: marqueeUp 24s linear infinite;
        }
        .animate-wave {
          animation: waveMove 6s linear infinite alternate;
        }
        @keyframes waveMove {
          0% { transform: translateX(0); }
          100% { transform: translateX(-40px); }
        }
        /* TrustUs heading font sizes aligned with Why.module.css */
        .trustusTitle {
          font-size: 2.5rem; /* ~40px */
        }
        @media (max-width: 800px) {
          .trustusTitle { font-size: 2.2rem; /* ~35.2px */ }
        }
        @media (max-width: 668px) {
          .trustusTitle { font-size: 1.8rem; /* ~28.8px */ }
        }
        /* Extra-small tweaks for very narrow devices */
        @media (max-width: 360px) {
          .trustusStatsContainer { padding-left: 6px; padding-right: 6px; gap: 6px; }
          .trustusCard { width: 8.75rem; height: 3rem; padding: 4px; }
          .trustusStatNumber { font-size: 1rem; }
          .trustusStatLabel { font-size: 9px; }
          .trustusLogos { height: 11rem; }
        }
        /* Slightly reduce spacing specifically for small phones <=425px */
        @media (max-width: 425px) {
          .trustusStatsContainer { justify-content: center; gap: 6px; }
        }
        /* Ultra-small fix: ensure padding so nothing is cut off at 325px */
        @media (max-width: 325px) {
          .trustusOuter { padding-left: 14px; padding-right: 14px; }
          .trustusStatsContainer { padding-left: 10px; padding-right: 10px; gap: 4px; }
          .trustusCard { width: 8.5rem; }
          .trustusLogosWrap { padding-left: 10px; padding-right: 10px; }
          .trustusLogos { gap: 0.5rem; }
          .trustusLogoCard { height: 3.25rem; }
          .trustusLogoImg { padding: 8px; }
        }
      `}</style>
     
      <div className="trustusOuter container px-4 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="trustusTitle font-bold mb-1 sm:mb-2 tracking-wider" style={{
            background: 'linear-gradient(90deg, rgba(1, 1, 98, 1) 35%, rgb(3, 111, 133) 49%, rgba(2, 2, 85, 1) 62%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            position: 'relative',
            zIndex: 1,
            letterSpacing: '1px',
            marginBottom: '0.25rem',
          }}>
            Organisations Trust Us
          </h1>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-900 mx-auto mb-3 sm:mb-4 rounded"></div>
        </div>
 
        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-6 items-start md:items-center">
          {/* Left Content - New Textual Content */}
          <div className="space-y-3 sm:space-y-4 md:space-y-3">
            <h2 className="mx-4 sm:mx-6 md:mx-2 text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 bg-clip-text text-transparent mb-1 leading-snug md:leading-tight md:text-left lg:text-center">
              200+ Organizations <br className="hidden md:block"/>Trust Us With Their Openings
            </h2>
            {/* Description content (no blob background) */}
            <div className="mb-1 rounded-2xl p-4 sm:p-6 md:p-3 pt-1 bg-transparent text-gray-800 text-sm sm:text-base md:text-sm lg:text-base font-medium leading-relaxed text-justify">
              <span className="font-bold">Organizations</span>, across the globe trust our students and their brilliant <span className="font-bold">technical skills</span> in Full Stack Development, <span className="font-bold">Data Science & Analytics with AI</span>, Java Full Stack Developer, Digital Marketing Course, AWS Cloud Technology, which results in them getting hired at excellent companies with impressive pay scales. <span className="font-bold">Connecting Dots ERP</span>, India's fastest-growing <span className="font-bold">Software Training Institute</span> provides a range of IT Courses helping to shape the future of our students in every way possible. The Coding Courses provided by our Institute are highly valuable and worthy for the students.
            </div>
            {/* Statistic Cards (below description, proper size) */}
            <div className="trustusStatsContainer flex flex-row gap-2 sm:gap-3 justify-between w-full md:hidden lg:flex lg:justify-center items-center mt-1 overflow-x-auto px-2">
              <div className="trustusCard bg-white rounded-lg shadow flex flex-col justify-center items-center shrink-0 w-36 sm:w-44 md:w-44 h-14 sm:h-16 p-1 sm:p-2">
                <span className="trustusStatNumber text-xl sm:text-2xl font-bold text-blue-600 leading-none">200+</span>
                <span className="trustusStatLabel text-gray-500 text-[10px] sm:text-xs leading-tight text-center">Hiring companies</span>
              </div>
              <div className="trustusCard bg-white rounded-lg shadow flex flex-col justify-center items-center shrink-0 w-36 sm:w-44 md:w-44 h-14 sm:h-16 p-1 sm:p-2">
                <span className="trustusStatNumber text-xl sm:text-2xl font-bold text-blue-600 leading-none">5000+</span>
                <span className="trustusStatLabel text-gray-500 text-[10px] sm:text-xs leading-tight text-center">Students already placed</span>
              </div>
            </div>
          </div>
          {/* Right Content - Logo Marquee */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl"></div>
            <div className="trustusLogosWrap relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20">
              <div className="text-center mb-6">
               
                <h3 className="text-xl font-bold text-gray-900">Our Success Stories</h3>
              </div>
             
              <div className="trustusLogos flex justify-between gap-3 sm:gap-4 h-56 sm:h-64 md:h-64 lg:h-80 overflow-hidden">
                {logoColumns.map((logos, idx) => (
                  <div
                    key={idx}
                    className="flex-1 relative overflow-hidden"
                  >
                    <div
                      className={`flex flex-col gap-3 ${
                        idx === 0 ? 'animate-marquee-up' :
                        idx === 1 ? 'animate-marquee-down' :
                        'animate-marquee-up2'
                      }`}
                    >
                      {[...logos, ...logos].map((src, index) => (
                        <div
                          key={`${idx}-${index}`}
                          className="trustusLogoCard bg-white rounded-lg shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105 h-16 sm:h-20 w-full overflow-hidden"
                        >
                          <img
                            src={src}
                            alt={`Client Logo ${index + 1}`}
                            loading="lazy"
                            decoding="async"
                            className="trustusLogoImg w-full h-full object-cover p-3 hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      ))}
                    </div>
                   
                    {/* Gradient overlays */}
                    <div className="absolute top-0 left-0 right-0 h-6 sm:h-8 bg-gradient-to-b from-white/80 to-transparent pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 bg-gradient-to-t from-white/80 to-transparent pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Statistic Cards for tablet view only */}
            <div className="hidden md:flex lg:hidden flex-row gap-3 justify-between items-center mt-4 w-full px-2">
              <div className="bg-white rounded-lg shadow flex flex-col justify-center items-center w-44 h-16 p-2">
                <span className="text-2xl font-bold text-blue-600 leading-none">200+</span>
                <span className="text-gray-500 text-xs leading-tight text-center">Hiring companies</span>
              </div>
              <div className="bg-white rounded-lg shadow flex flex-col justify-center items-center w-44 h-16 p-2">
                <span className="text-2xl font-bold text-blue-600 leading-none">5000+</span>
                <span className="text-gray-500 text-xs leading-tight text-center">Students already placed</span>
              </div>
            </div>
          </div>
        </div>
       
       
      </div>
    </div>
    </div>
  );
};
 
export default TrustUs;
 