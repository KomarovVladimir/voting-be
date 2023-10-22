import express from "express"

import { usersRouter } from "./user.router"
import { roomsRouter } from "./room.router"

export const apiRouter = express.Router()

apiRouter.use("/users", usersRouter)
apiRouter.use("/rooms", roomsRouter)
