import mongoose, { Document, Schema, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Define the Playlist interface
interface Playlist {
  title: string;
  id: string;
}

// Create a schema for the playlist
const playlistSchema = new Schema<Playlist>({
  title: String,
  id: String,
});

// Create a document interface for the playlist
interface PlaylistDocument {
  title: string;
  id: string;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
      unique: true,
    },
    isDemo: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      select: false,
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
    language: {
      type: String,
      enum: ["en", "jp"],
      default: "en",
    },
    playlists: {
      type: [playlistSchema] as any,
      default: [
        {
          title: "Default",
          id: "0",
        },
        {
          title: "Watch List",
          id: "1",
        },
        {
          title: "All Time Favorites",
          id: "2",
        },
      ] as PlaylistDocument[],
    },
  },
  { timestamps: true }
);

// Hash the password before saving
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Generate JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

// Compare the entered password with the hashed password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

// Create a document interface for the user
export interface UserDocument extends Document {
  name: string;
  email: string;
  isDemo: boolean;
  password: string;
  theme: "light" | "dark";
  language: "en" | "jp";
  playlists: Playlist[];
  createJWT(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Create and export the User model
const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;
