import type {Server} from "../../models/server";
import {HttpClient} from "../httpClient/httpClient";

export class ServerService {
    /**
     * Gets the servers of the current logged in user
     */
    static async getUserServers(): Promise<Server[]> {
        const servers = (await HttpClient.get('servers')).content
        return servers as Server[]
    }
}
