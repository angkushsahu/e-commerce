const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Product = require("../modals/productModal.js");
const ApiFeatures = require("../utils/apiFeatures.js");
const ErrorHandler = require("../utils/errorHandler.js");

// Create products -- Admin only
exports.createProduct = catchAsyncErrors(async function(req, res) {
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
});

// Get all products
exports.getAllProducts = catchAsyncErrors(async function(req, res, next) {
    // return next(new ErrorHandler("This is my temporary error", 500));
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    // let apiFeature = new ApiFeatures(Product.find(), req.query).search().filter();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    // let products = await apiFeature.query;
    let filteredProductsCount = products.length;
    // apiFeature.pagination(resultPerPage);
    // products = await apiFeature.query;
    res.status(200).json({ success: true, products, productsCount, resultPerPage, filteredProductsCount });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async function(req, res, next) {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found"));
    }

    res.status(200).json({ success: true, product });
});

// Update product -- Admin only
exports.updateProduct = catchAsyncErrors(async function(req, res) {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found"));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false });

    res.status(200).json({ success: true, product });
});

// Delete product -- Admin only
exports.deleteProduct = catchAsyncErrors(async function(req, res) {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found"));
    }

    await product.remove();

    res.status(200).json({ success: true, message: "Product Deleted Successfully" });
});

// Create new review or update a review
exports.createProductReview = catchAsyncErrors(async function(req, res, next) {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id, name: req.user.name, rating: Number(rating), comment
    };

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());
    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
            }
        })
    } else {
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach(rev => { avg += rev.rating; });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({ success: true });
});

// Get all reviews of a product
exports.getProductReviews = catchAsyncErrors(async function(req, res, next) {
    const product = await Product.findById(req.query.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({ success: true, reviews: product.reviews });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async function(req, res, next) {
    const product = await Product.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());
    let avg = 0;
    reviews.forEach(rev => avg += rev.rating);
    const ratings = avg / reviews.length;
    const numberOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, ratings, numberOfReviews
    }, { new: true, runValidators: true, useFindAndModify: false });

    res.status(200).json({ success: true, reviews: product.reviews });
});