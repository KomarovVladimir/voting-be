import { Request, Response } from "express";
import { values, some, isNil } from "lodash";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "models";
import { httpStatusCodes } from "common";
import { UnauthorizedError, BadRequestError } from "utils";
import { UserData } from "types";

//TODO: Update the validation
export const register = async (req: Request, res: Response) => {
    if (some(values(req.body), isNil)) {
        throw new BadRequestError("Error");
    }

    const { email, firstName, lastName } = req.body;
    let { password } = req.body;

    const salt = genSaltSync(10);
    password = hashSync(password, salt);

    const user = await User.insert({
        email,
        password,
        firstName,
        lastName,
    } as UserData);

    const token = jwt.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: "30m",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(Number(new Date()) + 30 * 60 * 1000),
    });

    res.status(httpStatusCodes.CREATED).json({
        message: "Successfully created a user",
    });
};

//TODO: Properly type query results
//TODO: Update error handling
export const login = async (
    req: Request<never, never, Pick<UserData, "email" | "password">>,
    res: Response
) => {
    if (some(values(req.body), isNil)) {
        throw new BadRequestError("Error");
    }

    const { email, password } = req.body;

    const user = await User.findByEmail(email);

    if (!user) {
        throw new UnauthorizedError("Error", "Wrong email or password");
    }

    const isValidPassword = compareSync(password, user.password);

    if (isValidPassword) {
        delete user.password;

        const token = jwt.sign({ user }, process.env.SECRET_KEY, {
            expiresIn: "30m",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            expires: new Date(Number(new Date()) + 30 * 60 * 1000),
        });
        console.log(token);

        res.status(httpStatusCodes.OK).json({
            id: user.id,
            email: user.email,
        });
    } else {
        throw new UnauthorizedError("Error", "Wrong email or password");
    }
};

export const logout = async (req: Request, res: Response) => {
    if (!req.cookies.token) {
        throw new UnauthorizedError("Error");
    }

    res.cookie("token", null, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });

    res.status(httpStatusCodes.OK).json({
        message: "Successfully logged out",
    });
};
