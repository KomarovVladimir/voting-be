import express from "express";

import "./db.ts";

const app = express();
const port = 5000;

app.get("/", (request, response) => {
    response.send("Hello world!");
});

app.listen(port, () => console.log(`Running on port ${port}`));
