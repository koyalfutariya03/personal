"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "@/styles/Stickyform.module.css";
import { usePathname } from "next/navigation";

// Define countryCodes array with phone number length requirements
const countryCodes = [
  { code: "+1", country: "USA", minLength: 10, maxLength: 10 },
  { code: "+91", country: "India", minLength: 10, maxLength: 10 },
  { code: "+44", country: "UK", minLength: 10, maxLength: 11 },
  { code: "+61", country: "Australia", minLength: 9, maxLength: 9 },
  { code: "+81", country: "Japan", minLength: 10, maxLength: 11 },
  { code: "+49", country: "Germany", minLength: 10, maxLength: 11 },
  { code: "+33", country: "France", minLength: 9, maxLength: 9 },
  { code: "+86", country: "China", minLength: 11, maxLength: 11 },
  { code: "+7", country: "Russia", minLength: 10, maxLength: 10 },
  { code: "+39", country: "Italy", minLength: 9, maxLength: 10 },
  { code: "+55", country: "Brazil", minLength: 10, maxLength: 11 },
  { code: "+34", country: "Spain", minLength: 9, maxLength: 9 },
  { code: "+27", country: "South Africa", minLength: 9, maxLength: 9 },
  { code: "+971", country: "UAE", minLength: 9, maxLength: 9 },
  { code: "+62", country: "Indonesia", minLength: 10, maxLength: 12 },
  { code: "+90", country: "Turkey", minLength: 10, maxLength: 10 },
  { code: "+82", country: "South Korea", minLength: 9, maxLength: 10 },
  { code: "+60", country: "Malaysia", minLength: 9, maxLength: 10 },
  { code: "+31", country: "Netherlands", minLength: 9, maxLength: 9 },
  { code: "+52", country: "Mexico", minLength: 10, maxLength: 10 },
];

function Stickyform() {
  // --- ALL HOOKS MUST BE DECLARED AT THE TOP LEVEL ---
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    course: "",
    email: "",
    countryCode: "+91",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true); // State to control visibility based on scroll/path
  const footerRef = useRef(null);

  const pathname = usePathname(); // usePathname is a hook

  // List of paths where the form should be hidden (should be constant or state)
  const hiddenPaths = ['/dashboard', '/superadmin', '/AdminLogin','/blog-admin','/blog-admin/users']; // Added AdminLogin as per your logic

  // Check if current path is an admin path (derived from pathname)
  const isAdminPath = pathname && hiddenPaths.some(path => pathname.startsWith(path));


  // --- useEffects (must be after useState, useRef, etc.) ---

  // Effect to find the footer element (runs once on mount)
  useEffect(() => {
    const footerElement = document.querySelector("footer");
    if (footerElement) {
      footerRef.current = footerElement;
    }
  }, []); // Empty dependency array means it runs once on mount

  // Effect to handle resize and scroll events
  useEffect(() => {
    // Check if current path is in the hiddenPaths list
    // This check now uses the pathname value obtained from the hook above
    const shouldHideBasedOnPath = hiddenPaths.some(path => pathname?.startsWith(path));

    // Function to check if any part of the footer is visible
    const checkFooterVisibility = () => {
      if (!footerRef.current) return;

      const rect = footerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // If ANY part of the footer is visible in the viewport, hide the form
      if (rect.top < windowHeight && rect.bottom >= 0) {
        setIsFormVisible(false);
      } else {
        // Footer is not in viewport at all
        // Only show the form if it's NOT a hidden path
        setIsFormVisible(!shouldHideBasedOnPath);
      }
    };

    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setIsMobileView(isMobile);

      // On resize, check footer visibility if not on a hidden path
      // Mobile view should always hide the form, as per original logic
      if (!isMobile && !shouldHideBasedOnPath) {
        checkFooterVisibility();
      } else {
        setIsFormVisible(false); // Hide on mobile or hidden paths
      }
    };

    const handleScroll = () => {
      // Only check scroll if not on mobile and not on a hidden path
      if (!isMobileView && !shouldHideBasedOnPath) {
        checkFooterVisibility();

        // Extra check for when scrolled to bottom of page
        const isAtBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 20; // 20px buffer

        if (isAtBottom) {
          setIsFormVisible(false);
        }
      }
    };

    // Initial setup when the component mounts or pathname changes
    // We need to determine the initial visibility state
    const initialIsMobile = window.innerWidth <= 768;
    setIsMobileView(initialIsMobile);

    if (shouldHideBasedOnPath || initialIsMobile) {
       setIsFormVisible(false);
    } else {
       // If not a hidden path and not mobile, check footer visibility initially
       checkFooterVisibility();
    }


    // Add event listeners
    // Listeners should only be added if the component should potentially show the form
    // We can add listeners and the handlers will check the states (isMobileView, shouldHideBasedOnPath)
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileView, pathname, hiddenPaths, footerRef]); // Added footerRef to dependencies if checkFooterVisibility uses it inside the effect, although it's a ref so maybe not strictly needed. pathname and hiddenPaths are crucial dependencies.


  // --- Conditional Return (MUST BE AFTER ALL HOOKS) ---
  // If on admin page, don't render the component's JSX at all
  if (isAdminPath) {
    return null;
  }

  // --- Rest of the component logic and render ---

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      // Allow only digits for phone numbers
      const digitsOnly = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: digitsOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      // Use undefined or null to clear the specific error
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const validate = () => {
    const newErrors = {};
    const { name, email, contact, countryCode, course } = formData;

    // Basic trim and presence checks
    if (!name.trim()) newErrors.name = "Name is required";
     else if (name.trim().length < 2) newErrors.name = "Name must be at least 2 characters"; // Added min length validation


    if (!email.trim()) newErrors.email = "Email is required";
    if (!course) newErrors.course = "Please select a course";

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && !emailPattern.test(email.trim())) // Check format only if email is not empty
      newErrors.email = "Please enter a valid email address";

    // Contact number validation based on country code
    const selectedCountry = countryCodes.find((c) => c.code === countryCode);
    if (selectedCountry) {
      const { minLength, maxLength } = selectedCountry;
      const contactDigits = contact.replace(/\D/g, ""); // Ensure we validate digits only

      if (!contactDigits) { // Check if contact is empty after removing non-digits
         newErrors.contact = "Contact number is required";
      } else if (contactDigits.length < minLength || contactDigits.length > maxLength) {
        newErrors.contact = `Enter a valid ${minLength === maxLength ? minLength : `${minLength}-${maxLength}`}-digit number for ${selectedCountry.country}`;
      } else if (!/^\d+$/.test(contactDigits)) { // Double-check it only contains digits
         newErrors.contact = "Phone number should contain only digits";
      }
    } else {
      newErrors.contact = "Please select a valid country code"; // Should not happen with the select dropdown
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors before validating
    setErrors({});

    if (!validate()) {
      console.warn("Validation failed:", errors); // Log errors for debugging
      // Errors state is already set by validate()
      return; // Stop submission if validation fails
    }

    setIsSubmitting(true); // Show loading state

    const submissionData = {
      name: formData.name.trim(),
      contact: formData.contact, // contact is already digits-only
      countryCode: formData.countryCode,
      email: formData.email.trim(),
      coursename: formData.course,
      location: "", // Optional; add real location if needed
    };

    try {
      // --- Send data to backend API ---
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        console.error("API URL (NEXT_PUBLIC_API_URL) is not set.");
        alert("Configuration error. Cannot submit form.");
        setIsSubmitting(false);
        return;
      }

      // Assuming your API is at ${apiUrl}/api/leads (based on your other components)
      // If the sticky form submits to a different endpoint like /api/submit, keep it.
      const submitEndpoint = `${apiUrl}/api/leads`; // Or your specific submission endpoint

      const response = await axios.post(submitEndpoint, submissionData);

      // --- Handle.Success (Status 2xx) ---
      console.info("Form submitted successfully with response:", response);
      alert(response.data.message || "Thank You! Form successfully submitted."); // Use alert for success

      setShowPopup(true);
      // Hide popup after 3 seconds
      const popupTimer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);


      // Reset form fields on successful submission
      setFormData({
        name: "",
        contact: "",
        course: "",
        email: "",
        countryCode: "+91", // Reset to default
      });
      // Optionally reset form visibility after submission if desired
      // setIsFormVisible(false);

      return () => clearTimeout(popupTimer); // Cleanup timer


    } catch (error) {
      console.error("Submission error:", error); // Detailed error log

      let errorMessage =
        "An error occurred while submitting. Please try again."; // Default message

      if (axios.isAxiosError(error)) {
        console.error("Axios error detected.");
        if (error.response) {
          const status = error.response.status;
          const responseData = error.response.data;
          console.error(
            `Error status: ${status}, Response Data: `,
            responseData
          );

          // Check for specific status codes or backend messages
          if (status === 400 && responseData?.message) {
            errorMessage = responseData.message; // Use specific backend validation message
          } else if (status === 409 && responseData?.message) { // Example: Conflict for duplicate email/contact
             errorMessage = responseData.message;
          }
          else {
            errorMessage = `Server error (Status: ${status}). Try again later.`;
          }
        } else if (error.request) {
          console.error("No response received from server:", error.request);
          errorMessage =
            "Cannot reach the server. Please check your connection.";
        } else {
          console.error("Error in setting up the request:", error.message);
          errorMessage = `Error before sending: ${error.message}`;
        }
      } else {
        console.error("Unexpected error:", error);
        errorMessage = `Unexpected error: ${error.message}`;
      }

      alert(errorMessage); // Show error message using alert

    } finally {
      setIsSubmitting(false);
    }
  };

  // Find the selected country to display length requirements in placeholder
  const selectedCountry = countryCodes.find(
    (country) => country.code === formData.countryCode
  );
  const contactPlaceholder = selectedCountry
    ? `Enter ${
        selectedCountry.minLength === selectedCountry.maxLength
          ? selectedCountry.minLength
          : `${selectedCountry.minLength}-${selectedCountry.maxLength}`
      } digits`
    : "Enter phone number";

  // --- FINAL RENDER LOGIC ---
  // Component returns null if it's an admin path (check happens after all hooks)
  // Otherwise, it renders the form if visible based on scroll/resize state
  return (
    <>
      {/* Only render the form container if not mobile AND form is visible */}
      {!isMobileView && isFormVisible && (
        <div className={styles.stickyformContainer}>
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={styles.contactFormS}
            noValidate // Disable default browser validation
          >
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                  Name <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="E.g., Ram"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? styles.inputError : ""} // Apply error class
                  required // HTML5 validation hint (JS validation handles actual logic)
                  maxLength="50"
                  aria-required="true" // ARIA attributes for accessibility
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  disabled={isSubmitting}
                />
                {errors.name && ( // Display error message
                  <span
                    id="name-error"
                    className={styles.errorText} // Use errorText class
                    role="alert"
                  >
                    {errors.name}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  type="email" // Use type="email" for better mobile keyboards
                  id="email"
                  name="email"
                  placeholder="E.g., ram@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? styles.inputError : ""}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <span
                    id="email-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {errors.email}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact" className={styles.formLabel}>
                  Contact Number <span className={styles.required}>*</span>
                </label>
                <div className={styles.contactField}>
                  <select
                    id="countryCode"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    aria-label="Select Country Code"
                     disabled={isSubmitting}
                  >
                    {countryCodes.map(({ code, country }) => (
                      <option key={code} value={code}>
                        ({code}) {country}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel" // Use type="tel" for mobile keyboard optimization
                    inputMode="numeric" // Hint for numeric keyboard
                    id="contact"
                    name="contact"
                    placeholder={contactPlaceholder}
                    value={formData.contact}
                    onChange={handleChange}
                    className={errors.contact ? styles.inputError : ""}
                    maxLength={selectedCountry?.maxLength || 15} // Apply max length based on selected country
                    required
                    aria-required="true"
                    aria-invalid={!!errors.contact}
                    aria-describedby={
                      errors.contact ? "contact-error" : undefined
                    }
                    disabled={isSubmitting}
                  />
                </div>
                {errors.contact && (
                  <span
                    id="contact-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {errors.contact}
                  </span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="course" className={styles.formLabel}>
                  Course <span className={styles.required}>*</span>
                </label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className={errors.course ? styles.inputError : ""}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.course}
                  aria-describedby={errors.course ? "course-error" : undefined}
                  disabled={isSubmitting}
                >
                  <option value="" disabled>
                    Select a course
                  </option>
                  <option value="SAP Course">SAP Course</option>
                  <option value="IT Course">IT Course</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Data Visualisation">Data Visualisation</option>
                  <option value="HR Course">HR Course</option>
                  {/* Add more course options as needed */}
                </select>
                {errors.course && (
                  <span
                    id="course-error"
                    className={styles.errorText}
                    role="alert"
                  >
                    {errors.course}
                  </span>
                )}
              </div>
              {/* Submit Button - Make it a formGroup for consistent layout */}
              <div className={styles.formGroup} style={{ alignSelf: 'flex-end' }}> {/* Align button to the bottom */}
                <button
                  className={`${styles.button} ${styles.primaryButton}`} // Use your button styles
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className={styles.spinner} /> Loading... {/* Use spinner icon if you have one */}
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Success Popup */}
      {showPopup && (
        <div className={styles.popup}>Thank you for submitting!</div>
      )}
    </>
  );
}

export default Stickyform;