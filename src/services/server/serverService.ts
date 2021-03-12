import type {Server} from "../../models/server";
import {HttpClient} from "../httpClient/httpClient";
import {Jwt} from "../auth/jwt";
import {httpResponseToLocalException} from "../httpClient/httpExceptionHandler";
import {ServerNotFound} from "./errors/ServerNotFound";

export class ServerService {
    /**
     * Gets the servers of the current logged in user
     */
    static async getUserServers(searchQuery?: { name: string, powerstatus: boolean}): Promise<Server[]> {
        const servers = (await HttpClient.get('servers', searchQuery)).content
        return servers as Server[]
    }

    static async getServer(serverId: string): Promise<Server> {
        try {
            const servers = (await HttpClient.get(`servers/${serverId}`)).content

            return servers as Server
        } catch (ignored) {
            throw new ServerNotFound(`Server with ${serverId} not found.`)
        }
    }

    static async saveSaver(server: Server, serverFile?: File): Promise<Server> {
        const response = await HttpClient.post('servers', server)

        const createdServer = response.content as Server

        if(response.statusCode === 200) {
            if(serverFile) {
                await HttpClient.uploadFile(
                    `servers/image/${createdServer.id}`, "PUT", serverFile
                )
            }

            return createdServer
        }
         else {
            throw httpResponseToLocalException(response)
        }
    }
}
