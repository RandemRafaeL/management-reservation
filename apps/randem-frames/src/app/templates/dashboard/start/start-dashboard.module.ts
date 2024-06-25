import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartDashboardComponent } from './start-dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@NgModule({
    declarations: [StartDashboardComponent],
    imports: [CommonModule, MatButtonModule, RouterLink],
})
export class StartDashboardModule {}
