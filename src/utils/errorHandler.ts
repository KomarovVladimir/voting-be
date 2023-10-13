import { Request, Response, NextFunction } from "express"

import { BaseError } from "./baseError"
import { InternalServerError } from "./internalServerError"

//TODO: Replace with an actual logger
export function logError(err: Error | BaseError) {
    console.error(err)
}

export function logErrorMiddleware(
    err: BaseError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    logError(err)
    next(err)
}

export function isOperationalError(err: Error | BaseError) {
    if (err instanceof BaseError) {
        return err.isOperational
    }

    return false
}

export const errorHandler = (
    err: Error | BaseError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof BaseError) {
        res.status(err.statusCode).send({
            error: { message: err.message, timestamp: err.timestamp },
        })
    } else {
        const { statusCode, message, timestamp } = new InternalServerError(
            "Error"
        )
        res.status(statusCode).send({
            error: { message, timestamp },
        })
    }

    return next(err)
}
