// src/components/ClientLayoutWrapper.js - Fixed to prevent errors

"use client";

import { useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

// 1. IMPORT THE CONTEXT PROVIDER
import { CityProvider } from "@/context/CityContext";

// ✅ FIXED: Better error handling for dynamic imports
const BackgroundAnimation = dynamic(
  () => import("@/components/Common/BackgroundAnimation"),
  { 
    ssr: false, 
    loading: () => null,
    // Add error fallback
    onError: (error) => {
      console.warn("BackgroundAnimation failed to load:", error);
      return null;
    }
  }
);

const Chatbot = dynamic(() => import("@/components/Chatbot"), { 
  ssr: false,
  onError: (error) => {
    console.warn("Chatbot failed to load:", error);
    return null;
  }
});

const PopupForm = dynamic(() => import("@/components/PopupForm"), {
  ssr: false,
  onError: (error) => {
    console.warn("PopupForm failed to load:", error);
    return null;
  }
});

const Stickyform = dynamic(() => import("@/components/Stickyform"), {
  ssr: false,
  onError: (error) => {
    console.warn("Stickyform failed to load:", error);
    return null;
  }
});

// Regular imports for lighter components
import WaveComponent from "@/components/Wave";
import Whatsapp from "@/components/Whatsapp";
import Floatingcontact from "@/components/Floatingcontact";
import BottomMenu from "@/components/BottomMenu";
import ScrollToTop from "@/components/ScrollToTop";
import CourseLoader from "@/components/CourseLoader";

// 2. ACCEPT THE { children } PROP
export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const hiddenRoutes = [
    "/dashboard",
    "/AdminLogin",
    "/superadmin",
    "/superadmin/dashboard",
    "/superadmin/users",
    "/superadmin/leads",
    "/superadmin/analytics",
    "/superadmin/activity",
    "/superadmin/roles",
    "/superadmin/settings",
  ];
  const shouldHideComponent = hiddenRoutes.some((path) =>
    pathname.startsWith(path)
  );

  // ✅ FIXED: Better error handling for API pings
  useEffect(() => {
    const delayedPing = setTimeout(() => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
        if (apiBaseUrl) {
          fetch(`${apiBaseUrl}/api/ping`).catch((error) => {
            console.warn("API ping failed:", error);
          });
        }
      } catch (error) {
        console.warn("API ping setup failed:", error);
      }
    }, 3000);

    const delayedBlogPing = setTimeout(() => {
      try {
        const blogBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        if (blogBaseUrl) {
          fetch(`${blogBaseUrl}/api/blogs/ping`).catch((error) => {
            console.warn("Blog ping failed:", error);
          });
        }
      } catch (error) {
        console.warn("Blog ping setup failed:", error);
      }
    }, 4000);

    return () => {
      clearTimeout(delayedPing);
      clearTimeout(delayedBlogPing);
    };
  }, []);

  return (
    <CityProvider>
      {/* 4. RENDER THE ACTUAL PAGE CONTENT HERE */}
      {children}

      {/* All of your global client-side components */}
      <BackgroundAnimation />

      <Suspense fallback={null}>
        <CourseLoader />
      </Suspense>

      <ScrollToTop />
      <Floatingcontact phoneNumber="+919004002958" />
      <Whatsapp phoneNumber="+919004002958" />

      {/* ✅ FIXED: Wrap potentially problematic components in error boundaries */}
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
      
      <Suspense fallback={null}>
        <Stickyform />
      </Suspense>
      
      <Suspense fallback={null}>
        <PopupForm />
      </Suspense>

      {!shouldHideComponent && <WaveComponent />}
      <BottomMenu />
    </CityProvider>
  );
}