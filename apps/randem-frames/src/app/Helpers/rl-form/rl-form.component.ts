import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { ControlAppearance, FORM_MAX_LENGTH, FormControlAppearanceRlForm, FormGroupRlForm } from './rl-form';

@Component({
    selector: 'randem-frames-rl-form',
    templateUrl: './rl-form.component.html',
    styleUrls: ['./rl-form.component.scss'],
})
export class RlFormComponent implements OnInit {
    @Input() formGroup!: FormGroupRlForm<unknown>;
    @Input() formAppearance: FormControlAppearanceRlForm<Record<string, any>> = {};
    @Input() helpers = true;

    formKeys!: string[];

    controlAppearanceSignal: WritableSignal<ExtendFormAppearance[]> = signal([]);

    controlErrors: Record<string, boolean> = {};

    protected readonly log = console.log;
    pathValue: Record<string, string> = {};

    ngOnInit() {
        this.controlAppearanceSignal //
            .update(() =>
                Object.keys(this.formGroup.controls) //
                    .map(key => ({ key: key, maxLength: FORM_MAX_LENGTH, ...this.formAppearance[key] }))
            );

        // PathValue For Select Data
        Object.entries(this.formAppearance)
            .filter(ap => ap[1].controlType === 'select')
            .map(ap => {
                const key: string = ap[0];
                const obj: ControlAppearance = ap[1];

                console.log('pathValue database', obj.selectForDatabase);
                console.log('pathValue view', obj.selectForView);
                console.log('pathValue formGroup', key, this.formGroup.get(key)?.value);
                console.log('pathValue controlTypeData', obj.controlTypeData);

                if (obj.controlTypeData?.length) {
                    const valueForPath = obj.controlTypeData?.find(
                        (el: any) => el[obj.selectForDatabase as string] === this.formGroup.get(key.toString())?.value
                    );
                    console.log('pathValue valueForPath', valueForPath);
                    if (valueForPath) {
                        this.pathValue[key] = (valueForPath as any)[ap[1].selectForView as string];
                        console.log('pathValue', this.pathValue);
                    }
                }
            });
    }

    createSelectControls() {
        Object.entries(this.formAppearance).filter(appearance => appearance);
    }
}

export type ExtendFormAppearance = ControlAppearance & {
    key: string;
};
