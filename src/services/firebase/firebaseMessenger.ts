import {popUpMessageStore} from "../../stores/popupMessagesStore";
import {getFirebaseInstance} from "./getFirebaseConfig";

export function setupMessagingNotificationReceiver(): void {
    try {
        const messaging = getFirebaseInstance().messaging()

        messaging.onMessage((payload) => {
            popUpMessageStore.addMessage(`Notification: ${payload.notification.body}`)
        });
    } catch (ignored) {
        console.log('Failed to register firebase')
    }
}
