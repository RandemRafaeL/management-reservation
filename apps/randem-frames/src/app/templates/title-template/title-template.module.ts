import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleTemplateHeaderComponent } from './title-template-header/title-template-header.component';
import { TitleTemplateComponent } from './title-template.component';
import { MatToolbar } from '@angular/material/toolbar';
import { TitleTemplateContentComponent } from './title-template-content/title-template-content.component';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BreadcrumbModule } from '../breadcramp/breadcrumb.module';

@NgModule({
    declarations: [TitleTemplateHeaderComponent, TitleTemplateComponent, TitleTemplateContentComponent],
    imports: [CommonModule, MatToolbar, MatIconButton, MatIcon, BreadcrumbModule],
    exports: [TitleTemplateComponent, TitleTemplateHeaderComponent, TitleTemplateContentComponent],
})
export class TitleTemplateModule {}
