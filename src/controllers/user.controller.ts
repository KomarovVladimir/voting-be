import { Request, Response } from "express"
import { values, some, isNil } from "lodash"
import jsonwebtoken from "jsonwebtoken"

import { IUser, User } from "@models/user.model"
import { httpStatusCodes } from "@common/httpStatusCodes"
import { InternalServerError } from "@utils/internalServerError"
import { BadRequestError } from "@utils/badRequestError"
import { Api404Error } from "@utils/api404Error"
import { Room } from "@models/room.model"

//TODO: Work on responses
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.getAll()

        res.status(httpStatusCodes.OK).json(users)
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

//TODO: Update the validation
export const addUser = async (req: Request, res: Response) => {
    if (some(values(req.body), isNil)) {
        throw new BadRequestError("Error")
    }

    const { email, password, firstName, lastName } = req.body

    try {
        const user = await User.insert({
            email,
            password,
            firstName,
            lastName,
        } as IUser)

        const jsontoken = jsonwebtoken.sign({ user }, process.env.SECRET_KEY, {
            expiresIn: "30m",
        })

        res.cookie("token", jsontoken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: new Date(Number(new Date()) + 30 * 60 * 1000),
        })
            .status(httpStatusCodes.CREATED)
            .json({
                token: jsontoken,
                message: "Successfully created a user.",
            })
        // .redirect("/mainpage")
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id, email, password, firstName, lastName } = req.body

    if (some(values(req.body), isNil)) {
        throw new BadRequestError("Error")
    }

    try {
        await User.updateById({
            id,
            email,
            password,
            firstName,
            lastName,
        } as IUser)

        return res.status(httpStatusCodes.ACCEPTED).json({
            message: "Successfully updated a user.",
        })
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
        await User.deleteById(id)

        res.status(httpStatusCodes.OK).json({
            message: "Successfully deleted a user.",
        })
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

//TODO: Prsroperly type query results
export const login = async (
    req: Request<never, never, Pick<IUser, "email" | "password">>,
    res: Response
) => {
    try {
        const { email, password } = req.body

        const user = (await User.findByEmail(email)) as IUser

        if (!user) {
            throw new Api404Error("Error")
        }

        if (user.password === password) {
            res.status(httpStatusCodes.OK).json({
                id: user.id,
                email: user.email,
            })
        } else {
            res.status(httpStatusCodes.UNAUTHORIZED).json({
                statusMessage: "Wrong password.",
            })
        }
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.status(httpStatusCodes.OK).json({
            message: "Successfully logged out.",
        })
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

export const getUserRooms = async (req: Request, res: Response) => {
    if (!req.params.userId) {
        throw new BadRequestError("Error")
    }

    try {
        const rooms = await Room.getByUser(Number(req.params.userId))

        res.status(httpStatusCodes.OK).json(rooms)
    } catch (err) {
        throw new InternalServerError("Error")
    }
}
