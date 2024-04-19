import {Result} from "neverthrow";
import {ParseError} from '~/src/shared/error/ParseError'

export type FailableParser<T, M> = (_: T) => Result<M, ParseError>