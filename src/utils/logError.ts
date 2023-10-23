import { BaseError } from "./baseError"

//TODO: Replace with an actual logger
export function logError(err: Error | BaseError) {
    console.error(err)
}
