// lib/dynamicSEO.js - Fixed for JavaScript Errors

import { coursesData, citiesData } from "./masterData.js";

// Helper to safely truncate string to word boundary
function truncateString(str, maxLength) {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  const truncated = str.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(" ");
  return lastSpaceIndex > maxLength * 0.8 && lastSpaceIndex < maxLength
    ? truncated.slice(0, lastSpaceIndex) + "..."
    : truncated + "...";
}

// Strategic city name optimization
function getOptimizedCityName(cityName) {
  const optimizations = {
    "Pimpri-Chinchwad": "Pimpri",
    "Visakhapatnam": "Vizag", 
    "Koregaon-Park": "Koregaon",
    "Shivaji-Nagar": "Shivaji Ngr",
    "Pimple-Saudagar": "Pimple",
    "Thiruvananthapuram": "Trivandrum",
    "Navi-Mumbai": "Navi Mumbai",
    "Vile-Parle": "Vile Parle",
  };
  return optimizations[cityName] || cityName;
}

// Strategic course name optimization
function getOptimizedCourseTitle(courseTitle) {
  const optimizations = {
    "SAP SuccessFactors": "SAP SF",
    "Full Stack Developer": "Full Stack Dev",
    "Data Visualization": "Data Viz",
    "Business Analytics": "Biz Analytics",
    "HR Management": "HR Mgmt",
    "SAP S4 HANA": "SAP S4",
  };
  return optimizations[courseTitle] || courseTitle;
}

// Smart title optimization (50-60 chars target)
function getOptimalTitle(course, cityName, courseTitle) {
  if (course.metaTitle) {
    const processedTitle = course.metaTitle.replace(/{city}/g, cityName);
    return truncateString(processedTitle, 60);
  }
  
  const currentYear = new Date().getFullYear();
  const cityLength = cityName.length;
  const courseTitleLength = courseTitle.length;
  
  // Strategy 1: Try standard template
  const standardTemplate = `${courseTitle} Course in ${cityName} | Training`;
  if (standardTemplate.length <= 60) {
    return standardTemplate;
  }
  
  // Strategy 2: Optimize city name
  const optimizedCity = getOptimizedCityName(cityName);
  const cityOptimizedTemplate = `${courseTitle} Course in ${optimizedCity} | Training`;
  if (cityOptimizedTemplate.length <= 60) {
    return cityOptimizedTemplate;
  }
  
  // Strategy 3: Optimize both
  const optimizedCourse = getOptimizedCourseTitle(courseTitle);
  const bothOptimizedTemplate = `${optimizedCourse} in ${optimizedCity} | Training`;
  if (bothOptimizedTemplate.length <= 60) {
    return bothOptimizedTemplate;
  }
  
  // Fallback: Truncate
  return truncateString(`${courseTitle} in ${cityName} | Training`, 60);
}

// Smart description optimization (150-160 chars target)
function getOptimalDescription(course, cityName, courseTitle) {
  if (course.metaDescription) {
    const processedDescription = course.metaDescription.replace(/{city}/g, cityName);
    if (processedDescription.length <= 160) {
      return processedDescription;
    }
    return truncateString(processedDescription, 160);
  }
  
  // Template targeting 150-160 chars
  const template = `Master ${courseTitle} in ${cityName}. Expert-led training, certification, real-time projects & 100% placement support. Launch your career now!`;
  
  if (template.length >= 150 && template.length <= 160) {
    return template;
  }
  
  if (template.length > 160) {
    return truncateString(template, 160);
  }
  
  // If too short, expand slightly
  const expandedTemplate = template.replace(
    "Launch your career now!",
    "Start your successful career journey now!"
  );
  
  return expandedTemplate.length <= 160 ? expandedTemplate : truncateString(expandedTemplate, 160);
}

export function generateDynamicMetadata(courseSlug, citySlug) {
  const course = coursesData[courseSlug];
  const city = citiesData[citySlug];

  if (!course || !city) {
    console.error(
      `Metadata generation: Course or city data not found for slugs: ${courseSlug}, ${citySlug}`
    );
    return null;
  }

  const courseTitle = course.title;
  const cityName = city.name;
  const hasOffice = city.hasOffice;

  // Generate optimized title and description
  const finalTitle = getOptimalTitle(course, cityName, courseTitle);
  const finalDescription = getOptimalDescription(course, cityName, courseTitle);

  // Generate strategic keywords
  const keywords = [
    `${courseTitle} Course in ${cityName}`,
    `${courseTitle} Training in ${cityName}`,
    `Best ${courseTitle} Training Institute in ${cityName}`,
    `${courseTitle} Certification in ${cityName}`,
    `${courseTitle} Classes in ${cityName}`,
    `${courseTitle} Jobs in ${cityName}`,
    `Connecting Dots ERP ${cityName}`,
    ...course.jobRoles.slice(0, 2).map((role) => `${role} ${cityName}`),
    ...(course.modules ? course.modules.slice(0, 2).map((module) => `${module} training ${cityName}`) : []),
  ]
    .filter(Boolean)
    .join(", ");
    
  const optimizedKeywords = truncateString(keywords, 400);

  // Generate URLs
  const pageUrl = `https://connectingdotserp.com/${course.slug}-course-in-${citySlug}`;
  const ogImageUrl = `https://connectingdotserp.com/images/og-${course.slug}-course-${citySlug}.jpg`;
  const twitterImageUrl = `https://connectingdotserp.com/images/twitter-${course.slug}-course-${citySlug}.jpg`;

  // Open Graph metadata
  const openGraph = {
    title: finalTitle,
    description: finalDescription,
    url: pageUrl,
    siteName: "Connecting Dots ERP",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: truncateString(`${courseTitle} Course in ${cityName}`, 100),
      },
    ],
    type: "website",
    locale: "en_US",
    updatedTime: new Date().toISOString(),
  };

  // Twitter Card metadata
  const twitter = {
    card: "summary_large_image",
    title: finalTitle,
    description: finalDescription,
    images: [twitterImageUrl],
    site: "@CD_ERP",
    creator: "@CD_ERP",
  };

  // FIXED: Enhanced metadata with correct meta tag names
  const enhancedMeta = hasOffice
    ? {
        geoRegion: city.seoData.geoRegion,
        geoPlacename: cityName,
        geoPosition: city.seoData.geoPosition,
        icbm: city.seoData.geoPosition,
        courseProvider: "Connecting Dots ERP",
        courseLocation: cityName,
        courseCategory: course.category,
        themeColor: "#1a365d",
        msApplicationNavButtonColor: "#1a365d",
        appleStatusBarStyle: "black-translucent",
        "mobile-web-app-capable": "yes", // ✅ Fixed: Use correct meta tag
        appleMobileTitle: truncateString(`${getOptimizedCourseTitle(courseTitle)} - ${getOptimizedCityName(cityName)}`, 45),
      }
    : {};

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: optimizedKeywords,
    robots: "index, follow",
    author: "Connecting Dots ERP Training Institute",
    language: "en-US",
    revisitAfter: "7 days",
    distribution: "global",
    rating: "general",
    canonical: pageUrl,
    openGraph,
    twitter,
    enhancedMeta,
    isMajorCity: hasOffice,
    alternates: [
      {
        hreflang: "en-IN",
        href: pageUrl,
      },
      {
        hreflang: "x-default",
        href: pageUrl,
      },
    ],
    icons: {
      icon: "/favicon.ico",
      appleTouchIcon: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest", // ✅ Fixed: Ensure manifest is included
    preconnect: [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      "https://www.google-analytics.com",
    ],
    dnsPrefetch: [
      "//www.google.com",
      "//www.googleapis.com",
      "//fonts.googleapis.com",
    ],
    facebook: {
      appId: "your-facebook-app-id",
    },
    pinterest: {
      richPin: "true",
    },
  };
}

// Keep your existing generateDynamicJsonLd function unchanged
export function generateDynamicJsonLd(courseSlug, citySlug) {
  const course = coursesData[courseSlug];
  const city = citiesData[citySlug];

  if (!course || !city) {
    console.error(
      `JSON-LD generation: Course or city data not found for slugs: ${courseSlug}, ${citySlug}`
    );
    return null;
  }

  const baseUrl = "https://connectingdotserp.com";
  const pageUrl = `${baseUrl}/${course.slug}-course-in-${citySlug}`;
  const currentDate = new Date().toISOString();
  const futureDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const courseTitle = course.title;
  const cityName = city.name;
  const hasOffice = city.hasOffice;

  const processedDescription = course.description.replace(/{city}/g, cityName);

  const jsonLd = [
    // Organization Schema
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Connecting Dots ERP",
      description: "Best Training Provider | Placement Giants",
      url: baseUrl,
      telephone:
        hasOffice && city.office?.phone ? city.office.phone : "+919004002941",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/Navbar/logo.webp`,
        "@id": `${pageUrl}#organizationLogoImage`,
        width: 228,
        height: 70,
        caption: "Connecting Dots ERP Logo",
      },
      image: {
        "@id": `${pageUrl}#organizationLogoImage`,
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
    },

    // WebPage Schema
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: `${courseTitle} Course in ${cityName} | Connecting Dots ERP`,
      description: processedDescription,
      inLanguage: "en-US",
      isPartOf: {
        "@id": `${baseUrl}/#website`,
      },
      breadcrumb: {
        "@id": `${pageUrl}#breadcrumb`,
      },
      image: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/course-banner-${course.slug}-course.jpg`,
        "@id": `${pageUrl}#mainImage`,
        width: 1200,
        height: 630,
        caption: `${courseTitle} Course in ${cityName}`,
      },
      primaryImageOfPage: {
        "@id": `${pageUrl}#mainImage`,
      },
      datePublished: course.publishedAt || currentDate,
      dateModified: course.updatedAt || currentDate,
    },

    // BreadcrumbList Schema
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: `${course.category.charAt(0).toUpperCase() + course.category.slice(1)} Courses`,
          item: `${baseUrl}/${course.category}-courses`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${courseTitle} Course in ${cityName}`,
          item: pageUrl,
        },
      ],
    },

    // WebSite Schema
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Connecting Dots ERP",
      description: "Learn the way industry wants it...",
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${baseUrl}/?s={search_term_string}`,
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

    // Course Schema
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "@id": `${pageUrl}#course`,
      name: `${courseTitle} Course in ${cityName}`,
      description: processedDescription,
      url: pageUrl,
      provider: {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "Connecting Dots ERP",
      },
      offers: {
        "@type": "Offer",
        url: pageUrl,
        priceCurrency: "INR",
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "INR",
          minPrice: course.price.min.toString(),
          maxPrice: course.price.max.toString(),
        },
        priceValidUntil: futureDate,
        availability: "https://schema.org/InStock",
        category: "Professional Training",
        areaServed: hasOffice
          ? {
              "@type": "Place",
              "@id": `${baseUrl}/${citySlug}/#localbusiness`,
            }
          : {
              "@type": "Place",
              name: cityName,
              addressLocality: cityName,
              addressRegion: city.state,
              addressCountry: "IN",
            },
        seller: hasOffice
          ? {
              "@type": "Organization",
              "@id": `${baseUrl}/${citySlug}/#localbusiness`,
            }
          : {
              "@type": "Organization",
              "@id": `${baseUrl}/#organization`,
            },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: (hasOffice && city.office
          ? city.office.rating
          : course.defaultRating || 4.5
        ).toString(),
        reviewCount: (hasOffice && city.office
          ? city.office.reviewCount
          : course.defaultReviewCount || 50
        ).toString(),
        bestRating: "5",
        worstRating: "1",
      },
      review: {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Verified Student",
        },
        datePublished: currentDate.split("T")[0],
        reviewBody: `The ${courseTitle} course at Connecting Dots ERP is outstanding! The course content is comprehensive, and the trainers are highly knowledgeable. I highly recommend it to anyone looking to build a successful career in ${courseTitle}.`,
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
      },
      hasCourseInstance: [
        {
          "@type": "CourseInstance",
          courseMode: "Blended",
          location: cityName,
          courseSchedule: {
            "@type": "Schedule",
            duration: "PT3H",
            repeatFrequency: "Daily",
            repeatCount: 31,
            startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
            endDate: new Date(Date.now() + 37 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
          },
          instructor:
            hasOffice && city.office?.instructor
              ? [
                  {
                    "@type": "Person",
                    name: city.office.instructor,
                    description: `${courseTitle} Specialist with 10+ years of experience in training and consulting`,
                  },
                ]
              : [
                  {
                    "@type": "Person",
                    name: "Experienced Trainer",
                    description: `${courseTitle} Specialist with 10+ years of experience in training and consulting`,
                  },
                ],
        },
      ],
    },

    // VideoObject Schema
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      "@id": `${pageUrl}#video`,
      name: `Introduction to ${courseTitle} Course at Connecting Dots ERP`,
      description: `Explore ${courseTitle} with Connecting Dots ERP! Gain expertise in ${course.modules ? course.modules.slice(0, 2).join(" and ") : "your chosen field"}, data management, and business process integration. Master real-world applications to drive digital transformation.`,
      thumbnailUrl: `${baseUrl}/images/video-thumbnail-${course.slug}-course-${citySlug}.jpg`,
      embedUrl: "https://www.youtube.com/embed/7YRbfuv7R3k",
      uploadDate: currentDate.split("T")[0],
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
    },

    // SpecialAnnouncement Schema
    {
      "@context": "https://schema.org",
      "@type": "SpecialAnnouncement",
      "@id": `${pageUrl}#announcement`,
      name: `${courseTitle} Course in ${cityName} - New Batch Starting Soon!`,
      text: `Join our new batch for the ${courseTitle} course in ${cityName}. Enroll now and kickstart your career in ${courseTitle}. The course offers in-depth training in ${course.modules ? course.modules.slice(0, 3).join(", ") : "key concepts"}, with hands-on experience and expert guidance.`,
      datePosted: currentDate.split("T")[0],
      expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      url: pageUrl,
      publisher: {
        "@id": `${baseUrl}/#organization`,
      },
      announcementLocation: hasOffice
        ? {
            "@type": "Place",
            "@id": `${baseUrl}/${citySlug}/#localbusiness`,
          }
        : undefined,
    },
  ];

  // Add LocalBusiness schema only for cities with offices
  if (hasOffice && city.office) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/${citySlug}/#localbusiness`,
      name: `Best ${courseTitle} Training Institute in ${cityName} | ${courseTitle} Course in ${cityName} | ${courseTitle} Classes in ${cityName} | Placement`,
      description: `Start your new journey with Connecting Dots ERP in the world of ${courseTitle} by enrolling in our ${courseTitle} course in ${cityName}! Whether you're just starting or aiming to enhance your skills we offer a variety of ${courseTitle} courses designed to your requirements.`,
      url: city.office.mapUrl || pageUrl,
      telephone: city.office.phone,
      priceRange: city.seoData.priceRange,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          opens: city.office.hours.open,
          closes: city.office.hours.close,
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: city.office.address,
        addressLocality: cityName,
        addressRegion: city.state,
        postalCode: city.office.postalCode || "400001",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.coordinates.lat.toString(),
        longitude: city.coordinates.lng.toString(),
      },
      image: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/location-${citySlug}-${course.category}.jpg`,
        "@id": `${pageUrl}#locationImage`,
        width: 800,
        height: 600,
        caption: `Connecting Dots ERP ${cityName} Branch - ${courseTitle} Training`,
      },
      hasMap: city.office.mapUrl,
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: city.coordinates.lat.toString(),
          longitude: city.coordinates.lng.toString(),
        },
        geoRadius: "20000",
        description: `Serving ${cityName} and surrounding areas for ${courseTitle} training.`,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: city.office.rating.toString(),
        reviewCount: city.office.reviewCount.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      review: {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Verified Student",
        },
        datePublished: currentDate.split("T")[0],
        reviewBody: `The ${courseTitle} course at Connecting Dots ERP is outstanding! The course content is well-structured and comprehensive, and the trainers are exceptionally skilled and knowledgeable. I highly recommend it to anyone aspiring to build a career in ${courseTitle}.`,
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
      },
      parentOrganization: {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
      },
    });
  }

  return jsonLd;
}