import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// MongoDB connection string from .env
const mongoURI = process.env.MONGO_URI;

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
