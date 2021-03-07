import {BASE_API_URL} from "../../configs";
import type {HttpResponse} from "./httpResponse";

export class HttpClient {
    // TODO add jwt token
    static async get(relativeUrl: string): Promise<HttpResponse> {
        const response = await fetch(BASE_API_URL + relativeUrl)

        return {
            statusCode: response.status,
            content: (await response.json())
        }
    }

    static async post(relativeUrl: string, data: Object): Promise<HttpResponse> {
        const response = await fetch(BASE_API_URL + relativeUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
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
}
