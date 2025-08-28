// src/app/(routes)/sitemap/[city]/page.js

import { notFound } from "next/navigation";
import CityCoursePage from "@/components/CitySitemap/CityCoursePage";
import Breadcrumb from "@/components/CitySitemap/Breadcrumb";
import Link from "next/link";

// This data would ideally come from your CMS or API
export const cityData = {
  pune: {
    name: "Pune",
    description:
      "Explore our comprehensive range of professional courses in Pune, Maharashtra's educational hub and IT powerhouse.",
  },
  katraj: {
    name: "Katraj",
    description:
      "Join top-rated training programs in Katraj, a vibrant residential and educational area in south Pune with excellent connectivity.",
  },
  "pimpri-chinchwad": {
    name: "Pimpri-Chinchwad",
    description:
      "Enhance your career with specialized courses in Pimpri-Chinchwad, Pune's industrial township known for manufacturing and IT sectors.",
  },
  "shivaji-nagar": {
    name: "Shivaji Nagar",
    description:
      "Discover premium courses in Shivaji Nagar, a central commercial and educational hub in Pune with prestigious institutions.",
  },
  "koregaon-park": {
    name: "Koregaon Park",
    description:
      "Advance your skills with elite training programs in Koregaon Park, Pune's upscale neighborhood known for cosmopolitan culture.",
  },
  "viman-nagar": {
    name: "Viman Nagar",
    description:
      "Upgrade your professional expertise with courses in Viman Nagar, a modern residential and commercial district in east Pune.",
  },
  "pimple-saudagar": {
    name: "Pimple Saudagar",
    description:
      "Access quality training in Pimple Saudagar, a rapidly developing residential area with modern amenities and connectivity.",
  },
  baner: {
    name: "Baner",
    description:
      "Pursue professional development in Baner, one of Pune's premium IT corridors with excellent infrastructure and amenities.",
  },
  hinjewadi: {
    name: "Hinjewadi",
    description:
      "Gain industry-relevant skills in Hinjewadi, Pune's premier IT hub and home to numerous tech companies and business parks.",
  },
  wakad: {
    name: "Wakad",
    description:
      "Find comprehensive courses in Wakad, a thriving residential and commercial area close to Pune's IT hubs and business centers.",
  },
  kothrud: {
    name: "Kothrud",
    description:
      "Enroll in top-rated programs in Kothrud, one of Pune's most developed residential areas with excellent educational infrastructure.",
  },
  hadapsar: {
    name: "Hadapsar",
    description:
      "Develop your professional capabilities in Hadapsar, a major commercial and industrial zone in eastern Pune.",
  },
  aundh: {
    name: "Aundh",
    description:
      "Excel with specialized training in Aundh, an upscale residential neighborhood in Pune known for its modern amenities and vibrant culture.",
  },
  mumbai: {
    name: "Mumbai",
    description:
      "Discover top-rated professional training programs in Mumbai, India's financial capital and business hub.",
  },
  "navi-mumbai": {
    name: "Navi Mumbai",
    description:
      "Explore career-boosting courses in Navi Mumbai, a well-planned satellite city with booming IT and commercial sectors.",
  },
  thane: {
    name: "Thane",
    description:
      "Advance your skills in Thane, a fast-growing city near Mumbai known for its vibrant job market and infrastructure.",
  },
  kalyan: {
    name: "Kalyan",
    description:
      "Discover specialized training in Kalyan, a key residential and commercial hub in the Mumbai Metropolitan Region.",
  },
  bandra: {
    name: "Bandra",
    description:
      "Upgrade your expertise in Bandra, Mumbai's trendy suburb known for its business centers and cultural hotspots.",
  },
  andheri: {
    name: "Andheri",
    description:
      "Gain industry-relevant knowledge in Andheri, Mumbai's major business district with diverse corporate opportunities.",
  },
  powai: {
    name: "Powai",
    description:
      "Join professional courses in Powai, a leading educational and startup hub in Mumbai with a strong corporate presence.",
  },
  worli: {
    name: "Worli",
    description:
      "Develop your career in Worli, one of Mumbai's prime commercial districts with elite business and educational centers.",
  },
  chembur: {
    name: "Chembur",
    description:
      "Find top-rated professional training in Chembur, a well-connected residential and industrial area in Mumbai with excellent career opportunities.",
  },
  malad: {
    name: "Malad",
    description:
      "Advance your skills with specialized courses in Malad, a dynamic residential and IT hub in Mumbai's western suburbs.",
  },
  "vile-parle": {
    name: "Vile Parle",
    description:
      "Enroll in professional training in Vile Parle, home to top educational institutions and business districts.",
  },
  matunga: {
    name: "Matunga",
    description:
      "Excel in your field with professional training and expert trainers in Matunga, Mumbai's academic and cultural hub.",
  },
  delhi: {
    name: "Delhi",
    description:
      "Enhance your skills with professional courses in Delhi, India's capital city and a center for diverse industries.",
  },
  kolkata: {
    name: "Kolkata",
    description:
      "Discover professional courses in Kolkata, Eastern India's educational and cultural hub with rich heritage.",
  },
  chennai: {
    name: "Chennai",
    description:
      "Find specialized training programs in Chennai, a major educational and industrial center in South India.",
  },
  bangalore: {
    name: "Bangalore",
    description:
      "Advance your career with specialized courses in Bangalore, India's technology hub and startup capital.",
  },
  hyderabad: {
    name: "Hyderabad",
    description:
      "Pursue quality professional training in Hyderabad, a major tech and educational center with growing opportunities.",
  },
  ahmedabad: {
    name: "Ahmedabad",
    description:
      "Enhance your career with quality training programs in Ahmedabad, Gujarat's largest city and industrial powerhouse.",
  },
  jaipur: {
    name: "Jaipur",
    description:
      "Get trained in top professional courses in Jaipur, Rajasthan's capital and a growing business center.",
  },
  lucknow: {
    name: "Lucknow",
    description:
      "Discover professional development opportunities in Lucknow, known for its heritage, culture, and education.",
  },
  kanpur: {
    name: "Kanpur",
    description:
      "Advance your skills with professional courses in Kanpur, an important industrial and educational center in North India.",
  },
  nagpur: {
    name: "Nagpur",
    description:
      "Find quality training programs in Nagpur, the geographical center of India and an emerging commercial hub.",
  },
  patna: {
    name: "Patna",
    description:
      "Explore career-advancing courses in Patna, Bihar's capital and a rapidly developing educational center.",
  },
  indore: {
    name: "Indore",
    description:
      "Expand your professional capabilities in Indore, Madhya Pradesh's commercial capital and cleanest city in India.",
  },
  bhopal: {
    name: "Bhopal",
    description:
      "Learn from industry experts in Bhopal, the capital city of Madhya Pradesh with a blend of modern development and natural beauty.",
  },
  visakhapatnam: {
    name: "Visakhapatnam",
    description:
      "Gain valuable skills with professional courses in Visakhapatnam, a major port city and industrial center on the east coast.",
  },
  vadodara: {
    name: "Vadodara",
    description:
      "Enhance your professional profile with quality training in Vadodara, an educational and industrial center in Gujarat.",
  },
  ludhiana: {
    name: "Ludhiana",
    description:
      "Upgrade your skills with professional courses in Ludhiana, Punjab's largest city and manufacturing hub.",
  },
  agra: {
    name: "Agra",
    description:
      "Discover practical training programs in Agra, home to world-renowned heritage sites and a growing educational sector.",
  },
  nashik: {
    name: "Nashik",
    description:
      "Develop your career with professional courses in Nashik, an emerging educational hub and wine capital of India.",
  },
  rajkot: {
    name: "Rajkot",
    description:
      "Explore quality training programs in Rajkot, one of Gujarat's fastest-growing cities with a strong industrial base.",
  },
  varanasi: {
    name: "Varanasi",
    description:
      "Find specialized courses in Varanasi, one of the world's oldest continuously inhabited cities with rich educational heritage.",
  },
  kerala: {
    name: "Kerala",
    description:
      "Advance your skills with professional training across Kerala, known for its high literacy rate and quality education.",
  },
  surat: {
    name: "Surat",
    description:
      "Gain valuable expertise in Surat, Gujarat's commercial powerhouse and diamond cutting center with growing IT sectors.",
  },
  dehradun: {
    name: "Dehradun",
    description:
      "Discover quality education in Dehradun, Uttarakhand's capital known for prestigious institutions and natural beauty.",
  },
  madurai: {
    name: "Madurai",
    description:
      "Explore professional development opportunities in Madurai, one of Tamil Nadu's major cities with rich cultural heritage.",
  },
  mysore: {
    name: "Mysore",
    description:
      "Enhance your skills in Mysore, a city known for its cultural and educational heritage with growing IT presence.",
  },
  pondicherry: {
    name: "Pondicherry",
    description:
      "Find specialized courses in Pondicherry, a unique cultural and educational destination with French colonial influence.",
  },
  ranchi: {
    name: "Ranchi",
    description:
      "Advance your career with professional training in Ranchi, Jharkhand's capital city with expanding educational opportunities.",
  },
  coimbatore: {
    name: "Coimbatore",
    description:
      "Develop your expertise in Coimbatore, a major educational and industrial hub in Tamil Nadu known as Manchester of South India.",
  },
  chandigarh: {
    name: "Chandigarh",
    description:
      "Explore quality professional courses in Chandigarh, a well-planned city with excellent infrastructure and educational facilities.",
  },
  bhubaneswar: {
    name: "Bhubaneswar",
    description:
      "Gain valuable skills in Bhubaneswar, Odisha's capital and a growing IT hub with rich cultural heritage.",
  },
  tirupati: {
    name: "Tirupati",
    description:
      "Find professional training opportunities in Tirupati, a prominent educational and spiritual center in Andhra Pradesh.",
  },
  vizag: {
    name: "Vizag",
    description:
      "Enhance your professional qualifications in Vizag, a major port city on the east coast with growing industrial sectors.",
  },
  trivandrum: {
    name: "Trivandrum",
    description:
      "Develop your career with quality courses in Trivandrum, Kerala's capital and an emerging IT and space research hub.",
  },
  jalandhar: {
    name: "Jalandhar",
    description:
      "Upgrade your skills with professional training in Jalandhar, one of Punjab's major industrial cities with sports goods manufacturing.",
  },
  mohali: {
    name: "Mohali",
    description:
      "Explore specialized courses in Mohali, an emerging IT, educational hub, and cricket venue in Punjab.",
  },
  raipur: {
    name: "Raipur",
    description:
      "Find quality professional training in Raipur, the capital city of Chhattisgarh with growing industrial and educational sectors.",
  },
  cochin: {
    name: "Cochin",
    description:
      "Advance your career with courses in Cochin, Kerala's major port city and commercial hub with rich cultural diversity.",
  },
  mangalore: {
    name: "Mangalore",
    description:
      "Gain professional expertise in Mangalore, a major port city and educational center in Karnataka with diverse industries.",
  },
};

// Server-side function to generate all course links for a city
function generateCityLinks(city) {
  const courseCategories = [
    {
      id: "sap",
      name: "SAP S/4 HANA Courses",
      subcategories: [
        {
          title: "SAP Functional",
          courses: [
            { name: "SAP", slug: `/sap-course-in-${city}` },
            { name: "SAP FICO", slug: `/sap-fico-course-in-${city}` },
            { name: "SAP Ariba", slug: `/sap-ariba-course-in-${city}` },
            { name: "SAP MM", slug: `/sap-mm-course-in-${city}` },
            { name: "SAP SD", slug: `/sap-sd-course-in-${city}` },
            { name: "SAP HR/HCM", slug: `/sap-hr-hcm-course-in-${city}` },
            { name: "SAP PP", slug: `/sap-pp-course-in-${city}` },
            { name: "SAP QM", slug: `/sap-qm-course-in-${city}` },
            { name: "SAP PM", slug: `/sap-pm-course-in-${city}` },
            { name: "SAP PS", slug: `/sap-ps-course-in-${city}` },
            { name: "SAP EWM", slug: `/sap-ewm-course-in-${city}` },
            { name: "SAP SCM", slug: `/sap-scm-course-in-${city}` },
            {
              name: "SAP SUCCESSFACTOR",
              slug: `/sap-successfactors-course-in-${city}`,
            },
          ],
        },
        {
          title: "SAP Technical",
          courses: [
            { name: "SAP ABAP", slug: `/sap-abap-course-in-${city}` },
            { name: "SAP S/4 HANA", slug: `/sap-s4-hana-course-in-${city}` },
            { name: "SAP BW/BI", slug: `/sap-bwbi-course-in-${city}` },
            { name: "SAP BASIS", slug: `/sap-basis-course-in-${city}` },
          ],
        },
      ],
    },
    {
      id: "it",
      name: "IT Courses",
      subcategories: [
        {
          title: "Data Science",
          courses: [
            {
              name: "MASTERS IN DATA ANALYTICS",
              slug: `/data-analytics-course-in-${city}`,
            },
            {
              name: "MASTERS IN DATA SCIENCE",
              slug: `/data-science-course-in-${city}`,
            },
            {
              name: "MASTERS IN BUSINESS ANALYTICS",
              slug: `/business-analytics-course-in-${city}`,
            },
            { name: "CHAT GPT & AI", slug: `/chatgpt-course-in-${city}` },
          ],
        },
      ],
      courses: [
        { name: "IT Course", slug: `/it-course-in-${city}` },
        {
          name: "Full Stack Training",
          slug: `/full-stack-developer-course-in-${city}`,
        },
        { name: "JAVA", slug: `/java-course-in-${city}` },
        { name: "MERN Stack", slug: `/mern-stack-course-in-${city}` },
        { name: "UI/UX Design", slug: `/ui-ux-course-in-${city}` },
        { name: "Python", slug: `/python-course-in-${city}` },
        { name: "Salesforce", slug: `/salesforce-training-in-${city}` },
      ],
    },
    {
      id: "data-viz",
      name: "Data Visualisation Courses",
      courses: [
        {
          name: "Data Visualisation Course",
          slug: `/data-visualisation-course-in-${city}`,
        },
        { name: "Tableau", slug: `/tableau-training-in-${city}` },
        { name: "Power BI", slug: `/power-bi-course-in-${city}` },
        { name: "SQL", slug: `/sql-course-in-${city}` },
      ],
    },
    {
      id: "digital",
      name: "Digital Marketing Courses",
      courses: [
        {
          name: "Advance Digital Marketing",
          slug: `/digital-marketing-course-in-${city}`,
        },
        {
          name: "Pay Per Click Training",
          slug: `/digital-marketing-course-in-${city}#pay-per-click`,
        },
        {
          name: "Search Engine Optimization",
          slug: `/digital-marketing-course-in-${city}#search-engine-optimization`,
        },
        {
          name: "Social Media Marketing",
          slug: `/digital-marketing-course-in-${city}#social-media-marketing`,
        },
        {
          name: "Advance Google Analytics Training",
          slug: `/digital-marketing-course-in-${city}#advance-analytics`,
        },
      ],
    },
    {
      id: "hr",
      name: "HR Courses",
      courses: [
        { name: "HR Training", slug: `/hr-training-course-in-${city}` },
        { name: "Core HR", slug: `/core-hr-course-in-${city}` },
        { name: "HR Payroll", slug: `/hr-payroll-course-in-${city}` },
        { name: "HR Management", slug: `/hr-management-course-in-${city}` },
        { name: "HR Generalist", slug: `/hr-generalist-course-in-${city}` },
        { name: "HR Analytics", slug: `/hr-analytics-course-in-${city}` },
      ],
    },
  ];

  const allLinks = [];

  courseCategories.forEach((category) => {
    if (category.subcategories) {
      category.subcategories.forEach((sub) => {
        sub.courses.forEach((course) => {
          allLinks.push({
            name: course.name,
            slug: course.slug,
            category: category.name,
            subcategory: sub.title,
          });
        });
      });
    }

    if (category.courses) {
      category.courses.forEach((course) => {
        allLinks.push({
          name: course.name,
          slug: course.slug,
          category: category.name,
        });
      });
    }
  });

  return allLinks;
}

export async function generateMetadata({ params }) {
  const city = params.city.toLowerCase();

  if (!cityData[city]) {
    return {
      title: "City Not Found",
      description: "The requested city page could not be found.",
    };
  }

  const cityInfo = cityData[city];
  const title = `Courses in ${cityInfo.name} | Connecting Dots ERP Training Institute`;
  const description = `${cityInfo.description} Find SAP, IT, HR, Data Science, and Digital Marketing courses with placement support.`;
  const url = `https://connectingdotserp.com/sitemap/${city}`;
  const imageUrl = `https://connectingdotserp.com/images/courses-${city}.jpg`;

  return {
    title,
    description,
    keywords: [
      `courses in ${cityInfo.name}`,
      `SAP training ${cityInfo.name}`,
      `IT courses ${cityInfo.name}`,
      `HR courses ${cityInfo.name}`,
      `Data Science courses ${cityInfo.name}`,
      `Digital Marketing courses ${cityInfo.name}`,
      `professional training ${cityInfo.name}`,
      `best training institute in ${cityInfo.name}`,
      `placement assistance ${cityInfo.name}`,
      `certification courses ${cityInfo.name}`,
      `Connecting Dots ERP ${cityInfo.name}`,
      `skill development ${cityInfo.name}`,
    ],
    author: "Connecting Dots ERP",
    robots: "index, follow",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Connecting Dots ERP",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Professional Courses in ${cityInfo.name} - Connecting Dots ERP`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: "@CD_ERP",
      creator: "@CD_ERP",
    },
  };
}

// Generate JSON-LD for city page
function generateCityJsonLd(city, cityInfo) {
  const cityUrl = `https://connectingdotserp.com/sitemap/${city}`;

  return {
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
        description:
          "Connecting Dots ERP - Leading Training Institute for SAP, IT & HR Courses with Placement Support.",
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
        areaServed: {
          "@type": "City",
          name: cityInfo.name,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${cityUrl}#webpage`,
        url: cityUrl,
        name: `Courses in ${cityInfo.name} | Connecting Dots ERP Training Institute`,
        description: `${cityInfo.description} Find SAP, IT, HR, Data Science, and Digital Marketing courses with placement support.`,
        inLanguage: "en-US",
        isPartOf: {
          "@id": "https://connectingdotserp.com/#website",
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `https://connectingdotserp.com/images/courses-${city}.jpg`,
          "@id": `${cityUrl}#mainImage`,
          width: 1200,
          height: 630,
          caption: `Professional Courses in ${cityInfo.name} - Connecting Dots ERP`,
        },
        breadcrumb: {
          "@id": `${cityUrl}#breadcrumb`,
        },
        mainEntity: {
          "@type": "ItemList",
          name: `Training Courses in ${cityInfo.name}`,
          description: `Professional training courses available in ${cityInfo.name}`,
          itemListElement: [
            {
              "@type": "Course",
              name: `SAP Training in ${cityInfo.name}`,
              description: `Comprehensive SAP modules training in ${cityInfo.name} with placement support`,
              provider: {
                "@id": "https://connectingdotserp.com/#organization",
              },
            },
            {
              "@type": "Course",
              name: `IT Courses in ${cityInfo.name}`,
              description: `Software development and programming courses in ${cityInfo.name}`,
              provider: {
                "@id": "https://connectingdotserp.com/#organization",
              },
            },
            {
              "@type": "Course",
              name: `HR Training in ${cityInfo.name}`,
              description: `Human Resources and HR Analytics courses in ${cityInfo.name}`,
              provider: {
                "@id": "https://connectingdotserp.com/#organization",
              },
            },
            {
              "@type": "Course",
              name: `Data Science Courses in ${cityInfo.name}`,
              description: `Data Science and Analytics training in ${cityInfo.name}`,
              provider: {
                "@id": "https://connectingdotserp.com/#organization",
              },
            },
            {
              "@type": "Course",
              name: `Digital Marketing Training in ${cityInfo.name}`,
              description: `Comprehensive digital marketing courses in ${cityInfo.name}`,
              provider: {
                "@id": "https://connectingdotserp.com/#organization",
              },
            },
          ],
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${cityUrl}#breadcrumb`,
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
          {
            "@type": "ListItem",
            position: 3,
            name: `Courses in ${cityInfo.name}`,
            item: cityUrl,
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
        "@id": `${cityUrl}#localbusiness`,
        name: `Connecting Dots ERP - ${cityInfo.name}`,
        description: `Professional SAP, IT, and HR training institute serving ${cityInfo.name} with placement support`,
        url: cityUrl,
        telephone: "+919004002941",
        email: "info@connectingdotserp.com",
        areaServed: {
          "@type": "City",
          name: cityInfo.name,
        },
        serviceArea: {
          "@type": "City",
          name: cityInfo.name,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Training Courses in ${cityInfo.name}`,
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: `SAP Training in ${cityInfo.name}`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: `IT Courses in ${cityInfo.name}`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: `HR Training in ${cityInfo.name}`,
              },
            },
          ],
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.7",
          reviewCount: "185",
        },
      },
      {
        "@type": "EducationalOrganization",
        "@id": `${cityUrl}#educationalorganization`,
        name: `Connecting Dots ERP Training Institute - ${cityInfo.name}`,
        description: `Professional training institute offering SAP, IT, and HR courses in ${cityInfo.name}`,
        url: cityUrl,
        areaServed: {
          "@type": "City",
          name: cityInfo.name,
        },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: `SAP Certification Programs in ${cityInfo.name}`,
            description: `Industry-recognized SAP certification training in ${cityInfo.name}`,
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: `IT Professional Certification in ${cityInfo.name}`,
            description: `Comprehensive IT skills certification programs in ${cityInfo.name}`,
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: `HR Professional Certification in ${cityInfo.name}`,
            description: `Human Resources management and analytics certification in ${cityInfo.name}`,
          },
        ],
      },
    ],
  };
}

export default function CityPage({ params }) {
  const city = params.city.toLowerCase();

  if (!cityData[city]) {
    notFound();
  }

  const cityInfo = cityData[city];
  const jsonLd = generateCityJsonLd(city, cityInfo);
  const allCourseLinks = generateCityLinks(city);

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Sitemap", path: "/sitemap" },
    { label: cityInfo.name },
  ];

  return (
    <>
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Server-side rendered links for SEO - hidden from users but visible to crawlers */}
      <div style={{ display: "none" }} aria-hidden="true">
        <h1>
          Professional Courses in {cityInfo.name} - Connecting Dots ERP Training
          Institute
        </h1>

        {/* All course links for SEO */}
        <div>
          <h2>All Training Courses in {cityInfo.name}</h2>
          {allCourseLinks.map((link, index) => (
            <div key={index}>
              <Link href={link.slug}>
                {link.name} in {cityInfo.name} - {link.category}
                {link.subcategory && ` - ${link.subcategory}`} - Professional
                Training with Placement Support
              </Link>
            </div>
          ))}
        </div>

        {/* SAP Courses Section */}
        <div>
          <h2>SAP Training Courses in {cityInfo.name}</h2>
          <Link href={`/sap-course-in-${city}`}>
            SAP Training in {cityInfo.name} - Complete SAP Modules with
            Placement
          </Link>
          <Link href={`/sap-fico-course-in-${city}`}>
            SAP FICO Course in {cityInfo.name} - Finance and Controlling Module
          </Link>
          <Link href={`/sap-mm-course-in-${city}`}>
            SAP MM Training in {cityInfo.name} - Materials Management Module
          </Link>
          <Link href={`/sap-sd-course-in-${city}`}>
            SAP SD Course in {cityInfo.name} - Sales and Distribution Module
          </Link>
          <Link href={`/sap-hr-hcm-course-in-${city}`}>
            SAP HR/HCM Training in {cityInfo.name} - Human Capital Management
          </Link>
          <Link href={`/sap-pp-course-in-${city}`}>
            SAP PP Course in {cityInfo.name} - Production Planning Module
          </Link>
          <Link href={`/sap-qm-course-in-${city}`}>
            SAP QM Training in {cityInfo.name} - Quality Management Module
          </Link>
          <Link href={`/sap-pm-course-in-${city}`}>
            SAP PM Course in {cityInfo.name} - Plant Maintenance Module
          </Link>
          <Link href={`/sap-ps-course-in-${city}`}>
            SAP PS Training in {cityInfo.name} - Project System Module
          </Link>
          <Link href={`/sap-ewm-course-in-${city}`}>
            SAP EWM Course in {cityInfo.name} - Extended Warehouse Management
          </Link>
          <Link href={`/sap-scm-course-in-${city}`}>
            SAP SCM Training in {cityInfo.name} - Supply Chain Management
          </Link>
          <Link href={`/sap-successfactors-course-in-${city}`}>
            SAP SuccessFactors Course in {cityInfo.name} - Cloud HR Solution
          </Link>
          <Link href={`/sap-ariba-course-in-${city}`}>
            SAP Ariba Training in {cityInfo.name} - Procurement and Supply Chain
          </Link>
          <Link href={`/sap-abap-course-in-${city}`}>
            SAP ABAP Course in {cityInfo.name} - Advanced Business Application
            Programming
          </Link>
          <Link href={`/sap-s4-hana-course-in-${city}`}>
            SAP S/4 HANA Training in {cityInfo.name} - Next Generation ERP
          </Link>
          <Link href={`/sap-bwbi-course-in-${city}`}>
            SAP BW/BI Course in {cityInfo.name} - Business Warehouse and
            Intelligence
          </Link>
          <Link href={`/sap-basis-course-in-${city}`}>
            SAP BASIS Training in {cityInfo.name} - System Administration
          </Link>
        </div>

        {/* IT Courses Section */}
        <div>
          <h2>IT & Software Development Courses in {cityInfo.name}</h2>
          <Link href={`/it-course-in-${city}`}>
            IT Course in {cityInfo.name} - Complete Software Development
            Training
          </Link>
          <Link href={`/java-course-in-${city}`}>
            Java Training in {cityInfo.name} - Core and Advanced Java
            Programming
          </Link>
          <Link href={`/python-course-in-${city}`}>
            Python Course in {cityInfo.name} - Programming and Development
          </Link>
          <Link href={`/full-stack-developer-course-in-${city}`}>
            Full Stack Developer Course in {cityInfo.name} - Complete Web
            Development
          </Link>
          <Link href={`/mern-stack-course-in-${city}`}>
            MERN Stack Training in {cityInfo.name} - MongoDB, Express, React,
            Node.js
          </Link>
          <Link href={`/ui-ux-course-in-${city}`}>
            UI/UX Design Course in {cityInfo.name} - User Interface and
            Experience Design
          </Link>
          <Link href={`/salesforce-training-in-${city}`}>
            Salesforce Training in {cityInfo.name} - CRM and Cloud Platform
          </Link>
        </div>

        {/* Data Science Courses Section */}
        <div>
          <h2>Data Science & Analytics Courses in {cityInfo.name}</h2>
          <Link href={`/data-science-course-in-${city}`}>
            Data Science Course in {cityInfo.name} - Complete Data Science
            Training
          </Link>
          <Link href={`/data-analytics-course-in-${city}`}>
            Data Analytics Training in {cityInfo.name} - Business Intelligence
            and Analytics
          </Link>
          <Link href={`/business-analytics-course-in-${city}`}>
            Business Analytics Course in {cityInfo.name} - Strategic Data
            Analysis
          </Link>
          <Link href={`/chatgpt-course-in-${city}`}>
            ChatGPT & AI Course in {cityInfo.name} - Artificial Intelligence
            Training
          </Link>
        </div>

        {/* Data Visualization Courses Section */}
        <div>
          <h2>Data Visualization Courses in {cityInfo.name}</h2>
          <Link href={`/data-visualisation-course-in-${city}`}>
            Data Visualization Course in {cityInfo.name} - Complete Data Viz
            Training
          </Link>
          <Link href={`/tableau-training-in-${city}`}>
            Tableau Training in {cityInfo.name} - Business Intelligence and
            Visualization
          </Link>
          <Link href={`/power-bi-course-in-${city}`}>
            Power BI Course in {cityInfo.name} - Microsoft Business Intelligence
          </Link>
          <Link href={`/sql-course-in-${city}`}>
            SQL Course in {cityInfo.name} - Database Management and Queries
          </Link>
        </div>

        {/* HR Courses Section */}
        <div>
          <h2>HR Training Programs in {cityInfo.name}</h2>
          <Link href={`/hr-training-course-in-${city}`}>
            HR Training in {cityInfo.name} - Complete Human Resources Course
          </Link>
          <Link href={`/core-hr-course-in-${city}`}>
            Core HR Course in {cityInfo.name} - Fundamental HR Practices
          </Link>
          <Link href={`/hr-analytics-course-in-${city}`}>
            HR Analytics Course in {cityInfo.name} - People Analytics and
            Metrics
          </Link>
          <Link href={`/hr-management-course-in-${city}`}>
            HR Management Training in {cityInfo.name} - Strategic HR Leadership
          </Link>
          <Link href={`/hr-generalist-course-in-${city}`}>
            HR Generalist Course in {cityInfo.name} - Comprehensive HR Skills
          </Link>
          <Link href={`/hr-payroll-course-in-${city}`}>
            HR Payroll Course in {cityInfo.name} - Payroll Management and
            Processing
          </Link>
        </div>

        {/* Digital Marketing Courses Section */}
        <div>
          <h2>Digital Marketing Courses in {cityInfo.name}</h2>
          <Link href={`/digital-marketing-course-in-${city}`}>
            Digital Marketing Course in {cityInfo.name} - Complete Online
            Marketing Training
          </Link>
          <Link
            href={`/digital-marketing-course-in-${city}#search-engine-optimization`}
          >
            SEO Training in {cityInfo.name} - Search Engine Optimization Course
          </Link>
          <Link href={`/digital-marketing-course-in-${city}#pay-per-click`}>
            PPC Training in {cityInfo.name} - Pay Per Click Advertising Course
          </Link>
          <Link
            href={`/digital-marketing-course-in-${city}#social-media-marketing`}
          >
            Social Media Marketing Course in {cityInfo.name} - SMM Training
          </Link>
          <Link href={`/digital-marketing-course-in-${city}#advance-analytics`}>
            Google Analytics Training in {cityInfo.name} - Advanced Analytics
            Course
          </Link>
        </div>

        {/* Additional SEO headings for better keyword coverage */}
        <h2>Best Training Institute in {cityInfo.name}</h2>
        <h2>Professional Certification Programs in {cityInfo.name}</h2>
        <h2>Placement Assistance in {cityInfo.name}</h2>
        <h2>Career Support Services in {cityInfo.name}</h2>
        <h2>Industry Expert Trainers in {cityInfo.name}</h2>
        <h2>Job-Oriented Courses in {cityInfo.name}</h2>
        <h2>Skill Development Programs in {cityInfo.name}</h2>
        <h2>Corporate Training in {cityInfo.name}</h2>
        <h2>Online and Offline Classes in {cityInfo.name}</h2>
        <h2>Weekend Batches in {cityInfo.name}</h2>
        <h2>Fast Track Courses in {cityInfo.name}</h2>
        <h2>Beginner to Advanced Training in {cityInfo.name}</h2>
        <h2>Hands-on Practical Training in {cityInfo.name}</h2>
        <h2>Real-time Project Training in {cityInfo.name}</h2>
        <h2>Interview Preparation in {cityInfo.name}</h2>
        <h2>Resume Building Support in {cityInfo.name}</h2>
        <h2>Mock Interview Sessions in {cityInfo.name}</h2>
        <h2>Industry Recognized Certification in {cityInfo.name}</h2>
        <h2>Flexible Timing Classes in {cityInfo.name}</h2>
        <h2>Affordable Course Fees in {cityInfo.name}</h2>
      </div>

      <main>
        <Breadcrumb items={breadcrumbItems} />
        <CityCoursePage city={city} cityInfo={cityData[city]} />
      </main>
    </>
  );
}
