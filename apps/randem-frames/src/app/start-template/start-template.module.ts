import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartTemplateRoutingModule } from './start-template-routing.module';
import { StartTemplateComponent } from './start-template.component';
import { UiRlModule } from '@randem-frames/ui-rl';
import { CompanyModule } from '../modules/company/company.module';
import { LoginComponent } from '../core/auth/login/login.component';
import { ImagesModule } from '../modules/images/images.module';
import { MatButtonModule } from '@angular/material/button';
import { DialogModalModule } from '../templates/dialog-modal/dialog-modal.module';
import { ResponsiveClassDirective } from '@randem-frames/ui-rl';

@NgModule({
    declarations: [StartTemplateComponent],
    imports: [
        CommonModule,
        StartTemplateRoutingModule,
        UiRlModule,
        CompanyModule,
        LoginComponent,
        ImagesModule,
        MatButtonModule,
        DialogModalModule,
        ResponsiveClassDirective,
    ],
    exports: [StartTemplateComponent],
})
export class StartTemplateModule {}
