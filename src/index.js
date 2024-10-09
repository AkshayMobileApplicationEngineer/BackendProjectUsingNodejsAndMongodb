import dotenv from 'dotenv';
import color from 'colors'
import connectToDatabase from './database/index.data.js';
import { database } from './constants.js';
import { app } from './app.js';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config({
  path: './.env'
});

// Connect to MongoDB database
connectToDatabase();

// Add the port number from environment variables or default to 3000
const PORT = process.env.PORT || 3000;

// Run server
app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`.yellow);
});

