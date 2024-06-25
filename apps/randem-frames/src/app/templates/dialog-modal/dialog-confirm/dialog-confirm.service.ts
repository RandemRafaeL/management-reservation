import { Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { DialogConfirmComponent } from './dialog-confirm.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Injectable()
export class DialogConfirmService {
    constructor(private dialog: Dialog) {}

    openConfirmDialog(data?: DialogConfirmComponent['dialogData']) {
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
            minWidth: '240px',
            backdropClass: 'backdrop',
            hasBackdrop: true,
            disableClose: true,
            autoFocus: false,
            scrollStrategy: new NoopScrollStrategy(),
            data: {
                ...data,
            },
        });

        return dialogRef.closed;
    }
}
