import {
    Component,
    forwardRef,
    Inject,
    Injector,
    isDevMode,
    OnDestroy,
    OnInit,
    signal,
    WritableSignal,
} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator,
} from '@angular/forms';
import { ImageFormControlService } from './image-form-control.service';
import { filter, Subscription } from 'rxjs';
import { IMAGE_SERVICE, IMAGES_CONFIG, ImageService } from '../../../index';

type ControlValue = string | null;

@Component({
    selector: 'rl-image-form-control',
    templateUrl: './image-form-control.component.html',
    styleUrl: './image-form-control.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageFormControlComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => ImageFormControlComponent),
            multi: true,
        },
        ImageFormControlService,
    ],
})
export class ImageFormControlComponent implements ControlValueAccessor, OnInit, Validator, OnDestroy {
    constructor(
        private imageFormControlService: ImageFormControlService,
        private injector: Injector,
        @Inject(IMAGES_CONFIG) private config: { apiUrl: string },
        @Inject(IMAGE_SERVICE) private imageService: ImageService
    ) {
        this.apiUrl = this.config.apiUrl;
    }

    value: ControlValue = null; // Przechowuje aktualną wartość kontrolki

    imageSignal: WritableSignal<string> = signal('');

    subscription = new Subscription();

    private readonly apiUrl!: string;

    isSaving: boolean | null = null;

    ngOnInit() {
        this.subscription.add(
            this.imageFormControlService.onLoadImage$.pipe(filter(image => !!image)).subscribe(image => {
                const tempValue = this.value;
                this.imageSignal.set(image);
                this.onValueChange(image);
                // logika przesłania danych na serwer
                const file = this.imageFormControlService.selectedFile;
                if (file) {
                    this.setIsSaving(true);
                    this.imageService.uploadSharedImage(file).subscribe({
                        next: res => {
                            this.setImage(res.path);
                            this.onValueChange(res.path);
                            this.setIsSaving(false);
                        },
                        error: error => {
                            this.onValueChange(tempValue);
                            this.setImage(tempValue as string);
                            this.setIsSaving(false);
                            console.error('Upload file Error', error);
                        },
                    });
                }
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private onChange: (value: ControlValue) => void = value => {
        console.debug('onChange called with value', value);
    };

    private onTouch: () => void = () => {
        console.debug('onTouch called');
    };

    private validatorOnChange: () => void = () => {
        console.debug('validatorOnChange called');
    };

    private setImage(image: string) {
        if (!image) {
            console.warn('no image!, image value is:', image);
            return;
        }
        if (isDevMode()) {
            this.imageSignal.set(`${image}`);
        } else {
            this.imageSignal.set(`${this.apiUrl}/${image}`);
        }
    }

    // Metoda wywoływana, kiedy wartość kontrolki jest zmieniana w modelu (np. przez formularz)
    writeValue(value: ControlValue): void {
        console.debug('writeValue called', value);
        this.value = value;
        if (value) {
            this.setImage(value);
        } else {
            this.setImage('');
        }
    }

    registerOnValidatorChange?(fn: () => void): void {
        this.validatorOnChange = fn;
    }

    setIsSaving(saving: boolean) {
        this.isSaving = saving;
        this.validatorOnChange();
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (this.isSaving) {
            // Zwraca błąd walidacji, gdy isSaving jest true
            return { isSaving: true };
        }
        // Nie zwraca błędów, jeśli nie ma problemu
        return null;
    }

    // Rejestruje funkcję, która powinna być wywołana, kiedy wartość w komponencie zmienia się
    registerOnChange(fn: (value: ControlValue) => void): void {
        console.debug('registerOnChange called');
        this.onChange = fn;
    }

    // Rejestruje funkcję, która powinna być wywołana, kiedy komponent jest "dotknięty" (touched)
    registerOnTouched(fn: () => void): void {
        console.debug('registerOnTouched called');
        this.onTouch = fn;
    }

    onValueChange(value: ControlValue): void {
        console.debug('onValueChange called');
        this.value = value;
        this.onChange(value); // Informuje formularz o zmianie
    }

    updateValue(value: ControlValue) {
        console.debug('updateValue called');
        this.value = value;
        this.onChange(value);
        this.onTouch();
    }

    onFile(event: Event) {
        this.imageFormControlService.onFileSelected(event);
    }
}
