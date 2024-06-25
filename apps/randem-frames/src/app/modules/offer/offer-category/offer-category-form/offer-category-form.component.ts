import { Component, Inject, OnInit, Optional } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
    CategoryOfOfferTableType,
    CreateCategoryOfOfferInput,
    UpdateCategoryOfOfferInput,
} from '../../../../../graphql/_generated/types';
import { OfferCategoryFormService } from './offer-category-form.service';
import { Subscription } from 'rxjs';
import { ListCategoryOfOfferGQL } from '../../../../../graphql/offer/categoryOfOffer/listCcategoryOfOffer.query.generated';
import { map } from 'rxjs/operators';
import { CreateCategoryOfOfferGQL } from '../../../../../graphql/offer/categoryOfOffer/createCategoryOfOffer.mutate.generated';
import { UpdateCategoryOfOfferGQL } from '../../../../../graphql/offer/categoryOfOffer/updateCategoryOfOffer.mutate.generated';

@Component({
    selector: 'randem-frames-offer-category-form',
    templateUrl: './offer-category-form.component.html',
    styleUrl: './offer-category-form.component.scss',
})
export class OfferCategoryFormComponent implements OnInit {
    constructor(
        @Optional() public dialogRef: DialogRef<CategoryOfOfferTableType>, // TODO poprawić nazwę typu,
        @Inject(DIALOG_DATA) public dialogData: { categoryOfferId: string | null },
        private offerCategoryFormService: OfferCategoryFormService,
        private listCategoryOfOfferGQL: ListCategoryOfOfferGQL,
        private createCategoryOfOfferGQL: CreateCategoryOfOfferGQL,
        private updateCategoryOfOfferGQL: UpdateCategoryOfOfferGQL
    ) {}

    get offerCategoryFromAppearance() {
        return this.offerCategoryFormService.offerCategoryAppearance;
    }

    get offerCategoryFormGroup() {
        return this.offerCategoryFormService.offerCategoryFormGroup;
    }

    subscription = new Subscription();

    ngOnInit() {
        const { categoryOfferId } = this.dialogData;
        if (categoryOfferId) {
            this.subscription.add(
                this.listCategoryOfOfferGQL
                    .watch()
                    .valueChanges.pipe(
                        map(res =>
                            res.data.listCategoryOfOffer //
                                .find(category => category.id === categoryOfferId)
                        )
                    )
                    .subscribe(categoryOffer => {
                        console.log('get current category for update', categoryOffer);
                        setTimeout(() => this.offerCategoryFormGroup.patchValue(categoryOffer as any));
                    })
            );
        }
    }

    close() {
        this.dialogRef.close();
    }

    create() {
        const input: CreateCategoryOfOfferInput = this.offerCategoryFormGroup.value;
        this.createCategoryOfOfferGQL
            .mutate(
                { input },
                {
                    refetchQueries: [{ query: this.listCategoryOfOfferGQL.document }],
                }
            )
            .subscribe(res => {
                console.log('create categoryOfOffer', res.data);
                this.close();
            });
    }

    update() {
        const updateCategoryOfOfferId = this.dialogData.categoryOfferId as string;
        const input: UpdateCategoryOfOfferInput = this.offerCategoryFormGroup.value;
        this.updateCategoryOfOfferGQL
            .mutate(
                { updateCategoryOfOfferId, input },
                { refetchQueries: [{ query: this.listCategoryOfOfferGQL.document }] }
            )
            .subscribe(res => {
                console.log('update categoryOfOffer', res.data);
            });
        this.close();
    }
}
