import axios, {type AxiosInstance} from "axios";
import type {IAxiosCreator} from "~/src/shared/http/types/IAxiosCreator";

export class AxiosCreator implements IAxiosCreator {
    createAxiosInstance(baseUrl: string): AxiosInstance {
        return axios.create({
            baseURL: baseUrl,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}
