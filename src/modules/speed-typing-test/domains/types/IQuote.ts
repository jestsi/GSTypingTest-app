import type {IQuoteData} from "./IQuoteData"

export interface IQuote extends IQuoteData {
    validate(data: IQuoteData): boolean
}