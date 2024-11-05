import { Request, Response, NextFunction } from "express";
import { User, UserRole } from "../models/user";
import { AuthError } from "../errors/auth-error";

export const admin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user?.id);
    if (!user) {
      throw new AuthError("Unauthorized");
    }

    if (!Object.keys(UserRole).includes(user.role)) {
      throw new AuthError("Unauthorized access");
    }

    next();
  } catch (error) {
    next(error);
  }
};
