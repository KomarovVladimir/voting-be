import { Request, Response } from "express"
import { values, some, isNil } from "lodash"

import { IUser, User } from "@models/user.model"
import { httpStatusCodes } from "@common/httpStatusCodes"

//TODO: Work on responses
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.getAll()

        res.send({
            statusCode: httpStatusCodes.OK,
            statusMessage: "Ok",
            message: "Successfully retrieved all the users.",
        }).json(users)
    } catch (err) {
        console.error(err)

        res.status(httpStatusCodes.INTERNAL_SERVER).send({
            statusCode: httpStatusCodes.INTERNAL_SERVER,
            statusMessage: "Internal Server Error",
        })
    }
}

export const addUser = async (req: Request, res: Response) => {
    if (some(values(req.body), isNil)) {
        return res.status(httpStatusCodes.BAD_REQUEST).send({
            statusCode: httpStatusCodes.BAD_REQUEST,
            statusMessage: "Bad Request",
        })
    }

    const { email, password, firstName, lastName } = req.body

    try {
        User.add({ email, password, firstName, lastName } as IUser)

        res.status(201).send({
            statusCode: 201,
            statusMessage: "Created",
            message: "Successfully created a user.",
        })
    } catch (err) {
        res.status(httpStatusCodes.INTERNAL_SERVER).send({
            statusCode: httpStatusCodes.INTERNAL_SERVER,
            statusMessage: "Internal Server Error",
        })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id, email, password, firstName, lastName } = req.body

    if (some(values(req.body), isNil)) {
        return res.status(httpStatusCodes.BAD_REQUEST).send({
            statusCode: httpStatusCodes.BAD_REQUEST,
            statusMessage: "Bad Request",
        })
    }

    try {
        await User.updateById({
            id,
            email,
            password,
            firstName,
            lastName,
        } as IUser)

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

export const deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
        await User.deleteById(id)

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

export const login = async (
    req: Request<never, never, Pick<IUser, "email" | "password">>,
    res: Response
) => {
    try {
        const { email, password } = req.body
        const user = (await User.findByEmail(email)) as IUser

        if (user.password === password) {
            res.json(user)
        } else {
            res.status(401).send({
                statusCode: 401,
                statusMessage: "Wrong password.",
            })
        }
    } catch (err) {
        console.error(err)

        res.status(httpStatusCodes.INTERNAL_SERVER).send({
            statusCode: httpStatusCodes.INTERNAL_SERVER,
            statusMessage: "Internal Server Error",
        })
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.send({
            statusCode: httpStatusCodes.OK,
            statusMessage: "Ok",
            message: "Successfully logged out.",
        })
    } catch (err) {
        console.error(err)

        res.status(httpStatusCodes.INTERNAL_SERVER).send({
            statusCode: httpStatusCodes.INTERNAL_SERVER,
            statusMessage: "Internal Server Error",
        })
    }
}
