"use client";
import { useEffect, useRef, useState } from "react";
// Removed styles import
// import styles from "@/styles/superadmin/AuditLogDetailsModal.module.css";
import {
  FaTimes,
  FaArrowRight,
  FaCog,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaCalendarAlt,
  FaClipboardList,
  FaMapMarkerAlt,
  FaComments,
  FaCheck,
  FaTimes as FaTimesCircle,
  FaUserShield,
  FaSpinner,
  FaInfoCircle,
} from "react-icons/fa";

// Assuming fetchWithAuth is in a shared utility file
import { fetchWithAuth } from "@/utils/auth"; // Import reusable fetch utility

const AuditLogDetailsModal = ({ log, onClose }) => {
  const modalRef = useRef(null);
  // userDetails state: { [userId]: userObject | false } (false indicates fetch attempted and failed)
  const [userDetails, setUserDetails] = useState({});
  // Global loading state for fetching any user details
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Check if window and document are defined for SSR safety
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scrolling of background content
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = "auto";
      }
    };
  }, [onClose]);

  // Close modal on escape key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (typeof document !== "undefined") {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      if (typeof document !== "undefined") {
        document.removeEventListener("keydown", handleEscKey);
      }
    };
  }, [onClose]);

  // Function to fetch a specific user by ID
  const fetchUserById = async (userId) => {
    if (!userId || userDetails[userId] !== undefined) {
      // If userId is null/undefined/empty OR details are already in state (success or failed), don't fetch
      console.log(
        `Skipping fetch for ${userId}: Already in state or invalid ID.`
      );
      return;
    }

    // Mark this specific user ID as loading temporarily? Or just rely on global?
    // Relying on global loadingUsers for simplicity for now.
    console.log(`Attempting API fetch for user ID: ${userId}`);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || ""; // Use empty string as fallback
    if (!apiUrl) {
      console.warn("API URL not configured. Cannot fetch user details.");
      setUserDetails((prev) => ({ ...prev, [userId]: false })); // Mark as failed
      return;
    }

    try {
      // Attempt 1: Assuming the ID is an admin ID
      const adminResponse = await fetchWithAuth(
        `${apiUrl}/api/admins/${userId}`
      );

      if (adminResponse.ok) {
        const adminData = await adminResponse.json();
        // Check if response looks like user/admin data (has _id and username)
        if (adminData && adminData._id && adminData.username) {
          console.log(`Successfully fetched admin ${userId}`);
          setUserDetails((prev) => ({ ...prev, [userId]: adminData })); // Store the user object
          return; // Found user, stop here
        } else {
          console.warn(
            `Admin endpoint for ${userId} returned data but missing _id or username:`,
            adminData
          );
          setUserDetails((prev) => ({ ...prev, [userId]: false })); // Mark as failed due to unexpected format
        }
      } else {
        console.warn(
          `Admin endpoint for ${userId} failed: ${adminResponse.status}`
        );
        // Don't mark as failed yet, continue to next attempt if applicable
      }

      // Attempt 2: Assuming the ID is a general user ID (less likely needed in this modal)
      // ... (Optional, if your system has separate user endpoints) ...

      // If no endpoint succeeded in returning valid data after all attempts
      console.warn(
        `Failed to fetch valid user data for ID: ${userId} from any endpoint.`
      );
      setUserDetails((prev) => ({ ...prev, [userId]: false })); // Mark as failed
      // Note: The global loadingUsers state will be set to false once all fetches triggered by the effect complete.
    } catch (error) {
      console.error(`Error during fetchUserById for ${userId}:`, error);
      setUserDetails((prev) => ({ ...prev, [userId]: false })); // Mark as failed on network/auth error
    }
  };

  // Effect to identify and fetch user details mentioned in the log data
  useEffect(() => {
    const fetchUserDetailsForLog = async () => {
      // Early return if log doesn't exist or no metadata
      if (!log) return;

      const userIdsToFetch = new Set();

      // Helper function to recursively find potential user IDs in an object/array
      const findPotentialUserIds = (value) => {
        if (!value || typeof value !== "object") return;

        if (Array.isArray(value)) {
          value.forEach((item) => findPotentialUserIds(item)); // Recurse for array items
          return;
        }

        // Check for common user ID field names and patterns
        Object.entries(value).forEach(([key, itemValue]) => {
          // If value is a string that looks like a MongoDB ID
          if (
            typeof itemValue === "string" &&
            itemValue.length === 24 &&
            /^[0-9a-f]{24}$/i.test(itemValue)
          ) {
            userIdsToFetch.add(itemValue);
          }
          // If value is an object or array, recurse
          else if (typeof itemValue === "object") {
            // Handle {$oid: "..."} specifically
            if (
              itemValue.$oid &&
              typeof itemValue.$oid === "string" &&
              itemValue.$oid.length === 24 &&
              /^[0-9a-f]{24}$/i.test(itemValue.$oid)
            ) {
              userIdsToFetch.add(itemValue.$oid);
            } else {
              findPotentialUserIds(itemValue); // Recurse for nested objects/arrays
            }
          }
        });
      };

      // Start searching from key log properties
      if (
        log.adminId &&
        typeof log.adminId === "string" &&
        log.adminId.length === 24
      ) {
        userIdsToFetch.add(log.adminId); // Admin who performed the action
      }
      if (
        log.userId &&
        typeof log.userId === "string" &&
        log.userId.length === 24
      ) {
        userIdsToFetch.add(log.userId); // User targeted by some actions (e.g. delete_user)
      }
      if (
        log.target &&
        typeof log.target === "string" &&
        log.target.length === 24
      ) {
        // If target IS a user ID string
        userIdsToFetch.add(log.target);
      }

      // Search within metadata recursively
      if (log.metadata) {
        findPotentialUserIds(log.metadata);
      }

      // Filter out IDs that are already in userDetails state (successfully fetched OR failed attempt)
      // Only fetch if userDetails[id] is strictly undefined (meaning fetchUserById was never called for this ID)
      const uniqueUserIdsToFetch = [...userIdsToFetch].filter(
        (id) => userDetails[id] === undefined
      );

      // If there are new unique IDs to fetch
      if (uniqueUserIdsToFetch.length > 0) {
        setLoadingUsers(true); // Start global loading indicator
        console.log(
          `Starting batch fetch for ${uniqueUserIdsToFetch.length} users...`
        );
        try {
          // Call fetchUserById for each unique ID that hasn't been attempted
          await Promise.all(
            uniqueUserIdsToFetch.map((id) => fetchUserById(id))
          );
        } catch (err) {
          console.error("Error during batch fetch of user details:", err);
          // Individual fetchUserById calls handle their own errors and state updates (setting userDetails[id] to false)
          // No need to set a global error here based on individual failures.
        } finally {
          setLoadingUsers(false); // End global loading indicator when batch is done
          console.log("Batch fetch finished.");
        }
      }
    };

    // Re-run when the log prop changes.
    // Also depend on userDetails state. This is crucial! If a fetchUserById finishes
    // and updates userDetails, this effect re-runs, sees the new user in state,
    // and *doesn't* try to refetch it. It will, however, attempt to fetch any *other*
    // IDs from the log metadata that were missed or not yet fetched.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [log, userDetails]);

  if (!log) return null;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid Date"; // Use getTime() for reliable invalid date check
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
      return "Invalid Date"; // Return fallback on parsing error
    }
  };

  // Get appropriate icon for field name
  const getFieldIcon = (fieldName) => {
    if (!fieldName) return null;
    const fieldLower = fieldName.toLowerCase();
    if (fieldLower.includes("name") || fieldLower === "username")
      return <FaUser className="text-blue-500 mr-2" />;
    if (fieldLower.includes("email"))
      return <FaEnvelope className="text-blue-500 mr-2" />;
    if (
      fieldLower.includes("contact") ||
      fieldLower.includes("phone") ||
      fieldLower === "mobileno"
    )
      return <FaPhone className="text-blue-500 mr-2" />;
    if (fieldLower.includes("id") || fieldLower === "_id")
      return <FaIdCard className="text-blue-500 mr-2" />;
    if (fieldLower.includes("date") || fieldLower.includes("at"))
      return <FaCalendarAlt className="text-blue-500 mr-2" />;
    if (fieldLower.includes("status"))
      return <FaClipboardList className="text-blue-500 mr-2" />;
    if (fieldLower.includes("location") || fieldLower.includes("city"))
      return <FaMapMarkerAlt className="text-blue-500 mr-2" />;
    if (fieldLower.includes("comment") || fieldLower.includes("notes"))
      return <FaComments className="text-blue-500 mr-2" />;
    if (fieldLower.includes("role"))
      return <FaUserShield className="text-blue-500 mr-2" />;
    if (fieldLower.includes("setting"))
      return <FaCog className="text-blue-500 mr-2" />;

    return null; // No specific icon found
  };

  // Determine if value has changed significantly for styling (deep comparison for objects/arrays)
  const hasValueChanged = (oldVal, newVal) => {
    // Treat null and undefined as the same for comparison
    if (oldVal == null && newVal == null) return false;
    if (oldVal == null || newVal == null) return true; // One is null/undefined, the other isn't

    // Handle different types
    if (typeof oldVal !== typeof newVal) return true; // Types are different

    if (typeof oldVal === "object") {
      // Deep compare objects and arrays using stringify (simple way, might not handle all edge cases like circular refs)
      try {
        return JSON.stringify(oldVal) !== JSON.stringify(newVal);
      } catch (e) {
        console.error("Failed to stringify object for comparison:", e);
        return true; // Assume changed if comparison fails
      }
    }

    // Compare primitive values (string, number, boolean, etc.)
    return oldVal !== newVal;
  };

  // Format field names to be more readable (e.g., "contactedScore" -> "Contacted Score")
  const formatFieldName = (fieldName) => {
    if (!fieldName) return "";
    // Simple regex to split camelCase or snake_case and capitalize words
    return fieldName
      .replace(/([A-Z])/g, " \$1") // Add space before capital letters
      .replace(/_/g, " ") // Replace underscores with spaces
      .split(" ") // Split into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" ")
      .trim(); // Trim any leading/trailing spaces
  };

  // Render simple value (string, number, boolean, null/undefined, array, object)
  // Tries to format booleans and dates nicely. Recurses for arrays/objects.
  const renderSimpleValue = (value) => {
    if (value === null) {
      return <em className="text-gray-500 italic">None</em>;
    }
    if (value === undefined) {
      return <em className="text-gray-500 italic">Undefined</em>;
    }

    if (typeof value === "boolean") {
      return value ? (
        <span className="inline-flex items-center text-green-600 font-medium">
          <FaCheck className="mr-1" /> True
        </span>
      ) : (
        <span className="inline-flex items-center text-red-600 font-medium">
          <FaTimesCircle className="mr-1" /> False
        </span>
      );
    }

    if (value === "") {
      return <em className="text-gray-500 italic">Empty</em>;
    }

    // Check if value is a valid date string (ISO format or similar) and format it
    if (typeof value === "string") {
      try {
        const date = new Date(value);
        // Check if it's a valid Date object after parsing
        if (!isNaN(date.getTime())) {
          // Optional: Check if the string looks like a date/time string (basic check)
          // This regex is simple and might match other strings, adjust if needed
          const dateStringRegex =
            /^\d{4}-\d{2}-\d{2}([T\s]\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?Z?)?$/i;
          if (dateStringRegex.test(value)) {
            // Return formatted date only if it seems like a date string
            return formatDate(value);
          }
        }
      } catch (e) {
        // Ignore date parsing errors, treat as regular string
      }
    }

    // Handle objects and arrays
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        if (value.length === 0)
          return <em className="text-gray-500 italic">Empty Array</em>;

        return (
          <div className="pl-4 border-l border-gray-300 ml-2 space-y-1">
            {" "}
            {/* Added indent and spacing */}
            {value.map((item, index) => (
              <div key={index} className="flex items-baseline text-sm">
                <span className="font-semibold text-gray-600 mr-2">
                  {index + 1}.
                </span>
                <span className="flex-1 break-words">
                  {renderSimpleValue(item)}
                </span>{" "}
                {/* Recurse for nested items */}
              </div>
            ))}
          </div>
        );
      }

      // For non-null objects
      if (Object.keys(value).length === 0)
        return <em className="text-gray-500 italic">Empty Object</em>;

      return (
        <div className="pl-4 border-l border-gray-300 ml-2 space-y-1">
          {" "}
          {/* Added indent and spacing */}
          {Object.entries(value).map(([key, val]) => (
            <div key={key} className="text-sm">
              <span className="font-semibold text-gray-600 mr-2">
                {formatFieldName(key)}:
              </span>
              <span className="text-gray-700 break-words">
                {renderSimpleValue(val)}
              </span>{" "}
              {/* Recurse for nested values */}
            </div>
          ))}
        </div>
      );
    }

    // Default case for primitives
    return value.toString();
  };

  // Special handling for values that are expected to be user objects or user IDs
  // This function is designed to handle:
  // 1. null/undefined values -> display "None"
  // 2. A string ID (like "6828150a03cac2c9c55458e7") -> check userDetails state
  //    - If found in userDetails and is user object -> display user details
  //    - If found in userDetails and is `false` -> display "Details Not Available"
  //    - If not found in userDetails AND loadingUsers is true -> display "Fetching..."
  //    - If not found in userDetails AND loadingUsers is false -> display "ID: [id] (Details unavailable)" (useEffect should have triggered fetch)
  // 3. An object { $oid: "..." } -> extract ID and call renderUserValue with the string ID
  // 4. An object that looks like a populated user { _id, username, ... } -> display details from the object
  // 5. Any other value type -> fall back to renderSimpleValue
  const renderUserValue = (value) => {
    // 1. Handle null or undefined
    if (value == null) {
      // Use == null to catch both null and undefined
      return <em className="text-gray-500 italic">None</em>;
    }

    // 3. Handle object like { $oid: "..." }
    if (
      value &&
      typeof value === "object" &&
      value.$oid &&
      typeof value.$oid === "string" &&
      value.$oid.length === 24 &&
      /^[0-9a-f]{24}$/i.test(value.$oid)
    ) {
      const userId = value.$oid;
      console.log(
        `renderUserValue found {$oid: "${userId}"}, recursing with ID string.`
      );
      return renderUserValue(userId); // Recurse with the actual ID string
    }

    // 4. Handle object that looks like a populated user { _id: "...", username: "..." }
    if (
      value &&
      typeof value === "object" &&
      value._id &&
      typeof value._id === "string" &&
      value.username
    ) {
      console.log(
        `renderUserValue found populated user object for ID: ${value._id}`
      );
      const user = value;
      return (
        <div className="flex flex-col space-y-1 text-sm">
          <div className="font-medium text-gray-800">{user.username}</div>
          {user.role && <div className="text-gray-600 italic">{user.role}</div>}
          {user.email && <div className="text-gray-600">{user.email}</div>}
          {user.location && (
            <div className="text-gray-600">{user.location}</div>
          )}
          {/* Optional: Show status */}
          {user.active !== undefined && (
            <div
              className={`text-xs font-semibold ${user.active ? "text-green-700" : "text-red-700"}`}
            >
              {user.active ? "Active" : "Inactive"}
            </div>
          )}
        </div>
      );
    }

    // 2. Handle string IDs
    if (
      typeof value === "string" &&
      value.length === 24 &&
      /^[0-9a-f]{24}$/i.test(value)
    ) {
      const userId = value;
      console.log(`renderUserValue checking state for user ID: ${userId}`);

      // Check if details are already in state (success or failed)
      if (userDetails[userId] !== undefined) {
        // Check if the key exists
        if (userDetails[userId]) {
          // Check if the value is the user object (success)
          console.log(`Details found in state for ${userId}`);
          const user = userDetails[userId];
          return (
            /* ... UI for fetched user details (same as populated) ... */
            <div className="flex flex-col space-y-1 text-sm">
              <div className="font-medium text-gray-800">
                {user.username || "Unknown User"}
              </div>
              {user.role && (
                <div className="text-gray-600 italic">{user.role}</div>
              )}
              {user.email && <div className="text-gray-600">{user.email}</div>}
              {user.location && (
                <div className="text-gray-600">{user.location}</div>
              )}
              {/* Optional: Show status */}
              {user.active !== undefined && (
                <div
                  className={`text-xs font-semibold ${user.active ? "text-green-700" : "text-red-700"}`}
                >
                  {user.active ? "Active" : "Inactive"}
                </div>
              )}
              {/* Optional: show the ID itself */}
              {/* <div className="text-xs text-gray-500 font-mono">{userId}</div> */}
            </div>
          );
        } else {
          // The value is false (fetch attempted and failed)
          console.log(`Details fetch failed for ${userId}`);
          return (
            <div className="flex flex-col space-y-1 text-sm text-red-700">
              <div className="font-medium">User Details Not Available</div>
              <div className="text-gray-600 font-mono break-words text-xs">
                ID: {userId}
              </div>
            </div>
          );
        }
      }

      // If details are NOT in state and we are NOT loading globally,
      // it means the useEffect might not have picked this ID up yet, or a fetch
      // is about to start. Show a pending indicator. The useEffect should
      // eventually trigger fetchUserById for this ID because userDetails[userId] is undefined.
      console.log(`Details for ${userId} not in state, showing pending...`);
      // No need to manually call fetchUserById here, useEffect handles finding and triggering fetches.
      return (
        <div className="flex items-center text-gray-600 italic text-sm">
          <FaSpinner className="animate-spin mr-2" /> Fetching user details (
          {userId})...
        </div>
      );
    }

    // 5. For any other value type, fall back to renderSimpleValue
    console.log(
      `renderUserValue falling back to renderSimpleValue for value:`,
      value
    );
    return renderSimpleValue(value);
  };

  // Function to render setting update in a more user-friendly way
  const renderSettingUpdate = (metadata) => {
    if (!metadata) {
      return (
        <div className="text-gray-600 italic text-sm">
          No setting information available.
        </div>
      );
    }

    // Expecting structure like { settingName: '...', oldValue: '...', newValue: '...', description: '...' }
    // If it doesn't have settingName, try to display as generic object update
    if (!metadata.settingName) {
      console.warn(
        "renderSettingUpdate received metadata without settingName:",
        metadata
      );
      // Fallback to displaying raw metadata object
      return renderSimpleValue(metadata);
    }

    // If we have proper setting structure
    const hasChanged = hasValueChanged(metadata.oldValue, metadata.newValue);

    return (
      <div className="space-y-3">
        {" "}
        {/* Added space-y for internal spacing */}
        <div className="flex items-center text-base font-semibold text-gray-800">
          <FaCog className="mr-2 text-blue-600" />
          <span>{metadata.settingName}</span>
          {hasChanged && (
            <span className="ml-3 px-2 py-0.5 bg-yellow-200 text-yellow-800 text-xs font-medium rounded-full">
              Changed
            </span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
          <div className="flex-1 break-words">
            <span className="font-medium text-gray-600">Previous Value:</span>
            <span className="ml-1 text-gray-900 break-words">
              {renderSimpleValue(metadata.oldValue)}
            </span>
          </div>
          <div className="flex-shrink-0 text-gray-500 hidden sm:block">
            <FaArrowRight />
          </div>
          <div className="flex-1 break-words">
            <span className="font-medium text-gray-600">New Value:</span>
            <span className="ml-1 text-gray-900 break-words">
              {renderSimpleValue(metadata.newValue)}
            </span>
          </div>
        </div>
        {metadata.description && (
          <div className="text-sm text-gray-600 italic pt-2 border-t border-gray-200">
            <strong>Description:</strong> {metadata.description}
          </div>
        )}
      </div>
    );
  };

  // Check action types for conditional rendering
  const isUpdateLeadAction = log.action === "update_lead";
  const isCreateLeadAction = log.action === "create_lead";
  const isDeleteLeadAction = log.action === "delete_lead";
  const isUpdateSettingAction = log.action === "update_setting";
  const isLoginAction = log.action === "login"; // Assuming 'login' action name from backend
  const isDeleteAdminAction = log.action === "delete_admin";
  const isUpdateUserAction = log.action === "update_user";
  const isCreateAdminAction = log.action === "create_admin"; // Added create_admin

  // Determine the main title based on action type
  const modalTitle = isUpdateLeadAction
    ? "Lead Update Details"
    : isCreateLeadAction
      ? "Lead Creation Details"
      : isDeleteLeadAction
        ? "Lead Deletion Details"
        : isDeleteAdminAction
          ? "Admin Deletion Details"
          : isUpdateUserAction
            ? "User Update Details"
            : isCreateAdminAction
              ? "Admin Creation Details"
              : isUpdateSettingAction
                ? "Setting Update Details"
                : isLoginAction
                  ? "Login Details"
                  : "Audit Log Details";

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001] p-4">
      {/* Modal Container */}
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform transition-all"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{modalTitle}</h2>
          <button
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 text-2xl leading-none"
            onClick={onClose}
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-6">
          {" "}
          {/* Added space-y for vertical spacing between sections */}
          {/* Basic Information Section */}
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FaInfoCircle className="mr-2 text-blue-600" /> Basic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              {/* Admin */}
              <div className="col-span-full sm:col-span-1">
                <span className="font-medium text-gray-600 block mb-1">
                  Admin:
                </span>
                <span className="text-gray-900 break-words">
                  {log.adminId?.username || "Unknown"}
                </span>
              </div>
              {/* Role */}
              <div className="col-span-full sm:col-span-1">
                <span className="font-medium text-gray-600 block mb-1">
                  Role:
                </span>
                <span className="text-gray-900 break-words">
                  {log.adminId?.role || "Unknown"}
                </span>
              </div>
              {/* Action */}
              {log.action && (
                <div className="col-span-full sm:col-span-1">
                  <span className="font-medium text-gray-600 block mb-1">
                    Action:
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 break-words">
                    {log.action}
                  </span>
                </div>
              )}
              {/* Target */}
              {log.target && (
                <div className="col-span-full sm:col-span-1">
                  <span className="font-medium text-gray-600 block mb-1">
                    Target:
                  </span>
                  <span className="text-gray-900 break-words">
                    {log.target}
                  </span>
                </div>
              )}
              {/* Timestamp */}
              <div className="col-span-full sm:col-span-1">
                <span className="font-medium text-gray-600 block mb-1">
                  Date:
                </span>
                <span className="text-gray-900 break-words">
                  {formatDate(log.createdAt || log.loginAt)}
                </span>
              </div>
              {/* IP Address */}
              {log.ipAddress && (
                <div className="col-span-full sm:col-span-1">
                  <span className="font-medium text-gray-600 block mb-1">
                    IP Address:
                  </span>
                  <span className="text-gray-900 break-words">
                    {log.ipAddress}
                  </span>
                </div>
              )}
              {/* Login Status */}
              {isLoginAction && log.success !== undefined && (
                <div className="col-span-full sm:col-span-1">
                  <span className="font-medium text-gray-600 block mb-1">
                    Status:
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border break-words ${log.success ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}`}
                  >
                    {log.success ? "Success" : "Failed"}
                  </span>
                </div>
              )}
            </div>
          </div>
          {/* User Agent for login logs */}
          {log.userAgent && (
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaUserShield className="mr-2 text-blue-600" /> User Agent
              </h3>
              <div className="bg-gray-100 p-3 rounded-md text-sm text-gray-700 overflow-x-auto font-mono break-words whitespace-pre-wrap max-h-32">
                {" "}
                {/* Code block styling */}
                {log.userAgent}
              </div>
            </div>
          )}
          {/* Display metadata if available */}
          {log.metadata && (
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <FaCog className="mr-2 text-blue-600" /> Details
              </h3>

              {/* Lead information if available in metadata */}
              {log.metadata.userId && ( // Assuming userId in metadata indicates lead info
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <h4 className="text-base font-semibold text-blue-800 mb-3 flex items-center">
                    <FaUser className="mr-2" /> Lead Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div className="col-span-full sm:col-span-1">
                      <span className="font-medium text-blue-700 block mb-1">
                        Lead ID:
                      </span>
                      <span className="text-blue-900 break-words">
                        {log.metadata.userId}
                      </span>
                    </div>
                    {log.metadata.leadName && (
                      <div className="col-span-full sm:col-span-1">
                        <span className="font-medium text-blue-700 block mb-1">
                          Name:
                        </span>
                        <span className="text-blue-900 break-words">
                          {log.metadata.leadName}
                        </span>
                      </div>
                    )}
                    {log.metadata.leadEmail && (
                      <div className="col-span-full sm:col-span-1">
                        <span className="font-medium text-blue-700 block mb-1">
                          Email:
                        </span>
                        <span className="text-blue-900 break-words">
                          {log.metadata.leadEmail}
                        </span>
                      </div>
                    )}
                    {log.metadata.leadContact && (
                      <div className="col-span-full sm:col-span-1">
                        <span className="font-medium text-blue-700 block mb-1">
                          Contact:
                        </span>
                        <span className="text-blue-900 break-words">
                          {log.metadata.leadContact}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Enhanced display for update_lead, update_user actions (updateFields structure) */}
              {(isUpdateLeadAction || isUpdateUserAction) &&
                log.metadata.updateFields && (
                  <div className="space-y-4">
                    {" "}
                    {/* Add spacing between field changes */}
                    <h4 className="text-base font-semibold text-gray-800 mb-3">
                      Changes Made
                    </h4>
                    {Object.entries(log.metadata.updateFields).map(
                      ([field, values]) => {
                        // Check if values has both oldValue and newValue properties
                        const hasOldAndNewValue =
                          values &&
                          typeof values === "object" &&
                          "oldValue" in values &&
                          "newValue" in values;

                        // If it's not in expected oldValue/newValue format, display as a single value
                        if (!hasOldAndNewValue) {
                          return (
                            <div
                              key={field}
                              className="border border-gray-200 rounded-md p-3 bg-gray-50"
                            >
                              <div className="flex items-center mb-2 text-sm font-medium text-gray-700">
                                {getFieldIcon(field)}
                                <span>{formatFieldName(field)}:</span>
                              </div>
                              <div className="text-gray-900 text-sm break-words">
                                {field === "assignedTo" ||
                                field.toLowerCase().includes("user") ||
                                field.toLowerCase().includes("admin")
                                  ? renderUserValue(values)
                                  : renderSimpleValue(values)}{" "}
                                {/* Check for user/admin related fields */}
                              </div>
                            </div>
                          );
                        }

                        const changed = hasValueChanged(
                          values.oldValue,
                          values.newValue
                        );

                        return (
                          <div
                            key={field}
                            className={`border rounded-md p-3 ${changed ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-white"}`}
                          >
                            <div className="flex items-center mb-2">
                              {getFieldIcon(field)}
                              <h5
                                className={`text-sm font-medium ${changed ? "text-blue-700" : "text-gray-700"}`}
                              >
                                {formatFieldName(field)}
                              </h5>
                              {changed && (
                                <span className="ml-2 px-2 py-0.5 bg-yellow-200 text-yellow-800 text-xs font-medium rounded-full">
                                  Changed
                                </span>
                              )}
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                              <div className="flex-1 break-words">
                                <span className="font-medium text-gray-600">
                                  Previous:
                                </span>
                                <span className="ml-1 text-gray-900 break-words">
                                  {field === "assignedTo" ||
                                  field.toLowerCase().includes("user") ||
                                  field.toLowerCase().includes("admin")
                                    ? renderUserValue(values.oldValue)
                                    : renderSimpleValue(values.oldValue)}
                                </span>
                              </div>
                              <div className="flex-shrink-0 text-gray-500 hidden sm:block">
                                <FaArrowRight />
                              </div>
                              <div className="flex-1 break-words">
                                <span className="font-medium text-gray-600">
                                  Updated:
                                </span>
                                <span className="ml-1 text-gray-900 break-words">
                                  {field === "assignedTo" ||
                                  field.toLowerCase().includes("user") ||
                                  field.toLowerCase().includes("admin")
                                    ? renderUserValue(values.newValue)
                                    : renderSimpleValue(values.newValue)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}

              {/* Enhanced display for update_setting action */}
              {isUpdateSettingAction &&
                log.metadata &&
                log.metadata.settingName && ( // Check for settingName field
                  <div className="border rounded-md p-3 bg-blue-50 border-blue-300">
                    <h4 className="text-base font-semibold text-blue-800 mb-3 flex items-center">
                      <FaCog className="mr-2" /> Setting Update
                    </h4>
                    {renderSettingUpdate(log.metadata)}
                  </div>
                )}

              {/* Special handling for Admin/User Creation/Deletion (metadata contains document) */}
              {(isCreateAdminAction ||
                isDeleteAdminAction ||
                log.action === "create_user" ||
                log.action === "delete_user") &&
                log.metadata &&
                log.metadata.document && (
                  <div className="border rounded-md p-3 bg-green-50 border-green-300">
                    {" "}
                    {/* Use green for creation/deletion info */}
                    <h4 className="text-base font-semibold text-green-800 mb-3 flex items-center">
                      {isCreateAdminAction || log.action === "create_user"
                        ? "Created"
                        : "Deleted"}{" "}
                      {log.metadata.document.role || "User/Admin"} Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                      {/* Iterate through document fields */}
                      {Object.entries(log.metadata.document).map(
                        ([key, value]) => {
                          // Skip internal fields like password, __v
                          if (key === "password" || key === "__v") return null;
                          return (
                            <div
                              key={key}
                              className={key === "email" ? "col-span-full" : ""}
                            >
                              {" "}
                              {/* Span email across columns */}
                              <span className="font-medium text-green-700 block mb-1">
                                {formatFieldName(key)}:
                              </span>
                              <span className="text-green-900 break-words">
                                {/* Special rendering for date fields */}
                                {
                                  key.toLowerCase().includes("date") ||
                                  key.toLowerCase().includes("at")
                                    ? formatDate(value)
                                    : key === "assignedTo"
                                      ? renderUserValue(value)
                                      : renderSimpleValue(value) // Use renderUserValue for assignedTo within document
                                }
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                    {log.metadata.deletedAt && ( // Add deletedAt if present (e.g. for soft deletes)
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <span className="font-medium text-green-700 block mb-1">
                          Deleted At:
                        </span>
                        <span className="text-green-900 break-words">
                          {formatDate(log.metadata.deletedAt)}
                        </span>
                      </div>
                    )}
                  </div>
                )}

              {/* Raw metadata fallback display */}
              {/* Only show this if no specific structured metadata was rendered above */}
              {/* Check if metadata exists but none of the specific structures matched */}
              {log.metadata &&
                !log.metadata.updateFields &&
                !log.metadata.document &&
                !log.metadata.userId &&
                !isUpdateSettingAction && ( // Check for known structured keys
                  <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
                    <h4 className="text-base font-semibold text-gray-800 mb-3">
                      Raw Metadata
                    </h4>
                    {Object.entries(log.metadata).length === 0 ? (
                      <div className="text-gray-600 italic text-sm">
                        No additional information available.
                      </div>
                    ) : (
                      <pre className="bg-white p-3 rounded-md text-sm text-gray-700 overflow-x-auto font-mono break-words whitespace-pre-wrap max-h-48">
                        {" "}
                        {/* Preformatted text for raw data */}
                        {JSON.stringify(log.metadata, null, 2)}{" "}
                        {/* Pretty print JSON */}
                      </pre>
                    )}
                  </div>
                )}
            </div>
          )}
          {/* Message if no metadata at all */}
          {!log.metadata && (
            <div className="border border-gray-200 rounded-md p-4 text-center text-gray-600 italic">
              No detailed information available for this log entry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditLogDetailsModal;
