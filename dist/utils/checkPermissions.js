"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("../errors/index.js");
// just a function to compare the userIDs and throw an error if wrong
const checkPermissions = (requestUser, resourceUserId) => {
    if (requestUser.userId === resourceUserId.toString()) {
        return;
    }
    else {
        throw new index_js_1.UnAuthenticatedError("Not authorized to access this route");
    }
};
exports.default = checkPermissions;
// test with new email
