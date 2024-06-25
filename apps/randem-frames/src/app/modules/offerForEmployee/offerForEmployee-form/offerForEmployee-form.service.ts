import { Injectable } from '@angular/core';
import { CreateOfferForEmployeeInput } from '../../../../graphql/_generated/types';
import { Validators as _ } from '@angular/forms';
import {
    ControlAppearanceAutoForm,
    createAppearanceAutoForm,
    createValidatorsAutoForm,
    ValidatorsAutoForm,
} from '@randem-frames/ui-rl';
import { of } from 'rxjs';
import { AutoFormServiceFactory } from '@randem-frames/ui-rl';

@Injectable({
    providedIn: 'root',
})
export class OfferForEmployeeFormService extends AutoFormServiceFactory<CreateOfferForEmployeeInput> {
    constructor() {
        super({ appearance: offerForEmployeeAppearance, validators: offerForEmployeeValidators });
        console.log('_offerForEmployeeAppearance', offerForEmployeeAppearance);
        console.log('_offerForEmployeeValidators', offerForEmployeeValidators, _offerForEmployeeValidators);
    }
}

export const offerForEmployeeValidators = createValidatorsAutoForm<CreateOfferForEmployeeInput>(v => ({
    employeeId: [v.required],
    offerForCompanyId: [v.required],
}));

export const offerForEmployeeAppearance = createAppearanceAutoForm<CreateOfferForEmployeeInput>({
    employeeId: {
        label: 'Pracownik',
        placeholder: 'Wprowadź pracownika',
        controlType: 'select',
    },
    offerForCompanyId: {
        label: 'Oferta Firma',
        placeholder: 'Wprowadź oferta dla pracownika',
        controlType: 'select',
    },
});

// deprecated
export const _offerForEmployeeValidators: ValidatorsAutoForm<CreateOfferForEmployeeInput> = {
    employeeId: [_.required],
    offerForCompanyId: [_.required],
};

export const _offerForEmployeeAppearance: ControlAppearanceAutoForm<CreateOfferForEmployeeInput> = {
    employeeId: {
        label: 'Pracownik',
        placeholder: 'Wprowadź pracownika',
        controlType: 'select',
        select: {
            data$: of([]),
            id: 'id',
            option: 'name',
        },
    },

    offerForCompanyId: {
        label: 'Oferta Firma',
        placeholder: 'Wprowadź oferta dla pracownika',
        controlType: 'select',
        select: {
            data$: of([]),
            id: 'id',
            option: 'name',
        },
    },
};
