import "module-alias/register"
import express from "express"

import { usersRouter } from "@routes/user.router"

export const app = express()

app.use("/api/users", usersRouter)

const port = 5000
app.listen(port, () => console.log(`Running on port ${port}`))
