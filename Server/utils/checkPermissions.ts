import { UnAuthenticatedError } from "../errors/index.js";

// Function to compare the userIDs and throw an error if wrong
const checkPermissions = (
  requestUser: { userId: string },
  resourceUserId: string
): void => {
  if (requestUser.userId === resourceUserId.toString()) {
    return;
  } else {
    throw new UnAuthenticatedError("Not authorized to access this route");
  }
};

export default checkPermissions;
