import type {AxiosRequestConfig} from "axios";

export type IHttpRequest = {
    url: string
    config?: AxiosRequestConfig
    data?: any
}