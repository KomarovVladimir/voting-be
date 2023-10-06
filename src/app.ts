import express from "express"
import mysql2 = require("mysql2")
import "dotenv/config.js"
// import fs from "fs"
// import cors from "cors";

import { dbConfig } from "./config/db.config"

// import "./services/db"

export const app = express()

const jsonParser = express.json()

const sql = `   
    SELECT * FROM user
    WHERE first_name = "Name";
`

app.get("/login", jsonParser, function (request, response) {
    if (!request.body) return response.sendStatus(400)

    const con = mysql2.createConnection(dbConfig)

    con.connect(function (err) {
        if (err) throw err

        console.log("Connected!")

        con.query(sql, function (err, result) {
            if (err) {
                throw err
            }

            console.log(result)
            response.json(result)
        })
    })
})

app.get("/", function (request, response) {
    response.sendFile(process.cwd() + "/register.html")
})

const port = 5000
app.listen(port, () => console.log(`Running on port ${port}`))
