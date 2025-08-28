// FooterClient.js

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function FooterClient({ sections }) {
  const [isMobileView, setIsMobileView] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 768);
    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const toggleDropdown = (index) => {
    if (isMobileView) {
      setActiveDropdown(activeDropdown === index ? null : index);
    }
  };

  return (
    <div className="w-full">
      {/* Map over the sections passed to this component */}
      {sections.map((section, index) => (
        <div key={index} className="mt-2 mb-2.5">
          {/* Headline for each section */}
          <div
            className={`relative mb-4 cursor-pointer md:cursor-default py-2.5 md:py-0 border-b border-white/10 md:border-none ${activeDropdown === index ? "mb-2.5" : ""}`}
            onClick={() => toggleDropdown(index)}
          >
            <h3 className="text-sm font-semibold uppercase text-[#ecf0f1] relative pb-2.5 m-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#3498db]">
              {section.title}
            </h3>
            {/* The dropdown arrow, only visible on mobile */}
            <span className="absolute right-0 top-2.5 text-xl md:hidden">
              {activeDropdown === index ? "−" : "+"}
            </span>
          </div>

          {/* Wrapper for the collapsible content */}
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out md:max-h-none ${activeDropdown === index ? "max-h-[1000px]" : "max-h-0"}`}
          >
            {/* Check if there are sub-categories */}
            {section.categories ? (
              section.categories.map((cat, catIndex) => (
                <div key={catIndex} className="mb-4">
                  <h6 className="text-xs font-semibold text-[#3498db] uppercase mb-2.5 pb-1.5 border-b border-white/10">
                    {cat.title}
                  </h6>
                  <ul className="list-none p-0 m-0">
                    {cat.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="mb-2">
                        <Link
                          href={link.href}
                          className="text-[#ecf0f1] no-underline text-xs transition-colors duration-300 block hover:text-[#ff4d00]"
                        >
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              // Render a simple list if no categories
              <ul className="list-none p-0 m-0">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="mb-2">
                    <Link
                      href={link.href}
                      className="text-[#ecf0f1] no-underline text-xs transition-colors duration-300 block hover:text-[#ff4d00]"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}