import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SandboxTemplateComponent } from './sandbox-template/sandbox-template.component';

const routes: Routes = [
    { path: '', component: SandboxTemplateComponent, data: { title: 'Sandbox' } },
    { path: '**', redirectTo: 'sandbox', pathMatch: 'prefix' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SandboxRoutingModule {}
