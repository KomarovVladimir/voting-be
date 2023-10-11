import { Request, Response } from "express"
import { values, some, isNil } from "lodash"

import { Item, IItem } from "@models/item.model"

export const getItems = async (req: Request, res: Response) => {
    try {
        const items = await Item.getAll(req.params.roomId)

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
    if (isNil(req.body.name)) {
        return res.status(400).send({
            statusCode: 400,
            statusMessage: "Bad Request",
        })
    }

    try {
        Item.add({
            roomId: Number(req.params.roomId),
            name: req.body.name,
        })

        res.status(201).send({
            statusCode: 201,
            statusMessage: "Created",
            message: "Successfully created an item.",
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
            message: "Successfully deleted an item.",
        })
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            statusMessage: "Internal Server Error",
        })
    }
}
