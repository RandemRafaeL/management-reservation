import { Injectable } from '@angular/core';
import { CreateCustomerInput } from '../../../../graphql/_generated/types';
import { ControlAppearanceAutoForm, createFormGroupAutoForm, ValidatorsAutoForm } from '@randem-frames/ui-rl';
import { Validators as _ } from '@angular/forms';
import { _isEmail } from '../../../Helpers/form-generator/validators/custom-validators';

@Injectable({
    providedIn: 'root',
})
export class CustomerFormService {
    readonly customerAppearance = { ...customerAppearance };
    readonly customerFormGroup = createFormGroupAutoForm<CreateCustomerInput>(customerValidators);
}

export const customerValidators: ValidatorsAutoForm<CreateCustomerInput> = {
    name: [_.required],
    email: [_.required, _isEmail()],
    phone: [_.required, _.minLength(9), _.maxLength(12)],
};

export const customerAppearance: ControlAppearanceAutoForm<CreateCustomerInput> = {
    name: {
        label: 'nazwa zamawiającego',
        placeholder: 'imię nazwisko lub nick',
        controlType: 'input',
        input: {
            type: 'text',
        },
    },

    email: {
        label: 'Email',
        placeholder: 'Wprowadź adres email',
        controlType: 'input',
        input: {
            type: 'text',
        },
    },

    phone: {
        label: 'Numer telefonu',
        placeholder: 'Wprowadź numer telefonu',
        controlType: 'input',
        input: {
            type: 'text',
        },
    },
};
