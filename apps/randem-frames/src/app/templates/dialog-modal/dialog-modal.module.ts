import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogWrapperComponent } from './dialog-confirm-wrapper/dialog-confirm-wrapper.component';

@NgModule({
    declarations: [DialogConfirmComponent, ConfirmDialogWrapperComponent],
    exports: [DialogConfirmComponent, ConfirmDialogWrapperComponent],
    imports: [CommonModule, MatButtonModule, MatIconModule],
})
export class DialogModalModule {}
