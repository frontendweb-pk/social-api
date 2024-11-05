import mongoose, { Schema, Document } from "mongoose";
import { USER_TABLE } from "./user";
import { PostStatus, Status } from "../utils/enum";
import { Media } from "../types";

export const POST_TABLE = "Post";

// Interfaces for Likes, Comments, Friends, and Posts
export interface ILike {
  user: Schema.Types.ObjectId; // Use ObjectId for user reference
  active: boolean;
}

export interface IComment {
  _id?: string;
  user: Schema.Types.ObjectId; // Reference to User
  message: string;
  status: Status;
  createdAt?: Date;
  images?: string[];
}

export interface IFriendRequest {
  user: Schema.Types.ObjectId; // Reference to User
  status: Status;
  createdAt?: Date;
}

export interface IPost {
  user: Schema.Types.ObjectId; // Use ObjectId for user reference
  content: string;
  images: Media[]; // Using Media type for image structure
  code?: string;
  videoUrl?: Media; // Using Media type for video structure
  comments: IComment[];
  likes: ILike[];
  tags?: string[];
  friendRequests: IFriendRequest[];
  active: boolean;
  status: PostStatus;
  createdAt: Date; // Timestamp for user creation
  updatedAt: Date; // Timestamp for last update
  isPublished: boolean;
  publishedAt: Date;
  commentsEnabled?: boolean; // Whether comments are allowed on the post
  pinned?: boolean; // Whether the post is pinned
  downloadEnabled?: boolean; // Whether the post can be downloaded
  notificationsEnabled?: boolean; // Whether notifications for this post are enabled
}

export interface IPostDoc extends Document<IPost>, IPost {}

const imageSchema = new Schema({
  public_id: { type: String, default: null },
  url: { type: String, required: true }, // Make URL required
  resource_type: { type: String, default: "" },
  access_mode: { type: String, default: "" },
  folder: { type: String, default: "" },
  signature: { type: String, default: "" },
  version: { type: String, default: "" },
});

const commentSchema = new Schema<IComment>({
  user: { type: Schema.Types.ObjectId, ref: USER_TABLE, required: true },
  message: { type: String, required: true, trim: true }, // Make message required
  images: { type: [String], default: [] },
  status: { type: String, enum: Status, default: Status.Pending },
  createdAt: { type: Date, default: Date.now },
});

const friendRequestSchema = new Schema<IFriendRequest>({
  user: { type: Schema.Types.ObjectId, ref: USER_TABLE, required: true },
  status: { type: String, enum: Status, default: Status.Pending },
  createdAt: { type: Date, default: Date.now },
});

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: USER_TABLE },
    content: { type: String, default: "" },
    code: { type: String, default: "" },
    images: { type: [imageSchema], default: [] },
    videoUrl: { type: imageSchema, default: null }, // Use the same schema for video
    active: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
    status: { type: String, enum: Status, default: Status.Approved },
    postStatus: {
      type: String,
      enum: Object.values(PostStatus),
      default: PostStatus.Public,
    },
    comments: { type: [commentSchema], default: [] },
    likes: {
      type: [
        {
          user: { type: Schema.Types.ObjectId, ref: USER_TABLE },
          active: { type: Boolean, default: false },
        },
      ],
      default: [],
    }, // Use the interface for likes
    friendRequests: { type: [friendRequestSchema], default: [] },
    commentsEnabled: { type: Boolean, default: true }, // Controls comments on the post
    pinned: { type: Boolean, default: false }, // Controls pinning of the post
    downloadEnabled: { type: Boolean, default: false }, // Controls download option
    notificationsEnabled: { type: Boolean, default: true }, // Controls notification option
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        delete ret.__v; // Remove the version key
      },
    },
  }
);

// Export the Post model
export const Post = mongoose.model<IPostDoc>(POST_TABLE, schema);
