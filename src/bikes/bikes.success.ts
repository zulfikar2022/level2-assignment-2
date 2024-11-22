class CustomResponse<T> {
  message: string;
  success: boolean;
  data: T;

  constructor(message: string, data: T) {
    this.message = message;
    this.success = true; // Always set to true for successful responses
    this.data = data;
  }
}

export default CustomResponse;
