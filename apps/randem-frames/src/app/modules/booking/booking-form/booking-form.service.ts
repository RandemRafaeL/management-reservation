import { Injectable } from '@angular/core';
import { createValidatorsAutoForm, createAppearanceAutoForm, AutoFormServiceFactory } from '@randem-frames/ui-rl';
import { CreateBookingInput, UpdateBookingInput } from '../../../../graphql/_generated/types';

type InputKeys = keyof CreateBookingInput;

@Injectable({
    providedIn: 'root',
})
export class BookingFormService extends AutoFormServiceFactory<CreateBookingInput & BookingKeysToControl> {
    constructor() {
        super({ appearance: bookingAppearance, validators: bookingValidators });
    }

    get createInput(): CreateBookingInput {
        const keys: InputKeys[] = Object.keys(this.autoFormGroup.value).filter(
            key => key in this.autoFormGroup.value
        ) as InputKeys[];

        console.log('CreateBookingKeys', keys);

        const { bookingDate, status, offerForCompanyId, offerForEmployeeId, customerId } = this.autoFormGroup.value;
        return { bookingDate, status, offerForCompanyId, offerForEmployeeId, customerId };
    }

    get updateInput(): UpdateBookingInput {
        const { bookingDate, status, offerForCompanyId, offerForEmployeeId, customerId } = this.autoFormGroup.value;
        return { bookingDate, status, offerForCompanyId, offerForEmployeeId, customerId };
    }
}

export interface BookingKeysToControl {
    _categoryId: string;
    _offerId: string;
    _companyId: string;
    _employeeId: string;
}

export const bookingValidators = createValidatorsAutoForm<CreateBookingInput & BookingKeysToControl>(v => ({
    customerId: [v.required],
    bookingDate: [v.required],
    _categoryId: [],
    _offerId: [v.required],
    _companyId: [],
    offerForCompanyId: [v.required],
    _employeeId: [],
    offerForEmployeeId: [],
    status: [],
}));

export const bookingAppearance = createAppearanceAutoForm<CreateBookingInput & BookingKeysToControl>({
    customerId: {
        label: 'Klient',
        placeholder: 'Wprowadź klienta',
        controlType: 'select',
    },
    _employeeId: {
        label: 'Pracownik',
        placeholder: 'Wybierz pracownika',
        controlType: 'select',
    },
    _offerId: {
        label: 'Usługa',
        placeholder: 'Wybierz usługę',
        controlType: 'select',
    },
    _categoryId: {
        label: 'kategoria',
        placeholder: 'Wybierz kategorię',
        controlType: 'select',
    },
    _companyId: {
        label: 'Firma',
        placeholder: 'Wybierz firmę',
        controlType: 'select',
    },
    offerForCompanyId: {
        label: 'Oferta firmy',
        placeholder: 'Wprowadź ofertę',
        controlType: 'select',
    },
    offerForEmployeeId: {
        label: 'Oferta Pracownika',
        placeholder: 'Wprowadź pracownika',
        controlType: 'select',
        hidden: true,
    },
    bookingDate: {
        label: 'data wykonania',
        placeholder: 'wprowadź date',
        controlType: 'input',
        input: {
            type: 'datetime-local',
        },
    },

    status: {
        label: 'status usługi',
        placeholder: 'zmień status',
        controlType: 'select',
        hidden: true,
    },
});
