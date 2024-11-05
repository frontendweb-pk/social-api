import { CustomError, IError } from "./custom-error";
import { ValidationError as ExpressValidationError } from "express-validator";

export class ValidationError extends CustomError {
  status = 400; // HTTP status code for Bad Request

  constructor(
    public errors: ExpressValidationError[],
    public field?: string,
    public details?: any
  ) {
    super("Validation failed");
    Object.setPrototypeOf(this, ValidationError.prototype); // Set the prototype explicitly
  }

  // Render error details in a structured format
  renderError(): IError[] {
    return this.errors.map((error) => ({
      message: error.msg, // Error message from express-validator
      status: this.status,
      field: this.field, // The field that caused the validation error
      timestamp: new Date().toISOString(),
      stackTrace: this.stack || "No stack trace available",
      details: this.details || "No additional details available", // The value that failed validation
    }));
  }
}
