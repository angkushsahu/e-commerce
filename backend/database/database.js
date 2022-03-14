const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// catch block is avoided as we have countered the possible error in the main server file which closes the server as soon as there is any problem with the connection to database