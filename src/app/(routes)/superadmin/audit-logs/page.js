"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaHistory,
  FaCalendarAlt,
  FaUserShield,
  FaFilter,
  FaUserCog,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaSpinner, // For loading spinner
  FaTimes, // For error message icon
  FaExclamationTriangle, // For no data/error message
} from "react-icons/fa";
import Sidebar from "@/components/superadmin/Sidebar";
import AccessControl from "@/components/superadmin/AccessControl";
import { fetchWithAuth } from "@/utils/auth";
import AuditLogDetailsModal from "@/components/superadmin/AuditLogDetailsModal";
import FixedLogo from "@/components/superadmin/FixedLogo";

// Format date with time
const formatDateTime = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid Date"; // Handle invalid date strings
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

// Audit Logs Page
const AuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("audit"); // "audit" or "login"
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    adminId: "",
    action: "", // Only applicable for audit logs
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [userRole, setUserRole] = useState(null);
  const [selectedLog, setSelectedLog] = useState(null);
  const logsPerPage = 10; // Assuming this is the server-side limit per page
  const router = useRouter();

  // Authentication check
  useEffect(() => {
    const token =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("adminToken")
        : null;
    const role =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("adminRole")
        : null;
    setUserRole(role);

    if (!token) {
      router.push("/AdminLogin");
      return;
    }

    // Redirect if not authorized (AccessControl will also show message)
    if (
      role !== "SuperAdmin" &&
      role !== "Admin" &&
      role !== "ViewMode" &&
      role !== "EditMode"
    ) {
      router.push("/dashboard");
      return;
    }

    // Fetch admins for filter dropdown immediately if authenticated
    fetchAdmins();
  }, [router]);

  // Fetch data when page, tab, or filters change
  useEffect(() => {
    // Only fetch if the user role is authorized and admins data is loaded
    // Waiting for admins ensures the filter dropdown populates before fetching
    if (
      (userRole === "SuperAdmin" ||
        userRole === "Admin" ||
        userRole === "ViewMode" ||
        userRole === "EditMode") &&
      admins.length >= 0
    ) {
      // Reset page to 1 if tab changes, handled in changeTab function
      if (activeTab === "audit") {
        fetchAuditLogs(currentPage, filters);
      } else {
        fetchLoginHistory(currentPage, filters);
      }
    }
  }, [currentPage, activeTab, filters, userRole, admins.length]); // Add filters, userRole, admins.length as dependencies

  const fetchAdmins = async () => {
    setLoading(true); // Keep loading true while fetching admins and then logs
    setError(null); // Clear previous errors

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; // Use empty string as fallback
      if (!apiUrl) {
        console.error("NEXT_PUBLIC_PUBLIC_API_URL is not defined");
        setError("API URL is not configured.");
        setLoading(false);
        return;
      }

      const url = `${apiUrl}/api/admins`;
      const adminsResponse = await fetchWithAuth(url);

      if (adminsResponse.ok) {
        const adminsData = await adminsResponse.json();
        setAdmins(adminsData);
        // Admins fetched successfully, proceed to fetch logs via useEffect dependency
      } else {
        console.error(
          "Failed to fetch admin users for filter:",
          await adminsResponse.text()
        );
        // Optionally set an error specifically for admin fetch failure
        // setError("Failed to load admin users for filtering.");
        setAdmins([]); // Ensure admins is an empty array on failure
        // Continue to fetch logs via useEffect dependency even if admin fetch fails
      }
    } catch (err) {
      console.error("Error fetching admin users:", err);
      // setError("Failed to load admin users for filtering."); // Set error if fetch throws
      setAdmins([]); // Ensure admins is an empty array on failure
    }
    // Loading is set to false in fetchAuditLogs/fetchLoginHistory finally blocks
  };

  const fetchAuditLogs = async (page = 1, filterObj = filters) => {
    setLoading(true);
    setError(null); // Clear previous errors before fetching

    try {
      const queryParams = new URLSearchParams();

      // Filter by admin ID who performed the action
      if (filterObj.adminId) {
        queryParams.append("adminId", filterObj.adminId);
      }

      // Filter by action type
      if (filterObj.action) queryParams.append("action", filterObj.action);

      // Add date filters, formatted as ISO strings for consistency with backend
      if (filterObj.startDate) {
        const start = new Date(filterObj.startDate);
        // Set time to the beginning of the day in UTC
        start.setUTCHours(0, 0, 0, 0);
        queryParams.append("startDate", start.toISOString());
      }
      if (filterObj.endDate) {
        const end = new Date(filterObj.endDate);
        // Set time to the end of the day in UTC
        end.setUTCHours(23, 59, 59, 999);
        queryParams.append("endDate", end.toISOString());
      }

      // Exclude login actions from audit logs tab explicitly
      // Assuming your API handles this filter, otherwise backend adjustment is needed
      // queryParams.append("excludeActions", "login");

      // Add pagination
      queryParams.append("page", page);
      queryParams.append("limit", logsPerPage);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; // Use empty string as fallback
      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL is not defined for audit logs");
        setError("API URL is not configured.");
        setLoading(false);
        return;
      }
      const url = `${apiUrl}/api/audit-logs?${queryParams.toString()}`; // Assuming /api/audit-logs is the endpoint

      const response = await fetchWithAuth(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Failed to fetch audit logs response:",
          response.status,
          errorText
        );
        throw new Error(
          `Failed to fetch audit logs: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Check if we got valid data back (assuming { logs: [], totalItems: 0, totalPages: 1 } structure)
      if (Array.isArray(data?.logs)) {
        setLogs(data.logs);
        setTotalItems(data.totalItems || 0);
        setTotalPages(data.totalPages || 1);
        setError(null); // Clear page-level error on successful fetch
      } else {
        console.error("Invalid response format for audit logs:", data);
        throw new Error("Invalid response format from server for audit logs.");
      }
    } catch (err) {
      console.error("Error fetching audit logs:", err);
      setError(err.message || "Failed to fetch audit logs. Please try again.");
      setLogs([]); // Clear logs on error
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false); // Set loading false after fetch attempt
    }
  };

  const fetchLoginHistory = async (page = 1, filterObj = filters) => {
    setLoading(true);
    setError(null); // Clear previous errors before fetching

    try {
      const queryParams = new URLSearchParams();

      // Filter by admin user ID for login history
      if (filterObj.adminId) {
        queryParams.append("userId", filterObj.adminId); // Assuming login history filters by userId
      }

      // Add date filters, formatted as ISO strings
      if (filterObj.startDate) {
        const start = new Date(filterObj.startDate);
        // Set time to the beginning of the day in UTC
        start.setUTCHours(0, 0, 0, 0);
        queryParams.append("startDate", start.toISOString());
      }
      if (filterObj.endDate) {
        const end = new Date(filterObj.endDate);
        // Set time to the end of the day in UTC
        end.setUTCHours(23, 59, 59, 999);
        queryParams.append("endDate", end.toISOString());
      }

      // Add pagination
      queryParams.append("page", page);
      queryParams.append("limit", logsPerPage);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; // Use empty string as fallback
      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL is not defined for login history");
        setError("API URL is not configured.");
        setLoading(false);
        return;
      }
      const url = `${apiUrl}/api/login-history?${queryParams.toString()}`; // Assuming /api/login-history is the endpoint

      const response = await fetchWithAuth(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Failed to fetch login history response:",
          response.status,
          errorText
        );
        throw new Error(
          `Failed to fetch login history: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Check if we got valid data back (assuming { logs: [], totalItems: 0, totalPages: 1 } structure)
      if (Array.isArray(data?.logs)) {
        setLogs(data.logs);
        setTotalItems(data.totalItems || 0);
        setTotalPages(data.totalPages || 1);
        setError(null); // Clear page-level error on successful fetch
      } else {
        console.error("Invalid response format for login history:", data);
        throw new Error(
          "Invalid response format from server for login history."
        );
      }
    } catch (err) {
      console.error("Error fetching login history:", err);
      setError(
        err.message || "Failed to fetch login history. Please try again."
      );
      setLogs([]); // Clear logs on error
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false); // Set loading false after fetch attempt
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
    // Note: Filters are applied via the useEffect that depends on `filters` state.
  };

  // This button is less crucial now that useEffect watches filters,
  // but keeps the manual "Apply Filters" button functionality.
  const applyFilters = () => {
    setCurrentPage(1); // Always reset to first page when applying filters
    // The fetch is triggered by the filters state change in the useEffect
    // if we want to force an immediate fetch on button click,
    // we can call the fetch function directly here after setting page 1.
    setLoading(true); // Set loading true immediately on button click
    // useEffect will handle the actual fetch because currentPage and filters changed
  };

  const resetFilters = () => {
    const reset = {
      adminId: "",
      action: "",
      startDate: "",
      endDate: "",
    };
    setFilters(reset);
    setCurrentPage(1); // Reset page to 1
    // The fetch is triggered by the filters state change in the useEffect
    // if we want to force an immediate fetch on button click,
    // we can call the fetch function directly here after setting page 1 and filters.
    setLoading(true); // Set loading true immediately on button click
    // useEffect will handle the actual fetch because currentPage and filters changed
  };

  const changeTab = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when changing tabs
    // Reset action filter when switching to login history tab
    if (tab === "login") {
      setFilters((prev) => ({ ...prev, action: "" }));
    }
    // Fetch is triggered by the useEffect when activeTab or filters change
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Fetch is triggered by the useEffect when currentPage changes
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      // Fetch is triggered by the useEffect when currentPage changes
    }
  };

  const openLogModal = (log) => {
    setSelectedLog(log);
  };

  const closeLogModal = () => {
    setSelectedLog(null);
  };

  // If still loading initial data and user role is not yet determined/checked
  if (loading && userRole === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        {/* Loading Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
        <p className="mt-8 text-center text-gray-600">
          Loading authentication...
        </p>
      </div>
    );
  }

  return (
    // Main container flex layout
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar is always present */}
      <Sidebar activePage="audit-logs" /> {/* Pass activePage prop */}
      {/* <FixedLogo /> */}
      {/* Main content area - takes remaining space */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0 overflow-auto">
        {/* AccessControl handles the overall access to this page's content */}
        {/* Content only visible to users with 'audit-logs' access */}
        <AccessControl section="audit-logs">
          {" "}
          {/* Wrap content with AccessControl */}
          {/* Page content container with padding and max-width */}
          <div className="p-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Audit Logs
              </h1>
              <p className="text-gray-600 text-lg">
                Track all actions and login attempts in the system.
              </p>
            </div>

            {/* Page-level Error Message Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md relative mb-4 flex items-center">
                <FaTimes className="mr-2 text-xl" />
                {error}
              </div>
            )}

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex border-b border-gray-200 overflow-x-auto">
                <button
                  className={`px-4 py-3 text-sm font-medium transition-colors duration-200 flex items-center gap-2
                          ${
                            activeTab === "audit"
                              ? "text-blue-600 border-b-2 border-blue-600"
                              : "text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300"
                          }
                        `}
                  onClick={() => changeTab("audit")}
                  disabled={loading}
                >
                  <FaHistory className="text-lg" /> Audit Logs
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium transition-colors duration-200 flex items-center gap-2
                           ${
                             activeTab === "login"
                               ? "text-blue-600 border-b-2 border-blue-600"
                               : "text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300"
                           }
                         `}
                  onClick={() => changeTab("login")}
                  disabled={loading}
                >
                  <FaUserShield className="text-lg" /> Login History
                </button>
              </div>
            </div>

            {/* Filters Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FaFilter className="mr-3 text-blue-600" /> Filter{" "}
                {activeTab === "audit" ? "Audit Logs" : "Login History"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Admin User Filter */}
                <div className="form-group">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="adminId-filter"
                  >
                    <FaUserCog className="inline mr-1 text-gray-500" />
                    {activeTab === "audit"
                      ? "Admin User (Performer)"
                      : "Admin User (User)"}
                  </label>
                  <select
                    id="adminId-filter"
                    name="adminId"
                    value={filters.adminId}
                    onChange={handleFilterChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    <option value="">All Admins</option>
                    {admins.map((admin) => (
                      // Display the role in the option text
                      <option key={admin._id} value={admin._id}>
                        {admin.username} ({admin.role})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Type Filter (Only for Audit Logs) */}
                {activeTab === "audit" && (
                  <div className="form-group">
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor="action-filter"
                    >
                      <FaFilter className="inline mr-1 text-gray-500" /> Action
                      Type
                    </label>
                    <select
                      id="action-filter"
                      name="action"
                      value={filters.action}
                      onChange={handleFilterChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      <option value="">All Actions</option>
                      {/* Add specific audit action types as needed based on your backend */}
                      <option value="create_lead">Create Lead</option>
                      <option value="update_lead">Update Lead</option>
                      <option value="delete_lead">Delete Lead</option>
                      <option value="create_admin">Create Admin</option>
                      <option value="update_admin">Update Admin</option>
                      <option value="delete_admin">Delete Admin</option>
                      {/* ... potentially others like update_settings, assign_lead etc. */}
                    </select>
                  </div>
                )}

                {/* Start Date Filter */}
                <div className="form-group">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="startDate-filter"
                  >
                    <FaCalendarAlt className="inline mr-1 text-gray-500" />{" "}
                    Start Date
                  </label>
                  <input
                    id="startDate-filter"
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    onChange={handleFilterChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  />
                </div>

                {/* End Date Filter */}
                <div className="form-group">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="endDate-filter"
                  >
                    <FaCalendarAlt className="inline mr-1 text-gray-500" /> End
                    Date
                  </label>
                  <input
                    id="endDate-filter"
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    onChange={handleFilterChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  />
                </div>

                {/* Filter Actions */}
                {/* Adjust grid column span based on whether Action Type filter is shown */}
                <div
                  className={`form-group col-span-full flex justify-end gap-3 items-end ${activeTab === "audit" ? "sm:col-span-2 lg:col-span-1" : "sm:col-span-2 lg:col-span-2"}`}
                >
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={resetFilters}
                    disabled={loading}
                  >
                    Reset
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={applyFilters}
                    disabled={loading}
                  >
                    <FaFilter className="inline mr-2" /> Apply Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State for Table */}
            {loading && logs.length === 0 ? ( // Show full-page loader only if no logs are loaded yet
              <div className="flex flex-col items-center justify-center py-12">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <div
                    className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"
                    style={{
                      animationDirection: "reverse",
                      animationDuration: "1.5s",
                    }}
                  ></div>
                </div>
                <p className="mt-4 text-gray-600">
                  Loading{" "}
                  {activeTab === "audit" ? "audit logs" : "login history"}...
                </p>
              </div>
            ) : (
              /* Logs Table Card */
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Mobile View (Cards) */}
                <div className="lg:hidden divide-y divide-gray-200">
                  {logs.length > 0 ? (
                    logs.map((log) => (
                      <div key={log._id} className="p-6 space-y-3 text-sm">
                        {/* Admin */}
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">
                            Admin:
                          </span>
                          <span className="text-gray-700">
                            {log.adminId?.username || "Unknown"}
                          </span>
                        </div>
                        {/* Role */}
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">
                            Role:
                          </span>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                              log.adminId?.role === "SuperAdmin"
                                ? "bg-purple-100 text-purple-800 border-purple-200"
                                : log.adminId?.role === "Admin"
                                  ? "bg-blue-100 text-blue-800 border-blue-200"
                                  : log.adminId?.role === "ViewMode"
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : "bg-yellow-100 text-yellow-800 border-yellow-200" // Assuming EditMode
                            }`}
                          >
                            {log.adminId?.role || "Unknown"}
                          </span>
                        </div>

                        {activeTab === "audit" ? (
                          <>
                            {/* Action (Audit) */}
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-900">
                                Action:
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                {log.action}
                              </span>
                            </div>
                            {/* Target (Audit) */}
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-900">
                                Target:
                              </span>
                              <span className="text-gray-700 truncate max-w-[50%]">
                                {log.target || "—"}
                              </span>{" "}
                              {/* Truncate long targets */}
                            </div>
                            {/* Details (Audit) */}
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-900">
                                Details:
                              </span>
                              {log.metadata ? (
                                <button
                                  onClick={() => openLogModal(log)}
                                  className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded-md text-xs font-medium hover:bg-blue-200 transition-colors duration-150"
                                >
                                  <FaEye className="mr-1 text-sm" /> View
                                </button>
                              ) : (
                                <span className="text-gray-500">—</span>
                              )}
                            </div>
                            {/* Timestamp (Audit) */}
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-900">
                                Timestamp:
                              </span>
                              <span className="text-gray-700">
                                {formatDateTime(log.createdAt)}
                              </span>
                            </div>
                          </>
                        ) : (
                          // Login History
                          <>
                            {/* Status (Login) */}
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-900">
                                Status:
                              </span>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${log.success ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}`}
                              >
                                {log.success ? "Success" : "Failed"}
                              </span>
                            </div>
                            {/* IP Address (Login) */}
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-900">
                                IP Address:
                              </span>
                              <span className="text-gray-700">
                                {log.ipAddress || "—"}
                              </span>
                            </div>
                            {/* User Agent (Login) */}
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-900">
                                User Agent:
                              </span>
                              {log.userAgent ? (
                                <button
                                  onClick={() => openLogModal(log)}
                                  className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded-md text-xs font-medium hover:bg-blue-200 transition-colors duration-150"
                                >
                                  <FaEye className="mr-1 text-sm" /> View
                                </button>
                              ) : (
                                <span className="text-gray-500">—</span>
                              )}
                            </div>
                            {/* Login Time (Login) */}
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-gray-900">
                                Login Time:
                              </span>
                              <span className="text-gray-700">
                                {formatDateTime(log.loginAt)}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-600 flex flex-col items-center">
                      <FaExclamationTriangle className="text-yellow-500 text-3xl mb-4" />
                      {Object.values(filters).some(
                        (value) => value !== "" && value !== null
                      )
                        ? `No ${activeTab === "audit" ? "audit logs" : "login history"} found matching your filter criteria. Try adjusting your filters.`
                        : `No ${activeTab === "audit" ? "audit logs" : "login history"} found.`}
                    </div>
                  )}
                </div>

                {/* Desktop View (Table) */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      {activeTab === "audit" ? (
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Admin
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Action
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Target
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Details
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Timestamp
                          </th>
                        </tr>
                      ) : (
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Admin
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            IP Address
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            User Agent
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Login Time
                          </th>
                        </tr>
                      )}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {logs.length > 0 ? (
                        logs.map((log) => (
                          <tr
                            key={log._id}
                            className="hover:bg-gray-50 transition-colors duration-150"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {log.adminId?.username || "Unknown"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                  log.adminId?.role === "SuperAdmin"
                                    ? "bg-purple-100 text-purple-800 border-purple-200"
                                    : log.adminId?.role === "Admin"
                                      ? "bg-blue-100 text-blue-800 border-blue-200"
                                      : log.adminId?.role === "ViewMode"
                                        ? "bg-green-100 text-green-800 border-green-200"
                                        : "bg-yellow-100 text-yellow-800 border-yellow-200" // Assuming EditMode
                                }`}
                              >
                                {log.adminId?.role || "Unknown"}
                              </span>
                            </td>
                            {activeTab === "audit" ? (
                              <>
                                {/* Action (Audit) */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                    {log.action}
                                  </span>
                                </td>
                                {/* Target (Audit) */}
                                <td className="px-6 py-4 text-sm text-gray-700 truncate max-w-xs">
                                  {log.target || "—"}
                                </td>{" "}
                                {/* Use max-w-xs to allow truncation */}
                                {/* Details (Audit) */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                  {log.metadata ? (
                                    <button
                                      onClick={() => openLogModal(log)}
                                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded-md text-xs font-medium hover:bg-blue-200 transition-colors duration-150"
                                      aria-label={`View details for audit log ${log._id}`}
                                    >
                                      <FaEye className="mr-1 text-sm" /> View
                                    </button>
                                  ) : (
                                    <span className="text-gray-500">—</span>
                                  )}
                                </td>
                                {/* Timestamp (Audit) */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                  {formatDateTime(log.createdAt)}
                                </td>
                              </>
                            ) : (
                              // Login History
                              <>
                                {/* Status (Login) */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${log.success ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}`}
                                  >
                                    {log.success ? "Success" : "Failed"}
                                  </span>
                                </td>
                                {/* IP Address (Login) */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                  {log.ipAddress || "—"}
                                </td>
                                {/* User Agent (Login) */}
                                <td className="px-6 py-4 text-sm text-gray-700 truncate max-w-xs">
                                  {" "}
                                  {/* Use max-w-xs to allow truncation */}
                                  {log.userAgent ? (
                                    <button
                                      onClick={() => openLogModal(log)}
                                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 border border-blue-200 rounded-md text-xs font-medium hover:bg-blue-200 transition-colors duration-150"
                                      aria-label={`View user agent details for login log ${log._id}`}
                                    >
                                      <FaEye className="mr-1 text-sm" /> View
                                    </button>
                                  ) : (
                                    <span className="text-gray-500">—</span>
                                  )}
                                </td>
                                {/* Login Time (Login) */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                  {formatDateTime(log.loginAt)}
                                </td>
                              </>
                            )}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="6"
                            className="px-6 py-4 text-center text-gray-600"
                          >
                            <div className="flex flex-col items-center">
                              <FaExclamationTriangle className="text-yellow-500 text-3xl mb-4" />
                              {Object.values(filters).some(
                                (value) => value !== "" && value !== null
                              ) // Check if any filter is actually set
                                ? `No ${activeTab === "audit" ? "audit logs" : "login history"} found matching your filter criteria. Try adjusting your filters.`
                                : `No ${activeTab === "audit" ? "audit logs" : "login history"} found.`}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1 || loading}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm inline-flex items-center gap-2"
                  aria-label="Previous page"
                >
                  <FaChevronLeft /> Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages || 1} ({totalItems} items)
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={
                    currentPage === totalPages || totalItems === 0 || loading
                  }
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm inline-flex items-center gap-2"
                  aria-label="Next page"
                >
                  Next <FaChevronRight />
                </button>
              </div>
            )}
          </div>
        </AccessControl>
      </main>
      {/* Modal for displaying details */}
      {selectedLog && (
        <AuditLogDetailsModal log={selectedLog} onClose={closeLogModal} />
      )}
    </div>
  );
};

export default AuditLogsPage;
