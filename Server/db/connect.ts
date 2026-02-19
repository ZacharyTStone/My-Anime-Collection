import Mongoose from "mongoose";
import { logger } from "../utils/logger.js";

const connectDB = async (url: string) => {
  try {
    await Mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection error", error);
    throw error;
  }
};

export default connectDB;
