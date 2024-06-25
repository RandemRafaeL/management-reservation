import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { StartImageComponent } from './start-image/start-image.component';
import { FormImageComponent } from './form-image/form-image.component';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ImageComponent } from './image/image.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [StartImageComponent, FormImageComponent, ImageComponent],
    imports: [
        CommonModule,
        NgOptimizedImage,
        MatRippleModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
    ],
    exports: [StartImageComponent, FormImageComponent, ImageComponent],
})
export class ImagesModule {}
