/**
 * @fileoverview This file defines the routes for handling post-related requests.
 * It imports necessary modules and middleware, sets up the routes, and exports the configured router.
 */

import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  userPosts,
} from "../controllers/post";
import { auth } from "../middleware/auth";
import { admin } from "../middleware/admin";

const route = Router();

/**
 * Route to get all posts.
 * This route is protected by authentication and admin middleware.
 *
 * @name GET /posts
 * @function
 * @memberof module:routes/post
 * @inner
 * @param {function} auth - Middleware to authenticate the user.
 * @param {function} admin - Middleware to authorize the user as an admin.
 * @param {function} getAllPosts - Controller function to handle the request and return all posts.
 */
route.get("/", auth, admin, getAllPosts);

/**
 * Route to get all posts by the user.
 * This route is protected by authentication middleware.
 *
 * @name GET /posts/me
 * @function
 * @memberof module:routes/post
 * @inner
 * @param {function} auth - Middleware to authenticate the user.
 * @param {function} userPosts - Controller function to handle the request and return all posts by the user.
 */
route.get("/me", auth, userPosts);

/**
 * Route to get a post by id.
 * This route is protected by authentication middleware.
 *
 * @name GET /posts/:postId
 * @function
 * @memberof module:routes/post
 * @inner
 * @param {function} auth - Middleware to authenticate the user.
 * @param {function} getPostById - Controller function to handle the request and return a post by id.
 */
route.get("/:postId", auth, getPostById);

/**
 * Route to create a post.
 * This route is protected by authentication middleware.
 *
 * @name POST /posts
 * @function
 * @memberof module:routes/post
 * @inner
 * @param {function} auth - Middleware to authenticate the user.
 * @param {function} createPost - Controller function to handle the request and create a post.
 */
route.post("/", auth, createPost);

/**
 * Route to delete a post by id.
 * This route is protected by authentication middleware.
 *
 * @name DELETE /posts/:postId
 * @function
 * @memberof module:routes/post
 * @inner
 * @param {function} auth - Middleware to authenticate the user.
 * @param {function} deletePost - Controller function to handle the request and delete a post by id.
 */
route.delete("/:postId", auth, deletePost);

// export the configured router

export { route as postRoute };
