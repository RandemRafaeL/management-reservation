import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticComponent } from './analytic.component';

const routes: Routes = [{ path: '', component: AnalyticComponent, data: { title: 'Analityka' } }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AnalyticRoutingModule {}
