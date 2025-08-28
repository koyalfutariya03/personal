// dashboard/layout.js
"use client";

import { useEffect, useRef, useState, createContext, useContext } from "react"; // Import createContext, useContext
import { useRouter, usePathname } from "next/navigation";
import InactivityWarningModal from "@/components/superadmin/InactivityWarningModal";
import { FaSignOutAlt, FaSpinner } from "react-icons/fa"; // Import FaSpinner
import FixedLogo from "@/components/superadmin/FixedLogo";

// --- Configuration ---
// You might fetch these values from settings API in a real app
const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const WARNING_DURATION = 60 * 1000; // 60 seconds

// --- Create Activity Logging Context ---
const ActivityLogContext = createContext(null);

// --- Custom Hook to Use the Context ---
// Export this hook so page components can import it
export const useActivityLogger = () => {
  const context = useContext(ActivityLogContext);
  if (context === null) {
    // Provide a dummy logger if context is not available (e.g., component used outside layout)
    // or throw an error in development if you want to enforce correct usage.
    // console.warn("useActivityLogger used outside of ActivityLogContext Provider. Activity logging will be skipped.");
    return () => {}; // Return a no-op function
    // or throw new Error("useActivityLogger must be used within an ActivityLogContext Provider");
  }
  return context;
};

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  // --- Inactivity Timer States and Refs ---
  const [showWarning, setShowWarning] = useState(false);
  const inactivityTimerRef = useRef(null);
  const warningTimerRef = useRef(null);

  // --- Activity Tracking States ---
  const [currentPageStartTime, setCurrentPageStartTime] = useState(Date.now());
  const [currentPagePath, setCurrentPagePath] = useState(pathname);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); // Track if authenticated in layout

  // --- Authentication Check ---
  // This layout will ONLY render if the initial check in page.js or a parent layout passes.
  // However, adding a check here is good practice for robustness.
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const role = localStorage.getItem("adminRole");
    const adminId = localStorage.getItem("adminId");
    
    // Get user data from localStorage if available
    const userData = JSON.parse(localStorage.getItem('userData') || 'null');
    
    // Use role from userData if available, otherwise fallback to role from localStorage
    const effectiveRole = (userData?.role || role || '').toLowerCase();
    
    console.log("DashboardLayout: Running authentication check.", {
      hasToken: !!token,
      adminId,
      role,
      effectiveRole,
      userData: !!userData
    });
    
    // Check if authenticated and has a valid role
    const allowedRoles = ['viewmode', 'editmode', 'admin', 'superadmin'];
    const isAuthenticated = token && adminId && allowedRoles.includes(effectiveRole);
    
    if (!isAuthenticated) {
      console.log(
        "DashboardLayout: User not authenticated or role restricted, redirecting."
      );
      router.push("/AdminLogin");
      setIsAdminAuthenticated(false);
    } else {
      console.log("DashboardLayout: User authenticated.", { role, adminId });
      setIsAdminAuthenticated(true);

      // Start activity tracking and timers ONLY if authenticated
      resetInactivityTimer();
      // Log the login activity only once on the initial load of this layout IF we are on the default entry page
      // Check if we are already logged in and adminId exists before logging LOGIN
      // Use a flag like isAdminLoggedIn or check last login timestamp/session status on backend
      // For simplicity, let's use a localStorage flag cleared on logout.
      if (localStorage.getItem("isAdminLoggedIn") === "true" && adminId) {
        console.log("DashboardLayout: Logging LOGIN event.");
        logActivityEvent("LOGIN", pathname, "User logged in");
        localStorage.removeItem("isAdminLoggedIn"); // Clear this flag after logging
      } else if (adminId) {
        // Handle subsequent loads where isAdminLoggedIn isn't set but token exists
        console.log(
          "DashboardLayout: Re-authenticated, not logging LOGIN again."
        );
      }

      // Add event listeners to detect user activity across the document
      const activityEvents = ["mousemove", "keydown", "click", "scroll"];
      // Ensure listeners are only added if authenticated
      if (typeof document !== "undefined") {
        activityEvents.forEach((event) =>
          document.addEventListener(event, resetInactivityTimer)
        );
      }

      // Cleanup timers and event listeners on unmount
      return () => {
        console.log("DashboardLayout: Cleaning up timers and event listeners.");
        clearTimeout(inactivityTimerRef.current);
        clearTimeout(warningTimerRef.current);
        if (typeof document !== "undefined") {
          activityEvents.forEach((event) =>
            document.removeEventListener(event, resetInactivityTimer)
          );
        }

        // Log activity duration for the page being left (if any was tracked)
        // This relies on currentPagePath and currentPageStartTime correctly tracking the *previous* page
        if (currentPagePath && isAdminAuthenticated) {
          // Only log if authenticated
          const timeSpent = Date.now() - currentPageStartTime;
          console.log(
            `DashboardLayout: Logging PAGE_VIEW_END for ${currentPagePath}. Duration: ${timeSpent}ms`
          );
          logActivityEvent(
            "PAGE_VIEW_END",
            currentPagePath,
            `Duration: ${timeSpent}ms - Unmount`
          );
        }
      };
    }
  }, [router, pathname]); // Depend on router and pathname for the check and initial setup

  // --- Activity Logging Helper (Provided via Context) ---
  const logActivityEvent = async (action, page, details) => {
    const adminId = localStorage.getItem("adminId");
    const adminToken = localStorage.getItem("adminToken");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    console.log(
      `DashboardLayout: Attempting to log activity: ${action} on ${page}`,
      { details, adminId }
    );

    if (!adminId || !adminToken || !apiUrl) {
      console.warn(
        "DashboardLayout: Activity logging skipped: Missing user info, token, or API URL."
      );
      return;
    }

    try {
      // Use standard fetch here as fetchWithAuth might cause circular dependency if used inside auth logic
      const response = await fetch(`${apiUrl}/api/activity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ adminId, action, page, details }),
      });

      if (!response.ok) {
        console.error(
          "DashboardLayout: Failed to log activity:",
          response.status,
          await response.text()
        );
      } else {
        console.log("DashboardLayout: Activity logged successfully.");
      }
    } catch (error) {
      console.error("DashboardLayout: Error sending activity log:", error);
    }
  };

  // --- Inactivity Timer Logic ---
  const resetInactivityTimer = () => {
    // console.log("DashboardLayout: Activity detected, resetting timer.");
    clearTimeout(inactivityTimerRef.current);
    clearTimeout(warningTimerRef.current);
    setShowWarning(false);

    inactivityTimerRef.current = setTimeout(() => {
      console.log(
        "DashboardLayout: Inactivity timer expired, showing warning."
      );
      setShowWarning(true);
      warningTimerRef.current = setTimeout(() => {
        console.log("DashboardLayout: Warning timer expired, logging out.");
        handleLogout();
      }, WARNING_DURATION);
    }, INACTIVITY_TIMEOUT);
  };

  // --- Logout Function ---
  const handleLogout = () => {
    console.log(
      "DashboardLayout: Logging LOGOUT event before clearing storage."
    );
    logActivityEvent(
      "LOGOUT",
      pathname,
      "User logged out manually or due to inactivity"
    );

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    localStorage.removeItem("adminUsername");
    localStorage.removeItem("adminId");
    localStorage.removeItem("isAdminLoggedIn");
    router.push("/AdminLogin");
  };

  // --- Effect to Track Page Views and Time Spent ---
  useEffect(() => {
    // This effect runs when pathname changes (and on initial mount).
    // It logs the END of the PREVIOUS page view and the START of the NEW page view.
    // We only log if the path has actually changed since the last time we tracked it,
    // and if the user is authenticated within this layout.
    if (
      isAdminAuthenticated &&
      pathname &&
      currentPagePath &&
      pathname !== currentPagePath
    ) {
      const timeSpent = Date.now() - currentPageStartTime;
      console.log(
        `DashboardLayout: Logging PAGE_VIEW_END for ${currentPagePath}. Duration: ${timeSpent}ms`
      );
      logActivityEvent(
        "PAGE_VIEW_END",
        currentPagePath,
        `Duration: ${timeSpent}ms - Navigated`
      );

      console.log(`DashboardLayout: Logging PAGE_VIEW_START for ${pathname}.`);
      logActivityEvent("PAGE_VIEW_START", pathname, "Page visited");

      // Update state for the new page
      setCurrentPagePath(pathname);
      setCurrentPageStartTime(Date.now());
    } else if (isAdminAuthenticated && pathname && !currentPagePath) {
      // This handles the very first page load within this layout IF it wasn't triggered as a LOGIN page view
      console.log(
        `DashboardLayout: Initializing page tracking for ${pathname}.`
      );
      setCurrentPagePath(pathname);
      setCurrentPageStartTime(Date.now());
      // We already log LOGIN in the other effect, no need for duplicate PAGE_VIEW_START here on first load.
    }
  }, [pathname, currentPagePath, currentPageStartTime, isAdminAuthenticated]);

  // Show a minimal loading state or nothing while authentication is verified.
  if (!isAdminAuthenticated) {
    console.log("DashboardLayout: Not authenticated, showing loader or null.");
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
        <p className="text-gray-600">Verifying authentication...</p>
      </div>
    );
  }

  return (
    // Provide the logActivityEvent function via Context
    <ActivityLogContext.Provider value={logActivityEvent}>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Main Content Area */}
        <main className="flex-1 p-6 mt-10 mx-auto w-full">
          {/* <FixedLogo /> */}
          {/* children will be dashboard/page.js */}
          {children}
        </main>

        {/* Inactivity Warning Modal */}
        {showWarning && (
          <InactivityWarningModal
            onStayLoggedIn={() => resetInactivityTimer()}
            onLogout={handleLogout}
            warningDuration={WARNING_DURATION}
          />
        )}
      </div>
    </ActivityLogContext.Provider>
  );
};

export default DashboardLayout;