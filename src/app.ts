import "module-alias/register"
import express from "express"
import cors from "cors"
import "express-async-errors"
import cookieParser from "cookie-parser"

import {
    errorHandler,
    isOperationalError,
    logError,
    logErrorMiddleware,
} from "@utils/errorHandler"
import { apiRouter } from "@routes/apiRouter"

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

app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:3000",
        // credentials: true,
    })
)
apiRouter.use(cookieParser())

app.use("/api/v1", apiRouter)

app.use(logErrorMiddleware)
app.use(errorHandler)

const port = process.env.PORT
app.listen(port, () => console.log(`Running on port ${port}`))
