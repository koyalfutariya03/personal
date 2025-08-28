'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaTrash, FaEdit, FaUserShield, FaUserPlus, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchWithAuth } from '@/utils/auth';
import { useAuth } from '@/context/AuthContext';
import { useBlogPermission } from '@/utils/blogAuth';

const UserManagement = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddUser, setShowAddUser] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  // Permission checks
  const canCreateUsers = useBlogPermission('users:create');
  const canDeleteUsers = useBlogPermission('users:delete');
  const canEditUsers = useBlogPermission('users:edit');

  // API Configuration - Connect to your Express backend
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5002';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      console.log('Fetching users from Express backend...');
      
      // ✅ Updated to use your Express backend endpoint
      const response = await fetchWithAuth('/api/auth/users', {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch users`);
      }
      
      const result = await response.json();
      console.log('Users API response:', result);
      
      // ✅ Handle Express backend response format
      const usersList = Array.isArray(result) ? result : (result.users || result.data || []);
      console.log('Processed users list:', usersList);
      setUsers(usersList);
      
    } catch (error) {
      console.error('Error fetching users:', {
        message: error.message,
        status: error.status
      });
      
      toast.error(`Failed to load users: ${error.message}`, {
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    
    if (!canCreateUsers) {
      toast.error('You do not have permission to create users', { autoClose: 3000 });
      return;
    }
    
    // Validate passwords match
    if (newUser.password !== newUser.confirmPassword) {
      toast.error('Passwords do not match', { autoClose: 3000 });
      return;
    }

    // Validate password strength
    if (newUser.password.length < 6) {
      toast.error('Password must be at least 6 characters long', { autoClose: 3000 });
      return;
    }

    setActionLoading(true);
    try {
      const userData = {
        username: newUser.username.trim(),
        password: newUser.password,
        email: newUser.email?.trim() || undefined,
        role: newUser.role
      };
      
      console.log('Creating user with Express backend:', userData);
      
      // ✅ Updated to use your Express backend registration endpoint
      const response = await fetchWithAuth('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to create user`);
      }

      const result = await response.json();
      console.log('User creation response:', result);
      
      // Success - reset form and refresh user list
      toast.success(result.message || 'User created successfully', { autoClose: 3000 });
      setNewUser({ 
        username: '', 
        email: '', 
        password: '', 
        confirmPassword: '',
        role: 'user'
      });
      setShowAddUser(false);
      await fetchUsers();
      
    } catch (error) {
      console.error('Error creating user:', error);
      
      let errorMessage = 'Failed to create user. Please try again.';
      
      // ✅ Enhanced error handling for Express backend responses
      if (error.message.includes('already exists') || error.message.includes('already taken')) {
        if (error.message.toLowerCase().includes('email')) {
          errorMessage = 'This email is already in use. Please use a different email.';
        } else if (error.message.toLowerCase().includes('username')) {
          errorMessage = 'This username is already taken. Please choose a different one.';
        } else {
          errorMessage = error.message;
        }
      } else if (error.message.includes('validation')) {
        errorMessage = error.message;
      } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
        errorMessage = 'Network error. Please check your internet connection and ensure the backend server is running.';
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      toast.error(errorMessage, {
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async (userId, username) => {
    if (!canDeleteUsers) {
      toast.error('You do not have permission to delete users', { autoClose: 3000 });
      return;
    }

    if (!window.confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
      return;
    }

    setActionLoading(true);
    try {
      console.log('Deleting user with Express backend:', userId);
      
      // ✅ Updated to use your Express backend delete endpoint
      const response = await fetchWithAuth(`/api/auth/users/${userId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}: Failed to delete user`);
      }

      const result = await response.json();
      toast.success(result.message || 'User deleted successfully', { autoClose: 3000 });
      await fetchUsers();
      
    } catch (error) {
      console.error('Error deleting user:', error);
      
      let errorMessage = 'Failed to delete user';
      
      if (error.message.includes('cannot delete') || error.message.includes('main admin')) {
        errorMessage = 'Cannot delete the main admin user.';
      } else if (error.message.includes('not found')) {
        errorMessage = 'User not found.';
      } else if (error.message.includes('permission')) {
        errorMessage = 'You do not have permission to delete this user.';
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      toast.error(errorMessage, {
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FaSpinner className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading users from Express backend...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 lg:px-4 py-4 sm:py-6 lg:py-8">
      {/* ✅ Responsive Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 lg:mb-8 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage blog admin users and their roles via Express backend
          </p>
        </div>
        {/* ✅ Responsive Add User Button */}
        {canCreateUsers && (
          <button
            onClick={() => setShowAddUser(true)}
            disabled={actionLoading}
            className="flex items-center justify-center w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {actionLoading ? <FaSpinner className="animate-spin mr-2" /> : <FaUserPlus className="mr-2" />}
            <span className="sm:inline">Add New User</span>
          </button>
        )}
      </div>

      {/* ✅ Responsive Role-based Access Info */}
      <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
        <div className="flex items-start sm:items-center">
          <FaUserShield className="text-blue-600 mr-2 mt-1 sm:mt-0 flex-shrink-0" />
          <div>
            <p className="text-xs sm:text-sm font-medium text-blue-800">
              Connected to Express Backend: <span className="break-all">{API_BASE_URL}</span>
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Your Access Level: {user?.role?.toUpperCase()} - {user?.role?.toLowerCase() === 'superadmin' 
                ? 'Full access to all user management features'
                : 'Admin access to user management'
              }
            </p>
          </div>
        </div>
      </div>

      {/* ✅ Responsive Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold">Add New User</h2>
              <button
                onClick={() => setShowAddUser(false)}
                disabled={actionLoading}
                className="text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed text-xl"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  disabled={actionLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-sm sm:text-base"
                  required
                  placeholder="johndoe"
                  minLength={3}
                  maxLength={30}
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email (optional)
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  disabled={actionLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-sm sm:text-base"
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  disabled={actionLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-sm sm:text-base"
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  {user?.role?.toLowerCase() === 'superadmin' && (
                    <option value="superadmin">SuperAdmin</option>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  disabled={actionLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-sm sm:text-base"
                  required
                  minLength={6}
                  placeholder="Minimum 6 characters"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={newUser.confirmPassword}
                  onChange={handleInputChange}
                  disabled={actionLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-sm sm:text-base"
                  required
                  minLength={6}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddUser(false)}
                  disabled={actionLoading}
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center text-sm sm:text-base"
                >
                  {actionLoading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Creating...
                    </>
                  ) : (
                    'Create User'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Responsive Users List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">Blog Admin Users</h2>
          <span className="text-xs sm:text-sm text-gray-500">
            {Array.isArray(users) ? `${users.length} user(s) found` : ''}
          </span>
        </div>
        
        {!users || !Array.isArray(users) || users.length === 0 ? (
          <div className="p-6 sm:p-8 text-center text-gray-500">
            <FaUserShield className="mx-auto h-10 sm:h-12 w-10 sm:w-12 text-gray-300 mb-2" />
            <p className="mb-4 text-sm sm:text-base">No users found.</p>
            {canCreateUsers && (
              <button
                onClick={() => setShowAddUser(true)}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center justify-center text-sm sm:text-base"
              >
                <FaUserPlus className="mr-2" />
                Add First User
              </button>
            )}
          </div>
        ) : (
          <>
            {/* ✅ Desktop Table View - Hidden on Mobile */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((userItem) => (
                    <tr key={userItem._id || userItem.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                            <FaUserShield className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {userItem.username}
                            </div>
                            <div className="text-sm text-gray-500">
                              {userItem.email || 'No email'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          userItem.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
                          userItem.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {userItem.role || 'user'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          userItem.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {userItem.isActive !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {userItem.createdAt ? new Date(userItem.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center space-x-2">
                          {canDeleteUsers && (
                            <button
                              onClick={() => handleDeleteUser(userItem._id || userItem.id, userItem.username)}
                              disabled={
                                actionLoading ||
                                userItem.username === 'admin' ||
                                userItem._id === user?.id ||
                                userItem.id === user?.id ||
                                (userItem.role === 'superadmin' && user?.role?.toLowerCase() !== 'superadmin')
                              }
                              className="text-red-600 hover:text-red-900 disabled:text-gray-400 disabled:cursor-not-allowed"
                              title={
                                userItem.username === 'admin' ? 'Cannot delete main admin' :
                                (userItem._id === user?.id || userItem.id === user?.id) ? 'Cannot delete yourself' :
                                (userItem.role === 'superadmin' && user?.role?.toLowerCase() !== 'superadmin') ? 'Cannot delete superadmin' :
                                'Delete user'
                              }
                            >
                              {actionLoading ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                            </button>
                          )}
                          {canEditUsers && (
                            <button
                              className="text-blue-600 hover:text-blue-900 disabled:text-gray-400"
                              title="Edit user (Coming soon)"
                              disabled
                            >
                              <FaEdit />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ Mobile Card View - Visible on Mobile and Tablet */}
            <div className="md:hidden divide-y divide-gray-200">
              {users.map((userItem) => (
                <div key={userItem._id || userItem.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center flex-1">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                        <FaUserShield className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {userItem.username}
                        </div>
                        <div className="text-xs text-gray-500">
                          {userItem.email || 'No email'}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            userItem.role === 'superadmin' ? 'bg-purple-100 text-purple-800' :
                            userItem.role === 'admin' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {userItem.role || 'user'}
                          </span>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            userItem.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {userItem.isActive !== false ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Created: {userItem.createdAt ? new Date(userItem.createdAt).toLocaleDateString() : 'N/A'}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-2">
                      {canDeleteUsers && (
                        <button
                          onClick={() => handleDeleteUser(userItem._id || userItem.id, userItem.username)}
                          disabled={
                            actionLoading ||
                            userItem.username === 'admin' ||
                            userItem._id === user?.id ||
                            userItem.id === user?.id ||
                            (userItem.role === 'superadmin' && user?.role?.toLowerCase() !== 'superadmin')
                          }
                          className="text-red-600 hover:text-red-900 disabled:text-gray-400 disabled:cursor-not-allowed p-1"
                          title={
                            userItem.username === 'admin' ? 'Cannot delete main admin' :
                            (userItem._id === user?.id || userItem.id === user?.id) ? 'Cannot delete yourself' :
                            (userItem.role === 'superadmin' && user?.role?.toLowerCase() !== 'superadmin') ? 'Cannot delete superadmin' :
                            'Delete user'
                          }
                        >
                          {actionLoading ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                        </button>
                      )}
                      {canEditUsers && (
                        <button
                          className="text-blue-600 hover:text-blue-900 disabled:text-gray-400 p-1"
                          title="Edit user (Coming soon)"
                          disabled
                        >
                          <FaEdit />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
