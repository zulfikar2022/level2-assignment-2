export class CustomError extends Error {
  success: boolean;
  error: Record<string, unknown>;
  stack: string | undefined;

  constructor(message: string, errorDetails: Record<string, unknown>) {
    super(message);
    this.success = false; // Always set false for failure response
    this.error = errorDetails;
    this.stack = this.stack || "";
  }
}
