// image.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ImageService, UploadResponse } from '@randem-frames/ui-rl';

@Injectable({
    providedIn: 'root',
})
export class ImageHttpService implements ImageService {
    private apiUrl = '/api/images'; // URL do API

    constructor(private http: HttpClient) {
        if (environment.production) {
            this.apiUrl = environment.apiUrl + '/api/images';
        }
    }

    uploadSharedImage(file: File): Observable<UploadResponse> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<UploadResponse>(`${this.apiUrl}/upload`, formData);
    }
}
