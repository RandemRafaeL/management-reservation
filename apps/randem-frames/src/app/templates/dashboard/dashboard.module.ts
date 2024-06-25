import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialComponent } from './material/material.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { LetDirective } from '@ngrx/component';
import { MatBadgeModule } from '@angular/material/badge';
import { NavMenuModule } from '@randem-frames/ui-rl';
import { StoreModule } from '@ngrx/store';
import { navMenuReducer } from '@randem-frames/ui-rl';
import { StartDashboardModule } from './start/start-dashboard.module';
import { StartDashboardComponent } from './start/start-dashboard.component';
import { CompanyModule } from '../../modules/company/company.module';
import { companyReducer, FEATURE_COMPANY } from '../../state/company/company.store';
import { EffectsModule } from '@ngrx/effects';
import { CompanyEffect } from '../../state/company/company.effect';
import { MatTooltip } from '@angular/material/tooltip';
import { NavMenuEffect } from '../../state/nav-menu/nav-menu.effect';
import { RoleTextPipe } from '../../Helpers/pipes/roleText.pipe';
import { CdkTrapFocus } from '@angular/cdk/a11y';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: 'start', component: StartDashboardComponent },
            {
                path: 'company',
                loadChildren: () => import('./../../modules/company/company.module').then(mod => mod.CompanyModule),
            },
            {
                path: 'user',
                loadChildren: () => import('./../../modules/user/user.module').then(mod => mod.UserModule),
            },
            {
                path: 'employee',
                loadChildren: () => import('./../../modules/employee/employee.module').then(mod => mod.EmployeeModule),
            },
            {
                path: 'offer',
                loadChildren: () => import('./../../modules/offer/offer.module').then(mod => mod.OfferModule),
            },
            {
                path: 'booking',
                loadChildren: () => import('./../../modules/booking/booking.module').then(mod => mod.BookingModule),
            },
            {
                path: 'customer',
                loadChildren: () => import('./../../modules/customer/customer.module').then(mod => mod.CustomerModule),
            },
            {
                path: 'analytic',
                loadChildren: () => import('./../../modules/analytic/analytic.module').then(mod => mod.AnalyticModule),
            },
            {
                path: 'sandbox',
                loadChildren: () => import('./../../modules/sandbox/sandbox.module').then(mod => mod.SandboxModule),
            },
            { path: '', redirectTo: '/dashboard/start', pathMatch: 'full' },
            { path: '**', redirectTo: '/dashboard/start', pathMatch: 'full' },
        ],
    },

    { path: '', redirectTo: '/dashboard/start', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard/start', pathMatch: 'full' },
];

@NgModule({
    declarations: [DashboardComponent, MaterialComponent],
    imports: [
        CommonModule,
        StoreModule.forFeature('navMenu', navMenuReducer),
        StoreModule.forFeature(FEATURE_COMPANY, companyReducer),
        EffectsModule.forFeature([CompanyEffect, NavMenuEffect]),

        RouterModule.forChild(routes),
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatTreeModule,
        MatListModule,
        LetDirective,
        MatBadgeModule,
        NavMenuModule,
        StartDashboardModule,
        CompanyModule,
        MatTooltip,
        RoleTextPipe,
        CdkTrapFocus,
    ],
})
export class DashboardModule {}
