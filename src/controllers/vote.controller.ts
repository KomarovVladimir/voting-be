import { Request, Response } from "express"
import { values, some, isNil } from "lodash"
import jwt from "jsonwebtoken"

import { httpStatusCodes } from "common"
import { BadRequestError } from "utils"
import { Vote } from "models"
import { UserData } from "types"

export const vote = async (req: Request, res: Response) => {
    if (some(values(req.params), isNil)) {
        throw new BadRequestError("Error")
    }

    const {
        user: { id: userId },
    } = jwt.decode(req.cookies?.token) as {
        user: UserData
    }

    const params = {
        roomId: +req.params.roomId,
        itemId: +req.params.itemId,
        userId,
    }

    const rooms = await Vote.add(params)

    res.status(httpStatusCodes.OK).json(rooms)
}

export const downvote = async (req: Request, res: Response) => {
    if (some(values(req.params), isNil)) {
        throw new BadRequestError("Error")
    }

    const {
        user: { id: userId },
    } = jwt.decode(req.cookies?.token) as {
        user: UserData
    }

    const params = {
        roomId: +req.params.roomId,
        itemId: +req.params.itemId,
        userId,
    }

    const rooms = await Vote.delete(params)

    res.status(httpStatusCodes.OK).json(rooms)
}
