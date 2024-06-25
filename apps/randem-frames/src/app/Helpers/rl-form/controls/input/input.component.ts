import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlAppearance } from '../../rl-form';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'randem-frames-input',
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit {
    @Input() set controlForm(control: AbstractControl) {
        this.control = control as FormControl;
    }
    @Input() set errorControlForm(control: AbstractControl) {
        this.errorControl = control as FormControl;
    }

    @Input() classList = '';

    @Input() formGroupProperty?: string;

    @Input() appearance!: ControlAppearance;
    @Input() helpers = true;

    @Output() clickControl = new EventEmitter();

    error!: boolean;
    control!: FormControl;
    errorControl!: FormControl;

    ngOnInit() {
        if (!this.errorControl) this.errorControl = this.control;
    }
    focusControl() {
        this.error = this.control.invalid;
    }
}
