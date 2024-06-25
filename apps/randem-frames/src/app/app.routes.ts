import { Route } from '@angular/router';
import { StartTemplateComponent } from './start-template/start-template.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: StartTemplateComponent,
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./templates/dashboard/dashboard.module') //
                .then(mod => mod.DashboardModule),
    },
    {
        path: 'booking',
        loadChildren: () =>
            import('./templates/landingPage/landing-page.module') //
                .then(mod => mod.LandingPageModule),
    },
    { path: '', redirectTo: '/dashboard/start', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard/start', pathMatch: 'full' },
];
