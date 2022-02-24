import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    id: {
      type: Number,
      required: [true, "Please provide id"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
