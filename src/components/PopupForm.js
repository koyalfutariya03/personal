"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import styles from "@/styles/PopupForm.module.css";
import axios from "axios";
// Import the comprehensive cities data
import cities from "cities.json";

const PopupForm = ({ onSubmitData }) => {
  const [isVisible, setIsVisible] = useState(false);
  // Form state
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [location, setLocation] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [countryCode] = useState("+91");

  // Location suggestions state
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });

  // Refs
  const locationInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const pathname = usePathname();

  // Course options
  const courseOptions = [
    { value: "", label: "Select a course", disabled: true },
    { value: "SAP Course", label: "SAP Course" },
    { value: "IT Course", label: "IT Course" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Data Visualisation", label: "Data Visualisation" },
    { value: "HR Course", label: "HR Course" },
  ];

  // Load Indian cities and major global cities
  useEffect(() => {
    const loadLocationData = () => {
      try {
        setIsLoadingCities(true);

        // Filter for Indian cities and major international cities
        const indianCities = cities.filter(
          (city) => city.country === "IN" || city.country === "India"
        );

        // Add major international cities that Indians often mention
        const majorInternationalCities = cities.filter(
          (city) =>
            ["US", "UK", "CA", "AU", "DE", "FR", "SG", "AE", "JP"].includes(
              city.country
            ) && city.population > 500000 // Only major cities
        );

        // Combine and create location strings
        const allLocations = [
          // Indian cities with state (for better clarity)
          ...indianCities.map((city) =>
            city.subcountry ? `${city.name}, ${city.subcountry}` : city.name
          ),
          // Major international cities with country
          ...majorInternationalCities.map(
            (city) => `${city.name}, ${city.country}`
          ),
          // Add common location variations
          "Remote",
          "Work from Home",
          "Multiple Locations",
          "Willing to Relocate",
        ];

        // Remove duplicates, filter out empty values, and sort
        const uniqueLocations = [...new Set(allLocations)]
          .filter((location) => location && location.trim())
          .sort((a, b) => {
            // Prioritize Indian cities (without country suffix)
            const aIsIndian = !a.includes(",") || a.includes("India");
            const bIsIndian = !b.includes(",") || b.includes("India");

            if (aIsIndian && !bIsIndian) return -1;
            if (!aIsIndian && bIsIndian) return 1;

            return a.localeCompare(b);
          });

        console.log(
          `✅ Loaded ${uniqueLocations.length} locations (${indianCities.length} Indian cities)`
        );
        setLocationSuggestions(uniqueLocations);
      } catch (error) {
        console.error("❌ Error loading cities data:", error);
        // Fallback to basic Indian cities if package fails
        setLocationSuggestions([
          "Mumbai, Maharashtra",
          "Delhi",
          "Bangalore, Karnataka",
          "Hyderabad, Telangana",
          "Chennai, Tamil Nadu",
          "Kolkata, West Bengal",
          "Pune, Maharashtra",
          "Ahmedabad, Gujarat",
          "Jaipur, Rajasthan",
          "Surat, Gujarat",
          "Lucknow, Uttar Pradesh",
          "Kanpur, Uttar Pradesh",
          "Nagpur, Maharashtra",
          "Indore, Madhya Pradesh",
          "Thane, Maharashtra",
          "Bhopal, Madhya Pradesh",
          "Visakhapatnam, Andhra Pradesh",
          "Patna, Bihar",
          "Vadodara, Gujarat",
          "Ghaziabad, Uttar Pradesh",
          "Ludhiana, Punjab",
          "Agra, Uttar Pradesh",
          "Nashik, Maharashtra",
          "Faridabad, Haryana",
          "Meerut, Uttar Pradesh",
          "Rajkot, Gujarat",
          "Varanasi, Uttar Pradesh",
          "Srinagar, Jammu and Kashmir",
          "Dhanbad, Jharkhand",
          "Jodhpur, Rajasthan",
          "Amritsar, Punjab",
          "Raipur, Chhattisgarh",
          "Allahabad, Uttar Pradesh",
          "Coimbatore, Tamil Nadu",
          "Jabalpur, Madhya Pradesh",
          "Gwalior, Madhya Pradesh",
          "Vijayawada, Andhra Pradesh",
          "Madurai, Tamil Nadu",
          "Guwahati, Assam",
          "Chandigarh",
          "Hubli, Karnataka",
          "Mysore, Karnataka",
          "Tiruchirappalli, Tamil Nadu",
          "Bareilly, Uttar Pradesh",
          "Aligarh, Uttar Pradesh",
          "Tiruppur, Tamil Nadu",
          "Moradabad, Uttar Pradesh",
          "Jalandhar, Punjab",
          "Bhubaneswar, Odisha",
          "Salem, Tamil Nadu",
          "Warangal, Telangana",
          "Guntur, Andhra Pradesh",
          "Bhiwandi, Maharashtra",
          "Saharanpur, Uttar Pradesh",
          "Gorakhpur, Uttar Pradesh",
          "Bikaner, Rajasthan",
          "Amravati, Maharashtra",
          "Noida, Uttar Pradesh",
          "Jamshedpur, Jharkhand",
          "Bhilai, Chhattisgarh",
          "Cuttack, Odisha",
          "Firozabad, Uttar Pradesh",
          "Kochi, Kerala",
          "Nellore, Andhra Pradesh",
          "Bhavnagar, Gujarat",
          "Dehradun, Uttarakhand",
          "Durgapur, West Bengal",
          "Asansol, West Bengal",
          "Rourkela, Odisha",
          "Nanded, Maharashtra",
          "Kolhapur, Maharashtra",
          "Ajmer, Rajasthan",
          "Akola, Maharashtra",
          "Gulbarga, Karnataka",
          "Jamnagar, Gujarat",
          "Ujjain, Madhya Pradesh",
          "Loni, Uttar Pradesh",
          "Siliguri, West Bengal",
          "Jhansi, Uttar Pradesh",
          "Ulhasnagar, Maharashtra",
          "Jammu, Jammu and Kashmir",
          "Sangli, Maharashtra",
          "Mangalore, Karnataka",
          "Erode, Tamil Nadu",
          "Belgaum, Karnataka",
          "Ambattur, Tamil Nadu",
          "Tirunelveli, Tamil Nadu",
          "Malegaon, Maharashtra",
          "Gaya, Bihar",
          "Jalgaon, Maharashtra",
          "Udaipur, Rajasthan",
          "Maheshtala, West Bengal",
          "Remote",
          "Work from Home",
          "Multiple Locations",
        ]);
      } finally {
        setIsLoadingCities(false);
      }
    };

    loadLocationData();
  }, []);

  useEffect(() => {
    const hiddenPages = [
      "/adminlogin",
      "/dashboard",
      "/blogsadmin",
      "/superadmin",
    ];

    const currentPath = pathname?.toLowerCase() || "";

    if (hiddenPages.some((page) => currentPath.startsWith(page))) {
      setIsVisible(false);
      return;
    }

    const showTimer = setTimeout(() => {
      if (!document.body.classList.contains(styles.popupClosedManually)) {
        setIsVisible(true);
      }
    }, 5000);

    return () => clearTimeout(showTimer);
  }, [pathname]);

  // Allow other components to open this popup via a custom window event
  useEffect(() => {
    const handleOpenEvent = () => {
      try {
        // Remove manual close blocker if present
        document.body.classList.remove(styles.popupClosedManually);
      } catch (e) {}
      setIsVisible(true);
    };

    // Use a custom event name that's unlikely to collide
    window.addEventListener("open-popup-form", handleOpenEvent);
    return () => {
      window.removeEventListener("open-popup-form", handleOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add(styles.noScroll);
    } else {
      document.body.classList.remove(styles.noScroll);
    }
    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [isVisible]);

  useEffect(() => {
    let timer;
    if (statusMessage.text) {
      timer = setTimeout(() => {
        setStatusMessage({ text: "", type: "" });
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [statusMessage]);

  // Enhanced keyboard navigation with auto-scroll
  const handleLocationKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveSuggestion((prev) => {
          const newIndex =
            prev < filteredSuggestions.length - 1 ? prev + 1 : prev;

          // Auto-scroll to keep active item visible
          setTimeout(() => {
            if (suggestionsRef.current) {
              const activeItem = suggestionsRef.current.children[newIndex];
              if (activeItem) {
                activeItem.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "nearest",
                });
              }
            }
          }, 50);

          return newIndex;
        });
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveSuggestion((prev) => {
          const newIndex = prev > 0 ? prev - 1 : -1;

          // Auto-scroll to keep active item visible
          setTimeout(() => {
            if (suggestionsRef.current) {
              if (newIndex === -1) {
                // Scroll to top when no item is selected
                suggestionsRef.current.scrollTop = 0;
              } else {
                const activeItem = suggestionsRef.current.children[newIndex];
                if (activeItem) {
                  activeItem.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "nearest",
                  });
                }
              }
            }
          }, 50);

          return newIndex;
        });
        break;

      case "Enter":
        e.preventDefault();
        if (activeSuggestion >= 0) {
          handleSuggestionClick(filteredSuggestions[activeSuggestion]);
        }
        break;

      case "Escape":
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;

      case "Tab":
        // Allow tab to move to next field
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;

      case "Home":
        // Jump to first suggestion
        e.preventDefault();
        setActiveSuggestion(0);
        if (suggestionsRef.current) {
          suggestionsRef.current.scrollTop = 0;
        }
        break;

      case "End":
        // Jump to last suggestion
        e.preventDefault();
        const lastIndex = filteredSuggestions.length - 1;
        setActiveSuggestion(lastIndex);
        if (suggestionsRef.current) {
          suggestionsRef.current.scrollTop =
            suggestionsRef.current.scrollHeight;
        }
        break;

      case "PageDown":
        // Jump down several items
        e.preventDefault();
        setActiveSuggestion((prev) => {
          const newIndex = Math.min(prev + 5, filteredSuggestions.length - 1);
          setTimeout(() => {
            if (suggestionsRef.current) {
              const activeItem = suggestionsRef.current.children[newIndex];
              if (activeItem) {
                activeItem.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            }
          }, 50);
          return newIndex;
        });
        break;

      case "PageUp":
        // Jump up several items
        e.preventDefault();
        setActiveSuggestion((prev) => {
          const newIndex = Math.max(prev - 5, 0);
          setTimeout(() => {
            if (suggestionsRef.current) {
              const activeItem = suggestionsRef.current.children[newIndex];
              if (activeItem) {
                activeItem.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }
            }
          }, 50);
          return newIndex;
        });
        break;
    }
  };

  // Enhanced suggestion click with better feedback
  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setShowSuggestions(false);
    setFilteredSuggestions([]);
    setActiveSuggestion(-1);

    // Give visual feedback
    if (locationInputRef.current) {
      locationInputRef.current.focus();
    }
  };

  // Add smooth scroll reset when suggestions open
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length > 0) {
      // Smart filtering logic (same as before)
      const filtered = locationSuggestions.filter((suggestion) => {
        const suggestionLower = suggestion.toLowerCase();
        const valueLower = value.toLowerCase();

        return (
          suggestionLower.includes(valueLower) ||
          suggestionLower.split(",")[0].trim().startsWith(valueLower)
        );
      });

      // Sort results (same as before)
      filtered.sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        const valueLower = value.toLowerCase();

        const aExact = aLower === valueLower;
        const bExact = bLower === valueLower;
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;

        const aStarts = aLower.startsWith(valueLower);
        const bStarts = bLower.startsWith(valueLower);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        return a.localeCompare(b);
      });

      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setActiveSuggestion(-1);

      // Reset scroll position when new search starts
      setTimeout(() => {
        if (suggestionsRef.current) {
          suggestionsRef.current.scrollTop = 0;
        }
      }, 100);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
        setActiveSuggestion(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const validateForm = () => {
    if (!name.trim()) {
      setStatusMessage({ text: "Name is required.", type: "error" });
      return false;
    }
    if (!email.trim()) {
      setStatusMessage({ text: "Email is required.", type: "error" });
      return false;
    }
    if (!mobile.trim()) {
      setStatusMessage({ text: "Mobile number is required.", type: "error" });
      return false;
    }
    if (!course || course === "") {
      setStatusMessage({
        text: "Please select a course.",
        type: "error",
      });
      return false;
    }
    if (!location.trim()) {
      setStatusMessage({ text: "Location is required.", type: "error" });
      return false;
    }

    if (name.length > 50) {
      setStatusMessage({
        text: "Name should be less than 50 characters.",
        type: "error",
      });
      return false;
    }
    if (!/^\d{10}$/.test(mobile.replace(/\D/g, ""))) {
      setStatusMessage({
        text: "Please enter a valid 10-digit mobile number.",
        type: "error",
      });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatusMessage({
        text: "Please enter a valid email address.",
        type: "error",
      });
      return false;
    }
    if (location.length > 100) {
      setStatusMessage({ text: "Location seems too long.", type: "error" });
      return false;
    }
    if (!isChecked) {
      setStatusMessage({
        text: "Please accept the terms and conditions.",
        type: "error",
      });
      return false;
    }

    setStatusMessage({ text: "", type: "" });
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setStatusMessage({ text: "", type: "" });

    const formData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      contact: mobile.replace(/\D/g, ""),
      countryCode: countryCode,
      coursename: course,
      location: location.trim(),
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        console.error("API URL (NEXT_PUBLIC_API_URL) is not set.");
        alert("Configuration error. Cannot submit form.");
        setIsSubmitting(false);
        return;
      }

      console.log("Submitting formData:", formData);

      const response = await axios.post(`${apiUrl}/api/submit`, formData);

      console.log("PopupForm submitted successfully:", response.data);
      setStatusMessage({
        text: response.data.message || "Registration complete!",
        type: "success",
      });

      if (typeof onSubmitData === "function") {
        onSubmitData(formData);
      }

      setTimeout(() => {
        setName("");
        setMobile("");
        setEmail("");
        setCourse("");
        setLocation("");
        setIsChecked(false);
        setStatusMessage({ text: "", type: "" });
        setIsVisible(false);
        document.body.classList.add(styles.popupClosedManually);
      }, 2500);
    } catch (error) {
      console.error("--- Error During PopupForm Submission ---");
      console.error("Raw Error Object:", error);

      let alertMessage =
        "An error occurred while submitting. Please try again.";

      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          const responseData = error.response.data;
          console.error(`Response Status: ${status}`);
          console.error("Raw Response Data:", responseData);

          if (status === 400) {
            alertMessage =
              responseData?.message ||
              "Submission failed. Please check your input.";
            console.log("Backend 400 message for alert:", alertMessage);
          } else {
            alertMessage = `Submission failed due to a server issue (Status: ${status}). Please try again later.`;
          }
        } else if (error.request) {
          alertMessage =
            "Cannot reach the server. Check connection or try again later.";
        } else {
          alertMessage = `Application error before sending: ${error.message}`;
        }
      } else {
        alertMessage = `Unexpected application error: ${error.message || "Unknown error"}`;
      }
      alert(alertMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle manual close button click
  const handleClose = () => {
    setIsVisible(false);
    document.body.classList.add(styles.popupClosedManually);
  };

  // Handle click outside form to close
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Prevent form container clicks from closing the popup
  const handleFormClick = (e) => {
    e.stopPropagation();
  };

  if (!isVisible) return null;

  return (
    <div className={styles.popupFormOverlay} onClick={handleOverlayClick}>
      <div className={styles.popupFormContainer} onClick={handleFormClick}>
        {/* Static background handled via CSS (see .popupFormContainer) */}

        {/* Enhanced lightning border effect */}
        <div className={styles.lightningBorder}>
          <div className={`${styles.lightningEdge} ${styles.top}`}></div>
          <div className={`${styles.lightningEdge} ${styles.right}`}></div>
          <div className={`${styles.lightningEdge} ${styles.bottom}`}></div>
          <div className={`${styles.lightningEdge} ${styles.left}`}></div>
        </div>

        {/* Enhanced close button */}
        <button
          className={styles.closeButton}
          onClick={handleClose}
          disabled={isSubmitting}
          aria-label="Close registration form"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className={styles.popupContent}>
          <div className={styles.leftPane} aria-hidden="true">
            <img
              src="/bg/g.jpeg"
              alt="Learning with Connecting Dots"
              className={styles.sideImage}
            />
          </div>
          <div className={styles.rightPane}>
            <div >
              <img
                src="/logo.avif"
                alt="Connecting Dots ERP Logo"
                
              />  
             <h2 className="text-blue-600 font-bold text-center">Register Now!</h2>
             </div>

            {statusMessage.text && (
              <div
                id="popup-status"
                className={`${styles.statusMessage} ${styles[statusMessage.type]}`}
                role={statusMessage.type === "error" ? "alert" : "status"}
                aria-live="polite"
              >
                {statusMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                placeholder="Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength="50"
                disabled={isSubmitting}
                aria-describedby="popup-status"
              />
              <input
                type="email"
                placeholder="E-mail*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                aria-describedby="popup-status"
              />
              <input
                type="tel"
                inputMode="numeric"
                placeholder="Mobile Number*"
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) {
                    setMobile(value);
                  }
                }}
                required
                pattern="\d{10}"
                maxLength="10"
                disabled={isSubmitting}
                aria-describedby="popup-status"
              />

              {/* Course Select Dropdown */}
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
                disabled={isSubmitting}
                aria-describedby="popup-status"
                className={styles.courseSelect}
              >
                {courseOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Enhanced Location Input with Comprehensive Suggestions */}
              <div className={styles.locationContainer}>
                <input
                  ref={locationInputRef}
                  type="text"
                  placeholder={
                    isLoadingCities ? "Loading locations..." : "Add your Location*"
                  }
                  value={location}
                  onChange={handleLocationChange}
                  onKeyDown={handleLocationKeyDown}
                  onFocus={() => {
                    if (location.length > 0 && filteredSuggestions.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  required
                  maxLength="100"
                  disabled={isSubmitting || isLoadingCities}
                  aria-describedby="popup-status"
                  autoComplete="off"
                />

                {/* Loading indicator for cities */}
                {isLoadingCities && (
                  <div className={styles.loadingIndicator}>
                    <span className={styles.loadingSpinner}></span>
                  </div>
                )}

                {/* Enhanced Suggestions Dropdown */}
                {showSuggestions &&
                  filteredSuggestions.length > 0 &&
                  !isLoadingCities && (
                    <div
                      ref={suggestionsRef}
                      className={styles.suggestionsDropdown}
                    >
                      {filteredSuggestions.slice(0, 10).map((suggestion, index) => {
                        // Determine the type of location for better icons
                        const isInternational =
                          suggestion.includes(", US") ||
                          suggestion.includes(", UK") ||
                          suggestion.includes(", CA") ||
                          suggestion.includes(", AU") ||
                          suggestion.includes(", DE") ||
                          suggestion.includes(", FR") ||
                          suggestion.includes(", SG") ||
                          suggestion.includes(", AE") ||
                          suggestion.includes(", JP");
                        const isSpecial = [
                          "Remote",
                          "Work from Home",
                          "Multiple Locations",
                          "Willing to Relocate",
                        ].includes(suggestion);

                        return (
                          <div
                            key={`${suggestion}-${index}`}
                            className={`${styles.suggestionItem} ${
                              index === activeSuggestion
                                ? styles.suggestionActive
                                : ""
                            }`}
                            onClick={() => handleSuggestionClick(suggestion)}
                            onMouseEnter={() => setActiveSuggestion(index)}
                          >
                            <span className={styles.suggestionIcon}>
                              {isSpecial ? "💼" : isInternational ? "🌍" : "📍"}
                            </span>
                            <span className={styles.suggestionText}>
                              {suggestion}
                            </span>
                          </div>
                        );
                      })}
                      {filteredSuggestions.length > 10 && (
                        <div className={styles.suggestionMore}>
                          +{filteredSuggestions.length - 10} more locations...
                        </div>
                      )}
                      {filteredSuggestions.length === 0 && location.length > 0 && (
                        <div className={styles.suggestionEmpty}>
                          No suggestions found. You can still type your custom
                          location.
                        </div>
                      )}
                    </div>
                  )}
              </div>

              <div className={styles.termsCheckbox}>
                <span>
                  <input
                    type="checkbox"
                    id="popup-terms"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    required
                    disabled={isSubmitting}
                    aria-describedby="popup-status"
                  />
                </span>
                <label htmlFor="popup-terms">
                  I hereby accept the{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    terms and conditions
                  </a>{" "}
                  and
                  <a href="/privacy" target="_blank" rel="noopener noreferrer">
                    {" "}
                    privacy policy
                  </a>{" "}
                  of Connecting Dots ERP.
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting || isLoadingCities}
                className={isSubmitting ? styles.submitting : ""}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.buttonText}>Registering</span>
                    <span className={styles.buttonLoader}></span>
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;