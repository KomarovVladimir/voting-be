import { Router } from "express"

import { usersRouter } from "./user.router"
import { roomsRouter } from "./room.router"

export const privateRouter = Router()

privateRouter.use("/users", usersRouter)
privateRouter.use("/rooms", roomsRouter)
