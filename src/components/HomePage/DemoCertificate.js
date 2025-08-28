// components/HomePage/DemoCertificate.js (Tailwind + original heading styles)
"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "@/styles/HomePage/Certificate.module.css";

// Dynamically import Btnform to prevent SSR-related issues
const Btnform = dynamic(() => import("@/components/HomePage/Btnform"), {
  ssr: false,
});

// Hardcoded certificate data
const certificateData = {
  courseTitle: "SAP Training Certificate",
  alt: "sap-training-certification-from-connecting-dots-erp",
  image: "/Certificate/Certificate.avif",
  completionText:
    "The Connecting Dots SAP Certification Course is designed to enhance your expertise in SAP systems and set you on the path to a successful career in ERP. Our program goes beyond theoretical learning, offering hands-on practical sessions and real-world scenarios across various SAP modules.",
  description:
    "With expert guidance and a focus on practical application, you'll be well-equipped to thrive in the dynamic world of SAP and meet the evolving needs of modern businesses.",
};

// Certificate component no longer needs props
const DemoCertificate = () => {
  const [showForm, setShowForm] = useState(false);
  const handleButtonClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <div className="relative w-full max-w-[1800px] mx-auto overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100 py-8 sm:py-12 px-3 sm:px-4">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-40 h-40 sm:w-64 sm:h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
        <div className="absolute -bottom-32 -left-32 w-40 h-40 sm:w-64 sm:h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className={styles.certificateTitle}>Certificate</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 items-center">
          {/* Certificate Frame */}
          <div className="relative">
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-blue-200 rounded-2xl blur-xl opacity-20"></div>
            
            <div className="relative bg-white p-4 sm:p-8 rounded-2xl shadow-xl border border-blue-100">
              <div className="border-3 border-blue-200 p-4 sm:p-8 rounded-xl relative bg-gradient-to-br from-blue-50 to-white overflow-hidden">
                {/* Enhanced Decorative Corners */}
                <div className="absolute top-4 left-4 w-16 h-16 border-l-4 border-t-4 border-blue-400 rounded-tl-lg opacity-70"></div>
                <div className="absolute top-4 right-4 w-16 h-16 border-r-4 border-t-4 border-blue-400 rounded-tr-lg opacity-70"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 border-l-4 border-b-4 border-blue-400 rounded-bl-lg opacity-70"></div>
                <div className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-blue-400 rounded-br-lg opacity-70"></div>
                
                {/* Subtle accent elements */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full opacity-50"></div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full opacity-50"></div>

                {/* Certificate Content */}
                <div className="text-center space-y-6 relative z-10">
                  {/* Image Section */}
                  <div className="flex justify-center mb-6 px-2 sm:px-0">
                    <div className="relative">
                      {/* Subtle glow behind certificate */}
                      <div className="absolute inset-0 bg-blue-200 rounded-xl blur-sm opacity-30"></div>
                      
                      <div className="relative rounded-xl shadow-xl overflow-hidden mx-auto max-w-[380px] sm:max-w-[520px] md:max-w-full border border-blue-100">
                        <Image
                          src={certificateData.image}
                          alt={certificateData.alt || `${certificateData.courseTitle} Certificate`}
                          width={800}
                          height={450}
                          sizes="(max-width: 640px) 380px, (max-width: 768px) 520px, 800px"
                          className="h-auto w-full object-contain"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent leading-tight">
                Congratulations on Completing Your Training!
              </h2>
              
              <div className="relative inline-block">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                  {certificateData.courseTitle}
                </h3>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-300 opacity-50 rounded"></div>
              </div>
              
              <div className="space-y-3">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {certificateData.completionText}
                </p>
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  {certificateData.description}
                </p>
              </div>
            </div>

            {/* Enhanced CTA Button */}
            <div className="flex justify-center sm:justify-start">
              <div className="relative group">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-blue-400 rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                
                <button
                  onClick={handleButtonClick}
                  className="relative w-full sm:w-auto mx-auto sm:mx-0 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 text-base rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-blue-500"
                >
                  <span className="flex items-center space-x-2">
                    <span>GET YOUR CERTIFICATE</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            {showForm && <Btnform onClose={handleCloseForm} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoCertificate;