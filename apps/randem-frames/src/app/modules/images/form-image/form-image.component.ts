import { Component, EventEmitter, Input, isDevMode, OnInit, Output } from '@angular/core';
import { ImagesService } from '../images.service';
import { AbstractControl, FormControl } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'randem-frames-form-image',
    templateUrl: './form-image.component.html',
    styleUrl: './form-image.component.scss',
    providers: [ImagesService],
})
export class FormImageComponent implements OnInit {
    @Input() set control(value: FormControl | AbstractControl | null) {
        this._control = value ? <FormControl>value : new FormControl(value);
    }
    @Input() type: 'imageUrl' | 'imageId' = 'imageUrl';
    @Output() uploadImage$ = new EventEmitter();
    //  TODO zwrócić observable i obsłużyć wczytywanie z endpoint i formularzem

    constructor(private imagesService: ImagesService) {}

    private _control!: FormControl;

    readonly placeholder = '/assets/backgrounds/image_placeholder.png';
    readonly placeholder2 = '/assets/backgrounds/placeholder.jpg';

    private _image?: string;
    edit = false;

    get previewImage() {
        let result: string;
        if (isDevMode()) {
            result = this._control.value || this.imagesService.uploadedImage || ' ';
        } else {
            result = this._control.value ? `${environment.apiUrl}/${this._control.value}` : ' ';
        }
        return result;
    }

    get isLoading() {
        return this.imagesService.isLoading;
    }

    ngOnInit() {
        if (this.type === 'imageUrl') {
            this.imagesService.responseUrl$ //
                .subscribe(url => {
                    !url || this._control.patchValue(url);
                });
        }
    }

    onFile(event: Event) {
        this._control.patchValue('');
        this.imagesService.onFileSelected(event);
        this.imagesService.uploadImage(); // TODO przerobić na observable i zwrócić w uploadImage$
    }
}
