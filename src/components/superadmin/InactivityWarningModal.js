// components/InactivityWarningModal.js
"use client";

import { useState, useEffect, useRef } from "react";
import { FaSpinner, FaExclamationTriangle, FaClock } from "react-icons/fa";

const InactivityWarningModal = ({ onStayLoggedIn, onLogout, warningDuration }) => {
  const [countdown, setCountdown] = useState(warningDuration / 1000);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          // onLogout will be called by the parent layout's timer,
          // but we can also call it here for robustness
          // onLogout(); // Or rely solely on parent timer
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(timerRef.current);
    };
  }, [warningDuration]); // Depend on warningDuration if it could change

  const handleStayLoggedInClick = () => {
    clearInterval(timerRef.current); // Stop countdown
    onStayLoggedIn(); // Notify parent to reset timers and close modal
  };

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999]"> {/* High z-index */}
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm text-center">
        <FaExclamationTriangle className="text-yellow-500 text-5xl mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Session Expiring Soon!
        </h2>
        <p className="text-gray-700 mb-6">
          You have been inactive. You will be logged out in{" "}
          <span className="font-semibold text-blue-600 text-lg">{countdown}</span> seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleStayLoggedInClick}
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={countdown === 0}
          >
            <FaClock className="inline mr-2" /> Stay Logged In
          </button>
          <button
             onClick={onLogout} // Allow direct logout
             className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors duration-200 shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default InactivityWarningModal;