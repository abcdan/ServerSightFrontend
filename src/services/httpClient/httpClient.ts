import {BASE_API_URL} from "../../configs";
import type {HttpResponse} from "./httpResponse";
import {Jwt} from "../auth/jwt";
import {httpResponseStore} from "../../stores/httpResponseStore";

export class HttpClient {
    static async get(relativeUrl: string, params?: any, disableLog = false): Promise<HttpResponse> {
        const url = new URL(BASE_API_URL + relativeUrl)
        url.search = new URLSearchParams(params).toString()

        const response = await fetch(url.toString(), {
            headers: this._getHeaders(),
        })
        try {
            const httpResponse = {
                statusCode: response.status,
                content: (await response.json())
            }

            if(!disableLog) httpResponseStore.addResponse(httpResponse)

            return httpResponse
        } catch (ignored) {
            const httpResponse = {
                statusCode: response.status,
                content: {}
            }

            if(!disableLog) httpResponseStore.addResponse(httpResponse)

            return httpResponse
        }

    }

    static async post(relativeUrl: string, data: Object, disableLog: boolean = false): Promise<HttpResponse> {
        const response = await fetch(BASE_API_URL + relativeUrl, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify(data)
        })

        try {
            const httpResponse = {
                statusCode: response.status,
                content: (await response.json())
            }
            if(!disableLog) httpResponseStore.addResponse(httpResponse)

            return httpResponse
        } catch (ignored) {
            // if failed to parse json
            const httpResponse = {
                statusCode: response.status,
                content: {}
            }
            if(!disableLog) httpResponseStore.addResponse(httpResponse)

            return httpResponse
        }
    }

    static async put(relativeUrl: string, data: Object): Promise<HttpResponse> {
        const response = await fetch(BASE_API_URL + relativeUrl, {
            method: 'PUT',
            headers: this._getHeaders(),
            body: JSON.stringify(data)
        })

        try {
            const httpResponse = {
                statusCode: response.status,
                content: (await response.json())
            }
            httpResponseStore.addResponse(httpResponse)
            return httpResponse
        } catch (ignored) {
            // if failed to parse json
            const httpResponse = {
                statusCode: response.status,
                content: {}
            }
            httpResponseStore.addResponse(httpResponse)
            return httpResponse
        }
    }

    static async delete(relativeUrl: string): Promise<HttpResponse> {
        const response = await fetch(BASE_API_URL + relativeUrl, {
            method: 'DELETE',
            headers: this._getHeaders(),
        })

        try {
            const httpResponse = {
                statusCode: response.status,
                content: (await response.json())
            }
            httpResponseStore.addResponse(httpResponse)
            return httpResponse
        } catch (ignored) {
            // if failed to parse json
            const httpResponse = {
                statusCode: response.status,
                content: {}
            }
            httpResponseStore.addResponse(httpResponse)
            return httpResponse
        }
    }

    static async uploadFile(relativeUrl: string, httpMethod: "PUT" | "POST", file, params?: any) {
        const formData = new FormData();
        formData.append('file', file);

        const url = new URL(BASE_API_URL + relativeUrl)
        url.search = new URLSearchParams(params).toString()

        const response = await fetch(url.toString(), {
            headers: {
                'Authorization': this._getHeaders()['Authorization']
            },
            method: httpMethod,
            body: formData
        })

        return {
            statusCode: response.status,
        }
    }

    private static _getHeaders() {
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        const jwtToken = Jwt.getJwt()
        if(jwtToken) {
            headers['Authorization'] = `Bearer ${jwtToken}`
        }

        return headers
    }
}
