import type {Server} from "../../models/server/server";
import type {CpuUsage} from "../../models/server/cpuUsage";
import {HttpClient} from "../httpClient/httpClient";
import type {CreatedBetweenDTO} from "../../dto/createdBetweenDTO";
import {parseCreatedBetweenToIsoString} from "../util/parseCreatedBetween";
import type {ServerEvent} from "../../models/server/serverEvent";
import {ServerEventType} from "../../models/server/enums/serverEventType";

export class ServerEventService {
    /**
     * Gets all the events from a server
     */
    static async getEventsOfServer(server: Server): Promise<ServerEvent[]> {
        const serverEventsObj = (await HttpClient.get(`servers/${server.id}/events`)).content
        const serverEvents = serverEventsObj as ServerEvent[]
        // convert all the dates correctly.
        serverEvents.map((serverEvent) => serverEvent.createdAt = new Date(serverEvent.createdAt))
        // @ts-ignore
        serverEvents.map((serverEvent) => serverEvent.eventType = ServerEventType[serverEvent.eventType] as string)
        return serverEvents
    }
}
