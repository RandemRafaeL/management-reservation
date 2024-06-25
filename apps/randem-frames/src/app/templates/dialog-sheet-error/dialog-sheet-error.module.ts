import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogSheetErrorComponent } from './dialog-sheet-error.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [DialogSheetErrorComponent],
    imports: [CommonModule, MatButtonModule],
})
export class DialogSheetErrorModule {}
