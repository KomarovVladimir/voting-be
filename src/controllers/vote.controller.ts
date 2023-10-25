import { Request, Response } from "express";
import { values, some, isNil } from "lodash";

import { httpStatusCodes } from "common";
import { BadRequestError, getUserId } from "utils";
import { Vote } from "models";

export const vote = async (req: Request, res: Response) => {
    if (some(values(req.params), isNil)) {
        throw new BadRequestError("Error");
    }

    const params = {
        roomId: +req.params.roomId,
        itemId: +req.params.itemId,
        userId: getUserId(req),
    };

    const rooms = await Vote.add(params);

    res.status(httpStatusCodes.OK).json(rooms);
};

export const downvote = async (req: Request, res: Response) => {
    if (some(values(req.params), isNil)) {
        throw new BadRequestError("Error");
    }

    const params = {
        roomId: +req.params.roomId,
        itemId: +req.params.itemId,
        userId: getUserId(req),
    };

    const rooms = await Vote.delete(params);

    res.status(httpStatusCodes.OK).json(rooms);
};
