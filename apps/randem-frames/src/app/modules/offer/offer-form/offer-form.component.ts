import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { OfferFormService } from './offer-form.service';
import { CreateOfferGQL } from '../../../../graphql/offer/mutate/createOffer.mutate.generated';
import { UpdateOfferGQL } from '../../../../graphql/offer/mutate/updateOffer.mutate.generated';
import { RL_Storage } from '@randem-frames/rlStorage';
import { CreateOfferInput, EmployeeType, OfferType } from '../../../../graphql/_generated/types';
import { debounceTime, map, Subscription } from 'rxjs';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { GetAllOffersExtendGQL } from '../../../../graphql/offer/query/getOffersExtend.query.generated';
import { OfferGraphqlService } from '../../../../graphql/offer/offer-graphql.service';
import { ListCategoryOfOfferGQL } from '../../../../graphql/offer/categoryOfOffer/listCcategoryOfOffer.query.generated';

@Component({
    selector: 'randem-frames-offer-form',
    templateUrl: './offer-form.component.html',
    styleUrl: './offer-form.component.scss',
})
export class OfferFormComponent implements OnInit, OnDestroy {
    constructor(
        @Optional() public dialogRef: DialogRef<EmployeeType, OfferFormComponent>,
        @Inject(DIALOG_DATA) public dialogData: { offer: OfferType | null },
        private offerFormService: OfferFormService,
        private createOfferGQL: CreateOfferGQL,
        private updateOfferGQL: UpdateOfferGQL,
        private getAllOffersGQL: GetAllOffersExtendGQL,
        private listCategoryOfOfferGQL: ListCategoryOfOfferGQL,
        private offerGQL: OfferGraphqlService
    ) {}

    @RL_Storage('offerForm')
    offerFormStorage!: CreateOfferInput | null; // TODO przenieść na backend

    offerFormAppearance = this.offerFormService.offerFormAppearance //
        .createSelect('categoryId', this.listCategoryOfOfferGQL.fetch().pipe(map(res => res.data.listCategoryOfOffer)))
        .appearance;

    offerFormGroup = this.offerFormService.offerFormGroup;

    subscription = new Subscription();

    listCategoryOfOffer$ = this.listCategoryOfOfferGQL.fetch().pipe(map(res => res.data.listCategoryOfOffer));
    ngOnInit() {
        this.subscription.add(
            this.offerFormGroup.valueChanges.pipe(debounceTime(300)).subscribe(value => {
                this.offerFormStorage = value;
            })
        );

        if (this.offerFormStorage && !this.dialogData.offer) {
            this.offerFormGroup.patchValue(this.offerFormStorage as CreateOfferInput);
        } else if (this.dialogData.offer) {
            const { ...offer } = this.dialogData.offer;
            this.offerFormGroup.patchValue({ ...offer, categoryId: offer.category?.id });
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    createOffer() {
        this.createOfferGQL
            .mutate(
                { createOfferInput: this.offerFormGroup.value },
                {
                    refetchQueries: [
                        { query: this.getAllOffersGQL.document, variables: this.offerGQL.variablesAllOfferExtends },
                    ],
                }
            )
            .subscribe(() => {
                this.offerFormStorage = null;
                this.close();
            });
    }

    updateOffer() {
        if (!this.dialogData.offer?.id) {
            console.warn('offer id is null');
            return;
        }
        this.updateOfferGQL
            .mutate(
                { updateOfferId: this.dialogData.offer.id, updateOfferInput: this.offerFormGroup.value },
                {
                    refetchQueries: [{ query: this.getAllOffersGQL.document }],
                }
            )
            .subscribe(() => {
                this.offerFormStorage = null;
                this.close();
            });
    }

    close() {
        // this.offerFormGroup.reset();
        this.dialogRef?.close();
    }

    clear() {
        this.offerFormGroup.reset();
        this.offerFormStorage = null;
    }
}
