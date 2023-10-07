import mysql = require("mysql2/promise")
import "dotenv/config.js"

import { dbConfig } from "@config/db.config"

export const pool = mysql.createPool(dbConfig)

const connectToMySQL = async () => {
    try {
        await pool.getConnection()

        console.log("MySQL database connected!")
    } catch (err) {
        console.log("MySQL database connection error!")

        process.exit(1)
    }
}

connectToMySQL().then()
