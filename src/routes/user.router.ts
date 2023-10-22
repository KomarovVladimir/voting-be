import { Router } from "express"

import {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    login,
    logout,
    getUserRooms,
} from "@controllers/user.controller"

export const usersRouter = Router()

usersRouter.get("/", getUsers)

usersRouter.post("/login", login)

usersRouter.post("/logout", logout)

usersRouter.post("/register", addUser)

usersRouter.route("/:id").put(updateUser).delete(deleteUser)

usersRouter.route("/:userId/rooms").get(getUserRooms)
