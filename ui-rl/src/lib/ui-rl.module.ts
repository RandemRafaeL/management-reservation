import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RlWindowComponent } from './window/rl-window.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [CommonModule, HttpClientModule],
    declarations: [RlWindowComponent],
    exports: [RlWindowComponent],
})
export class UiRlModule {}
