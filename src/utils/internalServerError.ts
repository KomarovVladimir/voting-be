import { httpStatusCodes } from "common/httpStatusCodes"

import { BaseError } from "./baseError"

export class InternalServerError extends BaseError {
    constructor(
        name: string,
        message = "Internal server error",
        statusCode = httpStatusCodes.INTERNAL_SERVER,
        isOperational = true
    ) {
        super(name, message, statusCode, isOperational)
    }
}
