import { Request, Response } from "express"
import { values, some, isNil } from "lodash"

import { Item } from "@models/item.model"
import { httpStatusCodes } from "@common/httpStatusCodes"
import { InternalServerError } from "@utils/internalServerError"
import { BadRequestError } from "@utils/badRequestError"
import { ItemData } from "types"

export const getItems = async (req: Request, res: Response) => {
    try {
        const items = await Item.getByRoomId(req.params.roomId)

        res.status(httpStatusCodes.OK).json(items)
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

export const addItem = async (req: Request, res: Response) => {
    if (isNil(req.body.name)) {
        throw new BadRequestError("Error")
    }

    try {
        await Item.add({
            roomId: Number(req.params.roomId),
            name: req.body.name,
        })

        res.status(httpStatusCodes.CREATED).json({
            message: "Successfully created an item.",
        })
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

export const updateItem = async (req: Request, res: Response) => {
    if (some(values(req.body), isNil)) {
        throw new BadRequestError("Error")
    }

    try {
        await Item.updateById(req.body as ItemData)

        return res.status(httpStatusCodes.ACCEPTED).json({
            message: "Successfully updated a user.",
        })
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

export const deleteItem = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
        await Item.deleteById(id)

        res.status(httpStatusCodes.OK).json({
            message: "Successfully deleted an item.",
        })
    } catch (err) {
        throw new InternalServerError("Error")
    }
}

//TODO: Rename
export const getVotingData = async (req: Request, res: Response) => {
    if (some(values(req.body), isNil)) {
        throw new BadRequestError("Error")
    }

    try {
        const params = {
            roomId: Number(req.params.roomId),
            userId: Number(req.params.userId),
        }

        const votes = await Item.getVotingData(params)

        res.status(httpStatusCodes.OK).json(votes)
    } catch (err) {
        throw new InternalServerError("Error")
    }
}
