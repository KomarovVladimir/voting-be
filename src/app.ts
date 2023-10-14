import "module-alias/register"
import express from "express"
import cors from "cors"
import "express-async-errors"

import { usersRouter } from "@routes/user.router"
import { roomsRouter } from "@routes/room.router"
import {
    errorHandler,
    isOperationalError,
    logError,
    logErrorMiddleware,
} from "@utils/errorHandler"

//TODO: Update the cors
export const app = express()

process.on("uncaughtException", (err) => {
    logError(err)

    if (!isOperationalError(err)) {
        process.exit(1)
    }
})

process.on("unhandledRejection", (err) => {
    throw err
})

app.use(
    cors({
        origin: "*",
    })
)

app.use(express.json())

app.use(usersRouter)
app.use(roomsRouter)

app.use(logErrorMiddleware)
app.use(errorHandler)

const port = 5000
app.listen(port, () => console.log(`Running on port ${port}`))
