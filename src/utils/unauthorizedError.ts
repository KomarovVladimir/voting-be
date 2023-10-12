import { httpStatusCodes } from "@common/httpStatusCodes"

import { BaseError } from "./baseError"

export class UnauthorizedError extends BaseError {
    constructor(
        name: string,
        statusCode = httpStatusCodes.UNAUTHORIZED,
        message = "Unauthorized.",
        isOperational = true
    ) {
        super(name, statusCode, message, isOperational)
    }
}
