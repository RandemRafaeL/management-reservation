import { Injectable } from '@angular/core';
import { CreateOfferForCompanyInput } from '../../../../graphql/_generated/types';
import { Validators as _ } from '@angular/forms';
import { ControlAppearanceAutoForm, createFormGroupAutoForm, ValidatorsAutoForm } from '@randem-frames/ui-rl';
import { of } from 'rxjs';
import { FormInit } from '../../../Helpers/form-generator/FormInit';

@Injectable({
    providedIn: 'root',
})
export class OfferForCompanyFormService {
    offerForCompanyFormInit = new FormInit<CreateOfferForCompanyInput>();

    readonly offerForCompanyAppearance = { ...offerForCompanyAppearance };
    readonly offerForCompanyFormGroup = createFormGroupAutoForm<CreateOfferForCompanyInput>(offerForCompanyValidators);
}

export interface FormDriver {
    categoryOfferId: string;
}

export const offerForCompanyDriverValidators: ValidatorsAutoForm<FormDriver> = {
    categoryOfferId: [],
};

export const offerForCompanyValidators: ValidatorsAutoForm<CreateOfferForCompanyInput & FormDriver> = {
    customImageUrl: [],
    customName: [_.required],
    companyId: [_.required],
    ...offerForCompanyDriverValidators,
    offerId: [_.required],
    duration: [_.required],
    price: [_.required],
    availability: [_.required],
    customDescription: [],
};

export const offerForCompanyAppearance: ControlAppearanceAutoForm<CreateOfferForCompanyInput & FormDriver> = {
    customImageUrl: {
        label: 'Obraz usługi',
        placeholder: '',
        controlType: 'image',
    },
    customName: {
        label: 'Nazwa usługi',
        placeholder: 'Wprowadź nazwę',
        controlType: 'input',
        input: {
            type: 'text',
        },
    },
    duration: {
        label: 'Czas trwania',
        placeholder: 'Podaj czas trwania w minutach',
        controlType: 'input',
        input: {
            type: 'time',
        },
    },
    price: {
        label: 'Cena usługi',
        placeholder: 'Wprowadź cenę usługi',
        controlType: 'input',
        input: {
            type: 'number',
        },
    },
    availability: {
        label: 'Dostępność usługi',
        placeholder: 'Ustaw status usługi',
        controlType: 'toggle',
        toggle: {
            data$: of([
                { val: true, text: 'dostępny' },
                { val: false, text: 'niedostępny' },
            ]),
        },
    },
    companyId: {
        label: 'Usługa dla Firmy',
        placeholder: 'Wprowadź Firmę',
        controlType: 'select',
        select: {
            data$: of([]),
            id: 'id',
            option: 'name',
        },
    },
    categoryOfferId: {
        label: 'kategoria usługi',
        placeholder: 'wybierz kategorię',
        controlType: 'select',
        select: {
            data$: of([]),
            id: 'id',
            option: 'name',
        },
    },
    offerId: {
        label: 'Ogólna usługa',
        placeholder: 'Wprowadź ogólna usługę',
        controlType: 'select',
        select: {
            data$: of([]),
            id: 'id',
            option: 'name',
        },
    },
    customDescription: {
        label: 'Opis usługi',
        placeholder: 'Opisz usługę',
        controlType: 'textarea',
    },
};
