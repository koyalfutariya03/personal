// src/app/(routes)/aboutus/page.js

import React from "react";
import AchievementsSection from "@/components/TestingAbout/Achievements";
import Hero from "@/components/TestingAbout/Hero";
import OurBranch from "@/components/TestingAbout/Locations";
import SAPCompassDial from "@/components/TestingAbout/Placement";
import SAPAdoptionRings from "@/components/TestingAbout/SapComp";

// 1. SEO METADATA - Next.js App Router way
export const metadata = {
  title: "About Connecting Dots ERP | Our Mission & Vision",
  description:
    "Learn about Connecting Dots ERP, our mission, vision, values, and the team dedicated to empowering students and professionals with industry-leading training.",
  keywords: [
    "Connecting Dots ERP",
    "about us",
    "training institute",
    "SAP training",
    "IT courses",
    "HR courses",
    "placement support",
    "mission",
    "vision",
    "Pune",
    "Mumbai",
    "Raipur",
    "professional training",
    "career development",
    "skill enhancement",
  ],
  author: "Connecting Dots ERP",
  robots: "index, follow",
  alternates: {
    canonical: "https://connectingdotserp.com/aboutus",
  },
  openGraph: {
    title: "About Connecting Dots ERP | Our Mission & Vision",
    description:
      "Discover the story behind Connecting Dots ERP, a leading provider of job-oriented training in SAP, IT, and HR with strong placement focus.",
    url: "https://connectingdotserp.com/aboutus",
    siteName: "Connecting Dots ERP",
    images: [
      {
        url: "https://connectingdotserp.com/images/about-us-banner.jpg",
        width: 1200,
        height: 630,
        alt: "The Connecting Dots ERP Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Connecting Dots ERP | Our Mission & Vision",
    description:
      "Learn about Connecting Dots ERP's commitment to providing quality SAP, IT, and HR training with placement support.",
    site: "@CD_ERP",
    images: ["https://connectingdotserp.com/images/about-us-banner.jpg"],
  },
};

// 2. JSON-LD STRUCTURED DATA
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://connectingdotserp.com/#organization",
      name: "Connecting Dots ERP",
      url: "https://connectingdotserp.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://connectingdotserp.com/Navbar/connecting%20dot%20erp%20logo.avif",
        "@id": "https://connectingdotserp.com/#logo",
        width: 228,
        height: 70,
        caption: "Connecting Dots ERP Logo",
      },
      image: {
        "@id": "https://connectingdotserp.com/#logo",
      },
      description:
        "Connecting Dots ERP is a leading training institute specializing in SAP, IT, and HR courses, dedicated to providing job-oriented skills and placement assistance. Learn the way the industry wants it.",
      telephone: "+919004002941",
      email: "info@connectingdotserp.com",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress:
            "1st Floor,101, Police, Wireless Colony, Vishal Nagar, Pimple Nilakh",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          postalCode: "411027",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress:
            "8th Floor, Paradise Tower, next to McDonald's, Naupada, Thane West",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          postalCode: "400601",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Office Address", // Replace with actual Raipur address
          addressLocality: "Raipur",
          addressRegion: "Chhattisgarh",
          postalCode: "492001",
          addressCountry: "IN",
        },
      ],
      foundingDate: "2013",
      founder: {
        "@type": "Person",
        name: "Nitendra Singh",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: "185",
      },
      sameAs: [
        "https://www.facebook.com/sapinstallation.pune.9",
        "https://x.com/CD_ERP",
        "https://www.youtube.com/channel/UCxQ-RBOBaoYjjd4Mv7qQekA",
        "https://www.linkedin.com/company/connecting-dots-erp",
        "https://www.instagram.com/connecting_dot_software_course/",
        "https://in.pinterest.com/Connecting_Dots_ERP/",
        "https://www.quora.com/profile/Connecting-Dot-ERP-SAP-And-IT-Training-Institute",
      ],
      knowsAbout: [
        "SAP Training",
        "Software Development Training",
        "HR Training",
        "Digital Marketing Training",
        "Data Science Training",
        "Professional Certification",
      ],
      areaServed: [
        {
          "@type": "City",
          name: "Pune",
        },
        {
          "@type": "City",
          name: "Mumbai",
        },
        {
          "@type": "City",
          name: "Raipur",
        },
      ],
    },
    {
      "@type": "AboutPage",
      "@id": "https://connectingdotserp.com/aboutus#webpage",
      url: "https://connectingdotserp.com/aboutus",
      name: "About Connecting Dots ERP | Our Mission & Vision",
      description:
        "Learn about Connecting Dots ERP, our mission, vision, values, and the team dedicated to empowering students and professionals with industry-leading training.",
      inLanguage: "en-US",
      isPartOf: {
        "@id": "https://connectingdotserp.com/#website",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://connectingdotserp.com/images/about-us-banner.jpg",
        "@id": "https://connectingdotserp.com/aboutus#mainImage",
        width: 1200,
        height: 630,
        caption: "The Connecting Dots ERP Team",
      },
      mainEntity: {
        "@id": "https://connectingdotserp.com/#organization",
      },
      breadcrumb: {
        "@id": "https://connectingdotserp.com/aboutus#breadcrumb",
      },
      datePublished: "2013-01-01",
      dateModified: "2025-07-08",
      about: {
        "@type": "Thing",
        name: "Professional Training and Education",
        description:
          "Comprehensive training programs in SAP, IT, and HR with placement assistance",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://connectingdotserp.com/aboutus#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://connectingdotserp.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About Us",
          item: "https://connectingdotserp.com/aboutus",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://connectingdotserp.com/#website",
      url: "https://connectingdotserp.com/",
      name: "Connecting Dots ERP",
      description:
        "Connecting Dots ERP - Leading Training Institute for SAP, IT & HR Courses with Placement Support.",
      publisher: {
        "@id": "https://connectingdotserp.com/#organization",
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://connectingdotserp.com/?s={search_term_string}",
          },
          "query-input": {
            "@type": "PropertyValueSpecification",
            valueRequired: true,
            valueName: "search_term_string",
          },
        },
      ],
      inLanguage: "en-US",
    },
    {
      "@type": "EducationalOrganization",
      "@id": "https://connectingdotserp.com/#educationalorganization",
      name: "Connecting Dots ERP Training Institute",
      description:
        "Professional training institute offering industry-relevant courses in SAP, IT, and HR with placement support",
      url: "https://connectingdotserp.com/",
      sameAs: {
        "@id": "https://connectingdotserp.com/#organization",
      },
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "SAP Certification Programs",
          description: "Industry-recognized SAP certification training",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "IT Professional Certification",
          description: "Comprehensive IT skills certification programs",
        },
      ],
    },
  ],
};

export default function AboutUsPage() {
  return (
    <>
      {/* 3. INJECT JSON-LD SCRIPT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SEO-only content - hidden from users */}
      <div className="sr-only" aria-hidden="true">
        <h1>About Connecting Dots ERP - Leading SAP Training Institute</h1>
        <h2>Our Mission & Vision</h2>
        <h2>Why Choose Connecting Dots ERP?</h2>
        <h2>Our Training Programs</h2>
        <h2>Placement Support & Career Services</h2>
      </div>

      <Hero />
      <SAPAdoptionRings />
      <SAPCompassDial />
      <AchievementsSection />
      <OurBranch />

    </>
  );
}
