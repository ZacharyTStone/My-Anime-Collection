import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

/* used in the following files:
./controllers/animesController.js:    throw new NotFoundError(`No Anime with id :${animeId}`);
./controllers/animesController.js:    throw new NotFoundError(`You have already added that anime to your list`);
*/

class NotFoundError extends CustomAPIError {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default NotFoundError;
