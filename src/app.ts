import "module-alias/register";
import express from "express";
import cors from "cors";
import "express-async-errors";
import cookieParser from "cookie-parser";

//TODO: Update imports
import { isOperationalError, logError } from "utils";
import { errorLogger, errorHandler } from "middleware";
import { apiRouter } from "routes";

process.on("uncaughtException", (err) => {
    logError(err);

    if (!isOperationalError(err)) {
        process.exit(1);
    }
});

process.on("unhandledRejection", (err) => {
    throw err;
});

//TODO: Update the cors
const port = process.env.PORT;
export const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(cookieParser());

app.use("/api/v1", apiRouter);

app.use(errorLogger);
app.use(errorHandler);

app.listen(port, () => console.log(`Running on port ${port}`));
