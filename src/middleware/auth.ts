import { NextFunction, Request, Response } from "express";
import { AuthError } from "../errors/auth-error";
import { Jwt } from "../utils/jwt";

/**
 * Middleware to authenticate user.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns A promise that resolves when the authentication process is complete.
 */
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authToken = req.header("Authorization");

    // verify token
    if (!authToken) {
      throw new AuthError("Unauthorized");
    }
    const token = authToken.split(" ")[1];

    const verify = Jwt.verify(token) as any;

    if (!verify) {
      throw new AuthError("Invalid token");
    }

    req.user = verify;
    next();
  } catch (error) {
    next(error);
  }
};
