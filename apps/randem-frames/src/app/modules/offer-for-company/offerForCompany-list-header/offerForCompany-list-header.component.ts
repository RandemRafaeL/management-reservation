import { Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { OfferForCompanyFormComponent } from '../offerForCompany-form/offerForCompany-form.component';
import { DialogFormService } from '../../../templates/dialog-modal/dialog-form/dialog-form.service';

@Component({
    selector: 'randem-frames-offer-list-by-company-header',
    templateUrl: './offerForCompany-list-header.component.html',
    styleUrl: './offerForCompany-list-header.component.scss',
    providers: [DialogFormService],
})
export class OfferForCompanyListHeaderComponent {
    constructor(
        private dialog: Dialog,
        private dialogFormService: DialogFormService
    ) {}

    openDialogCreate(id: string | null = null) {
        this.dialogFormService.openFormDialog(OfferForCompanyFormComponent, id);
    }
}
