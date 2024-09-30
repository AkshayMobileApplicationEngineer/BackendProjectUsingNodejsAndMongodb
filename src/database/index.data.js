import mongoose from "mongoose";
import { database } from '../constants.js';
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config({
      path:'./.env'
});

// Set strictQuery option
mongoose.set('strictQuery', true); // or false, depending on your choice

const connectToDatabase = async () => {
   try {
         const connection = await mongoose.connect(process.env.MONGO_URI, {
               dbName: database,
               useNewUrlParser: true,
               useUnifiedTopology: true,
         });
         console.log(`${database} connected successfully: ${connection.connection.host}`.green);
   } catch (error) {
         console.log("MongoDB connection error:", error);
         process.exit(1);
   }
}
export default connectToDatabase;
