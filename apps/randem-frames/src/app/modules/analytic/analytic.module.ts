import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticRoutingModule } from './analytic-routing.module';
import { AnalyticComponent } from './analytic.component';
import { TitleTemplateModule } from '../../templates/title-template/title-template.module';

@NgModule({
    declarations: [AnalyticComponent],
    imports: [CommonModule, AnalyticRoutingModule, TitleTemplateModule],
})
export class AnalyticModule {}
