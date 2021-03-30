import type {Server} from "../../models/server/server";
import type {CpuUsage} from "../../models/server/cpuUsage";
import {HttpClient} from "../httpClient/httpClient";

export class ServerCpuUsageService {
    static async getCpuUsageOfServer(server: Server, ): Promise<CpuUsage[]> {
        // TODO add with time.
        const cpuUsages = (await HttpClient.get(`servers/${server.id}/cpus`)).content
        return cpuUsages as CpuUsage[]
    }
}
