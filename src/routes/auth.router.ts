import { Router } from "express"

import { login, logout, register } from "controllers"

export const authRouter = Router()

authRouter.post("/login", login)
authRouter.post("/logout", logout)
authRouter.post("/register", register)
