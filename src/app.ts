import express from "express"
import fs from "fs"
// import cors from "cors";

// import "./services/db"

export const app = express()

app.use(function (request, response, next) {
    const now = new Date()
    const hour = now.getHours()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()
    const data = `${hour}:${minutes}:${seconds} ${request.method} ${
        request.url
    } ${request.get("user-agent")}`
    console.log(data)
    fs.appendFile("server.log", data + "\n", function () {})
    next()
})

app.get("/", function (request, response) {
    response.send("Hello")
})

const port = 5000
app.listen(port, () => console.log(`Running on port ${port}`))
