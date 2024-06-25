import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export interface ErrorMessages {
    required: () => string;
    minlength: (error: { requiredLength: number; actualLength: number }) => string;
    maxlength: (error: { requiredLength: number; actualLength: number }) => string;
    email: () => string;
    isEmail: () => string;
    [key: string]: ((error?: any) => string) | undefined;
}

export const formErrors: ErrorMessages = {
    required: () => 'To pole jest wymagane.',
    minlength: (error: { requiredLength: number; actualLength: number }) =>
        `Minimalna długość to ${error.requiredLength} znaków, wprowadzono ${error.actualLength}.`,
    maxlength: (error: { requiredLength: number; actualLength: number }) =>
        `Maksymalna długość to ${error.requiredLength} znaków, wprowadzono ${error.actualLength}.`,
    email: () => 'Wprowadź poprawny adres email.', // zakładając, że błąd z walidatora to { email: true }
    isEmail: () => 'Wprowadź poprawny adres email.', // zakładając, że błąd z walidatora to { email: true }
};

@Pipe({
    name: 'formError',
    // pure: false,
})
export class FormErrorPipe implements PipeTransform {
    transform(value?: ValidationErrors | null): string | null {
        if (!value) return null;

        const key = Object.keys(value)[0];
        if (!key) return null;

        const errorMessageFunc = formErrors[key];

        if (errorMessageFunc) {
            return errorMessageFunc(value[key]);
        }
        console.log('Nie znaleziono funkcji dla żadnego klucza, zwracany null');
        return null;
    }
}
