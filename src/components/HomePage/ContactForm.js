"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/HomePage/ContactForm.module.css";
import axios from "axios";
import { IonIcon } from "@ionic/react";
import { personOutline, mailOutline, callOutline } from "ionicons/icons";

// Define countryCodes array (assuming this is correct for your needs)
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

const ContactForm = ({ course, formData, onClose }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    contact: "",
    countryCode: "+91",
  });
  const [errors, setErrors] = useState({});
  const [isThankYouVisible, setThankYouVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (formData?.fields) {
      const initialFormValues = formData.fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {});
      setFormValues((prev) => ({
        ...prev,
        ...initialFormValues,
        countryCode: prev.countryCode || "+91",
      }));
    }
  }, [formData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentFormRef = formRef.current;
    if (currentFormRef) {
      observer.observe(currentFormRef);
    }

    return () => {
      if (currentFormRef) {
        observer.unobserve(currentFormRef);
      }
      observer.disconnect();
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let processedValue = value;
    if (name === "contact") {
      processedValue = value.replace(/\D/g, "");
    }
    setFormValues((prevValues) => ({ ...prevValues, [name]: processedValue }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const { name, email, contact, countryCode } = formValues;
    if (!name || !name.trim()) newErrors.name = "Name is required";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email))
      newErrors.email = "Please enter a valid email address";
    const selectedCountry = countryCodes.find((c) => c.code === countryCode);
    if (selectedCountry) {
      const { minLength, maxLength } = selectedCountry;
      const contactDigits = contact.replace(/\D/g, "");
      if (
        !contactDigits ||
        contactDigits.length < minLength ||
        contactDigits.length > maxLength
      ) {
        newErrors.contact = `Please enter a valid ${minLength === maxLength ? minLength : `${minLength}-${maxLength}`}-digit number for ${selectedCountry.country}`;
      } else if (!/^\d+$/.test(contactDigits)) {
        newErrors.contact = "Phone number should contain only digits";
      }
    } else {
      if (!contact || !/^\d{7,15}$/.test(contact.replace(/\D/g, ""))) {
        newErrors.contact = "Please enter a valid phone number";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      console.log("Frontend validation failed:", errors);
      return;
    }
    console.log("Frontend validation PASSED. Proceeding to submit...");
    setIsLoading(true);
    const payload = {
      ...formValues,
      coursename: course || formData?.courseName || "Not Specified",
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        console.error("API URL (NEXT_PUBLIC_API_URL) is not set.");
        alert("Configuration error. Cannot submit form.");
        setIsLoading(false);
        return;
      }
      const response = await axios.post(`${apiUrl}/api/submit`, payload);
      console.log("Form submitted successfully:", response.data);
      setIsLoading(false);
      setThankYouVisible(true);
      setTimeout(() => {
        setThankYouVisible(false);
        if (onClose) onClose();
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      // --- Enhanced Error Handling ---
      console.error("--- Error During Form Submission ---");
      // Log the raw error object to see its structure
      console.error("Raw Error Object:", error);
      // Log the config to see the request details
      if (error.config) {
        console.error("Request Config:", error.config);
      }

      let errorMessage =
        "An error occurred while submitting. Please try again."; // Default

      if (axios.isAxiosError(error)) {
        console.error("Axios error detected.");
        if (error.response) {
          // Got a response from the server
          const status = error.response.status;
          const responseData = error.response.data; // <<< TRY TO ACCESS THIS
          const responseHeaders = error.response.headers;

          console.error(`Response Status: ${status}`);
          // Log the raw response data and its type
          console.error("Raw Response Data:", responseData);
          console.error("Type of Response Data:", typeof responseData);
          console.error("Response Headers:", responseHeaders); // Check CORS headers here too

          if (status === 400) {
            // Check if the backend sent the expected message format
            // Check BOTH if it's an object AND if it has the message property
            if (
              responseData &&
              typeof responseData === "object" &&
              responseData.message
            ) {
              errorMessage = responseData.message; // Use the specific backend message
              console.log(
                "Successfully extracted backend message:",
                errorMessage
              );
            } else {
              console.warn(
                "Received 400 status, but 'message' field missing or data format incorrect in response. Response data was:",
                responseData
              );
              errorMessage =
                "Submission failed. Please check your input values.";
            }
          } else {
            errorMessage = `Submission failed due to a server issue (Status: ${status}). Please try again later.`;
          }
        } else if (error.request) {
          console.error("No response received from server:", error.request);
          errorMessage =
            "Cannot reach the server. Please check your internet connection or try again later.";
        } else {
          console.error("Axios request setup error:", error.message);
          errorMessage = `An application error occurred before sending: ${error.message}`;
        }
      } else {
        console.error("Non-Axios error:", error);
        errorMessage = `An unexpected application error occurred: ${error.message || "Unknown error"}`;
      }

      alert(errorMessage); // Display the determined message
    }
  };

  if (!formData) return null;

  const selectedCountryInfo = countryCodes.find(
    (c) => c.code === formValues.countryCode
  );
  const contactPlaceholder = selectedCountryInfo
    ? `${selectedCountryInfo.minLength === selectedCountryInfo.maxLength ? selectedCountryInfo.minLength : `${selectedCountryInfo.minLength}-${selectedCountryInfo.maxLength}`} digit number`
    : "Contact Number";
  const rawButtonText = formData.submitButton || "Submit";
  const buttonText = rawButtonText.includes("Demo Demo")
    ? rawButtonText.replace(/Demo\s*Demo/, "Demo").trim()
    : rawButtonText;

  return (
    <div className={styles.modalOverlay}>
      <div
        className={`${styles.modalContent} ${isInView ? styles.backgroundLoaded : ""}`}
        ref={formRef}
      >
        <span
          className={styles.closeBtnContact}
          onClick={onClose}
          role="button"
          aria-label="Close form"
        >
          &times;
        </span>
        <form className={styles.contactForm} onSubmit={handleSubmit} noValidate>
          {/* --- Form Fields (Name, Email, Contact) --- */}
          {/* Name */}
          <div className={styles.contactFormGroup}>
            <label htmlFor="name" className={styles.srOnly}>
              Your Name
            </label>
            <div className={styles.inputWithIcon}>
              <input
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={errors.name ? styles.inputError : ""}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                required
              />
              <IonIcon icon={personOutline} aria-hidden="true" />
            </div>
            {errors.name && (
              <span id="name-error" className={styles.errorText} role="alert">
                {errors.name}
              </span>
            )}
          </div>
          {/* Email */}
          <div className={styles.contactFormGroup}>
            <label htmlFor="email" className={styles.srOnly}>
              Your Email
            </label>
            <div className={styles.inputWithIcon}>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="Your Email"
                className={errors.email ? styles.inputError : ""}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                required
              />
              <IonIcon icon={mailOutline} aria-hidden="true" />
            </div>
            {errors.email && (
              <span id="email-error" className={styles.errorText} role="alert">
                {errors.email}
              </span>
            )}
          </div>
          {/* Contact */}
          <div className={styles.contactFormGroup}>
            <label htmlFor="countryCode" className={styles.srOnly}>
              Country Code
            </label>
            <label htmlFor="contact" className={styles.srOnly}>
              Contact Number
            </label>
            <div className={styles.inputWithIcon}>
              <select
                id="countryCode"
                name="countryCode"
                value={formValues.countryCode}
                onChange={handleChange}
                className={styles.selectCountryCode}
                aria-label="Select your country code"
              >
                {countryCodes.map(({ code, country }) => (
                  <option key={code} value={code}>
                    {" "}
                    {`${code} (${country})`}{" "}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                inputMode="numeric"
                id="contact"
                name="contact"
                value={formValues.contact}
                onChange={handleChange}
                placeholder={contactPlaceholder}
                className={`${styles.contactInput} ${errors.contact ? styles.inputError : ""}`}
                maxLength={selectedCountryInfo?.maxLength || 15}
                aria-invalid={!!errors.contact}
                aria-describedby={errors.contact ? "contact-error" : undefined}
                required
              />
              <IonIcon icon={callOutline} aria-hidden="true" />
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
          {/* Submit Button */}
          <button
            type="submit"
            className={styles.submitBtnContact}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : buttonText}
          </button>
        </form>
        {/* Thank You Popup */}
        {isThankYouVisible && (
          <div className={styles.thankYouPopup} role="status">
            {" "}
            <p>🎉 Thank you for submitting! We'll get back to you soon.</p>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
