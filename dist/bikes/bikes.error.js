export class CustomError extends Error {
    message;
    success;
    error;
    stack;
    constructor(message, errorDetails, stack) {
        super(message);
        this.message = message;
        this.success = false; // Always set false for failure response
        this.error = errorDetails;
        this.stack = stack;
    }
}
