import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardContentComponent } from './card-content/card-content.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { CardHeaderImageComponent } from './card-header/card-header-image/card-header-image.component';
import { CardHeaderTitleComponent } from './card-header/card-header-title/card-header-title.component';
import { CardHeaderActionComponent } from './card-header/card-header-action/card-header-action.component';
import { CardContentImageComponent } from './card-content/card-content-image/card-content-image.component';

@NgModule({
    declarations: [
        CardComponent,
        CardHeaderComponent,
        CardContentComponent,
        CardFooterComponent,
        CardHeaderImageComponent,
        CardHeaderTitleComponent,
        CardHeaderActionComponent,
        CardContentImageComponent,
    ],
    imports: [CommonModule],
    exports: [
        CardComponent,
        CardHeaderComponent,
        CardContentComponent,
        CardFooterComponent,
        CardHeaderImageComponent,
        CardHeaderTitleComponent,
        CardHeaderActionComponent,
        CardContentImageComponent,
    ],
})
export class CardModule {}
