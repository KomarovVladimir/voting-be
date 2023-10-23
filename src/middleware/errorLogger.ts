import { Request, Response, NextFunction } from "express"

import { BaseError } from "utils"

//TODO: Replace with an actual logger
export function logError(err: Error | BaseError) {
    console.error(err)
}

export function errorLogger(
    err: BaseError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    logError(err)
    next(err)
}
