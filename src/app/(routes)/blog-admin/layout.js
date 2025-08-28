"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { 
  FaSpinner, 
  FaSignOutAlt, 
  FaBlog, 
  FaUsers, 
  FaHome, 
  FaUser, 
  FaExclamationTriangle, 
  FaChevronRight, 
  FaUserCog
} from "react-icons/fa";

// Safe context hook with error handling
const useSafeAuth = () => {
  try {
    const { useAuth } = require("@/context/AuthContext");
    const context = useAuth();
    
    if (!context) {
      return {
        user: null,
        loading: false,
        isAuthenticated: () => false,
        hasRole: () => false,
        login: () => Promise.reject(new Error('Auth not available')),
        logout: () => Promise.reject(new Error('Auth not available'))
      };
    }
    
    return context;
  } catch (error) {
    console.error('useSafeAuth error:', error);
    return {
      user: null,
      loading: false,
      isAuthenticated: () => false,
      hasRole: () => false,
      login: () => Promise.reject(new Error('Auth not available')),
      logout: () => Promise.reject(new Error('Auth not available'))
    };
  }
};

const BlogAdminLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Use safe auth hook
  const { user, loading, logout, isAuthenticated, hasRole } = useSafeAuth();
  
  const [localLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5002';

  // ✅ Case-insensitive role checker
  const userHasRole = (userRole, allowedRoles) => {
    if (!userRole || !Array.isArray(allowedRoles)) return false;
    
    const userRoleLower = userRole.toLowerCase();
    return allowedRoles.some(role => role.toLowerCase() === userRoleLower);
  };

  useEffect(() => {
    const checkBlogAccess = async () => {
      try {
        setLocalLoading(true);
        setError(null);

        if (loading) return;

        if (!isAuthenticated() || !user) {
          console.log('BlogAdminLayout: User not authenticated, redirecting to login');
          router.push('/AdminLogin');
          return;
        }

        // ✅ Allow users, admins, and superadmins
        const hasRequiredRole = userHasRole(user.role, ['admin', 'superadmin', 'user']);
        
        console.log('BlogAdminLayout: Access check', {
          user: user.username,
          role: user.role,
          hasRequiredRole,
          isActive: user.isActive
        });

        if (!hasRequiredRole) {
          setError({
            type: 'permission',
            message: 'Access Denied: You need admin, superadmin, or user privileges to access the blog administration panel.',
            userRole: user.role
          });
          return;
        }

        if (user.isActive === false) {
          setError({
            type: 'inactive',
            message: 'Account Inactive: Your account has been deactivated. Please contact an administrator.'
          });
          return;
        }

        // Test connection (optional, with error handling)
        try {
          const { testConnection } = require("@/utils/auth");
          const connectionTest = await testConnection();
          setConnectionStatus(connectionTest);
        } catch (connErr) {
          console.warn('Connection test failed:', connErr);
          setConnectionStatus({ connected: false, message: 'Connection test unavailable' });
        }

      } catch (err) {
        console.error('BlogAdminLayout: Access check error', err);
        setError({
          type: 'error',
          message: 'An error occurred while checking access permissions.'
        });
      } finally {
        setLocalLoading(false);
      }
    };

    checkBlogAccess();
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.clear();
      router.push('/AdminLogin');
      window.location.reload();
    }
  };

  // Show loading state
  if (loading || localLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading blog admin panel...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center mb-4">
              <FaExclamationTriangle className="text-red-500 text-2xl mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Access Denied</h2>
            </div>
            <p className="text-gray-600 mb-4">{error.message}</p>
            {error.userRole && (
              <p className="text-sm text-gray-500 mb-4">
                Current Role: <span className="font-medium capitalize">{error.userRole}</span>
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Go to Dashboard
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // ✅ Simplified Navigation - Only Dashboard and User Management
  const navItems = [
    { 
      name: 'Dashboard', 
      href: '/blog-admin', 
      icon: <FaHome className="mr-3" />,
      roles: ['admin', 'superadmin', 'user']
    },
    // ✅ Only User Management - removed duplicates and create post
    { 
      name: 'User Management', 
      href: '/blog-admin/users', 
      icon: <FaUsers className="mr-3" />,
      roles: ['admin', 'superadmin'] // Only admin and superadmin can access
    }
  ];

  // ✅ Safe filtering without problematic useBlogPermission calls
  const visibleNavItems = navItems.filter(item => {
    return userHasRole(user?.role, item.roles);
  });

  const breadcrumbs = pathname.split('/').filter(segment => segment).map((segment, index, array) => {
    const path = '/' + array.slice(0, index + 1).join('/');
    const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
    return { name, path };
  });

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* ✅ Sticky Sidebar with fixed height and internal scrolling */}
      <div className={`bg-gray-800 text-white ${sidebarCollapsed ? 'w-16' : 'w-64'} flex-shrink-0 flex flex-col transition-all duration-300 h-full`}>
        {/* ✅ Sidebar Header - Fixed */}
        <div className="p-4 border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaBlog className="text-2xl text-blue-400 mr-3" />
              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-xl font-bold">Blog Admin</h1>
                  <p className="text-xs text-gray-400">Content Management</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaChevronRight className={`transform transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {!sidebarCollapsed && user && (
            <div className="flex items-center mt-3 p-2 bg-gray-700 rounded-lg">
              <FaUser className="mr-2 text-gray-300" />
              <div>
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs text-gray-400 capitalize">{user.role} Access</p>
              </div>
            </div>
          )}
        </div>

        {/* ✅ Navigation - Scrollable middle section */}
        <nav className="flex-1 overflow-y-auto p-2 min-h-0">
          {visibleNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mb-1 transition-colors duration-200 group ${
                  isActive ? 'bg-gray-700 text-white' : ''
                }`}
                title={sidebarCollapsed ? item.name : ''}
              >
                <span className={`text-gray-400 group-hover:text-white transition-colors ${isActive ? 'text-white' : ''}`}>
                  {item.icon}
                </span>
                {!sidebarCollapsed && item.name}
              </a>
            );
          })}
          
          {/* ✅ Show message for users who can't see User Management */}
          {!sidebarCollapsed && user && user.role?.toLowerCase() === 'user' && (
            <div className="px-4 py-3 mt-4 text-gray-400 text-xs">
              <p className="mb-1">📝 Available Features:</p>
              <ul className="list-disc list-inside text-xs space-y-1">
                <li>Dashboard overview</li>
                <li>View your content</li>
              </ul>
              <p className="mt-2 text-gray-500">User Management is admin-only</p>
            </div>
          )}
        </nav>

        {/* ✅ Sidebar Footer - Fixed */}
        <div className="p-4 border-t border-gray-700 flex-shrink-0">
          {!sidebarCollapsed && (
            <div className="text-xs text-gray-400">
              <p>Connected to Backend</p>
              <p className="truncate">{API_BASE_URL}</p>
              <div className="flex items-center mt-2">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  connectionStatus?.connected ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className={connectionStatus?.connected ? 'text-green-400' : 'text-red-400'}>
                  {connectionStatus?.connected ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Main content area with proper scrolling */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* ✅ Header - Fixed */}
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                  <FaHome className="w-4 h-4" />
                  {breadcrumbs.map((crumb, index) => (
                    <div key={crumb.path} className="flex items-center">
                      {index > 0 && <FaChevronRight className="w-3 h-3 mx-2" />}
                      <a
                        href={crumb.path}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {crumb.name}
                      </a>
                    </div>
                  ))}
                </div>
                <h2 className="text-lg font-medium text-gray-900">
                  Blog Administration Panel
                </h2>
                <p className="text-sm text-gray-500">
                  {user?.role?.toLowerCase() === 'user' 
                    ? 'Access your content dashboard'
                    : 'Manage blog content and users'
                  }
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* User Info */}
                {user && (
                  <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
                    <FaUser className="text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{user.username}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                )}

                {/* Backend Connection Status */}
                <div className="hidden lg:flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${
                    connectionStatus?.connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm text-gray-500">
                    {connectionStatus?.connected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-2">
                  <a
                    href="/blogs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <FaBlog className="mr-2" />
                    View Blog
                  </a>

                  {/* ✅ User Management Quick Link ONLY for Admin and Superadmin */}
                  {user && userHasRole(user.role, ['admin', 'superadmin']) && (
                    <a
                      href="/blog-admin/users"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <FaUserCog className="mr-2" />
                      Users
                    </a>
                  )}

                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition-colors"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ✅ Main content - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-gray-50 min-h-0">
          <div className="p-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {/* Connection Warning */}
              {connectionStatus && !connectionStatus.connected && (
                <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                  <div className="flex">
                    <FaExclamationTriangle className="h-5 w-5 text-yellow-400 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800">Backend Connection Issue</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        {connectionStatus.message}. Some features may not work properly.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Main Content */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {children}
              </div>
            </div>
          </div>
        </main>

        {/* ✅ Footer - Fixed */}
        <footer className="bg-white border-t border-gray-200 px-4 py-3 flex-shrink-0">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-500">
            <div>
              <p>© 2025 Blog Admin Panel. Connected to Express Backend.</p>
            </div>
            <div className="flex items-center space-x-4">
              <span>Last Login: {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</span>
              <span className={`flex items-center ${connectionStatus?.connected ? 'text-green-500' : 'text-red-500'}`}>
                <span className="w-2 h-2 rounded-full bg-current mr-1"></span>
                {connectionStatus?.connected ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BlogAdminLayout;
