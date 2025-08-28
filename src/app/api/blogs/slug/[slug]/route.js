import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
 
export async function GET(request, { params }) {
  try {
    const { slug } = params;
   
    if (!slug) {
      return new Response(JSON.stringify({ error: 'Slug is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
 
    await connectDB();
   
    const blog = await Blog.findOne({ slug })
      .select('title slug content category subcategory author image status featuredImage createdAt updatedAt')
      .lean();
 
    if (!blog) {
      return new Response(JSON.stringify({ error: 'Blog post not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
 
    // Convert _id to string and ensure dates are properly formatted
    const blogWithStringId = {
      ...blog,
      _id: blog._id.toString(),
      featuredImage: blog.featuredImage || blog.image,
      createdAt: blog.createdAt?.toISOString(),
      updatedAt: blog.updatedAt?.toISOString()
    };
 
    return new Response(JSON.stringify(blogWithStringId), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
   
  } catch (error) {
    console.error("Error in blog slug API route:", error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch blog post' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
 