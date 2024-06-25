import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { OfferType, SortOrder } from '../../../../graphql/_generated/types';
import { filter, Subscription, switchMap } from 'rxjs';
import { DeleteOfferGQL } from '../../../../graphql/offer/mutate/deleteOffer.mutate.generated';
import { Dialog } from '@angular/cdk/dialog';
import { OfferFormComponent } from '../offer-form/offer-form.component';
import { GetAllOffersExtendGQL } from '../../../../graphql/offer/query/getOffersExtend.query.generated';
import { OfferGraphqlService } from '../../../../graphql/offer/offer-graphql.service';
import { DialogConfirmService } from '../../../templates/dialog-modal/dialog-confirm/dialog-confirm.service';
import { configDialogForm } from '../../../core/const/dialogForm';

@Component({
    selector: 'randem-frames-offer-list',
    templateUrl: './offer-list.component.html',
    styleUrl: './offer-list.component.scss',
    providers: [DialogConfirmService],
})
export class OfferListComponent implements OnInit, OnDestroy {
    constructor(
        private dialog: Dialog,
        private getAllOffersExtendGQL: GetAllOffersExtendGQL,
        private deleteOfferGQL: DeleteOfferGQL,
        private offerGQL: OfferGraphqlService,
        private dialogService: DialogConfirmService
    ) {}

    allOffersSignal = signal<OfferType[]>([]);

    subscription = new Subscription();

    ngOnInit() {
        this.offerGQL.setAllOffersExtendVariable({
            options: { sort: [{ field: 'createdAt', order: SortOrder.Desc }] },
        });

        this.subscription.add(
            this.offerGQL.getAllOffersExtendGQL.subscribe({
                next: res => {
                    const offers = res.data.getAllOffers;

                    this.allOffersSignal.set(offers);
                },
            })
        );
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }

    deleteItemList(id: string) {
        this.dialogService
            .openConfirmDialog()
            .pipe(
                filter(accept => !!accept),
                switchMap(() =>
                    this.deleteOfferGQL.mutate(
                        { deleteOfferId: id },
                        {
                            refetchQueries: [
                                {
                                    query: this.getAllOffersExtendGQL.document,
                                    variables: this.offerGQL.variablesAllOfferExtends,
                                },
                            ],
                        }
                    )
                )
            )
            .subscribe();
    }

    openDialogCreate(offer: OfferType | null = null) {
        const employeeDialog = this.dialog.open(OfferFormComponent, {
            ...configDialogForm,
            data: { offer },
        });

        employeeDialog.closed.subscribe(data => {
            console.log(data);
        });
    }

    openDialogUpdate(offer: OfferType) {
        this.openDialogCreate(offer);
    }
}
