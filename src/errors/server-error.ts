import { CustomError, IError } from "./custom-error";

export class ServerError extends CustomError {
  status = 500; // HTTP status code for Internal Server Error

  constructor(public message: string, public details?: any) {
    super(message);
    Object.setPrototypeOf(this, ServerError.prototype); // Set the prototype explicitly
  }

  // Render error details in a structured format
  renderError(): IError[] {
    return [
      {
        message: this.message,
        status: this.status,
        field: undefined, // Typically, server errors do not pertain to a specific field
        timestamp: new Date().toISOString(), // Capture the current time of the error
        stackTrace: this.stack || "No stack trace available", // Provide a fallback if stack is not available
        details: this.details || "No additional details available", // Include any additional error details if provided
      },
    ];
  }
}
