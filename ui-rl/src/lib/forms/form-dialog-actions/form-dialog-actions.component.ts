import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroupAutoForm } from '../auto-form/auto-form';

@Component({
    selector: 'rl-form-dialog-actions',
    templateUrl: './form-dialog-actions.component.html',
    styleUrl: './form-dialog-actions.component.scss',
})
export class FormDialogActionsComponent {
    @Input() formGroup!: FormGroupAutoForm<unknown>;
    @Input() type?: 'create' | 'update';
    @Output() clickClose = new EventEmitter();
    @Output() clickUpdate = new EventEmitter();
    @Output() clickCreate = new EventEmitter();

    cleanForm() {
        this.formGroup.reset();
        console.log(this.formGroup);
        // this.employeeStorage = null;
    }

    checkForm() {
        this.formGroup.markAllAsTouched();
        console.log(this.formGroup);
    }
}
