// superadmin/activity/page.js
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
  FaSpinner,
  FaTimes,
  FaExclamationTriangle,
  FaClock, // Icon for time/duration
} from "react-icons/fa";
import Sidebar from "@/components/superadmin/Sidebar";
import AccessControl from "@/components/superadmin/AccessControl";
import { fetchWithAuth } from "@/utils/auth";
import FixedLogo from "@/components/superadmin/FixedLogo";

// Format date with time
const formatDateTime = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch (e) {
    console.error("Error formatting date:", dateString, e);
    return "Invalid Date";
  }
};

// Helper to format duration from milliseconds into a readable string (e.g., "1m 30s")
const formatDuration = (ms) => {
  if (typeof ms !== "number" || isNaN(ms) || ms < 0) {
    return "N/A";
  }
  if (ms < 1000) {
    return `${ms}ms`; // Show milliseconds for very short durations
  }

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const parts = [];
  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0) {
    parts.push(`${minutes % 60}m`);
  }
  if (seconds > 0 || parts.length === 0) {
    // Always show seconds if > 0 or if it's less than a minute
    parts.push(`${seconds % 60}s`);
  }

  return parts.join(" ");
};

// Admin Activity Logs Page
const AdminActivityLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    adminId: "",
    action: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [userRole, setUserRole] = useState(null);

  const logsPerPage = 50;

  const router = useRouter();

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

    fetchAdminsForFilter();
  }, [router]);

  useEffect(() => {
    if (userRole !== null && admins.length >= 0) {
      fetchAdminActivityLogs(currentPage, filters);
    }
  }, [currentPage, filters, userRole, admins.length]);

  const fetchAdminsForFilter = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        console.warn("API URL not configured. Cannot fetch admins for filter.");
        setAdmins([]);
        return;
      }
      const response = await fetchWithAuth(`${apiUrl}/api/admins`);

      if (response.ok) {
        const adminsData = await response.json();
        setAdmins(Array.isArray(adminsData) ? adminsData : []);
      } else {
        console.error(
          "Failed to fetch admins for filter:",
          response.status,
          await response.text()
        );
        setAdmins([]);
      }
    } catch (err) {
      console.error("Error fetching admins for filter:", err);
      setAdmins([]);
    }
  };

  const fetchAdminActivityLogs = async (
    page = currentPage,
    filterObj = filters
  ) => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();

      if (filterObj.adminId) {
        try {
          queryParams.append(
            "adminId",
            new mongoose.Types.ObjectId(filterObj.adminId)
          ); // Use 'new' with ObjectId
        } catch (err) {
          console.warn(
            `Invalid adminId format in admin activity filter: ${filterObj.adminId}`,
            err
          );
          // If invalid ID is provided, return empty results rather than error
          setLogs([]);
          setTotalItems(0);
          setTotalPages(1);
          setLoading(false);
          return;
        }
      }

      if (filterObj.action) {
        queryParams.append("action", filterObj.action);
      }

      if (filterObj.startDate) {
        const start = new Date(filterObj.startDate);
        start.setUTCHours(0, 0, 0, 0);
        queryParams.append("startDate", start.toISOString());
      }
      if (filterObj.endDate) {
        const end = new Date(filterObj.endDate);
        end.setUTCHours(23, 59, 59, 999);
        queryParams.append("endDate", end.toISOString());
      }

      queryParams.append("page", page);
      queryParams.append("limit", logsPerPage);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        console.error(
          "NEXT_PUBLIC_API_URL is not defined for admin activity logs"
        );
        setError("API URL is not configured.");
        setLoading(false);
        return;
      }
      const url = `${apiUrl}/api/admin-activity?${queryParams.toString()}`;

      const response = await fetchWithAuth(url);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Failed to fetch admin activity logs response:",
          response.status,
          errorText
        );
        throw new Error(
          `Failed to fetch admin activity logs: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (Array.isArray(data?.logs)) {
        setLogs(data.logs);
        setTotalItems(data.totalItems || 0);
        setTotalPages(data.totalPages || 1);
        setError(null);
      } else {
        console.error("Invalid response format for admin activity logs:", data);
        throw new Error(
          "Invalid response format from server for admin activity logs."
        );
      }
    } catch (err) {
      console.error("Error fetching admin activity logs:", err);
      setError(
        err.message || "Failed to fetch admin activity logs. Please try again."
      );
      setLogs([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const applyFilters = () => {
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      adminId: "",
      action: "",
      startDate: "",
      endDate: "",
    });
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1 && !loading) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && !loading) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Helper to render the details field with special handling for PAGE_VIEW_END
  const renderDetails = (log) => {
    if (log.action === "PAGE_VIEW_END" && log.details) {
      const durationMatch = log.details.match(/Duration: (\d+)ms/);
      if (durationMatch && durationMatch[1]) {
        const durationMs = parseInt(durationMatch[1]);
        const formattedDuration = formatDuration(durationMs);

        // Replace unmount text with "Active for" and clean up the rest
        let otherDetails = log.details
          .replace(/Duration: \d+ms\s*-?\s*/, "") // Remove duration part
          .replace(/$Unmount$/gi, "(Active for)") // Replace (Unmount) with (Active for)
          .replace(/unmount/gi, "Active for") // Replace any unmount text
          .trim();

        // Clean up any remaining dashes or extra whitespace
        otherDetails = otherDetails.replace(/^-\s*/, "").trim();

        return (
          <span className="flex items-center">
            <FaClock className="mr-1 text-gray-500" />
            {otherDetails && otherDetails !== "" ? (
              <span>
                {otherDetails} {formattedDuration}
              </span>
            ) : (
              <span>Active for {formattedDuration}</span>
            )}
          </span>
        );
      }
    }
    // Default rendering for other actions or if PAGE_VIEW_END details format is unexpected
    return log.details || "—";
  };

  if (userRole === null) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage="activity" />
      {/* <FixedLogo /> */}
      <main className="flex-1 pt-16 lg:pt-0 overflow-auto">
        <AccessControl section="activity">
          <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <FaHistory className="mr-3 text-blue-600" /> Admin Activity Logs
              </h1>
              <p className="text-gray-600 text-lg">
                View user actions and page visits within the system.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md relative mb-4 flex items-center">
                <FaTimes className="mr-2 text-xl" />
                {error}
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FaFilter className="mr-3 text-blue-600" /> Filter Activity Logs
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="form-group">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="adminId-filter"
                  >
                    <FaUserCog className="inline mr-1 text-gray-500" />
                    Admin User
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
                      <option key={admin._id} value={admin._id}>
                        {admin.username} ({admin.role})
                      </option>
                    ))}
                  </select>
                </div>

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
                    <option value="LOGIN">Login</option>
                    <option value="LOGOUT">Logout</option>
                    <option value="PAGE_VIEW_START">Page View Start</option>
                    <option value="PAGE_VIEW_END">Page View End</option>
                  </select>
                </div>

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

                <div className="form-group col-span-full sm:col-span-2 lg:col-span-3 flex justify-end gap-3 items-end">
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
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>

            {loading && logs.length === 0 ? (
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
                <p className="mt-4 text-gray-600">Loading activity logs...</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="lg:hidden divide-y divide-gray-200">
                  {logs.length > 0 ? (
                    logs.map((log) => (
                      <div key={log._id} className="p-6 space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">
                            Admin:
                          </span>
                          <span className="text-gray-700">
                            {log.adminId?.username || "Unknown"}
                          </span>
                        </div>
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
                                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                            }`}
                          >
                            {log.adminId?.role || "Unknown"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">
                            Action:
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                            {log.action}
                          </span>
                        </div>
                        {log.page && (
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-gray-900">
                              Page:
                            </span>
                            <span className="text-gray-700 break-words max-w-[60%] text-right">
                              {log.page}
                            </span>
                          </div>
                        )}
                        {/* Render formatted details */}
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">
                            Details:
                          </span>
                          <span className="text-gray-700 break-words max-w-[60%] text-right">
                            {renderDetails(log)} {/* Use the helper here */}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-900">
                            Timestamp:
                          </span>
                          <span className="text-gray-700">
                            {formatDateTime(log.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-600 flex flex-col items-center">
                      <FaExclamationTriangle className="text-yellow-500 text-3xl mb-4" />
                      {Object.values(filters).some(
                        (value) => value !== "" && value !== null
                      )
                        ? "No activity logs found matching your filter criteria. Try adjusting your filters."
                        : "No activity logs found."}
                    </div>
                  )}
                </div>

                <div className="hidden lg:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
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
                          Page/Location
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Details
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Timestamp
                        </th>
                      </tr>
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
                                        : "bg-yellow-100 text-yellow-800 border-yellow-200"
                                }`}
                              >
                                {log.adminId?.role || "Unknown"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                {log.action}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 break-words max-w-xs">
                              {log.page || "—"}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700 break-words max-w-xs">
                              {renderDetails(log)} {/* Use the helper here */}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {formatDateTime(log.createdAt)}
                            </td>
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
                              )
                                ? "No activity logs found matching your filter criteria. Try adjusting your filters."
                                : "No activity logs found."}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

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
    </div>
  );
};

export default AdminActivityLogsPage;
