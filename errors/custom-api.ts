// extends the Javascript Error class to let us create custom error messages

class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

export default CustomAPIError;
