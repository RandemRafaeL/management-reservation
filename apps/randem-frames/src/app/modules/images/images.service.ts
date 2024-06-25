import { Injectable } from '@angular/core';
import { ImageHttpService } from './image-http.service';
import { BehaviorSubject } from 'rxjs';
import { UploadResponse } from '@randem-frames/ui-rl';

@Injectable()
export class ImagesService {
    constructor(private imageHttp: ImageHttpService) {}

    private selectedFile: File | null = null;
    uploadedImage: string | null = null;
    isLoading = false;

    private _responseUrl$ = new BehaviorSubject<string>('');

    get responseUrl() {
        return this._responseUrl$.value;
    }

    get responseUrl$() {
        return this._responseUrl$.asObservable();
    }

    private imageSrcPreview$ = new BehaviorSubject<string>('');

    get imageSrcPreview(): string {
        return this.imageSrcPreview$.value;
    }

    set imageSrcPreview(value: string) {
        this.imageSrcPreview$.next(value);
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            this.selectedFile = input.files[0];

            // Podgląd obrazu przed przesłaniem
            const reader = new FileReader();
            reader.onload = () => (this.imageSrcPreview = reader.result as string);
            reader.readAsDataURL(this.selectedFile);
        }
    }

    uploadImage() {
        if (this.selectedFile) {
            this.imageHttp.uploadSharedImage(this.selectedFile).subscribe({
                next: (response: UploadResponse) => {
                    console.log('Image uploaded successfully', response);
                    // this.uploadedImage = `/${response?.['path']}`;
                    this.uploadedImage = `${response?.['path']}`;
                    this._responseUrl$.next(this.uploadedImage);
                },
                error: (error: Error) => {
                    console.error('Error uploading image', error);
                },
            });
        }
    }
}
