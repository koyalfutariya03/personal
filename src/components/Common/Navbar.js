"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/styles/Common/Navbar.module.css";

// Dynamic import for AnimatedLogo
import dynamic from "next/dynamic";
const AnimatedLogo = dynamic(() => import("../AnimatedLogo"), {
  ssr: false,
  loading: () => <div className={styles.animatedLogoPlaceholder} />,
});

// Custom component definitions
const Navbar = ({ expand, className, children, ref }) => (
  <nav
    className={`${styles.navbar} ${
      expand
        ? styles[
            `navbarExpand${expand.charAt(0).toUpperCase() + expand.slice(1)}`
          ]
        : ""
    } ${className || ""}`}
    ref={ref}
  >
    {children}
  </nav>
);

const Container = ({ fluid, className, children }) => (
  <div
    className={`${fluid ? styles.containerFluid : styles.container} ${
      className || ""
    }`}
  >
    {children}
  </div>
);

const Nav = ({ className, children }) => (
  <div className={`${styles.nav} ${className || ""}`}>{children}</div>
);

const Button = ({ className, onClick, children, ...props }) => (
  <button
    className={`${styles.btn} ${className || ""}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

const Header = () => {
  const [activeLink, setActiveLink] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState({
    dropdown2: false,
    dropdown3: false,
    dropdown4: false,
    dropdown5: false,
    dropdown6: false,
  });
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchMoveX, setTouchMoveX] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [floatingNav, setFloatingNav] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useRef(null);
  const navbarRef = useRef(null);

  // Set active link based on current pathname
  useEffect(() => {
    if (pathname) {
      if (pathname.includes("sap-course")) {
        setActiveLink("dropdown2");
      } else if (pathname.includes("it-course")) {
        setActiveLink("dropdown3");
      } else if (pathname.includes("data-visualization")) {
        setActiveLink("dropdown4");
      } else if (pathname.includes("digital-marketing")) {
        setActiveLink("dropdown5");
      } else if (
        pathname.includes("hr-training") ||
        pathname.includes("hr-course")
      ) {
        setActiveLink("dropdown6");
      } else if (pathname.includes("aboutus")) {
        setActiveLink("aboutus");
      } else {
        setActiveLink("");
      }
    }
  }, [pathname]);

  // Enhanced scroll effect for smoother floating navbar transition
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const isScrolled = scrollY > 50;
          const shouldFloat = scrollY > 150;
          
          setScrolled(isScrolled);
          
          if (shouldFloat !== floatingNav) {
            setIsTransitioning(true);
            setFloatingNav(shouldFloat);
            
            // Reset transition state after animation completes
            setTimeout(() => {
              setIsTransitioning(false);
            }, 600);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [floatingNav]);

  const closeSidebar = useCallback(() => {
    setIsSidebarVisible(false);
    setMobileOpenDropdown(null);
    document.body.style.overflow = "";
    if (sidebarRef.current) {
      sidebarRef.current.style.transition = "";
      sidebarRef.current.style.transform = "";
    }
  }, []);

  // Handle click outside sidebar to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        isSidebarVisible &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.navbarToggler}`)
      ) {
        closeSidebar();
      }
    }

    if (isSidebarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside, {
        passive: true,
      });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isSidebarVisible, closeSidebar]);

  // Add effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992 && isSidebarVisible) {
        closeSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarVisible, closeSidebar]);

  // Add effect to manage overlay and body scroll
  useEffect(() => {
    if (isSidebarVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarVisible]);

  // Add keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isSidebarVisible) {
        closeSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarVisible, closeSidebar]);

  const handleNavClick = useCallback(
    (link) => {
      setActiveLink(link);
      closeSidebar();
    },
    [closeSidebar]
  );

  const handleMouseEnter = useCallback((dropdown) => {
    if (window.innerWidth >= 992) {
      setIsDropdownVisible((prev) => ({ ...prev, [dropdown]: true }));
    }
  }, []);

  const handleMouseLeave = useCallback((dropdown) => {
    if (window.innerWidth >= 992) {
      setIsDropdownVisible((prev) => ({ ...prev, [dropdown]: false }));
    }
  }, []);

  const handleMobileDropdownToggle = useCallback(
    (dropdown) => {
      if (window.innerWidth < 992) {
        setMobileOpenDropdown(
          mobileOpenDropdown === dropdown ? null : dropdown
        );
      }
    },
    [mobileOpenDropdown]
  );

  const handleNavigation = useCallback(
    (link, section) => {
      const linkBasePath = link.split("#")[0];
      if (pathname !== linkBasePath) {
        router.push(linkBasePath).then(() => {
          if (section) {
            setTimeout(() => {
              document
                .getElementById(section)
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
          }
          closeSidebar();
        });
      } else {
        if (section) {
          document
            .getElementById(section)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        closeSidebar();
      }
    },
    [pathname, router, closeSidebar]
  );

  // Touch gesture handlers
  const handleTouchStart = useCallback((e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchMoveX(e.touches[0].clientX);
    if (sidebarRef.current) {
      sidebarRef.current.style.transition = "none";
    }
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (touchStartX === null || !sidebarRef.current) return;
      const currentX = e.touches[0].clientX;
      setTouchMoveX(currentX);

      const deltaX = currentX - touchStartX;
      const sidebarElement = sidebarRef.current;

      if (deltaX > 0) {
        sidebarElement.style.transform = `translateX(${deltaX}px)`;
      } else {
        sidebarElement.style.transform = `translateX(0px)`;
      }
    },
    [touchStartX]
  );

  const handleTouchEnd = useCallback(() => {
    if (touchStartX === null || !sidebarRef.current) return;
    const sidebarElement = sidebarRef.current;
    const deltaX = touchMoveX - touchStartX;

    if (sidebarRef.current) {
      sidebarRef.current.style.transition = "";
    }

    const threshold = sidebarElement.offsetWidth * 0.4;

    if (deltaX > threshold) {
      closeSidebar();
    } else {
      sidebarElement.style.transform = `translateX(0px)`;
    }
    setTouchStartX(null);
    setTouchMoveX(null);
  }, [touchStartX, touchMoveX, closeSidebar]);

  // Dropdown render functions
  const renderDropdownSAP = (isMobile = false) => (
    <div
      className={styles.dropdown}
      onMouseEnter={() => handleMouseEnter("dropdown2")}
      onMouseLeave={() => handleMouseLeave("dropdown2")}
    >
      <div className={styles.dropdownToggleWrapper}>
        <Link
          href="/sap-course-in-pune"
          className={`${styles.navLink} ${styles.dropdownToggle} ${
            activeLink === "dropdown2" ? styles.active : ""
          }`}
          id="dropdownMenuButton2"
          onClick={(e) => {
            if (isMobile) {
              e.preventDefault();
              handleMobileDropdownToggle("dropdown2");
            } else {
              handleNavClick("/sap-course-in-pune");
            }
          }}
          aria-expanded={
            (isMobile && mobileOpenDropdown === "dropdown2") ||
            (!isMobile && isDropdownVisible.dropdown2)
              ? "true"
              : "false"
          }
          aria-haspopup="true"
        >
          <span>SAP S/4 HANA</span>
          {!isMobile && <span className={styles.desktopDropdownArrow}></span>}
        </Link>
        {isMobile && (
          <button
            className={styles.mobileDropdownArrow}
            onClick={() => handleMobileDropdownToggle("dropdown2")}
            aria-label="Toggle SAP menu"
          >
            <span
              className={`${styles.arrow} ${
                mobileOpenDropdown === "dropdown2"
                  ? styles.arrowUp
                  : styles.arrowDown
              }`}
            ></span>
          </button>
        )}
      </div>
      {((isMobile && mobileOpenDropdown === "dropdown2") ||
        (!isMobile && isDropdownVisible.dropdown2)) && (
        <ul
          className={`${styles.dropdownMenu} ${styles.show}`}
          aria-labelledby="dropdownMenuButton2"
        >
          {[
            {
              title: "SAP Functional",
              items: [
                { name: "SAP FICO", link: "/sap-fico-course-in-pune" },
                { name: "SAP Ariba", link: "/sap-ariba-course-in-pune" },
                { name: "SAP MM", link: "/sap-mm-course-in-pune" },
                { name: "SAP SD", link: "/sap-sd-course-in-pune" },
                { name: "SAP HR/HCM", link: "/sap-hr-hcm-course-in-pune" },
                { name: "SAP PP", link: "/sap-pp-course-in-pune" },
                { name: "SAP QM", link: "/sap-qm-course-in-pune" },
                { name: "SAP PM", link: "/sap-pm-course-in-pune" },
                { name: "SAP PS", link: "/sap-ps-course-in-pune" },
                { name: "SAP EWM", link: "/sap-ewm-course-in-pune" },
                { name: "SAP SCM", link: "/sap-scm-course-in-pune" },
                {
                  name: "SAP SUCCESSFACTOR",
                  link: "/sap-successfactors-course-in-pune",
                },
              ],
            },
            {
              title: "SAP Technical",
              items: [
                { name: "SAP ABAP", link: "/sap-abap-course-in-pune" },
                { name: "SAP S/4 HANA", link: "/sap-s4-hana-course-in-pune" },
                { name: "SAP BW/BI", link: "/sap-bwbi-course-in-pune" },
                { name: "SAP BASIS", link: "/sap-basis-course-in-pune" },
              ],
            },
          ].map((submenu, index) => (
            <li key={index} className={styles.megaMenuItem}>
              {submenu.items ? (
                <>
                  <div className={styles.subMenuHeader}>
                    <span className={styles.subMenuTitle}>{submenu.title}</span>
                    <span className={styles.subMenuArrow}></span>
                  </div>
                  <ul
                    className={`${styles.dropdownMenu} ${
                      isMobile ? styles.mobileSubmenu : styles.dropdownSubmenu
                    }`}
                  >
                    {submenu.items.map((item, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          className={styles.dropdownItem}
                          href={item.link}
                          onClick={() => handleNavClick(item.link)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  className={styles.dropdownItem}
                  href={submenu.link}
                  onClick={() => handleNavClick(submenu.link)}
                >
                  {submenu.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderDropdownITCourses = (isMobile = false) => (
    <div
      className={styles.dropdown}
      onMouseEnter={() => handleMouseEnter("dropdown3")}
      onMouseLeave={() => handleMouseLeave("dropdown3")}
    >
            <div className={styles.dropdownToggleWrapper}>
        <Link
          href="/it-course-in-pune"
          className={`${styles.navLink} ${styles.dropdownToggle} ${
            activeLink === "dropdown3" ? styles.active : ""
          }`}
          id="dropdownMenuButton3"
          onClick={(e) => {
            if (isMobile) {
              e.preventDefault();
              handleMobileDropdownToggle("dropdown3");
            } else {
              handleNavClick("/it-course-in-pune");
            }
          }}
          aria-expanded={
            (isMobile && mobileOpenDropdown === "dropdown3") ||
            (!isMobile && isDropdownVisible.dropdown3)
              ? "true"
              : "false"
          }
          aria-haspopup="true"
        >
          <span>IT Courses</span>
          {!isMobile && <span className={styles.desktopDropdownArrow}></span>}
        </Link>
        {isMobile && (
          <button
            className={styles.mobileDropdownArrow}
            onClick={() => handleMobileDropdownToggle("dropdown3")}
            aria-label="Toggle IT Courses menu"
          >
            <span
              className={`${styles.arrow} ${
                mobileOpenDropdown === "dropdown3"
                  ? styles.arrowUp
                  : styles.arrowDown
              }`}
            ></span>
          </button>
        )}
      </div>
      {((isMobile && mobileOpenDropdown === "dropdown3") ||
        (!isMobile && isDropdownVisible.dropdown3)) && (
        <ul
          className={`${styles.dropdownMenu} ${styles.show}`}
          aria-labelledby="dropdownMenuButton3"
        >
          {[
            {
              title: "Data Science",
              items: [
                {
                  name: "MASTERS IN DATA ANALYTICS",
                  link: "/data-analytics-course-in-pune",
                },
                {
                  name: "MASTERS IN DATA SCIENCE",
                  link: "/data-science-course-in-pune",
                },
                {
                  name: "MASTERS IN BUSINESS ANALYTICS",
                  link: "/business-analytics-course-in-pune",
                },
                { name: "CHAT GPT & AI", link: "/chatgpt-course-in-pune" },
              ],
            },
            {
              title: "Full Stack Training",
              link: "/full-stack-developer-course-in-pune",
            },
            {
              title: "JAVA",
              link: "/java-course-in-pune",
            },
            {
              title: "MERN Stack",
              link: "/mern-stack-course-in-pune",
            },
            {
              title: "UI/UX Design",
              link: "/ui-ux-course-in-pune",
            },
            {
              title: "Python",
              link: "/python-course-in-pune",
            },
            {
              title: "Salesforce",
              link: "/salesforce-course-in-pune",
            },
          ].map((submenu, index) => (
            <li key={index} className={styles.megaMenuItem}>
              {submenu.items ? (
                <>
                  <div className={styles.subMenuHeader}>
                    <span className={styles.subMenuTitle}>{submenu.title}</span>
                    <span className={styles.subMenuArrow}></span>
                  </div>
                  <ul
                    className={`${styles.dropdownMenu} ${
                      isMobile ? styles.mobileSubmenu : styles.dropdownSubmenu
                    }`}
                  >
                    {submenu.items.map((item, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          className={styles.dropdownItem}
                          href={item.link}
                          onClick={() => handleNavClick(item.link)}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  className={styles.dropdownItem}
                  href={submenu.link}
                  onClick={() => handleNavClick(submenu.link)}
                >
                  {submenu.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderDropdownDataVisualization = (isMobile = false) => (
    <div
      className={styles.dropdown}
      onMouseEnter={() => handleMouseEnter("dropdown4")}
      onMouseLeave={() => handleMouseLeave("dropdown4")}
    >
      <div className={styles.dropdownToggleWrapper}>
        <Link
          href="/data-visualization-course-in-pune"
          className={`${styles.navLink} ${styles.dropdownToggle} ${
            activeLink === "dropdown4" ? styles.active : ""
          }`}
          id="dropdownMenuButton4"
          onClick={(e) => {
            if (isMobile) {
              e.preventDefault();
              handleMobileDropdownToggle("dropdown4");
            } else {
              handleNavClick("/data-visualization-course-in-pune");
            }
          }}
          aria-expanded={
            (isMobile && mobileOpenDropdown === "dropdown4") ||
            (!isMobile && isDropdownVisible.dropdown4)
              ? "true"
              : "false"
          }
          aria-haspopup="true"
        >
          <span>Data Visualization</span>
          {!isMobile && <span className={styles.desktopDropdownArrow}></span>}
        </Link>
        {isMobile && (
          <button
            className={styles.mobileDropdownArrow}
            onClick={() => handleMobileDropdownToggle("dropdown4")}
            aria-label="Toggle Data Visualization menu"
          >
            <span
              className={`${styles.arrow} ${
                mobileOpenDropdown === "dropdown4"
                  ? styles.arrowUp
                  : styles.arrowDown
              }`}
            ></span>
          </button>
        )}
      </div>
      {((isMobile && mobileOpenDropdown === "dropdown4") ||
        (!isMobile && isDropdownVisible.dropdown4)) && (
        <ul
          className={`${styles.dropdownMenu} ${styles.show}`}
          aria-labelledby="dropdownMenuButton4"
        >
          {[
            { name: "Tableau", link: "/tableau-course-in-pune" },
            { name: "Power BI", link: "/power-bi-course-in-pune" },
            { name: "SQL", link: "/sql-course-in-pune" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                className={styles.dropdownItem}
                href={item.link}
                onClick={() => handleNavClick(item.link)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderDropdownDigitalMarketing = (isMobile = false) => (
    <div
      className={styles.dropdown}
      onMouseEnter={() => handleMouseEnter("dropdown5")}
      onMouseLeave={() => handleMouseLeave("dropdown5")}
    >
      <div className={styles.dropdownToggleWrapper}>
        <Link
          href="/digital-marketing-course-in-pune"
          className={`${styles.navLink} ${styles.dropdownToggle} ${
            activeLink === "dropdown5" ? styles.active : ""
          }`}
          id="dropdownMenuButton5"
          onClick={(e) => {
            if (isMobile) {
              e.preventDefault();
              handleMobileDropdownToggle("dropdown5");
            } else {
              handleNavClick("/digital-marketing-course-in-pune");
            }
          }}
          aria-expanded={
            (isMobile && mobileOpenDropdown === "dropdown5") ||
            (!isMobile && isDropdownVisible.dropdown5)
              ? "true"
              : "false"
          }
          aria-haspopup="true"
        >
          <span>Digital Marketing</span>
          {!isMobile && <span className={styles.desktopDropdownArrow}></span>}
        </Link>
        {isMobile && (
          <button
            className={styles.mobileDropdownArrow}
            onClick={() => handleMobileDropdownToggle("dropdown5")}
            aria-label="Toggle Digital Marketing menu"
          >
            <span
              className={`${styles.arrow} ${
                mobileOpenDropdown === "dropdown5"
                  ? styles.arrowUp
                  : styles.arrowDown
              }`}
            ></span>
          </button>
        )}
      </div>
      {((isMobile && mobileOpenDropdown === "dropdown5") ||
        (!isMobile && isDropdownVisible.dropdown5)) && (
        <ul
          className={`${styles.dropdownMenu} ${styles.show}`}
          aria-labelledby="dropdownMenuButton5"
        >
          {[
            {
              name: "Advance Digital Marketing",
              link: "/digital-marketing-course-in-pune",
            },
            {
              name: "Pay Per Click Training",
              link: "/digital-marketing-course-in-pune#pay-per-click",
              section: "pay-per-click",
            },
            {
              name: "Search Engine Optimization",
              link: "/digital-marketing-course-in-pune#search-engine-optimization",
              section: "search-engine-opti",
            },
            {
              name: "Social Media Marketing",
              link: "/digital-marketing-course-in-pune#social-media-marketing",
              section: "social-media",
            },
            {
              name: "Advance Google Analytics Training",
              link: "/digital-marketing-course-in-pune#advance-analytics",
              section: "advance-analytics",
            },
          ].map((item, index) => (
            <li key={index}>
              <Link
                className={styles.dropdownItem}
                href={item.link}
                onClick={() =>
                  item.section
                    ? handleNavigation(item.link.split("#")[0], item.section)
                    : handleNavClick(item.link)
                }
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderDropdownHRCourses = (isMobile = false) => (
    <div
      className={styles.dropdown}
      onMouseEnter={() => handleMouseEnter("dropdown6")}
      onMouseLeave={() => handleMouseLeave("dropdown6")}
    >
      <div className={styles.dropdownToggleWrapper}>
        <Link
          href="/hr-training-course-in-pune"
          className={`${styles.navLink} ${styles.dropdownToggle} ${
            activeLink === "dropdown6" ? styles.active : ""
          }`}
          id="dropdownMenuButton6"
          onClick={(e) => {
            if (isMobile) {
              e.preventDefault();
              handleMobileDropdownToggle("dropdown6");
            } else {
              handleNavClick("/hr-training-course-in-pune");
            }
          }}
          aria-expanded={
            (isMobile && mobileOpenDropdown === "dropdown6") ||
            (!isMobile && isDropdownVisible.dropdown6)
              ? "true"
              : "false"
          }
          aria-haspopup="true"
        >
          <span>HR Courses</span>
          {!isMobile && <span className={styles.desktopDropdownArrow}></span>}
        </Link>
        {isMobile && (
          <button
            className={styles.mobileDropdownArrow}
            onClick={() => handleMobileDropdownToggle("dropdown6")}
            aria-label="Toggle HR Courses menu"
          >
            <span
              className={`${styles.arrow} ${
                mobileOpenDropdown === "dropdown6"
                  ? styles.arrowUp
                  : styles.arrowDown
              }`}
            ></span>
          </button>
        )}
      </div>
      {((isMobile && mobileOpenDropdown === "dropdown6") ||
        (!isMobile && isDropdownVisible.dropdown6)) && (
        <ul
          className={`${styles.dropdownMenu} ${styles.show}`}
          aria-labelledby="dropdownMenuButton6"
        >
          {[
            { name: "HR Training", link: "/hr-training-course-in-pune" },
            { name: "Core HR", link: "/core-hr-course-in-pune" },
            { name: "HR Payroll", link: "/hr-payroll-course-in-pune" },
            { name: "HR Management", link: "/hr-management-course-in-pune" },
            { name: "HR Generalist", link: "/hr-generalist-course-in-pune" },
            { name: "HR Analytics", link: "/hr-analytics-course-in-pune" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                className={styles.dropdownItem}
                href={item.link}
                onClick={() => handleNavClick(item.link)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <>
      <Navbar
        expand="lg"
        className={`${styles.headerNav} ${scrolled ? styles.scrolled : ""} ${
          floatingNav ? styles.floating : ""
        } ${isTransitioning ? styles.transitioning : ""}`}
        ref={navbarRef}
      >
        <Container fluid className={styles.navContainer}>
          <div className={styles.logo}>
            <Link href="/" className={styles.logoLink}>
              <AnimatedLogo className={styles.animatedLogo} />
              <div className={styles.logoWrapper}>
                <Image
                  src="/Navbar/logo.avif"
                  alt="Logo of Connecting Dots ERP"
                  width={120}
                  height={60}
                  priority
                  className={styles.logoImage}
                  sizes="120px"
                />
              </div>
            </Link>
          </div>

          {/* Hamburger Button */}
          <Button
            className={styles.navbarToggler}
            aria-controls="basic-navbar-nav"
            aria-expanded={isSidebarVisible ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
          >
            <span className={styles.navbarTogglerIcon}></span>
          </Button>

          <Nav className={styles.navbarDesktop}>
            {renderDropdownSAP()}
            {renderDropdownITCourses()}
            {renderDropdownDataVisualization()}
            {renderDropdownDigitalMarketing()}
            {renderDropdownHRCourses()}
            {!floatingNav && (
              <>
                <div className={styles.navItem}>
                  <Link
                    className={`${styles.navLink} ${
                      activeLink === "aboutus" ? styles.active : ""
                    }`}
                    href="/aboutus"
                    onClick={() => handleNavClick("aboutus")}
                  >
                    About us
                  </Link>
                </div>
                <div className={styles.navAction}>
                  <Link href="/contactus" className={styles.ctaButton}>
                    Contact Us
                  </Link>
                </div>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* Sidebar for Smaller Screens with Touch Support */}
      {isSidebarVisible && (
        <>
                    <div
            className={`${styles.sidebarOverlay} ${styles.visible}`}
            onClick={closeSidebar}
            aria-hidden="true"
          />
          <aside
            className={`${styles.sidebar} ${styles.visible}`}
            ref={sidebarRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className={styles.sidebarHeader}>
              <div className={styles.mobileLogoContainer}>
                <Link
                  href="/"
                  className={styles.mobileLogo}
                  onClick={closeSidebar}
                >
                  <AnimatedLogo className={styles.sidebarLogo} />
                  <Image
                    src="/Navbar/logo.webp"
                    alt="Connecting Dots ERP Logo"
                    width={130}
                    height={100}
                    loading="lazy"
                    sizes="130px"
                  />
                </Link>
              </div>
              <Button
                className={styles.btnClose}
                onClick={closeSidebar}
                aria-label="Close navigation menu"
              />
            </div>

            <Nav className={styles.sidebarNav}>
              {renderDropdownSAP(true)}
              {renderDropdownITCourses(true)}
              {renderDropdownDataVisualization(true)}
              {renderDropdownDigitalMarketing(true)}
              {renderDropdownHRCourses(true)}

              <div className="flex mt-4 gap-4">
                <Link
                  href="/aboutus"
                  onClick={() => handleNavClick("aboutus")}
                  className={`nav-link px-3 py-2 fw-semibold text-dark border rounded-pill me-2 ${
                    activeLink === "aboutus"
                      ? "text-primary border-primary bg-light"
                      : "text-muted border-secondary"
                  }`}
                >
                  About us
                </Link>

                <Link
                  href="/contactus"
                  onClick={() => handleNavClick("contact")}
                  className="nav-link px-3 py-2 fw-semibold text-muted border border-secondary rounded-pill hover:text-primary hover:border-primary"
                >
                  Contact us
                </Link>
              </div>
            </Nav>
            <div className={styles.mobileCtaContainer}>
              <Link
                href="/contactus"
                className={styles.mobileCta}
                onClick={closeSidebar}
              >
                Contact Us Now
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Header;