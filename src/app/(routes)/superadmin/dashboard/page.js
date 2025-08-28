"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUsers,
  FaUserCog,
  FaChartBar,
  FaArrowUp,
  FaClock,
  FaCalendar,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";
import Link from "next/link";
import Sidebar from "@/components/superadmin/Sidebar";
import AccessControl from "@/components/superadmin/AccessControl";
import { fetchWithAuth } from "@/utils/auth";
import FixedLogo from "@/components/superadmin/FixedLogo";

const SuperAdminDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(null);

  // Authentication check
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const role = localStorage.getItem("adminRole");

    if (!token) {
      router.push("/AdminLogin");
      return;
    }

    if (role !== "SuperAdmin" && role !== "Admin") {
      router.push("/dashboard");
      return;
    }

    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch analytics data
      const analyticsResponse = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/analytics`
      );

      if (!analyticsResponse.ok) {
        throw new Error("Failed to fetch analytics data");
      }

      const analyticsData = await analyticsResponse.json();
      setAnalytics(analyticsData);

      // Fetch admin users
      const adminsResponse = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admins`
      );

      if (!adminsResponse.ok) {
        throw new Error("Failed to fetch admin users");
      }

      const adminsData = await adminsResponse.json();
      setAdmins(adminsData);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar activePage="dashboard" />
        <main className="flex-1 overflow-hidden">
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Loading Spinner */}
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div
                className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              ></div>
            </div>

            {/* Loading Text */}
            <div className="mt-8 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Loading dashboard data...
              </h2>
              <p className="text-gray-600">
                Please wait while we fetch your analytics
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar activePage="dashboard" />
        <main className="flex-1 p-6">
          <div className="max-w-md mx-auto mt-20">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-red-600 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Error Loading Dashboard
              </h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchDashboardData}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const getRoleBadgeClasses = (role) => {
    switch (role) {
      case "SuperAdmin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Admin":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ViewMode":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage="dashboard" />
      {/* <FixedLogo /> */}
      {/* Add padding-top for mobile menu button */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0 overflow-auto">
        <AccessControl section="dashboard">
          <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Dashboard
                  </h1>
                  <p className="text-gray-600 text-lg">
                    Welcome to the SuperAdmin panel. Here's an overview of your
                    system.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaClock className="text-blue-500" />
                  <span>Last updated: {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {analytics && (
              <>
                {/* Lead Statistics */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaChartBar className="text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Lead Statistics
                    </h2>
                  </div>

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
                            Total Leads
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                        All Time
                      </div>
                    </div>

                    {/* Last Week */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <FaArrowUp className="text-green-600 text-xl" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            {analytics.leads.lastWeek}
                          </div>
                          <div className="text-sm text-gray-500">Last Week</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                        7 Days
                      </div>
                    </div>

                    {/* Last Month */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <FaCalendar className="text-purple-600 text-xl" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            {analytics.leads.lastMonth}
                          </div>
                          <div className="text-sm text-gray-500">
                            Last Month
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                        30 Days
                      </div>
                    </div>

                    {/* Active Admins */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
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
                        Online Now
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lead Status Breakdown */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FaChartBar className="text-purple-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Lead Status Breakdown
                    </h2>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {analytics.leads.byStatus.map((status, index) => {
                        const statusColors = [
                          "bg-blue-50 border-blue-200 text-blue-800",
                          "bg-green-50 border-green-200 text-green-800",
                          "bg-yellow-50 border-yellow-200 text-yellow-800",
                          "bg-red-50 border-red-200 text-red-800",
                          "bg-purple-50 border-purple-200 text-purple-800",
                          "bg-indigo-50 border-indigo-200 text-indigo-800",
                        ];

                        return (
                          <div
                            key={index}
                            className={`border-2 rounded-lg p-4 text-center ${statusColors[index % statusColors.length]}`}
                          >
                            <div className="text-2xl font-bold mb-1">
                              {status.count}
                            </div>
                            <div className="text-sm font-medium">
                              {status._id || "Unspecified"}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Admin Users Table */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <FaUserCog className="text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Admin Users</h2>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Mobile view */}
                <div className="lg:hidden">
                  <div className="divide-y divide-gray-200">
                    {admins.map((admin) => (
                      <div key={admin._id} className="p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-gray-900">
                            {admin.username}
                          </div>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeClasses(admin.role)}`}
                          >
                            {admin.role}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Status:</span>
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              admin.active
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {admin.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Created:</span>
                          <span className="text-gray-900">
                            {new Date(admin.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Desktop view */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Username
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Created At
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {admins.map((admin) => (
                        <tr
                          key={admin._id}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                <FaUserCog className="text-gray-600 text-sm" />
                              </div>
                              <div className="font-medium text-gray-900">
                                {admin.username}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeClasses(admin.role)}`}
                            >
                              {admin.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                admin.active
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full mr-1 ${
                                  admin.active ? "bg-green-400" : "bg-red-400"
                                }`}
                              ></div>
                              {admin.active ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(admin.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/superadmin/users"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md group"
              >
                <FaUserCog className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                Manage Users
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <Link
                href="/superadmin/leads"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow-md group"
              >
                <FaUsers className="mr-2 group-hover:scale-110 transition-transform duration-200" />
                Manage Leads
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </AccessControl>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
