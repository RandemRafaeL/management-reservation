import { Component } from '@angular/core';
import {
    ListCategoryOfOfferGQL,
    ListCategoryOfOfferQuery,
} from '../../../../../graphql/offer/categoryOfOffer/listCcategoryOfOffer.query.generated';
import { map, switchMap } from 'rxjs/operators';
import { filter, Observable } from 'rxjs';
import { DeleteCategoryOfOfferGQL } from '../../../../../graphql/offer/categoryOfOffer/deleteCategoryOfOffer.mutate.generated';
import { DialogConfirmService } from '../../../../templates/dialog-modal/dialog-confirm/dialog-confirm.service';
import { Dialog } from '@angular/cdk/dialog';
import { configDialogForm } from '../../../../core/const/dialogForm';
import { OfferCategoryFormComponent } from '../offer-category-form/offer-category-form.component';

@Component({
    selector: 'randem-frames-offer-category-list',
    templateUrl: './offer-category-list.component.html',
    styleUrl: './offer-category-list.component.scss',
    providers: [DialogConfirmService],
})
export class OfferCategoryListComponent {
    constructor(
        private listCategoryOfOfferGQL: ListCategoryOfOfferGQL,
        private deleteCategoryOfOfferGQL: DeleteCategoryOfOfferGQL,
        private dialogService: DialogConfirmService,
        private dialog: Dialog
    ) {}

    listCategoryOfOffer: Observable<ListCategoryOfOfferQuery['listCategoryOfOffer']> = this.listCategoryOfOfferGQL
        .watch()
        .valueChanges.pipe(map(res => res.data.listCategoryOfOffer));

    updateItem(categoryOfferId: string) {
        this.dialog.open(OfferCategoryFormComponent, {
            ...configDialogForm,
            width: 'fit-content',
            maxWidth: 1600,
            data: { categoryOfferId },
        });
    }

    deleteItemList(id: string) {
        this.dialogService
            .openConfirmDialog()
            .pipe(
                filter(accept => !!accept),
                switchMap(() =>
                    this.deleteCategoryOfOfferGQL.mutate(
                        { deleteCategoryOfOfferId: id },
                        { refetchQueries: [{ query: this.listCategoryOfOfferGQL.document }] }
                    )
                )
            )

            .subscribe(res => {
                console.log('delete categoryOfOffer', res.data);
            });
    }
}
