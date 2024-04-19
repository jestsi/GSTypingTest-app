import type {Quote} from '~/src/modules/speed-typing-test/domains/models/Quote'
import {Result} from "neverthrow";
import type {HttpQuote} from "~/src/modules/speed-typing-test/infrastructure/types/quote/HttpQuote";
import {ParseError} from "~/src/shared/error/ParseError"
import type {IQuote} from "~/src/modules/speed-typing-test/domains/types/IQuote";

export interface IQuoteParser {
    toDomain(data: HttpQuote): Result<Quote, ParseError>
    fromDomain(data: IQuote): Result<HttpQuote, ParseError>
}
