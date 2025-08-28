import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { verifyRequestAuth } from "../route";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    
    // Verify authentication
    const auth = await verifyRequestAuth(request);
    if (!auth.ok) {
      return new Response(JSON.stringify({ message: auth.error || 'Unauthorized' }), {
        status: auth.status || 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check for required fields
    const body = await request.json();
    const { title, slug, content, category, author, image, status } = body || {};

    if (!title || !slug || !content || !category || !author) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();

    // Check if blog exists
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return new Response(JSON.stringify({ success: false, message: 'Blog not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Update the blog
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        slug: String(slug).toLowerCase().trim(),
        content,
        category,
        author,
        image: image || undefined,
        status: status || 'None',
        updatedAt: new Date(),
      },
      { new: true }
    );

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          ...updatedBlog.toObject(),
          _id: updatedBlog._id.toString(),
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error updating blog:', error);
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

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    // Verify authentication
    const auth = await verifyRequestAuth(request);
    if (!auth.ok) {
      return new Response(JSON.stringify({ message: auth.error || 'Unauthorized' }), {
        status: auth.status || 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();
    
    // Check if blog exists
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return new Response(JSON.stringify({ success: false, message: 'Blog not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Delete the blog
    await Blog.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ success: true, message: 'Blog deleted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting blog:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
