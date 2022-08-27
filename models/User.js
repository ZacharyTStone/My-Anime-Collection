import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const playlist = new mongoose.Schema(
	{
		title: String,
		id: String,
	},
	{ timestamps: true }
);

const UserSchema = new mongoose.Schema(
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
			type: [playlist],
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
			],
		},
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function () {
	// hash the password
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
// compare the entered password with the hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

export default mongoose.model("User", UserSchema);
