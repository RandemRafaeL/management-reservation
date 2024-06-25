import { Component, HostBinding, Input, signal, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'rl-form-dialog-container',
    templateUrl: './form-dialog-container.component.html',
    styleUrl: './form-dialog-container.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class FormDialogContainerComponent {
    @HostBinding('class') class = 'custom-scrollbar';

    @Input() set maxWidth(val: string) {
        this.maxWithSignal.set(val);
    }
    @Input() set maxColumn(num: number | string) {
        if (+num > 4) num = 4;
        if (+num < 1) num = 1;
        const val = `${+num * 400}px`;
        this.maxWithSignal.set(val);
    }

    maxWithSignal = signal('1600px');
}
