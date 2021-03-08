export class Jwt {
    private static _JWT_LOCALSTORAGE_KEY = 'jwt-token';

    static setJwt(jwtToken: string): void {
        localStorage.setItem(this._JWT_LOCALSTORAGE_KEY, jwtToken)
    }

    static getJwt(): string | undefined {
        try {
            return localStorage.getItem(this._JWT_LOCALSTORAGE_KEY) as string
        } catch(ignored) {
            return undefined
        }
    }
}
