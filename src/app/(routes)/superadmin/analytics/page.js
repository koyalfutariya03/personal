"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUsers,
  FaChartBar,
  FaCalendarAlt,
  FaCheck,
  FaPhoneAlt,
  FaBan,
  FaUserCog,
  FaSpinner, // For loading spinner
  FaTimes, // For error message icon
} from "react-icons/fa";
import Sidebar from "@/components/superadmin/Sidebar";
import AccessControl from "@/components/superadmin/AccessControl"; // Import AccessControl
import { fetchWithAuth } from "@/utils/auth";
import FixedLogo from "@/components/superadmin/FixedLogo";

// Simple bar chart component refactored with Tailwind
const BarChart = ({ data, title, valuePrefix = "", valueSuffix = "" }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-gray-600">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <FaChartBar className="text-gray-400 text-4xl mb-4" />
        <p>No data available for this chart.</p>
      </div>
    );
  }

  // Find the maximum value for scaling
  const maxValue = Math.max(...data.map((item) => item.count));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
        <FaChartBar className="mr-3 text-blue-600" /> {title}
      </h3>
      <div className="flex flex-col gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-sm font-medium text-gray-700">
              <span className="truncate">{item._id || "Unknown"}</span>
              <span className="font-semibold text-gray-900">
                {valuePrefix}
                {item.count}
                {valueSuffix}
              </span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-500 ease-out"
                style={{ width: `${(item.count / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Custom date formatter
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid Date"; // Handle invalid date strings
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Analytics Page
const AnalyticsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // 30 days ago
    endDate: new Date().toISOString().split("T")[0], // today
  });
  const [error, setError] = useState(null);
  const [conversionRates, setConversionRates] = useState(null);
  const [userRole, setUserRole] = useState(null); // State to store user role

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
    setUserRole(role); // Set user role state

    if (!token) {
      router.push("/AdminLogin");
      return;
    }

    // If role is neither SuperAdmin nor Admin, redirect
    // The AccessControl component will also handle showing the restricted message
    if (
      role !== "SuperAdmin" &&
      role !== "Admin" &&
      role !== "ViewMode" &&
      role !== "EditMode"
    ) {
      router.push("/dashboard"); // Or some other appropriate page
      return;
    }

    // Fetch analytics data after initial auth check
    fetchAnalytics();
  }, [router]); // Depend on router for initial check

  // Fetch analytics data with date filters when dateRange changes
  // NOTE: The original code did not use dateRange in the fetch call.
  // To make the date filter work, the API endpoint needs to accept start/end dates.
  // Assuming the API endpoint /api/analytics accepts startDate and endDate query params.
  useEffect(() => {
    // Only fetch if the user role is authorized and dateRange is set
    if (
      (userRole === "SuperAdmin" ||
        userRole === "Admin" ||
        userRole === "ViewMode" ||
        userRole === "EditMode") &&
      dateRange.startDate &&
      dateRange.endDate
    ) {
      fetchAnalyticsWithDateRange();
    }
    // Added dateRange and userRole as dependencies
  }, [dateRange, userRole]);

  // Fetch analytics data (initial fetch without dates, or if useEffect dependency changes)
  const fetchAnalytics = async () => {
    // Use current dateRange from state if available, otherwise default to last 30 days
    const currentStartDate =
      dateRange.startDate ||
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
    const currentEndDate =
      dateRange.endDate || new Date().toISOString().split("T")[0];
    await fetchAnalyticsData(currentStartDate, currentEndDate);
  };

  // Fetch analytics data with specific date range
  const fetchAnalyticsWithDateRange = async () => {
    await fetchAnalyticsData(dateRange.startDate, dateRange.endDate);
  };

  const fetchAnalyticsData = async (startDate, endDate) => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; // Use empty string as fallback
      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL is not defined");
        setError("API URL is not configured.");
        setLoading(false);
        return;
      }

      const queryParams = new URLSearchParams();
      // Add date filters to query params if provided
      if (startDate) {
        const start = new Date(startDate);
        // Set time to the beginning of the day in UTC
        start.setUTCHours(0, 0, 0, 0);
        queryParams.append("startDate", start.toISOString());
      }
      if (endDate) {
        const end = new Date(endDate);
        // Set time to the end of the day in UTC
        end.setUTCHours(23, 59, 59, 999);
        queryParams.append("endDate", end.toISOString());
      }

      const response = await fetchWithAuth(
        `${apiUrl}/api/analytics?${queryParams.toString()}` // Append query params
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Failed to fetch analytics response:",
          response.status,
          errorText
        );
        throw new Error(
          `Failed to fetch analytics data: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setAnalytics(data);

      // Calculate conversion rates
      if (data?.leads?.byStatus && data?.leads?.total !== undefined) {
        const convertedLeads =
          data.leads.byStatus.find((s) => s._id === "Converted")?.count || 0;
        const totalLeadsInPeriod = data.leads.total; // Use the total based on the date range
        const conversionRate =
          totalLeadsInPeriod > 0
            ? (convertedLeads / totalLeadsInPeriod) * 100
            : 0;

        const conversionData = {
          rate: conversionRate.toFixed(2),
          totalLeads: totalLeadsInPeriod,
          convertedLeads,
        };

        setConversionRates(conversionData);
      } else {
        setConversionRates(null); // Reset if data structure is unexpected
      }
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setError(err.message || "Failed to load analytics data.");
      setAnalytics(null); // Clear previous analytics on error
      setConversionRates(null); // Clear conversion rates on error
    } finally {
      setLoading(false);
    }
  };

  // Handle date range change (only updates state, fetch happens via useEffect)
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange({
      ...dateRange,
      [name]: value,
    });
    // Applying filters happens automatically via the useEffect hook on dateRange change
  };

  // Apply date filters - This button is now redundant as useEffect handles changes,
  // but we'll keep it to trigger a fetch manually if needed or for clarity.
  const applyDateFilter = () => {
    // The fetch is triggered by the useEffect on dateRange change.
    // We can optionally re-fetch here if needed, but it's often
    // better to let useEffect manage it based on state.
    fetchAnalyticsWithDateRange();
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
      <Sidebar activePage="analytics" /> {/* Pass activePage prop */}
      {/* <FixedLogo /> */}
      {/* Main content area - takes remaining space */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0 overflow-auto">
        {/* AccessControl handles the overall access to this page's content */}
        {/* Content only visible to users with 'analytics' access */}
        <AccessControl section="analytics">
          {" "}
          {/* Wrap content with AccessControl */}
          {/* Page content container with padding and max-width */}
          <div className="p-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                View key metrics and performance indicators for your system.
              </p>
            </div>

            {/* Page-level Error Message Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md relative mb-4 flex items-center">
                <FaTimes className="mr-2 text-xl" />
                {error}
              </div>
            )}

            {/* Loading State for Page Content */}
            {loading && !analytics ? ( // Show full-page loader only if no analytics data is loaded yet
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
                <p className="mt-4 text-gray-600">Loading analytics data...</p>
              </div>
            ) : (
              <>
                {/* Date Range Filter Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      <FaCalendarAlt className="mr-3 text-blue-600" /> Date
                      Range Filter
                    </h3>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">
                          From:
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          value={dateRange.startDate}
                          onChange={handleDateChange}
                          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={loading}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">
                          To:
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          value={dateRange.endDate}
                          onChange={handleDateChange}
                          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={loading}
                        />
                      </div>
                      {/* Apply button is now less critical with useEffect, but can remain */}
                      {/* <button
                            onClick={applyDateFilter}
                            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                             disabled={loading}
                          >
                            Apply
                          </button> */}
                    </div>
                  </div>
                </div>

                {analytics && (
                  <>
                    {/* Overview Stats */}
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <FaChartBar className="mr-3 text-blue-600" /> Quick
                        Overview
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Total Leads */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                              <FaUsers className="text-blue-600 text-xl" />
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                {analytics.leads.total}
                              </div>
                              <div className="text-sm text-gray-500">
                                Total Leads (Period)
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                            Based on Date Filter
                          </div>
                        </div>

                        {/* Converted Leads */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                              <FaCheck className="text-green-600 text-xl" />
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                {analytics.leads.byStatus.find(
                                  (s) => s._id === "Converted"
                                )?.count || 0}
                              </div>
                              <div className="text-sm text-gray-500">
                                Converted (Period)
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                            Within Date Filter
                          </div>
                        </div>

                        {/* Contacted Leads */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                              <FaPhoneAlt className="text-yellow-600 text-xl" />
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                {analytics.leads.byStatus.find(
                                  (s) => s._id === "Contacted"
                                )?.count || 0}
                              </div>
                              <div className="text-sm text-gray-500">
                                Contacted (Period)
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                            Within Date Filter
                          </div>
                        </div>

                        {/* Rejected Leads */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                              <FaBan className="text-red-600 text-xl" />
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                {analytics.leads.byStatus.find(
                                  (s) => s._id === "Rejected"
                                )?.count || 0}
                              </div>
                              <div className="text-sm text-gray-500">
                                Rejected (Period)
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                            Within Date Filter
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Time Frame Stats */}
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <FaChartBar className="mr-3 text-purple-600" /> Time
                        Frame Analysis (Last 30 Days - All Time)
                      </h2>
                      {/* Note: These specific stats (lastWeek, lastMonth) might not respect the date filter
                                      if the API only provides these fixed-period values. Adjust UI text accordingly
                                      or update backend to provide date-filtered equivalents.
                                      Assuming they are *not* date-filtered here, showing fixed periods. */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Last 7 Days */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                              <FaCalendarAlt className="text-blue-600 text-xl" />
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                {analytics.leads.lastWeek}
                              </div>
                              <div className="text-sm text-gray-500">
                                New Leads
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                            Last 7 Days (All Time Data)
                          </div>
                        </div>

                        {/* Last 30 Days */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                              <FaCalendarAlt className="text-purple-600 text-xl" />
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                {analytics.leads.lastMonth}
                              </div>
                              <div className="text-sm text-gray-500">
                                New Leads
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                            Last 30 Days (All Time Data)
                          </div>
                        </div>

                        {/* Conversion Rate */}
                        {conversionRates && (
                          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 col-span-full sm:col-span-1">
                            <div className="flex items-center justify-between mb-4">
                              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <FaChartBar className="text-green-600 text-xl" />
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">
                                  {conversionRates.rate}%
                                </div>
                                <div className="text-sm text-gray-500">
                                  Conversion Rate
                                </div>
                              </div>
                            </div>
                            <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                              Based on Date Filter
                            </div>
                          </div>
                        )}

                        {/* Active Admins */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 col-span-full sm:col-span-1">
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                              <FaUserCog className="text-red-600 text-xl" />
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                {analytics.admins.active}
                              </div>
                              <div className="text-sm text-gray-500">
                                Active Admins
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                            Currently Active
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      {/* Status Breakdown */}
                      {analytics.leads?.byStatus && (
                        <BarChart
                          data={analytics.leads.byStatus}
                          title="Lead Status Breakdown"
                          valueSuffix=" leads"
                        />
                      )}

                      {/* Course Breakdown */}
                      {analytics.leads?.byCourse && (
                        <BarChart
                          data={analytics.leads.byCourse}
                          title="Leads by Course"
                          valueSuffix=" leads"
                        />
                      )}

                      {/* Location Breakdown */}
                      {analytics.leads?.byLocation && (
                        <BarChart
                          data={analytics.leads.byLocation}
                          title="Leads by Location"
                          valueSuffix=" leads"
                        />
                      )}

                      {/* Admin Role Distribution */}
                      {analytics.admins?.byRole && (
                        <BarChart
                          data={analytics.admins.byRole}
                          title="Admin Users by Role"
                          valueSuffix=" users"
                        />
                      )}
                    </div>

                    {/* System Information Table */}
                    <div className="mb-8 mt-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <FaUserCog className="mr-3 text-green-600" /> System
                        Information
                      </h2>
                      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Mobile view (Cards) */}
                        <div className="lg:hidden divide-y divide-gray-200">
                          {/* Map analytics data into cards */}
                          {analytics.leads.total !== undefined && (
                            <div className="p-4 space-y-1 text-sm">
                              <div className="font-medium text-gray-900">
                                Leads: Total Count
                              </div>
                              <div className="text-gray-700">
                                {analytics.leads.total}
                              </div>
                            </div>
                          )}
                          {analytics.leads.lastWeek !== undefined && (
                            <div className="p-4 space-y-1 text-sm">
                              <div className="font-medium text-gray-900">
                                Leads: Last 7 Days
                              </div>
                              <div className="text-gray-700">
                                {analytics.leads.lastWeek}
                              </div>
                            </div>
                          )}
                          {analytics.leads.lastMonth !== undefined && (
                            <div className="p-4 space-y-1 text-sm">
                              <div className="font-medium text-gray-900">
                                Leads: Last 30 Days
                              </div>
                              <div className="text-gray-700">
                                {analytics.leads.lastMonth}
                              </div>
                            </div>
                          )}
                          {analytics.admins.total !== undefined && (
                            <div className="p-4 space-y-1 text-sm">
                              <div className="font-medium text-gray-900">
                                Admin Users: Total Count
                              </div>
                              <div className="text-gray-700">
                                {analytics.admins.total}
                              </div>
                            </div>
                          )}
                          {analytics.admins.active !== undefined && (
                            <div className="p-4 space-y-1 text-sm">
                              <div className="font-medium text-gray-900">
                                Admin Users: Active
                              </div>
                              <div className="text-gray-700">
                                {analytics.admins.active}
                              </div>
                            </div>
                          )}
                          {/* Include date range info */}
                          <div className="p-4 space-y-1 text-sm">
                            <div className="font-medium text-gray-900">
                              System: Current Date
                            </div>
                            <div className="text-gray-700">
                              {formatDate(new Date())}
                            </div>
                          </div>
                          <div className="p-4 space-y-1 text-sm">
                            <div className="font-medium text-gray-900">
                              System: Date Range Applied
                            </div>
                            <div className="text-gray-700">
                              {formatDate(dateRange.startDate)} -{" "}
                              {formatDate(dateRange.endDate)}
                            </div>
                          </div>
                          {/* Add conversion rate if it exists */}
                          {conversionRates && (
                            <div className="p-4 space-y-1 text-sm">
                              <div className="font-medium text-gray-900">
                                Leads: Conversion Rate (Period)
                              </div>
                              <div className="text-gray-700">
                                {conversionRates.rate}%
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Desktop view (Table) */}
                        <div className="hidden lg:block overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Category
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Detail
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                  Value
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {analytics.leads.total !== undefined && (
                                <tr className="hover:bg-gray-50 transition-colors duration-150">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Leads
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    Total Count (Period)
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {analytics.leads.total}
                                  </td>
                                </tr>
                              )}
                              {analytics.leads.lastWeek !== undefined && (
                                <tr className="hover:bg-gray-50 transition-colors duration-150">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Leads
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    Last 7 Days (All Time Data)
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {analytics.leads.lastWeek}
                                  </td>
                                </tr>
                              )}
                              {analytics.leads.lastMonth !== undefined && (
                                <tr className="hover:bg-gray-50 transition-colors duration-150">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Leads
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    Last 30 Days (All Time Data)
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {analytics.leads.lastMonth}
                                  </td>
                                </tr>
                              )}
                              {analytics.admins.total !== undefined && (
                                <tr className="hover:bg-gray-50 transition-colors duration-150">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Admin Users
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    Total Count
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {analytics.admins.total}
                                  </td>
                                </tr>
                              )}
                              {analytics.admins.active !== undefined && (
                                <tr className="hover:bg-gray-50 transition-colors duration-150">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Admin Users
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    Active
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {analytics.admins.active}
                                  </td>
                                </tr>
                              )}
                              {conversionRates && (
                                <tr className="hover:bg-gray-50 transition-colors duration-150">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    Leads
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    Conversion Rate (Period)
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    {conversionRates.rate}%
                                  </td>
                                </tr>
                              )}
                              <tr className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  System
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                  Current Date
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                  {formatDate(new Date())}
                                </td>
                              </tr>
                              <tr className="hover:bg-gray-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  System
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                  Date Range Applied
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                  {formatDate(dateRange.startDate)} -{" "}
                                  {formatDate(dateRange.endDate)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </AccessControl>
      </main>
    </div>
  );
};

export default AnalyticsPage;
