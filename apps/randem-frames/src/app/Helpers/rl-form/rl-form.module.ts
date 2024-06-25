import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RlFormComponent } from './rl-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { InputComponent } from './controls/input/input.component';
import { SelectComponent } from './controls/select/select.component';
import { IconsModule, ResponsiveClassDirective } from '@randem-frames/ui-rl';

@NgModule({
    declarations: [RlFormComponent, InputComponent, SelectComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatSelectModule,
        MatMenuModule,
        CdkMenu,
        CdkMenuItem,
        CdkMenuTrigger,
        IconsModule,
        ResponsiveClassDirective,
    ],
    exports: [RlFormComponent],
})
export class RlFormModule {}
