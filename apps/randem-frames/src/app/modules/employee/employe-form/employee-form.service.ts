import { Injectable } from '@angular/core';
import { CreateEmployeeInput } from '../../../../graphql/_generated/types';
import { Validators as _ } from '@angular/forms';
import { of } from 'rxjs';
import { ControlAppearanceAutoForm, createFormGroupAutoForm, ValidatorsAutoForm } from '@randem-frames/ui-rl';
import { FormInit } from '../../../Helpers/form-generator/FormInit';

@Injectable({
    providedIn: 'root',
})
export class EmployeeFormService {
    employeeFormInit = new FormInit<CreateEmployeeInput>();

    readonly employeeFormAppearance = { ...employeeAppearance };
    readonly employeeFormGroup = createFormGroupAutoForm(employeeValidators);
}

export const employeeValidators: ValidatorsAutoForm<CreateEmployeeInput> = Object.freeze({
    imageUrl: [_.required],
    firstName: [_.required],
    lastName: [_.required],
    email: [_.required],
    phoneNumber: [],
    isActive: [_.required],
    position: [_.required],
    companyId: [_.required],
});

export const employeeAppearance: ControlAppearanceAutoForm<CreateEmployeeInput> = Object.freeze({
    imageUrl: {
        label: 'Obraz pracownika',
        placeholder: 'Wprowadź zdjęcie pracownika',
        controlType: 'image',
    },
    firstName: {
        label: 'Nazwa pracownika',
        placeholder: 'Wprowadź nazwę dla pracownika',
        controlType: 'input',
        input: {
            type: 'text',
        },
    },
    lastName: {
        label: 'Nazwisko Pracownika',
        placeholder: 'Wprowadź nazwisko dla pracownika',
        controlType: 'input',
        input: {
            type: 'text',
        },
    },
    email: {
        label: 'Adres Email',
        placeholder: 'Wprowadź adres email',
        controlType: 'input',
        input: {
            type: 'text',
        },
    },
    phoneNumber: {
        label: 'Numer telefonu',
        placeholder: 'Wprowadź numer telefonu',
        controlType: 'input',
        input: {
            type: 'number',
        },
    },
    isActive: {
        label: 'Dostępność pracownika',
        placeholder: 'Ustaw status pracownika',
        controlType: 'toggle',
        toggle: {
            data$: of([
                { val: true, text: 'dostępny' }, // TODO dodać kolejna kontrolkę
                { val: false, text: 'niedostępny' },
            ]),
        },
    },
    position: {
        label: 'Zajmowane stanowisko',
        placeholder: 'Wprowadź stanowisko pracownika',
        controlType: 'input',
        input: {
            type: 'text',
        },
    },
    companyId: {
        label: 'Pracuje w Firmie',
        placeholder: 'Przypisz do firmy',
        controlType: 'select',
        select: {
            data$: of([]),
            id: 'id',
            option: 'name',
        },
    },
});
