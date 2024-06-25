import { NoopScrollStrategy } from '@angular/cdk/overlay';

export const configDialogForm = Object.freeze({
    backdropClass: 'backdrop',
    panelClass: 'dialog-form',
    hasBackdrop: true,
    disableClose: true,
    autoFocus: false,
    scrollStrategy: new NoopScrollStrategy(),
});
