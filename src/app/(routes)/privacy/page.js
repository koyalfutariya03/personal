"use client";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Privacy.module.css";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Connecting Dots ERP</title>
        <meta
          name="description"
          content="Privacy policy for Connecting Dots ERP - how we collect, use, and protect your information."
        />
      </Head>

      <Container className={styles.privacyContainer}>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className={styles.privacyContent}>
              <h1 className={styles.pageTitle}>Privacy Policy</h1>

              <section className={styles.section}>
                <h2>1. Introduction</h2>
                <p>
                  At Connecting Dots ERP, we respect your privacy and are
                  committed to protecting your personal information. This
                  Privacy Policy explains how we collect, use, and safeguard
                  your information when you visit our website or interact with
                  us.
                </p>
              </section>

              <section className={styles.section}>
                <h2>2. Information We Collect</h2>

                <h3>2.1 Personal Information</h3>
                <p>
                  We collect the following personal information when you
                  voluntarily provide it to us through our contact or inquiry
                  forms:
                </p>
                <ul>
                  <li>Full name</li>
                  <li>Contact number</li>
                  <li>Email address</li>
                  <li>Location/place</li>
                  <li>Course(s) you're interested in</li>
                </ul>

                <h3>2.2 Collection Methods</h3>
                <p>
                  All personal information is provided directly by you when you:
                </p>
                <ul>
                  <li>Fill out contact forms on our website</li>
                  <li>Register for courses</li>
                  <li>Request information about our services</li>
                  <li>Subscribe to our communications</li>
                </ul>
                <p>
                  We do not use automatic data collection technologies such as
                  cookies.
                </p>
              </section>

              <section className={styles.section}>
                <h2>3. How We Use Your Information</h2>

                <h3>3.1 Primary Uses</h3>
                <ul>
                  <li>
                    To contact you regarding courses you've expressed interest
                    in
                  </li>
                  <li>To provide you with information about our services</li>
                  <li>To respond to your inquiries or requests</li>
                  <li>To process your course registrations</li>
                </ul>

                <h3>3.2 Marketing</h3>
                <p>
                  We may use your contact information to send you promotional
                  communications about new courses, special offers, or other
                  information that may be of interest to you. You can opt out of
                  receiving these communications at any time by contacting us.
                </p>

                <h3>3.3 Service Improvement</h3>
                <p>
                  We may use feedback and aggregated information to improve our
                  website, services, and course offerings.
                </p>
              </section>

              <section className={styles.section}>
                <h2>4. Information Sharing</h2>

                <h3>4.1 Third-Party Disclosure</h3>
                <p>
                  We do not sell, trade, or otherwise transfer your personal
                  information to outside parties unless we provide you with
                  advance notice or are required by law to do so.
                </p>

                <h3>4.2 Legal Requirements</h3>
                <p>
                  We may disclose your information if required to do so by law
                  or in response to valid requests by public authorities (e.g.,
                  a court or government agency).
                </p>
              </section>

              <section className={styles.section}>
                <h2>5. Data Security</h2>
                <p>
                  We implement appropriate security measures to maintain the
                  safety of your personal information. However, please be aware
                  that no method of transmission over the Internet or method of
                  electronic storage is 100% secure.
                </p>
              </section>

              <section className={styles.section}>
                <h2>6. Your Rights</h2>
                <p>
                  While we do not provide a formal mechanism for users to
                  access, correct, or delete their personal information through
                  our website, we respect your privacy rights. If you wish to:
                </p>
                <ul>
                  <li>Access the personal information we hold about you</li>
                  <li>Correct inaccuracies in your personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Express any concern about our use of your data</li>
                </ul>
                <p>
                  Please contact us using the information provided in Section 9.
                </p>
              </section>

              <section className={styles.section}>
                <h2>7. Data Retention</h2>
                <p>
                  We will retain your personal information only for as long as
                  necessary to fulfill the purposes outlined in this Privacy
                  Policy, unless a longer retention period is required or
                  permitted by law.
                </p>
              </section>

              <section className={styles.section}>
                <h2>8. Children's Privacy</h2>
                <p>
                  Our website is not intended for children under 13 years of
                  age. We do not knowingly collect personal information from
                  children under 13. If you are a parent or guardian and believe
                  that your child has provided us with personal information,
                  please contact us so that we can take necessary actions.
                </p>
              </section>

              <section className={styles.section}>
                <h2>9. Contact Information</h2>
                <p>
                  If you have any questions or concerns about this Privacy
                  Policy, please contact us at:
                </p>
                <ul>
                  <li>Email: connectingdotserp@gmail.com</li>
                  <li>Phone: 9004002958</li>
                  <li>
                    Address: 1st Floor, 101, Police, Wireless Colony, Vishal
                    Nagar, Pimple Nilakh, Pune, Pimpri-Chinchwad, Maharashtra
                    411027
                  </li>
                </ul>
              </section>

              <section className={styles.section}>
                <h2>10. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page. You are advised to review this Privacy Policy
                  periodically for any changes.
                </p>
              </section>

              <div className={styles.footer}>
                <p>
                  This Privacy Policy was last updated on: 01/01/2025
                </p>
                <p>
                  <Link href="/terms">View our Terms and Conditions</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
