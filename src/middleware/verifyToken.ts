import { Request, Response, NextFunction } from "express"
import jsonwebtoken from "jsonwebtoken"

import { UnauthorizedError } from "utils"

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.token

    console.log(req.cookies)

    jsonwebtoken.verify(token, process.env.SECRET_KEY, (err: Error) => {
        if (err) {
            throw new UnauthorizedError("Error")
        } else {
            next()
        }
    })
}
