import type {Server} from "../../models/server/server";
import {HttpClient} from "../httpClient/httpClient";
import type {PortServer} from "../../models/server/port";

export class ServerPortService {
    static async getPortsOfServer(server: Server): Promise<PortServer[]> {
        const networkAdapters = (await HttpClient.get(`servers/${server.id}/ports`)).content
        return networkAdapters as PortServer[]
    }
}
