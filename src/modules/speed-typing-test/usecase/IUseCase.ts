import type {Callbacks} from "~/src/modules/speed-typing-test/usecase/types/Callbacks";

export interface IUseCase<T> {
    execute(params: any, callbacks: Callbacks<T>): void
}
