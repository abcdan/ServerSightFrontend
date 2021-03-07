export class FieldError extends Error {
    private readonly _field: string
    private readonly _error: string

    constructor(field, error,...params) {
        super(...params)
        this._field = field;
        this._error = error;
    }
    get field(): string {
        return this._field;
    }

    get error(): string {
        return this._error;
    }
}
