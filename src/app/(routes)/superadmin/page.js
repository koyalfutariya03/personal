"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/superadmin/Sidebar";
import AccessControl from "@/components/superadmin/AccessControl";
import InactivityWarningModal from "@/components/superadmin/InactivityWarningModal";
import FixedLogo from "@/components/superadmin/FixedLogo";

const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const WARNING_DURATION = 60 * 1000; // 60 seconds

const SuperAdminLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [showWarning, setShowWarning] = useState(false);
  const inactivityTimerRef = useRef(null);
  const warningTimerRef = useRef(null);

  const [currentPageStartTime, setCurrentPageStartTime] = useState(Date.now());
  const [currentPagePath, setCurrentPagePath] = useState(pathname);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const role = localStorage.getItem("adminRole");
    setUserRole(role);

    if (!token) {
      router.push("/AdminLogin");
      return;
    }

    if (role !== "SuperAdmin" && role !== "Admin") {
      router.push("/dashboard");
      return;
    }
  }, [router]);

  const logActivityEvent = async (action, page, details) => {
    const adminId = localStorage.getItem("adminId");
    const adminToken = localStorage.getItem("adminToken");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!adminId || !adminToken || !apiUrl) {
      console.warn("Activity logging skipped: Missing user info or API URL.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/activity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ adminId, action, page, details }),
      });

      if (!response.ok) {
        console.error("Failed to log activity:", response.status, await response.text());
      }
    } catch (error) {
      console.error("Error sending activity log:", error);
    }
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimerRef.current);
    clearTimeout(warningTimerRef.current);
    setShowWarning(false);

    inactivityTimerRef.current = setTimeout(() => {
      setShowWarning(true);
      warningTimerRef.current = setTimeout(() => {
        handleLogout();
      }, WARNING_DURATION);
    }, INACTIVITY_TIMEOUT);
  };

  const handleLogout = () => {
    logActivityEvent("LOGOUT", pathname, "User logged out due to inactivity");

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    localStorage.removeItem("adminUsername");
    localStorage.removeItem("adminId");
    localStorage.removeItem("isAdminLoggedIn");
    router.push("/AdminLogin");
  };

  useEffect(() => {
    resetInactivityTimer();

    if (localStorage.getItem("adminId") && pathname === "/superadmin/dashboard") {
      logActivityEvent("LOGIN", pathname, "User logged in");
    }

    const activityEvents = ["mousemove", "keydown", "click", "scroll"];
    activityEvents.forEach((event) =>
      document.addEventListener(event, resetInactivityTimer)
    );

    return () => {
      clearTimeout(inactivityTimerRef.current);
      clearTimeout(warningTimerRef.current);
      activityEvents.forEach((event) =>
        document.removeEventListener(event, resetInactivityTimer)
      );

      if (currentPagePath) {
        const timeSpent = Date.now() - currentPageStartTime;
        logActivityEvent(
          "PAGE_VIEW_END",
          currentPagePath,
          `Duration: ${timeSpent}ms - Unmount`
        );
      }
    };
  }, []);

  useEffect(() => {
    if (pathname && currentPagePath && pathname !== currentPagePath) {
      const timeSpent = Date.now() - currentPageStartTime;
      logActivityEvent(
        "PAGE_VIEW_END",
        currentPagePath,
        `Duration: ${timeSpent}ms - Navigated`
      );
      logActivityEvent("PAGE_VIEW_START", pathname, "Page visited");
      setCurrentPagePath(pathname);
      setCurrentPageStartTime(Date.now());
    } else if (pathname && !currentPagePath) {
      setCurrentPagePath(pathname);
      setCurrentPageStartTime(Date.now());
    }
  }, [pathname, currentPagePath, currentPageStartTime]);

  if (userRole === null) {
    return null;
  }

  const activePage = pathname.split("/").pop() || "dashboard";

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Fixed and Sticky */}
      <div className="relative">
        <Sidebar activePage={activePage} userRole={userRole} />
        {/* <FixedLogo /> */}
      </div>
      
      {/* Main content - Ensure proper spacing and scrolling */}
      <main className="flex-1 lg:ml-64 min-h-screen overflow-auto">
        <div className="pt-16 lg:pt-0">
          <AccessControl section={activePage}>
            {children}
          </AccessControl>
        </div>
      </main>

      {/* Inactivity modal */}  
      {showWarning && (
        <InactivityWarningModal
          onStayLoggedIn={() => resetInactivityTimer()}
          onLogout={handleLogout}
          warningDuration={WARNING_DURATION}
        />
      )}
    </div>
  );
};

export default SuperAdminLayout;