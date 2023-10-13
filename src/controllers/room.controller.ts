import { Request, Response } from "express"
import { values, some, isNil } from "lodash"

import { Room, IRoom } from "@models/room.model"
import { httpStatusCodes } from "@common/httpStatusCodes"
import { InternalServerError } from "@utils/internalServerError"
import { BadRequestError } from "@utils/badRequestError"

export const getRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await Room.getAll()

        res.status(httpStatusCodes.OK).json(rooms)
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

export const getRoomById = async (req: Request, res: Response) => {
    try {
        const result = await Room.getById(Number(req.params.roomId))

        res.status(httpStatusCodes.OK).json(result)
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

export const addRoom = async (req: Request, res: Response) => {
    if (isNil(req.body.name)) {
        throw new BadRequestError("Error")
    }

    const { name } = req.body

    try {
        Room.add(name)

        res.status(httpStatusCodes.CREATED).json({
            message: "Successfully created a room.",
        })
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

export const updateRoom = async (req: Request, res: Response) => {
    if (some(values(req.body), isNil)) {
        throw new BadRequestError("Error")
    }

    const { id, name, status } = req.body

    try {
        await Room.updateById({ id, name, status } as IRoom)

        return res.status(httpStatusCodes.ACCEPTED).json({
            message: "Successfully updated a user.",
        })
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

//TODO: Add more detailed messages
//TODO: Add status messages
export const deleteRoom = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
        await Room.deleteById(id)

        res.status(httpStatusCodes.OK).json({
            message: "Successfully deleted a room.",
        })
    } catch (err) {
        throw new InternalServerError("Error")
    }
}
