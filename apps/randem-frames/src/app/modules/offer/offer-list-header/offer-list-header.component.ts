import { Component } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { OfferFormComponent } from '../offer-form/offer-form.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
    selector: 'randem-frames-offer-list-header',
    templateUrl: './offer-list-header.component.html',
    styleUrl: './offer-list-header.component.scss',
})
export class OfferListHeaderComponent {
    constructor(private dialog: Dialog) {}

    openDialogCreate(id: string | null = null) {
        const employeeDialog = this.dialog.open(OfferFormComponent, {
            minWidth: 240,
            backdropClass: 'backdrop',
            hasBackdrop: true,
            disableClose: true,
            autoFocus: false,
            scrollStrategy: new NoopScrollStrategy(),
            //
            data: { id },
        });

        employeeDialog.closed.subscribe(data => {
            console.log(data);
        });
    }
}
