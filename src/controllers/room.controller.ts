import { Request, Response } from "express"
import { values, some, isNil } from "lodash"

import { Room, IRoom } from "@models/room.model"
import { httpStatusCodes } from "@common/httpStatusCodes"

export const getRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await Room.getAll()

        res.json(rooms)
    } catch (err) {
        console.error(err)

        res.send({
            statusCode: httpStatusCodes.INTERNAL_SERVER,
            statusMessage: "Internal Server Error",
        })
    }
}

export const getRoomById = async (req: Request, res: Response) => {
    try {
        const result = await Room.getById(Number(req.params.roomId))

        res.json(result)
    } catch (err) {
        console.error(err)

        res.status(httpStatusCodes.INTERNAL_SERVER).send({
            statusCode: httpStatusCodes.INTERNAL_SERVER,
            statusMessage: "Internal Server Error",
        })
    }
}

export const addRoom = async (req: Request, res: Response) => {
    if (some(values(req.body), isNil)) {
        return res.status(httpStatusCodes.BAD_REQUEST).send({
            statusCode: httpStatusCodes.BAD_REQUEST,
            statusMessage: "Bad Request",
        })
    }

    const { name } = req.body

    try {
        Room.add(name)

        res.status(201).send({
            statusCode: 201,
            statusMessage: "Created",
            message: "Successfully created a room.",
        })
    } catch (err) {
        res.status(httpStatusCodes.INTERNAL_SERVER).send({
            statusCode: httpStatusCodes.INTERNAL_SERVER,
            statusMessage: "Internal Server Error",
        })
    }
}

export const updateRoom = async (req: Request, res: Response) => {
    if (some(values(req.body), isNil)) {
        return res.status(httpStatusCodes.BAD_REQUEST).send({
            statusCode: httpStatusCodes.BAD_REQUEST,
            statusMessage: "Bad Request",
        })
    }

    const { id, name, status } = req.body

    try {
        await Room.updateById({ id, name, status } as IRoom)

        return res.status(202).send({
            statusCode: 202,
            statusMessage: "Accepted",
            message: "Successfully updated a user.",
        })
    } catch (err) {
        console.log(err)
        res.status(httpStatusCodes.INTERNAL_SERVER).send({
            statusCode: httpStatusCodes.INTERNAL_SERVER,
            statusMessage: "Internal Server Error",
        })
    }
}

export const deleteRoom = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
        await Room.deleteById(id)

        res.send({
            statusCode: httpStatusCodes.OK,
            statusMessage: "Ok",
            message: "Successfully deleted a user.",
        })
    } catch (err) {
        res.status(httpStatusCodes.INTERNAL_SERVER).send({
            statusCode: httpStatusCodes.INTERNAL_SERVER,
            statusMessage: "Internal Server Error",
        })
    }
}
