import { Request, Response } from "express"
import { values, some, isNil } from "lodash"
import { compareSync, genSaltSync, hashSync } from "bcrypt"
import jsonwebtoken from "jsonwebtoken"

import { Room, User } from "models"
import { httpStatusCodes } from "common"
import { UnauthorizedError, BadRequestError } from "utils"
import { UserData } from "types"

//TODO: Work on responses
export const getUsers = async (req: Request, res: Response) => {
    const users = await User.getAll()

    res.status(httpStatusCodes.OK).json(users)
}

//TODO: Update the validation
export const register = async (req: Request, res: Response) => {
    if (some(values(req.body), isNil)) {
        throw new BadRequestError("Error")
    }

    const { email, firstName, lastName } = req.body
    let { password } = req.body

    const salt = genSaltSync(10)
    password = hashSync(password, salt)

    const user = await User.insert({
        email,
        password,
        firstName,
        lastName,
    } as UserData)

    const token = jsonwebtoken.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: "30m",
    })

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(Number(new Date()) + 30 * 60 * 1000),
    })
        .status(httpStatusCodes.CREATED)
        .json({
            token,
            message: "Successfully created a user",
        })
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

//TODO: Properly type query results
//TODO: Update error handling
export const login = async (
    req: Request<never, never, Pick<UserData, "email" | "password">>,
    res: Response
) => {
    if (some(values(req.body), isNil)) {
        throw new BadRequestError("Error")
    }

    const { email, password } = req.body

    const user = await User.findByEmail(email)

    if (!user) {
        throw new UnauthorizedError("Error", "Wrong email or password")
    }

    const isValidPassword = compareSync(password, user.password)

    if (isValidPassword) {
        user.password = undefined
        const token = jsonwebtoken.sign({ user }, process.env.SECRET_KEY, {
            expiresIn: "30m",
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: new Date(Number(new Date()) + 30 * 60 * 1000),
        })
            .status(httpStatusCodes.OK)
            .json({
                token,
                id: user.id,
                email: user.email,
            })
    } else {
        throw new UnauthorizedError("Error", "Wrong email or password")
    }
}

export const logout = async (req: Request, res: Response) => {
    res.status(httpStatusCodes.OK).json({
        message: "Successfully logged out",
    })
}

export const getUserRooms = async (req: Request, res: Response) => {
    if (!req.params.userId) {
        throw new BadRequestError("Error")
    }

    const rooms = await Room.getByUser(Number(req.params.userId))

    res.status(httpStatusCodes.OK).json(rooms)
}
