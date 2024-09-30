class ApiError extends Error {
      constructor(
          statusCode,
          message = "Something went wrong",
          error = [],
          stack = ''
      ) {
          super(message); // Semicolon here instead of a comma
          this.statusCode = statusCode;
          this.data = null;
          this.success = false;
          this.error = error;
  
          if (stack) {
              this.stack = stack;
          } else {
              Error.captureStackTrace(this, this.constructor);
          }
      }
  }
  
  export {ApiError}