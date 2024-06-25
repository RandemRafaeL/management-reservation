import { Validators } from '@angular/forms';
import { LoginUserInput } from '../../../../graphql/_generated/types';
import { ControlAppearanceAutoForm, ValidatorsAutoForm } from '@randem-frames/ui-rl';
import { createFormGroupRlForm } from '../../../Helpers/rl-form/rl-form';

export const loginValidator: ValidatorsAutoForm<LoginUserInput> = {
    username: [Validators.required, Validators.email],
    password: [Validators.required],
};

export const loginForm = createFormGroupRlForm<LoginUserInput>(loginValidator);
export const loginFormAppearance: ControlAppearanceAutoForm<LoginUserInput> = {
    username: {
        label: 'Adres Email',
        placeholder: 'Wprowadź Adres Email',
        controlType: 'input',
        input: {
            type: 'text',
        },
    },
    password: {
        label: 'Hasło',
        placeholder: 'Wprowadź hasło',
        controlType: 'input',
        input: {
            type: 'password',
        },
    },
};
