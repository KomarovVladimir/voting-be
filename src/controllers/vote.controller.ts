import { Request, Response } from "express"
import { values, some, isNil } from "lodash"

import { httpStatusCodes } from "@common/httpStatusCodes"
import { InternalServerError } from "@utils/internalServerError"
import { BadRequestError } from "@utils/badRequestError"
import { Vote } from "@models/vote.model"

export const vote = async (req: Request, res: Response) => {
    if (some(values(req.params), isNil)) {
        throw new BadRequestError("Error")
    }

    try {
        const params = {
            roomId: Number(req.params.roomId),
            userId: Number(req.params.userId),
            itemId: Number(req.params.itemId),
        }

        const rooms = await Vote.add(params)

        res.status(httpStatusCodes.OK).json(rooms)
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

export const downvote = async (req: Request, res: Response) => {
    if (some(values(req.params), isNil)) {
        throw new BadRequestError("Error")
    }

    try {
        const params = {
            roomId: Number(req.params.roomId),
            userId: Number(req.params.userId),
            itemId: Number(req.params.itemId),
        }

        const rooms = await Vote.delete(params)

        res.status(httpStatusCodes.OK).json(rooms)
    } catch (err) {
        throw new InternalServerError("Error")
    }
}
