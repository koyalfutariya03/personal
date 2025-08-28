"use client";

import Wave from "react-wavify";
import "../styles/Wave.css"; // Ensure this CSS file exists in the styles folder

const WaveComponent = () => {
  return (
    <div className="wave12-section">
      {/* Wave Container */}
      <div className="wave-container">
        <Wave
          mask="url(#mask)"
          fill="#182E4A" // Darker solid color
          paused={false}
          options={{
            height: 20,
            amplitude: 20,
            speed: 0.25,
            points: 3,
          }}
        >
      <svg width="100%" height="100%" version="1.1"
           xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="mask">
              <rect
                x="0"
                y="0"
                width="2000"
                height="200"
                fill="white" // Keep white to create the mask for the wave
                />
            </mask>
          </defs>
          <path d="M 0 28.855829940018133 C 146.5 46.62667232236431 146.5 46.62667232236431 293 37.74125113119122 C 439.5 28.855829940018133 439.5 28.855829940018133 586 39.509401732955794 C 732.5 50.162973525893456 732.5 50.162973525893456 879 39.82850709053969 L 879 150 L 0 150 Z" 
          fill="#182E4A" mask="url(#mask)"></path></svg>
        </Wave>
      </div>
    </div>
  );
};

export default WaveComponent;
