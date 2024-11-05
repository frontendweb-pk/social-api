import mongoose from "mongoose";

interface IProfile {
  userId: string; // Reference to the user model
  firstname: string; // User's first name
  lastname: string; // User's last name
  bio: string; // Short biography
  dateOfBirth: Date; // For age verification
  location: string; // User's location
  avatar: string; // Profile picture URL
  interests: string[]; // User interests for engagement
  followers: string[]; // List of follower user IDs
  following: string[]; // List of user IDs that this user follows
  posts: string[]; // User's posts or references to them
  privacySettings: object; // Custom privacy settings
  createdAt: Date; // Profile creation date
  updatedAt: Date; // Last profile update timestamp
  isTwoFactorEnabled: boolean;
  accountStatus: "active" | "suspended" | "deactivated";
  // Preferences
  profileVisibility: "public" | "friends" | "private";
  notificationsSettings: object; // Could include various notification preferences
  language: string;
  timezone: string;
}

export interface IProfileDoc extends mongoose.Document, IProfile {}

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    bio: { type: String, default: "" },
    dateOfBirth: { type: Date, required: true },
    location: { type: String, default: "" },
    avatar: { type: String, default: "" },
    interests: { type: [String], default: [] },
    followers: { type: [String], default: [] },
    following: { type: [String], default: [] },
    posts: { type: [String], default: [] },
    privacySettings: { type: Object, default: {} },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isTwoFactorEnabled: { type: Boolean, default: false },
    accountStatus: {
      type: String,
      enum: ["active", "suspended", "deactivated"],
      default: "active",
    },
    profileVisibility: {
      type: String,
      enum: ["public", "friends", "private"],
      default: "public",
    },
    notificationsSettings: { type: Object, default: {} },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
    },
  }
);
