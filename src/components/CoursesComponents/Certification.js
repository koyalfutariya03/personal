"use client";

import React, { forwardRef, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import styles from "@/styles/CoursesComponents/Certification.module.css";

const Circle = forwardRef(
  (
    { className, children, title, description, onHover, tooltipPosition },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] relative cursor-pointer transition-transform hover:scale-110",
          className
        )}
        onMouseEnter={() =>
          onHover({ title, description, position: tooltipPosition })
        }
        onMouseLeave={() => onHover(null)}
      >
        {children}
      </div>
    );
  }
);

Circle.displayName = "Circle";

export function AnimatedBeamDemo() {
  const containerRef = useRef(null);
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);
  const div3Ref = useRef(null);
  const div4Ref = useRef(null);
  const div5Ref = useRef(null);
  const div6Ref = useRef(null);
  const div7Ref = useRef(null);

  const [hoverInfo, setHoverInfo] = useState(null);

  // Content data for each circle
  const circleContents = {
    socialMedia: {
      title: "Social Media Marketing",
      description:
        "Build brand awareness and engage with customers across popular social platforms.",
      position: "top-20 left-40 mt-16 ml-15",
    },
    seo: {
      title: "Search Engine Optimization",
      description:
        "Improve your website's visibility in search engine results pages.",
      position: "top-30 left-40 ml-15 mt-32",
    },
    designThinking: {
      title: "Design Thinking",
      description: "User-centered approach to problem-solving and innovation.",
      position: "bottom-0 left-40 mb-9 ml-15 mt-32",
    },
    digitalMarketing: {
      title: "Digital Marketing",
      description:
        "Central hub for all your online marketing strategies and campaigns.",
      position: "top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
    },
    email: {
      title: "Email Marketing",
      description:
        "Direct communication with your audience through targeted email campaigns.",
      position: "top-20 right-40 mt-16 mr-15",
    },
    content: {
      title: "Content Marketing",
      description:
        "Create valuable content to attract and engage your target audience.",
      position: "top-30 right-40 mr-15 mt-32",
    },
    ppc: {
      title: "Pay-Per-Click",
      description:
        "Drive traffic to your website through paid advertising campaigns.",
      position: "bottom-0 right-40 mb-9 mr-15 mt-32",
    },
  };

  // Get tooltip position class based on the current hovered item
  const getTooltipPositionClass = () => {
    if (!hoverInfo) return "";
    return hoverInfo.position;
  };

  return (
    <div
      className={`relative flex flex-col h-full bg-white items-center justify-center overflow-visible p-10 mt-3 ${styles.pageContainer}`}
      ref={containerRef}
    >
      <h1 className={styles.title}>
        <span className={styles.accent}>Popular Digital Marketing Courses</span>
      </h1>
      <div className="flex w-full max-w-lg min-h-[400px] flex-col items-stretch justify-start gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle
            ref={div1Ref}
            className="size-13"
            title={circleContents.socialMedia.title}
            description={circleContents.socialMedia.description}
            tooltipPosition={circleContents.socialMedia.position}
            onHover={setHoverInfo}
          >
            <Icons.socialMediaMarketing />
          </Circle>
          <Circle
            ref={div5Ref}
            className="size-13"
            title={circleContents.email.title}
            description={circleContents.email.description}
            tooltipPosition={circleContents.email.position}
            onHover={setHoverInfo}
          >
            <Icons.googleEmailIcon />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle
            ref={div2Ref}
            className="size-13"
            title={circleContents.seo.title}
            description={circleContents.seo.description}
            tooltipPosition={circleContents.seo.position}
            onHover={setHoverInfo}
          >
            <Icons.SEO />
          </Circle>
          <Circle
            ref={div4Ref}
            className="size-17"
            title={circleContents.digitalMarketing.title}
            description={circleContents.digitalMarketing.description}
            tooltipPosition={circleContents.digitalMarketing.position}
            onHover={setHoverInfo}
          >
            <Icons.DM />
          </Circle>
          <Circle
            ref={div6Ref}
            className="size-13"
            title={circleContents.content.title}
            description={circleContents.content.description}
            tooltipPosition={circleContents.content.position}
            onHover={setHoverInfo}
          >
            <Icons.ContentMarketing />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle
            ref={div3Ref}
            className="size-13"
            title={circleContents.designThinking.title}
            description={circleContents.designThinking.description}
            tooltipPosition={circleContents.designThinking.position}
            onHover={setHoverInfo}
          >
            <Icons.DesignThinking />
          </Circle>
          <Circle
            ref={div7Ref}
            className="size-13"
            title={circleContents.ppc.title}
            description={circleContents.ppc.description}
            tooltipPosition={circleContents.ppc.position}
            onHover={setHoverInfo}
          >
            <Icons.PPC />
          </Circle>
        </div>
      </div>

      {/* Hover Text Container with dynamic positioning */}
      {hoverInfo && (
        <div
          className={cn(
            "absolute bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs z-20 transition-opacity duration-300",
            getTooltipPositionClass()
          )}
        >
          <h3 className="text-lg font-semibold mb-2">{hoverInfo.title}</h3>
          <p className="text-sm text-gray-600">{hoverInfo.description}</p>
        </div>
      )}

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  );
}

const Icons = {
  SEO: () => (
    <img
      width="50"
      height="50"
      viewBox="0 0 48 48"
      src="https://img.icons8.com/?size=100&id=48197&format=png&color=000000"
      alt="SEO Icon"
    />
  ),
  DM: () => (
    <img
      width="100"
      height="100"
      viewBox="0 0 48 48"
      src="https://img.icons8.com/?size=100&id=xXv5OXnXm0YM&format=png&color=000000"
      alt="Notion Icon"
    />
  ),
  socialMediaMarketing: () => (
    <img
      width="50"
      height="50"
      viewBox="0 0 48 48"
      src="https://img.icons8.com/?size=100&id=M5CGFu82aUEM&format=png&color=000000"
      alt="Social"
    />
  ),
  DesignThinking: () => (
    <img
      width="50"
      height="50"
      viewBox="0 0 48 48"
      src="https://img.icons8.com/?size=100&id=0TvZuRZKQu88&format=png&color=000000"
      alt="DesignThinking"
    />
  ),
  googleEmailIcon: () => (
    <img
      width="50"
      height="50"
      viewBox="0 0 48 48"
      alt="Mail"
      src="https://img.icons8.com/?size=100&id=ihMzI7k32pJf&format=png&color=000000"
    />
  ),
  ContentMarketing: () => (
    <img
      width="50"
      height="50"
      src="https://img.icons8.com/?size=100&id=49407&format=png&color=000000"
      alt="Content-Marketing"
    />
  ),
  PPC: () => (
    <img
      width="50"
      height="50"
      viewBox="0 0 48 48"
      src="https://img.icons8.com/?size=100&id=eRF9ENKlYAVl&format=png&color=000000"
      alt="Pay-per-click"
    />
  ),
};

export default AnimatedBeamDemo;
