class apiError extends Error {
    constructor(
        statusCode,
        message="Something went wrong",
        errors = [],
        statck = "",

    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.success = false
        this.message = message
        this.errors = errors

        if (stack) {
            this.stack = statck
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {apiError }