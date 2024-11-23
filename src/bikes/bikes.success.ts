class CustomResponse<T> {
  message: string;
  success: boolean;
  data: T;

  constructor(message: string, data: T, success: boolean = true) {
    this.message = message;
    this.data = data;
    this.success = success;
  }
}

export default CustomResponse;
