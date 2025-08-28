"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock, FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [blogsLoading, setBlogsLoading] = useState(false);
  
  const router = useRouter();
  const { login } = useAuth();

  // API Configuration - Separate backends
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5002'; // Blogs backend
  const API_BASE_URL_MAIN = process.env.NEXT_PUBLIC_BACKEND_URL_MAIN || 'http://localhost:5001'; // Dashboard backend
  
  const shouldFloatLabel = (value, isFocused) => {
    return value.length > 0 || isFocused;
  };

  // Safe error message extraction to prevent unhandled JSON parsing
  const extractErrorMessage = async (response) => {
    try {
      const raw = await response.text();
      if (!raw) return `HTTP ${response.status}: Login failed`;
      
      try {
        const jsonData = JSON.parse(raw);
        return jsonData?.message || `HTTP ${response.status}: Login failed`;
      } catch {
        // If it's not JSON, return the raw text or default message
        return raw.length > 100 ? `HTTP ${response.status}: Login failed` : raw;
      }
    } catch {
      return `HTTP ${response.status}: Login failed`;
    }
  };

  const handleSubmit = async (e, targetPage) => {
    e.preventDefault();
    setError(null);
    
    // Validation
    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }
    
    // Set the appropriate loading state based on target page
    if (targetPage === '/dashboard') {
      setDashboardLoading(true);
    } else if (targetPage === '/blog-admin') {
      setBlogsLoading(true);
    }

    try {
      // Choose base URL and construct API URL based on target
      const BASE = targetPage === '/dashboard' ? API_BASE_URL_MAIN : API_BASE_URL;
      const apiUrl = targetPage === '/dashboard' 
        ? `${BASE}/api/admin-login` 
        : `${BASE}/api/auth/login`;
      
      // Build request body based on backend expectations
      const requestBody = targetPage === '/dashboard'
        ? { username, password } // Dashboard backend expects username/password
        : { loginIdentifier: username, password }; // Blogs backend expects loginIdentifier/password
      
      console.log(`Attempting login to: ${apiUrl}`);
      
      // Make the API call
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      
      // Handle non-OK responses safely
      if (!response.ok) {
        const errorMessage = await extractErrorMessage(response);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Login response data:', data);
      
      // Validate response structure (your backend returns user data at root level)
      if (!data.token) {
        throw new Error('Invalid response structure from server - missing token');
      }

      const token = data.token;

      // Extract user data directly from response (not from data.user)
      const userData = {
        token: token,
        role: (data.role || 'user').toLowerCase(),
        username: data.username,
        email: data.email || '',
        id: data.id, // Your backend returns 'id', not '_id'
        isActive: data.active !== false, // Your backend uses 'active', not 'isActive'
        lastLogin: data.lastLogin || new Date().toISOString(),
        source: targetPage === '/dashboard' ? 'dashboard' : 'blogs'
      };
      
      // Validate role based on target
      const validRoles = targetPage === '/dashboard' 
        ? ['superadmin', 'admin', 'editmode', 'viewmode']
        : ['admin', 'user', 'superadmin'];
      
      if (!validRoles.includes(userData.role)) {
        throw new Error(`Invalid role: ${userData.role} for this login type`);
      }
      
      console.log('Storing user data:', userData);
      
      // Namespaced storage to prevent token collisions
      const namespace = targetPage === '/dashboard' ? 'dashboard' : 'blogs';
      localStorage.setItem(`${namespace}Token`, token);
      localStorage.setItem(`${namespace}Role`, userData.role);
      localStorage.setItem(`${namespace}User`, JSON.stringify(userData));
      
      // Also store in generic keys for backward compatibility
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminRole', userData.role);
      localStorage.setItem('adminUsername', userData.username);
      localStorage.setItem('adminEmail', userData.email);
      localStorage.setItem('adminId', userData.id);
      localStorage.setItem('isAdminLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Verify storage
      console.log('Verifying localStorage:', {
        token: localStorage.getItem('adminToken') ? 'present' : 'missing',
        role: localStorage.getItem('adminRole'),
        id: localStorage.getItem('adminId'),
        username: localStorage.getItem('adminUsername'),
        namespacedToken: localStorage.getItem(`${namespace}Token`) ? 'present' : 'missing'
      });

      // Use AuthContext login if available
      if (login) {
        login(userData);
      }
      
      // Redirect based on target page and user role
      const redirectPath = targetPage || (userData.role === 'superadmin' ? '/superadmin/dashboard' : '/dashboard');
      if (redirectPath) {
        console.log('Redirecting to:', redirectPath);
        router.replace(redirectPath);
      }
      
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login");
    } finally {
      // Reset loading states
      setDashboardLoading(false);
      setBlogsLoading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e, '/dashboard');
  };

  return (
    <section
      className="flex justify-center items-center min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-vector/background-night-mountains-whimsical-cartoon-illustration-night-mountains_198565-8267.jpg')`,
      }}
    >
      <div className="relative w-full max-w-sm md:max-w-md bg-transparent backdrop-filter backdrop-blur-md border border-wheat text-yellow-100 flex flex-col justify-center items-center text-center rounded-3xl p-6 md:p-8 min-h-[400px]">
        <form onSubmit={handleFormSubmit} className="w-full">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-center mb-6 text-yellow-100 text-shadow-sm">
            Admin Log-In
          </h2>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Username/Email Input */}
          <div className="relative mx-auto mb-6 w-full border-b-2 border-yellow-100 text-shadow">
            <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-yellow-100" />
            <input
              type="text"
              name="username"
              id="admin_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
              required
              autoComplete="username"
              className="w-full h-12 bg-transparent border-none outline-none text-base px-3 pr-10 text-yellow-100 placeholder-transparent"
            />
            <label
              htmlFor="admin_username"
              className={`absolute left-0 text-base pointer-events-none transition-all duration-300 ${
                shouldFloatLabel(username, usernameFocused)
                  ? "-top-2 text-sm text-shadow-none"
                  : "top-1/2 transform -translate-y-1/2"
              }`}
            >
              Username or Email
            </label>
          </div>

          {/* Password Input with Show/Hide Toggle */}
          <div className="relative mx-auto mb-8 w-full border-b-2 border-yellow-100 text-shadow">
            <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-yellow-100" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="login_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              required
              autoComplete="current-password"
              className="w-full h-12 bg-transparent border-none outline-none text-base px-3 pr-16 text-yellow-100 placeholder-transparent"
            />
            <label
              htmlFor="login_password"
              className={`absolute left-0 text-base pointer-events-none transition-all duration-300 ${
                shouldFloatLabel(password, passwordFocused)
                  ? "-top-2 text-sm text-shadow-none"
                  : "top-1/2 transform -translate-y-1/2"
              }`}
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-10 top-1/2 transform -translate-y-1/2 text-xl text-yellow-100 p-1 focus:outline-none hover:text-yellow-200 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col items-center gap-4 w-full">
            {/* Dashboard Login Button */}
            <button
              type="button"
              onClick={(e) => handleSubmit(e, "/dashboard")}
              disabled={dashboardLoading || blogsLoading}
              className="w-4/5 h-11 rounded-full bg-orange-700 text-white text-lg font-semibold border-none outline-none cursor-pointer shadow-md hover:shadow-xl hover:bg-orange-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
            >
              {dashboardLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Logging In...
                </>
              ) : (
                "Login to Dashboard"
              )}
            </button>

            {/* Blog Admin Login Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e, "/blog-admin");
              }}
              disabled={blogsLoading || dashboardLoading}
              className="w-4/5 h-11 rounded-full bg-blue-600 text-white text-lg font-semibold border-none outline-none cursor-pointer shadow-md hover:shadow-xl hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
            >
              {blogsLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Logging In...
                </>
              ) : (
                "Login to Blog Admin"
              )}
            </button>
          </div>

          {/* Role Information */}
          <div className="mt-4 text-xs text-yellow-200 opacity-75 text-center">
            <p>All users can access blog administration</p>
            <p>Permissions are managed inside the system</p>
          </div>

          {/* Connection Status (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-2 text-xs text-yellow-200 opacity-50 text-center">
              <div>Dashboard API: {API_BASE_URL_MAIN}</div>
              <div>Blogs API: {API_BASE_URL}</div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;
