import type {IHttpService} from "~/src/shared/http/types/services/IHttpService";
import type {IQuoteResponse} from "~/src/modules/speed-typing-test/infrastructure/types/quote/IQuoteResponse";
import {ParseError} from "~/src/shared/error/ParseError"
import {QuoteParser} from "~/src/modules/speed-typing-test/infrastructure/parsers/quote/QuoteParser";
import type {IQuoteParser} from "~/src/modules/speed-typing-test/infrastructure/types/quote/IQuoteParser";
import type {IQuote} from "~/src/modules/speed-typing-test/domains/types/IQuote";
import {Result} from "neverthrow";

export class TypingApiService {
    private parser: IQuoteParser;
    @inject() private httpService: IHttpService;

    constructor(httpService: IHttpService) {
        this.parser = new QuoteParser();
        this.httpService = httpService;
        this.httpService.initService('https://fish-text.ru/get')
    }

    async getQuotes(): Promise<Result<IQuote, ParseError>> {
        const parseTo = (quote: IQuoteResponse) => {
            return this.parser.toDomain(quote);
        }

        return await this.httpService.get<IQuoteResponse, IQuote>(
            {url: '/number/3'},
            { parseTo }
        );
    }
}