import { Injectable } from '@angular/core';
import { CreateCompanyInput } from '../../../../graphql/_generated/types';
import { Validators } from '@angular/forms';
import { ControlAppearanceAutoForm, createFormGroupAutoForm, ValidatorsAutoForm } from '@randem-frames/ui-rl';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CompanyFormService {
    readonly companyAppearance = { ...companyFormAppearance };
    readonly companyFormGroup = createFormGroupAutoForm<CreateCompanyInput>(companyValidators);
}

export const companyValidators: ValidatorsAutoForm<CreateCompanyInput> = {
    imageId: [],
    imageUrl: [],
    name: [Validators.required],
    address: [Validators.required],
    email: [Validators.required, Validators.email],
    phoneNumber: [Validators.maxLength(12), Validators.minLength(9)],
    description: [Validators.maxLength(180)],
    userId: [],
};

export const companyFormAppearance: ControlAppearanceAutoForm<CreateCompanyInput> = {
    imageId: {
        label: 'Logo reprezentujące podmiot',
        placeholder: 'Wybierz obraz dla loga',
        controlType: 'image',
    },
    imageUrl: {
        label: 'Obraz reprezentujący podmiot',
        placeholder: 'Wybierz obraz dla podmiotu',
        controlType: 'image',
    },
    name: {
        label: 'Nazwa firmy',
        placeholder: 'Wprowadź nazwę firmy',
        controlType: 'input',
        input: {
            type: 'text',
        },
    },
    address: {
        label: 'Adres',
        placeholder: 'Wprowadź adres',
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
            type: 'email',
        },
    },
    phoneNumber: {
        label: 'Numer telefonu',
        placeholder: 'Wprowadź numer telefonu',
        controlType: 'input',
        input: {
            type: 'text',
        },
    },
    description: {
        label: 'Opis',
        placeholder: 'Wprowadź opis',
        controlType: 'textarea',
    },
    userId: {
        label: 'użytkownik',
        placeholder: 'wprowadź nazwę użytkownika',
        controlType: 'select',
        select: {
            data$: of([]),
            id: 'id',
            option: 'name',
        },
        hidden: true,
    },
};
