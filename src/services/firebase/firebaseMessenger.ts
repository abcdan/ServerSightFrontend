import {popUpMessageStore} from "../../stores/popupMessagesStore";
import {getFirebaseInstance} from "./getFirebaseConfig";

export function setupMessagingNotificationReceiver(): void {
    const messaging = getFirebaseInstance().messaging()

    messaging.onMessage((payload) => {
        console.log(payload)
        popUpMessageStore.addMessage(`Notification: ${payload.notification.body}`)
    });
}
