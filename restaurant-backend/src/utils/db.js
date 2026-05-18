const mongoose = require('mongoose');

// hook up db
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Successfully connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    // if this fails we're kinda screwed
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
