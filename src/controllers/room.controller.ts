import { Request, Response } from "express"
import { values, some, isNil } from "lodash"

import { Room } from "models"
import { httpStatusCodes } from "common"
import { BadRequestError } from "utils"
import { RoomData } from "types"

export const getRooms = async (req: Request, res: Response) => {
    const rooms = await Room.getAll()

    res.status(httpStatusCodes.OK).json(rooms)
}

export const getRoomById = async (req: Request, res: Response) => {
    const result = await Room.getById(Number(req.params.roomId))

    res.status(httpStatusCodes.OK).json(result)
}

export const addRoom = async (req: Request, res: Response) => {
    if (isNil(req.body)) {
        throw new BadRequestError("Error")
    }

    await Room.add(req.body)

    res.status(httpStatusCodes.CREATED).json({
        message: "Successfully created a room",
    })
}

export const updateRoom = async (req: Request, res: Response) => {
    if (some(values(req.body), isNil)) {
        throw new BadRequestError("Error")
    }

    await Room.updateById(req.body as RoomData)

    return res.status(httpStatusCodes.ACCEPTED).json({
        message: "Successfully updated a user",
    })
}

//TODO: Add more detailed messages
//TODO: Add status messages
//TODO: Add error names message
export const deleteRoom = async (req: Request, res: Response) => {
    if (!req.params.roomId) {
        throw new BadRequestError("Error")
    }

    await Room.deleteById(Number(req.params.roomId))

    res.status(httpStatusCodes.OK).json({
        message: "Successfully deleted a room",
    })
}

export const joinRoom = async (req: Request, res: Response) => {
    if (some(values(req.params), isNil)) {
        throw new BadRequestError("Error")
    }

    const params = {
        roomId: Number(req.params.roomId),
        userId: Number(req.params.userId),
    }

    await Room.joinRoom(params)

    res.status(httpStatusCodes.OK).json({
        message: "Successfully joined a room",
    })
}

export const leaveRoom = async (req: Request, res: Response) => {
    if (some(values(req.params), isNil)) {
        throw new BadRequestError("Error")
    }

    const params = {
        roomId: Number(req.params.roomId),
        userId: Number(req.params.userId),
    }

    await Room.leaveRoom(params)

    res.status(httpStatusCodes.OK).json({
        message: "Successfully leaved a room",
    })
}

export const getRoomMembers = async (req: Request, res: Response) => {
    if (!req.params.roomId) {
        throw new BadRequestError("Error")
    }

    const result = await Room.getRoomMembers(Number(req.params.roomId))

    res.status(httpStatusCodes.OK).json(result)
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

    const result = await Room.excludeMemberById(params)

    res.status(httpStatusCodes.OK).json(result)
}
