import { Component, Input } from '@angular/core';
import {
    ListOfferForCompanyGQL,
    ListOfferForCompanyQuery,
} from '../../../../graphql/offerForCompany/query/listOfferForCompany.query.generated';
import { OfferForCompanyType } from '../../../../graphql/_generated/types';
import { OfferForCompanyFormComponent } from '../offerForCompany-form/offerForCompany-form.component';
import { DialogFormService } from '../../../templates/dialog-modal/dialog-form/dialog-form.service';
import { filter, switchMap } from 'rxjs';
import { DialogConfirmService } from '../../../templates/dialog-modal/dialog-confirm/dialog-confirm.service';
import { DeleteOfferForCompanyGQL } from '../../../../graphql/offerForCompany/mutate/deleteOfferForCompany.mutate.generated';
import { StateValueTypes } from '../../../core/services/server-state/server-state.types';

@Component({
    selector: 'randem-frames-offer-for-company-card',
    templateUrl: './offerForCompany-card.component.html',
    styleUrl: './offerForCompany-card.component.scss',
    providers: [DialogFormService, DialogConfirmService],
})
export class OfferForCompanyCardComponent {
    constructor(
        private dialogFormService: DialogFormService,
        private dialogService: DialogConfirmService,
        private deleteOfferForCompanyGQL: DeleteOfferForCompanyGQL,
        private listOfferForCompanyGQL: ListOfferForCompanyGQL
    ) {}

    @Input() offerCompany!: ListOfferForCompanyQuery['listOffersForCompany'][number];
    @Input() contentView: StateValueTypes['LIST_VIEW'] | 'detail' = 'full';

    openDialogUpdate(offer: OfferForCompanyType) {
        return this.dialogFormService.openFormDialog<OfferForCompanyFormComponent['dialogData']>(
            OfferForCompanyFormComponent,
            { offer }
        );
    }

    deleteItemList(id: string) {
        this.dialogService
            .openConfirmDialog()
            .pipe(
                filter(accept => !!accept),
                switchMap(() =>
                    this.deleteOfferForCompanyGQL.mutate(
                        { deleteOfferForCompanyId: id },
                        {
                            refetchQueries: [
                                {
                                    query: this.listOfferForCompanyGQL.document,
                                },
                            ],
                        }
                    )
                )
            )
            .subscribe();
    }
}
