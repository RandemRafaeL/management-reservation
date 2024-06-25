import {
    ChangeDetectorRef,
    Component,
    computed,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Pipe,
    PipeTransform,
    signal,
    SimpleChanges,
    ViewEncapsulation,
    WritableSignal,
} from '@angular/core';
import { ControlAppearance, ControlAppearanceAutoForm, FORM_MAX_LENGTH, FormGroupAutoForm } from './auto-form';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Pipe({
    name: 'hasRequiredValidator',
})
export class HasRequiredValidatorPipe implements PipeTransform {
    transform(control: AbstractControl): boolean {
        if (!control || !control.validator) return false;

        const validator = control.validator({} as AbstractControl);
        return !!(validator && validator['required']);
    }
}

@Component({
    selector: 'rl-form-auto',
    templateUrl: './auto-form.component.html',
    styleUrls: ['./auto-form.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AutoFormComponent implements OnInit, OnDestroy, OnChanges {
    @Input() formGroup!: FormGroupAutoForm<unknown>;
    @Input() formAppearance: ControlAppearanceAutoForm<Record<string, string> | any> = {};
    @Input() helpers = true;

    constructor(private cdr: ChangeDetectorRef) {}

    formKeys!: string[];

    controlAppearanceSignal: WritableSignal<ExtendFormAppearance[]> = signal([]);

    // controlAppearance!: ExtendFormAppearance[];

    controlErrors: Record<string, boolean> = {};

    protected readonly log = console.log;

    subscription = new Subscription();

    ngOnInit() {
        this.controlAppearanceSignal // TODO przerobić na klucze zostawić obiekt
            .update(() =>
                Object.keys(this.formGroup.controls) //
                    .map(key => ({ key: key, maxLength: FORM_MAX_LENGTH, ...this.formAppearance[key] }))
            );

        computed(() => console.log('computed', this.controlAppearanceSignal()));
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('autoform Changes', changes);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}

type ExtendFormAppearance = ControlAppearance & {
    key: string;
};
