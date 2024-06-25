import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { DialogConfirmService } from '../dialog-confirm/dialog-confirm.service';
import { tap } from 'rxjs';

@Component({
    selector: 'randem-frames-dialog-confirm-wrapper',
    templateUrl: './dialog-confirm-wrapper.component.html',
    styleUrl: './dialog-confirm-wrapper.component.scss',
    providers: [DialogConfirmService],
})
export class ConfirmDialogWrapperComponent {
    @Output() confirmAction = new EventEmitter<void>();

    result: boolean | null = null;
    constructor(
        private dialog: Dialog,
        private dialogService: DialogConfirmService
    ) {}

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        if (this.result === null) {
            event.stopPropagation(); // Zapobiegaj propagacji, aby nie wywołać oryginalnej akcji
            this.confirm();
        }
    }

    confirm(): void {
        this.dialogService
            .openConfirmDialog({
                message: 'Nieodwracalna operacja, spowoduje trwałe zmiany?\n Czy na pewno chcesz kontynuować?',
            })
            .pipe(
                tap(result => {
                    if (result) {
                        if (result) {
                            this.confirmAction.emit();
                        }
                    }
                })
            )
            .subscribe();
    }
}
