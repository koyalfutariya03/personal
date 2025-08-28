"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaSpinner,
  FaCog,
  FaCheck,
  FaTimes,
  FaToggleOn,
  FaToggleOff,
  FaClock,
  FaChartBar,
  FaExclamationTriangle,
} from "react-icons/fa";

import Sidebar from "@/components/superadmin/Sidebar";
import AccessControl from "@/components/superadmin/AccessControl";
import { fetchWithAuth } from "@/utils/auth";
import FixedLogo from "@/components/superadmin/FixedLogo";

const SettingsPage = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [totalLeads, setTotalLeads] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [maxLeadsEnabled, setMaxLeadsEnabled] = useState(false); // New state for toggle
  const [inactivityTimeout, setInactivityTimeout] = useState(30);
  const [inactivityWarning, setInactivityWarning] = useState(5);
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

    fetchSettings();
    fetchLeadCount();
  }, [router]);

  useEffect(() => {
    if (settings.length > 0) {
      const maxLeadsSetting = settings.find(
        (s) => s.key === "maxLeadsToDisplay"
      );
      const timeoutSetting = settings.find(
        (s) => s.key === "inactivityTimeout"
      );
      const warningSetting = settings.find(
        (s) => s.key === "inactivityWarningDuration"
      );

      if (maxLeadsSetting != null && maxLeadsSetting.value != null) {
        const value = parseInt(maxLeadsSetting.value);
        setSliderValue(value);
        // If value is 0, it means show all leads (disabled), otherwise enabled
        setMaxLeadsEnabled(value > 0);
      }
      if (timeoutSetting != null && timeoutSetting.value != null) {
        setInactivityTimeout(parseInt(timeoutSetting.value));
      }
      if (warningSetting != null && warningSetting.value != null) {
        setInactivityWarning(parseInt(warningSetting.value));
      }
    }
  }, [settings]);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL is not defined");
        setError("API URL is not configured.");
        setLoading(false);
        return;
      }

      const response = await fetchWithAuth(`${apiUrl}/api/settings`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Failed to fetch settings response:",
          response.status,
          errorText
        );
        throw new Error(
          `Failed to fetch settings: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      const excludedKeys = [
        "enableLocationAutoAssign",
        "enableLocationBasedAssignment",
        "locationAssignments",
        "locationBasedAssignment",
      ];

      const filteredSettings = Array.isArray(data)
        ? data.filter((setting) => !excludedKeys.includes(setting.key))
        : [];

      setSettings(filteredSettings);
    } catch (err) {
      console.error("Error fetching settings:", err);
      setError(err.message || "Failed to fetch settings. Please try again.");
      setSettings([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeadCount = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        console.error("API URL is not configured, cannot fetch lead count.");
        return;
      }
      const response = await fetchWithAuth(`${apiUrl}/api/leads/count`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          "Failed to fetch lead count response:",
          response.status,
          errorText
        );
      }

      const data = await response.json();
      setTotalLeads(data?.count || 0);
    } catch (err) {
      console.error("Error fetching lead count:", err);
      setTotalLeads(0);
    }
  };

  const updateSetting = async (key, value) => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      if (!apiUrl) {
        throw new Error("API URL is not configured.");
      }

      const currentSetting = settings.find((s) => s.key === key);
      const descriptionToSend = currentSetting?.description || "";

      const response = await fetchWithAuth(`${apiUrl}/api/settings/${key}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: value,
          description: descriptionToSend,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          `Failed to update setting "${key}" response:`,
          response.status,
          errorData
        );
        throw new Error(
          errorData.message ||
            `Failed to update setting "${key}": ${response.statusText}`
        );
      }

      const updatedSettingData = await response.json();

      setSettings((prevSettings) =>
        prevSettings.map((setting) =>
          setting.key === key
            ? { ...setting, value: updatedSettingData.value }
            : setting
        )
      );

      setSuccess(`Setting "${key}" updated successfully.`);

      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      console.error(`Error updating setting "${key}":`, err);
      setError(err.message || "Failed to save changes. Please try again.");
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setSaving(false);
    }
  };

  const toggleSetting = (key) => {
    const setting = settings.find((s) => s.key === key);
    if (setting) {
      const currentValue = Boolean(setting.value);
      updateSetting(key, !currentValue);
    } else {
      console.warn(`Setting with key "${key}" not found to toggle.`);
      setError(`Setting "${key}" not found.`);
    }
  };

  // New function to handle max leads toggle
  const toggleMaxLeads = () => {
    const newEnabled = !maxLeadsEnabled;
    setMaxLeadsEnabled(newEnabled);

    if (newEnabled) {
      // If enabling, set to current slider value (or default to 100 if slider is 0)
      const valueToSet = sliderValue > 0 ? sliderValue : 100;
      setSliderValue(valueToSet);
      updateSetting("maxLeadsToDisplay", valueToSet);
    } else {
      // If disabling, set to 0 (show all leads)
      updateSetting("maxLeadsToDisplay", 0);
    }
  };

  const renderNumberInputSetting = (
    setting,
    title,
    description,
    icon,
    minValue = 1,
    maxValue = 120,
    stepValue = 1
  ) => {
    const isReadOnly = userRole !== "SuperAdmin";
    const currentValue =
      setting.key === "inactivityTimeout"
        ? inactivityTimeout
        : inactivityWarning;

    const setValue =
      setting.key === "inactivityTimeout"
        ? setInactivityTimeout
        : setInactivityWarning;

    return (
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 px-0 border-b border-gray-200 last:border-b-0"
        key={setting.key}
      >
        <div className="flex-1 mb-4 sm:mb-0 mx-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center">
            {icon &&
              React.createElement(icon, { className: "mr-2 text-blue-600" })}
            {title}
          </h3>
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          <div className="w-full max-w-sm">
            <div className="flex items-center gap-4 mb-2">
              <input
                type="range"
                min={minValue}
                max={maxValue}
                step={stepValue}
                value={currentValue}
                onChange={(e) => setValue(parseInt(e.target.value))}
                onMouseUp={() =>
                  !isReadOnly && updateSetting(setting.key, currentValue)
                }
                onTouchEnd={() =>
                  !isReadOnly && updateSetting(setting.key, currentValue)
                }
                className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50 disabled:cursor-not-allowed ${isReadOnly || saving ? "pointer-events-none" : ""}`}
                disabled={isReadOnly || saving}
                aria-label={`${title} slider`}
              />
              <input
                type="number"
                min={minValue}
                max={maxValue}
                value={currentValue}
                onChange={(e) => {
                  const value =
                    e.target.value === "" ? minValue : parseInt(e.target.value);
                  const clamped = Math.max(minValue, Math.min(value, maxValue));
                  setValue(clamped);
                }}
                onBlur={(e) => {
                  if (isReadOnly || saving) return;
                  const value =
                    e.target.value === "" ? minValue : parseInt(e.target.value);
                  const clamped = Math.max(minValue, Math.min(value, maxValue));
                  if (clamped !== setting.value) {
                    updateSetting(setting.key, clamped);
                  } else {
                    setValue(setting.value);
                  }
                }}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isReadOnly || saving}
                aria-label={`${title} number input`}
              />
              <span className="text-sm text-gray-600 whitespace-nowrap">
                {setting.key === "inactivityTimeout" ? "minutes" : "minutes"}
              </span>
            </div>
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>{minValue} min</span>
              <span>{maxValue} min</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSetting = (setting) => {
    const excludedKeys = [
      "enableLocationAutoAssign",
      "enableLocationBasedAssignment",
      "locationAssignments",
      "locationBasedAssignment",
    ];
    if (excludedKeys.includes(setting.key)) {
      return null;
    }

    const isReadOnly = userRole !== "SuperAdmin";

    switch (setting.key) {
      case "restrictLeadEditing":
      case "restrictCounselorView":
        const title =
          setting.key === "restrictLeadEditing"
            ? "Restrict Lead Editing"
            : "Restrict Counselor View";
        const description =
          setting.key === "restrictLeadEditing"
            ? "When enabled, only admins or assigned users can edit lead status and contacted fields in dashboard page."
            : "When enabled, counselors can only see leads assigned to them.";
        const isActive = Boolean(setting.value);

        return (
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 px-0 border-b border-gray-200 last:border-b-0"
            key={setting.key}
          >
            <div className="flex-1 mb-4 sm:mb-0 mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{description}</p>
              <div className="flex items-center text-sm">
                {isActive ? (
                  <FaCheck className="text-green-500 mr-2" />
                ) : (
                  <FaTimes className="text-red-500 mr-2" />
                )}
                <span
                  className={`font-medium ${isActive ? "text-green-700" : "text-red-700"}`}
                >
                  {isActive ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={() => toggleSetting(setting.key)}
                className="p-2 text-4xl leading-none focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isReadOnly || saving}
                title={isActive ? "Click to Disable" : "Click to Enable"}
                aria-label={isActive ? `Disable ${title}` : `Enable ${title}`}
              >
                {isActive ? (
                  <FaToggleOn className="text-blue-600 hover:text-blue-700" />
                ) : (
                  <FaToggleOff className="text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
          </div>
        );

      case "maxLeadsToDisplay":
        const maxValueForSlider = totalLeads > 0 ? totalLeads : 500;

        return (
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 px-0 border-b border-gray-200 last:border-b-0"
            key={setting.key}
          >
            <div className="flex-1 mb-4 sm:mb-0 mx-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <FaChartBar className="mr-2 text-blue-600" /> Maximum Leads to
                  Display
                </h3>
                <div className="flex items-center ml-4">
                  <span
                    className={`text-sm mr-2 ${maxLeadsEnabled ? "text-green-700" : "text-red-700"}`}
                  >
                    {maxLeadsEnabled ? "Limited" : "Show All"}
                  </span>
                  <button
                    onClick={toggleMaxLeads}
                    className="p-1 text-3xl leading-none focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isReadOnly || saving}
                    title={
                      maxLeadsEnabled
                        ? "Click to Show All Leads"
                        : "Click to Limit Leads"
                    }
                    aria-label={
                      maxLeadsEnabled
                        ? "Disable lead limit"
                        : "Enable lead limit"
                    }
                  >
                    {maxLeadsEnabled ? (
                      <FaToggleOn className="text-blue-600 hover:text-blue-700" />
                    ) : (
                      <FaToggleOff className="text-gray-400 hover:text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-2">
                {maxLeadsEnabled
                  ? "Set the maximum number of leads to display on the main dashboard page."
                  : "Currently showing all leads without limit. Toggle on to set a specific limit."}
              </p>

              {/* Show total leads info separately */}
              {totalLeads > 0 && (
                <p className="text-xs text-gray-500 mb-4">
                  📊 Total leads in database:{" "}
                  <span className="font-semibold">{totalLeads}</span>
                </p>
              )}

              {maxLeadsEnabled && (
                <div className="w-full max-w-sm">
                  <div className="flex items-center gap-4 mb-2">
                    <input
                      type="range"
                      min="1"
                      max={maxValueForSlider}
                      step="1"
                      value={sliderValue}
                      onChange={(e) => setSliderValue(parseInt(e.target.value))}
                      onMouseUp={() =>
                        !isReadOnly && updateSetting(setting.key, sliderValue)
                      }
                      onTouchEnd={() =>
                        !isReadOnly && updateSetting(setting.key, sliderValue)
                      }
                      className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:opacity-50 disabled:cursor-not-allowed ${isReadOnly || saving ? "pointer-events-none" : ""}`}
                      disabled={isReadOnly || saving}
                      aria-label="Maximum Leads to Display slider"
                    />
                    <input
                      type="number"
                      min="1"
                      max={maxValueForSlider}
                      value={sliderValue}
                      onChange={(e) => {
                        const value =
                          e.target.value === "" ? 1 : parseInt(e.target.value);
                        const clamped = Math.max(
                          1,
                          Math.min(value, maxValueForSlider)
                        );
                        setSliderValue(clamped);
                      }}
                      onBlur={(e) => {
                        if (isReadOnly || saving) return;
                        const value =
                          e.target.value === "" ? 1 : parseInt(e.target.value);
                        const clamped = Math.max(
                          1,
                          Math.min(value, maxValueForSlider)
                        );
                        if (clamped !== setting.value) {
                          updateSetting(setting.key, clamped);
                        } else {
                          setSliderValue(
                            setting.value > 0 ? setting.value : 100
                          );
                        }
                      }}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isReadOnly || saving}
                      aria-label="Maximum Leads to Display number input"
                    />
                    <span className="text-sm text-gray-600 whitespace-nowrap">
                      leads
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>1</span>
                    <span>{maxValueForSlider} total</span>
                  </div>

                  {/* Show current setting info */}
                  <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-xs text-blue-700">
                      💡 Currently set to display:{" "}
                      <span className="font-semibold">{sliderValue}</span> leads
                    </p>
                  </div>
                </div>
              )}

              {!maxLeadsEnabled && (
                <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-700 flex items-center">
                    <FaCheck className="mr-2" />
                    All leads will be displayed without any limit.
                    {totalLeads > 0 && (
                      <span className="ml-2 text-xs">
                        (All {totalLeads} leads will be shown)
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case "inactivityTimeout":
        return renderNumberInputSetting(
          setting,
          "Session Inactivity Timeout",
          "Set the duration (in minutes) after which inactive users will be automatically logged out.",
          FaClock,
          2, // min 2 minutes
          120, // max 120 minutes (2 hours)
          1 // step of 1 minute
        );

      case "inactivityWarningDuration":
        return renderNumberInputSetting(
          setting,
          "Inactivity Warning Duration",
          "Set how many minutes before timeout to show the inactivity warning to users.",
          FaClock,
          1, // min 1 minute
          30, // max 30 minutes
          1 // step of 1 minute
        );

      default:
        return (
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 px-0 border-b border-gray-200 last:border-b-0"
            key={setting.key}
          >
            <div className="flex-1 mb-4 sm:mb-0 mr-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {setting.key}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {setting.description || "No description provided."}
              </p>
              <div className="mt-3">
                <pre className="bg-gray-100 p-3 rounded-md text-sm font-mono text-gray-700 overflow-x-auto max-w-full">
                  {(typeof setting.value === "object" &&
                    setting.value !== null) ||
                  Array.isArray(setting.value)
                    ? JSON.stringify(setting.value, null, 2)
                    : String(setting.value)}
                </pre>
              </div>
            </div>
          </div>
        );
    }
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
      <Sidebar activePage="settings" />
      {/* <FixedLogo /> */}
      <main className="flex-1 lg:ml-0 pt-16 lg:pt-0 overflow-auto">
        <AccessControl section="settings">
          <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <FaCog className="mr-3 text-blue-600" /> System Settings
              </h1>
              <p className="text-gray-600 text-lg">
                Configure system-wide settings for your application.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md relative mb-4 flex items-center">
                <FaTimes className="mr-2 text-xl" />
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md relative mb-4 flex items-center">
                <FaCheck className="mr-2 text-xl" />
                {success}
              </div>
            )}

            {loading && settings.length === 0 && !error ? (
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
                <p className="mt-4 text-gray-600">Loading settings...</p>
              </div>
            ) : settings.length === 0 && !loading && !error ? (
              <div className="p-6 text-center text-gray-600 flex flex-col items-center">
                <FaExclamationTriangle className="text-yellow-500 text-3xl mb-4" />
                No configurable settings found.
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200 overflow-hidden">
                {settings.map((setting) => renderSetting(setting))}
              </div>
            )}

            {saving && (
              <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[1001]">
                <div className="bg-white px-6 py-4 rounded-lg shadow-xl flex items-center text-blue-600">
                  <FaSpinner className="animate-spin mr-3 text-2xl" />
                  <span className="text-lg font-medium">Saving changes...</span>
                </div>
              </div>
            )}
          </div>
        </AccessControl>
      </main>
    </div>
  );
};

export default SettingsPage;
