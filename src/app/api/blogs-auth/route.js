import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { token } = await request.json();

    // Validate the admin token from your existing system
    if (!token) {
      return NextResponse.json(
        { message: 'Token is required' },
        { status: 400 }
      );
    }

    // Extract admin info from token (simple validation for the demo token format)
    if (!token.startsWith('admin_token_')) {
      return NextResponse.json(
        { message: 'Invalid token format' },
        { status: 401 }
      );
    }

    // For the blog system, we'll create a JWT token
    const blogToken = `blog_${token}_${Date.now()}`;

    return NextResponse.json({
      message: 'Blog authentication successful',
      blogToken,
      success: true
    });

  } catch (error) {
    console.error('Blog auth error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
