import { httpStatusCodes } from "@common/httpStatusCodes"

import { BaseError } from "./baseError"

export class Api404Error extends BaseError {
    readonly name: string
    readonly message: string
    readonly statusCode: number
    readonly isOperational: boolean

    constructor(
        name: string,
        statusCode = httpStatusCodes.NOT_FOUND,
        message = "Not found.",
        isOperational = true
    ) {
        super(name, statusCode, message, isOperational)
    }
}
