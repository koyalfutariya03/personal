'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({ 
  children, 
  requiredRole = null, 
  requiredRoles = null, // Support for multiple roles
  redirectTo = '/AdminLogin',
  unauthorizedRedirect = '/unauthorized',
  showLoading = true 
}) {
  const { user, loading, isAuthenticated, hasRole } = useAuth();
  const router = useRouter();
  const [isValidating, setIsValidating] = useState(true);
  const [validationError, setValidationError] = useState(null);

  // API Configuration
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5002';

  useEffect(() => {
    const validateAccess = async () => {
      try {
        setIsValidating(true);
        setValidationError(null);

        // Wait for AuthContext to finish loading
        if (loading) return;

        // Check if user is authenticated
        if (!isAuthenticated() || !user) {
          console.log('ProtectedRoute: User not authenticated, storing intended path');
          
          // Store the intended URL before redirecting to login
          const currentPath = window.location.pathname + window.location.search;
          if (currentPath !== redirectTo) {
            sessionStorage.setItem('intendedPath', currentPath);
          }
          
          router.replace(redirectTo);
          return;
        }

        // Check if user account is active
        if (user.isActive === false) {
          console.log('ProtectedRoute: User account is inactive');
          setValidationError('Your account has been deactivated. Please contact an administrator.');
          return;
        }

        // Check role requirements
        const roles = requiredRoles || (requiredRole ? [requiredRole] : null);
        if (roles) {
          const hasRequiredRole = hasRole(roles);
          
          console.log('ProtectedRoute: Role check', {
            userRole: user.role,
            requiredRoles: roles,
            hasAccess: hasRequiredRole
          });

          if (!hasRequiredRole) {
            console.log('ProtectedRoute: Insufficient permissions');
            router.replace(unauthorizedRedirect);
            return;
          }
        }

        // Optional: Additional backend validation for sensitive routes
        if (roles && (roles.includes('admin') || roles.includes('superadmin'))) {
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
                console.log('ProtectedRoute: Backend token validation failed');
                // Token is invalid, clear auth data and redirect
                localStorage.removeItem('adminToken');
                router.replace(redirectTo);
                return;
              }

              const backendUser = await response.json();
              
              // Double-check role with backend
              if (roles && !roles.includes(backendUser.role?.toLowerCase())) {
                console.log('ProtectedRoute: Backend role validation failed');
                router.replace(unauthorizedRedirect);
                return;
              }

              console.log('ProtectedRoute: Backend validation successful');
            } catch (backendError) {
              console.error('ProtectedRoute: Backend validation error', backendError);
              // Don't block access if backend is temporarily down
              console.warn('ProtectedRoute: Continuing with frontend validation only');
            }
          }
        }

        console.log('ProtectedRoute: Access granted');
      } catch (error) {
        console.error('ProtectedRoute: Validation error', error);
        setValidationError('An error occurred while validating access permissions.');
      } finally {
        setIsValidating(false);
      }
    };

    validateAccess();
  }, [user, loading, isAuthenticated, hasRole, router, requiredRole, requiredRoles, redirectTo, unauthorizedRedirect, API_BASE_URL]);

  // Show loading state
  if (loading || isValidating) {
    if (!showLoading) return null;
    
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Validating access...</p>
        </div>
      </div>
    );
  }

  // Show validation error
  if (validationError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center mb-4">
              <svg className="w-6 h-6 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-900">Access Error</h2>
            </div>
            <p className="text-gray-600 mb-4">{validationError}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => router.push(redirectTo)}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Login Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Final access check before rendering
  if (!isAuthenticated() || !user) {
    return null;
  }

  // Check role requirements one more time
  const roles = requiredRoles || (requiredRole ? [requiredRole] : null);
  if (roles && !hasRole(roles)) {
    return null;
  }

  // Render protected content
  return children;
}

// Helper component for role-specific content
export function RoleBasedContent({ roles, children, fallback = null }) {
  const { hasRole } = useAuth();
  
  if (!hasRole(roles)) {
    return fallback;
  }
  
  return children;
}

// Higher-order component version
export function withProtectedRoute(Component, options = {}) {
  return function ProtectedComponent(props) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
