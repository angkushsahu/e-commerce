const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const cors = require("cors");
app.use(cors({
    origin: true, credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Route imports
const product = require("./routes/productRoute.js");
const user = require("./routes/userRoute.js");
const order = require("./routes/orderRoute.js");
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// Middleware for error
const errorMiddleware = require("./middleware/error.js");
app.use(errorMiddleware);

module.exports = app;