import firebase from "firebase/app";
import Messaging = firebase.messaging.Messaging;
import type {FirebaseDevice} from "../../models/user/firebaseDevice";


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
export async function setupFirebase(): Promise<FirebaseDevice> {
    // Your web app's Firebase configuration
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    return {
        deviceKey: await _getMessagingToken()
    }
}

async function _getMessagingToken(): Promise<string> {
    const messaging: Messaging = firebase.messaging()

    return await messaging.getToken({ vapidKey: pushNotificationsVapidKey })
}
