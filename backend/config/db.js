const mongoose = require('mongoose');

/**
 * Establishes a connection to MongoDB using the provided URI.
 * @async
 * @function connectDB
 * @throws {Error} If MONGO_URI is not defined or connection fails.
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable not defined');
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
};

module.exports = connectDB;