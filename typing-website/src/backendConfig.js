import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

// MongoDB connection string from .env
const mongoURI = "mongodb+srv://aarya20225001:Fvb6TpKKfzAWVyNJ@cluster0.jr9dr2g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
