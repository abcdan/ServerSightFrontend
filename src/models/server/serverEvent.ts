import type {ServerEventType} from "./enums/serverEventType";

export interface ServerEvent {
    id: string,
    description: string,
    eventType: ServerEventType,
    createdAt: Date
}
