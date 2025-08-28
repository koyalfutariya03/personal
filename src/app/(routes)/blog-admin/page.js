"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaSpinner, FaExclamationTriangle, FaBlog, FaUser, FaEye, FaTimes, FaSync } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useBlogPermission } from "@/utils/blogAuth";
import { fetchWithAuth } from "@/utils/auth";
import CreateBlogPost from "@/components/BlogsPage/CreateBlogPost";
import ProtectedPage from "@/components/blog-admin/ProtectedPage";

// Backend API base URL - Update this to match your backend
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5002';

const BlogsAdminPanel = () => {
  const { user, isAuthenticated } = useAuth();
  const canCreate = useBlogPermission('posts:create');
  const canEdit = useBlogPermission('posts:edit');
  const canDelete = useBlogPermission('posts:delete');
  
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  
  // Enhanced stats state
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    featured: 0
  });

  const categories = [
    "Technology", "Business", "Marketing", "Development", 
    "Design", "Analytics", "AI/ML", "Cloud Computing",
    "Lifestyle", "Health", "Travel", "Food"
  ];

  const statuses = ["None", "Trending", "Featured", "Editor's Pick", "Recommended"];

  // Enhanced role-based filtering with stats calculation
  const filterBlogsByRole = (blogsData) => {
    if (!user) return blogsData;
    
    let filteredBlogs = blogsData;
    
    // If user has 'user' role, only show their own posts
    if (user.role?.toLowerCase() === 'user') {
      filteredBlogs = blogsData.filter(blog => 
        blog.author === user.username ||
        (blog.authorId && blog.authorId.toString() === user.id?.toString()) ||
        (blog.createdBy && blog.createdBy.toString() === user.id?.toString()) ||
        blog.authorId === user._id?.toString() ||
        blog.createdBy === user._id?.toString()
      );
      
      console.log('Filtered blogs for user:', {
        userId: user.id || user._id,
        username: user.username,
        totalBlogs: blogsData.length,
        filteredCount: filteredBlogs.length
      });
    }
    
    // Calculate stats
    const newStats = {
      total: filteredBlogs.length,
      published: filteredBlogs.filter(blog => blog.status && blog.status !== 'None').length,
      drafts: filteredBlogs.filter(blog => !blog.status || blog.status === 'None').length,
      featured: filteredBlogs.filter(blog => ['Featured', "Editor's Pick", 'Trending'].includes(blog.status)).length
    };
    
    setStats(newStats);
    return filteredBlogs;
  };

  useEffect(() => {
    console.log('BlogsAdminPanel: Auth state changed', { isAuthenticated: isAuthenticated(), user });
    
    if (isAuthenticated() && user) {
      console.log('BlogsAdminPanel: User authenticated, fetching blogs...');
      fetchBlogs();
    } else {
      console.log('BlogsAdminPanel: User not authenticated or user data not loaded yet');
    }
  }, [isAuthenticated, user]);

  const fetchBlogs = async (reset = true, showLoader = true) => {
    if (!isAuthenticated() || !user) {
      console.log('Skipping fetch - user not authenticated or user data not loaded');
      return;
    }

    console.log('BlogsAdminPanel: Starting to fetch blogs');
    console.log('Current user:', {
      id: user?.id,
      _id: user?._id,
      username: user?.username,
      role: user?.role
    });
    
    try {
      if (showLoader) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }
      setError(null);

      // Get token from localStorage - check both blogToken and adminToken for backward compatibility
      let token = localStorage.getItem('blogToken') || localStorage.getItem('adminToken');
      console.log('Token found in localStorage:', token ? 'Yes' : 'No');
      
      if (!token) {
        console.error('No authentication token found in localStorage');
        // Check localStorage contents for debugging
        console.log('LocalStorage contents:', {
          blogToken: localStorage.getItem('blogToken') ? 'present' : 'missing',
          adminToken: localStorage.getItem('adminToken') ? 'present' : 'missing',
          keys: Object.keys(localStorage)
        });
        throw new Error('Please login to the blog admin panel first.');
      }
      
      // Clean up token (remove 'Bearer ' prefix if it exists and any whitespace)
      token = token.trim().replace(/^Bearer\s*/i, '');
      
      if (!token) {
        console.error('Token is empty after cleanup');
        throw new Error('Invalid authentication token. Please login again.');
      }

      // Build query parameters
      const params = new URLSearchParams();
      params.append('limit', '50');
      params.append('skip', reset ? '0' : (currentPage * 50).toString());

      // Only append filters if they have a value
      if (filterCategory?.trim()) {
        params.append('category', filterCategory.trim());
      }
      if (filterStatus?.trim() && filterStatus !== 'None') {
        params.append('status', filterStatus.trim());
      }
      
      // Add search term if provided
      if (searchTerm?.trim()) {
        params.append('search', searchTerm.trim());
      }

      // Use the appropriate endpoint based on user role
      let endpoint = `${API_BASE}/api/blogs`;
      if (user?.role?.toLowerCase() === 'user') {
        endpoint = `${API_BASE}/api/blogs/my-posts`;
      }

      const requestUrl = `${endpoint}?${params}`;
      console.log('Making request to:', requestUrl);
      
      // Log token for debugging (first 10 chars only)
      console.log('Using token:', token ? `${token.substring(0, 10)}...` : 'No token');
      
      // Make the request with detailed logging
      let response;
      let lastError;
      
      // Try with Bearer prefix first
      try {
        console.log('Attempting request with Bearer token...');
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };
        console.log('Request URL:', requestUrl);
        console.log('Request headers:', JSON.stringify(headers, null, 2));
        
        response = await fetch(requestUrl, {
          method: 'GET',
          headers: headers,
          credentials: 'include',
          cache: 'no-store' // Prevent caching to ensure fresh data
        });
        
        if (!response.ok) {
          const errorText = await response.text().catch(() => 'Failed to read error response');
          console.log('Bearer token attempt failed with status:', response.status);
          console.log('Response status text:', response.statusText);
          console.log('Response headers:', JSON.stringify([...response.headers.entries()], null, 2));
          console.log('Response body:', errorText);
          
          // If unauthorized, clear tokens and redirect to login
          if (response.status === 401) {
            localStorage.removeItem('blogToken');
            localStorage.removeItem('adminToken');
            window.location.href = '/AdminLogin';
            return;
          }
          
          throw new Error(`Request failed: ${response.status} ${response.statusText}`);
        }
      } catch (firstError) {
        console.log('First attempt error:', firstError);
        try {
          console.log('Attempting request with raw token...');
          response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });
          
          if (!response.ok) {
            console.log('Raw token attempt also failed');
            throw new Error('Raw token attempt failed');
          }
        } catch (secondError) {
          console.error('All authentication attempts failed:', secondError);
          throw new Error('Failed to authenticate with the server. Please try logging in again.');
        }
      }

      if (!response.ok) {
        let errorData;
        let errorText;
        
        try {
          errorText = await response.text();
          console.error('API Error Response:', {
            status: response.status,
            statusText: response.statusText,
            url: requestUrl,
            responseText: errorText
          });
          
          try {
            errorData = JSON.parse(errorText);
          } catch (e) {
            errorData = { message: errorText };
          }
          
          console.error('API Error:', {
            status: response.status,
            statusText: response.statusText,
            url: requestUrl,
            error: errorData
          });

          if (response.status === 401) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('blogToken');
            throw new Error('Authentication failed. Please login again.');
          } else if (response.status === 400) {
            // Handle bad request errors specifically
            throw new Error(errorData.message || 'Invalid request. Please check your input and try again.');
          } else {
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error('Error processing error response:', error);
          throw error; // Re-throw the error to be caught by the outer catch block
        }
      }

      const data = await response.json();
      console.log('BlogsAdminPanel: Received data:', {
        blogCount: data.blogs?.length || data.length,
        hasMore: data.hasMore
      });

      // Handle different response formats
      const blogsData = data.blogs || data || [];
      const hasMoreData = data.hasMore || false;

      // For regular users, the backend already filters, so no need to filter again
      let filteredBlogsData = blogsData;
      if (user?.role?.toLowerCase() !== 'user') {
        filteredBlogsData = filterBlogsByRole(blogsData);
      } else {
        // Still calculate stats for user role
        const newStats = {
          total: blogsData.length,
          published: blogsData.filter(blog => blog.status && blog.status !== 'None').length,
          drafts: blogsData.filter(blog => !blog.status || blog.status === 'None').length,
          featured: blogsData.filter(blog => ['Featured', "Editor's Pick", 'Trending'].includes(blog.status)).length
        };
        setStats(newStats);
        filteredBlogsData = blogsData;
      }

      if (reset) {
        setBlogs(filteredBlogsData);
        setCurrentPage(1);
      } else {
        setBlogs(prev => [...prev, ...filteredBlogsData]);
        setCurrentPage(prev => prev + 1);
      }

      setHasMore(hasMoreData);
      setTotalBlogs(filteredBlogsData.length);
      
      console.log(`BlogsAdminPanel: Loaded ${filteredBlogsData.length} blogs for ${user?.role} role`);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError(error.message || "Failed to load blogs");
      setBlogs([]);
      setStats({ total: 0, published: 0, drafts: 0, featured: 0 });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleSaveBlog = async (blogData) => {
    try {
      setLoading(true);
      
      console.log('BlogsAdminPanel: Saving blog data:', blogData);

      const token = localStorage.getItem('adminToken') || localStorage.getItem('blogToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const formData = new FormData();
      
      // Map frontend field names to backend field names
      const fieldMappings = {
        urlSlug: 'slug',
        authorName: 'author',
        blogImage: 'image'
      };

      Object.keys(blogData).forEach((key) => {
        const backendFieldName = fieldMappings[key] || key;
        if (blogData[key] !== null && blogData[key] !== "" && blogData[key] !== undefined) {
          if (key === 'blogImage' && blogData[key] instanceof File) {
            formData.append('image', blogData[key]);
          } else if (key !== 'blogImage' && key !== 'imagePreview' && key !== '_id') {
            formData.append(backendFieldName, blogData[key]);
          }
        }
      });

      // Ensure author is set
      if (!formData.get('author')) {
        formData.append('author', user?.username || 'Admin');
      }

      // Enhanced ownership check for users
      if (editingBlog && user?.role?.toLowerCase() === 'user') {
        const canEditThisPost = editingBlog.author === user.username || 
                               editingBlog.authorId === user.id ||
                               editingBlog.createdBy === user.id;
        
        if (!canEditThisPost) {
          throw new Error('You can only edit your own posts');
        }
      }

      let url = `${API_BASE}/api/blogs`;
      let method = 'POST';

      if (editingBlog && blogData._id) {
        // Update existing blog
        url = `${API_BASE}/api/blogs/${blogData._id}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`
          // Don't set Content-Type for FormData - browser will set it with boundary
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save blog");
      }

      const responseData = await response.json();
      console.log('BlogsAdminPanel: Blog saved successfully:', responseData);

      // Refresh the blog list
      await fetchBlogs(true, false);
      
      // Close modal and reset state
      setShowCreateModal(false);
      setEditingBlog(null);
      
      // Show success notification
      const message = editingBlog ? 'Blog updated successfully!' : 'Blog created successfully!';
      showNotification(message, 'success');
      
    } catch (error) {
      console.error("Error saving blog:", error);
      setError(error.message || "Failed to save blog");
      showNotification(`Error: ${error.message || "Failed to save blog"}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    if (!canEdit) {
      showNotification("You don't have permission to edit blogs", 'error');
      return;
    }
    
    // Enhanced ownership check for users
    if (user?.role?.toLowerCase() === 'user') {
      const canEditThisPost = blog.author === user.username || 
                             blog.authorId === user.id ||
                             blog.createdBy === user.id;
      
      if (!canEditThisPost) {
        showNotification("You can only edit your own posts", 'error');
        return;
      }
    }
    
    console.log('Opening edit modal for blog:', blog);
    setEditingBlog(blog);
    setShowCreateModal(true);
  };

  const handleDelete = async (blogId, blog) => {
    if (!canDelete) {
      showNotification("You don't have permission to delete blogs", 'error');
      return;
    }

    // Enhanced ownership check for users
    if (user?.role?.toLowerCase() === 'user') {
      const canDeleteThisPost = blog.author === user.username || 
                               blog.authorId === user.id ||
                               blog.createdBy === user.id;
      
      if (!canDeleteThisPost) {
        showNotification("You can only delete your own posts", 'error');
        return;
      }
    }

    if (!confirm("Are you sure you want to delete this blog? This action cannot be undone.")) {
      return;
    }

    try {
      setLoading(true);
      
      const token = localStorage.getItem('adminToken') || localStorage.getItem('blogToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }
      
      const response = await fetch(`${API_BASE}/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to delete blog");
      }

      console.log('BlogsAdminPanel: Blog deleted successfully');
      showNotification('Blog deleted successfully!', 'success');
      
      await fetchBlogs(true, false);
      
    } catch (error) {
      console.error("Error deleting blog:", error);
      setError(error.message || "Failed to delete blog");
      showNotification(`Error: ${error.message || "Failed to delete blog"}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Utility function to show notifications
  const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, type === 'success' ? 3000 : 5000);
  };

  const openCreateModal = () => {
    if (!canCreate) {
      showNotification("You don't have permission to create blogs", 'error');
      return;
    }
    
    setEditingBlog(null);
    setShowCreateModal(true);
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setEditingBlog(null);
    setError(null);
  };

  const handleFilterChange = async () => {
    console.log('Filters changed - Category:', filterCategory, 'Status:', filterStatus, 'Search:', searchTerm);
    setCurrentPage(0); // Reset to first page when filters change
    await fetchBlogs(true, false);
  };

  const handleRefresh = async () => {
    await fetchBlogs(true, false);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      const debounceTimer = setTimeout(() => {
        handleFilterChange();
      }, 500); // Increased debounce time to 500ms

      return () => clearTimeout(debounceTimer);
    }
  }, [filterCategory, filterStatus, searchTerm]); // Removed handleFilterChange from deps to prevent infinite loop

  const filteredBlogs = blogs.filter((blog) => {
    if (!blog) return false;
    
    const matchesSearch = searchTerm === '' || 
      (blog.title && blog.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (blog.content && blog.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (blog.author && blog.author.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  // Show error state
  if (error && !loading && blogs.length === 0) {
    return (
      <ProtectedPage requiredRoles={['admin', 'superadmin', 'user']} pageTitle="Blog Management">
        <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 w-full max-w-2xl rounded-md shadow">
            <div className="flex">
              <FaExclamationTriangle className="h-8 w-8 text-red-500 mr-4" />
              <div>
                <h3 className="text-xl font-bold text-red-800 mb-2">Error Loading Blogs</h3>
                <p className="text-red-700 mb-4">{error}</p>
                <button
                  onClick={() => fetchBlogs()}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  disabled={loading}
                >
                  {loading ? <FaSpinner className="animate-spin inline mr-2" /> : ''}
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </ProtectedPage>
    );
  }

  return (
    <ProtectedPage requiredRoles={['admin', 'superadmin', 'user']} pageTitle="Blog Management">
      <div className="space-y-6">
        {/* Create/Edit Blog Post Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  {editingBlog ? (
                    <>
                      <FaEdit className="mr-3 text-blue-600" />
                      Edit Blog Post
                    </>
                  ) : (
                    <>
                      <FaPlus className="mr-3 text-green-600" />
                      Create New Blog Post
                    </>
                  )}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-200 rounded-full"
                  disabled={loading}
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                <CreateBlogPost
                  onSave={handleSaveBlog}
                  initialData={editingBlog || {}}
                  isModal={true}
                  onCancel={closeModal}
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Enhanced Header with Stats */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center">
                  <FaBlog className="mr-3" />
                  {user?.role?.toLowerCase() === 'user' ? 'My Blog Posts' : 'Manage Blog Posts'}
                </h2>
                <p className="text-blue-100">
                  {user?.role?.toLowerCase() === 'user' 
                    ? 'Create and manage your blog content'
                    : 'Create, edit, and manage blog content'
                  }
                </p>
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-sm">
                  {user?.role?.toLowerCase() === 'user' ? 'Your Posts' : 'Total Posts'}
                </p>
                <p className="text-3xl font-bold">{stats.total}</p>
                <div className="text-xs text-blue-200 flex items-center gap-2 justify-end">
                  <FaUser className="w-3 h-3" />
                  <span>{user?.username}</span>
                  <span className="bg-white bg-opacity-20 px-2 py-1 rounded capitalize">
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-3 text-center hover:bg-opacity-20 transition-all duration-200">
                <div className="text-2xl font-bold">{stats.total}</div>
                <div className="text-xs text-blue-100">Total Posts</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-3 text-center hover:bg-opacity-20 transition-all duration-200">
                <div className="text-2xl font-bold text-green-200">{stats.published}</div>
                <div className="text-xs text-blue-100">Published</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-3 text-center hover:bg-opacity-20 transition-all duration-200">
                <div className="text-2xl font-bold text-yellow-200">{stats.drafts}</div>
                <div className="text-xs text-blue-100">Drafts</div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-3 text-center hover:bg-opacity-20 transition-all duration-200">
                <div className="text-2xl font-bold text-purple-200">{stats.featured}</div>
                <div className="text-xs text-blue-100">Featured</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="p-6 border-b bg-gray-50">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-4 flex-wrap">
                {canCreate && (
                  <button
                    onClick={openCreateModal}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                  >
                    {loading ? <FaSpinner className="animate-spin" /> : <FaPlus />}
                    Create New Blog
                  </button>
                )}
                
                <div className="text-sm text-gray-600 flex items-center gap-2 bg-white px-3 py-2 rounded-lg border">
                  <FaUser className="text-blue-500" />
                  <span>Role: <span className="font-medium capitalize">{user?.role}</span></span>
                  {user?.role?.toLowerCase() === 'user' && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs ml-2">
                      Your Posts Only
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 items-center">
                {/* Search */}
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 shadow-sm"
                    disabled={loading}
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                  disabled={loading}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 shadow-sm"
                  disabled={loading}
                >
                  <option value="">All Statuses</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>

                {/* Refresh Button */}
                <button
                  onClick={handleRefresh}
                  disabled={loading || refreshing}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 shadow-sm flex items-center gap-2"
                >
                  {(loading || refreshing) ? <FaSpinner className="animate-spin" /> : <FaSync />}
                  Refresh
                </button>
              </div>
            </div>
            
            {/* Error Alert */}
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
                <FaExclamationTriangle className="text-red-500 flex-shrink-0" />
                <span>{error}</span>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>

          {/* Blog List */}
          <div className="p-6">
            {loading && blogs.length === 0 ? (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4 mx-auto" />
                  <p className="text-gray-600">Loading your blogs...</p>
                </div>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FaBlog className="w-16 h-16 mx-auto mb-4" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {blogs.length === 0 ? "No blog posts yet" : "No posts match your search"}
                </h3>
                <p className="text-gray-500 mb-4">
                  {blogs.length === 0 
                    ? user?.role?.toLowerCase() === 'user'
                      ? "Get started by creating your first blog post"
                      : "Get started by creating blog posts"
                    : "Try adjusting your search terms or filters"
                  }
                </p>
                {canCreate && blogs.length === 0 && (
                  <button
                    onClick={openCreateModal}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2 shadow-sm"
                  >
                    <FaPlus />
                    Create Your First Blog
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredBlogs.map((blog) => (
                  <div 
                    key={blog._id} 
                    className={`border rounded-lg p-6 hover:shadow-md transition-all duration-200 bg-white ${
                      user?.role?.toLowerCase() === 'user' && blog.author === user.username 
                        ? 'border-l-4 border-l-blue-500 bg-blue-50' 
                        : 'hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                          {blog.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                            {blog.category}
                          </span>
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                            {blog.subcategory}
                          </span>
                          {blog.status !== 'None' && (
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-medium">
                              {blog.status}
                            </span>
                          )}
                          {/* Enhanced ownership indicator */}
                          {user?.role?.toLowerCase() === 'user' && blog.author === user.username && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                              <FaUser className="w-3 h-3" />
                              Your Post
                            </span>
                          )}
                        </div>
                        <div className="text-gray-600 text-sm space-y-1">
                          <p><strong>Author:</strong> {blog.author} {blog.author === user?.username && <span className="text-blue-600 font-medium">(You)</span>}</p>
                          <p><strong>Created:</strong> {new Date(blog.createdAt).toLocaleDateString()} at {new Date(blog.createdAt).toLocaleTimeString()}</p>
                          <p><strong>Updated:</strong> {new Date(blog.updatedAt).toLocaleDateString()}</p>
                          <p><strong>Slug:</strong> <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">/{blog.slug}</code></p>
                        </div>
                        {blog.content && (
                          <p className="text-gray-700 mt-3 text-sm line-clamp-2">
                            {blog.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                          </p>
                        )}
                      </div>
                      
                      {blog.image && (
                        <div className="ml-4 flex-shrink-0">
                          <img 
                            src={blog.image} 
                            alt={blog.title}
                            className="w-24 h-24 object-cover rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      {canEdit && (
                        <button
                          onClick={() => handleEdit(blog)}
                          disabled={loading}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                          <FaEdit className="w-3 h-3" /> Edit
                        </button>
                      )}
                      {canDelete && (
                        <button
                          onClick={() => handleDelete(blog._id, blog)}
                          disabled={loading}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                          <FaTrash className="w-3 h-3" /> Delete
                        </button>
                      )}
                      <a
                        href={`/blogs/${blog.category?.toLowerCase()}/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm transition-colors shadow-sm"
                      >
                        <FaEye className="w-3 h-3" /> View Live
                      </a>
                    </div>
                  </div>
                ))}
                
                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center pt-6">
                    <button
                      onClick={() => fetchBlogs(false)}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 shadow-sm"
                    >
                      {loading ? <FaSpinner className="animate-spin inline mr-2" /> : ''}
                      Load More Posts
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
};

export default BlogsAdminPanel;
