import mongoose, { Document, Schema, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";

// Create a document interface for the user
export interface UserDocument extends Document {
  name: string;
  email: string;
  isDemo: boolean;
  password: string;
  theme: "light" | "dark";
  language: "en" | "jp";

  createJWT(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
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
        validator: function (v: string) {
          return validator.isEmail(v);
        },
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
  },
  { timestamps: true }
);

// Hash the password before saving
UserSchema.pre("save", async function (this: UserDocument) {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Generate JWT
UserSchema.methods.createJWT = function (this: UserDocument) {
  const secret = process.env.JWT_SECRET || "default-secret";
  const options: SignOptions = {
    expiresIn: "30d",
  };
  return jwt.sign({ userId: this._id }, secret, options);
};

// Compare the entered password with the hashed password
UserSchema.methods.comparePassword = async function (
  this: UserDocument,
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

UserSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 30 * 24 * 60 * 60,
    partialFilterExpression: { isDemo: true },
  }
);

// Create and export the User model
const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;
