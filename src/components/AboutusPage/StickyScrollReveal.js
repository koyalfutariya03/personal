"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import styles from "@/styles/AboutPage/StickyScrollReveal.module.css";
import { Container, Row, Col } from "react-bootstrap";

// Content data
const content = [
  {
    title: "Who We Are?",
    description: `
      <span class="${styles.highlight}">Connecting Dots ERP</span> is the premier institute in Pune for training and certification in a variety of software fields. Our team of qualified professionals is dedicated to providing excellent service to individuals and organizations. We offer training that is tailored to the needs of our students and employed individuals, helping them gain the knowledge and skills they need to succeed. With practical and theoretical instruction, our courses provide the perfect foundation for a successful career.
    `,
    image: "https://i.imgur.com/qhMS713.jpg",
    icon: "👨‍💼",
  },
  {
    title: "Why Choose Us?",
    description: `
      <span class="${styles.highlight}">Our courses,</span> taught by experienced trainers, offer hands-on learning through live projects, 
      comprehensive interview preparation, and career advancement opportunities. With an affordable 
      fee structure and a supportive learning environment, you'll gain the skills you need to succeed. 
      Plus, with <strong>100% placement assistance</strong>, we ensure you're well on your way to a successful career.
    `,
    image: "/Aboutus/Why choose us.png",
    icon: "🎯",
  },
  {
    title: "Our Objective",
    description: `
      <span class="${styles.highlight}">Connecting Dots ERP</span> Our goal is to create a global platform that enables students and working professionals 
      to reach their full potential and build rewarding careers. We seek to provide opportunities 
      that motivate individuals to succeed, regardless of their current stage in the professional 
      landscape. By delivering high-quality training programs and classes designed to meet industry 
      demands, we ensure that our candidates acquire the skills and knowledge necessary to excel in 
      their selected fields.
    `,
    image: "/Aboutus/Our objective.png",
    icon: "🚀",
  },
  {
    title: "Our Vision",
    description: `
      At <span class="${styles.highlight}">Connecting Dots ERP</span>, we envision being the global leader in professional education, 
      bridging knowledge gaps and empowering careers worldwide. We strive to create an ecosystem where 
      continuous learning becomes second nature, enabling individuals to adapt, evolve, and excel in 
      an ever-changing professional landscape.
    `,
    image: "/Aboutus/Our vision.png",
    icon: "🔭",
  },
];

// Utility function for gradient selection
const getGradient = (index, gradients) => gradients[index % gradients.length];

export const StickyScroll = () => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  // Background and card gradients
  const backgroundColors = [
    "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    "linear-gradient(135deg, #0c0a09 0%, #1c1917 100%)",
    "linear-gradient(135deg, #171717 0%, #262626 100%)",
    "linear-gradient(135deg, #0f172a 0%, #312e81 100%)",
  ];

  const cardGradients = [
    "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)",
    "linear-gradient(135deg, #ec4899 0%, #6366f1 100%)",
    "linear-gradient(135deg, #f97316 0%, #eab308 100%)",
    "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
  ];

  // Scroll progress calculation
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        return distance < Math.abs(latest - cardsBreakpoints[acc])
          ? index
          : acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const progress = (activeCard / (cardLength - 1)) * 100;

  return (
    <motion.div
      style={{ background: getGradient(activeCard, backgroundColors) }}
      className={`${styles.stickyScrollContainer} overflow-hidden`}
    >
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col xs={12} className="position-relative">
            {/* Progress Bar */}
            <div className={styles.progressContainer}>
              <motion.div
                className={styles.progressBar}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 100 }}
              />
            </div>

            {/* Scroll Content */}
            <div ref={ref} className={`${styles.scrollContent} overflow-auto`}>
              <Row className={styles.contentWrapper}>
                {/* Text Content */}
                <Col md={7} className={`${styles.textContent} pe-md-4`}>
                  {content.map((item, index) => (
                    <motion.div
                      key={item.title}
                      className={`${styles.contentCard} ${
                        activeCard === index ? styles.active : ""
                      }`}
                      style={{
                        marginBottom:
                          index === content.length - 1 ? "8rem" : "0",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: activeCard === index ? 1 : 0.3,
                        y: activeCard === index ? 0 : 20,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className={styles.cardIcon}>{item.icon}</div>
                      <h2 className={styles.cardTitle}>{item.title}</h2>
                      <div
                        className={styles.cardDescription}
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                      {activeCard === index && (
                        <motion.div
                          className={styles.activeIndicator}
                          layoutId="activeIndicator"
                        />
                      )}
                    </motion.div>
                  ))}
                </Col>

                {/* Visual Content */}
                <Col
                  md={5}
                  className={`${styles.visualContent} position-sticky`}
                >
                  <motion.div
                    className={styles.imageContainer}
                    style={{
                      background: getGradient(activeCard, cardGradients),
                    }}
                    animate={{ scale: [0.9, 1], opacity: [0.8, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeCard}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className={styles.imageWrapper}
                      >
                        <Image
                          src={content[activeCard].image}
                          alt={content[activeCard].title}
                          fill
                          className={styles.contentImage}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Card Number */}
                    <div className={styles.cardNumber}>
                      <span className={styles.current}>
                        {(activeCard + 1).toString().padStart(2, "0")}
                      </span>
                      <span className={styles.separator}>/</span>
                      <span className={styles.total}>
                        {cardLength.toString().padStart(2, "0")}
                      </span>
                    </div>
                  </motion.div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

const MobileCards = () => {
  return (
    <div className={styles.mobileCardsContainer}>
      {content.map((item, index) => (
        <div key={item.title} className={styles.mobileCard}>
          <div className={styles.cardIcon}>{item.icon}</div>
          <h2 className={styles.cardTitle}>{item.title}</h2>
          <div
            className={styles.cardDescription}
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </div>
      ))}
    </div>
  );
};

const StickyScrollReveal = () => {
  // Initialize with null instead of false to handle SSR properly
  const [isDesktop, setIsDesktop] = useState(null);

  useEffect(() => {
    // This will only run on the client side after component mounts
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992); // 992px is the breakpoint for lg screens in Bootstrap
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Return a safe fallback during SSR, then the correct component on client
  if (isDesktop === null) {
    // Return a simple fallback during SSR
    return <div className="sticky-scroll-reveal loading"></div>;
  }

  return (
    <div className="sticky-scroll-reveal">
      {isDesktop ? <StickyScroll /> : <MobileCards />}
    </div>
  );
};

export default StickyScrollReveal;