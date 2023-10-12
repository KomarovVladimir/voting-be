import { httpStatusCodes } from "@common/httpStatusCodes"

import { BaseError } from "./baseError"

export class BadRequestError extends BaseError {
    constructor(
        name: string,
        statusCode = httpStatusCodes.BAD_REQUEST,
        message = "Bad request.",
        isOperational = true
    ) {
        super(name, statusCode, message, isOperational)
    }
}
