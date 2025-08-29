// src/utils/auth.js - Enhanced Authentication Utility for Express.js Backend

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5002';

// Helper: robust public endpoint detection (exact paths only)
const isPublicEndpoint = (fullUrl, method = 'GET') => {
  try {
    const urlObj = new URL(fullUrl);
    const pathname = urlObj.pathname;
    const m = (method || 'GET').toUpperCase();

    // Public health checks
    if (pathname === '/api/ping' || pathname === '/api/blogs/ping') return true;

    // Auth flows that must work without a token
    if (pathname === '/api/auth/login' && m === 'POST') return true;

    // Optional: allow open registration only if intended to be public
    if (pathname === '/api/auth/register' && m === 'POST') return true;

    // Everything else is protected (e.g., /api/auth/users/*, /api/auth/validate-token)
    return false;
  } catch {
    return false; // assume protected on parse failure
  }
};

// Small utility to stringify safely for logs
const safeString = (v) => {
  try { return String(v); } catch { return '[unprintable]'; }
};

// Determine if response has a JSON payload
const isJsonResponse = (response) => {
  const ct = response.headers.get('content-type') || '';
  return ct.includes('application/json');
};

// Determine if response likely has no body (204 or Content-Length: 0)
const hasNoBody = (response) => {
  if (response.status === 204) return true;
  const cl = response.headers.get('content-length');
  if (cl && cl.trim() === '0') return true;
  // Many servers omit content-length; use status+content-type as primary signals
  return false;
};

// Parse JSON safely; return null if no body/JSON
const parseJsonSafe = async (response) => {
  try {
    if (hasNoBody(response)) return null; // 204 No Content
    if (!isJsonResponse(response)) return null; // not JSON
    // Do not clone if body consumed; call json() once
    return await response.json();
  } catch {
    return null;
  }
};

// Ensure the response is JSON; allow 204/empty responses
const ensureJsonResponse = async (response) => {
  const ct = response.headers.get('content-type') || '';
  if (response.status === 204 || hasNoBody(response)) {
    return response; // acceptable: no content by definition
  }
  if (!ct.includes('application/json')) {
    const body = await response.text();
    throw new Error(
      `Expected JSON response, got ${ct || 'unknown content-type'} (status ${response.status}). Body: ${body.slice(0, 200)}${body.length > 200 ? '...' : ''}`
    );
  }
  return response;
};

// Enhanced fetch with authentication that integrates with AuthContext
const fetchWithAuth = async (url, options = {}) => {
  if (!url || typeof url !== 'string') {
    throw new Error('fetchWithAuth: endpoint URL must be a non-empty string');
  }

  const token = typeof localStorage !== "undefined" 
    ? localStorage.getItem("adminToken") 
    : null;

  // Build full URL if relative path provided
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

  // Determine if endpoint is public
  const method = (options.method || 'GET').toUpperCase();
  const publicEndpoint = isPublicEndpoint(fullUrl, method);

  if (!token && !publicEndpoint) {
    console.warn('❌ No authentication token found for protected endpoint:', url);

    if (options.noRedirect) {
      throw new Error("Not authenticated");
    }

    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname + window.location.search;
      if (currentPath !== '/AdminLogin') {
        sessionStorage.setItem('intendedPath', currentPath);
      }
      console.log('🔄 Redirecting to login...');
      window.location.href = "/AdminLogin";
    }
    throw new Error("Not authenticated");
  }

  // Prepare headers
  const headers = {
    Accept: 'application/json',
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }), // Bearer for protected routes
  };

  // Only set Content-Type for JSON bodies (not FormData/Blob)
  const body = options.body;
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  const isBlob = typeof Blob !== 'undefined' && body instanceof Blob;
  if (body && !headers['Content-Type'] && !isFormData && !isBlob) {
    headers['Content-Type'] = 'application/json';
  }

  // Timeout via AbortController
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutMs = options.timeoutMs ?? 30000;
  let timeoutId = null;
  if (controller) {
    timeoutId = setTimeout(() => controller.abort('timeout'), timeoutMs);
  }

  try {
    console.log(`🚀 Making ${method} request to:`, fullUrl);
    console.log('📋 Headers:', { 
      ...headers, 
      Authorization: headers.Authorization ? `Bearer ***` : 'None' 
    });

    const response = await fetch(fullUrl, {
      ...options,
      method,
      headers,
      signal: controller?.signal,
      // credentials: 'include', // not needed for Bearer; enable for cookie auth
    });

    console.log(`📡 Response status: ${response.status} ${response.statusText}`);

    // Auth errors
    if (response.status === 401) {
      console.log('❌ Authentication failed - token expired or invalid');
      await handleAuthError('Session expired. Please login again.');
      const msg = await response.text().catch(() => '');
      throw new Error(msg || "Session expired. Please login again.");
    }

    // Authorization errors
    if (response.status === 403) {
      console.log('❌ Authorization failed - insufficient permissions');
      // If not JSON or empty, fall back to a generic message
      const errJson = await parseJsonSafe(response);
      throw new Error(errJson?.message || "Access denied. You don't have permission to perform this action.");
    }

    // Other client errors (better diagnostics)
    if (response.status >= 400 && response.status < 500) {
      let message = `Request failed with status ${response.status}`;
      const errJson = await parseJsonSafe(response);
      if (errJson?.message || errJson?.error) {
        message = errJson.message || errJson.error;
      } else {
        const textData = await response.text().catch(() => '');
        if (textData) message = textData.length > 400 ? textData.slice(0, 400) + '...' : textData;
      }
      throw new Error(message);
    }

    // Server errors
    if (response.status >= 500) {
      const snippet = await response.text().catch(() => '');
      throw new Error(`Server error (${response.status}). ${snippet?.slice(0, 200) || 'Please try again later.'}`);
    }

    console.log(`✅ Request successful: ${response.status}`);
    return response;

  } catch (error) {
    if (error?.name === 'AbortError') {
      console.error(`⏳ Request timed out after ${timeoutMs}ms:`, fullUrl);
      throw new Error(`Request timed out after ${timeoutMs}ms while contacting ${fullUrl}`);
    }

    console.error('❌ Fetch error:', {
      message: safeString(error?.message),
      stack: safeString(error?.stack),
      url: fullUrl
    });

    // Network/CORS failures appear as TypeError in fetch
    if (
      error instanceof TypeError && 
      (String(error.message).includes('fetch') || String(error.message).includes('Failed to fetch'))
    ) {
      throw new Error(
        `Cannot connect to server at ${API_BASE_URL}.\n` +
        `Check:\n` +
        `1) Backend is running\n` +
        `2) URL ${fullUrl} is correct\n` +
        `3) CORS allows origin and Authorization header\n` +
        `Original: ${error.message}`
      );
    }

    throw error;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
};

// Handle authentication errors by clearing data and redirecting
const handleAuthError = async (message = 'Authentication failed') => {
  console.log('🧹 Clearing authentication data:', message);
  
  if (typeof localStorage !== "undefined") {
    const authKeys = [
      'adminToken',
      'adminRole', 
      'adminUsername',
      'adminEmail',
      'adminId',
      'isAdminLoggedIn',
      'userData'
    ];
    authKeys.forEach(key => {
      localStorage.removeItem(key);
      console.log(`🗑️ Cleared ${key}`);
    });
    sessionStorage.removeItem('intendedPath');
  }

  if (typeof window !== "undefined") {
    console.log('🔄 Redirecting to login page...');
    setTimeout(() => {
      window.location.href = "/AdminLogin";
    }, 100);
  }
};

// ✅ Enhanced token validation with better error handling
const validateToken = async (token = null) => {
  try {
    const tokenToValidate = token || (typeof localStorage !== "undefined" ? localStorage.getItem("adminToken") : null);
    if (!tokenToValidate) {
      return { isValid: false, user: null, error: 'No token provided' };
    }

    console.log('🔍 Validating token with backend...');

    const response = await fetchWithAuth('/api/auth/validate-token', {
      method: 'GET',
      noRedirect: true
    });

    if (response.ok) {
      const userData = await response.json();
      console.log('✅ Token validation successful:', userData.username);
      return { isValid: true, user: userData, error: null };
    } else {
      console.log('❌ Token validation failed:', response.status);
      return { isValid: false, user: null, error: `Token validation failed: ${response.status}` };
    }
  } catch (error) {
    console.error('❌ Token validation error:', error);
    return { isValid: false, user: null, error: error.message };
  }
};

// Login helper function
const login = async (credentials) => {
  try {
    console.log('🔐 Attempting login for:', credentials.loginIdentifier);
    
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const errorData = await parseJsonSafe(response);
      throw new Error(errorData?.message || `Login failed: ${response.status}`);
    }

    const data = await response.json();
    if (!data.token || !data.user) {
      throw new Error('Invalid response from server - missing token or user data');
    }

    console.log('✅ Login successful for:', data.user.username);

    return {
      success: true,
      token: data.token,
      user: data.user,
      message: data.message
    };
  } catch (error) {
    console.error('❌ Login error:', error);
    return {
      success: false,
      token: null,
      user: null,
      error: error.message
    };
  }
};

// Logout helper function
const logout = async () => {
  try {
    const token = typeof localStorage !== "undefined" ? localStorage.getItem("adminToken") : null;
    console.log('🚪 Logging out...');
    
    if (token) {
      try {
        await fetchWithAuth('/api/auth/logout', {
          method: 'POST',
          noRedirect: true
        });
        console.log('✅ Backend logout successful');
      } catch (error) {
        console.warn('⚠️ Backend logout failed, continuing with local cleanup:', error.message);
      }
    }
    
    await handleAuthError('User logged out');
    return { success: true };
  } catch (error) {
    console.error('❌ Logout error:', error);
    await handleAuthError('Logout error - clearing data');
    return { success: false, error: error.message };
  }
};

// Check if user has required role
const hasRole = (userRole, requiredRoles) => {
  if (!userRole) return false;
  const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  return roles.some(role => userRole.toLowerCase() === role.toLowerCase());
};

// Get user data from localStorage
const getCurrentUser = () => {
  if (typeof localStorage === "undefined") return null;
  try {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('❌ Error parsing user data from localStorage:', error);
    return null;
  }
};

// ✅ Enhanced authentication check
const isAuthenticated = () => {
  if (typeof localStorage === "undefined") return false;
  const token = localStorage.getItem('adminToken');
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  const user = getCurrentUser();
  const authenticated = !!(token && isLoggedIn && user && user.isActive !== false);
  console.log('🔐 Authentication check:', {
    hasToken: !!token,
    isLoggedIn,
    hasUser: !!user,
    userActive: user?.isActive,
    result: authenticated
  });
  return authenticated;
};

// ✅ Enhanced backend connectivity test
const testConnection = async () => {
  try {
    console.log('🏥 Testing backend connectivity...');
    const endpoints = ['/api/ping', '/api/blogs/ping'];
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
          const data = await parseJsonSafe(response);
          console.log(`✅ ${endpoint} responded successfully`);
          return { connected: true, message: data?.message || 'Connected', status: response.status, endpoint };
        }
      } catch (error) {
        console.log(`❌ ${endpoint} failed:`, error.message);
      }
    }
    return { connected: false, message: 'All ping endpoints failed', status: null };
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return { connected: false, message: `Connection failed: ${error.message}`, status: null };
  }
};

// Helper to make authenticated API calls with automatic JSON parsing (204-safe)
const apiCall = async (endpoint, options = {}) => {
  const response = await fetchWithAuth(endpoint, options);
  // Allow 204/empty responses without throwing
  if (response.status === 204 || hasNoBody(response)) return null;
  // If not JSON, try to parse safely or return null
  if (!isJsonResponse(response)) return null;
  return response.json();
};

// Helper for GET requests
const apiGet = (endpoint, options = {}) => {
  return apiCall(endpoint, { ...options, method: 'GET' });
};

// Helper for POST requests  
const apiPost = (endpoint, data = {}, options = {}) => {
  return apiCall(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data)
  });
};

// Helper for PUT requests
const apiPut = (endpoint, data = {}, options = {}) => {
  return apiCall(endpoint, {
    ...options,
    method: 'PUT', 
    body: JSON.stringify(data)
  });
};

// Helper for DELETE requests
const apiDelete = (endpoint, options = {}) => {
  return apiCall(endpoint, { ...options, method: 'DELETE' });
};

// ✅ New helper for file uploads
const apiUpload = async (endpoint, formData, options = {}) => {
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("adminToken") : null;
  const fullUrl = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
      // Don't set Content-Type for FormData, let browser set it
    },
    body: formData,
    ...options
  });
  
  if (!response.ok) {
    const errorData = await parseJsonSafe(response);
    throw new Error(errorData?.message || `Upload failed: ${response.status}`);
  }
  
  // Accept JSON or 204
  const data = await parseJsonSafe(response);
  return data ?? {};
};

// Export all utilities
export {
  fetchWithAuth,
  ensureJsonResponse, // kept for compatibility; now 204-tolerant
  validateToken,
  login,
  logout,
  handleAuthError,
  hasRole,
  getCurrentUser,
  isAuthenticated,
  testConnection,
  apiCall,
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  apiUpload,
  API_BASE_URL
};

// Default export for backward compatibility
export default {
  fetchWithAuth,
  ensureJsonResponse,
  validateToken,
  login,
  logout,
  handleAuthError,
  hasRole,
  getCurrentUser,
  isAuthenticated,
  testConnection,
  apiCall,
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  apiUpload,
  API_BASE_URL
};
