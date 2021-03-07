import type {FieldError} from "./field.error";

export class FieldsErrors extends Error {
    private readonly _fields: FieldError[]

    constructor(fields: FieldError[]) {
        super('Error validating fields from API')
        this._fields = fields;
    }

    get fields(): FieldError[] {
        return this._fields;
    }
}
