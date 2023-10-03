import mysql2 = require("mysql2")
import "dotenv/config.js"

import { dbConfig } from "../config/db.config"

const con = mysql2.createConnection(dbConfig)

const sql = `
    DROP TABLE IF EXISTS test;

    CREATE TABLE test (
        id int NOT NULL auto_increment,
        name varchar(256),
        PRIMARY KEY (id)
    );

    INSERT INTO test (name)
    VALUES
        ("A"),
        ("B"),
        ("C");
        
    SELECT * FROM test;
`

con.connect(function (err) {
    if (err) throw err

    console.log("Connected!")

    con.query(sql, function (err, result) {
        if (err) throw err
        console.log(result)
    })
})
