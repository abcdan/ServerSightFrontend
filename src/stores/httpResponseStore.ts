import { writable } from 'svelte/store';
import type {HttpResponse} from "../services/httpClient/httpResponse";

const httpRequest = writable(undefined);


export const httpResponseStore = {
    subscribe: httpRequest.subscribe,
    addResponse: (newHttpRequest: HttpResponse) => {
        httpRequest.set(newHttpRequest)
    },
};
