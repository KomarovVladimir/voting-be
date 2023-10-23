import { Request, Response } from "express"
import { isNil, some, values } from "lodash"
import jwt from "jsonwebtoken"

import { Message } from "models"
import { httpStatusCodes } from "common"
import { BadRequestError } from "utils"
import { UserData, MessageData } from "types"

//TODO: Optimize error handling
//TODO: Test the existing codebase
export const getRoomMessages = async (req: Request, res: Response) => {
    const messages = await Message.getByRoomId(req.params.roomId)

    res.status(httpStatusCodes.OK).json(messages)
}

export const addMessage = async (req: Request, res: Response) => {
    if (some(values(req.body), isNil)) {
        throw new BadRequestError("Error")
    }

    const {
        user: { id: userId },
    } = jwt.decode(req.cookies?.token) as {
        user: UserData
    }

    await Message.add({ roomId: req.params.roomId, userId, ...req.body })

    res.status(httpStatusCodes.CREATED).json({
        message: "Successfully posted a message",
    })
}

export const updateMessage = async (req: Request, res: Response) => {
    if (isNil(req.body.text)) {
        return res.status(httpStatusCodes.BAD_REQUEST).json({
            statusCode: httpStatusCodes.BAD_REQUEST,
            statusMessage: "Bad Request",
        })
    }

    await Message.updateById(req.body as MessageData)

    return res.status(httpStatusCodes.ACCEPTED).json({
        statusCode: 202,
        statusMessage: "Accepted",
        message: "Successfully updated a message",
    })
}

export const deleteMessage = async (req: Request, res: Response) => {
    const id = +req.params.id

    await Message.deleteById(id)

    res.status(httpStatusCodes.OK).json({
        message: "Successfully deleted an item",
    })
}
