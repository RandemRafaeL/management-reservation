import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
    selector: 'randem-frames-dialog-sheet-error',
    templateUrl: './dialog-sheet-error.component.html',
    styleUrl: './dialog-sheet-error.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class DialogSheetErrorComponent implements OnInit {
    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: { message: Record<string, object> },
        private bottomSheetRef: MatBottomSheetRef<DialogSheetErrorComponent>
    ) {}

    message!: Record<string, string>[];
    ngOnInit() {
        console.log('bottom sheet', this.data.message);

        const validationObject = this.data.message['validationErrors'];
        if (validationObject) {
            console.log(validationObject);
            this.message = Object.entries(validationObject) //
                .map(([key, value]) => ({
                    key,
                    value: value as string,
                }));
        }
    }

    dismiss() {
        this.bottomSheetRef.dismiss();
    }
}
