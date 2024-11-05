import { NotFoundError } from "../errors/not-found-error";
import { Post } from "../models/post";
import { Request, Response, NextFunction } from "express";

/**
 * Get all posts.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns A promise that resolves when the posts are fetched.
 */
export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate("user");
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a post by id.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns A promise that resolves when the post is fetched.
 */

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("user");

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

/**
 * Get posts by user id.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns A promise that resolves when the posts are fetched.
 */

export const userPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;
  console.log("userid", userId);

  try {
    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.log("HI");
    next(error);
  }
};

/**
 * Create a new post.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns A promise that resolves when the post is created.
 */
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  body.user = req.user.id;
  console.log("user", req.user.id);
  try {
    const post = new Post(body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Post.findOneAndDelete({ _id: id, user: req.user.id });
    res.status(200).json({ postId: id, message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export const likePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const commentPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const likeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const pinPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const downloadPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
export const getPostLikes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
