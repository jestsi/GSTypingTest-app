import {HttpStatusCode} from './enums/HttpStatusCode';
import type {IHttpError} from "~/src/shared/http/types/IHttpError";

export class HttpError extends Error implements IHttpError {
    public status: number

    constructor(status: number, message?: string) {
        super(message)

        Object.setPrototypeOf(this, HttpError.prototype)

        this.status = status
        this.name = HttpStatusCode[status]
        this.message = message || HttpStatusCode[status]
    }

    public isClientError(): boolean {
        return this.status >= 400 && this.status <= 499
    }

    public isServerError(): boolean {
        return this.status >= 500 && this.status <= 599
    }

    public static fromStatus(status: number, message?: string) {
        return new this(status, message)
    }
}

export const isHttpError = (e: Error): e is HttpError => {
    return Number.isInteger((e as HttpError).status)
}
