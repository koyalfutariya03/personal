// components/CourseCityLinks.js
import Link from "next/link";

const CourseCityLinks = () => {
  const cities = [
    "pune",
    "mumbai",
    "delhi",
    "kolkata",
    "chennai",
    "bangalore",
    "hyderabad",
    "ahmedabad",
    "jaipur",
    "lucknow",
    "kanpur",
    "nagpur",
    "patna",
    "indore",
    "bhopal",
    "visakhapatnam",
    "vadodara",
    "ludhiana",
    "agra",
    "nashik",
    "rajkot",
    "varanasi",
    "kerala",
    "surat",
    "dehradun",
    "madurai",
    "mysore",
    "pondicherry",
    "ranchi",
    "coimbatore",
    "chandigarh",
    "bhubaneswar",
    "tirupati",
    "vizag",
    "trivandrum",
    "jalandhar",
    "mohali",
    "raipur",
    "cochin",
    "mangalore",
    "katraj",
    "pimpri-chinchwad",
    "shivaji-nagar",
    "koregaon-park",
    "viman-nagar",
    "pimple-saudagar",
    "baner",
    "hinjewadi",
    "wakad",
    "kothrud",
    "hadapsar",
    "aundh",
    "navi-mumbai",
    "thane",
    "kalyan",
    "bandra",
    "andheri",
    "powai",
    "worli",
    "chembur",
    "malad",
    "vile-parle",
    "matunga",
  ];

  const courses = [
    "sap-course-in",
    "it-course-in",
    "data-visualization-course-in",
    "data-science-course-in",
    "data-analytics-course-in",
    "business-analytics-course-in",
    "chatgpt-course-in",
    "full-stack-developer-course-in",
    "java-course-in",
    "mern-stack-course-in",
    "python-course-in",
    "salesforce-course-in",
    "ui-ux-course-in",
    "sap-ewm-course-in",
    "sap-abap-course-in",
    "sap-ariba-course-in",
    "sap-basis-course-in",
    "sap-bwbi-course-in",
    "sap-fico-course-in",
    "sap-s4-hana-course-in",
    "sap-hr-hcm-course-in",
    "sap-mm-course-in",
    "sap-pm-course-in",
    "sap-pp-course-in",
    "sap-ps-course-in",
    "sap-qm-course-in",
    "sap-scm-course-in",
    "sap-sd-course-in",
    "sap-successfactors-course-in",
    "power-bi-course-in",
    "sql-course-in",
    "tableau-course-in",
    "digital-marketing-course-in",
    "hr-analytics-course-in",
    "hr-training-course-in",
    "core-hr-course-in",
    "hr-management-course-in",
    "hr-payroll-course-in",
    "hr-generalist-course-in",
  ];

  return (
    <div>
      <h2>Explore Our Courses by City</h2>
      <ul>
        {courses.map((course) =>
          cities.map((city) => {
            // Construct the slug correctly
            const slug = `/${course}-${city}`.replace(/\//g, "").toLowerCase();
            return (
              <li key={`${course}-${city}`}>
                <Link href={slug}>
                  {course.replace(/-/g, " ").replace(/in/g, "in")} in {city}
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default CourseCityLinks;
