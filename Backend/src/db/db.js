import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // load .env
const mongodbURL =process.env.MONGO_URI;



export const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
    process.exit(1);
  }
};
