"use client";
import { useState, useEffect } from "react";

// Helper function to check if Admin has access to a section
const checkAdminAccess = (section) => {
  const role =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("adminRole")
      : null;

  if (role === "Admin") {
    const allowedSections = ["dashboard", "leads", "analytics"];
    return allowedSections.includes(section);
  }

  return true;
};

// Restricted section component
const RestrictedSection = () => {
  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        backgroundColor: "#fff5f5",
        borderRadius: "8px",
        border: "1px solid #fc8181",
        margin: "2rem auto",
        maxWidth: "800px",
      }}
    >
      <h2 style={{ color: "#e53e3e", marginBottom: "1rem" }}>
        Access Restricted
      </h2>
      <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
        You do not have access to this section. Please contact a SuperAdmin for
        assistance.
      </p>
      <p>
        Your current role permissions do not allow access to this functionality.
      </p>
    </div>
  );
};

const AccessControl = ({ children, section }) => {
  const [hasAccess, setHasAccess] = useState(true);

  useEffect(() => {
    const userRole = localStorage.getItem("adminRole");

    if (userRole === "Admin") {
      setHasAccess(checkAdminAccess(section));
    } else {
      setHasAccess(true);
    }
  }, [section]);

  return hasAccess ? children : <RestrictedSection />;
};

export { checkAdminAccess, RestrictedSection };
export default AccessControl;
