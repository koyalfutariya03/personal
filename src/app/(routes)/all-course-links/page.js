import Link from "next/link";
import Breadcrumb from "@/components/CitySitemap/Breadcrumb";

// Define breadcrumb items for this page
const breadcrumbItems = [
  { label: "Home", path: "/" },
  { label: "All Courses" }, // Current page
];

// Cities and courses data
const cities = [
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

const courses = [
  "sap-course-in",
  "it-course-in",
  "data-visualization-course-in",
  "data-science-course-in",
  "data-analytics-course-in",
  "business-analytics-course-in",
  "chatgpt-course-in",
  "full-stack-developer-course-in",
  "java-course-in",
  "mern-stack-course-in",
  "python-course-in",
  "salesforce-course-in",
  "ui-ux-course-in",
  "sap-ewm-course-in",
  "sap-abap-course-in",
  "sap-ariba-course-in",
  "sap-basis-course-in",
  "sap-bwbi-course-in",
  "sap-fico-course-in",
  "sap-s4-hana-course-in",
  "sap-hr-hcm-course-in",
  "sap-mm-course-in",
  "sap-pm-course-in",
  "sap-pp-course-in",
  "sap-ps-course-in",
  "sap-qm-course-in",
  "sap-scm-course-in",
  "sap-sd-course-in",
  "sap-successfactors-course-in",
  "power-bi-course-in",
  "sql-course-in",
  "tableau-course-in",
  "digital-marketing-course-in",
  "hr-analytics-course-in",
  "hr-training-course-in",
  "core-hr-course-in",
  "hr-management-course-in",
  "hr-payroll-course-in",
  "hr-generalist-course-in",
];

// Function to generate course links
const generateCourseLinks = () => {
  const links = [];

  courses.forEach((course) => {
    cities.forEach((city) => {
      const href = `/${course}-${city}`;
      const displayText = formatDisplayText(course, city);
      links.push({ href, displayText });
    });
  });

  return links;
};

// Function to format display text
const formatDisplayText = (course, city) => {
  const courseText = course
    .replace(/-course-in$/, "")
    .replace(/-training-in$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const cityText = city
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const suffix = course.includes("-training-in") ? "Training" : "Course";

  return `${courseText} ${suffix} In ${cityText}`;
};

// Generate all course links
const allCourseLinks = generateCourseLinks();

// 1. SEO METADATA - Next.js App Router way
export const metadata = {
  title: "All Courses | SAP, IT & HR Training | Connecting Dots ERP",
  description:
    "Browse all SAP, IT, and HR courses offered by Connecting Dots ERP. Find detailed information and links to specific training programs with placement support in Pune, Mumbai, Raipur and more.",
  keywords: [
    "all courses",
    "course list",
    "SAP courses",
    "IT courses",
    "HR courses",
    "Connecting Dots ERP",
    "training programs",
    "certification courses",
    "placement assistance",
    "SAP training",
    "software training",
    "professional courses",
  ],
  author: "Connecting Dots ERP",
  robots: "index, follow",
  alternates: {
    canonical: "https://connectingdotserp.com/all-course-links",
  },
  openGraph: {
    title: "All Courses | SAP, IT & HR Training | Connecting Dots ERP",
    description:
      "Explore the full range of SAP, IT, and HR professional training courses offered by Connecting Dots ERP.",
    url: "https://connectingdotserp.com/all-course-links",
    siteName: "Connecting Dots ERP",
    images: [
      {
        url: "https://connectingdotserp.com/images/all-courses-banner.jpg",
        width: 1280,
        height: 720,
        alt: "Connecting Dots ERP Course Catalog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Courses | SAP, IT & HR Training | Connecting Dots ERP",
    description:
      "Find the perfect SAP, IT, or HR course to advance your career at Connecting Dots ERP. View our complete list.",
    site: "@CD_ERP",
    images: ["https://connectingdotserp.com/images/all-courses-banner.jpg"],
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
        "Connecting Dots ERP - Leading Training Institute for SAP, IT & HR Courses with Placement Support.",
      telephone: "+919004002941",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "1st Floor,101, Police, Wireless Colony, Vishal Nagar, Pimple Nilakh",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        postalCode: "411027",
        addressCountry: "IN",
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
    {
      "@type": "CollectionPage",
      "@id": "https://connectingdotserp.com/all-course-links#webpage",
      url: "https://connectingdotserp.com/all-course-links",
      name: "All Courses | SAP, IT & HR Training | Connecting Dots ERP",
      description:
        "Browse all SAP, IT, and HR courses offered by Connecting Dots ERP. Find detailed information and links to specific training programs with placement support in Pune, Mumbai, Raipur and more.",
      inLanguage: "en-US",
      isPartOf: {
        "@id": "https://connectingdotserp.com/#website",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://connectingdotserp.com/images/all-courses-banner.jpg",
        "@id": "https://connectingdotserp.com/all-course-links#mainImage",
        width: 1280,
        height: 720,
        caption: "Connecting Dots ERP Course Catalog",
      },
      breadcrumb: {
        "@id": "https://connectingdotserp.com/all-course-links#breadcrumb",
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: allCourseLinks.length,
        itemListElement: allCourseLinks.slice(0, 20).map((link, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: link.displayText,
          url: `https://connectingdotserp.com${link.href}`,
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://connectingdotserp.com/all-course-links#breadcrumb",
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
          name: "All Courses",
          item: "https://connectingdotserp.com/all-course-links",
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
  ],
};

export default function AllCourseLinks() {
  return (
    <>
      {/* 3. INJECT JSON-LD SCRIPT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb items={breadcrumbItems} />

      <div className="bg-white p-5 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          All Course and City Links
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-4xl">
          Explore our comprehensive range of {courses.length} professional
          courses across {cities.length} cities. Find the perfect SAP, IT, or HR
          training program near you with placement support and
          industry-recognized certification.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl">
          {allCourseLinks.map((link, index) => (
            <div key={index} className="text-center">
              <Link
                href={link.href}
                className="text-blue-600 hover:text-blue-800 no-underline block p-3 border border-gray-200 rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 hover:border-blue-300"
                title={`Learn ${link.displayText} with placement assistance`}
              >
                {link.displayText}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-2">
            Total:{" "}
            <strong className="text-gray-800">{allCourseLinks.length}</strong>{" "}
            course and city combinations available
          </p>
          <p className="text-sm text-gray-500">
            All courses include placement assistance, industry-recognized
            certification, and expert training
          </p>
        </div>
      </div>
    </>
  );
}
