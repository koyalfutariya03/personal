const mongoose = require('mongoose');
require('dotenv').config();

async function checkBlogs() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Get the Blog model
    const Blog = require('../src/models/Blog');
    
    // Count total blogs
    const count = await Blog.countDocuments({});
    console.log(`📊 Total blogs in database: ${count}`);
    
    if (count > 0) {
      // Show first 3 blogs as sample
      const sampleBlogs = await Blog.find({}).limit(3);
      console.log('\nSample blogs:');
      console.log(JSON.stringify(sampleBlogs, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Error checking blogs:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

checkBlogs();
