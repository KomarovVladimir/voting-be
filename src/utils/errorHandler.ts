import { Request, Response, NextFunction } from "express"

import { BaseError } from "./baseError"

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

export function returnError(err: BaseError, req: Request, res: Response) {
    res.status(err.statusCode || 500).send(err.message)
}

export function isOperationalError(err: Error | BaseError) {
    if (err instanceof BaseError) {
        return err.isOperational
    }

    return false
}
