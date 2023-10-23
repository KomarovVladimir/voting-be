import { httpStatusCodes } from "common/httpStatusCodes"

import { BaseError } from "./baseError"

export class BadRequestError extends BaseError {
    constructor(
        name: string,
        message = "Bad request",
        statusCode = httpStatusCodes.BAD_REQUEST,
        isOperational = true
    ) {
        super(name, message, statusCode, isOperational)
    }
}
