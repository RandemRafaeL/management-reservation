import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferComponent } from './offer.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { OfferFormComponent } from './offer-form/offer-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { RlFormModule } from '../../Helpers/rl-form/rl-form.module';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CardModule, GridCardModule, ItemsModule, RlFormsModule } from '@randem-frames/ui-rl';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton, MatFabButton, MatIconButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { ImagesModule } from '../images/images.module';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import { TitleTemplateModule } from '../../templates/title-template/title-template.module';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { OfferCategoryComponent } from './offer-category/offer-category.component';
import { OfferListsComponent } from './offer-lists/offer-lists.component';
import { OfferForCompanyListComponent } from '../offer-for-company/offerForCompany-list/offerForCompany-list.component';
import { OfferCategoryListComponent } from './offer-category/offer-category-list/offer-category-list.component';
import { OfferCategoryDetailComponent } from './offer-category/offer-category-detail/offer-category-detail.component';
import { ResponsiveClassDirective } from '@randem-frames/ui-rl';
import { OfferListHeaderComponent } from './offer-list-header/offer-list-header.component';
import { OfferForCompanyModule } from '../offer-for-company/offerForCompany.module';
import { OfferForCompanyListHeaderComponent } from '../offer-for-company/offerForCompany-list-header/offerForCompany-list-header.component';
import { OfferCategoryFormComponent } from './offer-category/offer-category-form/offer-category-form.component';
import { OfferCategoryListHeaderComponent } from './offer-category/offer-category-list-header/offer-category-list-header.component';
import { OfferForEmployeeListHeaderComponent } from '../offerForEmployee/offerForEmployee-list-header/offerForEmployee-list-header.component';
import { OfferForEmployeeListComponent } from '../offerForEmployee/offerForEmployee-list/offerForEmployee-list.component';
import { OfferForCompanyComponent } from '../offer-for-company/offerForCompany.component';
import { OfferForCompanyDetailComponent } from '../offer-for-company/offerForCompany-detail/offerForCompany-detail.component';
import { DetailTemplateOutletsComponent } from '../../templates/outlets/detail-template-outlets/detail-template-outlets.component';
import { OfferForCompanyDetailHeaderComponent } from '../offer-for-company/offerForCompany-detail-header/offerForCompany-detail-header.component';
import { OfferForCompanyDetailControlComponent } from '../offer-for-company/offerForCompany-detail-control/offerForCompany-detail-control.component';
import { EmployeeListComponent } from '../employee/emloyee-list/employee-list.component';
import { EmployeeListHeaderComponent } from '../employee/employee-list-header/employee-list-header.component';
import { OfferForEmployeeDetailHeaderComponent } from '../offerForEmployee/offerForEmployee-detail-header/offerForEmployee-detail-header.component';

const routes: Routes = [
    {
        path: '',
        component: OfferComponent,
        data: { title: 'Oferta' },
        children: [
            {
                path: 'employee-services',
                children: [
                    {
                        path: '',
                        outlet: 'header',
                        data: { title: 'Usługi pracowników' },
                        component: OfferForEmployeeListHeaderComponent,
                    },
                    {
                        path: 'list',
                        component: OfferForEmployeeListComponent,
                    },
                ],
            },

            {
                path: 'company-services',
                children: [
                    {
                        path: '',
                        outlet: 'header',
                        data: { title: 'Usługi firmy' },
                        component: OfferForCompanyListHeaderComponent,
                    },
                    {
                        path: 'list',
                        component: OfferForCompanyListComponent,
                    },
                ],
            },
            {
                path: 'services',
                children: [
                    {
                        path: '',
                        outlet: 'header',
                        component: OfferListHeaderComponent,
                        data: { title: 'Usługi ogólne' },
                    },
                    {
                        path: 'list',
                        component: OfferListComponent,
                    },
                ],
            },

            {
                path: 'category',
                // component: OfferCategoryComponent,
                data: { title: 'Usługi kategorie' },
                children: [
                    {
                        path: '',
                        outlet: 'header',
                        component: OfferCategoryListHeaderComponent,
                        data: { title: 'Kategorie usług' },
                    },
                    { path: 'list', component: OfferCategoryListComponent, data: { title: 'kategorie ofert' } },
                    {
                        path: 'detail/:id',
                        component: OfferCategoryDetailComponent,
                        data: { title: 'szczegóły kategorii' },
                    },
                    { path: '', redirectTo: 'list', pathMatch: 'prefix' },
                    { path: '**', redirectTo: 'detail', pathMatch: 'prefix' },
                ],
            },

            { path: '', redirectTo: '/dashboard/offer/company-services/list', pathMatch: 'full' },
            // { path: '**', redirectTo: 'list', pathMatch: 'prefix' },
        ],
    },
    {
        path: 'company-services/:offerCompanyId/detail',
        component: OfferForCompanyComponent,
        children: [
            {
                path: '',
                outlet: 'header',
                component: OfferForCompanyDetailHeaderComponent,
                data: { title: 'Usługa Firmy szczegóły' },
            },
            {
                path: '',
                component: DetailTemplateOutletsComponent,
                children: [
                    {
                        path: '',
                        component: OfferForCompanyDetailControlComponent,
                    },
                    {
                        path: '',
                        outlet: 'secondary',
                        component: OfferForCompanyDetailComponent,
                    },
                ],
            },
        ],
    },
    {
        path: 'company-services/:offerCompanyId/employees',
        component: OfferForCompanyComponent,
        data: { key: 'company_detail/employee' },
        children: [
            {
                path: '',
                outlet: 'header',
                component: OfferForEmployeeListHeaderComponent,
                data: { title: 'Usługa Firmy szczegóły' },
            },
            {
                path: '',
                component: DetailTemplateOutletsComponent,
                children: [
                    {
                        path: '',
                        component: OfferForCompanyDetailControlComponent,
                    },
                    {
                        path: '',
                        outlet: 'secondary',
                        component: EmployeeListComponent,
                    },
                ],
            },
        ],
    },

    {
        path: 'employee-services/:offerEmployeeId/detail',
        component: OfferDetailComponent,
        data: { title: 'Usługa ogólna szczegóły' },
    },
    {
        path: 'services/:offerId/detail',
        component: OfferDetailComponent,
        data: { title: 'Usługa ogólna szczegóły' },
    },
    { path: '', redirectTo: 'company-services/list', pathMatch: 'prefix' },
];

@NgModule({
    declarations: [
        OfferComponent,
        OfferListComponent,
        OfferListsComponent,
        OfferFormComponent,
        OfferDetailComponent,
        OfferCategoryComponent,
        OfferCategoryListComponent,
        OfferListHeaderComponent,
        OfferCategoryFormComponent,
        OfferCategoryListHeaderComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        RlFormModule,
        RouterModule.forChild(routes),
        MatInputModule,
        CardModule,
        MatLabel,
        MatIcon,
        MatTooltip,
        MatSlideToggle,
        MatSelect,
        MatOption,
        MatFabButton,
        MatToolbar,
        MatButton,
        MatIconButton,
        MatMenuModule,
        MatMenuTrigger,
        ImagesModule,
        TitleTemplateModule,
        ItemsModule,
        MatTabNavPanel,
        MatTabLink,
        MatTabNav,
        ResponsiveClassDirective,
        OfferForCompanyModule,
        GridCardModule,
        RlFormsModule,
    ],
    exports: [ResponsiveClassDirective],
})
export class OfferModule {}
