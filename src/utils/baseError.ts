export class BaseError extends Error {
    readonly name: string;
    readonly message: string;
    readonly statusCode: number;
    readonly isOperational: boolean;
    readonly timestamp: string;

    constructor(
        name: string,
        message: string,
        statusCode: number,
        isOperational: boolean
    ) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.message = message;
        this.statusCode = statusCode;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.timestamp = new Date().toISOString();

        Error.captureStackTrace(this);
    }
}
