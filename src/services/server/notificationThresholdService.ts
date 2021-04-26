import type {NotificationThresHold} from "../../models/server/notificationThresHold";
import type {Server} from "../../models/server/server";
import {HttpClient} from "../httpClient/httpClient";
import {httpResponseToLocalException} from "../httpClient/httpExceptionHandler";

export class NotificationThresholdService {
    static async getNotificationThreshold(server: Server): Promise<NotificationThresHold> {
        try {
            const response = (await HttpClient.get(`servers/${server.id}/notifications/threshold`))

            if (response.statusCode === 200) {
                return response.content as NotificationThresHold
            } else {
                httpResponseToLocalException(response)
                return undefined
            }
        } catch (ignored) {
            return undefined
        }
    }

    /**
     * Saves the notification threshold for a server (send a notification if reached.)
     * @param server - Server where you want this setting to be applied to
     * @param notificationThreshold - All properties need to be a value of 0 to a 100 (so in percentage).
     */
    static async saveNotificationThreshold(server: Server, notificationThreshold: NotificationThresHold): Promise<void> {
        const response = await HttpClient.put(`servers/${server.id}/notifications/threshold`, notificationThreshold)

        if(response.statusCode === 204) {
            return
        } else {
            throw httpResponseToLocalException(response)
        }
    }
}
