import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridCardContentComponent } from './grid-card-content.component';
import { ResponsiveClassDirective } from '../responsive-div/responsive-html-element.directive';
import { GridCardsComponent } from './grid-cards/grid-cards.component';

@NgModule({
    declarations: [GridCardContentComponent, GridCardsComponent],
    imports: [CommonModule, ResponsiveClassDirective],
    exports: [GridCardContentComponent, GridCardsComponent],
})
export class GridCardModule {}
