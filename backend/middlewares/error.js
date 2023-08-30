const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // passing error to errorHandler middleware
}

const errorHandler = (err, req, res, next) => {
    // sometimes we get 200 status code even if there is an error
    // so we set the status code to 500 if it is 200
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    // sending the error message
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
}

module.exports = { notFound, errorHandler };