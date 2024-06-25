import { Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { configDialogForm } from '../../../../core/const/dialogForm';
import { OfferCategoryFormComponent } from '../offer-category-form/offer-category-form.component';

@Component({
    selector: 'randem-frames-offer-category-list-header',
    templateUrl: './offer-category-list-header.component.html',
    styleUrl: './offer-category-list-header.component.scss',
})
export class OfferCategoryListHeaderComponent {
    constructor(private dialog: Dialog) {}

    openDialogCreate(id: string | null = null) {
        const employeeDialog = this.dialog.open(OfferCategoryFormComponent, {
            ...configDialogForm,
            data: { id },
        });

        employeeDialog.closed.subscribe(data => {
            console.log(data);
        });
    }
}
