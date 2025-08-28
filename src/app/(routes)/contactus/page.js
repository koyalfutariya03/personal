// src/app/(routes)/contactus/page.js

import ContactUsClientContent from "@/components/ContactusPage/ContactUsClientContent";

// 1. SEO METADATA - Next.js App Router way
export const metadata = {
  title: "Contact Connecting Dots ERP | Locations & Support",
  description:
    "Get in touch with Connecting Dots ERP. Find our office locations in Pune, Mumbai, and Raipur. Call, email, or visit us for training inquiries and support.",
  keywords: [
    "Connecting Dots ERP",
    "contact",
    "training institute",
    "SAP training",
    "IT courses",
    "HR courses",
    "Pune",
    "Mumbai",
    "Raipur",
    "phone",
    "email",
    "address",
    "office locations",
    "training inquiries",
    "customer support",
    "contact details",
  ],
  author: "Connecting Dots ERP",
  robots: "index, follow",
  alternates: {
    canonical: "https://connectingdotserp.com/contactus",
  },
  openGraph: {
    title: "Contact Connecting Dots ERP | Locations & Support",
    description:
      "Connect with Connecting Dots ERP. Find our contact details and office locations in Pune, Mumbai, and Raipur for SAP, IT, and HR training assistance.",
    url: "https://connectingdotserp.com/contactus",
    siteName: "Connecting Dots ERP",
    images: [
      {
        url: "https://connectingdotserp.com/images/contact-us-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Connecting Dots ERP Contact Page",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Connecting Dots ERP | Locations & Support",
    description:
      "Reach out to Connecting Dots ERP for SAP, IT, and HR training queries. Contact our Pune, Mumbai, and Raipur branches.",
    site: "@CD_ERP",
    images: ["https://connectingdotserp.com/images/contact-us-banner.jpg"],
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
      telephone: ["+919004002941", "+919004002958"],
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
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+919004002941",
          contactType: "Customer Service",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
        },
        {
          "@type": "ContactPoint",
          telephone: "+919004002958",
          contactType: "Admissions",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi"],
        },
        {
          "@type": "ContactPoint",
          email: "info@connectingdotserp.com",
          contactType: "General Inquiries",
          areaServed: "IN",
        },
      ],
      sameAs: [
        "https://www.facebook.com/sapinstallation.pune.9",
        "https://x.com/CD_ERP",
        "https://www.youtube.com/channel/UCxQ-RBOBaoYjjd4Mv7qQekA",
        "https://www.linkedin.com/company/connecting-dots-erp",
        "https://www.instagram.com/connecting_dot_software_course/",
        "https://in.pinterest.com/Connecting_Dots_ERP/",
        "https://www.quora.com/profile/Connecting-Dot-ERP-SAP-And-IT-Training-Institute",
      ],
      geo: [
        {
          "@type": "GeoCoordinates",
          latitude: "18.586532821424697",
          longitude: "73.78137250928907",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Pune",
            addressRegion: "Maharashtra",
            addressCountry: "IN",
          },
        },
      ],
    },
    {
      "@type": "ContactPage",
      "@id": "https://connectingdotserp.com/contactus#webpage",
      url: "https://connectingdotserp.com/contactus",
      name: "Contact Connecting Dots ERP | Locations & Support",
      description:
        "Get in touch with Connecting Dots ERP. Find our office locations, phone numbers, and email for SAP, IT, and HR training inquiries and support.",
      inLanguage: "en-US",
      isPartOf: {
        "@id": "https://connectingdotserp.com/#website",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://connectingdotserp.com/images/contact-us-banner.jpg",
        "@id": "https://connectingdotserp.com/contactus#mainImage",
        width: 1200,
        height: 630,
        caption: "Connecting Dots ERP - Contact Page",
      },
      mainEntity: {
        "@id": "https://connectingdotserp.com/#organization",
      },
      breadcrumb: {
        "@id": "https://connectingdotserp.com/contactus#breadcrumb",
      },
      datePublished: "2013-01-01",
      dateModified: "2025-07-08",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://connectingdotserp.com/contactus#breadcrumb",
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
          name: "Contact Us",
          item: "https://connectingdotserp.com/contactus",
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
      "@type": "LocalBusiness",
      "@id": "https://connectingdotserp.com/pune#localbusiness",
      name: "Connecting Dots ERP - Pune Branch",
      description:
        "SAP, IT, and HR training institute in Pune with placement support",
      url: "https://connectingdotserp.com/",
      telephone: "+919004002941",
      email: "info@connectingdotserp.com",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "1st Floor,101, Police, Wireless Colony, Vishal Nagar, Pimple Nilakh",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        postalCode: "411027",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "18.586532821424697",
        longitude: "73.78137250928907",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      priceRange: "₹₹",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: "185",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://connectingdotserp.com/mumbai#localbusiness",
      name: "Connecting Dots ERP - Mumbai Branch",
      description:
        "SAP, IT, and HR training institute in Mumbai with placement support",
      url: "https://connectingdotserp.com/",
      telephone: "+919004002958",
      email: "info@connectingdotserp.com",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "8th Floor, Paradise Tower, next to McDonald's, Naupada, Thane West",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        postalCode: "400601",
        addressCountry: "IN",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      priceRange: "₹₹",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://connectingdotserp.com/raipur#localbusiness",
      name: "Connecting Dots ERP - Raipur Branch",
      description:
        "SAP, IT, and HR training institute in Raipur with placement support",
      url: "https://connectingdotserp.com/",
      telephone: "+919004002941",
      email: "info@connectingdotserp.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Office Address", // Replace with actual Raipur address
        addressLocality: "Raipur",
        addressRegion: "Chhattisgarh",
        postalCode: "492001",
        addressCountry: "IN",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      priceRange: "₹₹",
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      {/* 3. INJECT JSON-LD SCRIPT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SEO-only content - hidden from users */}
      <div className="sr-only" aria-hidden="true">
        <h1>Contact Connecting Dots ERP - Get in Touch Today</h1>
        <h2>Our Office Locations</h2>
        <h2>Pune Office - Head Office</h2>
        <h2>Mumbai Office</h2>
        <h2>Raipur Office</h2>
        <h2>Training Inquiries & Support</h2>
        <h2>Course Information & Admissions</h2>
      </div>

      {/* Main Page Content */}
      <ContactUsClientContent />
    </>
  );
}
