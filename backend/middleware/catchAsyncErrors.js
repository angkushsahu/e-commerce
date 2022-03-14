module.exports = theFunc => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next); // Catch seems useless in this case because it never gets hit, even in case of an error, the error handler takes care of the required scenario
}

// theFunc function is passed as a parameter to this module and then the inner function is called having the parameters req, res, next. The promise will at first try to resolve itself, where we call the same function again to invoke itself