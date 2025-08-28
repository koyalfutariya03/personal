// components/ui/ProgressBar.js
import React from "react";

const ProgressBar = ({ current, total, className = "" }) => {
  const percentage = (current / total) * 100;

  return (
    <div
      className={`w-full bg-white bg-opacity-20 rounded-full h-2 ${className}`}
    >
      <div
        className="bg-white h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
