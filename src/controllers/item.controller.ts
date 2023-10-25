import { Request, Response } from "express";
import { values, some, isNil } from "lodash";

import { Item } from "models";
import { httpStatusCodes } from "common";
import { BadRequestError, getUserId } from "utils";
import { ItemData } from "types";

export const addItem = async (req: Request, res: Response) => {
    if (isNil(req.body.name)) {
        throw new BadRequestError("Error");
    }

    await Item.add({
        roomId: +req.params.roomId,
        name: req.body.name,
    });

    res.status(httpStatusCodes.CREATED).json({
        message: "Successfully created an item",
    });
};

export const updateItem = async (req: Request, res: Response) => {
    if (some(values(req.body), isNil)) {
        throw new BadRequestError("Error");
    }

    await Item.updateById(req.body as ItemData);

    return res.status(httpStatusCodes.ACCEPTED).json({
        message: "Successfully updated a user",
    });
};

export const deleteItem = async (req: Request, res: Response) => {
    const id = +req.params.id;

    await Item.deleteById(id);

    res.status(httpStatusCodes.OK).json({
        message: "Successfully deleted an item",
    });
};

//TODO: Rename
export const getItems = async (req: Request, res: Response) => {
    if (some(values(req.body), isNil)) {
        throw new BadRequestError("Error");
    }

    const params = {
        roomId: +req.params.roomId,
        userId: getUserId(req),
    };

    const votes = await Item.getByRoomId(params);

    res.status(httpStatusCodes.OK).json(votes);
};
