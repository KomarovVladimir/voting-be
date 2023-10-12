export class BaseError extends Error {
    readonly name: string
    readonly message: string
    readonly statusCode: number
    readonly isOperational: boolean

    constructor(
        name: string,
        statusCode: number,
        message: string,
        isOperational: boolean
    ) {
        super(message)

        Object.setPrototypeOf(this, new.target.prototype)
        this.name = name
        this.message = message
        this.statusCode = statusCode
        this.statusCode = statusCode
        this.isOperational = isOperational

        Error.captureStackTrace(this)
    }
}
