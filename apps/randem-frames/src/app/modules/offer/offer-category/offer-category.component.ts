import { Component, signal } from '@angular/core';

@Component({
    selector: 'randem-frames-offer-category',
    templateUrl: './offer-category.component.html',
    styleUrl: './offer-category.component.scss',
})
export class OfferCategoryComponent {
    width = signal('');
}
