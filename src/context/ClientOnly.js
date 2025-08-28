// context/ClientOnly.js - Fixed to prevent hydration mismatches

"use client";

import { useEffect, useState } from "react";

// ✅ FIXED: Prevent hydration mismatches by ensuring consistent rendering
const ClientOnly = ({ children, fallback = null }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // ✅ FIXED: Render consistent fallback on server and initial client render
  if (!hasMounted) {
    return fallback;
  }

  // ✅ FIXED: Simple wrapper without extra div or key prop that could cause issues
  return <>{children}</>;
};

export default ClientOnly;