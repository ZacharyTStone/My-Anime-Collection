import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

/* used in the following files:
./middleware/auth.js:    throw new UnAuthenticatedError("Authentication Invalid");
./utils/checkPermissions.js:    throw new UnAuthenticatedError("Not authorized to access this route");
./controllers/authController.js:    throw new UnAuthenticatedError("Invalid Credentials");
*/

class UnAuthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnAuthenticatedError;
