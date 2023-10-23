import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

import { UnauthorizedError } from "utils"

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.token

    jwt.verify(token, process.env.SECRET_KEY, (err: Error) => {
        if (err) {
            throw new UnauthorizedError("Error")
        } else {
            next()
        }
    })
}
