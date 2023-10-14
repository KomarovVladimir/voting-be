import { Request, Response, NextFunction } from "express"

import { BaseError } from "./baseError"
import { httpStatusCodes } from "@common/httpStatusCodes"

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
        res.status(err.statusCode).json({
            error: { message: err.message, timestamp: err.timestamp },
        })
    } else {
        res.status(httpStatusCodes.INTERNAL_SERVER).json({
            message: "Internal server error",
        })
    }

    return next(err)
}
