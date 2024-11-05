import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { NotFoundError } from "../errors/not-found-error";
import { Password } from "../utils/password";
import { AuthError } from "../errors/auth-error";
import { Jwt } from "../utils/jwt";

/**
 * Handles user registration.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns A promise that resolves when the registration process is complete.
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  try {
    const user = new User(body);
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles user registration.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns A promise that resolves when the login process is complete.
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email }, { mobile: email }],
    });

    if (!user) throw new NotFoundError("User not existed!, Please register");

    const isMatch = await Password.compare(password, user.password);
    if (!isMatch) throw new AuthError("Invalid password", "password");

    const token = Jwt.sign({ id: user.id, email: user.email });

    user.accessToken = token;

    // expire token after 1 hour
    const expirationTime = parseInt(process.env.TOKEN_EXPIRATION!);
    user.tokenExpiry = new Date(Date.now() + expirationTime);
    user.lastLogin = new Date(Date.now());

    await user.save();

    res.status(200).json(
      user.toJSON({
        transform(doc, ret, options) {
          delete ret.password;
        },
      })
    );
  } catch (error) {
    next(error);
  }
};
