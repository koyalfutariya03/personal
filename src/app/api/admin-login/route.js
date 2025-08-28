import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

import jwt from 'jsonwebtoken';
 
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '1d';
 
export async function POST(request) {
  try {
    const { username, password } = await request.json();
 
    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }
 
    // Connect to database
    await dbConnect();
 
    // Find user by username or email
    const user = await User.findOne({
      $or: [
        { username },
        { email: username }
      ],
      isActive: true
    }).select('+password');
 
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
 
    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
 
    // Generate JWT token with consistent role values
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role.toLowerCase() // Ensure consistent lowercase role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
    
    console.log('Generated token for user:', { 
      userId: user._id, 
      username: user.username, 
      role: user.role 
    });
 
    // Update last login time
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });
 
    // Return success response with consistent role values
    const responseData = {
      message: 'Login successful',
      token,
      role: user.role.toLowerCase(), // Ensure consistent lowercase role
      username: user.username,
      id: user._id
    };
    
    console.log('Login successful:', responseData);
    return NextResponse.json(responseData);
 
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}