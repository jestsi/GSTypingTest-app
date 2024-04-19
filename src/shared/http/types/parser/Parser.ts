import type {FailableParser} from "~/src/shared/http/types/parser/FailableParser";

export type Parser<T, M> = {
    parseTo: FailableParser<T, M>
}
