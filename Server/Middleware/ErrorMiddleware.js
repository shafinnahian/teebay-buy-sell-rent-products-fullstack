const errorMiddleware = (error, req, res, next) => {
    console.log(`Here is err middleware`);
    const statusCode = res.statusCode ? res.statusCode : 500;

    return res.status(statusCode).json({
        message: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : null
    })
}

export default errorMiddleware;