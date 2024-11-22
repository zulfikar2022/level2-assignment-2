export class CustomResponse {
    constructor(message, data) {
        this.message = message;
        this.success = true; // Always set to true for successful responses
        this.data = data;
    }
}
