"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaSave,
  FaUndo,
  FaSpinner,
  FaInfoCircle,
  FaTimes, // For error message icon
  FaKey, // Page icon
  FaExclamationTriangle, // For no data/error message
} from "react-icons/fa";

import Sidebar from "@/components/superadmin/Sidebar"; // Import reusable Sidebar
import AccessControl from "@/components/superadmin/AccessControl"; // Import reusable AccessControl
import { fetchWithAuth } from "@/utils/auth"; // Import reusable fetch utility
import FixedLogo from "@/components/superadmin/FixedLogo";

// Permission Table Component refactored with Tailwind
const PermissionTable = ({ roleData, onChange, readOnly }) => {
  // Define the permissions structure for each feature category
  const features = [
    {
      name: "Users",
      category: "users",
      actions: ["create", "read", "update", "delete"],
    },
    {
      name: "Leads",
      category: "leads",
      actions: ["create", "read", "update", "delete"],
    },
    {
      name: "Admins",
      category: "admins",
      actions: ["create", "read", "update", "delete"],
    },
    { name: "Analytics", category: "analytics", actions: ["view"] },
    { name: "Audit Logs", category: "auditLogs", actions: ["view"] },
    { name: "Settings", category: "settings", actions: ["view"] },
    // Add other feature categories and their relevant actions here
  ];

  // Define the display order of actions
  const actionOrder = ["create", "read", "update", "delete", "view"];
  const allActions = ["create", "read", "update", "delete", "view"]; // Superset of all possible actions

  const handleCheckboxChange = (category, action, value) => {
    if (readOnly) return;

    // Ensure nested structure exists before updating
    const currentPermissions = roleData.permissions || {};
    const currentCategoryPermissions = currentPermissions[category] || {};

    const newPermissions = {
      ...currentPermissions,
      [category]: {
        ...currentCategoryPermissions,
        [action]: value,
      },
    };

    onChange(newPermissions);
  };

  // Helper to check if a specific action is enabled for a category
  const isActionEnabled = (category, action) => {
    // Use optional chaining to safely access nested permissions
    return roleData.permissions?.[category]?.[action] || false;
  };

  return (
    <div className="overflow-x-auto">
      {" "}
      {/* Responsive wrapper for horizontal scroll */}
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/4">
              Feature
            </th>{" "}
            {/* Allocate more width for Feature */}
            {actionOrder.map((action) => (
              <th
                key={action}
                className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-[12%]"
              >
                {" "}
                {/* Fixed width percentage */}
                {action.charAt(0).toUpperCase() + action.slice(1)}{" "}
                {/* Capitalize first letter */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {features.map((feature) => (
            <tr
              key={feature.category}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {feature.name}
              </td>
              {/* Iterate through all possible actions (create, read, update, delete, view) */}
              {allActions.map((action) => (
                <td
                  key={`${feature.category}-${action}`}
                  className="px-3 py-4 whitespace-nowrap text-center text-sm text-gray-700"
                >
                  {/* Only render checkbox if the action is relevant for this feature */}
                  {feature.actions.includes(action) ? (
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      checked={isActionEnabled(feature.category, action)}
                      onChange={(e) =>
                        handleCheckboxChange(
                          feature.category,
                          action,
                          e.target.checked
                        )
                      }
                      disabled={readOnly}
                    />
                  ) : (
                    <span className="text-gray-400">—</span> // Show dash if action is not applicable
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Role Permissions Management Page
const RolePermissionsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState([]); // Full list of role permissions
  const [error, setError] = useState(null); // Page-level error
  const [activeRole, setActiveRole] = useState("Admin"); // Currently selected role tab
  const [hasChanges, setHasChanges] = useState(false); // Track if changes were made to the active role's permissions
  const [submitting, setSubmitting] = useState(false); // Track if a save operation is in progress
  const [activeRoleData, setActiveRoleData] = useState(null); // Data for the currently selected role
  const [originalRoleData, setOriginalRoleData] = useState(null); // Original data for the currently selected role (for reset)
  const [userRole, setUserRole] = useState(null); // Track user role from localStorage

  // Authentication check and initial data fetch
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
      return; // Stop further execution if not authenticated
    }

    // Fetch permissions immediately if authenticated
    fetchPermissions();

    // The fetchPermissions function will set loading to false when done.
    // If fetchPermissions fails, loading will also be set to false, and error will be set.
  }, [router]); // Depend on router for initial check

  // Effect to set active role data when permissions are fetched or activeRole changes
  useEffect(() => {
    if (permissions.length > 0) {
      const roleData = permissions.find((r) => r.role === activeRole);
      if (roleData) {
        setActiveRoleData(roleData);
        // Create a deep copy for change tracking
        setOriginalRoleData(JSON.parse(JSON.stringify(roleData)));
        setHasChanges(false); // Reset changes when active role data is set
      } else {
        // This might happen on the very first load if activeRole default ("Admin") isn't the first role
        // or if the API didn't return the default "Admin" role.
        // Default to the first available role if the current activeRole is not found in the fetched list.
        const defaultRoleData = permissions[0];
        if (defaultRoleData) {
          // Only change activeRole state if it's different, to avoid infinite loops
          if (activeRole !== defaultRoleData.role) {
            setActiveRole(defaultRoleData.role);
          } else {
            // If activeRole is already the first one, just set the data
            setActiveRoleData(defaultRoleData);
            setOriginalRoleData(JSON.parse(JSON.stringify(defaultRoleData)));
            setHasChanges(false);
          }
        } else {
          // Should ideally not happen if permissions array is checked to be > 0
          console.error("No role permissions found in API response.");
          setError("Could not load role permissions.");
          setLoading(false); // Ensure loading is off if no permissions are found
        }
      }
    } else if (!loading) {
      // If permissions list is empty after loading finishes
      setError(
        "No role permissions found. Please configure roles in the backend."
      );
      setActiveRoleData(null);
      setOriginalRoleData(null);
      setHasChanges(false);
    }
    // Depend on permissions and activeRole. UserRole is needed because AccessControl might restrict rendering.
  }, [permissions, activeRole, loading]);

  const fetchPermissions = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }
      const response = await fetchWithAuth(
        `${apiUrl}/api/role-permissions` // Assuming this endpoint returns an array of role objects [{ role: '...', permissions: {...} }]
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Failed to fetch role permissions:",
          response.status,
          errorText
        );
        throw new Error(
          `Failed to fetch role permissions: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        // Ensure each role has a complete permissions structure with defaults if missing
        // This is important for the PermissionTable component to not throw errors accessing properties
        const processedData = data
          .map((role) => ({
            ...role,
            permissions: {
              users: {
                create: false,
                read: false,
                update: false,
                delete: false,
                ...(role.permissions?.users || {}),
              },
              leads: {
                create: false,
                read: false,
                update: false,
                delete: false,
                ...(role.permissions?.leads || {}),
              },
              admins: {
                create: false,
                read: false,
                update: false,
                delete: false,
                ...(role.permissions?.admins || {}),
              },
              analytics: {
                view: false,
                ...(role.permissions?.analytics || {}),
              },
              auditLogs: {
                view: false,
                ...(role.permissions?.auditLogs || {}),
              },
              settings: { view: false, ...(role.permissions?.settings || {}) }, // Ensure settings.view exists
              // Add other categories with default permissions here if applicable
              ...(role.permissions || {}), // Include any other categories returned by the API that aren't explicitly defaulted above
            },
          }))
          .sort((a, b) => {
            // Keep SuperAdmin at the top
            if (a.role === "SuperAdmin" && b.role !== "SuperAdmin") return -1;
            if (b.role === "SuperAdmin" && a.role !== "SuperAdmin") return 1;
            // Alphabetical order for others
            return a.role.localeCompare(b.role);
          });
        setPermissions(processedData);
      } else {
        console.error(
          "API response for role permissions is not an array:",
          data
        );
        throw new Error(
          "Invalid response format from server: Expected an array for permissions."
        );
      }
    } catch (err) {
      console.error("Error fetching permissions:", err);
      setError(
        err.message || "Failed to fetch role permissions. Please try again."
      );
      setPermissions([]); // Clear permissions on error
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (role) => {
    // Check for unsaved changes before switching tabs
    if (hasChanges) {
      if (!confirm("You have unsaved changes. Discard them and switch role?")) {
        return; // User clicked Cancel
      }
    }
    // If user confirmed or no changes, update active role state
    setActiveRole(role);
    // The useEffect hook tied to [activeRole] and [permissions] will handle setting activeRoleData and originalRoleData
  };

  // This function is passed down to PermissionTable to update permissions
  const handlePermissionsChange = (newPermissions) => {
    // Find the index of the active role in the permissions array
    const activeRoleIndex = permissions.findIndex(
      (p) => p.role === activeRoleData?.role
    ); // Use optional chaining

    if (activeRoleIndex === -1 || !activeRoleData) {
      console.error(
        "Active role data is missing or not found in permissions list."
      );
      setError("Could not update permissions. Please refresh the page.");
      return;
    }

    // Create a new array of permissions with the updated data for the active role
    // Ensure we spread existing properties of the active role data
    const updatedPermissionsList = [
      ...permissions.slice(0, activeRoleIndex),
      { ...activeRoleData, permissions: newPermissions }, // Update with new permissions
      ...permissions.slice(activeRoleIndex + 1),
    ];

    setPermissions(updatedPermissionsList); // Update the main permissions state
    setActiveRoleData({
      // Update the active role data state that the table is using
      ...activeRoleData,
      permissions: newPermissions,
    });

    // Check if there are changes compared to the original data (deep comparison)
    if (originalRoleData) {
      // Ensure both objects have the same structure before stringifying/comparing
      const cleanNewPermissions = JSON.parse(JSON.stringify(newPermissions)); // Simple deep clone
      const cleanOriginalPermissions = JSON.parse(
        JSON.stringify(originalRoleData.permissions)
      ); // Simple deep clone
      // Sort keys for consistent stringification if necessary (optional but safer)
      setHasChanges(
        JSON.stringify(sortObjectKeys(cleanNewPermissions)) !==
          JSON.stringify(sortObjectKeys(cleanOriginalPermissions))
      );
    } else {
      // If original data wasn't set for some reason, treat any change as having changes
      setHasChanges(true);
    }
  };

  // Helper function for consistent object key order for stringify comparison
  const sortObjectKeys = (obj) => {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys);
    }
    return Object.keys(obj)
      .sort()
      .reduce((sortedObj, key) => {
        sortedObj[key] = sortObjectKeys(obj[key]);
        return sortedObj;
      }, {});
  };

  const handleReset = () => {
    if (originalRoleData) {
      // Find the index of the active role in the permissions array
      const activeRoleIndex = permissions.findIndex(
        (p) => p.role === activeRoleData?.role
      ); // Use optional chaining

      if (activeRoleIndex === -1 || !activeRoleData) {
        console.error(
          "Active role data is missing or not found in permissions list during reset."
        );
        setError("Could not reset permissions. Please refresh the page.");
        return;
      }

      // Create a new array of permissions with the original data for the active role
      const updatedPermissionsList = [
        ...permissions.slice(0, activeRoleIndex),
        JSON.parse(JSON.stringify(originalRoleData)), // Reset to deep copy of original
        ...permissions.slice(activeRoleIndex + 1),
      ];

      setPermissions(updatedPermissionsList); // Update the main permissions state
      setActiveRoleData(JSON.parse(JSON.stringify(originalRoleData))); // Reset active role data state
      setHasChanges(false); // No changes after resetting
    } else {
      console.warn("Original role data not available for reset.");
    }
  };

  const handleSave = async () => {
    // Do not allow saving for SuperAdmin role or if there are no changes
    if (
      !activeRoleData ||
      activeRoleData.role === "SuperAdmin" ||
      !hasChanges
    ) {
      if (!hasChanges) console.log("No changes to save.");
      return;
    }

    setSubmitting(true);
    setError(null); // Clear previous errors

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }
      // Assuming the endpoint to update is by role name
      const response = await fetchWithAuth(
        `${apiUrl}/api/role-permissions/${activeRoleData.role}`,
        {
          method: "PUT", // Or POST depending on your API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            permissions: activeRoleData.permissions, // Send only the updated permissions object
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update role permissions");
      }

      // Success
      setHasChanges(false);
      setOriginalRoleData(JSON.parse(JSON.stringify(activeRoleData))); // Update original to reflect saved state

      // Optionally refresh all permissions from the server to be absolutely sure
      // await fetchPermissions(); // This will re-trigger the effect that sets activeRoleData
    } catch (err) {
      console.error("Error updating permissions:", err);
      setError(err.message || "Failed to save changes. Please try again.");
    } finally {
      setSubmitting(false);
    }
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

  // Use the imported Sidebar and AccessControl components
  return (
    // Main container flex layout
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar is always present */}
      <Sidebar activePage="roles" /> {/* Pass activePage prop */}
      {/* <FixedLogo /> */}
      {/* Main content area - takes remaining space */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0 overflow-auto">
        {/* AccessControl handles the overall access to this page's content */}
        {/* Content only visible to users with 'roles' access (likely SuperAdmins) */}
        <AccessControl section="roles">
          {" "}
          {/* Wrap content with AccessControl */}
          {/* Page content container with padding and max-width */}
          <div className="p-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Role Permissions
              </h1>
              <p className="text-gray-600 text-lg">
                Manage what each role can access and modify in the system.
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
            {loading && permissions.length === 0 && !error ? ( // Show loader only if loading and no permissions data
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
                  Loading role permissions...
                </p>
              </div>
            ) : permissions.length === 0 && !loading && !error ? ( // Show empty state if no permissions after loading
              <div className="p-6 text-center text-gray-600 flex flex-col items-center">
                <FaExclamationTriangle className="text-yellow-500 text-3xl mb-4" />
                No role permissions found. Please configure roles in the
                backend.
              </div>
            ) : (
              <>
                {/* Tabs */}
                <div className="mb-6">
                  <div className="flex border-b border-gray-200 overflow-x-auto">
                    {permissions.map((p) => (
                      <button
                        key={p.role}
                        className={`px-4 py-3 text-sm font-medium transition-colors duration-200 flex items-center gap-2 whitespace-nowrap
                               ${
                                 activeRole === p.role
                                   ? "text-blue-600 border-b-2 border-blue-600"
                                   : "text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300"
                               }
                             `}
                        onClick={() => handleRoleChange(p.role)}
                        disabled={submitting || loading} // Disable while saving or loading
                      >
                        {p.role}
                      </button>
                    ))}
                  </div>
                </div>

                {activeRoleData && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    {" "}
                    {/* Card styling */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                      <h2 className="text-xl font-bold text-gray-900 flex items-center">
                        <FaKey className="mr-3 text-blue-600" />{" "}
                        {activeRoleData.role} Role Permissions
                      </h2>

                      {activeRoleData.role !== "SuperAdmin" && (
                        <div className="flex flex-wrap gap-3">
                          {" "}
                          {/* Use flex-wrap for responsiveness */}
                          <button
                            onClick={handleReset}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            disabled={!hasChanges || submitting}
                          >
                            <FaUndo className="mr-2" /> Reset
                          </button>
                          <button
                            onClick={handleSave}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            disabled={!hasChanges || submitting}
                          >
                            {submitting ? (
                              <>
                                <FaSpinner className="animate-spin mr-2" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <FaSave className="mr-2" /> Save Changes
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                    {activeRoleData.role === "SuperAdmin" && (
                      <div className="flex items-center bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md mb-6 text-sm">
                        <FaInfoCircle className="mr-2 text-lg" />
                        <span>
                          SuperAdmin permissions cannot be modified. SuperAdmins
                          have full access to all features.
                        </span>
                      </div>
                    )}
                    {/* Permission Table */}
                    <PermissionTable
                      roleData={activeRoleData}
                      onChange={handlePermissionsChange}
                      readOnly={activeRoleData.role === "SuperAdmin"}
                    />
                    {activeRoleData.role !== "SuperAdmin" && (
                      <p className="mt-4 text-sm text-gray-600">
                        <strong>Note:</strong> Changes to role permissions will
                        affect all users assigned to the{" "}
                        <span className="font-semibold text-gray-800">
                          {activeRoleData.role}
                        </span>{" "}
                        role.
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </AccessControl>
      </main>
    </div>
  );
};

export default RolePermissionsPage;
