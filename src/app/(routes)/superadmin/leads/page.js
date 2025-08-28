"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  FaUsers,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaFilter,
  FaDownload,
  FaSearch,
  FaCalendarAlt,
  FaUserEdit,
  FaSync,
  FaTimes,
  FaCheckSquare, // For checkbox (checked)
  FaSquare, // For checkbox (unchecked)
  FaShieldAlt, // For error state icon - Removed as not used, but keep if needed
} from "react-icons/fa";

import Sidebar from "@/components/superadmin/Sidebar";
import AccessControl from "@/components/superadmin/AccessControl";
import { fetchWithAuth } from "@/utils/auth";
import FixedLogo from "@/components/superadmin/FixedLogo";

// Array of 20 distinct colors for admin users with names (Used for assignedTo color background)
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

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Lead Management Page
const LeadManagementPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [leads, setLeads] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    countryCode: "+91", // Default to +91 or a common code
    coursename: "",
    location: "",
    status: "New",
    notes: "",
    assignedTo: "",
  });
  const [selectedLead, setSelectedLead] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [filters, setFilters] = useState({
    status: "",
    assignedTo: "",
    coursename: "",
    location: "",
    startDate: "",
    endDate: "",
    search: "",
  });
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [courseOptions, setCourseOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const leadsPerPage = 20;
  const [bulkActionModalOpen, setBulkActionModalOpen] = useState(false);
  const [bulkActionType, setBulkActionType] = useState("status");
  const [bulkFormData, setBulkFormData] = useState({
    status: "New",
    assignedTo: "",
  });
  const [userRole, setUserRole] = useState(null);
  const [searchInput, setSearchInput] = useState(""); // For the actual input field
  const [debouncedSearch, setDebouncedSearch] = useState(""); // For the debounced search

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

    if (
      role !== "SuperAdmin" &&
      role !== "Admin" &&
      role !== "ViewMode" &&
      role !== "EditMode"
    ) {
      router.push("/dashboard");
      return;
    }

    fetchData();
  }, [router]);

  useEffect(() => {
    if (
      userRole === "SuperAdmin" ||
      userRole === "Admin" ||
      userRole === "ViewMode" ||
      userRole === "EditMode"
    ) {
      fetchLeads();
    }
  }, [currentPage, filters, userRole]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const adminsResponse = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admins`
      );

      let adminsData = [];
      if (adminsResponse.ok) {
        adminsData = await adminsResponse.json();
        setAdmins(adminsData);
      } else {
        console.error("Failed to fetch admins:", await adminsResponse.text());
      }
    } catch (err) {
      console.error("Error fetching initial data (admins):", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();

      if (filters.status) queryParams.append("status", filters.status);

      if (filters.assignedTo === "unassigned") {
        queryParams.append("assignedTo", "null");
      } else if (filters.assignedTo === "assigned") {
        queryParams.append("assignedTo", "notnull");
      } else if (filters.assignedTo) {
        queryParams.append("assignedTo", filters.assignedTo);
      }

      if (filters.coursename)
        queryParams.append("coursename", filters.coursename);
      if (filters.location) queryParams.append("location", filters.location);

      if (filters.startDate)
        queryParams.append(
          "startDate",
          new Date(filters.startDate).toISOString()
        );
      if (filters.endDate) {
        const endDate = new Date(filters.endDate);
        endDate.setDate(endDate.getDate() + 1);
        queryParams.append("endDate", endDate.toISOString());
      }

      if (filters.search) queryParams.append("search", filters.search);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL is not defined");
        setError("API URL is not configured.");
        setLoading(false);
        return;
      }

      const response = await fetchWithAuth(
        `${apiUrl}/api/leads/filter?${queryParams.toString()}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Failed to fetch leads response:",
          response.status,
          errorText
        );
        throw new Error(
          `Failed to fetch leads: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      const leadsData = Array.isArray(data) ? data : data.leads || [];
      const totalItemsData = Array.isArray(data)
        ? data.length
        : data.totalItems || leadsData.length;

      setLeads(leadsData);
      setTotalLeads(totalItemsData);
      setTotalPages(Math.ceil(totalItemsData / leadsPerPage));

      const courses = [
        ...new Set(leadsData.map((lead) => lead.coursename).filter(Boolean)),
      ].sort();
      const locations = [
        ...new Set(leadsData.map((lead) => lead.location).filter(Boolean)),
      ].sort();

      setCourseOptions(courses);
      setLocationOptions(locations);

      setSelectedLeads([]);
      setSelectAll(false);
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError(err.message);
      setLeads([]);
      setTotalLeads(0);
      setTotalPages(1);
      setCourseOptions([]);
      setLocationOptions([]);
    } finally {
      setLoading(false);
    }
  };

  const validateModalForm = (formData, modalType) => {
    const errors = {};
    if (modalType !== "assign") {
      if (!formData.name.trim()) errors.name = "Name is required";
      if (!formData.email.trim()) errors.email = "Email is required";
      if (!formData.contact.trim())
        errors.contact = "Contact number is required";
      if (!formData.status) errors.status = "Status is required";

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email.trim() && !emailPattern.test(formData.email.trim())) {
        errors.email = "Invalid email address";
      }

      const contactPattern = /^\d+$/;
      if (
        formData.contact.trim() &&
        !contactPattern.test(formData.contact.trim())
      ) {
        errors.contact = "Contact number must contain only digits";
      } else if (
        formData.contact.trim() &&
        formData.contact.trim().length < 5
      ) {
        errors.contact = "Contact number is too short";
      }

      if (formData.contact.trim() && !formData.countryCode.trim()) {
        errors.countryCode = "Country code is required for contact number";
      } else if (
        formData.countryCode.trim() &&
        !/^\+?\d+$/.test(formData.countryCode.trim())
      ) {
        errors.countryCode = "Invalid country code format (e.g., +91)";
      }
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  // debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      // Trim whitespace and update the actual search filter
      setFilters((prev) => ({
        ...prev,
        search: searchInput.trim(),
      }));
    }, 500); // 500ms delay - adjust as needed

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Update your handleFilterChange function
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    if (name === "search") {
      // For search, update the input state instead of filters directly
      setSearchInput(value);
    } else {
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };

  // Update your resetFilters function
  const resetFilters = () => {
    setFilters({
      status: "",
      assignedTo: "",
      coursename: "",
      location: "",
      startDate: "",
      endDate: "",
      search: "",
    });
    setSearchInput(""); // Also reset the search input
    setCurrentPage(1);
  };

  const openCreateModal = () => {
    setFormData({
      name: "",
      email: "",
      contact: "",
      countryCode: "+91",
      coursename: "",
      location: "",
      status: "New",
      notes: "",
      assignedTo: "",
    });
    setFormErrors({});
    setSelectedLead(null);
    setModalType("create");
    setShowModal(true);
    setError(null);
  };

  const openEditModal = (lead) => {
    setSelectedLead(lead);
    setFormData({
      name: lead.name || "",
      email: lead.email || "",
      contact: lead.contact || "",
      countryCode: lead.countryCode || "+91", // Default if not present
      coursename: lead.coursename || "",
      location: lead.location || "",
      status: lead.status || "New",
      notes: lead.notes || "",
      assignedTo: lead.assignedTo?._id || "",
    });
    setFormErrors({});
    setModalType("edit");
    setShowModal(true);
    setError(null);
  };

  const openAssignModal = (lead) => {
    setSelectedLead(lead);
    setFormData({
      ...formData,
      assignedTo: lead.assignedTo?._id || "",
    });
    setFormErrors({});
    setModalType("assign");
    setShowModal(true);
    setError(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLead(null);
    setFormErrors({});
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors({}); // Clear errors before validation

    // Perform client-side validation first
    const errors = validateModalForm(formData, modalType);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      console.warn("Client-side form validation failed:", errors);
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.getElementById(firstErrorField);
      if (errorElement) {
        errorElement.focus();
      }
      return; // Stop submission if validation fails
    }

    setSubmitting(true);
    setError(null); // Clear previous page-level errors

    try {
      if (modalType === "create") {
        await createLead();
      } else if (modalType === "edit") {
        await updateLead();
      } else if (modalType === "assign") {
        await assignLead();
      }
      // closeModal is called inside the specific functions on success
    } catch (err) {
      console.error("Error in form submission:", err);
      // Set page-level error for any unhandled or backend errors
      setError(
        err.message ||
          "An unexpected error occurred during form submission. Please check your inputs."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const createLead = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) throw new Error("API URL is not configured.");

      // ***** CORRECTED ENDPOINT HERE *****
      const response = await fetchWithAuth(`${apiUrl}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          assignedTo: formData.assignedTo || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Backend error during lead creation:", data);

        // ***** ADJUSTED ERROR HANDLING FOR BACKEND MESSAGES *****
        // If backend returns a general error message, set it to the page-level error.
        // For example, if it returns a duplicate email/contact error.
        throw new Error(
          data.message || `Failed to create lead: ${response.statusText}`
        );
      }

      await fetchLeads();
      closeModal();
    } catch (err) {
      console.error("Error creating lead:", err);
      throw err; // Re-throw to be caught by handleSubmit
    }
  };

  const updateLead = async () => {
    try {
      if (!selectedLead?._id) throw new Error("No lead selected for update.");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) throw new Error("API URL is not configured.");

      const leadData = { ...formData };
      leadData.assignedTo = leadData.assignedTo || null;

      const response = await fetchWithAuth(
        `${apiUrl}/api/leads/${selectedLead._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leadData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Error response during lead update:",
          response.status,
          errorData
        );
        throw new Error(
          errorData.message || `Failed to update lead: ${response.statusText}`
        );
      }

      await fetchLeads();
      closeModal();
    } catch (err) {
      console.error("Error updating lead:", err);
      throw err;
    }
  };

  const assignLead = async () => {
    try {
      if (!selectedLead?._id)
        throw new Error("No lead selected for assignment.");
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) throw new Error("API URL is not configured.");

      const assignedToId = formData.assignedTo || null;

      const response = await fetchWithAuth(
        `${apiUrl}/api/leads/${selectedLead._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            assignedTo: assignedToId,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to assign lead");
      }

      await fetchLeads();
      closeModal();
    } catch (err) {
      console.error("Error assigning lead:", err);
      throw err;
    }
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) {
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) throw new Error("API URL is not configured.");

      const response = await fetchWithAuth(`${apiUrl}/api/leads/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete lead");
      }

      await fetchLeads();
    } catch (err) {
      console.error("Error deleting lead:", err);
      setError(err.message || "Error deleting lead. Please try again.");
      setLoading(false);
    }
  };

  const handleSelectLead = (id) => {
    setSelectedLeads((prev) => {
      if (prev.includes(id)) {
        return prev.filter((leadId) => leadId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedLeads.length === displayedLeads.length && selectAll) {
      setSelectedLeads([]);
      setSelectAll(false);
    } else {
      setSelectedLeads(displayedLeads.map((lead) => lead._id));
      setSelectAll(true);
    }
  };

  const openBulkActionModal = (actionType) => {
    if (selectedLeads.length === 0) {
      alert("Please select at least one lead.");
      return;
    }

    setBulkActionType(actionType);
    if (actionType === "status") {
      setBulkFormData({ status: "New", assignedTo: "" });
    } else if (actionType === "assign") {
      setBulkFormData({ status: "", assignedTo: "" });
    } else if (actionType === "delete") {
      setBulkFormData({ status: "", assignedTo: "" });
    }

    setBulkActionModalOpen(true);
    setError(null);
  };

  const handleBulkAction = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setError(null);

    try {
      if (bulkActionType === "delete") {
        await bulkDeleteLeads();
      } else {
        await bulkUpdateLeads();
      }
    } catch (err) {
      console.error("Error in bulk action:", err);
      setError(
        err.message || "An unexpected error occurred during bulk action."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const bulkUpdateLeads = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) throw new Error("API URL is not configured.");

      const updateData = {};

      if (bulkActionType === "status") {
        if (!bulkFormData.status) {
          setFormErrors({ status: "Please select a status." });
          throw new Error("Status is required for bulk update.");
        }
        updateData.status = bulkFormData.status;
      } else if (bulkActionType === "assign") {
        updateData.assignedTo = bulkFormData.assignedTo || null;
      } else {
        throw new Error("Invalid bulk update action type.");
      }

      if (selectedLeads.length === 0) {
        console.warn("No leads selected for bulk update. Skipping.");
        setBulkActionModalOpen(false);
        return;
      }

      const response = await fetchWithAuth(`${apiUrl}/api/leads/bulk-update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadIds: selectedLeads,
          updateData,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update leads");
      }

      await fetchLeads();
      setBulkActionModalOpen(false);
    } catch (err) {
      console.error("Error in bulk update:", err);
      setError(err.message);
      throw err;
    }
  };

  const bulkDeleteLeads = async () => {
    if (selectedLeads.length === 0) {
      console.warn("No leads selected for bulk delete. Skipping.");
      setBulkActionModalOpen(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) throw new Error("API URL is not configured.");

      const response = await fetchWithAuth(`${apiUrl}/api/leads/bulk-delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadIds: selectedLeads,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete leads");
      }

      await fetchLeads();
      setBulkActionModalOpen(false);
    } catch (err) {
      console.error("Error in bulk delete:", err);
      setError(err.message);
      throw err;
    }
  };

  const downloadCSV = () => {
    if (leads.length === 0) {
      alert("No data available for download");
      return;
    }

    const headers = [
      "Sr. No.",
      "Name",
      "Contact",
      "Country Code",
      "Course Name",
      "Email ID",
      "Location",
      "Status",
      "Contacted Score",
      "Comments",
      "Assigned To",
      "Creation Date & Time",
      "Last Updated",
    ];

    const csvRows = leads.map((lead, index) => {
      const formatCsvDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
          timeZone: "UTC",
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      };

      const quoteValue = (value) => {
        if (value === null || value === undefined) return '""';
        const strValue =
          typeof value === "object" ? JSON.stringify(value) : String(value);
        return `"${strValue.replace(/"/g, '""')}"`;
      };

      return [
        index + 1,
        quoteValue(lead.name),
        quoteValue(lead.contact),
        quoteValue(lead.countryCode),
        quoteValue(lead.coursename),
        quoteValue(lead.email),
        quoteValue(lead.location),
        quoteValue(lead.status || "New"),
        quoteValue(lead.contactedScore || ""),
        quoteValue(lead.contactedComment || ""),
        quoteValue(lead.assignedTo?.username || "Unassigned"),
        quoteValue(formatCsvDate(lead.createdAt)),
        quoteValue(formatCsvDate(lead.updatedAt)),
      ];
    });

    const csvContent = [
      headers.map((header) => `"${header}"`).join(","),
      ...csvRows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];

    a.href = url;
    a.download = `leads_export_${dateStr}.csv`;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const goToPage = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      setSelectedLeads([]);
      setSelectAll(false);
    }
  };

  const startIndex = (currentPage - 1) * leadsPerPage;
  const endIndex = startIndex + leadsPerPage;
  const displayedLeads = leads.slice(startIndex, endIndex);

  const getAdminColor = (adminId) => {
    const admin = admins.find((a) => a._id === adminId);
    return admin?.color || null;
  };

  const getAdminById = (adminId) => {
    return admins.find((admin) => admin._id === adminId) || null;
  };

  if (loading && userRole === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activePage="leads" />
      {/* <FixedLogo /> */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0 overflow-auto">
        <AccessControl section="leads">
          <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Lead Management
              </h1>
              <p className="text-gray-600 text-lg">
                Manage, filter, and assign leads to admin users.
              </p>
            </div>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md relative mb-4 flex items-center">
              <FaTimes className="mr-2 text-xl" />
              {error}
            </div>
          )}
          <div className="flex flex-wrap gap-4 mb-6 ms-4">
            <button
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={openCreateModal}
              disabled={loading || submitting}
            >
              <FaUsers className="mr-2" /> Add New Lead
            </button>
            <button
              className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={fetchLeads}
              disabled={loading || submitting}
            >
              {loading && !submitting ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaSync className="mr-2" />
              )}
              Refresh Data
            </button>
            <button
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={downloadCSV}
              disabled={leads.length === 0}
            >
              <FaDownload className="mr-2" /> Export CSV ({leads.length} leads)
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <FaFilter className="mr-3 text-blue-600" /> Filter Leads
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {/* Status Filter */}
              <div className="form-group">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="status-filter"
                >
                  Status
                </label>
                <select
                  id="status-filter"
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || submitting}
                >
                  <option value="">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Converted">Converted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Not Interested">Not Interested</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Enrolled">Enrolled</option>
                </select>
              </div>

              {/* Assigned To Filter */}
              <div className="form-group">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="assignedTo-filter"
                >
                  Assigned To
                </label>
                <select
                  id="assignedTo-filter"
                  name="assignedTo"
                  value={filters.assignedTo}
                  onChange={handleFilterChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || submitting}
                >
                  <option value="">All</option>
                  <option value="unassigned">Unassigned</option>
                  <option value="assigned">Any Admin</option>
                  {admins.map((admin) => (
                    <option key={admin._id} value={admin._id}>
                      {admin.username} ({admin.role})
                    </option>
                  ))}
                </select>
              </div>

              {/* Course Filter */}
              <div className="form-group">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="coursename-filter"
                >
                  Course
                </label>
                <select
                  id="coursename-filter"
                  name="coursename"
                  value={filters.coursename}
                  onChange={handleFilterChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || submitting}
                >
                  <option value="">All Courses</option>
                  {courseOptions.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="form-group">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="location-filter"
                >
                  Location
                </label>
                <select
                  id="location-filter"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || submitting}
                >
                  <option value="">All Locations</option>
                  {locationOptions.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Start Date Filter */}
              <div className="form-group">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="startDate-filter"
                >
                  <FaCalendarAlt className="inline mr-1 text-gray-500" /> Start
                  Date
                </label>
                <input
                  id="startDate-filter"
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading || submitting}
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
                  disabled={loading || submitting}
                />
              </div>

              {/* Search Filter */}
              <div className="form-group col-span-full sm:col-span-2 lg:col-span-1 xl:col-span-2">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="search-filter"
                >
                  <FaSearch className="inline mr-1 text-gray-500" /> Search
                </label>
                <div className="relative">
                  <input
                    id="search-filter"
                    type="text"
                    name="search"
                    value={searchInput}
                    onChange={handleFilterChange}
                    placeholder="Name, Email, or Phone"
                    className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading || submitting}
                  />
                  {searchInput !== filters.search && searchInput && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FaSpinner className="h-4 w-4 text-gray-400 animate-spin" />
                    </div>
                  )}
                </div>
                {filters.search && (
                  <p className="mt-1 text-xs text-gray-500">
                    Searching for: "{filters.search}"
                  </p>
                )}
              </div>

              {/* Reset Button Only */}
              <div className="form-group col-span-full sm:col-span-2 lg:col-span-3 xl:col-span-2 flex justify-end items-end">
                <button
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={resetFilters}
                  disabled={loading || submitting}
                >
                  <FaTimes className="inline mr-2" />
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>
          {selectedLeads.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md mb-4 gap-3">
              <span className="text-sm font-medium">
                {selectedLeads.length}{" "}
                {selectedLeads.length === 1 ? "lead" : "leads"} selected on this
                page
              </span>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => openBulkActionModal("status")}
                  className="px-4 py-2 text-blue-800 border border-blue-300 rounded-md bg-blue-100 hover:bg-blue-200 transition-colors duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submitting || loading}
                >
                  Change Status
                </button>
                <button
                  onClick={() => openBulkActionModal("assign")}
                  className="px-4 py-2 text-blue-800 border border-blue-300 rounded-md bg-blue-100 hover:bg-blue-200 transition-colors duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submitting || loading}
                >
                  Assign
                </button>
                <button
                  onClick={() => openBulkActionModal("delete")}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={submitting || loading}
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </div>
          )}
          {loading && !leads.length ? (
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
              <p className="mt-4 text-gray-600">Loading leads...</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="lg:hidden divide-y divide-gray-200">
                {displayedLeads.length > 0 ? (
                  displayedLeads.map((lead) => (
                    <div
                      key={lead._id}
                      className={`p-6 space-y-3 transition-colors duration-150 ${selectedLeads.includes(lead._id) ? "bg-blue-50" : "bg-white"}`}
                      style={
                        lead.assignedTo?.color
                          ? {
                              backgroundColor: selectedLeads.includes(lead._id)
                                ? `${lead.assignedTo.color}60`
                                : `${lead.assignedTo.color}30`,
                            }
                          : {}
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-gray-900 text-lg truncate mr-4">
                          {lead.name}
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            lead.status === "New"
                              ? "bg-blue-100 text-blue-800 border-blue-200"
                              : lead.status === "Contacted"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                : lead.status === "Converted"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : lead.status === "Rejected"
                                    ? "bg-red-100 text-red-800 border-red-200"
                                    : lead.status === "Not Interested"
                                      ? "bg-red-100 text-red-800 border-red-200"
                                      : lead.status === "In Progress"
                                        ? "bg-orange-100 text-orange-800 border-orange-200"
                                        : lead.status === "Enrolled"
                                          ? "bg-green-100 text-green-800 border-green-200"
                                          : "bg-gray-100 text-gray-800 border-gray-200"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </div>

                      <div className="text-sm text-gray-700">
                        <span className="font-medium text-gray-500">
                          Contact:
                        </span>{" "}
                        {lead.countryCode}
                        {lead.contact}
                      </div>
                      <div className="text-sm text-gray-700">
                        <span className="font-medium text-gray-500">
                          Email:
                        </span>{" "}
                        {lead.email}
                      </div>
                      <div className="text-sm text-gray-700">
                        <span className="font-medium text-gray-500">
                          Course:
                        </span>{" "}
                        {lead.coursename || "—"}
                      </div>
                      <div className="text-sm text-gray-700">
                        <span className="font-medium text-gray-500">
                          Location:
                        </span>{" "}
                        {lead.location || "—"}
                      </div>
                      <div className="text-sm text-gray-700 flex items-center">
                        <span className="font-medium text-gray-500 mr-2">
                          Assigned To:
                        </span>
                        {lead.assignedTo ? (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                              lead.assignedTo.role === "SuperAdmin"
                                ? "bg-purple-100 text-purple-800 border-purple-200"
                                : lead.assignedTo.role === "Admin"
                                  ? "bg-blue-100 text-blue-800 border-blue-200"
                                  : lead.assignedTo.role === "ViewMode"
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : "bg-yellow-100 text-yellow-800 border-yellow-200"
                            }`}
                            style={
                              lead.assignedTo.color
                                ? {
                                    backgroundColor: lead.assignedTo.color,
                                    color: "white",
                                  }
                                : {}
                            }
                          >
                            {lead.assignedTo.username}
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-700 border border-gray-200 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                            Unassigned
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-700">
                        <span className="font-medium text-gray-500">
                          Created:
                        </span>{" "}
                        {formatDate(lead.createdAt)}
                      </div>

                      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                        <div
                          className="flex items-center justify-center cursor-pointer text-xl text-blue-600"
                          onClick={() => handleSelectLead(lead._id)}
                          aria-label={`Select lead ${lead.name}`}
                        >
                          {selectedLeads.includes(lead._id) ? (
                            <FaCheckSquare />
                          ) : (
                            <FaSquare />
                          )}
                        </div>
                        <button
                          onClick={() => openEditModal(lead)}
                          className="p-2 rounded-md text-blue-600 hover:bg-blue-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Edit Lead"
                          aria-label={`Edit lead ${lead.name}`}
                          disabled={submitting}
                        >
                          <FaEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => openAssignModal(lead)}
                          className="p-2 rounded-md text-purple-600 hover:bg-purple-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Assign Lead"
                          aria-label={`Assign lead ${lead.name}`}
                          disabled={submitting}
                        >
                          <FaUserEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => deleteLead(lead._id)}
                          className="p-2 rounded-md text-red-600 hover:bg-red-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete Lead"
                          aria-label={`Delete lead ${lead.name}`}
                          disabled={submitting}
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-600">
                    {error
                      ? `Error loading leads: ${error}`
                      : Object.values(filters).some((value) => value !== "")
                        ? "No leads found matching the filter criteria. Try adjusting your filters."
                        : "No leads found."}
                  </div>
                )}
              </div>

              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-12">
                        <div
                          className="flex items-center justify-center cursor-pointer"
                          onClick={handleSelectAll}
                          aria-label="Select all leads on page"
                        >
                          {selectedLeads.length === displayedLeads.length &&
                          selectAll ? (
                            <FaCheckSquare className="text-blue-600 text-xl" />
                          ) : (
                            <FaSquare className="text-blue-600 text-xl" />
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Assigned To
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {displayedLeads.length > 0 ? (
                      displayedLeads.map((lead) => {
                        const assignedAdmin = getAdminById(
                          lead.assignedTo?._id
                        );
                        const rowBackgroundColor = selectedLeads.includes(
                          lead._id
                        )
                          ? "bg-blue-50"
                          : assignedAdmin?.color
                            ? `${assignedAdmin.color}10`
                            : "";

                        const rowStyle = {
                          backgroundColor: rowBackgroundColor,
                          transition: "background-color 0.3s ease",
                        };

                        return (
                          <tr
                            key={lead._id}
                            className="hover:bg-gray-100"
                            style={rowStyle}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-center w-12">
                              <div
                                className="flex items-center justify-center cursor-pointer text-xl text-blue-600"
                                onClick={() => handleSelectLead(lead._id)}
                                aria-label={`Select lead ${lead.name}`}
                              >
                                {selectedLeads.includes(lead._id) ? (
                                  <FaCheckSquare />
                                ) : (
                                  <FaSquare />
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {formatDate(lead.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {lead.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {lead.countryCode}
                              {lead.contact}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {lead.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {lead.coursename || "—"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {lead.location || "—"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                  lead.status === "New"
                                    ? "bg-blue-100 text-blue-800 border-blue-200"
                                    : lead.status === "Contacted"
                                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                      : lead.status === "Converted"
                                        ? "bg-green-100 text-green-800 border-green-200"
                                        : lead.status === "Rejected"
                                          ? "bg-red-100 text-red-800 border-red-200"
                                          : lead.status === "Not Interested"
                                            ? "bg-red-100 text-red-800 border-red-200"
                                            : lead.status === "In Progress"
                                              ? "bg-orange-100 text-orange-800 border-orange-200"
                                              : lead.status === "Enrolled"
                                                ? "bg-green-100 text-green-800 border-green-200"
                                                : "bg-gray-100 text-gray-800 border-gray-200"
                                }`}
                              >
                                {lead.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {assignedAdmin ? (
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border text-white ${
                                    assignedAdmin.role === "SuperAdmin"
                                      ? "bg-purple-600 border-purple-700"
                                      : assignedAdmin.role === "Admin"
                                        ? "bg-blue-600 border-blue-700"
                                        : assignedAdmin.role === "ViewMode"
                                          ? "bg-green-600 border-green-700"
                                          : "bg-yellow-600 border-yellow-700"
                                  }`}
                                  style={
                                    assignedAdmin.color
                                      ? { backgroundColor: assignedAdmin.color }
                                      : {}
                                  }
                                >
                                  {assignedAdmin.username}
                                </span>
                              ) : (
                                <span className="bg-gray-100 text-gray-700 border border-gray-200 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                                  Unassigned
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium w-32">
                              <div className="flex gap-2 justify-center">
                                <button
                                  onClick={() => openEditModal(lead)}
                                  className="p-2 rounded-md text-blue-600 hover:bg-blue-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                  title="Edit"
                                  disabled={submitting}
                                  aria-label={`Edit lead ${lead.name}`}
                                >
                                  <FaEdit className="text-lg" />
                                </button>
                                <button
                                  onClick={() => openAssignModal(lead)}
                                  className="p-2 rounded-md text-purple-600 hover:bg-purple-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                  title="Assign"
                                  disabled={submitting}
                                  aria-label={`Assign lead ${lead.name}`}
                                >
                                  <FaUserEdit className="text-lg" />
                                </button>
                                <button
                                  onClick={() => deleteLead(lead._id)}
                                  className="p-2 rounded-md text-red-600 hover:bg-red-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                  title="Delete"
                                  aria-label={`Delete lead ${lead.name}`}
                                  disabled={submitting}
                                >
                                  <FaTrash className="text-lg" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan="10"
                          className="px-6 py-4 text-center text-gray-600"
                        >
                          {error
                            ? `Error loading leads: ${error}`
                            : Object.values(filters).some(
                                  (value) => value !== "" && value !== null
                                )
                              ? "No leads found matching the filter criteria. Try adjusting your filters."
                              : "No leads found."}
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
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1 || loading || submitting}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
                aria-label="Previous page"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages || loading || submitting}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          )}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001] p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {modalType === "create"
                      ? "Add New Lead"
                      : modalType === "edit"
                        ? "Edit Lead"
                        : "Assign Lead"}
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

                <form onSubmit={handleSubmit}>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    {Object.keys(formErrors).length > 0 &&
                      Object.values(formErrors).some((e) => e) && (
                        <div className="md:col-span-2 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md relative flex items-center text-sm">
                          <FaTimes className="mr-2 text-lg" /> Please fix the
                          errors below.
                        </div>
                      )}
                    {error && (
                      <div className="md:col-span-2 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md relative flex items-center text-sm">
                        <FaTimes className="mr-2 text-lg" /> {error}
                      </div>
                    )}
                    {modalType !== "assign" && (
                      <>
                        <div className="md:col-span-2">
                          <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="name"
                          >
                            Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"}`}
                            required
                            disabled={submitting}
                          />
                          {formErrors.name && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.name}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="email"
                          >
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"}`}
                            required
                            disabled={submitting}
                          />
                          {formErrors.email && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.email}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="contact"
                          >
                            Contact Number{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              id="countryCode"
                              name="countryCode"
                              value={formData.countryCode}
                              onChange={handleInputChange}
                              className={`block w-20 px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.countryCode ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"}`}
                              placeholder="+91"
                              disabled={submitting}
                            />
                            <input
                              type="text"
                              id="contact"
                              name="contact"
                              value={formData.contact}
                              onChange={handleInputChange}
                              className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.contact ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"}`}
                              required
                              disabled={submitting}
                            />
                          </div>
                          {formErrors.countryCode && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.countryCode}
                            </p>
                          )}
                          {formErrors.contact && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.contact}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="coursename"
                          >
                            Course
                          </label>
                          <input
                            type="text"
                            id="coursename"
                            name="coursename"
                            value={formData.coursename}
                            onChange={handleInputChange}
                            className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.coursename ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"}`}
                            disabled={submitting}
                          />
                          {formErrors.coursename && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.coursename}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="location"
                          >
                            Location
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.location ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"}`}
                            disabled={submitting}
                          />
                          {formErrors.location && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.location}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="status"
                          >
                            Status <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.status ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"}`}
                            required
                            disabled={submitting}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Converted">Converted</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Not Interested">
                              Not Interested
                            </option>
                            <option value="In Progress">In Progress</option>
                            <option value="Enrolled">Enrolled</option>
                          </select>
                          {formErrors.status && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.status}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="notes"
                          >
                            Notes
                          </label>
                          <textarea
                            id="notes"
                            name="notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.notes ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"}`}
                            rows="3"
                            disabled={submitting}
                          ></textarea>
                          {formErrors.notes && (
                            <p className="mt-1 text-sm text-red-600">
                              {formErrors.notes}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                    {modalType === "assign" && (
                      <div className="md:col-span-2">
                        <label
                          className="block text-sm font-medium text-gray-700 mb-1"
                          htmlFor="assignedTo"
                        >
                          Assign To
                        </label>
                        <select
                          id="assignedTo"
                          name="assignedTo"
                          value={formData.assignedTo}
                          onChange={handleInputChange}
                          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.assignedTo ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"}`}
                          disabled={submitting}
                        >
                          <option value="">Unassigned</option>
                          {admins.map(
                            (admin) =>
                              admin.role !== "SuperAdmin" && (
                                <option key={admin._id} value={admin._id}>
                                  {admin.username} ({admin.role})
                                </option>
                              )
                          )}
                        </select>
                        {formErrors.assignedTo && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.assignedTo}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
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
                              : "Assigning..."}
                        </>
                      ) : (
                        <>
                          {modalType === "create"
                            ? "Create Lead"
                            : modalType === "edit"
                              ? "Update Lead"
                              : "Assign Lead"}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {bulkActionModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001] p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {bulkActionType === "status"
                      ? "Bulk Update Status"
                      : bulkActionType === "assign"
                        ? "Bulk Assign Leads"
                        : "Bulk Delete Leads"}
                  </h3>
                  <button
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl leading-none disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setBulkActionModalOpen(false)}
                    disabled={submitting}
                    aria-label="Close bulk action modal"
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleBulkAction}>
                  <div className="p-6">
                    {Object.keys(formErrors).length > 0 &&
                      Object.values(formErrors).some((e) => e) && (
                        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md relative flex items-center text-sm mb-4">
                          <FaTimes className="mr-2 text-lg" /> Please fix the
                          errors below.
                        </div>
                      )}
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md relative flex items-center text-sm mb-4">
                        <FaTimes className="mr-2 text-lg" /> {error}
                      </div>
                    )}

                    {bulkActionType === "delete" ? (
                      <p className="text-gray-700 text-center py-4">
                        Are you sure you want to delete {selectedLeads.length}{" "}
                        leads? This action cannot be undone.
                      </p>
                    ) : bulkActionType === "status" ? (
                      <div className="form-group">
                        <label
                          className="block text-sm font-medium text-gray-700 mb-1"
                          htmlFor="bulk-status"
                        >
                          New Status <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="bulk-status"
                          value={bulkFormData.status}
                          onChange={(e) =>
                            setBulkFormData({
                              ...bulkFormData,
                              status: e.target.value,
                            })
                          }
                          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.status ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"}`}
                          required
                          disabled={submitting}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Converted">Converted</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Not Interested">Not Interested</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Enrolled">Enrolled</option>
                        </select>
                        {formErrors.status && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.status}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="form-group">
                        <label
                          className="block text-sm font-medium text-gray-700 mb-1"
                          htmlFor="bulk-assignedTo"
                        >
                          Assign To
                        </label>
                        <select
                          id="bulk-assignedTo"
                          value={bulkFormData.assignedTo}
                          onChange={(e) =>
                            setBulkFormData({
                              ...bulkFormData,
                              assignedTo: e.target.value,
                            })
                          }
                          className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${formErrors.assignedTo ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300"}`}
                          disabled={submitting}
                        >
                          <option value="">Unassigned</option>
                          {admins.map(
                            (admin) =>
                              admin.role !== "SuperAdmin" && (
                                <option key={admin._id} value={admin._id}>
                                  {admin.username} ({admin.role})
                                </option>
                              )
                          )}
                        </select>
                        {formErrors.assignedTo && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.assignedTo}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <button
                      type="button"
                      onClick={() => setBulkActionModalOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={`inline-flex items-center px-4 py-2 font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm
                          ${bulkActionType === "delete" ? "bg-red-600 text-white hover:bg-red-700" : "bg-blue-600 text-white hover:bg-blue-700"}
                        `}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          {bulkActionType === "status"
                            ? "Update Status"
                            : bulkActionType === "assign"
                              ? "Assign Leads"
                              : "Delete Leads"}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </AccessControl>
      </main>
    </div>
  );
};

export default LeadManagementPage;
