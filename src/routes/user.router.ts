import { Router } from "express"

import {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
} from "@controllers/user.controller"

export const usersRouter = Router()

usersRouter.get("/", getUsers)

usersRouter.post("/", addUser)

usersRouter.route("/:id").put(updateUser).delete(deleteUser)
