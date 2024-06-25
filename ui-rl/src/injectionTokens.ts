import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const IMAGES_CONFIG = new InjectionToken<{ apiUrl: string }>('imageConfig');

export interface UploadResponse {
    originalname?: string;
    filename?: string;
    path: string;
}

export interface ImageService {
    uploadSharedImage(file: File): Observable<UploadResponse>;
}
export const IMAGE_SERVICE = new InjectionToken<ImageService>('ImageService');
