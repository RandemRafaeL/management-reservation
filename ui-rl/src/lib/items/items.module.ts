import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemLabelComponent } from './item-label/item-label.component';
import { ItemComponent } from './item/item.component';
import { ItemContentComponent } from './item-content/item-content.component';
import { ItemImageComponent } from './item-image/item-image.component';

@NgModule({
    declarations: [ItemLabelComponent, ItemComponent, ItemContentComponent, ItemImageComponent],
    imports: [CommonModule],
    exports: [ItemLabelComponent, ItemComponent, ItemContentComponent, ItemImageComponent],
})
export class ItemsModule {}
