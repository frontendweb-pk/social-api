import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err, "eee");
  if (err instanceof CustomError) {
    const errorResponse = err.renderError();
    res.status(err.status).json(errorResponse);
    return;
  }

  // Handle other errors (e.g., internal server errors)
  res.status(500).json({ message: "An unexpected error occurred." });
};

export { errorHandler };
