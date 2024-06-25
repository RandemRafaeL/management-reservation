import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { RlFormModule } from '../../Helpers/rl-form/rl-form.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { CompanyFormComponent } from './company-form/company-form.component';
import { ImagesModule } from '../images/images.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CardModule, GridCardModule, ItemsModule, ResponsiveClassDirective, RlFormsModule } from '@randem-frames/ui-rl';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { TitleTemplateModule } from '../../templates/title-template/title-template.module';
import { LetDirective } from '@ngrx/component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyListComponent } from './company-list/company-list.component';
import { FormCompleteComponent } from '../../templates/forms-auto-select/form-complete/form-complete.component';
import { CompanyCardComponent } from './company-card/company-card.component';
import { DetailTemplateOutletsComponent } from '../../templates/outlets/detail-template-outlets/detail-template-outlets.component';
import { EmployeeListComponent } from '../employee/emloyee-list/employee-list.component';
import { CompanyListHeaderComponent } from './company-list-header/company-list-header.component';
import { CompanyDetailHeaderComponent } from './company-detail-header/company-detail-header.component';
import { MatListItem, MatListOption, MatSelectionList } from '@angular/material/list';
import { OfferForCompanyListComponent } from '../offer-for-company/offerForCompany-list/offerForCompany-list.component';
import { CompanyDetailControlComponent } from './company-detail-control/company-detail-control.component';
import { MatSelect } from '@angular/material/select';
import { EmployeeListHeaderComponent } from '../employee/employee-list-header/employee-list-header.component';
import { OfferForCompanyListHeaderComponent } from '../offer-for-company/offerForCompany-list-header/offerForCompany-list-header.component';

const routes: Routes = [
    {
        path: 'list',
        component: CompanyComponent,
        children: [
            {
                path: '',
                outlet: 'header',
                data: { title: 'Lista Firm' },
                component: CompanyListHeaderComponent,
            },
            {
                path: '',
                component: CompanyListComponent,
            },
        ],
    },

    {
        path: ':companyId/detail',
        component: CompanyComponent,
        children: [
            {
                path: '',
                outlet: 'header',
                component: CompanyDetailHeaderComponent,
                data: { title: 'Firma szczegóły' },
            },
            {
                path: '',
                component: DetailTemplateOutletsComponent,
                children: [
                    {
                        path: '',
                        component: CompanyDetailControlComponent,
                    },
                    {
                        path: '',
                        outlet: 'secondary',
                        component: CompanyDetailComponent,
                    },
                ],
            },
        ],
    },
    {
        path: ':companyId/employees',
        component: CompanyComponent,
        children: [
            {
                path: '',
                outlet: 'header',
                component: EmployeeListHeaderComponent,
                data: { title: 'Firma szczegóły - pracownicy' },
            },
            {
                path: '',
                component: DetailTemplateOutletsComponent,
                children: [
                    {
                        path: '',
                        component: CompanyDetailControlComponent,
                    },
                    {
                        path: '',
                        outlet: 'secondary',
                        component: EmployeeListComponent,
                        data: { key: 'company_detail/employee' },
                    },
                ],
            },
        ],
    },
    {
        path: ':companyId/services',
        component: CompanyComponent,
        children: [
            {
                path: '',
                outlet: 'header',
                component: OfferForCompanyListHeaderComponent,
                data: { title: 'Firma szczegóły - usługi' },
            },
            {
                path: '',
                component: DetailTemplateOutletsComponent,
                children: [
                    {
                        path: '',
                        component: CompanyDetailControlComponent,
                        data: { title: 'Firma szczegóły' },
                    },
                    {
                        outlet: 'secondary',
                        path: '',
                        component: OfferForCompanyListComponent,
                    },
                ],
            },
        ],
    },

    { path: '', redirectTo: '/dashboard/company/list', pathMatch: 'full' },

    // { path: '**', redirectTo: '/dashboard/company/list', pathMatch: 'full' },
];

@NgModule({
    declarations: [
        CompanyComponent,
        CompanyFormComponent,
        CompanyDetailComponent,
        CompanyListComponent,
        CompanyCardComponent,
        CompanyListHeaderComponent,
        CompanyDetailHeaderComponent,
        CompanyDetailControlComponent,
    ],
    exports: [CompanyComponent, CompanyFormComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        RlFormModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatRippleModule,
        ImagesModule,
        MatDividerModule,
        MatTooltipModule,
        MatToolbarModule,
        CardModule,
        TitleTemplateModule,
        MatOptionModule,
        LetDirective,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        ItemsModule,
        FormCompleteComponent,
        ResponsiveClassDirective,
        GridCardModule,
        RlFormsModule,
        MatSelectionList,
        MatListOption,
        MatListItem,
        MatSelect,
    ],
})
export class CompanyModule {}
