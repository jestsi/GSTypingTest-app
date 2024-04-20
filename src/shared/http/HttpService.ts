import type {IHttpService} from "~/src/shared/http/types/services/IHttpService";
import axios, {type AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig} from "axios";
import type {IHttpRequest} from "~/src/shared/http/types/IHttpRequest";
import type {FailableParser} from "~/src/shared/http/types/parser/FailableParser";
import type {Parser} from "~/src/shared/http/types/parser/Parser";
import {ParseError} from "~/src/shared/error/ParseError";
import {err, Result} from "neverthrow";
import {HttpError} from "~/src/shared/http/HttpError";
import type {AxiosCreator} from "~/src/shared/http/AxiosCreator";
import {inject, injectable} from "inversify-props";

@injectable()
export class HttpService implements IHttpService {
    private axiosService: AxiosInstance
    @inject() private axiosCreator: AxiosCreator

    constructor(axiosCreator: AxiosCreator) {
        this.axiosCreator = axiosCreator
        this.axiosService = axios.create()

        this._handleRequest = this._handleRequest.bind(this);
        this._handleError = this._handleError.bind(this);
    }

    initService(baseUrl: string) {
        this.axiosService = this.axiosCreator.createAxiosInstance(baseUrl)
        this._initializeRequestInterceptor()
        this._initializeResponseInterceptor()
    }

    public async get<T, M>(
        { url, config }: IHttpRequest,
        parser: Parser<T, M>
    ): Promise<Result<M, ParseError | HttpError>> {
        try {
            const response = await this.axiosService.get<T>(url, config)
            return this._parseFailable<T, M>(response.data, parser.parseTo)
        } catch (error: any) {
            return err(error)
        }
    }

    private _parseFailable<T, M>(
        data: T,
        parser: FailableParser<T, M>
    ): Result<M, ParseError> {
        try {
            return parser(data)
        } catch (error: any) {
            const parseError = new ParseError(error.message)
            return err(parseError)
        }
    }

    private _initializeRequestInterceptor() {
        this.axiosService.interceptors.request.use(
            this._handleRequest,
            this._handleError
        )
    }

    private _initializeResponseInterceptor() {
        this.axiosService.interceptors.response.use(
            (response: AxiosResponse) => response,
            this._handleError
        )
    }

    private _handleRequest(config: InternalAxiosRequestConfig<any>)  {
        return config
    }

    private _handleError(error: AxiosError): HttpError {
        if (error.response) {
            return HttpError.fromStatus(error.response.status, error.message)
        }
        throw error
    }
}

