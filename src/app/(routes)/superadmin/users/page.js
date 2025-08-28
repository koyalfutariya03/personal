"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaKey,
  FaShieldAlt, // For error state icon
} from "react-icons/fa";

import Sidebar from "@/components/superadmin/Sidebar"; // Import reusable Sidebar
import AccessControl from "@/components/superadmin/AccessControl"; // Import reusable AccessControl
import { fetchWithAuth, ensureJsonResponse } from "@/utils/auth"; // Import reusable fetch utility

// Array of 20 distinct colors for admin users with names
const COLOR_OPTIONS = [
  { code: "#4299e1", name: "Blue" },
  { code: "#48bb78", name: "Green" },
  { code: "#ed8936", name: "Orange" },
  { code: "#f56565", name: "Red" },
  { code: "#9f7aea", name: "Purple" },
  { code: "#667eea", name: "Indigo" },
  { code: "#f687b3", name: "Pink" },
  { code: "#ecc94b", name: "Yellow" },
  { code: "#38b2ac", name: "Teal" },
  { code: "#fc8181", name: "Light Red" },
  { code: "#68d391", name: "Light Green" },
  { code: "#63b3ed", name: "Light Blue" },
  { code: "#4c51bf", name: "Dark Blue" },
  { code: "#6b46c1", name: "Dark Purple" },
  { code: "#dd6b20", name: "Dark Orange" },
  { code: "#805ad5", name: "Medium Purple" },
  { code: "#b794f4", name: "Light Purple" },
  { code: "#9ae6b4", name: "Light Mint" },
  { code: "#f6ad55", name: "Light Orange" },
  { code: "#feb2b2", name: "Light Coral" },
];

// User Management Page
const UserManagement = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create"); // "create", "edit", "delete", "reset"
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Admin",
    location: "Other",
    color: "#4299e1", // Default color
    active: true, // Default status for new admin
  });
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [userRole, setUserRole] = useState(null); // Store current user's role from localStorage

  // Get a list of colors already in use by other admins
  const getUsedColors = (currentAdminId = null) => {
    return admins
      .filter((admin) => (currentAdminId ? admin._id !== currentAdminId : true))
      .map((admin) => admin.color)
      .filter(Boolean); // Remove undefined/null values
  };

  // Get available colors (not used by other admins)
  const getAvailableColors = (currentAdminId = null) => {
    const usedColors = getUsedColors(currentAdminId);
    return COLOR_OPTIONS.filter((color) => !usedColors.includes(color.code));
  };

  // Find color name by color code
  const getColorName = (colorCode) => {
    if (!colorCode) return "Default Blue";
    const colorObj = COLOR_OPTIONS.find((color) => color.code === colorCode);
    return colorObj ? colorObj.name : "Custom";
  };

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

    // The AccessControl component will handle showing the restricted message
    // for non-SuperAdmins. We still fetch admins data if authenticated,
    // as it's needed for the table even if restricted.

    fetchAdmins();

    // The fetchAdmins function will set loading to false when done.
    // If fetchAdmins fails, loading will also be set to false, and error will be set.
  }, [router]); // Depend on router for initial check

  const fetchAdmins = async () => {
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

      const response = await fetchWithAuth(`${apiUrl}/api/admins`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Failed to fetch admin users response:",
          response.status,
          errorText
        );
        throw new Error(
          `Failed to fetch admin users: ${response.status} ${response.statusText}`
        );
      }

      await ensureJsonResponse(response);
      const data = await response.json();

      // Ensure each admin has all required fields with defaults if missing
      const processedData = Array.isArray(data)
        ? data.map((admin) => ({
            ...admin,
            location: admin.location || "Other",
            color: admin.color || "#4299e1", // Ensure default color if missing
            active: admin.active !== undefined ? admin.active : true, // Ensure active status exists, default to true
          }))
        : [];

      setAdmins(processedData);
    } catch (err) {
      console.error("Error fetching admins:", err);
      setError(err.message || "Failed to fetch admin users. Please try again.");
      setAdmins([]); // Clear admins on error
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    // Check username (required for create, but form field is readonly for edit/reset)
    if (modalType === "create") {
      if (!formData.username.trim()) {
        errors.username = "Username is required";
      } else if (formData.username.trim().length < 3) {
        errors.username = "Username must be at least 3 characters";
      }
    }

    // Check email format (only if provided)
    if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Invalid email address";
    }

    // Check passwords for create or reset operations
    if (modalType === "create" || modalType === "reset") {
      if (!formData.password) {
        errors.password = "Password is required";
      } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }

      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords don't match";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  const openCreateModal = () => {
    // Get the first available color or default to blue if none available
    const availableColors = getAvailableColors();
    const defaultColor =
      availableColors.length > 0 ? availableColors[0].code : "#4299e1";

    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Admin", // Default role
      location: "Other", // Default location
      color: defaultColor, // Assign an available color
      active: true, // Default status
    });
    setFormErrors({}); // Clear previous errors
    setSelectedAdmin(null); // Ensure selectedAdmin is null for create
    setModalType("create");
    setShowModal(true);
    setError(null); // Clear page-level error
  };

  const openEditModal = (admin) => {
    setSelectedAdmin(admin);

    setFormData({
      username: admin.username || "",
      email: admin.email || "",
      role: admin.role || "Admin", // Default role if missing
      active: admin.active !== undefined ? admin.active : true, // Default active if missing
      location: admin.location || "Other", // Default location if missing
      color: admin.color || "#4299e1", // Default color if missing
      password: "", // Passwords are not pre-filled for security
      confirmPassword: "",
    });
    setFormErrors({}); // Clear previous errors
    setModalType("edit");
    setShowModal(true);
    setError(null); // Clear page-level error
  };

  const openDeleteModal = (admin) => {
    setSelectedAdmin(admin);
    setModalType("delete");
    setShowModal(true);
    setError(null); // Clear page-level error
  };

  const openResetPasswordModal = (admin) => {
    setSelectedAdmin(admin);
    // Only reset password fields, keep admin info for display
    setFormData({
      ...formData, // Keep existing values like role, location etc.
      username: admin.username || "",
      email: admin.email || "",
      password: "",
      confirmPassword: "",
    });
    setFormErrors({}); // Clear previous errors
    setModalType("reset");
    setShowModal(true);
    setError(null); // Clear page-level error
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAdmin(null);
    setFormErrors({}); // Clear errors when closing modal
    setError(null); // Clear page-level error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle delete separately as it doesn't use form validation the same way
    if (modalType === "delete") {
      await handleDeleteAdmin();
      return;
    }

    // Validate form for create, edit, and reset
    if (!validateForm()) {
      console.error("Form validation failed:", formErrors);
      // You might want to scroll to the first error here if the form is long
      return; // Stop if validation fails
    }

    setSubmitting(true);
    setError(null); // Clear previous page-level errors on submit

    try {
      if (modalType === "create") {
        await createAdmin();
      } else if (modalType === "edit") {
        await updateAdmin();
      } else if (modalType === "reset") {
        await resetPassword();
      }
    } catch (err) {
      console.error("Error in form submission:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const createAdmin = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) throw new Error("API URL is not configured.");

      const response = await fetchWithAuth(
        `${apiUrl}/api/admins`, // Assuming this is the correct endpoint for creating admins
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username.trim(), // Trim whitespace
            email: formData.email.trim() || undefined, // Send undefined if empty
            password: formData.password,
            role: formData.role,
            location: formData.location,
            color: formData.color,
            active: true, // New admins are active by default
          }),
        }
      );

      if (!response.ok) {
        await ensureJsonResponse(response);
        const data = await response.json();
        throw new Error(data.message || "Failed to create admin");
      }

      // Success
      await fetchAdmins(); // Refresh the list
      closeModal();
    } catch (err) {
      console.error("Error creating admin:", err);
      // Error state is set in handleSubmit
      throw err; // Re-throw to be caught by handleSubmit
    }
  };

  const updateAdmin = async () => {
    try {
      if (!selectedAdmin?._id) throw new Error("No admin selected for update.");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) throw new Error("API URL is not configured.");

      const updateData = {
        role: formData.role,
        active: formData.active,
        email: formData.email.trim() || undefined, // Send undefined if empty
        location: formData.location,
        color: formData.color,
        // Password is not sent in the general update; use resetPassword instead
      };

      // Prevent changing role or status of the currently logged-in SuperAdmin
      if (
        selectedAdmin._id === getCurrentUserID() &&
        userRole === "SuperAdmin"
      ) {
        // Should not be able to change role or status of self if SuperAdmin
        // Frontend should ideally disable these fields, but double-check here too.
        delete updateData.role;
        delete updateData.active;
        console.warn(
          "Attempted to change role or status of logged-in SuperAdmin. Action prevented."
        );
        setError(
          "You cannot change the role or status of your own SuperAdmin account."
        );
        setSubmitting(false); // Turn off submitting
        return; // Stop the update process
      }

      // Prevent changing role of SuperAdmin to something else
      if (
        selectedAdmin.role === "SuperAdmin" &&
        formData.role !== "SuperAdmin"
      ) {
        setError(
          "You cannot change a SuperAdmin's role to a non-SuperAdmin role."
        );
        setSubmitting(false); // Turn off submitting
        return; // Stop the update process
      }

      const response = await fetchWithAuth(
        `${apiUrl}/api/admins/${selectedAdmin._id}`, // Assuming this is the correct endpoint
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        await ensureJsonResponse(response);
        const data = await response.json();
        console.error(
          "Error response during admin update:",
          response.status,
          data
        );
        throw new Error(
          data.message || `Failed to update admin: ${response.statusText}`
        );
      }

      await ensureJsonResponse(response);
      const data = await response.json(); // Assuming backend returns the updated admin

      // Update local admin data immediately with the response from the server
      if (data && data.admin) {
        // Ensure the updated admin has all fields properly set from the response
        const updatedAdmin = {
          ...data.admin,
          // Add any missing fields from response using defaults if needed
          location: data.admin.location || "Other",
          color: data.admin.color || "#4299e1",
          active: data.admin.active !== undefined ? data.admin.active : true,
        };

        setAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin._id === selectedAdmin._id
              ? updatedAdmin // Use the complete updatedAdmin object from server response
              : admin
          )
        );
      } else {
        // If we didn't get admin data back, refresh the whole list
        await fetchAdmins();
      }

      closeModal();
    } catch (err) {
      console.error("Error updating admin:", err);
      // Error state is set in handleSubmit
      throw err; // Re-throw to be caught by handleSubmit
    }
  };

  const resetPassword = async () => {
    try {
      if (!selectedAdmin?._id)
        throw new Error("No admin selected for password reset.");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) throw new Error("API URL is not configured.");

      // Prevent resetting SuperAdmin password via this interface
      if (selectedAdmin.role === "SuperAdmin") {
        setError(
          "Password reset for SuperAdmins is not allowed via this interface."
        );
        setSubmitting(false); // Turn off submitting
        return; // Stop the reset process
      }

      const response = await fetchWithAuth(
        `${apiUrl}/api/admins/${selectedAdmin._id}/reset-password`, // Assuming a specific endpoint for password reset
        {
          method: "POST", // Or PUT, depending on your API design
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: formData.password,
          }),
        }
      );

      if (!response.ok) {
        await ensureJsonResponse(response);
        const data = await response.json();
        console.error(
          "Error response during password reset:",
          response.status,
          data
        );
        throw new Error(
          data.message || `Failed to reset password: ${response.statusText}`
        );
      }

      closeModal();
      alert(
        `Password for "${selectedAdmin.username}" has been reset successfully.`
      );
    } catch (err) {
      console.error("Error resetting password:", err);
      // Error state is set in handleSubmit
      throw err; // Re-throw to be caught by handleSubmit
    }
  };

  const handleDeleteAdmin = async () => {
    if (!selectedAdmin?._id) {
      console.warn("No admin selected for deletion. Skipping.");
      closeModal();
      return;
    }

    // Prevent deleting the currently logged-in user
    if (selectedAdmin._id === getCurrentUserID()) {
      alert("You cannot delete your own user account.");
      console.warn("Attempted to delete logged-in user.");
      closeModal();
      return;
    }
    // Prevent deleting the SuperAdmin role if it's the only SuperAdmin
    // This check might be better handled on the backend, but a frontend check is also good.
    if (selectedAdmin.role === "SuperAdmin") {
      const superAdmins = admins.filter((admin) => admin.role === "SuperAdmin");
      if (superAdmins.length <= 1) {
        alert("Cannot delete the last SuperAdmin account.");
        console.warn("Attempted to delete the last SuperAdmin account.");
        closeModal();
        return;
      }
    }

    setSubmitting(true);
    setError(null); // Clear previous page-level errors

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) throw new Error("API URL is not configured.");

      const response = await fetchWithAuth(
        `${apiUrl}/api/admins/${selectedAdmin._id}`, // Assuming this is the correct endpoint
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        await ensureJsonResponse(response);
        const data = await response.json();
        console.error(
          "Error response during admin delete:",
          response.status,
          data
        );
        throw new Error(
          data.message || `Failed to delete admin: ${response.statusText}`
        );
      }

      await fetchAdmins(); // Refresh the list (will also turn off loading)
      closeModal();
    } catch (err) {
      console.error("Error deleting admin:", err);
      setError(err.message || "Failed to delete admin. Please try again.");
      setSubmitting(false); // Turn off submitting on error
    }
    // Submitting is turned off inside fetchAdmins finally block if successful
  };

  const toggleAdminStatus = async (admin) => {
    // Prevent changing status of the currently logged-in user
    if (admin._id === getCurrentUserID()) {
      alert("You cannot change the status of your own user account.");
      console.warn("Attempted to change status of logged-in user.");
      return;
    }

    // Prevent deactivating the SuperAdmin role if it's the only SuperAdmin
    if (admin.role === "SuperAdmin" && !admin.active) {
      // If trying to deactivate a SuperAdmin
      const superAdmins = admins.filter(
        (a) => a.role === "SuperAdmin" && a._id !== admin._id
      );
      // Count other *active* SuperAdmins. If none, prevent deactivation.
      if (superAdmins.filter((a) => a.active).length === 0) {
        alert("Cannot deactivate the last active SuperAdmin account.");
        console.warn(
          "Attempted to deactivate the last active SuperAdmin account."
        );
        return;
      }
    }

    setLoading(true); // Show loading indicator
    setError(null); // Clear previous errors

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) throw new Error("API URL is not configured.");

      const response = await fetchWithAuth(
        `${apiUrl}/api/admins/${admin._id}`, // Assuming this is the correct endpoint for status update
        {
          method: "PUT", // Using PUT for partial update
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            active: !admin.active, // Toggle the active status
          }),
        }
      );

      if (!response.ok) {
        await ensureJsonResponse(response);
        const data = await response.json();
        console.error(
          "Error response during status toggle:",
          response.status,
          data
        );
        throw new Error(
          data.message ||
            `Failed to update admin status: ${response.statusText}`
        );
      }

      // Success
      // Update the specific admin in the local state without refetching the whole list
      setAdmins((prevAdmins) =>
        prevAdmins.map((a) =>
          a._id === admin._id ? { ...a, active: !a.active } : a
        )
      );
    } catch (err) {
      console.error("Error toggling admin status:", err);
      setError(
        err.message || "Failed to update admin status. Please try again."
      );
    } finally {
      setLoading(false); // Turn off loading after status update attempt
    }
  };

  const getCurrentUserID = () => {
    return typeof localStorage !== "undefined"
      ? localStorage.getItem("adminId")
      : null;
  };

  // If still loading initial data and user role is not yet determined/checked
  // This check prevents rendering the main content or AccessControl before auth check
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
      <Sidebar activePage="users" />

      {/* Main content area - takes remaining space */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0 overflow-auto">
        {/* AccessControl handles the overall access to this page's content */}
        {/* Content only visible to users with 'users' access */}
        <AccessControl section="users">
          {/* Page content container with padding and max-width */}
          <div className="p-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                User Management
              </h1>
              <p className="text-gray-600 text-lg">
                Create and manage admin users and their permissions.
              </p>
            </div>

            {/* Error Message Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md relative mb-4 flex items-center">
                <FaTimes className="mr-2 text-xl" />
                {error}
              </div>
            )}

            {/* Create User Button */}
            <div className="flex justify-start mb-6">
              <button
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={openCreateModal}
                disabled={loading || submitting}
              >
                <FaUserPlus className="mr-2" /> Create New Admin
              </button>
            </div>

            {/* Loading State for Table */}
            {loading && !admins.length ? ( // Show table loader only if no admins are loaded yet
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
                <p className="mt-4 text-gray-600">Loading users...</p>
              </div>
            ) : (
              /* Admin Users Table Card */
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Mobile View (Cards) */}
                <div className="lg:hidden divide-y divide-gray-200">
                  {admins.length > 0 ? (
                    admins.map((admin) => (
                      <div key={admin._id} className="p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-gray-900 text-lg flex items-center">
                            <div
                              className="w-6 h-6 rounded-md mr-2 border border-gray-300"
                              style={{
                                backgroundColor: admin.color || "#4299e1",
                              }}
                            ></div>
                            {admin.username}
                          </div>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                              admin.role === "SuperAdmin"
                                ? "bg-purple-100 text-purple-800 border-purple-200"
                                : admin.role === "Admin"
                                  ? "bg-blue-100 text-blue-800 border-blue-200"
                                  : admin.role === "ViewMode"
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : "bg-yellow-100 text-yellow-800 border-yellow-200" // EditMode
                            }`}
                          >
                            {admin.role}
                          </span>
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-medium text-gray-500">
                            Email:
                          </span>{" "}
                          {admin.email || "—"}
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-medium text-gray-500">
                            Location:
                          </span>{" "}
                          {admin.location || "—"}
                        </div>
                        <div className="text-sm flex items-center">
                          <span className="font-medium text-gray-500 mr-2">
                            Status:
                          </span>
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
                        </div>
                        <div className="text-sm text-gray-700">
                          <span className="font-medium text-gray-500">
                            Created At:
                          </span>{" "}
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2 pt-3 border-t border-gray-100">
                          <button
                            onClick={() => openEditModal(admin)}
                            className="p-2 rounded-md text-blue-600 hover:bg-blue-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={
                              submitting ||
                              (admin._id === getCurrentUserID() &&
                                userRole === "SuperAdmin")
                            } // Prevent editing self if SuperAdmin
                            title="Edit User"
                            aria-label={`Edit user ${admin.username}`}
                          >
                            <FaEdit className="text-lg" />
                          </button>
                          <button
                            onClick={() => openResetPasswordModal(admin)}
                            className="p-2 rounded-md text-purple-600 hover:bg-purple-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={submitting || admin.role === "SuperAdmin"} // Prevent resetting SuperAdmin password via this interface
                            title="Reset Password"
                            aria-label={`Reset password for ${admin.username}`}
                          >
                            <FaKey className="text-lg" />
                          </button>
                          <button
                            onClick={() => toggleAdminStatus(admin)}
                            className={`p-2 rounded-md ${admin.active ? "text-red-600 hover:bg-red-100" : "text-green-600 hover:bg-green-100"} transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed`}
                            disabled={
                              submitting ||
                              admin._id === getCurrentUserID() ||
                              admin.role === "SuperAdmin"
                            } // Prevent deactivating self or SuperAdmin role
                            title={
                              admin.active ? "Deactivate User" : "Activate User"
                            }
                            aria-label={
                              admin.active
                                ? `Deactivate user ${admin.username}`
                                : `Activate user ${admin.username}`
                            }
                          >
                            {admin.active ? (
                              <FaTimes className="text-lg" />
                            ) : (
                              <FaCheck className="text-lg" />
                            )}
                          </button>
                          <button
                            onClick={() => openDeleteModal(admin)}
                            className="p-2 rounded-md text-red-600 hover:bg-red-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={
                              submitting ||
                              admin._id === getCurrentUserID() ||
                              admin.role === "SuperAdmin"
                            } // Prevent deleting self or SuperAdmin role
                            title="Delete User"
                            aria-label={`Delete user ${admin.username}`}
                          >
                            <FaTrash className="text-lg" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-600">
                      {error
                        ? `Error loading admin users: ${error}`
                        : "No admin users found."}
                    </div>
                  )}
                </div>

                {/* Desktop View (Table) */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Username
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Color
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Created At
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {admins.length > 0 ? (
                        admins.map((admin) => (
                          <tr
                            key={admin._id}
                            className="hover:bg-gray-50 transition-colors duration-150"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              <div className="flex items-center">
                                <div
                                  className="w-6 h-6 rounded-md mr-3 border border-gray-300"
                                  style={{
                                    backgroundColor: admin.color || "#4299e1",
                                  }}
                                ></div>
                                {admin.username}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {admin.email || "—"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                  admin.role === "SuperAdmin"
                                    ? "bg-purple-100 text-purple-800 border-purple-200"
                                    : admin.role === "Admin"
                                      ? "bg-blue-100 text-blue-800 border-blue-200"
                                      : admin.role === "ViewMode"
                                        ? "bg-green-100 text-green-800 border-green-200"
                                        : "bg-yellow-100 text-yellow-800 border-yellow-200" // EditMode
                                }`}
                              >
                                {admin.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {admin.location || "—"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {getColorName(admin.color || "#4299e1")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {new Date(admin.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => openEditModal(admin)}
                                  className="p-2 rounded-md text-blue-600 hover:bg-blue-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                  disabled={
                                    submitting ||
                                    (admin._id === getCurrentUserID() &&
                                      userRole === "SuperAdmin")
                                  } // Prevent editing self if SuperAdmin
                                  title="Edit User"
                                  aria-label={`Edit user ${admin.username}`}
                                >
                                  <FaEdit className="text-lg" />
                                </button>
                                <button
                                  onClick={() => openResetPasswordModal(admin)}
                                  className="p-2 rounded-md text-purple-600 hover:bg-purple-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                  disabled={
                                    submitting || admin.role === "SuperAdmin"
                                  } // Prevent resetting SuperAdmin password via this interface
                                  title="Reset Password"
                                  aria-label={`Reset password for ${admin.username}`}
                                >
                                  <FaKey className="text-lg" />
                                </button>
                                <button
                                  onClick={() => toggleAdminStatus(admin)}
                                  className={`p-2 rounded-md ${admin.active ? "text-red-600 hover:bg-red-100" : "text-green-600 hover:bg-green-100"} transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed`}
                                  disabled={
                                    submitting ||
                                    admin._id === getCurrentUserID() ||
                                    admin.role === "SuperAdmin"
                                  } // Prevent deactivating self or SuperAdmin role
                                  title={
                                    admin.active
                                      ? "Deactivate User"
                                      : "Activate User"
                                  }
                                  aria-label={
                                    admin.active
                                      ? `Deactivate user ${admin.username}`
                                      : `Activate user ${admin.username}`
                                  }
                                >
                                  {admin.active ? (
                                    <FaTimes className="text-lg" />
                                  ) : (
                                    <FaCheck className="text-lg" />
                                  )}
                                </button>
                                <button
                                  onClick={() => openDeleteModal(admin)}
                                  className="p-2 rounded-md text-red-600 hover:bg-red-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                  disabled={
                                    submitting ||
                                    admin._id === getCurrentUserID() ||
                                    admin.role === "SuperAdmin"
                                  } // Prevent deleting self or SuperAdmin role
                                  title="Delete User"
                                  aria-label={`Delete user ${admin.username}`}
                                >
                                  <FaTrash className="text-lg" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="8"
                            className="px-6 py-4 text-center text-gray-600"
                          >
                            {error
                              ? `Error loading admin users: ${error}`
                              : "No admin users found."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </AccessControl>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001] p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {modalType === "create"
                  ? "Create New Admin User"
                  : modalType === "edit"
                    ? "Edit Admin User"
                    : modalType === "delete"
                      ? "Delete Admin User"
                      : "Reset Password"}
              </h3>
              <button
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl leading-none disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={closeModal}
                disabled={submitting}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                {modalType === "delete" ? (
                  <p className="text-gray-700 text-center py-4">
                    Are you sure you want to delete the admin user "
                    <span className="font-semibold">
                      {selectedAdmin?.username}
                    </span>
                    "? This action cannot be undone.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    {" "}
                    {/* Responsive grid for form fields */}
                    {/* Username field - readonly for edit mode */}
                    <div className="md:col-span-2">
                      {" "}
                      {/* Span full width on desktop */}
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="username"
                      >
                        Username{" "}
                        {modalType === "create" && (
                          <span className="text-red-500">*</span>
                        )}
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.username ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"}`}
                        readOnly={modalType !== "create"} // Readonly if not creating
                        required={modalType === "create"} // Required only for create
                        disabled={submitting || modalType !== "create"} // Disable if submitting or not creating
                      />
                      {formErrors.username && (
                        <p className="mt-1 text-sm text-red-600">
                          {formErrors.username}
                        </p>
                      )}
                    </div>
                    {/* Email field */}
                    <div className="md:col-span-2">
                      {" "}
                      {/* Span full width on desktop */}
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="email"
                      >
                        Email (optional)
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"}`}
                        disabled={submitting}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    {/* Location field */}
                    {(modalType === "create" || modalType === "edit") && (
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 mb-1"
                          htmlFor="location"
                        >
                          Location
                        </label>
                        <select
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={submitting}
                        >
                          <option value="Pune">Pune</option>
                          <option value="Mumbai">Mumbai</option>
                          <option value="Raipur">Raipur</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    )}
                    {/* Role dropdown - only for create and edit */}
                    {(modalType === "create" || modalType === "edit") && (
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 mb-1"
                          htmlFor="role"
                        >
                          Role {<span className="text-red-500">*</span>}
                        </label>
                        <select
                          id="role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={
                            submitting || selectedAdmin?.role === "SuperAdmin"
                          } // Prevent changing role of SuperAdmin
                          required
                        >
                          <option value="Admin">Admin</option>
                          <option value="ViewMode">View Mode</option>
                          <option value="EditMode">Edit Mode</option>
                          {/* Only allow creating/assigning SuperAdmin role if current user is SuperAdmin */}
                          {userRole === "SuperAdmin" && (
                            <option value="SuperAdmin">Super Admin</option>
                          )}
                        </select>
                      </div>
                    )}
                    {/* Color field */}
                    {(modalType === "create" || modalType === "edit") &&
                      // Disable color selection for SuperAdmins (or remove if they shouldn't have colors)
                      selectedAdmin?.role !== "SuperAdmin" && (
                        <div className="md:col-span-2">
                          {" "}
                          {/* Span full width */}
                          <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="color"
                          >
                            Color
                          </label>
                          <div className="relative">
                            <select
                              id="color"
                              name="color"
                              value={formData.color}
                              onChange={handleInputChange}
                              className="block w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed appearance-none" // appearance-none to hide default arrow
                              disabled={submitting}
                            >
                              {/* Add current color if editing and it's not in available list */}
                              {modalType === "edit" &&
                                selectedAdmin?.color &&
                                !getAvailableColors(selectedAdmin?._id).some(
                                  (c) => c.code === selectedAdmin.color
                                ) && (
                                  <option
                                    value={selectedAdmin.color}
                                    // Use inline style for background color with transparency
                                    style={{
                                      backgroundColor: `${selectedAdmin.color}20`,
                                    }}
                                  >
                                    {getColorName(selectedAdmin.color)} (
                                    {selectedAdmin.color}) - Current
                                  </option>
                                )}

                              {/* List available colors */}
                              {getAvailableColors(selectedAdmin?._id).map(
                                (color, index) => (
                                  <option
                                    key={index}
                                    value={color.code}
                                    // Use inline style for background color with transparency
                                    style={{
                                      backgroundColor: `${color.code}20`,
                                    }}
                                  >
                                    {color.name} ({color.code})
                                  </option>
                                )
                              )}
                              {/* Add a generic option if no colors are available, or if you allow custom colors */}
                              {getAvailableColors(selectedAdmin?._id).length ===
                                0 &&
                                modalType !== "edit" && (
                                  <option value="" disabled>
                                    No colors available
                                  </option>
                                )}
                            </select>
                            <div
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded border border-gray-300 pointer-events-none"
                              style={{
                                backgroundColor: formData.color || "#4299e1",
                              }}
                            />
                            {/* Custom arrow for select */}
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                              <svg
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                            <div
                              className="w-5 h-5 rounded-md border border-gray-300"
                              style={{
                                backgroundColor: formData.color || "#4299e1",
                              }}
                            />
                            <span>Color Preview</span>
                          </div>
                        </div>
                      )}
                    {/* Active status toggle - only for edit */}
                    {modalType === "edit" && (
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 mb-1"
                          htmlFor="active"
                        >
                          Status {<span className="text-red-500">*</span>}
                        </label>
                        <select
                          id="active"
                          name="active"
                          value={formData.active.toString()} // Use toString for select value
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              active: e.target.value === "true", // Convert string back to boolean
                            })
                          }
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={
                            submitting ||
                            selectedAdmin?._id === getCurrentUserID() || // Prevent changing status of logged-in user
                            selectedAdmin?.role === "SuperAdmin" // Prevent changing status of SuperAdmin role
                          }
                          required
                        >
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </select>
                      </div>
                    )}
                    {/* Password fields - only for create and reset */}
                    {(modalType === "create" || modalType === "reset") && (
                      <>
                        <div className="md:col-span-2">
                          {" "}
                          {/* Span full width */}
                          <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="password"
                          >
                            New Password <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"}`}
                            required
                            disabled={submitting}
                          />
                          {formErrors.password && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.password}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          {" "}
                          {/* Span full width */}
                          <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="confirmPassword"
                          >
                            Confirm New Password{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.confirmPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"}`}
                            required
                            disabled={submitting}
                          />
                          {formErrors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.confirmPassword}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              {/* Modal Footer */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`inline-flex items-center px-4 py-2 font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm
                      ${
                        modalType === "delete"
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }
                    `}
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      {modalType === "create"
                        ? "Creating..."
                        : modalType === "edit"
                          ? "Updating..."
                          : modalType === "delete"
                            ? "Deleting..."
                            : "Resetting..."}
                    </>
                  ) : (
                    <>
                      {modalType === "create"
                        ? "Create Admin"
                        : modalType === "edit"
                          ? "Update Admin"
                          : modalType === "delete"
                            ? "Delete Admin"
                            : "Reset Password"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;