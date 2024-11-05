import { validationResult } from "express-validator";
import { ValidationError } from "../errors/validator-error";
import { NextFunction, Request, Response } from "express";

export const requestValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array());
  }
  next();
};
