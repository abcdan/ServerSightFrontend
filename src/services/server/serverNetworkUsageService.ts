import type {Server} from "../../models/server/server";
import type {CpuUsage} from "../../models/server/cpuUsage";
import {HttpClient} from "../httpClient/httpClient";
import type {CreatedBetweenDTO} from "../../dto/createdBetweenDTO";
import {parseCreatedBetweenToIsoString} from "../util/parseCreatedBetween";

export class ServerNetworkUsageService {
    /**
     * Gets the network usage from a given server withing a certain time range.
     * Every cpu usage in the list will be the CPU usage of every minute
     */
    static async getNetworkUsageOfServer(server: Server, timeBetween: CreatedBetweenDTO): Promise<CpuUsage[]> {
        const networkUsagesObj = (await HttpClient.get(`servers/${server.id}/network-usages`, parseCreatedBetweenToIsoString(timeBetween))).content
        const networkUsages = networkUsagesObj as CpuUsage[]
        // convert all the dates correctly.
        networkUsages.map((networkUsage) => networkUsage.createdAt = new Date(networkUsage.createdAt))
        return networkUsages
    }
}
