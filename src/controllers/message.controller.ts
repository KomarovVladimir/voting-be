import { Request, Response } from "express"
import { isNil } from "lodash"

import { Message, IMessage } from "@models/message.model"
import { httpStatusCodes } from "@common/httpStatusCodes"

//TODO: Optimize error handling
//TODO: Test the existing codebase
export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.getAll(req.params.roomId)

        res.json(messages)
    } catch (err) {
        console.error(err)

        res.status(httpStatusCodes.INTERNAL_SERVER).send({
            statusCode: httpStatusCodes.INTERNAL_SERVER,
            statusMessage: "Internal Server Error",
        })
    }
}

export const addMessage = async (req: Request, res: Response) => {
    if (isNil(req.body.text)) {
        return res.status(httpStatusCodes.BAD_REQUEST).send({
            statusCode: httpStatusCodes.BAD_REQUEST,
            statusMessage: "Bad Request",
        })
    }

    try {
        Message.add({
            roomId: Number(req.params.roomId),
            userId: req.body.userId,
            text: req.body.text,
        })

        res.status(201).send({
            statusCode: 201,
            statusMessage: "Created",
            message: "Successfully posted a message.",
        })
    } catch (err) {
        res.status(httpStatusCodes.INTERNAL_SERVER).send({
            statusCode: httpStatusCodes.INTERNAL_SERVER,
            statusMessage: "Internal Server Error",
        })
    }
}

export const updateMessage = async (req: Request, res: Response) => {
    if (isNil(req.body.text)) {
        return res.status(httpStatusCodes.BAD_REQUEST).send({
            statusCode: httpStatusCodes.BAD_REQUEST,
            statusMessage: "Bad Request",
        })
    }

    try {
        await Message.updateById(req.body as IMessage)

        return res.status(202).send({
            statusCode: 202,
            statusMessage: "Accepted",
            message: "Successfully updated a message.",
        })
    } catch (err) {
        console.log(err)
        res.status(httpStatusCodes.INTERNAL_SERVER).send({
            statusCode: httpStatusCodes.INTERNAL_SERVER,
            statusMessage: "Internal Server Error",
        })
    }
}

export const deleteMessage = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
        await Message.deleteById(id)

        res.send({
            statusCode: httpStatusCodes.OK,
            statusMessage: "Ok",
            message: "Successfully deleted an item.",
        })
    } catch (err) {
        res.status(httpStatusCodes.INTERNAL_SERVER).send({
            statusCode: httpStatusCodes.INTERNAL_SERVER,
            statusMessage: "Internal Server Error",
        })
    }
}