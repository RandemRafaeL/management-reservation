import { Validators } from '@angular/forms';
import { createFormGroupRlForm, FormControlAppearanceRlForm, ValidatorsRlForm } from '../../../Helpers/rl-form/rl-form';
import { CreateCompanyInput } from '../../../../graphql/_generated/types';
//  Typescript code

export const _companyValidators: ValidatorsRlForm<CreateCompanyInput> = {
    imageId: [],
    imageUrl: [],
    name: [Validators.required],
    address: [Validators.required],
    email: [Validators.required, Validators.email],
    phoneNumber: [Validators.maxLength(12), Validators.minLength(9)],
    description: [Validators.maxLength(180)],
    userId: [],
};

export const _companyForm = createFormGroupRlForm<CreateCompanyInput>(_companyValidators);

export const _companyFormAppearance: FormControlAppearanceRlForm<CreateCompanyInput> = {
    imageId: {
        label: 'Logo reprezentujące podmiot',
        placeholder: 'Wybierz obraz dla loga',
        type: 'text',
        hidden: true,
    },
    imageUrl: {
        label: 'Obraz reprezentujący podmiot',
        placeholder: 'Wybierz obraz dla podmiotu',
        type: 'text',
        hidden: true,
    },
    name: {
        label: 'Nazwa firmy',
        placeholder: 'Wprowadź nazwę firmy',
        type: 'text',
    },
    address: {
        label: 'Adres',
        placeholder: 'Wprowadź adres',
        type: 'text',
    },
    email: {
        label: 'Email',
        placeholder: 'Wprowadź adres email',
        type: 'email',
    },
    phoneNumber: {
        label: 'Numer telefonu',
        placeholder: 'Wprowadź numer telefonu',
        type: 'number',
    },
    description: {
        label: 'Opis',
        placeholder: 'Wprowadź opis',
        type: 'text',
    },
    userId: {
        label: 'użytkownik',
        type: 'text',
        placeholder: 'wprowadź nazwę użytkownika',
        hidden: true,
    },
};
