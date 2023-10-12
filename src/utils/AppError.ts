export interface IAppError {
    name: string
    message: string
    statusCode: number
    stack: string
    isOperational: boolean
}

export class AppError extends Error implements IAppError {
    name: string
    message: string
    statusCode: number
    stack: string
    isOperational: boolean

    constructor({ name, stack, message, statusCode }: IAppError) {
        super(message)

        this.name = name
        this.message = message
        this.statusCode = statusCode
        this.stack = stack
        this.statusCode = statusCode
        this.isOperational = true

        Error.captureStackTrace(this, this.constructor)
    }
}
