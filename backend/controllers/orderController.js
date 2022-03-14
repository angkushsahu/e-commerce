const Order = require("../modals/orderModals.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Product = require("../modals/productModal.js");
const ErrorHandler = require("../utils/errorHandler.js");

// Create a new order
exports.newOrder = catchAsyncErrors(async function(req, res, next) {
    const {
        shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: req.user._id
    });

    res.status(201).json({ success: true, order });
});

// Get single order
exports.getSingleOrder = catchAsyncErrors(async function(req, res, next) {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    // The populate function here helps to return the specifications of the user passed as the second parameter in the function from the user database
    // It basically goes to the user database and check for the corresponding user ID and returns the specifications
    if (!order) {
        return next(new ErrorHandler("Order not found with this id", 404));
    }

    res.status(200).json({
        success: true, order
    });
});

// Get logged-in user orders
exports.myOrders = catchAsyncErrors(async function(req, res, next) {
    const orders = await Order.find({ user: req.user._id });
    if (!orders) {
        return next(new ErrorHandler("Order not found with this id", 404));
    }

    res.status(200).json({
        success: true, orders
    });
});

// Get all orders -- Admin
exports.getAllOrders = catchAsyncErrors(async function(req, res, next) {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => totalAmount += order.totalPrice);

    res.status(200).json({
        success: true, totalAmount, orders
    });
});

// Update order status -- Admin
exports.updateOrder = catchAsyncErrors(async function(req, res, next) {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found with this id", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this product", 404));
    }

    order.orderItems.forEach(async o => {
        await updateStock(o.product, o.quantity);
    });

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true, order
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}

// Delete order -- Admin
exports.deleteOrder = catchAsyncErrors(async function(req, res, next) {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("Order not found with this id", 404));
    }
    await order.remove();

    res.status(200).json({
        success: true
    });
});