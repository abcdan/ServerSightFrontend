import firebase from 'firebase/app';
import "firebase/messaging";
import type {FirebaseDevice} from "../../models/user/firebaseDevice";
import "firebase/auth";
import "firebase/firestore";
// @ts-ignore
import firebaseConfig from '../../../static/firebaseConfig.json'

const pushNotificationsVapidKey = "BJjESW8nbMJRMsGtljjEaOTQI00Idcvd93ugfiPNOIZOQIJ-8Hd2f5qjDdbCG6zGvWYNYqG2wWPDAvsnNGUgW8U"

/**
 * Sets up firebase (currently only used for notifications)
 */
export async function getFirebaseConfig(): Promise<FirebaseDevice> {
    const deviceKey = await _getMessagingToken()
    console.log(deviceKey)

    return {
        deviceKey: deviceKey
    }
}

export function getFirebaseInstance() {
    if (!firebase.apps.length) {
        return firebase.initializeApp(firebaseConfig);
    }
    return firebase.app();
}

async function _getMessagingToken(): Promise<string> {
    const messaging = getFirebaseInstance().messaging()

    return await messaging.getToken({ vapidKey: pushNotificationsVapidKey })
}
