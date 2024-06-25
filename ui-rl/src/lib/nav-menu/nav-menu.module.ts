import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveRoutePipe, NavMenuComponent } from './nav-menu.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LetDirective } from '@ngrx/component';
import { StoreModule } from '@ngrx/store';
import { navMenuReducer } from './nav-menu.state';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterLink, RouterLinkActive } from '@angular/router';

@NgModule({
    declarations: [NavMenuComponent, ActiveRoutePipe],
    imports: [
        CommonModule,
        StoreModule.forFeature('navMenu', navMenuReducer),
        MatListModule,
        MatIconModule,
        MatTooltipModule,
        LetDirective,
        MatMenuModule,
        MatSliderModule,
        MatSlideToggleModule,
        RouterLink,
        RouterLinkActive,
    ],
    exports: [NavMenuComponent],
})
export class NavMenuModule {}
