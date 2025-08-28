// src/app/(routes)/sitemap/page.js

import CitySitemap from "@/components/CitySitemap/CitySitemap";
import Breadcrumb from "@/components/CitySitemap/Breadcrumb";

// 1. SEO METADATA - Next.js App Router way
export const metadata = {
  title: "City Course Sitemap | Connecting Dots ERP Training Institute",
  description:
    "Browse our comprehensive range of professional courses available in cities across India including Pune, Mumbai, Bangalore, Delhi, and more. Find SAP, IT, HR, and Digital Marketing training programs near you.",
  keywords: [
    "course sitemap",
    "city courses",
    "SAP training",
    "IT courses",
    "Digital Marketing courses",
    "Data Science courses",
    "HR courses",
    "courses in Pune",
    "courses in Mumbai",
    "courses in Bangalore",
    "courses in Delhi",
    "training programs India",
    "Connecting Dots ERP",
    "professional training",
    "certification courses",
    "placement assistance",
    "skill development",
  ],
  author: "Connecting Dots ERP",
  robots: "index, follow",
  alternates: {
    canonical: "https://connectingdotserp.com/sitemap",
  },
  openGraph: {
    title: "City Course Sitemap | Connecting Dots ERP Training Institute",
    description:
      "Explore our complete course catalog across multiple cities in India. Find the perfect SAP, IT, HR, or Digital Marketing training program in your city.",
    url: "https://connectingdotserp.com/sitemap",
    siteName: "Connecting Dots ERP",
    images: [
      {
        url: "https://connectingdotserp.com/images/sitemap-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Connecting Dots ERP Course Sitemap",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "City Course Sitemap | Connecting Dots ERP Training Institute",
    description:
      "Find professional training courses in your city. SAP, IT, HR, and Digital Marketing programs across India.",
    site: "@CD_ERP",
    images: ["https://connectingdotserp.com/images/sitemap-banner.jpg"],
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
        "Connecting Dots ERP - Leading Training Institute for SAP, IT & HR Courses with Placement Support across multiple cities in India.",
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
      sameAs: [
        "https://www.facebook.com/sapinstallation.pune.9",
        "https://x.com/CD_ERP",
        "https://www.youtube.com/channel/UCxQ-RBOBaoYjjd4Mv7qQekA",
        "https://www.linkedin.com/company/connecting-dots-erp",
        "https://www.instagram.com/connecting_dot_software_course/",
        "https://in.pinterest.com/Connecting_Dots_ERP/",
        "https://www.quora.com/profile/Connecting-Dot-ERP-SAP-And-IT-Training-Institute",
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
          name: "Delhi",
        },
        {
          "@type": "City",
          name: "Bangalore",
        },
        {
          "@type": "City",
          name: "Chennai",
        },
        {
          "@type": "City",
          name: "Hyderabad",
        },
      ],
    },
    {
      "@type": "CollectionPage",
      "@id": "https://connectingdotserp.com/sitemap#webpage",
      url: "https://connectingdotserp.com/sitemap",
      name: "City Course Sitemap | Connecting Dots ERP Training Institute",
      description:
        "Browse our comprehensive range of professional courses available in cities across India including Pune, Mumbai, Bangalore, Delhi, and more. Find SAP, IT, HR, and Digital Marketing training programs near you.",
      inLanguage: "en-US",
      isPartOf: {
        "@id": "https://connectingdotserp.com/#website",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://connectingdotserp.com/images/sitemap-banner.jpg",
        "@id": "https://connectingdotserp.com/sitemap#mainImage",
        width: 1200,
        height: 630,
        caption: "Connecting Dots ERP Course Sitemap",
      },
      breadcrumb: {
        "@id": "https://connectingdotserp.com/sitemap#breadcrumb",
      },
      mainEntity: {
        "@type": "ItemList",
        name: "Training Courses by City",
        description:
          "Complete list of professional training courses available across different cities in India",
        numberOfItems: 50, // Adjust based on actual number
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "SAP Courses in Pune",
            url: "https://connectingdotserp.com/sap-course-in-pune",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "IT Courses in Mumbai",
            url: "https://connectingdotserp.com/it-course-in-mumbai",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "HR Courses in Delhi",
            url: "https://connectingdotserp.com/hr-training-in-delhi",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Data Science Courses in Bangalore",
            url: "https://connectingdotserp.com/data-science-course-in-bangalore",
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Digital Marketing Courses in Chennai",
            url: "https://connectingdotserp.com/digital-marketing-course-in-chennai",
          },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://connectingdotserp.com/sitemap#breadcrumb",
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
          name: "Sitemap",
          item: "https://connectingdotserp.com/sitemap",
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
        "Professional training institute offering courses across multiple cities in India",
      url: "https://connectingdotserp.com/",
      sameAs: {
        "@id": "https://connectingdotserp.com/#organization",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Training Course Catalog",
        itemListElement: [
          {
            "@type": "Course",
            name: "SAP Training Programs",
            description:
              "Comprehensive SAP modules training across multiple cities",
          },
          {
            "@type": "Course",
            name: "IT & Software Development",
            description: "Programming and software development courses",
          },
          {
            "@type": "Course",
            name: "HR Training Programs",
            description: "Human Resources and HR Analytics courses",
          },
          {
            "@type": "Course",
            name: "Data Science & Analytics",
            description: "Data Science and Business Analytics training",
          },
          {
            "@type": "Course",
            name: "Digital Marketing",
            description: "Comprehensive digital marketing and SEO training",
          },
        ],
      },
    },
  ],
};

export default function SitemapPage() {
  // Define breadcrumb items for this page
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Sitemap" }, // Current page
  ];

  return (
    <>
      {/* 3. INJECT JSON-LD SCRIPT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* SEO-only content - hidden from users */}
      <div className="sr-only" aria-hidden="true">
        <h1>City Course Sitemap - Connecting Dots ERP Training Institute</h1>
        <h2>SAP Training Courses by City</h2>
        <h2>IT & Software Development Courses</h2>
        <h2>HR Training Programs Across India</h2>
        <h2>Data Science & Analytics Courses</h2>
        <h2>Digital Marketing Training by Location</h2>
        <h2>Business Analytics Courses</h2>
        <h2>Professional Certification Programs</h2>
        <h2>Courses in Major Indian Cities</h2>
        <h2>Pune Training Programs</h2>
        <h2>Mumbai Course Offerings</h2>
        <h2>Delhi Training Institute</h2>
        <h2>Bangalore Course Catalog</h2>
        <h2>Chennai Training Programs</h2>
        <h2>Hyderabad Course Directory</h2>
        <h2>Placement Assistance & Career Support</h2>
      </div>

      <main>
        <Breadcrumb items={breadcrumbItems} />
        <CitySitemap />
      </main>
    </>
  );
}
