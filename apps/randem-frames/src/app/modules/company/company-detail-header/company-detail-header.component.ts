import { Component } from '@angular/core';
import { companyActions } from '../../../state/company/company.store';
import { CompanyFormComponent } from '../company-form/company-form.component';
import { filter, tap } from 'rxjs';
import { DialogConfirmService } from '../../../templates/dialog-modal/dialog-confirm/dialog-confirm.service';
import { DialogFormService } from '../../../templates/dialog-modal/dialog-form/dialog-form.service';
import { Store } from '@ngrx/store';
import { RouteParamsService } from '../../../core/services/router/route-params.service';

@Component({
    selector: 'randem-frames-company-detail-header',
    templateUrl: './company-detail-header.component.html',
    styleUrl: './company-detail-header.component.scss',
    providers: [DialogConfirmService, DialogFormService],
})
export class CompanyDetailHeaderComponent {
    constructor(
        private dialogConfirmService: DialogConfirmService,
        private dialogFormService: DialogFormService,
        private store: Store,
        private routeParamService: RouteParamsService
    ) {}

    dialogOpen() {
        const { companyId } = this.routeParamService.params;
        this.dialogFormService.openFormDialog(CompanyFormComponent, { id: companyId });
    }

    deleteCompanyConfirm() {
        const { companyId } = this.routeParamService.params;

        this.dialogConfirmService
            .openConfirmDialog()
            .pipe(
                filter(accept => !!accept),
                tap(() => this.store.dispatch(companyActions.deleteOne({ companyId: companyId })))
            )

            .subscribe({ next: err => console.log('Delete', err), error: err => console.error(err) });
    }

    deleteCompany() {
        const { companyId } = this.routeParamService.params;
        if (companyId) {
            this.store.dispatch(companyActions.deleteOne({ companyId }));
        }
    }
}
