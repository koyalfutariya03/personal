// components/HomePage/Certificate.js (Tailwind + original heading styles)
"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "@/styles/HomePage/Certificate.module.css";

// Dynamically import Btnform to prevent SSR-related issues
const Btnform = dynamic(() => import("@/components/HomePage/Btnform"), {
  ssr: false,
});

// Certificate now directly receives the 'data' prop
const Certificate = ({ data }) => {
  const [showForm, setShowForm] = useState(false);
  const handleButtonClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <div className="relative w-full max-w-[1800px] mx-auto overflow-hidden bg-white dotted-bg pt-3 py-14">
      <div className="max-w-[1800px] mx-auto relative">
        <div className="text-center mb-3 px-4 sm:px-2 md:px-8 lg:px-16 xl:px-20">
          <h2 className={styles.certificateTitle}>Certificate</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        {/* Main Green Background Box */}
        <div className={`bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-8 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6 grid grid-cols-1 lg:grid-cols-2 items-center relative z-10 mx-4 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-24 ${styles.certificateBox}`}>
          {/* Left Side Content */}
          <div className="space-y-5">
            <h2 className="text-2xl text-center font-bold">Congratulations on Completing Your Training!</h2>
            <span className=" text-white text-xl text-center block">
              {data?.courseTitle || "SAP Training Certificate"}
            </span>
            <p className="text-gray-300 text-sm leading-relaxed text-center">
              The Connecting Dots SAP Certification Course is designed to enhance your expertise in SAP systems and set you on the path to a successful career in ERP. Our program goes beyond theoretical learning, offering hands-on practical sessions and real-world scenarios across various SAP modules.
              <br />
              With expert guidance and a focus on practical application, you'll be well-equipped to thrive in the dynamic world of SAP and meet the evolving needs of modern businesses.
            </p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleButtonClick}
                className="sliding-button bg-white border-2 border-[#0d2b27] text-[#0d2b27] font-semibold py-1 px-4 text-xs rounded-full shadow-lg transition-all duration-500 ease-in-out sm:py-2 sm:px-5 sm:text-sm lg:py-3 lg:px-7 lg:text-base hover:bg-gradient-to-r hover:from-blue-900 hover:to-blue-700 hover:text-white hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <span className="sm:hidden">Get Certificate</span>
                <span className="hidden sm:inline">Get Your Certificate</span>
              </button>
            </div>
          </div>

          {/* Right Side Certificate Image */}
          <div className="relative mt-10 lg:mt-0 flex justify-center">
            <div className="relative z-20 -my-10">
              <div className="certificate-wrapper">
                <div className="bg-white rounded-xl border-4 border-gray-200">
                  <Image
                    src={data?.image || "/Certificate/Certificate-1.avif"}
                    alt={data?.alt || `${data?.courseTitle || "SAP Training"} Certificate`}
                    width={1000}
                    height={600}
                    className="certificate-image w-full lg:max-w-lg h-auto lg:h-96 object-contain rounded-xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showForm && <Btnform onClose={handleCloseForm} />}
      </div>

      <style jsx>{`
        .dotted-bg {
          background-color: #ffffff;
          /* light blue dots */
          background-image: radial-gradient(rgba(59, 130, 246, 0.18) 1.5px, transparent 1.5px);
          background-size: 18px 18px;
          background-position: 0 0;
        }

        .certificate-wrapper {
          position: relative;
          box-shadow: 
            /* Subtle left white shadow */
            -15px 0 25px -8px rgba(255, 255, 255, 0.3),
            /* Subtle right white shadow */
            15px 0 25px -8px rgba(255, 255, 255, 0.3);
        }
        
        .certificate-image {
          position: relative;
          z-index: 2;
          background: white;
          border-radius: 0.75rem;
          border: 4px solid #e0e0e0;
        }
        
        @keyframes flow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .sliding-button {
          position: relative;
          overflow: hidden;
        }
        
        .sliding-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          transition: left 0.8s;
        }
        
        .sliding-button:hover::before {
          left: 100%;
        }
        
        .sliding-button:active::before {
          left: 100%;
        }

        /* Mobile-specific styles */
        @media (max-width: 1024px) {
          .certificateBox {
            padding: 1.5rem !important;
          }

          .certificate-wrapper {
            margin-top: 1rem !important;
          }

          .certificate-image {
            height: auto !important;
            max-width: 100% !important;
            max-height: 300px !important;
          }
        }

        @media (max-width: 768px) {
          .certificateBox {
            padding: 1rem !important;
          }

          .certificate-wrapper {
            margin-top: 0.5rem !important;
          }

          .certificate-image {
            max-height: 250px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Certificate;