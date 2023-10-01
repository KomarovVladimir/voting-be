export class AppError extends Error {
    statusCode: string;
    error: "fail" | "error";
    isOperational: boolean;

    constructor(message: string, statusCode: string) {
        super(message);

        this.statusCode = statusCode;
        this.error = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
