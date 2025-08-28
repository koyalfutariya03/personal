"use client";

import { useState, useEffect, useCallback } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import styles from "@/styles/Chatbot.module.css";

const Chatbot = () => {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  const toggleChat = useCallback(() => {
    if (typeof window !== "undefined" && window.Tawk_API) {
      window.Tawk_API.toggle();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    const hideTawkDefaults = () => {
      if (window.Tawk_API) {
        window.Tawk_API.hideWidget();
      }
    };

    const checkTawkLoaded = setInterval(() => {
      if (window.Tawk_API) {
        hideTawkDefaults();
        clearInterval(checkTawkLoaded);
      }
    }, 500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(checkTawkLoaded);
    };
  }, []);

  const isAdminPath = pathname && (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/superadmin') ||
    pathname.startsWith('/AdminLogin')
  );

  if (isAdminPath) {
    return null;
  }

  return (
    <>
      <Script
        src="https://embed.tawk.to/65d9cf218d261e1b5f64d05b/1hndd28n8"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.Tawk_API) {
            window.Tawk_API.hideWidget();
          }
        }}
      />

      <button
        className={`${styles.customLauncher} ${isMobile ? styles.mobile : ""}`}
        onClick={toggleChat}
        aria-label="Open chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="currentColor"
            d="M12 3c5.514 0 10 3.476 10 7.747 0 4.272-4.48 7.748-10 7.748-1.381 0-2.712-.254-3.959-.722l-3.071 1.05.665-2.923c-1.287-1.107-2.135-2.714-2.135-4.153 0-4.271 4.486-7.747 10-7.747zm0-2c-6.627 0-12 4.363-12 9.747 0 1.847.738 3.565 2.047 4.89l-1.304 5.723 6.118-2.09c1.283.481 2.643.742 4.039.742 6.627 0 12-4.363 12-9.749s-5.373-9.749-12-9.749z"
          />
        </svg>
      </button>
    </>
  );
};

export default Chatbot;