import { httpStatusCodes } from "@common/httpStatusCodes"

import { BaseError } from "./baseError"

export class Api404Error extends BaseError {
    constructor(
        name: string,
        message = "Not found",
        statusCode = httpStatusCodes.NOT_FOUND,
        isOperational = true
    ) {
        super(name, message, statusCode, isOperational)
    }
}
