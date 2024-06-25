import { Component, OnInit } from '@angular/core';
import { ImageHttpService } from '../image-http.service';
import { Observable } from 'rxjs';
import { UploadResponse } from '@randem-frames/ui-rl';

@Component({
    selector: 'randem-frames-start-image',
    templateUrl: './start-image.component.html',
    styleUrl: './start-image.component.scss',
})
export class StartImageComponent {
    selectedFile: File | null = null;
    uploadedImage: string | null = null;
    imageSrcPreview: string | null = null;
    imageSrc$!: Observable<string>;

    constructor(private imageHttp: ImageHttpService) {}

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            this.selectedFile = input.files[0];
        }
    }

    uploadImage() {
        if (this.selectedFile) {
            this.imageHttp.uploadSharedImage(this.selectedFile).subscribe({
                next: (response: UploadResponse) => {
                    console.log('Image uploaded successfully', response);
                    // this.uploadedImage = `/${response?.['path']}`;
                    this.uploadedImage = `${response?.['path']}`;
                },
                error: (error: Error) => {
                    console.error('Error uploading image', error);
                },
            });
        }
    }
}
