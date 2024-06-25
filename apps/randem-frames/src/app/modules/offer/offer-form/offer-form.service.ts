import { Injectable } from '@angular/core';
import { CreateOfferInput } from '../../../../graphql/_generated/types';
import { Validators as _ } from '@angular/forms';
import { ListCategoryOfOfferGQL } from '../../../../graphql/offer/categoryOfOffer/listCcategoryOfOffer.query.generated';
import { map, of } from 'rxjs';
import {
    ControlAppearanceAutoForm,
    updateAppearanceAutoForm,
    createFormGroupAutoForm,
    ValidatorsAutoForm,
} from '@randem-frames/ui-rl';

@Injectable({
    providedIn: 'root',
})
export class OfferFormService {
    constructor(private listCategoryOfOfferGQL: ListCategoryOfOfferGQL) {}

    readonly offerFormGroup = createFormGroupAutoForm<CreateOfferInput>(offerValidators);
    readonly offerFormAppearance = updateAppearanceAutoForm<CreateOfferInput>(offerAppearance);
}

export const offerValidators: ValidatorsAutoForm<CreateOfferInput> = Object.freeze({
    imageUrl: [_.required],
    name: [_.required],
    categoryId: [_.required],
    description: [_.maxLength(400)],
});

export const offerAppearance: ControlAppearanceAutoForm<CreateOfferInput> = {
    categoryId: {
        label: 'Kategoria usług',
        placeholder: 'Wprowadź kategorie',
        controlType: 'select',
        select: {
            data$: of([]),
            id: 'id',
            option: 'name',
        },
    },
    name: {
        label: 'Nazwa usługi',
        placeholder: 'Wprowadź nazwę usługi',
        controlType: 'input',
        input: {
            type: 'text',
        },
    },
    description: {
        label: 'Opis usługi',
        placeholder: 'Opisz krótko usługę',
        controlType: 'input',
        input: {
            type: 'text',
        },
    },
    imageUrl: {
        label: 'Obraz usługi',
        placeholder: '',
        controlType: 'image',
    },
};
