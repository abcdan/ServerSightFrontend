import {FieldError} from "../error/field.error";
import {FieldsErrors} from "../error/fields.error";
import type {HttpResponse} from "./httpResponse";
import {goto} from "@sapper/app";

export function httpResponseToLocalException(response: HttpResponse): Error {
    if(response.statusCode === 400) {
        return handle400Requests(response);
    }

    // unauthorized go to register page
    if(response.statusCode === 401) {
        goto("/auth/register", {}).then()
    }
}

function handle400Requests(response) {
    if((response.content as any).errors !== undefined) {
        const errors = (response.content as any).errors as Object[]

        let errorFields: FieldError[] = []
        errors.forEach((error) => {
            errorFields.push(new FieldError(
                (error as any).field,
                (error as any).error
            ))
        })
        return new FieldsErrors(errorFields)
    }
}
