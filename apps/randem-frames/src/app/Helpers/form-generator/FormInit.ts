export class FormInit<T> {
    private _value!: Partial<T>;

    constructor(value?: Partial<T>) {
        this._value = value || {};
    }

    modify(fun: (data: Partial<T>) => Partial<T>) {
        this._value = fun(this._value);
    }

    get value(): Partial<T> {
        return this._value;
    }

    reset() {
        this._value = {};
    }
}
