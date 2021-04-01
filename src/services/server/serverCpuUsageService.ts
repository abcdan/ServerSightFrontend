import type {Server} from "../../models/server/server";
import type {CpuUsage} from "../../models/server/cpuUsage";
import {HttpClient} from "../httpClient/httpClient";
import type {CreatedBetweenDTO} from "../../dto/createdBetweenDTO";
import {parseCreatedBetweenToIsoString} from "../util/parseCreatedBetween";

export class ServerCpuUsageService {
    /*
    Gets the cpu usage from a given server withing a certain time range.
    Every cpu usage in the list will be the CPU usage of every minute
     */
    static async getCpuUsageOfServer(server: Server, timeBetween: CreatedBetweenDTO): Promise<CpuUsage[]> {
        const cpuUsagesObj = (await HttpClient.get(`servers/${server.id}/cpus`, parseCreatedBetweenToIsoString(timeBetween))).content
        const cpuUsages = cpuUsagesObj as CpuUsage[]
        // convert all the dates correctly.
        cpuUsages.map((cpuUsage) => cpuUsage.createdAt = new Date(cpuUsage.createdAt))
        return cpuUsages
    }
}
