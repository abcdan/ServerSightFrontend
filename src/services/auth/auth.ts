import type {User} from "../../models/user/user";
import {HttpClient} from "../httpClient/httpClient";
import { httpResponseToLocalException } from "../httpClient/httpExceptionHandler";
import {Jwt} from "./jwt";

export class Auth {
    /**
     * Logs a user in and if successful stores a jwt token.
     * @param user
     */
    static async login(user: User): Promise<void> {
        const response = await HttpClient.post('users/login', user, true)

        if(response.statusCode === 202) {
            Jwt.setJwt((response.content as any).token)
            return
        } else {
            throw httpResponseToLocalException(response)
        }
    }

    /**
     * Registers a user
     * @param user - The user you want to regsiter
     * @return nothing. Throws error if failed.
     */
    static async register(user: User): Promise<void> {
        const response = await HttpClient.post('users/register', user, true)

        if(response.statusCode === 200) {
            // stores auth token
            await this.login(user)
            return
        } else {
            throw httpResponseToLocalException(response)
        }
    }

    static isUserLoggedIn():  boolean {
        try {
            return Jwt.getJwt().length > 0
        } catch (ignored) {
            return false
        }
    }

    /**
       Logs out current user from the system by resetting its JWT key
    */
    static logoutUser() {
        Jwt.setJwt("")
    }
}
