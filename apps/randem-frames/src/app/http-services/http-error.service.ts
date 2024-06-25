// http-error.service.ts
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DialogSheetErrorComponent } from '../templates/dialog-sheet-error/dialog-sheet-error.component';

@Injectable({
    providedIn: 'root',
})
export class HttpErrorService {
    constructor(
        private snackBar: MatSnackBar,
        private bottomSheet: MatBottomSheet
    ) {}

    private errorHandleParser(message: any) {
        console.log('Error message', message);
        return (
            errorHandleData.find(errData => message?.error.localizationKey === errData.key)?.message ||
            message.event.details
        );
    }

    public handleError(error: any) {
        console.log({ ...error });
        return this.snackBar.open(this.errorHandleParser(error.networkError), 'zamknij', {
            duration: 90000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'snack-bar-error',
        });
    }

    public handleGqlError(message: string): void {
        console.log('VALIDATION', message);

        try {
            console.error('VALIDATION', JSON.parse(message));
            // console.log('Custom Error', JSON.parse(error[0].message));

            // const graphMessage = `error: ${error[0]['message']} ,<br/> code: ${error[0].extensions['code']}, status:  ${error[0].extensions['status']}`;
            // console.log('Graph Message Error', graphMessage);

            this.bottomSheet.open(DialogSheetErrorComponent, {
                data: { message: JSON.parse(message) },
            });
        } catch (err) {
            console.log('Validation', err);
        }
    }
}

export const errorHandleData = [
    {
        key: 'PRISMA_P2003',
        message:
            'Nie można usunąć elementu z powodu istniejących zależności. Wejdź w szczegóły, usuń wszystkie elementy i spróbuj ponownie.  ',
    },
];
