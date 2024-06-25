import { Component, Input } from '@angular/core';
import { EmployeeType } from '../../../../graphql/_generated/types';
import { filter, switchMap } from 'rxjs';
import { EmployeeFormComponent } from '../employe-form/employee-form.component';
import { DialogConfirmService } from '../../../templates/dialog-modal/dialog-confirm/dialog-confirm.service';
import { EmployeeStateService } from '../../../state/employee/employee-state.service';
import { DialogFormService } from '../../../templates/dialog-modal/dialog-form/dialog-form.service';
import { StateValueTypes } from '../../../core/services/server-state/server-state.types';

@Component({
    selector: 'randem-frames-employee-card',
    templateUrl: './employee-card.component.html',
    styleUrl: './employee-card.component.scss',
    providers: [DialogConfirmService, DialogFormService],
})
export class EmployeeCardComponent {
    @Input() employee!: EmployeeType & Record<string, string>;
    @Input() contentView: StateValueTypes['LIST_VIEW'] = 'full';

    constructor(
        private employeeStateService: EmployeeStateService,
        private dialogService: DialogConfirmService,
        private dialogFormService: DialogFormService
    ) {}

    deleteItemList(employeeId: string) {
        this.dialogService
            .openConfirmDialog()
            .pipe(
                filter(accept => !!accept),
                switchMap(() => this.employeeStateService.deleteOne(employeeId))
            )

            .subscribe(() => console.log('Delete Success'));
    }

    updateItem(employeeId: string) {
        this.dialogFormService.openFormDialog(EmployeeFormComponent, { employeeId });
    }
}
