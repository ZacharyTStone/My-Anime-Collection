import { UnAuthenticatedError } from "../../../errors";
const checkPermissions = (requestUser, resourceUserId) => {
  // if (requestUser.role === 'admin') return
  //   if (requestUser.userId === resourceUserId.toString()) {return}
  //   throw new CustomError.UnAuthenticatedError(
  //     "You are not authorized to perform this action"
  //   );

  return null;
};

export default checkPermissions;
