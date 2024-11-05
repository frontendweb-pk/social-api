/**
 * @file /D:/data/apps/social-api/src/routes/auth.ts
 * @description This file contains the routes for user authentication including login and registration.
 *
 * @module routes/auth
 */

import { Router } from "express";
import { login, register } from "../controllers/auth";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user";
import { requestValidator } from "../middleware/request-validator";

/**
 * Express router to mount user authentication related functions on.
 * @type {Router}
 */
const route = Router();

/**
 * Route serving user login.
 * @name post/login
 * @function
 * @memberof module:routes/auth
 * @inner
 * @param {string} path - Express path
 * @param {Array} middleware - Array of express-validator middlewares for validating request body
 * @param {function} requestValidator - Middleware to validate the request
 * @param {function} login - Controller function to handle login
 */
route.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  requestValidator,
  login
);

/**
 * Route serving user registration.
 * @name post/register
 * @function
 * @memberof module:routes/auth
 * @inner
 * @param {string} path - Express path
 * @param {Array} middleware - Array of express-validator middlewares for validating request body
 * @param {function} requestValidator - Middleware to validate the request
 * @param {function} register - Controller function to handle registration
 */
route.post(
  "/register",
  [
    body("firstname", "First name is required").notEmpty(),
    body("lastname", "Last name is required").notEmpty(),
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        // check if email already exists
        if (user) {
          throw new BadRequestError("Email already existed");
        }

        // check if mobile already existed
        const userMobile = await User.findOne({ mobile: value });
        if (userMobile) {
          throw new BadRequestError("Mobile number already existed");
        }
        return user;
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("mobile", "Mobile number is required").notEmpty(),
  ],
  requestValidator,
  register
);

export { route as authRoute };
