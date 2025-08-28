// lib/masterData.js - Clean and Commented Version

export const coursesData = {
  // SAP COURSES

  "sap-fico": {
    // === BASIC COURSE INFO ===
    title: "SAP FICO", // Used in: Page titles, headers, SEO
    fullTitle: "SAP Financial Accounting and Controlling", // Used in: Page content, descriptions like h2, h3
    category: "sap", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sap-fico", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Enroll in the best SAP FICO course in {city} and master financial accounting and controlling with expert-led training. Our SAP FICO training in {city} offers real-time Training, industry-relevant curriculum, and 100% placement support to help you build a successful career in SAP finance modules.",
    metaTitle: "SAP FICO Course in {city} | Top Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SAP FICO in {city}. Expert-led training, certification, real-time projects & 100% placement. Launch your SAP finance career now!",

    // === COURSE DETAILS ===
    duration: "2-3 months", // Used in: Course summary section, page content
    price: { min: 50000, max: 150000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Financial Accounting (FI)",
      "Controlling (CO)",
      "Asset Accounting",
      "Accounts Payable/Receivable",
      "General Ledger",
      "Cost Center Accounting",
    ],
    prerequisites: "Basic accounting knowledge recommended", // Used in: Course details (currently not displayed but can be used)
    certification: "SAP Certified Application Associate - Financial Accounting", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "SAP FICO Consultant",
      "Finance Analyst",
      "SAP Functional Consultant",
      "Financial Controller",
      "Cost Accountant",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "SAP FICO Course in {city} | Sap Fico S4/Hana Certification",
      subtitle: "Practical Based Job Oriented SAP Training in {city}",
      description:
        "Enroll in the best SAP FICO course in {city} and master financial accounting and controlling with expert-led training. Our SAP FICO training in {city} offers real-time Training, industry-relevant curriculum, and 100% placement support to help you build a successful career in SAP finance modules.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call Back", courseName: "SAP FICO Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          { type: "text", name: "location", placeholder: "Add your location" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why SAP FICO ?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">SAP FICO?</span>',
          content:
            "SAP FICO also works with other SAP logistic modules, including (production planning (PP), sales and distribution (SD), Quality management (QM), Materials Management (MM), and plant maintenance (PM).",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">SAP FICO Consultant</span> do?',
          content:
            "A SAP FICO Consultant implements and manages SAP FICO modules, ensuring accurate financial reporting and effective financial control.",
          listItems: [
            "Implement SAP FICO modules.",
            "Manage financial reporting and analysis.",
            "Optimize financial processes and controls.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">SAP FICO</span> training?',
          content:
            "SAP FICO Consultants are vital for managing an organization's financials. Our SAP FICO Course in {city} covers financial accounting, controlling, and integration with other SAP modules.",
          listItems: [
            "SAP FICO Consultant",
            "Financial Analyst",
            "SAP Financial Controller",
          ],
        },
      ],
    },

    // Data for SapModComponent (course-specific syllabus)
    sapMod: {
      title2: ' <span class="highlight-span-cards">Sap Fico</span> Syllabus',
      description: "Industry aligned Sap Fico syllabus with certification",
      summary:
        "An exhaustive Syllabus designed by our industry experts which will help you to get placed in your dream IT company",
      noteMaster: "We provide advanced Sap Fico training",
      noteAdvance: "Advance",
      features: [
        { label: "10+", description: "Tools" },
      ],
      overview: {
        title: "Syllabus Overview",
        modules: [
          {
            name: "Financial Accounting (FI)",

            subtopics: [
              "Introduction to SAP FI",

              "Organizational Structure in FI",

              "General Ledger Accounting",

              "Accounts Payable Management",

              "Accounts Receivable Management",

              "Bank Accounting",

              "Tax Configuration in FI",

              "Integration with Other Modules",
            ],
          },

          {
            name: "Controlling (CO)",

            subtopics: [
              "Overview of SAP CO",

              "Cost Element Accounting",

              "Cost Center Accounting",

              "Internal Orders",

              "Profit Center Accounting",

              "Activity-Based Costing (ABC)",

              "Profitability Analysis (CO-PA)",

              "Integration with FI & Other Modules",
            ],
          },

          {
            name: "Asset Accounting",

            subtopics: [
              "Introduction to Asset Accounting",

              "Asset Master Data",

              "Chart of Depreciation",

              "Asset Transactions (Acquisition/Retirement)",

              "Asset Depreciation Runs",

              "Asset Reporting",

              "Integration with General Ledger",

              "Year-End Closing in Asset Accounting",
            ],
          },

          {
            name: "Accounts Payable/Receivable",

            subtopics: [
              "Vendor Master Data",

              "Customer Master Data",

              "Invoice Posting & Payments",

              "Outgoing & Incoming Payments",

              "Payment Program Configuration (F110)",

              "Dunning Process",

              "Credit Management",

              "Reconciliation Accounts Setup",
            ],
          },

          {
            name: "General Ledger",

            subtopics: [
              "GL Master Data",

              "Document Posting in GL",

              "Recurring Entries",

              "Accruals & Deferrals",

              "Parking & Holding Documents",

              "Journal Vouchers",

              "Ledger Groups and Parallel Ledgers",

              "Financial Statement Versions",
            ],
          },

          {
            name: "Cost Center Accounting",

            subtopics: [
              "Cost Center Hierarchy",

              "Planning in Cost Centers",

              "Actual Postings",

              "Statistical Key Figures",

              "Cost Allocations (Assessment/Distribution)",

              "Activity Types",

              "Reports and Variance Analysis",

              "Integration with Other CO Areas",
            ],
          },
        ],
      },
      videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
      downloadLink:
        "https://drive.google.com/uc?export=download&id=1szoZuUK5k3vR52YZseLPyV5diTe7FiAD",
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "SAP FICO CERTIFICATION",
      alt: "sap-fico-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The Connecting Dots ERP Certification holds immense value in elevating your expertise and setting you on the path to a successful career as an SAP FICO professional. Our SAP FICO certification program goes beyond theoretical knowledge, combining hands-on practical sessions with real-world scenarios. ",
      description:
        "Additionally, we focus on grooming you to adapt and excel in the dynamic role of SAP FICO personnel, ensuring you're well-prepared for the evolving corporate landscape.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for SAP FICO Training in {city}?",
      paragraphs: [
        "If you're looking to build a successful career in SAP Financial Accounting and Controlling, Connecting Dots ERP is the perfect place to start. Recognized as a leading institute for SAP FICO training in {city}, we offer a structured, in-depth program designed to help you master the SAP FICO module from the ground up. Whether you're a fresher, finance professional, or IT expert looking to upskill, our SAP FICO course in {city} is tailored to match industry standards and demands.",
        "At Connecting Dots ERP, our SAP FICO program stands out because of our practical approach to learning. Our SAP FICO classes in {city} are led by industry experts with real-world experience, ensuring that you not only learn theoretical concepts but also understand how they are applied in actual business environments. From General Ledger, Accounts Payable/Receivable, Asset Accounting to Cost Center Accounting and Internal Orders, we cover every aspect of SAP FICO in detail.",
      ],
      listItem1Header: "What makes our SAP FICO training in {city} unique?",
      listItem1: [
        "Industry Relevant Curriculum: Our course covers all essential FICO components with practical sessions and real-time scenarios.",
        "Experienced Faculty: Learn from SAP professionals with 10 years of hands-on industry experience.",
        "Flexible Learning Modes: Weekend, weekday, and online batch options to suit every learner's schedule.",
        "Affordable Fees: Accessible pricing with flexible payment plans.",
        "100% Placement Assistance: We help you prepare for interviews, build a strong resume, and connect you with top recruiters.",
        "Industry-Recognized Certification: Earn a certification that boosts your employability and career prospects.",
      ],
      listItemAfterIndex: 1, // Insert list after paragraph index 1
      paragraphsAfterList: [
        "By choosing Connecting Dots ERP for your SAP FICO course in {city}, you're investing in a future-proof career with opportunities in top MNCs and global enterprises. We don't just train you — we mentor, guide, and empower you for long-term success.",
        "Join the best SAP FICO classes in {city} today and take your first step toward a high-paying, stable, and rewarding career in the SAP ecosystem.",
      ],
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "What is SAP FICO?",
          answer:
            "SAP FICO stands for Financial Accounting (FI) and Controlling (CO), modules in SAP ERP systems designed to manage financial transactions and data. SAP FI focuses on external financial reporting, including balance sheets and income statements, while SAP CO supports internal planning and monitoring, such as cost management and profitability analysis. ",
        },
        {
          question:
            "Can I learn SAP FICO without a financial or Accounting background?",
          answer:
            "Yes, you can learn SAP FICO without Any financial background. However, having a basic understanding of accounting concepts can make the process easier. You can understand the functional aspects of SAP FICO by concentrating on the system's technical and configuration components.",
        },
        {
          question: "SAP Fico is in demand?",
          answer:
            "Yes, SAP FICO is in high demand due to its critical role in financial management and controlling processes within organizations globally.",
        },
        {
          question: "Is it possible to take this course's demo sessions?",
          answer:
            "Free demo sessions are available for this course, allowing prospective students to explore the curriculum and teaching style before enrolling. These sessions offer a sneak peek into the course content and learning environment.",
        },
        {
          question: "What is the salary of sap fico fresher in {city}?",
          answer:
            "Salary growth depends upon skill level. A skilled SAP fico consultant can fetch an even higher salary.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SAP PP",
          description: "Learn PP from scratch",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: " SAP PP icon",
        },
        {
          name: "SAP QM",
          description: "Learn QM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP QM icon",
        },
        {
          name: "SAP PS",
          description: "Master PS skills",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PS icon",
        },
        {
          name: "SAP SUCCESSFACTOR",
          description: "Learn SUCCESSFACTOR from Experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SuccesFactor icon",
        },
        {
          name: "SAP EWM",
          description: "Learn EWM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP EWM icon",
        },
        {
          name: "SAP MM",
          description: "Learn MM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP MM icon",
        },
        {
          name: "SAP SD",
          description: "Learn SD from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SD icon",
        },
        {
          name: "SAP HR/HCM",
          description: "Learn HR/HCM   from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HR/HCM icon",
        },
        {
          name: "SAP PM",
          description: "Learn PM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PM icon",
        },
        {
          name: "SAP SCM",
          description: "Learn SCM from Industry Experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SCM icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  sap: {
    // === BASIC COURSE INFO ===
    title: "SAP", // Used in: Page titles, headers, SEO
    fullTitle: "SAP Enterprise Resource Planning", // Used in: Page content, descriptions
    category: "sap", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sap", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Enroll in the best SAP course in {city} and master enterprise resource planning with expert-led training. Our SAP training in {city} covers SAP FICO, SAP MM, and SAP SD modules with real-time Training, industry-relevant curriculum, and 100% placement support to help you build a successful career in SAP.",
    metaTitle: "SAP Course in {city} | Best SAP Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SAP in {city}. Expert-led training in SAP FICO, MM, SD. Certification, real-time projects & 100% placement support. Launch your SAP career now!",

    // === COURSE DETAILS ===
    duration: "3-4 months", // Used in: Course summary section, page content
    price: { min: 40000, max: 120000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "SAP FICO (Financial Accounting & Controlling)",
      "SAP MM (Materials Management)",
      "SAP SD (Sales & Distribution)",
      "SAP Implementation",
      "SAP Configuration",
      "Business Process Integration",
    ],
    prerequisites: "Basic understanding of business processes recommended", // Used in: Course details
    certification: "SAP Certified Application Associate", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "SAP FICO Consultant",
      "SAP MM Consultant",
      "SAP SD Consultant",
      "SAP Functional Consultant",
      "SAP Implementation Specialist",
      "SAP Business Analyst",
      "ERP Consultant",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Best SAP Course in {city}",
      subtitle: "Get Certified with the best SAP training institute in {city}",
      description:
        "Grow Your Career with the Best SAP Course in {city}. Accelerate your professional journey with our industry-leading SAP training in {city}, featuring specialized courses in SAP FICO, SAP MM, and SAP SD. Our comprehensive and hands-on training program is designed to build deep expertise in core SAP modules like Financial Accounting, Materials Management, and Sales & Distribution. Whether you're a fresher or a working professional, we'll help you land your dream job in top MNCs.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "SAP Training Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why SAP Course in {city}?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">SAP</span>?',
          content:
            "SAP (Systems, Applications, and Products) is the best enterprise resource planning (ERP) software that helps companies across the world to manage and streamline business processes in various departments like finance, supply chain, sales, and human resources. By integrating data and workflows, SAP enables companies to operate more efficiently and make data-driven decisions. If you're looking to build a career in SAP, our SAP course in {city} provides hands-on training and in-depth knowledge of key SAP modules to help you excel in the dynamic world of ERP.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">SAP consultant</span> do?',
          content:
            "A SAP Consultant helps businesses implement and manage SAP software solutions to streamline operations across various functions like finance,human resources, supply chain, and customer relationship management. Their role involves analyzing business requirements,configuring SAP modules,training users, and troubleshooting system issues to ensure efficient workflows.The salary of an SAP Consultant varies by experience and specialization. Entry-level consultants can earn around ₹4–6 lakhs per year, while experienced consultants with niche expertise can make ₹10–20 lakhs annually.",
        },
        {
          title:
            'Why Take <span class="highlight-span-cards">SAP Training in {city}?</span>',
          content:
            "A SAP Consultant must possess a diverse skill set to manage and optimize various SAP modules effectively. Our SAP course in {city} offers advanced  training in key SAP modules, preparing you to handle end-to-end SAP implementation, configuration, and support. You will gain hands-on experience to manage business processes, troubleshoot issues, and ensure smooth system functionality.Upon completing the course, you will be qualified to take on roles such as:",
          listItems: [
            "SAP FICO Consultant",
            "SAP MM Consultant",
            "SAP SD Consultant",
            "SAP Functional Consultant",
            "SAP Implementation Specialist",
          ],
        },
      ],
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "SAP Training Certificate",
      alt: "sap-training-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The Connecting Dots SAP Certification Course in {city} is designed to enhance your expertise in SAP systems and set you on the path to a successful career in ERP. Our program goes beyond theoretical learning, offering hands-on practical sessions and real-world scenarios across various SAP modules.",
      description:
        "With expert guidance and a focus on practical application, you'll be well-equipped to thrive in the dynamic world of SAP and meet the evolving needs of modern businesses.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for SAP Training in {city}?",
      paragraphs: [
        "At Connecting Dots ERP, we offer an industry-leading SAP course in {city} designed to equip you with the skills and expertise needed to thrive in today's dynamic business environment. With a focus on SAP FICO, SAP MM, and SAP SD, our comprehensive SAP training in {city} blends theoretical learning with real-time practical experience, enabling you to manage core business processes efficiently and drive organizational success.",
        "Our expert-led SAP classes in {city} are conducted by certified professionals with real-world experience. You'll receive personalized mentorship and hands-on exposure through dummy projects and case studies, giving you deep insights into the practical applications of SAP tools and modules.",
        "To ensure inclusivity, we offer flexible payment plans and financial assistance, making our SAP training in {city} accessible to learners from all backgrounds.",
        "Join the most trusted SAP classes in {city} and take the next step toward a successful career in ERP. With our proven track record and commitment to student success, Connecting Dots ERP is your gateway to top opportunities in the SAP ecosystem.",
      ],
      listItem1Header: "What makes our SAP training in {city} unique?",
      listItem1: [
        "In-depth curriculum covering key SAP modules",
        "Real-world business case study discussions",
        "Experienced SAP trainers & one-on-one mentorship",
        "Development of soft skills, including teamwork & communication",
        "100% placement assistance with resume building and interview preparation",
        "Strong industry connections to help you land your dream job",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question:
            "What is covered in the SAP training program at Connecting Dots ERP?",
          answer:
            "In our SAP training in {city}, you will gain advanced knowledge of key SAP modules such as SAP FICO, SAP MM, and SAP SD. You will learn to configure, implement, and support SAP systems, as well as optimize business processes using these modules. The program also includes hands-on training in system configuration, integration, data migration, reporting, and troubleshooting, ensuring that you are well-equipped for a career in SAP.",
        },
        {
          question: "Do you provide SAP certification in {city}?",
          answer:
            "Yes, we offer SAP certification in {city} as part of our training program. Upon successful completion of the SAP course, you will be ready to take the SAP certification exam. We provide all the necessary guidance and resources to help you prepare for the certification and achieve your professional SAP credentials.",
        },
        {
          question:
            "What makes Connecting Dots ERP a top SAP training institute in {city}?",
          answer:
            "Connecting Dots ERP is recognized as one of the best SAP training institutes in {city} due to our industry-focused curriculum, expert trainers, and hands-on learning approach. Our training programs are designed to provide practical exposure, real-world case studies, and personalized mentoring, making us a preferred choice for SAP aspirants looking to build a successful career in the SAP domain.",
        },
        {
          question: "How will the SAP course in {city} help me in my career?",
          answer:
            "The SAP course in {city} at Connecting Dots ERP is designed to make you job-ready by equipping you with the necessary technical skills and practical experience. Our SAP training includes real-world projects, case studies, and job placement assistance, ensuring that you are well-prepared for roles such as SAP FICO Consultant, SAP MM Consultant, SAP SD Consultant, and more. By completing the course, you'll be prepared to work in top organizations implementing and supporting SAP solutions.",
        },
        {
          question:
            "Is there placement assistance provided after completing the SAP training?",
          answer:
            "Yes, our SAP course in {city} includes placement assistance to help you secure a job after completing the training. We provide career support through job interview preparation, resume building, and connecting you with potential employers in the SAP industry. Our network of industry partners and placement support ensures that our students have a strong chance of landing their desired SAP roles.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SAP PP",
          description: "Learn PP from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PP icon",
        },
        {
          name: "SAP FICO",
          description: "Learn FICO from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP FICO icon",
        },
        {
          name: "SAP SD",
          description: "Learn SD from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SD icon",
        },
        {
          name: "SAP SUCCESSFACTOR",
          description: "Learn SUCCESSFACTOR from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SuccesFactor icon",
        },
        {
          name: "SAP ABAP",
          description: "Learn ABAP from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP ABAP icon",
        },
        {
          name: "SAP QM",
          description: "Learn QM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP QM icon",
        },
        {
          name: "SAP PS",
          description: "Learn PS from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PS icon",
        },
        {
          name: "SAP HR/HCM",
          description: "Learn HR/HCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HR/HCM icon",
        },
        {
          name: "SAP EWM",
          description: "Learn EWM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP EWM icon",
        },
        {
          name: "SAP SCM",
          description: "Learn SCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SCM icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "sap-abap": {
    // === BASIC COURSE INFO ===
    title: "SAP ABAP", // Used in: Page titles, headers, SEO
    fullTitle: "SAP Advanced Business Application Programming", // Used in: Page content, descriptions
    category: "sap", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sap-abap", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Learn SAP ABAP programming in {city} with our comprehensive course. Master Advanced Business Application Programming, custom reports, interfaces, and forms. Our SAP ABAP training in {city} offers hands-on experience, real-world projects, and 100% placement support to help you build a successful career as an SAP Technical Consultant.",
    metaTitle: "SAP ABAP Course in {city} | Best ABAP Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SAP ABAP in {city}. Expert-led programming training, certification, real-world projects & 100% placement. Launch your SAP technical career now!",

    // === COURSE DETAILS ===
    duration: "3-4 months", // Used in: Course summary section, page content
    price: { min: 45000, max: 130000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "ABAP Programming Fundamentals",
      "Data Dictionary & Database Access",
      "Reports & List Generation",
      "Forms & Interfaces",
      "Modularization Techniques",
      "Performance Analysis & Optimization",
      "Open SQL & Advanced Topics",
      "SAP Module Integration",
    ],
    prerequisites:
      "Basic programming knowledge and computer science background recommended", // Used in: Course details
    certification: "SAP Certified Development Associate - ABAP", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "SAP Technical Developer",
      "SAP ABAP Consultant",
      "SAP Application Programmer",
      "SAP Technical Consultant",
      "ABAP Developer",
      "SAP Systems Developer",
      "ERP Technical Specialist",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "SAP ABAP Course in {city}",
      subtitle: "Practical Based Job Oriented SAP Training in {city}",
      description:
        "The SAP ABAP Course in {city} focuses on learning Advanced Business Application Programming (ABAP), the programming language used for developing applications within the SAP environment. It covers key topics like reporting, interfaces, enhancements, and forms. Our SAP ABAP Training in {city} provides hands-on experience, preparing you for real-world SAP development projects and career opportunities in top companies.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "SAP ABAP Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          { type: "text", name: "location", placeholder: "Add your location" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why SAP ABAP ?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">SAP ABAP?</span>',
          content:
            "The SAP ABAP Course focuses on Advanced Business Application Programming, equipping students to create custom applications and reports in the SAP ERP system. This SAP ABAP training prepares graduates for careers as SAP Technical Consultants and ABAP Developers, emphasizing integration with various SAP modules.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">SAP ABAP Developer</span> do?',
          content:
            "An SAP ABAP Developer creates custom SAP applications, programs, and reports using the ABAP language. They work on developing and maintaining SAP modules, forms, and workflows. Join the best SAP ABAP Course in {city}.",
          listItems: [
            "Design and develop SAP applications.",
            "Customize and enhance existing SAP modules.",
            "Work on SAP workflows and reports.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">SAP ABAP</span> training?',
          content:
            "SAP ABAP Consultants are key to customizing SAP applications. Our SAP ABAP Certification Course in {city} highlights programming skills like report generation and data dictionary management for effective SAP solutions.",
          listItems: [
            "SAP Technical Developer",
            "SAP ABAP Consultant",
            "SAP Application Programmer",
          ],
        },
      ],
    },

    // Data for SapModComponent (course-specific syllabus)
    sapMod: {
      title2: '<span class="highlight-span-cards">Sap Abap</span> Syllabus',
      description: "Industry aligned Sap Abap syllabus with certification",
      summary:
        "An exhaustive Syllabus designed by our industry experts which will help you to get placed in your dream IT company",
      noteMaster: "We provide advanced Sap Abap training",
      noteAdvance: "Advance",
      features: [
        { label: "10+", description: "Tools" },
      ],
      overview: {
        title: "Syllabus Overview",
        modules: [
          {
            name: "ABAP Programming Fundamentals",

            subtopics: [
              "Introduction to ABAP",

              "ABAP Data Types and Variables",

              "Operators and Control Structures",

              "Internal Tables and Work Areas",

              "Loops and Modularization",

              "Debugging in ABAP",

              "ABAP Editor and Runtime Environment",

              "Best Practices in ABAP",
            ],
          },

          {
            name: "Data Dictionary & Database Access",

            subtopics: [
              "What is Data Dictionary",

              "Domains, Data Elements, and Tables",

              "Views and Search Helps",

              "Table Relationships & Foreign Keys",

              "Indexing and Buffering",

              "Database Table Maintenance",

              "Open SQL Basics",

              "Authorization Checks",
            ],
          },

          {
            name: "Reports & List Generation",

            subtopics: [
              "Classical Reports",

              "Interactive Reports",

              "ALV Reports (List Viewer)",

              "Events in Reporting",

              "Report Selection Screens",

              "User Interaction in Reports",

              "Nested Loops in Reports",

              "Performance in Large Reports",
            ],
          },

          {
            name: "Forms & Interfaces",

            subtopics: [
              "SAP Script Basics",

              "Smart Forms Overview",

              "Adobe Forms",

              "Form Layout Techniques",

              "Calling Forms from Programs",

              "Print Program Integration",

              "Interface Programming Concepts",

              "Data Transfer Between Systems",
            ],
          },

          {
            name: "Modularization Techniques",

            subtopics: [
              "Includes and Subroutines",

              "Function Modules",

              "Groups and Naming Conventions",

              "Parameter Passing Techniques",

              "RFC-enabled Function Modules",

              "Encapsulation and Code Reuse",

              "Enhancement Techniques",

              "BAdIs and User Exits",
            ],
          },

          {
            name: "Performance Analysis & Optimization",

            subtopics: [
              "Performance Bottlenecks",

              "Efficient Use of Internal Tables",

              "Index Optimization",

              "Use of Field Symbols and References",

              "Transaction SE30 and SAT",

              "Memory Management",

              "Code Inspector and SLIN",

              "Best Practices for Optimization",
            ],
          },

          {
            name: "Open SQL & Advanced Topics",

            subtopics: [
              "SELECT Statements in ABAP",

              "Inner and Outer Joins",

              "Nested Queries",

              "FOR ALL ENTRIES",

              "Open SQL vs Native SQL",

              "Data Locking Concepts",

              "Advanced Looping Logic",

              "Dynamic Programming",
            ],
          },

          {
            name: "SAP Module Integration",

            subtopics: [
              "Integration with MM Module",

              "Integration with SD Module",

              "Integration with FI Module",

              "Calling BAPIs and BADIs",

              "Cross-module Data Flow",

              "Function Module Interfaces",

              "IDocs and RFCs",

              "Practical Project Scenario",
            ],
          },
        ],
      },
      videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
      downloadLink:
        "https://drive.google.com/uc?export=download&id=1_1Gp0OYyasHmBmmMb4ydWYhCxiAC5tqB",
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "SAP ABAP CERTIFICATION",
      alt: "sap-abap-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "Master SAP ABAP (Advanced Business Application Programming) with our Advanced SAP ABAP certification. This program equips you with the skills to develop customized applications on the SAP platform",
      description:
        "Through hands-on training, you'll become proficient in ABAP programming, making you highly valuable in building, maintaining, and optimizing SAP systems for businesses.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for the SAP ABAP Course in {city} ?",
      paragraphs: [
        "We at Connecting Dots ERP provide a practical SAP ABAP Course in {city} that teaches you the programming language of SAP from the ground up. Everything from the fundamentals of ABAP code to building unique forms, reports, and apps that enhance business operations is covered in the course. Our SAP ABAP Training in {city} will provide you with the knowledge and abilities to create and modify SAP systems, which are utilized by leading businesses worldwide.",
        "We emphasize hands-on learning in our training, using real-world projects and scenarios to help you grasp how SAP ABAP works with other SAP modules, such as SAP SD (Sales & Distribution) and SAP MM (Materials Management). By working on real business problems and being exposed to real projects, you will gain practical experience and be prepared for the workforce upon completion.",
        "Our SAP ABAP Training in {city} includes professional direction from knowledgeable Trainers, assistance with 100% job Assistance, and globally recognized SAP certification because we are committed to seeing you succeed. Whether you opt for online or Classroom Training, our SAP ABAP course is meant to equip you with the knowledge and abilities needed to succeed in the SAP ABAP industry. With SAP training in {city} with placement, you can be assured of getting the right support to start your career in SAP.",
      ],
      listItem1Header: "What makes our SAP ABAP training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering ABAP programming fundamentals",
        "Real-world project experience with live business scenarios",
        "Expert trainers with extensive SAP technical consulting experience",
        "Hands-on practice with SAP development tools and environments",
        "100% placement assistance with interview preparation and resume building",
        "Industry-recognized certification to boost your technical credibility",
      ],
      listItemAfterIndex: 1, // Insert list after paragraph index 1
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Is there any support available after course completion?",
          answer:
            "Yes, we provide ongoing support for our students even after they complete the SAP ABAP Course in {city}. Our trainers remain available for queries and guidance, and we assist in connecting you with job opportunities that match your skills and career goals.",
        },
        {
          question:
            "What are the eligibility criteria for enrolling in the SAP ABAP course?",
          answer:
            "To enroll in the SAP ABAP Course in {city}, candidates should have a basic understanding of programming concepts and a degree in computer science, information technology, or a related field. However, we welcome individuals from diverse backgrounds who are eager to learn and develop their skills in SAP ABAP.",
        },
        {
          question:
            "Will I receive a certificate upon completing the SAP ABAP course?",
          answer:
            "Yes, upon successful completion of the SAP ABAP Certification Course, participants will receive an ISO certificate from Connecting Dots ERP. This certification demonstrates your proficiency in SAP ABAP and enhances your credibility in the job market.",
        },
        {
          question:
            "What kind of training does Connecting Dots ERP provide for SAP ABAP?",
          answer:
            "Connecting Dots ERP is recognized as the Best SAP training institute In {city}, offering Advanced courses in SAP ABAP. Our training covers various essential topics, including programming basics, report creation, and form design, equipping participants with the skills needed to leverage SAP ABAP effectively.",
        },
        {
          question:
            "What feedback have past students provided about the SAP ABAP training?",
          answer:
            "Past students have praised our SAP ABAP Course for its structured approach, Industry Expert trainers, and practical training methodology. Many have successfully transitioned into SAP ABAP roles and have expressed gratitude for the valuable skills and industry connections gained during their training at Connecting Dots ERP.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SAP HANA",
          description: "Learn HANA from scratch",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HANA icon",
        },
        {
          name: "SAP ARIBA",
          description: "Become a ARIBA expert",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP ARIBA icon",
        },
        {
          name: "SAP BW/BI",
          description: "Master BW/BI skills",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP BI icon",
        },
        {
          name: "SAP BASIS",
          description: "Learn BASIS from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP BASIS icon",
        },
        {
          name: "SAP FICO",
          description: "Learn FICO from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP FICO icon",
        },
        {
          name: "SAP MM",
          description: "Learn MM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP MM icon",
        },
        {
          name: "SAP SD",
          description: "Learn SD from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SD icon",
        },
        {
          name: "SAP HR/HCM",
          description: "Learn HR/HCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HR/HCM icon",
        },
        {
          name: "SAP PM",
          description: "Learn PM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PM icon",
        },
        {
          name: "SAP SCM",
          description: "Learn SCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SCM icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "sap-ariba": {
    // === BASIC COURSE INFO ===
    title: "SAP Ariba", // Used in: Page titles, headers, SEO
    fullTitle: "SAP Ariba Procurement and Supply Chain Management", // Used in: Page content, descriptions
    category: "sap", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sap-ariba", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master SAP Ariba procurement and supply chain management in {city} with our comprehensive course. Learn sourcing, contract management, supplier collaboration, and spend analysis. Our SAP Ariba training in {city} offers hands-on experience, real-world projects, and 100% placement support to help you build a successful career in procurement.",
    metaTitle:
      "SAP Ariba Course in {city} | Best Procurement Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SAP Ariba in {city}. Expert-led procurement training, certification, real-world projects & 100% placement. Launch your supply chain career now!",

    // === COURSE DETAILS ===
    duration: "6-8 weeks", // Used in: Course summary section, page content
    price: { min: 40000, max: 110000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "SAP Ariba Procurement",
      "Sourcing Solutions",
      "Contract Management",
      "Supplier Lifecycle Management",
      "Spend Analysis & Reporting",
      "Supplier Collaboration",
      "Advanced Analytics",
      "Cloud-based Integration",
    ],
    prerequisites:
      "Basic understanding of procurement and supply chain processes recommended", // Used in: Course details
    certification: "SAP Certified Application Associate - Ariba", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "SAP Ariba Consultant",
      "Procurement Specialist",
      "Supply Chain Analyst",
      "Contract Manager",
      "Supplier Relationship Manager",
      "Procurement Analyst",
      "Strategic Sourcing Specialist",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "SAP Ariba Course in {city}",
      subtitle:
        "Learn SAP Ariba with our Expert trainers to get a Salary hike.",
      description:
        "Embark on a journey toward a successful career with our SAP Ariba Course in {city}. Tailored for newcomers and experienced professionals alike, this program offers an extensive syllabus designed to make you proficient in SAP Ariba. From gaining expertise in procurement and sourcing solutions to mastering supplier management and advanced analytics, this course equips you with the hands-on skills needed to thrive in the field.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "SAP Ariba Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          { type: "text", name: "location", placeholder: "Add your location" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why SAP Ariba ?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">SAP Ariba?</span>',
          content:
            "SAP Ariba is a leading cloud-based solution designed to streamline procurement and supply chain processes for businesses. It connects buyers and suppliers on a global platform, offering tools to simplify sourcing, contract management, supplier collaboration, and spend analysis. SAP Ariba empowers organizations to optimize their procurement operations, enhance supplier relationships, and achieve cost savings. Our SAP Ariba Course in {city} is the perfect starting point for building expertise in this cutting-edge platform. The program covers essential modules such as procurement processes, supplier management, contract handling, and advanced reporting. Designed for both beginners and professionals, the course emphasizes hands-on learning through real-world projects and scenarios.",
        },
        {
          title:
            'What do <span class="highlight-span-cards">SAP Ariba Consultants</span> do?',
          content:
            "SAP Ariba professionals are key players in optimizing business procurement and supply chain activities. They manage sourcing events, negotiate contracts, collaborate with suppliers, and ensure seamless integration of procurement solutions. These experts utilize tools like spend analytics, supplier management systems, and cloud-based platforms to enhance operational efficiency and cost-effectiveness. By mastering SAP Ariba, professionals help businesses make data-driven decisions, streamline processes, and improve supplier relationships. Enrolling in an SAP Ariba training in {city} equips you with the practical skills to excel in this role, giving you a strong foundation to succeed in a rapidly evolving industry.",
        },
        {
          title:
            'Why should you take <span class="highlight-span-cards">SAP Ariba</span> training?',
          content:
            "Taking SAP Ariba Training in {city} is essential for anyone looking to excel in procurement and supply chain management. As businesses increasingly adopt digital platforms to streamline operations, expertise in SAP Ariba opens up diverse career opportunities. The training provides in-depth knowledge of procurement processes, supplier collaboration, and data-driven decision-making, preparing you to meet industry demands. Our SAP Ariba Course in {city} offers comprehensive, hands-on training designed to prepare you for real-world challenges. You'll work on live projects, explore advanced tools, and gain expertise in managing procurement lifecycles. This training not only boosts your confidence but also enhances your career prospects, making you a sought-after professional in a growing industry.",
        },
      ],
    },

    // Data for SapModComponent (course-specific syllabus)
    sapMod: {
      title2: '<span class="highlight-span-cards">SAP Ariba</span> Syllabus',
      description: "Industry aligned SAP Ariba syllabus with certification",
      summary:
        "An exhaustive Syllabus designed by our industry experts which will help you to get placed in your dream IT company",
      noteMaster: "We provide advanced Sap Ariba training",
      noteAdvance: "Ariba",
      features: [
        { label: "10+", description: "Tools" },
      ],
      overview: {
        title: "Syllabus Overview",
        modules: [
          {
            name: "SAP Ariba Procurement",

            subtopics: [
              "Introduction to SAP Ariba",

              "Procure-to-Pay Overview",

              "Requisition & Purchase Order Creation",

              "Catalog Management",

              "Invoice Management",

              "Supplier Enablement",

              "Compliance & Policy Enforcement",

              "Integration with ERP Systems",
            ],
          },

          {
            name: "Sourcing Solutions",

            subtopics: [
              "Sourcing Project Lifecycle",

              "Event Creation (RFI, RFP, Auctions)",

              "Bid Analysis & Scoring",

              "Awarding & Contracting",

              "Supplier Invitations",

              "Template Configuration",

              "Collaboration and Messaging",

              "Best Practices for Sourcing",
            ],
          },

          {
            name: "Contract Management",

            subtopics: [
              "Contract Workspace Setup",

              "Contract Authoring Tools",

              "Clause Library & Templates",

              "Approval Workflows",

              "Contract Execution & Signatures",

              "Amendments & Renewals",

              "Audit Trails & Versioning",

              "ERP Integration for Contracts",
            ],
          },

          {
            name: "Supplier Lifecycle Management",

            subtopics: [
              "Supplier Onboarding",

              "Qualification & Risk Assessment",

              "Supplier Performance Evaluation",

              "Supplier Hierarchies",

              "Data Maintenance & Validation",

              "Supplier Certification",

              "Monitoring & Alerts",

              "Collaboration via Ariba Network",
            ],
          },

          {
            name: "Spend Analysis & Reporting",

            subtopics: [
              "Data Extraction & Enrichment",

              "Classification of Spend",

              "Spend Visibility Dashboards",

              "Savings Opportunity Identification",

              "KPIs and Benchmarking",

              "Category Spend Reports",

              "Drill-Down & Filtering",

              "Exporting & Sharing Reports",
            ],
          },

          {
            name: "Supplier Collaboration",

            subtopics: [
              "Ariba Network Overview",

              "Order Confirmation & ASN",

              "Invoice Submission",

              "Dispute Resolution",

              "Performance Feedback Loop",

              "Portal Training for Suppliers",

              "Message Monitoring",

              "Collaboration Best Practices",
            ],
          },

          {
            name: "Advanced Analytics",

            subtopics: [
              "Using Ariba Analytical Reporting",

              "Custom Reports & Queries",

              "Dashboards & Visualization Tools",

              "Predictive Spend Analysis",

              "Data Cube Navigation",

              "AI/ML Use Cases",

              "KPIs and Metrics Setup",

              "Export & Scheduling Options",
            ],
          },

          {
            name: "Cloud-based Integration",

            subtopics: [
              "Integration Overview",

              "Ariba Cloud Integration Gateway (CIG)",

              "IDoc/XML/CSV Formats",

              "ERP (SAP ECC/S4HANA) Integration",

              "Master & Transactional Data Sync",

              "Middleware (CPI/PI) Usage",

              "Error Handling & Monitoring",

              "Security & Authentication",
            ],
          },
        ],
      },
      videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
      downloadLink:
        "https://drive.google.com/uc?export=download&id=1_1Gp0OYyasHmBmmMb4ydWYhCxiAC5tqB",
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "SAP ARIBA CERTIFICATION",
      alt: "sap-ariba-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The Connecting Dots ERP Certification holds immense value in elevating your expertise and setting you on the path to a successful career as an SAP Ariba professional. Our SAP Ariba certification program goes beyond theoretical knowledge, combining hands-on practical sessions with real-world scenarios.",
      description:
        "Additionally, we focus on grooming you to adapt and excel in the dynamic role of SAP Ariba personnel, ensuring you're well-prepared for the evolving corporate landscape. Enroll in our SAP Ariba certification in {city} to gain the skills and confidence to thrive in the competitive world of procurement and supply chain management.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for SAP Ariba Training in {city}?",
      paragraphs: [
        "Connecting Dots ERP offers an SAP Ariba Course in {city} with Placement, specifically designed to prepare you for a thriving career in procurement and supply chain management. Our industry-focused curriculum covers essential SAP Ariba modules, including sourcing, procurement, contract management, supplier lifecycle management, and advanced analytics. This comprehensive training equips you with the expertise to streamline business processes and optimize supply chain operations effectively.",
        "Expert Faculty: Learn from seasoned SAP professionals with extensive industry experience. Our trainers provide personalized guidance to help you master SAP Ariba tools and strategies aligned with current industry demands, ensuring you gain in-depth knowledge and practical skills.",
        "Hands-On Learning: At Connecting Dots ERP, we prioritize practical learning. Our SAP Ariba Course in {city} includes real-world projects, case studies, and simulations that give you hands-on experience with the platform. You'll gain confidence in implementing solutions that improve procurement efficiency and deliver measurable results.",
        "Flexible Learning Options: We offer both online and classroom-based training to cater to your learning preferences. Whether you're a working professional or a full-time student, our flexible options ensure you can upskill without disrupting your schedule.",
        "Job Placement Assistance: Our dedicated placement support team collaborates with top companies to help you secure rewarding job opportunities. From resume-building workshops to mock interviews and career counseling, we provide comprehensive support to launch your career. With our SAP Ariba Course in {city} with Placement, you'll be job-ready upon course completion.",
      ],
      listItem1Header: "Key Benefits of Our SAP Ariba Course:",
      listItem1: [
        "Advanced Syllabus: Gain expertise in sourcing, procurement, supplier management, and advanced analytics with a focus on real-world applications.",
        "Industry-Relevant Skills: Learn how to enhance supply chain operations, improve supplier collaboration, and drive cost efficiency.",
        "Recognized Certification: Receive a certification that highlights your SAP Ariba proficiency and enhances your resume.",
        "Networking Opportunities: Connect with industry experts, trainers, and peers to build a strong professional network.",
        "Continuous Learning: Stay updated with advanced workshops and industry trends to maintain a competitive edge.",
      ],
      listItemAfterIndex: 4, // Insert list after paragraph index 4
      paragraphsAfterList: [
        "Take the next step toward becoming an SAP Ariba expert. Join our SAP Ariba Training in {city} to gain the skills, confidence, and placement support required to excel in this high-demand field. Contact us now for details about course fees, upcoming batches, and enrollment options.",
      ],
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Which is the best SAP Ariba training institute in {city}?",
          answer:
            "Connecting Dots ERP is one of the best institutes for learning SAP Ariba course in {city}, offering an industry-aligned curriculum and hands-on training to help you master procurement processes and excel in your career.",
        },
        {
          question: "What are the prerequisites to learn the SAP Ariba course?",
          answer:
            "No specific prerequisites are required to join the SAP Ariba course in {city}. Whether you're a fresher or a professional in procurement, supply chain, or related fields, you can enroll and start your learning journey.",
        },
        {
          question:
            "How does your SAP Ariba training course help me get a job?",
          answer:
            "Our SAP Ariba course in {city} equips you with practical skills, real-world project experience, and interview preparation support, making you job-ready and confident to pursue roles in procurement and supply chain management.",
        },
        {
          question:
            "What is the duration of the SAP Ariba online training in {city}?",
          answer:
            "The SAP Ariba course duration typically ranges from 6 to 8 weeks, with flexible schedules to accommodate both working professionals and students in {city}.",
        },
        {
          question:
            "Does Connecting Dots provide placement assistance for the SAP Ariba course?",
          answer:
            "Absolutely! We offer placement support, including resume building, interview preparation, and connections with hiring companies, ensuring you secure the best opportunities after completing your SAP Ariba course in {city}.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SAP HANA",
          description: "Learn HANA from scratch",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HANA icon",
        },
        {
          name: "SAP ARIBA",
          description: "Become a ARIBA expert",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP ARIBA icon",
        },
        {
          name: "SAP BW/BI",
          description: "Master BW/BI skills",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP BI icon",
        },
        {
          name: "SAP BASIS",
          description: "Learn BASIS from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP BASIS icon",
        },
        {
          name: "SAP FICO",
          description: "Learn FICO from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP FICO icon",
        },
        {
          name: "SAP MM",
          description: "Learn MM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP MM icon",
        },
        {
          name: "SAP SD",
          description: "Learn SD from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SD icon",
        },
        {
          name: "SAP HR/HCM",
          description: "Learn HR/HCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HR/HCM icon",
        },
        {
          name: "SAP PM",
          description: "Learn PM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PM icon",
        },
        {
          name: "SAP SCM",
          description: "Learn SCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SCM icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "sap-basis": {
    // === BASIC COURSE INFO ===
    title: "SAP BASIS", // Used in: Page titles, headers, SEO
    fullTitle: "SAP Business Application Software Integrated Solutions", // Used in: Page content, descriptions
    category: "sap", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sap-basis", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master SAP BASIS system administration in {city} with our comprehensive course. Learn system installation, configuration, user management, and performance monitoring. Our SAP BASIS training in {city} offers hands-on experience, real-world projects, and 100% placement support to help you build a successful career as an SAP System Administrator.",
    metaTitle:
      "SAP BASIS Course in {city} | Best System Administration Training", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SAP BASIS in {city}. Expert-led system administration training, certification, real-world projects & 100% placement. Launch your SAP career now!",

    // === COURSE DETAILS ===
    duration: "3-4 months", // Used in: Course summary section, page content
    price: { min: 50000, max: 140000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "SAP R/3 Architecture",
      "System Installation & Configuration",
      "Client Administration",
      "User Management & Authorization",
      "Background Jobs & Processing",
      "Transport Management System (TMS)",
      "System Monitoring & Performance",
      "Patch Administration & Upgrades",
    ],
    prerequisites:
      "Basic system administration knowledge and understanding of IT infrastructure recommended", // Used in: Course details
    certification: "SAP Certified Technology Associate - System Administration", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "SAP NetWeaver Administrator",
      "SAP System Administrator",
      "SAP BASIS Consultant",
      "SAP Technical Consultant",
      "SAP Infrastructure Specialist",
      "SAP Systems Analyst",
      "ERP System Administrator",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "SAP BASIS Course in {city}",
      subtitle: "Practical Based Job Oriented SAP Training in {city}",
      description:
        "The goal of the SAP BASIS Course in {city} is to give students a thorough understanding of the SAP BASIS, or Business Application Software Integrated Solution, which is an essential part of the SAP system for system management and administration. It addresses important subjects including transport management, system configuration, user administration, and system monitoring. Our SAP BASIS Course in {city} guarantees practical experience, readying you for prospects for professional advancement in prestigious SAP-based companies as well as real-world issues.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "SAP BASIS Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          { type: "text", name: "location", placeholder: "Add your location" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why SAP BASIS ?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">SAP BASIS?</span>',
          content:
            "The SAP BASIS Course in {city} prepares students to manage and maintain SAP systems by emphasizing Business Application Software Integrated Solutions (BASIS), which is the technical foundation that enables SAP applications to function efficiently. With a focus on system integration, performance monitoring, and troubleshooting inside SAP settings, this SAP BASIS Training prepares graduates for positions like SAP System Administrators and SAP BASIS Consultants.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">SAP BASIS Administrator</span> do?',
          content:
            "A SAP BASIS Administrator manages the SAP environment, including installation, configuration, and maintenance of SAP servers and applications.",
          listItems: [
            "Install and configure SAP systems.",
            "Manage system upgrades and patches.",
            "Monitor system performance and troubleshoot issues.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">SAP BASIS</span> training?',
          content:
            "For SAP applications to operate well and be customized, SAP BASIS Administrators are necessary. Technical skills like system installation, upgrades, performance optimization, and disaster recovery management are highlighted in our SAP BASIS Certification Training in {city} to guarantee optimal SAP system functionality.",
          listItems: [
            "SAP NetWeaver Administrator",
            "SAP System Administrator",
            "SAP BASIS Consultant",
          ],
        },
      ],
    },

    // Data for SapModComponent (course-specific syllabus)
    sapMod: {
      title2: '<span class="highlight-span-cards">SAP Basis</span> Syllabus',
      description: "Industry aligned SAP Basis syllabus with certification",
      summary:
        "An exhaustive Syllabus designed by our industry experts which will help you to get placed in your dream IT company",
      noteMaster: "We provide advanced SAP Basis training",
      noteAdvance: "Advance",
      features: [
        { label: "10+", description: "Tools" },
      ],
      overview: {
        title: "Syllabus Overview",
        modules: [
          {
            name: "SAP R/3 Architecture",

            subtopics: [
              "Three-Tier Architecture Overview",

              "Presentation, Application & Database Layers",

              "Dispatcher & Work Processes",

              "Client-Server Concept",

              "RFC Communication",

              "SAP Kernel & Instance Structure",

              "System Landscape Concepts",

              "Integration with External Systems",
            ],
          },

          {
            name: "System Installation & Configuration",

            subtopics: [
              "SAP S/4HANA & ECC Installation Overview",

              "Media Preparation & Installation Tools",

              "SWPM & SUM Tools",

              "Initial Configuration Tasks",

              "Post-Installation Activities",

              "Profile Parameters Setup",

              "Installation Logs & Troubleshooting",

              "Add-On Installation",
            ],
          },

          {
            name: "Client Administration",

            subtopics: [
              "Creating & Managing Clients",

              "Client Copy (Local, Remote, Export/Import)",

              "Client Deletion & Protection",

              "Client-Specific vs Cross-Client Settings",

              "Client Role Types",

              "Client-Specific Transport",

              "Logical System Assignment",

              "System Refresh Concepts",
            ],
          },

          {
            name: "User Management & Authorization",

            subtopics: [
              "User Types & Creation",

              "Authorization Objects",

              "Role Maintenance (PFCG)",

              "Profile Generation",

              "SU01, SU10, SUIM Transactions",

              "Authorization Checks & Logs",

              "User Groups & Parameters",

              "Audit & Compliance Tools",
            ],
          },

          {
            name: "Background Jobs & Processing",

            subtopics: [
              "Job Scheduling with SM36",

              "Job Monitoring with SM37",

              "Job Classes & Prioritization",

              "Periodic vs Event-Driven Jobs",

              "Spool Management",

              "Handling Long-Running Jobs",

              "Batch Input Sessions",

              "Job Logs & Error Analysis",
            ],
          },

          {
            name: "Transport Management System (TMS)",

            subtopics: [
              "TMS Configuration Steps",

              "Transport Routes (Single/Multisystem)",

              "Creating & Releasing Transports",

              "Import Queues & Scheduling",

              "Transport Logs & History",

              "Transport Directory Structure",

              "Cross-Client Transport Restrictions",

              "Handling Transport Errors",
            ],
          },

          {
            name: "System Monitoring & Performance",

            subtopics: [
              "CCMS Monitoring",

              "Workload Analysis (ST03N)",

              "Database Performance Tuning",

              "Memory & Buffer Monitoring",

              "EarlyWatch Alert",

              "Application Log Monitoring (SLG1)",

              "Custom Alerts & Thresholds",

              "Root Cause Analysis (RCA)",
            ],
          },

          {
            name: "Patch Administration & Upgrades",

            subtopics: [
              "SAP Kernel Patch Upgrade",

              "Applying SAP Notes (SNOTE)",

              "SPAM/SAINT Usage",

              "Support Package Stacks",

              "SUM Tool for Upgrades",

              "Pre- & Post-Upgrade Steps",

              "Downtime Minimization Techniques",

              "Version Compatibility Checks",
            ],
          },
        ],
      },
      videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
      downloadLink:
        "https://drive.google.com/uc?export=download&id=1R5G-UwtDNg3hCOfHl9hCpbrA6kunyg6V",
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "SAP BASIS CERTIFICATION",
      alt: "sap-basis-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "SAP BASIS is the core technical foundation of SAP systems, and our certification covers all aspects of system administration. Learn to install, configure, and maintain SAP systems, ensuring optimal performance.",
      description:
        "Your in-depth knowledge in SAP Basis ensures robust system administration and configuration, paving the way for a successful career in SAP management.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for the SAP BASIS Course in {city} ?",
      paragraphs: [
        "At Connecting Dots ERP, we provide a practical SAP BASIS Course in {city} that covers all key aspects of SAP system administration, from installation and configuration to user and transport management. Our course will teach you how to manage SAP systems efficiently, ensuring their reliability, security, and optimal performance in a business environment.",
        "We emphasize hands-on learning, using real-world scenarios and projects to give you a deep understanding of how SAP BASIS integrates with other modules like Financial Accounting (FI) and Sales & Distribution (SD). With real-time project experience, you'll be equipped with the practical skills to manage large-scale SAP systems in real-world corporate settings.",
        "Our SAP BASIS Training in {city} includes professional guidance from experienced trainers, 100% job placement assistance, and globally recognized certification. Whether you choose online or in-person learning, our course is structured to provide you with the knowledge and skills needed for success in the SAP BASIS domain. With SAP BASIS training in {city} with placement, you'll receive the support necessary to jumpstart your career in SAP system administration.",
      ],
      listItem1Header: "What makes our SAP BASIS training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering all aspects of SAP system administration",
        "Real-world project experience with live SAP environments",
        "Expert trainers with extensive SAP BASIS consulting experience",
        "Hands-on practice with system installation, configuration, and maintenance",
        "100% placement assistance with interview preparation and resume building",
        "Industry-recognized certification to boost your technical credibility",
      ],
      listItemAfterIndex: 1, // Insert list after paragraph index 1
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question:
            "What job roles can I pursue after completing the SAP BASIS Course in {city}?",
          answer:
            "Careers as a SAP System Consultant, SAP BASIS Administrator, and SAP NetWeaver Administrator are available to graduates of the SAP BASIS Course in {city}.",
        },
        {
          question:
            "Can I get placement assistance after completing the SAP BASIS Course in {city}?",
          answer:
            "Yes, Connecting Dots ERP offers 100% placement assistance after completing the SAP BASIS Course in {city}, helping you secure roles in top SAP-based organizations.",
        },
        {
          question: "What is a Transport Management System (TMS) in SAP BASIS?",
          answer:
            "SAP BASIS specialists utilize the Transport Management System (TMS) to coordinate system updates and move data between development, testing, and production environments.",
        },
        {
          question: "How does SAP BASIS interact with SAP NetWeaver?",
          answer:
            "The SAP NetWeaver platform is managed by SAP BASIS specialists, who make sure it efficiently supports business activities and connects with other SAP modules.",
        },
        {
          question:
            "What support can I expect from trainers during the SAP BASIS Training in {city}?",
          answer:
            "In-depth Training, practical learning opportunities, and real-world scenarios are all provided by our knowledgeable educators to make sure you get the skills required for a prosperous career in SAP BASIS.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SAP HANA",
          description: "Learn HANA from scratch",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HANA icon",
        },
        {
          name: "SAP ARIBA",
          description: "Become a ARIBA expert",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP ARIBA icon",
        },
        {
          name: "SAP BW/BI",
          description: "Master BW/BI skills",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP BI icon",
        },
        {
          name: "SAP ABAP",
          description: "Learn ABAP from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP ABAP icon",
        },
        {
          name: "SAP FICO",
          description: "Learn FICO from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP FICO icon",
        },
        {
          name: "SAP MM",
          description: "Learn MM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP MM icon",
        },
        {
          name: "SAP SD",
          description: "Learn SD from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SD icon",
        },
        {
          name: "SAP HR/HCM",
          description: "Learn HR/HCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HR/HCM icon",
        },
        {
          name: "SAP PM",
          description: "Learn PM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PM icon",
        },
        {
          name: "SAP SCM",
          description: "Learn SCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SCM icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "sap-bwbi": {
    // === BASIC COURSE INFO ===
    title: "SAP BI", // Used in: Page titles, headers, SEO
    fullTitle: "SAP Business Warehouse / Business Intelligence", // Used in: Page content, descriptions
    category: "sap", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sap-bwbi", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master SAP BW/BI in {city} with our expert-led course. Gain in-depth understanding of data warehousing, business intelligence, and reporting tools within the SAP ecosystem. Our SAP BI/BW training in {city} offers hands-on expertise, real-time projects, and 100% placement support to help you build a successful career in data analytics.",
    metaTitle:
      "SAP BW/BI Course in {city} | Top Business Intelligence Training", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SAP BW/BI in {city}. Expert-led training in data warehousing, BI, and reporting. Certification, real-time projects & 100% placement. Launch your data analytics career now!",

    // === COURSE DETAILS ===
    duration: "6-8 weeks", // Used in: Course summary section, page content (from FAQ)
    price: { min: 40000, max: 120000 }, // Used in: JSON-LD "@type":"PriceSpecification" (Estimated)
    modules: [
      // Used in: Course summary, keywords generation, page content (listing core SAP BW/BI topics)
      "SAP BW Data Warehousing",
      "Data Modeling in BW",
      "Data Extraction, Transformation, Loading (ETL)",
      "BEx Query Designer",
      "Analysis Process Designer (APD)",
      "Web Application Designer (WAD)",
      "SAP BusinessObjects Integration",
      "Performance Optimization in BW/BI",
    ],
    prerequisites:
      "Foundational knowledge of data analysis and familiarity with basic database concepts recommended", // Used in: Course details (from FAQ)
    certification: "SAP Certified Application Associate - Business Warehouse", // Used in: Course details, JSON-LD (Standard SAP BW certification)
    jobRoles: [
      // Used in: Keywords generation, career section, page content (from FAQ & general knowledge)
      "SAP BI Consultant",
      "Data Warehouse Developer",
      "Business Intelligence Analyst",
      "Reporting Specialist",
      "SAP BW Developer",
      "Data Analyst",
      "ETL Developer",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "SAP BI Course in {city}",
      subtitle: "Practical Based Job Oriented SAP Training in {city}",
      description:
        "The SAP BW/BI Course in {city} at Connecting Dots ERP is designed to help you maximize your SAP BW/BI implementation. This course provides an in-depth understanding of operations and Info Providers while focusing on optimizing data load performance and query execution. Enroll now in our SAP BI/BW Classroom Training in {city} and SAP BI/BW Online Training to gain hands-on expertise and enhance your data management skills.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "SAP BI Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          { type: "text", name: "location", placeholder: "Add your location" }, // Added missing location field
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why SAP BI ?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">SAP BI?</span>',
          content:
            "The foundation of SAP's analytics and reporting solutions is its Business Warehouse (BW) and Business Intelligence (BI). Organizations may combine, examine, and visualize data from several sources using SAP BW/BI, turning it into insightful information for decision-making. It entails data modeling, data extraction, and report generation, giving users the means to produce detailed business dashboards and reports.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">SAP BI Consultant</span> do?',
          content:
            "A SAP BI Consultant designs, develops, and implements BI solutions using SAP tools. They work on data modeling, reporting, and analytics.",
          listItems: [
            "Develop and implement SAP BI solutions.",
            "Perform data extraction, transformation, and loading (ETL).",
            "Create reports and dashboards for business analysis.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">SAP BI</span> training?',
          content:
            "Training in SAP BW/BI is essential for professionals looking to harness the power of data for strategic decision-making. The SAP BW/BI Certification Course in {city} equips participants with skills in data warehousing, reporting, and analytics, enabling them to create efficient data models and insightful reports.",
          listItems: [
            "SAP BW/BI Consultant",
            "Business Intelligence Analyst", // Corrected typo
            "Data Warehouse Developer",
          ],
        },
      ],
    },

    // Data for SapModComponent (course-specific syllabus)
    sapMod: {
      title2: '<span class="highlight-span-cards">SAP BI</span> Syllabus',
      description: "Industry aligned SAP BW/BI syllabus with certification",
      summary:
        "An exhaustive Syllabus designed by our industry experts which will help you to get placed in your dream IT company",
      noteMaster: "We provide advanced SAP BI training",
      noteAdvance: "Advance", // Matches provided
      features: [
        { label: "10+", description: "Tools" },
      ],
      overview: {
        title: "Syllabus Overview",
        // These modules are as provided by the user, acknowledging they are more generic BI topics.
        modules: [
          {
            name: "SAP BW Data Warehousing",

            subtopics: [
              "Overview of SAP BW Architecture",

              "Data Warehousing Concepts",

              "InfoObjects and InfoProviders",

              "DataStore Objects (DSOs)",

              "MultiProviders & CompositeProviders",

              "Data Flow Management",

              "OLAP Engine Concepts",

              "Integration with SAP ERP",
            ],
          },

          {
            name: "Data Modeling in BW",

            subtopics: [
              "Star Schema and Extended Star Schema",

              "InfoCubes & DSOs",

              "Characteristics & Key Figures",

              "Data Modeling Tools",

              "Hierarchies and Attributes",

              "Aggregation & Indexing",

              "Semantic Partitioning",

              "Best Practices in Modeling",
            ],
          },

          {
            name: "Data Extraction, Transformation, Loading (ETL)",

            subtopics: [
              "Overview of ETL in SAP BW",

              "Source System Configuration",

              "DataSources and Transfer Rules",

              "Transformation & Routines",

              "Loading with InfoPackages",

              "Process Chains Setup",

              "Delta Mechanisms",

              "Monitoring & Error Handling",
            ],
          },

          {
            name: "BEx Query Designer",

            subtopics: [
              "BEx Query Design Basics",

              "Structures and Variables",

              "Filters and Restricted Key Figures",

              "Calculated Key Figures",

              "Conditions and Exceptions",

              "Drilldown and Navigation",

              "Query Views and Workbooks",

              "Performance Optimization Tips",
            ],
          },

          {
            name: "Analysis Process Designer (APD)",

            subtopics: [
              "Purpose of APD in BW",

              "Creating Analysis Processes",

              "Data Sources for APD",

              "Transformations in APD",

              "Result Targets and Outputs",

              "Linking to Data Mining",

              "Use Cases for APD",

              "Performance Monitoring",
            ],
          },

          {
            name: "Web Application Designer (WAD)",

            subtopics: [
              "Introduction to WAD",

              "Layout and Templates",

              "Embedding BEx Queries",

              "Chart and Table Design",

              "Adding Navigation Blocks",

              "Custom JavaScript Enhancements",

              "Publishing to Portal",

              "Tips for Responsive Design",
            ],
          },

          {
            name: "SAP BusinessObjects Integration",

            subtopics: [
              "Overview of BOBJ Suite",

              "Crystal Reports Integration",

              "Web Intelligence (WebI)",

              "Analysis for Office",

              "Universe Design for BW",

              "BOBJ on BW Live Connection",

              "Authentication & SSO Setup",

              "Dashboards and Mobile Reporting",
            ],
          },

          {
            name: "Performance Optimization in BW/BI",

            subtopics: [
              "Partitioning and Aggregates",

              "Compression and Indexing",

              "Query Optimization Techniques",

              "Read Modes and OLAP Cache",

              "DB Statistics and Tuning",

              "Data Volume Management",

              "Process Chain Tuning",

              "Monitoring with ST03N and RSRV",
            ],
          },
        ],
      },
      videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
      downloadLink:
        "https://drive.google.com/file/d/SAPFICO_BrochureLink/view?usp=sharing", // As provided, might need update
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "SAP BW/BI CERTIFICATION",
      alt: "sap-bwbi-certification-from-connecting-dots-erp", // Corrected alt
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "With our SAP BW/BI certification, you'll acquire the skills to work with Business Warehouse and Business Intelligence tools",
      description:
        "Learn how to gather, analyze, and report on business data, helping organizations make informed decisions. This hands-on program ensures you can transform raw data into valuable insights.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for the SAP BW/BI Course in {city} ?",
      paragraphs: [
        "We at Connecting Dots ERP provide a thorough SAP BW/BI Course in {city} with an emphasis on hands-on training and real-world applications. We make sure you have a solid understanding of the tools and procedures utilized in the business by covering all the important facets of SAP BW/BI in our program, including data extraction, transformation, and reporting.",
        "We focus on hands-on training, allowing you to work on live projects and case studies that mirror real business scenarios. This approach not only enhances your learning experience but also prepares you for the workforce by building your practical skills.",
        "Our SAP course is taught by Industry expert Trainers with 10+ years of top MNC experience who bring a wealth of industry knowledge to the classroom. After completing the course, we also offer 100% placement support and a worldwide recognized credential. Our Syllabus is designed to give you the skills necessary to succeed in the SAP BW/BI Course, whether you prefer online SAP BW/BI Training or SAP BW/BI Classroom Training. You may successfully start your career in business intelligence and data analytics with our committed support.",
      ],
      listItem1Header: "What makes our SAP BW/BI training in {city} unique?", // Added header for consistency
      listItem1: [
        "Comprehensive curriculum covering data extraction, transformation, and reporting",
        "Hands-on experience with real-world projects and case studies",
        "Taught by industry expert trainers with extensive MNC experience",
        "100% placement support and career guidance",
        "Flexible learning options: online and classroom training",
        "Globally recognized certification upon completion",
      ],
      listItemAfterIndex: 1, // Insert list after paragraph index 1 (Adjusted based on standard length)
      paragraphsAfterList: [], // No additional paragraphs after the list (as per previous patterns)
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "How is the SAP BW/BI training structured?",
          answer:
            "Our SAP BW/BI training in {city} is structured to combine theoretical concepts with practical hands-on experience. This includes live projects, case studies, and interactive sessions to ensure a complete understanding of BW/BI applications.",
        },
        {
          question:
            "What career opportunities are available after completing the SAP BW/BI course?",
          answer:
            "Graduates can explore various career paths, including SAP BI Consultant, Data Warehouse Developer, Business Intelligence Analyst, and Reporting Specialist. These roles involve analyzing data, creating reports, and providing insights that drive business strategies.",
        },
        {
          question: "Are there any prerequisites for the SAP BW/BI course?",
          answer:
            "While there are no strict prerequisites, a foundational knowledge of data analysis and familiarity with basic database concepts will be beneficial. We recommend candidates have some experience with data handling or analytics.",
        },
        {
          question: "How does Connecting Dots ERP ensure quality training?",
          answer:
            "Connecting Dots ERP is committed to providing high-quality training through experienced instructors, a structured curriculum, and a focus on practical applications. We continuously update our course material to reflect the latest industry trends and technologies.",
        },
        {
          question: "Can I attend a demo session before enrolling?",
          answer:
            "Yes, we encourage prospective students to attend a demo session before enrolling in the SAP BW/BI Course. This allows you to experience our teaching methods, interact with instructors, and clarify any doubts about the course content and structure.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SAP HANA",
          description: "Learn HANA from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HANA icon",
        },
        {
          name: "SAP ARIBA",
          description: "Learn ARIBA from experts", // Corrected description
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP ARIBA icon",
        },
        {
          name: "SAP BASIS",
          description: "Learn BASIS from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP BASIS icon",
        },
        {
          name: "SAP ABAP",
          description: "Learn ABAP from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP ABAP icon",
        },
        {
          name: "SAP FICO",
          description: "Learn FICO from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP FICO icon",
        },
        {
          name: "SAP MM",
          description: "Learn MM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP MM icon",
        },
        {
          name: "SAP SD",
          description: "Learn SD from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SD icon",
        },
        {
          name: "SAP HR/HCM",
          description: "Learn HR/HCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HR/HCM icon",
        },
        {
          name: "SAP PM",
          description: "Learn PM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PM icon",
        },
        {
          name: "SAP SCM",
          description: "Learn SCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SCM icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "sap-ewm": {
    // === BASIC COURSE INFO ===
    title: "SAP EWM", // Used in: Page titles, headers, SEO
    fullTitle: "SAP Extended Warehouse Management", // Used in: Page content, descriptions
    category: "sap", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sap-ewm", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master SAP Extended Warehouse Management (EWM) in {city} with our expert-led course. Gain essential skills in warehouse operations, inventory control, and supply chain logistics. Our SAP EWM training in {city} offers hands-on experience, real-world projects, and 100% placement support to help you build a successful career in logistics and warehouse management.",
    metaTitle: "SAP EWM Course in {city} | Best Warehouse Management Training", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SAP EWM in {city}. Expert-led training in warehouse operations, logistics, and inventory. Certification, real-time projects & 100% placement. Launch your supply chain career now!",

    // === COURSE DETAILS ===
    duration: "6-8 weeks", // Used in: Course summary section, page content (from FAQ)
    price: { min: 40000, max: 110000 }, // Used in: JSON-LD "@type":"PriceSpecification" (Estimated based on similar courses)
    modules: [
      // Used in: Course summary, keywords generation, page content (derived from syllabus and "Why" sections)
      "Overview of EWM & WM",
      "Warehouse Structure & Master Data",
      "Inbound & Outbound Processing",
      "Internal Warehouse Movements",
      "Physical Inventory",
      "Yard Management & Cross-Docking",
      "Resource Management & Wave Management",
      "Integration with SAP Modules (MM, SD, PP)",
    ],
    prerequisites:
      "Basic understanding of supply chain management or warehouse operations recommended", // Used in: Course details (from FAQ)
    certification:
      "SAP Certified Application Associate - Extended Warehouse Management", // Used in: Course details, JSON-LD (Standard SAP EWM certification)
    jobRoles: [
      // Used in: Keywords generation, career section, page content (from "Why" section and general EWM roles)
      "SAP EWM Consultant",
      "Warehouse Manager",
      "Logistics Consultant",
      "Supply Chain Analyst",
      "SAP Functional Consultant (EWM)",
      "Inventory Manager",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "SAP EWM Course in {city}",
      subtitle: "Practical Based Job Oriented SAP Training in {city}",
      description:
        "SAP Extended Warehouse Management (EWM) is a powerful module within the SAP Supply Chain Management suite that offers advanced features for efficient warehouse operations. Connecting Dots ERP's SAP EWM course in {city} will empower you to manage warehouse processes, from inventory control to outbound deliveries with industrial learning by MNC experienced trainer and hands-on learning of various tools.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "SAP EWM Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          { type: "text", name: "location", placeholder: "Add your location" }, // Added missing location field
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why SAP EWM ?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">SAP EWM?</span>',
          content:
            "SAP Extended Warehouse Management (SAP EWM) is an advanced warehouse management module designed to support flexible, automated, and highly efficient warehouse operations. It offers features such as inventory management, resource optimization, and process automation to streamline warehouse activities. By enrolling in SAP EWM training in {city}, you'll gain the skills to efficiently manage and optimize end-to-end warehouse processes, ensuring smooth operations across the supply chain.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">SAP EWM Consultant</span> do?',
          content:
            "A SAP EWM Consultant designs and implements warehouse management solutions using SAP EWM. They work on integrating SAP EWM with other SAP modules and optimizing warehouse processes.",
          listItems: [
            "Implement SAP EWM solutions.",
            "Optimize warehouse operations.",
            "Integrate SAP EWM with other SAP modules.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">SAP EWM</span> training?',
          content:
            "With the growing need for streamlined and efficient supply chain operations, businesses are increasingly adopting SAP EWM, creating a surge in demand for SAP EWM Consultants. The SAP EWM course in {city} provides you with in-depth knowledge and practical experience in managing complex warehouse operations, inventory control, and distribution processes. This course is designed to help you succeed in warehouse management roles with real-world skills and expertise.",
          listItems: [
            "SAP EWM Consultant",
            "Warehouse Manager",
            "Logistics Consultant",
          ],
        },
      ],
    },

    // Data for SapModComponent (course-specific syllabus)
    sapMod: {
      title2: '<span class="highlight-span-cards">Sap Ewm</span> Syllabus',
      description: "Industry aligned Sap Ewm syllabus with certification",
      summary:
        "An exhaustive Syllabus designed by our industry experts which will help you to get placed in your dream IT company",
      noteMaster: "We provide advanced Sap Ewm training",
      noteAdvance: "Advance",
      features: [
        { label: "10+", description: "Tools" },
      ],
      overview: {
        title: "Syllabus Overview",
        modules: [
          {
            name: "Overview of EWM & WM",

            subtopics: [
              "Introduction to SAP WM and EWM",

              "Key Differences: WM vs. EWM",

              "EWM Architecture & Deployment",

              "EWM Functionalities Overview",

              "Basic Terminologies & Flows",

              "EWM in S/4HANA Context",

              "Business Benefits of EWM",

              "Integration with Logistics Processes",
            ],
          },

          {
            name: "Warehouse Structure & Master Data",

            subtopics: [
              "Warehouse Numbers & Storage Types",

              "Storage Bins & Sections",

              "Activity Areas & Work Centers",

              "Quant & HU Management",

              "Business Partners & Resources",

              "Product & Packaging Specifications",

              "Master Data Replication",

              "Warehouse Task & Order Creation",
            ],
          },

          {
            name: "Inbound & Outbound Processing",

            subtopics: [
              "Inbound Delivery Creation",

              "Goods Receipt & Putaway",

              "Advanced Putaway Strategies",

              "Outbound Delivery Management",

              "Picking & Packing Strategies",

              "Goods Issue Process",

              "Exception Handling in Deliveries",

              "Monitoring Inbound/Outbound Processes",
            ],
          },

          {
            name: "Internal Warehouse Movements",

            subtopics: [
              "Warehouse Tasks & Orders",

              "Ad Hoc Movements",

              "Replenishment Strategies",

              "Slotting & Rearrangement",

              "Posting Changes",

              "Stock Transfers & Rearrangement",

              "HU Movements",

              "Exception Handling during Movements",
            ],
          },

          {
            name: "Physical Inventory",

            subtopics: [
              "Types of Physical Inventory",

              "Inventory Documents Creation",

              "Cycle Counting Procedures",

              "Counting Strategies & Thresholds",

              "Inventory Adjustments",

              "Inventory Reporting",

              "Real-Time Inventory Monitoring",

              "Integration with MM Inventory",
            ],
          },

          {
            name: "Yard Management & Cross-Docking",

            subtopics: [
              "Introduction to Yard Management",

              "Yard Layout and Configuration",

              "Dock Appointment Scheduling",

              "Vehicle Check-In/Check-Out",

              "Basic Cross-Docking Concepts",

              "Preplanned vs Opportunistic Cross-Docking",

              "Document Flow in Yard Management",

              "EWM & TM Integration",
            ],
          },

          {
            name: "Resource Management & Wave Management",

            subtopics: [
              "Resource Configuration & Types",

              "Labor Management Basics",

              "Task Allocation Strategies",

              "Wave Template Design",

              "Wave Assignment Rules",

              "Releasing & Executing Waves",

              "Workload Distribution",

              "Monitoring Wave Execution",
            ],
          },

          {
            name: "Integration with SAP Modules (MM, SD, PP)",

            subtopics: [
              "Material Master Synchronization",

              "Integration with Purchase Orders (MM)",

              "Sales Order Fulfillment (SD)",

              "Delivery & Transportation Documents",

              "Production Supply (PP)",

              "Batch & Serial Number Integration",

              "Status Management Integration",

              "Cross-Module Reporting",
            ],
          },
        ],
      },
      videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
      downloadLink:
        "https://drive.google.com/uc?export=download&id=16LYT1eXATwC81KmNUZVkWqULXt3Abqpx",
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "SAP EWM CERTIFICATION",
      alt: "sap-ewm-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "Our SAP EWM (Extended Warehouse Management) certification focuses on optimizing warehouse operations.",
      description:
        "Learn to manage inventory, streamline supply chain logistics, and improve warehouse efficiency. This certification equips you for roles in warehouse and logistics management.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for the SAP EWM Course in {city} ?",
      paragraphs: [
        "At Connecting Dots ERP, we offer an advanced SAP EWM certification in {city} that equips you with the essential knowledge and skills to excel in warehouse management roles. Our SAP EWM training is designed to cover all aspects of warehouse management, from setting up basic systems to advanced functionalities like slotting, resource management, and automation. With a curriculum tailored to meet real-world industry demands, you will gain practical skills that can be immediately applied in business environments.",
        "Upon completing the course, you’ll receive a globally recognized certification, adding immense value to your professional profile and boosting your career prospects both locally and internationally. Our program is ISO-certified, ensuring the highest quality of education that meets global standards. The hands-on training includes live projects, real-world case studies, and simulations, allowing you to apply theoretical concepts in practical scenarios, making you job-ready from day one.",
        "We maintain small batch sizes of around 10-12 students, ensuring personalized attention and more interaction with experienced trainers who bring industry insights and practical knowledge to the classroom. Additionally, we offer comprehensive placement support, connecting you to top companies and helping you secure a job after completing the course. By choosing Connecting Dots ERP for your SAP EWM training in {city}, you gain expert-led education, global SAP certification, and the practical tools to succeed in warehouse management.",
      ],
      listItem1Header: "Key Benefits of Our SAP EWM Course:",
      listItem1: [
        "Advance Syllabus: Gain expertise in sourcing, procurement, supplier management, and advanced analytics with a focus on real-world applications.", // These are from your provided `highlights` which were Ariba related. I will keep them as is.
        "Industry-Relevant Skills: Learn how to enhance supply chain operations, improve supplier collaboration, and drive cost efficiency.",
        "Recognized Certification: Receive a certification that highlights your SAP Ariba proficiency and enhances your resume.",
        "Networking Opportunities: Connect with industry experts, trainers, and peers to build a strong professional network.",
        "Continuous Learning: Stay updated with advanced workshops and industry trends to maintain a competitive edge.",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2 (after the first three paragraphs)
      paragraphsAfterList: [
        // "Enroll Today and Advance Your Career:" from original description.
        "Enroll Today and Advance Your Career: Take the next step toward becoming an SAP EWM expert. Join our SAP EWM Training in {city} to gain the skills, confidence, and placement support required to excel in this high-demand field. Contact us now for details about course fees, upcoming batches, and enrollment options.",
      ],
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "What is the duration of the SAP EWM course?",
          answer:
            "The duration of our SAP EWM course typically ranges from 6 to 8 weeks, depending on the learning pace and the depth of the content covered. Flexible timing options are available to suit working professionals.",
        },
        {
          question:
            "What are the course fees for the SAP EWM training program in {city}?",
          answer:
            "The course fees vary depending on whether you opt for the full certification course or shorter, specialized modules. For detailed pricing, please reach out to our support team or visit our course page.",
        },
        {
          question: "What learning modes are available for SAP EWM training?",
          answer:
            "We offer both classroom-based and online learning options. You can choose to attend live, instructor-led sessions in {city} or opt for our interactive online training, which provides flexibility for those with busy schedules.",
        },
        {
          question:
            "Will I receive placement support after completing the SAP EWM course?",
          answer:
            "Yes, we provide dedicated placement assistance, including help with resume building, interview preparation, and access to our network of hiring partners to help you secure a job in top companies.",
        },
        {
          question:
            "What prerequisites are needed before enrolling in the SAP EWM course?",
          answer:
            "While no strict prerequisites are required, having a basic understanding of supply chain management or warehouse operations can be helpful. Our course is designed to cater to both beginners and professionals looking to upgrade their skills.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SAP PP",
          description: "Learn PP from scratch",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PP icon",
        },
        {
          name: "SAP QM",
          description: "Become a QM expert",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP QM icon",
        },
        {
          name: "SAP PS",
          description: "Master PS skills",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PS icon",
        },
        {
          name: "SAP SUCCESSFACTOR",
          description: "Learn SUCCESSFACTOR from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SuccesFactor icon",
        },
        {
          name: "SAP FICO",
          description: "Learn FICO from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP FICO icon",
        },
        {
          name: "SAP MM",
          description: "Learn MM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP MM icon",
        },
        {
          name: "SAP SD",
          description: "Learn SD from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SD icon",
        },
        {
          name: "SAP HR/HCM",
          description: "Learn HR/HCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HR/HCM icon",
        },
        {
          name: "SAP PM",
          description: "Learn PM from experts", // Corrected description
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PM icon",
        },
        {
          name: "SAP SCM",
          description: "Learn SCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SCM icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "sap-s4-hana": {
    // Using 'sap-s4-hana' as the slug for clarity and consistency
    // === BASIC COURSE INFO ===
    title: "SAP S/4 HANA", // Used in: Page titles, headers, SEO
    fullTitle: "SAP S/4 HANA Enterprise Management", // Used in: Page content, descriptions
    category: "sap", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sap-s4-hana", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master SAP S/4 HANA in {city} with our expert-led course. Learn real-time data processing, analytics, and simplified business processes. Our SAP S/4 HANA training in {city} offers hands-on experience, real-world projects, and 100% placement support to help you build a successful career in next-generation ERP.",
    metaTitle:
      "SAP S/4 HANA Course in {city} | Top ERP Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SAP S/4 HANA in {city}. Expert-led training in real-time ERP, data modeling, and analytics. Certification, real-time projects & 100% placement. Launch your SAP career now!",

    // === COURSE DETAILS ===
    duration: "3-4 months", // Used in: Course summary section, page content (Estimated)
    price: { min: 60000, max: 180000 }, // Used in: JSON-LD "@type":"PriceSpecification" (Estimated based on advanced nature)
    modules: [
      // Used in: Course summary, keywords generation, page content (Inferred from description)
      "SAP HANA Database & Architecture",
      "SAP S/4 HANA Finance (Simple Finance)",
      "SAP S/4 HANA Logistics (Simple Logistics)",
      "Data Migration to S/4 HANA",
      "Fiori Apps & User Experience",
      "Embedded Analytics in S/4 HANA",
      "Customizing & Configuration in S/4 HANA",
      "Conversion & Implementation Scenarios",
    ],
    prerequisites:
      "Basic knowledge of SAP ERP and database concepts recommended", // Used in: Course details (from FAQ)
    certification: "SAP Certified Application Associate - S/4HANA", // Used in: Course details, JSON-LD (Standard S/4HANA certification)
    jobRoles: [
      // Used in: Keywords generation, career section, page content (from "Why" section and general S/4HANA roles)
      "SAP S/4 HANA Consultant",
      "SAP FICO S/4HANA Consultant",
      "SAP Logistics S/4HANA Consultant",
      "SAP S/4HANA Architect",
      "SAP Technical Consultant (S/4HANA)",
      "ERP Transformation Consultant",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "SAP S/4 HANA Course in {city}",
      subtitle: "Practical Based Job Oriented SAP Training in {city}",
      description:
        "SAP S/4 HANA is SAP's next-generation ERP suite, designed to run on the in-memory HANA database, offering real-time data processing and analytics. It simplifies business processes and provides enhanced capabilities in areas like finance, supply chain, and procurement. Our SAP S/4 HANA Training in {city} equips you with hands-on knowledge of the platform, preparing you for roles in leading global organizations.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "SAP S/4 HANA Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          { type: "text", name: "location", placeholder: "Add your location" }, // Added missing location field
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why SAP S/4 HANA ?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">SAP S/4 HANA?</span>',
          content:
            "The SAP S/4 HANA Course prepares students for real-time analytics and data management by emphasizing in-memory computing and advanced data processing. The emphasis of SAP S/4 HANA training is on integrating with different SAP applications and utilizing HANA's business intelligence and reporting capabilities to prepare learners for employment in data analytics and database management.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">SAP S/4 HANA Consultant</span> do?',
          content:
            "A SAP S/4 HANA Consultant works on implementing and managing SAP S/4 HANA solutions, ensuring high performance and scalability of data-driven applications.",
          listItems: [
            "Implement SAP S/4 HANA solutions.",
            "Optimize data processing and storage.",
            "Integrate SAP S/4 HANA with other SAP modules.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">SAP S/4 HANA</span> training?',
          content:
            "For real-time analytics and data processing to be fully utilized, SAP S/4 HANA experts need to be hired. With a focus on in-memory computing, data modeling, and advanced analytics, our SAP S/4 HANA Certification Course in {city} prepares students to create creative solutions and maximize business performance.",
          listItems: [
            "SAP S/4 HANA Consultant",
            "Data Modeler",
            "Database Administrator",
          ],
        },
      ],
    },

    // Data for SapModComponent (course-specific syllabus)
    sapMod: {
      title2: '<span class="highlight-span-cards">SAP S/4 HANA</span> Syllabus',
      description: "Industry aligned SAP S/4 HANA syllabus with certification",
      summary:
        "An exhaustive Syllabus designed by our industry experts which will help you to get placed in your dream IT company",
      noteMaster: "We provide advanced SAP S/4 HANA training",
      noteAdvance: "Advance",
      features: [
        { label: "10+", description: "Tools" },
      ],
      overview: {
        title: "Syllabus Overview",
        // These modules are more relevant to SAP S/4 HANA than generic BI/AI modules provided in the original input.
        modules: [
          {
            name: "SAP HANA Database & Architecture",

            subtopics: [
              "In-Memory Computing Principles",

              "Row vs Column Store",

              "Data Compression & Partitioning",

              "Delta Merge Concept",

              "HANA Studio & Cockpit Overview",

              "Persistence Layer & Backup",

              "Database Security & Roles",

              "Integration with SAP Applications",
            ],
          },

          {
            name: "SAP S/4 HANA Finance (Simple Finance)",

            subtopics: [
              "Universal Journal Concept (ACDOCA)",

              "New Asset Accounting",

              "Integrated Controlling (CO)",

              "Real-Time Financial Reporting",

              "Cash Management & Treasury",

              "Financial Closing Cockpit",

              "Parallel Valuation & Ledgers",

              "Integration with Logistics Modules",
            ],
          },

          {
            name: "SAP S/4 HANA Logistics (Simple Logistics)",

            subtopics: [
              "Simplified Data Models in Logistics",

              "Inventory Management Enhancements",

              "Advanced ATP (aATP)",

              "Embedded EWM & TM Features",

              "Procure-to-Pay Innovations",

              "Order-to-Cash Process",

              "Material Valuation & MRP Live",

              "Fiori-based Logistics Execution",
            ],
          },

          {
            name: "Data Migration to S/4 HANA",

            subtopics: [
              "SAP Migration Cockpit Overview",

              "LTMC & LTMOM Tools",

              "Pre-checks & Readiness Reports",

              "Migration Object Templates",

              "Staging Table Approach",

              "Direct Transfer Method",

              "Data Validation & Reconciliation",

              "Cutover & Go-Live Planning",
            ],
          },

          {
            name: "Fiori Apps & User Experience",

            subtopics: [
              "SAP Fiori Architecture Overview",

              "Fiori Launchpad Configuration",

              "Standard vs Custom Fiori Apps",

              "Catalogs, Groups & Tiles",

              "OData Services Activation",

              "Theme Designer & Branding",

              "Responsive Design & Accessibility",

              "Fiori App Library Navigation",
            ],
          },

          {
            name: "Embedded Analytics in S/4 HANA",

            subtopics: [
              "Core Data Services (CDS Views)",

              "Smart Business KPIs",

              "Query Browser & Analytical List Pages",

              "Multidimensional Reporting",

              "Overview Pages (OVP)",

              "Real-time Reporting with ACDOCA",

              "KPI Modeling Tools",

              "Integration with SAP Analytics Cloud",
            ],
          },

          {
            name: "Customizing & Configuration in S/4 HANA",

            subtopics: [
              "SAP IMG Navigation (SPRO)",

              "Organizational Structures Setup",

              "Configuration of Master Data",

              "Posting Rules & Document Types",

              "Output Management via BRF+",

              "Workflow Configuration Basics",

              "Configuring Fiori Launchpad",

              "Adaptation via In-App Extensibility",
            ],
          },

          {
            name: "Conversion & Implementation Scenarios",

            subtopics: [
              "System Conversion (Brownfield Approach)",

              "New Implementation (Greenfield)",

              "Selective Data Transition (Hybrid)",

              "Readiness Check Tools",

              "Simplification Item Catalog",

              "Custom Code Adaptation",

              "Business Partner Conversion",

              "Post-Migration Validation Steps",
            ],
          },
        ],
      },
      videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
      downloadLink:
        "https://drive.google.com/file/d/SAPFICO_BrochureLink/view?usp=sharing", // Assuming this is a generic link or needs update
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "SAP S/4 HANA CERTIFICATION",
      alt: "sap-s/4-hana-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "Our SAP S/4 HANA certification Course offers a deep dive into in-memory database technology. Learn how to leverage SAP S/4 HANA to process massive data volumes in real-time and support business-critical applications.",
      description:
        "With practical experience, you'll be ready to implement high-performance data analytics and solutions for leading enterprises.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for the SAP S/4 HANA Course in {city} ?",
      paragraphs: [
        "The deep SAP S/4 HANA Course in {city} that Connecting Dots ERP provides will familiarize you with the potent features of SAP's in-memory database technology. The skills you need to use this cutting-edge platform in business operations are covered in our training, which starts with the basics of SAP S/4 HANA and progresses to more complex subjects like data modeling, real-time analytics, and application development.",
        "We place a high value on practical training, including real-world projects and real-world exposure to make sure you comprehend how SAP S/4 HANA interacts with other SAP modules. You will obtain important experience by working on real-world settings, which will help you get ready for the workforce after the course.",
        "Our SAP S/4 HANA Training in {city} includes professional direction from knowledgeable instructors, help finding a job 100% of the time, and a globally recognized SAP S/4 HANA Certification. Regardless of whether you opt for in-person or virtual Training, our course is made to provide you with the know-how and abilities required to succeed in the SAP S/4 HANA field, making you ready to begin your SAP career.",
      ],
      listItem1Header: "What makes our SAP S/4 HANA training in {city} unique?",
      listItem1: [
        "In-depth curriculum covering SAP's next-generation ERP suite",
        "Hands-on experience with real-time data processing and analytics",
        "Expert instructors with practical implementation experience",
        "Focus on Fiori, embedded analytics, and modern SAP UX",
        "100% placement assistance and career guidance",
        "Globally recognized certification upon course completion",
      ],
      listItemAfterIndex: 1, // Insert list after paragraph index 1 (the second paragraph)
      paragraphsAfterList: [], // No additional paragraphs after the list (as per previous patterns)
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Is this SAP S/4 HANA course available online?",
          answer:
            "Yes, Connecting Dots ERP offers both classroom and online modes for the SAP S/4 HANA Course in {city}, providing flexibility for students based on their location and convenience",
        },
        {
          question: "Does the SAP S/4 HANA course include live projects?",
          answer:
            "Yes, the SAP S/4 HANA Course at Connecting Dots ERP incorporates live projects to provide real-world experience. This practical exposure helps students grasp the complexities of SAP S/4 HANA and prepares them for the industry.",
        },
        {
          question:
            "Can I pursue the SAP S/4 HANA course if I don’t have a technical background?",
          answer:
            "Yes, although a basic understanding of database management is recommended, Connecting Dots ERP offers foundational training to ensure even beginners can succeed in the SAP S/4 HANA Course in {city}.",
        },
        {
          question: "What are the prerequisites for learning SAP S/4 HANA?",
          answer:
            "A basic knowledge of databases and SQL is recommended, but the SAP S/4 HANA Course in {city} at Connecting Dots ERP covers all fundamental concepts, making it accessible to beginners.",
        },
        {
          question: "How can I apply for the SAP S/4 HANA Course in {city}?",
          answer:
            "You can easily apply for the SAP S/4 HANA Course at Connecting Dots ERP by visiting our website or contacting our admissions team. Both online and classroom options are available to fit your schedule and preferences.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SAP BW/BI",
          description: "Learn BW/BI from scratch",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP BW/BI icon",
        },
        {
          name: "SAP ARIBA",
          description: "Learn ARIBA from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP ARIBA icon",
        },
        {
          name: "SAP BASIS",
          description: "Learn BASIS from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP BASIS icon",
        },
        {
          name: "SAP ABAP",
          description: "Learn ABAP from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP ABAP icon",
        },
        {
          name: "SAP FICO",
          description: "Learn FICO from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP FICO icon", // Corrected alt
        },
        {
          name: "SAP MM",
          description: "Learn MM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP MM icon",
        },
        {
          name: "SAP SD",
          description: "Learn SD from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SD icon",
        },
        {
          name: "SAP HR/HCM",
          description: "Learn HR/HCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HR/HCM icon",
        },
        {
          name: "SAP PM",
          description: "Learn PM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PM icon",
        },
        {
          name: "SAP SCM",
          description: "Learn SCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SCM icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "sap-hr-hcm": {
    // === BASIC COURSE INFO ===
    title: "SAP HR/HCM", // Used in: Page titles, headers, SEO
    fullTitle: "SAP Human Resources / Human Capital Management", // Used in: Page content, descriptions
    category: "sap", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sap-hr-hcm", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master SAP HR/HCM in {city} with our expert-led course. Learn human resource processes including personnel, payroll, time, and organizational management. Our SAP HCM training in {city} offers hands-on experience, real-world projects, and 100% placement support to help you build a successful career in HR.",
    metaTitle:
      "SAP HR/HCM Course in {city} | Top Human Capital Management Training", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SAP HR/HCM in {city}. Expert-led training in payroll, time management, and organizational processes. Certification, real-time projects & 100% placement. Launch your HR career now!",

    // === COURSE DETAILS ===
    duration: "3 months", // Used in: Course summary section, page content (from FAQ)
    price: { min: 45000, max: 120000 }, // Used in: JSON-LD "@type":"PriceSpecification" (Estimated)
    modules: [
      // Used in: Course summary, keywords generation, page content (derived from syllabus and "Why" sections)
      "Organizational Management",
      "Personnel Administration",
      "Time Management",
      "Payroll Accounting",
      "Recruitment & Selection",
      "Compensation Management",
      "Performance Management",
      "Employee Self-Service (ESS) & Manager Self-Service (MSS)",
    ],
    prerequisites:
      "No specific prerequisites, basic understanding of HR processes beneficial", // Used in: Course details (from FAQ)
    certification:
      "SAP Certified Application Associate - Human Capital Management", // Used in: Course details, JSON-LD (Standard SAP HCM certification)
    jobRoles: [
      // Used in: Keywords generation, career section, page content (from "Why" section and general HR/HCM roles)
      "SAP HR/HCM Consultant",
      "HR Manager",
      "Payroll Specialist",
      "SAP HR Functional Consultant",
      "Time Management Specialist",
      "Recruitment Consultant",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "SAP HR/HCM Course in {city}",
      subtitle: "Practical Based Job Oriented SAP Training in {city}",
      description:
        "The SAP HCM Course in {city} at Connecting Dots ERP offers in-depth training on managing human resources processes within organizations. This course covers core HR functions such as personnel management, payroll, time management, and organizational management using SAP HCM. With expert trainers and hands-on projects, this course equips you with the skills needed to excel in HR roles at top companies.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "SAP HR/HCM Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          { type: "text", name: "location", placeholder: "Add your location" }, // Added missing location field
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why SAP HR/HCM ?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">SAP HR/HCM?</span>',
          content:
            "SAP HCM (Human Capital Management) is a key SAP module that manages HR processes such as recruitment, payroll, employee administration, time management, and performance evaluation. It helps businesses streamline their human resource operations and improve workforce management. At Connecting Dots ERP's SAP HCM Training in {city}, you'll gain practical knowledge of SAP HCM, preparing you for top HR roles in leading organizations.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">SAP HR/HCM Consultant</span> do?',
          content:
            "A SAP HR/HCM Consultant implements HR solutions using SAP, managing employee data, payroll, and other HR-related activities.",
          listItems: [
            "Implement and manage SAP HR/HCM modules.",
            "Handle payroll and employee data.",
            "Optimize HR processes.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">SAP HR/HCM</span> training?',
          content:
            "Taking SAP HCM training in {city} equips you with the skills to manage critical HR functions such as payroll, time management, recruitment, and employee administration in a streamlined and efficient way. With hands-on training and industry-relevant knowledge, you can enhance your career prospects in top multinational companies. It opens up opportunities for high-demand roles like ",
          listItems: [
            "SAP HR/HCM Consultant",
            "HR Manager",
            "Payroll Specialist",
          ],
        },
      ],
    },

    // Data for SapModComponent (course-specific syllabus)
    sapMod: {
      title2: '<span class="highlight-span-cards">Sap HR/HCM</span> Syllabus',
      description:
        "Industry-Aligned Syllabus for Sap HR/HCM With Certification",
      summary:
        "An exhaustive Syllabus designed by our industry experts which will help you to get placed in your dream IT company",
      noteMaster: "We provide advanced Sap HR/HCM training",
      noteAdvance: "Advance",
      features: [
        { label: "10+", description: "Tools" },
      ],
      overview: {
        title: "Syllabus Overview",
        modules: [
          {
            name: "Organizational Management",

            subtopics: [
              "Enterprise Structure & Objects",

              "Organizational Units & Jobs",

              "Position Management",

              "Relationships & Evaluation Paths",

              "Infotype Configuration",

              "Matrix Organization Modeling",

              "Integration with Personnel Administration",

              "Reporting Structure Analysis",
            ],
          },

          {
            name: "Personnel Administration",

            subtopics: [
              "Employee Master Data Maintenance",

              "Hiring & Separation Processes",

              "Action Types & Reasons",

              "Infotypes & Subtypes",

              "Personnel Areas & Subareas",

              "Employee Groups & Subgroups",

              "Integration with Time & Payroll",

              "Data Archiving & Security",
            ],
          },

          {
            name: "Time Management",

            subtopics: [
              "Time Data Recording (Clock In/Out)",

              "Absence & Attendance Types",

              "Work Schedules & Variants",

              "Quotas Configuration",

              "Overtime & Time Evaluation",

              "Public Holiday Calendar Setup",

              "Integration with Payroll",

              "Time Manager’s Workplace (TMW)",
            ],
          },

          {
            name: "Payroll Accounting",

            subtopics: [
              "Payroll Schema & Rules",

              "Wage Types Configuration",

              "Gross-to-Net Calculation",

              "Legal Reporting & Statutory Deductions",

              "Bank Transfers & Payments",

              "Posting to Finance (FI)",

              "Retroactive Accounting",

              "Payroll Simulation & Monitoring",
            ],
          },

          {
            name: "Recruitment & Selection",

            subtopics: [
              "Vacancy Management",

              "Applicant Master Data",

              "Applicant Actions",

              "Selection Criteria Setup",

              "Recruitment Media Management",

              "Workflow for Approvals",

              "Integration with OM & PA",

              "Reporting on Applicants",
            ],
          },

          {
            name: "Compensation Management",

            subtopics: [
              "Compensation Planning Tools",

              "Budgeting & Eligibility Rules",

              "Salary Survey Participation",

              "Job Pricing Configuration",

              "Long-Term Incentives",

              "Pay Scale Management",

              "Manager Self-Service Planning",

              "Integration with Payroll",
            ],
          },

          {
            name: "Performance Management",

            subtopics: [
              "Appraisal Templates & Catalogs",

              "Appraisal Process Flow",

              "Objective Setting & Reviews",

              "Integration with OM & PA",

              "Manager & Employee Roles",

              "Automatic Rating & Calculations",

              "Talent Development Link",

              "Reporting & Analytics",
            ],
          },

          {
            name: "Employee Self-Service (ESS) & Manager Self-Service (MSS)",

            subtopics: [
              "Overview of ESS/MSS Portals",

              "Leave Requests & Approvals",

              "Pay Slip Access & Tax Statements",

              "Personal Data Changes",

              "Team View & Time Tracking",

              "Workflow Integration",

              "Fiori-Based Services",

              "Security & Role Management",
            ],
          },
        ],
      },
      videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
      downloadLink:
        "https://drive.google.com/uc?export=download&id=1sESJLM2dtWco8IHGKmsveAuYn-RCK3C2",
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "SAP HR/HCM CERTIFICATION",
      alt: "sap-hrhcm-certification-from-connecting-dots-erp", // Corrected alt
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "Our SAP HR/HCM (Human Capital Management) certification covers all aspects of workforce management. Learn how to handle payroll, time management, recruitment, and employee data, ensuring businesses can manage their workforce effectively.",
      description:
        "This certification positions you for roles in HR and talent management.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for SAP HR/HCM Course in {city} ?",
      paragraphs: [
        "At Connecting Dots ERP, we offer the best SAP HCM (Human Capital Management) course in {city}, designed to equip you with the essential skills to manage core HR processes like payroll, time management, recruitment, and employee administration. As businesses increasingly adopt digital solutions, SAP HCM Module plays a crucial role in streamlining human resource operations, making it one of the most in-demand skills in today's job market.",
        "Our SAP HCM training in {city} provides practical, hands-on experience through live projects, allowing you to effectively manage complex HR functions using SAP software. With the growing need for SAP HCM professionals, this SAP HCM course we offer a gateway to lucrative career opportunities in roles such as SAP HCM Consultant, HR Manager, and Payroll Specialist. Our curriculum covers key modules like personnel management, organizational management, and compensation planning, guided by expert trainers with over a decade of industry experience.",
        "At Connecting Dots ERP, we are committed to your success by offering flexible online and classroom learning options, tailored to your needs. Our SAP Training Institute in {city} provides real-world case studies and hands-on practice, preparing you for real-world business challenges. Upon completing the SAP HCM course, you'll receive a globally recognized SAP HCM certification, positioning you with a competitive edge in the global job market, supported by our dedicated job placement assistance with top MNCs. We equip you with the skills and knowledge to tackle challenges and successfully navigate the SAP HCM technical interviews for any SAP HCM position.",
      ],
      listItem1Header: "What makes our SAP HR/HCM training in {city} unique?", // Added header for consistency
      listItem1: [
        "Comprehensive curriculum covering core HR functions and SAP HCM modules",
        "Practical, hands-on experience through live projects and case studies",
        "Expert trainers with over a decade of industry experience",
        "Flexible online and classroom learning options",
        "Globally recognized SAP HCM certification upon completion",
        "Dedicated job placement assistance with top MNCs",
      ],
      listItemAfterIndex: 1, // Insert list after paragraph index 1 (the second paragraph)
      paragraphsAfterList: [], // No additional paragraphs after the list (as per previous patterns)
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question:
            "Can I learn SAP HCM without prior experience in sales or distribution?",
          answer:
            "Yes, you can learn SAP HCM without any prior experience in sales or distribution. Our SAP HCM course is designed to cover foundational concepts and gradually introduce advanced topics, making it accessible for both beginners and professionals from diverse backgrounds.",
        },
        {
          question: "Is SAP HCM in demand?",
          answer:
            "Absolutely, SAP HCM professionals are in high demand globally. As companies increasingly rely on SAP systems for managing HR processes, they actively seek skilled SAP HCM consultants and experts to improve efficiency and drive business growth.",
        },
        {
          question: "How long does it take to complete the SAP HCM course?",
          answer:
            "Our SAP HCM course typically takes around 3 months to complete. During this period, you will gain comprehensive knowledge and practical, hands-on experience to excel in managing HR processes within SAP.",
        },
        {
          question:
            "What are the career opportunities after completing the SAP HCM course?",
          answer:
            "Upon completing the SAP HCM course, you'll have access to various career opportunities, including roles like SAP HCM Consultant, HR Manager, and Payroll Specialist. SAP HCM expertise is highly valued across industries, offering excellent growth potential and rewarding career paths.",
        },
        {
          question:
            "Is the SAP HCM course available online or in the classroom?",
          answer:
            "At Connecting Dots ERP, we offer both online and classroom training for the SAP HCM course. With flexible learning options, you can choose the format that best fits your schedule and location, whether you prefer in-person classes or remote learning.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SAP PP",
          description: "Learn PP from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PP icon",
        },
        {
          name: "SAP QM",
          description: "Learn QM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP QM icon",
        },
        {
          name: "SAP PS",
          description: "Learn PS from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PS icon",
        },
        {
          name: "SAP SUCCESSFACTOR",
          description: "Learn SUCCESSFACTOR from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SuccesFactor icon",
        },
        {
          name: "SAP EWM",
          description: "Learn EWM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP EWM icon",
        },
        {
          name: "SAP MM",
          description: "Learn MM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP MM icon",
        },
        {
          name: "SAP SD",
          description: "Learn SD from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SD icon",
        },
        {
          name: "SAP FICO",
          description: "Learn FICO from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP FICO icon",
        },
        {
          name: "SAP PM",
          description: "Learn PM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PM icon",
        },
        {
          name: "SAP SCM",
          description: "Learn SCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SCM icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "sap-mm": {
    // === BASIC COURSE INFO ===
    title: "SAP MM", // Used in: Page titles, headers, SEO
    fullTitle: "SAP Materials Management", // Used in: Page content, descriptions
    category: "sap", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sap-mm", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master SAP MM (Materials Management) in {city} with our expert-led course. Learn procurement, inventory management, and material planning. Our SAP MM training in {city} offers hands-on experience, real-world projects, and 100% placement support to help you build a successful career in supply chain and logistics.",
    metaTitle: "SAP MM Course in {city} | Top Materials Management Training", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SAP MM in {city}. Expert-led training in procurement, inventory, and supply chain. Certification, real-time projects & 100% placement. Launch your logistics career now!",

    // === COURSE DETAILS ===
    duration: "3-4 months", // Used in: Course summary section, page content (Estimated)
    price: { min: 45000, max: 130000 }, // Used in: JSON-LD "@type":"PriceSpecification" (Estimated)
    modules: [
      // Used in: Course summary, keywords generation, page content (derived from syllabus and "Why" sections)
      "Master Data Management (Material Master, Vendor Master)",
      "Procurement Process (P2P)",
      "Inventory Management",
      "Material Requirements Planning (MRP)",
      "Physical Inventory",
      "Valuation and Account Determination",
      "Invoice Verification",
      "Integration with other SAP Modules (FI, SD, PP)",
    ],
    prerequisites:
      "Basic understanding of business processes and supply chain operations recommended", // Used in: Course details (from FAQ)
    certification:
      "SAP Certified Application Associate - Procurement with SAP ERP 6.0 EHP7", // Used in: Course details, JSON-LD (Standard SAP MM certification)
    jobRoles: [
      // Used in: Keywords generation, career section, page content (from "Why" section and general MM roles)
      "SAP MM Consultant",
      "Procurement Specialist",
      "Inventory Manager",
      "SAP Supply Chain Consultant",
      "Materials Planner",
      "Logistics Coordinator",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "SAP MM Course in {city}",
      subtitle: "Practical Based Job Oriented SAP Training in {city}",
      description:
        "SAP MM Course in {city} covers Industry oriented curriculum with placement. SAP MM deals with Master Data, Material Valuation, Account Determination, and Material Requirement Planning.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "SAP MM Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          { type: "text", name: "location", placeholder: "Add your location" }, // Added missing location field
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why SAP MM ?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">SAP MM?</span>',
          content:
            "SAP MM (Materials Management) is a module of the SAP ERP system that is used for procurement handling and inventory management of materials. It encompasses all facets of material management, including purchasing, inventory control, and invoice verification. SAP MM works in conjunction with other modules, such as Sales and Distribution (SD), Production Planning (PP), and Financial Accounting (FI), to facilitate seamless integration of data and processes. It also supports various types of procurement processes such as purchase requisitions, purchase orders, goods receipt, and invoice verification.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">SAP MM Consultant</span> do?',
          content:
            "A SAP MM Consultant implements and manages the SAP MM module, ensuring efficient procurement, inventory management, and material planning.",
          listItems: [
            "Implement and manage SAP MM modules.",
            "Optimize procurement processes.",
            "Handle inventory management.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">SAP MM</span> training?',
          content:
            "SAP MM Consultants are essential for efficient material management. Our SAP MM Certification training covers procurement, inventory management, and material planning using SAP MM.",
          listItems: [
            "SAP MM Consultant",
            "Procurement Specialist",
            "Inventory Manager",
          ],
        },
      ],
    },

    // Data for SapModComponent (course-specific syllabus)
    sapMod: {
      title2: '<span class="highlight-span-cards">Sap MM</span> Syllabus',
      description: "Industry aligned Sap MM syllabus with certification",
      summary:
        "An exhaustive Syllabus designed by our industry experts which will help you to get placed in your dream IT company",
      noteMaster: "We provide advanced Sap MM training",
      noteAdvance: "Advance",
      features: [
        { label: "10+", description: "Tools" },
      ],
      overview: {
        title: "Syllabus Overview",
        modules: [
          {
            name: "Master Data Management (Material Master, Vendor Master)",

            subtopics: [
              "Material Types & Views Overview",

              "Material Master Creation & Maintenance",

              "Vendor Master Data Configuration",

              "Purchasing & Accounting Views",

              "Source List & Info Records",

              "Centralized vs Decentralized Master Data",

              "Number Range Configuration",

              "Integration with Other Modules",
            ],
          },

          {
            name: "Procurement Process (P2P)",

            subtopics: [
              "Purchase Requisition Creation",

              "Request for Quotation (RFQ)",

              "Purchase Order (PO) Processing",

              "Goods Receipt Posting",

              "Invoice Posting & Matching",

              "Release Strategy Setup",

              "Outline Agreements (Contracts/Scheduling)",

              "Reporting in Procurement",
            ],
          },

          {
            name: "Inventory Management",

            subtopics: [
              "Goods Movement Types (101, 102, etc.)",

              "Stock Overview & Analysis (MMBE)",

              "Goods Issue & Transfer Posting",

              "Batch Management",

              "Stock Types (Unrestricted, Blocked, Quality)",

              "Special Stock Handling (Subcontracting, Consignment)",

              "Reservations & Material Documents",

              "Integration with WM/EWM",
            ],
          },

          {
            name: "Material Requirements Planning (MRP)",

            subtopics: [
              "MRP Types & Procedures",

              "Planning File Entry & Processing Keys",

              "Lot Sizing Techniques",

              "Planning Horizon Setup",

              "Source Determination & Quota Arrangements",

              "MRP Controllers & Exception Messages",

              "MD01/MD04 Transaction Usage",

              "Integration with Production Planning",
            ],
          },

          {
            name: "Physical Inventory",

            subtopics: [
              "Inventory Document Creation",

              "Cycle Counting Configuration",

              "Posting Inventory Differences",

              "Counting Methods & Thresholds",

              "Batch & Serial Number Tracking",

              "Annual vs Continuous Inventory",

              "Inventory Reports (MB5B, MI20, etc.)",

              "Integration with Financial Adjustments",
            ],
          },

          {
            name: "Valuation and Account Determination",

            subtopics: [
              "Valuation Classes & Types",

              "Automatic Account Posting (OBYC)",

              "Split Valuation Concepts",

              "Price Control (Standard vs Moving Avg)",

              "GR/IR Clearing Account Setup",

              "Account Category Reference",

              "Material Ledger Overview",

              "FI Integration with MM Valuation",
            ],
          },

          {
            name: "Invoice Verification",

            subtopics: [
              "Three-Way Matching Concept",

              "Invoice Posting via MIRO",

              "Handling Variances & Blocks",

              "Subsequent Debit/Credit Transactions",

              "Credit Memo Processing",

              "Automatic Posting to FI",

              "Invoice Release Strategy",

              "Reporting & Analysis (MRBR, MIR5)",
            ],
          },

          {
            name: "Integration with other SAP Modules (FI, SD, PP)",

            subtopics: [
              "Purchase Order to FI Postings",

              "Stock Movements Affecting Finance",

              "Procurement for Sales Orders (SD)",

              "Subcontracting Process with PP",

              "Intercompany Stock Transfers",

              "Automatic Postings to G/L",

              "Third-Party Order Processing",

              "Data Flow Between Modules",
            ],
          },
        ],
      },
      videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
      downloadLink:
        "https://drive.google.com/uc?export=download&id=1lFs52kQRb0t2S7FGouh4zl06rJxD1frO",
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "SAP MM CERTIFICATION",
      alt: "sap-mm-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "SAP MM (Materials Management) certification offers in-depth training on procurement and inventory management processes.",
      description:
        "You'll learn how to handle materials, track inventory, and manage purchasing effectively. This certification prepares you for key roles in supply chain and procurement management.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for the SAP MM Course in {city} ?",
      paragraphs: [
        "Connecting Dots ERP offers a comprehensive SAP MM Course in {city} that equips organizations with materials management, inventory control, and warehouse management capabilities. The course is designed to ensure materials are managed efficiently, avoiding shortages and streamlining supply chain operations. With SAP MM, companies can optimize purchasing processes, reduce costs, and manage goods effectively. Our course covers core concepts such as Material Master Data, Inventory Management, Procurement Process, Vendor Valuation, and Invoice Verification, making it essential for anyone looking to build a career in SAP MM.",
        "Our SAP MM Training in {city} focuses on real-world applications, ensuring that you gain hands-on experience with business processes like Procure-to-Pay, Order-to-Cash, and Material Requirements Planning (MRP). The course delves into the integration of SAP MM with other modules, such as the SAP FICO course in {city}, Sales and Distribution (SD), Production Planning (PP), Quality Management (QM), and Warehouse Management (WM), providing a holistic understanding of SAP systems. Additionally, students will learn how to manage inventory, improve procurement efficiency, and reduce operational costs. With live projects and practical exposure, you'll be prepared to excel in the SAP MM domain.",
        "At Connecting Dots ERP, we emphasize career development, offering job placement assistance upon completion of the SAP MM Course in {city}. We provide students with access to labs for practice, globally recognized certification, and support from experienced trainers with over a decade of industry experience. Whether you're attending online or classroom sessions, our SAP MM course prepares you for a dynamic role in materials management and supply chain optimization. With flexible learning schedules, updated study materials, and expert guidance, our SAP MM training ensures you are ready for industry challenges and positioned for career success.",
      ],
      listItem1Header: "What makes our SAP MM training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering core SAP MM modules and integration",
        "Hands-on experience with real-world business processes (P2P, OTC, MRP)",
        "Expert trainers with over a decade of industry experience",
        "Focus on practical applications and live projects",
        "100% job placement assistance with resume building and interview prep",
        "Globally recognized certification upon course completion",
      ],
      listItemAfterIndex: 1, // Insert list after paragraph index 1 (the second paragraph)
      paragraphsAfterList: [], // No additional paragraphs after the list (as per previous patterns)
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question:
            "Is SAP MM challenging to learn? What are the prerequisites for learning SAP MM?",
          answer:
            "SAP MM is not difficult to learn. The learner has to understand business processes along with sap functionalities. Companies seek candidates with a strong understanding of business processes and expertise in SAP MM.",
        },
        {
          question: "Is this SAP MM course online or classroom?",
          answer:
            "We provide SAP mm course in classroom as well as online mode. Nearby students can enroll in classroom batches. Students outside {city} can enroll for online batch.",
        },
        {
          question:
            "What career opportunities are available after acquiring knowledge in SAP MM?",
          answer:
            "Mastering SAP MM opens the door to a rewarding career with a wide range of opportunities across various industries. Whether you aspire to be an SAP MM consultant or an end user, expertise in SAP MM is highly sought after and can greatly boost your professional development and marketability.",
        },
        {
          question: "Is SAP MM training available near me?",
          answer:
            "Yes, Connecting Dots ERP provides SAP training near me, with conveniently located centers in {city} and other cities across India. Our accessible training facilities and online learning options make it convenient for professionals to enhance their skills in SAP MM.",
        },
        {
          question:
            "What kind of training does Connecting Dots ERP provide for SAP MM?",
          answer:
            "Initium Learning is renowned as the best SAP training Institute, offering comprehensive courses on SAP MM. Our training covers various aspects, including development, integration, analytics, and more, equipping participants with the skills needed to leverage SAP MM effectively.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SAP PP",
          description: "Learn PP from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PP icon",
        },
        {
          name: "SAP QM",
          description: "Learn QM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP QM icon",
        },
        {
          name: "SAP PS",
          description: "Learn PS from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PS icon",
        },
        {
          name: "SAP SUCCESSFACTOR",
          description: "Learn SUCCESSFACTOR from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SuccesFactor icon",
        },
        {
          name: "SAP EWM",
          description: "Learn EWM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP EWM icon",
        },
        {
          name: "SAP FICO",
          description: "Learn FICO from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP FICO icon",
        },
        {
          name: "SAP SD",
          description: "Learn SD from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SD icon",
        },
        {
          name: "SAP HR/HCM",
          description: "Learn HR/HCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HR/HCM icon",
        },
        {
          name: "SAP PM",
          description: "Learn PM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PM icon",
        },
        {
          name: "SAP SCM",
          description: "Learn SCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SCM icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "sap-pm": {
    // === BASIC COURSE INFO ===
    title: "SAP PM", // Used in: Page titles, headers, SEO
    fullTitle: "SAP Plant Maintenance", // Used in: Page content, descriptions
    category: "sap", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sap-pm", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master SAP PM (Plant Maintenance) in {city} with our expert-led course. Learn equipment management, preventive maintenance, and repair orders. Our SAP PM training in {city} offers practical insights, real-world applications, and 100% placement support to help you build a successful career in maintenance management.",
    metaTitle:
      "SAP PM Course in {city} | Top Plant Maintenance Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SAP PM in {city}. Expert-led training in equipment maintenance, preventive planning, and repair. Certification, real-time projects & 100% placement. Launch your maintenance career now!",

    // === COURSE DETAILS ===
    duration: "3-4 months", // Used in: Course summary section, page content (Estimated based on typical SAP module training)
    price: { min: 40000, max: 120000 }, // Used in: JSON-LD "@type":"PriceSpecification" (Estimated)
    modules: [
      // Used in: Course summary, keywords generation, page content (Aligned with SAP PM)
      "Organizational Structure in PM",
      "Technical Objects (Functional Locations, Equipment)",
      "Maintenance Processing (Notifications, Orders)",
      "Preventive Maintenance Planning",
      "Corrective Maintenance",
      "Calibration Management",
      "Reporting & Analytics in PM",
      "Integration with other SAP Modules (MM, PP, QM)",
    ],
    prerequisites:
      "Basic understanding of industrial maintenance or logistics processes recommended", // Used in: Course details (derived from FAQ and domain knowledge)
    certification: "SAP Certified Application Associate - Plant Maintenance", // Used in: Course details, JSON-LD (Standard SAP PM certification)
    jobRoles: [
      // Used in: Keywords generation, career section, page content (from "Why" section and general PM roles)
      "SAP PM Consultant",
      "Maintenance Planner",
      "Plant Maintenance Manager",
      "SAP PM Functional Analyst",
      "Maintenance Coordinator",
      "Asset Management Specialist",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "SAP PM Course in {city}",
      subtitle: "Practical Based Job Oriented SAP Training in {city}",
      description:
        "SAP PM (Plant Maintenance) is a module that helps businesses efficiently manage maintenance activities, including equipment management, preventive maintenance, and repair orders to ensure optimal production performance. It integrates with other SAP modules like MM and PP for seamless operations. Our SAP PM Training in {city} provides practical insights and real-world applications, preparing you for maintenance management roles in various industries.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "SAP PM Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          { type: "text", name: "location", placeholder: "Add your location" }, // Added missing location field
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why SAP PM ?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">SAP PM?</span>',
          content:
            "SAP PM (Plant Maintenance) is a module that helps businesses efficiently manage maintenance activities, including equipment management, preventive maintenance, and repair orders to ensure optimal production performance. It integrates with other SAP modules like MM and PP for seamless operations. Our SAP PM Training in {city} provides practical insights and real-world applications, preparing you for maintenance management roles in various industries.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">SAP PM Consultant</span> do?',
          content:
            "A SAP PM Consultant implements and manages SAP PM solutions, ensuring effective maintenance planning, scheduling, and execution.",
          listItems: [
            "Implement and manage SAP PM modules.",
            "Optimize maintenance processes.",
            "Ensure equipment availability and reliability.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">SAP PM</span> training?',
          content:
            "The demand for SAP PM Consultants is growing as companies prioritize preventive and predictive maintenance to avoid costly downtime. By enrolling in the SAP PM course in {city}, you will be equipped with practical skills to manage and execute maintenance activities, plan preventive tasks, and optimize equipment performance. Our training prepares you for high-demand roles with real-time case studies and hands-on projects, with placement support to ensure a smooth transition into your new career.",
          listItems: [
            "SAP PM Consultant",
            "Maintenance Planner",
            "Plant Maintenance Manager",
          ],
        },
      ],
    },

    // Data for SapModComponent (course-specific syllabus)
    sapMod: {
      title2: '<span class="highlight-span-cards">Sap PM</span> Syllabus',
      description: "Industry aligned Sap PM syllabus with certification",
      summary:
        "An exhaustive Syllabus designed by our industry experts which will help you to get placed in your dream IT company",
      noteMaster: "We provide advanced Sap PM training",
      noteAdvance: "Advance",
      features: [
        { label: "10+", description: "Tools" },
      ],
      overview: {
        title: "Syllabus Overview",
        modules: [
          {
            name: "Organizational Structure in PM",

            subtopics: [
              "Maintenance Planning Plant",

              "Planner Groups & Work Centers",

              "Maintenance Plants & Locations",

              "Maintenance Planning Strategies",

              "Functional Hierarchy Setup",

              "Object Types & Catalog Profiles",

              "Responsibilities & Roles Setup",

              "Integration with Enterprise Structure",
            ],
          },

          {
            name: "Technical Objects (Functional Locations, Equipment)",

            subtopics: [
              "Functional Location Hierarchies",

              "Equipment Master Records",

              "Serial Numbers & Object Lists",

              "Classification of Equipment",

              "Bills of Material (BOM) for Equipment",

              "Measuring Points & Counters",

              "Warranties & Object Histories",

              "Installation & Dismantling Processes",
            ],
          },

          {
            name: "Maintenance Processing (Notifications, Orders)",

            subtopics: [
              "Creating Maintenance Notifications",

              "Notification Types & Prioritization",

              "Maintenance Orders Creation",

              "Order Types & Costing",

              "Operations, Materials & Components",

              "Time Confirmation & Technical Completion",

              "Order Settlement Process",

              "Work Clearance Management",
            ],
          },

          {
            name: "Preventive Maintenance Planning",

            subtopics: [
              "Maintenance Strategies & Packages",

              "Maintenance Plans (Time, Performance-based)",

              "Scheduling Parameters & Deadlines",

              "Task List Assignment",

              "Call Horizon & Offset Settings",

              "Maintenance Item Configuration",

              "Cycle Modifications & Shifts",

              "Performance Monitoring & Compliance",
            ],
          },

          {
            name: "Corrective Maintenance",

            subtopics: [
              "Unplanned Maintenance Flow",

              "Fault Logging & Classification",

              "Root Cause Documentation",

              "Breakdown Notifications",

              "Order Processing for Repairs",

              "Use of Refurbishment Orders",

              "Downtime Tracking",

              "Feedback & Cost Capture",
            ],
          },

          {
            name: "Calibration Management",

            subtopics: [
              "Integration with Quality Management",

              "Calibration-specific Equipment",

              "Inspection Characteristics for Calibration",

              "Calibration Plans & Scheduling",

              "Results Recording & Documentation",

              "Deviation Handling",

              "Compliance with Regulatory Standards",

              "Audit Trails & Certificates",
            ],
          },

          {
            name: "Reporting & Analytics in PM",

            subtopics: [
              "Notification & Order Reports",

              "Technical Object Analysis",

              "Maintenance History Tracking",

              "Maintenance Backlog Reports",

              "KPIs & Maintenance Efficiency",

              "Cost Analysis Reports",

              "Custom Reports via Queries",

              "SAP Fiori Reporting Tools",
            ],
          },

          {
            name: "Integration with other SAP Modules (MM, PP, QM)",

            subtopics: [
              "Material Reservation & Usage (MM)",

              "Production Equipment Maintenance (PP)",

              "Quality Inspections during Maintenance (QM)",

              "Cost Center & Order Settlement (CO)",

              "Procurement of External Services",

              "Notification Triggers from Other Modules",

              "Linked Workflows & Alerts",

              "Master Data Synchronization",
            ],
          },
        ],
      },
      videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
      downloadLink:
        "https://drive.google.com/uc?export=download&id=1R5G-UwtDNg3hCOfHl9hCpbrA6kunyg6V", // Keeping provided link
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "SAP PM CERTIFICATION",
      alt: "sap-pm-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "Our SAP PM (Plant Maintenance) certification trains you to manage the upkeep and maintenance of enterprise equipment.",
      description:
        "You'll learn to schedule repairs, manage maintenance workflows, and ensure operational efficiency. This certification is ideal for roles in maintenance management and operations.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for the SAP PM Course in {city} ?",
      paragraphs: [
        "At Connecting Dots ERP, we provide an engaging and advanced SAP PM course in {city} designed to equip you with the skills needed to tackle real-life industrial challenges in plant maintenance across various industries. Our curriculum is comprehensive, covering all key aspects of SAP Plant Maintenance (PM), including maintenance planning, work orders, breakdown management, and detailed reporting. We ensure that our SAP PM certification training in {city} stays aligned with the latest industry standards, preparing you for the dynamic requirements of the job market.",
        "Upon completing our SAP PM certification course, you will receive a globally recognized certification that enhances your professional credentials, making you a competitive candidate for jobs worldwide. Our SAP PM course is also ISO-certified, guaranteeing that the training meets the highest international quality standards. We emphasize hands-on learning through live projects and real-world case studies, ensuring that you gain practical experience that can be directly applied in workplace scenarios, making you job-ready from day one.",
        "Our SAP PM classes maintain small batch sizes, typically between 10-20 students, to ensure personalized attention and better interaction with instructors. Our experienced faculty, consisting of industry professionals with extensive expertise in SAP Plant Maintenance, provides both theoretical and practical knowledge to ensure a well-rounded learning experience. Additionally, we offer comprehensive placement support to help you secure job opportunities after the course. Many of our graduates have successfully transitioned into top organizations, benefiting from the extensive training and support provided. By choosing Connecting Dots ERP, you're investing in a high-quality SAP PM training program that offers global SAP certification and a pathway to success in the world of plant maintenance. Start your journey toward becoming a certified SAP PM professional today!",
      ],
      listItem1Header: "What makes our SAP PM training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering key aspects of SAP Plant Maintenance (PM)",
        "Hands-on learning with live projects and real-world case studies",
        "Experienced faculty with extensive industry expertise",
        "Small batch sizes for personalized attention",
        "Globally recognized and ISO-certified SAP PM certification",
        "Comprehensive job placement support with top companies",
      ],
      listItemAfterIndex: 1, // Insert list after paragraph index 1 (the second paragraph)
      paragraphsAfterList: [], // No additional paragraphs after the list (as per previous patterns)
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "What makes SAP PM training beneficial?",
          answer:
            "SAP PM training provides essential skills for managing and optimizing maintenance operations in any industry. Learning how to reduce downtime, manage repairs, and implement preventive maintenance gives you a competitive edge in the job market.",
        },
        {
          question: "How much practical training is included in the course?",
          answer:
            "At Connecting Dots ERP, practical training is a major part of our SAP PM course in {city}. We ensure that you have real-world exposure through live projects and case studies, giving you hands-on experience in managing plant maintenance processes.",
        },
        {
          question:
            "What can I expect in terms of batch size and learning environment?",
          answer:
            "Our batches are small, typically 10-12 students, allowing for personalized attention from instructors and fostering interactive learning. This helps you to engage deeply with the content and ask questions as you go.",
        },
        {
          question:
            "What job roles are available after completing the SAP PM course?",
          answer:
            "After completing the SAP PM certification in {city}, you can pursue career paths such as SAP PM Consultant, Maintenance Planner, and Plant Maintenance Manager. These roles are in demand across industries, especially in manufacturing, utilities, and infrastructure.",
        },
        {
          question: "Is the SAP PM certification recognized by employers?",
          answer:
            "Yes, the certification from Connecting Dots ERP is widely recognized by employers. Our course is designed to meet industry standards, and the practical skills you gain make you a valuable candidate in the job market. Many of our graduates are successfully employed in top companies globally.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SAP PP",
          description: "Learn PP from scratch",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PP icon",
        },
        {
          name: "SAP QM",
          description: "Learn QM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP QM icon",
        },
        {
          name: "SAP PS",
          description: "Learn PS from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PS icon",
        },
        {
          name: "SAP SUCCESSFACTOR",
          description: "Learn SUCCESSFACTOR from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SuccesFactor icon",
        },
        {
          name: "SAP EWM",
          description: "Learn EWM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP EWM icon",
        },
        {
          name: "SAP FICO",
          description: "Learn FICO from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP FICO icon",
        },
        {
          name: "SAP SD",
          description: "Learn SD from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SD icon",
        },
        {
          name: "SAP HR/HCM",
          description: "Learn HR/HCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HR/HCM icon",
        },
        {
          name: "SAP ABAP",
          description: "Learn ABAP from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP ABAP icon",
        },
        {
          name: "SAP SCM",
          description: "Learn SCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SCM icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "sap-pp": {
    // === BASIC COURSE INFO ===
    title: "SAP PP", // Used in: Page titles, headers, SEO
    fullTitle: "SAP Production Planning", // Used in: Page content, descriptions
    category: "sap", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sap-pp", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master SAP PP (Production Planning) in {city} with our expert-led course. Learn material requirements planning (MRP), bill of materials (BOM), and shop floor control. Our SAP PP training in {city} offers practical knowledge, hands-on experience, and 100% placement support to help you build a successful career in production and manufacturing.",
    metaTitle:
      "SAP PP Course in {city} | Top Production Planning Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SAP PP in {city}. Expert-led training in production planning, scheduling, and control. Certification, real-time projects & 100% placement. Launch your manufacturing career now!",

    // === COURSE DETAILS ===
    duration: "3-4 months", // Used in: Course summary section, page content (Estimated based on typical SAP module training)
    price: { min: 40000, max: 120000 }, // Used in: JSON-LD "@type":"PriceSpecification" (Estimated)
    modules: [
      // Used in: Course summary, keywords generation, page content (Aligned with SAP PP)
      "Introduction to SAP Production Planning",
      "Master Data (BOM, Work Center, Routing)",
      "Demand Management & Sales and Operations Planning (SOP)",
      "Material Requirements Planning (MRP)",
      "Capacity Planning",
      "Production Order Execution",
      "Shop Floor Control",
      "Reporting & Analytics in PP",
    ],
    prerequisites:
      "Basic understanding of manufacturing processes or supply chain operations recommended", // Used in: Course details (derived from "Why" and syllabus)
    certification: "SAP Certified Application Associate - Production Planning", // Used in: Course details, JSON-LD (Standard SAP PP certification)
    jobRoles: [
      // Used in: Keywords generation, career section, page content (from "Why" section and general PP roles)
      "SAP PP Consultant",
      "Production Planner",
      "Manufacturing Manager",
      "SAP PP Functional Analyst",
      "MRP Controller",
      "Production Scheduler",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "SAP PP Course in {city}",
      subtitle: "Practical Based Job Oriented SAP Training in {city}",
      description:
        "The SAP PP Course in {city} teaches you how to manage production planning and control processes within the SAP ERP system, including material requirements planning (MRP), bill of materials (BOM), and shop floor control. Our SAP PP Training in {city} provides practical knowledge and hands-on experience, preparing you for production and manufacturing roles in leading organizations.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "SAP PP Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          { type: "text", name: "location", placeholder: "Add your location" }, // Added missing location field
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why SAP PP ?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">SAP PP?</span>',
          content:
            "SAP Production Planning (SAP PP) is a vital module in SAP ERP, focused on managing and optimizing production processes like planning, scheduling, and controlling manufacturing activities. It ensures efficient resource utilization, seamless integration with other SAP modules, and timely production deliveries. Learning SAP PP through an SAP PP course in {city} equips professionals with the skills to streamline operations and increase productivity in manufacturing businesses.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">SAP PP Consultant</span> do?',
          content:
            "A SAP PP Consultant implements and manages SAP PP solutions, ensuring efficient production planning, scheduling, and control.",
          listItems: [
            "Implement and manage SAP PP modules.",
            "Optimize production processes.",
            "Ensure efficient manufacturing operations.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">SAP PP</span> training?',
          content:
            "SAP PP Consultants are crucial in optimizing production planning, and ensuring manufacturing processes run efficiently. By enrolling in SAP PP training in {city}, you'll gain hands-on experience in production planning, scheduling, and control using SAP PP. This training prepares you to become vital to any manufacturing team, driving smooth operations and efficient workflows.",
          listItems: [
            "SAP PP Consultant",
            "Production Planner",
            "Manufacturing Manager",
          ],
        },
      ],
    },

    // Data for SapModComponent (course-specific syllabus)
    sapMod: {
      title2: '<span class="highlight-span-cards">Sap PP</span> Syllabus',
      description: "Industry aligned Sap PP syllabus with certification",
      summary:
        "An exhaustive Syllabus designed by our industry experts which will help you to get placed in your dream IT company",
      noteMaster: "We provide advanced Sap PP training",
      noteAdvance: "Advance",
      features: [
        { label: "10+", description: "Tools" },
      ],
      overview: {
        title: "Syllabus Overview",
        modules: [
          {
            name: "Introduction to SAP Production Planning",

            subtopics: [
              "Overview of Production Types (Make-to-Stock, Make-to-Order)",

              "Integration with Other SAP Modules (MM, SD, FICO)",

              "PP Master Data Flow",

              "End-to-End Production Cycle",

              "Business Scenarios in Manufacturing",

              "Planning Strategies & Policies",

              "Role of PP in Supply Chain",

              "Key Transactions in SAP PP",
            ],
          },

          {
            name: "Master Data (BOM, Work Center, Routing)",

            subtopics: [
              "Bill of Materials (BOM) Creation & Usage",

              "Routing Definition & Operation Steps",

              "Work Center Setup & Capacities",

              "Production Version Management",

              "Task List Types & Dependencies",

              "Master Recipe in Process Industries",

              "Reference Operation Sets",

              "Data Consistency & Maintenance",
            ],
          },

          {
            name: "Demand Management & Sales and Operations Planning (SOP)",

            subtopics: [
              "Planned Independent Requirements (PIR)",

              "Flexible Planning & Standard SOP",

              "Forecasting in SOP",

              "Transfer of SOP to Demand Management",

              "Make-to-Order vs Make-to-Stock Scenarios",

              "Product Group Planning",

              "Interactive vs Automatic Planning",

              "Integration with CO-PA and SD",
            ],
          },

          {
            name: "Material Requirements Planning (MRP)",

            subtopics: [
              "MRP Types & Control Parameters",

              "MRP Run Execution (MD01, MD02)",

              "Lot Size & Safety Stock Settings",

              "Planning Horizon & Scheduling",

              "MRP Exception Messages",

              "Procurement Proposals (Planned Orders, Purchase Reqs)",

              "MRP Evaluation & Reporting (MD04, MD05)",

              "Multilevel & Single Level Planning",
            ],
          },

          {
            name: "Capacity Planning",

            subtopics: [
              "Work Center Capacity Definition",

              "Rough-Cut Capacity Planning (RCCP)",

              "Capacity Requirements Planning (CRP)",

              "Finite & Infinite Scheduling",

              "Capacity Evaluation Tools",

              "Capacity Leveling (CM25, CM21)",

              "Shift Planning & Calendars",

              "Bottleneck Resource Management",
            ],
          },

          {
            name: "Production Order Execution",

            subtopics: [
              "Order Creation & Release",

              "Order Printing & Shop Papers",

              "Material Staging & Issue",

              "Confirmation of Production Activities",

              "Goods Receipt Posting",

              "Order Settlement & Variance Analysis",

              "Rework & Scrap Handling",

              "Status Management in Orders",
            ],
          },

          {
            name: "Shop Floor Control",

            subtopics: [
              "Dispatching of Production Orders",

              "Sequence Scheduling",

              "Monitoring Order Progress",

              "Capacity Utilization Reports",

              "Shift Notes & Logs",

              "Integration with MES Systems",

              "Production Execution Tracking",

              "Use of SAP Fiori Apps for Shop Floor",
            ],
          },

          {
            name: "Reporting & Analytics in PP",

            subtopics: [
              "Production Order Information System (COOIS)",

              "Capacity Load Reports (CM01, CM07)",

              "Planned vs Actual Cost Analysis",

              "Lead Time & Throughput Metrics",

              "Custom PP Reports via SQVI/SQ01",

              "Fiori Dashboards for PP",

              "Integration with Embedded Analytics",

              "Exception Reporting for Planners",
            ],
          },
        ],
      },
      videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
      downloadLink:
        "https://drive.google.com/uc?export=download&id=149sxDtm6iwgwHFw5uiwvqjnWxprod0VE",
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "SAP PP CERTIFICATION",
      alt: "sap-pp-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "SAP PP (Production Planning) certification gives you the knowledge to plan and manage manufacturing processes.",
      description:
        "You'll learn to oversee production schedules, material requirements, and workflow optimizations. This program prepares you for roles in production and supply chain management.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for the SAP PP Course in {city} ?",
      paragraphs: [
        "At Connecting Dots ERP, we provide an advanced SAP PP course in {city} that blends classroom learning with practical, hands-on experience to prepare you for success in production planning roles. Our curriculum is designed to cover all key aspects of SAP PP (Production Planning), including demand management, material requirement planning, capacity planning, and production scheduling. Aligned with current industry standards, the course ensures you are well-equipped to meet the needs of today's job market. Moreover, our SAP PP certification in {city} is globally recognized, giving you a competitive edge and allowing you to pursue opportunities worldwide.",
        "Our course is ISO-certified, ensuring that the training you receive meets international quality standards. This guarantees that you are learning from certified professionals who provide top-tier education. Emphasizing practical training, we offer real-world scenarios, live projects, and case studies that help you apply your theoretical knowledge to solve real production planning challenges. With small batch sizes, we focus on delivering personalized attention and fostering interactive learning, allowing you to engage more closely with our experienced trainers.",
        "Our expert faculty brings 10+ years of SAP consulting experience, ensuring you gain deep, practical insights into the SAP PP module. Additionally, we provide placement support to help you land a job as an SAP PP Consultant after completing the course. Many of our graduates have found positions in top multinational corporations and leading organizations. By choosing Connecting Dots ERP, you gain industry-relevant skills, global SAP certification, and the support needed to advance your career as a certified SAP PP professional.",
      ],
      listItem1Header: "What makes our SAP PP training in {city} unique?",
      listItem1: [
        "Industry-aligned training with real-world SAP PP skills",
        "Hands-on projects and case studies for practical experience",
        "Expert trainers with years of SAP consulting experience",
        "Small batch sizes (10-12 students) for personalized attention",
        "Globally recognized and ISO-certified SAP PP certification",
        "Comprehensive placement support for job opportunities with top MNCs",
      ],
      listItemAfterIndex: 1, // Insert list after paragraph index 1 (the second paragraph)
      paragraphsAfterList: [], // No additional paragraphs after the list (as per previous patterns)
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question:
            "Why should I choose Connecting Dots ERP for my SAP PP certification in {city}?",
          answer:
            "At Connecting Dots ERP, we focus on providing industry-aligned training that equips you with real-world SAP PP skills. Our SAP PP course in {city} includes hands-on projects, case studies, and practical experience, ensuring you are fully prepared for the job market. With expert trainers who have years of SAP consulting experience, we offer a comprehensive learning experience that helps you excel in your career.",
        },
        {
          question: "Do you offer practical training in the SAP PP course?",
          answer:
            "Yes, our SAP PP training in {city} emphasizes practical training to give you real-world experience. From live projects to case studies, you will have plenty of opportunities to apply theoretical concepts to practical business scenarios. This ensures you are job-ready from day one.",
        },
        {
          question:
            "How large are the SAP PP training batches at Connecting Dots ERP?",
          answer:
            "At Connecting Dots ERP, we maintain small batch sizes to ensure personalized attention and effective learning. Typically, our SAP PP batches consist of 10-12 students, allowing for more one-on-one interaction with the instructors and better peer collaboration.",
        },
        {
          question:
            "What makes the SAP PP certification program in {city} at Connecting Dots ERP unique?",
          answer:
            "Our SAP PP certification program in {city} stands out for its well-rounded curriculum that covers both technical and business process aspects of production planning. In addition to core SAP PP modules, we also integrate learning on how SAP PP interacts with other modules like SAP MM and SAP SD, ensuring you develop a holistic understanding of the SAP environment.",
        },
        {
          question:
            "Is SAP PP certification from Connecting Dots ERP recognized by employers?",
          answer:
            "Absolutely. The SAP PP certification course in {city} offered by Connecting Dots ERP is designed to align with industry standards, making it highly recognized by employers. Our strong ties with local and global businesses also ensure that our certification holds value in the job market, giving you an edge during interviews and job placements.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SAP HANA",
          description: "Learn HANA from scratch",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HANA icon",
        },
        {
          name: "SAP ARIBA",
          description: "Become a ARIBA expert",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP ARIBA icon",
        },
        {
          name: "SAP BW/BI",
          description: "Master BW/BI skills",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP BI icon",
        },
        {
          name: "SAP ABAP",
          description: "Learn ABAP from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP ABAP icon",
        },
        {
          name: "SAP FICO",
          description: "Learn FICO from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP FICO icon",
        },
        {
          name: "SAP MM",
          description: "Learn MM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP MM icon",
        },
        {
          name: "SAP SD",
          description: "Learn SD from experts", // Corrected description based on standard pattern
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SD icon",
        },
        {
          name: "SAP HR/HCM",
          description: "Learn HR/HCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HR/HCM icon",
        },
        {
          name: "SAP PM",
          description: "Learn PM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PM icon",
        },
        {
          name: "SAP SCM",
          description: "Learn SCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SCM icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "sap-ps": {
    // === BASIC COURSE INFO ===
    title: "SAP PS", // Used in: Page titles, headers, SEO
    fullTitle: "SAP Project Systems", // Used in: Page content, descriptions
    category: "sap", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sap-ps", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master SAP Project Systems (PS) in {city} with our expert-led course. Learn project planning, execution, control, and resource management. Our SAP PS training in {city} offers practical skills, real-world projects, and 100% placement support to help you build a successful career in project management across various industries.",
    metaTitle:
      "SAP PS Course in {city} | Top Project Systems Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SAP PS in {city}. Expert-led training in project planning, execution, and control. Certification, real-time projects & 100% placement. Launch your project management career now!",

    // === COURSE DETAILS ===
    duration: "3-4 months", // Used in: Course summary section, page content (Estimated based on typical SAP module training)
    price: { min: 45000, max: 130000 }, // Used in: JSON-LD "@type":"PriceSpecification" (Estimated)
    modules: [
      // Used in: Course summary, keywords generation, page content (Aligned with SAP PS)
      "Project Structures (WBS Elements)",
      "Network & Activity Management",
      "Resource Planning & Scheduling",
      "Cost & Revenue Planning",
      "Budgeting & Availability Control",
      "Project Reporting & Progress Analysis",
      "Material Management in Projects (Integration with MM)",
      "Integration with Financials (FI/CO)",
    ],
    prerequisites:
      "Basic understanding of project management concepts or business processes recommended", // Used in: Course details (derived from FAQ and domain knowledge)
    certification: "SAP Certified Application Associate - Project System", // Used in: Course details, JSON-LD (Standard SAP PS certification)
    jobRoles: [
      // Used in: Keywords generation, career section, page content (from "Why" section and general PS roles)
      "SAP PS Consultant",
      "Project Manager",
      "Project Planner",
      "SAP PS Functional Analyst",
      "Project Cost Controller",
      "Project Systems Specialist",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "SAP PS Course in {city}",
      subtitle: "Practical Based Job Oriented SAP Training in {city}",
      description:
        "Description: SAP Project Systems is a critical module within SAP ERP that focuses on managing projects across industries, ensuring efficient planning, execution, and control. With Connecting Dots ERP's SAP PS course in {city}, you'll learn how to streamline project management processes and gain practical skills to handle everything from project structuring to resource allocation and reporting. Our course is backed by expert trainers and real-world projects, this course is designed to make you proficient in project management roles.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "SAP PS Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          { type: "text", name: "location", placeholder: "Add your location" }, // Added missing location field
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why SAP PS ?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">SAP PS?</span>',
          content:
            "SAP Project Systems (SAP PS) is an integrated project management module that enables businesses to plan, monitor, and control projects effectively. It provides tools for project planning, execution, and reporting, ensuring that all project phases are tracked and managed efficiently. The SAP PS training in {city} helps you with the development of skills to manage complex projects, optimize resources, and ensure on-time delivery.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">SAP PS Consultant</span> do?',
          content:
            "A SAP PS Consultant implements and manages SAP PS solutions, ensuring efficient project planning, execution, and control.",
          listItems: [
            "Implement and manage SAP PS modules.",
            "Optimize project planning and execution.",
            "Ensure timely project delivery.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">SAP PS</span> training?',
          content:
            "With companies increasingly focusing on project management to achieve business objectives, the demand for SAP PS Consultants is growing rapidly. Enrolling in SAP PS training in {city}, you with hands-on experience in planning, budgeting, execution, and controlling large-scale projects. Our training program is designed to make you job-ready with practical and real-world knowledge.",
          listItems: [
            "SAP PS Consultant",
            "Project Manager",
            "Project Planner",
          ],
        },
      ],
    },

    // Data for SapModComponent (course-specific syllabus)
    sapMod: {
      title2: '<span class="highlight-span-cards">Sap PS</span> Syllabus',
      description: "Industry aligned Sap PS syllabus with certification",
      summary:
        "An exhaustive Syllabus designed by our industry experts which will help you to get placed in your dream IT company",
      noteMaster: "We provide advanced Sap PS traininG",
      noteAdvance: "Advance",
      features: [
        { label: "10+", description: "Tools" },
      ],
      overview: {
        title: "Syllabus Overview",
        modules: [
          {
            name: "Project Structures (WBS Elements)",

            subtopics: [
              "Work Breakdown Structure (WBS) Hierarchy",

              "Project Definition & Profiles",

              "Milestone Configuration",

              "Planning Elements vs Account Assignment Elements",

              "Templates & Standard WBS Models",

              "Status Management & User Status",

              "WBS Reporting & Analysis",

              "Integration with Networks & Cost Planning",
            ],
          },

          {
            name: "Network & Activity Management",

            subtopics: [
              "Network Header & Activities",

              "Relationships & Dependencies",

              "Activity Types & Work Centers",

              "Scheduling & Float Calculation",

              "Confirmation of Activities",

              "Activity Costing",

              "Capacity Planning in Networks",

              "Linking Networks to WBS Elements",
            ],
          },

          {
            name: "Resource Planning & Scheduling",

            subtopics: [
              "Internal vs External Resource Planning",

              "Personnel Assignment to Activities",

              "Work Center Capacity Allocation",

              "Shift Scheduling for Projects",

              "Resource Demand Forecasting",

              "Integrated Planning with HR",

              "Use of Project Planning Board (CJ20N)",

              "Scheduling Scenarios & Simulations",
            ],
          },

          {
            name: "Cost & Revenue Planning",

            subtopics: [
              "Primary & Secondary Cost Planning",

              "Cost Planning at WBS and Network Level",

              "Unit Costing vs Detailed Planning",

              "Revenue Planning for Customer Projects",

              "Plan/Actual Cost Comparisons",

              "Use of Costing Sheets",

              "Forecasting Cost to Completion",

              "Integration with CO-OPA (Internal Orders)",
            ],
          },

          {
            name: "Budgeting & Availability Control",

            subtopics: [
              "Budget Upload & Versions",

              "Budget Release Process",

              "Availability Control Settings",

              "Tolerance Limits & Exceptions",

              "Budgeting at WBS vs Network Level",

              "Transfer & Supplement Functions",

              "Budget Reporting (S_ALR_87013558)",

              "Integration with Investment Management",
            ],
          },

          {
            name: "Project Reporting & Progress Analysis",

            subtopics: [
              "Structure Overview Reports",

              "Actual vs Planned Cost Analysis",

              "Milestone Trend Analysis (MTA)",

              "Progress Tracking & Earned Value",

              "Project Cash Flow Reports",

              "Graphical Reporting Tools",

              "User-defined Layouts (CJ20N)",

              "SAP Fiori Apps for Project Reporting",
            ],
          },

          {
            name: "Material Management in Projects (Integration with MM)",

            subtopics: [
              "Material Assignment to WBS/Activities",

              "PR/PO Generation from Networks",

              "Inventory Tracking for Projects",

              "Project Stock (Q Stock) Handling",

              "Component Overview in CJ20N",

              "Goods Issue to Project",

              "Third-Party Procurement for Projects",

              "Integration with Valuation & Costing",
            ],
          },

          {
            name: "Integration with Financials (FI/CO)",

            subtopics: [
              "Automatic Posting of Costs & Revenues",

              "Settlement to Cost Centers/Assets",

              "Overhead Calculation from PS",

              "Accrual & Deferral Handling",

              "Integration with Internal Orders",

              "Tax & Currency Considerations",

              "Reporting in CO Module for Projects",

              "Audit Trails & Financial Reconciliation",
            ],
          },
        ],
      },
      videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
      downloadLink:
        "https://drive.google.com/file/d/SAPFICO_BrochureLink/view?usp=sharing", // Keeping provided link
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "SAP PS CERTIFICATION",
      alt: "sap-ps-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "SAP PS (Project Systems) certification provides you with the tools to manage projects from start to finish.",
      description:
        "Learn to plan, execute, and monitor projects using SAP PS, ensuring timely completion and resource optimization. This certification prepares you for roles in project management across industries.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for the SAP PS Course in {city} ?",
      paragraphs: [
        "At Connecting Dots ERP, we offer an industry-focused SAP PS course in {city} that prepares you for project management roles across various sectors. Our SAP PS certification program in {city} is designed to provide a comprehensive learning experience, covering all key aspects of SAP Project Systems, including project structuring, scheduling, resource management, and financial control. The curriculum is crafted to equip you with the practical skills needed to manage projects in real-world scenarios efficiently.",
        "Upon completion of the course, you'll earn a globally recognized SAP PS certification, enhancing your professional profile and making you more competitive in both local and international job markets. The program is also ISO-certified, ensuring that the training adheres to international quality standards. At Connecting Dots ERP, we believe in hands-on learning, which is why our SAP PS training includes live projects, case studies, and real-world practical exercises that allow you to apply the theoretical concepts you learn in the classroom.",
        "With small batch sizes of typically 10-12 students, we ensure personalized attention and greater interaction between students and instructors for an enriched learning experience. Our experienced faculty, who bring years of practical SAP industry expertise, will guide you through the training, providing you with insights into both the theory and application of SAP PS in business settings. Additionally, we offer robust placement support to help you secure your first job or advance in your career, with many of our graduates finding employment in leading companies. By choosing Connecting Dots ERP for your SAP PS training in {city}, you gain access to top-tier education, global SAP certification, and the skills necessary to excel in project management. Take your first step toward becoming an SAP PS expert today!",
      ],
      listItem1Header: "What makes our SAP PS training in {city} unique?",
      listItem1: [
        "Industry-focused curriculum covering all key aspects of SAP Project Systems",
        "Hands-on learning with live projects, case studies, and practical exercises",
        "Experienced faculty with years of practical SAP industry expertise",
        "Small batch sizes for personalized attention and interactive learning",
        "Globally recognized and ISO-certified SAP PS certification",
        "Robust placement support to help you secure job opportunities",
      ],
      listItemAfterIndex: 1, // Insert list after paragraph index 1 (the second paragraph)
      paragraphsAfterList: [], // No additional paragraphs after the list (as per previous patterns)
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "What makes SAP PS training essential for my career?",
          answer:
            "SAP PS training equips you with the tools and skills needed to manage complex projects efficiently. It's essential for anyone looking to build a career in project management across various industries, as it teaches you to optimize resources and ensure project success.",
        },
        {
          question:
            "What type of hands-on experience will I acquire throughout the training?",
          answer:
            "Our SAP PS training in {city} focuses heavily on practical experience. You'll work on live projects and case studies, giving you hands-on experience in project structuring, scheduling, and resource allocation. This ensures you're job-ready from the moment you complete the course.",
        },
        {
          question:
            "How large are the SAP PS training batches at Connecting Dots ERP?",
          answer:
            "We maintain small batch sizes of around 10-12 students to ensure a personalized learning experience. This allows for better interaction with instructors and more tailored learning.",
        },
        {
          question:
            "What career options do I have after completing the SAP PS course?",
          answer:
            "After completing the SAP PS course in {city}, you can explore roles such as SAP PS Consultant, Project Manager, and Project Planner. The skills you gain will be in high demand across industries that rely on efficient project management.",
        },
        {
          question: "Is SAP PS certification recognized by employers?",
          answer:
            "Yes, the certification you receive from Connecting Dots ERP is globally recognized and highly valued by employers. We ensure that our training aligns with industry standards, making your certification a valuable asset in the job market.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SAP PP",
          description: "Learn PP from scratch",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PP icon",
        },
        {
          name: "SAP QM",
          description: "Become a QM expert",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP QM icon",
        },
        {
          name: "SAP ABAP",
          description: "Master ABAP skills",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP ABAP icon",
        },
        {
          name: "SAP SUCCESSFACTOR",
          description: "Learn SUCCESSFACTOR from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SuccesFactor icon",
        },
        {
          name: "SAP EWM",
          description: "Learn EWM from experts", // Corrected description
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP EWM icon",
        },
        {
          name: "SAP FICO",
          description: "Learn FICO from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP FICO icon",
        },
        {
          name: "SAP SD",
          description: "Learn SD from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SD icon",
        },
        {
          name: "SAP HR/HCM",
          description: "Learn HR/HCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HR/HCM icon",
        },
        {
          name: "SAP PM",
          description: "Learn PM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PM icon",
        },
        {
          name: "SAP SCM",
          description: "Learn SCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SCM icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "sap-qm": {
    // === BASIC COURSE INFO ===
    title: "SAP QM", // Used in: Page titles, headers, SEO
    fullTitle: "SAP Quality Management", // Used in: Page content, descriptions
    category: "sap", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sap-qm", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master SAP Quality Management (QM) in {city} with our expert-led course. Learn quality planning, inspections, audits, and compliance in manufacturing and supply chain. Our SAP QM training in {city} offers hands-on experience, real-world projects, and 100% placement support to help you build a successful career in quality control.",
    metaTitle:
      "SAP QM Course in {city} | Top Quality Management Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SAP QM in {city}. Expert-led training in quality planning, inspections, and compliance. Certification, real-time projects & 100% placement. Launch your quality assurance career now!",

    // === COURSE DETAILS ===
    duration: "3-4 months", // Used in: Course summary section, page content (Estimated based on typical SAP module training)
    price: { min: 40000, max: 120000 }, // Used in: JSON-LD "@type":"PriceSpecification" (Estimated)
    modules: [
      // Used in: Course summary, keywords generation, page content (Aligned with SAP QM)
      "Quality Planning (Master Data, Inspection Plans)",
      "Quality Inspection (In-process, Goods Receipt)",
      "Quality Control (Statistical Process Control)",
      "Quality Certificates & Notifications",
      "Audits Management",
      "Failure Mode and Effects Analysis (FMEA)",
      "Integration with other SAP Modules (PP, MM, PM)",
      "Calibration Management in QM",
    ],
    prerequisites:
      "Basic understanding of quality processes or manufacturing operations recommended", // Used in: Course details (derived from "Why" and FAQ)
    certification: "SAP Certified Application Associate - Quality Management", // Used in: Course details, JSON-LD (Standard SAP QM certification)
    jobRoles: [
      // Used in: Keywords generation, career section, page content (from "Why" section and general QM roles)
      "SAP QM Consultant",
      "Quality Manager",
      "Compliance Specialist",
      "Quality Assurance Analyst",
      "SAP QM Functional Consultant",
      "Quality Control Engineer",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "SAP QM Course in {city}",
      subtitle: "Practical Based Job Oriented SAP Training in {city}",
      description:
        "SAP Quality Management is a very important module in SAP ERP, designed to streamline and optimize the quality control processes across the globe. With Connecting Dots ERP, the SAP QM course in {city} will provide you with advanced knowledge and practical skills to manage audits, quality inspections, and compliance within manufacturing and supply chain operations of various industries with numerous case studies.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "SAP QM Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          { type: "text", name: "location", placeholder: "Add your location" }, // Added missing location field
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why SAP QM ?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">SAP QM?</span>',
          content:
            "SAP Quality Management or SAP QM is a module that focuses on the quality planning, inspection, and control processes among all industries. It helps maintain consistent product quality, reduce errors, and help you comply with industry standards and regulations. The SAP QM training in {city} provided by Connecting Dots ERP trains professionals in the effective implementation of quality management strategies, procurement, and inventory management.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">SAP QM Consultant</span> do?',
          content:
            "A SAP QM Consultant implements and manages SAP QM solutions, ensuring high-quality standards in production and procurement processes.",
          listItems: [
            "Implement and manage SAP QM modules.",
            "Optimize quality processes.",
            "Ensure compliance with quality standards.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">SAP QM</span> training?',
          content:
            "The demand for SAP QM Consultants is growing as businesses focus more on quality control and compliance. By enrolling in the SAP QM course in {city} with Connecting Dots ERP, you will gain hands-on experience with real-world scenarios in quality management. We are preparing you for roles that require proficiency in planning, inspections, and audits. This practical training ensures you are job-ready, with placement support to help your career.",
          listItems: [
            "SAP QM Consultant",
            "Quality Manager",
            "Compliance Specialist",
          ],
        },
      ],
    },

    // Data for SapModComponent (course-specific syllabus)
    sapMod: {
      title2: '<span class="highlight-span-cards">Sap QM</span> Syllabus',
      description: "Industry aligned Sap QM syllabus with certification",
      summary:
        "An exhaustive Syllabus designed by our industry experts which will help you to get placed in your dream IT company",
      noteMaster: "We provide advanced Sap QM training",
      noteAdvance: "Advance",
      features: [
        { label: "10+", description: "Tools" },
      ],
      overview: {
        title: "Syllabus Overview",
        modules: [
          {
            title: "Quality Planning (Master Data, Inspection Plans)",

            subtopics: [
              "Inspection Characteristics & Master Inspection Characteristics (MICs)",

              "Inspection Methods & Catalogs",

              "Inspection Plan Creation & Assignment",

              "Sampling Procedures & Schemes",

              "Task List Management for QM",

              "Versioning of Inspection Plans",

              "Quality Info Records",

              "Integration with Engineering Change Management",
            ],
          },

          {
            title: "Quality Inspection (In-process, Goods Receipt)",

            subtopics: [
              "Inspection Lot Creation",

              "Inspection Lot Types (GR, In-process, Delivery)",

              "Results Recording Process",

              "Usage Decisions",

              "Stock Posting from Inspection",

              "Defect Recording during Inspection",

              "Inspection during Production Process",

              "Integration with Warehouse & Inventory",
            ],
          },

          {
            title: "Quality Control (Statistical Process Control)",

            subtopics: [
              "Control Charts Setup & Interpretation",

              "Defining SPC Criteria in MICs",

              "Statistical Evaluation of Inspection Results",

              "Control Limits & Alerts",

              "Trend Analysis & Process Capability",

              "Inspection Point Processing",

              "Automatic Triggering of SPC",

              "Compliance with Quality Standards",
            ],
          },

          {
            title: "Quality Certificates & Notifications",

            subtopics: [
              "Certificate Profile Creation",

              "Certificate of Analysis (COA)",

              "Certificate Printing During Delivery",

              "Notification Types & Categories",

              "Defect Notifications & Processing",

              "Corrective/Preventive Actions",

              "Reference to Inspection Lot or Equipment",

              "Workflow Integration for Notifications",
            ],
          },

          {
            title: "Audits Management",

            subtopics: [
              "Planning & Scheduling Audits",

              "Audit Types (Internal, External, Supplier)",

              "Audit Checklist Management",

              "Execution & Documentation",

              "Findings & Follow-ups",

              "Compliance Tracking",

              "Audit Reports & Dashboards",

              "Integration with Quality Notifications",
            ],
          },

          {
            title: "Failure Mode and Effects Analysis (FMEA)",

            subtopics: [
              "FMEA Structure and Methodology",

              "Risk Priority Number (RPN) Calculation",

              "Preventive and Detection Actions",

              "Linking FMEA with Inspection Plans",

              "Control Plan Setup",

              "Standard FMEA Templates",

              "Reporting & Monitoring RPN Changes",

              "Collaboration with Engineering Teams",
            ],
          },

          {
            title: "Integration with other SAP Modules (PP, MM, PM)",

            subtopics: [
              "Inspection in Procurement Process (MM)",

              "In-Process Inspection during Production (PP)",

              "Calibration Inspection (PM)",

              "Inventory Movement based on QM Results",

              "Notification Link with Maintenance Orders",

              "Vendor Evaluation Integration",

              "Production Order Quality Checks",

              "Cost Capture via Controlling Module",
            ],
          },

          {
            title: "Calibration Management in QM",

            subtopics: [
              "Calibration Task List",

              "Calibration Inspection Plans",

              "Triggering Calibration via PM Orders",

              "Result Recording for Calibration",

              "Certificate Generation for Calibration",

              "Measurement Document Creation",

              "Compliance & Regulatory Traceability",

              "Integration with Equipment Master Data",
            ],
          },
        ],
      },
      videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
      downloadLink:
        "https://drive.google.com/uc?export=download&id=149sxDtm6iwgwHFw5uiwvqjnWxprod0VE", // Keeping provided link
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "SAP QM CERTIFICATION",
      alt: "sap-qm-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "With our SAP QM (Quality Management) certification, you'll gain expertise in maintaining quality across production processes. Learn to implement quality control measures, conduct inspections, and ensure product compliance.",
      description:
        "This hands-on training positions you for roles in quality assurance and process improvement.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for the SAP QM Course in {city}?",
      paragraphs: [
        "At Connecting Dots ERP, our SAP QM course in {city} is designed to equip you with the essential skills and expertise required to thrive in Quality Management across diverse industries. The advanced syllabus covers critical aspects of SAP Quality Management, such as quality planning, inspections, audits, and compliance. Tailored to meet the latest industry demands, our program ensures that you stay up-to-date with relevant skills and knowledge. Moreover, completing our SAP QM certification course provides you with a globally recognized certification, enhancing your professional profile and making you a sought-after candidate in the job market worldwide.",
        "The SAP QM course at Connecting Dots ERP is ISO-certified, ensuring that the education you receive meets international standards of excellence. We emphasize practical, hands-on training by incorporating live projects and real-world case studies. This approach enables you to apply theoretical concepts to real business challenges, thereby sharpening your problem-solving skills. With small class sizes, our training promotes a more personalized learning experience, where students benefit from individual attention and greater interaction with experienced instructors.",
        "Our faculty consists of industry experts with years of SAP experience, bringing valuable insights to the classroom. In addition to comprehensive training, we provide dedicated placement support, assisting you in securing job opportunities after completing the course. Many of our graduates have successfully transitioned into quality management roles at top companies. By choosing Connecting Dots ERP for your SAP QM training in {city}, you are investing in a program that offers high-quality education, a globally recognized certification, and the practical skills needed to succeed in the field of Quality Management. Start your journey toward becoming a certified SAP QM professional today!",
      ],
      listItem1Header: "What makes our SAP QM training in {city} unique?",
      listItem1: [
        "Advanced syllabus covering critical aspects of SAP Quality Management",
        "Practical, hands-on training with live projects and real-world case studies",
        "Taught by industry experts with years of SAP experience",
        "Small class sizes for personalized attention and interactive learning",
        "Globally recognized and ISO-certified SAP QM certification",
        "Dedicated placement support to help you secure job opportunities",
      ],
      listItemAfterIndex: 1, // Insert list after paragraph index 1 (the second paragraph)
      paragraphsAfterList: [], // No additional paragraphs after the list (as per previous patterns)
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question:
            "Why should I choose Connecting Dots ERP for my SAP QM certification in {city}?",
          answer:
            "At Connecting Dots ERP, we offer an advanced SAP QM course in {city} designed to align with industry standards and provide real-world, hands-on training. With experienced trainers and practical project work, we ensure that you are fully prepared to meet the demands of the job market. Moving forward, our course includes placement support to help you secure a job after completing the training.",
        },
        {
          question:
            "What kind of practical experience will I get in SAP QM training?",
          answer:
            "Our SAP QM training in {city} emphasizes practical learning through live projects, case studies, and real-world scenarios. You'll gain hands-on experience in quality planning, inspections, and audits, ensuring you are ready to handle real business challenges from day one.",
        },
        {
          question:
            "How large are the SAP QM training batches at Connecting Dots ERP?",
          answer:
            "We maintain small batch sizes, typically 10-12 students, to ensure personalized attention and interactive learning experiences. This allows for more focused training and better one-on-one interaction with instructors.",
        },
        {
          question:
            "What career opportunities can I expect after completing SAP QM training?",
          answer:
            "Upon completing our SAP QM course in {city}, you can pursue roles such as SAP QM Consultant, Quality Assurance Manager, and Compliance Specialist. The skills you gain will be in high demand across industries that prioritize quality control and compliance.",
        },
        {
          question:
            "Is SAP QM certification from Connecting Dots ERP recognized by employers?",
          answer:
            "Yes, the SAP QM certification from Connecting Dots ERP is highly valued by employers. Our training program is designed to meet industry standards, and we maintain strong relationships with businesses, ensuring that our certification holds significant value in the job market.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SAP PP",
          description: "Learn PP from Experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PP icon",
        },
        {
          name: "SAP MM",
          description: "Learn MM from Experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP MM icon",
        },
        {
          name: "SAP PS",
          description: "Learn PS from Experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PS icon",
        },
        {
          name: "SAP SUCCESSFACTOR",
          description: "Learn SUCCESSFACTOR from Experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SuccesFactor icon",
        },
        {
          name: "SAP EWM",
          description: "Learn EWM from Experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP EWM icon",
        },
        {
          name: "SAP FICO",
          description: "Learn FICO from Experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP FICO icon",
        },
        {
          name: "SAP SD",
          description: "Learn SD from Experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SD icon",
        },
        {
          name: "SAP HR/HCM",
          description: "Learn HR/HCM from Experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HR/HCM icon",
        },
        {
          name: "SAP PM",
          description: "Learn PM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PM icon",
        },
        {
          name: "SAP SCM",
          description: "Learn SCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SCM icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "sap-scm": {
    // === BASIC COURSE INFO ===
    title: "SAP SCM", // Used in: Page titles, headers, SEO
    fullTitle: "SAP Supply Chain Management", // Used in: Page content, descriptions
    category: "sap", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sap-scm", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master SAP Supply Chain Management (SCM) in {city} with our expert-led course. Learn supply chain planning, logistics, procurement, and order fulfillment. Our SAP SCM training in {city} offers advanced skills, real-world projects, and 100% placement support to help you build a successful career in supply chain optimization.",
    metaTitle:
      "SAP SCM Course in {city} | Top Supply Chain Management Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SAP SCM in {city}. Expert-led training in supply chain planning, logistics, and procurement. Certification, real-time projects & 100% placement. Launch your supply chain career now!",

    // === COURSE DETAILS ===
    duration: "2-4 months", // Used in: Course summary section, page content (from FAQ)
    price: { min: 40000, max: 120000 }, // Used in: JSON-LD "@type":"PriceSpecification" (from FAQ)
    modules: [
      // Used in: Course summary, keywords generation, page content (derived from syllabus and "Why" sections)
      "Supply Chain Planning (APO)",
      "Procurement & Inventory Management",
      "Production Planning & Detailed Scheduling",
      "Logistics Execution (Warehouse & Transport)",
      "Order Fulfillment & Customer Service",
      "Supply Chain Analytics & Reporting",
      "Integration with other SAP Modules (MM, SD, PP)",
      "Demand & Supply Network Planning",
    ],
    prerequisites:
      "Basic understanding of supply chain processes or logistics recommended", // Used in: Course details (from FAQ)
    certification: "SAP Certified Application Associate - SCM", // Used in: Course details, JSON-LD (Standard SAP SCM certification)
    jobRoles: [
      // Used in: Keywords generation, career section, page content (from "Why" section and general SCM roles)
      "SAP SCM Consultant",
      "Supply Chain Manager",
      "Logistics Specialist",
      "Demand Planner",
      "Procurement Manager",
      "SAP SCM Functional Analyst",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "SAP SCM Course in {city}",
      subtitle: "Practical Based Job Oriented SAP Training in {city}",
      description:
        "SAP Supply Chain Management (SCM) is an essential module within SAP that enables businesses to efficiently manage their supply chain processes, from procurement to product delivery. Connecting Dots ERP’s SAP SCM course in {city} offers an advanced learning experience, equipping you with skills in supply chain planning, logistics, and order fulfillment. Learn from industry experts with practical, hands-on sessions that prepare you for real-world challenges.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "SAP SCM Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          { type: "text", name: "location", placeholder: "Add your location" }, // Added missing location field
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why SAP SCM?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">SAP SCM?</span>',
          content:
            "SAP Supply Chain Management (SAP SCM) is a versatile module designed to help businesses manage their entire supply chain, including planning, forecasting, procurement, production, and logistics. SAP SCM integrates with other SAP modules to provide seamless operations across the business. By enrolling in our SAP SCM training in {city}, you'll gain the expertise needed to optimize and streamline supply chain processes, reducing costs and improving overall efficiency.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">SAP SCM Consultant</span> do?',
          content:
            "A SAP SCM Consultant implements and manages SAP SCM solutions, ensuring efficient supply chain operations from procurement to delivery.",
          listItems: [
            "Implement and manage SAP SCM modules.",
            "Optimize supply chain processes.",
            "Ensure efficient procurement and distribution.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">SAP SCM</span> training?',
          content:
            "In today’s competitive landscape, businesses need efficient supply chain operations to remain competitive. The SAP SCM course in {city} offers you deep insights and practical skills to manage end-to-end supply chain activities, from demand planning to logistics execution. Our training program provides hands-on experience, preparing you for high-demand roles in supply chain management.",
          listItems: [
            "SAP SCM Consultant",
            "Supply Chain Manager",
            "Logistics Specialist",
          ],
        },
      ],
    },

    // Data for SapModComponent (course-specific syllabus)
    sapMod: {
      title2: '<span class="highlight-span-cards">Sap SCM</span> Syllabus',
      description: "Industry aligned Sap SCM syllabus with certification",
      summary:
        "An exhaustive Syllabus designed by our industry experts which will help you to get placed in your dream IT company",
      noteMaster: "We provide advanced Sap SCM training",
      noteAdvance: "Advance",
      features: [
        { label: "10+", description: "Tools" },
        
      ],
      overview: {
        title: "Syllabus Overview",
        modules: [
          {
            title: "Supply Chain Planning (APO)",

            subtopics: [
              "Overview of Advanced Planning & Optimization (APO)",

              "Demand Planning (DP)",

              "Supply Network Planning (SNP)",

              "Production Planning/Detailed Scheduling (PP/DS)",

              "Global Available-to-Promise (GATP)",

              "Integration with SAP ECC",

              "Planning Book & Data Views",

              "Heuristics and Optimizer Configuration",
            ],
          },

          {
            title: "Procurement & Inventory Management",

            subtopics: [
              "Purchase Requisition and Order Processing",

              "Vendor Selection and Evaluation",

              "Goods Receipt and Inventory Updates",

              "Inventory Valuation and Accounting",

              "Batch Management",

              "Stock Transfer and Transfer Posting",

              "Material Master Data Management",

              "Integration with MRP & Warehouse Systems",
            ],
          },

          {
            title: "Production Planning & Detailed Scheduling",

            subtopics: [
              "Production Planning Strategies",

              "Capacity Planning & Load Leveling",

              "Routing & Work Center Assignments",

              "Scheduling Algorithms in PP/DS",

              "Setup Matrix and Sequencing",

              "Order Confirmation & Execution",

              "Production Monitoring",

              "Integration with MES Systems",
            ],
          },

          {
            title: "Logistics Execution (Warehouse & Transport)",

            subtopics: [
              "Outbound Delivery Processing",

              "Goods Issue & Shipping",

              "Handling Unit Management",

              "Warehouse Structure in LE-WM",

              "Picking, Packing, and Staging",

              "Transportation Planning and Execution",

              "Carrier Selection & Freight Settlement",

              "Integration with SAP EWM & TM",
            ],
          },

          {
            title: "Order Fulfillment & Customer Service",

            subtopics: [
              "Sales Order Processing",

              "Available-to-Promise (ATP) Checks",

              "Backorder Processing",

              "Delivery Scheduling",

              "Customer Communication & CRM",

              "Returns & Reverse Logistics",

              "Service Order Management",

              "Customer Complaint Handling",
            ],
          },

          {
            title: "Supply Chain Analytics & Reporting",

            subtopics: [
              "KPI Dashboards for SCM",

              "Supply Chain Performance Metrics",

              "Inventory Turnover & Fill Rate Analysis",

              "Demand vs Forecast Accuracy",

              "Lead Time Analysis",

              "SCM Cube in BW",

              "SAP Fiori & Embedded Analytics",

              "Real-time Reporting with SAP HANA",
            ],
          },

          {
            title: "Integration with other SAP Modules (MM, SD, PP)",

            subtopics: [
              "Data Synchronization Across Modules",

              "Purchase Order to Inventory Link (MM)",

              "Sales Order to Delivery & Billing (SD)",

              "Production Orders & BOM Integration (PP)",

              "Accounting & Cost Control (FI/CO)",

              "Batch and Serial Number Tracking",

              "ATP & GATP Synchronization",

              "Cross-module Reporting & Analytics",
            ],
          },

          {
            title: "Demand & Supply Network Planning",

            subtopics: [
              "Demand Forecasting Techniques",

              "Causal and Statistical Forecasting",

              "Supply Network Design & Modeling",

              "Multi-echelon Inventory Optimization",

              "Push vs Pull Replenishment",

              "Safety Stock Planning",

              "Service Level Optimization",

              "Collaboration with Suppliers and Partners",
            ],
          },
        ],
      },
      videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
      downloadLink:
        "https://drive.google.com/file/d/SAPFICO_BrochureLink/view?usp=sharing", // Keeping provided link
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "SAP SCM CERTIFICATION",
      alt: "sap-scm-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "With our SAP SCM (Supply Chain Management) certification, you’ll gain expertise in optimizing end-to-end supply chain processes.",
      description:
        "Learn to plan, execute, and manage supply chain networks to ensure smooth operations. This certification is ideal for careers in logistics and supply chain optimization.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for the SAP SCM Course in {city} ?",
      paragraphs: [
        "Our SAP SCM course in {city} offers a cutting-edge curriculum designed to align with current industry needs. Covering all critical components of the supply chain, including procurement, logistics, and production planning, this program ensures you’re well-prepared for the job market. With ISO-certified training, you’ll receive globally recognized certification upon completion, enhancing your professional profile and grabbing opportunities both locally and internationally.",
        "At Connecting Dots ERP, we emphasize project-based learning, incorporating real-world projects and case studies into the SAP SCM course. This hands-on approach ensures that you not only grasp theoretical concepts but also understand how to apply your skills in real-world supply chain environments. Additionally, our small batch sizes, typically 10-12 students, create a personalized learning experience with more one-on-one interactions, enhancing your overall training.",
        "Our team of expert trainers consists of seasoned SAP professionals who bring years of industry experience to the classroom. You’ll benefit from their deep insights and practical knowledge, helping you gain an understanding of SAP SCM. We also offer end-to-end placement support, helping you with resume building, interview preparation, and connecting with top companies to secure job opportunities post-training.",
      ],
      listItem1Header: "What makes our SAP SCM training in {city} unique?",
      listItem1: [
        "Cutting-edge curriculum aligned with current industry needs",
        "Project-based learning with real-world projects and case studies",
        "Expert trainers with extensive industry experience",
        "Small batch sizes for personalized attention and interactive learning",
        "Globally recognized and ISO-certified SAP SCM certification",
        "End-to-end placement support with resume building and interview prep",
      ],
      listItemAfterIndex: 1, // Insert list after paragraph index 1 (the second paragraph)
      paragraphsAfterList: [], // No additional paragraphs after the list (as per previous patterns)
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "How long does it take to complete the SAP SCM course?",
          answer:
            "The SAP SCM course typically takes 2 to 4 months to complete, depending on the training format and individual learning pace. Online self-paced options may take longer, while intensive instructor-led programs can be completed in a shorter time.",
        },
        {
          question:
            "What are the course fees for the SAP SCM training program?",
          answer:
            "The course fees for an SAP SCM course typically range from 40,000 depending on course duration, and training format. For more info Please contact our support team or visit our website.",
        },
        {
          question:
            "What are the learning modes available for SAP SCM training?",
          answer:
            "The SAP SCM course is available in various learning modes, including instructor-led classroom training and online virtual classes. These flexible options allow learners to choose the format that best suits their schedule and learning preferences.",
        },
        {
          question:
            "Is placement support provided after completing the SAP SCM course?",
          answer:
            "Yes, we provide full placement support to our students, including resume reviews, interview preparation, and job connections. Many of our graduates have secured roles at top companies thanks to our dedicated support.",
        },
        {
          question:
            "Do I need any prior experience before enrolling in the SAP SCM course?",
          answer:
            "While no prior experience is strictly required, having a basic understanding of supply chain processes or logistics can be beneficial. The course is designed to cater to both beginners and professionals seeking to enhance their knowledge.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SAP PP",
          description: "Learn PP from scratch",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PP icon",
        },
        {
          name: "SAP QM",
          description: "Become a QM expert",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP QM icon",
        },
        {
          name: "SAP PS",
          description: "Master PS skills",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PS icon",
        },
        {
          name: "SAP SUCCESSFACTOR",
          description: "Learn SUCCESSFACTOR from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SuccesFactor icon",
        },
        {
          name: "SAP EWM",
          description: "Learn EWM from experts", // Corrected this description
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP EWM icon",
        },
        {
          name: "SAP FICO",
          description: "Learn FICO from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP FICO icon",
        },
        {
          name: "SAP SD",
          description: "Learn SD from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SD icon",
        },
        {
          name: "SAP HR/HCM",
          description: "Learn HR/HCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HR/HCM icon",
        },
        {
          name: "SAP PM",
          description: "Learn PM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PM icon",
        },
        {
          name: "SAP MM",
          description: "Learn MM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP MM icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "sap-sd": {
    // === BASIC COURSE INFO ===
    title: "SAP SD", // Used in: Page titles, headers, SEO
    fullTitle: "SAP Sales and Distribution", // Used in: Page content, descriptions
    category: "sap", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sap-sd", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Enroll in the best SAP SD course in {city} and master sales & distribution with expert-led training. Our SAP SD training in {city} offers real-time projects, industry-relevant curriculum, and 100% placement support to launch your career in SAP SD modules.",
    metaTitle:
      "SAP SD Course in {city} | Top Sales & Distribution Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SAP SD in {city}. Expert-led training in sales order processing, pricing, and distribution. Certification, real-time projects & 100% placement. Launch your sales career now!",

    // === COURSE DETAILS ===
    duration: "3 months", // Used in: Course summary section, page content (from FAQ)
    price: { min: 40000, max: 120000 }, // Used in: JSON-LD "@type":"PriceSpecification" (Estimated)
    modules: [
      // Used in: Course summary, keywords generation, page content (derived from syllabus and "Why" sections)
      "Sales Order Processing",
      "Pricing & Conditions",
      "Shipping & Transportation",
      "Billing & Invoice Management",
      "Credit Management",
      "Customer Master Data",
      "Sales Information System",
      "Integration with other SAP Modules (MM, FICO)",
    ],
    prerequisites:
      "No specific prerequisites, basic understanding of sales processes beneficial", // Used in: Course details (from FAQ)
    certification:
      "SAP Certified Application Associate - Sales and Distribution", // Used in: Course details, JSON-LD (Standard SAP SD certification)
    jobRoles: [
      // Used in: Keywords generation, career section, page content (from "Why" section and general SD roles)
      "SAP SD Consultant",
      "Sales Manager",
      "Distribution Specialist",
      "SAP Sales Analyst",
      "Order to Cash Process Lead",
      "SAP SD Functional Consultant",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "SAP SD Course in {city}",
      subtitle: "Practical Based Job Oriented SAP Training in {city}",
      description:
        "Enroll in the best SAP SD course in {city} and master sales & distribution with expert-led training. Our SAP SD training in {city} offers real-time projects, industry-relevant curriculum, and 100% placement support to launch your career in SAP SD modules.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "SAP SD Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          { type: "text", name: "location", placeholder: "Add your location" }, // Added missing location field
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why SAP SD ?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">SAP SD?</span>',
          content:
            "SAP SD (Sales and Distribution) is a key module in SAP ERP that manages the entire sales process, from order creation to product delivery and billing. It includes functionalities such as sales order management, pricing, shipping, billing, and credit management, helping businesses optimize and automate their sales operations. SAP SD is essential for businesses to manage customer relationships efficiently and ensure smooth product delivery and payment processes. It also integrates with other SAP modules like SAP MM (Materials Management) and SAP FICO (Financial Accounting and Controlling) for a comprehensive business solution.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">SAP SD Consultant</span> do?',
          content:
            "SAP SD training is essential because SAP SD Consultants play a key role in optimizing sales and distribution processes within organizations. With our SAP SD training in {city}, you'll gain expertise in areas like sales order processing, pricing strategies, shipping, and delivery management using SAP SD. This course prepares you for high-demand roles.",
          listItems: [
            "Implement and manage SAP SD modules.",
            "Optimize sales and distribution processes.",
            "Ensure accurate order processing and delivery.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">SAP SD</span> training?',
          content:
            "SAP SD training is essential because SAP SD Consultants play a key role in optimizing sales and distribution processes within organizations. With our SAP SD training in {city}, you'll gain expertise in areas like sales order processing, pricing strategies, shipping, and delivery management using SAP SD. This course prepares you for high-demand roles.",
          listItems: [
            "SAP SD Consultant",
            "Sales Manager",
            "Distribution Specialist",
          ],
        },
      ],
    },

    // Data for SapModComponent (course-specific syllabus)
    sapMod: {
      title2: '<span class="highlight-span-cards">Sap SD</span> Syllabus',
      description: "Industry aligned Sap SD syllabus with certification",
      summary:
        "An exhaustive Syllabus designed by our industry experts which will help you to get placed in your dream IT company",
      noteMaster: "We provide advanced Sap SD training",
      noteAdvance: "Advance",
      features: [
        { label: "10+", description: "Tools" },
      ],
      overview: {
        title: "Syllabus Overview",
        modules: [
          {
            title: "Sales Order Processing",

            subtopics: [
              "Sales Document Types (Inquiry, Quotation, Order)",

              "Order Creation & Change Processes",

              "Schedule Lines & Delivery Dates",

              "Item Categories & Copy Control",

              "Availability Check (ATP)",

              "Text Determination",

              "Output Determination (Print, Email)",

              "Integration with Delivery and Billing",
            ],
          },

          {
            title: "Pricing & Conditions",

            subtopics: [
              "Condition Technique Overview",

              "Condition Records & Types (PR00, K004, etc.)",

              "Access Sequence & Condition Tables",

              "Pricing Procedure Configuration",

              "Discounts, Surcharges & Taxes",

              "Customer/Material Specific Pricing",

              "Free Goods Determination",

              "Pricing in Sales Order & Invoice",
            ],
          },

          {
            title: "Shipping & Transportation",

            subtopics: [
              "Delivery Document Processing",

              "Shipping Point Determination",

              "Route Determination & Scheduling",

              "Picking, Packing & Handling Units",

              "Goods Issue Posting",

              "Transportation Planning & Execution",

              "Freight Cost Calculation",

              "Integration with WM & TM",
            ],
          },

          {
            title: "Billing & Invoice Management",

            subtopics: [
              "Billing Document Types",

              "Invoice Creation (VF01) & Output",

              "Pro Forma Invoice Handling",

              "Billing Plans (Milestone, Periodic)",

              "Credit & Debit Memo Processing",

              "Account Determination (FI Integration)",

              "Billing Due List Processing",

              "Archiving & Audit Compliance",
            ],
          },

          {
            title: "Credit Management",

            subtopics: [
              "Credit Control Areas",

              "Static vs Dynamic Credit Check",

              "Credit Limit Management",

              "Credit Exposure Monitoring",

              "Credit Blocks & Release Workflow",

              "Integration with Sales Order & Delivery",

              "Risk Categories & Scoring",

              "Reports & Credit Review Tools",
            ],
          },

          {
            title: "Customer Master Data",

            subtopics: [
              "General Data, Company Code & Sales Area Views",

              "Customer Account Groups",

              "Partner Functions (Sold-to, Ship-to, etc.)",

              "Customer Hierarchies",

              "Master Data Maintenance (XD01, VD01)",

              "Customer Blocking & Deletion",

              "Text, Output & Pricing Data",

              "Integration with FI & CRM",
            ],
          },

          {
            title: "Sales Information System",

            subtopics: [
              "Standard Reports & Key Figures",

              "Info Structures & Update Rules",

              "Flexible Analysis in LIS",

              "Drill-down Reports",

              "Customer & Material Statistics",

              "Quota Management & Sales Targets",

              "Forecasting Tools",

              "Integration with BW/BI",
            ],
          },

          {
            title: "Integration with other SAP Modules (MM, FICO)",

            subtopics: [
              "Third-Party Sales Processing (MM Link)",

              "Material Master View Coordination",

              "Billing Integration with FI (Account Postings)",

              "Credit Management Integration with FI/AR",

              "Inventory Checks & Reservations (MM)",

              "Revenue Recognition (FI-RA)",

              "Automatic Journal Entry Posting",

              "Cross-module Reporting & Reconciliation",
            ],
          },
        ],
      },
      videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
      downloadLink:
        "https://drive.google.com/uc?export=download&id=1fozxZAyysD6Pc5-1gpTN3oHxO_gM9i8S",
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "SAP SD CERTIFICATION",
      alt: "sap-sd-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "Become an expert in sales and distribution with our SAP SD certification. You'll learn to manage sales orders, shipping, billing, and customer relationships, ensuring efficient sales processes.",
      description:
        "This program prepares you to optimize sales functions and improve customer satisfaction for any business.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for SAP SD Training in {city}?",
      paragraphs: [
        "If you're looking to build a successful career in SAP Sales and Distribution, Connecting Dots ERP is the most trusted choice for a SAP SD course in {city}. With a curriculum tailored to meet current industry demands, our training institute delivers the perfect blend of technical expertise and practical application to help you become job-ready.",
        "Our SAP SD training in {city} covers all core components including sales order processing, pricing, billing, shipping, and customer master data. We go beyond textbook learning by providing real-time scenarios, business use cases, and project-based learning—ensuring you're prepared for real-world challenges.",
        "Led by seasoned industry professionals, our SAP SD classes in {city} are interactive, hands-on, and designed to cater to beginners as well as working professionals. Whether you're switching careers or upskilling, our personalized mentorship ensures you understand each concept thoroughly and gain confidence in handling SAP SD modules.",
        "Our commitment to quality training and student success makes us the top destination for SAP SD training in {city}. Join the growing community of professionals who chose Connecting Dots ERP for their SAP SD classes in {city}, and step confidently into a high-paying SAP career.",
      ],
      listItem1Header: "What makes our SAP SD training in {city} unique?",
      listItem1: [
        "Industry Relevant Curriculum: Our course covers all essential SD components with practical sessions and real-time scenarios.",
        "Experienced Faculty: Learn from SAP professionals with 10 years of hands-on industry experience.",
        "Flexible Learning Modes: Weekend, weekday, and online batch options to suit every learner's schedule.",
        "Affordable Fees: Accessible pricing with flexible payment plans.",
        "100% Placement Assistance: We help you prepare for interviews, build a strong resume, and connect you with top recruiters.",
        "Industry-Recognized Certification: Earn a certification that boosts your employability and career prospects.",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2 (the third paragraph)
      paragraphsAfterList: [], // No additional paragraphs after the list (as per previous patterns)
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "What is SAP SD?",
          answer:
            "SAP SD (Sales and Distribution) is a crucial module of SAP ERP, designed to manage all sales, customer distribution, and billing processes in an organization. It helps businesses streamline their sales operations, track customer data, and optimize order processing.",
        },
        {
          question:
            "Can I learn SAP SD without prior experience in sales or distribution?",
          answer:
            "Yes, you can learn SAP SD even without a background in sales or distribution. Our SAP SD course is designed to cover the basics and gradually introduce advanced concepts, making it accessible for beginners as well as professionals from different fields.",
        },
        {
          question: "Is SAP SD in demand?",
          answer:
            "Yes, SAP SD professionals are in high demand globally. With the increasing reliance on SAP systems for managing sales and distribution processes, companies are actively seeking skilled SAP SD consultants and experts to improve efficiency and drive business growth.",
        },
        {
          question: "How long does it take to complete the SAP SD course?",
          answer:
            "Our SAP SD course can be completed in 3 months, providing you with comprehensive knowledge and hands-on experience to excel in sales and distribution processes within SAP.",
        },
        {
          question:
            "What are the career opportunities after completing the SAP SD course?",
          answer:
            "Completing the SAP SD course opens up a wide range of career opportunities, including roles like SAP SD consultant, sales process manager, and SAP SD end-user. Companies across various industries value SAP SD expertise, making it a lucrative field with high growth potential.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SAP PP",
          description: "Learn PP from scratch",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PP icon",
        },
        {
          name: "SAP QM",
          description: "Become a QM expert",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP QM icon",
        },
        {
          name: "SAP PS",
          description: "Master PS skills",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PS icon",
        },
        {
          name: "SAP SUCCESSFACTOR",
          description: "Learn SUCCESSFACTOR from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SuccesFactor icon",
        },
        {
          name: "SAP EWM",
          description: "Learn EWM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP EWM icon",
        },
        {
          name: "SAP FICO",
          description: "Learn FICO from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP FICO icon",
        },
        {
          name: "SAP MM",
          description: "Learn MM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP MM icon",
        },
        {
          name: "SAP HR/HCM",
          description: "Learn HR/HCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HR/HCM icon",
        },
        {
          name: "SAP PM",
          description: "Learn PM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PM icon",
        },
        {
          name: "SAP SCM",
          description: "Learn SCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SCM icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "sap-successfactors": {
    // === BASIC COURSE INFO ===
    title: "SAP SuccessFactors", // Used in: Page titles, headers, SEO
    fullTitle: "SAP SuccessFactors Human Capital Management", // Used in: Page content, descriptions
    category: "sap", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sap-successfactors", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master SAP SuccessFactors in {city} with our expert-led course. Learn cloud-based human capital management, talent acquisition, and workforce analytics. Our SAP SuccessFactors training in {city} offers hands-on skills, real-world projects, and 100% placement support to build a successful career in modern HR.",
    metaTitle: "SAP SuccessFactors Course in {city} | Top Cloud HCM Training", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SAP SuccessFactors in {city}. Expert-led training in talent, performance, and HR analytics. Certification, real-time projects & 100% placement. Launch your cloud HR career now!",

    // === COURSE DETAILS ===
    duration: "3-4 months", // Used in: Course summary section, page content (Estimated)
    price: { min: 50000, max: 150000 }, // Used in: JSON-LD "@type":"PriceSpecification" (Estimated)
    modules: [
      // Used in: Course summary, keywords generation, page content (Aligned with SuccessFactors modules)
      "Employee Central (Core HR)",
      "Talent Acquisition (Recruiting & Onboarding)",
      "Performance & Goal Management",
      "Learning Management System (LMS)",
      "Compensation Management",
      "Workforce Planning & Analytics",
      "SuccessFactors Integrations",
      "System Configuration & Data Models",
    ],
    prerequisites:
      "No prior HR experience required, basic HR concepts beneficial", // Used in: Course details (from FAQ)
    certification: "SAP Certified Application Associate - SAP SuccessFactors", // Used in: Course details, JSON-LD (Standard SuccessFactors certification)
    jobRoles: [
      // Used in: Keywords generation, career section, page content (from "Why" section and general SuccessFactors roles)
      "SAP SuccessFactors Consultant",
      "HR Manager",
      "Talent Management Specialist",
      "HRIS Analyst",
      "SAP HCM Consultant (Cloud)",
      "Recruitment Specialist",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "SAP Succesfactor Course in {city}",
      subtitle: "Practical Based Job Oriented SAP Training in {city}",
      description:
        "SAP SuccessFactors is a top cloud-based human capital management or SAP HCM solution that helps organizations manage their workforce and optimize HR processes. Our SAP SuccessFactors course in {city} equips you with the skills to manage talent acquisition, employee performance, learning management, and workforce analytics.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "SAP Succesfactor Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          { type: "text", name: "location", placeholder: "Add your location" }, // Added missing location field
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why Sap SuccessFactors ?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">SAP SuccessFactors?</span>',
          content:
            "SAP SuccessFactors is a detailed HCM suite designed to manage human resources efficiently. It covers various HR functionalities such as recruitment, employee onboarding, performance management, and payroll. The SAP SuccessFactors training in {city} provides you with the expertise to automate and streamline HR processes while ensuring compliance with modern HR standards and best practices.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">SAP SuccessFactors Consultant</span> do?',
          content:
            "A SAP SuccessFactors Consultant implements and manages SuccessFactors solutions, ensuring efficient HR processes from recruitment to performance management.",
          listItems: [
            "Implement and manage SAP SuccessFactors modules.",
            "Optimize HR processes.",
            "Ensure effective talent management.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">SAP SuccessFactors</span> training?',
          content:
            "As more businesses transition to cloud-based HR solutions, the demand for SAP SuccessFactors consultants and HR professionals skilled in this tool is rapidly increasing. The SAP SuccessFactors course in {city} offers practical experience in implementing and managing HCM processes, empowering you with the tools to enhance employee engagement, performance, and retention in any organization.",
          listItems: [
            "SAP SuccessFactors Consultant",
            "HR Manager",
            "Talent Management Specialist",
          ],
        },
      ],
    },

    // Data for SapModComponent (course-specific syllabus)
    sapMod: {
      title2:
        '<span class="highlight-span-cards">Sap SuccessFactors</span> Syllabus',
      description:
        "Industry aligned Sap SuccessFactors syllabus with certification",
      summary:
        "An exhaustive Syllabus designed by our industry experts which will help you to get placed in your dream IT company",
      noteMaster: "We provide advanced Sap SuccessFactors training",
      noteAdvance: "Advance",
      features: [
        { label: "10+", description: "Tools" },
      ],
      overview: {
        title: "Syllabus Overview",
        modules: [
          {
            title: "Employee Central (Core HR)",

            subtopics: [
              "Foundation Objects & Generic Objects",

              "Employee & Job Information",

              "Position Management",

              "Event Reason & Workflow Management",

              "Time Off Configuration",

              "Global Benefits & Payroll Integration",

              "Data Imports & Mass Changes",

              "Role-Based Permissions (RBP)",
            ],
          },

          {
            title: "Talent Acquisition (Recruiting & Onboarding)",

            subtopics: [
              "Requisition Template Configuration",

              "Job Posting & Career Site Builder",

              "Candidate Pipeline Management",

              "Interview Scheduling & Collaboration",

              "Offer Letter Management",

              "Onboarding 2.0 Process Flow",

              "Document Management & e-Signature",

              "Integration with Employee Central",
            ],
          },

          {
            title: "Performance & Goal Management",

            subtopics: [
              "Goal Plan Template Configuration",

              "SMART Goal Alignment",

              "Performance Form Templates",

              "360-Degree Feedback Process",

              "Calibration & Talent Review",

              "Continuous Performance Management (CPM)",

              "Route Maps & Workflow Steps",

              "Integration with Compensation Planning",
            ],
          },

          {
            title: "Learning Management System (LMS)",

            subtopics: [
              "Item, Curriculum, and Program Setup",

              "Assignment Profiles & Learning Paths",

              "Online vs Instructor-Led Training (ILT)",

              "Scheduled Offerings & Class Management",

              "Completion Tracking & Evaluations",

              "Compliance & Certification Management",

              "Reporting using Plateau Reports",

              "LMS Integration with BizX",
            ],
          },

          {
            title: "Compensation Management",

            subtopics: [
              "Compensation Plan Template Design",

              "Eligibility Rules & Guidelines",

              "Budgeting & Pay Matrix Configuration",

              "Merit, Bonus & Stock Components",

              "Compensation Statements",

              "Executive Review & Planning",

              "Integration with Performance Ratings",

              "Calibration & Validation Rules",
            ],
          },

          {
            title: "Workforce Planning & Analytics",

            subtopics: [
              "Workforce Planning Models",

              "Scenario Planning & Forecasting",

              "Headcount & FTE Tracking",

              "Turnover & Attrition Metrics",

              "Operational Reporting in Report Center",

              "Canvas Reports & Story Reports",

              "Role-Based Report Access",

              "Integration with SAP Analytics Cloud",
            ],
          },

          {
            title: "SuccessFactors Integrations",

            subtopics: [
              "Integration Center Basics",

              "SAP Cloud Platform Integration (CPI)",

              "SFTP File-based Integrations",

              "OData & SFAPI APIs",

              "Point-to-Point Integrations",

              "Data Replication to SAP ERP",

              "Intelligent Services Center",

              "Employee Central Payroll (ECP) Sync",
            ],
          },

          {
            title: "System Configuration & Data Models",

            subtopics: [
              "Corporate Data Model & Succession Data Model",

              "CSF (Country Specific Fields) Setup",

              "Business Rules & Workflows",

              "Picklist Management",

              "Import/Export of Configuration",

              "Admin Center Tools (Manage Business Config)",

              "Provisioning & Instance Synchronization",

              "System Audit & Data Privacy Tools",
            ],
          },
        ],
      },
      videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
      downloadLink:
        "https://drive.google.com/uc?export=download&id=1XvyA_pqTuvanKpGIjXMNbmA12ox4wDU7",
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "SAP SUCCESSFACTOR CERTIFICATION",
      alt: "sap-successfactor-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "Our SAP SuccessFactors certification is designed for professionals looking to excel in human resource management in the cloud.",
      description:
        "Learn to manage recruitment, performance, learning, and employee engagement on the SuccessFactors platform. This certification is ideal for those aiming to streamline HR processes in global organizations.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for SAP SuccessFactors Course in {city}?",
      paragraphs: [
        "Our SAP SuccessFactors training in {city} offers a comprehensive and updated syllabus that covers all key aspects of HR management, such as recruitment, onboarding, performance appraisals, and employee engagement. In addition to mastering these critical functions, you will learn how to leverage data-driven insights to optimize HR processes and strategies, giving you an edge in today's competitive job market. The globally recognized certification you receive upon course completion validates your expertise and strengthens your professional profile.",
        "This ISO-certified program ensures that the curriculum and training meet international standards, giving you confidence in the skills and knowledge you gain. Practical, hands-on training is a core part of the SAP SuccessFactors course in {city}, with real-world projects, live case studies, and simulations designed to provide you with valuable experience in handling HR and HCM roles. The course is taught by expert faculty with years of industry experience, offering insights into both the technical and business aspects of SAP SuccessFactors.",
        "In addition to expert-led learning, you will benefit from placement assistance. Our dedicated team will help with resume building, interview preparation, and connecting you with potential employers. The course also incorporates the latest HR tools and techniques used by top organizations, ensuring you’re well-versed in the technologies and strategies leading HR departments rely on.",
      ],
      listItem1Header:
        "What makes our SAP SuccessFactors training in {city} unique?",
      listItem1: [
        "Comprehensive and updated syllabus covering all key HR aspects",
        "ISO-certified program ensuring international quality standards",
        "Practical, hands-on training with real-world projects and simulations",
        "Taught by expert faculty with years of industry experience",
        "Dedicated placement assistance for resume building and interview prep",
        "Incorporates latest HR tools and techniques used by top organizations",
      ],
      listItemAfterIndex: 1, // Insert list after paragraph index 1 (the second paragraph)
      paragraphsAfterList: [], // No additional paragraphs after the list (as per previous patterns)
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question:
            "Can I enroll in this course if I don’t have any HR experience?",
          answer:
            "Absolutely! No prior HR experience is required. Our SAP SuccessFactors course is designed for both beginners looking to enter the HR field and experienced professionals aiming to upgrade their skills. You’ll get foundational as well as advanced knowledge tailored to your needs.",
        },
        {
          question:
            "What kind of learning experience can I expect—online or Classroom?",
          answer:
            "You can choose what suits you best! We offer both SAP Successfactor Classroom training in {city} and live, interactive online sessions. Our online training is designed to be just as immersive and practical as the classroom experience, with real-time Q&A and collaborative projects.",
        },
        {
          question:
            "Will this certification guarantee me a job after completion?",
          answer:
            "While no course can guarantee a job, we offer dedicated placement support to connect you with top employers. From resume-building to interview coaching, our support team is there to ensure you're job-ready. Many of our graduates have successfully secured roles at top MNCs soon after completing the course.",
        },
        {
          question:
            "How much practical, hands-on experience will I gain during this course?",
          answer:
            "You’ll work on real-world SAP SuccessFactors projects and live case studies throughout the course. Our hands-on approach ensures you not only understand the theory but can also apply it in real HR scenarios, making you job-ready from day one.",
        },
        {
          question:
            "How is this certification recognized in the global job market?",
          answer:
            "The SAP SuccessFactor certification you earn is globally recognized, making you a competitive candidate in the international job market. Employers worldwide value SAP SuccessFactor's expertise, and your certification will significantly boost your employability.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SAP PP",
          description: "Learn PP from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PP icon",
        },
        {
          name: "SAP QM",
          description: "Learn QM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP QM icon",
        },
        {
          name: "SAP PS",
          description: "Learn PS from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PS icon",
        },
        {
          name: "SAP MM",
          description: "Learn MM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP MM icon",
        },
        {
          name: "SAP EWM",
          description: "Learn EWM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP EWM icon",
        },
        {
          name: "SAP FICO",
          description: "Learn FICO from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP FICO icon",
        },
        {
          name: "SAP SD",
          description: "Learn SD from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SD icon",
        },
        {
          name: "SAP HR/HCM",
          description: "Learn HR/HCM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP HR/HCM icon",
        },
        {
          name: "SAP PM",
          description: "Learn PM from experts",
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP PM icon",
        },
        {
          name: "SAP SCM",
          description: "Learn SCM from experts", // Corrected description
          icon: "https://i.imgur.com/HbmlQ9u.png",
          alt: "SAP SCM icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  // IT COURSES

  it: {
    // === BASIC COURSE INFO ===
    title: "IT", // Used in: Page titles, headers, SEO
    fullTitle: "Information Technology Training Program", // Used in: Page content, descriptions
    category: "it", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "it", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master IT skills with our comprehensive software training in {city}. Learn Python, Java, Data Science, Web Development, and more with expert-led training. Our IT course in {city} offers hands-on experience, real-world projects, and 100% placement support to help you build a successful career in technology.",
    metaTitle: "IT Courses in {city} | Best Software Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master IT skills in {city}. Expert-led software training, Python, Java, Data Science. Certification, real projects & 100% placement. Launch your tech career now!",

    // === COURSE DETAILS ===
    duration: "4-6 months", // Used in: Course summary section, page content
    price: { min: 35000, max: 100000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Python Programming",
      "Java Development",
      "Data Science & Analytics",
      "Web Development (HTML, CSS, JavaScript)",
      "Database Management (SQL)",
      "Software Engineering Principles",
      "Data Structures & Algorithms",
      "Full Stack Development",
    ],
    prerequisites: "Basic computer knowledge and logical thinking ability", // Used in: Course details
    certification: "Industry-Recognized IT Professional Certificate", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "Software Developer",
      "Full Stack Developer",
      "Front-End Developer",
      "Back-End Developer",
      "Java Developer",
      "Python Developer",
      "Data Analyst",
      "Web Developer",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Software Training in {city} with placement support",
      subtitle:
        "Get Certified with the advance IT training institute in {city}",
      description:
        "Connecting Dots ERP offers an advanced IT course in {city} designed to equip you with the essential skills to excel in the fast-evolving tech industry. Our advance and detailed training program covers key modules such as Data Science, Data Analytics, Python, and Java, ensuring you gain the expertise to work with cutting-edge technologies and solve complex business problems. By mastering these modules, you'll be prepared to take on roles like Data Scientist, Data Analyst, Python Developer, and Java Developer. Our course is tailored to help you build a strong foundation and land your dream job in the dynamic field of IT.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "IT Training Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "What is Software Development Course in {city}?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">Software Development</span>?',
          content:
            "Software development is a vital function in today's technology-driven world, responsible for creating applications, systems, and solutions that drive innovation and business growth. Effective software development ensures that organizations can meet customer needs, improve efficiency, and stay competitive in the digital age. If you're looking to build a career in software development, our software course in {city} offers comprehensive training in core software development concepts and practices. You'll gain a deep understanding of programming languages like Python, Java, and more, along with key topics such as software architecture, web development, databases, and data structures. Our course is designed to equip you with the skills and knowledge needed to succeed in the fast-evolving software development industry.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">Software Developer</span> do?',
          content:
            "A Software Developer is responsible for designing, coding, testing, and maintaining software applications and systems within an organization. Their role involves creating solutions to meet business needs, optimizing performance, and ensuring the functionality of applications across various platforms. Key responsibilities include software development, debugging, database management, user interface design, and collaborating with teams to deliver high-quality code. By mastering these technical skills, software developers contribute to the overall success and innovation of an organization. If you're looking to launch your career in software development, our IT training in {city} offers comprehensive courses in programming, web development, data structures, and more to help you become a proficient software developer.",
        },
        {
          title:
            'Why Take <span class="highlight-span-cards">IT Training</span> in {city}?',
          content:
            "A Software Developer must possess a diverse skill set to design, develop, and maintain high-quality applications. Our IT training in {city} offers advanced training in key software development modules, preparing you to handle end-to-end software development processes, from coding to deployment. You will gain hands-on experience in programming languages like Python, Java, and web development frameworks, as well as in debugging, database management, and version control. Upon completing the course, you will be qualified to take on roles such as:",
          listItems: [
            "Software Developer",
            "Full Stack Developer",
            "Front-End Developer",
            "Back-End Developer",
            "Java/Python Developer",
          ],
        },
      ],
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "IT Training Certificate",
      alt: "software-course-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The Connecting Dots Software Certification Course in {city} is designed to provide you with in-depth knowledge and hands-on experience in key software development technologies. Our comprehensive program covers programming languages, development frameworks, and industry best practices, equipping you with the skills to build, test, and deploy software solutions.",
      description:
        "With expert trainers and real-world projects, you'll be ready to excel in the fast-paced world of software development.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for IT Training in {city}?",
      paragraphs: [
        "Connecting Dots ERP offers a comprehensive Software course in {city} designed to equip you with the essential skills and knowledge to succeed in the fast-evolving field of software development. Our industry-focused curriculum covers a wide range of software development modules, including Python, Java, Data Structures, Web Development, and Software Engineering Principles.",
        "Expert Faculty: Our course is led by experienced software professionals who bring real-world expertise to the classroom. They provide personalized mentorship and guidance, ensuring you gain a deep understanding of programming concepts and development practices.",
        "Flexible Learning Options: We understand that everyone has different learning styles and schedules. Our flexible learning options, including online and classroom-based training, allow you to learn at your own pace and convenience, so you can fit your studies around your life.",
        "Job Placement Assistance: Our dedicated placement team works closely with top tech companies to help you secure your dream software development job. We provide resume building workshops, mock interviews, and career counseling to prepare you for the job market. Our software course in {city} with placement support ensures you're not just learning, but also landing the job you deserve.",
      ],
      listItem1Header: "What makes our IT training in {city} unique?",
      listItem1: [
        "Advance Curriculum: Our course covers all essential aspects of software development, including programming languages, web development, databases, software architecture, and more.",
        "Industry-Relevant Skills: You'll develop the skills and knowledge needed to succeed in today's competitive software development landscape.",
        "Certification and Recognition: Upon successful completion of the course, you'll receive a recognized certification that validates your software development expertise.",
        "Networking Opportunities: Connect with fellow students, industry professionals, and instructors, expanding your professional network.",
        "Lifelong Learning: Our commitment to your success extends beyond the classroom with continuous learning opportunities.",
      ],
      listItemAfterIndex: 3, // Insert list after paragraph index 3
      paragraphsAfterList: [
        "By enrolling in our IT course in {city} at Connecting Dots ERP, you'll gain the confidence and skills needed to excel in your software development career. Whether you're a beginner or looking to expand your expertise, our course is tailored to take your career to the next level.",
        "Contact us to learn more about our Software training institute in {city}, course fees, and upcoming batches.",
      ],
      secondTitle: "What Will You Learn in the IT Training Program?",
      secondParagraphs: [
        "Software Course Overview: In our Software course in {city}, you will gain in-depth knowledge of key software development modules, including programming languages like Python and Java, Web Development, Data Structures, Algorithms, and Software Architecture. This course will equip you with the skills to design, develop, and maintain applications, optimize software processes, and ensure seamless integration across platforms.",
        "Software System Configuration and Customization: Gain hands-on experience with IT training in {city} in system configuration, learning how to customize software applications to meet specific business needs. You will explore different development frameworks, coding practices, and integration steps to streamline software workflows and ensure that applications perform optimally.",
        "Software Integration Across Modules: Learn how different software modules work together to create cohesive applications. Understand the integration points between back-end systems, front-end user interfaces, and databases, ensuring smooth data flow and consistency.",
        "Data Migration and Software Implementation: Understand the process of migrating data from legacy systems to modern software platforms. Learn about data cleansing, mapping, and loading techniques, along with strategies for managing software implementation projects.",
      ],
      highlights: [
        "Expert Faculty",
        "Flexible Learning Options",
        "Hands-On Learning",
        "Job Placement Assistance",
        "Advance Curriculum",
        "Industry-Relevant Skills",
        "Certification and Recognition",
        "Networking Opportunities",
        "Lifelong Learning",
      ],
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Why should I learn Full Stack Development?",
          answer:
            "Full Stack Development allows you to work on both front-end and back-end technologies, making you versatile and in-demand. Our Software course in {city} prepares you with skills in HTML, CSS, JavaScript, Node.js, and more for a successful career in web development.",
        },
        {
          question: "What are the different modes of training provided?",
          answer:
            "We offer flexible training options at our Software training institute in {city}, including classroom-based, online instructor-led, and self-paced learning. Choose the mode that best fits your schedule and learning style with our Software course in {city}.",
        },
        {
          question:
            "Can I ask for an extra session if I need to better understand the topics?",
          answer:
            "Yes, you can request extra sessions or one-on-one mentoring to clarify any doubts. Our IT training institute in {city} ensures personalized support throughout your Software course in {city}.",
        },
        {
          question: "What type of projects are involved in this course?",
          answer:
            "You'll work on real-world projects like dynamic websites, RESTful APIs, and database integrations. These hands-on projects in our Software course in {city} ensure you're job-ready with practical experience.",
        },
        {
          question: "Is Full Stack Developer a good job?",
          answer:
            "Full Stack Developers enjoy high demand, great earning potential, and job security. Our Software training institute in {city} equips you with the necessary skills to thrive in this rewarding career path.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "Chat GPT & AI",
          description: "Learn AI from scratch",
          icon: "https://i.imgur.com/QHuijGO.mp4",
          alt: "Chat GPT icon",
        },
        {
          name: "Masters in Data Science",
          description: "Become a data science expert",
          icon: "https://i.imgur.com/C0Hv62l.mp4",
          alt: "Data Science icon",
        },
        {
          name: "Masters in Data Analytics",
          description: "Master data analytics skills",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "Data Analytics icon",
        },
        {
          name: "Salesforce",
          description: "Salesforce developer courses",
          icon: "https://i.imgur.com/6brz8Ea.mp4",
          alt: "SALESFORCE icon",
        },
        {
          name: "UI/UX Design",
          description: "Design stunning user interfaces",
          icon: "https://i.imgur.com/9FN2rSu.mp4",
          alt: "UI/UX icon",
        },
        {
          name: "Full-Stack Python",
          description: "Full-stack development with Python",
          icon: "https://i.imgur.com/grx2N9O.mp4",
          alt: "Full Stack icon",
        },
        {
          name: "Tableau",
          description: "Data visualization with Tableau",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Tableau icon",
        },
        {
          name: "PowerBI",
          description: "Business intelligence with PowerBI",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Power BI icon",
        },
        {
          name: "SQL",
          description: "Learn SQL from experts",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "SQL icon",
        },
        {
          name: "Reactjs Framework",
          description: "Learn Reactjs from Industry Experts",
          icon: "https://i.imgur.com/QxPxKeN.mp4",
          alt: "React icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 75, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-06-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "business-analytics": {
    // === BASIC COURSE INFO ===
    title: "Business Analytics", // Used in: Page titles, headers, SEO
    fullTitle: "Master in Business Analytics", // Used in: Page content, descriptions
    category: "analytics", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "business-analytics", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master Business Analytics in {city} with our comprehensive course. Learn data analysis, business intelligence, predictive analytics, and data visualization. Our Business Analytics training in {city} offers hands-on experience with real-world business data, industry-relevant curriculum, and 100% placement support to help you build a successful career in data-driven decision making.",
    metaTitle:
      "Business Analytics Course in {city} | Best BA Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master Business Analytics in {city}. Expert-led training in data analysis, BI tools, predictive modeling. Certification, real projects & 100% placement. Launch your analytics career now!",

    // === COURSE DETAILS ===
    duration: "15-20 months", // Used in: Course summary section, page content
    price: { min: 60000, max: 150000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Data Analysis & Visualization",
      "Business Intelligence Tools",
      "Predictive Analytics & Modeling",
      "Statistical Analysis",
      "Tableau & Excel Advanced",
      "Python for Business Analytics",
      "SQL & Database Management",
      "Big Data Analytics",
      "Machine Learning for Business",
    ],
    prerequisites: "Basic mathematics and business understanding recommended", // Used in: Course details
    certification: "Certified Business Analytics Professional", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "Business Analyst",
      "Data Analyst",
      "Business Intelligence Analyst",
      "Management Consultant",
      "Data Scientist",
      "Analytics Consultant",
      "Business Intelligence Developer",
      "Market Research Analyst",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Business Analytics Course in {city}",
      subtitle:
        "Take advantage of the Business Analytics Training Certificate Course to advance your profession quickly",
      description:
        "The Connecting Dots ERP's Business Analytics Course in {city} is intended to give students the tools they need to succeed in the industry. Important subjects covered in the course include business intelligence, data visualization, data analysis, and predictive analytics. Our business analytics training in {city} guarantees that you are ready for opportunities in prestigious firms that focus on data-driven decision-making careers by giving you practical experience working with real-world business data.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "Business Analytics Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why Business Analytics?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">Business Analytics?</span>',
          content:
            "Business analytics is a field of study that uses statistical techniques, predictive modeling, and data analysis to evaluate and interpret business data to make strategic decisions. To prepare students for careers as business analysts, data analysts, and business intelligence analysts, the Business Analytics Course in {city} focuses on teaching students how to use data to solve practical business problems. This course provides you with the skills necessary to convert data into useful business insights, with a curriculum designed with {city}'s thriving business community in mind.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">Business Analyst</span> do?',
          content:
            "Business analysts are essential in helping organizations make data-driven choices. They use techniques like statistical analysis, data visualization, and predictive modeling to evaluate corporate data to find patterns, opportunities, and difficulties. Business analysts work with several departments to guarantee the successful execution of data-driven plans.",
          listItems: [
            "Identify and collect data from various business operations.",
            "Analyze business data to uncover trends and insights.",
            "Formulate strategies to solve business challenges using data insights.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">Business Analytics</span> training?',
          content:
            "Business Analysts are key to driving business success. Our course teaches you to use data analytics, statistical tools, and business intelligence for optimal business outcomes.",
          listItems: [
            "Business Analyst",
            "Management Consultant",
            "Data Analyst",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
    modulesData: {
      title: "Business Analytics CURRICULUM",
      globalActions: {
        startLearning: "https://example.com/start-learning-business-analytics",
        downloadCurriculum:
          "https://example.com/download-curriculum-business-analytics",
      },
      banner: {
        title: "Master Data Analytics for Business Decision Making",
        subtitle:
          "From Excel to Machine Learning, become a data-driven problem solver.",
        image:
          "https://res.cloudinary.com/dudu879kr/image/upload/v1752485069/ITBanner_vkag1x.webp",
        technologies: [
          "Excel",
          "SQL",
          "Python",
          "Tableau",
          "Big Data",
          "ML Ops",
        ],
      },
      tabs: [
        {
          modules: [
            {
              title: "Tableau + Excel",
              duration: "5 Months",
              content: [
                "Advanced Excel functions and data manipulation",
                "Tableau fundamentals and dashboard creation",
                "Data visualization best practices",
                "Interactive reporting and storytelling with data",
                "Business intelligence dashboard design",
                "Data connection and blending techniques",
              ],
              detailedContent: [
                "Master Excel for advanced business analytics",
                "Build interactive dashboards in Tableau",
                "Design effective BI visuals for stakeholders",
                "Tell compelling data stories with visuals",
                "Combine data from multiple sources",
                "Follow industry standards for dashboard creation",
              ],
              toolsAndTechnologies: [
                {
                  name: "MLflow",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958127/mlflow_ih6orq.avif",
                  alt: "MLflow",
                },
                {
                  name: "Docker",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958118/docker_lxl4kz.webp",
                  alt: "Docker",
                },
                {
                  name: "Kubernetes",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958126/Kubernetes_mgxslj.webp",
                  alt: "Kubernetes",
                },
                {
                  name: "TensorFlow",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958142/tensorflow_fltbbj.webp",
                  alt: "TensorFlow",
                },
              ],
              actions: {
                startLearning:
                  "https://example.com/start-learning-business-analytics",
                downloadCurriculum:
                  "https://example.com/download-curriculum-business-analytics",
              },
            },
            {
              title: "Python Basic to Advance",
              duration: "4 Months",
              content: [
                "Python programming fundamentals",
                "Data manipulation with Pandas and NumPy",
                "Statistical analysis with Python libraries",
                "Data visualization with Matplotlib and Seaborn",
                "Web scraping and API integration",
                "Automation and scripting for business processes",
              ],
              detailedContent: [
                "Master Python for business data tasks",
                "Analyze data using Pandas & NumPy",
                "Create effective data visualizations",
                "Scrape websites & use APIs for insights",
                "Automate reporting workflows",
                "Apply statistical tools to real datasets",
              ],
              toolsAndTechnologies: [
                {
                  name: "Python",
                  icon: "https://img.icons8.com/color/48/000000/python.png",
                  alt: "Python logo",
                },
                {
                  name: "Pandas",
                  icon: "https://img.icons8.com/color/48/000000/pandas.png",
                  alt: "Pandas logo",
                },
                {
                  name: "NumPy",
                  icon: "https://img.icons8.com/color/48/000000/numpy.png",
                  alt: "NumPy logo",
                },
                {
                  name: "Matplotlib",
                  icon: "https://img.icons8.com/color/48/000000/matplotlib.png",
                  alt: "Matplotlib logo",
                },
              ],
              actions: {
                startLearning:
                  "https://example.com/start-learning-business-analytics",
                downloadCurriculum:
                  "https://example.com/download-curriculum-business-analytics",
              },
            },
            {
              title: "Structured Query Language(SQL)",
              duration: "3 Months",
              content: [
                "Database fundamentals and design principles",
                "Advanced SQL queries and joins",
                "Data aggregation and window functions",
                "Stored procedures and database optimization",
                "Data warehousing concepts",
                "ETL processes and data pipeline creation",
              ],
              detailedContent: [
                "Design effective relational schemas",
                "Write optimized SQL queries for analytics",
                "Use window functions for deep insights",
                "Create stored procedures for automation",
                "Understand data warehousing architecture",
                "Build scalable ETL pipelines",
              ],
              toolsAndTechnologies: [
                {
                  name: "MySQL",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1752297330/imgi_158_sql-3d-icon-png_xh9ule.png",
                  alt: "sql",
                },
                {
                  name: "PostgreSQL",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958131/postgree_gstwpl.webp",
                  alt: "postgree",
                },
                {
                  name: "SQL Server",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958142/sqlserver_omumwf.webp",
                  alt: "sqlserver",
                },
                {
                  name: "Oracle",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958131/oracle_rfcihh.webp",
                  alt: "oracle",
                },
              ],
              actions: {
                startLearning:
                  "https://example.com/start-learning-business-analytics",
                downloadCurriculum:
                  "https://example.com/download-curriculum-business-analytics",
              },
            },
            {
              title: "Big Data Computing",
              duration: "3 Months",
              content: [
                "Introduction to Big Data technologies",
                "Hadoop ecosystem and distributed computing",
                "Apache Spark for large-scale data processing",
                "NoSQL databases and data storage solutions",
                "Cloud computing platforms for analytics",
                "Real-time data processing and streaming analytics",
              ],
              detailedContent: [
                "Understand Hadoop and Spark fundamentals",
                "Work with NoSQL storage systems",
                "Leverage AWS for big data workflows",
                "Stream and batch data processing models",
                "Implement real-time analytics solutions",
                "Manage distributed data systems",
              ],
              toolsAndTechnologies: [
                {
                  name: "Hadoop",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958120/hadoop_i72dgc.webp",
                  alt: "hadoop",
                },
                {
                  name: "Spark",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958138/spark_pnysg0.webp",
                  alt: "apachespark",
                },
                {
                  name: "Kafka",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1752302769/imgi_148_kafka_m4ewr7.png",
                  alt: "kafka",
                },
                {
                  name: "Hive",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958121/hive_rjhtj9.webp",
                  alt: "hive",
                },
              ],
              actions: {
                startLearning:
                  "https://example.com/start-learning-business-analytics",
                downloadCurriculum:
                  "https://example.com/download-curriculum-business-analytics",
              },
            },
            {
              title: "Production ML Systems",
              duration: "2 Months",
              content: [
                "Scalable ML system architecture",
                "Model serving and API development",
                "A/B testing for ML models",
                "Monitoring and alerting systems",
                "Security and compliance in ML systems",
                "Cost optimization for production ML",
              ],
              detailedContent: [
                "Design scalable ML architecture",
                "Deploy models with APIs and services",
                "Run experiments with A/B testing",
                "Set up monitoring tools for ML",
                "Ensure model compliance and security",
                "Reduce infrastructure costs with optimization",
              ],
              toolsAndTechnologies: [
                {
                  name: "Apache Air Flow",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958114/Apache_airflow_ameg1k.webp",
                  alt: "Apache Air Flow",
                },
                {
                  name: "Kubeflow",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958124/kubeflow_vitenc.webp",
                  alt: "Kubeflow",
                },
                {
                  name: "Prometheus",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958133/prometheus_ts651w.webp",
                  alt: "Prometheus",
                },
                {
                  name: "TensorFlow",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958142/tensorflow_fltbbj.webp",
                  alt: "TensorFlow",
                },
              ],
              actions: {
                startLearning:
                  "https://example.com/start-learning-business-analytics",
                downloadCurriculum:
                  "https://example.com/download-curriculum-business-analytics",
              },
            },
          ],
        },
      ],
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "Business Analytics Certificate",
      alt: "business-analytics-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The Masters in Business Analytics Certification at Connecting Dots ERP focuses on turning data into actionable business insights.",
      description:
        "Learn to use analytics tools to optimize business processes, improve decision-making, and drive growth. This program ensures you're ready to meet the increasing demand for analytics experts in the corporate world.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for Business Analytics training in {city}?",
      paragraphs: [
        "We at Connecting Dots ERP provide an extensive Master in Business Analytics Course in {city} that will equip you with a thorough understanding of statistical modeling, business intelligence, and data analysis. Key topics including business analytics, big data, and sophisticated visualization tools are included in the curriculum, which was created by industry experts. Our Business Analytics Course in {city} with Placement makes sure that students are prepared for the workforce by ensuring that they not only understand theoretical ideas but also get practical experience working on real-world projects.",
        "Project-based, hands-on learning is emphasized in our Business Analytics Training with Placement. Students gain proficiency with tools like Tableau, R, Python, and SQL while tackling real-world business issues. Proficiency instructors infuse their practical industry expertise into the classroom, guaranteeing that students are equipped to face real-world obstacles. Additionally, students can continuously improve their abilities thanks to our round-the-clock lab access. For students hoping to launch a lucrative career in business analytics, Connecting Dots ERP is the best option due to its solid industry connections and 100% placement assistance.",
        "Through workshops, webinars, and events, we offer a wealth of networking opportunities with industry leaders and experts to further boost your learning. These interactions provide students with opportunities for professional progress and mentorship in addition to keeping them informed about the most recent developments in business analytics. Each student receives individualized attention from our committed placement team, which helps them secure elite positions in the business analytics sector by making sure they are interview-ready.",
      ],
      listItem1Header:
        "What makes our Business Analytics training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering statistical modeling and business intelligence",
        "Hands-on experience with industry-standard tools like Tableau, Python, R, and SQL",
        "Expert faculty with real-world industry experience in analytics",
        "24/7 lab access for continuous skill development",
        "100% placement assistance with strong industry connections",
        "Real-world projects and case studies from various industries",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question:
            "Who can enroll in the Business Analytics Course in {city}?",
          answer:
            "Anyone interested in data analysis and its application to business decision-making can enroll in the Business Analytics Course in {city}, regardless of their academic or professional background.",
        },
        {
          question:
            "How is the Business Analytics Training in {city} different from other courses?",
          answer:
            "Our Business Analytics Training in {city} with Placement focuses on practical skills, hands-on projects, and real-world applications, ensuring that students are job-ready when they complete the course.",
        },
        {
          question:
            "What sets Connecting Dots ERP apart for Business Analytics Training?",
          answer:
            "We offer a unique combination of practical training, industry exposure, and 100% job assistance, ensuring that our students get a complete learning experience and are well-prepared for {city}'s competitive job market.",
        },
        {
          question:
            "Will I get access to lab facilities during the Business Analytics Course?",
          answer:
            "Yes, students have access to state-of-the-art labs 24/7, equipped with the latest business analytics tools and software.",
        },
        {
          question:
            "Can I attend a demo class before enrolling in the Business Analytics Course?",
          answer:
            "Absolutely! We offer prospective students the chance to attend a demo class, so they can experience our teaching methodology and course structure firsthand before enrolling in the Business Analytics Course in {city}.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "Chat GPT & AI",
          description: "Learn AI from scratch",
          icon: "https://i.imgur.com/QHuijGO.mp4",
          alt: "Chat GPT icon",
        },
        {
          name: "Masters in Data Science",
          description: "Become a data science expert",
          icon: "https://i.imgur.com/C0Hv62l.mp4",
          alt: "Data Science icon",
        },
        {
          name: "Masters in Data Analytics",
          description: "Master data analytics skills",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "Data Analytics icon",
        },
        {
          name: "Salesforce",
          description: "Salesforce developer courses",
          icon: "https://i.imgur.com/6brz8Ea.mp4",
          alt: "SALESFORCE icon",
        },
        {
          name: "UI/UX Design",
          description: "Design stunning user interfaces",
          icon: "https://i.imgur.com/9FN2rSu.mp4",
          alt: "UI/UX icon",
        },
        {
          name: "Full-Stack Python",
          description: "Full-stack development with Python",
          icon: "https://i.imgur.com/grx2N9O.mp4",
          alt: "Full Stack Python icon",
        },
        {
          name: "Full-Stack Java",
          description: "Full-stack development with Java",
          icon: "https://i.imgur.com/SYHIAAO.mp4",
          alt: "Java icon",
        },
        {
          name: "PowerBI",
          description: "Business intelligence with PowerBI",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Power BI icon",
        },
        {
          name: "SQL",
          description: "Learn SQL from experts",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "SQL icon",
        },
        {
          name: "Reactjs Framework",
          description: "Learn Reactjs from Industry Experts",
          icon: "https://i.imgur.com/QxPxKeN.mp4",
          alt: "React icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.7, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 95, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-04-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-20T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "data-analytics": {
    // === BASIC COURSE INFO ===
    title: "Data Analytics", // Used in: Page titles, headers, SEO
    fullTitle: "Master in Data Analytics", // Used in: Page content, descriptions
    category: "analytics", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "data-analytics", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master Data Analytics in {city} with our comprehensive course. Learn data mining, statistical modeling, predictive analysis, and data visualization. Our Data Analytics training in {city} offers hands-on experience with structured and unstructured data, industry-relevant curriculum, and 100% placement support to help you build a successful career as a Data Analyst or Data Scientist.",
    metaTitle:
      "Data Analytics Course in {city} | Best DA Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master Data Analytics in {city}. Expert-led training in data mining, statistical modeling, Python, SQL. Certification, real projects & 100% placement. Launch your analytics career now!",

    // === COURSE DETAILS ===
    duration: "15-20 months", // Used in: Course summary section, page content
    price: { min: 55000, max: 140000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Statistical Analysis & Modeling",
      "Data Mining & Processing",
      "Predictive Analytics",
      "Data Visualization Tools",
      "Python for Data Analytics",
      "SQL & Database Management",
      "Excel Advanced Analytics",
      "Tableau & Power BI",
      "Machine Learning Fundamentals",
    ],
    prerequisites: "Basic mathematics and analytical thinking skills", // Used in: Course details
    certification: "Certified Data Analytics Professional", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "Data Analyst",
      "Business Analyst",
      "Data Scientist",
      "Operations Analyst",
      "Market Research Analyst",
      "Business Intelligence Analyst",
      "Data Visualization Specialist",
      "Quantitative Analyst",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Data Analytics Course in {city}",
      subtitle:
        "Practical Based Job Oriented Data Analytics Training in {city}",
      description:
        "To evaluate both structured and unstructured data and turn it into insights that can be put to use, the Data Analytics Course in {city} focuses on teaching the methods and resources needed. In addition to focusing on developing abilities in data mining, predictive analysis, and statistical modeling, this program prepares graduates for positions as data scientists, analysts, and business analysts.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "Data Analytics Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why Data Analytics?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">Data Analytics?</span>',
          content:
            "Teaching the methods and resources needed to evaluate both structured and unstructured data and turn it into insights that can be put to use is the main goal of the data analytics course. Graduates of this program are prepared for positions as business analysts, data scientists, and analysts of data, with an emphasis on developing skills in statistical modeling, data mining, and predictive analysis.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">Data Analyst</span> do?',
          content:
            "A data scientist analyzes data to provide actionable insights for various processes. They possess strong statistical, analytical, and technical skills to work with structured and unstructured data.",
          listItems: [
            "Identify and gather relevant data from various sources",
            "Analyze data to extract meaningful insights",
            "Develop data-driven strategies to address business challenges",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">Data Analytics</span> training?',
          content:
            "Our Data Analytics Certification Course in {city} focuses on providing the technical skills needed to handle large datasets, design data models, and communicate insights effectively. By mastering data manipulation and visualization, you can solve complex business challenges and optimize operations.",
          listItems: ["Data Analyst", "Business Analyst", "Operations Analyst"],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)

    modulesData: {
      title: "DATA Analytics CURRICULUM",
      globalActions: {
        startLearning: "https://example.com/start-learning-data-analytics",
        downloadCurriculum:
          "https://example.com/download-curriculum-data-analytics",
      },
      banner: {
        title: "Looking for IT Courses?",
        subtitle: "No need to Google 10 tabs — everything's listed right here.",
        image:
          "https://res.cloudinary.com/dudu879kr/image/upload/v1752485069/ITBanner_vkag1x.webp",
        technologies: [
          "IoT",
          "Angular",
          "React",
          "AWS",
          "Data Science",
          "Java",
          "Python",
        ],
      },
      tabs: [
        {
          modules: [
            {
              title: "Tableau + Excel",
              duration: "5 Months",
               content: [
                "Data Visualization Fundamentals",
                "Excel Advanced Functions",
                "Tableau Desktop Basics",
                "Dashboard Creation",
                "Data Analysis Techniques",
              ],
              detailedContent: [
                "Advanced Excel functions and data analysis techniques",
                "Pivot tables, charts, and statistical functions",
                "Tableau fundamentals and data connection",
                "Creating interactive dashboards and visualizations",
                "Data storytelling and presentation techniques",
                "Advanced Tableau calculations and parameters",
              ],
              toolsAndTechnologies: [
                {
                  name: "Tableau",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1752296596/dashboard_k6hhwd.png",
                },
                {
                  name: "Excel",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1752296885/excel_1_swvlt5.png",
                },
                {
                  name: "SQL",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1752297330/imgi_158_sql-3d-icon-png_xh9ule.png",
                },
                {
                  name: "Python",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1752208406/python_ut82h4.png",
                },
              ],
              actions: {
                startLearning:
                  "https://example.com/start-learning-tableau-excel",
                downloadCurriculum:
                  "https://example.com/download-curriculum-tableau-excel",
              },
            },
            {
              title: "Python Basic to Advance",
              duration: "4 Months",
              content: [
                "Python Syntax and Basics",
                "Data Structures",
                "Object-Oriented Programming",
                "Libraries (Pandas, NumPy)",
                "Advanced Python Concepts",
              ],
              detailedContent: [
                "Python programming fundamentals for data analytics",
                "Data manipulation with Pandas and NumPy",
                "Data visualization with Matplotlib and Seaborn",
                "Statistical analysis and hypothesis testing",
                "Web scraping and data collection techniques",
                "Advanced Python libraries for analytics",
              ],
              toolsAndTechnologies: [
                {
                  name: "Python",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1752208406/python_ut82h4.png",
                },
                {
                  name: "Pandas",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1752817663/imgi_137_pandas_vzf4jt.webp",
                },
                {
                  name: "NumPy",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1752298356/imgi_122_numpy-big-logo-300x300_i966nd.png",
                },
                {
                  name: "Matplotlib",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1752817778/imgi_114_1024px-Matplotlib_icon.svg_qqtj7q.webp",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-python",
                downloadCurriculum:
                  "https://example.com/download-curriculum-python",
              },
            },
            {
              title: "Structured Query Language (SQL)",
              duration: "3 Months",
              content: [
                "Database Fundamentals",
                "SQL Queries and Joins",
                "Database Design",
                "Advanced SQL Functions",
                "Performance Optimization",
              ],
              detailedContent: [
                "Database fundamentals and relational concepts",
                "Advanced SQL queries and data retrieval",
                "Data aggregation and window functions",
                "Database optimization and performance tuning",
                "Data warehousing and ETL processes",
                "Working with multiple databases and joins",
              ],
              toolsAndTechnologies: [
                {
                  name: "MySQL",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1752297330/imgi_158_sql-3d-icon-png_xh9ule.png",
                },
                {
                  name: "PostgreSQL",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958131/postgree_gstwpl.webp",
                  alt: "postgree",
                },
                {
                  name: "SQL Server",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958142/sqlserver_omumwf.webp",
                  alt: "sqlserver",
                },
                {
                  name: "Oracle",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958131/oracle_rfcihh.webp",
                  alt: "oracle",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-sql",
                downloadCurriculum:
                  "https://example.com/download-curriculum-sql",
              },
            },
            {
              title: "Big Data Computing",
              duration: "3 Months",
              content: [
                "Hadoop Ecosystem",
                "Apache Spark",
                "Data Processing",
                "Distributed Computing",
                "Big Data Analytics",
              ],
              detailedContent: [
                "Introduction to Big Data technologies and concepts",
                "Hadoop ecosystem and distributed computing",
                "Apache Spark for large-scale data processing",
                "NoSQL databases and data storage solutions",
                "Real-time data processing and streaming",
                "Cloud platforms for big data analytics",
              ],
              toolsAndTechnologies: [
                {
                  name: "Hadoop",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958120/hadoop_i72dgc.webp",
                  alt: "hadoop",
                },
                {
                  name: "Spark",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958138/spark_pnysg0.webp",
                  alt: "spark",
                },
                {
                  name: "Kafka",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1752302769/imgi_148_kafka_m4ewr7.png",
                  alt: "kafka",
                },
                {
                  name: "Hive",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958121/hive_rjhtj9.webp",
                  alt: "hive",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-bigdata",
                downloadCurriculum:
                  "https://example.com/download-curriculum-bigdata",
              },
            },
            {
              title: "Machine Learning Ops",
              duration: "1 Month",
               content: [
                "MLOps Fundamentals",
                "Model Deployment",
                "CI/CD for ML",
                "Model Monitoring",
                "Production Best Practices",
              ],
              detailedContent: [
                "Introduction to machine learning for analytics",
                "Model deployment and monitoring in production",
                "Automated machine learning pipelines",
                "Performance monitoring and model maintenance",
                "Version control for ML models and data",
                "Best practices for ML operations",
              ],
              toolsAndTechnologies: [
                {
                  name: "Docker",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958118/docker_lxl4kz.webp",
                  alt: "docker",
                },
                {
                  name: "Kubernetes",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958126/Kubernetes_mgxslj.webp",
                  alt: "kubernetes",
                },
                {
                  name: "MLflow",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958127/mlflow_ih6orq.avif",
                  alt: "mlflow",
                },
                {
                  name: "TensorFlow",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958142/tensorflow_fltbbj.webp",
                  alt: "tensorflow",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-mlops",
                downloadCurriculum:
                  "https://example.com/download-curriculum-mlops",
              },
            },
          ],
        },
      ],
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "Data Analytics Certificate",
      alt: "data-analytics-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The Masters in Data Analytics Certification at Connecting Dots ERP offers advanced training in data processing, statistical analysis, and reporting.",
      description:
        "You'll learn to use tools like Python, Excel, and Power BI to extract valuable insights from data. This program is ideal for those looking to boost their careers in data analytics, preparing you for top roles in the industry.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for Data Analytics training in {city}?",
      paragraphs: [
        "Connecting Dots ERP offers a comprehensive Data Analytics Course in {city}, designed to provide you with the skills needed to excel in the fast-growing data analytics industry. Our curriculum, crafted by industry experts, covers key topics such as data analysis, machine learning, statistical modeling, and data visualization tools like Python, R, and SQL. This course ensures that you not only grasp theoretical concepts but also gain hands-on experience with real-world projects, preparing you to tackle data-related challenges in various industries.",
        "The primary goal of our Data Analytics Training with Placement program is to equip students with the necessary skills to secure high-paying roles in top organizations. With our learning by doing approach, you will work on real-world datasets, enhancing your expertise in tools like Tableau, SQL, Python, and Power BI while mastering data manipulation and visualization. Our experienced instructors bring their industry insights into the classroom, ensuring that you are fully prepared to solve practical data challenges.",
        "To ensure a smooth transition into the professional world, we provide 100% job assistance. Our placement cell supports students through every stage of their job search, including resume building, interview preparation, and personalized career coaching. With strong industry connections and a commitment to student success, Connecting Dots ERP is the best choice for anyone looking to launch a career in data analytics through the best Data Analytics Course in {city}.",
      ],
      listItem1Header:
        "What makes our Data Analytics training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering statistical modeling and data visualization",
        "Hands-on experience with industry-standard tools like Python, SQL, Tableau, and Power BI",
        "Learning by doing approach with real-world datasets and projects",
        "Expert faculty with practical industry insights and experience",
        "100% placement assistance with resume building and interview preparation",
        "Strong industry connections for career opportunities and networking",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Does the Data Analytics Course include placement support?",
          answer:
            "Yes, Connecting Dots ERP offers 100% placement assistance. Our dedicated placement cell helps with resume building, interview preparation, and connects students to top companies in {city} and beyond, ensuring a smooth transition into the job market.",
        },
        {
          question:
            "What are the key topics covered in this Data Analytics Course?",
          answer:
            "The course covers a range of topics, including data cleaning and preparation, statistical modeling, machine learning, data visualization, and SQL queries. You'll also learn to use tools like Python, R, Excel, and Power BI to manage and analyze data effectively.",
        },
        {
          question:
            "What kind of job roles can I expect after completing the Data Analytics Course?",
          answer:
            "After completing the course, you can pursue roles such as Data Analyst, Business Analyst, Data Scientist, Data Engineer, or Data Visualization Specialist. These roles are in high demand across industries such as finance, healthcare, IT, and e-commerce.",
        },
        {
          question: "Will I get hands-on experience during the course?",
          answer:
            "Yes, Connecting Dots ERP emphasizes a hands-on learning approach. You will work on real-world projects and datasets, allowing you to apply theoretical knowledge to solve business problems, ensuring you are job-ready by the end of the course.",
        },
        {
          question:
            "What makes Connecting Dots ERP's Data Analytics Course in {city} unique?",
          answer:
            "The course stands out for its practical approach, expert faculty, and industry-relevant curriculum. We also offer a learning-by-doing method, which ensures students gain real-time skills through project-based learning and real-world case studies.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "Chat GPT & AI",
          description: "Learn AI from scratch",
          icon: "https://i.imgur.com/QHuijGO.mp4",
          alt: "Chat GPT icon",
        },
        {
          name: "Masters in Data Science",
          description: "Become a data science expert",
          icon: "https://i.imgur.com/C0Hv62l.mp4",
          alt: "Data Science icon",
        },
        {
          name: "Tableau",
          description: "Master Tableau skills",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Tableau icon",
        },
        {
          name: "Salesforce",
          description: "Salesforce developer courses",
          icon: "https://i.imgur.com/6brz8Ea.mp4",
          alt: "Salesforce icon",
        },
        {
          name: "UI/UX Design",
          description: "Design stunning user interfaces",
          icon: "https://i.imgur.com/9FN2rSu.mp4",
          alt: "UI/UX icon",
        },
        {
          name: "Full-Stack Python",
          description: "Full-stack development with Python",
          icon: "https://i.imgur.com/grx2N9O.mp4",
          alt: "Full Stack Python icon",
        },
        {
          name: "Full-Stack Java",
          description: "Full-stack development with Java",
          icon: "https://i.imgur.com/SYHIAAO.mp4",
          alt: "Java icon",
        },
        {
          name: "PowerBI",
          description: "Business intelligence with PowerBI",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Power BI icon",
        },
        {
          name: "SQL",
          description: "Learn SQL from experts",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "SQL icon",
        },
        {
          name: "Reactjs Framework",
          description: "Learn Reactjs from Industry Experts",
          icon: "https://i.imgur.com/QxPxKeN.mp4",
          alt: "React icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 88, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-04-15T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-25T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "data-science": {
    // === BASIC COURSE INFO ===
    title: "Data Science", // Used in: Page titles, headers, SEO
    fullTitle: "Master in Data Science", // Used in: Page content, descriptions
    category: "data-science", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "data-science", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master Data Science in {city} with our comprehensive course. Learn machine learning, predictive analytics, data visualization, and big data technologies. Our Data Science training in {city} offers hands-on experience with real-world data, industry-relevant curriculum, and 100% placement support to help you build a successful career as a Data Scientist or Machine Learning Engineer.",
    metaTitle:
      "Data Science Course in {city} | Best DS Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master Data Science in {city}. Expert-led training in ML, AI, Python, big data. Certification, real projects & 100% placement. Launch your data science career now!",

    // === COURSE DETAILS ===
    duration: "15-20 months", // Used in: Course summary section, page content
    price: { min: 70000, max: 180000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Machine Learning & AI",
      "Predictive Analytics & Modeling",
      "Data Visualization & Analysis",
      "Big Data Technologies",
      "Python & R Programming",
      "Statistical Analysis & Modeling",
      "Deep Learning & Neural Networks",
      "Data Engineering & Pipelines",
      "Business Intelligence Tools",
    ],
    prerequisites:
      "Basic mathematics, statistics, and programming knowledge recommended", // Used in: Course details
    certification: "Certified Data Science Professional", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "Data Scientist",
      "Machine Learning Engineer",
      "Data Analyst",
      "AI Specialist",
      "Research Scientist",
      "Business Intelligence Analyst",
      "Data Engineer",
      "Quantitative Analyst",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Data Science Course in {city}",
      subtitle:
        "We invite you to attend the Best Data Science Certification Program in {city}",
      description:
        "The complete Data Science Course in {city} given by Connecting Dots ERP is meant to give students the tools they need to succeed in the area. Predictive analytics, machine learning, data visualization, and data analysis are some of the important subjects covered in the course. With practical experience working with real-world data, our data science training in {city} makes sure you are ready for opportunities in top firms that focus on data-driven careers",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "Data Science Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why Data Science?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">Data Science?</span>',
          content:
            "The multidisciplinary subject of data science, which involves using systems, scientific techniques, and algorithms to extract knowledge and insights from both organized and unstructured data, is the emphasis of the data science course. With a focus on using data to solve actual business problems, this Data Science training in {city} trains graduates for positions like data scientist, data analyst, and machine learning engineer.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">Data Scientist</span> do?',
          content:
            "To provide meaningful insights and facilitate data-driven decision-making, data scientists examine huge datasets. To find trends and resolve business issues, they apply machine learning, statistical analysis, and data visualization approaches. They guarantee the successful implementation of data-driven solutions by working together with different departments.",
          listItems: [
            "Identify data sources and collect data.",
            "Analyze data effectively.",
            "Formulate strategies to solve business challenges.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">Data Science</span> training?',
          content:
            "As businesses depend more and more on data-driven decision-making, data science specialists are in great demand. Our Data Science Certification Course in {city} places a strong emphasis on critical competencies like data analysis, machine learning, and data visualization, enabling learners to extract actionable insights and forecast models from massive datasets.",
          listItems: [
            "Data Scientist",
            "Data Analyst",
            "Machine Learning Engineer",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
    modulesData: {
      title: "DATA Analytics CURRICULUM",
      globalActions: {
        startLearning: "https://example.com/start-learning-data-analytics",
        downloadCurriculum:
          "https://example.com/download-curriculum-data-analytics",
      },
      banner: {
        title: "Looking for IT Courses?",
        subtitle: "No need to Google 10 tabs — everything's listed right here.",
        image:
          "https://res.cloudinary.com/dudu879kr/image/upload/v1752485069/ITBanner_vkag1x.webp",
        technologies: [
          "IoT",
          "Angular",
          "React",
          "AWS",
          "Data Science",
          "Java",
          "Python",
        ],
      },
      tabs: [
        {
          modules: [
            {
              title: "Data Engineering",
              duration: "3 Months",
               content: [
                "Hadoop Ecosystem",
                "Apache Spark",
                "Data Lakes & Warehouses",
                "ETL Pipelines",
                "Batch & Stream Processing",
              ],
              detailedContent: [
                "Introduction to data engineering concepts and architecture",
                "Working with Hadoop, Spark, and distributed systems",
                "Building and managing data pipelines with ETL",
                "Data storage solutions: Data lakes vs. Data warehouses",
                "Batch vs stream processing using Apache Kafka and Flink",
                "Scheduling workflows using Apache Airflow",
              ],
              toolsAndTechnologies: [
                {
                  name: "Apache Spark",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958115/apachespark_ayxhtb.webp",
                  alt: "spark",
                },
                {
                  name: "Apache Kafka",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1752302769/imgi_148_kafka_m4ewr7.png",
                  alt: "Apache Kafka",
                },
                {
                  name: "Apache Airflow",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958114/Apache_airflow_ameg1k.webp",
                  alt: "Apache Airflow",
                },
                {
                  name: "Hadoop",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958120/hadoop_i72dgc.webp",
                  alt: "Hadoop",
                },
              ],
              actions: {
                startLearning:
                  "https://example.com/start-learning-dataengineering",
                downloadCurriculum:
                  "https://example.com/download-curriculum-dataengineering",
              },
            },
            {
              title: "Data Structures & Algorithms (DSA)",
              duration: "2 Months",
               content: [
                "Arrays & Linked Lists",
                "Stacks & Queues",
                "Trees & Graphs",
                "Searching & Sorting",
                "Problem Solving Techniques",
              ],
              detailedContent: [
                "Core concepts of data structures for technical interviews",
                "Hands-on with arrays, linked lists, stacks and queues",
                "Understanding and solving tree and graph problems",
                "Sorting techniques: quick, merge, heap, bubble",
                "Binary search and divide & conquer metfhods",
                "Competitive programming practice sessions",
              ],
              toolsAndTechnologies: [
                { name: "C++", icon: "/CourseCurriculum/cpp.webp", alt: "C++" },
                {
                  name: "Java",
                  icon: "https://img.icons8.com/color/500/java-coffee-cup-logo--v1.png",
                  alt: "Java",
                },
                {
                  name: "Python",
                  icon: "https://img.icons8.com/fluency/500/python.png",
                  alt: "Python",
                },
                {
                  name: "LeetCode",
                  icon: "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/100/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-shadow-tal-revivo.png",
                  alt: "LeetCode",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-dsa",
                downloadCurriculum:
                  "https://example.com/download-curriculum-dsa",
              },
            },
            {
              title: "AI & Deep Learning",
              duration: "2 Months",
              content: [
                "Neural Networks",
                "Convolutional Neural Networks",
                "Recurrent Neural Networks",
                "Transfer Learning",
                "Natural Language Processing",
              ],
              detailedContent: [
                "Deep learning concepts using TensorFlow and PyTorch",
                "Building and training neural networks",
                "Image classification using CNNs",
                "Time series and sequence modeling with RNNs and LSTMs",
                "BERT and transformers for NLP applications",
                "Deployment and evaluation of DL models",
              ],
              toolsAndTechnologies: [
                {
                  name: "TensorFlow",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958142/tensorflow_fltbbj.webp",
                  alt: "tensorflow",
                },
                {
                  name: "Keras",
                  icon: "https://img.icons8.com/material-rounded/384/FA5252/keras.png",
                  alt: "keras",
                  alt: "Keras",
                },
                {
                  name: "PyTorch",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958134/pytorch_w7kjhd.webp",
                  alt: "PyTorch",
                },
                {
                  name: "OpenCV",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958130/open_cv_k4lryl.webp",
                  alt: "OpenCV",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-ai",
                downloadCurriculum:
                  "https://example.com/download-curriculum-ai",
              },
            },
            {
              title: "Product ML Systems",
              duration: "1.5 Months",
             content: [
                "System Design for ML",
                "Scalable ML APIs",
                "A/B Testing",
                "Monitoring & Logging",
                "Post-deployment Maintenance",
              ],
              detailedContent: [
                "Designing production-ready ML systems at scale",
                "Implementing scalable APIs for inference",
                "End-to-end model lifecycle in product environments",
                "Monitoring, logging, and analytics for ML models",
                "Data drift detection and model retraining",
                "A/B testing for model performance",
              ],
              toolsAndTechnologies: [
                {
                  name: "FastAPI",
                  icon: "https://img.icons8.com/ios-filled/100/api-settings.png",
                  alt: "FastAPI",
                },
                {
                  name: "Prometheus",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958133/prometheus_ts651w.webp",
                  alt: "Prometheus",
                },
                {
                  name: "Grafana",
                  icon: "https://img.icons8.com/fluency/240/grafana.png",
                  alt: "Grafana",
                },
                {
                  name: "MLflow",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958127/mlflow_ih6orq.avif",
                  alt: "MLflow",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-productml",
                downloadCurriculum:
                  "https://example.com/download-curriculum-productml",
              },
            },
            {
              title: "Tableau + Excel",
              duration: "5 Months",
              content: [
                "Data Visualization Fundamentals",
                "Excel Advanced Functions",
                "Tableau Desktop Basics",
                "Dashboard Creation",
                "Data Analysis Techniques",
              ],
              detailedContent: [
                "Comprehensive coverage of data visualization fundamentals with practical examples and hands-on exercises.",
                "Comprehensive coverage of excel advanced functions with practical examples and hands-on exercises.",
                "Comprehensive coverage of tableau desktop basics with practical examples and hands-on exercises.",
                "Comprehensive coverage of dashboard creation with practical examples and hands-on exercises.",
                "Comprehensive coverage of data analysis techniques with practical examples and hands-on exercises.",
              ],
              toolsAndTechnologies: [
                {
                  name: "Tableau",
                  icon: "https://img.icons8.com/color/500/tableau-software.png",
                },
                {
                  name: "Excel",
                  icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png",
                },
                {
                  name: "SQL",
                  icon: "https://img.icons8.com/fluency/96/sql.png",
                },
                {
                  name: "Python",
                  icon: "https://img.icons8.com/fluency/100/python.png",
                },
              ],
              actions: {
                startLearning:
                  "https://example.com/start-learning-tableau-excel",
                downloadCurriculum:
                  "https://example.com/download-curriculum-tableau-excel",
              },
            },
          ],
        },
      ],
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "Data Science Certificate",
      alt: "data-science-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The Data Science Certification at Connecting Dots ERP is designed to provide in-depth knowledge of data analysis, machine learning, and big data. This program equips you with skills in Python, R, SQL, and data visualization tools.",
      description:
        "With hands-on training, you'll be prepared to apply data science techniques to solve complex problems and drive business decisions, opening doors to high-paying data-driven roles.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for Data Science training in {city}?",
      paragraphs: [
        "Connecting Dots ERP offers a thorough Master in Data Science Course in {city} that is intended to give you the tools you need to succeed in the data science industry. Data analysis, machine learning, statistical modeling, and big data technologies are just a few of the crucial subjects covered in our curriculum, which is created by professionals in the field. Our Data Science Course in {city} guarantees that you will not only understand academic concepts but also have practical expertise in handling data-related challenges across many sectors through hands-on training and real-world projects.",
        "The main goal of our Data Science Training with Placement program is to give students the tools they need to land well-paying jobs in prestigious organizations. With our learning by doing approach, students hone their skills in Python, R, SQL, and data visualization while working on real-world projects. Our knowledgeable instructors infuse industry knowledge into the classroom, guaranteeing that students are equipped to handle difficulties in practical settings. Our cutting-edge labs are also open around the clock, allowing students to hone their talents.",
        "To facilitate students' seamless transfer into the working world, we also provide 100% job assistance. To ensure that students are prepared for the workforce, our placement cell offers assistance with résumé creation, interview coaching, and tailored career coaching. Connecting Dots ERP is the greatest option for individuals wishing to start their career in data science through the finest Data Science Course in {city} because of its strong industry ties and dedication to your success.",
      ],
      listItem1Header: "What makes our Data Science training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering machine learning, AI, and big data technologies",
        "Hands-on experience with Python, R, SQL, and advanced data visualization tools",
        "Learning by doing approach with real-world projects and industry datasets",
        "Expert faculty with practical industry knowledge and research experience",
        "24/7 access to cutting-edge labs and latest software tools",
        "100% placement assistance with strong industry connections and career support",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Who can enroll in the Data Science Course in {city}?",
          answer:
            "Anyone with an interest in data analysis, regardless of their academic background, can enroll in this Data Science Training with Placement.",
        },
        {
          question:
            "How is the Data Science Training in {city} different from other courses?",
          answer:
            "Our program Data Science Training with Placement focuses on practical skills, and hands-on projects, and provides robust placement support to ensure students are job-ready.",
        },
        {
          question:
            "What sets Connecting Dots ERP apart for Data Science Training?",
          answer:
            "We offer a unique blend of practical training, industry engagement, and 100% job assistance, ensuring a comprehensive learning experience.",
        },
        {
          question:
            "Can I attend a demo class before enrolling in the Data Science Course?",
          answer:
            "Yes, prospective students can request a demo class to experience our teaching methodology and course structure firsthand",
        },
        {
          question:
            "Will I get access to lab facilities during the Data Science Course?",
          answer:
            "Yes, students will have 24/7 access to state-of-the-art lab facilities equipped with the latest software and tools.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "Chat GPT & AI",
          description: "Learn AI from scratch",
          icon: "https://i.imgur.com/QHuijGO.mp4",
          alt: "Chat GPT icon",
        },
        {
          name: "Tableau",
          description: "Master data visualization",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Tableau icon",
        },
        {
          name: "Masters in Data Analytics",
          description: "Master data analytics skills",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "Data Analytics icon",
        },
        {
          name: "Salesforce",
          description: "Salesforce developer courses",
          icon: "https://i.imgur.com/6brz8Ea.mp4",
          alt: "Salesforce icon",
        },
        {
          name: "UI/UX Design",
          description: "Design stunning user interfaces",
          icon: "https://i.imgur.com/9FN2rSu.mp4",
          alt: "UI/UX icon",
        },
        {
          name: "Full-Stack Python",
          description: "Full-stack development with Python",
          icon: "https://i.imgur.com/grx2N9O.mp4",
          alt: "Full Stack Python icon",
        },
        {
          name: "Full-Stack Java",
          description: "Full-stack development with Java",
          icon: "https://i.imgur.com/SYHIAAO.mp4",
          alt: "Java icon",
        },
        {
          name: "PowerBI",
          description: "Business intelligence with PowerBI",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Power BI icon",
        },
        {
          name: "SQL",
          description: "Learn SQL from experts",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "SQL icon",
        },
        {
          name: "Reactjs Framework",
          description: "Learn Reactjs from Industry Experts",
          icon: "https://i.imgur.com/QxPxKeN.mp4",
          alt: "React icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.8, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 142, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-03-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-06-30T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "full-stack": {
    // === BASIC COURSE INFO ===
    title: "Full Stack Development", // Used in: Page titles, headers, SEO
    fullTitle: "Full Stack Web Development Training", // Used in: Page content, descriptions
    category: "development", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "full-stack-developer", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master Full Stack Development in {city} with our comprehensive course. Learn front-end and back-end technologies including HTML, CSS, JavaScript, Node.js, React, and databases. Our Full Stack training in {city} offers hands-on project experience, industry-relevant curriculum, and 100% placement support to help you build a successful career as a Full Stack Developer.",
    metaTitle:
      "Full Stack Course in {city} | Best Full Stack Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master Full Stack Development in {city}. Expert-led training in HTML, CSS, JavaScript, React, Node.js. Certification, real projects & 100% placement. Launch your web dev career now!",

    // === COURSE DETAILS ===
    duration: "6-8 months", // Used in: Course summary section, page content
    price: { min: 35000, max: 85000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "HTML5 & CSS3 Fundamentals",
      "JavaScript & ES6+ Features",
      "React.js & Frontend Frameworks",
      "Node.js & Backend Development",
      "Database Management (SQL & NoSQL)",
      "RESTful APIs & Web Services",
      "Version Control with Git",
      "Deployment & DevOps Basics",
      "Project Development & Testing",
    ],
    prerequisites: "Basic computer knowledge and logical thinking ability", // Used in: Course details
    certification: "Certified Full Stack Developer", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "Full Stack Developer",
      "Web Developer",
      "Frontend Developer",
      "Backend Developer",
      "Software Engineer",
      "JavaScript Developer",
      "React Developer",
      "Node.js Developer",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Full stack training in {city}",
      subtitle: "Project-based Job Oriented Full stack course in {city}",
      description:
        "Grow your potential with Connecting Dot's Full Stack course in {city}, where you'll learn essential development skills for a successful tech career. With hands-on training and secure placement support, this course equips you to thrive in the ever-evolving world of full-stack development.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "Full Stack Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why FULL STACK TRAINING ?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">Full Stack Development?</span>',
          content:
            "Full stack development refers to the ability to work on both front-end and back-end of a website or application, covering everything from user interfaces to databases. It's a highly sought-after skill in the tech industry, enabling developers to build functional web solutions. Learn full stack development course to become an asset in today's digital landscape.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">Full Stack Developer</span> do?',
          content:
            "A Full Stack Developer is proficient in both front-end and back-end development. They work on server, networking, and hosting environments as well as client interfaces.",
          listItems: [
            "Design and develop web applications.",
            "Work on databases, servers, and front-end.",
            "Ensure cross-platform functionality.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">Full Stack</span> training?',
          content:
            "Full Stack Developers are in high demand in today's high-tech world. Our full stack training in {city} covers all aspects of web development and application development, from front-end to back-end, preparing you for the jobs like:",
          listItems: [
            "Full Stack Developer",
            "Web Developer",
            "Software Engineer",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
    modulesData: {
      title: "FULL STACK TRAINING CURRICULUM",
      globalActions: {
        startLearning: "https://example.com/start-learning-fullstack",
        downloadCurriculum: "https://example.com/download-curriculum-fullstack",
      },
      banner: {
        title: "Looking for IT Courses?",
        subtitle: "No need to Google 10 tabs — everything's listed right here.",
        image:
          "https://res.cloudinary.com/dudu879kr/image/upload/v1752485069/ITBanner_vkag1x.webp",
        technologies: [
          "HTML",
          "CSS",
          "JavaScript",
          "React",
          "Node.js",
          "SQL",
          "MongoDB",
        ],
      },
      tabs: [
        {
          modules: [
            {
              title: "HTML5 & CSS3 Fundamentals",
              duration: "1.5 Months",
               content: [
                "HTML5 semantic elements and structure",
                "CSS3 styling, layouts, and responsive design",
                "Flexbox and CSS Grid for modern layouts",
                "CSS animations and transitions",
                "Bootstrap framework for rapid development",
                "Cross-browser compatibility and best practices",
              ],
              detailedContent: [
                "Understanding HTML5 structure and semantic tags",
                "Creating responsive layouts using Flexbox and Grid",
                "Styling pages with modern CSS3 techniques",
                "Using Bootstrap for quick and consistent UI",
                "Building cross-browser compatible websites",
                "Implementing animations and transitions for interactivity",
              ],
              toolsAndTechnologies: [
                {
                  name: "HTML5",
                  icon: "https://img.icons8.com/color/480/html-5--v1.png",
                  alt: "HTML5",
                },
                {
                  name: "CSS3",
                  icon: "https://img.icons8.com/stickers/100/css3.png",
                  alt: "CSS3",
                },
                {
                  name: "Bootstrap",
                  icon: "https://img.icons8.com/fluency/100/bootstrap.png",
                  alt: "Bootstrap",
                },
                {
                  name: "Figma",
                  icon: "https://img.icons8.com/fluency/500/figma.png",
                  alt: "Figma",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-html-css",
                downloadCurriculum:
                  "https://example.com/download-curriculum-html-css",
              },
            },
            {
              title: "JavaScript & ES6+ Features",
              duration: "2 Months",
              content: [
                "JavaScript fundamentals and DOM manipulation",
                "ES6+ features: arrow functions, destructuring, modules",
                "Asynchronous JavaScript: Promises, async/await",
                "Event handling and browser APIs",
                "Object-oriented programming in JavaScript",
                "Error handling and debugging techniques",
              ],
              detailedContent: [
                "Mastering core JavaScript syntax and logic",
                "Understanding modern ES6+ features and usage",
                "Building interactive UIs with DOM and event handling",
                "Working with asynchronous code using async/await",
                "Implementing OOP patterns in JavaScript",
                "Debugging efficiently and handling errors gracefully",
              ],
              toolsAndTechnologies: [
                {
                  name: "JavaScript",
                  icon: "https://img.icons8.com/fluency/144/javascript.png",
                  alt: "JavaScript",
                },
                {
                  name: "ES6",
                  icon: "https://img.icons8.com/color/480/javascript--v1.png",
                  alt: "ES6+",
                },
                {
                  name: "Console",
                  icon: "https://img.icons8.com/officel/80/console.png",
                  alt: "Browser Console",
                },
                {
                  name: "Debugger",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958118/debugger_b10fa3.webp",
                  alt: "debugger",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-js",
                downloadCurriculum:
                  "https://example.com/download-curriculum-js",
              },
            },
            {
              title: "React.js Frontend Development",
              duration: "1.5 Months",
              content: [
                "React components and JSX syntax",
                "State management and props handling",
                "React Hooks and functional components",
                "Routing with React Router",
                "Form handling and validation",
                "Integration with APIs and external libraries",
              ],
              detailedContent: [
                "Learning the React component model and JSX",
                "Managing state and props across components",
                "Using hooks like useState, useEffect, useContext",
                "Implementing routing with React Router",
                "Building forms with validation logic",
                "Integrating APIs and using external libraries",
              ],
              toolsAndTechnologies: [
                {
                  name: "React",
                  icon: "https://img.icons8.com/officel/480/react.png",
                  alt: "React",
                },
                {
                  name: "React Router",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958134/react_router_uzyey6.webp",
                  alt: "React Router",
                },
                {
                  name: "Redux",
                  icon: "https://img.icons8.com/external-tal-revivo-duo-tal-revivo/100/external-redux-an-open-source-javascript-library-for-managing-application-state-logo-duo-tal-revivo.png",
                  alt: "Redux",
                },
                {
                  name: "Axios",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958115/axios_xghgnf.webp",
                  alt: "Axios",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-react",
                downloadCurriculum:
                  "https://example.com/download-curriculum-react",
              },
            },
            {
              title: "Backend with Node.js",
              duration: "1 Month",
              content: [
                "Node.js fundamentals and npm ecosystem",
                "Express.js framework for web applications",
                "RESTful API design and implementation",
                "Middleware and error handling",
                "Authentication and authorization",
                "File handling and server-side operations",
              ],
              detailedContent: [
                "Understanding Node.js architecture and event loop",
                "Building APIs using Express framework",
                "Designing scalable and RESTful endpoints",
                "Implementing middleware and error handling patterns",
                "Using JWTs for secure authentication",
                "Handling file uploads and server I/O operations",
              ],
              toolsAndTechnologies: [
                {
                  name: "Node.js",
                  icon: "https://img.icons8.com/fluency/240/node-js.png",
                  alt: "Node.js",
                },
                {
                  name: "Express.js",
                  icon: "https://img.icons8.com/nolan/512/express-js.png",
                  alt: "Express.js",
                },
                {
                  name: "JWT",
                  icon: "https://img.icons8.com/color/480/java-web-token.png",
                  alt: "JWT",
                },
                {
                  name: "Postman",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958133/postman_tbnxz4.webp",
                  alt: "Postman",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-node",
                downloadCurriculum:
                  "https://example.com/download-curriculum-node",
              },
            },
            {
              title: "Industry Best Practices",
              duration: "0.5 Months",
              ontent: [
                "Code quality and review processes",
                "Security best practices for web applications",
                "Performance monitoring and optimization",
                "Agile development methodologies",
                "Documentation and code maintenance",
                "Career guidance and interview preparation",
              ],
              detailedContent: [
                "Following secure coding standards and peer reviews",
                "Using tools for performance monitoring and auditing",
                "Understanding Agile, Scrum, and Kanban workflows",
                "Maintaining clean, well-documented code",
                "Leveraging CI/CD tools and version control systems",
                "Tips for cracking tech interviews and portfolio building",
              ],
              toolsAndTechnologies: [
                {
                  name: "Git",
                  icon: "https://img.icons8.com/color/480/git.png",
                  alt: "Git",
                },
                {
                  name: "Jira",
                  icon: "https://img.icons8.com/nolan/512/jira.png",
                  alt: "Jira",
                },
                {
                  name: "Lighthouse",
                  icon: "https://img.icons8.com/stickers/100/lighthouse.png",
                  alt: "Lighthouse",
                },
                {
                  name: "GitHub",
                  icon: "https://img.icons8.com/ios-filled/500/github.png",
                  alt: "GitHub",
                },
              ],
              actions: {
                startLearning:
                  "https://example.com/start-learning-best-practices",
                downloadCurriculum:
                  "https://example.com/download-curriculum-best-practices",
              },
            },
          ],
        },
      ],
    },
    // Data for Certificate Component
    certificate: {
      courseTitle: "Full-Stack Certificate",
      alt: "full-stack-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The Full Stack Training Certification provides comprehensive skills in front-end and back-end web development.",
      description:
        "You'll learn to build dynamic web applications using technologies like HTML, CSS, JavaScript, and Node.js. This certification prepares you for versatile roles in full-stack development with hands-on project experience.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for Full-Stack training in {city}?",
      paragraphs: [
        "Connecting Dots ERP offers an advanced full-stack course in {city}, designed to meet the evolving needs of the tech industry. With a advance syllabus covering everything from front-end technologies like HTML, CSS, and JavaScript to back-end frameworks like Node.js and Express, this course ensures you gain both theoretical knowledge and practical skills. Our full stack certification in {city} from Connecting Dots ERP helps you stand out in a competitive job market, making you a top candidate for sought-after tech roles. The course is tailored to provide in-depth exposure to the latest industry trends and tools.",
        "One of the key advantages of choosing Connecting Dots ERP is the focus on hands-on training through live projects and real-world development tasks. Our expert trainers, who bring over a decade of industry experience, ensure you are industry-ready upon completion. The full-stack training fees in {city} are structured to be affordable, making high-quality education accessible to students from all backgrounds. In addition to this, we also offer flexible payment plans for eligible candidates. Additionally, students benefit from modern infrastructure, personalized guidance, and peer-to-peer learning, making it the perfect environment for learning full-stack development.",
        "At Connecting Dot's full-stack classes in {city}, we believe in learning by doing. Collaborative development projects, hackathons, and coding challenges are a regular part of the program, ensuring you're prepared for real-world scenarios. Our full stack course with 100% placement support program, helping you secure top positions in the industry. Whether you're aiming to become a full-stack developer or manage full-scale software projects, this full-stack course in {city} equips you with the skills and confidence to excel in your career.",
      ],
      listItem1Header: "What makes our Full Stack training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering both frontend and backend technologies",
        "Hands-on training through live projects and real-world development tasks",
        "Expert trainers with over a decade of industry experience",
        "Affordable fees with flexible payment plans for eligible candidates",
        "Modern infrastructure with personalized guidance and peer learning",
        "100% placement support with strong industry connections",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Who should join the full stack course in {city}?",
          answer:
            "This course is ideal for aspiring developers, IT professionals, and anyone looking to build a career in web development by mastering both front-end and back-end technologies.",
        },
        {
          question: "What is the mode of training for the full stack course?",
          answer:
            "The full stack training in {city} is offered in both classroom and online modes, allowing you to choose the option that best fits your schedule and learning preferences.",
        },
        {
          question:
            "What is the fee range for the full stack course in {city}?",
          answer:
            "The fees for the course typically start from ₹35,000, depending on the level of expertise and additional certifications offered.",
        },
        {
          question:
            "Which positions can I apply for after completing the course?",
          answer:
            "After completing the full stack certification in {city}, you can apply for roles such as Full Stack Developer, Web Developer, and Software Engineer in leading companies.",
        },
        {
          question: "Which companies are looking for full-stack developers?",
          answer:
            "Many tech giants, including Infosys, TCS, Wipro, and various startups, actively seek skilled full stack developers to build comprehensive web applications.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "Chat GPT & AI",
          description: "Learn AI from scratch",
          icon: "https://i.imgur.com/QHuijGO.mp4",
          alt: "Chat GPT icon",
        },
        {
          name: "Masters in Data Science",
          description: "Become a data science expert",
          icon: "https://i.imgur.com/C0Hv62l.mp4",
          alt: "Data Science icon",
        },
        {
          name: "Masters in Data Analytics",
          description: "Master data analytics skills",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "Data Analytics icon",
        },
        {
          name: "Salesforce",
          description: "Salesforce developer courses",
          icon: "https://i.imgur.com/6brz8Ea.mp4",
          alt: "Salesforce icon",
        },
        {
          name: "UI/UX Design",
          description: "Design stunning user interfaces",
          icon: "https://i.imgur.com/9FN2rSu.mp4",
          alt: "UI/UX icon",
        },
        {
          name: "Tableau",
          description: "Master data visualization",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Tableau icon",
        },
        {
          name: "Full-Stack Java",
          description: "Full-stack development with Java",
          icon: "https://i.imgur.com/SYHIAAO.mp4",
          alt: "Java icon",
        },
        {
          name: "PowerBI",
          description: "Business intelligence with PowerBI",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Power BI icon",
        },
        {
          name: "SQL",
          description: "Learn SQL from experts",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "SQL icon",
        },
        {
          name: "Reactjs Framework",
          description: "Learn Reactjs from Industry Experts",
          icon: "https://i.imgur.com/QxPxKeN.mp4",
          alt: "React icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.7, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 156, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-02-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-01T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  chatgpt: {
    // === BASIC COURSE INFO ===
    title: "ChatGPT & AI", // Used in: Page titles, headers, SEO
    fullTitle: "Artificial Intelligence & ChatGPT Mastery", // Used in: Page content, descriptions
    category: "ai", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "chatgpt", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master Artificial Intelligence and ChatGPT in {city} with our comprehensive course. Learn machine learning, deep learning, natural language processing, and AI-driven automation. Our AI training in {city} offers hands-on experience with real ChatGPT and AI projects, industry-relevant curriculum, and 100% placement support to help you build a successful career in AI and machine learning.",
    metaTitle:
      "ChatGPT & AI Course in {city} | Best AI Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master ChatGPT & AI in {city}. Expert-led training in ML, deep learning, NLP, automation. Certification, real AI projects & 100% placement. Launch your AI career now!",

    // === COURSE DETAILS ===
    duration: "12-18 months", // Used in: Course summary section, page content
    price: { min: 80000, max: 200000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Machine Learning Fundamentals",
      "Deep Learning & Neural Networks",
      "Natural Language Processing (NLP)",
      "ChatGPT & Large Language Models",
      "AI-Driven Automation",
      "Computer Vision & Image Processing",
      "AI Ethics & Responsible AI",
      "TensorFlow & PyTorch",
      "AI Model Deployment & MLOps",
    ],
    prerequisites:
      "Basic programming knowledge in Python and mathematics/statistics background recommended", // Used in: Course details
    certification: "Certified AI & Machine Learning Professional", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "AI Developer",
      "Machine Learning Engineer",
      "Data Scientist",
      "AI Research Scientist",
      "NLP Engineer",
      "Computer Vision Engineer",
      "AI Product Manager",
      "MLOps Engineer",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Artificial Intelligence Course in {city}",
      subtitle:
        "We invite you to attend the Best Artificial Intelligence Certification Program in {city}",
      description:
        "Connecting Dots ERP's extensive Artificial Intelligence Course in {city} aims to give students the abilities they need to succeed in AI. The course covers important subjects, including AI-driven automation, machine learning, deep learning, and natural language processing. With practical experience working on actual ChatGPT and AI projects, our AI training in {city} guarantees that you are ready for employment prospects in prestigious companies that value innovation and AI-powered solutions",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "Chat GPT & AI" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why CHAT GPT & AI?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">ChatGPT and AI?</span>',
          content:
            "The course on artificial intelligence (AI) focuses on the multidisciplinary field of AI, which creates systems that can mimic human intellect by utilizing machine learning, neural networks, and algorithms. With these Artificial Intelligence Courses in {city}, graduates can become machine learning engineers, AI analysts, and AI engineers by learning how to use AI to solve complicated real-world problems. The focus of the course is on using AI to create clever answers to contemporary business problems.",
        },
        {
          title:
            'What does an <span class="highlight-span-cards">AI Developer</span> do?',
          content:
            "AI engineers are in charge of creating AI models that assist businesses in streamlining operations and improving decision-making. To create intelligent systems, they leverage natural language processing, deep learning methods, and machine learning algorithms. By working together across departments, they make sure AI-driven solutions are implemented successfully.",
          listItems: [
            "Identify AI-driven opportunities within data.",
            "Develop AI models to enhance decision-making.",
            "Solve business challenges using AI and machine learning techniques.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">AI</span> training?',
          content:
            "Industry revolutions driven by AI are creating a significant demand for professionals with AI experience. The focus of our Artificial Intelligence Certification Course in {city} is on critical competencies such as natural language processing, deep learning, and machine learning. These give students the ability to develop AI-driven models that address challenging issues in a variety of industries and offer insightful information.",
          listItems: [
            "AI Developer",
            "Machine Learning Engineer",
            "Data Scientist",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
    modulesData: {
      title: "CHAT GPT AND AI CURRICULUM",
      globalActions: {
        startLearning: "https://example.com/start-learning",
        downloadCurriculum: "https://example.com/download-curriculum",
      },
      banner: {
        title: "Explore the Future of AI and ChatGPT",
        subtitle:
          "Master the most in-demand tools with our AI-focused curriculum.",
        image:
          "https://res.cloudinary.com/dudu879kr/image/upload/v1752485069/ITBanner_vkag1x.webp",
        technologies: [
          "Python",
          "NumPy",
          "Pandas",
          "Matplotlib",
          "Scikit-learn",
          "TensorFlow",
          "Keras",
        ],
      },
      tabs: [
        {
          modules: [
            {
              title: "AI Fundamentals & Python",
              duration: "3 Months",
               content: [
                "Introduction to Artificial Intelligence and its applications",
                "Python programming for AI and data science",
                "Mathematics for AI: Linear Algebra, Statistics, Calculus",
                "Data manipulation with NumPy and Pandas",
                "Data visualization with Matplotlib and Seaborn",
                "Introduction to Jupyter Notebooks and development environment",
              ],
              detailedContent: [
                "Understanding AI domains and practical use cases",
                "Mastering Python syntax and data handling",
                "Learning mathematical foundations essential for AI",
                "Performing data analysis with NumPy and Pandas",
                "Creating visualizations with Matplotlib and Seaborn",
                "Setting up and using Jupyter for development",
              ],
              toolsAndTechnologies: [
                {
                  name: "Python",
                  icon: "https://img.icons8.com/fluency/500/python.png",
                  alt: "Python",
                },
                {
                  name: "NumPy",
                  icon: "https://img.icons8.com/color/560/numpy.png",
                  alt: "NumPy",
                },
                {
                  name: "Pandas",
                  icon: "https://img.icons8.com/color/560/pandas.png",
                  alt: "Pandas",
                },
                {
                  name: "Matplotlib",
                  icon: "https://img.icons8.com/color/144/matplotlib.png",
                  alt: "Matplotlib",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning",
                downloadCurriculum: "https://example.com/download-curriculum",
              },
            },
            {
              title: "Machine Learning Essentials",
              duration: "3 Months",
               content: [
                "Supervised learning: Regression and Classification",
                "Unsupervised learning: Clustering and Dimensionality Reduction",
                "Model evaluation and cross-validation",
                "Feature engineering and data preprocessing",
                "Introduction to Scikit-learn library",
                "Hands-on ML projects with real-world datasets",
              ],
              detailedContent: [
                "Building ML models using regression and classification",
                "Clustering datasets and reducing dimensions",
                "Validating models using cross-validation methods",
                "Selecting and transforming features for ML",
                "Implementing ML workflows with Scikit-learn",
                "Developing end-to-end ML projects with real data",
              ],
              toolsAndTechnologies: [
                {
                  name: "Scikit-learn",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958137/scikit_v8jneg.webp",
                  alt: "Scikit-learn",
                },
                {
                  name: "XGBoost",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958142/xgboost_tthtp1.webp",
                  alt: "XGBoost",
                },
                {
                  name: "Keras",
                  icon: "https://img.icons8.com/material-rounded/100/keras.png",
                  alt: "Keras",
                },
                {
                  name: "TensorFlow",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958142/tensorflow_fltbbj.webp",
                  alt: "TensorFlow",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning",
                downloadCurriculum: "https://example.com/download-curriculum",
              },
            },
            {
              title: "Deep Learning & Neural Networks",
              duration: "3 Months",
              content: [
                "Basics of neural networks and deep learning",
                "Working with TensorFlow and Keras",
                "Convolutional Neural Networks (CNNs) concepts",
                "Recurrent Neural Networks (RNNs) and LSTM",
                "Transfer learning and pre-trained models",
                "Deploying and evaluating deep learning models",
              ],
              detailedContent: [
                "Exploring perceptrons and multilayer networks",
                "Building neural networks with TensorFlow and Keras",
                "Image processing with CNN architectures",
                "Sequence modeling using RNNs and LSTMs",
                "Utilizing pre-trained models for efficiency",
                "Model deployment for real-world applications",
              ],
              toolsAndTechnologies: [
                {
                  name: "TensorFlow",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958142/tensorflow_fltbbj.webp",
                  alt: "TensorFlow",
                },
                {
                  name: "Keras",
                  icon: "https://img.icons8.com/material-rounded/100/keras.png",
                  alt: "Keras",
                },
                {
                  name: "OpenCV",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958130/open_cv_k4lryl.webp",
                  alt: "OpenCV",
                },
                {
                  name: "Colab",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958115/colab_jmvpxm.webp",
                  alt: "Google Colab",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning",
                downloadCurriculum: "https://example.com/download-curriculum",
              },
            },
            {
              title: "Natural Language Processing",
              duration: "3 Months",
              content: [
                "Text cleaning and preprocessing techniques",
                "Text classification and sentiment analysis",
                "Named Entity Recognition and POS tagging",
                "Introduction to transformers and BERT",
                "Working with ChatGPT and OpenAI API",
                "Building chatbots and conversational agents",
              ],
              detailedContent: [
                "Preparing textual data using NLP tools",
                "Classifying documents and analyzing sentiments",
                "Extracting key information with NER and POS",
                "Implementing transformer-based models like BERT",
                "Integrating OpenAI’s GPT models into apps",
                "Creating real-time intelligent chatbots",
              ],
              toolsAndTechnologies: [
                {
                  name: "SpaCy",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958138/spacy_dpjwum.webp",
                  alt: "SpaCy",
                },
                {
                  name: "Hugging Face",
                  icon: "https://img.icons8.com/fluency/240/hugging-face_app.png",
                  alt: "Hugging Face",
                },
                {
                  name: "OpenAI API",
                  icon: "https://img.icons8.com/ios-filled/150/chatgpt.png",
                  alt: "OpenAI API",
                },
                {
                  name: "BERT",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958115/bert_qfxcly.webp",
                  alt: "BERT",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning",
                downloadCurriculum: "https://example.com/download-curriculum",
              },
            },
            {
              title: "Computer Vision & AI Applications",
              duration: "3 Months",
             content: [
                "Fundamentals of computer vision and image processing",
                "Object detection using YOLO and SSD",
                "Image segmentation and classification",
                "Facial recognition and biometrics",
                "AI in healthcare, automotive, and finance",
                "Edge computing and real-time AI deployment",
              ],
              detailedContent: [
                "Understanding image data formats and filters",
                "Detecting objects using deep learning models",
                "Dividing and labeling images for analysis",
                "Implementing biometric-based recognition",
                "Exploring AI-powered industry use cases",
                "Deploying vision models on edge devices",
              ],
              toolsAndTechnologies: [
                {
                  name: "YOLO",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958143/yolo_qdvhwy.webp",
                  alt: "YOLO",
                },
                {
                  name: "OpenCV",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958130/open_cv_k4lryl.webp",
                  alt: "OpenCV",
                },
                {
                  name: "TensorFlow",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958142/tensorflow_fltbbj.webp",
                  alt: "TensorFlow",
                },
                {
                  name: "Edge Impulse",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958119/edge_impulse_eg8jxe.webp",
                  alt: "Edge Impulse",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning",
                downloadCurriculum: "https://example.com/download-curriculum",
              },
            },
          ],
        },
      ],
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "Artificial Intelligence Certificate",
      alt: "artificial-intelligence-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The Chat GPT & AI Certification at Connecting Dots ERP offers cutting-edge training in AI-powered conversational systems.",
      description:
        "Learn to develop chatbots, integrate AI into business processes, and create intelligent applications using GPT models. This certification will position you at the forefront of AI innovation and automation.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for AI training in {city}?",
      paragraphs: [
        "At Connecting Dots ERP, our Masters in Artificial Intelligence Course in {city} is crafted to help you thrive in the competitive AI field. Our curriculum is meticulously designed by AI experts and covers essential topics such as deep learning, machine learning, neural networks, and AI ethics. You will not only gain theoretical knowledge but also acquire practical expertise through real-world AI projects, which enable you to tackle challenges across industries. This hands-on experience ensures you are job-ready from day one.",
        "With our AI Training with Placement program, you will work with AI tools like TensorFlow, Keras, and Python, emphasizing a hands-on learning approach. Real-world case studies complement our learning by doing approach, which guarantees that students can apply AI solutions to real-world issues. We offer individualized mentoring from seasoned business experts who walk you through challenging AI applications and ideas. You can develop and polish your AI skills in a work-like setting by using our lab facilities, which are open around the clock.",
        "To guarantee a seamless transition into your AI profession, we provide thorough job assistance in addition to technical training. Our placement cell offers placement assistance, from assisting you in creating the ideal CV to offering one-on-one interview coaching. With our solid industry ties and steadfast commitment to your success, Connecting Dots ERP ensures that you are fully prepared to secure a rewarding role in AI after completing the best Artificial Intelligence Course in {city}.",
      ],
      listItem1Header: "What makes our AI training in {city} unique?",
      listItem1: [
        "Curriculum designed by AI experts covering deep learning, ML, and neural networks",
        "Hands-on experience with TensorFlow, Keras, Python, and real-world AI projects",
        "Individualized mentoring from seasoned AI industry experts",
        "24/7 access to lab facilities for developing and polishing AI skills",
        "Comprehensive job assistance with CV creation and interview coaching",
        "Strong industry ties ensuring successful placement in AI roles",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question:
            "Who is eligible to enroll in the Artificial Intelligence Course in {city}?",
          answer:
            "The AI course is open to anyone, whether you're a beginner or an experienced professional, looking to upskill in AI. A background in programming or data science is helpful but not mandatory.",
        },
        {
          question: "What makes this AI training in {city} stand out?",
          answer:
            "Our AI Training focuses heavily on real-world applications, providing hands-on experience through projects and case studies. With our placement assistance, you're well-equipped for job opportunities upon completing the course.",
        },
        {
          question: "Why choose Connecting Dots ERP for ChatGPT & AI training?",
          answer:
            "We provide a unique blend of industry-specific training, practical projects, and dedicated placement support, ensuring you get the best AI learning experience.",
        },
        {
          question:
            "Do I have access to labs and resources throughout the course?",
          answer:
            "Yes, students get 24/7 access to state-of-the-art lab facilities, enabling you to work on AI projects and practice using the latest tools anytime.",
        },
        {
          question:
            "Can I attend a demo class before enrolling in the AI course?",
          answer:
            "Absolutely! We offer a demo class to give prospective students insight into our teaching approach and course structure before they commit to the program.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "Tableau",
          description: "Master data visualization",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Tableau icon",
        },
        {
          name: "Masters in Data Science",
          description: "Become a data science expert",
          icon: "https://i.imgur.com/C0Hv62l.mp4",
          alt: "Data Science icon",
        },
        {
          name: "Masters in Data Analytics",
          description: "Master data analytics skills",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "Data Analytics icon",
        },
        {
          name: "Salesforce",
          description: "Salesforce developer courses",
          icon: "https://i.imgur.com/6brz8Ea.mp4",
          alt: "Salesforce icon",
        },
        {
          name: "UI/UX Design",
          description: "Design stunning user interfaces",
          icon: "https://i.imgur.com/9FN2rSu.mp4",
          alt: "UI/UX icon",
        },
        {
          name: "Full-Stack Python",
          description: "Full-stack development with Python",
          icon: "https://i.imgur.com/grx2N9O.mp4",
          alt: "Full Stack Python icon",
        },
        {
          name: "Full-Stack Java",
          description: "Full-stack development with Java",
          icon: "https://i.imgur.com/SYHIAAO.mp4",
          alt: "Java icon",
        },
        {
          name: "PowerBI",
          description: "Business intelligence with PowerBI",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Power BI icon",
        },
        {
          name: "SQL",
          description: "Learn SQL from experts",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "SQL icon",
        },
        {
          name: "Reactjs Framework",
          description: "Learn Reactjs from Industry Experts",
          icon: "https://i.imgur.com/QxPxKeN.mp4",
          alt: "React icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.9, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 98, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-01-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-05T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  java: {
    // === BASIC COURSE INFO ===
    title: "Java Development", // Used in: Page titles, headers, SEO
    fullTitle: "Java Programming & Development Training", // Used in: Page content, descriptions
    category: "programming", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "java", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master Java Development in {city} with our comprehensive course. Learn core Java, advanced frameworks like Spring and Hibernate, REST APIs, and enterprise application development. Our Java training in {city} offers hands-on project experience, industry-relevant curriculum, and 100% placement support to help you build a successful career as a Java Developer.",
    metaTitle: "Java Course in {city} | Best Java Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master Java Development in {city}. Expert-led training in Core Java, Spring, Hibernate, REST APIs. Certification, real projects & 100% placement. Launch your Java career now!",

    // === COURSE DETAILS ===
    duration: "5-7 months", // Used in: Course summary section, page content
    price: { min: 35000, max: 90000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Core Java Programming",
      "Object-Oriented Programming (OOP)",
      "Java Collections Framework",
      "Spring Framework & Spring Boot",
      "Hibernate & JPA",
      "RESTful Web Services",
      "Database Integration (JDBC)",
      "Maven & Build Tools",
      "Testing with JUnit",
    ],
    prerequisites: "Basic programming knowledge and logical thinking ability", // Used in: Course details
    certification: "Certified Java Developer", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "Java Developer",
      "Software Engineer",
      "Backend Developer",
      "Full Stack Java Developer",
      "Spring Developer",
      "Enterprise Application Developer",
      "Java Architect",
      "Software Consultant",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Java Training Program in {city}",
      subtitle: "Project-based Job Oriented Java Course in {city}",
      description:
        "Grow your career with Connecting Dots ERP's Java course in {city}, designed to equip you with essential programming skills for a successful tech career. With hands-on training and job placement support, this course prepares you to thrive in the competitive world of Java development.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "Java Training Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why Java ?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">Java Development?</span>',
          content:
            "Java development focuses on creating robust, scalable applications using the Java programming language. It's one of the most in-demand skills in the IT industry, enabling developers to build everything from mobile apps to enterprise software. Learn Java development course in {city} to become a versatile asset in today's tech-driven world.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">Java Developer</span> do?',
          content:
            "A Java Developer designs and develops applications using Java. They work on building scalable, high-performance applications that can handle large volumes of data.",
          listItems: [
            "Design and develop Java applications.",
            "Maintain and optimize existing applications.",
            "Ensure application performance and scalability.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">Java</span> training?',
          content:
            "Java Developers are in high demand across various industries. Our Java training in {city} covers all aspects of Java development, from core Java to advanced frameworks, preparing you for jobs like:",
          listItems: [
            "Java Developer",
            "Software Engineer",
            "Backend Developer",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
    modulesData: {
      title: "JAVA TRAINING CURRICULUM",
      globalActions: {
        startLearning: "https://example.com/start-learning-java",
        downloadCurriculum: "https://example.com/download-curriculum-java",
      },
      banner: {
        title: "Master Core to Advanced Java Development",
        subtitle:
          "Build robust, scalable applications with hands-on Java training.",
        image:
          "https://res.cloudinary.com/dudu879kr/image/upload/v1752485069/ITBanner_vkag1x.webp",
        technologies: [
          "Java",
          "Spring Boot",
          "Hibernate",
          "MySQL",
          "JSP",
          "JUnit",
        ],
      },
      tabs: [
        {
          modules: [
            {
              title: "Core Java Fundamentals",
              duration: "1.5 Months",
              content: [
                "Java syntax, variables, and data types",
                "Control structures and loops",
                "Object-Oriented Programming concepts",
                "Exception handling and debugging",
                "Input/Output streams and file handling",
                "Understanding encapsulation and inheritance",
              ],
              detailedContent: [
                "Learn Java’s basic syntax, primitive types, and variable usage",
                "Use if-else, switch, for, while, and do-while for flow control",
                "Implement OOP using classes, objects, inheritance, and abstraction",
                "Handle exceptions with try-catch-finally, and use debugging techniques",
                "Perform file I/O using Java FileReader, BufferedReader, and FileWriter",
                "Apply encapsulation, inheritance, and access modifiers effectively",
              ],
              toolsAndTechnologies: [
                {
                  name: "Java",
                  icon: "https://img.icons8.com/color/100/java-coffee-cup-logo--v1.png",
                  alt: "Java",
                },
                {
                  name: "Eclipse",
                  icon: "https://img.icons8.com/office/500/java-eclipse.png",
                  alt: "Eclipse",
                },
                {
                  name: "VS Code",
                  icon: "https://img.icons8.com/color/500/visual-studio-code-2019.png",
                  alt: "VS Code",
                },
                {
                  name: "IntelliJ IDEA",
                  icon: "https://img.icons8.com/color/500/intellij-idea.png",
                  alt: "IntelliJ IDEA",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-java",
                downloadCurriculum:
                  "https://example.com/download-curriculum-java",
              },
            },
            {
              title: "Advanced Java Concepts",
              duration: "1.5 Months",
              content: [
                "Java Collections Framework",
                "Generics and type safety",
                "Multithreading and concurrency",
                "Lambda expressions in Java",
                "Stream API for data processing",
                "Java 8+ features and functional programming",
              ],
              detailedContent: [
                "Explore Lists, Sets, Maps and learn to choose the right collection",
                "Use generics for reusable code with strong type safety",
                "Manage threads, race conditions, and thread pools",
                "Write concise, modern code with lambda expressions",
                "Process large datasets efficiently using Streams",
                "Utilize Java 8+ features like Optional, Functional Interfaces",
              ],
              toolsAndTechnologies: [
                {
                  name: "Java",
                  icon: "https://img.icons8.com/color/480/java-coffee-cup-logo--v1.png",
                  alt: "Java",
                },
                {
                  name: "JVisualVM",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958123/jvisualvm_by8p7o.webp",
                  alt: "JVisualVM",
                },
                {
                  name: "Maven",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958127/maven_qsha6x.webp",
                  alt: "Maven",
                },
                {
                  name: "Gradle",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958119/gradle_wun1of.webp",
                  alt: "Gradle",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-java",
                downloadCurriculum:
                  "https://example.com/download-curriculum-java",
              },
            },
            {
              title: "Database Integration",
              duration: "1 Month",
              content: [
                "JDBC connectivity in Java",
                "Performing CRUD operations using SQL",
                "Using prepared statements and parameterized queries",
                "Transaction management and rollback",
                "Database normalization and indexing",
                "Working with MySQL and PostgreSQL",
              ],
              detailedContent: [
                "Establish JDBC connections to relational databases",
                "Execute Create, Read, Update, Delete using SQL from Java",
                "Use prepared statements to avoid SQL injection",
                "Manage transactions for data consistency and rollback",
                "Understand database normalization and schema design",
                "Practice with MySQL Workbench and PostgreSQL Studio",
              ],
              toolsAndTechnologies: [
                {
                  name: "JDBC",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958122/jdbc_hrtf8e.webp",
                  alt: "JDBC",
                },
                {
                  name: "MySQL",
                  icon: "https://img.icons8.com/color/100/mysql-logo.png",
                  alt: "MySQL",
                },
                {
                  name: "PostgreSQL",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958131/postgree_gstwpl.webp",
                  alt: "PostgreSQL",
                },
                {
                  name: "DBeaver",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958116/dbeaver_cfnlij.webp",
                  alt: "DBeaver",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-java",
                downloadCurriculum:
                  "https://example.com/download-curriculum-java",
              },
            },
            {
              title: "Web Development with Java",
              duration: "1 Month",
             content: [
                "Servlets and JSP lifecycle",
                "Session and cookie management",
                "HTTP request/response handling",
                "Creating dynamic web pages with JSP",
                "MVC architecture in Java web apps",
                "Deploying apps on Apache Tomcat",
              ],
              detailedContent: [
                "Create server-side apps using Java Servlets",
                "Track user sessions using cookies and session objects",
                "Handle GET, POST requests and manage responses",
                "Embed Java logic inside HTML with JSP",
                "Separate concerns using Model-View-Controller design",
                "Deploy WAR files on Tomcat or similar servers",
              ],
              toolsAndTechnologies: [
                {
                  name: "Apache Tomcat",
                  icon: "https://img.icons8.com/color/500/tomcat.png",
                  alt: "Tomcat",
                },
                {
                  name: "JSP",
                  icon: "https://img.icons8.com/external-others-iconmarket/100/external-jsp-file-types-others-iconmarket-2.png",
                  alt: "JSP",
                },
                {
                  name: "HTML5",
                  icon: "https://img.icons8.com/color/500/html-5--v1.png",
                  alt: "HTML5",
                },
                {
                  name: "CSS3",
                  icon: "https://img.icons8.com/stickers/500/css3.png",
                  alt: "CSS3",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-java",
                downloadCurriculum:
                  "https://example.com/download-curriculum-java",
              },
            },
            {
              title: "Spring Framework Mastery",
              duration: "2 Months",
              content: [
                "Spring Core and Dependency Injection",
                "Spring Boot and auto-configuration",
                "Spring MVC and controller design",
                "Creating REST APIs using Spring REST",
                "Spring Security and JWT integration",
                "Data access with Spring Data JPA",
              ],
              detailedContent: [
                "Use Spring Core for bean creation and IoC patterns",
                "Leverage Spring Boot for rapid development with minimal setup",
                "Design MVC-based applications with Spring controllers",
                "Develop RESTful endpoints using Spring annotations",
                "Secure applications using Spring Security and JWT",
                "Integrate JPA repositories for seamless DB access",
              ],
              toolsAndTechnologies: [
                {
                  name: "Spring Boot",
                  icon: "https://img.icons8.com/color/500/spring-logo.png",
                  alt: "Spring Boot",
                },
                {
                  name: "Spring Security",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958138/springsecurity_mngqof.webp",
                  alt: "Spring Security",
                },
                {
                  name: "Postman",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958133/postman_tbnxz4.webp",
                  alt: "Postman",
                },
                {
                  name: "REST",
                  icon: "https://img.icons8.com/stickers/100/api-settings.png",
                  alt: "REST APIs",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-java",
                downloadCurriculum:
                  "https://example.com/download-curriculum-java",
              },
            },
          ],
        },
      ],
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "Java Certificate",
      alt: "java-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The JAVA Certification Course at Connecting Dots ERP is tailored for those looking to master the Java programming language.",
      description:
        "Gain proficiency in building high-performance applications, understanding object-oriented principles, and creating scalable solutions. This certification sets you up for success in software development and enterprise-level application design.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for Java training in {city}?",
      paragraphs: [
        "Connecting Dots ERP offers an advanced Java course in {city}, tailored to meet the current industry requirements. The syllabus covers everything from basic Java programming to advanced topics like the Spring Framework, Hibernate, and REST APIs, ensuring a strong theoretical and practical foundation. Additionally, the course integrates the latest Java technologies, preparing students for modern software development challenges. The Java certification in {city} from Connecting Dots ERP sets you apart, making you a competitive candidate for high-demand Java roles across the tech industry.",
        "At Connecting Dots ERP, the Java classes in {city} emphasize hands-on learning through live projects and real-world tasks. Our experienced trainers, with over a decade of industry expertise, provide the guidance you need to be job-ready. The Java training fees in {city} are affordable, making it accessible to students from various backgrounds, and we offer flexible payment plans for those in need. The combination of modern infrastructure and expert mentorship creates the perfect learning environment for learning Java development, ensuring students receive a detailed and practical education.",
        "At Connecting Dots, we believe in project-based learning. During the Java course in {city}, you'll work on collaborative projects, solve coding challenges, and participate in hackathons that mirror real-world industry demands. To support your career goals, Our Java course with 100% placement assistance, ensuring that you not only gain the technical skills but also have the support to secure top roles. Whether you're aiming to become a Java developer or manage full-scale software development projects, this Java course in {city} equips you with the skills and confidence to excel in your career.",
      ],
      listItem1Header: "What makes our Java training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering Core Java to advanced Spring Framework and Hibernate",
        "Hands-on learning through live projects and real-world development tasks",
        "Experienced trainers with over a decade of industry expertise",
        "Affordable fees with flexible payment plans for students from various backgrounds",
        "Project-based learning with collaborative projects and coding challenges",
        "100% placement assistance with strong industry connections and career support",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Who should join the Java course in {city}?",
          answer:
            "This course is ideal for aspiring developers, IT professionals, and anyone looking to build a career in Java programming by mastering both core and advanced Java technologies.",
        },
        {
          question: "What is the mode of training for the Java course?",
          answer:
            "The Java training in {city} is available in both classroom and online modes, allowing flexibility for working professionals and students alike.",
        },
        {
          question: "What is the fee range for the Java course in {city}?",
          answer:
            "The fees for the Java course in {city} typically start from ₹35,000, depending on the level of expertise and certifications provided.",
        },
        {
          question:
            "Which positions can I apply for after completing the course?",
          answer:
            "After completing the Java certification in {city}, you can apply for roles such as Java Developer, Software Engineer, and Backend Developer in top tech companies",
        },
        {
          question: "Which companies are looking for Java developers?",
          answer:
            "Companies like Infosys, TCS, Wipro, and various startups actively hire skilled Java developers to work on enterprise and web applications.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "Chat GPT & AI",
          description: "Learn AI from scratch",
          icon: "https://i.imgur.com/QHuijGO.mp4",
          alt: "Chat GPT icon",
        },
        {
          name: "Masters in Data Science",
          description: "Become a data science expert",
          icon: "https://i.imgur.com/C0Hv62l.mp4",
          alt: "Data Science icon",
        },
        {
          name: "Masters in Data Analytics",
          description: "Master data analytics skills",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "Data Analytics icon",
        },
        {
          name: "Salesforce",
          description: "Salesforce developer courses",
          icon: "https://i.imgur.com/6brz8Ea.mp4",
          alt: "Salesforce icon",
        },
        {
          name: "UI/UX Design",
          description: "Design stunning user interfaces",
          icon: "https://i.imgur.com/9FN2rSu.mp4",
          alt: "UI/UX icon",
        },
        {
          name: "Full-Stack Python",
          description: "Full-stack development with Python",
          icon: "https://i.imgur.com/grx2N9O.mp4",
          alt: "Full Stack Python icon",
        },
        {
          name: "Tableau",
          description: "Master data visualization",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Tableau icon",
        },
        {
          name: "PowerBI",
          description: "Business intelligence with PowerBI",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Power BI icon",
        },
        {
          name: "SQL",
          description: "Learn SQL from experts",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "SQL icon",
        },
        {
          name: "Reactjs Framework",
          description: "Learn Reactjs from Industry Experts",
          icon: "https://i.imgur.com/QxPxKeN.mp4",
          alt: "React icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 134, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-02-15T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-02T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "mern-stack": {
    // === BASIC COURSE INFO ===
    title: "MERN Stack", // Used in: Page titles, headers, SEO
    fullTitle: "MERN Stack Development Training", // Used in: Page content, descriptions
    category: "development", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "mern-stack", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master MERN Stack Development in {city} with our comprehensive course. Learn MongoDB, Express.js, React, and Node.js to build full-stack web applications. Our MERN Stack training in {city} offers hands-on project experience, industry-relevant curriculum, and 100% placement support to help you build a successful career as a Full Stack Developer.",
    metaTitle:
      "MERN Stack Course in {city} | Best MERN Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master MERN Stack in {city}. Expert-led training in MongoDB, Express.js, React, Node.js. Certification, real projects & 100% placement. Launch your full-stack career now!",

    // === COURSE DETAILS ===
    duration: "6-8 months", // Used in: Course summary section, page content
    price: { min: 40000, max: 95000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "MongoDB Database Management",
      "Express.js Backend Development",
      "React.js Frontend Development",
      "Node.js Server-Side Programming",
      "RESTful API Development",
      "Authentication & Authorization",
      "State Management with Redux",
      "Real-time Applications with Socket.io",
      "Deployment & DevOps",
    ],
    prerequisites: "Basic knowledge of HTML, CSS, JavaScript recommended", // Used in: Course details
    certification: "Certified MERN Stack Developer", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "MERN Stack Developer",
      "Full Stack Developer",
      "Web Developer",
      "React Developer",
      "Node.js Developer",
      "JavaScript Developer",
      "Frontend Developer",
      "Backend Developer",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "MERN Stack Training Program in {city}",
      subtitle: "Project-based Job Oriented MERN Stack Course in {city}",
      description:
        "Enhance your career prospects with Connecting Dot's MERN stack course in {city}, where you'll master essential development skills using MongoDB, Express.js, React, and Node.js. With hands-on training and job placement support, this course prepares you for the fast-paced world of full-stack development.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "MERN Stack Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why MERN ?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">MERN Stack?</span>',
          content:
            "MERN stack development involves using MongoDB, Express.js, React, and Node.js to create powerful, full-stack web applications. These technologies enable developers to build everything from dynamic websites to scalable apps. Learning MERN stack development in {city} will make you proficient in both front-end and back-end technologies, making you a valuable asset in the tech industry.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">MERN Stack Developer</span> do?',
          content:
            "A MERN Stack Developer works on building full-stack applications using the MERN stack. They are proficient in both front-end and back-end development.",
          listItems: [
            "Develop web applications using the MERN stack.",
            "Work on both client-side and server-side.",
            "Ensure application scalability and performance.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">MERN Stack</span> training?',
          content:
            "MERN stack developers are highly sought after due to their ability to manage complete web development projects. Our MERN stack training in {city} covers all four technologies, preparing you for roles such as:",
          listItems: [
            "MERN Stack Developer",
            "Web Developer",
            "Full Stack Developer",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
    modulesData: {
      title: "MERN STACK TRAINING CURRICULUM",
      globalActions: {
        startLearning: "https://example.com/start-learning-mern",
        downloadCurriculum: "https://example.com/download-curriculum-mern",
      },
      banner: {
        title: "Master Full Stack Web Development with MERN",
        subtitle:
          "From frontend to backend, become a job-ready full stack developer.",
        image:
          "https://res.cloudinary.com/dudu879kr/image/upload/v1752485069/ITBanner_vkag1x.webp",
        technologies: [
          "React",
          "Node.js",
          "MongoDB",
          "Express",
          "JavaScript",
          "Git",
          "Redux",
        ],
      },
      tabs: [
        {
          modules: [
            {
              title: "Frontend Fundamentals & React",
              duration: "2 Months",
              content: [
                "HTML5, CSS3, and JavaScript ES6+ fundamentals",
                "React.js components, JSX, and virtual DOM",
                "State management and props handling",
                "React Hooks: useState, useEffect, useContext",
                "React Router for single-page applications",
                "Responsive design and CSS frameworks",
              ],
              detailedContent: [
                "Learn HTML, CSS, and JavaScript essentials for frontend",
                "Understand how React builds UIs with virtual DOM",
                "Manage component state and props efficiently",
                "Implement functional features using React Hooks",
                "Build navigable SPAs with React Router",
                "Apply responsive designs using CSS libraries",
              ],
              toolsAndTechnologies: [
                {
                  name: "React",
                  icon: "https://img.icons8.com/office/480/react.png",
                  alt: "React",
                },
                {
                  name: "JavaScript",
                  icon: "https://img.icons8.com/color/500/javascript--v1.png",
                  alt: "JavaScript",
                },
                {
                  name: "CSS3",
                  icon: "https://img.icons8.com/stickers/500/css3.png",
                  alt: "CSS3",
                },
                {
                  name: "HTML5",
                  icon: "https://img.icons8.com/color/500/html-5--v1.png",
                  alt: "HTML5",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-mern",
                downloadCurriculum:
                  "https://example.com/download-curriculum-mern",
              },
            },
            {
              title: "Backend Development with Node.js & Express",
              duration: "2 Months",
              content: [
                "Node.js fundamentals and npm ecosystem",
                "Express.js framework and middleware",
                "RESTful API design and implementation",
                "HTTP methods, status codes, and error handling",
                "Authentication with JWT and bcrypt",
                "File uploads and server-side validation",
              ],
              detailedContent: [
                "Learn backend development using Node.js",
                "Build APIs and routes using Express framework",
                "Handle different HTTP methods and errors",
                "Secure endpoints with JWT and bcrypt",
                "Process file uploads securely",
                "Validate data on server before processing",
              ],
              toolsAndTechnologies: [
                {
                  name: "Node.js",
                  icon: "https://img.icons8.com/fluency/500/node-js.png",
                  alt: "Node.js",
                },
                {
                  name: "Express.js",
                  icon: "https://img.icons8.com/office/500/express-js.png",
                  alt: "Express.js",
                },
                {
                  name: "JWT",
                  icon: "https://img.icons8.com/color/500/java-web-token.png",
                  alt: "JWT",
                },
                {
                  name: "bcrypt",
                  icon: "https://img.icons8.com/color/96/keyhole-shield.png",
                  alt: "bcrypt",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-mern",
                downloadCurriculum:
                  "https://example.com/download-curriculum-mern",
              },
            },
            {
              title: "Database Management with MongoDB",
              duration: "1 Month",
              content: [
                "MongoDB fundamentals and document-based storage",
                "Mongoose ODM for Node.js integration",
                "Database design and schema modeling",
                "CRUD operations and query optimization",
                "Indexing and aggregation pipelines",
                "Database relationships and population",
              ],
              detailedContent: [
                "Understand NoSQL document-based databases",
                "Integrate MongoDB with Node using Mongoose",
                "Design database schemas effectively",
                "Perform CRUD and optimize queries",
                "Use indexes and aggregation pipelines",
                "Model relationships using references",
              ],
              toolsAndTechnologies: [
                {
                  name: "MongoDB",
                  icon: "https://img.icons8.com/color/500/mongodb.png",
                  alt: "MongoDB",
                },
                {
                  name: "Mongoose",
                  icon: "https://img.icons8.com/color/500/mongoose.png",
                  alt: "Mongoose",
                },
                {
                  name: "NoSQL",
                  icon: "/https://res.cloudinary.com/dudu879kr/image/upload/v1753958130/nosql_zxq1og.webp",
                  alt: "NoSQL",
                },
                {
                  name: "Aggregation",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958114/aggregation_ysw0el.webp",
                  alt: "Aggregation",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-mern",
                downloadCurriculum:
                  "https://example.com/download-curriculum-mern",
              },
            },
            {
              title: "Full Stack Integration & Deployment",
              duration: "1 Month",
              content: [
                "Connecting React frontend with Express backend",
                "API integration and data fetching",
                "State management across the application",
                "Environment variables and configuration",
                "Basic deployment on Heroku and Netlify",
                "Version control with Git and GitHub",
              ],
              detailedContent: [
                "Link frontend and backend for full stack",
                "Integrate APIs to send/receive data",
                "Manage app-wide state effectively",
                "Use environment variables securely",
                "Deploy projects to platforms like Heroku",
                "Track changes using GitHub",
              ],
              toolsAndTechnologies: [
                {
                  name: "Git",
                  icon: "https://img.icons8.com/color/500/git.png",
                  alt: "Git",
                },
                {
                  name: "GitHub",
                  icon: "https://img.icons8.com/color/500/github--v1.png",
                  alt: "GitHub",
                },
                {
                  name: "Heroku",
                  icon: "https://img.icons8.com/color/500/heroku.png",
                  alt: "Heroku",
                },
                {
                  name: "Netlify",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958131/netlify_qlqrhj.webp",
                  alt: "Netlify",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-mern",
                downloadCurriculum:
                  "https://example.com/download-curriculum-mern",
              },
            },
            {
              title: "Industry Projects & Portfolio",
              duration: "1 Month",
              content: [
                "E-commerce platform development",
                "Social media application with real-time features",
                "Task management system with team collaboration",
                "Blog platform with content management",
                "Portfolio website and project documentation",
                "Code review and deployment best practices",
              ],
              detailedContent: [
                "Build industry-relevant MERN projects",
                "Develop real-time and collaborative apps",
                "Create a portfolio and host it online",
                "Document your code and decisions",
                "Understand code review strategies",
                "Deploy final projects professionally",
              ],
              toolsAndTechnologies: [
                {
                  name: "VS Code",
                  icon: "https://img.icons8.com/color/500/visual-studio-code-2019.png",
                  alt: "VS Code",
                },
                {
                  name: "Figma",
                  icon: "https://img.icons8.com/color/500/figma--v1.png",
                  alt: "Figma",
                },
                {
                  name: "Trello",
                  icon: "https://img.icons8.com/color/500/trello.png",
                  alt: "Trello",
                },
                {
                  name: "GitHub Pages",
                  icon: "https://img.icons8.com/color/500/github--v1.png",
                  alt: "GitHub Pages",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-mern",
                downloadCurriculum:
                  "https://example.com/download-curriculum-mern",
              },
            },
          ],
        },
      ],
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "MERN-Stack Certificate",
      alt: "mern-stack-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The MERN Stack Certification at Connecting Dots ERP provides specialized training in MongoDB, Express.js, React, and Node.js.",
      description:
        "You'll learn to develop full-stack JavaScript applications with a focus on both front-end and back-end technologies. This certification will prepare you for sought-after roles in modern web development.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for MERN-Stack training in {city}?",
      paragraphs: [
        "Connecting Dots ERP offers a advance MERN stack course in {city}, designed to meet the evolving demands of modern web development. The syllabus covers everything from MongoDB for efficient database management, Express.js for streamlined backend logic, React for dynamic front-end development, to Node.js for robust server-side programming. The MERN stack certification in {city} from Connecting Dots ensures you're well-prepared for real-world development challenges. This course integrates industry-relevant skills and provides exposure to modern development practices, making you proficient in both client and server-side applications. Additionally, our curriculum is constantly updated to reflect the latest advancements in the MERN ecosystem",
        "At Connecting Dots ERP, the MERN stack classes in {city} focus on practical learning through real-world projects. Our trainers, with over a decade of experience in the industry, guide you through hands-on exercises that give you the job-ready skills required in today's competitive market. The MERN stack training fees in {city} are structured to be affordable, ensuring that students from diverse backgrounds have access to high-quality education. We also offer flexible payment options and scholarship opportunities for deserving candidates. With modern infrastructure, including state-of-the-art classrooms and high-performance computing labs, combined with dedicated mentorship, our institute creates the perfect environment for mastering MERN stack development and building a strong portfolio.",
        "In addition to honing technical skills, the MERN stack course in {city} emphasizes learning through collaboration and project-based tasks. Students participate in team-based development projects, hackathons, and problem-solving challenges that simulate real-world development environments. Whether you're aspiring to become a MERN stack developer or aiming to manage full-scale software projects, this course equips you with the confidence and skills to excel in the tech industry. Our MERN Stack course with 100% placement support, ensuring that you not only gain technical expertise but are well-prepared to land top positions in reputed organizations.",
      ],
      listItem1Header: "What makes our MERN Stack training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering MongoDB, Express.js, React, and Node.js",
        "Practical learning through real-world projects and hands-on exercises",
        "Experienced trainers with over a decade of industry experience",
        "Affordable fees with flexible payment options and scholarship opportunities",
        "Modern infrastructure with state-of-the-art labs and dedicated mentorship",
        "100% placement support with strong industry connections and career guidance",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Who should join the MERN stack course in {city}?",
          answer:
            "This course is ideal for aspiring developers, IT professionals, and anyone looking to build a career in full-stack web development using the latest technologies.",
        },
        {
          question: "What is the mode of training for the MERN stack course?",
          answer:
            "The MERN stack training in {city} is available in both online and classroom modes, offering flexibility for students and working professionals.",
        },
        {
          question:
            "What is the fee range for the MERN stack course in {city}?",
          answer:
            "The fees for the MERN stack course in {city} start from ₹35,000, depending on the level of certification and additional resources provided.",
        },
        {
          question:
            "Which positions can I apply for after completing the course?",
          answer:
            "After completing the MERN stack certification in {city}, you can apply for roles like MERN Stack Developer, Full Stack Developer, and Web Developer in leading companies.",
        },
        {
          question: "Which companies are hiring MERN stack developers?",
          answer:
            "Top companies like Infosys, Accenture, TCS, and several tech startups are looking for skilled MERN stack developers to build scalable web applications.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "Chat GPT & AI",
          description: "Learn AI from scratch",
          icon: "https://i.imgur.com/QHuijGO.mp4",
          alt: "Chat GPT icon",
        },
        {
          name: "Masters in Data Science",
          description: "Become a data science expert",
          icon: "https://i.imgur.com/C0Hv62l.mp4",
          alt: "Data Science icon",
        },
        {
          name: "Masters in Data Analytics",
          description: "Master data analytics skills",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "Data Analytics icon",
        },
        {
          name: "Salesforce",
          description: "Salesforce developer courses",
          icon: "https://i.imgur.com/6brz8Ea.mp4",
          alt: "Salesforce icon",
        },
        {
          name: "UI/UX Design",
          description: "Design stunning user interfaces",
          icon: "https://i.imgur.com/9FN2rSu.mp4",
          alt: "UI/UX icon",
        },
        {
          name: "Full-Stack Python",
          description: "Full-stack development with Python",
          icon: "https://i.imgur.com/grx2N9O.mp4",
          alt: "Full Stack Python icon",
        },
        {
          name: "Full-Stack Java",
          description: "Full-stack development with Java",
          icon: "https://i.imgur.com/SYHIAAO.mp4",
          alt: "Java icon",
        },
        {
          name: "PowerBI",
          description: "Business intelligence with PowerBI",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Power BI icon",
        },
        {
          name: "SQL",
          description: "Learn SQL from experts",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "SQL icon",
        },
        {
          name: "Reactjs Framework",
          description: "Learn Reactjs from Industry Experts",
          icon: "https://i.imgur.com/QxPxKeN.mp4",
          alt: "React icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.8, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 167, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-01-15T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-03T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  python: {
    // === BASIC COURSE INFO ===
    title: "Python Programming", // Used in: Page titles, headers, SEO
    fullTitle: "Python Programming & Development Training", // Used in: Page content, descriptions
    category: "programming", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "python", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master Python Programming in {city} with our comprehensive course. Learn Python fundamentals, web development with Django/Flask, data analysis, automation, and machine learning. Our Python training in {city} offers hands-on project experience, industry-relevant curriculum, and 100% placement support to help you build a successful career as a Python Developer.",
    metaTitle: "Python Course in {city} | Best Python Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master Python Programming in {city}. Expert-led training in Python, Django, Flask, data analysis. Certification, real projects & 100% placement. Launch your Python career now!",

    // === COURSE DETAILS ===
    duration: "4-6 months", // Used in: Course summary section, page content
    price: { min: 30000, max: 80000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Python Fundamentals & Syntax",
      "Object-Oriented Programming (OOP)",
      "Data Structures & Algorithms",
      "Web Development with Django/Flask",
      "Data Analysis with Pandas & NumPy",
      "Database Integration & SQL",
      "API Development & Integration",
      "Automation & Scripting",
      "Testing & Debugging",
    ],
    prerequisites: "Basic computer knowledge and logical thinking ability", // Used in: Course details
    certification: "Certified Python Developer", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "Python Developer",
      "Data Analyst",
      "Web Developer",
      "Machine Learning Engineer",
      "Backend Developer",
      "Automation Engineer",
      "Software Engineer",
      "Data Scientist",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Python Training Program in {city}",
      subtitle:
        "Learn Our advanced Python Course in {city} with practical training",
      description:
        "Unlock new career opportunities with Connecting Dot's Python course in {city}, designed to help you master one of the most versatile programming languages. Through hands-on training, expert mentorship, and real-world projects, this course prepares you for a wide range of programming roles, making you proficient in Python development and data handling.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "PYTHON Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why Python?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">Python Development?</span>',
          content:
            "Python is a high-level, general-purpose programming language known for its simplicity and readability. It's widely used in web development, data science, machine learning, automation, and more. Learning Python in {city} will equip you with the skills to develop robust applications, work with data, and even create AI-powered solutions, making it one of the most in-demand skills in the tech industry.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">Python Developer</span> do?',
          content:
            "A Python Developer writes server-side web application logic, works on integrating front-end elements, and develops back-end components.",
          listItems: [
            "Write reusable and efficient code.",
            "Implement security and data protection.",
            "Integrate user-facing elements with server-side logic.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">Python</span> training?',
          content:
            "Python developers are highly valued across industries due to the language's broad range of applications. Our Python training in {city} covers everything from basic syntax to advanced topics, preparing you for roles such as:",
          listItems: [
            "Python Developer",
            "Data Analyst",
            "Machine Learning Engineer",
            "Web Developer",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
    modulesData: {
      title: "PYTHON TRAINING CURRICULUM",
      globalActions: {
        startLearning: "https://example.com/start-learning-python",
        downloadCurriculum: "https://example.com/download-curriculum-python",
      },
      banner: {
        title: "Become a Pro Python Developer",
        subtitle:
          "Master Python from fundamentals to automation and ML with hands-on projects.",
        image:
          "https://res.cloudinary.com/dudu879kr/image/upload/v1752485069/ITBanner_vkag1x.webp",
        technologies: ["Python", "Flask", "Pandas", "Django", "Git", "NumPy"],
      },
      tabs: [
        {
          modules: [
            {
              title: "Python Fundamentals",
              duration: "1 Month",
              content: [
                "Python syntax, variables, and data types",
                "Control structures: loops, conditionals, and functions",
                "Data structures: lists, tuples, dictionaries, and sets",
                "File handling and input/output operations",
                "Error handling and exception management",
                "Python standard library and modules",
              ],
              detailedContent: [
                "Learn basic syntax and variables in Python",
                "Implement logic using loops and conditionals",
                "Work with built-in data structures efficiently",
                "Read and write files with Python I/O operations",
                "Handle exceptions and errors gracefully",
                "Explore modules in the Python standard library",
              ],
              toolsAndTechnologies: [
                {
                  name: "Python",
                  icon: "https://img.icons8.com/color/500/python--v1.png",
                  alt: "Python",
                },
                {
                  name: "IDLE",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958121/idle_kfdsuz.webp",
                  alt: "IDLE",
                },
                {
                  name: "Jupyter",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958123/jupyter_us3hf1.webp",
                  alt: "Jupyter Notebook",
                },
                {
                  name: "VS Code",
                  icon: "https://img.icons8.com/color/500/visual-studio-code-2019.png",
                  alt: "VS Code",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-python",
                downloadCurriculum:
                  "https://example.com/download-curriculum-python",
              },
            },
            {
              title: "Object-Oriented Programming in Python",
              duration: "1 Month",
              content: [
                "Classes and objects in Python",
                "Inheritance, polymorphism, and encapsulation",
                "Method overriding and operator overloading",
                "Abstract classes and interfaces",
                "Design patterns and best practices",
                "Package creation and module management",
              ],
              detailedContent: [
                "Understand core OOP principles in Python",
                "Create reusable code using inheritance",
                "Override methods and overload operators",
                "Use abstract classes for structured designs",
                "Apply OOP design patterns effectively",
                "Package your code and manage modules",
              ],
              toolsAndTechnologies: [
                {
                  name: "Python OOP",
                  icon: "https://img.icons8.com/color/500/python--v1.png",
                  alt: "OOP",
                },
                {
                  name: "UML",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958142/uml_phu2ef.webp",
                  alt: "UML",
                },
                {
                  name: "PyCharm",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958134/pycharm_afxyro.webp",
                  alt: "PyCharm",
                },
                {
                  name: "Git",
                  icon: "https://img.icons8.com/color/500/github--v1.png",
                  alt: "Git",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-python",
                downloadCurriculum:
                  "https://example.com/download-curriculum-python",
              },
            },
            {
              title: "Data Analysis & Visualization",
              duration: "1 Month",
              content: [
                "NumPy for numerical computing",
                "Pandas for data manipulation and analysis",
                "Matplotlib and Seaborn for data visualization",
                "Working with CSV, JSON, and Excel files",
                "Data cleaning and preprocessing techniques",
                "Statistical analysis and data insights",
              ],
              detailedContent: [
                "Use NumPy for high-performance computation",
                "Analyze datasets using Pandas",
                "Visualize trends with Matplotlib & Seaborn",
                "Import/export data from common formats",
                "Clean and prepare messy datasets",
                "Perform basic statistical analysis",
              ],
              toolsAndTechnologies: [
                {
                  name: "Pandas",
                  icon: "https://img.icons8.com/color/500/pandas.png",
                  alt: "Pandas",
                },
                {
                  name: "NumPy",
                  icon: "https://img.icons8.com/color/500/numpy.png",
                  alt: "NumPy",
                },
                {
                  name: "Matplotlib",
                  icon: "https://img.icons8.com/color/500/matplotlib.png",
                  alt: "Matplotlib",
                },
                {
                  name: "Seaborn",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958137/seaborn_nai220.webp",
                  alt: "Seaborn",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-python",
                downloadCurriculum:
                  "https://example.com/download-curriculum-python",
              },
            },
            {
              title: "Web Development with Flask",
              duration: "1 Month",
              content: [
                "Introduction to web development concepts",
                "Flask framework for web applications",
                "HTML templates and form handling",
                "Database integration with SQLite",
                "RESTful API development basics",
                "Deployment and hosting fundamentals",
              ],
              detailedContent: [
                "Learn backend web development using Flask",
                "Render templates and handle forms",
                "Connect Flask apps to databases",
                "Create basic RESTful APIs",
                "Deploy projects to cloud platforms",
                "Host projects on Heroku or Netlify",
              ],
              toolsAndTechnologies: [
                {
                  name: "Flask",
                  icon: "https://img.icons8.com/color/500/flask.png",
                  alt: "Flask",
                },
                {
                  name: "SQLite",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958141/sqlite_weeyzh.webp",
                  alt: "SQLite",
                },
                {
                  name: "HTML",
                  icon: "https://img.icons8.com/color/500/html-5--v2.png",
                  alt: "HTML",
                },
                {
                  name: "Bootstrap",
                  icon: "https://img.icons8.com/color/500/bootstrap--v1.png",
                  alt: "Bootstrap",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-python",
                downloadCurriculum:
                  "https://example.com/download-curriculum-python",
              },
            },
            {
              title: "Automation, ML & Final Projects",
              duration: "1 Month",
              content: [
                "Web scraping with BeautifulSoup and Scrapy",
                "Task automation and scheduling scripts",
                "Intro to ML with scikit-learn",
                "Building and evaluating basic ML models",
                "System administration and scripting",
                "Portfolio building with GitHub",
              ],
              detailedContent: [
                "Automate repetitive tasks with Python scripts",
                "Scrape data from the web using libraries",
                "Get started with ML using scikit-learn",
                "Build basic models and evaluate results",
                "Develop and document portfolio projects",
                "Push your code to GitHub for visibility",
              ],
              toolsAndTechnologies: [
                {
                  name: "BeautifulSoup",
                  icon: "https://img.icons8.com/color/500/python--v1.png",
                  alt: "BeautifulSoup",
                },
                {
                  name: "scikit-learn",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958137/scikit_v8jneg.webp",
                  alt: "scikit-learn",
                },
                {
                  name: "GitHub",
                  icon: "https://img.icons8.com/color/500/github--v1.png",
                  alt: "GitHub",
                },
                {
                  name: "Scrapy",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958137/scrapy_lqm6cw.webp",
                  alt: "Scrapy",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-python",
                downloadCurriculum:
                  "https://example.com/download-curriculum-python",
              },
            },
          ],
        },
      ],
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "Python Certificate",
      alt: "python-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The Python Certification at Connecting Dots ERP equips you with versatile skills in one of the most popular programming languages.",
      description:
        "Learn to use Python for data analysis, web development, and automation. This certification is ideal for professionals seeking roles in data science, software development, or automation engineering.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for Python training in {city}?",
      paragraphs: [
        "At Connecting Dots ERP, we offer a comprehensive and industry-focused Python course in {city} designed to cover the core concepts of Python programming, ranging from the basics to advanced topics. The curriculum includes everything from object-oriented programming, file handling, and data manipulation to working with essential Python libraries like Pandas, NumPy, and popular frameworks such as Django and Flask. Whether you're a complete beginner or looking to upgrade your existing coding skills, our Python certification in {city} ensures that you gain the practical knowledge and hands-on experience needed to become job-ready. The course is tailored to meet industry demands, making sure you're well-equipped to solve real-world coding challenges.",
        "Our Python classes in {city} emphasize hands-on learning through live projects and real-time coding exercises, ensuring that you can immediately apply the skills you learn in class to real-world scenarios. Students engage in practical coding tasks such as building web applications, automating tasks, and analyzing datasets, giving them a competitive edge in the job market. The Python course fees in {city} are affordable, making high-quality education accessible to a broad range of learners from different backgrounds. We also offer flexible payment options and scholarship opportunities to ensure that everyone can pursue their passion for programming. With a structured curriculum designed by industry experts, mentorship from seasoned professionals, and access to modern learning tools, you'll receive the support you need to master Python and succeed in your programming career.",
        "In addition to the core technical skills, the Python course in {city} also offers collaborative learning through group projects, coding challenges, and hackathons. These activities foster teamwork and problem-solving abilities, preparing students for the collaborative nature of real-world programming environments. One of the key highlights of the course is our Python course with 100% placement assistance, where we help students transition smoothly into the workforce by offering resume building, interview preparation, and direct placement opportunities. Whether you're aiming to become a Python developer or manage data-driven projects, this course equips you with the skills, confidence, and job support to excel in the tech industry.",
      ],
      listItem1Header: "What makes our Python training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering Python fundamentals to advanced frameworks like Django and Flask",
        "Hands-on learning through live projects, real-time coding exercises, and practical applications",
        "Essential Python libraries training including Pandas, NumPy, and data visualization tools",
        "Affordable fees with flexible payment options and scholarship opportunities",
        "Collaborative learning through group projects, coding challenges, and hackathons",
        "100% placement assistance with resume building, interview preparation, and direct placement opportunities",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Who should join the Python programming course in {city}?",
          answer:
            "This course is suitable for beginners, IT professionals, data enthusiasts, and anyone looking to build a career in programming or data science.",
        },
        {
          question: "What is the mode of training for the Python course?",
          answer:
            "The Python training in {city} is available in both online and classroom formats, providing flexibility for working professionals and students.",
        },
        {
          question: "What is the fee range for the Python course in {city}?",
          answer:
            "The fees for the Python course in {city} start from ₹30,000, depending on the certification level and resources included.",
        },
        {
          question:
            "Which positions can I apply for after completing the course?",
          answer:
            "After completing the Python certification in {city}, you can apply for roles such as Python Developer, Data Analyst, Web Developer, and Machine Learning Engineer.",
        },
        {
          question: "Which companies are hiring Python developers?",
          answer:
            "Top companies like Google, Amazon, IBM, and various startups are constantly hiring Python developers to work on innovative projects across multiple industries.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "Chat GPT & AI",
          description: "Learn AI from scratch",
          icon: "https://i.imgur.com/QHuijGO.mp4",
          alt: "Chat GPT icon",
        },
        {
          name: "Masters in Data Science",
          description: "Become a data science expert",
          icon: "https://i.imgur.com/C0Hv62l.mp4",
          alt: "Data Science icon",
        },
        {
          name: "Masters in Data Analytics",
          description: "Master data analytics skills",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "Data Analytics icon",
        },
        {
          name: "Salesforce",
          description: "Salesforce developer courses",
          icon: "https://i.imgur.com/6brz8Ea.mp4",
          alt: "Salesforce icon",
        },
        {
          name: "UI/UX Design",
          description: "Design stunning user interfaces",
          icon: "https://i.imgur.com/9FN2rSu.mp4",
          alt: "UI/UX icon",
        },
        {
          name: "Tableau",
          description: "Master data visualization",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Tableau icon",
        },
        {
          name: "Full-Stack Java",
          description: "Full-stack development with Java",
          icon: "https://i.imgur.com/SYHIAAO.mp4",
          alt: "Java icon",
        },
        {
          name: "PowerBI",
          description: "Business intelligence with PowerBI",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Power BI icon",
        },
        {
          name: "SQL",
          description: "Learn SQL from experts",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "SQL icon",
        },
        {
          name: "Reactjs Framework",
          description: "Learn Reactjs from Industry Experts",
          icon: "https://i.imgur.com/QxPxKeN.mp4",
          alt: "React icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.7, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 189, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-01-20T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-04T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  salesforce: {
    // === BASIC COURSE INFO ===
    title: "Salesforce", // Used in: Page titles, headers, SEO
    fullTitle: "Salesforce CRM Development & Administration", // Used in: Page content, descriptions
    category: "crm", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "salesforce", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master Salesforce CRM in {city} with our comprehensive course. Learn Salesforce administration, Apex programming, Lightning Web Components, and CRM management. Our Salesforce training in {city} offers hands-on project experience, industry-relevant curriculum, and 100% placement support to help you build a successful career as a Salesforce professional.",
    metaTitle:
      "Salesforce Course in {city} | Best Salesforce Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master Salesforce CRM in {city}. Expert-led training in Salesforce admin, Apex, Lightning. Certification, real projects & 100% placement. Launch your Salesforce career now!",

    // === COURSE DETAILS ===
    duration: "3-6 months", // Used in: Course summary section, page content
    price: { min: 45000, max: 120000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Salesforce CRM Fundamentals",
      "Salesforce Administration",
      "Apex Programming Language",
      "Visualforce Development",
      "Lightning Web Components",
      "Salesforce Integration",
      "Process Automation & Workflows",
      "Data Management & Security",
      "Salesforce Analytics & Reports",
    ],
    prerequisites:
      "Basic understanding of CRM concepts and business processes recommended", // Used in: Course details
    certification: "Salesforce Certified Administrator & Developer", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "Salesforce Administrator",
      "Salesforce Developer",
      "CRM Consultant",
      "Salesforce Business Analyst",
      "Salesforce Architect",
      "CRM Manager",
      "Salesforce Technical Lead",
      "Cloud Solutions Consultant",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Advance Salesforce Training in {city}",
      subtitle: "Join our Project-based Salesforce Training Program in {city}",
      description:
        "Accelerate your career with Connecting Dot's Salesforce course in {city}, designed to equip you with the essential skills required to master Salesforce CRM, one of the most in-demand platforms in the world. Through practical training and project-based learning, this course prepares you for a range of roles in CRM management, cloud solutions, and customer relationship management.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "Salesforce Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why Salesforce ?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">Salesforce Development?</span>',
          content:
            "Salesforce is a cloud-based Customer Relationship Management (CRM) platform that helps businesses manage customer relationships, track sales, and automate services. It is widely used across industries to streamline operations and improve customer engagement. Learning Salesforce in {city} will give you the expertise to manage CRM solutions, sales processes, and customer service applications, making you a valuable asset for organizations looking to optimize their customer relationship strategies.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">Salesforce Developer</span> do?',
          content:
            "A Salesforce Developer creates custom applications, integrations, and functionalities on the Salesforce platform. They are skilled in using Apex, Visualforce, and other Salesforce technologies.",
          listItems: [
            "Develop custom Salesforce applications.",
            "Integrate Salesforce with other systems.",
            "Customize Salesforce functionalities.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">Salesforce</span> training?',
          content:
            "Salesforce professionals are in high demand due to the widespread use of Salesforce CRM in industries ranging from retail to technology. Our Salesforce training in {city} covers all the essential modules, preparing you for roles such as:",
          listItems: [
            "Salesforce Administrator",
            "CRM Consultant",
            "Salesforce Business Analyst",
            "Salesforce Developer",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
    modulesData: {
      title: "SALESFORCE TRAINING CURRICULUM",
      globalActions: {
        startLearning: "https://example.com/start-learning-salesforce",
        downloadCurriculum:
          "https://example.com/download-curriculum-salesforce",
      },
      banner: {
        title: "Master Salesforce CRM & Cloud Solutions",
        subtitle:
          "From CRM fundamentals to automation and deployment – become job-ready with Salesforce skills.",
        image:
          "https://res.cloudinary.com/dudu879kr/image/upload/v1752485069/ITBanner_vkag1x.webp",
        technologies: ["Salesforce", "Apex", "Visualforce", "Lightning", "CRM"],
      },
      tabs: [
        {
          modules: [
            {
              title: "Salesforce CRM Fundamentals",
              duration: "1 Month",
              content: [
                "Introduction to Salesforce and cloud computing",
                "Salesforce ecosystem and platform overview",
                "Understanding CRM concepts and business processes",
                "Salesforce navigation and user interface",
                "Standard objects: Accounts, Contacts, Leads, Opportunities",
                "Data model and relationships in Salesforce",
              ],
              detailedContent: [
                "Understand Salesforce platform and CRM importance",
                "Navigate the interface and core modules",
                "Learn key standard objects and their roles",
                "Understand business logic with real-world scenarios",
                "Explore data relationships and object linking",
                "Grasp CRM best practices in cloud environments",
              ],
              toolsAndTechnologies: [
                {
                  name: "Salesforce",
                  icon: "https://img.icons8.com/color/500/salesforce.png",
                  alt: "Salesforce",
                },
                {
                  name: "Cloud Computing",
                  icon: "https://img.icons8.com/stickers/100/cloud-computing.png",
                  alt: "Cloud",
                },
                {
                  name: "CRM",
                  icon: "https://img.icons8.com/external-soft-fill-juicy-fish/100/external-crm-business-process-soft-fill-soft-fill-juicy-fish.png",
                  alt: "CRM",
                },
                {
                  name: "UI/UX",
                  icon: "https://img.icons8.com/ios/100/web.png",
                  alt: "UI/UX",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-salesforce",
                downloadCurriculum:
                  "https://example.com/download-curriculum-salesforce",
              },
            },
            {
              title: "Salesforce Administration",
              duration: "1 Month",
              content: [
                "User management and security settings",
                "Profiles, roles, and permission sets",
                "Custom objects and fields creation",
                "Page layouts and record types",
                "Validation rules and formula fields",
                "Workflow rules and process automation",
              ],
              detailedContent: [
                "Manage users, roles, and permissions securely",
                "Customize Salesforce using objects and fields",
                "Design page layouts for better user experience",
                "Apply automation with workflow and validation rules",
                "Build formulas and logic-driven UI elements",
                "Implement security at every level of the org",
              ],
              toolsAndTechnologies: [
                {
                  name: "Admin Console",
                  icon: "https://img.icons8.com/officel/30/console.png",
                  alt: "Admin Panel",
                },
                {
                  name: "Workflow",
                  icon: "https://img.icons8.com/clouds/100/workflow.png",
                  alt: "Workflow",
                },
                {
                  name: "Security",
                  icon: "https://img.icons8.com/fluency/100/web-application-firewall.png",
                  alt: "Security",
                },
                {
                  name: "Formula",
                  icon: "https://img.icons8.com/fluency/100/formula-fx.png",
                  alt: "Formula Field",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-salesforce",
                downloadCurriculum:
                  "https://example.com/download-curriculum-salesforce",
              },
            },
            {
              title: "Reports & Dashboards",
              duration: "1 Month",
              content: [
                "Creating and customizing reports",
                "Report types and folder management",
                "Dashboard creation and components",
                "Scheduled reports and email alerts",
                "Analytics and data visualization",
                "Salesforce mobile app configuration",
              ],
              detailedContent: [
                "Build customized reports and dashboards",
                "Use advanced filters and folder permissions",
                "Schedule and automate report delivery",
                "Visualize data trends with charts and graphs",
                "Leverage dashboards for strategic decisions",
                "Enable and use Salesforce on mobile",
              ],
              toolsAndTechnologies: [
                {
                  name: "Reports",
                  icon: "https://img.icons8.com/fluency/96/graph-report.png",
                  alt: "Reports",
                },
                {
                  name: "Dashboards",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958115/dashboard_gdngmd.webp",
                  alt: "Dashboards",
                },
                {
                  name: "Analytics",
                  icon: "https://img.icons8.com/fluency/96/bar-chart.png",
                  alt: "Analytics",
                },
                {
                  name: "Mobile App",
                  icon: "https://img.icons8.com/fluency/100/prequel-app.png",
                  alt: "Mobile App",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-salesforce",
                downloadCurriculum:
                  "https://example.com/download-curriculum-salesforce",
              },
            },
            {
              title: "Apex & Lightning Development",
              duration: "1.5 Months",
              content: [
                "Apex programming language and OOP",
                "SOQL and SOSL queries for data retrieval",
                "Triggers and DML operations",
                "Visualforce pages and Lightning components",
                "Lightning Web Components (LWC)",
                "Event handling and design system",
              ],
              detailedContent: [
                "Write server-side logic using Apex",
                "Query Salesforce data using SOQL/SOSL",
                "Implement business logic with triggers",
                "Build UI using Visualforce and Lightning",
                "Create dynamic components using LWC",
                "Understand event handling in modern UI",
              ],
              toolsAndTechnologies: [
                {
                  name: "Apex",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958115/apex_dwlcx4.webp",
                  alt: "Apex",
                },
                {
                  name: "LWC",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958126/lwc_qnzjin.webp",
                  alt: "Lightning Web Components",
                },
                {
                  name: "SOQL",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958140/sql_wonstk.webp",
                  alt: "SOQL",
                },
                {
                  name: "Visualforce",
                  icon: "https://img.icons8.com/color/500/salesforce.png",
                  alt: "Visualforce",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-salesforce",
                downloadCurriculum:
                  "https://example.com/download-curriculum-salesforce",
              },
            },
            {
              title: "Salesforce Projects & Certification",
              duration: "0.5 Month",
              content: [
                "Real-world Salesforce implementation projects",
                "Sales Cloud and Service Cloud configuration",
                "Marketing Cloud and Commerce Cloud basics",
                "Certification exam preparation",
                "Mock interviews and resume building",
                "Portfolio development and deployment",
              ],
              detailedContent: [
                "Apply skills to real Salesforce projects",
                "Work with various Salesforce cloud modules",
                "Prepare for certification with mock tests",
                "Craft a compelling Salesforce resume",
                "Present your work via a professional portfolio",
                "Practice deployment and sandbox usage",
              ],
              toolsAndTechnologies: [
                {
                  name: "Sales Cloud",
                  icon: "https://img.icons8.com/clouds/150/cloud.png",
                  alt: "Sales Cloud",
                },
                {
                  name: "Service Cloud",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958137/service_cloud_npv5tg.webp",
                  alt: "Service Cloud",
                },
                {
                  name: "Marketing Cloud",
                  icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958127/marketing_cloud_qvd5qh.webp",
                  alt: "Marketing Cloud",
                },
                {
                  name: "Certification",
                  icon: "https://img.icons8.com/glyph-neue/100/certificate.png",
                  alt: "Certification",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-salesforce",
                downloadCurriculum:
                  "https://example.com/download-curriculum-salesforce",
              },
            },
          ],
        },
      ],
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "Salesforce Certificate",
      alt: "salesforce-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The Salesforce Training Certification at Connecting Dots ERP is designed to make you proficient in managing and configuring Salesforce CRM.",
      description:
        "Gain hands-on experience with Salesforce tools, learn to automate workflows, and streamline customer relationship processes. This certification prepares you for in-demand roles in CRM and cloud technology.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for Salesforce training in {city}?",
      paragraphs: [
        "At Connecting Dots ERP, we offer an industry-driven Salesforce course in {city} designed to provide a thorough understanding of the Salesforce platform, including CRM fundamentals, Salesforce administration, Apex programming, Visualforce, and Lightning Web Components. Whether you're new to Salesforce or seeking to advance your skills, our Salesforce certification in {city} equips you with the practical knowledge and experience necessary to become job-ready. This course not only covers theoretical aspects but also focuses on practical applications to ensure that you're prepared to meet the demands of Salesforce roles in the real world.",
        "Our Salesforce classes in {city} emphasize hands-on learning through live projects and case studies that allow you to apply Salesforce functionalities in real-world scenarios. From customizing Salesforce apps to automating processes, you'll gain the experience required to solve business challenges using Salesforce tools. The Salesforce course fees in {city} are structured to be affordable, ensuring that learners from diverse backgrounds can access this high-quality training. Additionally, we offer flexible payment options and financial aid to make the course accessible to all. With mentorship from experienced Salesforce professionals and a well-structured curriculum, you'll receive the guidance and support needed to become proficient in Salesforce.",
        "In addition to gaining technical expertise, the Salesforce course in {city} encourages collaborative learning through group projects, problem-solving exercises, and simulation-based tasks. These activities help you develop teamwork and critical thinking skills, which are essential in today's fast-paced business environments. A key benefit of our program is the Salesforce course with 100% placement assistance, which provides personalized career support, including resume writing, interview preparation, and direct job placement opportunities with top companies. Whether you're aiming to become a Salesforce Administrator, Developer, or Consultant, this course provides the skills, confidence, and placement support to help you excel in your Salesforce career.",
      ],
      listItem1Header: "What makes our Salesforce training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering CRM fundamentals, administration, Apex programming, and Lightning Web Components",
        "Hands-on learning through live projects and real-world case studies",
        "Mentorship from experienced Salesforce professionals with industry expertise",
        "Affordable fees with flexible payment options and financial aid availability",
        "Collaborative learning through group projects and simulation-based tasks",
        "100% placement assistance with personalized career support and direct job placement opportunities",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Who should join the Salesforce course in {city}?",
          answer:
            "This course is ideal for CRM professionals, IT professionals, developers, and anyone looking to build a career in Salesforce administration or development.",
        },
        {
          question: "What is the mode of training for the Salesforce course?",
          answer:
            "The Salesforce training in {city} is available in both online and classroom formats, providing flexibility for students and working professionals.",
        },
        {
          question:
            "What is the fee range for the Salesforce course in {city}?",
          answer:
            "The fees for the Salesforce course in {city} start from ₹45,000, depending on the level of certification and additional resources provided.",
        },
        {
          question:
            "Which positions can I apply for after completing the course?",
          answer:
            "After completing the Salesforce certification in {city}, you can apply for roles such as Salesforce Administrator, Salesforce Developer, and CRM Consultant.",
        },
        {
          question:
            "How long does it take to complete the Salesforce course in {city}?",
          answer:
            "The Salesforce course in {city} typically takes 3 to 6 months to complete, depending on the learner's pace and the chosen course format.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "Chat GPT & AI",
          description: "Learn AI from scratch",
          icon: "https://i.imgur.com/QHuijGO.mp4",
          alt: "Chat GPT icon",
        },
        {
          name: "Masters in Data Science",
          description: "Become a data science expert",
          icon: "https://i.imgur.com/C0Hv62l.mp4",
          alt: "Data Science icon",
        },
        {
          name: "Masters in Data Analytics",
          description: "Master data analytics skills",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "Data Analytics icon",
        },
        {
          name: "Tableau",
          description: "Master data visualization",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Tableau icon",
        },
        {
          name: "UI/UX Design",
          description: "Design stunning user interfaces",
          icon: "https://i.imgur.com/9FN2rSu.mp4",
          alt: "UI/UX icon",
        },
        {
          name: "Full-Stack Python",
          description: "Full-stack development with Python",
          icon: "https://i.imgur.com/grx2N9O.mp4",
          alt: "Full Stack Python icon",
        },
        {
          name: "Full-Stack Java",
          description: "Full-stack development with Java",
          icon: "https://i.imgur.com/SYHIAAO.mp4",
          alt: "Java icon",
        },
        {
          name: "PowerBI",
          description: "Business intelligence with PowerBI",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Power BI icon",
        },
        {
          name: "SQL",
          description: "Learn SQL from experts",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "SQL icon",
        },
        {
          name: "Reactjs Framework",
          description: "Learn Reactjs from Industry Experts",
          icon: "https://i.imgur.com/QxPxKeN.mp4",
          alt: "React icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 112, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-02-10T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-06T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "ui-ux": {
    // === BASIC COURSE INFO ===
    title: "UI/UX Design", // Used in: Page titles, headers, SEO
    fullTitle: "User Interface & User Experience Design", // Used in: Page content, descriptions
    category: "design", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "ui-ux", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master UI/UX Design in {city} with our comprehensive course. Learn user-centered design, wireframing, prototyping, user research, and design tools like Figma, Adobe XD. Our UI/UX training in {city} offers hands-on project experience, industry-relevant curriculum, and 100% placement support to help you build a successful career as a UI/UX Designer.",
    metaTitle:
      "UI/UX Design Course in {city} | Best UI/UX Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master UI/UX Design in {city}. Expert-led training in Figma, Adobe XD, user research, prototyping. Certification, real projects & 100% placement. Launch your design career now!",

    // === COURSE DETAILS ===
    duration: "4-6 months", // Used in: Course summary section, page content
    price: { min: 40000, max: 100000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Design Fundamentals & Principles",
      "User Research & Analysis",
      "Wireframing & Prototyping",
      "Visual Design & Typography",
      "Interaction Design",
      "Usability Testing",
      "Design Tools (Figma, Adobe XD, Sketch)",
      "Mobile & Responsive Design",
      "Design Systems & Style Guides",
    ],
    prerequisites: "Basic computer knowledge and creative thinking ability", // Used in: Course details
    certification: "Certified UI/UX Designer", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "UI/UX Designer",
      "Product Designer",
      "Interaction Designer",
      "Visual Designer",
      "User Experience Researcher",
      "Design Consultant",
      "Digital Product Designer",
      "UX Analyst",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Advance UI/UX Training in {city}",
      subtitle: "Advanced Job-Oriented UI/UX Design Training in {city}",
      description:
        "Advance your design career with Connecting Dot's UI/UX design course in {city}, where you'll learn the fundamentals of user-centered design, including wireframing, prototyping, and user research. Through hands-on projects and expert guidance, this course prepares you for dynamic roles in the field of user interface and user experience design, with a focus on creativity and practical application.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "UI/UX Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why UI/UX ?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">UI/UX Design?</span>',
          content:
            "UI/UX design focuses on creating intuitive and engaging user interfaces while ensuring a seamless user experience. The UI (User Interface) deals with the visual elements of an application or website, while UX (User Experience) focuses on the overall feel and usability. By mastering both UI and UX, you'll be equipped to design products that are not only aesthetically pleasing but also functional and user-friendly. Taking a UI/UX course in {city} will give you the skills to design with both form and function in mind, helping companies build products that users love.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">UI/UX Designer</span> do?',
          content:
            "A UI/UX Designer creates intuitive user interfaces and experiences. They work on designing the visual layout as well as improving the user journey.",
          listItems: [
            "Design user interfaces for web and mobile.",
            "Conduct user research and usability testing.",
            "Collaborate with developers to implement designs.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">UI/UX Design</span> training?',
          content:
            "UI/UX designers are in high demand across a range of industries, from tech startups to large corporations. Our UI/UX design training in {city} equips you with essential skills for roles like:",
          listItems: [
            "UI/UX Designer",
            "Product Designer",
            "Interaction Designer",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
    modulesData: {
      title: "UI/UX TRAINING CURRICULUM",
      globalActions: {
        startLearning: "https://example.com/start-learning-uiux",
        downloadCurriculum: "https://example.com/download-curriculum-uiux",
      },
      banner: {
        title: "Master UI/UX Design from Research to Prototyping",
        subtitle:
          "Design user-centered interfaces and experiences from scratch.",
        image:
          "https://res.cloudinary.com/dudu879kr/image/upload/v1752485069/UIUXBanner_uiux.webp",
        technologies: [
          "Figma",
          "Adobe XD",
          "Sketch",
          "InVision",
          "Design Thinking",
          "User Research",
        ],
      },
      tabs: [
        {
          modules: [
            {
              title: "Design Fundamentals",
              duration: "1 Month",
              content: [
                "Introduction to UI/UX design principles",
                "Color theory and psychology in design",
                "Typography fundamentals and font selection",
                "Layout principles and visual hierarchy",
                "Design thinking methodology",
                "Understanding user-centered design approach",
              ],
              detailedContent: [
                "Learn the foundation of good design with UI/UX principles",
                "Understand how color and typography affect user experience",
                "Design layouts that guide attention and deliver clarity",
                "Use design thinking to solve real-world problems",
                "Practice a user-centered approach to design decisions",
              ],
              toolsAndTechnologies: [
                {
                  name: "Design Thinking",
                  icon: "https://img.icons8.com/external-parzival-1997-outline-color-parzival-1997/100/external-design-thinking-start-it-up-parzival-1997-outline-color-parzival-1997.png",
                  alt: "Design Thinking",
                },
                {
                  name: "Color Theory",
                  icon: "https://img.icons8.com/color/100/rgb-circle-1--v1.png",
                  alt: "Color Theory",
                },
                {
                  name: "Typography",
                  icon: "https://img.icons8.com/ios/100/generic-text.png",
                  alt: "Typography",
                },
                {
                  name: "UI Principles",
                  icon: "https://img.icons8.com/ios/100/web.png",
                  alt: "UI Principles",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-uiux",
                downloadCurriculum:
                  "https://example.com/download-curriculum-uiux",
              },
            },
            {
              title: "User Research & Analysis",
              duration: "1 Month",
              content: [
                "User research methods and techniques",
                "Creating user personas and user journey maps",
                "Conducting interviews and surveys",
                "Competitive analysis and market research",
                "Information architecture and site mapping",
                "User empathy and behavioral analysis",
              ],
              detailedContent: [
                "Discover user needs through research and surveys",
                "Develop personas and map user journeys",
                "Analyze competitors and market data",
                "Build site architecture for usability",
                "Understand user behaviors to shape better designs",
              ],
              toolsAndTechnologies: [
                {
                  name: "Persona Creator",
                  icon: "https://img.icons8.com/external-vectorslab-flat-vectorslab/100/external-Portfolio-files-and-folders-vectorslab-flat-vectorslab.png",
                  alt: "Persona Creator",
                },
                {
                  name: "Survey Tools",
                  icon: "https://img.icons8.com/fluency/100/survey.png",
                  alt: "Survey Tools",
                },
                {
                  name: "Journey Maps",
                  icon: "https://img.icons8.com/color/480/apple-map.png",
                  alt: "Journey Maps",
                },
                {
                  name: "Empathy Mapping",
                  icon: "https://img.icons8.com/external-others-phat-plus/100/external-empathy-design-thinking-color-line-others-phat-plus.png",
                  alt: "Empathy Mapping",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-uiux",
                downloadCurriculum:
                  "https://example.com/download-curriculum-uiux",
              },
            },
            {
              title: "Wireframing & Prototyping",
              duration: "1 Month",
              content: [
                "Low-fidelity and high-fidelity wireframing",
                "Prototyping tools and techniques",
                "Interactive prototypes and micro-interactions",
                "Paper prototyping and digital wireframes",
                "Storyboarding and user flow creation",
                "Rapid prototyping methodologies",
              ],
              detailedContent: [
                "Sketch rough ideas using wireframes",
                "Create interactive prototypes to test flows",
                "Add micro-interactions for smoother UX",
                "Map user flows with clear navigation paths",
                "Use paper and digital tools for quick iterations",
              ],
              toolsAndTechnologies: [
                {
                  name: "Figma",
                  icon: "https://img.icons8.com/color/500/figma.png",
                  alt: "Figma",
                },
                {
                  name: "Adobe XD",
                  icon: "https://img.icons8.com/ios-filled/150/adobe-logo.png",
                  alt: "Adobe XD",
                },
                {
                  name: "Sketch",
                  icon: "https://img.icons8.com/external-flatart-icons-solid-flatarticons/100/external-sketch-creative-skills-flatart-icons-solid-flatarticons.png",
                  alt: "Sketch",
                },
                {
                  name: "InVision",
                  icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-invision-is-the-digital-product-design-platform-logo-color-tal-revivo.png",
                  alt: "InVision",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-uiux",
                downloadCurriculum:
                  "https://example.com/download-curriculum-uiux",
              },
            },
            {
              title: "Design Tools Mastery",
              duration: "1 Month",
              content: [
                "Figma fundamentals and advanced features",
                "Adobe XD for UI/UX design",
                "Sketch for interface design",
                "InVision for prototyping and collaboration",
                "Design handoff and developer collaboration",
                "Version control and design file management",
              ],
              detailedContent: [
                "Master popular design tools like Figma and XD",
                "Collaborate with developers using InVision",
                "Understand version control for design files",
                "Use tool-specific plugins to speed up design work",
                "Deliver clean files for seamless handoff",
              ],
              toolsAndTechnologies: [
                {
                  name: "Figma",
                  icon: "https://img.icons8.com/color/500/figma.png",
                  alt: "Figma",
                },
                {
                  name: "Sketch",
                  icon: "https://img.icons8.com/external-flatart-icons-solid-flatarticons/100/external-sketch-creative-skills-flatart-icons-solid-flatarticons.png",
                  alt: "Sketch",
                },
                {
                  name: "InVision",
                  icon: "https://img.icons8.com/external-tal-revivo-color-tal-revivo/100/external-invision-is-the-digital-product-design-platform-logo-color-tal-revivo.png",
                  alt: "InVision",
                },
                {
                  name: "Adobe XD",
                  icon: "https://img.icons8.com/ios-filled/150/adobe-logo.png",
                  alt: "Adobe XD",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-uiux",
                downloadCurriculum:
                  "https://example.com/download-curriculum-uiux",
              },
            },
            {
              title: "Industry Projects & Portfolio (Advanced)",
              duration: "1 Month",
              content: [
                "End-to-end UX case study development",
                "Web application redesign challenge",
                "E-commerce platform UX optimization",
                "Portfolio creation and presentation skills",
                "Client communication and design critique",
              ],
              detailedContent: [
                "Apply skills in real-world UI/UX projects",
                "Redesign apps and websites to improve UX",
                "Develop a personal design portfolio",
                "Learn how to present and defend your design",
                "Improve client communication and feedback handling",
              ],
              toolsAndTechnologies: [
                {
                  name: "Notion",
                  icon: "https://img.icons8.com/glyph-neue/500/notion.png",
                  alt: "Notion",
                },
                {
                  name: "Trello",
                  icon: "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/100/external-trello-a-web-based-list-making-application-for-multi-platform-logo-shadow-tal-revivo.png",
                  alt: "Trello",
                },
                {
                  name: "Behance",
                  icon: "https://img.icons8.com/fluency/100/behance.png",
                  alt: "Behance",
                },
                {
                  name: "Portfolio Tools",
                  icon: "https://img.icons8.com/3d-fluency/100/resume-website.png",
                  alt: "Portfolio Tools",
                },
              ],
              actions: {
                startLearning: "https://example.com/start-learning-uiux",
                downloadCurriculum:
                  "https://example.com/download-curriculum-uiux",
              },
            },
          ],
        },
      ],
    },

    // Data for Certificate Component
    certificate: {
      courseTitle: "UI/UX Certificate",
      alt: "uiux-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "With the UI/UX Design Certification at Connecting Dots ERP, you will master the principles of user-centered design, from wireframing to usability testing.",
      description:
        "Gain practical experience in creating visually appealing and functional user interfaces, making you a strong candidate for roles in digital design and user experience.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for UI/UX training in {city}?",
      paragraphs: [
        "Connecting Dots ERP provides a detailed UI/UX Design course in {city}, crafted to align with the latest trends in digital design. The curriculum covers everything from user research and wireframing to prototyping and interface design, using industry-standard tools like Figma, Adobe XD, and Sketch. The UI/UX certification in {city} from Connecting Dots prepares students for the challenges of designing intuitive, user-centered digital experiences. This course ensures that you not only learn the theory behind design principles but also apply them in practical scenarios, creating compelling designs that meet user needs.",
        "At Connecting Dots ERP, the UI/UX Design classes in {city} emphasize hands-on learning through real-world projects. Experienced instructors, with over a decade of professional design expertise, guide students through each stage of the design process. The UI/UX Design course fees in {city} are designed to be affordable, making the course accessible to students with diverse financial backgrounds. In addition to structured lessons, students benefit from a creative environment, modern design labs, and personalized mentorship that foster growth and innovation in their design skills.",
        "Beyond technical expertise, the UI/UX Design course in {city} encourages collaboration and project-based learning. Students work on team-based design challenges, solving real-world problems and creating user-friendly interfaces. Whether you're aiming to become a UI/UX designer or plan to manage digital design projects, this course equips you with the skills and confidence to succeed in the competitive design industry. With strong career support, including portfolio reviews and interview preparation, students are well-prepared for job placements in top design and tech companies.",
      ],
      listItem1Header: "What makes our UI/UX training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering user research, wireframing, prototyping, and visual design",
        "Hands-on learning with industry-standard tools like Figma, Adobe XD, and Sketch",
        "Experienced instructors with over a decade of professional design expertise",
        "Affordable fees making the course accessible to students with diverse backgrounds",
        "Creative environment with modern design labs and personalized mentorship",
        "Strong career support including portfolio reviews and interview preparation",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Who should join the UI/UX design course in {city}?",
          answer:
            "This course is perfect for aspiring designers, web developers looking to add design skills, or anyone interested in pursuing a career in UI/UX design.",
        },
        {
          question: "What is the mode of training for the UI/UX design course?",
          answer:
            "We offer both online and in-person classes for the UI/UX design training in {city}, giving you the flexibility to learn at your own pace.",
        },
        {
          question:
            "What is the fee range for the UI/UX design course in {city}?",
          answer:
            "The UI/UX design course fees in {city} start from ₹40,000, with options for different certification levels and additional resources.",
        },
        {
          question:
            "Which positions can I apply for after completing the course?",
          answer:
            "After completing the UI/UX design certification in {city}, you can apply for roles like UI/UX Designer, Product Designer, and Interaction Designer in companies across various sectors.",
        },
        {
          question: "Which companies are hiring UI/UX designers?",
          answer:
            "Companies like Google, Microsoft, Infosys, and top design agencies are actively hiring skilled UI/UX designers to enhance their digital products.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "Chat GPT & AI",
          description: "Learn AI from scratch",
          icon: "https://i.imgur.com/QHuijGO.mp4",
          alt: "Chat GPT icon",
        },
        {
          name: "Masters in Data Science",
          description: "Become a data science expert",
          icon: "https://i.imgur.com/C0Hv62l.mp4",
          alt: "Data Science icon",
        },
        {
          name: "Masters in Data Analytics",
          description: "Master data analytics skills",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "Data Analytics icon",
        },
        {
          name: "Salesforce",
          description: "Salesforce developer courses",
          icon: "https://i.imgur.com/6brz8Ea.mp4",
          alt: "Salesforce icon",
        },
        {
          name: "Tableau",
          description: "Master data visualization",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Tableau icon",
        },
        {
          name: "Full-Stack Python",
          description: "Full-stack development with Python",
          icon: "https://i.imgur.com/grx2N9O.mp4",
          alt: "Full Stack Python icon",
        },
        {
          name: "Full-Stack Java",
          description: "Full-stack development with Java",
          icon: "https://i.imgur.com/SYHIAAO.mp4",
          alt: "Java icon",
        },
        {
          name: "PowerBI",
          description: "Business intelligence with PowerBI",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Power BI icon",
        },
        {
          name: "SQL",
          description: "Learn SQL from experts",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "SQL icon",
        },
        {
          name: "Reactjs Framework",
          description: "Learn Reactjs from Industry Experts",
          icon: "https://i.imgur.com/QxPxKeN.mp4",
          alt: "React icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.8, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 145, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-01-25T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-07T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  // DATA VISUALIZATION

  "data-visualization": {
    // === BASIC COURSE INFO ===
    title: "Data Visualization", // Used in: Page titles, headers, SEO
    fullTitle: "Data Visualization & Business Intelligence", // Used in: Page content, descriptions
    category: "analytics", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "data-visualization", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master Data Visualization in {city} with our comprehensive course. Learn Tableau, Power BI, advanced Excel, and data storytelling techniques. Our Data Visualization training in {city} offers hands-on experience with real datasets, industry-relevant curriculum, and 100% placement support to help you build a successful career as a Data Visualization Specialist or Business Intelligence Analyst.",
    metaTitle:
      "Data Visualization Course in {city} | Best Tableau & Power BI Training", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master Data Visualization in {city}. Expert-led training in Tableau, Power BI, Excel. Create compelling dashboards & reports. Certification & 100% placement support!",

    // === COURSE DETAILS ===
    duration: "3-5 months", // Used in: Course summary section, page content
    price: { min: 35000, max: 85000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Data Visualization Fundamentals",
      "Tableau Desktop & Server",
      "Power BI Development",
      "Advanced Excel & Pivot Tables",
      "Data Storytelling Techniques",
      "Dashboard Design Principles",
      "SQL for Data Visualization",
      "Interactive Reporting",
      "Business Intelligence Concepts",
    ],
    prerequisites: "Basic understanding of data and spreadsheet applications", // Used in: Course details
    certification: "Certified Data Visualization Specialist", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "Data Visualization Specialist",
      "Business Intelligence Analyst",
      "Data Analyst",
      "Reporting Analyst",
      "Dashboard Developer",
      "BI Developer",
      "Data Storyteller",
      "Analytics Consultant",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Data Visualization Course in {city}",
      subtitle:
        "Get Certified with the Data Visualization training institute in {city}",
      description:
        "We offers an advanced Data Visualization course in {city} designed to equip you with the essential skills to excel in the fast-evolving field of data analytics and visualization. Our detailed training program covers key modules such as data visualization techniques, tools like Tableau, Power BI, and advanced Excel, as well as best practices for creating compelling, insightful visualizations from complex datasets. By mastering these modules, you will be prepared to take on roles such as Data Visualization Specialist, Business Intelligence Analyst, or Data Analyst.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "Data Visualization Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why Data Visualisation Course in {city}?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">Data Visualisation?</span>',
          content:
            "Data Visualization is essential in today's data-driven world, helping organizations turn complex data into clear, actionable insights. If you're looking to build a career in this field, our Data Visualization course in {city} provides comprehensive training in key visualization tools like Tableau, Power BI, SQL, and advanced Excel. You'll learn to analyze and visualize data effectively, create interactive dashboards, and communicate findings that drive decision-making. With a focus on industry-relevant skills and hands-on practice, this Data Visualization training in {city} equips you with the knowledge to excel in the fast-growing field of data analytics and visualization, preparing you for roles in data analysis, business intelligence, and more.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">Data Analyst</span> do?',
          content:
            "A Data Analyst is responsible for collecting, processing, and analyzing data to help organizations make informed, data-driven decisions. Their role involves transforming raw data into actionable insights, identifying trends, and creating reports that support business strategies. Key responsibilities include data cleaning, statistical analysis, data visualization, and presenting findings in a clear and understandable format. By Learning these skills, data analysts play a critical role in shaping business decisions. If you're looking to start a career as a Data Analyst, our Data Visualization course in {city} at the top Data Visualization training institute in {city} will equip you with the necessary skills in data analysis, visualization tools like Tableau and Power BI, and techniques to turn data into compelling stories for business success.",
        },
        {
          title:
            'Why take the <span class="highlight-span-cards">Data Visualisation Training</span> in {city}?',
          content:
            "A Data Analyst must possess a diverse skill set to analyze, interpret, and visualize data effectively to support data-driven decisions. Our Data Visualization course in {city} offers advanced training in key data visualization tools and techniques, preparing you to transform complex data sets into clear, actionable insights. You will gain hands-on experience in tools like Tableau, Power BI, and advanced Excel, as well as in data cleaning, statistical analysis, and report creation. Upon completing the course, you will be qualified to take on roles such as:",
          listItems: [
            "Data Analyst",
            "Data Visualization Specialist",
            "Business Intelligence Analyst",
            "Data Scientist",
            "Reporting Analyst",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
    modulesData : {
  title: "DATA VISUALIZATION TRAINING CURRICULUM",
  globalActions: {
    startLearning: "https://example.com/start-learning-data-visualization",
    downloadCurriculum: "https://example.com/download-curriculum-data-visualization",
  },
  banner: {
    title: "Master Data Visualization Skills",
    subtitle: "From fundamentals to advanced tools — build a career in analytics and storytelling.",
    image: "https://res.cloudinary.com/dudu879kr/image/upload/v1755005000/DataVizBanner.avif",
    technologies: [
      "Data Visualization Fundamentals",
      "Excel & Advanced Analytics",
      "Introduction to BI Tools",
      "Tableau Mastery",
      "Data Storytelling",
      "Color Theory",
      "Interactive Dashboards",
    ],
  },
  tabs: [
    {
      type: "modules",
      duration: "5.5 Months",
      modules: [
        {
          title: "Data Visualization Fundamentals",
          duration: "1 Month",
          content: [
            "Introduction to data visualization concepts and principles",
            "Types of charts and when to use them",
          ],
          detailedContent: [
            "Exploring the purpose and impact of data visualization",
            "Selecting chart types for various business cases",
          ],
          toolsAndTechnologies: [
            { name: "Tableau", icon: "https://img.icons8.com/color/500/tableau-software.png", alt: "Tableau" },
            { name: "Power BI", icon: "https://img.icons8.com/color/500/power-bi.png", alt: "Power BI" },
            { name: "Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "Microsoft Excel" },
            { name: "Google Data Studio", icon: "https://img.icons8.com/color/500/google-data-studio.png", alt: "Google Data Studio" },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-data-visualization-fundamentals",
            downloadCurriculum: "https://example.com/download-curriculum-data-visualization-fundamentals",
          },
        },
        {
          title: "Excel & Advanced Analytics",
          duration: "1 Month",
          content: [
            "Advanced Excel functions and formulas",
            "Pivot tables and pivot charts mastery",
            "Data cleaning and preparation techniques",
            "Statistical analysis in Excel",
            "Creating interactive dashboards in Excel",
          ],
          detailedContent: [
            "Hands-on with Excel’s most powerful functions",
            "Building pivot-based reports for insights",
            "Cleaning and shaping raw data for analysis",
            "Applying statistical methods in Excel",
            "Designing dashboards for business reporting",
          ],
          toolsAndTechnologies: [
            { name: "Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "Microsoft Excel" },
            { name: "Power Query", icon: "https://img.icons8.com/color/500/microsoft-power-query.png", alt: "Power Query" },
            { name: "Tableau", icon: "https://img.icons8.com/color/500/tableau-software.png", alt: "Tableau" },
            { name: "R", icon: "https://img.icons8.com/external-soft-fill-juicy-fish/500/external-r-programming-languages-soft-fill-soft-fill-juicy-fish.png", alt: "R Programming" },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-excel-advanced-analytics",
            downloadCurriculum: "https://example.com/download-curriculum-excel-advanced-analytics",
          },
        },
        {
          title: "Introduction to BI Tools",
          duration: "1 Month",
          content: [
            "Overview of Business Intelligence landscape",
            "Introduction to Tableau Public",
            "Basic Power BI desktop functionality",
            "Connecting to data sources",
            "Creating simple visualizations",
          ],
          detailedContent: [
            "Understanding modern BI ecosystem",
            "Building visuals in Tableau Public",
            "Using Power BI for basic reporting",
            "Integrating various data sources",
            "Publishing and sharing BI reports",
          ],
          toolsAndTechnologies: [
            { name: "Tableau", icon: "https://img.icons8.com/color/500/tableau-software.png", alt: "Tableau" },
            { name: "Power BI", icon: "https://img.icons8.com/color/500/power-bi.png", alt: "Power BI" },
            { name: "Qlik Sense", icon: "https://img.icons8.com/color/500/qlik.png", alt: "Qlik Sense" },
            { name: "Looker", icon: "https://img.icons8.com/color/500/looker.png", alt: "Looker" },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-bi-tools",
            downloadCurriculum: "https://example.com/download-curriculum-bi-tools",
          },
        },
        {
          title: "Tableau Mastery",
          duration: "2 Months",
          content: [
            "Tableau Desktop advanced features and calculations",
            "Creating complex visualizations and dashboards",
            "Advanced analytics and forecasting in Tableau",
            "Custom SQL and data blending techniques",
            "Performance optimization and best practices",
          ],
          detailedContent: [
            "Advanced formulas and calculated fields in Tableau",
            "Designing interactive and dynamic dashboards",
            "Integrating predictive analytics in dashboards",
            "Combining multiple data sources using custom SQL",
            "Improving performance and scalability of Tableau reports",
          ],
          toolsAndTechnologies: [
            { name: "Tableau", icon: "https://img.icons8.com/color/500/tableau-software.png", alt: "Tableau" },
            { name: "Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "Microsoft Excel" },
            { name: "PostgreSQL", icon: "https://img.icons8.com/color/500/postgreesql.png", alt: "PostgreSQL" },
            { name: "R", icon: "https://img.icons8.com/external-soft-fill-juicy-fish/500/external-r-programming-languages-soft-fill-soft-fill-juicy-fish.png", alt: "R Programming" },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-tableau-mastery",
            downloadCurriculum: "https://example.com/download-curriculum-tableau-mastery",
          },
        },
        {
          title: "SQL for Analytics",
          duration: "0.5 Months",
          content: [
            "SQL fundamentals for data extraction",
            "Advanced SQL queries and joins",
            "Window functions and analytical queries",
            "Database optimization for reporting",
            "Integrating SQL with visualization tools",
          ],
          detailedContent: [
            "Querying databases for BI reporting",
            "Using joins and subqueries for insights",
            "Applying analytical SQL functions",
            "Optimizing queries for performance",
            "Connecting SQL outputs with BI platforms",
          ],
          toolsAndTechnologies: [
            { name: "MySQL", icon: "https://img.icons8.com/color/500/mysql-logo.png", alt: "MySQL" },
            { name: "PostgreSQL", icon: "https://img.icons8.com/color/500/postgreesql.png", alt: "PostgreSQL" },
            { name: "SQL Server", icon: "https://img.icons8.com/color/500/microsoft-sql-server.png", alt: "SQL Server" },
            { name: "BigQuery", icon: "https://img.icons8.com/color/500/google-bigquery.png", alt: "Google BigQuery" },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-sql-analytics",
            downloadCurriculum: "https://example.com/download-curriculum-sql-analytics",
          },
        },
      ],
    },
  ],
},


    // Data for Certificate Component
    certificate: {
      courseTitle: "Data Visualization Training Certificate",
      alt: "data-visualization-course-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "Learn advance about advance topics and industrial tools with the Certification of Data Visualization Course in {city}. It empowers you to transform complex data into clear, actionable insights. Our program blends theoretical concepts with hands-on training, focusing on popular tools like Tableau, Power BI, and Excel.",
      description:
        "With expert instructors and real-world applications, you'll gain the skills needed to create impactful visualizations and drive data-driven decision-making in any organization.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for Data Visualization Training in {city}?",
      paragraphs: [
        "Connecting Dots ERP offers a comprehensive Data Visualization course in {city} designed to equip you with the essential skills and knowledge to excel in the rapidly growing field of data analytics and visualization. Our industry-focused curriculum covers key modules, including data visualization tools like Tableau, Power BI, Excel, data analytics, and best practices for creating insightful, interactive visualizations.",
        "Expert Faculty: Our course is led by experienced data professionals who bring real-world expertise to the classroom. They provide personalized mentorship and guidance, ensuring you gain a deep understanding of data visualization concepts and techniques that drive business decisions.",
        "Hands-On Learning: We believe in learning by doing. Our Data Visualization course in {city} offers practical, hands-on experience through real-world projects, data analysis assignments, and case studies. You'll have the opportunity to apply your knowledge to transform raw data into compelling visual stories, enhancing your problem-solving and data presentation skills.",
        "Flexible Learning Options: Understanding that everyone has different learning styles and schedules, we offer flexible learning options, including both online and classroom-based training. This allows you to learn at your own pace and convenience, fitting your studies around your personal life.",
      ],
      listItem1Header:
        "What makes our Data Visualization training in {city} unique?",
      listItem1: [
        "Advanced Curriculum: Our course covers all essential aspects of data visualization, including Tableau, Power BI, Excel, and other visualization tools.",
        "Industry-Relevant Skills: You'll develop the skills and knowledge needed to succeed in today's competitive data analytics landscape.",
        "Certification and Recognition: Upon successful completion of the course, you'll receive a recognized certification that validates your data visualization expertise.",
        "Networking Opportunities: Connect with fellow students, industry professionals, and instructors through workshops, meetups, and tech talks.",
        "Job Placement Assistance: Our dedicated placement team works closely with top companies in the analytics and business intelligence sectors.",
        "Lifelong Learning: Our commitment to your success goes beyond the classroom with continuous learning opportunities.",
      ],
      listItemAfterIndex: 3, // Insert list after paragraph index 3
      paragraphsAfterList: [
        "Join Us and Unlock Your Potential: By enrolling in our Data Visualization course in {city}, you'll gain the confidence and skills needed to excel in your data analytics and visualization career. Whether you're a beginner or looking to enhance your skills, our course is tailored to help you succeed in this high-demand field.",
        "For more details, including Data Visualization course fees in {city}, upcoming batches, and course inquiries, contact us today and get started on your path to becoming a Data Visualization expert.",
      ],
      secondTitle:
        "What Will You Learn in the Data Visualization Training Program?",
      secondParagraphs: [
        "Data Visualization Course Overview: In our Data Visualization course in {city}, you will gain in-depth knowledge of key data visualization tools and techniques, including platforms like Tableau, Power BI, Excel, and other leading BI tools. This course will equip you with the skills to transform complex data into clear, actionable insights using interactive charts, dashboards, and reports.",
        "Data Visualization System Configuration and Customization: Gain hands-on experience with the Data Visualization training institute in {city}, where you will learn how to configure visualization systems to meet specific business requirements. You will explore different visualization tools, dashboards, and data connectors.",
        "Data Migration and Data Visualization Implementation: Understand the process of migrating data from legacy systems to modern data visualization platforms. Learn about data cleansing, transformation, and mapping techniques, along with strategies for managing successful data visualization implementations.",
        "Data Visualization Certification and Placement Support: Upon completion of the course, you will be ready to take on roles such as Data Analyst, Data Visualization Specialist, BI Analyst, or Data Reporting Specialist. As part of our Data Visualization course in {city} with placement support, we provide assistance in preparing for certification exams and offer job placement guidance.",
      ],
      highlights: [
        "Expert Faculty",
        "Hands-On Learning",
        "Flexible Learning Options",
        "Job Placement Assistance",
        "Advanced Curriculum",
        "Industry-Relevant Skills",
        "Certification and Recognition",
        "Networking Opportunities",
        "Lifelong Learning",
        "Data Visualization Course Overview",
      ],
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Why is data visualization important?",
          answer:
            "Data visualization is crucial because it transforms complex data sets into clear, actionable insights. It helps decision-makers quickly understand trends, patterns, and outliers. Our Data Visualization course in {city} equips you with the skills to effectively communicate data through visual tools, enhancing data-driven decision-making.",
        },
        {
          question: "What are some data visualization best practices?",
          answer:
            "Some best practices include choosing the right chart type, keeping visuals simple and focused, using colors effectively, and ensuring your visuals are accurate and easy to interpret. In our Data Visualization training institute in {city}, we teach these best practices to create meaningful and impactful data visuals.",
        },
        {
          question: "What is the best way to learn data visualization?",
          answer:
            "The best way to learn data visualization is through hands-on practice and learning from real-world data. Our Data Visualization course in {city} offers interactive learning, where you will work on projects and case studies to master tools like Tableau, Power BI, and more.",
        },
        {
          question: "Is data visualization hard to learn?",
          answer:
            "Data visualization can seem complex at first, but with the right guidance and practice, it becomes much easier. Our Data Visualization training institute in {city} provides step-by-step instruction and hands-on exercises to help you master the concepts and tools of data visualization.",
        },
        {
          question:
            "What is the difference between data analytics and data visualization?",
          answer:
            "Data analytics involves analyzing raw data to uncover trends and insights, while data visualization presents those insights in a visual format. Our Data Visualization course in {city} focuses on how to communicate the findings from data analytics through clear and impactful visualizations.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "Chat GPT & AI",
          description: "Learn AI from scratch",
          icon: "https://i.imgur.com/QHuijGO.mp4",
          alt: "Chat GPT icon",
        },
        {
          name: "Masters in Data Science",
          description: "Become a data science expert",
          icon: "https://i.imgur.com/C0Hv62l.mp4",
          alt: "Data Science icon",
        },
        {
          name: "Masters in Data Analytics",
          description: "Master data analytics skills",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "Data Analytics icon",
        },
        {
          name: "Salesforce",
          description: "Salesforce developer courses",
          icon: "https://i.imgur.com/6brz8Ea.mp4",
          alt: "Salesforce icon",
        },
        {
          name: "UI/UX Design",
          description: "Design stunning user interfaces",
          icon: "https://i.imgur.com/9FN2rSu.mp4",
          alt: "UI/UX icon",
        },
        {
          name: "Full-Stack Python",
          description: "Full-stack development with Python",
          icon: "https://i.imgur.com/grx2N9O.mp4",
          alt: "Full Stack Python icon",
        },
        {
          name: "Tableau",
          description: "Master data visualization with Tableau",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Tableau icon",
        },
        {
          name: "PowerBI",
          description: "Business intelligence with PowerBI",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Power BI icon",
        },
        {
          name: "SQL",
          description: "Learn SQL from experts",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "SQL icon",
        },
        {
          name: "Reactjs Framework",
          description: "Learn Reactjs from Industry Experts",
          icon: "https://i.imgur.com/QxPxKeN.mp4",
          alt: "React icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.7, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 128, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-02-05T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-08T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "power-bi": {
    // === BASIC COURSE INFO ===
    title: "Power BI", // Used in: Page titles, headers, SEO
    fullTitle: "Microsoft Power BI Business Intelligence", // Used in: Page content, descriptions
    category: "analytics", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "power-bi", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master Microsoft Power BI in {city} with our comprehensive course. Learn data modeling, DAX, Power Query, dashboard creation, and business intelligence. Our Power BI training in {city} offers hands-on experience with real datasets, industry-relevant curriculum, and 100% placement support to help you build a successful career as a Power BI Developer or Business Intelligence Analyst.",
    metaTitle:
      "Power BI Course in {city} | Best Power BI Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master Power BI in {city}. Expert-led training in DAX, Power Query, data modeling, dashboards. Certification, real projects & 100% placement. Launch your BI career now!",

    // === COURSE DETAILS ===
    duration: "2-4 months", // Used in: Course summary section, page content
    price: { min: 30000, max: 70000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Power BI Desktop Fundamentals",
      "Data Modeling & Relationships",
      "DAX (Data Analysis Expressions)",
      "Power Query & Data Transformation",
      "Interactive Dashboards & Reports",
      "Power BI Service & Collaboration",
      "Advanced Analytics & AI Features",
      "Data Gateway & Security",
      "Performance Optimization",
    ],
    prerequisites: "Basic understanding of data and Excel recommended", // Used in: Course details
    certification: "Microsoft Power BI Certified Professional", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "Power BI Developer",
      "Business Intelligence Analyst",
      "Data Analyst",
      "BI Consultant",
      "Data Visualization Specialist",
      "Business Analyst",
      "Reporting Analyst",
      "Data Engineer",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Power BI Course in {city}",
      subtitle: "Job Oriented Power BI Classes in {city}",
      description:
        "Power BI is a powerful tool designed to help businesses turn raw data into actionable insights. Whether you're a beginner or a seasoned professional, our Power BI course in {city} offers an in-depth understanding of the platform, enabling you to harness the full potential of your data. From interactive dashboards to real-time analytics, Power BI makes it easier to make informed decisions. Get started today and elevate your data skills through our advanced Power BI classes in {city}.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "Power BI Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why Power BI ?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">Power BI?</span>',
          content:
            "Power BI is Microsoft's business analytics tool that allows users to connect, transform, and visualize data in real time. It integrates with hundreds of data sources to deliver rich insights and provides tools for creating intuitive dashboards, reports, and interactive visuals. This platform is especially beneficial for businesses looking to make data-driven decisions quickly and effectively.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">Power BI Developer</span> do?',
          content:
            "A Power BI Developer is responsible for creating data models, developing dashboards, and generating reports that help businesses make data-driven decisions. They transform raw data into actionable insights using Power BI tools. By taking a Power BI course in {city}, you can acquire the skills needed to excel in this role and work on real-time projects.",
          listItems: [
            "Develop and maintain Power BI reports.",
            "Integrate Power BI with various data sources.",
            "Optimize and improve existing dashboards.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">Power BI</span> training?',
          content:
            "Taking Power BI training in {city} gives you a competitive edge in the job market. With the demand for data-driven decision-making rising, learning Power BI offers you the skills to analyze complex datasets and present them in a clear and actionable format. Whether you're looking to advance in your current role or switch careers, mastering Power BI is a valuable asset.",
          listItems: [
            "Power BI Developer",
            "Data Analyst",
            "Business Intelligence Consultant",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
    modulesData: {
  title: "POWER BI CURRICULUM",
  globalActions: {
    startLearning: "https://example.com/start-learning-power-bi",
    downloadCurriculum: "https://example.com/download-power-bi-curriculum",
  },
  banner: {
    title: "Master Business Intelligence and Data Analytics with Power BI",
    subtitle: "Learn to connect, model, visualize, and share data insights effectively using Power BI.",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
    technologies: [
      "Power BI Desktop",
      "Power Query",
      "DAX",
      "Power BI Service",
      "Data Modeling",
      "Dashboarding",
    ],
  },
  tabs: [
    {
      modules: [
        {
          title: "Introduction to Power BI",
          duration: "2 Weeks",
          content: [
            "Overview of Business Intelligence and Power BI ecosystem",
            "Power BI Desktop installation and interface navigation",
            "Understanding data sources and connectivity options",
            "Basic report creation and visualization types",
            "Introduction to Power BI Service and mobile apps",
            "Publishing and sharing reports basics",
          ],
          detailedContent: [
            "Understand the fundamentals of Business Intelligence and how Power BI fits in",
            "Learn to install Power BI Desktop and navigate its interface",
            "Explore different types of data sources and how to connect them",
            "Create basic reports and visualize data using built-in charts",
            "Get introduced to Power BI Service and mobile applications for report consumption",
            "Learn to publish reports and share them with stakeholders securely",
          ],
          toolsAndTechnologies: [
            {
              name: "Power BI Desktop",
              icon: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
              alt: "Power BI Desktop icon",
            },
            {
              name: "Microsoft Excel",
              icon: "https://img.icons8.com/color/48/000000/microsoft-excel-2019--v1.png",
              alt: "Excel logo",
            },
            {
              name: "Power BI Service",
              icon: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
              alt: "Power BI Service icon",
            },
            {
              name: "Mobile Apps",
              icon: "https://img.icons8.com/ios-filled/50/000000/smartphone-tablet.png",
              alt: "Mobile app icon",
            },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-power-bi-intro",
            downloadCurriculum: "https://example.com/download-power-bi-intro",
          },
        },
        {
          title: "Data Extraction & Connection",
          duration: "2 Weeks",
          content: [
            "Connecting to various data sources (Excel, SQL, Web, Cloud)",
            "Data import vs DirectQuery vs Live Connection",
            "Data source authentication and security",
            "Working with multiple data sources",
            "Data refresh and scheduling",
            "Troubleshooting connection issues",
          ],
          detailedContent: [
            "Learn how to connect Power BI to a wide range of data sources",
            "Understand differences between Import, DirectQuery, and Live Connection",
            "Manage data source credentials and secure access",
            "Work effectively with multiple combined data sources",
            "Set up data refresh schedules to keep reports up-to-date",
            "Troubleshoot common connection and refresh issues",
          ],
          toolsAndTechnologies: [
            {
              name: "Power BI Desktop",
              icon: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
              alt: "Power BI Desktop icon",
            },
            {
              name: "SQL Server",
              icon: "https://img.icons8.com/color/48/000000/sql.png",
              alt: "SQL Server icon",
            },
            {
              name: "Web APIs",
              icon: "https://img.icons8.com/ios-filled/50/000000/api.png",
              alt: "API icon",
            },
            {
              name: "Cloud Data Sources",
              icon: "https://img.icons8.com/fluency/48/000000/cloud.png",
              alt: "Cloud icon",
            },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-data-extraction-connection",
            downloadCurriculum: "https://example.com/download-data-extraction-connection",
          },
        },
        {
          title: "Power Query & Data Transformation",
          duration: "2 Weeks",
          content: [
            "Power Query Editor interface and functionality",
            "Data cleaning and transformation techniques",
            "Merging and appending queries",
            "Creating custom columns and conditional logic",
            "Data type conversions and formatting",
            "Query optimization and performance",
          ],
          detailedContent: [
            "Master Power Query Editor for transforming raw data",
            "Apply cleaning techniques like removing errors and duplicates",
            "Combine data through merging and appending queries",
            "Create custom columns using conditional logic and formulas",
            "Manage data types and formatting for analysis readiness",
            "Optimize queries to improve report performance",
          ],
          toolsAndTechnologies: [
            {
              name: "Power Query Editor",
              icon: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
              alt: "Power Query icon",
            },
            {
              name: "M Language",
              icon: "https://img.icons8.com/ios-filled/50/000000/code.png",
              alt: "M language icon",
            },
            {
              name: "Microsoft Excel",
              icon: "https://img.icons8.com/color/48/000000/microsoft-excel-2019--v1.png",
              alt: "Excel logo",
            },
            {
              name: "Power BI Desktop",
              icon: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
              alt: "Power BI Desktop icon",
            },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-power-query-transformation",
            downloadCurriculum: "https://example.com/download-power-query-transformation",
          },
        },
        {
          title: "Basic Visualizations & Reports",
          duration: "2 Weeks",
          content: [
            "Creating charts, tables, and matrices",
            "Formatting and customizing visualizations",
            "Using filters, slicers, and drill-through",
            "Report layout and design principles",
            "Adding images, text boxes, and shapes",
            "Basic interactivity and cross-filtering",
          ],
          detailedContent: [
            "Build charts like bar, column, and pie charts",
            "Customize visualizations with colors, labels, and tooltips",
            "Add slicers and filters for interactive reports",
            "Design reports with user-friendly layouts and themes",
            "Embed images and text for context and storytelling",
            "Enable interactivity with cross-filtering and drill-through",
          ],
          toolsAndTechnologies: [
            {
              name: "Power BI Desktop",
              icon: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
              alt: "Power BI Desktop icon",
            },
            {
              name: "Custom Visuals",
              icon: "https://img.icons8.com/ios-filled/50/000000/graph-report.png",
              alt: "Custom visuals icon",
            },
            {
              name: "Microsoft Excel",
              icon: "https://img.icons8.com/color/48/000000/microsoft-excel-2019--v1.png",
              alt: "Excel logo",
            },
            {
              name: "Power BI Service",
              icon: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
              alt: "Power BI Service icon",
            },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-basic-visualizations-reports",
            downloadCurriculum: "https://example.com/download-basic-visualizations-reports",
          },
        },
        {
          title: "Advanced Data Modeling",
          duration: "1 Month",
          content: [
            "Star schema and snowflake schema design",
            "Creating and managing relationships",
            "Calculated columns vs measures",
            "Row-level security implementation",
            "Hierarchies and drill-down functionality",
            "Data model optimization techniques",
          ],
          detailedContent: [
            "Design efficient star and snowflake schemas for BI models",
            "Create and maintain relationships between tables",
            "Understand when to use calculated columns versus measures",
            "Implement row-level security to restrict data access",
            "Build hierarchies to enable drill-down analysis",
            "Optimize data models for performance and scalability",
          ],
          toolsAndTechnologies: [
            {
              name: "Power BI Desktop",
              icon: "https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
              alt: "Power BI Desktop icon",
            },
            {
              name: "SQL Server",
              icon: "https://img.icons8.com/color/48/000000/sql.png",
              alt: "SQL Server icon",
            },
            {
              name: "DAX",
              icon: "https://img.icons8.com/color/48/000000/dax.png",
              alt: "DAX icon",
            },
            {
              name: "Azure Analysis Services",
              icon: "https://img.icons8.com/color/48/000000/azure.png",
              alt: "Azure icon",
            },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-advanced-data-modeling",
            downloadCurriculum: "https://example.com/download-advanced-data-modeling",
          },
        },
      ],
    },
  ],
},


    // Data for Certificate Component
    certificate: {
      courseTitle: "PowerBI Certificate",
      alt: "power-bi-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The Power BI Certification at Connecting Dots ERP trains you in Microsoft's leading business intelligence tool.",
      description:
        "Learn to create dynamic dashboards, perform data analysis, and share insights with stakeholders. This certification is perfect for professionals aiming to excel in business analytics and data visualization roles.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for Power BI training in {city}?",
      paragraphs: [
        "Connecting Dots ERP offers an advanced Power BI training course in {city}, designed to help individuals build strong data analytics and visualization skills. This course provides a well-structured curriculum covering essential topics such as data modeling, Power Query, DAX (Data Analysis Expressions), and creating insightful reports and dashboards. Whether you are new to data analytics or looking to upskill, the Power BI certification in {city} from Connecting Dots ERP ensures that you are ready to tackle real-world business intelligence challenges and stand out in the competitive job market.",
        "What makes Connecting Dots ERP's Power BI training unique is its focus on practical, hands-on learning. Students get to work on live projects and real datasets, which mirror the tasks performed by industry professionals. Our trainers, with years of experience in data analytics, provide personalized attention to ensure every participant gains the required expertise. Additionally, the Power BI training fees in {city} are designed to be affordable, and flexible payment plans are available, making the course accessible to a wide range of learners. The combination of modern facilities, collaborative peer learning, and expert mentorship creates the ideal learning environment for mastering Power BI.",
        "At Connecting Dot's Power BI classes in {city}, we emphasize experiential learning through case studies, group projects, and data visualization challenges. The program also includes 100% placement support, giving students the opportunity to secure top positions in leading organizations. Whether your goal is to become a business analyst, data analyst, or Power BI consultant, this Power BI course in {city} equips you with the tools and knowledge to excel in the rapidly growing field of data-driven decision-making.",
      ],
      listItem1Header: "What makes our Power BI training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering data modeling, Power Query, DAX, and dashboard creation",
        "Hands-on learning with live projects and real datasets from industry scenarios",
        "Experienced trainers with years of data analytics expertise providing personalized attention",
        "Affordable fees with flexible payment plans making the course accessible to all learners",
        "Modern facilities with collaborative peer learning and expert mentorship",
        "100% placement support helping students secure positions in leading organizations",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "What is the Future scope of a Power BI course in {city}?",
          answer:
            "The Power BI course in {city} offers immense scope as businesses increasingly rely on data-driven decisions. Learning Power BI equips you with essential skills in data visualization and analytics, making you highly employable in top industries.",
        },
        {
          question:
            "What are the job prospects after completing Power BI training in {city}?",
          answer:
            "Completing Power BI training in {city} opens up job roles like Data Analyst, Business Intelligence Developer, and Power BI Consultant. {city}'s thriving IT sector creates a strong demand for professionals with Power BI expertise.",
        },
        {
          question: "What are the average Power BI course fees in {city}?",
          answer:
            "The Power BI course fees in {city} typically range from INR 30,000 to INR 70,000, depending on the course duration and institute. It's essential to choose a program that offers hands-on projects and comprehensive training.",
        },
        {
          question: "Can I take Power BI classes in {city} online?",
          answer:
            "Yes, we offer online Power BI training in {city}, allowing you to learn at your own pace from anywhere. These online classes provide flexibility while maintaining the same quality as in-person courses.",
        },
        {
          question: "How long does it take to complete a Power BI course?",
          answer:
            "A Power BI course in {city} can be completed in 4 to 8 weeks, depending on the program structure. Fast-track and part-time options are available to suit various learning preferences.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "SQL",
          description: "Learn SQL from scratch",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "SQL icon",
        },
        {
          name: "Tableau",
          description: "Become a Tableau expert",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Tableau icon",
        },
        {
          name: "Masters in Data Analytics",
          description: "Master data analytics skills",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "Data Analytics icon",
        },
        {
          name: "Salesforce",
          description: "Salesforce developer courses",
          icon: "https://i.imgur.com/6brz8Ea.mp4",
          alt: "Salesforce icon",
        },
        {
          name: "UI/UX Design",
          description: "Design stunning user interfaces",
          icon: "https://i.imgur.com/9FN2rSu.mp4",
          alt: "UI/UX icon",
        },
        {
          name: "Full-Stack Python",
          description: "Full-stack development with Python",
          icon: "https://i.imgur.com/grx2N9O.mp4",
          alt: "Full Stack Python icon",
        },
        {
          name: "Master in Data Science",
          description: "Become a data science expert",
          icon: "https://i.imgur.com/G9Rp8vY.mp4",
          alt: "Data Science icon",
        },
        {
          name: "Chat GPT & AI",
          description: "Learn AI from scratch",
          icon: "https://i.imgur.com/QHuijGO.mp4",
          alt: "Chat GPT icon",
        },
        {
          name: "Mern Stack",
          description: "Learn Mern Stack from experts",
          icon: "https://i.imgur.com/qsfkvBs.mp4",
          alt: "Mern Stack icon",
        },
        {
          name: "Reactjs Framework",
          description: "Learn Reactjs from Industry Experts",
          icon: "https://i.imgur.com/QxPxKeN.mp4",
          alt: "React icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 98, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-02-20T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-09T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  sql: {
    // === BASIC COURSE INFO ===
    title: "SQL", // Used in: Page titles, headers, SEO
    fullTitle: "Structured Query Language Database Management", // Used in: Page content, descriptions
    category: "database", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "sql", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master SQL Database Management in {city} with our comprehensive course. Learn SQL queries, joins, database design, optimization, and data manipulation. Our SQL training in {city} offers hands-on experience with real databases, industry-relevant curriculum, and 100% placement support to help you build a successful career as a SQL Developer or Database Administrator.",
    metaTitle:
      "SQL Course in {city} | Best SQL Training & Database Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master SQL in {city}. Expert-led training in database queries, joins, optimization. Real database projects, certification & 100% placement. Launch your SQL career now!",

    // === COURSE DETAILS ===
    duration: "1.5-3 months", // Used in: Course summary section, page content
    price: { min: 20000, max: 50000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "SQL Fundamentals & Syntax",
      "Database Design & Normalization",
      "Advanced SQL Queries & Joins",
      "Stored Procedures & Functions",
      "Database Indexing & Optimization",
      "Data Manipulation & Transactions",
      "Triggers & Views",
      "Database Security & Administration",
      "Performance Tuning",
    ],
    prerequisites: "Basic computer knowledge and logical thinking ability", // Used in: Course details
    certification: "Certified SQL Database Professional", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "SQL Developer",
      "Database Administrator",
      "Data Analyst",
      "ETL Developer",
      "Database Designer",
      "Business Intelligence Developer",
      "Data Engineer",
      "Backend Developer",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "SQL Course in {city}",
      subtitle: "Practical Based Job Oriented SQL Classes in {city}",
      description:
        "Learn the fundamentals and advanced concepts of SQL with Connecting Dots ERP Training Institute's complete course. Whether you're a beginner looking to build a strong foundation or a professional aiming to enhance your database management skills, this course offers in-depth lessons on data querying, manipulation, and optimization techniques. Learn how to manage complex databases, create dynamic reports, and implement SQL in real-world applications.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "SQL Training Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why SQL ?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">SQL?</span>',
          content:
            "SQL (Structured Query Language) is a standardized programming language designed for managing and manipulating data within relational databases. It allows users to retrieve, insert, update, and delete data, making it essential for database management, reporting, and analytics in various applications. Join the SQL Course in {city} offered by Connecting Dots ERP Training Institute and gain expertise in database management.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">SQL Developer</span> do?',
          content:
            "A SQL Developer is responsible for designing, implementing, and maintaining databases to store and organize data efficiently. They write SQL queries to retrieve, manipulate, and manage data, ensuring its accuracy and security. SQL Developers also optimize database performance, troubleshoot issues, and work closely with other developers or analysts to support business applications. Their role is essential in managing the data backbone of applications and ensuring seamless data flow within an organization.",
          listItems: [
            "Write and optimize SQL queries.",
            "Manage and maintain database systems.",
            "Ensure data integrity and security.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">SQL</span> training?',
          content:
            "SQL training is essential for anyone looking to work with databases, as it equips you with the skills to query, manage, and manipulate data effectively. Whether you're in IT, data analysis, or business intelligence, mastering SQL enhances your ability to handle large datasets, create meaningful reports, and optimize database performance. It also boosts career opportunities, as SQL is a critical skill in many industries today.",
          listItems: [
            "Oracle SQL Developer",
            "ETL Developer",
            "SQL Server Developer",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
    modulesData: {
  title: "SQL CURRICULUM",
  globalActions: {
    startLearning: "https://example.com/start-learning-sql",
    downloadCurriculum: "https://example.com/download-sql-curriculum",
  },
  banner: {
    title: "Master SQL for Database Management and Data Analysis",
    subtitle: "Learn SQL from basics to advanced concepts to manage and query relational databases effectively.",
    image: "https://img.icons8.com/color/96/000000/sql.png",
    technologies: [
      "SQL",
      "RDBMS",
      "Data Querying",
      "Database Design",
      "Stored Procedures",
      "Database Administration",
    ],
  },
  tabs: [
    {
      modules: [
        {
          title: "SQL Fundamentals",
          duration: "2 Weeks",
          content: [
            "Introduction to databases and RDBMS concepts",
            "SQL syntax and basic commands (SELECT, INSERT, UPDATE, DELETE)",
            "Understanding data types and table structures",
            "Basic filtering with WHERE clause",
            "Sorting data with ORDER BY",
            "Working with NULL values and basic operators",
          ],
          detailedContent: [
            "Understand core database concepts and the relational model",
            "Learn essential SQL commands for data manipulation",
            "Explore different data types and how tables are structured",
            "Filter query results using WHERE clause effectively",
            "Sort query results using ORDER BY clause",
            "Handle NULL values and use basic SQL operators",
          ],
          toolsAndTechnologies: [
            {
              name: "MySQL",
              icon: "https://img.icons8.com/color/48/000000/mysql-logo.png",
              alt: "MySQL logo",
            },
            {
              name: "PostgreSQL",
              icon: "https://img.icons8.com/color/48/000000/postgreesql.png",
              alt: "PostgreSQL logo",
            },
            {
              name: "SQL Server",
              icon: "https://img.icons8.com/color/48/000000/sql.png",
              alt: "SQL Server logo",
            },
            {
              name: "DBeaver",
              icon: "https://img.icons8.com/ios-filled/50/000000/database.png",
              alt: "Database tool icon",
            },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-sql-fundamentals",
            downloadCurriculum: "https://example.com/download-sql-fundamentals",
          },
        },
        {
          title: "Data Retrieval & Filtering",
          duration: "2 Weeks",
          content: [
            "Advanced SELECT statements and aliases",
            "Pattern matching with LIKE and wildcards",
            "Working with date and time functions",
            "Aggregate functions (COUNT, SUM, AVG, MIN, MAX)",
            "GROUP BY and HAVING clauses",
            "DISTINCT and TOP/LIMIT clauses",
          ],
          detailedContent: [
            "Master advanced SELECT queries with column aliases",
            "Use LIKE and wildcards for flexible pattern matching",
            "Manipulate date and time values in SQL queries",
            "Apply aggregate functions to summarize data",
            "Group data and filter groups with GROUP BY and HAVING",
            "Use DISTINCT to remove duplicates and LIMIT to restrict results",
          ],
          toolsAndTechnologies: [
            {
              name: "MySQL",
              icon: "https://img.icons8.com/fluency/100/my-sql.png",
              alt: "MySQL logo",
            },
            {
              name: "SQL Server",
              icon: "https://img.icons8.com/color/48/microsoft-sql-server.png",
              alt: "SQL Server logo",
            },
            {
              name: "PgAdmin",
              icon: "https://img.icons8.com/clouds/100/administrator-male.png",
              alt: "PgAdmin icon",
            },
            {
              name: "Azure Data Studio",
              icon: "https://img.icons8.com/color/48/azure-1.png",
              alt: "Azure Data Studio icon",
            },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-data-retrieval-filtering",
            downloadCurriculum: "https://example.com/download-data-retrieval-filtering",
          },
        },
        {
          title: "Basic Joins & Relationships",
          duration: "2 Weeks",
          content: [
            "Understanding table relationships and foreign keys",
            "INNER JOIN and its applications",
            "LEFT JOIN and RIGHT JOIN",
            "FULL OUTER JOIN concepts",
            "Self-joins and cross joins",
            "Basic subqueries and nested queries",
          ],
          detailedContent: [
            "Learn how tables relate via foreign keys",
            "Use INNER JOIN to combine matching rows",
            "Apply LEFT JOIN and RIGHT JOIN for partial matches",
            "Understand FULL OUTER JOIN for complete datasets",
            "Explore self-joins and cross joins",
            "Write subqueries and nested queries for complex filtering",
          ],
          toolsAndTechnologies: [
            {
              name: "MySQL",
              icon: "https://img.icons8.com/color/48/000000/mysql-logo.png",
              alt: "MySQL logo",
            },
            {
              name: "PostgreSQL",
              icon: "https://img.icons8.com/color/48/000000/postgreesql.png",
              alt: "PostgreSQL logo",
            },
            {
              name: "SQL Server",
              icon: "https://img.icons8.com/color/48/000000/sql.png",
              alt: "SQL Server logo",
            },
            {
              name: "DataGrip",
              icon: "https://img.icons8.com/color/48/000000/database.png",
              alt: "DataGrip icon",
            },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-basic-joins-relationships",
            downloadCurriculum: "https://example.com/download-basic-joins-relationships",
          },
        },
        {
          title: "Advanced SQL Queries",
          duration: "1 Month",
          content: [
            "Complex subqueries and correlated subqueries",
            "Common Table Expressions (CTEs)",
            "Window functions and analytical queries",
            "CASE statements and conditional logic",
            "UNION, INTERSECT, and EXCEPT operations",
            "Advanced string and mathematical functions",
          ],
          detailedContent: [
            "Write and optimize complex and correlated subqueries",
            "Use CTEs to organize complex queries",
            "Apply window functions for advanced analytics",
            "Use CASE statements for conditional logic within queries",
            "Combine result sets with UNION, INTERSECT, and EXCEPT",
            "Leverage advanced string and math functions",
          ],
          toolsAndTechnologies: [
            {
              name: "PostgreSQL",
              icon: "https://img.icons8.com/color/48/000000/postgreesql.png",
              alt: "PostgreSQL logo",
            },
            {
              name: "SQL Server",
              icon: "https://img.icons8.com/color/48/000000/sql.png",
              alt: "SQL Server logo",
            },
            {
              name: "Oracle SQL",
              icon: "https://img.icons8.com/color/48/000000/oracle-logo.png",
              alt: "Oracle logo",
            },
            {
              name: "DBeaver",
              icon: "https://img.icons8.com/ios-filled/50/000000/database.png",
              alt: "Database tool icon",
            },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-advanced-sql-queries",
            downloadCurriculum: "https://example.com/download-advanced-sql-queries",
          },
        },
        {
          title: "Database Design & Optimization",
          duration: "1 Month",
          content: [
            "Database normalization and denormalization",
            "Creating and managing indexes",
            "Query optimization techniques",
            "Execution plans and performance analysis",
            "Database constraints and data integrity",
            "Partitioning and sharding concepts",
          ],
          detailedContent: [
            "Understand normalization forms and apply denormalization when needed",
            "Create indexes to improve query performance",
            "Learn query optimization best practices",
            "Analyze execution plans to find bottlenecks",
            "Implement database constraints for integrity",
            "Explore partitioning and sharding for scalability",
          ],
          toolsAndTechnologies: [
            {
              name: "SQL Server",
              icon: "https://img.icons8.com/color/48/000000/sql.png",
              alt: "SQL Server logo",
            },
            {
              name: "MySQL",
              icon: "https://img.icons8.com/color/48/000000/mysql-logo.png",
              alt: "MySQL logo",
            },
            {
              name: "PostgreSQL",
              icon: "https://img.icons8.com/color/48/000000/postgreesql.png",
              alt: "PostgreSQL logo",
            },
            {
              name: "Oracle SQL",
              icon: "https://img.icons8.com/color/48/000000/oracle-logo.png",
              alt: "Oracle logo",
            },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-database-design-optimization",
            downloadCurriculum: "https://example.com/download-database-design-optimization",
          },
        },
      ],
    },
  ],
},


    // Data for Certificate Component
    certificate: {
      courseTitle: "SQL Certificate",
      alt: "sql-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "At Connecting Dots ERP the SQL Certification covers the fundamentals of database management and querying.",
      description:
        "Gain expertise in SQL commands, data manipulation, and optimization techniques. This certification will prepare you for database management roles, ensuring you can efficiently manage and retrieve data.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for SQL training in {city}?",
      paragraphs: [
        "Connecting Dots ERP offers an advanced SQL training course in {city}, tailored to meet the needs of professionals looking to master database management and manipulation. This course covers fundamental to advanced concepts such as SQL queries, joins, subqueries, indexing, and database design, ensuring a deep understanding of how to work with relational databases. The SQL certification in {city} from Connecting Dots ERP provides the skills needed to manage, retrieve, and analyze large datasets, making it an essential tool for data-driven professionals.",
        "What makes the SQL training at Connecting Dots ERP unique is the focus on practical learning. Students work on live databases and real-world scenarios, applying SQL techniques to solve business problems. Our expert trainers, with extensive experience in database management and data analysis, offer personalized guidance throughout the course. The SQL training fees in {city} are competitively priced, with flexible payment options available to accommodate a diverse range of learners. The modern infrastructure, peer-to-peer learning, and project-based approach make it an ideal place for mastering SQL.",
        "At Connecting Dot's SQL classes in {city}, hands-on practice is at the core of the learning experience. Students are engaged in practical projects, SQL coding challenges, and database management tasks that prepare them for real-world job scenarios. The SQL course with 100% placement support, helping participants secure roles as database administrators, SQL developers, or data analysts. This SQL course equips you with the skills needed to excel in the evolving field of database management and analytics.",
      ],
      listItem1Header: "What makes our SQL training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering fundamental to advanced SQL concepts and database design",
        "Hands-on learning with live databases and real-world business scenarios",
        "Expert trainers with extensive experience in database management and data analysis",
        "Competitively priced fees with flexible payment options for diverse learners",
        "Modern infrastructure with peer-to-peer learning and project-based approach",
        "100% placement support helping secure roles as database administrators and SQL developers",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "What is the duration and SQL course fees in {city}?",
          answer:
            "The SQL course typically spans 4–6 weeks, depending on the depth of the syllabus. The SQL course fees in {city} vary based on the institute and course format, but at Connecting Dots ERP Training Institute, we offer competitive pricing with flexible payment options.",
        },
        {
          question: "Do you offer online SQL training in {city}?",
          answer:
            "Yes, we provide comprehensive online SQL training in {city} to accommodate students who prefer flexible learning schedules. Our online classes are interactive and include live projects to ensure hands-on experience.",
        },
        {
          question:
            "Is SQL certification in {city} helpful for job placements?",
          answer:
            "Absolutely! Earning an SQL certification in {city} significantly boosts your job prospects. It demonstrates your expertise in SQL, which is essential for roles like Data Analyst, Database Administrator, and Software Developer.",
        },
        {
          question:
            "What are the prerequisites for joining SQL classes in {city}?",
          answer:
            "There are no strict prerequisites for joining our SQL classes in {city}. However, a basic understanding of computers and databases is beneficial. Our course is designed to take students from beginner to advanced levels.",
        },
        {
          question: "What topics are covered in the SQL training in {city}?",
          answer:
            "Our SQL training in {city} covers essential topics such as SQL basics, data retrieval, joins, indexing, query optimization, and stored procedures. These skills are critical for handling real-world database challenges.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "Power BI",
          description: "Learn Power BI from scratch",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Power BI icon",
        },
        {
          name: "Tableau",
          description: "Become a Tableau expert",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Tableau icon",
        },
        {
          name: "Masters in Data Analytics",
          description: "Master data analytics skills",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "Data Analytics icon",
        },
        {
          name: "Salesforce",
          description: "Salesforce developer courses",
          icon: "https://i.imgur.com/6brz8Ea.mp4",
          alt: "Salesforce icon",
        },
        {
          name: "UI/UX Design",
          description: "Design stunning user interfaces",
          icon: "https://i.imgur.com/9FN2rSu.mp4",
          alt: "UI/UX icon",
        },
        {
          name: "Full-Stack Python",
          description: "Full-stack development with Python",
          icon: "https://i.imgur.com/grx2N9O.mp4",
          alt: "Full Stack Python icon",
        },
        {
          name: "Master in Data Science",
          description: "Become a data science expert",
          icon: "https://i.imgur.com/G9Rp8vY.mp4",
          alt: "Data Science icon",
        },
        {
          name: "Chat GPT & AI",
          description: "Learn AI from scratch",
          icon: "https://i.imgur.com/QHuijGO.mp4",
          alt: "Chat GPT icon",
        },
        {
          name: "Mern Stack",
          description: "Learn Mern Stack from experts",
          icon: "https://i.imgur.com/qsfkvBs.mp4",
          alt: "Mern Stack icon",
        },
        {
          name: "Reactjs Framework",
          description: "Learn Reactjs from Industry Experts",
          icon: "https://i.imgur.com/QxPxKeN.mp4",
          alt: "React icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.5, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 156, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-03-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-10T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  tableau: {
    // === BASIC COURSE INFO ===
    title: "Tableau", // Used in: Page titles, headers, SEO
    fullTitle: "Tableau Data Visualization & Business Intelligence", // Used in: Page content, descriptions
    category: "analytics", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "tableau", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master Tableau Data Visualization in {city} with our comprehensive course. Learn dashboard creation, data connections, advanced calculations, and storytelling with data. Our Tableau training in {city} offers hands-on experience with real datasets, industry-relevant curriculum, and 100% placement support to help you build a successful career as a Tableau Developer or Business Intelligence Analyst.",
    metaTitle:
      "Tableau Course in {city} | Best Tableau Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master Tableau in {city}. Expert-led training in data visualization, dashboards, analytics. Real projects, certification & 100% placement. Launch your Tableau career now!",

    // === COURSE DETAILS ===
    duration: "2-4 months", // Used in: Course summary section, page content
    price: { min: 35000, max: 85000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Tableau Desktop Fundamentals",
      "Data Connections & Preparation",
      "Advanced Visualizations & Charts",
      "Dashboard Design & Interactivity",
      "Calculated Fields & Parameters",
      "Data Blending & Relationships",
      "Tableau Server & Publishing",
      "Advanced Analytics & Forecasting",
      "Performance Optimization",
    ],
    prerequisites: "Basic understanding of data and spreadsheet applications", // Used in: Course details
    certification: "Tableau Desktop Certified Professional", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "Tableau Developer",
      "Data Visualization Specialist",
      "Business Intelligence Analyst",
      "Data Analyst",
      "BI Developer",
      "Analytics Consultant",
      "Reporting Analyst",
      "Data Storyteller",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Tableau Training in {city}",
      subtitle:
        "100% Practical Based Job Oriented Best Tableau Course in {city}",
      description:
        "Tableau is one of the most powerful data visualization tools, offering businesses and individuals the ability to analyze data in dynamic, interactive ways. Whether you're looking to enhance your skills with a Tableau certification Training in {city}, take a Tableau course, or explore Tableau tutorials, we provide everything you need to master the art of data storytelling.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "Tableau Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why Tableau ?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">Tableau?</span>',
          content:
            "Tableau is a leading business intelligence platform that allows users to connect, visualize, and share data seamlessly. Its drag-and-drop interface empowers even non-technical users to create complex data visualizations, transforming raw data into actionable insights. Tableau supports a wide range of data sources, from spreadsheets to cloud services, making it an essential tool for data-driven decision-making. Whether you're diving into Tableau software tutorials or seeking hands-on experience through a Tableau course, this platform offers something for everyone.",
        },
        {
          title:
            'What does a <span class="highlight-span-cards">Tableau Developer</span> do?',
          content:
            "A Tableau Developer is responsible for designing, developing, and maintaining Tableau dashboards and reports. They work closely with business stakeholders to understand their data visualization needs and transform raw data into actionable insights.",
          listItems: [
            "Create and manage Tableau dashboards.",
            "Collaborate with business teams to gather requirements.",
            "Ensure data accuracy and consistency in reports.",
          ],
        },
        {
          title:
            'Why take <span class="highlight-span-cards">Tableau</span> training?',
          content:
            "With the growing demand for data analytics across industries, learning Tableau is a smart career move. Whether you're a business professional, data analyst, or aspiring developer, a Tableau certification can set you apart in the job market. Tableau training in {city} offers hands-on experience with real-world data sets, providing an immersive learning environment that prepares you for a variety of business challenges. Enrolling in a Tableau course in {city} or engaging with interactive Tableau software tutorials ensures you stay competitive in a rapidly evolving industry. Plus, a Tableau developer certification proves your ability to turn data into meaningful insights, increasing your professional value.",
          listItems: [
            "Tableau Developer",
            "Data Analyst",
            "Business Intelligence Analyst",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
 modulesData: {
  title: "TABLEAU BUSINESS ANALYTICS CURRICULUM",
  globalActions: {
    startLearning: "https://example.com/start-learning-tableau-business-analytics",
    downloadCurriculum: "https://example.com/download-curriculum-tableau-business-analytics",
  },
  banner: {
    title: "Master Data Visualization and Analytics with Tableau",
    subtitle: "From beginner to advanced Tableau skills to drive impactful business insights.",
    image: "https://res.cloudinary.com/dudu879kr/image/upload/v1752485069/TableauBanner.webp",
    technologies: [
      "Tableau",
      "Data Visualization",
      "Business Intelligence",
      "Data Analytics",
      "Dashboarding",
      "Advanced Analytics",
    ],
  },
  tabs: [
    {
      modules: [
        {
          title: "Tableau Desktop Fundamentals",
          duration: "2 Weeks",
          content: [
            "Introduction to Tableau and data visualization concepts",
            "Tableau interface navigation and workspace setup",
            "Connecting to various data sources (Excel, CSV, databases)",
            "Basic chart types and visualization creation",
            "Understanding dimensions and measures",
            "Sorting, filtering, and grouping data",
          ],
          detailedContent: [
            "Understand Tableau basics and interface",
            "Learn to connect Tableau to multiple data sources",
            "Create simple visualizations like bar charts and pie charts",
            "Gain foundational skills for data analysis using Tableau",
            "Explore dimension vs measure concepts for effective data slicing",
            "Apply sorting, filtering, and grouping techniques to refine views",
          ],
          toolsAndTechnologies: [
            {
              name: "Tableau Desktop",
              icon: "https://img.icons8.com/color/500/tableau-software.png",
              alt: "Tableau Desktop logo",
            },
            {
              name: "Microsoft Excel",
              icon: "https://img.icons8.com/color/48/000000/microsoft-excel-2019--v1.png",
              alt: "Excel logo",
            },
            {
              name: "CSV Files",
              icon: "https://img.icons8.com/ios-filled/50/000000/csv.png",
              alt: "CSV file icon",
            },
            {
              name: "Databases",
              icon: "https://img.icons8.com/color/48/000000/database.png",
              alt: "Database icon",
            },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-tableau-desktop-fundamentals",
            downloadCurriculum: "https://example.com/download-tableau-desktop-fundamentals",
          },
        },
        {
          title: "Data Connections & Preparation",
          duration: "2 Weeks",
          content: [
            "Advanced data source connections and management",
            "Data interpreter and pivot functionality",
            "Data cleaning and preparation techniques",
            "Working with multiple data sources",
            "Understanding live connections vs extracts",
            "Data refresh and scheduling basics",
          ],
          detailedContent: [
            "Master connecting Tableau to diverse and complex data sources",
            "Use Tableau Data Interpreter and pivot features to prep data",
            "Apply best practices for cleaning and preparing data in Tableau",
            "Blend and join multiple data sources effectively",
            "Understand when to use live connections or extract data sources",
            "Learn basics of data refresh schedules for up-to-date reporting",
          ],
          toolsAndTechnologies: [
            {
              name: "Tableau Prep",
              icon: "https://img.icons8.com/color/500/tableau-software.png",
              alt: "Tableau Prep logo",
            },
            {
              name: "SQL",
              icon: "https://img.icons8.com/color/48/000000/sql.png",
              alt: "SQL logo",
            },
            {
              name: "Microsoft Excel",
              icon: "https://img.icons8.com/color/48/000000/microsoft-excel-2019--v1.png",
              alt: "Excel logo",
            },
            {
              name: "CSV Files",
              icon: "https://img.icons8.com/ios-filled/50/000000/csv.png",
              alt: "CSV file icon",
            },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-data-connections-preparation",
            downloadCurriculum: "https://example.com/download-data-connections-preparation",
          },
        },
        {
          title: "Basic Visualizations & Charts",
          duration: "2 Weeks",
          content: [
            "Creating bar charts, line graphs, and scatter plots",
            "Pie charts, treemaps, and heat maps",
            "Geographic mapping and spatial analysis",
            "Text tables and crosstabs",
            "Formatting and customizing visualizations",
            "Show Me feature and chart recommendations",
          ],
          detailedContent: [
            "Learn to create core visualization types in Tableau",
            "Use maps for geographic and spatial data analysis",
            "Design and format dashboards with effective visuals",
            "Utilize Show Me to quickly explore chart options",
            "Understand best practices for chart selection and formatting",
            "Create advanced tables and crosstabs for detailed analysis",
          ],
          toolsAndTechnologies: [
            {
              name: "Tableau Desktop",
              icon: "https://img.icons8.com/color/500/tableau-software.png",
              alt: "Tableau Desktop logo",
            },
            {
              name: "Mapbox",
              icon: "https://img.icons8.com/ios-filled/50/000000/map.png",
              alt: "Map icon",
            },
            {
              name: "Microsoft Excel",
              icon: "https://img.icons8.com/color/48/000000/microsoft-excel-2019--v1.png",
              alt: "Excel logo",
            },
            {
              name: "CSV Files",
              icon: "https://img.icons8.com/ios-filled/50/000000/csv.png",
              alt: "CSV file icon",
            },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-basic-visualizations-charts",
            downloadCurriculum: "https://example.com/download-basic-visualizations-charts",
          },
        },
        {
          title: "Dashboard Basics & Sharing",
          duration: "2 Weeks",
          content: [
            "Creating basic dashboards and layouts",
            "Adding interactivity with filters and actions",
            "Dashboard formatting and design principles",
            "Publishing to Tableau Public",
            "Exporting and sharing visualizations",
            "Basic storytelling with data",
          ],
          detailedContent: [
            "Build dashboards combining multiple visualizations",
            "Add interactivity like filters and highlight actions",
            "Design dashboards with clean formatting and UX focus",
            "Publish dashboards on Tableau Public for sharing",
            "Learn export options for sharing outside Tableau",
            "Tell data stories effectively through dashboards",
          ],
          toolsAndTechnologies: [
            {
              name: "Tableau Public",
              icon: "https://img.icons8.com/fluency/100/public.png",
              alt: "Tableau Public logo",
            },
            {
              name: "Microsoft PowerPoint",
              icon: "https://img.icons8.com/color/48/000000/microsoft-powerpoint-2019--v1.png",
              alt: "PowerPoint logo",
            },
            {
              name: "PDF",
              icon: "https://img.icons8.com/ios-filled/50/000000/pdf.png",
              alt: "PDF icon",
            },
            {
              name: "Microsoft Excel",
              icon: "https://img.icons8.com/color/48/000000/microsoft-excel-2019--v1.png",
              alt: "Excel logo",
            },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-dashboard-basics-sharing",
            downloadCurriculum: "https://example.com/download-dashboard-basics-sharing",
          },
        },
        {
          title: "Advanced Calculations & Analytics",
          duration: "1 Month",
          content: [
            "Calculated fields and advanced formulas",
            "Table calculations and quick table calculations",
            "Level of Detail (LOD) expressions",
            "Parameters and dynamic calculations",
            "Statistical functions and trend analysis",
            "Forecasting and predictive analytics",
          ],
          detailedContent: [
            "Master complex calculated fields and formulas",
            "Use table calculations for advanced data manipulations",
            "Understand and implement LOD expressions",
            "Create dynamic dashboards with parameters",
            "Apply statistical analysis and trends to data",
            "Explore forecasting techniques in Tableau",
          ],
          toolsAndTechnologies: [
            {
              name: "Tableau Desktop",
              icon: "https://img.icons8.com/color/500/tableau-software.png",
              alt: "Tableau Desktop logo",
            },
            {
              name: "R",
              icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755329127/R_Programming_rfp5gs.webp",
              alt: "R logo",
            },
            {
              name: "Python",
              icon: "https://img.icons8.com/color/48/000000/python.png",
              alt: "Python logo"
            },
            {
              name: "Alteryx",
              icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755328950/alteryx_final_qokpep.webp",
              alt: "Alteryx logo",
            },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-advanced-calculations-analytics",
            downloadCurriculum: "https://example.com/download-advanced-calculations-analytics",
          },
        },
      ],
    },
  ],
},


    // Data for Certificate Component
    certificate: {
      courseTitle: "Tableau Certificate",
      alt: "tableau-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The Tableau Certification at Connecting Dots ERP offers in-depth training in data visualization and dashboard creation.",
      description:
        "You'll learn to present complex data insights through interactive visuals, making it easier for businesses to make informed decisions. This certification prepares you for roles in data analysis and business intelligence.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for Tableau training in {city}?",
      paragraphs: [
        "Connecting Dots ERP offers an advanced Tableau training in {city}, designed to cater to the increasing demand for data visualization and business intelligence skills. The course covers a advance syllabus, focusing on both theoretical foundations and practical applications of Tableau, making it an ideal choice for professionals and students alike. With modules ranging from data connections, data blending, and complex calculations to creating interactive dashboards, this Tableau training ensures participants are equipped with industry-relevant expertise. The Tableau certification in {city} from Connecting Dots ERP is recognized by top companies, helping you advance your career in data analytics and visualization.",
        "What sets Connecting Dots ERP apart is its commitment to hands-on learning. Throughout the course, students work on live projects and real-world data analysis tasks that replicate industry scenarios. Our expert trainers, who have vast experience in data visualization and analytics, provide personalized guidance to ensure every student grasps the essential skills. The Tableau training fees in {city} are structured to be affordable, with flexible payment options available for eligible students, making it easier to access high-quality education. The modern infrastructure, collaborative environment, and expert guidance create the perfect space for mastering Tableau.",
        "At Connecting Dot's Tableau classes in {city}, we emphasize experiential learning through group projects, case studies, and data challenges. The Tableau course in {city} with 100% placement support, helping students secure roles in top organizations. Whether you're aiming to become a data analyst or a Tableau consultant, this course equips you with the knowledge and skills needed to excel in the fast-growing field of data visualization",
      ],
      listItem1Header: "What makes our Tableau training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering data connections, blending, calculations, and interactive dashboards",
        "Hands-on learning with live projects and real-world data analysis tasks",
        "Expert trainers with vast experience in data visualization and analytics",
        "Affordable fees with flexible payment options for eligible students",
        "Modern infrastructure with collaborative environment and expert guidance",
        "100% placement support helping students secure roles in top organizations",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question:
            "How long does it take to learn Tableau With Connecting Dots ERP?",
          answer:
            "Learning Tableau with Connecting Dots ERP typically takes 4-6 weeks for beginners to grasp the basics. For more advanced learners pursuing Tableau developer certification, it may take 2-3 months to gain in-depth skills and proficiency. The timeline depends on the complexity of the course and your learning pace.",
        },
        {
          question: "What is the cost of Tableau courses?",
          answer:
            "The cost of Tableau courses varies depending on the provider and course level. At most training institutes, including Connecting Dots ERP Training Institute, prices typically range from 50,000 to 85,000 depending on the depth of the course, whether it includes Tableau certification and the duration of the training. Discounts or bundled packages for Tableau developer certifications may also be available.",
        },
        {
          question:
            "What career opportunities are available after completing a Tableau course in {city}?",
          answer:
            "After completing a Tableau course in {city}, career opportunities include roles such as Tableau Developer, Data Analyst, Business Intelligence Analyst, and Data Visualization Specialist. These positions are in high demand across industries like IT, finance, healthcare, and e-commerce. {city}'s growing tech ecosystem makes it an ideal location for Tableau professionals to find job opportunities in both startups and established companies. Additionally, earning a Tableau certification in {city} can lead to career growth and higher salary prospects in the field of data analytics.",
        },
        {
          question:
            "Do I need prior experience in data analytics to enroll in a Tableau course?",
          answer:
            "No, prior experience in data analytics is not required to enroll in a Tableau course. Our beginner-level Tableau courses at Connecting Dots ERP Training Institute are designed to accommodate learners of all backgrounds. You'll start with the basics, and our interactive lessons and Tableau tutorials will guide you through the entire learning process. Whether you're a complete novice or looking to enhance existing skills, our courses will help you succeed.",
        },
        {
          question: "Can I learn the Tableau Course online?",
          answer:
            "Yes, you can learn the Tableau course online. Connecting Dots ERP Training Institute, offer flexible online Tableau courses that include interactive lessons, live sessions, and self-paced Tableau Training. This allows you to learn Tableau from anywhere, at your own convenience, while gaining the skills needed to master data visualization and analytics.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "Power BI",
          description: "Learn Power BI from scratch",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Power BI icon",
        },
        {
          name: "SQL",
          description: "Become a SQL expert",
          icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1753958140/sql_wonstk.webp",
          alt: "SQL icon",
        },
        {
          name: "Masters in Data Analytics",
          description: "Master data analytics skills",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "Data Analytics icon",
        },
        {
          name: "Salesforce",
          description: "Salesforce developer courses",
          icon: "https://i.imgur.com/6brz8Ea.mp4",
          alt: "Salesforce icon",
        },
        {
          name: "UI/UX Design",
          description: "Design stunning user interfaces",
          icon: "https://i.imgur.com/9FN2rSu.mp4",
          alt: "UI/UX icon",
        },
        {
          name: "Full-Stack Python",
          description: "Full-stack development with Python",
          icon: "https://i.imgur.com/grx2N9O.mp4",
          alt: "Full Stack Python icon",
        },
        {
          name: "Master in Data Science",
          description: "Become a data science expert",
          icon: "https://i.imgur.com/G9Rp8vY.mp4",
          alt: "Data Science icon",
        },
        {
          name: "Chat GPT & AI",
          description: "Learn AI from scratch",
          icon: "https://i.imgur.com/QHuijGO.mp4",
          alt: "Chat GPT icon",
        },
        {
          name: "Mern Stack",
          description: "Learn Mern Stack from experts",
          icon: "https://i.imgur.com/qsfkvBs.mp4",
          alt: "Mern Stack icon",
        },
        {
          name: "Reactjs Framework",
          description: "Learn Reactjs from Industry Experts",
          icon: "https://i.imgur.com/QxPxKeN.mp4",
          alt: "React icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.8, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 134, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-02-25T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-11T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  // DIGITAL MARKETING

  "digital-marketing": {
    // === BASIC COURSE INFO ===
    title: "Digital Marketing", // Used in: Page titles, headers, SEO
    fullTitle: "Digital Marketing & Online Advertising", // Used in: Page content, descriptions
    category: "marketing", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "digital-marketing", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master Digital Marketing in {city} with our comprehensive course. Learn SEO, PPC, social media marketing, content creation, email marketing, and analytics. Our Digital Marketing training in {city} offers hands-on experience with real campaigns, industry-relevant curriculum, and 100% placement support to help you build a successful career in digital marketing.",
    metaTitle:
      "Digital Marketing Course in {city} | Best Digital Marketing Training", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master Digital Marketing in {city}. Expert-led training in SEO, PPC, social media, analytics. Real campaigns, certification & 100% placement. Launch your marketing career now!",

    // === COURSE DETAILS ===
    duration: "3-6 months", // Used in: Course summary section, page content
    price: { min: 35000, max: 75000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Search Engine Optimization (SEO)",
      "Pay-Per-Click (PPC) Advertising",
      "Social Media Marketing",
      "Content Marketing & Creation",
      "Email Marketing",
      "Google Analytics & Web Analytics",
      "Conversion Rate Optimization",
      "Digital Marketing Strategy",
      "Mobile Marketing",
    ],
    prerequisites:
      "Basic computer knowledge and understanding of internet usage", // Used in: Course details
    certification: "Certified Digital Marketing Professional", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "Digital Marketing Specialist",
      "SEO Specialist",
      "PPC Specialist",
      "Social Media Manager",
      "Content Marketing Manager",
      "Digital Marketing Manager",
      "Email Marketing Specialist",
      "Digital Marketing Analyst",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Digital Marketing Course in {city}",
      subtitle: "Become a digital marketing Expert with our Advance Course",
      description:
        "Take the first step towards a thriving career with our Digital Marketing Course in {city}. Designed for beginners and professionals alike, this course covers everything you need to become a digital marketing expert. From becoming an expert in Pay-Per-Click (PPC) strategies to learning advanced SEO techniques, social media marketing, and cutting-edge analytical training, our program ensures you gain practical skills to excel in the digital world.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        {
          text: "Request Call back",
          courseName: "Digital Marketing Training Program",
        },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why Digital Marketing?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">Digital Marketing</span>?',
          content:
            "Our Digital Marketing Course in {city} provides the perfect opportunity to build expertise in this thriving domain. The training covers advanced SEO, social media marketing, PPC strategies, and tools like Google Analytics to track performance. Designed for beginners and professionals alike, this course emphasizes practical learning with real-world projects and case studies. By enrolling in our Digital Marketing Training in {city}, you'll gain the knowledge and skills needed to excel in the competitive digital landscape, unlocking career opportunities in diverse industries.",
        },
        {
          title:
            'What do <span class="highlight-span-cards">Digital Marketers</span> Do?',
          content:
            "Digital marketers play a vital role in promoting businesses online by using tools and strategies like SEO, PPC advertising, social media marketing, and content creation. They design campaigns to engage target audiences, drive traffic, and boost brand visibility across digital platforms. By analyzing data and optimizing campaigns, digital marketers ensure businesses achieve measurable results in today's competitive online environment. Enrolling in a Digital Marketing Course in {city} can help you master these skills and build a strong foundation for a successful career.",
        },
        {
          title:
            'Why should you take <span class="highlight-span-cards">Digital Marketing</span> Training?',
          content:
            "Taking Digital Marketing Training in {city} is essential for anyone looking to excel in the fast-growing field of online marketing. With businesses increasingly shifting to digital platforms, having expertise in areas like SEO, social media marketing, PPC, and analytics opens up vast career opportunities. The training equips you with practical skills to create impactful marketing campaigns, analyze performance metrics, and adapt strategies to meet industry demands. It's an excellent choice for beginners and professionals seeking to enhance their knowledge and stay competitive in today's job market.",
        },
      ],
    },

    // Data for SapModComponent (course-specific syllabus)
    sapMod: {
  title2: "<span class=\"highlight-span-cards\">Digital Marketing</span> Syllabus",
  description: "Industry aligned Digital Marketing syllabus with certification",
  summary: "An exhaustive Syllabus designed by our industry experts which will help you to get placed in your dream IT company",
  noteMaster: "We provide advanced Digital Marketing training",
  features: [
    { label: "10+", description: "Tools" }
  ],
  overview: {
    title: "Syllabus Overview",
    modules: [
      {
        name: "Digital Marketing Overview",
        subtopics: [
          "Introduction to Digital Marketing Ecosystem",
          "Understanding Online Consumer Behaviour",
          "Channels of Digital Marketing",
          "Traditional vs Digital Marketing",
          "Key Metrics & KPIs in Digital Marketing",
          "Digital Campaign Planning Process",
          "Latest Trends & Industry Insights",
          "Career Opportunities in Digital Marketing"
        ]
      },
      {
        name: "AI in Digital Marketing",
        subtopics: [
          "AI-powered Content Creation Tools",
          "Chatbots & Customer Interaction",
          "Predictive Analytics for Campaigns",
          "Personalization with Machine Learning",
          "AI-driven Ad Targeting",
          "Voice Search Optimization",
          "Image & Video Recognition Applications",
          "Future of AI in Marketing"
        ]
      },
      {
        name: "Blog Creation",
        subtopics: [
          "Choosing a Blogging Platform",
          "Setting up a Blog Website",
          "Keyword Research for Blogs",
          "Writing SEO-friendly Blog Posts",
          "Optimizing Blog Layout & Design",
          "Internal & External Linking Strategies",
          "Promoting Blogs on Social Media",
          "Tracking Blog Performance with Analytics"
        ]
      },
      {
        name: "Business Website Creation",
        subtopics: [
          "Introduction to Website Builders & CMS",
          "Domain & Hosting Setup",
          "Designing a Professional Layout",
          "Adding Business Information & Pages",
          "Integrating Contact Forms & Chat Widgets",
          "Basic SEO Setup for Business Websites",
          "Mobile Optimization Techniques",
          "Website Security Essentials"
        ]
      },
      {
        name: "E-Commerce Creation",
        subtopics: [
          "E-Commerce Business Models",
          "Setting up an Online Store",
          "Product Listing & Categorization",
          "Payment Gateway Integration",
          "Shipping & Inventory Management",
          "Creating Promotions & Discounts",
          "Customer Review & Feedback Systems",
          "E-Commerce SEO & Analytics"
        ]
      },
      {
        name: "Graphic Creation",
        subtopics: [
          "Introduction to Graphic Design Principles",
          "Using Canva & Photoshop Basics",
          "Creating Social Media Graphics",
          "Designing Banners & Posters",
          "Typography & Color Theory",
          "Branding Elements in Graphics",
          "Image Optimization for Web",
          "Trends in Visual Content"
        ]
      },
      {
        name: "Video Creation",
        subtopics: [
          "Basics of Video Production",
          "Scriptwriting for Videos",
          "Shooting Techniques & Lighting",
          "Editing Videos with Tools (Premiere Pro, CapCut)",
          "Adding Music & Voiceovers",
          "Creating Animated Explainers",
          "Video SEO & Thumbnail Design",
          "Publishing & Promoting Videos"
        ]
      },
      {
        name: "Reels Mastery Program",
        subtopics: [
          "Understanding Instagram & Facebook Reels",
          "Trending Reels Content Ideas",
          "Editing Reels on Mobile",
          "Using Effects, Filters & Transitions",
          "Reel SEO & Hashtag Strategy",
          "Collaborations & Cross-Promotion",
          "Analyzing Reel Insights",
          "Monetizing Short-form Video Content"
        ]
      },
      {
        name: "Search Engine Fundamentals",
        subtopics: [
          "How Search Engines Work",
          "Understanding SERP Features",
          "Keyword Research Techniques",
          "On-page SEO Fundamentals",
          "Off-page SEO Strategies",
          "Technical SEO Basics",
          "SEO Tools Overview",
          "Measuring SEO Performance"
        ]
      }
    ]
  },
  videoUrl: "https://i.imgur.com/8wkvVyH.mp4",
  downloadLink: "https://drive.google.com/uc?export=download&id=1H5Wuu3AwsOanOgl5JFIOmC2vR555F2he"
},

    // Data for Certificate Component
    certificate: {
      courseTitle: "Digital Marketing Certificate",
      alt: "digital-marketing-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The Digital Marketing Certification at Connecting Dots ERP equips you with the essential skills to excel in the dynamic world of online marketing. Learn to create impactful campaigns, analyze performance metrics, and master strategies across platforms like SEO, social media, and email marketing.",
      description:
        "This certification prepares you for a amazing career in digital marketing, where creativity meets data-driven decision-making to achieve business goals effectively.",
    },

    // Data for Description Component (multiple sections)
    descriptionContent: {
      // Main description section (pageId="digimdesc")
      main: {
        title:
          "Why Choose Connecting Dots ERP for Digital Marketing Training in {city}?",
        paragraphs: [
          "Connecting Dots ERP offers a Digital Marketing Course in {city} with Placement designed to equip you with the essential skills to excel in today's competitive digital marketing landscape. Our industry-relevant curriculum includes advanced modules such as SEO, Pay-Per-Click (PPC) advertising, social media marketing, content creation, email marketing, and analytics. This advanced course prepares you to become a digital marketing expert capable of driving impactful online campaigns and delivering measurable results for businesses.",
          "Expert Faculty: Our training is led by experienced digital marketing professionals who bring hands-on expertise to the classroom. They offer personalized mentorship to help you master strategies and tools that align with current industry standards, ensuring you stay ahead in the field.",
          "Hands-On Learning: At Connecting Dots ERP, we emphasize practical knowledge. Our Digital Marketing Course in {city} provides hands-on experience through live projects, case studies, and campaign simulations. You'll gain the confidence to implement what you learn and create data-driven strategies to boost brand visibility and engagement.",
          "Flexible Learning Options: We understand the importance of flexibility, which is why we offer both online and classroom-based training options. Learn at your own pace while benefiting from a structured curriculum tailored to your career goals.",
          "Job Placement Assistance: Our dedicated placement team works closely with leading companies to help you secure the best opportunities in digital marketing. From resume-building workshops to mock interviews and career counseling, we provide end-to-end support. With our Digital Marketing Course in {city} with Placement, we ensure that you're not just learning but also prepared to land your dream job.",
          "Key Benefits of Our Digital Marketing Course:",
          "Comprehensive Curriculum: Covering SEO, PPC, social media marketing, and analytics, our course ensures you develop expertise in all key areas of digital marketing.",
          "Industry-Relevant Skills: Learn to create effective campaigns, analyze data, and implement strategies that deliver results.",
          "Recognized Certification: Upon course completion, receive a certification that validates your skills and boosts your resume.",
          "Networking Opportunities: Connect with industry experts, instructors, and peers to build valuable professional relationships.",
          "Continuous Learning: Gain access to advanced workshops and industry updates, ensuring you stay at the forefront of digital marketing trends.",
          "Enroll Today and Accelerate Your Career: Take the first step toward a successful career in digital marketing. Join our Digital Marketing Training in {city} to gain the skills, confidence, and placement support needed to excel in this fast-growing industry. Contact us now for more details about fees, upcoming batches, and enrollment options.",
        ],
        highlights: [
          "Expert Faculty:",
          "Hands-On Learning:",
          "Flexible Learning Options:",
          "Job Placement Assistance:",
          "Key Benefits of Our Digital Marketing Course:",
          "Comprehensive Curriculum:",
          "Industry-Relevant Skills:",
          "Recognized Certification:",
          "Networking Opportunities:",
          "Continuous Learning:",
          "Enroll Today and Accelerate Your Career:",
        ],
      },

      // PPC Section (pageId="digim", sectionIndex=0)
      ppc: {
        title: "Pay Per Click (PPC) Training in {city}",
        paragraphs: [
          "What is Pay Per Click (PPC) Advertising?",
          "Pay Per Click (PPC) is a digital advertising model where advertisers pay a fee each time their ad is clicked. It is one of the most effective methods for driving targeted traffic to websites and achieving quick, measurable results. PPC advertising platforms like Google Ads, Bing Ads, and social media ads allow businesses to reach a highly specific audience by targeting keywords, demographics, and interests. By taking a PPC Training in {city}, you'll gain in-depth knowledge of these platforms and learn how to craft successful ad campaigns, optimize them for better ROI, and stay competitive in the digital landscape.",
          "What will you learn in PPC Training?",
          "PPC Overview: In our PPC Training in {city}, you will learn the fundamentals and advanced techniques of running successful pay-per-click campaigns. You'll get hands-on experience with Google Ads, Bing Ads, Facebook Ads, and other PPC platforms. The training covers keyword research, ad creation, bidding strategies, campaign tracking, and performance analysis. You will also explore conversion rate optimization and landing page best practices to ensure your ads are not only visible but also effective in generating leads and sales.",
          "Advanced PPC Strategies: The course also focuses on advanced strategies such as remarketing, video ads, and display network advertising. You'll learn how to manage and optimize large-scale campaigns, perform A/B testing, and analyze detailed metrics to improve campaign performance. With specialized modules on Google Analytics, bid management tools, and automated bidding strategies, you'll gain the skills needed to deliver high-performing PPC campaigns. Our Pay Per Click Training in {city} with Placement ensures you're ready for high-demand PPC roles in digital marketing agencies and organizations.",
          "Throughout the PPC Course Training in {city}, you'll gain hands-on experience in setting up, managing, and optimizing PPC campaigns. Our expert trainers will teach you advanced techniques such as keyword research, ad copy creation, bid management, and performance analysis. You'll also learn how to use various PPC tools and analytics to monitor and improve your campaigns continuously, ensuring you stay ahead of the competition.",
          "An advanced PPC Training in {city} opens the door to a wide variety of career opportunities in digital marketing. PPC specialists are in high demand as businesses seek to grow their online presence and drive immediate results. Here are some of the career opportunities you can pursue after completing the PPC training:",
        ],
        listItem1: [
          "Google Ads Specialist",
          "PPC Specialist",
          "Paid Media Manager",
          "SEM Specialist",
          "Digital Marketing Analyst",
        ],
        listItemAfterIndex: 5, // Insert list after paragraph index 5
        highlights: [
          "What is Pay Per Click (PPC) Advertising?",
          "What will you learn in PPC Training?",
          "Advanced PPC Strategies",
          "PPC Overview",
        ],
        videoUrl: "https://i.imgur.com/ICUTx4r.mp4",
      },

      // SEO Section (pageId="digim2", sectionIndex=1)
      seo: {
        title: "Search Engine Optimization (SEO) Training in {city}",
        paragraphs: [
          "What is Search Engine Optimization (SEO)?",
          "Search Engine Optimization (SEO) is the process of optimizing a website to rank higher in search engine results pages (SERPs) to increase organic traffic. SEO focuses on strategies and techniques that improve a website's visibility, relevance, and authority. By understanding both on-page and off-page SEO, you can help websites gain visibility, drive qualified traffic, and enhance user experience. Through SEO Training in {city}, you will learn how search engines work, how to conduct keyword research, optimize web pages, and implement strategies to improve site rankings and overall online presence.",
          "What will you learn in SEO Training?",
          "SEO Overview: In our SEO Training in {city}, you will be equipped with a comprehensive understanding of both fundamental and advanced SEO techniques. You'll learn how to perform keyword research, optimize website content, improve page load speeds, and create SEO-friendly URLs. The training also covers optimizing images, internal linking strategies, and schema markup to enhance your website's performance on search engines. Additionally, you will understand how to use SEO tools like Google Analytics, Google Search Console, and SEMrush to track website performance, fix errors, and implement effective strategies.",
          "Advanced SEO Strategies: Our course dives into advanced SEO strategies, including link building, local SEO, mobile SEO, and voice search optimization. You'll gain expertise in technical SEO, which focuses on improving the website's structure, speed, and code to enhance crawlability and indexability by search engines. Learn how to implement structured data, optimize for featured snippets, and leverage SEO analytics to measure the effectiveness of your campaigns. The course also teaches how to create and implement SEO strategies for e-commerce websites, ensuring you understand the nuances of different website types.",
          "SEO Tools and Analytics: Learn how to use powerful SEO tools and analytics platforms such as Ahrefs, Moz, and Google Analytics to conduct in-depth website audits, monitor keyword rankings, and analyze competitor strategies. This hands-on experience will allow you to effectively track and measure the success of your SEO campaigns and optimize your content and website accordingly.",
          "What are the Career Opportunities After SEO Training?",
          "An SEO Training in {city} opens a wide range of career opportunities in the fast-growing field of digital marketing. SEO professionals are always in demand, as businesses across industries need skilled individuals to improve their online visibility. Here are some of the key career paths you can pursue after completing SEO training:",
        ],
        listItem1: [
          "SEO Specialist",
          "SEO Manager",
          "Content Strategist",
          "Digital Marketing Specialist",
          "SEO Analyst",
        ],
        listItemAfterIndex: 5, // Insert list after paragraph index 5
        highlights: [
          "What is Search Engine Optimization (SEO)?",
          "What will you learn in SEO Training?",
          "SEO Overview:",
          "Advanced SEO Strategies:",
          "SEO Tools and Analytics:",
          "What are the Career Opportunities After SEO Training?",
        ],
        videoUrl: "https://i.imgur.com/UZ1C9Pz.mp4",
      },

      // Social Media Marketing Section (pageId="digim3", sectionIndex=0)
      smm: {
        title: "Social Media Marketing Course in {city}",
        paragraphs: [
          "What is Social Media Marketing (SMM)?",
          "Social Media Marketing (SMM) involves using social media platforms like Facebook, Instagram, Twitter, LinkedIn, and others to promote products, services, or brands. It is a powerful way to connect with your audience, build brand awareness, and drive traffic to your website. SMM includes strategies for content creation, paid advertising, community management, and engagement. By enrolling in our Social Media Marketing Training in {city}, you will learn how to harness the full potential of social media platforms to achieve business goals and increase customer interaction.",
          "What will you learn in SMM Training?",
          "SMM Overview: In our Social Media Marketing Training in {city}, you will gain a deep understanding of the principles of social media marketing and its role in a business's overall marketing strategy. You'll learn how to create compelling social media content, schedule posts, and engage with followers. The training will also cover paid social media advertising, such as Facebook Ads and Instagram Ads, where you'll learn how to target specific demographics, set a budget, and create effective ad campaigns.",
          "Advanced SMM Strategies: Our advanced SMM course dives into more sophisticated strategies, such as influencer marketing, social media analytics, and leveraging trends to boost engagement. You will learn how to build a community, manage brand reputation, and use platforms like LinkedIn for B2B marketing. Additionally, we cover advanced techniques for running successful campaigns on YouTube, Twitter, and other platforms, utilizing both organic and paid strategies to drive measurable results.",
          "Content Creation and Engagement: Content is the backbone of any social media strategy, and in this course, you will learn how to create shareable, engaging, and relevant content for various platforms. Learn how to use images, videos, infographics, and stories to capture your audience's attention. You will also understand how to respond to customer queries, create polls, and engage with followers to increase loyalty and foster community-building.",
          "SMM Analytics and Reporting: Learn how to track, analyze, and interpret social media metrics to measure campaign success and ROI. The training will teach you how to use tools like Google Analytics, Facebook Insights, and Twitter Analytics to evaluate the performance of posts, ads, and campaigns. You'll understand the importance of metrics like reach, engagement rate, click-through rate (CTR), and conversion rate to fine-tune your strategy for optimal results.",
          "What are the Career Opportunities After SMM Training?",
          "Social Media Marketing skills are highly in demand as businesses are increasingly focusing on social media to connect with their target audience. After completing Social Media Marketing Training in {city}, you can pursue several career opportunities in digital marketing. Here are some of the key roles you can explore:",
        ],
        listItem1: [
          "Social Media Manager",
          "Social Media Strategist",
          "Social Media Analyst",
          "Content Marketing Specialist",
          "Community Manager",
          "Paid Media Specialist (Facebook Ads, Instagram Ads, etc.)",
        ],
        listItemAfterIndex: 6, // Insert list after paragraph index 6
        videoUrl: "https://i.imgur.com/1V8vE5B.mp4",
      },

      // Analytics Section (pageId="digim4", sectionIndex=1)
      analytics: {
        title: "Advanced Google Analytics Training in {city}",
        paragraphs: [
          "What is Advanced Google Analytics?",
          "Advanced Google Analytics refers to the application of sophisticated tools, techniques, and methodologies to analyze and interpret complex data sets. It goes beyond basic descriptive analytics to include predictive and prescriptive analytics, machine learning, and artificial intelligence (AI). By using Advanced Google Analytics, businesses can uncover hidden patterns, predict future trends, and make data-driven decisions that improve overall performance. In our Advanced Google Analytics Training in {city}, you will learn how to apply these advanced techniques to solve real-world business problems and drive growth.",
          "What Will You Learn in Advanced Google Analytics Training?",
          "Advanced Google Analytics Overview: In our Advanced Google Analytics Training in {city}, you will gain a comprehensive understanding of the tools and techniques used in advanced data analysis. You'll learn how to work with large datasets, use statistical methods for analysis, and apply machine learning algorithms for predictive insights. The course also covers essential programming languages like Python and R, as well as data visualization tools like Tableau and Power BI, to communicate insights effectively.",
          "Predictive Analytics and Modeling: One of the key components of Advanced Google Analytics is predictive analytics, where you will learn how to use statistical models and algorithms to forecast future outcomes. Through hands-on projects, you will apply techniques like regression analysis, decision trees, and time series forecasting to make accurate predictions. You'll also explore the concept of machine learning, using algorithms to build predictive models that can adapt and improve over time.",
          "Data Mining and Big Data Analytics: In this course, you'll explore data mining techniques that allow you to extract valuable insights from large volumes of structured and unstructured data. You'll gain proficiency in using tools like Hadoop and Spark to process big data, enabling you to analyze data at scale and gain insights from sources such as social media, web logs, and sensor data.",
          "Text Analytics and Sentiment Analysis: Another key area covered is text analytics, where you will learn how to analyze and extract insights from textual data. You'll study sentiment analysis to understand customer opinions and feedback from sources like social media posts, reviews, and surveys. This module will help you uncover actionable insights to improve customer experience and business strategies.",
          "Data Visualization and Reporting: Advanced Google Analytics isn't just about analyzing data; it's also about presenting it in a way that's easy to understand. You'll learn how to visualize complex data using advanced tools like Tableau and Power BI to create dashboards, reports, and visualizations that tell a compelling story and facilitate decision-making.",
          "What Are the Career Opportunities After Advanced Google Analytics Training?",
          "The skills gained in Advanced Google Analytics Training in {city} are in high demand across a variety of industries. With organizations increasingly relying on data to make informed decisions, there are numerous career opportunities for professionals with expertise in Advanced Google Analytics. After completing this course, you can pursue several high-demand roles, including:",
        ],
        listItem1: [
          "Data Scientist",
          "Data Analyst",
          "Business Intelligence Analyst",
          "Machine Learning Engineer",
          "Predictive Analytics Specialist",
          "Big Data Analyst",
          "Quantitative Analyst",
        ],
        listItemAfterIndex: 7, // Insert list after paragraph index 7
        videoUrl: "https://i.imgur.com/G9Rp8vY.mp4",
      },
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "How Can I Join Digital Marketing Courses in {city}?",
          answer:
            "To join a Digital Marketing Course in {city}, simply contact the institute for the admission process. You'll be guided through the application, and the course will equip you with the latest digital marketing skills to succeed in the industry.",
        },
        {
          question:
            "What Is the Duration of the Digital Marketing Course in {city}?",
          answer:
            "The Digital Marketing Course in {city} typically lasts 3 to 6 months, depending on whether you opt for the regular or fast-track program. The duration may vary based on your learning pace and the course modules included.",
        },
        {
          question: "What If I Miss a Class in the Digital Marketing Course?",
          answer:
            "If you miss a class in the Digital Marketing Course in {city}, the institute generally provides recorded sessions or makeup classes, ensuring you don't miss out on any important content.",
        },
        {
          question:
            "Do You Provide 100% Job Placement After Digital Marketing Training in {city}?",
          answer:
            "Yes, most Digital Marketing Training Institutes in {city} offer placement assistance to help you secure a job after course completion. They have tie-ups with leading companies and provide career guidance and interview preparation.",
        },
        {
          question:
            "What Is the Average Salary Package After Completing a Digital Marketing Course in {city}?",
          answer:
            "The average salary package after completing a Digital Marketing Course in {city} typically ranges from ₹3 to ₹6 lakh per annum, depending on your skills, experience, and the specific role in digital marketing.",
        },
      ],
    },

    // Data for CoursesRelated Component
    relatedCourses: {
      title: "Related courses",
      items: [
        {
          name: "Power BI",
          description: "Learn Power BI from scratch",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Power BI icon",
        },
        {
          name: "Tableau",
          description: "Become a Tableau expert",
          icon: "https://i.imgur.com/WE4y4wK.mp4",
          alt: "Tableau icon",
        },
        {
          name: "Masters in Data Analytics",
          description: "Master data analytics skills",
          icon: "https://i.imgur.com/y0zkEYb.mp4",
          alt: "Data Analytics icon",
        },
        {
          name: "Salesforce",
          description: "Salesforce developer courses",
          icon: "https://i.imgur.com/6brz8Ea.mp4",
          alt: "Salesforce icon",
        },
        {
          name: "UI/UX Design",
          description: "Design stunning user interfaces",
          icon: "https://i.imgur.com/9FN2rSu.mp4",
          alt: "UI/UX icon",
        },
        {
          name: "Full-Stack Python",
          description: "Full-stack development with Python",
          icon: "https://i.imgur.com/grx2N9O.mp4",
          alt: "Full Stack Python icon",
        },
        {
          name: "Master in Data Science",
          description: "Become a data science expert",
          icon: "https://i.imgur.com/G9Rp8vY.mp4",
          alt: "Data Science icon",
        },
        {
          name: "Chat GPT & AI",
          description: "Learn AI from scratch",
          icon: "https://i.imgur.com/QHuijGO.mp4",
          alt: "Chat GPT icon",
        },
        {
          name: "Mern Stack",
          description: "Learn Mern Stack from experts",
          icon: "https://i.imgur.com/qsfkvBs.mp4",
          alt: "Mern Stack icon",
        },
        {
          name: "Reactjs Framework",
          description: "Learn Reactjs from Industry Experts",
          icon: "https://i.imgur.com/QxPxKeN.mp4",
          alt: "React icon",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.8, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 156, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-05-01T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-15T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  // HR COURSES

  "hr-training": {
    // === BASIC COURSE INFO ===
    title: "HR Training", // Used in: Page titles, headers, SEO
    fullTitle: "Human Resources Management Training", // Used in: Page content, descriptions
    category: "hr", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "hr-training", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master Human Resources Management in {city} with our comprehensive course. Learn recruitment, performance management, payroll, employee relations, and HR analytics. Our HR training in {city} offers hands-on experience with real HR scenarios, industry-relevant curriculum, and 100% placement support to help you build a successful career as an HR Professional.",
    metaTitle:
      "HR Training Course in {city} | Best HR Management Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master HR Management in {city}. Expert-led training in recruitment, payroll, performance management. Real projects, certification & 100% placement. Launch your HR career now!",

    // === COURSE DETAILS ===
    duration: "3-6 months", // Used in: Course summary section, page content
    price: { min: 40000, max: 90000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Recruitment & Selection",
      "Performance Management",
      "Compensation & Benefits",
      "Employee Relations",
      "HR Analytics & Reporting",
      "Payroll Management",
      "Training & Development",
      "Labor Law & Compliance",
      "Organizational Behavior",
    ],
    prerequisites:
      "Basic understanding of business operations and people management", // Used in: Course details
    certification: "Certified HR Professional", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "HR Generalist",
      "HR Specialist",
      "HR Business Partner",
      "HR Manager",
      "Recruitment Specialist",
      "Compensation Analyst",
      "Training Coordinator",
      "Employee Relations Manager",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Advance HR Training in {city}",
      subtitle: "Get Certified with the best HR training institute in {city}",
      description:
        "Connecting Dots ERP offers a advance HR course in {city} designed to equip you with the essential skills to excel in Human Resources. Our advanced and detailed HR training program covers key modules such as Personnel Administration, Payroll, Time Management, and Organizational Management. By mastering these modules, you'll gain the expertise to streamline HR processes, optimize workforce management, and drive organizational success. Our course is tailored to help you land your dream job in the dynamic field of HR.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "HR Training Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why HR Training?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">HR?</span>',
          content:
            "Human Resources (HR) is a critical function within any organization, responsible for managing people, processes, and policies. Effective HR management is essential for attracting, developing, and retaining top talent, ensuring compliance with labor laws, and optimizing workforce productivity. If you're looking to build a career in HR, our HR course in {city} provides comprehensive training in core HR concepts and practices. You'll gain a deep understanding of topics such as recruitment and selection, performance management, compensation and benefits, employee relations, and HR analytics. Our course is designed to equip you with the skills and knowledge needed to succeed in today's dynamic HR landscape.",
        },
        {
          title:
            'What does an <span class="highlight-span-cards">HR</span> Do?',
          content:
            "An HR Professional is responsible for managing people-related functions within an organization. Their role involves attracting, developing, and retaining talent, ensuring compliance with labor laws, and fostering a positive work environment. Key HR responsibilities include recruitment and selection, performance management, compensation and benefits, employee relations, training and development, HR analytics, and legal and compliance. By effectively managing these HR functions, professionals contribute to the overall success of an organization.",
        },
        {
          title:
            'Why Take <span class="highlight-span-cards">HR Training</span> in {city}?',
          content:
            "An HR Professional must possess a diverse skill set to manage people-related functions effectively. Our HR course in {city} offers advanced training in core HR modules, preparing you to handle end-to-end HR processes, from recruitment to retirement. You will gain hands-on experience in managing employee data, conducting performance reviews, administering compensation and benefits, and ensuring compliance with labor laws.",
          listItems: [
            "HR Generalist",
            "HR Specialist (Recruitment, Compensation, Benefits, etc.)",
            "HR Business Partner",
            "HR Manager",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
modulesData: {
  title: "HR TRAINING CURRICULUM",
  globalActions: {
    startLearning: "https://example.com/start-learning-hr-training",
    downloadCurriculum: "https://example.com/download-curriculum-hr-training",
  },
  banner: {
    title: "Looking for HR Courses?",
    subtitle: "No need to Google 10 tabs — everything's listed right here.",
    image: "https://res.cloudinary.com/dudu879kr/image/upload/v1755005000/HRBanner_td8q4e.avif",
    technologies: [
      "HR Fundamentals",
      "Recruitment",
      "Employee Relations",
      "Compliance",
      "Performance Management",
      "HRIS",
      "Analytics",
    ],
  },
  tabs: [
    {
      type: "modules", // Added this missing property
      duration: "5.5 Months", // Added this missing property (total duration)
      modules: [
        {
          title: "HR Fundamentals",
          duration: "1 Month",
          content: [
            "Role of HR in aligning workforce with company goals",
            "Core HR functions like recruitment, payroll, and training",
            "Basics of labor laws and compliance",
            "Importance of ethics in HR operations",
            "Understanding workplace culture and employee behavior",
          ],
          detailedContent: [
            "In-depth overview of HR responsibilities",
            "Impact of HR functions on business growth",
            "Compliance requirements and their implications",
            "Ethical practices in hiring and employee management",
            "Link between HR strategies and organizational culture",
          ],
          toolsAndTechnologies: [
            { name: "BambooHR", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1754997923/bamboo_HR_yb7hqs.webp", alt: "BambooHR" },
            { name: "Zoho People", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755000268/zohopeople_r6psyf.webp", alt: "Zoho People" },
            { name: "Microsoft Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "Microsoft Excel" },
            { name: "SAP SuccessFactors", icon: "https://img.icons8.com/color/500/sap.png", alt: "SAP SuccessFactors" },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-hr-fundamentals",
            downloadCurriculum: "https://example.com/download-curriculum-hr-fundamentals",
          },
        },
        {
          title: "Recruitment & Selection",
          duration: "1 Month",
          content: [
            "Conducting job analysis for role clarity",
            "Creating accurate job descriptions",
            "Effective sourcing strategies",
            "Interviewing techniques for better selection",
            "Onboarding new hires smoothly",
          ],
          detailedContent: [
            "Steps to analyze job roles effectively",
            "Best practices for writing job descriptions",
            "Finding candidates through multiple channels",
            "Evaluating candidates with structured interviews",
            "Building onboarding programs for retention",
          ],
          toolsAndTechnologies: [
            { name: "LinkedIn Recruiter", icon: "https://img.icons8.com/color/500/linkedin.png", alt: "LinkedIn Recruiter" },
            { name: "Indeed Hiring Platform", icon: "https://img.icons8.com/pulsar-line/480/indeed.png", alt: "Indeed Hiring Platform" },
            { name: "Naukri RMS", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755001358/naukri.com_rms_piivxp.webp", alt: "Naukri RMS" },
            { name: "Zoho Recruit", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755001539/zoho_recruit_sxfbl5.webp", alt: "Zoho Recruit" },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-recruitment-selection",
            downloadCurriculum: "https://example.com/download-curriculum-recruitment-selection",
          },
        },
        {
          title: "Employee Relations & Communication",
          duration: "1 Month",
          content: [
            "Building employee engagement strategies",
            "Conducting effective satisfaction surveys",
            "Resolving workplace conflicts",
            "Facilitating feedback sessions",
            "Designing internal communication channels",
          ],
          detailedContent: [
            "Importance of engagement in productivity",
            "Survey creation and analysis",
            "Conflict resolution models for HR",
            "Using feedback to improve performance",
            "Communication tools for team alignment",
          ],
          toolsAndTechnologies: [
            { name: "Culture Amp", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755001766/culture_amp_xaony6.webp", alt: "Culture Amp" },
            { name: "SurveyMonkey", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755002146/surveymonkeyfinal_lwycel.webp", alt: "SurveyMonkey" },
            { name: "Office 365", icon: "https://img.icons8.com/color/500/office-365.png", alt: "Office 365" },
            { name: "Slack", icon: "https://img.icons8.com/color/500/slack-new.png", alt: "Slack" },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-employee-relations",
            downloadCurriculum: "https://example.com/download-curriculum-employee-relations",
          },
        },
        {
          title: "HR Ethics & Compliance",
          duration: "1 Month",
          content: [
            "Understanding core employment laws",
            "Monitoring compliance within HR processes",
            "Designing policies to ensure compliance",
            "Managing compliance audits effectively",
            "Educating employees on legal requirements",
          ],
          detailedContent: [
            "Key labor laws and their applications",
            "Compliance frameworks for HR",
            "Policy creation to meet legal standards",
            "Steps in conducting compliance audits",
            "Training staff on compliance awareness",
          ],
          toolsAndTechnologies: [
            { name: "India Code Portal", icon: "https://img.icons8.com/color/500/law.png", alt: "India Code Portal" },
            { name: "Tally ERP", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755002296/tallyerp_jtv9cd.webp", alt: "Tally ERP" },
            { name: "Microsoft Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "Microsoft Excel" },
            { name: "Zoho People", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755000268/zohopeople_r6psyf.webp", alt: "Zoho People" },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-hr-compliance",
            downloadCurriculum: "https://example.com/download-curriculum-hr-compliance",
          },
        },
        {
          title: "Performance Management Systems",
          duration: "1.5 Months",
          content: [
            "Creating structured appraisal methods",
            "Defining measurable KPIs and OKRs",
            "Conducting effective performance reviews",
            "Implementing improvement plans",
            "Integrating career development with performance",
          ],
          detailedContent: [
            "Steps for building appraisal frameworks",
            "Setting and tracking performance metrics",
            "Techniques for unbiased performance reviews",
            "How to design PIPs for underperformance",
            "Career growth plans linked to performance data",
          ],
          toolsAndTechnologies: [
            { name: "Keka HR", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755002620/keka_suvbot.webp", alt: "Keka HR" },
            { name: "BambooHR", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1754997923/bamboo_HR_yb7hqs.webp", alt: "BambooHR" },
            { name: "Zoho People", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755000268/zohopeople_r6psyf.webp", alt: "Zoho People" },
            { name: "Microsoft Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "Microsoft Excel" },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-performance-management",
            downloadCurriculum: "https://example.com/download-curriculum-performance-management",
          },
        },
      ],
    },
  ],
},

    // Data for Certificate Component
    certificate: {
      courseTitle: "HR Training Certificate",
      alt: "hr-course-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "Master the art of Human resources with HR Certification Course in {city} is designed to equip you with the essential skills and knowledge needed to excel in Human Resources. Our comprehensive program combines theoretical learning with hands-on practical sessions, focusing on real-world HR scenarios.",
      description:
        "With expert trainers and a focus on contemporary HR practices, you'll be prepared to navigate and succeed in the ever-evolving HR landscape.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for HR Training in {city}?",
      paragraphs: [
        "Connecting Dots ERP offers a comprehensive HR Course in {city} designed to equip you with the essential skills and knowledge to succeed in the dynamic field of Human Resources. Our industry-focused curriculum covers a wide range of HR modules, including Recruitment and Selection, Performance Management, Compensation and Benefits, Employee Relations, and HR Analytics.",
        "Expert Faculty: Our course is led by experienced HR professionals who bring real-world expertise to the classroom. They provide personalized mentorship and guidance, ensuring you gain a deep understanding of HR concepts.",
        "Hands-On Learning: We believe in learning by doing. Our course offers practical, hands-on experience through real-world case studies, simulations, and projects. You'll have the opportunity to apply your knowledge to real-world scenarios, enhancing your problem-solving and decision-making skills.",
        "Flexible Learning Options: We understand that everyone has different learning styles and schedules. Our flexible learning options, including online and classroom-based training, allow you to learn at your own pace and convenience.",
      ],
      listItem1Header: "What makes our HR training in {city} unique?",
      listItem1: [
        "Comprehensive Curriculum: Our course covers all the essential aspects of HR, including strategic HR, operational HR, and transactional HR.",
        "Industry-Relevant Skills: You'll develop the skills and knowledge needed to succeed in today's competitive HR landscape.",
        "Certification and Recognition: Upon successful completion of the course, you'll receive a recognized certification that validates your HR expertise.",
        "Networking Opportunities: Connect with fellow HR professionals and industry experts, expanding your professional network.",
        "Job Placement Assistance: Our dedicated placement team works closely with leading organizations to help you secure your dream HR job.",
        "Lifelong Learning: Our commitment to your success extends beyond the classroom with continuous learning opportunities.",
      ],
      listItemAfterIndex: 3, // Insert list after paragraph index 3
      paragraphsAfterList: [
        "By enrolling in our HR Training institute in {city}, you'll gain the confidence and skills to excel in your HR career. Whether you're a beginner or an experienced HR professional, our course will help you take your career to the next level.",
        "Contact us to learn more about our HR Course in {city}, fees, and upcoming batches.",
      ],
      secondTitle: "What Will You Learn in the HR Training Program?",
      secondParagraphs: [
        "HR Module Overview: In our HR Course in {city}, you will gain in-depth knowledge of key HR modules, including Recruitment and Selection, Performance Management, Compensation and Benefits, Employee Relations, and HR Analytics. This course will equip you with the skills to manage people effectively, optimize HR processes, and ensure compliance with labor laws.",
        "HR System Configuration and Customization: Gain hands-on experience with HR Training institute in {city} in system configuration, learning how to customize HR applications to meet specific organizational needs. You will explore different transaction codes, configuration steps, and the integration of HR modules to optimize HR workflows.",
        "HR Integration Across Modules: Learn how HR modules work together to streamline HR processes. Understand the integration points between Recruitment, Performance Management, Compensation and Benefits, and Employee Relations to ensure smooth data flow and consistency.",
        "HR Certification and Placement Support: Upon completion of the course, you will be ready to take on roles such as HR Generalist, HR Specialist, HR Business Partner, or HR Manager. As part of our HR Course in {city} with placement support, we provide assistance in preparing for HR certification exams and offer job placement guidance.",
      ],
      highlights: [
        "Expert Faculty",
        "Hands-On Learning",
        "Flexible Learning Options",
        "Job Placement Assistance",
        "Comprehensive Curriculum",
        "Industry-Relevant Skills",
        "Certification and Recognition",
        "Networking Opportunities",
        "Lifelong Learning",
        "HR Module Overview",
      ],
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question:
            "Can I switch my career from any other domain to the HR field?",
          answer:
            "Absolutely! Many individuals from diverse backgrounds successfully transition into HR careers. With the right training and skill development, you can make a successful career switch. Our HR Course in {city} is designed to equip you with the necessary knowledge and skills, regardless of your prior experience.",
        },
        {
          question: "Do you provide online HR training?",
          answer:
            "Yes, we offer both online and offline HR training in {city}. Our online courses provide flexibility and convenience, allowing you to learn at your own pace. Our offline courses offer hands-on learning and personalized mentorship from experienced HR professionals.",
        },
        {
          question: "Do we get to work on live projects?",
          answer:
            "Yes, our HR training in {city} includes practical, hands-on experience through live projects. These projects simulate real-world HR scenarios, allowing you to apply your knowledge and skills to real-world challenges.",
        },
        {
          question:
            "What kinds of batches are offered for trainees in HR training?",
          answer:
            "We offer a variety of batch options to cater to different learning styles and schedules. You can choose from weekend batches, weekday batches, and online batches. Our flexible batch timings ensure that you can balance your training with your work and personal commitments.",
        },
        {
          question:
            "What are the chances of Job Placement following the conclusion of HR Training?",
          answer:
            "We have a strong track record of successful placements. Our HR training institute in {city} provides job placement assistance to help you secure your dream HR job. We offer resume building workshops, mock interviews, and career counseling to prepare you for the job market.",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.5, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 89, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-03-10T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-12T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "core-hr": {
    // === BASIC COURSE INFO ===
    title: "Core HR", // Used in: Page titles, headers, SEO
    fullTitle: "Core Human Resources Management", // Used in: Page content, descriptions
    category: "hr", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "core-hr", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master Core HR fundamentals in {city} with our comprehensive course. Learn recruitment, payroll, employee relations, compliance, and HR operations. Our Core HR training in {city} offers hands-on experience with real HR scenarios, industry-relevant curriculum, and 100% placement support to help you build a successful career in Human Resources.",
    metaTitle:
      "Core HR Course in {city} | Best Core HR Training & Certification", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master Core HR in {city}. Expert-led training in recruitment, payroll, compliance, employee relations. Real projects, certification & 100% placement. Launch your HR career now!",

    // === COURSE DETAILS ===
    duration: "2-4 months", // Used in: Course summary section, page content
    price: { min: 35000, max: 75000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "HR Fundamentals & Policies",
      "Recruitment & Selection Process",
      "Payroll Management & Processing",
      "Employee Relations & Engagement",
      "Labor Law & Compliance",
      "Performance Management Basics",
      "HR Documentation & Records",
      "Employee Onboarding & Offboarding",
      "HR Analytics & Reporting",
    ],
    prerequisites:
      "Basic understanding of business operations and people management", // Used in: Course details
    certification: "Certified Core HR Professional", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "HR Generalist",
      "Recruitment Specialist",
      "Payroll Officer",
      "HR Compliance Manager",
      "Employee Relations Coordinator",
      "HR Assistant",
      "HR Executive",
      "Talent Acquisition Specialist",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Core HR Training in {city}",
      subtitle: "Join our Practical-based Core HR Training in {city}",
      description:
        "Enhance your career with Connecting Dot's Core HR course in {city}, tailored to provide you with the key competencies needed to thrive in the field of human resource management. Focusing on practical skills and hands-on learning, this course equips you for various roles such as recruitment, employee engagement, talent development, and HR data analysis, helping you become a valuable asset in any organization.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        { text: "Request Call back", courseName: "Core HR Training Program" },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why HR Core?",
      cards: [
        {
          title: 'What is <span class="highlight-span-cards">Core HR</span>?',
          content:
            "Core HR refers to the foundational aspects of Human Resource Management, encompassing functions such as recruitment, payroll, employee relations, and compliance. These essential components enable businesses to efficiently manage their workforce, streamline HR operations, and ensure that employees are supported throughout their career lifecycle. Learning Core HR training in {city} equips you with the skills needed to handle critical HR responsibilities, optimize workforce management, and contribute to the growth and success of any organization.",
        },
        {
          title:
            'What Does <span class="highlight-span-cards">an HR</span> Do?',
          content:
            "HR core refers to the foundational aspects of human resources, including recruitment, employee development, compensation management, compliance with labor laws, and workforce planning. Professionals working in HR core roles focus on building strong HR frameworks that support both the strategic and operational goals of the company. By enrolling in an HR core course, individuals can gain the necessary skills to handle essential HR tasks and contribute to organizational success by ensuring smooth HR operations.",
        },
        {
          title:
            'Why Take <span class="highlight-span-cards">HR</span> Training?',
          content:
            "Professionals skilled in Core HR are in high demand as businesses across industries require effective HR practices to manage their teams. Our Core HR course in {city} covers all the key areas of HR management, preparing you for roles such as:",
          listItems: [
            "HR Generalist",
            "Recruitment Specialist",
            "Payroll Officer",
            "HR Compliance Manager",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
  modulesData : {
  title: "CORE HR CURRICULUM",
  globalActions: {
    startLearning: "https://connectingdotserp.com/enquiry",
    downloadCurriculum: "/Curriculum/core-hr.pdf",
  },
  banner: {
    title: "Master Core HR Skills",
    subtitle: "From fundamentals to advanced HR operations — all in one course.",
    image: "https://res.cloudinary.com/dudu879kr/image/upload/v1755005000/HRBanner_td8q4e.avif",
    technologies: [
      "HR Fundamentals",
      "Recruitment & Selection",
      "Payroll Management",
      "Employee Relations",
      "HR Operations & Analytics",
    ],
  },
  tabs: [
    {
      modules: [
        {
          title: "HR Fundamentals & Policies",
          duration: "2 Weeks",
          content: [
            "Introduction to Human Resources and organizational structure",
            "HR roles and responsibilities",
            "Employment law basics",
            "HR policy development",
            "Employee handbook management",
            "Workplace ethics",
          ],
          detailedContent: [
            "Understanding the structure and role of HR in modern organizations.",
            "Exploring the core responsibilities of HR professionals.",
            "Introduction to labor laws and compliance essentials.",
            "Steps to create and implement effective HR policies.",
            "Guidelines for maintaining an employee handbook.",
            "Promoting workplace ethics and professional standards.",
          ],
          toolsAndTechnologies: [
            { name: "MS Word", icon: "https://img.icons8.com/color/500/microsoft-word-2019--v1.png", alt: "MS Word" },
            { name: "Google Docs", icon: "https://img.icons8.com/color/500/google-docs.png", alt: "Google Docs" },
            { name: "HRMS", icon: "https://img.icons8.com/color/500/group.png", alt: "HRMS" },
            { name: "Compliance Tools", icon: "https://img.icons8.com/color/500/checklist.png", alt: "Compliance Tools" },
          ],
          actions: {
            startLearning: "https://connectingdotserp.com/enquiry",
            downloadCurriculum: "/Curriculum/core-hr.pdf",
          },
        },
        {
          title: "Recruitment & Selection Process",
          duration: "3 Weeks",
          content: [
            "Job analysis and description writing",
            "Recruitment strategies",
            "Interview planning",
            "Selection and assessment",
            "Background checks",
            "Onboarding preparation",
          ],
          detailedContent: [
            "Steps to perform job analysis and craft clear job descriptions.",
            "Modern recruitment strategies and sourcing techniques.",
            "Planning and conducting structured interviews.",
            "Assessment methods for effective candidate selection.",
            "Background verification and reference checks.",
            "Creating a smooth onboarding experience.",
          ],
          toolsAndTechnologies: [
            { name: "LinkedIn Recruiter", icon: "https://img.icons8.com/color/500/linkedin.png", alt: "LinkedIn Recruiter" },
            { name: "Google Sheets", icon: "https://img.icons8.com/color/500/google-sheets.png", alt: "Google Sheets" },
            { name: "ATS Software", icon: "https://img.icons8.com/color/500/task.png", alt: "ATS Software" },
            { name: "Zoom/Meet", icon: "https://img.icons8.com/color/500/video-call.png", alt: "Zoom/Meet" },
          ],
          actions: {
            startLearning: "https://connectingdotserp.com/enquiry",
            downloadCurriculum: "/Curriculum/core-hr.pdf",
          },
        },
        {
          title: "Payroll Management & Processing",
          duration: "3 Weeks",
          content: [
            "Payroll fundamentals",
            "Salary structure design",
            "Tax calculations",
            "Payroll software usage",
            "Leave and attendance tracking",
            "Payroll reporting",
          ],
          detailedContent: [
            "Key concepts of payroll and statutory compliance.",
            "Designing salary structures and components.",
            "Calculating taxes, deductions, and contributions.",
            "Using payroll management software efficiently.",
            "Tracking employee leaves and attendance.",
            "Generating payroll reports and documentation.",
          ],
          toolsAndTechnologies: [
            { name: "Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "Excel" },
            { name: "Tally Payroll", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755002296/tallyerp_jtv9cd.webp", alt: "Tally Payroll" },
            { name: "Zoho Payroll", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755003164/zohopayroll_i6rygv.webp", alt: "Zoho Payroll" },
            { name: "HRMS Attendance", icon: "https://img.icons8.com/color/500/group.png", alt: "HRMS Attendance" },
          ],
          actions: {
            startLearning: "https://connectingdotserp.com/enquiry",
            downloadCurriculum: "/Curriculum/core-hr.pdf",
          },
        },
        {
          title: "Employee Relations & Engagement",
          duration: "1 Month",
          content: [
            "Engagement strategies",
            "Conflict resolution",
            "Grievance handling",
            "Employee communication",
            "Workplace culture",
            "Retention strategies",
          ],
          detailedContent: [
            "Methods to enhance employee engagement and satisfaction.",
            "Conflict resolution approaches and mediation techniques.",
            "Processes for grievance handling and discipline.",
            "Improving communication between HR and employees.",
            "Building a positive workplace culture.",
            "Strategies to retain top talent.",
          ],
          toolsAndTechnologies: [
            { name: "SurveyMonkey", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755002146/surveymonkeyfinal_lwycel.webp", alt: "SurveyMonkey" },
            { name: "Slack", icon: "https://img.icons8.com/color/500/slack.png", alt: "Slack" },
            { name: "Google Forms", icon: "https://img.icons8.com/color/500/google-forms.png", alt: "Google Forms" },
            { name: "Engagement Tools", icon: "https://img.icons8.com/color/500/handshake.png", alt: "Engagement Tools" },
          ],
          actions: {
            startLearning: "https://connectingdotserp.com/enquiry",
            downloadCurriculum: "/Curriculum/core-hr.pdf",
          },
        },
        {
          title: "HR Operations & Analytics",
          duration: "1 Month",
          content: [
            "HRIS and technology",
            "HR metrics and KPIs",
            "Data analysis in HR",
            "Workforce planning",
            "Project management",
            "Continuous improvement",
          ],
          detailedContent: [
            "Using HR information systems for operational efficiency.",
            "Tracking and analyzing HR metrics for decision-making.",
            "Data analysis methods to improve HR functions.",
            "Forecasting workforce needs and planning resources.",
            "Managing HR projects from initiation to completion.",
            "Ongoing process improvements in HR operations.",
          ],
          toolsAndTechnologies: [
            { name: "Power BI", icon: "https://img.icons8.com/color/500/power-bi.png", alt: "Power BI" },
            { name: "Tableau", icon: "https://img.icons8.com/color/500/tableau-software.png", alt: "Tableau" },
            { name: "BambooHR", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1754997923/bamboo_HR_yb7hqs.webp", alt: "BambooHR" },
            { name: "MS Project", icon: "https://img.icons8.com/color/500/project.png", alt: "MS Project" },
          ],
          actions: {
            startLearning: "https://connectingdotserp.com/enquiry",
            downloadCurriculum: "/Curriculum/core-hr.pdf",
          },
        },
      ],
    },
  ],
},


    // Data for Certificate Component
    certificate: {
      courseTitle: "Core HR Certificate",
      alt: "hr-core-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The Core HR Certification at Connecting Dots ERP focuses on the essentials of human resources, including policies, employee management, and labor laws",
      description:
        "This certification ensures you are equipped to handle core HR functions and support organizational growth through effective HR practices.",
    },

    // Data for Description Component
    descriptionContent: {
      title: "Why Choose Connecting Dots ERP for Core HR Training in {city}?",
      paragraphs: [
        "At Connecting Dots ERP, we offer an industry-focused Core HR training in {city} that provides a deep understanding of HR functions, including recruitment processes, employee management, payroll systems, and labor laws. Whether you are new to the HR field or looking to enhance your existing skills, our Core HR certification in {city} equips you with practical knowledge and hands-on experience to ensure you're ready for HR roles in today's dynamic business environment.",
        "Our course not only covers theoretical principles but emphasizes real-world applications through case studies and practical exercises. You'll learn how to handle day-to-day HR operations, resolve employee issues, and manage payroll processes effectively. The Core HR course fees in {city} are competitively priced, ensuring access to high-quality training for learners from various backgrounds. We also provide flexible payment plans and financial assistance to make the program more accessible.",
        "With mentorship from experienced HR professionals and a carefully crafted curriculum, you'll receive personalized guidance and support throughout your training. Our Core HR classes in {city} focus on hands-on learning, allowing you to apply HR strategies in realistic scenarios. From conducting interviews to managing compliance, you'll develop the expertise needed to meet the challenges of HR roles.",
        "Additionally, our Core HR course emphasizes collaboration through group projects, problem-solving workshops, and simulation-based activities. These exercises help you hone teamwork and decision-making skills that are crucial in today's fast-paced HR environments. One of the key advantages of our program is the 100% placement assistance that we offer, providing you with career guidance, resume development, interview preparation, and job placement opportunities with top companies. Whether you aim to become an HR Generalist, Recruitment Specialist, or Payroll Officer, this course offers the skills, confidence, and placement support necessary to succeed in your HR career.",
      ],
      listItem1Header: "What makes our Core HR training in {city} unique?",
      listItem1: [
        "Industry-focused curriculum covering recruitment, payroll, compliance, and employee management",
        "Real-world applications through case studies and practical exercises",
        "Competitively priced fees with flexible payment plans and financial assistance",
        "Mentorship from experienced HR professionals with personalized guidance",
        "Hands-on learning with realistic HR scenarios and simulation-based activities",
        "100% placement assistance with career guidance and job placement opportunities",
      ],
      listItemAfterIndex: 3, // Insert list after paragraph index 3
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Who Should Join the Core HR Course in {city}?",
          answer:
            "This course is ideal for aspiring HR professionals, recent graduates, working professionals looking to switch careers to HR, and existing HR employees who want to upgrade their skills in human resource management.",
        },
        {
          question: "What is the Mode of Training for the Core HR Course?",
          answer:
            "The Core HR training in {city} is offered in both online and classroom formats, providing flexibility to accommodate the schedules of students, job seekers, and working professionals alike.",
        },
        {
          question: "What is the Fee Range for the Core HR Course in {city}?",
          answer:
            "The fees for the Core HR course in {city} start from ₹35,000, depending on the course structure, certification level, and any additional resources provided, such as workshops or career counseling.",
        },
        {
          question:
            "Which Positions Can I Apply for After Completing the Course?",
          answer:
            "Upon completing the Core HR certification in {city}, you can apply for positions such as HR Generalist, Recruitment Specialist, Payroll Manager, and HR Compliance Officer in various sectors.",
        },
        {
          question:
            "How Long Does It Take to Complete the Core HR Course in {city}?",
          answer:
            "The Core HR course in {city} typically takes 2 to 4 months to complete, depending on your learning pace and the chosen training mode.",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.4, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 76, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-03-15T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-13T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "hr-generalist": {
    // === BASIC COURSE INFO ===
    title: "HR Generalist", // Used in: Page titles, headers, SEO
    fullTitle: "HR Generalist Training Program", // Used in: Page content, descriptions
    category: "hr", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "hr-generalist", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master HR Generalist skills in {city} with our comprehensive course. Learn recruitment, employee relations, payroll, performance management, and labor laws. Our HR Generalist training in {city} offers hands-on experience with real HR scenarios, industry-relevant curriculum, and 100% placement support to help you build a successful career as an HR Generalist.",
    metaTitle: "HR Generalist Course in {city} | Best HR Generalist Training", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master HR Generalist skills in {city}. Expert-led training in recruitment, payroll, employee relations. Real projects, certification & 100% placement. Launch your HR career now!",

    // === COURSE DETAILS ===
    duration: "2-4 months", // Used in: Course summary section, page content
    price: { min: 40000, max: 80000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Recruitment & Talent Acquisition",
      "Employee Relations & Engagement",
      "Payroll Management & Administration",
      "Performance Management Systems",
      "Labor Law & Compliance",
      "Training & Development",
      "HR Policies & Procedures",
      "Employee Onboarding & Offboarding",
      "HR Analytics & Reporting",
    ],
    prerequisites:
      "Basic understanding of business operations and people management", // Used in: Course details
    certification: "Certified HR Generalist Professional", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "HR Generalist",
      "HR Coordinator",
      "HR Executive",
      "Talent Acquisition Specialist",
      "Payroll Administrator",
      "Employee Relations Specialist",
      "HR Business Partner",
      "Recruitment Specialist",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "HR Generalist Training in {city}",
      subtitle:
        "Become a Versatile HR Professional with Our HR Generalist Training in {city}",
      description:
        "Elevate your career in human resources with Connecting Dot's HR Generalist training in {city}, designed to provide you with a well-rounded understanding of key HR functions. This training program covers recruitment, employee relations, payroll management, performance appraisals, and labor laws, equipping you with the skills required to excel as an HR Generalist in any organization.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        {
          text: "Request Call back",
          courseName: "HR Generalist Training Program",
        },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "WHY HR Generalist?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">HR Generalist?</span>',
          content:
            "An HR Generalist is responsible for managing multiple aspects of human resource management within an organization. This includes recruitment, onboarding, employee engagement, performance management, training, payroll, and compliance with labor laws. An HR Generalist plays a crucial role in creating a positive work environment and ensuring the smooth functioning of HR operations across all levels of the organization.",
        },
        {
          title:
            'What Does <span class="highlight-span-cards">HR Generalist</span> Do?',
          content:
            "An HR generalist handles a broad range of human resource activities, including recruitment, employee onboarding, performance management, employee relations, and compliance with employment laws. They are the all-rounders of the HR department, providing support across various functions and ensuring that HR policies are effectively implemented. For those looking to gain a comprehensive understanding of the HR field, an HR generalist course provides the foundational knowledge to manage multiple HR functions and improve workforce operations.",
        },
        {
          title:
            'Why Take <span class="highlight-span-cards">HR Generalist</span> Training?',
          content:
            "An HR Generalist must possess a diverse skill set to handle various HR functions effectively. Our HR Generalist course in {city} offers comprehensive training that prepares you for handling day-to-day HR operations, ensuring employee satisfaction, and maintaining compliance with legal regulations. Upon completing the course, you will be qualified to take on roles such as:",
          listItems: [
            "HR Generalist",
            "HR Coordinator",
            "HR Executive",
            "Talent Acquisition Specialist",
            "Payroll Administrator",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
 modulesData : {
  title: "HR Generalist Curriculum",
  globalActions: {
    startLearning: "https://example.com/start-learning-hr-generalist",
    downloadCurriculum: "https://example.com/download-curriculum-hr-generalist",
  },
  banner: {
    title: "Become an HR Generalist Expert",
    subtitle: "Master recruitment, employee engagement, payroll, compliance, and performance management.",
    image: "https://res.cloudinary.com/dudu879kr/image/upload/v1755005000/HRBanner_td8q4e.avif",
    technologies: [
      "HR Fundamentals",
      "Recruitment",
      "Employee Engagement",
      "Payroll Management",
      "Performance Management",
      "Labor Law",
      "HR Analytics",
    ],
  },
  tabs: [
    {
      modules: [
        {
          title: "HR Fundamentals & Organization",
          duration: "2 Weeks",
          content: [
            "Introduction to HR and organizational structure",
            "Roles and responsibilities in HR",
            "Basics of employment law and compliance",
            "HR ethics and workplace professionalism",
            "Understanding organizational behavior",
          ],
          detailedContent: [
            "History and evolution of HR functions",
            "Core HR responsibilities and impact on business",
            "Compliance essentials for HR processes",
            "Professional ethics in HR decision making",
            "Influence of culture on organizational performance",
          ],
          toolsAndTechnologies: [
            { name: "BambooHR", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1754997923/bamboo_HR_yb7hqs.webp", alt: "BambooHR" },
            { name: "Zoho People", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755000268/zohopeople_r6psyf.webp", alt: "Zoho People" },
            { name: "Microsoft Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "Microsoft Excel" },
            { name: "SAP SuccessFactors", icon: "https://img.icons8.com/color/500/sap.png", alt: "SAP SuccessFactors" },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-hr-fundamentals-organization",
            downloadCurriculum: "https://example.com/download-curriculum-hr-fundamentals-organization",
          },
        },
        {
          title: "Recruitment & Talent Acquisition",
          duration: "3 Weeks",
          content: [
            "Job analysis and competency mapping",
            "Multi-channel sourcing strategies",
            "Interview planning and execution",
            "Candidate assessment and selection",
            "Offer negotiation and onboarding",
          ],
          detailedContent: [
            "Creating effective job descriptions",
            "Optimizing recruitment channels",
            "Behavioral and situational interviewing",
            "Evaluation methods for candidate fit",
            "Smooth onboarding for retention",
          ],
          toolsAndTechnologies: [
            { name: "LinkedIn Recruiter", icon: "https://img.icons8.com/color/500/linkedin.png", alt: "LinkedIn Recruiter" },
            { name: "Indeed", icon: "https://img.icons8.com/pulsar-line/480/indeed.png", alt: "Indeed" },
            { name: "Naukri RMS", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755001358/naukri.com_rms_piivxp.webp", alt: "Naukri RMS" },
            { name: "Zoho Recruit", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755001539/zoho_recruit_sxfbl5.webp", alt: "Zoho Recruit" },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-recruitment-talent-acquisition",
            downloadCurriculum: "https://example.com/download-curriculum-recruitment-talent-acquisition",
          },
        },
        {
          title: "Employee Relations & Engagement",
          duration: "3 Weeks",
          content: [
            "Employee engagement strategies",
            "Conflict resolution techniques",
            "Grievance and disciplinary handling",
            "Team building and workplace culture",
            "Employee retention initiatives",
          ],
          detailedContent: [
            "Methods to measure engagement",
            "Practical conflict resolution approaches",
            "Establishing grievance redressal systems",
            "Building high-performance workplace cultures",
            "Retention programs and exit interviews",
          ],
          toolsAndTechnologies: [
            { name: "Officevibe", icon: "https://img.icons8.com/color/500/feedback.png", alt: "Officevibe" },
            { name: "SurveyMonkey", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755002146/surveymonkeyfinal_lwycel.webp", alt: "SurveyMonkey" },
            { name: "Slack", icon: "https://img.icons8.com/color/500/slack.png", alt: "Slack" },
            { name: "Zoho People", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755000268/zohopeople_r6psyf.webp", alt: "Zoho People" },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-employee-relations-engagement",
            downloadCurriculum: "https://example.com/download-curriculum-employee-relations-engagement",
          },
        },
        {
          title: "Payroll & Compensation Management",
          duration: "1 Month",
          content: [
            "Payroll processing and compliance",
            "Salary structure and job evaluation",
            "Benefits administration",
            "Tax calculation and deductions",
            "Compensation benchmarking",
          ],
          detailedContent: [
            "End-to-end payroll process management",
            "Designing competitive salary structures",
            "Administering benefits and perks",
            "Statutory deductions and compliance",
            "Analyzing market compensation trends",
          ],
          toolsAndTechnologies: [
            { name: "GreytHR", icon: "https://img.icons8.com/color/500/payroll.png", alt: "GreytHR" },
            { name: "Keka HR", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755002620/keka_suvbot.webp", alt: "Keka HR" },
            { name: "Tally ERP", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755002296/tallyerp_jtv9cd.webp", alt: "Tally ERP" },
            { name: "Microsoft Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "Microsoft Excel" },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-payroll-compensation-management",
            downloadCurriculum: "https://example.com/download-curriculum-payroll-compensation-management",
          },
        },
        {
          title: "Performance Management & Development",
          duration: "1 Month",
          content: [
            "Performance appraisals",
            "Goal setting and tracking",
            "Performance improvement plans",
            "Career development",
            "Training needs assessment",
          ],
          detailedContent: [
            "Designing appraisal systems",
            "Setting SMART goals and KPIs",
            "Coaching for performance improvement",
            "Succession planning methods",
            "Identifying learning needs for growth",
          ],
          toolsAndTechnologies: [
            { name: "Keka HR", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755002620/keka_suvbot.webp", alt: "Keka HR" },
            { name: "BambooHR", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1754997923/bamboo_HR_yb7hqs.webp", alt: "BambooHR" },
            { name: "Zoho People", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755000268/zohopeople_r6psyf.webp", alt: "Zoho People" },
            { name: "Microsoft Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "Microsoft Excel" },
          ],
          actions: {
            startLearning: "https://example.com/start-learning-performance-management-development",
            downloadCurriculum: "https://example.com/download-curriculum-performance-management-development",
          },
        },
      ],
    },
  ],
},

    // Data for Certificate Component
    certificate: {
      courseTitle: "HR Generalist Certificate",
      alt: "hr-generalist-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "At Connecting Dots ERP, the HR Generalist Certification covers all key HR functions, from recruitment to payroll management.",
      description:
        "This well-rounded program provides the skills you need to efficiently manage human resources operations, positioning you for success as an HR Generalist.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for HR Generalist Training in {city}?",
      paragraphs: [
        "At Connecting Dots ERP, we offer an industry-focused HR Generalist course in {city} that provides a comprehensive understanding of Human Resource Management. This course is designed to equip you with essential HR skills, including recruitment, employee relations, payroll management, compliance with labor laws, and performance management. Whether you're new to the HR field or seeking to enhance your HR skills, our HR Generalist certification in {city} ensures that you become job-ready with both theoretical knowledge and practical applications.",
        "Our HR Generalist classes in {city} emphasize hands-on learning through real-world HR projects and case studies, allowing you to apply HR principles in everyday business scenarios. From managing the recruitment process to developing HR policies and resolving employee conflicts, you'll gain practical experience that prepares you for the demands of HR roles in any organization. The HR Generalist course fees in {city} are structured to be affordable, ensuring accessibility to learners from diverse professional backgrounds. We also provide flexible payment options and financial assistance to make the course more accessible.",
        "The course curriculum is carefully structured to provide mentorship from experienced HR professionals, giving you personalized guidance throughout your training. Alongside technical HR knowledge, the HR Generalist course in {city} promotes collaborative learning through group projects, case discussions, and problem-solving exercises. These activities help you develop essential skills such as teamwork, communication, and decision-making, which are critical in today's HR landscape.",
      ],
      listItem1Header:
        "What makes our HR Generalist training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering all key HR functions from recruitment to strategic planning",
        "Hands-on learning through real-world HR projects and case studies",
        "Affordable fees with flexible payment options and financial assistance",
        "Mentorship from experienced HR professionals with personalized guidance",
        "Collaborative learning through group projects and problem-solving exercises",
        "100% placement assistance with career guidance and job placement opportunities",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Who Should Join the HR Generalist Course in {city}?",
          answer:
            "This course is ideal for aspiring HR professionals, fresh graduates, working professionals looking to switch careers to HR, and existing HR employees who want to enhance their knowledge and skills in HR management.",
        },
        {
          question:
            "What is the Mode of Training for the HR Generalist Course?",
          answer:
            "The HR Generalist training in {city} is available in both online and classroom formats, offering flexibility for students and working professionals.",
        },
        {
          question:
            "What is the Fee Range for the HR Generalist Course in {city}?",
          answer:
            "The fees for the HR Generalist course in {city} start from ₹40,000, depending on the course structure, additional workshops, and the resources provided.",
        },
        {
          question:
            "Which Positions Can I Apply for After Completing the Course?",
          answer:
            "After completing the HR Generalist certification in {city}, you can apply for positions such as HR Generalist, HR Coordinator, Recruitment Specialist, Payroll Administrator, and HR Executive.",
        },
        {
          question:
            "How Long Does It Take to Complete the HR Generalist Course in {city}?",
          answer:
            "The HR Generalist course in {city} typically takes 2 to 4 months to complete, depending on your pace and the mode of training chosen.",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.6, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 92, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-03-20T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-14T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "hr-analytics": {
    // === BASIC COURSE INFO ===
    title: "HR Analytics", // Used in: Page titles, headers, SEO
    fullTitle: "HR Analytics & People Data Science", // Used in: Page content, descriptions
    category: "hr", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "hr-analytics", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master HR Analytics in {city} with our comprehensive course. Learn workforce data analysis, predictive modeling, employee metrics, and data-driven HR decision making. Our HR Analytics training in {city} offers hands-on experience with real HR datasets, industry-relevant curriculum, and 100% placement support to help you build a successful career in People Analytics.",
    metaTitle: "HR Analytics Course in {city} | Best People Analytics Training", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master HR Analytics in {city}. Expert-led training in workforce data, predictive modeling, employee metrics. Real projects, certification & 100% placement. Launch your analytics career now!",

    // === COURSE DETAILS ===
    duration: "3-5 months", // Used in: Course summary section, page content
    price: { min: 50000, max: 100000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "HR Data Analysis & Metrics",
      "Workforce Analytics & Reporting",
      "Predictive Modeling in HR",
      "Employee Performance Analytics",
      "Recruitment & Talent Analytics",
      "Retention & Engagement Analysis",
      "Compensation Analytics",
      "HR Dashboard Development",
      "Statistical Analysis for HR",
    ],
    prerequisites:
      "Basic understanding of HR processes and data analysis concepts", // Used in: Course details
    certification: "Certified HR Analytics Professional", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "HR Analyst",
      "People Analytics Specialist",
      "Workforce Planning Analyst",
      "HR Business Partner",
      "Talent Management Analyst",
      "HR Data Scientist",
      "Compensation Analyst",
      "Employee Insights Analyst",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "HR Analytics Training in {city}",
      subtitle:
        "Master Data-Driven HR Decision Making with Our HR Analytics Training in {city}",
      description:
        "Upgrade your HR skills with Connecting Dot's HR Analytics course in {city}, designed to provide a comprehensive understanding of data analysis in human resource management. This course equips you with the tools to analyze employee data, improve HR processes, and make informed decisions. By integrating data-driven insights into HR operations, you will enhance talent management, recruitment, employee engagement, and retention strategies.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        {
          text: "Request Call back",
          courseName: "HR Analytics Training Program",
        },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why HR Analytics?",
      cards: [
        {
          title: 'Why <span class="highlight-span-cards">HR Analytics</span>?',
          content:
            "HR Analytics refers to the use of data and statistical methods to measure, analyze, and improve HR processes. It involves collecting and interpreting workforce data to make informed decisions regarding hiring, performance management, employee retention, and organizational development. HR Analytics enables businesses to predict trends, manage risks, and optimize their workforce for better productivity.",
        },
        {
          title:
            'What Does <span class="highlight-span-cards">HR Analytics</span> Do?',
          content:
            "HR analytics is a data-driven approach to managing and optimizing an organization's human resources. It involves the collection and analysis of HR data such as employee performance, turnover rates, recruitment efficiency, and compensation trends to gain insights that can improve decision-making and workforce strategies. By applying statistical techniques and predictive models, HR analytics helps organizations make informed decisions about hiring, employee engagement, retention, and productivity. For professionals looking to specialize in this field, an HR analytics course can provide the necessary skills to analyze complex data and drive better business outcomes through HR insights.",
        },
        {
          title:
            'Why Take <span class="highlight-span-cards">HR Analytics</span> Training?',
          content:
            "With the increasing importance of data in HR decision-making, professionals skilled in HR Analytics are in high demand. This HR Analytics training in {city} prepares you for roles that require analyzing employee data, driving improvements in workforce management, and supporting business strategies with accurate insights. Roles you can pursue after completing the course include:",
          listItems: [
            "HR Analyst",
            "HR Business Partner",
            "People Analytics Specialist",
            "Talent Management Analyst",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
 modulesData : {
  title: "HR ANALYTICS CURRICULUM",
  globalActions: {
    startLearning: "https://connectingdotserp.com/enquiry",
    downloadCurriculum: "/Curriculum/hr-analytics.pdf",
  },
  banner: {
    title: "Master HR Analytics Skills",
    subtitle: "From data collection to predictive modeling — all in one course.",
    image: "https://res.cloudinary.com/dudu879kr/image/upload/v1755005000/HRBanner_td8q4e.avif",
    technologies: [
      "HR Analytics Fundamentals",
      "Data Collection & Management",
      "HR Metrics & KPIs",
      "Workforce Planning",
      "Predictive HR Analytics",
    ],
  },
  tabs: [
    {
      modules: [
        {
          title: "Introduction to HR Analytics",
          duration: "2 Weeks",
          content: [
            "Overview of HR Analytics concepts",
            "Role of analytics in strategic HR decisions",
            "Applications in recruitment, retention, and performance",
            "Importance of data-driven decision making",
            "HR analytics career opportunities",
          ],
          detailedContent: [
            "Foundational understanding of HR Analytics and its purpose",
            "How analytics improves decision-making in HR",
            "Case studies of HR analytics in action",
            "Core concepts and terminology",
            "Trends shaping the future of HR analytics",
          ],
          toolsAndTechnologies: [
            { name: "Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "Excel" },
            { name: "Power BI", icon: "https://img.icons8.com/color/500/power-bi.png", alt: "Power BI" },
            { name: "Tableau", icon: "https://img.icons8.com/color/500/tableau-software.png", alt: "Tableau" },
            { name: "Google Data Studio", icon: "https://img.icons8.com/color/500/google-data-studio.png", alt: "Google Data Studio" },
          ],
          actions: {
            startLearning: "https://connectingdotserp.com/enquiry",
            downloadCurriculum: "/Curriculum/hr-analytics.pdf",
          },
        },
        {
          title: "Data Collection & Management",
          duration: "3 Weeks",
          content: [
            "Collecting HR data from multiple sources",
            "Cleaning and validating data",
            "Data integration from HRMS and surveys",
            "Ensuring data accuracy and consistency",
            "Building a central HR data repository",
          ],
          detailedContent: [
            "Data collection techniques from HRMS, surveys, and performance tools",
            "Data cleaning and preprocessing methods",
            "Handling missing or inconsistent data",
            "Data storage and management strategies",
            "Best practices for ensuring reliable HR analytics",
          ],
          toolsAndTechnologies: [
            { name: "MS Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "MS Excel" },
            { name: "SQL", icon: "https://img.icons8.com/color/500/sql.png", alt: "SQL" },
            { name: "HRMS Software", icon: "https://img.icons8.com/color/500/group.png", alt: "HRMS Software" },
            { name: "Python", icon: "https://img.icons8.com/color/500/python.png", alt: "Python" },
          ],
          actions: {
            startLearning: "https://connectingdotserp.com/enquiry",
            downloadCurriculum: "/Curriculum/hr-analytics.pdf",
          },
        },
        {
          title: "HR Metrics & KPIs",
          duration: "2 Weeks",
          content: [
            "Defining key HR metrics",
            "Tracking employee turnover and retention",
            "Measuring training ROI",
            "Analyzing recruitment efficiency",
            "Aligning KPIs with organizational goals",
          ],
          detailedContent: [
            "Understanding turnover rate, employee satisfaction, cost per hire, and training ROI",
            "Choosing the right KPIs for HR goals",
            "Creating dashboards for HR metrics",
            "Interpreting HR data for better decisions",
            "Using metrics to forecast HR needs",
          ],
          toolsAndTechnologies: [
            { name: "Excel Dashboards", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "Excel Dashboards" },
            { name: "Google Sheets", icon: "https://img.icons8.com/color/500/google-sheets.png", alt: "Google Sheets" },
            { name: "Tableau", icon: "https://img.icons8.com/color/500/tableau-software.png", alt: "Tableau" },
            { name: "Power BI", icon: "https://img.icons8.com/color/500/power-bi.png", alt: "Power BI" },
          ],
          actions: {
            startLearning: "https://connectingdotserp.com/enquiry",
            downloadCurriculum: "/Curriculum/hr-analytics.pdf",
          },
        },
        {
          title: "Workforce Planning & Optimization",
          duration: "3 Weeks",
          content: [
            "Forecasting staffing needs",
            "Identifying skill gaps",
            "Optimizing headcount",
            "Enhancing talent acquisition strategies",
            "Reducing workforce risks",
          ],
          detailedContent: [
            "How to forecast staffing needs using analytics",
            "Strategies for identifying and filling skill gaps",
            "Data-driven headcount optimization",
            "Improving hiring efficiency through analytics",
            "Mitigating HR-related risks with proactive planning",
          ],
          toolsAndTechnologies: [
            { name: "MS Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "MS Excel" },
            { name: "SPSS", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755003970/spss_y94w3k.webp", alt: "SPSS" },
            { name: "Python", icon: "https://img.icons8.com/color/500/python.png", alt: "Python" },
            { name: "Workforce Planning Tools", icon: "https://img.icons8.com/color/500/group.png", alt: "Workforce Planning Tools" },
          ],
          actions: {
            startLearning: "https://connectingdotserp.com/enquiry",
            downloadCurriculum: "/Curriculum/hr-analytics.pdf",
          },
        },
        {
          title: "Predictive HR Analytics",
          duration: "1 Month",
          content: [
            "Introduction to predictive modeling",
            "Forecasting employee turnover",
            "Predicting hiring needs",
            "Using machine learning in HR",
            "Improving decision-making with predictions",
          ],
          detailedContent: [
            "Overview of predictive analytics in HR",
            "Techniques for predicting turnover, hiring needs, and performance trends",
            "How machine learning enhances HR decisions",
            "Statistical models for HR analytics",
            "Case studies of predictive HR analytics applications",
          ],
          toolsAndTechnologies: [
            { name: "Python", icon: "https://img.icons8.com/color/500/python.png", alt: "Python" },
            { name: "R", icon: "https://img.icons8.com/fluency/500/r-project.png", alt: "R" },
            { name: "SPSS", icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755003970/spss_y94w3k.webp", alt: "SPSS" },
            { name: "Power BI", icon: "https://img.icons8.com/color/500/power-bi.png", alt: "Power BI" },
          ],
          actions: {
            startLearning: "https://connectingdotserp.com/enquiry",
            downloadCurriculum: "/Curriculum/hr-analytics.pdf",
          },
        },
      ],
    },
  ],
},


    // Data for Certificate Component
    certificate: {
      courseTitle: "HR Analytics Certificate",
      alt: "hr-analytics-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The HR Analytics Certification at Connecting Dots ERP focuses on using data to optimize HR processes. Learn to analyse workforce metrics, improve recruitment strategies, and enhance employee performance.",
      description:
        "This certification prepares you for the growing field of HR analytics, where data-driven decisions are critical.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for HR Analytics Training in {city}?",
      paragraphs: [
        "At Connecting Dots ERP, we offer an industry-aligned HR Analytics course that covers all the key areas of data-driven HR management. The course provides practical, hands-on experience in using analytical tools and interpreting HR data. You'll learn how to leverage data for improving recruitment, employee engagement, performance management, and workforce planning.",
        "Our HR Analytics training not only teaches you how to analyze HR data but also how to apply those insights to solve real-world HR challenges. We incorporate case studies, group projects, and simulation-based learning to ensure that you can confidently implement analytics in your HR role. The course fees are competitively priced, with flexible payment options and financial assistance available to make learning accessible.",
        "With expert mentors guiding you throughout the program, you'll receive personalized support as you develop your skills. Our curriculum emphasizes both technical and practical skills, ensuring you are fully prepared to use HR Analytics tools and techniques to enhance HR operations. Additionally, We have HR Analytics training with 100% placement assistance, helping you with career guidance, resume development, and interview preparation to secure roles in leading organizations.",
      ],
      listItem1Header: "What makes our HR Analytics training in {city} unique?",
      listItem1: [
        "Industry-aligned curriculum covering all key areas of data-driven HR management",
        "Practical, hands-on experience with analytical tools and real HR datasets",
        "Case studies, group projects, and simulation-based learning approach",
        "Competitively priced fees with flexible payment options and financial assistance",
        "Expert mentors providing personalized support throughout the program",
        "100% placement assistance with career guidance and interview preparation",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Who Should Join the HR Analytics Course in {city}?",
          answer:
            "This course is ideal for HR professionals, business analysts, data analysts, and anyone interested in learning how to leverage data for improving HR processes and decision-making.",
        },
        {
          question: "What is the Mode of Training for the HR Analytics Course?",
          answer:
            "The HR Analytics course in {city} is available in both online and classroom formats, providing flexibility to meet the needs of working professionals and students.",
        },
        {
          question:
            "What is the Fee Range for the HR Analytics training in {city}?",
          answer:
            "The fees for the HR Analytics training in {city} start from ₹50,000, depending on the course level, additional workshops, and the resources provided.",
        },
        {
          question:
            "Which Positions Can I Apply for After Completing the Course?",
          answer:
            "After completing the HR Analytics certification in {city}, you can apply for roles such as HR Analyst, People Analytics Specialist, Workforce Planning Analyst, and HR Business Partner.",
        },
        {
          question:
            "How Long Does It Take to Complete the HR Analytics Course in {city}?",
          answer:
            "The HR Analytics course in {city} typically takes 3 to 5 months to complete, depending on your pace and the format of the training.",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.5, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 89, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-03-10T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-12T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "hr-management": {
    // === BASIC COURSE INFO ===
    title: "HR Management", // Used in: Page titles, headers, SEO
    fullTitle: "Human Resource Management", // Used in: Page content, descriptions
    category: "hr", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "hr-management", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master HR Management in {city} with our comprehensive course. Learn strategic HR planning, talent management, employee relations, performance management, and leadership development. Our HR Management training in {city} offers hands-on experience with real HR scenarios, industry-relevant curriculum, and 100% placement support to help you build a successful career as an HR Manager.",
    metaTitle: "HR Management Course in {city} | Best HR Management Training", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master HR Management in {city}. Expert-led training in strategic HR, talent management, leadership. Real projects, certification & 100% placement. Launch your HR career now!",

    // === COURSE DETAILS ===
    duration: "3-6 months", // Used in: Course summary section, page content
    price: { min: 45000, max: 90000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Strategic HR Planning",
      "Talent Management & Development",
      "Performance Management Systems",
      "Employee Relations & Engagement",
      "Compensation & Benefits Management",
      "HR Analytics & Metrics",
      "Leadership Development",
      "Change Management",
      "HR Compliance & Legal Issues",
    ],
    prerequisites:
      "Basic understanding of business operations and management principles", // Used in: Course details
    certification: "Certified HR Management Professional", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "HR Manager",
      "HR Business Partner",
      "Talent Management Specialist",
      "Employee Relations Manager",
      "HR Director",
      "Organizational Development Manager",
      "HR Consultant",
      "People Operations Manager",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "HR Management Training in {city}",
      subtitle: "Join our complete HR Management Training in {city}",
      description:
        "Elevate your career with Connecting Dot's HR Management course in {city}, designed to provide in-depth knowledge and hands-on experience in managing human resources effectively. This course covers key areas such as employee recruitment, talent development, performance management, and compliance with labor laws, equipping you with the skills necessary to thrive in HR roles.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        {
          text: "Request Call back",
          courseName: "HR Management Training Program",
        },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why HR Management?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">HR Management</span>?',
          content:
            "HR Management involves the strategic planning, development, and management of an organization's workforce. It covers essential functions such as hiring, training, performance evaluation, employee relations, and compensation management. Learning HR Management in {city} equips you with the expertise to streamline HR processes, manage organizational talent, and contribute to a company's overall success.",
        },
        {
          title:
            'What Does <span class="highlight-span-cards">HR Management</span> Do?',
          content:
            "HR management is responsible for overseeing all aspects of human resources within an organization, including recruitment, training, performance evaluation, employee relations, and compliance with labor laws. HR managers work to align the company's goals with employee development and satisfaction, ensuring a productive and engaged workforce. They also handle policy-making and strategic planning related to human capital. Pursuing an HR management course equips individuals with the knowledge to lead teams, design HR strategies, and manage complex workforce challenges effectively.",
        },
        {
          title:
            'Why Take <span class="highlight-span-cards">HR Management</span> Training?',
          content:
            "As businesses grow, the need for skilled HR professionals to manage their workforce increases. This HR Management course in {city} provides a comprehensive understanding of HR operations and prepares you for roles such as:",
          listItems: [
            "HR Manager",
            "HR Generalist",
            "Talent Acquisition Specialist",
            "Employee Relations Manager",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
   modulesData : {
  title: "HR MANAGEMENT CURRICULUM",
  globalActions: {
    startLearning: "https://connectingdotserp.com/enquiry",
    downloadCurriculum: "/Curriculum/hr-management.pdf",
  },
  banner: {
    title: "Become an Expert in HR Management",
    subtitle: "From fundamentals to advanced strategy — all in one course.",
    image: "https://res.cloudinary.com/dudu879kr/image/upload/v1755005000/HRBanner_td8q4e.avif",
    technologies: [
      "HR Fundamentals",
      "Talent Management",
      "Performance Management",
      "Strategic HR Leadership",
      "HR Analytics & Compliance",
    ],
  },
  tabs: [
    {
      modules: [
        {
          title: "HR Fundamentals & Strategic Planning",
          duration: "1 Month",
          content: [
            "Introduction to HRM and its strategic role",
            "HR planning and workforce forecasting",
            "Organizational structure and HR alignment",
            "Key HR metrics and KPIs",
            "Employment law basics and compliance",
          ],
          detailedContent: [
            "Understanding HR's contribution to organizational goals",
            "Methods for workforce planning and forecasting",
            "Designing organizational structures for efficiency",
            "Identifying and tracking core HR KPIs",
            "Ensuring HR compliance with legal requirements",
          ],
          toolsAndTechnologies: [
            { name: "MS Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "MS Excel" },
            { name: "Google Sheets", icon: "https://img.icons8.com/color/500/google-sheets.png", alt: "Google Sheets" },
            { name: "HRMS Software", icon: "https://img.icons8.com/color/500/group.png", alt: "HRMS" },
            { name: "Power BI", icon: "https://img.icons8.com/color/500/power-bi.png", alt: "Power BI" },
          ],
          actions: {
            startLearning: "https://connectingdotserp.com/enquiry",
            downloadCurriculum: "/Curriculum/hr-management.pdf",
          },
        },
        {
          title: "Talent Management & Development",
          duration: "1 Month",
          content: [
            "Talent acquisition and recruitment planning",
            "Employee onboarding processes",
            "Training and development design",
            "Career and succession planning",
            "Employee engagement strategies",
          ],
          detailedContent: [
            "Sourcing and selecting the right talent",
            "Designing smooth onboarding experiences",
            "Developing training programs for skill growth",
            "Building succession pipelines for key roles",
            "Improving retention through engagement initiatives",
          ],
          toolsAndTechnologies: [
            { name: "LinkedIn Recruiter", icon: "https://img.icons8.com/color/500/linkedin.png", alt: "LinkedIn Recruiter" },
            { name: "MS Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "MS Excel" },
            { name: "LMS Platforms", icon: "https://img.icons8.com/color/500/training.png", alt: "LMS Platforms" },
            { name: "Google Forms", icon: "https://img.icons8.com/color/500/google-forms.png", alt: "Google Forms" },
          ],
          actions: {
            startLearning: "https://connectingdotserp.com/enquiry",
            downloadCurriculum: "/Curriculum/hr-management.pdf",
          },
        },
        {
          title: "Performance & Employee Relations",
          duration: "1 Month",
          content: [
            "Performance appraisal systems",
            "Goal setting and performance planning",
            "Conflict resolution in workplace",
            "Grievance handling procedures",
            "Team building and culture development",
          ],
          detailedContent: [
            "Creating fair and measurable performance systems",
            "Using SMART goals for performance planning",
            "Mediation techniques for resolving disputes",
            "Steps for handling grievances effectively",
            "Developing a strong and positive work culture",
          ],
          toolsAndTechnologies: [
            { name: "MS Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "MS Excel" },
            { name: "Slack", icon: "https://img.icons8.com/color/500/slack-new.png", alt: "Slack" },
            { name: "HRMS", icon: "https://img.icons8.com/color/500/group.png", alt: "HRMS" },
            { name: "Google Workspace", icon: "https://img.icons8.com/color/500/google-logo.png", alt: "Google Workspace" },
          ],
          actions: {
            startLearning: "https://connectingdotserp.com/enquiry",
            downloadCurriculum: "/Curriculum/hr-management.pdf",
          },
        },
        {
          title: "Strategic HR Leadership",
          duration: "1.5 Months",
          content: [
            "Strategic HR alignment with business goals",
            "Change management strategies",
            "Leadership styles in HR",
            "Problem-solving in HR operations",
            "Building high-performance cultures",
          ],
          detailedContent: [
            "Aligning HR strategy with company objectives",
            "Managing change with minimal disruption",
            "Adapting leadership styles for different teams",
            "Decision-making frameworks for HR challenges",
            "Fostering productivity through culture building",
          ],
          toolsAndTechnologies: [
            { name: "MS Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "MS Excel" },
            { name: "Trello", icon: "https://img.icons8.com/color/500/trello.png", alt: "Trello" },
            { name: "Power BI", icon: "https://img.icons8.com/color/500/power-bi.png", alt: "Power BI" },
            { name: "Google Slides", icon: "https://img.icons8.com/color/500/google-slides.png", alt: "Google Slides" },
          ],
          actions: {
            startLearning: "https://connectingdotserp.com/enquiry",
            downloadCurriculum: "/Curriculum/hr-management.pdf",
          },
        },
        {
          title: "HR Analytics & Compliance",
          duration: "1.5 Months",
          content: [
            "Advanced employment law compliance",
            "Risk management in HR",
            "Diversity and inclusion strategies",
            "Global HR management",
            "Mergers and restructuring in HR",
          ],
          detailedContent: [
            "Keeping HR practices compliant with regulations",
            "Identifying and mitigating HR risks",
            "Implementing DEI programs effectively",
            "Managing HR across multiple countries",
            "Handling HR in mergers and acquisitions",
          ],
          toolsAndTechnologies: [
            { name: "Power BI", icon: "https://img.icons8.com/color/500/power-bi.png", alt: "Power BI" },
            { name: "MS Excel", icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png", alt: "MS Excel" },
            { name: "HRMS", icon: "https://img.icons8.com/color/500/group.png", alt: "HRMS" },
            { name: "Tableau", icon: "https://img.icons8.com/color/500/tableau-software.png", alt: "Tableau" },
          ],
          actions: {
            startLearning: "https://connectingdotserp.com/enquiry",
            downloadCurriculum: "/Curriculum/hr-management.pdf",
          },
        },
      ],
    },
  ],
},


    // Data for Certificate Component
    certificate: {
      courseTitle: "HR Management Certificate",
      alt: "hr-management-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "The HR Management Certification at Connecting Dots ERP offers advanced training in strategic HR practices, such as workforce planning, talent management, and leadership development.",
      description:
        "This certification prepares you for managerial roles in HR, focusing on aligning HR strategies with business goals.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for HR Management Training in {city}?",
      paragraphs: [
        "At Connecting Dots ERP, we provide a thorough, industry-relevant HR Management training program in {city}. The course covers all facets of human resource management, from recruitment and employee development to compliance and performance evaluation. Whether you are a fresh graduate or an experienced professional looking to upskill, this HR Management certification in {city} will provide you with both theoretical knowledge and practical skills to thrive in today's dynamic HR environment.",
        "Our HR Management classes in {city} emphasize real-world application through case studies, group projects, and interactive workshops. You'll gain insights into best practices in hiring, employee retention, and performance management, while also learning how to implement HR strategies that align with an organization's goals. The course fees are competitively priced, with flexible payment options available to ensure that learners from all backgrounds can access the training.",
        "With mentorship from industry experts and an interactive curriculum, you will receive personalized guidance to ensure your success. Our hands-on training focuses on helping you understand and manage the complexities of human resource functions, from recruitment to conflict resolution. Additionally, our HR Management course with 100% placement assistance provides support in job searching, resume preparation, and interview skills to help you secure HR roles in top companies.",
      ],
      listItem1Header:
        "What makes our HR Management training in {city} unique?",
      listItem1: [
        "Comprehensive curriculum covering strategic HR planning and leadership development",
        "Real-world application through case studies, group projects, and interactive workshops",
        "Competitively priced fees with flexible payment options for all backgrounds",
        "Mentorship from industry experts with personalized guidance throughout",
        "Hands-on training in complex HR functions from recruitment to conflict resolution",
        "100% placement assistance with job search support and interview preparation",
      ],
      listItemAfterIndex: 2, // Insert list after paragraph index 2
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Who Should Join the HR Management Course in {city}?",
          answer:
            "This course is ideal for aspiring HR professionals, current HR employees looking to upskill, recent graduates, and professionals wanting to switch to a career in Human Resource Management.",
        },
        {
          question:
            "What is the Mode of Training for the HR Management Course?",
          answer:
            "The HR Management training in {city} is available in both online and classroom formats, offering flexibility to accommodate the needs of students, working professionals, and job seekers.",
        },
        {
          question:
            "What is the Fee Range for the HR Management Course in {city}?",
          answer:
            "The fees for the HR Management course fees in {city} start from ₹45,000, depending on the course structure, duration, and additional resources like workshops or career support provided.",
        },
        {
          question:
            "Which Positions Can I Apply for After Completing the Course?",
          answer:
            "Upon completing the HR Management certification in {city}, you can apply for roles such as HR Manager, HR Generalist, Talent Acquisition Specialist, Employee Relations Manager, and more.",
        },
        {
          question:
            "How Long Does It Take to Complete the HR Management Course in {city}?",
          answer:
            "The HR Management course in {city} typically takes 3 to 6 months to complete, depending on your pace and the format of the training.",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.5, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 89, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-03-10T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-12T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  "hr-payroll": {
    // === BASIC COURSE INFO ===
    title: "HR Payroll", // Used in: Page titles, headers, SEO
    fullTitle: "HR Payroll Management & Administration", // Used in: Page content, descriptions
    category: "hr", // Used in: JSON-LD breadcrumbs, URL structure
    slug: "hr-payroll", // Used in: URL generation, routing

    // === SEO META DATA ===
    // Used in: @type:webpage, @type:course, general page descriptions
    description:
      "Master HR Payroll management in {city} with our comprehensive course. Learn payroll processing, tax compliance, employee benefits, statutory deductions, and payroll software. Our HR Payroll training in {city} offers hands-on experience with real payroll scenarios, industry-relevant curriculum, and 100% placement support to help you build a successful career in payroll administration.",
    metaTitle: "HR Payroll Course in {city} | Best Payroll Management Training", // Used in: <title> tag, OpenGraph
    // Used in: <meta description>, OpenGraph, Twitter Cards
    metaDescription:
      "Master HR Payroll in {city}. Expert-led training in payroll processing, tax compliance, benefits administration. Real projects, certification & 100% placement. Launch your payroll career now!",

    // === COURSE DETAILS ===
    duration: "3-5 months", // Used in: Course summary section, page content
    price: { min: 40000, max: 85000 }, // Used in: JSON-LD "@type":"PriceSpecification"
    modules: [
      // Used in: Course summary, keywords generation, page content
      "Payroll Processing & Administration",
      "Tax Compliance & Statutory Deductions",
      "Employee Benefits Management",
      "Payroll Software & HRIS Systems",
      "Labor Law & Compliance",
      "Compensation Structure Design",
      "Payroll Accounting & Reporting",
      "Employee Data Management",
      "Audit & Risk Management",
    ],
    prerequisites:
      "Basic understanding of HR processes and accounting principles", // Used in: Course details
    certification: "Certified HR Payroll Professional", // Used in: Course details, JSON-LD
    jobRoles: [
      // Used in: Keywords generation, career section, page content
      "Payroll Specialist",
      "HR Payroll Administrator",
      "Payroll Compliance Officer",
      "Compensation and Benefits Manager",
      "Payroll Analyst",
      "HRIS Administrator",
      "Payroll Coordinator",
      "Benefits Administrator",
    ],

    // === COMPONENT DATA ===
    // Data for Header Component (DSHeader)
    header: {
      title: "Advance HR Payroll Training in {city}",
      subtitle: "Join our Project-based HR Payroll Training in {city}",
      description:
        "Advance your career with Connecting Dot's HR Payroll course in {city}, meticulously designed to provide you with the essential skills to excel in payroll management within Human Resource Management. This practical, hands-on training focuses on vital areas like payroll processing, tax compliance, employee benefits, and HR systems, equipping you to efficiently manage payroll functions in any organization.",
      backgroundVideo: "https://i.imgur.com/DpOvcpk.mp4",
      features: ["Live Class", "1:1 mentorship", "Industry projects"],
      alumni: [
        // Used in: Header carousel/logos
        { name: "Cognizant", logo: "/Headercarousel/cognizant1.avif" },
        { name: "Delloite", logo: "/Headercarousel/deloitte.avif" },
        { name: "Infosys", logo: "/Headercarousel/infosys2.avif" },
        { name: "IBM", logo: "/Headercarousel/ibm1.avif" },
        { name: "TCS", logo: "/Headercarousel/tcs1.avif" },
      ],
      buttons: [
        {
          text: "Request Call back",
          courseName: "HR Payroll Training Program",
        },
        { text: "Download Syllabus", courseName: "Book Live Demo" },
      ],
      form: {
        // Used in: Header form component
        title: "Book a FREE live class",
        inputs: [
          { type: "text", name: "name", placeholder: "Enter your name" },
          { type: "email", name: "email", placeholder: "Enter your Email" },
          { type: "text", name: "year", placeholder: "Year of Passing" },
          {
            type: "tel",
            name: "contactname",
            placeholder: "Enter your phone number",
            countryCode: "+91",
          },
        ],
        submitText: "Book Live Class",
      },
    },

    // Data for Why Component
    why: {
      title: "Why HR Payroll?",
      cards: [
        {
          title:
            'What is <span class="highlight-span-cards">HR Payroll</span>?',
          content:
            "HR Payroll refers to the specific function within Human Resource Management that deals with calculating employee wages, processing paychecks, managing deductions, and ensuring compliance with tax regulations. Effective payroll management is a crucial aspect of maintaining employee satisfaction and adhering to labor laws. By enrolling in HR Payroll training in {city}, you will develop the competencies needed to oversee payroll functions, manage employee compensation, and ensure smooth payroll operations within an organization.",
        },
        {
          title:
            'What Does <span class="highlight-span-cards">HR Payroll</span> Do?',
          content:
            "HR payroll involves managing the process of compensating employees, ensuring accurate salary distribution, handling tax deductions, and maintaining payroll records. Professionals in this field ensure that employees are paid correctly and on time, adhering to legal requirements regarding benefits, bonuses, and deductions. They also work closely with accounting and finance teams to manage payroll-related financial aspects. An HR payroll course helps individuals develop the expertise needed to efficiently handle payroll systems and compliance with taxation and labor regulations.",
        },
        {
          title:
            'Why Take <span class="highlight-span-cards">HR Payroll</span> Training?',
          content:
            "Skilled payroll professionals are highly sought after as businesses across industries must maintain accurate payroll systems and ensure compliance with evolving tax laws. Our HR Payroll course in {city} prepares you for roles such as:",
          listItems: [
            "Payroll Specialist",
            "HR Payroll Administrator",
            "Payroll Compliance Officer",
            "Compensation and Benefits Manager",
          ],
        },
      ],
    },

    // Data for Modules Component (course-specific curriculum)
   modulesData : {
  title: "HR PAYROLL CURRICULUM",
  globalActions: {
    startLearning: "https://example.com/start-learning-hr-payroll",
    downloadCurriculum:
      "https://example.com/download-curriculum-hr-payroll",
  },
  banner: {
    title: "Looking for HR Courses?",
    subtitle: "No need to Google 10 tabs — everything's listed right here.",
    image:
      "https://res.cloudinary.com/dudu879kr/image/upload/v1755005000/HRBanner_td8q4e.avif",
    technologies: [
      "Payroll",
      "Tax Compliance",
      "Benefits",
      "HRIS",
      "SAP",
      "Oracle",
      "QuickBooks",
    ],
  },
  tabs: [
    {
      modules: [
        {
          title: "Payroll Fundamentals & Processing",
          duration: "1 Month",
          content: [
            "Introduction to payroll management and its importance in HR",
            "Understanding payroll cycles and processing timelines",
            "Employee data collection and verification procedures",
            "Basic salary calculations and wage structures",
            "Time and attendance tracking systems",
            "Payroll documentation and record keeping requirements",
          ],
          detailedContent: [
            "Overview of payroll management concepts",
            "Detailed payroll cycle steps and process mapping",
            "HR data management best practices",
            "Salary breakup structures with examples",
            "Integration of time tracking with payroll",
            "Legal requirements for payroll documentation",
          ],
          toolsAndTechnologies: [
            {
              name: "SAP SuccessFactors Payroll",
              icon: "https://img.icons8.com/color/500/sap.png",
              alt: "SAP SuccessFactors Payroll",
            },
            {
              name: "Oracle PeopleSoft HCM",
              icon: "https://img.icons8.com/color/500/oracle-logo.png",
              alt: "Oracle PeopleSoft HCM",
            },
            {
              name: "ADP Workforce Now",
              icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755003316/adp_ga50a9.webp",
              alt: "ADP Workforce Now",
            },
            {
              name: "QuickBooks Payroll",
              icon: "https://img.icons8.com/dusk/100/quickbooks.png",
              alt: "QuickBooks Payroll",
            },
          ],
          actions: {
            startLearning:
              "https://example.com/start-learning-payroll-fundamentals",
            downloadCurriculum:
              "https://example.com/download-curriculum-payroll-fundamentals",
          },
        },
        {
          title: "Tax Compliance & Statutory Deductions",
          duration: "1 Month",
          content: [
            "Income tax calculations and TDS procedures",
            "Provident Fund (PF) and Employee State Insurance (ESI) compliance",
            "Professional tax and other statutory deductions",
            "Form 16 generation and tax filing procedures",
            "Annual tax planning and investment declarations",
            "Compliance with labor laws and tax regulations",
          ],
          detailedContent: [
            "Step-by-step TDS deduction process",
            "PF & ESI registration and filing",
            "Professional tax compliance for different states",
            "Form 16 generation workflow",
            "Year-end tax reconciliation",
            "Audit readiness for payroll taxes",
          ],
          toolsAndTechnologies: [
            {
              name: "ClearTax",
              icon: "https://img.icons8.com/color/500/tax.png",
              alt: "ClearTax",
            },
            {
              name: "Tally ERP",
              icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755002296/tallyerp_jtv9cd.webp",
              alt: "Tally ERP",
            },
            {
              name: "Excel",
              icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png",
              alt: "Excel",
            },
            {
              name: "QuickBooks Payroll",
              icon: "https://img.icons8.com/dusk/100/quickbooks.png",
              alt: "QuickBooks Payroll",
            },
          ],
          actions: {
            startLearning:
              "https://example.com/start-learning-tax-compliance",
            downloadCurriculum:
              "https://example.com/download-curriculum-tax-compliance",
          },
        },
        {
          title: "Benefits Administration & Reporting",
          duration: "1 Month",
          content: [
            "Employee benefits management and administration",
            "Leave management and leave encashment calculations",
            "Bonus and incentive calculations",
            "Reimbursement processing and expense management",
            "Payroll reporting and MIS generation",
            "Basic payroll software operations and data entry",
          ],
          detailedContent: [
            "Defining benefits policies",
            "Leave balance tracking",
            "Annual bonus computation",
            "Expense reimbursement workflow",
            "Generating payroll MIS reports",
            "Hands-on payroll software usage",
          ],
          toolsAndTechnologies: [
            {
              name: "Zoho People",
              icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755000268/zohopeople_r6psyf.webp",
              alt: "Zoho People",
            },
            {
              name: "BambooHR",
              icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1754997923/bamboo_HR_yb7hqs.webp",
              alt: "BambooHR",
            },
            {
              name: "Excel",
              icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png",
              alt: "Excel",
            },
            {
              name: "QuickBooks Payroll",
              icon: "https://img.icons8.com/dusk/100/quickbooks.png",
              alt: "QuickBooks Payroll",
            },
          ],
          actions: {
            startLearning:
              "https://example.com/start-learning-benefits-admin",
            downloadCurriculum:
              "https://example.com/download-curriculum-benefits-admin",
          },
        },
        {
          title: "Compliance with Labor Laws",
          duration: "1 Month",
          content: [
            "Understanding key labor laws affecting payroll",
            "Minimum Wages Act and compliance",
            "Payment of Wages Act procedures",
            "Gratuity calculation and compliance",
            "Maternity and paternity benefits",
            "ESI and PF related inspections",
          ],
          detailedContent: [
            "Overview of labor law requirements",
            "Handling compliance audits",
            "Gratuity eligibility & payout process",
            "Mandatory benefits under law",
            "Dealing with inspectors and notices",
            "Maintaining compliance records",
          ],
          toolsAndTechnologies: [
            {
              name: "India Code Portal",
              icon: "https://img.icons8.com/color/500/law.png",
              alt: "India Code Portal",
            },
            {
              name: "Excel",
              icon: "https://img.icons8.com/color/500/microsoft-excel-2019--v1.png",
              alt: "Excel",
            },
            {
              name: "Tally ERP",
              icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755002296/tallyerp_jtv9cd.webp",
              alt: "Tally ERP",
            },
            {
              name: "QuickBooks Payroll",
              icon: "https://img.icons8.com/dusk/100/quickbooks.png",
              alt: "QuickBooks Payroll",
            },
          ],
          actions: {
            startLearning:
              "https://example.com/start-learning-labor-laws",
            downloadCurriculum:
              "https://example.com/download-curriculum-labor-laws",
          },
        },
        {
          title: "Advanced Payroll Systems & Software",
          duration: "1.5 Months",
          content: [
            "Advanced HRIS and payroll software management",
            "Payroll system configuration and customization",
            "Integration of payroll with other HR modules",
            "Automated payroll processing and workflow management",
            "Data migration and system implementation",
            "Troubleshooting and system maintenance procedures",
          ],
          detailedContent: [
            "Advanced payroll software features",
            "Customization for organizational needs",
            "System integration best practices",
            "Automation scripts for payroll processing",
            "Migrating data securely",
            "Preventive maintenance for payroll systems",
          ],
          toolsAndTechnologies: [
            {
              name: "SAP SuccessFactors Payroll",
              icon: "https://img.icons8.com/color/500/sap.png",
              alt: "SAP SuccessFactors Payroll",
            },
            {
              name: "Oracle PeopleSoft HCM",
              icon: "https://img.icons8.com/color/500/oracle-logo.png",
              alt: "Oracle PeopleSoft HCM",
            },
            {
              name: "ADP Workforce Now",
              icon: "https://res.cloudinary.com/dudu879kr/image/upload/v1755003316/adp_ga50a9.webp",
              alt: "ADP Workforce Now",
            },
            {
              name: "QuickBooks Payroll",
              icon: "https://img.icons8.com/dusk/100/quickbooks.png",
              alt: "QuickBooks Payroll",
            },
          ],
          actions: {
            startLearning:
              "https://example.com/start-learning-advanced-payroll",
            downloadCurriculum:
              "https://example.com/download-curriculum-advanced-payroll",
          },
        },
      ],
    },
  ],
},

    // Data for Certificate Component
    certificate: {
      courseTitle: "HR Payroll Certificate",
      alt: "hr-payroll-certification-from-connecting-dots-erp",
      image: "/Certificate/Certificate-1.avif",
      completionText:
        "At Connecting Dots ERP, the HR Payroll Certification teaches you the intricacies of payroll management.",
      description:
        "From handling salary calculations to statutory compliances, this certification ensures you are well-prepared to manage payroll functions in any organization efficiently.",
    },

    // Data for Description Component
    descriptionContent: {
      title:
        "Why Choose Connecting Dots ERP for HR Payroll Training in {city}?",
      paragraphs: [
        "At Connecting Dots ERP, we offer an in-depth, industry-focused HR Payroll training program in {city}. It covers all aspects of payroll management, from processing salaries and deductions to handling payroll compliance and benefits administration. Whether you're new to the field or looking to upgrade your current skills, our HR Payroll certification in {city} offers hands-on experience and a solid foundation in payroll systems, labor law compliance, and HR software.",
        "Our course not only emphasizes theoretical knowledge but also integrates real-world applications through practical exercises and case studies. You'll learn how to handle payroll software, comply with legal requirements, and ensure accurate, timely payroll processing. The HR Payroll course fees in {city} are structured to be affordable, with flexible payment options and financial assistance available to ensure learners from all backgrounds can access high-quality training.",
        "With the guidance of experienced HR professionals and a meticulously designed curriculum, you'll receive personalized support throughout your learning journey. Our HR Payroll classes in {city} focus on practical applications, allowing you to manage payroll systems and resolve payroll-related issues efficiently. From processing paychecks to understanding tax laws, you will be equipped with the expertise to meet the demands of modern payroll roles.",
        "Moreover, our program emphasizes teamwork and collaborative learning through group projects, simulations, and problem-solving workshops. These activities help build your decision-making and critical thinking skills—key traits in today's fast-paced HR environments. A standout feature of our HR Payroll training with 100% placement assistance, providing you with career guidance, resume preparation, and interview coaching, as well as direct placement opportunities with leading companies. Whether you're aiming to become a Payroll Specialist or a Compensation and Benefits Manager, this course offers the knowledge, skills, and placement support to help you achieve success in the HR payroll field.",
      ],
      listItem1Header: "What makes our HR Payroll training in {city} unique?",
      listItem1: [
        "In-depth, industry-focused curriculum covering all aspects of payroll management",
        "Real-world applications through practical exercises and case studies",
        "Affordable fees with flexible payment options and financial assistance",
        "Personalized support from experienced HR professionals throughout the journey",
        "Focus on practical applications for managing payroll systems efficiently",
        "100% placement assistance with career guidance and interview coaching",
      ],
      listItemAfterIndex: 3, // Insert list after paragraph index 3
      paragraphsAfterList: [], // No additional paragraphs after the list
    },

    // Data for FAQ Component
    faq: {
      title: "Frequently Asked Questions",
      video: "https://i.imgur.com/I7XKkrq.mp4",
      items: [
        {
          question: "Who Should Join the HR Payroll Course in {city}?",
          answer:
            "This course is ideal for HR professionals, accountants, finance personnel, and anyone interested in specializing in payroll management or advancing their skills in payroll processing.",
        },
        {
          question: "What is the Mode of Training for the HR Payroll Course?",
          answer:
            "The HR Payroll training in {city} is available in both online and classroom formats, offering flexibility for students, working professionals, and job seekers.",
        },
        {
          question:
            "What is the Fee Range for the HR Payroll Course in {city}?",
          answer:
            "The fees for the HR Payroll course in {city} start from ₹40,000, depending on the course structure, certification level, and additional resources provided, such as workshops and job support.",
        },
        {
          question:
            "Which Positions Can I Apply for After Completing the Course?",
          answer:
            "After completing the HR Payroll certification in {city}, you can apply for positions such as Payroll Specialist, Payroll Administrator, Compensation and Benefits Manager, and Payroll Compliance Officer.",
        },
        {
          question:
            "How Long Does It Take to Complete the HR Payroll Course in {city}?",
          answer:
            "The HR Payroll course in {city} typically takes 3 to 5 months to complete, depending on your learning pace and the training format chosen.",
        },
      ],
    },

    // === JSON-LD SCHEMA DATA ===
    // These are used for rich snippets and SEO
    defaultRating: 4.7, // Used in: JSON-LD aggregateRating (for cities without offices)
    defaultReviewCount: 78, // Used in: JSON-LD aggregateRating (for cities without offices)
    publishedAt: "2025-04-05T00:00:00Z", // Used in: JSON-LD WebPage datePublished
    updatedAt: "2025-07-12T00:00:00Z", // Used in: JSON-LD WebPage dateModified
  },

  // You can add more courses here following the same structure
};

export const citiesData = {
  // === CITIES WITH OFFICES ===

  pune: {
    // === BASIC CITY INFO ===
    name: "Pune", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address, LocalBusiness schema
    hasOffice: true, // Used in: Conditional rendering logic, JSON-LD schema selection
    coordinates: { lat: 18.5863803, lng: 73.7814047 }, // Used in: JSON-LD GeoCoordinates

    // === OFFICE DATA (only for cities with hasOffice: true) ===
    office: {
      address:
        "1st Floor,101, Police, Wireless Colony, Vishal Nagar, Pimple Nilakh, Pune, Pimpri-Chinchwad, Maharashtra 411027", // Used in: JSON-LD "@type":"LocalBusiness" address
      phone: "+919004002941", // Used in: JSON-LD LocalBusiness telephone, contact info
      email: "pune@connectingdotserp.com", // Used in: Contact information
      hours: { open: "08:00", close: "20:00" }, // Used in: JSON-LD OpeningHoursSpecification
      rating: 4.7, // Used in: JSON-LD aggregateRating
      reviewCount: 403, // Used in: JSON-LD aggregateRating
      mapUrl: "https://maps.app.goo.gl/apH8RoQ6551xZD3w6", // Used in: JSON-LD hasMap, office content
      postalCode: "411027", // Used in: JSON-LD PostalAddress
      instructor: "Archana", // Used in: JSON-LD CourseInstance instructor
    },

    // === SEO DATA ===
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      geoPosition: "18.58743790026325;73.78149053049741", // Used in: JSON-LD geo coordinates, ICBM meta tag
      priceRange: "30000-200000", // Used in: JSON-LD "@type":"LocalBusiness" priceRange
      timezone: "Asia/Kolkata", // Used in: General reference (can be used for scheduling)
    },
  },

  mumbai: {
    // === BASIC CITY INFO ===
    name: "Mumbai", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address, LocalBusiness schema
    hasOffice: true, // Used in: Conditional rendering logic, JSON-LD schema selection
    coordinates: { lat: 19.1876097, lng: 72.9752467 }, // Used in: JSON-LD GeoCoordinates

    // === OFFICE DATA (only for cities with hasOffice: true) ===
    office: {
      address:
        "Office No. 806, 8th Floor, Paradise Tower, next to MCDonalds, Naupada, Thane West, Mumbai, Thane, Maharashtra 400601", // Used in: JSON-LD "@type":"LocalBusiness" address
      phone: "+919004001938", // Used in: JSON-LD LocalBusiness telephone, contact info
      email: "mumbai@connectingdotserp.com", // Used in: Contact information
      hours: { open: "09:00", close: "21:00" }, // Used in: JSON-LD OpeningHoursSpecification
      rating: 4.8, // Used in: JSON-LD aggregateRating
      reviewCount: 56, // Used in: JSON-LD aggregateRating
      mapUrl: "https://maps.app.goo.gl/mQ13CkQSAcMTbeh96", // Used in: JSON-LD hasMap, office content
      postalCode: "400601", // Used in: JSON-LD PostalAddress
      instructor: "Ravi", // Used in: JSON-LD CourseInstance instructor
    },

    // === SEO DATA ===
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      geoPosition: "19.201375381925807;72.97502413356385", // Used in: JSON-LD geo coordinates, ICBM meta tag
      priceRange: "35000-185000", // Used in: JSON-LD "@type":"LocalBusiness" priceRange
      timezone: "Asia/Kolkata", // Used in: General reference (can be used for scheduling)
    },
  },

  raipur: {
    // === BASIC CITY INFO ===
    name: "Raipur", // Used in: All content replacement, titles, descriptions
    state: "Chhattisgarh", // Used in: JSON-LD address, LocalBusiness schema
    hasOffice: true, // Used in: Conditional rendering logic, JSON-LD schema selection
    coordinates: { lat: 21.2373024, lng: 81.653947 }, // Used in: JSON-LD GeoCoordinates

    // === OFFICE DATA (only for cities with hasOffice: true) ===
    office: {
      address:
        "G-54, New Panchsheel Nagar, Civil Lines, Raipur, Chhattisgarh 492001", // Used in: JSON-LD "@type":"LocalBusiness" address
      phone: "+919325701555", // Used in: JSON-LD LocalBusiness telephone, contact info
      email: "raipur@connectingdotserp.com", // Used in: Contact information
      hours: { open: "08:00", close: "20:00" }, // Used in: JSON-LD OpeningHoursSpecification
      rating: 5.0, // Used in: JSON-LD aggregateRating
      reviewCount: 31, // Used in: JSON-LD aggregateRating
      mapUrl: "https://maps.app.goo.gl/MpkCdwPHhmN5Kkzo8", // Used in: JSON-LD hasMap, office content
      postalCode: "492001", // Used in: JSON-LD PostalAddress
      instructor: "Amol Patil", // Used in: JSON-LD CourseInstance instructor
    },

    // === SEO DATA ===
    seoData: {
      geoRegion: "IN-CG", // Used in: JSON-LD metadata, geo meta tags
      geoPosition: "21.2375225749676;81.65421950344226", // Used in: JSON-LD geo coordinates, ICBM meta tag
      priceRange: "30000-200000", // Used in: JSON-LD "@type":"LocalBusiness" priceRange
      timezone: "Asia/Kolkata", // Used in: General reference (can be used for scheduling)
    },
  },

  // === CITIES WITHOUT OFFICES ===
  // These cities don't have physical offices, so they don't include office data

  delhi: {
    name: "Delhi", // Used in: All content replacement, titles, descriptions
    state: "Delhi", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 28.7041, lng: 77.1025 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-DL", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "40000-180000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  kolkata: {
    name: "Kolkata", // Used in: All content replacement, titles, descriptions
    state: "West Bengal", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 22.5726, lng: 88.3639 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-WB", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "30000-150000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  chennai: {
    name: "Chennai", // Used in: All content replacement, titles, descriptions
    state: "Tamil Nadu", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 13.0827, lng: 80.2707 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-TN", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "30000-160000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  bangalore: {
    name: "Bangalore", // Used in: All content replacement, titles, descriptions
    state: "Karnataka", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 12.9716, lng: 77.5946 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-KA", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "35000-170000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  hyderabad: {
    name: "Hyderabad", // Used in: All content replacement, titles, descriptions
    state: "Telangana", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 17.385, lng: 78.4867 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-TG", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "32000-165000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  ahmedabad: {
    name: "Ahmedabad", // Used in: All content replacement, titles, descriptions
    state: "Gujarat", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 23.0225, lng: 72.5714 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-GJ", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "28000-145000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  jaipur: {
    name: "Jaipur", // Used in: All content replacement, titles, descriptions
    state: "Rajasthan", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 26.9124, lng: 75.7873 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-RJ", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "26000-135000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  lucknow: {
    name: "Lucknow", // Used in: All content replacement, titles, descriptions
    state: "Uttar Pradesh", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 26.8467, lng: 80.9462 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-UP", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "25000-130000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  kanpur: {
    name: "Kanpur", // Used in: All content replacement, titles, descriptions
    state: "Uttar Pradesh", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 26.4499, lng: 80.3319 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-UP", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "24000-125000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  nagpur: {
    name: "Nagpur", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 21.1458, lng: 79.0882 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "26000-140000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  patna: {
    name: "Patna", // Used in: All content replacement, titles, descriptions
    state: "Bihar", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 25.5941, lng: 85.1376 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-BR", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "22000-115000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  indore: {
    name: "Indore", // Used in: All content replacement, titles, descriptions
    state: "Madhya Pradesh", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 22.7196, lng: 75.8577 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MP", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "25000-135000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  bhopal: {
    name: "Bhopal", // Used in: All content replacement, titles, descriptions
    state: "Madhya Pradesh", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 23.2599, lng: 77.4126 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MP", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "24000-130000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  visakhapatnam: {
    name: "Visakhapatnam", // Used in: All content replacement, titles, descriptions
    state: "Andhra Pradesh", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 17.6868, lng: 83.2185 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-AP", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "26000-140000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  vadodara: {
    name: "Vadodara", // Used in: All content replacement, titles, descriptions
    state: "Gujarat", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 22.3072, lng: 73.1812 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-GJ", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "27000-142000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  ludhiana: {
    name: "Ludhiana", // Used in: All content replacement, titles, descriptions
    state: "Punjab", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 30.901, lng: 75.8573 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-PB", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "28000-145000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  agra: {
    name: "Agra", // Used in: All content replacement, titles, descriptions
    state: "Uttar Pradesh", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 27.1767, lng: 78.0081 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-UP", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "25000-120000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  nashik: {
    name: "Nashik", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 19.9975, lng: 73.7898 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "26000-138000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  rajkot: {
    name: "Rajkot", // Used in: All content replacement, titles, descriptions
    state: "Gujarat", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 22.3039, lng: 70.8022 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-GJ", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "25000-135000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  varanasi: {
    name: "Varanasi", // Used in: All content replacement, titles, descriptions
    state: "Uttar Pradesh", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 25.3176, lng: 82.9739 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-UP", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "23000-118000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  kerala: {
    name: "Kerala", // Used in: All content replacement, titles, descriptions
    state: "Kerala", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 10.8505, lng: 76.2711 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-KL", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "28000-148000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  surat: {
    name: "Surat", // Used in: All content replacement, titles, descriptions
    state: "Gujarat", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 21.1702, lng: 72.8311 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-GJ", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "27000-142000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  dehradun: {
    name: "Dehradun", // Used in: All content replacement, titles, descriptions
    state: "Uttarakhand", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 30.3165, lng: 78.0322 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-UT", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "26000-138000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  madurai: {
    name: "Madurai", // Used in: All content replacement, titles, descriptions
    state: "Tamil Nadu", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 9.9252, lng: 78.1198 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-TN", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "24000-128000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  mysore: {
    name: "Mysore", // Used in: All content replacement, titles, descriptions
    state: "Karnataka", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 12.2958, lng: 76.6394 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-KA", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "25000-132000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  pondicherry: {
    name: "Pondicherry", // Used in: All content replacement, titles, descriptions
    state: "Puducherry", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 11.9416, lng: 79.8083 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-PY", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "26000-135000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  ranchi: {
    name: "Ranchi", // Used in: All content replacement, titles, descriptions
    state: "Jharkhand", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 23.3441, lng: 85.3096 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-JH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "23000-120000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  coimbatore: {
    name: "Coimbatore", // Used in: All content replacement, titles, descriptions
    state: "Tamil Nadu", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 11.0168, lng: 76.9558 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-TN", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "26000-138000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  chandigarh: {
    name: "Chandigarh", // Used in: All content replacement, titles, descriptions
    state: "Chandigarh", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 30.7333, lng: 76.7794 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-CH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "29000-148000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  bhubaneswar: {
    name: "Bhubaneswar", // Used in: All content replacement, titles, descriptions
    state: "Odisha", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 20.2961, lng: 85.8245 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-OR", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "24000-125000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  tirupati: {
    name: "Tirupati", // Used in: All content replacement, titles, descriptions
    state: "Andhra Pradesh", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 13.6288, lng: 79.4192 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-AP", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "24000-128000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  vizag: {
    name: "Vizag", // Used in: All content replacement, titles, descriptions
    state: "Andhra Pradesh", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 17.6868, lng: 83.2185 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-AP", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "26000-140000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  trivandrum: {
    name: "Trivandrum", // Used in: All content replacement, titles, descriptions
    state: "Kerala", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 8.5241, lng: 76.9366 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-KL", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "27000-142000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  jalandhar: {
    name: "Jalandhar", // Used in: All content replacement, titles, descriptions
    state: "Punjab", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 31.326, lng: 75.5762 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-PB", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "27000-140000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  mohali: {
    name: "Mohali", // Used in: All content replacement, titles, descriptions
    state: "Punjab", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 30.7046, lng: 76.7179 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-PB", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "28000-145000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  cochin: {
    name: "Cochin", // Used in: All content replacement, titles, descriptions
    state: "Kerala", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 9.9312, lng: 76.2673 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-KL", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "28000-148000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  mangalore: {
    name: "Mangalore", // Used in: All content replacement, titles, descriptions
    state: "Karnataka", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 12.9141, lng: 74.856 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-KA", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "26000-138000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  // === PUNE AREA CITIES ===
  katraj: {
    name: "Katraj", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 18.4529, lng: 73.8644 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "30000-180000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  "pimpri-chinchwad": {
    name: "Pimpri-Chinchwad", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 18.6298, lng: 73.7997 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "30000-185000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  "shivaji-nagar": {
    name: "Shivaji Nagar", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 18.5304, lng: 73.8567 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "32000-190000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  "koregaon-park": {
    name: "Koregaon Park", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 18.5362, lng: 73.898 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "35000-200000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  "viman-nagar": {
    name: "Viman Nagar", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 18.5679, lng: 73.9143 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "33000-195000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  "pimple-saudagar": {
    name: "Pimple Saudagar", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 18.6186, lng: 73.8037 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "31000-185000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  baner: {
    name: "Baner", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 18.5593, lng: 73.7804 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "34000-195000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  hinjewadi: {
    name: "Hinjewadi", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 18.5912, lng: 73.7389 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "33000-190000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  wakad: {
    name: "Wakad", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 18.5975, lng: 73.7898 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "32000-188000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  kothrud: {
    name: "Kothrud", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 18.5074, lng: 73.8077 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "31000-185000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  hadapsar: {
    name: "Hadapsar", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 18.5089, lng: 73.926 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "30000-180000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  aundh: {
    name: "Aundh", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 18.5593, lng: 73.8078 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "33000-192000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  // === MUMBAI AREA CITIES ===
  "navi-mumbai": {
    name: "Navi Mumbai", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 19.033, lng: 73.0297 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "35000-185000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  thane: {
    name: "Thane", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 19.2183, lng: 72.9781 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "34000-180000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  kalyan: {
    name: "Kalyan", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 19.2437, lng: 73.1355 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "32000-175000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  bandra: {
    name: "Bandra", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 19.0596, lng: 72.8295 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "40000-200000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  andheri: {
    name: "Andheri", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 19.1136, lng: 72.8697 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "38000-195000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  powai: {
    name: "Powai", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 19.1197, lng: 72.9059 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "37000-190000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  worli: {
    name: "Worli", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 19.0176, lng: 72.8118 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "42000-205000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  chembur: {
    name: "Chembur", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 19.0633, lng: 72.8997 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "35000-185000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  malad: {
    name: "Malad", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 19.1868, lng: 72.8479 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "36000-188000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  "vile-parle": {
    name: "Vile Parle", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 19.099, lng: 72.847 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "37000-190000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },

  matunga: {
    name: "Matunga", // Used in: All content replacement, titles, descriptions
    state: "Maharashtra", // Used in: JSON-LD address references
    hasOffice: false, // Used in: Conditional rendering logic
    coordinates: { lat: 19.027, lng: 72.857 }, // Used in: JSON-LD GeoCoordinates (if needed)
    seoData: {
      geoRegion: "IN-MH", // Used in: JSON-LD metadata, geo meta tags
      priceRange: "38000-192000", // Used in: General pricing reference
      timezone: "Asia/Kolkata", // Used in: General reference
    },
  },
};