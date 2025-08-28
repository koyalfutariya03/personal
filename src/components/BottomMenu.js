"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { FaBookOpen, FaWhatsapp, FaStar, FaPhoneAlt, FaFileAlt } from "react-icons/fa";
import ChatbotIcon from "@/components/ChatbotIcon";
import styles from "@/styles/BottomMenu.module.css";
import { usePathname } from "next/navigation";

const BottomMenu = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const pathname = usePathname();

  // Check if current path is an admin path
  const isAdminPath = pathname && (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/superadmin') ||
    pathname === '/AdminLogin'
  );

  // Handle screen size detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check and event listeners
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle Tawk chat toggle
  const toggleChat = useCallback(() => {
    if (typeof window !== "undefined" && window.Tawk_API) {
      window.Tawk_API.toggle();
    }
  }, []);

  // Menu items configuration
  const menuItems = [
    {
      id: "chatbot",
      href: "#", // Changed from the embed URL to #
      icon: <ChatbotIcon onClick={toggleChat} />,
      label: "Chat",
      color: "#7B61FF",
      onClick: toggleChat // Uncommented this line
    },
    {
      id: "whatsapp",
      href: "https://wa.me/+919004002958",
      icon: <FaWhatsapp size={22} />,
      label: "WhatsApp",
      color: "#25D366"
    },
    {
      id: "review",
      href: "https://g.co/kgs/d827hLN",
      icon: <FaStar size={22} />,
      label: "Rating 4.7☆",
      color: "#FFD700",
      isReview: true
    },
    {
      id: "contact",
      href: "tel:+919004002958",
      icon: <FaPhoneAlt size={20} />,
      label: "Call Us",
      color: "#0D6EFD"
    },
  ];

  // Handle item click with animation
  const handleItemClick = (id) => {
    setActiveItem(id);
    setTimeout(() => setActiveItem(null), 500);
  };

  // Don't render on desktop or admin pages
  if (!isMobile || isAdminPath) return null;

  return (
    <nav className={styles.bottomMenu}>
      <div className={`container-fluid ${styles.menuContainer}`}>
        <div className={styles.menuWrapper}>
          {menuItems.map((item) => (
            <Link
              href={item.href}
              key={item.id}
              className={`${styles.menuItem} ${activeItem === item.id ? styles.active : ''}`}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault(); // Prevent navigation for items with onClick
                  item.onClick();
                }
                handleItemClick(item.id);
              }}
            >
              <div className={styles.iconWrapper} style={{ color: item.color }}>
                {item.icon}
                <div className={styles.ripple} style={{ backgroundColor: item.color }}></div>
              </div>
              <span className={styles.label}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomMenu;