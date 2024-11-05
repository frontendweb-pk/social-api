import mongoose, { Document, Schema } from "mongoose";
import { Password } from "../utils/password";

export const USER_TABLE = "User";

// Enum for user roles
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}
export interface IUser {
  // username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile: string;
  role: UserRole;
  avatar: string;
  accessToken: string;
  tokenExpiry: Date; // Use Date for better handling
  active: boolean;
  createdAt: Date; // Timestamp for user creation
  updatedAt: Date; // Timestamp for last update
  isEmailVerified: boolean;
  lastLogin: Date;
}

export interface IUserDoc extends Document<IUser>, IUser {}

const schema = new Schema(
  {
    // username: { type: String, required: true, trim: true, lowercase: true },
    firstname: { type: String, required: true, trim: true, lowercase: true },
    lastname: { type: String, required: true, trim: true, lowercase: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      index: true, // Index for performance
    },
    password: { type: String, required: true, trim: true, min: 8, max: 16 },
    mobile: {
      type: String,
      required: true,
      trim: true,
      min: 10,
      max: 10,
      index: true,
      unique: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    avatar: { type: String, default: "" },
    isEmailVerfied: {
      type: Boolean,
      default: false,
    },
    accessToken: { type: String, default: "" },
    tokenExpiry: { type: Date, default: null },
    lastLogin: { type: Date, default: null }, // Track last login
    active: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
    },
  }
);

schema.pre("save", async function cb(next) {
  if (this.isModified("password")) {
    this.set("password", await Password.hash(this.get("password")));
  }

  if (["admin", "superadmin"].includes(this.get("role"))) {
    this.set("isEmailVerfied", true);
  }

  next();
});
export const User = mongoose.model<IUserDoc>(USER_TABLE, schema);
