// Blog Admin Roles and Permissions Utility - Enhanced for Express.js Backend

import { useAuth } from '@/context/AuthContext';
import { useMemo } from 'react';

export const BLOG_ROLES = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  USER: 'user'
};

// Define comprehensive permissions for each role
export const ROLE_PERMISSIONS = {
  [BLOG_ROLES.SUPERADMIN]: ['*'], // Full access to everything
  [BLOG_ROLES.ADMIN]: [
    // Dashboard access
    'dashboard',
    'dashboard:analytics',
    
    // Post management
    'posts',
    'posts:create',
    'posts:read',
    'posts:edit',
    'posts:delete',
    'posts:publish',
    'posts:unpublish',
    
    // Category/Tag management
    'categories',
    'categories:create',
    'categories:edit',
    'categories:delete',
    'tags',
    'tags:create',
    'tags:edit',
    'tags:delete',
    
    // Media management
    'media',
    'media:upload',
    'media:delete',
    
    // Comment management
    'comments',
    'comments:moderate',
    'comments:delete',
    
    // User management - Full access for admins
    'users:read',
    'users:create',
    'users:edit',
    'users:delete',
    
    // Settings (read only for admins)
    'settings:read'
  ],
  [BLOG_ROLES.USER]: [
    'dashboard',
    'posts:read',
    'posts:create',
    'posts:edit:own', // Can only edit own posts
    'categories:read',
    'tags:read',
    'media:read',
    'users:read:own', // Can only read own profile
    'comments:read'
  ]
};

// Enhanced permission checking with hierarchical and ownership support
export const hasBlogPermission = (requiredPermission, userRole, userId = null, resourceOwnerId = null) => {
  if (!userRole || !requiredPermission) return false;
  
  // Normalize role to lowercase
  const role = userRole.toLowerCase();
  
  // Superadmin has access to everything
  if (role === BLOG_ROLES.SUPERADMIN) return true;
  
  // Get permissions for the role
  const permissions = ROLE_PERMISSIONS[role] || [];
  
  // Check for wildcard access
  if (permissions.includes('*')) return true;
  
  // Check for exact permission match
  if (permissions.includes(requiredPermission)) return true;
  
  // Handle ownership-based permissions (e.g., posts:edit:own)
  if (requiredPermission.includes(':own') && userId && resourceOwnerId) {
    const hasOwnershipPermission = permissions.includes(requiredPermission);
    const isOwner = userId === resourceOwnerId;
    return hasOwnershipPermission && isOwner;
  }
  
  // Handle hierarchical permissions
  const permissionHierarchy = {
    'posts:delete': ['posts:edit', 'posts:read'],
    'posts:edit': ['posts:read'],
    'posts:publish': ['posts:edit', 'posts:read'],
    'posts:unpublish': ['posts:edit', 'posts:read'],
    'categories:delete': ['categories:edit', 'categories:read'],
    'categories:edit': ['categories:read'],
    'tags:delete': ['tags:edit', 'tags:read'],
    'tags:edit': ['tags:read'],
    'media:delete': ['media:upload', 'media:read'],
    'media:upload': ['media:read'],
    'comments:moderate': ['comments:read'],
    'comments:delete': ['comments:read'],
    'users:delete': ['users:edit', 'users:read'],
    'users:edit': ['users:read']
  };
  
  if (permissionHierarchy[requiredPermission]) {
    return permissionHierarchy[requiredPermission].some(perm => permissions.includes(perm));
  }
  
  return false;
};

// Get user role from AuthContext or localStorage fallback
export const getCurrentBlogRole = (user = null) => {
  // Primary: Use AuthContext user data
  if (user && user.role) {
    return user.role.toLowerCase();
  }
  
  // Fallback: Check localStorage for backward compatibility
  if (typeof window !== 'undefined') {
    return localStorage.getItem('blogAdminRole') || 
           localStorage.getItem('adminRole') || 
           null;
  }
  
  return null;
};

// Enhanced authentication check with AuthContext integration
export const isBlogAdminAuthenticated = (user = null, token = null) => {
  // Primary: Use AuthContext data
  if (user && user.role && token) {
    const role = user.role.toLowerCase();
    return user.isActive !== false && Object.values(BLOG_ROLES).includes(role);
  }
  
  // Fallback: Check localStorage
  if (typeof window !== 'undefined') {
    const storageToken = localStorage.getItem('adminToken');
    const storageRole = getCurrentBlogRole();
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    
    return !!storageToken && !!storageRole && isAdminLoggedIn && 
           Object.values(BLOG_ROLES).includes(storageRole);
  }
  
  return false;
};

// Backend validation helper
export const validateBlogAccessWithBackend = async (requiredPermission, user = null) => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5002';
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    
    if (!token) return false;
    
    // Validate token with backend
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) return false;
    
    const backendUser = await response.json();
    
    // Check permission with backend user data
    return hasBlogPermission(
      requiredPermission, 
      backendUser.role, 
      backendUser.id,
      user?.id
    );
  } catch (error) {
    console.error('Backend validation error:', error);
    return false;
  }
};

// ✅ Fixed React Hook for checking blog permissions
export const useBlogPermission = (requiredPermission, resourceOwnerId = null) => {
  const { user, isAuthenticated } = useAuth();
  
  return useMemo(() => {
    // Early returns for invalid states
    if (!requiredPermission) return false;
    if (!isAuthenticated || !isAuthenticated()) return false;
    if (!user || !user.role) return false;
    
    const userRole = getCurrentBlogRole(user);
    
    console.log('🔐 Permission Check:', {
      requiredPermission,
      userRole,
      userId: user.id,
      resourceOwnerId,
      isAuthenticated: isAuthenticated()
    });
    
    const hasPermission = hasBlogPermission(requiredPermission, userRole, user.id, resourceOwnerId);
    
    console.log('✅ Permission Result:', hasPermission);
    
    return hasPermission;
  }, [requiredPermission, resourceOwnerId, user, isAuthenticated]);
};

// ✅ Fixed React Hook for checking multiple permissions
export const useBlogPermissions = (requiredPermissions, resourceOwnerId = null) => {
  const { user, isAuthenticated } = useAuth();
  
  return useMemo(() => {
    if (!isAuthenticated || !isAuthenticated() || !user || !Array.isArray(requiredPermissions)) {
      return {};
    }
    
    const userRole = getCurrentBlogRole(user);
    
    return requiredPermissions.reduce((acc, permission) => {
      acc[permission] = hasBlogPermission(permission, userRole, user.id, resourceOwnerId);
      return acc;
    }, {});
  }, [requiredPermissions, resourceOwnerId, user, isAuthenticated]);
};

// React Hook for getting current blog role
export const useCurrentBlogRole = () => {
  const { user } = useAuth();
  
  return useMemo(() => {
    return getCurrentBlogRole(user);
  }, [user]);
};

// React Hook for blog admin authentication status
export const useBlogAdminAuth = () => {
  const { user, isAuthenticated, loading } = useAuth();
  
  return useMemo(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    
    return {
      isAuthenticated: isAuthenticated && isAuthenticated(),
      isBlogAdmin: isBlogAdminAuthenticated(user, token),
      user,
      role: getCurrentBlogRole(user),
      loading: loading || false
    };
  }, [user, isAuthenticated, loading]);
};

// Enhanced redirect helper that works with AuthContext
export const requireBlogAuth = (requiredRole = null, requiredPermission = null) => {
  if (typeof window === 'undefined') {
    // Handle server-side rendering
    return { props: {} }; // Let client-side handle auth
  }
  
  // Client-side check
  const token = localStorage.getItem('adminToken');
  const role = localStorage.getItem('adminRole');
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  
  // Check basic authentication
  if (!token || !role || !isLoggedIn) {
    window.location.href = '/AdminLogin';
    return { props: {} };
  }
  
  // Check role requirements
  if (requiredRole && role.toLowerCase() !== requiredRole.toLowerCase()) {
    console.warn('Access denied: insufficient role', { required: requiredRole, current: role });
    window.location.href = '/unauthorized';
    return { props: {} };
  }
  
  // Check permission requirements
  if (requiredPermission && !hasBlogPermission(requiredPermission, role)) {
    console.warn('Access denied: insufficient permission', { required: requiredPermission, role });
    window.location.href = '/unauthorized';
    return { props: {} };
  }
  
  return { props: { userRole: role } };
};

// Permission-based component wrapper
export const BlogPermissionWrapper = ({ 
  permission, 
  role = null, 
  resourceOwnerId = null,
  children, 
  fallback = null 
}) => {
  const { user } = useAuth();
  const hasPermission = useBlogPermission(permission, resourceOwnerId);
  
  // Check role requirement
  if (role && getCurrentBlogRole(user) !== role.toLowerCase()) {
    return fallback;
  }
  
  // Check permission requirement
  if (permission && !hasPermission) {
    return fallback;
  }
  
  return children;
};

// Get all permissions for a role
export const getRolePermissions = (role) => {
  if (!role) return [];
  return ROLE_PERMISSIONS[role.toLowerCase()] || [];
};

// Check if user has any admin privileges
export const hasAdminPrivileges = (userRole) => {
  const role = userRole?.toLowerCase();
  return role === BLOG_ROLES.ADMIN || role === BLOG_ROLES.SUPERADMIN;
};

// Check if user can access blog admin area
export const canAccessBlogAdmin = (user = null) => {
  if (!user) return false;
  
  const role = getCurrentBlogRole(user);
  return hasAdminPrivileges(role) && user.isActive !== false;
};

// Permission constants for easy reference
export const BLOG_PERMISSIONS = {
  // Dashboard
  DASHBOARD: 'dashboard',
  DASHBOARD_ANALYTICS: 'dashboard:analytics',
  
  // Posts
  POSTS_CREATE: 'posts:create',
  POSTS_READ: 'posts:read',
  POSTS_EDIT: 'posts:edit',
  POSTS_EDIT_OWN: 'posts:edit:own',
  POSTS_DELETE: 'posts:delete',
  POSTS_PUBLISH: 'posts:publish',
  
  // Categories
  CATEGORIES_CREATE: 'categories:create',
  CATEGORIES_EDIT: 'categories:edit',
  CATEGORIES_DELETE: 'categories:delete',
  CATEGORIES_READ: 'categories:read',
  
  // Tags
  TAGS_CREATE: 'tags:create',
  TAGS_EDIT: 'tags:edit',
  TAGS_DELETE: 'tags:delete',
  TAGS_READ: 'tags:read',
  
  // Media
  MEDIA_UPLOAD: 'media:upload',
  MEDIA_DELETE: 'media:delete',
  MEDIA_READ: 'media:read',
  
  // Users - Enhanced user permissions
  USERS_CREATE: 'users:create',
  USERS_READ: 'users:read',
  USERS_READ_OWN: 'users:read:own',
  USERS_EDIT: 'users:edit',
  USERS_DELETE: 'users:delete',
  
  // Comments
  COMMENTS_MODERATE: 'comments:moderate',
  COMMENTS_DELETE: 'comments:delete',
  COMMENTS_READ: 'comments:read',
  
  // Settings
  SETTINGS_READ: 'settings:read',
  SETTINGS_EDIT: 'settings:edit'
};

export default {
  BLOG_ROLES,
  ROLE_PERMISSIONS,
  BLOG_PERMISSIONS,
  hasBlogPermission,
  getCurrentBlogRole,
  isBlogAdminAuthenticated,
  validateBlogAccessWithBackend,
  useBlogPermission,
  useBlogPermissions,
  useCurrentBlogRole,
  useBlogAdminAuth,
  requireBlogAuth,
  BlogPermissionWrapper,
  getRolePermissions,
  hasAdminPrivileges,
  canAccessBlogAdmin
};
