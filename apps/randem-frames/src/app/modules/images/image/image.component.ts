import { Component, Input, isDevMode, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'randem-frames-image',
    templateUrl: './image.component.html',
    styleUrl: './image.component.scss',
})
export class ImageComponent {
    @Input() set url(url: unknown | string) {
        //
        if (!isDevMode()) {
            url = url ? `${environment.apiUrl}/${url}` : '';
        } else {
            url = url ? `${url}` : '';
        }

        this.imageUrl.set(url as string);
    }

    @Input() size: 'contain' | 'cover' = 'cover';

    imageUrl = signal<string>('');
}
