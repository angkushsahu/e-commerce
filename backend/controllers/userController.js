const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const User = require("../modals/userModal.js");
const ErrorHandler = require("../utils/errorHandler.js");
const sendToken = require("../utils/jwtToken.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");

// Register our user
exports.registerUser = catchAsyncErrors(async function(req, res) {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password, avatar: {
        public_id: "this is a sample id", url: "sample URL"
    } });

    sendToken(user, 201, res);
});

// Login our user
exports.loginUser = catchAsyncErrors(async function(req, res, next) {
    const { email, password } = req.body;
    // checking if user has given password and email
    if (!email || !password) {
        return next(new ErrorHandler("Please enter your credentials properly", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid e-mail or password", 401));
    }

    const isPasswordMatched = user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid e-mail or password", 401));
    }

    sendToken(user, 200, res);
});

// User logout
exports.logout = catchAsyncErrors(async function(req, res, next) {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
})

// Forgot password
exports.forgotPassword = catchAsyncErrors(async function(req, res, next) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get resetPassword Token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is: \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`;

    try {
        await sendEmail({
            email: user.email, subject: `E-commerce password recovery`, message
        });

        res.status(200).json({ success: true, message: `Email sent to ${user.email} successfully` })
    } catch(error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new Error(error.message, 500));
    }
})

// Reset password
exports.resetPassword = catchAsyncErrors(async function(req, res, next) {
    // Creating token hash
    this.resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) {
        return next(new ErrorHandler("Reset password token is invalid or has been expired", 400));
    }

    if (req.body.password != req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
})

// Get user details
exports.getUserDetails = catchAsyncErrors(async function(req, res, next) {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, user });
});

// Update User password
exports.updatePassword = catchAsyncErrors(async function(req, res, next) {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 401));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);
});

// Update User Profile
exports.updateUserProfile = catchAsyncErrors(async function(req, res, next) {
    const newUserData = {
        name: req.body.name, email: req.body.email
    }

    // Cloudinary is yet to be added

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true, runValidators: true, useFindAndModify: false
    });

    res.status(200).json({ success: true });
});

// Get all users -- admin
exports.getAllUsers = catchAsyncErrors(async function(req, res, next) {
    const users = await User.find();
    res.status(200).json({ success: true, users });
});

// Get single user -- admin
exports.getSingleUser = catchAsyncErrors(async function(req, res, next) {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`, 400));
    }
    res.status(200).json({ success: true, user });
});

// Update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async function(req, res, next) {
    const newUserData = {
        name: req.body.name, email: req.body.email, role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true, runValidators: true, useFindAndModify: false
    });

    res.status(200).json({ success: true });
});

// Delete User Profile -- Admin
exports.deleteUser = catchAsyncErrors(async function(req, res, next) {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`, 404));
    }

    // We need to remove cloudinary

    await user.remove();

    res.status(200).json({ success: true, message: "User deleted successfully" });
});