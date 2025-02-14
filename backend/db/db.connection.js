import mongoose from "mongoose";
import "dotenv/config";

export const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB);
    if (connection) {
      console.log("Connected to mongoDB");
    }
  } catch (error) {
    console.error("Failed to connect to mongoDB");
  }
};
