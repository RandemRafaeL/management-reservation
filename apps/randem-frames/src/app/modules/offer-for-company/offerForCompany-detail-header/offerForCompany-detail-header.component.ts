import { Component, OnInit } from '@angular/core';
import { OfferForCompanyType } from '../../../../graphql/_generated/types';
import { OfferForCompanyFormComponent } from '../offerForCompany-form/offerForCompany-form.component';
import { filter, switchMap } from 'rxjs';
import { DialogFormService } from '../../../templates/dialog-modal/dialog-form/dialog-form.service';
import { DialogConfirmService } from '../../../templates/dialog-modal/dialog-confirm/dialog-confirm.service';
import { DeleteOfferForCompanyGQL } from '../../../../graphql/offerForCompany/mutate/deleteOfferForCompany.mutate.generated';
import { ListOfferForCompanyGQL } from '../../../../graphql/offerForCompany/query/listOfferForCompany.query.generated';
import { Location } from '@angular/common';
import { RouteParamsService } from '../../../core/services/router/route-params.service';

@Component({
    selector: 'randem-frames-offer-for-company-detail-header',
    templateUrl: './offerForCompany-detail-header.component.html',
    styleUrl: './offerForCompany-detail-header.component.scss',
    providers: [DialogFormService, DialogConfirmService],
})
export class OfferForCompanyDetailHeaderComponent {
    constructor(
        private dialogFormService: DialogFormService,
        private dialogService: DialogConfirmService,
        private deleteOfferForCompanyGQL: DeleteOfferForCompanyGQL,
        private listOfferForCompanyGQL: ListOfferForCompanyGQL,
        private location: Location,
        private routeParamsService: RouteParamsService
    ) {
        console.log('params', routeParamsService.params);
    }

    openDialogUpdate() {
        const { offerCompanyId } = this.routeParamsService.params;
        const offer: OfferForCompanyType = { id: offerCompanyId } as OfferForCompanyType;
        return this.dialogFormService.openFormDialog<OfferForCompanyFormComponent['dialogData']>(
            OfferForCompanyFormComponent,
            { offer }
        );
    }

    deleteItemList() {
        const { offerCompanyId } = this.routeParamsService.params;
        const id = offerCompanyId;
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
            .subscribe({ next: () => this.location.back() });
    }
}
