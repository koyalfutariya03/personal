"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "@/styles/HomePage/PopCourses.module.css";
import dynamic from "next/dynamic";
import {
  FaStar,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Country codes with flags (Unicode) and phone number lengths
const countryCodes = [
  { code: "+1", country: "USA", flag: "🇺🇸", minLength: 10, maxLength: 10 },
  { code: "+91", country: "India", flag: "🇮🇳", minLength: 10, maxLength: 10 },
  { code: "+44", country: "UK", flag: "🇬🇧", minLength: 10, maxLength: 11 },
  { code: "+61", country: "Australia", flag: "🇦🇺", minLength: 9, maxLength: 9 },
  { code: "+81", country: "Japan", flag: "🇯🇵", minLength: 10, maxLength: 11 },
  { code: "+49", country: "Germany", flag: "🇩🇪", minLength: 10, maxLength: 11 },
  { code: "+33", country: "France", flag: "🇫🇷", minLength: 9, maxLength: 9 },
  { code: "+86", country: "China", flag: "🇨🇳", minLength: 11, maxLength: 11 },
  { code: "+7", country: "Russia", flag: "🇷🇺", minLength: 10, maxLength: 10 },
  { code: "+39", country: "Italy", flag: "🇮🇹", minLength: 9, maxLength: 10 },
  { code: "+55", country: "Brazil", flag: "🇧🇷", minLength: 10, maxLength: 11 },
  { code: "+34", country: "Spain", flag: "🇪🇸", minLength: 9, maxLength: 9 },
  {
    code: "+27",
    country: "South Africa",
    flag: "🇿🇦",
    minLength: 9,
    maxLength: 9,
  },
  { code: "+971", country: "UAE", flag: "🇦🇪", minLength: 9, maxLength: 9 },
  {
    code: "+62",
    country: "Indonesia",
    flag: "🇮🇩",
    minLength: 10,
    maxLength: 12,
  },
  { code: "+90", country: "Turkey", flag: "🇹🇷", minLength: 10, maxLength: 10 },
  {
    code: "+82",
    country: "South Korea",
    flag: "🇰🇷",
    minLength: 9,
    maxLength: 10,
  },
  { code: "+60", country: "Malaysia", flag: "🇲🇾", minLength: 9, maxLength: 10 },
  {
    code: "+31",
    country: "Netherlands",
    flag: "🇳🇱",
    minLength: 9,
    maxLength: 9,
  },
  { code: "+52", country: "Mexico", flag: "🇲🇽", minLength: 10, maxLength: 10 },
];

// Dynamically import Btnform to prevent SSR-related issues
const Btnform = dynamic(() => import("@/components/HomePage/Btnform"), {
  ssr: false,
});

const initialCourses = [
  {
    id: "1",
    name: "SAP S/4 HANA Courses",
    initialCount: 12,
    count: 12,
    icon: "/Icons/sap (3).avif",
    startDays: 1,
    rating: 4.9,
  },
  {
    id: "2",
    name: "Masters in Data Science",
    initialCount: 7,
    count: 7,
    icon: "/Icons/MnDS.avif",
    startDays: 2,
    rating: 4.9,
  },
  {
    id: "3",
    name: "SAP FICO Course",
    initialCount: 9,
    count: 9,
    icon: "/Icons/online-analytical.avif",
    startDays: 2,
    rating: 4.7,
  },
  {
    id: "4",
    name: "SAP MM Course",
    initialCount: 8,
    count: 8,
    icon: "/Icons/sap (3).avif",
    startDays: 2,
    rating: 4.6,
  },
  {
    id: "5",
    name: "SAP ABAP Course",
    initialCount: 8,
    count: 8,
    icon: "/Icons/business-intelligence.avif",
    startDays: 1,
    rating: 4.9,
  },
  {
    id: "6",
    name: "SAP HR/HCM Course",
    initialCount: 12,
    count: 12,
    icon: "/Icons/sap (3).avif",
    startDays: 4,
    rating: 4.5,
  },
  {
    id: "7",
    name: "HR Course",
    initialCount: 15,
    count: 15,
    icon: "/Icons/HR PR2.avif",
    startDays: 3,
    rating: 4.6,
  },
  {
    id: "8",
    name: "SAP SD Course",
    initialCount: 13,
    count: 13,
    icon: "/Icons/sap.png",
    startDays: 2,
    rating: 4.5,
  },
  {
    id: "9",
    name: "SAP SUCCESSFACTOR Course",
    initialCount: 17,
    count: 17,
    icon: "/Icons/cloud-data.avif",
    startDays: 5,
    rating: 4.6,
  },
];

const Courses = () => {
  const [showPopupForm, setShowPopupForm] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState(null);
  const [courses, setCourses] = useState([]);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  // Timer refs for cleanup
  const timerRefs = useRef([]);
  const courseStartTimestamps = useRef([]);

  useEffect(() => {
    // Initialize courses with calculated start times
    const now = new Date();
    const currentDate = now.toISOString().split("T")[0]; // YYYY-MM-DD format

    const initializedCourses = initialCourses.map((course) => {
      // Calculate the start date based on startDays
      const startDate = new Date(now);
      startDate.setDate(startDate.getDate() + course.startDays);
      startDate.setHours(9, 0, 0, 0); // 9 AM

      const startTimestamp = startDate.getTime();
      courseStartTimestamps.current.push(startTimestamp);

      // Calculate time difference
      const diffMs = startTimestamp - now.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      // Calculate how many seats to show (fewer as we get closer to start)
      const timeRatio = diffMs / (course.startDays * 24 * 60 * 60 * 1000);
      const adjustedCount = Math.max(
        2,
        Math.floor(
          course.initialCount * timeRatio * 0.8 + course.initialCount * 0.2
        )
      );

      return {
        ...course,
        startTimestamp,
        count: adjustedCount,
        timeLeft: {
          days: diffDays,
          hours: diffHours,
          minutes: diffMinutes,
          seconds: diffSeconds,
        },
      };
    });

    setCourses(initializedCourses);

    // Start timers for each course
    initializedCourses.forEach((course, index) => {
      const timerId = setInterval(() => {
        updateCourseTimer(index);
      }, 1000);

      timerRefs.current[index] = timerId;
    });

    // Cleanup function
    return () => {
      // Clear all course timers
      timerRefs.current.forEach((timerId) => clearInterval(timerId));
    };
  }, []);

  useEffect(() => {
    if (showPopupForm) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showPopupForm]);

  const updateCourseTimer = (index) => {
    setCourses((prevCourses) => {
      const updatedCourses = [...prevCourses];
      const course = updatedCourses[index];

      // Calculate remaining time
      const now = new Date().getTime();
      const startTimestamp = courseStartTimestamps.current[index];
      let diffMs = startTimestamp - now;

      // If time is up, reset the timer with a new start date
      if (diffMs <= 0) {
        // Reset to a new date 1-7 days in the future
        const newDays = Math.floor(Math.random() * 7) + 1;
        const newStartDate = new Date();
        newStartDate.setDate(newStartDate.getDate() + newDays);
        newStartDate.setHours(9, 0, 0, 0); // 9 AM

        // Update the start timestamp
        courseStartTimestamps.current[index] = newStartDate.getTime();
        diffMs = newStartDate.getTime() - now;

        // Reset the count to initial value
        course.count = course.initialCount;
      } else {
        // Dynamically reduce seats as time gets closer
        const totalTimeMs = course.startDays * 24 * 60 * 60 * 1000;
        const timeRatio = diffMs / totalTimeMs;

        // More aggressive reduction when less than 24 hours remain
        if (diffMs < 24 * 60 * 60 * 1000) {
          // If less than 8 hours remain, show only 2-5 seats
          if (diffMs < 8 * 60 * 60 * 1000) {
            course.count = Math.max(2, Math.min(5, course.count));
          } else {
            // Between 8-24 hours, reduce more aggressively
            const adjustedCount = Math.max(
              2,
              Math.floor(course.initialCount * 0.3)
            );

            // Only update if lower to prevent seats increasing
            if (adjustedCount < course.count) {
              course.count = adjustedCount;
            }
          }
        } else {
          // Normal reduction based on time ratio
          const adjustedCount = Math.max(
            2,
            Math.floor(
              course.initialCount * timeRatio * 0.8 + course.initialCount * 0.2
            )
          );

          // Only update if lower to prevent seats increasing
          if (adjustedCount < course.count) {
            course.count = adjustedCount;
          }
        }

        // Occasionally reduce by 1 for natural effect
        if (Math.random() < 0.0001 && course.count > 2) {
          // 0.01% chance per second
          course.count -= 1;
        }
      }

      // Calculate new time values
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      course.timeLeft = {
        days: diffDays,
        hours: diffHours,
        minutes: diffMinutes,
        seconds: diffSeconds,
      };

      return updatedCourses;
    });
  };

  const handleEnrollNowClick = (course) => {
    setSelectedCourse(course);
    setShowPopupForm(true);
    // Reset form state
    setName(""); 
    setEmail("");
    setPhone("");
    setLocation("");
    setSelectedCountryCode("+91");
    setValidated(false);
    setErrors({});
  };

  const handleClosePopupForm = () => {
    setShowPopupForm(false);
    setSelectedCourse(null);
  };

  const handleButtonClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }

    // Phone validation
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else {
      const selectedCountry = countryCodes.find(
        (item) => item.code === selectedCountryCode
      );
      if (selectedCountry) {
        const { minLength, maxLength } = selectedCountry;
        if (phone.length < minLength || phone.length > maxLength) {
          newErrors.phone = `Phone number must be between ${minLength} and ${maxLength} digits for ${selectedCountry.country}`;
        }
      }
    }

    // Location validation
    if (!location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare form data matching the expected format in the backend
      const formData = {
        name: name.trim(),
        email: email.trim(),
        contact: phone, // Send only the phone number digits
        countryCode: selectedCountryCode, // Send country code separately
        location: location.trim(),
        coursename: selectedCourse ? selectedCourse.name : "Not specified", // Use "coursename" key to match backend
      };

      const response = await fetch(
        "https://serverbackend-0nvg.onrender.com/api/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Enrollment successful! We'll contact you soon.");
        handleClosePopupForm();
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatTimeUnit = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5; // More accurate half-star check

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className={styles.starIcon} />);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <div className={styles.halfStarContainer} key="half-star">
          <FaStar className={`${styles.starIcon} ${styles.halfStarBack}`} />
          <div className={styles.halfStarWrapper}>
            <FaStar className={`${styles.starIcon} ${styles.halfStarFront}`} />
          </div>
        </div>
      );
    }

    // Add empty stars to always show 5 stars total
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaStar
          key={`empty-star-${i}`}
          className={`${styles.starIcon} ${styles.emptyStar}`}
        />
      );
    }

    return (
      <div className={styles.starContainer}>
        {stars}
        <span className={styles.ratingText}>({rating})</span>
      </div>
    );
  };

  const isLowSeats = (count) => count <= 5;

  // Find the selected country to display length requirements in placeholder
  const selectedCountry = countryCodes.find(
    (country) => country.code === selectedCountryCode
  );
  const contactPlaceholder = selectedCountry
    ? `Enter ${
        selectedCountry.minLength === selectedCountry.maxLength
          ? selectedCountry.minLength
          : `${selectedCountry.minLength}-${selectedCountry.maxLength}`
      } digits`
    : "Enter phone number";

  return (
    <div id="popCourses" className={`${styles.coursesContainer} text-center`}>
      <div className={styles.coursesTitle}>
        <h2>Our Popular Courses</h2>
        <div className={styles.titleUnderline}></div>
        <p className={styles.subtitle}>
          Start your learning journey with our in-demand courses
        </p>
      </div>

      <div className={styles.coursesGrid}>
        {courses.map((course, index) => (
          <div key={course.id} className={styles.courseCard}>
            <div className={styles.timerContainer}>
              <div className={styles.timerLabel}>Starts in:</div>
              <div className={styles.newTimerWrapper}>
                <div className={styles.timerBlock}>
                  <div className={styles.timeCircle}>
                    <span>{formatTimeUnit(course.timeLeft.days)}</span>
                  </div>
                  <div className={styles.timeLabel}>days</div>
                </div>
                <div className={styles.timerDivider}>:</div>
                <div className={styles.timerBlock}>
                  <div className={styles.timeCircle}>
                    <span>{formatTimeUnit(course.timeLeft.hours)}</span>
                  </div>
                  <div className={styles.timeLabel}>hrs</div>
                </div>
                <div className={styles.timerDivider}>:</div>
                <div className={styles.timerBlock}>
                  <div className={styles.timeCircle}>
                    <span>{formatTimeUnit(course.timeLeft.minutes)}</span>
                  </div>
                  <div className={styles.timeLabel}>min</div>
                </div>
                <div className={styles.timerDivider}>:</div>
                <div className={styles.timerBlock}>
                  <div className={styles.timeCircle}>
                    <span>{formatTimeUnit(course.timeLeft.seconds)}</span>
                  </div>
                  <div className={styles.timeLabel}>sec</div>
                </div>
              </div>
            </div>

            <div className={styles.iconContainer}>
              <Image
                src={course.icon}
                alt={`${course.name} icon`}
                width={60}
                height={60}
                className={styles.courseIcon}
              />
            </div>

            <h3>{course.name}</h3>

            {renderStars(course.rating)}

            <div
              className={
                isLowSeats(course.count)
                  ? `${styles.seatsCount} ${styles.lowSeats}`
                  : styles.seatsCount
              }
            >
              <span className={styles.seats}>
                {course.count} {course.count === 1 ? "Seat" : "Seats"} Left
              </span>
              {isLowSeats(course.count) && (
                <span className={styles.hurryText}>Hurry up!</span>
              )}
            </div>

            <Button
              className={styles.enrollBtn}
              onClick={() => handleEnrollNowClick(course)}
            >
              Enroll Now
            </Button>
          </div>
        ))}
      </div>

      <div className={styles.bottomButtons}>
        <Button className={styles.outlineBtnn} onClick={handleButtonClick}>
          Download Brochure
        </Button>
        {showForm && <Btnform onClose={handleCloseForm} />}
        <Button
          className={styles.outlineBtnn}
          onClick={() =>
            handleEnrollNowClick({
              id: "demo",
              name: "Free Demo Session",
            })
          }
        >
          Book a Free Demo
        </Button>
      </div>

      {/* Single-step Enrollment Form Modal */}
      <Modal
        show={showPopupForm}
        onHide={handleClosePopupForm}
        centered
        className={styles.enrollmentModal}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedCourse
              ? `Enroll in ${selectedCourse.name}`
              : "Enrollment Form"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          {/* Selected course display */}
          <div className={styles.selectedCourseInfo}>
            <div className={styles.selectedCourseLabel}>Course:</div>
            <div className={styles.selectedCourseName}>
              {selectedCourse ? selectedCourse.name : ""}
            </div>
          </div>

          <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <div className={styles.formStep}>
              <div className={styles.formGroup}>
                <div className={styles.inputIcon}>
                  <FaUser className={styles.icon} />
                </div>
                <div className={styles.inputField}>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={!!errors.name}
                    required
                    className={styles.formControl}
                  />
                  <Form.Label className={styles.floatingLabel}>
                    Full Name
                  </Form.Label>
                  <div className={styles.errorMessage}>{errors.name}</div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <div className={styles.inputIcon}>
                  <FaEnvelope className={styles.icon} />
                </div>
                <div className={styles.inputField}>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!errors.email}
                    required
                    className={styles.formControl}
                  />
                  <Form.Label className={styles.floatingLabel}>
                    Email Address
                  </Form.Label>
                  <div className={styles.errorMessage}>{errors.email}</div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <div className={styles.inputIcon}>
                  <FaPhone className={styles.icon} />
                </div>
                <div className={styles.inputField}>
                  <div className={styles.phoneInputWrapper}>
                    <Form.Select
                      className={styles.countryCodeSelect}
                      value={selectedCountryCode}
                      onChange={(e) => setSelectedCountryCode(e.target.value)}
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control
                      type="tel"
                      placeholder={contactPlaceholder}
                      value={phone}
                      onChange={(e) => {
                        // Only allow digits
                        const regex = /^[0-9\b]+$/;
                        if (
                          e.target.value === "" ||
                          regex.test(e.target.value)
                        ) {
                          setPhone(e.target.value);
                        }
                      }}
                      isInvalid={!!errors.phone}
                      required
                      className={styles.phoneInput}
                      maxLength={selectedCountry?.maxLength || 15}
                    />
                  </div>
                  <Form.Label className={styles.floatingLabel}>
                    Phone Number
                  </Form.Label>
                  <div className={styles.errorMessage}>{errors.phone}</div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <div className={styles.inputIcon}>
                  <FaMapMarkerAlt className={styles.icon} />
                </div>
                <div className={styles.inputField}>
                  <Form.Control
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    isInvalid={!!errors.location}
                    required
                    className={styles.formControl}
                  />
                  <Form.Label className={styles.floatingLabel}>
                    Location
                  </Form.Label>
                  <div className={styles.errorMessage}>{errors.location}</div>
                </div>
              </div>

              <Button
                variant="primary"
                type="submit"
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Processing...
                  </>
                ) : (
                  "Submit Enrollment"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default Courses;