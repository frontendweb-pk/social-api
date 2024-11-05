import { CustomError, IError } from "./custom-error";

export class BadRequestError extends CustomError {
  status = 400; // HTTP status code for Bad Request

  constructor(
    public message: string,
    public field?: string,
    public details?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype); // Set the prototype explicitly
  }

  // Render error details in a structured format
  renderError(): IError[] {
    return [
      {
        message: this.message,
        status: this.status,
        field: this.field, // Specific field related to the error, if applicable
        timestamp: new Date().toISOString(), // Capture the current time of the error
        stackTrace: this.stack || "No stack trace available", // Provide a fallback if stack is not available
        details: this.details || "No additional details available", // Include any additional error details if provided
      },
    ];
  }
}
