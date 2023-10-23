import { Request, Response, NextFunction } from "express"

import { httpStatusCodes } from "common"
import { BaseError } from "utils"

export const errorHandler = (
    err: Error | BaseError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof BaseError) {
        res.status(err.statusCode).json({
            error: { message: err.message },
        })
    } else {
        res.status(httpStatusCodes.INTERNAL_SERVER).json({
            message: "Internal server error",
        })
    }

    return next(err)
}
