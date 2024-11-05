export abstract class CustomError extends Error {
  abstract status: number;

  constructor(public message: string, public details?: any) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  abstract renderError(): IError[];

  logError(): void {
    console.error({
      message: this.message,
      status: this.status,
      details: this.details,
      timestamp: new Date().toISOString(),
      stackTrace: this.stack,
    });
  }
}

export interface IError {
  message: string; // A descriptive error message
  status: number; // HTTP status code associated with the error
  field?: string; // Optional field that the error pertains to
  timestamp?: string; // Optional timestamp of when the error occurred
  stackTrace?: string; // Optional stack trace for debugging purposes
  details?: any;
}
