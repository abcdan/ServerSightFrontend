import type {NetworkAdapterServer} from "../../models/server/networkAdapter";
import type {Server} from "../../models/server/server";
import {HttpClient} from "../httpClient/httpClient";

export class ServerNetworkAdapterService {
    static async getNetworkAdaptersOfServer(server: Server): Promise<NetworkAdapterServer[]> {
        const networkAdapters = (await HttpClient.get(`servers/${server.id}/ips`)).content
        return networkAdapters as NetworkAdapterServer[]
    }
}
