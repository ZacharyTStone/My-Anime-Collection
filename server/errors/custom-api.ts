// Extends the JavaScript Error class to let us create custom error messages

class CustomAPIError extends Error {
  constructor(message: string) {
    super(message);
    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, CustomAPIError.prototype);
  }
}

export default CustomAPIError;
