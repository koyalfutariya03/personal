/**
 * API Client Utility
 * Handles all API requests with proper error handling and base URL configuration
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Make an API request
 * @param {string} endpoint - The API endpoint (e.g., '/admin/users')
 * @param {object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<Response>}
 */
export async function apiRequest(endpoint, options = {}) {
  // Ensure endpoint starts with a slash
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  // Set default headers
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    let data;
    try {
      // Only try to parse as JSON if there's content
      const text = await response.text();
      data = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      throw new Error('Invalid response from server');
    }

    if (!response.ok) {
      // Create a more detailed error message
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorData = data;
      
      // Try to extract meaningful error information
      if (data) {
        if (data.message) errorMessage = data.message;
        if (data.error?.message) errorMessage = data.error.message;
        if (data.errors) {
          errorMessage = Object.values(data.errors).join('\n');
        }
      }
      
      const error = new Error(errorMessage);
      error.status = response.status;
      error.data = data || {};
      
      // Add more context for debugging
      error.context = {
        url: url,
        method: options.method || 'GET',
        status: response.status,
        statusText: response.statusText,
        responseData: data
      };
      
      throw error;
    }

    return data;
  } catch (error) {
    console.error('API Request Error:', {
      endpoint,
      status: error.status,
      message: error.message,
      data: error.data || {},
    });
    
    // Create a more informative error object
    const apiError = new Error(error.message || 'API request failed');
    apiError.status = error.status;
    apiError.data = error.data || {};
    throw apiError;
  }
}

// Helper methods for common HTTP methods
export const api = {
  get: (endpoint, options = {}) => 
    apiRequest(endpoint, { ...options, method: 'GET' }),
  
  post: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),
    
  put: (endpoint, body, options = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    }),
    
  delete: (endpoint, options = {}) =>
    apiRequest(endpoint, { ...options, method: 'DELETE' }),
};
