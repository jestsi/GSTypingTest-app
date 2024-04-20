import {HttpError} from '~/src/shared/http'
import {ParseError} from '~/src/shared/error/ParseError'

// Определите дженерик для типа данных
export type Callbacks<T> = {
    respondWithSuccess(data: T[]): void
    respondWithClientError(error: HttpError): void
    respondWithServerError(error: HttpError): void
    respondWithParseError(error: ParseError): void
}