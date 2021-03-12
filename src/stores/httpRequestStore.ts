import { writable } from 'svelte/store';
import type {HttpResponse} from "../services/httpClient/httpResponse";

const httpRequestStore = writable([]);


export const httpRequestStore = {
    subscribe: httpRequestStore.subscribe,
    addRequest: (newHttpRequest: HttpResponse) => {
        httpRequestStore.update((existingRequests) => {
            return [newHttpRequest, ...existingRequests]
        })
    },
};
