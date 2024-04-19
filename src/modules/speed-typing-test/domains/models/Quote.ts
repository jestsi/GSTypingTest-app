import type {IQuote} from "~/src/modules/speed-typing-test/domains/types/IQuote";
import type {IQuoteData} from "~/src/modules/speed-typing-test/domains/types/IQuoteData";

export class Quote implements IQuote  {
    text?: string
    constructor(data: IQuoteData) {
        // this.validate(data); //FIXME: REMOVE COMMENT AND ADD VALIDATION
        this.text = data.text;
    }
    validate(data: IQuoteData): boolean {
        throw new Error('Method not implemented.');
    }
}