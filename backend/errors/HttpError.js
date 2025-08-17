class HttpError extends Error {
    constructor(message, statusCode = 500, code = "INTERNAL_ERROR",) {
        super(message)
        this.statusCode = statusCode;
        this.code = code
    }
}

export default HttpError