import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { OfferForCompanyFormService } from './offer-for-company-form.service';
import { GetAllOffersGQL } from '../../../../graphql/offer/query/getOffers.query.generated';
import { delay, map, switchMap } from 'rxjs/operators';
import { CreateOfferForCompanyGQL } from '../../../../graphql/offerForCompany/mutate/createOfferForCompany.mutate.generated';
import { UpdateOfferForCompanyGQL } from '../../../../graphql/offerForCompany/mutate/updateOfferForCompany.mutate.generated';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
    CreateOfferForCompanyInput,
    EmployeeType,
    OfferForCompanyType,
    UpdateOfferForCompanyInput,
} from '../../../../graphql/_generated/types';
import { ListOfferForCompanyGQL } from '../../../../graphql/offerForCompany/query/listOfferForCompany.query.generated';
import { ListCompanyForUserGQL } from '../../../../graphql/company/listCompanyUser.query.generated';
import { ListCategoryOfOfferGQL } from '../../../../graphql/offer/categoryOfOffer/listCcategoryOfOffer.query.generated';
import { catchError, distinctUntilChanged, of, skip, tap } from 'rxjs';
import { GetOfferForCompanyGQL } from '../../../../graphql/offerForCompany/query/getOfferForCompany.query.generated';
import { DialogConfirmService } from '../../../templates/dialog-modal/dialog-confirm/dialog-confirm.service';

@Component({
    selector: 'randem-frames-offer-for-company-form',
    templateUrl: './offerForCompany-form.component.html',
    styleUrl: './offerForCompany-form.component.scss',
    providers: [DialogConfirmService],
})
export class OfferForCompanyFormComponent implements OnInit, OnDestroy {
    constructor(
        @Optional() public dialogRef: DialogRef<EmployeeType, OfferForCompanyFormComponent>,
        @Inject(DIALOG_DATA) public dialogData: { offer: OfferForCompanyType | null }, // TODO zamienic na id
        private offerForCompanyFormService: OfferForCompanyFormService,
        private getAllOffersGQL: GetAllOffersGQL,
        private listCompanyGQL: ListCompanyForUserGQL,
        private createOfferForCompanyGQL: CreateOfferForCompanyGQL,
        private updateOfferForCompanyGQL: UpdateOfferForCompanyGQL,
        private listOfferForCompanyGQL: ListOfferForCompanyGQL,
        private listCategoryOfOfferGQL: ListCategoryOfOfferGQL,
        private getOfferForCompanyGQL: GetOfferForCompanyGQL,
        private dialogConfirmService: DialogConfirmService
    ) {}

    offerForCompanyFormGroup = this.offerForCompanyFormService.offerForCompanyFormGroup;
    offerForCompanyAppearance = { ...this.offerForCompanyFormService.offerForCompanyAppearance };

    ngOnInit() {
        if (this.dialogData.offer) {
            const { ...offer } = this.dialogData.offer;
            this.getOfferForCompanyGQL
                .fetch({ getOfferForCompanyId: offer.id })
                .pipe(
                    map(res => res.data.getOfferForCompany),
                    tap(offer => {
                        if (!offer) {
                            throw new Error('Offer not found');
                        }
                        console.log(offer, offer?.offer?.id);

                        this.offerForCompanyFormGroup.patchValue({
                            ...offer,
                            companyId: offer?.company?.id,
                            offerId: offer?.offer?.id,
                            categoryOfferId: offer?.offer?.category?.id,
                        });
                    }),
                    catchError(() => {
                        // W przypadku błędu lub braku oferty otwórz dialog
                        return this.dialogConfirmService
                            .openConfirmDialog({ message: `Ups! Coś poszło nie tak, \n nie znaleziono oferty.` })
                            .pipe(
                                switchMap(() => {
                                    this.close();
                                    return of(null); // Zwracamy pusty obserwowalny, aby zamknąć strumień bez dalszych działań
                                })
                            );
                    })
                )
                .subscribe({
                    error: () => this.close(),
                });
        } else {
            console.log('OFFER COMPANY', this.offerForCompanyFormService.offerForCompanyFormInit.value);
            this.offerForCompanyFormGroup.patchValue(this.offerForCompanyFormService.offerForCompanyFormInit.value);
        }

        if (this.offerForCompanyAppearance.offerId.controlType === 'select')
            this.offerForCompanyAppearance.offerId.select.data$ = this.getAllOffersGQL.fetch().pipe(
                map(req =>
                    req.data.getAllOffers
                        .filter(offer => {
                            const categoryId = this.offerForCompanyFormGroup.controls['categoryOfferId'].value;
                            if (categoryId) {
                                return offer.category?.id === categoryId;
                            }
                            return offer;
                        })
                        .map(offers => ({
                            id: offers.id,
                            name: offers.name,
                        }))
                )
            );

        if (this.offerForCompanyAppearance.companyId.controlType === 'select') {
            this.offerForCompanyAppearance.companyId.select.data$ = this.listCompanyGQL.fetch().pipe(
                map(req =>
                    req.data.listCompanyForUser.map(companies => ({
                        id: companies.id,
                        name: companies.name,
                    }))
                )
            );
        }

        if (this.offerForCompanyAppearance.categoryOfferId.controlType === 'select') {
            this.offerForCompanyAppearance.categoryOfferId.select.data$ = this.listCategoryOfOfferGQL.fetch().pipe(
                map(req =>
                    req.data.listCategoryOfOffer //
                        .filter(cat => cat.offers?.length)
                        .map(category => ({
                            id: category.id,
                            name: category.name,
                        }))
                )
            );
        }

        this.offerForCompanyFormGroup.controls['categoryOfferId'].valueChanges
            .pipe(distinctUntilChanged())
            .subscribe(categoryId => {
                if (this.offerForCompanyAppearance.offerId.controlType === 'select')
                    this.offerForCompanyAppearance.offerId.select.data$ = this.getAllOffersGQL.fetch().pipe(
                        map(req =>
                            req.data.getAllOffers
                                .filter(offer => offer.category?.id === categoryId)
                                .map(offers => ({
                                    id: offers.id,
                                    name: offers.name,
                                }))
                        )
                    );
            });

        this.offerForCompanyFormGroup.controls['categoryOfferId'].statusChanges
            .pipe(skip(1), distinctUntilChanged())
            .subscribe(() => {
                this.offerForCompanyFormGroup.controls['offerId'].reset();
            });
    }

    ngOnDestroy() {
        this.clear();
    }

    create() {
        console.log('price', (this.offerForCompanyFormGroup.value as CreateOfferForCompanyInput).price);

        const value = this.offerForCompanyFormGroup.value;

        this.createOfferForCompanyGQL
            .mutate(
                {
                    createOfferForCompanyInput: this.parseInput(value) as CreateOfferForCompanyInput,
                },
                {
                    refetchQueries: [{ query: this.listOfferForCompanyGQL.document }],
                }
            )
            .subscribe(() => {
                this.clear();
                this.close();
            });
    }

    update() {
        if (!this.dialogData.offer?.id) {
            console.warn('offer id is null');
            return;
        }

        const value = this.offerForCompanyFormGroup.value;

        this.updateOfferForCompanyGQL
            .mutate(
                {
                    updateOfferForCompanyId: this.dialogData.offer.id,
                    updateOfferForCompanyInput: this.parseInput(value) as UpdateOfferForCompanyInput,
                },
                {
                    refetchQueries: [{ query: this.listOfferForCompanyGQL.document }],
                }
            )
            .subscribe(() => {
                this.clear();
                this.close();
            });
    }

    close() {
        this.offerForCompanyFormGroup.reset();
        this.dialogRef?.close();
    }

    clear() {
        this.offerForCompanyFormGroup.reset();
    }

    parseInput(value: Record<string, any>) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { categoryOfferId, ...input } = value;
        input['price'] = +input['price'];
        return input;
    }
}
