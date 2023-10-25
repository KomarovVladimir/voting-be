import { BaseError } from "./baseError";

export function isOperationalError(err: Error | BaseError) {
    if (err instanceof BaseError) {
        return err.isOperational;
    }

    return false;
}
