import "module-alias/register"
import express from "express"
import cors from "cors"

import { usersRouter } from "@routes/user.router"

export const app = express()

//TODO: Update the cors
app.use(
    cors({
        origin: "*",
    })
)

app.use(express.json())

app.use("/api/users", usersRouter)

const port = 5000
app.listen(port, () => console.log(`Running on port ${port}`))
