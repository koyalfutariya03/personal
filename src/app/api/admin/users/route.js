import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { hash } from 'bcryptjs';

// Connect to database when the module is imported
await connectDB();

export async function GET() {
  try {
    // Fetch all users, excluding sensitive fields
    const users = await User.find({})
      .select('-password -__v')
      .lean();
    
    return new Response(JSON.stringify({
      success: true,
      count: users.length,
      data: users
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to fetch users', error: error.message }),
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
    console.log('POST /api/admin/users - Starting request handling');
    
    // Test database connection
    try {
      await connectDB();
      console.log('Database connection verified');
    } catch (dbError) {
      console.error('Database connection failed:', dbError);
      return new Response(
        JSON.stringify({ 
          success: false,
          message: 'Database connection failed',
          error: dbError.message 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    let requestBody;
    try {
      requestBody = await request.json();
      console.log('Request body:', JSON.stringify(requestBody, null, 2));
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid JSON in request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { username, email, password, role = 'user' } = requestBody;
    
    // Validate required fields
    const errors = [];
    if (!username) errors.push('Username is required');
    if (!password) errors.push('Password is required');
    if (password && password.length < 6) errors.push('Password must be at least 6 characters');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Please enter a valid email address');
    }
    if (role && !['user', 'admin'].includes(role)) {
      errors.push('Invalid role specified');
    }
    
    if (errors.length > 0) {
      console.error('Validation errors:', errors);
      return new Response(
        JSON.stringify({ 
          success: false,
          message: 'Validation failed',
          errors 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('Connecting to database...');
    try {
      await connectDB();
      console.log('Database connected successfully');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return new Response(
        JSON.stringify({ message: 'Database connection failed', error: dbError.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if username or email already exists
    console.log('Checking for existing user with username:', username, 'or email:', email);
    try {
      const existingUser = await User.findOne({
        $or: [
          { username },
          ...(email ? [{ email }] : [])
        ]
      });

      if (existingUser) {
        const isEmailMatch = email && existingUser.email === email;
        const errorField = isEmailMatch ? 'email' : 'username';
        const errorMessage = `${isEmailMatch ? 'Email' : 'Username'} already exists`;
        
        console.log('User already exists:', { username, email, existingUser });
        return new Response(
          JSON.stringify({ 
            success: false,
            message: errorMessage,
            field: errorField,
            code: 'DUPLICATE_' + errorField.toUpperCase()
          }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      }
    } catch (findError) {
      console.error('Error checking for existing user:', findError);
      return new Response(
        JSON.stringify({ 
          success: false,
          message: 'Error checking user existence',
          error: findError.message 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Hash password and create user
    console.log('Creating new user:', { username, email: email || 'none', role });
    try {
      const userData = {
        username,
        password,
        role,
      };
      
      if (email) userData.email = email;
      
      console.log('Creating user with data:', JSON.stringify(userData, null, 2));
      
      // Let the pre-save hook handle password hashing
      const newUser = new User(userData);
      
      // Validate the user data before saving
      try {
        await newUser.validate();
        console.log('User data validation successful');
      } catch (validationError) {
        console.error('User validation failed:', validationError);
        throw validationError;
      }
      
      // Save the user
      const savedUser = await newUser.save();
      console.log('User created successfully:', savedUser._id);
      
      // Don't send password hash in response
      const userResponse = savedUser.toObject();
      delete userResponse.password;
      delete userResponse.__v;

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'User created successfully',
          user: userResponse 
        }),
        { 
          status: 201, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    } catch (saveError) {
      console.error('Error saving user:', saveError);
      
      // Handle validation errors
      if (saveError.name === 'ValidationError') {
        const messages = Object.values(saveError.errors).map(err => err.message);
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Validation error',
            errors: messages
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // Handle duplicate key errors
      if (saveError.code === 11000) {
        const field = Object.keys(saveError.keyPattern)[0];
        return new Response(
          JSON.stringify({
            success: false,
            message: `${field} already exists`,
            field
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      // Generic error
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Error creating user',
          error: saveError.message
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to create user', error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
