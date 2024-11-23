class CustomResponse {
    message;
    success;
    data;
    constructor(message, data, success = true) {
        this.message = message;
        this.data = data;
        this.success = success;
    }
}
export default CustomResponse;
