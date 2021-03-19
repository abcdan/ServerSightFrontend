import type {NetworkAdapterServer} from "../../models/server/networkAdapter";
import type {Server} from "../../models/server/server";
import {HttpClient} from "../httpClient/httpClient";
import type {HardDiskServer} from "../../models/server/hardDisk";

export class ServerHardDiskService {
    static async getHardDisksOfServer(server: Server): Promise<HardDiskServer[]> {
        const hardDisks = (await HttpClient.get(`servers/${server.id}/hard-disks`)).content
        return hardDisks as HardDiskServer[]
    }
}
