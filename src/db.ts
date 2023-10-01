import mysql2 from "mysql2";
import "dotenv/config.js";

var con = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true,
});

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
`;

con.connect(function (err) {
    if (err) throw err;

    console.log("Connected!");

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
});
