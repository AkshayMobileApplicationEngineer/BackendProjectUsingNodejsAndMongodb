class ApiResponse {
      constructor(statusCode, data, message = "success") {
          this.statusCode = statusCode;
          this.success = statusCode < 400;
          this.message = message;
          this.data = data; // If the status code is less than 400, success is true
      }
  }
export {ApiResponse}