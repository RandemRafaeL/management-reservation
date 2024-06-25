import {
    ControlAppearance,
    ControlAppearanceAutoForm,
    ControlAppearanceBase,
    ControlAppearanceInput,
    ControlAppearanceSelect,
    ControlAppearanceToggle,
    createFormGroupAutoForm,
    FormGroupAutoForm,
    ValidatorsAutoForm,
} from './auto-form';
import { cloneDeep } from 'lodash-es';
import { of } from 'rxjs';

interface Input<T> {
    appearance: ControlAppearanceAutoForm<T>;
    validators: ValidatorsAutoForm<T>;
}

export abstract class AutoFormServiceFactory<T> {
    //
    private readonly _input!: Input<T>;
    private _autoFormGroup!: FormGroupAutoForm<T>;
    private _appearance!: ControlAppearanceAutoForm<T>;

    protected constructor(input: Input<T>) {
        this._input = Object.freeze(cloneDeep(input));
        this.init();
    }

    get autoFormGroup() {
        return this._autoFormGroup;
    }

    get appearance() {
        return this._appearance;
    }

    init() {
        this.createAutoForm(this._input.validators);
        this._appearance = cloneDeep({ ...this._input.appearance });
    }

    createAutoForm(validators: ValidatorsAutoForm<T>) {
        this._autoFormGroup = createFormGroupAutoForm(validators);
    }

    setAppearance(appearance: ControlAppearanceAutoForm<T>) {
        this._appearance = appearance;
    }
}

export function createAppearanceAutoForm<T>(appearance: {
    [K in keyof Required<T>]: ControlAppearanceBase | ControlAppearance;
}): ControlAppearanceAutoForm<T> {
    function correct(appearance: { [K in keyof T]?: Partial<ControlAppearance> }) {
        (Object.keys(appearance) as Array<keyof T>).forEach(key => {
            switch (appearance[key]?.controlType) {
                case 'input': {
                    appearance[key] = {
                        ...appearance[key],
                        input: {
                            type: 'text',
                        },
                    } as ControlAppearanceInput;
                    break;
                }

                case 'select': {
                    appearance[key] = {
                        ...appearance[key],
                        select: {
                            data$: of([]),
                            id: 'id',
                            option: 'name',
                        },
                    } as ControlAppearanceSelect;
                    break;
                }

                case 'toggle': {
                    appearance[key] = {
                        ...appearance[key],
                        toggle: {
                            data$: of([
                                { val: true, text: 'true' },
                                { val: false, text: 'false' },
                            ]),
                        },
                    } as ControlAppearanceToggle;
                    break;
                }
            }
        });
        return appearance;
    }
    return correct(appearance) as ControlAppearanceAutoForm<T>;
}

import { Validators } from '@angular/forms';

export function createValidatorsAutoForm<T>(
    validatorFn: (validators: typeof Validators) => ValidatorsAutoForm<T>,
    validators = Validators
) {
    return validatorFn(validators);
}
