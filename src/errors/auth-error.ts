import { CustomError, IError } from "./custom-error";

export class AuthError extends CustomError {
  status = 401; // HTTP status code for Unauthorized

  constructor(
    public message: string,
    public field?: string,
    public details?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, AuthError.prototype); // Set the prototype explicitly
  }

  // Render error details in a structured format
  renderError(): IError[] {
    return [
      {
        message: this.message,
        status: this.status,
        field: this.field,
        timestamp: new Date().toISOString(), // Capture the current time of the error
        stackTrace: this.stack || "No stack trace available", // Provide a fallback if stack is not available
        details: this.details,
      },
    ];
  }
}
