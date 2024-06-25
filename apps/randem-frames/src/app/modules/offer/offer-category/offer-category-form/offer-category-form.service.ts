import { Injectable } from '@angular/core';
import { ControlAppearanceAutoForm, createFormGroupAutoForm, ValidatorsAutoForm } from '@randem-frames/ui-rl';
import { CreateCategoryOfOfferInput } from '../../../../../graphql/_generated/types';
import { Validators as _ } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class OfferCategoryFormService {
    offerCategoryFormGroup = createFormGroupAutoForm(offerCategoryValidators);
    offerCategoryAppearance = { ...offerCategoryAppearance };
}

export const offerCategoryValidators: ValidatorsAutoForm<CreateCategoryOfOfferInput> = Object.freeze({
    imageUrl: [],
    name: [_.required],
});

export const offerCategoryAppearance: ControlAppearanceAutoForm<CreateCategoryOfOfferInput> = Object.freeze({
    imageUrl: {
        label: 'Ikona kategorii',
        placeholder: 'Wprowadź ikonę',
        controlType: 'image',
    },
    name: {
        label: 'Nazwa kategorii',
        placeholder: 'Wprowadź nazwę dla kategorii',
        controlType: 'input',
        input: {
            type: 'text',
        },
    },
});
