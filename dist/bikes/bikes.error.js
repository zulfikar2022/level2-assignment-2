export class CustomError extends Error {
    message;
    success;
    error;
    stack;
    constructor(message, errorDetails) {
        super(message);
        this.message = message;
        this.success = false; // Always set false for failure response
        this.error = errorDetails;
        this.stack = this.stack || "";
    }
}
