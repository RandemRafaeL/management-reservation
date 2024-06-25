import { Component } from '@angular/core';
import { DialogFormService } from '../../../templates/dialog-modal/dialog-form/dialog-form.service';
import { OfferForEmployeeFormComponent } from '../offerForEmployee-form/offerForEmployee-form.component';
import { RouteParamsService } from '../../../core/services/router/route-params.service';
import { OfferForCompanyFormComponent } from '../../offer-for-company/offerForCompany-form/offerForCompany-form.component';

@Component({
    selector: 'randem-frames-offer-for-employee-list-header',
    templateUrl: './offerForEmployee-list-header.component.html',
    styleUrl: './offerForEmployee-list-header.component.scss',
    providers: [DialogFormService],
})
export class OfferForEmployeeListHeaderComponent {
    constructor(private dialogFormService: DialogFormService) {}

    openDialogCreate() {
        return this.dialogFormService.openFormDialog<OfferForEmployeeFormComponent['dialogData']>(
            OfferForEmployeeFormComponent
        );
    }
}
