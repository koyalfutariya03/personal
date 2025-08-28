// src/utils/auth.js - Enhanced Authentication Utility for Express.js Backend

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5002';

// Enhanced fetch with authentication that integrates with AuthContext
const fetchWithAuth = async (url, options = {}) => {
  // Check if localStorage is available (for SSR/SSG safety)
  const token = typeof localStorage !== "undefined" 
    ? localStorage.getItem("adminToken") 
    : null;

  // Build full URL if relative path provided
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

  // ✅ Enhanced endpoint detection
  const isAuthEndpoint = url.includes('/auth/') || 
                         url.includes('/ping') || 
                         url.includes('AdminLogin') || 
                         url.includes('/api/ping');
  
  if (!token && !isAuthEndpoint) {
    console.warn('❌ No authentication token found for protected endpoint:', url);
    
    // Don't redirect if this is a server-side call or programmatic check
    if (options.noRedirect) {
      throw new Error("Not authenticated");
    }
    
    // Redirect to login for browser requests
    if (typeof window !== "undefined") {
      // Store intended URL for post-login redirect
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
    'Accept': 'application/json',
    ...options.headers,
    // Only add Authorization header if a token exists
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  // ✅ Only add Content-Type for requests with body
  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  // Make the request
  try {
    console.log(`🚀 Making ${options.method || 'GET'} request to:`, fullUrl);
    console.log('📋 Headers:', { 
      ...headers, 
      Authorization: headers.Authorization ? `Bearer ***` : 'None' 
    });
    
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    console.log(`📡 Response status: ${response.status} ${response.statusText}`);

    // Handle authentication errors
    if (response.status === 401) {
      console.log('❌ Authentication failed - token expired or invalid');
      await handleAuthError('Session expired. Please login again.');
      throw new Error("Session expired. Please login again.");
    }

    // Handle authorization errors  
    if (response.status === 403) {
      console.log('❌ Authorization failed - insufficient permissions');
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Access denied. You don't have permission to perform this action.");
    }

    // Handle other client errors
    if (response.status >= 400 && response.status < 500) {
      let errorMessage = `Request failed with status ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (jsonError) {
        // If response is not JSON, try to get text
        try {
          const textData = await response.text();
          if (textData) {
            errorMessage = textData.length > 200 ? textData.substring(0, 200) + '...' : textData;
          }
        } catch (textError) {
          console.warn('Could not parse error response');
        }
      }
      
      throw new Error(errorMessage);
    }

    // Handle server errors
    if (response.status >= 500) {
      throw new Error(`Server error (${response.status}). Please try again later.`);
    }

    console.log(`✅ Request successful: ${response.status}`);
    return response;

  } catch (error) {
    console.error('❌ Fetch error:', error);
    
    // Handle network errors
    if (error instanceof TypeError && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
      throw new Error(`Cannot connect to server at ${API_BASE_URL}. Please check:\n1. Is the backend server running?\n2. Is the URL correct?\n3. Are there CORS issues?\nOriginal error: ${error.message}`);
    }
    
    throw error;
  }
};

// Handle authentication errors by clearing data and redirecting
const handleAuthError = async (message = 'Authentication failed') => {
  console.log('🧹 Clearing authentication data:', message);
  
  if (typeof localStorage !== "undefined") {
    // Clear all authentication data
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
    
    // Clear session storage
    sessionStorage.removeItem('intendedPath');
  }

  // Redirect to login if in browser
  if (typeof window !== "undefined") {
    console.log('🔄 Redirecting to login page...');
    // Small delay to allow cleanup
    setTimeout(() => {
      window.location.href = "/AdminLogin";
    }, 100);
  }
};

// Ensure the response is JSON; otherwise throw a descriptive error
const ensureJsonResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  
  if (!contentType.includes('application/json')) {
    const body = await response.text();
    throw new Error(
      `Expected JSON response, got ${contentType || 'unknown content-type'} (status ${response.status}). Body: ${body.slice(0, 200)}${body.length > 200 ? '...' : ''}`
    );
  }
  
  return response;
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
      return { 
        isValid: true, 
        user: userData, 
        error: null 
      };
    } else {
      console.log('❌ Token validation failed:', response.status);
      return { 
        isValid: false, 
        user: null, 
        error: `Token validation failed: ${response.status}` 
      };
    }
  } catch (error) {
    console.error('❌ Token validation error:', error);
    return { 
      isValid: false, 
      user: null, 
      error: error.message 
    };
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
        'Accept': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Login failed: ${response.status}`);
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
    
    // Attempt to notify backend of logout
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
    
    // Always clear local data
    await handleAuthError('User logged out');
    
    return { success: true };
  } catch (error) {
    console.error('❌ Logout error:', error);
    // Force cleanup even if there's an error
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
    
    // Test both ping endpoints
    const endpoints = ['/api/ping', '/api/blogs/ping'];
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log(`✅ ${endpoint} responded successfully`);
          return { 
            connected: true, 
            message: data.message || 'Connected',
            status: response.status,
            endpoint
          };
        }
      } catch (error) {
        console.log(`❌ ${endpoint} failed:`, error.message);
      }
    }
    
    return { 
      connected: false, 
      message: 'All ping endpoints failed',
      status: null 
    };
    
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    return { 
      connected: false, 
      message: `Connection failed: ${error.message}`,
      status: null 
    };
  }
};

// Helper to make authenticated API calls with automatic JSON parsing
const apiCall = async (endpoint, options = {}) => {
  const response = await fetchWithAuth(endpoint, options);
  await ensureJsonResponse(response);
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
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Upload failed: ${response.status}`);
  }
  
  return response.json();
};

// Export all utilities
export {
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
