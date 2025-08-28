"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/styles/HomePage/Btnform.module.css";
import { User, Mail, Phone, MapPin, X, CheckCircle } from "lucide-react";
import cities from 'cities.json';

// Country codes with phone number lengths
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

const Btnform = ({ onClose, course }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    location: "",
    countryCode: "+91",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);

  const locationInputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Load location data
  useEffect(() => {
    const loadLocationData = () => {
      try {
        setIsLoadingCities(true);
        
        const indianCities = cities.filter(city => 
          city.country === 'IN' || city.country === 'India'
        );
        
        const majorInternationalCities = cities.filter(city => 
          ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'SG', 'AE', 'JP'].includes(city.country) &&
          city.population > 500000
        );

        const allLocations = [
          ...indianCities.map(city => 
            city.subcountry ? `${city.name}, ${city.subcountry}` : city.name
          ),
          ...majorInternationalCities.map(city => 
            `${city.name}, ${city.country}`
          ),
          'Remote',
          'Work from Home',
          'Multiple Locations',
          'Willing to Relocate'
        ];

        const uniqueLocations = [...new Set(allLocations)]
          .filter(location => location && location.trim())
          .sort((a, b) => {
            const aIsIndian = !a.includes(',') || a.includes('India');
            const bIsIndian = !b.includes(',') || b.includes('India');
            
            if (aIsIndian && !bIsIndian) return -1;
            if (!aIsIndian && bIsIndian) return 1;
            
            return a.localeCompare(b);
          });

        setLocationSuggestions(uniqueLocations);
        
      } catch (error) {
        console.error('Error loading cities data:', error);
        setLocationSuggestions([
          'Mumbai, Maharashtra', 'Delhi', 'Bangalore, Karnataka', 
          'Hyderabad, Telangana', 'Chennai, Tamil Nadu', 'Kolkata, West Bengal',
          'Pune, Maharashtra', 'Ahmedabad, Gujarat', 'Jaipur, Rajasthan', 
          'Remote', 'Work from Home'
        ]);
      } finally {
        setIsLoadingCities(false);
      }
    };

    loadLocationData();
  }, []);

  // Handle location input changes
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, location: value }));

    if (value.length > 0) {
      const filtered = locationSuggestions.filter(suggestion => {
        const suggestionLower = suggestion.toLowerCase();
        const valueLower = value.toLowerCase();
        
        return suggestionLower.includes(valueLower) ||
               suggestionLower.split(',')[0].trim().startsWith(valueLower);
      });

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
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }

    if (errors.location) {
      setErrors(prev => ({ ...prev, location: undefined }));
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setFormData(prev => ({ ...prev, location: suggestion }));
    setShowSuggestions(false);
    setFilteredSuggestions([]);
    setActiveSuggestion(-1);
  };

  // Handle keyboard navigation
  const handleLocationKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestion >= 0) {
          handleSuggestionClick(filteredSuggestions[activeSuggestion]);
        }
        break;
      case 'Escape':
      case 'Tab':
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Form validation
  const validate = () => {
    const newErrors = {};
    const { name, email, contact, countryCode, location } = formData;

    if (!name?.trim()) {
      newErrors.name = "Name is required";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const selectedCountry = countryCodes.find((c) => c.code === countryCode);
    if (selectedCountry) {
      const { minLength, maxLength } = selectedCountry;
      const contactDigits = contact.replace(/\D/g, "");

      if (!contactDigits || contactDigits.length < minLength || contactDigits.length > maxLength) {
        newErrors.contact = `Please enter a valid ${
          minLength === maxLength ? minLength : `${minLength}-${maxLength}`
        }-digit number for ${selectedCountry.country}`;
      }
    } else {
      if (!contact || !/^\d{7,15}$/.test(contact.replace(/\D/g, ""))) {
        newErrors.contact = "Please enter a valid phone number";
      }
    }

    if (!location?.trim()) {
      newErrors.location = "Location is required";
    } else if (location.length > 100) {
      newErrors.location = "Location seems too long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const processedValue = name === "contact" ? value.replace(/\D/g, "") : value;

    setFormData(prev => ({ ...prev, [name]: processedValue }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    const payload = {
      ...formData,
      coursename: course || "General Inquiry",
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        console.error("API URL environment variable is not set.");
        alert("Configuration error. Cannot submit form.");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post(`${apiUrl}/api/submit`, payload);
      console.log("Form submitted successfully:", response.data);
      
      setShowThankYou(true);
      setFormData({
        name: "",
        email: "",
        contact: "",
        location: "",
        countryCode: "+91",
      });
      setErrors({});

      setTimeout(() => {
        setShowThankYou(false);
        if (onClose) onClose();
      }, 3000);

    } catch (error) {
      setIsSubmitting(false);
      console.error("Form submission error:", error);
      
      let errorMessage = "An error occurred while submitting. Please try again.";
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          errorMessage = error.response?.data?.message || "Submission failed. Please check your input values.";
        } else if (error.request) {
          errorMessage = "Cannot reach the server. Please check your internet connection.";
        }
      }
      alert(errorMessage);
    }
  };

  const selectedCountry = countryCodes.find(
    (country) => country.code === formData.countryCode
  );
  const placeholderText = selectedCountry
    ? `Enter ${
        selectedCountry.minLength === selectedCountry.maxLength
          ? selectedCountry.minLength
          : `${selectedCountry.minLength}-${selectedCountry.maxLength}`
      } digit number`
    : "Enter phone number";

  return (
    <div className={styles.formModal}>
      <div className={styles.formContainer}>
        <button onClick={onClose} className={styles.closeButton} aria-label="Close form">
          <X size={18} />
        </button>

        <div className={styles.formHeader}>
          <img
            src="https://mlir9digcwm2.i.optimole.com/cb:X1mK.5e5cf/w:620/h:191/q:mauto/https://connectingdotserp.in/wp-content/uploads/2024/07/Original-Logo.png"
            alt="Connecting Dots ERP Logo"
            className={styles.logo}
          />
          <h2>Get In Touch!</h2>
          <p>Fill out the form below and we&apos;ll get back to you.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
          {/* Name Field */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>Full Name</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={14} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`${styles.formInput} ${errors.name ? styles.inputError : ""}`}
                aria-required="true"
              />
            </div>
            {errors.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div>

          {/* Email Field */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={14} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`${styles.formInput} ${errors.email ? styles.inputError : ""}`}
                aria-required="true"
              />
            </div>
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          {/* Phone Number Field */}
          <div className={styles.formGroup}>
            <label htmlFor="contact" className={styles.formLabel}>Phone Number</label>
            <div className={styles.phoneInputWrapper}>
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className={styles.countryCodeSelect}
              >
                {countryCodes.map(({ code, country }) => (
                  <option key={code} value={code}>
                    {`${code} (${country})`}
                  </option>
                ))}
              </select>
              <div className={styles.phoneNumberWrapper}>
                <Phone className={styles.phoneIcon} size={14} />
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder={placeholderText}
                  className={`${styles.phoneNumberInput} ${errors.contact ? styles.inputError : ""}`}
                  maxLength={selectedCountry?.maxLength || 15}
                  aria-required="true"
                />
              </div>
            </div>
            {errors.contact && (
              <span className={styles.errorText}>{errors.contact}</span>
            )}
          </div>

          {/* Location Field */}
          <div className={styles.formGroup}>
            <label htmlFor="location" className={styles.formLabel}>Location</label>
            <div className={styles.locationContainer}>
              <div className={styles.inputWrapper}>
                <MapPin className={styles.inputIcon} size={14} />
                <input
                  ref={locationInputRef}
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleLocationChange}
                  onKeyDown={handleLocationKeyDown}
                  onFocus={() => {
                    if (formData.location.length > 0 && filteredSuggestions.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                  placeholder={isLoadingCities ? "Loading..." : "Enter your city"}
                  className={`${styles.formInput} ${errors.location ? styles.inputError : ""}`}
                  disabled={isLoadingCities}
                  autoComplete="off"
                  aria-required="true"
                />
                {isLoadingCities && (
                  <div className={styles.loadingIndicator}>
                    <span className={styles.loadingSpinner}></span>
                  </div>
                )}
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && !isLoadingCities && (
                <div ref={suggestionsRef} className={styles.suggestionsDropdown}>
                  {filteredSuggestions.slice(0, 6).map((suggestion, index) => {
                    const isInternational = suggestion.includes(', US') || 
                                          suggestion.includes(', UK') || 
                                          suggestion.includes(', CA') ||
                                          suggestion.includes(', AU');
                    const isSpecial = ['Remote', 'Work from Home', 'Multiple Locations', 'Willing to Relocate'].includes(suggestion);
                    
                    return (
                      <div
                        key={`${suggestion}-${index}`}
                        className={`${styles.suggestionItem} ${
                          index === activeSuggestion ? styles.suggestionActive : ''
                        }`}
                        onClick={() => handleSuggestionClick(suggestion)}
                        onMouseEnter={() => setActiveSuggestion(index)}
                      >
                        <span className={styles.suggestionIcon}>
                          {isSpecial ? '💼' : isInternational ? '🌍' : '📍'}
                        </span>
                        <span className={styles.suggestionText}>{suggestion}</span>
                      </div>
                    );
                  })}
                  {filteredSuggestions.length > 6 && (
                    <div className={styles.suggestionMore}>
                      +{filteredSuggestions.length - 6} more...
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {errors.location && (
              <span className={styles.errorText}>{errors.location}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className={styles.formActions}>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || isLoadingCities}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>

      {/* Thank You Modal */}
      {showThankYou && (
        <div className={styles.thankYouOverlay}>
          <div className={styles.thankYouContent}>
            <CheckCircle size={40} color="#28a745" />
            <h2>Thank You!</h2>
            <p>Your message has been successfully submitted.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Btnform;