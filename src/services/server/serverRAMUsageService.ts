import type {Server} from "../../models/server/server";
import {HttpClient} from "../httpClient/httpClient";
import type {CreatedBetweenDTO} from "../../dto/createdBetweenDTO";
import {parseCreatedBetweenToIsoString} from "../util/parseCreatedBetween";
import type {RamUsage} from "../../models/server/ramUsage";

export class ServerRAMUsageService {
    /**
     * Gets the cpu usage from a given server withing a certain time range.
     * Every cpu usage in the list will be the CPU usage of every minute
     */
    static async getRAMUsagesOfServer(server: Server, timeBetween: CreatedBetweenDTO): Promise<RamUsage[]> {
        const ramUsagesObj = (await HttpClient.get(`servers/${server.id}/ram`, parseCreatedBetweenToIsoString(timeBetween))).content
        const ramUsages = ramUsagesObj as RamUsage[]
        // convert all the dates correctly.
        ramUsages.map((ramUsage) => ramUsage.createdAt = new Date(ramUsage.createdAt))
        return ramUsages
    }
}
