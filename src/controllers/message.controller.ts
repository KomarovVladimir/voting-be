import { Request, Response } from "express"
import { isNil } from "lodash"

import { Message, IMessage } from "@models/message.model"
import { httpStatusCodes } from "@common/httpStatusCodes"
import { InternalServerError } from "@utils/internalServerError"
import { BadRequestError } from "@utils/badRequestError"

//TODO: Optimize error handling
//TODO: Test the existing codebase
export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.getAll(req.params.roomId)

        res.status(httpStatusCodes.OK).json(messages)
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

export const addMessage = async (req: Request, res: Response) => {
    if (isNil(req.body.text)) {
        throw new BadRequestError("Error")
    }

    try {
        await Message.add({
            roomId: Number(req.params.roomId),
            userId: req.body.userId,
            text: req.body.text,
        })

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
        await Message.updateById(req.body as IMessage)

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
