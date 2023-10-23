import { httpStatusCodes } from "@common/httpStatusCodes"

import { BaseError } from "./baseError"

export class UnauthorizedError extends BaseError {
    constructor(
        name: string,
        message = "Unauthorized",
        statusCode = httpStatusCodes.UNAUTHORIZED,
        isOperational = true
    ) {
        super(name, message, statusCode, isOperational)
    }
}
