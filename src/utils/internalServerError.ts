import { httpStatusCodes } from "@common/httpStatusCodes"

import { BaseError } from "./baseError"

export class InternalServerError extends BaseError {
    constructor(
        name: string,
        statusCode = httpStatusCodes.INTERNAL_SERVER,
        message = "Internal server error.",
        isOperational = true
    ) {
        super(name, statusCode, message, isOperational)
    }
}
