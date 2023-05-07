const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalurl}`);
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 2 ? 500 : res.statusCode;
    let message = err.message;

    // Check for mongoose for bad ObjectID
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        message = `Resource not found`;
        statusCode = 404;
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? 'johnf_test' : err.stack,
    });
}

export { notFound, errorHandler }