import {HttpClient} from "../httpClient/httpClient";
import {httpResponseToLocalException} from "../httpClient/httpExceptionHandler";

export class ApiKeyService
{
    static async setKey(): Promise<string> {
        const response = await HttpClient.put('api/keys', {})

        if(response.statusCode === 200) {
            return (response.content as any).key;
        } else {
            throw httpResponseToLocalException(response)
        }
    }

    static async getKey(): Promise<string> {
        const response = await HttpClient.get('api/keys', {})

        if(response.statusCode === 200) {
            return (response.content as any).key;
        } else {
            throw httpResponseToLocalException(response)
        }
    }

    static async deleteKey(): Promise<void> {
        const response = await HttpClient.delete('api/keys')

        if(response.statusCode === 200) {
            return;
        } else {
            throw httpResponseToLocalException(response)
        }
    }
}
