import { Router } from "express"

import {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    login,
    logout,
} from "@controllers/user.controller"

export const usersRouter = Router()

usersRouter.get("/api/users/", getUsers)

usersRouter.post("/api/users/login", login)

usersRouter.post("/api/users/logout", logout)

usersRouter.post("/api/users/register", addUser)

usersRouter.route("/api/users/:id").put(updateUser).delete(deleteUser)
