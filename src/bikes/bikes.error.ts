export class CustomError extends Error {
  message: string;
  success: boolean;
  error: object;
  stack: string | undefined;

  constructor(message: string, errorDetails: object) {
    super(message);
    this.message = message;
    this.success = false; // Always set false for failure response
    this.error = errorDetails;
    this.stack = this.stack || "";
  }
}
