import { UnAuthenticatedError } from "../errors/index.js";

// just a function to compare the userIDs and throw an error if wrong

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) {
    return;
  } else {
    throw new UnAuthenticatedError("Not authorized to access this route");
  }
};

export default checkPermissions;
