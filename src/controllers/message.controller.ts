import { Request, Response } from "express"
import { isNil, some, values } from "lodash"

import { Message } from "@models/message.model"
import { httpStatusCodes } from "@common/httpStatusCodes"
import { InternalServerError } from "@utils/internalServerError"
import { BadRequestError } from "@utils/badRequestError"
import { MessageData } from "types"

//TODO: Optimize error handling
//TODO: Test the existing codebase
export const getRoomMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.getByRoomId(req.params.roomId)

        res.status(httpStatusCodes.OK).json(messages)
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

export const addMessage = async (req: Request, res: Response) => {
    if (some(values(req.body), isNil)) {
        throw new BadRequestError("Error")
    }

    try {
        await Message.add({ roomId: req.params.roomId, ...req.body })

        res.status(httpStatusCodes.CREATED).json({
            message: "Successfully posted a message.",
        })
    } catch (err) {
        throw new InternalServerError(err)
    }
}

export const updateMessage = async (req: Request, res: Response) => {
    if (isNil(req.body.text)) {
        return res.status(httpStatusCodes.BAD_REQUEST).json({
            statusCode: httpStatusCodes.BAD_REQUEST,
            statusMessage: "Bad Request",
        })
    }

    try {
        await Message.updateById(req.body as MessageData)

        return res.status(httpStatusCodes.ACCEPTED).json({
            statusCode: 202,
            statusMessage: "Accepted",
            message: "Successfully updated a message.",
        })
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

export const deleteMessage = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
        await Message.deleteById(id)

        res.status(httpStatusCodes.OK).json({
            message: "Successfully deleted an item.",
        })
    } catch (err) {
        throw new InternalServerError("Error")
    }
}
