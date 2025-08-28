import { connectDB } from "@/lib/mongodb";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// Import the Blog model using the correct path


// Inline auth verification to avoid missing module import
async function verifyRequestAuth(request) {
  try {
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { ok: false, status: 401, error: 'Missing or invalid Authorization header' };
    }

    const token = authHeader.substring('Bearer '.length);
    const secret = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET;
    if (!secret) {
      return { ok: false, status: 500, error: 'Server auth not configured' };
    }

    const payload = jwt.verify(token, secret);
    return { ok: true, user: payload };
  } catch (err) {
    const isExpired = err?.name === 'TokenExpiredError';
    return { ok: false, status: 401, error: isExpired ? 'Token expired' : 'Unauthorized' };
  }
}

export async function GET(request) {
  try {
    await connectDB();
    console.log('Fetching blogs from database...');
  
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
  
    let query = Blog.find({})
      .sort({ createdAt: -1 })
      .select('title slug content category subcategory author image status createdAt updatedAt');
  
    // Apply limit if specified
    if (limit && !isNaN(parseInt(limit, 10))) {
      query = query.limit(parseInt(limit, 10));
      console.log(`Limiting results to ${limit} blogs`);
    }
  
    const blogs = await query.lean().exec();

    if (!blogs || blogs.length === 0) {
      console.log('No blogs found in database');
      return new Response(JSON.stringify({ success: true, data: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log(`Found ${blogs.length} blogs`);
    const blogsWithStringId = blogs.map(blog => ({
      ...blog,
      _id: blog._id.toString(),
      featuredImage: blog.image, // Map image to featuredImage for frontend compatibility
      createdAt: blog.createdAt?.toISOString(),
      updatedAt: blog.updatedAt?.toISOString()
    }));
  
    return new Response(JSON.stringify({ 
      success: true, 
      data: blogsWithStringId 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error in API route:", error);
    // Return an empty array on error to prevent client-side errors
    return new Response(
      JSON.stringify({
        success: false,
        error: "API Error",
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export async function POST(request) {
  try {
    const auth = await verifyRequestAuth(request);
    if (!auth.ok) {
      return new Response(JSON.stringify({ message: auth.error || 'Unauthorized' }), {
        status: auth.status || 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Optional: restrict to Admin/SuperAdmin roles
    if (!auth.user?.role || !['Admin', 'SuperAdmin'].includes(auth.user.role)) {
      return new Response(JSON.stringify({ message: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { title, slug, content, category, subcategory, author, image, status } = body || {};

    if (!title || !slug || !content || !category || !subcategory || !author) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();

    const created = await Blog.create({
      title,
      slug: String(slug).toLowerCase().trim(),
      content,
      category,
      subcategory,
      author,
      image: image || undefined,
      status: status || 'None',
    });

    return new Response(
      JSON.stringify({
        success: true,
        blog: {
          ...created.toObject(),
          _id: created._id.toString(),
        },
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating blog:', error);
    let status = 500;
    let message = 'Server error';
    if (error?.code === 11000) {
      status = 409;
      message = 'Slug already exists';
    }
    return new Response(JSON.stringify({ success: false, message }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}