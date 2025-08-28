"use client";

import DSHeader from "@/components/CoursesComponents/Header";
import Why from "@/components/CoursesComponents/Why";
import Certificate from "@/components/HomePage/Certificate";
import Description from "@/components/CoursesComponents/Description";
import FAQ from "@/components/CoursesComponents/FAQ";
import CoursesRelated from "@/components/CoursesComponents/RelatedCourses";

export default function HomePage() {
  return (
    <>
      <DSHeader pageId="SapHeader" pageType="sapheader" />
      <Why pageId="WhySap" pageType="Whysap" />
      <Certificate pageId="sap-CERT" /> 
      <Description pageId="sap-landing" />
      <FAQ pageId="SAPFAQ" pageType="sapfaq" />
      <CoursesRelated pageId="SAPrelcourses" />
    </>
  );
}
