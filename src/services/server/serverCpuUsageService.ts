import type {Server} from "../../models/server/server";
import type {CpuUsage} from "../../models/server/cpuUsage";
import {HttpClient} from "../httpClient/httpClient";
import type {CreatedBetweenDTO} from "../../dto/createdBetweenDTO";
import {parseCreatedBetweenToIsoString} from "../util/parseCreatedBetween";

export class ServerCpuUsageService {
    static async getCpuUsageOfServer(server: Server, timeBetween: CreatedBetweenDTO): Promise<CpuUsage[]> {
        console.log(parseCreatedBetweenToIsoString(timeBetween))
        const cpuUsages = (await HttpClient.get(`servers/${server.id}/cpus`, parseCreatedBetweenToIsoString(timeBetween))).content
        return cpuUsages as CpuUsage[]
    }
}
