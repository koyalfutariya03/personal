"use client";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Terms.module.css";

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Terms and Conditions - Connecting Dots ERP</title>
        <meta
          name="description"
          content="Terms and conditions for using Connecting Dots ERP services and website."
        />
      </Head>

      <Container className={styles.termsContainer}>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className={styles.termsContent}>
              <h1 className={styles.pageTitle}>Terms and Conditions</h1>

              <section className={styles.section}>
                <h2>1. Introduction</h2>
                <p>
                  Welcome to Connecting Dots ERP's website. These Terms and
                  Conditions govern your use of the connectingdotserp.com
                  website (the "Website") and the services offered by Connecting
                  Dots ERP ("we," "us," or "our").
                </p>
                <p>
                  By accessing or using our Website, you agree to be bound by
                  these Terms and Conditions. If you do not agree with any part
                  of these terms, please do not use our Website.
                </p>
              </section>

              <section className={styles.section}>
                <h2>2. Company Information</h2>
                <ul>
                  <li>
                    <strong>Company Name:</strong> Connecting Dots ERP
                  </li>
                  <li>
                    <strong>Address:</strong> 1st Floor, 101, Police, Wireless
                    Colony, Vishal Nagar, Pimple Nilakh, Pune, Pimpri-Chinchwad,
                    Maharashtra 411027
                  </li>
                  <li>
                    <strong>Contact Information:</strong>
                    <ul>
                      <li>Email: connectingdotserp@gmail.com</li>
                      <li>Phone: 9004002958</li>
                    </ul>
                  </li>
                </ul>
              </section>

              <section className={styles.section}>
                <h2>3. Services Offered</h2>
                <p>
                  Connecting Dots ERP offers various training courses, including
                  but not limited to:
                </p>
                <ul>
                  <li>SAP S/4 HANA Courses</li>
                  <li>
                    SAP Functional Courses (FICO, ARIBA, SD, MM, PP, HR/HCM, QM,
                    PM, SCM, EWM, SuccessFactors)
                  </li>
                  <li>
                    SAP Technical Courses (ABAP, BASIS, BW/BI, S/4 HANA,
                    NetWeaver)
                  </li>
                  <li>
                    IT Courses (Full Stack Training, Java, MERN Stack, UI/UX
                    Design, Python, Salesforce)
                  </li>
                  <li>Digital Marketing Courses</li>
                  <li>Data Science Courses</li>
                  <li>Data Visualization Courses</li>
                  <li>HR Courses</li>
                </ul>
              </section>

              <section className={styles.section}>
                <h2>4. Use of Website</h2>

                <h3>4.1 General Use</h3>
                <p>
                  Our Website is intended to provide information about our
                  training services. You may browse our Website and access the
                  publicly available information.
                </p>

                <h3>4.2 Prohibited Activities</h3>
                <p>When using our Website, you agree not to:</p>
                <ul>
                  <li>
                    Use the Website in any way that violates any applicable
                    local, state, national, or international law
                  </li>
                  <li>
                    Attempt to gain unauthorized access to any portion of the
                    Website
                  </li>
                  <li>
                    Use the Website to transmit any malware, viruses, or other
                    malicious code
                  </li>
                  <li>
                    Interfere with or disrupt the Website or servers or networks
                    connected to the Website
                  </li>
                  <li>
                    Harvest or collect email addresses or other contact
                    information from our Website
                  </li>
                  <li>
                    Impersonate or attempt to impersonate Connecting Dots ERP, a
                    Connecting Dots ERP employee, or any other person or entity
                  </li>
                </ul>
              </section>

              <section className={styles.section}>
                <h2>5. Intellectual Property</h2>

                <h3>5.1 Ownership</h3>
                <p>
                  All content on this Website, including but not limited to
                  text, graphics, logos, images, audio clips, digital downloads,
                  data compilations, and software, is the property of Connecting
                  Dots ERP or its content suppliers and is protected by Indian
                  and international copyright laws.
                </p>

                <h3>5.2 Limited License</h3>
                <p>
                  We grant you a limited, non-exclusive, non-transferable
                  license to access and use the Website for personal,
                  non-commercial purposes. This license does not include:
                </p>
                <ul>
                  <li>
                    Any resale or commercial use of the Website or its contents
                  </li>
                  <li>
                    Any collection and use of any product listings,
                    descriptions, or prices
                  </li>
                  <li>Any derivative use of the Website or its contents</li>
                  <li>
                    Any downloading or copying of account information for the
                    benefit of another merchant
                  </li>
                  <li>
                    Any use of data mining, robots, or similar data gathering
                    and extraction tools
                  </li>
                </ul>

                <h3>5.3 Copyright Notice</h3>
                <p>© 2024 Connecting Dots ERP. All Rights Reserved.</p>
              </section>

              <section className={styles.section}>
                <h2>6. Disclaimers and Limitations of Liability</h2>

                <h3>6.1 Disclaimer of Warranties</h3>
                <p>
                  The Website is provided on an "as is" and "as available"
                  basis. Connecting Dots ERP makes no representations or
                  warranties of any kind, express or implied, regarding the
                  operation of the Website or the information, content,
                  materials, or products included on the Website.
                </p>

                <h3>6.2 Limitation of Liability</h3>
                <p>
                  To the fullest extent permitted by applicable law, Connecting
                  Dots ERP shall not be liable for any direct, indirect,
                  incidental, special, consequential, or punitive damages
                  arising out of or relating to your use of the Website.
                </p>
              </section>

              <section className={styles.section}>
                <h2>7. Modifications to Terms and Conditions</h2>
                <p>
                  Connecting Dots ERP reserves the right to modify these Terms
                  and Conditions at any time. We will notify users of any
                  changes by posting the new Terms and Conditions on this page.
                  You are advised to review these Terms and Conditions
                  periodically for any changes.
                </p>
              </section>

              <section className={styles.section}>
                <h2>8. Governing Law</h2>
                <p>
                  These Terms and Conditions are governed by and construed in
                  accordance with the laws of India, and you irrevocably submit
                  to the exclusive jurisdiction of the courts in Pune,
                  Maharashtra, India.
                </p>
              </section>

              <section className={styles.section}>
                <h2>9. Contact Information</h2>
                <p>
                  If you have any questions about these Terms and Conditions,
                  please contact us at:
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

              <div className={styles.footer}>
                <p>Last updated: 01/01/2025</p>
                <p>
                  <Link href="/privacy">View our Privacy Policy</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
