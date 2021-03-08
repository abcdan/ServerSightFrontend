import type {Server} from "../../models/server";
import {HttpClient} from "../httpClient/httpClient";

export class ServerService {
    /**
     * Gets the servers of the current logged in user
     */
    static async getUserServers(searchQuery?: { title: string, powerstatus: boolean}): Promise<Server[]> {
        const servers = (await HttpClient.get('servers', searchQuery)).content
        return servers as Server[]
    }
}
