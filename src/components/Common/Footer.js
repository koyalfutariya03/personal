// Footer.js

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faWhatsapp,
  faYoutube,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";

// Import the new Client Component that handles interactivity
import FooterClient from "./FooterClient";

// Centralize all the link data here. This is passed to FooterClient.
const footerSections = [
  {
    title: "SAP S/4 HANA COURSES",
    categories: [
      {
        title: "SAP FUNCTIONAL COURSES",
        links: [
          { href: "/sap-fico-course-in-pune", text: "SAP FICO COURSE" },
          { href: "/sap-ariba-course-in-pune", text: "SAP ARIBA COURSE" },
          { href: "/sap-sd-course-in-pune", text: "SAP SD COURSE" },
          { href: "/sap-hr-hcm-course-in-pune", text: "SAP HR/HCM" },
          { href: "/sap-mm-course-in-pune", text: "SAP MM COURSE" },
          { href: "/sap-pp-course-in-pune", text: "SAP PP COURSE" },
          { href: "/sap-qm-course-in-pune", text: "SAP QM COURSE" },
          { href: "/sap-pm-course-in-pune", text: "SAP PM COURSE" },
          { href: "/sap-scm-course-in-pune", text: "SAP SCM COURSE" },
          { href: "/sap-ewm-course-in-pune", text: "SAP EWM COURSE" },
          {
            href: "/sap-successfactors-course-in-pune",
            text: "SAP SUCCESSFACTOR",
          },
        ],
      },
      {
        title: "SAP TECHNICAL COURSES",
        links: [
          { href: "/sap-abap-course-in-pune", text: "SAP ABAP COURSE" },
          { href: "/sap-basis-course-in-pune", text: "SAP BASIS COURSE" },
          { href: "/sap-bwbi-course-in-pune", text: "SAP BW/BI COURSE" },
          { href: "/sap-s4-hana-course-in-pune", text: "SAP S/4 HANA COURSE" },
        ],
      },
    ],
  },
  {
    title: "IT COURSES",
    links: [
      {
        href: "/full-stack-developer-course-in-pune",
        text: "FULL STACK TRAINING",
      },
      { href: "/java-course-in-pune", text: "JAVA" },
      { href: "/mern-stack-course-in-pune", text: "MERN STACK" },
      { href: "/ui-ux-course-in-pune", text: "UI/UX DESIGN" },
      { href: "/python-course-in-pune", text: "PYTHON" },
      { href: "/salesforce-course-in-pune", text: "SALESFORCE" },
    ],
  },
  {
    title: "ABOUT",
    links: [
      { href: "/aboutus", text: "ABOUT US" },
      { href: "/blogs", text: "BLOG" },
      { href: "/contactus", text: "CONTACT US" },
      { href: "/sitemap", text: "CITY SITEMAP" },
      { href: "/all-course-links", text: "ALL COURSES" },
      { href: "/sitemap.xml", text: "SITEMAP" },
    ],
  },
  {
    title: "DIGITAL MARKETING",
    links: [
      {
        href: "/digital-marketing-course-in-pune",
        text: "ADVANCE DIGITAL MARKETING",
      },
      {
        href: "/digital-marketing-course-in-pune",
        text: "PAY PER CLICK TRAINING",
      },
      {
        href: "/digital-marketing-course-in-pune",
        text: "SEARCH ENGINE OPTIMIZATION",
      },
      {
        href: "/digital-marketing-course-in-pune",
        text: "SOCIAL MEDIA MARKETING",
      },
    ],
  },
  {
    title: "DATA SCIENCE",
    links: [
      {
        href: "/data-analytics-course-in-pune",
        text: "MASTERS IN DATA ANALYTICS",
      },
      { href: "/data-science-course-in-pune", text: "MASTERS IN DATA SCIENCE" },
      {
        href: "/business-analytics-course-in-pune",
        text: "MASTERS IN BUSINESS ANALYTICS",
      },
      { href: "/chatgpt-course-in-pune", text: "CHAT GPT & AI" },
    ],
  },
  {
    title: "DATA VISUALIZATION",
    links: [
      { href: "/power-bi-course-in-pune", text: "POWER BI" },
      { href: "/tableau-course-in-pune", text: "TABLEAU" },
      { href: "/sql-course-in-pune", text: "SQL" },
    ],
  },
  {
    title: "HR COURSES",
    links: [
      { href: "/hr-training-course-in-pune", text: "HR TRAINING" },
      { href: "/core-hr-course-in-pune", text: "CORE HR" },
      { href: "/hr-payroll-course-in-pune", text: "HR PAYROLL" },
      { href: "/hr-management-course-in-pune", text: "HR MANAGEMENT" },
      { href: "/hr-generalist-course-in-pune", text: "HR GENERALIST" },
      { href: "/hr-analytics-course-in-pune", text: "HR ANALYTICS" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#182e4a] text-[#ecf0f1] font-sans w-full max-w-[1800px] mx-auto relative">
      <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-24 flex flex-col">
        {/* Top Section with Logo and Social Icons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-2.5 border-b border-white/10 pb-2.5 gap-5 sm:gap-0">
          <div className="w-[150px] sm:w-[180px] h-auto">
            <Link href="/">
              <Image
                src="/Footer/cdots.avif"
                alt="Connecting Dots ERP logo"
                width={150}
                height={50}
                loading="lazy"
                className="w-full h-auto"
              />
            </Link>
          </div>
          <div className="flex gap-3 sm:gap-4">
            <Link
              href="https://www.facebook.com/sapinstallation.pune.9"
              className="text-[#ecf0f1] text-base sm:text-lg w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#3b5998] hover:text-white"
            >
              <FontAwesomeIcon icon={faFacebookF} />
            </Link>
            <Link
              href="https://wa.me/919004002941"
              className="text-[#ecf0f1] text-base sm:text-lg w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#25d366] hover:text-white"
            >
              <FontAwesomeIcon icon={faWhatsapp} />
            </Link>
            <Link
              href="https://youtube.com/@connectingdotserp?si=hSKEiEg3MdytdEe_"
              className="text-[#ecf0f1] text-base sm:text-lg w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#ff0000] hover:text-white"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </Link>
            <Link
              href="https://in.linkedin.com/in/connecting-dots-erp-043039171"
              className="text-[#ecf0f1] text-base sm:text-lg w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#0077b5] hover:text-white"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </Link>
            <Link
              href="https://www.instagram.com/connecting_dots_sap_training?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className="text-[#ecf0f1] text-base sm:text-lg w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#c13584] hover:text-white"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
          </div>
        </div>

        {/* Main Footer Content - Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 md:gap-6">
          {/* Column 1: SAP S/4 HANA COURSES */}
          <div className="md:col-span-1 xl:col-span-1">
            <FooterClient sections={[footerSections[0]]} />
          </div>

          {/* Column 2: IT COURSES + ABOUT */}
          <div className="md:col-span-1 xl:col-span-1">
            <FooterClient sections={[footerSections[1], footerSections[2]]} />
          </div>

          {/* Column 3: DIGITAL MARKETING + DATA SCIENCE */}
          <div className="md:col-span-1 xl:col-span-1">
            <FooterClient sections={[footerSections[3], footerSections[4]]} />
          </div>

          {/* Column 4: DATA VISUALIZATION + HR COURSES */}
          <div className="md:col-span-1 xl:col-span-1">
            <FooterClient sections={[footerSections[5], footerSections[6]]} />
          </div>

          {/* Column 5: CONTACT US */}
          <div className="md:col-span-2 xl:col-span-1">
            <div className="mb-2.5">
              <div className="bg-white/5 rounded px-4 py-4 h-full">
                <h3 className="text-sm font-semibold uppercase relative pb-2.5 mb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#3498db]">
                  CONTACT US
                </h3>
                <div className="flex flex-col gap-4 sm:gap-5">
                  {/* Pune Office */}
                  <div className="pb-4 border-b border-dashed border-white/10">
                    <div className="flex items-start gap-2.5 mb-2.5">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="text-[#3498db] text-base sm:text-lg min-w-[16px] sm:min-w-[18px] mt-1"
                      />
                      <div>
                        <a
                          href="https://maps.app.goo.gl/DNwzKa2Yt1WB6zUB7"
                          target="_blank"
                          rel="noopener noreferrer"
                          alt="Pune Office"
                          className="text-sm sm:text-base font-semibold text-[#3498db] m-0 mb-1.5 block text-decoration-none hover:underline"
                        >
                          Pune Office
                        </a>
                        <p className="m-0 text-xs sm:text-sm leading-normal">
                          1st Floor, 101, Police, Wireless Colony, Vishal Nagar,
                          Pimple Nilakh, Pune, Pimpri-Chinchwad, Maharashtra
                          411027
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="text-[#3498db] text-base sm:text-lg min-w-[16px] sm:min-w-[18px]"
                      />
                      <a
                        href="tel:+919004002941"
                        className="text-[#ecf0f1] no-underline text-xs sm:text-sm transition-colors hover:text-[#3498db]"
                      >
                        +91 9004002941
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="text-[#3498db] text-base sm:text-lg min-w-[16px] sm:min-w-[18px]"
                      />
                      <a
                        href="tel:+919004002958"
                        className="text-[#ecf0f1] no-underline text-xs sm:text-sm transition-colors hover:text-[#3498db]"
                      >
                        +91 9004002958
                      </a>
                    </div>
                  </div>

                  {/* Mumbai Office */}
                  <div className="pb-4 border-b border-dashed border-white/10 last:border-b-0">
                    <div className="flex items-start gap-2.5 mb-2.5">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="text-[#3498db] text-base sm:text-lg min-w-[16px] sm:min-w-[18px] mt-1"
                      />
                      <div>
                        <a
                          href="https://maps.app.goo.gl/i7W3baVVS1mDLmTJ9"
                          target="_blank"
                          rel="noopener noreferrer"
                          alt="Mumbai Office"
                          className="text-sm sm:text-base font-semibold text-[#3498db] m-0 mb-1.5 block text-decoration-none hover:underline"
                        >
                          Mumbai Office
                        </a>
                        <p className="m-0 text-xs sm:text-sm leading-normal">
                          4th Floor, Ram Niwas, B-404, Gokhale Rd, near
                          McDonald's, Dada Patil Wadi, Naupada, Thane West, Thane,
                          Maharashtra 400602
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="text-[#3498db] text-base sm:text-lg min-w-[16px] sm:min-w-[18px]"
                      />
                      <a
                        href="tel:+919004005382"
                        className="text-[#ecf0f1] no-underline text-xs sm:text-sm transition-colors hover:text-[#3498db]"
                      >
                        +91 9004005382
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-4 sm:mt-5 text-center pt-4 sm:pt-5 border-t border-white/10">
          <p className="m-0 text-xs text-[#95a5a6]">
            &copy; 2024 Connecting Dots ERP. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;