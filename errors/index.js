import BadRequestError from "./bad-request.js";
import NotFoundError from "./not-found.js";
import UnAuthenticatedError from "./unauthenticated.js";

// these are used to throw errors and send messages to the client
// the errors show up in the client as a message
// they are also logged to the server console since they throw an error

export { BadRequestError, NotFoundError, UnAuthenticatedError };
