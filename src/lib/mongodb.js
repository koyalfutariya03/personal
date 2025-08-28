import mongoose from 'mongoose';
 
// Validate required environment variables
const MONGODB_URI = process.env.MONGODB_URI;
const NODE_ENV = process.env.NODE_ENV || 'development';
 
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}
 
// Initialize mongoose connection cache
let cached = global.mongoose;
 
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
 
/**
 * Establishes a connection to MongoDB with connection pooling and caching
 * @returns {Promise<mongoose.Connection>} Mongoose connection instance
 * @throws {Error} If connection to MongoDB fails
 */
async function connectDB() {
  // Return cached connection if available
  if (cached.conn) {
    return cached.conn;
  }
 
  // Configure connection options
  const options = {
    serverSelectionTimeoutMS: 5000,          // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000,                  // Close sockets after 45s of inactivity
    maxPoolSize: 10,                         // Maximum number of connections in the connection pool
    minPoolSize: 1,                          // Minimum number of connections in the connection pool
    connectTimeoutMS: 10000,                 // Give up initial connection after 10 seconds
    family: 4,                              // Use IPv4, skip trying IPv6
  };
 
  // Only buffer commands when not in production
  if (NODE_ENV !== 'production') {
    options.bufferCommands = false;
  }
 
  // Create a new connection promise if one doesn't exist
  if (!cached.promise) {
    try {
      console.log('🔌 Connecting to MongoDB...');
     
      cached.promise = mongoose.connect(MONGODB_URI, options)
        .then((mongoose) => {
          console.log('✅ MongoDB connected successfully');
          return mongoose;
        })
        .catch((error) => {
          console.error('❌ MongoDB connection error:', error.message);
          throw error;
        });
 
      // Set up event listeners for the connection
      mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to DB');
      });
 
      mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
      });
 
      mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
      });
 
      // Handle process termination
      process.on('SIGINT', async () => {
        try {
          await mongoose.connection.close();
          console.log('Mongoose connection closed through app termination');
          process.exit(0);
        } catch (err) {
          console.error('Error closing MongoDB connection:', err);
          process.exit(1);
        }
      });
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }
 
  try {
    // Wait for the connection to be established
    cached.conn = await cached.promise;
  } catch (error) {
    // Clear the cached promise on error to allow retries
    cached.promise = null;
    console.error('Failed to establish MongoDB connection:', error);
    throw error;
  }
 
  return cached.conn;
}
 
export { connectDB };
 