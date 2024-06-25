import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ImageFormControlService {
    constructor() {}

    selectedFile: File | null = null;
    onLoadImage$ = new Subject<string>();

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            this.selectedFile = input.files[0];

            // Podgląd obrazu przed przesłaniem
            const reader = new FileReader();
            reader.onload = () => {
                this.onLoadImage$.next(reader.result as string);
                console.debug('onLoad image');
            };
            reader.readAsDataURL(this.selectedFile);
        }
    }
}
