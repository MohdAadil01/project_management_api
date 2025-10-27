import mongoose from "mongoose";
import { config } from "dotenv";
config();

export const connectDatabase = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to Database ✅");
  } catch (error) {
    console.log("Failed to connect Database❌");
    console.log(error);
    process.exit(1);
  }
};
