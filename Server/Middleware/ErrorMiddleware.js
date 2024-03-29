const errorMiddleware = (error, req, res, next) => {
    console.error(error.message);
    const statusCode = res.statusCode ? res.statusCode : 500;   // For dynamic set of errors, thus the condition for code

    return res.status(statusCode).json({
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : null
    })
}

export default errorMiddleware;