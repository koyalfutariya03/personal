// src/app/layout.js - Fixed to prevent JavaScript errors

import { Lato, Rubik } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Static imports for components that are part of the main layout
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import CallAdvisorsStrip from "@/components/Common/CallAdvisorsStrip";
import Marquee from "@/components/Common/Marquee";
import ServerPing from "@/components/ServerPing";
import FloatingFlag from "@/components/FloatingFlag";

// This wrapper will contain all our client-side logic, like Context Providers
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import { AuthProvider } from "@/context/AuthContext";

// --- Font Setup ---
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

const rubik = Rubik({
  weight: ["300", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

// --- Constants ---
const GTM_ID = "GTM-MB68QM2V";
const FB_PIXEL_ID = "3414178115554916";
const AHREFS_KEY = "h5nofTpYPf65FI8/61ypeA";

// --- SITE-WIDE METADATA ---
export const metadata = {
  title: {
    default: "Connecting Dots ERP | SAP Training Institute",
  },
  description:
    "Expert-led training in SAP, Software Development, Digital Marketing, and HR Courses with strong placement support for your career.",
  verification: {
    google: "KRKFsO9AAW2a8qImif8Wj4uzzjmWGA0R6o7IZFJcmPo",
    other: {
      "ahrefs-site-verification":
        "f3b13167d2161bfb1fc945b8ecb8c0e6855cf9394e9e96e12104db099fbbcab0",
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    appleTouchIcon: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1a365d" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* GTM Head Script - Critical for GTM to work properly */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>
      <body className={`${lato.variable} ${rubik.variable} font-sans bg-white text-gray-800 min-h-screen flex flex-col`}>
        <AuthProvider>
          {/* GTM noscript fallback - Required for users with JavaScript disabled */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>

        {/* Server Ping Component - Will ping servers on app load */}
        <ServerPing />

        {/* Server-Side Rendered Components */}
        <CallAdvisorsStrip />
        <Marquee />
        <Navbar />

        {/* The ClientLayoutWrapper contains the CityProvider and wraps the children */}
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>

        <Footer />

        {/* Global floating trigger */}
        <FloatingFlag />

        {/* Facebook Pixel */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* Ahrefs Analytics */}
        <Script
          id="ahrefs-analytics"
          src="https://analytics.ahrefs.com/analytics.js"
          data-key={AHREFS_KEY}
          strategy="lazyOnload"
        />
        <Script
          id="tawk"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),
                    s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/65d9cf218d261e1b5f64d05b/1hndd28n8';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
          </AuthProvider>
      </body>
    </html>
  );
}