"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const CityContext = createContext();

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
};

const availableCities = [
  "pune",
  "mumbai",
  "delhi",
  "kolkata",
  "chennai",
  "bangalore",
  "hyderabad",
  "ahmedabad",
  "jaipur",
  "lucknow",
  "kanpur",
  "nagpur",
  "patna",
  "indore",
  "bhopal",
  "visakhapatnam",
  "vadodara",
  "ludhiana",
  "agra",
  "nashik",
  "rajkot",
  "varanasi",
  "kerala",
  "surat",
  "dehradun",
  "madurai",
  "mysore",
  "pondicherry",
  "ranchi",
  "coimbatore",
  "chandigarh",
  "bhubaneswar",
  "tirupati",
  "vizag",
  "trivandrum",
  "jalandhar",
  "mohali",
  "raipur",
  "cochin",
  "mangalore",
  "katraj",
  "pimpri-chinchwad",
  "shivaji-nagar",
  "koregaon-park",
  "viman-nagar",
  "pimple-saudagar",
  "baner",
  "hinjewadi",
  "wakad",
  "kothrud",
  "hadapsar",
  "aundh",
  "navi-mumbai",
  "thane",
  "kalyan",
  "bandra",
  "andheri",
  "powai",
  "worli",
  "chembur",
  "malad",
  "vile-parle",
  "matunga",
];


const capitalizeCity = (city) => {
  return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
};

export const CityProvider = ({ children }) => {
  const [city, setCity] = useState("Pune");
  const pathname = usePathname(); // Get the current path in Next.js

  useEffect(() => {
    if (pathname) {
      const pathParts = pathname.split("-"); // Split by hyphen
      let citySlug = pathParts.slice(-2).join("-").toLowerCase(); // Try last two parts

      if (!availableCities.includes(citySlug)) {
        citySlug = pathParts.slice(-1)[0].toLowerCase(); // Fallback to last part
      }

      if (availableCities.includes(citySlug)) {
        setCity(capitalizeCity(citySlug));
      } else {
        setCity("Pune");
      }
    }
  }, [pathname]);

  return (
    <CityContext.Provider value={{ city }}>{children}</CityContext.Provider>
  );
};
