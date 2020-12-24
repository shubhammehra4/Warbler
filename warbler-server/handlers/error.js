function errorHandler(error, _req, res, _next) {
    return res.status(error.status || 500).json({
        error: {
            message: error.message || "Oops! Something went wrong."
        }
    })
}

module.exports = errorHandler;