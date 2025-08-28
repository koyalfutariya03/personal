// components/CourseLoader.js

"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loader from "./Loader";

const CourseLoader = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const coursePathPatterns = [
      "/IT-Courses",
      "/HR-Courses",
      "/Sap-Courses",
      "/DM-Courses",
      "/DV-Courses",
    ];

    const isCoursePage = (path) =>
      coursePathPatterns.some((pattern) => path.includes(pattern));

    if (isCoursePage(pathname)) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }

    return () => {
      if (loading) setLoading(false);
    };
  }, [pathname, searchParams, loading]);

  useEffect(() => {
    let currentPath = pathname;

    const interval = setInterval(() => {
      if (currentPath !== pathname) {
        setLoading(true);
        currentPath = pathname;

        setTimeout(() => setLoading(false), 1500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [pathname]);

  return loading ? <Loader /> : null;
};

export default CourseLoader;
