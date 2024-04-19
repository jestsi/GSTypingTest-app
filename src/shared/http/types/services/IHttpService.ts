import type {IHttpRequest} from "~/src/shared/http/types/IHttpRequest";
import type {Parser} from "~/src/shared/http/types/parser/Parser";
import type {IHttpError} from "~/src/shared/http/types/IHttpError";
import {Result} from "neverthrow";
import {ParseError} from "~/src/shared/error/ParseError";

export interface IHttpService {
    get<T, M>(request: IHttpRequest, parser: Parser<T, M>): Promise<Result<M, ParseError | IHttpError>>
    initService(baseUrl: string): void
}
