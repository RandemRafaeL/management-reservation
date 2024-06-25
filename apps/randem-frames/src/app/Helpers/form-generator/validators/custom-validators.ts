import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isEmail } from 'class-validator';

export function _isEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null;
        }

        return !isEmail(value, { allow_display_name: false }) ? { isEmail: false } : null;
    };
}
