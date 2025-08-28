// components/ui/LoadingSpinner.js
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#2FA9EC] border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-[#1B4168] border-t-transparent rounded-full animate-spin animation-delay-150"></div>
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Loading your quiz...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
