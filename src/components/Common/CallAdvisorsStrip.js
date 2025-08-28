"use client";

import { useState, useEffect } from "react";
// Keep Next's Link for internal navigation if needed elsewhere, but we don't need it for the tel: link itself.
import Link from "next/link";
import styles from "@/styles/Common/CallAdvisorsStrip.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faWhatsapp, faYoutube, faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

const CallAdvisorsStrip = () => {
  // --- Use the hardcoded number as the initial/default state ---
  // If you uncomment the fetch, this will be overridden when the data loads.
  const [advisorsContact, setAdvisorsContact] = useState("9004008253");
  const [location, setLocation] = useState("default");



  return (
    <div className={styles.callAdvisorsStrip}>
      {/* Right side content - Social Icons */}
      <div className={styles.rightStripContent}>
        <div>
          <div className={styles.socialIconsStrip}>
            {/* Using standard <a> tags for external links is also fine */}
            <a href="https://www.facebook.com/connectingdotshrcourse" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FontAwesomeIcon
                icon={faFacebookF}
                className="hover:text-blue-600 transition duration-300"
              />
            </a>
            <a href="https://wa.me/919004002941" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="hover:text-green-500 transition duration-300"
              />
            </a>
            <a href="https://youtube.com/@connectingdotserp?si=hSKEiEg3MdytdEe_" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FontAwesomeIcon
                icon={faYoutube}
                className="hover:text-red-600 transition duration-300"
              />
            </a>
            <a href="https://in.linkedin.com/in/connecting-dots-erp-043039171" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className="hover:text-blue-700 transition duration-300"
              />
            </a>
            <a href="https://www.instagram.com/connecting_dots_sap_training?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FontAwesomeIcon
                icon={faInstagram}
                className="hover:text-pink-500 transition duration-300"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Left side content (Call Advisors) */}
      <div className={styles.leftStripContent}>
        <span className={styles.phoneIcon}>
          <FontAwesomeIcon icon={faPhone} alt="Phone" />
        </span>
        <span className={styles.advisorText}>
          {/* This text is static, consider if it should also be dynamic */}
          Get Free Career Counselling:
        </span>

        {/* --- Use a standard <a> tag for the tel: link --- */}
        <a
          href={`tel:${advisorsContact}`} // Use the state variable
          className={`${styles.advisorNumber} text-decoration-none`} // Keep your styles
        >
          {advisorsContact} {/* Display the number from state */}
        </a>
      </div>
    </div>
  );
};

export default CallAdvisorsStrip;