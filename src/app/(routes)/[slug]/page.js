// src/app/(routes)/[slug]/page.js (Updated with Curriculum component)

import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import ClientOnly from "@/context/ClientOnly";
import {
  generateDynamicMetadata,
  generateDynamicJsonLd,
} from "@/lib/dynamicSEO";
import { coursesData, citiesData } from "@/lib/masterData";

// Import all your common components
import DSHeader from "@/components/CoursesComponents/Header";
import Why from "@/components/CoursesComponents/Why";
import Counselor from "@/components/CoursesComponents/Councelor";
import TrustUs from "@/components/CoursesComponents/Trustus";
import Certificate from "@/components/HomePage/Certificate";
import Program from "@/components/CoursesComponents/ProgramHighlights";
import Description from "@/components/CoursesComponents/Description";
import FAQ from "@/components/CoursesComponents/FAQ";
import CoursesRelated from "@/components/CoursesComponents/RelatedCourses";

// Import course-specific modules
import SapModComponent from "@/components/CoursesComponents/sapmod";
import Modules from "@/components/CoursesComponents/Modules";
import Curriculum from "@/components/CoursesComponents/Curriculam"; 
import HrCard from "@/components/CoursesComponents/HRCard";

// Helper function to parse the slug into course and city components
function parseSlug(slug) {
  const lastInIndex = slug.lastIndexOf("-in-");
  if (lastInIndex === -1) {
    return null;
  }

  let coursePart = slug.substring(0, lastInIndex);
  coursePart = coursePart.replace(
    /-course$|-training$|-developer$|-developer-course$|-developer-training$/,
    ""
  );

  const cityPart = slug.substring(lastInIndex + 4);

  return { courseSlug: coursePart, citySlug: cityPart };
}

// Generate metadata dynamically for each page
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    console.warn("❌ generateMetadata: Missing slug parameter.");
    return {};
  }

  const parsed = parseSlug(slug);
  if (!parsed) {
    console.warn(
      `❌ generateMetadata: Slug "${slug}" does not match expected pattern for dynamic course pages.`
    );
    return {};
  }

  const { courseSlug, citySlug } = parsed;

  if (!coursesData[courseSlug] || !citiesData[citySlug]) {
    console.warn(
      `❌ generateMetadata: Course "${courseSlug}" or City "${citySlug}" not found in masterData. Returning empty metadata.`
    );
    return {};
  }

  const metadata = generateDynamicMetadata(courseSlug, citySlug);
  if (!metadata) {
    console.warn(
      `❌ generateMetadata: Failed to generate metadata for "${slug}".`
    );
    return {};
  }

  const metadataObject = {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    robots: metadata.robots,
    authors: metadata.authors,
    alternates: {
      canonical: metadata.canonical,
      languages: metadata.alternates.reduce((acc, alt) => {
        if (alt.hreflang && alt.href) {
          acc[alt.hreflang] = alt.href;
        }
        return acc;
      }, {}),
    },
    openGraph: metadata.openGraph,
    twitter: metadata.twitter,
    icons: {
      icon: metadata.icons.icon,
      apple: metadata.icons.appleTouchIcon,
    },
    manifest: metadata.manifest,
  };

  if (metadata.isMajorCity && metadata.enhancedMeta) {
    metadataObject.other = metadataObject.other || {};
    Object.assign(metadataObject.other, {
      "geo.region": metadata.enhancedMeta.geoRegion,
      "geo.placename": metadata.enhancedMeta.geoPlacename,
      "geo.position": metadata.enhancedMeta.geoPosition,
      ICBM: metadata.enhancedMeta.icbm,
      "course.provider": metadata.enhancedMeta.courseProvider,
      "course.location": metadata.enhancedMeta.courseLocation,
      "course.category": metadata.enhancedMeta.courseCategory,
      "theme-color": metadata.enhancedMeta.themeColor,
      "msapplication-navbutton-color":
        metadata.enhancedMeta.msApplicationNavButtonColor,
      "apple-mobile-web-app-status-bar-style":
        metadata.enhancedMeta.appleStatusBarStyle,
      "mobile-web-capable": metadata.enhancedMeta.mobileWebCapable,
      "apple-mobile-web-app-capable": metadata.enhancedMeta.appleMobileCapable,
      "apple-mobile-web-app-title": metadata.enhancedMeta.appleMobileTitle,
    });
  }

  if (metadata.facebook?.appId) {
    metadataObject.other = metadataObject.other || {};
    metadataObject.other["fb:app_id"] = metadata.facebook.appId;
  }
  if (metadata.pinterest?.richPin) {
    metadataObject.other = metadataObject.other || {};
    metadataObject.other["pinterest-rich-pin"] = metadata.pinterest.richPin;
  }

  return metadataObject;
}

const CourseCityPage = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) return notFound();

  const parsed = parseSlug(slug);
  if (!parsed) {
    console.warn(
      `❌ CourseCityPage: Slug "${slug}" does not match course-city pattern. Returning notFound().`
    );
    return notFound();
  }

  const { courseSlug, citySlug } = parsed;

  const course = coursesData[courseSlug];
  const city = citiesData[citySlug];

  if (!course || !city) {
    console.error(
      `❌ CourseCityPage: Course "${courseSlug}" or City "${citySlug}" not found in masterData. Returning notFound().`
    );
    return notFound();
  }

  const jsonLd = generateDynamicJsonLd(courseSlug, citySlug);

  const processPlaceholders = (obj, cityNameToUse) => {
    if (typeof obj === "string") {
      return obj.replace(/{city}/g, cityNameToUse);
    }
    if (Array.isArray(obj)) {
      return obj.map((item) => processPlaceholders(item, cityNameToUse));
    }
    if (typeof obj === "object" && obj !== null) {
      const newObj = {};
      for (const key in obj) {
        newObj[key] = processPlaceholders(obj[key], cityNameToUse);
      }
      return newObj;
    }
    return obj;
  };

  const headerData = processPlaceholders(course.header, city.name);
  const whyData = processPlaceholders(course.why, city.name);
  const sapModData = course.sapMod
    ? processPlaceholders(course.sapMod, city.name)
    : null;
  const modulesData = course.modulesData
    ? processPlaceholders(course.modulesData, city.name)
    : null;
  const certificateData = processPlaceholders(course.certificate, city.name);
  const faqData = processPlaceholders(course.faq, city.name);
  const relatedCoursesData = processPlaceholders(
    course.relatedCourses,
    city.name
  );

  // Handle description content - check if it's multi-section (like Digital Marketing) or single section
  const descriptionContentData = processPlaceholders(
    course.descriptionContent,
    city.name
  );

  // Check if this is a multi-section course (like Digital Marketing)
  const isMultiSectionCourse =
    descriptionContentData &&
    (descriptionContentData.main ||
      descriptionContentData.ppc ||
      descriptionContentData.seo);

  // Determine which curriculum component to use based on data structure
  const shouldUseNewCurriculum =
    modulesData && modulesData.tabs && Array.isArray(modulesData.tabs);
  const shouldUseLegacyModules = modulesData && !shouldUseNewCurriculum;

  // Generate dynamic content for the page body.
  const dynamicBodyContent = `
    <div class="course-main-content">
      <!-- These elements now use the global 'visually-hidden' class -->
      <h1 class="visually-hidden">${course.title} Course in ${city.name}</h1>
      <h2 class="visually-hidden">Best ${course.fullTitle} Training in ${city.name}</h2>
      <p class="visually-hidden">${course.description.replace(/{city}/g, city.name)}</p>
      
      <section class="course-summary">
        <h3>About Our ${course.fullTitle} Course</h3>
        <p>Our comprehensive ${course.title} course in ${city.name} is designed to equip you with ${course.modules.length} key modules, practical skills, and industry insights. With a duration of ${course.duration}, you'll gain expertise in areas like: ${course.modules.slice(0, 3).join(", ")}${course.modules.length > 3 ? "..." : ""}.</p>
        <p>Get ready for a successful career in roles such as ${course.jobRoles.slice(0, 2).join(" or ")}.</p>
      </section>

      ${renderOfficeSpecificContent(city, course.title)}
      
      <section class="career-path">
        <h3>Career Opportunities After ${course.fullTitle} Training</h3>
        <p>Upon successful completion of our ${course.title} course, you'll be prepared for diverse and rewarding career paths, including:</p>
        <ul>
          ${course.jobRoles.map((role) => `<li>${role}</li>`).join("")}
        </ul>
      </section>
    </div>
  `;

  function renderOfficeSpecificContent(cityData, courseTitle) {
    if (cityData.hasOffice && cityData.office) {
      return `
        <section class="our-local-presence">
          <h3>Visit Our Training Center in ${cityData.name}</h3>
          <p>We're proud to offer in-person training at our state-of-the-art facility in ${cityData.name}.</p>
          <p><strong>Address:</strong> ${cityData.office.address}</p>
          <p><strong>Phone:</strong> ${cityData.office.phone}</p>
          <p><strong>Operating Hours:</strong> ${cityData.office.hours.open} - ${cityData.office.hours.close} daily</p>
          <p>Rated <strong>${cityData.office.rating}/5</strong> by ${cityData.office.reviewCount} students on Google.</p>
          ${cityData.office.mapUrl ? `<p><a href="${cityData.office.mapUrl}" target="_blank" rel="noopener noreferrer">Get Directions to our ${courseTitle} Training Center</a></p>` : ""}
        </section>
      `;
    }
    return "";
  }

  // Scroll handling script for hash navigation
  const scrollScript = `
    <script>
      (function() {
        function scrollToHash() {
          const hash = window.location.hash.replace('#', '');
          if (hash) {
            setTimeout(() => {
              const element = document.getElementById(hash);
              if (element) {
                element.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'start',
                  inline: 'nearest'
                });
              }
            }, 500);
          }
        }
        
        // Handle initial load
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', scrollToHash);
        } else {
          scrollToHash();
        }
        
        // Handle hash changes
        window.addEventListener('hashchange', scrollToHash);
      })();
    </script>
  `;

  // Render Digital Marketing specific layout
  if (courseSlug === "digital-marketing" && isMultiSectionCourse) {
    return (
      <>
        {/* Inject JSON-LD structured data (server-rendered) */}
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}

        {/* Inject scroll handling script */}
        <div dangerouslySetInnerHTML={{ __html: scrollScript }} />

        {/* Render core dynamic content for the page body */}
        <div dangerouslySetInnerHTML={{ __html: dynamicBodyContent }} />

        {/* Render Client Components */}
        <ClientOnly>
          <DSHeader data={headerData} />
          <Why data={whyData} />
          {sapModData && <SapModComponent data={sapModData} />}

          {/* Curriculum Components - New vs Legacy */}
          {shouldUseNewCurriculum && <Curriculum data={course} />}
          {shouldUseLegacyModules && <Modules data={modulesData} />}

          <Counselor />

          {/* Main description section */}
          <Description data={descriptionContentData.main} />

          {/* PPC Section with scroll anchor */}
          <div id="pay-per-click" style={{ scrollMarginTop: "80px" }}>
            {descriptionContentData.ppc && (
              <Description data={descriptionContentData.ppc} sectionIndex={0} />
            )}
          </div>

          <TrustUs />

          {/* SEO Section with scroll anchor */}
          <div
            id="search-engine-optimization"
            style={{ scrollMarginTop: "80px" }}
          >
            {descriptionContentData.seo && (
              <Description data={descriptionContentData.seo} sectionIndex={1} />
            )}
          </div>

          <Certificate data={certificateData} />
          <Program />

          {/* SMM Section with scroll anchor */}
          <div id="social-media-marketing" style={{ scrollMarginTop: "80px" }}>
            {descriptionContentData.smm && (
              <Description data={descriptionContentData.smm} sectionIndex={0} />
            )}
          </div>

          {/* Analytics Section with scroll anchor */}
          <div id="advance-analytics" style={{ scrollMarginTop: "80px" }}>
            {descriptionContentData.analytics && (
              <Description
                data={descriptionContentData.analytics}
                sectionIndex={1}
              />
            )}
          </div>

          <FAQ data={faqData} />
          <CoursesRelated
            data={relatedCoursesData}
            currentCityName={city.name}
          />
        </ClientOnly>
      </>
    );
  }

  // Default layout for other courses (SAP, HR, Data Analytics, etc.)
  return (
    <>
      {/* Inject JSON-LD structured data (server-rendered) */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      {/* Render core dynamic content for the page body */}
      <div dangerouslySetInnerHTML={{ __html: dynamicBodyContent }} />

      {/* Render Client Components */}
      <ClientOnly>
        <DSHeader data={headerData} />
        <Why data={whyData} />

        {/* Conditional rendering based on data availability and course type */}
        {sapModData && <SapModComponent data={sapModData} />}

        {/* Curriculum Components - New vs Legacy */}
        {shouldUseNewCurriculum && (
          <div id="curriculum" style={{ scrollMarginTop: "80px" }}>
            <Curriculum data={course} />
          </div>
        )}
        {shouldUseLegacyModules && (
          <div id="modules" style={{ scrollMarginTop: "80px" }}>
            <Modules data={modulesData} />
          </div>
        )}

        <Counselor />
        <TrustUs />
        <Program />
        <Certificate data={certificateData} />

        {/* Single description section for non-multi-section courses */}
        <Description data={descriptionContentData} />

        <FAQ data={faqData} />
        {course.category === "hr" && <HrCard />}
        <CoursesRelated data={relatedCoursesData} currentCityName={city.name} />
      </ClientOnly>
    </>
  );
};

export default CourseCityPage;
