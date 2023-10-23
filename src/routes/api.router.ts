import express from "express"

import { verifyToken } from "middleware"

import { privateRouter } from "./private.router"
import { authRouter } from "./auth.router"

export const apiRouter = express.Router()

apiRouter.use("/", authRouter)
apiRouter.use("/", verifyToken, privateRouter)
