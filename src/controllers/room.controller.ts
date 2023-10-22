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
    if (isNil(req.body)) {
        throw new BadRequestError("Error")
    }

    try {
        await Room.add(req.body)

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

    try {
        await Room.updateById(req.body as IRoom)

        return res.status(httpStatusCodes.ACCEPTED).json({
            message: "Successfully updated a user.",
        })
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

//TODO: Add more detailed messages
//TODO: Add status messages
//TODO: Add error names message
export const deleteRoom = async (req: Request, res: Response) => {
    if (!req.params.roomId) {
        throw new BadRequestError("Error")
    }

    try {
        await Room.deleteById(Number(req.params.roomId))

        res.status(httpStatusCodes.OK).json({
            message: "Successfully deleted a room.",
        })
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

export const joinRoom = async (req: Request, res: Response) => {
    if (some(values(req.params), isNil)) {
        throw new BadRequestError("Error")
    }

    try {
        const params = {
            roomId: Number(req.params.roomId),
            userId: Number(req.params.userId),
        }

        await Room.joinRoom(params)

        res.status(httpStatusCodes.OK).json({
            message: "Successfully joined a room.",
        })
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

export const leaveRoom = async (req: Request, res: Response) => {
    if (some(values(req.params), isNil)) {
        throw new BadRequestError("Error")
    }

    const params = {
        roomId: Number(req.params.roomId),
        userId: Number(req.params.userId),
    }

    try {
        await Room.leaveRoom(params)

        res.status(httpStatusCodes.OK).json({
            message: "Successfully leaved a room.",
        })
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

export const getRoomMembers = async (req: Request, res: Response) => {
    if (!req.params.roomId) {
        throw new BadRequestError("Error")
    }

    try {
        const result = await Room.getRoomMembers(Number(req.params.roomId))

        res.status(httpStatusCodes.OK).json(result)
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

//TODO: Fix params check
export const excludeMember = async (req: Request, res: Response) => {
    if (some(values(req.params), isNil)) {
        throw new BadRequestError("Error")
    }

    const params = {
        roomId: Number(req.params.roomId),
        userId: Number(req.params.userId),
    }

    try {
        const result = await Room.excludeMemberById(params)

        res.status(httpStatusCodes.OK).json(result)
    } catch (err) {
        throw new InternalServerError("Error")
    }
}
