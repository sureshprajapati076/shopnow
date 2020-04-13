import { FormControl } from '@angular/forms';

export function PhoneValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value && (isNaN(control.value) || control.value < 1000000000 || control.value > 9999999999)) {
        return { 'invalid': true }
    }
    return null;
}