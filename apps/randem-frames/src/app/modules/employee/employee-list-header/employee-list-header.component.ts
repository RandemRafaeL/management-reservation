import { Component } from '@angular/core';
import { EmployeeFormComponent } from '../employe-form/employee-form.component';
import { DialogFormService } from '../../../templates/dialog-modal/dialog-form/dialog-form.service';

@Component({
    selector: 'randem-frames-employee-list-header',
    templateUrl: './employee-list-header.component.html',
    styleUrl: './employee-list-header.component.scss',
    providers: [DialogFormService],
})
export class EmployeeListHeaderComponent {
    constructor(private dialogFormService: DialogFormService) {}

    openDialogCreate(employeeId: string | null = null) {
        return this.dialogFormService.openFormDialog(EmployeeFormComponent, employeeId);
    }
}
