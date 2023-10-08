import { Request, Response } from "express"
import { values, some, isNil } from "lodash"

import { IUser, User } from "@models/user.model"

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.getAll()

        res.send({
            statusCode: 200,
            statusMessage: "Ok",
            message: "Successfully retrieved all the users.",
            data: users,
        })
    } catch (err) {
        console.error(err)

        res.status(500).send({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: null,
            data: null,
        })
    }
}

export const addUser = async (req: Request, res: Response) => {
    if (some(values(req.body), isNil)) {
        return res.status(400).send({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: null,
            data: null,
        })
    }

    const { email, password, firstName, lastName } = req.body

    try {
        User.add({ email, password, firstName, lastName } as IUser)

        res.status(201).send({
            statusCode: 201,
            statusMessage: "Created",
            message: "Successfully created a user.",
            data: null,
        })
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: null,
            data: null,
        })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id, email, password, firstName, lastName } = req.body

    if (some(values(req.body), isNil)) {
        return res.status(400).send({
            statusCode: 400,
            statusMessage: "Bad Request",
            message: null,
            data: null,
        })
    }

    try {
        await User.updateById(id, {
            email,
            password,
            firstName,
            lastName,
        } as IUser)

        return res.status(202).send({
            statusCode: 202,
            statusMessage: "Accepted",
            message: "Successfully updated a user.",
            data: null,
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: null,
            data: null,
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
        await User.deleteById(id)

        res.send({
            statusCode: 200,
            statusMessage: "Ok",
            message: "Successfully deleted a user.",
            data: null,
        })
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: null,
            data: null,
        })
    }
}

export const login = async (
    req: Request<never, never, Pick<IUser, "email" | "password">>,
    res: Response
) => {
    try {
        const { email, password } = req.body
        const user = await User.findByEmail(email)

        console.log(user.password == password)

        if (user.password === password) {
            res.send({
                statusCode: 200,
                statusMessage: "Ok",
                message: "Successfully logged in.",
                data: user,
            })
        } else {
            res.status(401).send({
                statusCode: 401,
                statusMessage: "Wrong password.",
                message: null,
                data: null,
            })
        }
    } catch (err) {
        console.error(err)

        res.status(500).send({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: null,
            data: null,
        })
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        res.send({
            statusCode: 200,
            statusMessage: "Ok",
            message: "Successfully logged out.",
        })
    } catch (err) {
        console.error(err)

        res.status(500).send({
            statusCode: 500,
            statusMessage: "Internal Server Error",
            message: null,
            data: null,
        })
    }
}
