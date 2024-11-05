import { CustomError, IError } from "./custom-error";

export class NotFoundError extends CustomError {
  status: number = 404;
  constructor(
    public message: string,
    public field?: string,
    public details?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
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
