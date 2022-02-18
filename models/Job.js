import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company"],
      maxlength: 50,
    },
    title: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["want to watch", "watching", "watched"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    notes: {
      type: String,
      maxlength: 300,
      required: false,
    },
    stared: {
      type: String,
      maxlength: 20,
      default: false,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
