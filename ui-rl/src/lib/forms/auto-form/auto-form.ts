import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { signal, WritableSignal } from '@angular/core';

export const FORM_MAX_LENGTH = 32;

export type ValidatorsAutoForm<T> = { [K in keyof Required<T>]: ValidatorFn[] };

export type InitialDataAutoForm<T> = Required<{ [K in keyof T]: T[K] }>;

export type FormGroupAutoForm<T> = FormGroup & {
    controls: {
        [P in keyof T]: AbstractControl;
    };
    value: T;
};

export function createFormGroupAutoForm<T>(formValidators: { [K in keyof T]?: ValidatorFn[] }): FormGroupAutoForm<T> {
    console.log('create auto form');

    const fb = new FormBuilder();
    const controls: { [key: string]: AbstractControl } = {};

    for (const key of Object.keys(formValidators) as Array<keyof T>) {
        controls[key as string] = fb.control(null, {
            // validators: [...defaultValidators, ...(formValidators[key] || [])],
            validators: [...(formValidators[key] || [])],
            updateOn: 'change',
        });
    }

    const forms = new FormGroup(controls, { updateOn: 'change' }) as FormGroupAutoForm<T>;
    forms.reset();

    return forms;
}

export function updateAppearanceAutoForm<T>(formAppearance: ControlAppearanceAutoForm<T>) {
    return {
        createSelect: function <K extends keyof T & string>(
            fieldName: K,
            fetchData: Observable<Record<string, unknown>[]>
        ) {
            const control = formAppearance[fieldName];

            if (control && control.controlType === 'select') {
                control.select.data$ = fetchData.pipe(
                    map(data =>
                        data.map(el => ({
                            id: el[control.select.id],
                            [control.select.option]: el[control.select.option],
                        }))
                    )
                );
            } else {
                console.error(`Control for fieldName ${fieldName} is not a select type or not found.`);
            }
            return updateAppearanceAutoForm<T>(formAppearance);
        },
        addSignals() {
            Object.keys(formAppearance).forEach(key => {
                const item = formAppearance[key as keyof typeof formAppearance];
                item.hidden_ = signal(false);
                item.disabled_ = signal(false);
            });

            return updateAppearanceAutoForm<T>(formAppearance);
        },
        appearance: formAppearance as ControlAppearanceAutoForm<T>,
    };
}

// Ui declarations
// export const defaultValidators = [];
export const defaultValidators = [Validators.maxLength(FORM_MAX_LENGTH)];

export type InputType =
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'radio'
    | 'checkbox'
    | 'date'
    | 'datetime-local'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'range'
    | 'search'
    | 'tel'
    | 'time'
    | 'url'
    | 'week';

export type ControlType = 'input' | 'textarea' | 'select' | 'image' | 'toggle';

export interface ControlAppearanceBase {
    controlType: ControlType;
    label: string;
    placeholder: string;
    hidden?: boolean;
    classList?: string;
    disabled?: boolean;

    disabled_?: WritableSignal<boolean>;
    hidden_?: WritableSignal<boolean>;
}

export interface ControlAppearanceInput extends ControlAppearanceBase {
    controlType: 'input';
    input: {
        type: InputType;
    };
}

export interface ControlAppearanceTextArea extends ControlAppearanceBase {
    controlType: 'textarea';
    // textarea: {
    //
    // }
}

export interface ControlAppearanceSelect extends ControlAppearanceBase {
    controlType: 'select';
    select: {
        data$: Observable<Record<string, unknown>[]>;
        id: string;
        option: string;
    };
}

export interface ControlAppearanceImage extends ControlAppearanceBase {
    controlType: 'image';
    // image: {
    //
    // };
}
export interface ControlAppearanceToggle extends ControlAppearanceBase {
    controlType: 'toggle';
    toggle: {
        data$: Observable<{ val: boolean; text: string }[]>;
    };
}

export type ControlAppearance =
    | ControlAppearanceInput
    | ControlAppearanceTextArea
    | ControlAppearanceSelect
    | ControlAppearanceImage
    | ControlAppearanceToggle;

export type ControlAppearanceAutoForm<T> = {
    [K in keyof Required<T>]: ControlAppearance;
};
