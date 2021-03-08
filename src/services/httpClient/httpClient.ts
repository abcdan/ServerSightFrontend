import {BASE_API_URL} from "../../configs";
import type {HttpResponse} from "./httpResponse";
import {Jwt} from "../auth/jwt";

export class HttpClient {
    static async get(relativeUrl: string): Promise<HttpResponse> {
        const response = await fetch(BASE_API_URL + relativeUrl, {
            headers: this._getHeaders(),
        })

        return {
            statusCode: response.status,
            content: (await response.json())
        }
    }

    static async post(relativeUrl: string, data: Object): Promise<HttpResponse> {
        const response = await fetch(BASE_API_URL + relativeUrl, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify(data)
        })

        try {
            return {
                statusCode: response.status,
                content: (await response.json())
            }
        } catch (ignored) {
            // if failed to parse json
            return {
                statusCode: response.status,
                content: {}
            }
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
