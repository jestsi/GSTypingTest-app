import type {IQuoteParser} from "~/src/modules/speed-typing-test/infrastructure/types/quote/IQuoteParser";
import type {IQuote} from "~/src/modules/speed-typing-test/domains/types/IQuote";
import {err, ok, Result} from "neverthrow";
import type {HttpQuote} from "~/src/modules/speed-typing-test/infrastructure/types/quote/HttpQuote";
import {ParseError} from "~/src/shared/error/ParseError"
import {Quote} from '~/src/modules/speed-typing-test/domains/models/Quote'
import type {IQuoteData} from "~/src/modules/speed-typing-test/domains/types/IQuoteData";

export class QuoteParser implements IQuoteParser {
    fromDomain(data: IQuote): Result<HttpQuote, ParseError> {
        try {
            const qData: HttpQuote = {
                text: data.text
            }

            return ok(qData);
        } catch (e: any) {
            return err(new ParseError(e.message));
        }
    }

    toDomain(data: HttpQuote): Result<Quote, ParseError> {
        try {
            const qData: IQuoteData = {
                text: data.text
            }
            const quote = new Quote(qData);
            return ok(quote);
        } catch (e: any) {
            return err(new ParseError(e.message));
        }
    }
}