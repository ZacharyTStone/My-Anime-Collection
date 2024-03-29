import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

/* used in 
./controllers/authController.js:    throw new BadRequestError("please provide all values");
./controllers/authController.js:    throw new BadRequestError("Email already in use");
./controllers/authController.js:    throw new BadRequestError("Please provide all values");
./controllers/authController.js:    throw new BadRequestError("Please provide all values");
*/

class BadRequestError extends CustomAPIError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
