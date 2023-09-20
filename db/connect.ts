import Mongoose from "mongoose";

const connectDB = (url) => {
  return Mongoose.connect(url);
};

export default connectDB;
