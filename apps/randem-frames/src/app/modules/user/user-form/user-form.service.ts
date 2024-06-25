import { Injectable } from '@angular/core';
import { ValidatorsRlForm } from '../../../Helpers/rl-form/rl-form';
import { CreateUserInput } from '../../../../graphql/_generated/types';
import { Validators as _ } from '@angular/forms';
import { ControlAppearanceAutoForm, createFormGroupAutoForm } from '@randem-frames/ui-rl';
import { of } from 'rxjs';
import { _isEmail } from '../../../Helpers/form-generator/validators/custom-validators';

@Injectable({
    providedIn: 'root',
})
export class UserFormService {
    readonly userFormGroup = createFormGroupAutoForm(userValidators);
    readonly userFormAppearance = { ...userAppearance };
}

export const userValidators: ValidatorsRlForm<CreateUserInput> = Object.freeze({
    username: [_.required, _isEmail()],
    password: [_.required, _.minLength(6)],
    role: [_.required],
});

export const userAppearance: ControlAppearanceAutoForm<CreateUserInput> = Object.freeze({
    username: {
        label: 'email użytkownika',
        placeholder: 'podaj email do logowania i komunikacji',
        controlType: 'input',
        input: {
            type: 'text',
        },
    },
    role: {
        label: 'rola użytkownika',
        placeholder: 'zdefiniuj uprawnienia',
        controlType: 'select',
        select: {
            data$: of([]),
            id: 'id',
            option: 'name',
        },
    },
    password: {
        label: 'hasło ',
        placeholder: 'podaj hasło do logowania',
        controlType: 'input',
        input: {
            type: 'text',
        },
    },
});
