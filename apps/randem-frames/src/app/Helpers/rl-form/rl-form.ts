// Helpers types and function
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export const FORM_MAX_LENGTH = 80;

export type ValidatorsRlForm<T> = { [K in keyof Required<T>]: ValidatorFn[] };

export type InitialDataRlForm<T> = Required<{ [K in keyof T]: T[K] }>;

export type FormGroupRlForm<T> = FormGroup & {
    controls: {
        [P in keyof T]: AbstractControl;
    };
    value: T;
};

export function createFormGroupRlForm<T>(formValidators: { [K in keyof T]?: ValidatorFn[] }): FormGroupRlForm<T> {
    const fb = new FormBuilder();
    const controls: { [key: string]: AbstractControl } = {};

    for (const key of Object.keys(formValidators) as Array<keyof T>) {
        // controls[key as string] = fb.control(data[key], [...defaultValidators, ...(formValidators[key] || [])]);
        controls[key as string] = fb.control(null, {
            validators: [...defaultValidators, ...(formValidators[key] || [])],
        });
    }

    const forms = new FormGroup(controls) as FormGroupRlForm<T>;
    forms.reset();

    return forms;
}

// Ui declarations
export const defaultValidators = [];
// export const defaultValidators = [Validators.maxLength(FORM_MAX_LENGTH)];

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

export type ControlType = 'text' | 'select';

export type ControlAppearance = {
    label: string;
    placeholder: string;
    type: InputType;
    hidden?: boolean;
    classList?: string;
    minLength?: number;
    maxLength?: number;

    controlType?: ControlType;
    controlTypeData?: unknown[];
    controlTypeData$?: Observable<any[]>;
    selectForView?: string;
    selectForDatabase?: string;
};

export type FormControlAppearanceRlForm<T> = {
    [K in keyof Required<T>]: ControlAppearance;
};
