import Mongoose from "mongoose";

const connectDB = (url: string) => {
  return Mongoose.connect(url);
};

export default connectDB;
