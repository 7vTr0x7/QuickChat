import mongoose from "mongoose";
import "dotenv/config";

const mongoUrl = process.env.MONGODB;

export const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoUrl);
    if (connection) {
      console.log("Connected to mongoDB");
    }
  } catch (error) {
    console.error("Failed to connect to mongoDB");
  }
};
