// src/registry/magicui/orbiting-circles.js
import { motion } from "framer-motion";
import React from "react";

const OrbitingCircles = ({ size = 200, circleCount = 5 }) => {
  const circles = Array.from({ length: circleCount });

  return (
    <div className="relative flex items-center justify-center">
      {circles.map((_, index) => {
        const delay = index * 0.2;
        const radius = (index + 1) * 20;

        return (
          <motion.div
            key={index}
            className="absolute rounded-full border-2 border-blue-400"
            style={{
              width: size - radius,
              height: size - radius,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "linear",
              delay,
            }}
          />
        );
      })}
      <div className="w-10 h-10 bg-blue-500 rounded-full" />
    </div>
  );
};

export { OrbitingCircles };
