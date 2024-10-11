import mongoose from "mongoose";
import colors from 'colors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: './.env' });

// Import the database name constant
import { database } from '../constants.js';

// Ensure that the required environment variables are set
if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in .env file".red);
  process.exit(1);
}

// Set the strictQuery option for Mongoose
mongoose.set('strictQuery', true); // or false, depending on your preference

// Connect to MongoDB function
const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: database,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to ${database} database successfully at host: ${connection.connection.host}`.green);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`.red);
    process.exit(1);
  }
};

export default connectToDatabase;
