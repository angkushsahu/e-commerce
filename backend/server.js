// This should be called at the top of the file as if we use an undefined variable below, it could catch it on the time of the operation
process.on("uncaughtException", function(err) {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught error");

    // we are not closing the server as server has not been initiated yet
    process.exit(1);
});


require("dotenv").config({ path: "./backend/config.env" });
require("./database/database.js");      // Connecting to database
const app = require("./app.js");

const server = app.listen(process.env.PORT, function() {
    console.log(`App listening at http://localhost:${process.env.PORT}/`);
})

// Unhandled promise rejection
process.on("unhandledRejection", function(err) {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");

    // Closing the server
    server.close(function() {
        process.exit(1);
    });
});