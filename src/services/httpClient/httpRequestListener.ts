import {httpResponseStore} from "../../stores/httpResponseStore";
import type {HttpResponse} from "./httpResponse";
import {goto} from "@sapper/app";
import {HttpClient} from "./httpClient";
import {Jwt} from "../auth/jwt";
import {popUpMessageStore} from "../../stores/popupMessagesStore";

export function setup() {
    // perform certain actions when certain response codes return
    // for example redirect to the login/register page when signed out.

    httpResponseStore.subscribe((response: HttpResponse) => {
        if(response) {
            onEveryRequest(response)
            switch (response.statusCode){
                case 401:
                    on401(response)
                    break;
            }
        }
    })
}

function onEveryRequest(response: HttpResponse): void {
    if(response.statusCode !== 401) {
        // get a new jwt every request to keep it fresh.
        HttpClient.get('user/refresh-jwt',{},  true).then((response) => {
            if(response.statusCode === 401) on401(response)
            Jwt.setJwt((response.content as any).token)
        })
    }
}

function on401(response: HttpResponse): void {
    goto("/auth/register", {}).then(() => {
        popUpMessageStore.addMessage('Unauthorized you need to login or register')
    })
}
