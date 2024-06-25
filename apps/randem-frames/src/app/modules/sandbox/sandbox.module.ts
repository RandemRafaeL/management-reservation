import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SandboxRoutingModule } from './sandbox-routing.module';
import { SandboxTemplateComponent } from './sandbox-template/sandbox-template.component';
import { TitleTemplateModule } from '../../templates/title-template/title-template.module';
import { CardModule, GridCardModule, ItemsModule, ResponsiveClassDirective } from '@randem-frames/ui-rl';
import { ImagesModule } from '../images/images.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterModule, Routes } from '@angular/router';
import { OfferForEmployeeComponent } from '../offerForEmployee/offerForEmployee.component';
import { offerForEmployeeListResolver } from '../offerForEmployee/offerForEmployee-list.resolver';
import { OfferForEmployeeModule } from '../offerForEmployee/offerForEmployee.module';

const routes: Routes = [
    { path: '', component: SandboxTemplateComponent },
    {
        path: 'employee',
        component: OfferForEmployeeComponent,
        resolve: { offerForEmployeeListResolver },
        data: { title: 'Oferta indywidualna' },
    },
];

@NgModule({
    declarations: [SandboxTemplateComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        SandboxRoutingModule,
        TitleTemplateModule,
        CardModule,
        ItemsModule,
        ImagesModule,
        MatIconModule,
        MatButtonToggleModule,
        ResponsiveClassDirective,
        GridCardModule,
        OfferForEmployeeModule,
    ],
})
export class SandboxModule {}
