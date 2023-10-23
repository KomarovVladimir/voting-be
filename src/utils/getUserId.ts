import { Request } from "express"
import jwt from "jsonwebtoken"

import { UserData } from "types"

import { UnauthorizedError } from "./unauthorizedError"

export const getUserId = (req: Request) => {
    const decoded = jwt.decode(req.cookies.token) as {
        user: UserData
    }

    if (!decoded) {
        throw new UnauthorizedError("Error")
    }

    return +decoded.user.id
}
