import {Result} from "neverthrow";
import type {IQuoteData} from "~/src/modules/speed-typing-test/domains/types/IQuoteData";
import {ParseError} from "~/src/shared/error/ParseError"
import {HttpError} from "~/src/shared/http";

export interface ITaskRepository {
    getOne(): Promise<Result<IQuoteData, ParseError | HttpError>>
}
