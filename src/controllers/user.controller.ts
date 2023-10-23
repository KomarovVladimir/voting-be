import { Request, Response } from "express"
import { values, some, isNil } from "lodash"

import { Room, User } from "models"
import { httpStatusCodes } from "common"
import { BadRequestError } from "utils"
import { UserData } from "types"

//TODO: Work on responses
export const getUsers = async (req: Request, res: Response) => {
    const users = await User.getAll()

    res.status(httpStatusCodes.OK).json(users)
}

export const updateUser = async (req: Request, res: Response) => {
    const { id, email, password, firstName, lastName } = req.body

    if (some(values(req.body), isNil)) {
        throw new BadRequestError("Error")
    }

    await User.updateById({
        id,
        email,
        password,
        firstName,
        lastName,
    } as UserData)

    return res.status(httpStatusCodes.ACCEPTED).json({
        message: "Successfully updated a user",
    })
}

export const deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    await User.deleteById(id)

    res.status(httpStatusCodes.OK).json({
        message: "Successfully deleted a user",
    })
}

export const getUserRooms = async (req: Request, res: Response) => {
    if (!req.params.userId) {
        throw new BadRequestError("Error")
    }

    const rooms = await Room.getByUser(Number(req.params.userId))

    res.status(httpStatusCodes.OK).json(rooms)
}
