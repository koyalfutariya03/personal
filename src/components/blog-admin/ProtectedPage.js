"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

/**
 * ProtectedPage Component
 * 
 * A higher-order component that wraps page content with access control.
 * Now integrated with Express.js backend and AuthContext.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - The page content to be protected
 * @param {string|string[]} props.requiredRole - Single role or array of roles required
 * @param {string} props.requiredPermission - Legacy: maps to role-based access
 * @param {string} props.pageTitle - The title of the page (for the access denied message)
 * @param {React.ReactNode} [props.fallback] - Custom fallback component when access is denied
 * @param {boolean} [props.validateWithBackend=true] - Whether to validate with backend
 * @param {boolean} [props.showLoading=true] - Whether to show loading state
 * @returns {JSX.Element} The protected page content or access denied message
 */
const ProtectedPage = ({
  children,
  requiredRole = null,
  requiredRoles = null,
  requiredPermission = null, // Legacy support
  pageTitle = "this page",
  fallback = null,
  validateWithBackend = true,
  showLoading = true
}) => {
  const { user, loading, isAuthenticated, hasRole } = useAuth();
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(true);
  const [validationError, setValidationError] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);

  // API Configuration
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5002';

  // Map legacy permissions to roles
  const mapPermissionToRoles = (permission) => {
    const permissionRoleMap = {
      'dashboard': ['user', 'admin', 'superadmin'],
      'posts': ['admin', 'superadmin'],
      'users': ['superadmin'],
      'settings': ['superadmin'],
      'create': ['admin', 'superadmin'],
      'edit': ['admin', 'superadmin'],
      'delete': ['admin', 'superadmin'],
      'moderate': ['admin', 'superadmin']
    };
    return permissionRoleMap[permission] || ['admin', 'superadmin'];
  };

  useEffect(() => {
    const validateAccess = async () => {
      try {
        setIsValidating(true);
        setValidationError(null);
        setHasAccess(false);

        // Check for token in localStorage as fallback
        const token = localStorage.getItem('blogToken') || localStorage.getItem('adminToken');
        
        // If no token and not authenticated, redirect to login
        if (!token && !isAuthenticated()) {
          console.log('ProtectedPage: No token found, redirecting to login');
          router.push(`/AdminLogin?redirect=${encodeURIComponent(window.location.pathname)}`);
          return;
        }

        // If we have a token but AuthContext isn't initialized yet, try to validate it
        if (token && (!user || !isAuthenticated())) {
          try {
            const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (!response.ok) throw new Error('Invalid token');
            
            const userData = await response.json();
            // Trigger login in AuthContext
            if (window.loginFromProtectedPage) {
              window.loginFromProtectedPage(userData);
            }
            // Wait for next render to let AuthContext update
            return;
          } catch (error) {
            console.error('Token validation failed:', error);
            localStorage.removeItem('blogToken');
            localStorage.removeItem('adminToken');
            router.push(`/AdminLogin?redirect=${encodeURIComponent(window.location.pathname)}`);
            return;
          }
        }

        // At this point, we should have a valid user from AuthContext
        if (!user) {
          setValidationError('Failed to load user information. Please try again.');
          return;
        }

        // Check if user account is active
        if (user.isActive === false) {
          console.log('ProtectedPage: User account is inactive');
          setValidationError('Your account has been deactivated. Please contact an administrator.');
          return;
        }

        // Determine required roles
        let roles = requiredRoles || (requiredRole ? [requiredRole] : null);
        
        // Legacy permission mapping
        if (requiredPermission && !roles) {
          roles = mapPermissionToRoles(requiredPermission);
        }

        // Check role requirements
        if (roles) {
          const hasRequiredRole = hasRole(roles);
          
          console.log('ProtectedPage: Role check', {
            userRole: user.role,
            requiredRoles: roles,
            hasAccess: hasRequiredRole,
            pageTitle
          });

          if (!hasRequiredRole) {
            console.log('ProtectedPage: Insufficient permissions');
            setValidationError(`You don't have permission to access ${pageTitle}. Required role: ${roles.join(' or ')}`);
            return;
          }
        }

        // Optional: Backend validation for sensitive operations
        if (validateWithBackend && roles && (roles.includes('admin') || roles.includes('superadmin'))) {
          const token = localStorage.getItem('adminToken');
          if (token) {
            try {
              const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              });

              if (!response.ok) {
                console.log('ProtectedPage: Backend token validation failed');
                setValidationError('Your session has expired. Please log in again.');
                return;
              }

              const backendUser = await response.json();
              
              // Double-check role with backend
              if (roles && !roles.includes(backendUser.role?.toLowerCase())) {
                console.log('ProtectedPage: Backend role validation failed');
                setValidationError(`Access denied. Backend validation failed for required role: ${roles.join(' or ')}`);
                return;
              }

              console.log('ProtectedPage: Backend validation successful');
            } catch (backendError) {
              console.error('ProtectedPage: Backend validation error', backendError);
              
              // In production, you might want to deny access if backend is down
              // For development, we'll allow access with a warning
              if (process.env.NODE_ENV === 'production') {
                setValidationError('Unable to verify permissions. Please try again.');
                return;
              } else {
                console.warn('ProtectedPage: Continuing with frontend validation only (development mode)');
              }
            }
          }
        }

        // Access granted
        setHasAccess(true);
        console.log('ProtectedPage: Access granted for', pageTitle);

      } catch (error) {
        console.error('ProtectedPage: Validation error', error);
        setValidationError('An error occurred while validating access permissions.');
      } finally {
        setIsValidating(false);
      }
    };

    validateAccess();
  }, [user, loading, isAuthenticated, hasRole, requiredRole, requiredRoles, requiredPermission, validateWithBackend, pageTitle, API_BASE_URL]);

  // Show loading state
  if (loading || isValidating) {
    if (!showLoading) return null;
    
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Validating access permissions...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show validation error or access denied
  if (validationError || !hasAccess) {
    if (fallback) {
      return fallback;
    }

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg 
              className="h-8 w-8 text-red-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-2">
            {validationError || `You don't have permission to access ${pageTitle}.`}
          </p>
          {user && (
            <p className="text-sm text-gray-500 mb-6">
              Current role: <span className="font-medium capitalize">{user.role}</span>
            </p>
          )}
          <div className="flex justify-center space-x-3">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => router.push('/blog-admin')}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Return to Dashboard
            </button>
            <button
              onClick={() => router.push('/AdminLogin')}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              Login Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render protected content
  return children;
};

export default ProtectedPage;
