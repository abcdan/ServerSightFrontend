import {HttpClient} from "../httpClient/httpClient";
import {httpResponseToLocalException} from "../httpClient/httpExceptionHandler";

export class FirebaseDeviceService {
    /**
     * Gets the cpu usage from a given server withing a certain time range.
     * Every cpu usage in the list will be the CPU usage of every minute
     */
    static async registerFirebaseDevice(firebaseDevice): Promise<void> {
        const response = await HttpClient.post('user/firebase-devices', firebaseDevice)

        if(response.statusCode === 204) {
            return
        } else {
            throw httpResponseToLocalException(response)
        }
    }
}
