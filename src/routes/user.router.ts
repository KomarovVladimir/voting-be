import { Router } from "express"

import {
    getUsers,
    register,
    updateUser,
    deleteUser,
    login,
    logout,
    getUserRooms,
} from "controllers"

export const usersRouter = Router()

usersRouter.get("/", getUsers)

usersRouter.post("/login", login)

usersRouter.post("/logout", logout)

usersRouter.post("/register", register)

usersRouter.route("/:id").put(updateUser).delete(deleteUser)

usersRouter.route("/:userId/rooms").get(getUserRooms)
