'use client';

import React, { useState, useEffect } from 'react';

import { Upload, Bell, User, LogOut, Save, Eye, Image, X, Plus, Hash, Calendar, FileText, Camera } from 'lucide-react';

export default function BlogAdminPanel() {

  const [formData, setFormData] = useState({

    title: '',

    urlSlug: '',

    content: '',

    category: '',

    authorName: '',

    status: 'Draft',

    blogImage: null

  });

  const [isAutoSaving, setIsAutoSaving] = useState(false);

  const [dragActive, setDragActive] = useState(false);

  const [previewImage, setPreviewImage] = useState(null);

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



  // Auto-generate URL slug from title

  useEffect(() => {

    if (formData.title) {

      const slug = formData.title

        .toLowerCase()

        .replace(/[^a-z0-9\s-]/g, '')

        .replace(/\s+/g, '-')

        .replace(/-+/g, '-')

        .trim();

      setFormData(prev => ({ ...prev, urlSlug: slug }));

    }

  }, [formData.title]);



  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

  };



  const handleDrag = (e) => {

    e.preventDefault();

    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {

      setDragActive(true);

    } else if (e.type === 'dragleave') {

      setDragActive(false);

    }

  };



  const handleDrop = (e) => {

    e.preventDefault();

    e.stopPropagation();

    setDragActive(false);

   

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {

      const file = e.dataTransfer.files[0];

      if (file.type.startsWith('image/')) {

        handleImageUpload(file);

      }

    }

  };



  const handleImageUpload = (file) => {

    const reader = new FileReader();

    reader.onload = (e) => {

      setPreviewImage(e.target.result);

      setFormData(prev => ({ ...prev, blogImage: file }));

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

    setFormData(prev => ({ ...prev, blogImage: null }));

  };



  const handleSubmit = (e) => {

    e.preventDefault();

    console.log('Blog post data:', formData);

    alert('Blog post created successfully!');

  };

  const categories = ['Technology', 'Lifestyle', 'Business', 'Health', 'Travel', 'Food'];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-center items-start gap-4 lg:gap-8 py-4 md:py-8 w-full px-1 sm:px-2 md:px-4 lg:px-8 overflow-x-auto">

        {/* Create Post Form */}

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 pb-4 border border-white/20 w-full max-w-full lg:max-w-lg flex flex-col min-h-[500px] lg:h-[800px] mb-6 lg:mb-0 overflow-y-auto rounded-scrollbar">

              <div className="flex items-center justify-between mb-8">

                <h2 className="text-2xl font-bold text-gray-800 flex items-center">

                  <Plus className="w-7 h-7 mr-3 text-purple-600" />

                  Create New Blog Post
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



              <div onSubmit={handleSubmit} className="space-y-6 pb-24">

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

                  />

                </div>



                {/* URL Slug */}

                <div className="group">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">

                    URL Slug

                  </label>

                  <input

                    type="text"

                    name="urlSlug"

                    value={formData.urlSlug}

                    onChange={handleInputChange}

                    placeholder="Auto-generated from title"

                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50"

                    readOnly

                  />

                  <p className="text-xs text-gray-500 mt-1">Automatically generated from the title</p>

                </div>

                {/* Content */}

                <div className="group">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">

                    Content

                  </label>

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

                      rows="2"

                      required

                    />

                  </div>

                </div>



                {/* Category */}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
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

                      placeholder="Enter author name"

                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"

                      required

                    />

                  </div>

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">

                      Status

                    </label>

                    <select

                      name="status"

                      value={formData.status}

                      onChange={handleInputChange}

                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"

                    >

                      <option value="Draft">Draft</option>

                      <option value="Published">Published</option>

                      <option value="Scheduled">Scheduled</option>

                    </select>

                  </div>

                </div>



                {/* Blog Image Upload */}

                <div className="mb-8">

                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">

                    <Camera className="w-4 h-4 mr-2 text-purple-600" />

                    Blog Image

                  </label>

                  <div

                    className={`relative w-full min-h-[400px] border-2 border-dashed rounded-xl p-4 flex items-center justify-center transition-all duration-200 bg-white shadow-sm ${

                      dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-400'

                    }`}

                    style={{ boxSizing: 'border-box' }}

                    onDragEnter={handleDrag}

                    onDragLeave={handleDrag}

                    onDragOver={handleDrag}

                    onDrop={handleDrop}

                  >

                    {previewImage ? (

                      <div className="relative w-full h-full flex flex-col items-center justify-center">

                        <img src={previewImage} alt="Preview" className="w-full max-h-48 object-contain rounded-lg mb-2" style={{ minHeight: '120px', background: '#f3f4f6' }} />

                        <button

                          type="button"

                          onClick={removeImage}

                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"

                        >

                          <X className="w-4 h-4" />

                        </button>

                      </div>

                    ) : (

                      <div className="flex flex-col items-center justify-center w-full">

                        <Upload className="w-12 h-12 text-gray-400 mb-4" />

                        <p className="text-gray-600 mb-2 text-center">Drag and drop your image here, or</p>

                        <label className="cursor-pointer">

                          <span className="text-purple-600 hover:text-purple-700 font-medium">browse</span>

                          <input

                            type="file"

                            accept="image/*"

                            onChange={handleFileInput}

                            className="hidden"

                          />

                        </label>

                        <p className="text-xs text-gray-500 mt-2 text-center">Supported formats: PNG, JPG, GIF up to 5MB</p>

                      </div>

                    )}

                  </div>

                </div>

              </div>

              {/* Action Buttons at the end of the form */}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Add Blog Post
                </button>
              </div>
            </div>
        {/* Preview Panel */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 border border-white/20 w-full max-w-full lg:max-w-lg flex flex-col min-h-[500px] lg:h-[800px] overflow-y-auto rounded-scrollbar mt-0">

          <div className="flex items-center mb-6">

            <Eye className="w-5 h-5 mr-2 text-purple-600" />

            <h3 className="text-lg font-semibold text-gray-800">Preview</h3>

          </div>

          {/* Blog Post Preview Content */}

          <div className="bg-gray-50 rounded-xl p-4 min-h-48 flex flex-col">

            {/* Image Placeholder */}

            <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4">

              {previewImage ? (

                <img src={previewImage} alt="Blog preview" className="w-full h-40 object-cover rounded-lg" />

              ) : (

                <Image className="w-20 h-20 text-gray-300" />

              )}

            </div>

            {/* Author, Date, Read Time */}

            <div className="flex items-center text-sm text-gray-600 mb-4">

              <User className="w-5 h-5 mr-2" />

              <span>{formData.authorName || 'Author Name'}</span>

              <span className="mx-2">•</span>

              <Calendar className="w-5 h-5 mr-1" />

              <span>July 9, 2025</span>

              <span className="mx-2">•</span>

              <span>5 min read</span>

            </div>

            {/* Title */}

            <h4 className="font-bold text-gray-800 text-xl mb-2">

              {formData.title || 'Your Blog Title Will Appear Here'}

            </h4>

            {/* Category Tags */}

            <div className="flex gap-2 mb-3 flex-wrap">

              {formData.category && (

                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">{formData.category}</span>

              )}

              {!formData.category && (

                <>

                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">Technology</span>

                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">Article</span>

                </>

              )}

            </div>

            {/* Content Preview */}

            <p className="text-gray-700 text-sm leading-relaxed mb-4">

              {formData.content || 'Your blog content preview will be displayed here as you type. The preview updates in real-time, allowing you to see exactly how your content will appear to readers...'}

            </p>

            <hr className="my-2" />

            {/* Footer: Likes, Comments, Share, Bookmark */}

            <div className="flex items-center justify-between text-gray-400 text-sm mt-auto">

              <div className="flex items-center gap-4">

                <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>0 likes</span>

                <span className="flex items-center"><svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8a2 2 0 012-2h2m4-4h-4a2 2 0 00-2 2v4a2 2 0 002 2h4a2 2 0 002-2v-4a2 2 0 00-2-2z" /></svg>0 comments</span>

              </div>

              <div className="flex items-center gap-4">

                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 12v1a9 9 0 009 9h3m0-18a9 9 0 00-9 9v1" /></svg>

                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>

              </div>

            </div>

          </div>

        </div>

        </div>

      </div>

   

  );

}



'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import { Upload, Bell, User, LogOut, Save, Eye, Image, X, Plus, Hash, Calendar, FileText, Camera } from 'lucide-react';

export default function CreateBlogPost() {
  // State
  const [formData, setFormData] = useState({
    title: '',
    urlSlug: '',
    content: '',
    category: '',
    subcategory: 'General',
    authorName: '',
    status: 'Draft',
    blogImage: null
  });

  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  // Add missing state variables
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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

  // Auto-generate URL slug from title
  useEffect(() => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, urlSlug: slug }));
    }
  }, [formData.title]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
   
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
      }
    }
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
      setFormData(prev => ({ ...prev, blogImage: file }));
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
    setFormData(prev => ({ ...prev, blogImage: null }));
  };

  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { user, loading } = authContext || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      // Get JWT token from localStorage
      const token = localStorage.getItem('adminToken');
      
      if (!token || !user) {
        router.push('/AdminLogin');
        return;
      }

      // First upload the image if it exists
      let imageUrl = '';
      if (formData.blogImage) {
        const formDataImage = new FormData();
        formDataImage.append('file', formData.blogImage);
        formDataImage.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset
        
        const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
          method: 'POST',
          body: formDataImage
        });
        
        const uploadData = await uploadResponse.json();
        if (!uploadResponse.ok) {
          throw new Error(uploadData.message || 'Failed to upload image');
        }
        imageUrl = uploadData.secure_url;
      }

      // Prepare the blog data according to the API requirements
      const blogData = {
        title: formData.title,
        slug: formData.urlSlug,
        content: formData.content,
        category: formData.category,
        subcategory: formData.subcategory || 'General',
        author: formData.authorName,
        status: formData.status
      };

      // Only include image if it was uploaded
      if (imageUrl) {
        blogData.image = imageUrl;
      }
      
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(blogData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create blog post');
      }
      
      alert('Blog post created successfully!');
      
      // Reset form after successful submission
      setFormData({
        title: '',
        urlSlug: '',
        content: '',
        category: '',
        authorName: '',
        status: 'Draft',
        blogImage: null,
        subcategory: 'General'
      });
      setPreviewImage(null);
      
    } catch (error) {
      console.error('Error creating blog post:', error);
      setError(error.message || 'Failed to create blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ['Technology', 'Lifestyle', 'Business', 'Health', 'Travel', 'Food'];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-center items-start gap-4 lg:gap-8 py-4 md:py-8 w-full px-1 sm:px-2 md:px-4 lg:px-8 overflow-x-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 pb-4 border border-white/20 w-full max-w-full lg:max-w-lg flex flex-col min-h-[500px] lg:h-[800px] mb-6 lg:mb-0 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <Plus className="w-7 h-7 mr-3 text-purple-600" />
              Create New Blog Post
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
              />
            </div>

            {/* URL Slug */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL Slug
              </label>
              <input
                type="text"
                name="urlSlug"
                value={formData.urlSlug}
                onChange={handleInputChange}
                placeholder="Auto-generated from title"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                readOnly
              />
              <p className="text-xs text-gray-500 mt-1">Automatically generated from the title</p>
            </div>

            {/* Content */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content
              </label>
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
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
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
                  placeholder="Enter author name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  disabled={isSubmitting}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>
            </div>

            {/* Blog Image Upload */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Camera className="w-4 h-4 mr-2 text-purple-600" />
                Blog Image
              </label>
              <div
                className={`relative w-full min-h-[400px] border-2 border-dashed rounded-xl p-4 flex items-center justify-center transition-all duration-200 bg-white shadow-sm ${
                  dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-400'
                } ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
                style={{ boxSizing: 'border-box' }}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {previewImage ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    <img src={previewImage} alt="Preview" className="w-full max-h-48 object-contain rounded-lg mb-2" style={{ minHeight: '120px', background: '#f3f4f6' }} />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      disabled={isSubmitting}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center w-full">
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-2 text-center">Drag and drop your image here, or</p>
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
                    <p className="text-xs text-gray-500 mt-2 text-center">Supported formats: PNG, JPG, GIF up to 5MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons at the end of the form */}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Publish Now
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Preview Panel */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 border border-white/20 w-full max-w-full lg:max-w-lg flex flex-col min-h-[500px] lg:h-[800px] overflow-y-auto rounded-scrollbar mt-0">
          <div className="flex items-center mb-6">
            <Eye className="w-5 h-5 mr-2 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">Preview</h3>
          </div>

          {/* Blog Post Preview Content */}
          <div className="bg-gray-50 rounded-xl p-4 min-h-48 flex flex-col">
            {/* Image Placeholder */}
            <div className="w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              {previewImage ? (
                <img src={previewImage} alt="Blog preview" className="w-full h-40 object-cover rounded-lg" />
              ) : (
                <Image className="w-20 h-20 text-gray-300" />
              )}
            </div>

            {/* Author, Date, Read Time */}
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <User className="w-5 h-5 mr-2" />
              <span>{formData.authorName || 'Author Name'}</span>
              <span className="mx-2">•</span>
              <Calendar className="w-5 h-5 mr-1" />
              <span>{new Date().toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>5 min read</span>
            </div>

            {/* Title */}
            <h4 className="font-bold text-gray-800 text-xl mb-2">
              {formData.title || 'Your Blog Title Will Appear Here'}
            </h4>

            {/* Category Tags */}
            <div className="flex gap-2 mb-3 flex-wrap">
              {formData.category && (
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">{formData.category}</span>
              )}
              {!formData.category && (
                <>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">Technology</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">Article</span>
                </>
              )}
            </div>

            {/* Content Preview */}
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {formData.content || 'Your blog content preview will be displayed here as you type. The preview updates in real-time, allowing you to see exactly how your content will appear to readers...'}
            </p>

            <hr className="my-2" />

            {/* Footer: Likes, Comments, Share, Bookmark */}
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

              <div className="flex items-center gap-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v1a9 9 0 009 9h3m0-18a9 9 0 00-9 9v1" />
                </svg>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}