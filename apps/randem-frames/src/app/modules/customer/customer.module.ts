import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { RouterModule, Routes } from '@angular/router';
import { TitleTemplateModule } from '../../templates/title-template/title-template.module';
import { CardModule, GridCardModule, ItemsModule, RlFormsModule } from '@randem-frames/ui-rl';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';

const routes: Routes = [
    { path: '', component: CustomerComponent, data: { title: 'Klienci' } },
    { path: 'list', component: CustomerListComponent },
    // { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
    declarations: [
        CustomerComponent,
        CustomerComponent,
        CustomerListComponent,
        CustomerFormComponent,
        CustomerCardComponent,
        CustomerHeaderComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TitleTemplateModule,
        CardModule,
        GridCardModule,
        ItemsModule,
        MatIcon,
        MatIconButton,
        RlFormsModule,
        ReactiveFormsModule,
        MatFabButton,
        MatMenu,
        MatTooltip,
        MatMenuTrigger,
        MatMenuItem,
    ],
})
export class CustomerModule {}
