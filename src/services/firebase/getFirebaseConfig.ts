import firebase from 'firebase';
import "firebase/messaging";
import type {FirebaseDevice} from "../../models/user/firebaseDevice";
import "firebase/auth";
import "firebase/firestore";

const firebaseImpl = (process as any).browser ? firebase : require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyD9-rDXwOVcD51EJvGebzZTXBxx16vfzj8",
    authDomain: "serversight-3f3c1.firebaseapp.com",
    projectId: "serversight-3f3c1",
    storageBucket: "serversight-3f3c1.appspot.com",
    messagingSenderId: "985131116272",
    appId: "1:985131116272:web:d1b5043b8b9cb170134435"
};

const pushNotificationsVapidKey = "BJjESW8nbMJRMsGtljjEaOTQI00Idcvd93ugfiPNOIZOQIJ-8Hd2f5qjDdbCG6zGvWYNYqG2wWPDAvsnNGUgW8U"

/**
 * Sets up firebase (currently only used for notifications)
 */
export async function getFirebaseConfig(): Promise<FirebaseDevice> {
    // Your web app's Firebase configuration
    // Initialize Firebase
    if (!firebase.apps.length) {
        firebaseImpl.initializeApp(firebaseConfig);
    }else {
        firebaseImpl.app(); // if already initialized, use that one
    }

    return {
        deviceKey: await _getMessagingToken()
    }
}

async function _getMessagingToken(): Promise<string> {
    const messaging = firebaseImpl.messaging()

    return await messaging.getToken({ vapidKey: pushNotificationsVapidKey })
}
