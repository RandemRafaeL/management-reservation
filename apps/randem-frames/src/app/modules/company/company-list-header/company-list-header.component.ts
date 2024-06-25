import { Component } from '@angular/core';
import { CompanyItemState } from '../../../state/company/company.store';
import { CompanyFormComponent } from '../company-form/company-form.component';
import { DialogFormService } from '../../../templates/dialog-modal/dialog-form/dialog-form.service';

@Component({
    selector: 'randem-frames-company-list-header',
    templateUrl: './company-list-header.component.html',
    styleUrl: './company-list-header.component.scss',
    providers: [DialogFormService],
})
export class CompanyListHeaderComponent {
    constructor(private dialogFromService: DialogFormService) {}

    dialogOpen(value: CompanyItemState | null = null) {
        return this.dialogFromService.openFormDialog(CompanyFormComponent, value);
    }
}
