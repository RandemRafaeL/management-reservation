import { Component, Inject, OnInit, Optional } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

export type DialogConfirmType = 'confirmed' | 'danger';

export type DialogConfirmContent = {
    title?: string;
    message?: string;
};

const dialogConfigs: { [key in DialogConfirmType]: DialogConfirmContent } = {
    confirmed: {
        title: 'Komunikat',
        message: 'Operacja wymaga potwierdzenia.',
    },
    danger: {
        title: 'Komunikat Ostrzegawczy',
        message: ' Operacja jest nieodwracalna. <br/> Czy na pewno chcesz kontynuować?',
    },
};

@Component({
    selector: 'randem-frames-dialog-confirm',
    templateUrl: './dialog-confirm.component.html',
    styleUrl: './dialog-confirm.component.scss',
})
export class DialogConfirmComponent implements OnInit {
    constructor(
        @Optional() public dialogRef: DialogRef<boolean, DialogConfirmComponent>,
        @Inject(DIALOG_DATA)
        public dialogData: { message?: string | null; type?: DialogConfirmType; title?: string | null }
    ) {}

    private dialogConfig!: DialogConfirmContent;

    type!: DialogConfirmType;
    title?: string;
    message?: string | null = null;

    ngOnInit() {
        console.log('DIALOG DATA', this.dialogData);
        this.type = this.dialogData.type ? this.dialogData.type : 'danger';
        this.dialogConfig = dialogConfigs[this.type];

        this.title = this.dialogData.title ? this.dialogData.title : this.dialogConfig.title;
        this.message = this.dialogData?.message ? `${this.dialogData.message}` : this.dialogConfig.message;
    }

    accept() {
        this.dialogRef.close(true);
    }

    close() {
        this.dialogRef.close(false);
        console.log(this.dialogRef);
    }
}
