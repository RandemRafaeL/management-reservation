import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ImagesModule } from '../../modules/images/images.module';
import { SelectionItemComponent } from './selectionItem/selectionItem.component';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

const routes: Routes = [{ path: '', component: LandingPageComponent }];

@NgModule({
    declarations: [LandingPageComponent, SelectionItemComponent],
    imports: [CommonModule, RouterModule.forChild(routes), ImagesModule, MatIconButton, MatIcon],
})
export class LandingPageModule {}
