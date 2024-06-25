import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'rl-card',
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class CardComponent {
    @Input() visibleContent = true;
}
