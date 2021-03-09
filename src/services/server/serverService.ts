import type {Server} from "../../models/server";
import {HttpClient} from "../httpClient/httpClient";
import {Jwt} from "../auth/jwt";
import {httpResponseToLocalException} from "../httpClient/httpExceptionHandler";

export class ServerService {
    /**
     * Gets the servers of the current logged in user
     */
    static async getUserServers(searchQuery?: { name: string, powerstatus: boolean}): Promise<Server[]> {
        const servers = (await HttpClient.get('servers', searchQuery)).content
        return servers as Server[]
    }

    static async saveSaver(server: Server): Promise<Server> {
        const response = await HttpClient.post('servers', server)

        if(response.statusCode === 201) {
            return response.content as Server
        } else {
            throw httpResponseToLocalException(response)
        }
    }
}
