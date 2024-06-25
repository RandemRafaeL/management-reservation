import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ControlAppearance } from '../../rl-form';

@Component({
    selector: 'randem-frames-select',
    templateUrl: './select.component.html',
    styleUrl: './select.component.scss',
})
export class SelectComponent implements AfterViewInit, OnInit {
    @ViewChild('inputSelect', { read: ElementRef }) inputContainer!: ElementRef;

    @Input() set controlForm(control: AbstractControl) {
        this.control = control as FormControl;
    }
    @Input() set errorControlForm(control: AbstractControl) {
        this.errorControl = control as FormControl;
    }
    @Input() classList: string = '';

    @Input() formGroupProperty?: string;

    @Input() appearance!: ControlAppearance;
    @Input() helpers: boolean = true;

    @Input() pathValue!: string;

    error!: boolean;
    control!: FormControl;
    errorControl!: FormControl;

    selectControl = new FormControl();

    inputElement!: HTMLDivElement;

    getControlDataType() {
        return this.appearance.controlTypeData as unknown as Record<string, string>[];
    }

    getSelectView(index: number) {
        return this.getControlDataType()[index][this.appearance.selectForView as string];
    }

    ngOnInit() {
        this.selectControl.disable();
    }

    ngAfterViewInit() {
        this.inputElement = this.inputContainer.nativeElement.querySelector('.input-disable-container');
        !this.pathValue || this.selectControl.patchValue(this.pathValue);
    }

    updateMainControl(index: number) {
        const data = this.appearance.controlTypeData as unknown as Record<string, string>;
        if (data) {
            this.control.patchValue(data[index][this.appearance.selectForDatabase as any]);
            this.control.markAsDirty();
            this.selectControl.patchValue(data[index][this.appearance.selectForView as any]);
        }
    }
}
