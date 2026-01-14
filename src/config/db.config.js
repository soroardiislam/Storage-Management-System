import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

try {
  mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
} catch (error) {
  console.log("MongoDB Connection Error:", err);
}
