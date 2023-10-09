import { Request, Response } from "express"
import { values, some, isNil } from "lodash"

import { Item, IItem } from "@models/item.model"

export const getItems = async (req: Request, res: Response) => {
    try {
        const items = await Item.getAll()

        res.json(items)
    } catch (err) {
        console.error(err)

        res.status(500).send({
            statusCode: 500,
            statusMessage: "Internal Server Error",
        })
    }
}

export const addItem = async (req: Request, res: Response) => {
    if (some(values(req.body), isNil)) {
        return res.status(400).send({
            statusCode: 400,
            statusMessage: "Bad Request",
        })
    }

    try {
        Item.add(req.body)

        res.status(201).send({
            statusCode: 201,
            statusMessage: "Created",
            message: "Successfully created a item.",
        })
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            statusMessage: "Internal Server Error",
        })
    }
}

export const updateItem = async (req: Request, res: Response) => {
    if (some(values(req.body), isNil)) {
        return res.status(400).send({
            statusCode: 400,
            statusMessage: "Bad Request",
        })
    }

    try {
        await Item.updateById(req.body as IItem)

        return res.status(202).send({
            statusCode: 202,
            statusMessage: "Accepted",
            message: "Successfully updated a user.",
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: 500,
            statusMessage: "Internal Server Error",
        })
    }
}

export const deleteItem = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
        await Item.deleteById(id)

        res.send({
            statusCode: 200,
            statusMessage: "Ok",
            message: "Successfully deleted a user.",
        })
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            statusMessage: "Internal Server Error",
        })
    }
}
