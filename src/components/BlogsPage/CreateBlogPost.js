'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { Upload, User, Save, Eye, Image, X, Plus, Hash, Calendar, Camera, Edit } from 'lucide-react';

// Backend base URL - should match your Express server
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL|| 'http://localhost:5002';

// Match backend slugification
const slugify = (text = '') =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

const subcategoryOptions = ['Article', 'Tutorial', 'Interview Questions'];
const statusOptions = ['None', 'Trending', 'Featured', "Editor's Pick", 'Recommended'];

export default function CreateBlogPost({ 
  onSave, 
  initialData = {}, 
  isModal = false,
  onCancel 
}) {
  const [formData, setFormData] = useState({
    title: '',
    urlSlug: '',
    content: '',
    category: '',
    subcategory: 'Article',
    authorName: '', 
    status: 'None',
    blogImage: null
  });

  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [blogId, setBlogId] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const authContext = useContext(AuthContext);
  const { user } = authContext || {};

  // Initialize with initialData (for modal mode) or URL params (for standalone mode)
  useEffect(() => {
    if (isModal && initialData && Object.keys(initialData).length > 0) {
      // Modal mode with initial data (editing)
      setIsEditMode(true);
      setBlogId(initialData._id);
      populateFormData(initialData);
    } else if (!isModal) {
      // Standalone mode - check URL params
      const id = searchParams?.get('id');
      const mode = searchParams?.get('mode');
      
      if (id && mode === 'edit') {
        setIsEditMode(true);
        setBlogId(id);
        fetchBlogData(id);
      }
    }
  }, [initialData, searchParams, isModal]);

  // Populate form with existing data
  const populateFormData = (blog) => {
    setFormData({
      title: blog.title || '',
      urlSlug: blog.slug || '',
      content: blog.content || '',
      category: blog.category || '',
      subcategory: blog.subcategory || 'Article',
      authorName: blog.author || '',
      status: blog.status || 'None',
      blogImage: null
    });

    if (blog.image) {
      setExistingImageUrl(blog.image);
      setPreviewImage(blog.image);
    }
  };

  // Fetch blog data for URL-based editing
  const fetchBlogData = async (id) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('adminToken') || localStorage.getItem('blogToken');
      
      if (!token) {
        router.push('/AdminLogin');
        return;
      }

      const response = await fetch(`${API_BASE}/api/blogs/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('blogToken');
          router.push('/AdminLogin');
          return;
        }
        throw new Error('Failed to fetch blog data');
      }

      const blog = await response.json();
      populateFormData(blog);

    } catch (err) {
      console.error('Error fetching blog data:', err);
      setError('Failed to load blog data for editing');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-save simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (formData.title || formData.content) {
        setIsAutoSaving(true);
        setTimeout(() => setIsAutoSaving(false), 1000);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [formData]);

  // Auto-generate URL slug from title (only for new blogs)
  useEffect(() => {
    if (!isEditMode && formData.title) {
      setFormData(prev => ({ ...prev, urlSlug: slugify(formData.title) }));
    } else if (!isEditMode) {
      setFormData(prev => ({ ...prev, urlSlug: '' }));
    }
  }, [formData.title, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
      } else {
        setError('Only image files are allowed.');
      }
    }
  };

  const handleImageUpload = (file) => {
    // Validate file size (e.g., 5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
      setFormData(prev => ({ ...prev, blogImage: file }));
      setExistingImageUrl(null);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setExistingImageUrl(null);
    setFormData(prev => ({ ...prev, blogImage: null }));
  };

  const showNotification = (message, type = 'success') => {
    if (isModal) {
      // For modal mode, don't create notifications as parent handles them
      return;
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isModal && onSave) {
        // Modal mode - use parent's onSave function
        await onSave({
          ...formData,
          _id: blogId // Include ID for editing
        });
      } else {
        // Standalone mode - handle save directly
        const token = localStorage.getItem('adminToken') || localStorage.getItem('blogToken');
        if (!token) {
          router.push('/AdminLogin');
          return;
        }

        if (!user) {
          setError('User not authenticated. Please log in again.');
          return;
        }

        // Build FormData for backend
        const form = new FormData();
        
        // Map frontend fields to backend fields
        form.append('title', formData.title);
        form.append('content', formData.content);
        form.append('category', formData.category);
        form.append('subcategory', formData.subcategory);
        form.append('author', formData.authorName || user.username || 'Admin');
        form.append('status', formData.status);
        
        if (formData.urlSlug) form.append('slug', formData.urlSlug);
        if (formData.blogImage) form.append('image', formData.blogImage);

        // API endpoint and method
        const url = isEditMode 
          ? `${API_BASE}/api/blogs/${blogId}`
          : `${API_BASE}/api/blogs`;
        
        const method = isEditMode ? 'PUT' : 'POST';

        const response = await fetch(url, {
          method,
          headers: {
            'Authorization': `Bearer ${token}`
            // Don't set Content-Type for FormData - browser will set it with boundary
          },
          body: form
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 409) {
            throw new Error(errorData.message || 'Slug already exists. Please adjust the title or slug.');
          }
          if (response.status === 401) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('blogToken');
            router.push('/AdminLogin');
            return;
          }
          throw new Error(errorData.message || `Failed to ${isEditMode ? 'update' : 'create'} blog post`);
        }

        const responseData = await response.json();
        console.log('Blog saved successfully:', responseData);

        const successMessage = `Blog post ${isEditMode ? 'updated' : 'created'} successfully!`;
        showNotification(successMessage, 'success');

        if (!isEditMode) {
          // Reset form for new posts
          setFormData({
            title: '',
            urlSlug: '',
            content: '',
            category: '',
            subcategory: 'Article',
            authorName: '',
            status: 'None',
            blogImage: null
          });
          setPreviewImage(null);
          setExistingImageUrl(null);
        } else {
          // For edits, optionally navigate back
          // router.push('/admin/blogs');
        }
      }
    } catch (err) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} blog post:`, err);
      const errorMessage = err.message || `Failed to ${isEditMode ? 'update' : 'create'} blog post`;
      setError(errorMessage);
      showNotification(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (!isModal) {
      router.back();
    }
  };

  const categories = [
    'Technology', 'Business', 'Marketing', 'Development', 
    'Design', 'Analytics', 'AI/ML', 'Cloud Computing',
    'Lifestyle', 'Health', 'Travel', 'Food'
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog data...</p>
        </div>
      </div>
    );
  }

  const containerClass = isModal 
    ? "w-full" 
    : "min-h-screen bg-white relative overflow-hidden";
  
  const contentClass = isModal
    ? "w-full"
    : "flex flex-col lg:flex-row justify-center items-start gap-4 lg:gap-8 py-4 md:py-8 w-full px-1 sm:px-2 md:px-4 lg:px-8 overflow-x-auto";

  return (
    <div className={containerClass}>
      <div className={contentClass}>
        <div className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 pb-4 border border-white/20 w-full ${isModal ? 'max-w-full' : 'max-w-full lg:max-w-lg'} flex flex-col min-h-[500px] ${!isModal ? 'lg:h-[800px]' : ''} mb-6 lg:mb-0 overflow-y-auto`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              {isEditMode ? (
                <Edit className="w-7 h-7 mr-3 text-blue-600" />
              ) : (
                <Plus className="w-7 h-7 mr-3 text-purple-600" />
              )}
              {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            <div className="flex items-center space-x-2">
              {isAutoSaving && (
                <div className="flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Auto-saving...
                </div>
              )}
              <Save className="w-5 h-5 text-gray-500" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 pb-24">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
                <button
                  type="button"
                  onClick={() => setError('')}
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Blog Title */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Hash className="w-4 h-4 mr-2 text-purple-600" />
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter blog title"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 group-hover:border-purple-300"
                required
                disabled={isSubmitting}
                maxLength={200}
              />
            </div>

            {/* URL Slug */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">URL Slug</label>
              <input
                type="text"
                name="urlSlug"
                value={formData.urlSlug}
                onChange={handleInputChange}
                placeholder={isEditMode ? "Edit slug if needed" : "Auto-generated from title"}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${!isEditMode ? 'bg-gray-50' : ''}`}
                readOnly={!isEditMode}
                maxLength={100}
              />
              <p className="text-xs text-gray-500 mt-1">
                {isEditMode ? 'You can edit the slug for existing posts' : 'Automatically generated from the title'}
              </p>
            </div>

            {/* Content */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
              <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all duration-200">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex space-x-2">
                  <button type="button" className="p-1 hover:bg-gray-200 rounded transition-colors">
                    <span className="font-bold text-gray-600">B</span>
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded transition-colors">
                    <span className="italic text-gray-600">I</span>
                  </button>
                  <button type="button" className="p-1 hover:bg-gray-200 rounded transition-colors">
                    <span className="underline text-gray-600">U</span>
                  </button>
                </div>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Type your blog content here..."
                  className="w-full px-4 py-3 border-0 focus:ring-0 resize-none"
                  rows="6"
                  required
                  disabled={isSubmitting}
                  maxLength={10000}
                />
              </div>
            </div>

            {/* Category and Subcategory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  required
                  disabled={isSubmitting}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subcategory</label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  required
                  disabled={isSubmitting}
                >
                  {subcategoryOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Must match backend enum values</p>
              </div>
            </div>

            {/* Author and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-purple-600" />
                  Author Name
                </label>
                <input
                  type="text"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleInputChange}
                  placeholder={user?.username || "Enter author name"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  required
                  disabled={isSubmitting}
                  maxLength={50}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  disabled={isSubmitting}
                >
                  {statusOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Display status, not draft/published</p>
              </div>
            </div>

            {/* Blog Image Upload */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Camera className="w-4 h-4 mr-2 text-purple-600" />
                Blog Image
              </label>
              <div
                className={`relative w-full min-h-[200px] border-2 border-dashed rounded-xl p-4 flex items-center justify-center transition-all duration-200 bg-white shadow-sm ${
                  dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-400'
                } ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {previewImage ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      className="w-full max-h-48 object-contain rounded-lg mb-2" 
                      style={{ minHeight: '120px', background: '#f3f4f6' }} 
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      disabled={isSubmitting}
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {isEditMode && existingImageUrl && !formData.blogImage && (
                      <p className="text-xs text-blue-600 mt-2">Current image (upload new to replace)</p>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full">
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2 text-center">
                      {isEditMode ? 'Upload new image or keep existing' : 'Drag and drop your image here, or'}
                    </p>
                    <label className="cursor-pointer">
                      <span className="text-purple-600 hover:text-purple-700 font-medium">browse</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                        disabled={isSubmitting}
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-2 text-center">PNG, JPG, GIF up to 5MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 ${isEditMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'} text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEditMode ? 'Updating...' : 'Publishing...'}
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {isEditMode ? 'Update Post' : 'Publish Now'}
                  </>
                )}
              </button>
              
              {(isModal || onCancel) && (
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Preview Panel - Only show in standalone mode */}
        {!isModal && (
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 border border-white/20 w-full max-w-full lg:max-w-lg flex flex-col min-h-[500px] lg:h-[800px] overflow-y-auto rounded-scrollbar mt-0">
            <div className="flex items-center mb-6">
              <Eye className="w-5 h-5 mr-2 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800">Preview</h3>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 min-h-48 flex flex-col">
              <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                {previewImage ? (
                  <img src={previewImage} alt="Blog preview" className="w-full h-40 object-cover rounded-lg" />
                ) : (
                  <Image className="w-20 h-20 text-gray-300" />
                )}
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <User className="w-5 h-5 mr-2" />
                <span>{formData.authorName || user?.username || 'Author Name'}</span>
                <span className="mx-2">•</span>
                <Calendar className="w-5 h-5 mr-1" />
                <span>{new Date().toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>5 min read</span>
              </div>

              <h4 className="font-bold text-gray-800 text-xl mb-2">
                {formData.title || 'Your Blog Title Will Appear Here'}
              </h4>

              <div className="flex gap-2 mb-3 flex-wrap">
                {formData.category && (
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">{formData.category}</span>
                )}
                {formData.subcategory && (
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">{formData.subcategory}</span>
                )}
                {formData.status && formData.status !== 'None' && (
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{formData.status}</span>
                )}
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                {formData.content || 'Your blog content preview will be displayed here as you type...'}
              </p>

              <hr className="my-2" />

              <div className="flex items-center justify-between text-gray-400 text-sm mt-auto">
                <div className="flex items-center gap-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                    </svg>
                    0 likes
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8a2 2 0 012-2h2m4-4h-4a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2v-4a2 2 0 00-2-2z" />
                    </svg>
                    0 comments
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
