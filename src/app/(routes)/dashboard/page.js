"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  FaTrash,
  FaSpinner,
  FaDownload,
  FaSignOutAlt,
  FaCheckSquare,
  FaSquare,
  FaUserCog,
  FaSync,
  FaEdit,
  FaTimes,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaExclamationTriangle,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { fetchWithAuth } from "@/utils/auth";

import { useActivityLogger } from "./layout";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [editFormData, setEditFormData] = useState({
    contactedScore: "",
    contactedComment: "",
    status: "",
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [restrictLeadEditing, setRestrictLeadEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedLeadForModal, setSelectedLeadForModal] = useState(null);

  const router = useRouter();
  const pathname = router.pathname;

  // Consume the activity logger from context
  const logActivityEvent = useActivityLogger();

  const leadsPerPage = 30;

  const totalPages = useMemo(
    () => Math.ceil(leads.length / leadsPerPage),
    [leads.length]
  );

  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;

  const currentLeads = useMemo(
    () => leads.slice(indexOfFirstLead, indexOfLastLead),
    [leads, indexOfFirstLead, indexOfLastLead]
  );

  useEffect(() => {
    const role =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("adminRole")
        : null;
    if (role) {
      setUserRole(role || "");
      fetchLeads();
      fetchSettings();
    } else {
      router.push("/AdminLogin");
    }
  }, []);

  const fetchSettings = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL_MAIN || "http://localhost:5001";
      if (!apiUrl) {
        console.error("NEXT_PUBLIC_BACKEND_URL_MAIN is not defined");
        setRestrictLeadEditing(false);
        return;
      }
      
      console.log("Fetching settings from:", `${apiUrl}/api/settings`);
      const response = await fetchWithAuth(`${apiUrl}/api/settings`);

      if (response.ok) {
        const settings = await response.json();
        // Find the restrictLeadEditing setting
        const restrictSetting = settings.find(s => s.key === 'restrictLeadEditing');
        const shouldRestrict = Boolean(restrictSetting?.value);
        console.log("Restrict lead editing setting:", shouldRestrict);
        setRestrictLeadEditing(shouldRestrict);
      } else if (response.status === 403 || response.status === 401) {
        console.error("Authentication error fetching settings");
        // Clear auth and redirect to login
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminRole');
        localStorage.removeItem('adminId');
        router.push('/AdminLogin');
      } else {
        console.error("Error fetching settings:", response.status);
        // Default to false if settings can't be loaded
        setRestrictLeadEditing(false);
      }
    } catch (error) {
      console.error("Error in fetchSettings:", error);
      // Default to false if there's an error
      setRestrictLeadEditing(false);
    }
  };

  useEffect(() => {
    if (currentLeads.length > 0) {
      const allCurrentLeadsSelected = currentLeads.every((lead) =>
        selectedLeads.includes(lead._id)
      );
      setSelectAll(allCurrentLeadsSelected);
    } else {
      setSelectAll(false);
    }
  }, [currentLeads, selectedLeads]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);

      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL_MAIN || "http://localhost:5001";
      if (!apiUrl) {
        console.error("NEXT_PUBLIC_BACKEND_URL_MAIN is not defined");
        setError("API URL is not configured.");
        setLoading(false);
        return;
      }

      const currentAdminId = localStorage.getItem("adminId");
      const queryParams = new URLSearchParams();

      if (
        restrictLeadEditing &&
        userRole !== "superadmin" && // Make sure to use lowercase for consistency
        userRole !== "admin" &&
        currentAdminId
      ) {
        queryParams.append("assignedTo", currentAdminId);
      }

      console.log("Fetching leads from:", `${apiUrl}/api/leads?${queryParams.toString()}`);
      
      const response = await fetchWithAuth(
        `${apiUrl}/api/leads?${queryParams.toString()}`
      );

      if (!response.ok) {
        let errorMsg = `HTTP error! Status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
          
          if (response.status === 403 || response.status === 401) {
            // Handle unauthorized/forbidden
            console.error("Authentication error:", errorMsg);
            // Clear auth data and redirect to login
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminRole');
            localStorage.removeItem('adminId');
            router.push('/AdminLogin');
            return;
          }
        } catch (jsonError) {
          console.error("Failed to parse error response body:", jsonError);
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      
      // The server returns an array of leads
      if (Array.isArray(data)) {
        setLeads(data);
        setCurrentPage(1);
        setSelectedLeads([]);
        setSelectAll(false);
        console.log(`Fetched ${data.length} leads`);
      } else {
        console.error("API did not return an array for leads:", data);
        setLeads([]);
        setError("Received invalid data format for leads from API.");
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError(err.message || "Failed to load leads. Please try again.");
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (lead) => {
    setSelectedLeadForModal(lead);
    setEditFormData({
      contactedScore: lead.contactedScore || "",
      contactedComment: lead.contactedComment || "",
      status: lead.status || "New",
    });
    setShowModal(true);
    setError(null);

    logActivityEvent(
      "OPEN_EDIT_MODAL",
      pathname,
      `Opened edit modal for Lead ID: ${lead._id}`
    );
  };

  const openViewModal = (lead) => {
    setSelectedLeadForModal(lead);
    setShowViewModal(true);
    setError(null);

    logActivityEvent(
      "VIEW_LEAD_DETAILS",
      pathname,
      `Viewed details for Lead ID: ${lead._id}`
    );
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLeadForModal(null);
    setEditFormData({ contactedScore: "", contactedComment: "", status: "" });
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setSelectedLeadForModal(null);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const saveLeadFromModal = async () => {
    if (!selectedLeadForModal) return;

    if (editFormData.contactedScore === "" || editFormData.status === "") {
      alert("Contacted Score and Status are required.");
      return;
    }

    try {
      setUpdateLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }

      const response = await fetchWithAuth(
        `${apiUrl}/api/leads/${selectedLeadForModal._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Error response during lead update:",
          response.status,
          errorData
        );
        if (response.status === 403 && errorData.restricted) {
          throw new Error(
            "Access restricted: You can only edit leads assigned to you when restriction mode is enabled."
          );
        }
        throw new Error(errorData.message || "Failed to update lead");
      }

      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead._id === selectedLeadForModal._id
            ? { ...lead, ...editFormData }
            : lead
        )
      );

      closeModal();

      logActivityEvent(
        "UPDATE_LEAD_CONTACT_STATUS",
        pathname,
        `Updated status/contact info for Lead ID: ${selectedLeadForModal._id}`
      );
    } catch (error) {
      console.error("Error updating lead:", error);
      alert(`Error updating lead: ${error.message || error}`);
    } finally {
      setUpdateLoading(false);
    }
  };

  const deleteLead = async (id) => {
    if (
      userRole !== "SuperAdmin" &&
      userRole !== "Admin" &&
      userRole !== "EditMode"
    ) {
      alert("You don't have permission to delete leads.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      setDeleteLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }
      const response = await fetchWithAuth(`${apiUrl}/api/leads/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to delete lead: ${response.statusText} - ${errorText}`
        );
      }

      setLeads((prevLeads) => prevLeads.filter((lead) => lead._id !== id));
      if (selectedLeads.includes(id)) {
        setSelectedLeads((prev) => prev.filter((leadId) => leadId !== id));
      }

      logActivityEvent("DELETE_LEAD", pathname, `Deleted Lead ID: ${id}`);
    } catch (error) {
      console.error("Error deleting lead:", error.message);
      alert(`Error deleting lead: ${error.message}`);
    } finally {
      setDeleteLoading(false);
    }
  };

  const deleteSelectedLeads = async () => {
    if (
      userRole !== "SuperAdmin" &&
      userRole !== "Admin" &&
      userRole !== "EditMode"
    ) {
      alert("You don't have permission to delete leads.");
      return;
    }

    if (selectedLeads.length === 0) {
      alert("Please select at least one lead to delete");
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedLeads.length} selected leads? This action cannot be undone.`
      )
    )
      return;

    setDeleteLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }

      const response = await fetchWithAuth(`${apiUrl}/api/leads/bulk-delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ leadIds: selectedLeads }),
      });

      if (response.ok) {
        setLeads((prevLeads) =>
          prevLeads.filter((lead) => !selectedLeads.includes(lead._id))
        );
        setSelectedLeads([]);

        logActivityEvent(
          "BULK_DELETE_LEADS",
          pathname,
          `Deleted ${selectedLeads.length} selected leads`
        );
      } else {
        const errorText = await response.text();
        throw new Error(
          `Bulk delete failed: ${response.statusText} - ${errorText}`
        );
      }
    } catch (error) {
      console.error("Error in bulk delete:", error);
      alert(`Error deleting leads: ${error.message}`);
      fetchLeads();
    } finally {
      setDeleteLoading(false);
    }
  };

  const downloadExcel = () => {
    if (leads.length === 0) {
      alert("No data to download");
      return;
    }

    logActivityEvent(
      "EXPORT_LEADS_EXCEL",
      pathname,
      `Exported ${leads.length} leads to Excel`
    );

    try {
      const headers = [
        "Sr. No.",
        "Name",
        "Mobile Number",
        "Course Name",
        "Email ID",
        "Date & Time",
        "Location",
        "Assigned To",
        "Contacted Score",
        "Contacted Comment",
        "Status",
      ];

      const data = [headers];

      leads.forEach((lead, index) => {
        const formattedDate = new Date(lead.createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        });

        data.push([
          index + 1,
          lead.name || "",
          lead.contact || "",
          lead.coursename || "",
          lead.email || "",
          formattedDate,
          lead.location || "",
          lead.assignedTo ? lead.assignedTo.username : "Not Assigned",
          lead.contactedScore || "",
          lead.contactedComment || "",
          lead.status || "New",
        ]);
      });

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(data);

      ws["!cols"] = [
        { wch: 8 },
        { wch: 25 },
        { wch: 15 },
        { wch: 25 },
        { wch: 30 },
        { wch: 22 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 30 },
        { wch: 12 },
      ];

      const headerStyle = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { patternType: "solid", fgColor: { rgb: "4A5568" } },
        alignment: { horizontal: "center" },
      };
      for (let i = 0; i < headers.length; i++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: i });
        if (!ws[cellAddress]) ws[cellAddress] = { v: data[0][i] };
        ws[cellAddress].s = headerStyle;
      }

      for (let i = 1; i < data.length; i++) {
        const status = data[i][10];
        let fillColor;

        if (status === "Contacted") {
          fillColor = "EBF8FF";
        } else if (status === "Converted") {
          fillColor = "F0FFF4";
        } else if (status === "Rejected" || status === "Not Interested") {
          fillColor = "FFF5F5";
        } else if (status === "In Progress") {
          fillColor = "FEFCBF";
        } else if (status === "Enrolled") {
          fillColor = "F0FFF4";
        } else {
          fillColor = "F7FAFC";
        }

        if (fillColor) {
          for (let j = 0; j < data[i].length; j++) {
            const cellAddress = XLSX.utils.encode_cell({ r: i, c: j });
            if (!ws[cellAddress]) ws[cellAddress] = { v: data[i][j] };
            ws[cellAddress].s = {
              ...ws[cellAddress].s,
              fill: {
                patternType: "solid",
                fgColor: { rgb: fillColor },
              },
            };
          }
        }
      }

      XLSX.utils.book_append_sheet(wb, ws, "Leads");

      const excelBinary = XLSX.write(wb, {
        bookType: "xlsx",
        type: "binary",
        cellStyles: true,
      });

      const buffer = new ArrayBuffer(excelBinary.length);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < excelBinary.length; i++) {
        view[i] = excelBinary.charCodeAt(i) & 0xff;
      }

      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(
        blob,
        `leads_export_${new Date().toISOString().slice(0, 10)}.xlsx`
      );
    } catch (error) {
      console.error("Error exporting Excel file:", error);
      alert(
        `Error creating Excel file: ${error.message}. Falling back to CSV export.`
      );
      fallbackCSVExport();
    }
  };

  const fallbackCSVExport = () => {
    if (leads.length === 0) {
      console.warn("No data to fallback export to CSV");
      return;
    }

    logActivityEvent(
      "EXPORT_LEADS_CSV_FALLBACK",
      pathname,
      `Exported ${leads.length} leads to CSV (fallback)`
    );

    const headers = [
      "Sr. No.",
      "Name",
      "Mobile Number",
      "Course Name",
      "Email ID",
      "Date & Time",
      "Location",
      "Assigned To",
      "Contacted Score",
      "Contacted Comment",
      "Status",
    ];

    const escapeCsvField = (field) => {
      if (field === null || field === undefined) return '""';
      const str = String(field);
      return `"${str.replace(/"/g, '""')}"`;
    };

    const csvRows = leads.map((lead, index) => {
      const formattedDate = new Date(lead.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });

      return [
        escapeCsvField(index + 1),
        escapeCsvField(lead.name || ""),
        escapeCsvField(lead.contact || ""),
        escapeCsvField(lead.coursename || ""),
        escapeCsvField(lead.email || ""),
        escapeCsvField(formattedDate),
        escapeCsvField(lead.location || ""),
        escapeCsvField(
          lead.assignedTo ? lead.assignedTo.username : "Not Assigned"
        ),
        escapeCsvField(lead.contactedScore || ""),
        escapeCsvField(lead.contactedComment || ""),
        escapeCsvField(lead.status || "New"),
      ];
    });

    const BOM = "\uFEFF";

    const csvContent =
      "data:text/csv;charset=utf-8," +
      encodeURIComponent(
        BOM +
          headers.map((header) => escapeCsvField(header)).join(",") +
          "\n" +
          csvRows.map((row) => row.join(",")).join("\n")
      );

    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute(
      "download",
      `leads_export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // Removed `URL.revokeObjectURL(url);` as `url` is not defined here.
    // It's not strictly necessary for data: URIs, only for blob/object URLs.
  };

  const handleSelectLead = (id) => {
    if (deleteLoading || updateLoading) return;

    setSelectedLeads((prev) => {
      const isSelected = prev.includes(id);
      const newState = isSelected
        ? prev.filter((leadId) => leadId !== id)
        : [...prev, id];

      logActivityEvent(
        "TOGGLE_LEAD_SELECTION",
        pathname,
        `Lead ID: ${id}, Selected: ${!isSelected ? "true" : "false"}`
      );

      return newState;
    });
  };

  const handleSelectAll = () => {
    if (deleteLoading || updateLoading) return;

    const isSelectingAll =
      selectedLeads.length !== currentLeads.length || !selectAll;

    if (isSelectingAll) {
      setSelectedLeads(currentLeads.map((lead) => lead._id));
    } else {
      setSelectedLeads([]);
    }

    logActivityEvent(
      "TOGGLE_SELECT_ALL_LEADS",
      pathname,
      `Selected All: ${isSelectingAll ? "true" : "false"} on Page ${currentPage}`
    );

    setSelectAll(isSelectingAll);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setSelectedLeads([]);
      setSelectAll(false);

      logActivityEvent("CHANGE_PAGE", pathname, `Navigated to Page ${newPage}`);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setSelectedLeads([]);
      setSelectAll(false);

      logActivityEvent("CHANGE_PAGE", pathname, `Navigated to Page ${newPage}`);
    }
  };

  const goToSuperAdmin = () => {
    if (userRole === "SuperAdmin" || userRole === "Admin") {
      logActivityEvent(
        "GO_TO_ADMIN_PANEL",
        pathname,
        "Navigated from Dashboard to SuperAdmin Dashboard"
      );

      router.push("/superadmin/dashboard");
    } else {
      alert("You do not have access to the Admin Panel.");
    }
  };

  const handleLogout = () => {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminRole");
      localStorage.removeItem("adminUsername");
      localStorage.removeItem("adminId");
      localStorage.removeItem("isAdminLoggedIn");
    }
    router.push("/AdminLogin");
  };

  const handleRefresh = () => {
    logActivityEvent(
      "REFRESH_LEADS",
      pathname,
      "Manually refreshed leads data"
    );

    fetchLeads();
  };

  const getAssignedAdminColor = (assignedTo) => {
    return assignedTo?.color || null;
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white mb-2 rounded-xl shadow-md py-4 px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Contact Leads Dashboard
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleRefresh}
              className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              disabled={loading || deleteLoading || updateLoading} // Disable during any operation
            >
              {loading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaSync className="mr-2" />
              )}
              Refresh
            </button>
            {(userRole === "SuperAdmin" || userRole === "Admin") && (
              <button
                onClick={goToSuperAdmin}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                disabled={loading || deleteLoading || updateLoading} // Disable during any operation
              >
                <FaUserCog className="mr-2" /> Admin Panel
              </button>
            )}
            {/* Changed button to trigger Excel download */}
            <button
              onClick={downloadExcel}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              disabled={
                leads.length === 0 || loading || deleteLoading || updateLoading
              } // Disable if no leads or busy
            >
              <FaDownload className="mr-2" /> Export Excel ({leads.length}{" "}
              leads)
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              disabled={loading || deleteLoading || updateLoading} // Disable during any operation
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </header>
      {/* Bulk Actions Bar */}
      {selectedLeads.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md mb-4 gap-3">
          <span className="text-sm font-medium">
            {selectedLeads.length}{" "}
            {selectedLeads.length === 1 ? "lead" : "leads"} selected on this
            page
          </span>
          {(userRole === "SuperAdmin" ||
            userRole === "Admin" ||
            userRole === "EditMode") && (
            <button
              onClick={deleteSelectedLeads}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              disabled={deleteLoading || updateLoading || loading}
            >
              {deleteLoading ? (
                <FaSpinner className="animate-spin mr-2" />
              ) : (
                <FaTrash className="mr-2" />
              )}
              Delete Selected
            </button>
          )}
        </div>
      )}
      {/* Loading State for Table */}
      {loading && leads.length === 0 && !error ? (
        <div className="flex flex-col items-center justify-center py-12">
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
          <p className="mt-8 text-center text-gray-600">Loading leads...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md relative mb-4 flex items-center">
          <FaTimes className="mr-2 text-xl" />
          Error: {error}
        </div>
      ) : (
        <>
          {/* Leads Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Mobile View (Cards) */}
            <div className="lg:hidden divide-y divide-gray-200">
              {currentLeads.length > 0 ? (
                currentLeads.map((lead, index) => {
                  const assignedAdminColor = getAssignedAdminColor(
                    lead.assignedTo
                  );
                  const cardBackgroundColor = selectedLeads.includes(lead._id)
                    ? "bg-blue-50"
                    : assignedAdminColor
                      ? `${assignedAdminColor}10`
                      : "bg-white";

                  return (
                    <div
                      key={lead._id || index}
                      className={`p-6 space-y-3 transition-colors duration-150 ${cardBackgroundColor}`}
                    >
                      {/* Select Checkbox and View Button */}
                      <div className="flex items-center justify-between">
                        {(userRole === "SuperAdmin" ||
                          userRole === "Admin" ||
                          userRole === "EditMode") && (
                          <div
                            className="flex items-center justify-center cursor-pointer text-xl text-blue-600"
                            onClick={() => handleSelectLead(lead._id)}
                            aria-label={`Select lead ${lead.name}`}
                            disabled={deleteLoading || updateLoading}
                          >
                            {selectedLeads.includes(lead._id) ? (
                              <FaCheckSquare />
                            ) : (
                              <FaSquare />
                            )}
                          </div>
                        )}
                        {/* View Button */}
                        <button
                          onClick={() => openViewModal(lead)}
                          className="p-2 rounded-md text-purple-600 hover:bg-purple-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="View Lead Details"
                          aria-label={`View details for lead ${lead.name}`}
                          disabled={deleteLoading || updateLoading}
                        >
                          <FaEye className="text-lg" />
                        </button>
                        {/* Status Badge */}
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            lead.status === "Converted"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : lead.status === "Contacted"
                                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                : lead.status === "Rejected" ||
                                    lead.status === "Not Interested"
                                  ? "bg-red-100 text-red-800 border-red-200"
                                  : lead.status === "In Progress"
                                    ? "bg-orange-100 text-orange-800 border-orange-200"
                                    : lead.status === "Enrolled"
                                      ? "bg-green-100 text-green-800 border-green-200"
                                      : "bg-gray-100 text-gray-800 border-gray-200"
                          }`}
                        >
                          {lead.status || "New"}
                        </span>
                      </div>

                      <div className="text-sm text-gray-700">
                        <span className="font-medium text-gray-500">Name:</span>{" "}
                        {lead.name || "—"}
                      </div>
                      <div className="text-sm text-gray-700">
                        <span className="font-medium text-gray-500">
                          Mobile:
                        </span>{" "}
                        {lead.contact || "—"}
                      </div>
                      <div className="text-sm text-gray-700">
                        <span className="font-medium text-gray-500">
                          Email:
                        </span>{" "}
                        {lead.email || "—"}
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
                      <div className="text-sm text-gray-700">
                        <span className="font-medium text-gray-500">
                          Date and Time:
                        </span>{" "}
                        {new Date(lead.createdAt).toLocaleString("en-US", {
                          timeZone: "Asia/Kolkata",
                        })}
                      </div>
                      <div className="text-sm text-gray-700">
                        <span className="font-medium text-gray-500">
                          Assigned To:
                        </span>{" "}
                        {lead.assignedTo
                          ? lead.assignedTo.username
                          : "Not Assigned"}
                      </div>
                      <div className="text-sm text-gray-700">
                        <span className="font-medium text-gray-500">
                          Contacted Info:
                        </span>
                        <div className="ml-2 mt-1">
                          {lead.contactedScore ? (
                            <span className="block text-gray-700">
                              Score: {lead.contactedScore}
                              {lead.contactedComment && (
                                <span className="block text-gray-600 italic text-xs">
                                  <span className="font-medium">Comment:</span>{" "}
                                  {lead.contactedComment.substring(0, 50)}
                                  {lead.contactedComment.length > 50
                                    ? "..."
                                    : ""}
                                </span>
                              )}
                            </span>
                          ) : (
                            <span className="text-gray-500">Not set</span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-gray-100">
                        {!restrictLeadEditing ||
                        userRole === "SuperAdmin" ||
                        userRole === "Admin" ||
                        (lead.assignedTo &&
                          lead.assignedTo._id ===
                            (typeof localStorage !== "undefined"
                              ? localStorage.getItem("adminId")
                              : null)) ? (
                          <button
                            onClick={() => openEditModal(lead)}
                            className="p-2 rounded-md text-blue-600 hover:bg-blue-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Edit Lead Contact Info"
                            aria-label={`Edit lead ${lead.name}`}
                            disabled={deleteLoading || updateLoading}
                          >
                            <FaEdit className="text-lg" />
                          </button>
                        ) : (
                          <button
                            className="p-2 rounded-md text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ cursor: "not-allowed" }}
                            title="Editing restricted to assigned user or admin"
                            disabled
                            aria-label={`Editing restricted for lead ${lead.name}`}
                          >
                            <FaEdit className="text-lg" />
                          </button>
                        )}
                        {(userRole === "SuperAdmin" ||
                          userRole === "Admin" ||
                          userRole === "EditMode") && (
                          <button
                            onClick={() => deleteLead(lead._id)}
                            className="p-2 rounded-md text-red-600 hover:bg-red-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete Lead"
                            aria-label={`Delete lead ${lead.name}`}
                            disabled={deleteLoading || updateLoading || loading}
                          >
                            <FaTrash className="text-lg" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center text-gray-600 flex flex-col items-center">
                  <FaExclamationTriangle className="text-yellow-500 text-3xl mb-4" />
                  No leads found.
                </div>
              )}
            </div>

            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {(userRole === "SuperAdmin" ||
                      userRole === "Admin" ||
                      userRole === "EditMode") && (
                      <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-12">
                        <div
                          className="flex items-center justify-center cursor-pointer"
                          onClick={handleSelectAll}
                          aria-label="Select all leads on page"
                          disabled={deleteLoading || updateLoading || loading}
                        >
                          {selectedLeads.length === currentLeads.length &&
                          selectAll ? (
                            <FaCheckSquare className="text-blue-600 text-xl" />
                          ) : (
                            <FaSquare className="text-blue-600 text-xl" />
                          )}
                        </div>
                      </th>
                    )}
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">
                      View
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">
                      Sr. No.
                    </th>
                    {/* NEW: Date & Time Column Header */}
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[150px]">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Mobile Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Course Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[150px]">
                      Assigned To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider min-w-[200px]">
                      Contacted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider w-32">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentLeads.length > 0 ? (
                    currentLeads.map((lead, index) => {
                      const assignedAdminColor = getAssignedAdminColor(
                        lead.assignedTo
                      );
                      const rowBackgroundColor = selectedLeads.includes(
                        lead._id
                      )
                        ? "bg-blue-50"
                        : assignedAdminColor
                          ? `${assignedAdminColor}10`
                          : "";

                      const rowStyle = {
                        backgroundColor: rowBackgroundColor,
                        transition: "background-color 0.3s ease",
                      };

                      return (
                        <tr
                          key={lead._id || index}
                          className="hover:bg-gray-100"
                          style={rowStyle}
                        >
                          {(userRole === "SuperAdmin" ||
                            userRole === "Admin" ||
                            userRole === "EditMode") && (
                            <td className="px-6 py-4 whitespace-nowrap text-center w-12">
                              <div
                                className="flex items-center justify-center cursor-pointer text-xl text-blue-600"
                                onClick={() => handleSelectLead(lead._id)}
                                aria-label={`Select lead ${lead.name}`}
                                disabled={
                                  deleteLoading || updateLoading || loading
                                }
                              >
                                {selectedLeads.includes(lead._id) ? (
                                  <FaCheckSquare />
                                ) : (
                                  <FaSquare />
                                )}
                              </div>
                            </td>
                          )}
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm w-16">
                            <button
                              onClick={() => openViewModal(lead)}
                              className="p-2 rounded-md text-purple-600 hover:bg-purple-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="View Lead Details"
                              aria-label={`View details for lead ${lead.name}`}
                              disabled={deleteLoading || updateLoading}
                            >
                              <FaEye className="text-lg" />
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 w-16">
                            {indexOfFirstLead + index + 1}
                          </td>
                          {/* NEW: Date & Time Column Data */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 min-w-[150px]">
                            {new Date(lead.createdAt).toLocaleString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: true,
                              timeZone: "Asia/Kolkata",
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {lead.name || "—"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {lead.contact || "—"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {lead.email || "—"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {lead.coursename || "—"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {lead.location || "—"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 min-w-[150px]">
                            {lead.assignedTo ? (
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border text-white ${
                                  lead.assignedTo.role === "SuperAdmin"
                                    ? "bg-purple-600 border-purple-700"
                                    : lead.assignedTo.role === "Admin"
                                      ? "bg-blue-600 border-blue-700"
                                      : lead.assignedTo.role === "ViewMode"
                                        ? "bg-green-600 border-green-700"
                                        : "bg-yellow-600 border-yellow-700"
                                }`}
                                style={
                                  assignedAdminColor
                                    ? { backgroundColor: assignedAdminColor }
                                    : {}
                                }
                              >
                                {lead.assignedTo.username}
                              </span>
                            ) : (
                              <span className="bg-gray-100 text-gray-700 border border-gray-200 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                                Not Assigned
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700 min-w-[200px]">
                            <div>
                              {lead.contactedScore ? (
                                <span className="block text-gray-700">
                                  Score: {lead.contactedScore}
                                  {lead.contactedComment && (
                                    <span className="block text-gray-600 italic text-xs">
                                      <span className="font-medium">
                                        Comment:
                                      </span>{" "}
                                      {lead.contactedComment.substring(0, 50)}
                                      {lead.contactedComment.length > 50
                                        ? "..."
                                        : ""}
                                    </span>
                                  )}
                                </span>
                              ) : (
                                <span className="text-gray-500">Not set</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 w-32">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                lead.status === "Converted"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : lead.status === "Contacted"
                                    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                    : lead.status === "Rejected" ||
                                        lead.status === "Not Interested"
                                      ? "bg-red-100 text-red-800 border-red-200"
                                      : lead.status === "In Progress"
                                        ? "bg-orange-100 text-orange-800 border-orange-200"
                                        : lead.status === "Enrolled"
                                          ? "bg-green-100 text-green-800 border-green-200"
                                          : "bg-gray-100 text-gray-800 border-gray-200"
                              }`}
                            >
                              {lead.status || "New"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium w-32">
                            <div className="flex gap-2 justify-center">
                              {!restrictLeadEditing ||
                              userRole === "SuperAdmin" ||
                              userRole === "Admin" ||
                              (lead.assignedTo &&
                                lead.assignedTo._id ===
                                  (typeof localStorage !== "undefined"
                                    ? localStorage.getItem("adminId")
                                    : null)) ? (
                                <button
                                  onClick={() => openEditModal(lead)}
                                  className="p-2 rounded-md text-blue-600 hover:bg-blue-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                  title="Edit Lead Contact Info"
                                  aria-label={`Edit lead ${lead.name}`}
                                  disabled={deleteLoading || updateLoading}
                                >
                                  <FaEdit className="text-lg" />
                                </button>
                              ) : (
                                <button
                                  className="p-2 rounded-md text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                                  style={{ cursor: "not-allowed" }}
                                  title="Editing restricted to assigned user or admin"
                                  disabled
                                  aria-label={`Editing restricted for lead ${lead.name}`}
                                >
                                  <FaEdit className="text-lg" />
                                </button>
                              )}
                              {(userRole === "SuperAdmin" ||
                                userRole === "Admin" ||
                                userRole === "EditMode") && (
                                <button
                                  onClick={() => deleteLead(lead._id)}
                                  className="p-2 rounded-md text-red-600 hover:bg-red-100 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                  title="Delete Lead"
                                  aria-label={`Delete lead ${lead.name}`}
                                  disabled={
                                    deleteLoading || updateLoading || loading
                                  }
                                >
                                  <FaTrash className="text-lg" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={
                          userRole === "SuperAdmin" ||
                          userRole === "Admin" ||
                          userRole === "EditMode"
                            ? 14 // Original 13 + 1 new column
                            : 13 // Original 12 + 1 new column
                        }
                        className="px-6 py-4 text-center text-gray-600"
                      >
                        <div className="flex flex-col items-center">
                          <FaExclamationTriangle className="text-yellow-500 text-3xl mb-4" />
                          No leads found.
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={prevPage}
                disabled={
                  currentPage === 1 || loading || deleteLoading || updateLoading
                }
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm inline-flex items-center gap-2"
                aria-label="Previous page"
              >
                <FaChevronLeft /> Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === totalPages ||
                  leads.length === 0 ||
                  loading ||
                  deleteLoading ||
                  updateLoading
                }
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm inline-flex items-center gap-2"
                aria-label="Next page"
              >
                Next <FaChevronRight />
              </button>
            </div>
          )}
        </>
      )}

      {showModal && selectedLeadForModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm max-h-[90vh] overflow-y-auto transform transition-all">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Edit Lead: {selectedLeadForModal.name}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl leading-none disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={updateLoading}
                aria-label="Close edit lead modal"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="contactedScore"
                >
                  How many times contacted:
                </label>
                <select
                  id="contactedScore"
                  name="contactedScore"
                  value={editFormData.contactedScore}
                  onChange={handleEditFormChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={updateLoading}
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                    <option key={score} value={score}>
                      {score}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="contactedComment"
                >
                  Contacted Comment
                </label>
                <textarea
                  id="contactedComment"
                  name="contactedComment"
                  value={editFormData.contactedComment}
                  onChange={handleEditFormChange}
                  placeholder="Add detailed comment..."
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  rows="4"
                  disabled={updateLoading}
                ></textarea>
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditFormChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={updateLoading}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Converted">Converted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Not Interested">Not Interested</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Enrolled">Enrolled</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
                disabled={updateLoading}
              >
                Cancel
              </button>
              <button
                onClick={saveLeadFromModal}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={updateLoading}
              >
                {updateLoading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showViewModal && selectedLeadForModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001] p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Lead Details: {selectedLeadForModal.name}
              </h3>
              <button
                onClick={closeViewModal}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl leading-none"
                aria-label="Close lead details modal"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div className="col-span-full sm:col-span-1">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Name:
                  </h4>
                  <p className="text-base text-gray-900 break-words">
                    {selectedLeadForModal.name || "—"}
                  </p>
                </div>
                <div className="col-span-full sm:col-span-1">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Mobile Number:
                  </h4>
                  <p className="text-base text-gray-900 break-words">
                    {selectedLeadForModal.contact || "—"}
                  </p>
                </div>
                <div className="col-span-full">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Email:
                  </h4>
                  <p className="text-base text-gray-900 break-words">
                    {selectedLeadForModal.email || "—"}
                  </p>
                </div>
                <div className="col-span-full sm:col-span-1">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Course Name:
                  </h4>
                  <p className="text-base text-gray-900 break-words">
                    {selectedLeadForModal.coursename || "—"}
                  </p>
                </div>
                <div className="col-span-full sm:col-span-1">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Location:
                  </h4>
                  <p className="text-base text-gray-900 break-words">
                    {selectedLeadForModal.location || "—"}
                  </p>
                </div>
                <div className="col-span-full sm:col-span-1">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Date & Time:
                  </h4>
                  <p className="text-base text-gray-900 break-words">
                    {selectedLeadForModal.createdAt
                      ? new Date(selectedLeadForModal.createdAt).toLocaleString(
                          "en-US",
                          { timeZone: "Asia/Kolkata" }
                        )
                      : "—"}
                  </p>
                </div>
                <div className="col-span-full sm:col-span-1">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Assigned To:
                  </h4>
                  <p className="text-base text-gray-900 break-words">
                    {selectedLeadForModal.assignedTo
                      ? selectedLeadForModal.assignedTo.username
                      : "Not Assigned"}
                  </p>
                </div>
                <div className="col-span-full sm:col-span-1">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Contacted Score:
                  </h4>
                  <p className="text-base text-gray-900 break-words">
                    {selectedLeadForModal.contactedScore
                      ? selectedLeadForModal.contactedScore
                      : "Not set"}
                  </p>
                </div>
                <div className="col-span-full">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Contacted Comment:
                  </h4>
                  <p className="text-base text-gray-900 break-words">
                    {selectedLeadForModal.contactedComment
                      ? selectedLeadForModal.contactedComment
                      : "No comment"}
                  </p>
                </div>
                <div className="col-span-full sm:col-span-1">
                  <h4 className="text-sm font-medium text-gray-500 mb-1">
                    Status:
                  </h4>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium border ${
                      selectedLeadForModal.status === "Converted"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : selectedLeadForModal.status === "Contacted"
                          ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                          : selectedLeadForModal.status === "Rejected" ||
                              selectedLeadForModal.status === "Not Interested"
                            ? "bg-red-100 text-red-800 border-red-200"
                            : selectedLeadForModal.status === "In Progress"
                              ? "bg-orange-100 text-orange-800 border-orange-200"
                              : selectedLeadForModal.status === "Enrolled"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-gray-100 text-gray-800 border-gray-200"
                    }`}
                  >
                    {selectedLeadForModal.status || "New"} 
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={closeViewModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;