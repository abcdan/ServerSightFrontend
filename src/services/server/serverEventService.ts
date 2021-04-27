import type {Server} from "../../models/server/server";
import {HttpClient} from "../httpClient/httpClient";
import type {ServerEvent} from "../../models/server/serverEvent";
import {ServerEventType} from "../../models/server/enums/serverEventType";

export class ServerEventService {
    /**
     * Gets all the events from a server
     */
    static async getEventsOfServer(server: Server): Promise<ServerEvent[]> {
        const serverEventsObj = (await HttpClient.get(`servers/${server.id}/events`)).content
        const serverEvents = serverEventsObj as ServerEvent[]
        console.log(serverEvents)
        // convert all the dates correctly.
        serverEvents.map((serverEvent) => serverEvent.createdAt = new Date(serverEvent.createdAt))
        serverEvents.map((serverEvent) => serverEvent.eventType = this._setEventType(serverEvent))

        return serverEvents
    }

    static _setEventType(serverEvent: ServerEvent): ServerEventType {
        switch (serverEvent.eventType) {
            case 0:
                return ServerEventType.PowerStatus
            case 1:
                return ServerEventType.HardDiskThresholdReached
            case 2:
                return ServerEventType.CPUUsageThresholdReached
            case 3:
                return ServerEventType.RAMUsageThresholdReached
        }
    }
}
