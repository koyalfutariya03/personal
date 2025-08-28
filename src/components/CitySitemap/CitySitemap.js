"use client";

import Link from "next/link";
import { FaMapMarkerAlt, FaPhone, FaBuilding } from "react-icons/fa";
import { MdLocationCity } from "react-icons/md";
import styles from "@/styles/CitySitemap/CitySitemap.module.css";

const CitySitemap = () => {
  // Cities
  const cities = [
    { name: "Pune", slug: "pune", region: "West", popular: true },
    { name: "Katraj", slug: "katraj", region: "West", popular: true },
    {
      name: "Pimpri-Chinchwad",
      slug: "pimpri-chinchwad",
      region: "West",
      popular: true,
    },
    {
      name: "Shivaji Nagar",
      slug: "shivaji-nagar",
      region: "West",
      popular: true,
    },
    {
      name: "Koregaon Park",
      slug: "koregaon-park",
      region: "West",
      popular: true,
    },
    { name: "Viman Nagar", slug: "viman-nagar", region: "West", popular: true },
    {
      name: "Pimple Saudagar",
      slug: "pimple-saudagar",
      region: "West",
      popular: true,
    },
    { name: "Baner", slug: "baner", region: "West", popular: true },
    { name: "Hinjewadi", slug: "hinjewadi", region: "West", popular: true },
    { name: "Wakad", slug: "wakad", region: "West", popular: true },
    { name: "Kothrud", slug: "kothrud", region: "West", popular: true },
    { name: "Hadapsar", slug: "hadapsar", region: "West", popular: true },
    { name: "Aundh", slug: "aundh", region: "West", popular: true },
    { name: "Mumbai", slug: "mumbai", region: "West", popular: true },
    { name: "Navi Mumbai", slug: "navi-mumbai", region: "West", popular: true },
    { name: "Thane", slug: "thane", region: "West", popular: true },
    { name: "Kalyan", slug: "kalyan", region: "West", popular: true },
    { name: "Bandra", slug: "bandra", region: "West", popular: true },
    { name: "Andheri", slug: "andheri", region: "West", popular: true },
    { name: "Powai", slug: "powai", region: "West", popular: true },
    { name: "Worli", slug: "worli", region: "West", popular: true },
    { name: "Chembur", slug: "chembur", region: "West", popular: true },
    { name: "Malad", slug: "malad", region: "West", popular: true },
    { name: "Vile Parle", slug: "vile-parle", region: "West", popular: true },
    { name: "Matunga", slug: "matunga", region: "West", popular: true },
    { name: "Delhi", slug: "delhi", region: "North", popular: true },
    { name: "Kolkata", slug: "kolkata", region: "East", popular: true },
    { name: "Chennai", slug: "chennai", region: "South", popular: true },
    { name: "Bangalore", slug: "bangalore", region: "South", popular: true },
    { name: "Hyderabad", slug: "hyderabad", region: "South", popular: true },
    { name: "Ahmedabad", slug: "ahmedabad", region: "West", popular: false },
    { name: "Jaipur", slug: "jaipur", region: "North", popular: false },
    { name: "Lucknow", slug: "lucknow", region: "North", popular: false },
    { name: "Kanpur", slug: "kanpur", region: "North", popular: false },
    { name: "Nagpur", slug: "nagpur", region: "West", popular: false },
    { name: "Patna", slug: "patna", region: "East", popular: false },
    { name: "Indore", slug: "indore", region: "Central", popular: false },
    { name: "Bhopal", slug: "bhopal", region: "Central", popular: false },
    {
      name: "Visakhapatnam",
      slug: "visakhapatnam",
      region: "South",
      popular: false,
    },
    { name: "Vadodara", slug: "vadodara", region: "West", popular: false },
    { name: "Ludhiana", slug: "ludhiana", region: "North", popular: false },
    { name: "Agra", slug: "agra", region: "North", popular: false },
    { name: "Nashik", slug: "nashik", region: "West", popular: false },
    { name: "Rajkot", slug: "rajkot", region: "West", popular: false },
    { name: "Varanasi", slug: "varanasi", region: "North", popular: false },
    { name: "Kerala", slug: "kerala", region: "South", popular: false },
    { name: "Surat", slug: "surat", region: "West", popular: false },
    { name: "Dehradun", slug: "dehradun", region: "North", popular: false },
    { name: "Madurai", slug: "madurai", region: "South", popular: false },
    { name: "Mysore", slug: "mysore", region: "South", popular: false },
    {
      name: "Pondicherry",
      slug: "pondicherry",
      region: "South",
      popular: false,
    },
    { name: "Ranchi", slug: "ranchi", region: "East", popular: false },
    { name: "Coimbatore", slug: "coimbatore", region: "South", popular: false },
    { name: "Chandigarh", slug: "chandigarh", region: "North", popular: false },
    {
      name: "Bhubaneswar",
      slug: "bhubaneswar",
      region: "East",
      popular: false,
    },
    { name: "Tirupati", slug: "tirupati", region: "South", popular: false },
    { name: "Vizag", slug: "vizag", region: "South", popular: false },
    { name: "Trivandrum", slug: "trivandrum", region: "South", popular: false },
    { name: "Jalandhar", slug: "jalandhar", region: "North", popular: false },
    { name: "Mohali", slug: "mohali", region: "North", popular: false },
    { name: "Raipur", slug: "raipur", region: "Central", popular: false },
    { name: "Cochin", slug: "cochin", region: "South", popular: false },
    { name: "Mangalore", slug: "mangalore", region: "South", popular: false },
  ];

  // Popular cities section
  const popularCities = cities.filter((city) => city.popular);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.sitemapContainer}>
        {/* Header Section */}
        <div className={styles.sitemapHeader}>
          <h2>Find Training Programs in Your City</h2>
          <p>
            Connecting Dots ERP offers specialized training programs across
            India
          </p>
        </div>

        {/* Popular Cities Section */}
        <div className={styles.popularCitiesSection}>
          <h3>Popular Training Locations</h3>
          <div className={styles.popularCitiesGrid}>
            {popularCities.map((city, index) => (
              <Link
                href={`/sitemap/${city.slug}`}
                key={index}
                className={styles.popularCityCard}
              >
                <MdLocationCity className={styles.cityIcon} />
                <h3>{city.name}</h3>
                <span className={styles.popularBadge}>Popular</span>
              </Link>
            ))}
          </div>
        </div>

        {/* All Cities Grid */}
        <div className={styles.allCitiesSection}>
          <h3>All Training Locations ({cities.length})</h3>

          <div className={styles.citiesGrid}>
            {cities.map((city, index) => (
              <Link
                href={`/sitemap/${city.slug}`}
                key={index}
                className={styles.cityCard}
              >
                <div className={styles.cityCardContent}>
                  <h2>{city.name}</h2>
                  <span className={styles.regionTag}>{city.region}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Information Section - Always visible now */}
        <div className={styles.contactSection}>
          <div className={styles.contactInfo}>
            <div className={styles.contactHeader}>
              <h3>CONTACT US</h3>
              <p>Reach out to our offices for more information</p>
            </div>

            <div className={styles.officesContainer}>
              <div className={styles.officeCard}>
                <div className={styles.officeHeader}>
                  <FaBuilding className={styles.officeIcon} />
                  <h4>Pune Office</h4>
                </div>
                <div className={styles.officeDetails}>
                  <div className={styles.contactItem}>
                    <FaMapMarkerAlt />
                    <p>
                      1st Floor, 101, Police, Wireless Colony, Vishal Nagar,
                      Pimple Nilakh, Pune, Pimpri-Chinchwad, Maharashtra 411027
                    </p>
                  </div>
                  <div className={styles.contactItem}>
                    <FaPhone />
                    <p>
                      <a href="tel:+919004002941">+91 9004002941</a>
                    </p>
                  </div>
                  <div className={styles.contactItem}>
                    <FaPhone />
                    <p>
                      <a href="tel:+919004002958">+91 9004002958</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.officeCard}>
                <div className={styles.officeHeader}>
                  <FaBuilding className={styles.officeIcon} />
                  <h4>Mumbai Office</h4>
                </div>
                <div className={styles.officeDetails}>
                  <div className={styles.contactItem}>
                    <FaMapMarkerAlt />
                    <p>
                      4th Floor, Ram Niwas, B-404, Gokhale Rd, near McDonald's,
                      Dada Patil Wadi, Naupada, Thane West, Thane, Maharashtra
                      400602
                    </p>
                  </div>
                  <div className={styles.contactItem}>
                    <FaPhone />
                    <p>
                      <a href="tel:+919004005382">+91 9004005382</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitySitemap;
