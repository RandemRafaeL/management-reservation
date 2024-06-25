import { Component } from '@angular/core';
import { EmployeeFormComponent } from '../employe-form/employee-form.component';
import { DialogFormService } from '../../../templates/dialog-modal/dialog-form/dialog-form.service';
import { RouteParamsService } from '../../../core/services/router/route-params.service';
import { filter, switchMap } from 'rxjs';
import { DialogConfirmService } from '../../../templates/dialog-modal/dialog-confirm/dialog-confirm.service';
import { EmployeeStateService } from '../../../state/employee/employee-state.service';
import { Location } from '@angular/common';

@Component({
    selector: 'randem-frames-employee-list-header',
    templateUrl: './employee-detail-header.component.html',
    styleUrl: './employee-detail-header.component.scss',
    providers: [DialogFormService, DialogConfirmService],
})
export class EmployeeDetailHeaderComponent {
    constructor(
        private dialogFormService: DialogFormService,
        private routeParamsService: RouteParamsService,
        private dialogConfirmService: DialogConfirmService,
        private employeeStateService: EmployeeStateService,
        private location: Location
    ) {}

    openDialogCreate() {
        const employeeId = null;
        return this.dialogFormService.openFormDialog(EmployeeFormComponent, employeeId);
    }

    openDialogUpdate() {
        const { employeeId } = this.routeParamsService.params;
        this.dialogFormService.openFormDialog(EmployeeFormComponent, { employeeId });
    }

    deleteItem() {
        const { employeeId } = this.routeParamsService.params;
        this.dialogConfirmService
            .openConfirmDialog()
            .pipe(
                filter(accept => !!accept),
                switchMap(() => this.employeeStateService.deleteOne(employeeId))
            )

            .subscribe(() => {
                console.log('Delete Success');
                this.location.back();
            });
    }
}
