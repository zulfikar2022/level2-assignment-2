export class CustomError extends Error {
    constructor(message, errorDetails) {
        super(message);
        this.success = false; // Always set false for failure response
        this.error = errorDetails;
        this.stack = this.stack || "";
    }
}
