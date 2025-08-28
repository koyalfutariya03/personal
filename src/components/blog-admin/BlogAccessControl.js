"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';

// Define blog admin roles and their permissions
const BLOG_ROLES = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  USER: 'user'
};

// ✅ Updated permissions - Users can now create, edit, and delete their own posts
const ROLE_PERMISSIONS = {
  [BLOG_ROLES.SUPERADMIN]: ['*'], // Full access
  [BLOG_ROLES.ADMIN]: [
    'dashboard',
    'posts',
    'posts:create',
    'posts:read',
    'posts:edit',
    'posts:delete',
    'posts:publish',
    'categories',
    'categories:create',
    'categories:edit',
    'categories:delete',
    'users:read',
    'users:create',
    'users:edit',
    'users:delete',
    'settings:read'
  ],
  [BLOG_ROLES.USER]: [
    'dashboard',
    'posts:read',           // Can read all posts
    'posts:create',         // ✅ Can create new posts
    'posts:edit:own',       // ✅ Can edit their own posts
    'posts:delete:own',     // ✅ Can delete their own posts
    'posts:publish:own',    // ✅ Can publish their own posts
    'categories:read',      // Can read categories
    'users:read:own'        // Can read their own profile
  ]
};

// ✅ Enhanced permission checking with ownership validation
const hasBlogPermission = (requiredPermission, userRole, userId = null, resourceOwnerId = null) => {
  if (!userRole) {
    console.log('hasBlogPermission: No user role provided');
    return false;
  }
  
  // Normalize role to lowercase for comparison
  const normalizedRole = userRole.toLowerCase();
  
  // Superadmin has access to everything
  if (normalizedRole === BLOG_ROLES.SUPERADMIN.toLowerCase()) {
    console.log('hasBlogPermission: Superadmin access granted');
    return true;
  }
  
  // Get permissions for the role
  const permissions = ROLE_PERMISSIONS[normalizedRole] || [];
  
  // Check for wildcard access
  if (permissions.includes('*')) {
    console.log('hasBlogPermission: Wildcard access granted');
    return true;
  }
  
  // Check for exact permission match
  if (permissions.includes(requiredPermission)) {
    console.log('hasBlogPermission: Direct permission match:', requiredPermission);
    return true;
  }
  
  // ✅ Enhanced ownership-based permissions (e.g., posts:edit:own, posts:delete:own)
  if (requiredPermission.includes(':own') && userId && resourceOwnerId) {
    const hasOwnershipPermission = permissions.includes(requiredPermission);
    const isOwner = userId.toString() === resourceOwnerId.toString();
    
    console.log('hasBlogPermission: Ownership check', {
      requiredPermission,
      hasOwnershipPermission,
      isOwner,
      userId,
      resourceOwnerId
    });
    
    return hasOwnershipPermission && isOwner;
  }
  
  // ✅ Check for hierarchical permissions (e.g., posts:edit includes posts:read)
  const permissionHierarchy = {
    'posts:delete': ['posts:edit', 'posts:read'],
    'posts:delete:own': ['posts:edit:own', 'posts:read'],
    'posts:edit': ['posts:read'],
    'posts:edit:own': ['posts:read'],
    'posts:publish': ['posts:edit', 'posts:read'],
    'posts:publish:own': ['posts:edit:own', 'posts:read'],
    'categories:delete': ['categories:edit', 'categories:read'],
    'categories:edit': ['categories:read']
  };
  
  if (permissionHierarchy[requiredPermission]) {
    const hasHierarchicalPermission = permissionHierarchy[requiredPermission].some(perm => 
      permissions.includes(perm)
    );
    
    if (hasHierarchicalPermission) {
      console.log('hasBlogPermission: Hierarchical permission granted:', requiredPermission);
      return true;
    }
  }
  
  console.log('hasBlogPermission: Permission denied', {
    requiredPermission,
    userRole: normalizedRole,
    availablePermissions: permissions
  });
  
  return false;
};

// Get current blog role from AuthContext or localStorage
const getCurrentBlogRole = (user) => {
  if (user && user.role) {
    return user.role.toLowerCase();
  }
  
  // Fallback to localStorage for backwards compatibility
  if (typeof window !== 'undefined') {
    return localStorage.getItem('blogAdminRole') || 
           localStorage.getItem('adminRole') || 
           '';
  }
  
  return '';
};

// ✅ Enhanced Access Denied component with user-friendly messages
const BlogAccessDenied = ({ requiredPermission, userRole, onRetry, isOwnershipIssue = false }) => {
  const router = useRouter();
  
  // ✅ User-friendly error messages
  const getErrorMessage = () => {
    if (isOwnershipIssue) {
      return "You can only access your own posts. This post belongs to another user.";
    }
    
    if (userRole === 'user') {
      if (requiredPermission.includes('create')) {
        return "Good news! You can create new posts. Please try creating a post instead.";
      }
      if (requiredPermission.includes('edit') || requiredPermission.includes('delete')) {
        return "You can only edit or delete posts that you created.";
      }
      if (requiredPermission.includes('admin') || requiredPermission.includes('users')) {
        return "This is an admin-only section. You can access the blog creation features instead.";
      }
    }
    
    return "You don't have permission to access this section.";
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 w-full max-w-2xl rounded-md shadow">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg 
              className="h-12 w-12 text-blue-500" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-bold text-blue-800">Access Information</h3>
            <div className="mt-2 text-blue-700">
              <p className="mb-2">{getErrorMessage()}</p>
              {userRole && (
                <p className="mt-1 text-sm">
                  Your role: <span className="font-mono bg-white px-2 py-1 rounded text-sm capitalize">{userRole}</span>
                </p>
              )}
              {userRole === 'user' && (
                <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
                  <p className="text-green-800 font-medium">What you can do:</p>
                  <ul className="text-green-700 text-sm mt-1 list-disc list-inside">
                    <li>Create new blog posts</li>
                    <li>Edit your own posts</li>
                    <li>Delete your own posts</li>
                    <li>Read all published posts</li>
                  </ul>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-blue-200 flex flex-wrap gap-2">
                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Go Back
                </button>
                <button
                  onClick={() => router.push('/blog-admin')}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Dashboard
                </button>
                {userRole === 'user' && (
                  <button
                    onClick={() => router.push('/blog-admin/create')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    Create Post
                  </button>
                )}
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Retry
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading component
const BlogAccessLoading = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600">Validating permissions...</p>
    </div>
  </div>
);

// ✅ Main Blog Access Control Component with enhanced user support
const BlogAccessControl = ({ 
  children, 
  requiredPermission,
  resourceOwnerId = null, // For ownership-based permissions
  validateWithBackend = true, // Whether to validate with backend
  fallback = null,
  showLoading = true
}) => {
  // ✅ Enhanced error boundary for useAuth hook
  const [contextError, setContextError] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [validationError, setValidationError] = useState(null);
  const router = useRouter();
  
  let user, loading, isAuthenticated;
  
  try {
    const authContext = useAuth();
    if (!authContext) {
      throw new Error('AuthContext not available');
    }
    user = authContext.user;
    loading = authContext.loading;
    isAuthenticated = authContext.isAuthenticated;
  } catch (error) {
    console.error('BlogAccessControl: AuthContext error:', error);
    setContextError(error.message);
  }

  // API Configuration
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5002';

  const checkAccess = async () => {
    try {
      setIsValidating(true);
      setValidationError(null);
      setHasAccess(false);

      // Handle context errors
      if (contextError) {
        setValidationError('Authentication system not available');
        return;
      }

      // Wait for AuthContext to finish loading
      if (loading) return;

      // Check if user is authenticated
      if (!isAuthenticated() || !user) {
        console.log('BlogAccessControl: User not authenticated');
        setValidationError('Authentication required');
        return;
      }

      // Check if user account is active
      if (user.isActive === false) {
        console.log('BlogAccessControl: User account is inactive');
        setValidationError('Account inactive');
        return;
      }

      // Get user role
      const userRole = getCurrentBlogRole(user);
      
      console.log('BlogAccessControl: Permission check', {
        userRole,
        requiredPermission,
        userId: user.id,
        resourceOwnerId,
        validateWithBackend
      });

      // ✅ Enhanced permission checking with better ownership handling
      const hasLocalPermission = hasBlogPermission(
        requiredPermission, 
        userRole, 
        user.id, 
        resourceOwnerId
      );

      if (!hasLocalPermission) {
        console.log('BlogAccessControl: Local permission check failed');
        
        // ✅ Check if this is an ownership issue
        const isOwnershipIssue = requiredPermission.includes(':own') && 
                                resourceOwnerId && 
                                user.id.toString() !== resourceOwnerId.toString();
        
        if (isOwnershipIssue) {
          setValidationError('ownership_required');
        } else {
          setValidationError('insufficient_permissions');
        }
        return;
      }

      // Optional backend validation for sensitive operations
      if (validateWithBackend && ['admin', 'superadmin'].includes(userRole)) {
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
              console.log('BlogAccessControl: Backend token validation failed');
              setValidationError('session_expired');
              return;
            }

            const backendUser = await response.json();
            
            // Double-check role with backend
            const backendRole = backendUser.role?.toLowerCase();
            if (backendRole !== userRole) {
              console.log('BlogAccessControl: Role mismatch between frontend and backend');
              setValidationError('role_verification_failed');
              return;
            }

            // Re-check permission with backend user data
            const hasBackendPermission = hasBlogPermission(
              requiredPermission, 
              backendRole, 
              backendUser.id, 
              resourceOwnerId
            );

            if (!hasBackendPermission) {
              console.log('BlogAccessControl: Backend permission check failed');
              setValidationError('backend_permission_denied');
              return;
            }

            console.log('BlogAccessControl: Backend validation successful');
          } catch (backendError) {
            console.error('BlogAccessControl: Backend validation error', backendError);
            
            // In production, you might want to deny access if backend is down
            if (process.env.NODE_ENV === 'production') {
              setValidationError('unable_to_verify_permissions');
              return;
            } else {
              console.warn('BlogAccessControl: Continuing with frontend validation only (development mode)');
            }
          }
        }
      }

      // Access granted
      setHasAccess(true);
      console.log('BlogAccessControl: Access granted for permission:', requiredPermission);

    } catch (error) {
      console.error('BlogAccessControl: Access check error', error);
      setValidationError('permission_validation_failed');
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    checkAccess();
  }, [user, loading, requiredPermission, resourceOwnerId, validateWithBackend, contextError]);

  // ✅ Handle context errors
  if (contextError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-lg font-medium text-red-800 mb-2">Authentication Error</h3>
          <p className="text-red-700 mb-4">
            The authentication system is not available. Please refresh the page or contact support.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Reload Page
            </button>
            <button
              onClick={() => router.push('/AdminLogin')}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Login Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading || isValidating) {
    return showLoading ? <BlogAccessLoading /> : null;
  }

  // Show access denied
  if (validationError || !hasAccess) {
    const userRole = getCurrentBlogRole(user);
    const isOwnershipIssue = validationError === 'ownership_required';
    
    if (fallback) {
      return fallback;
    }
    
    return (
      <BlogAccessDenied 
        requiredPermission={requiredPermission} 
        userRole={userRole}
        onRetry={() => checkAccess()}
        isOwnershipIssue={isOwnershipIssue}
      />
    );
  }

  return children;
};

// ✅ Safe hook for checking permissions with error handling
const useBlogPermission = (requiredPermission, resourceOwnerId = null) => {
  try {
    const { user } = useAuth();
    const userRole = getCurrentBlogRole(user);
    
    return hasBlogPermission(requiredPermission, userRole, user?.id, resourceOwnerId);
  } catch (error) {
    console.error('useBlogPermission error:', error);
    return false; // Fail closed - deny permission if there's an error
  }
};

// Higher-order component for conditional rendering based on permissions
const BlogPermissionGate = ({ permission, resourceOwnerId = null, children, fallback = null }) => {
  const hasPermission = useBlogPermission(permission, resourceOwnerId);
  
  return hasPermission ? children : fallback;
};

export { 
  BLOG_ROLES, 
  hasBlogPermission, 
  getCurrentBlogRole,
  BlogAccessDenied,
  BlogAccessLoading,
  useBlogPermission,
  BlogPermissionGate
};

export default BlogAccessControl;
