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

    static async getKeys(): Promise<string[]> {
        const response = await HttpClient.get('api/keys', {})

        if(response.statusCode === 200) {
            return (response.content as any[]).map((key: any) => key.key);
        } else {
            throw httpResponseToLocalException(response)
        }
    }

    static async deleteKey(apiKey: string): Promise<void> {
        const response = await HttpClient.delete('api/keys', {
            key: apiKey
        })

        if(response.statusCode === 200) {
            return;
        } else {
            throw httpResponseToLocalException(response)
        }
    }
}
