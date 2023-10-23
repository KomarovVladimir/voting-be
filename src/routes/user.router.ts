import { Router } from "express"

import { getUsers, updateUser, deleteUser, getUserRooms } from "controllers"

export const usersRouter = Router()

usersRouter.get("/", getUsers)

usersRouter.route("/:id").put(updateUser).delete(deleteUser)

usersRouter.route("/:userId/rooms").get(getUserRooms)
