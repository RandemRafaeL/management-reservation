import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { FormDialogContainerComponent } from './form-dialog-container/form-dialog-container.component';
import { AutoFormComponent, HasRequiredValidatorPipe } from './auto-form/auto-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ResponsiveClassDirective } from '../responsive-div/responsive-html-element.directive';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { ImageFormControlComponent } from './controls/image-form-control.component';
import { FormDialogActionsComponent } from './form-dialog-actions/form-dialog-actions.component';
import { MatButton } from '@angular/material/button';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormErrorPipe } from './auto-form/form-error.pipe';
import { PushPipe } from '@ngrx/component';

@NgModule({
    declarations: [
        FormDialogContainerComponent,
        AutoFormComponent,
        ImageFormControlComponent,
        HasRequiredValidatorPipe,
        FormDialogActionsComponent,
        FormErrorPipe,
    ],
    imports: [
        CommonModule,
        MatIcon,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInput,
        ResponsiveClassDirective,
        MatOption,
        MatSelect,
        MatButton,
        CdkTextareaAutosize,
        PushPipe,
    ],
    exports: [FormDialogContainerComponent, AutoFormComponent, FormDialogActionsComponent],
})
export class RlFormsModule {}
