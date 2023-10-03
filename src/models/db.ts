import mysql = require("mysql2")
import "dotenv/config.js"

import { dbConfig } from "../config/db.config"

export const connection = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
})
