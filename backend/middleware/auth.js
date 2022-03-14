const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncErrors.js");
const ErrorHandler = require("../utils/errorHandler.js");
const User = require("../modals/userModal.js");

exports.isAuthenticatedUser = catchAsyncErrors(async function(req, res, next) {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);

    next();
})

exports.authorizeRoles = function(...roles) {
    return function(req, res, next) {
        if (!roles.includes(req.user.role)) {       // If it does not include admin role
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        }

        next();
    }
}