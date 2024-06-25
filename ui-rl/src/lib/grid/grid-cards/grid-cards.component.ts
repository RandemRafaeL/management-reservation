import { ChangeDetectorRef, Component, Input, numberAttribute, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'rl-grid-cards',
    templateUrl: './grid-cards.component.html',
    styleUrl: './grid-cards.component.scss',
})
export class GridCardsComponent implements OnChanges {
    @Input() staticWidth?: string | boolean;
    @Input({ transform: numberAttribute }) minWidth = 240;
    @Input() maxWidth = 360;

    constructor(private cdr: ChangeDetectorRef) {}

    isStatic = false;

    width!: number;

    private isMaxWith: boolean | undefined;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['minWidth'] && (!changes['staticWidth'] || !this.staticWidth)) {
            console.warn('minWidth need staticWidth for working');
        }

        if (changes['maxWidth']) {
            this.isMaxWith = true;
            this.isStatic = true;
        }

        if (changes['staticWidth']) {
            if (changes['staticWidth']?.currentValue === 'false' || changes['staticWidth']?.currentValue === false) {
                this.isStatic = false;
                return;
            }
            this.staticWidth = true;
            this.isStatic = true;
        }
    }

    setWidth($event: string) {
        // this.width = +$event;
        //
        // if (!this.staticWidth && this.isMaxWith) {
        //     this.isStatic = this.width / (16 * this.children.length + this.width) >= this.children.length;
        // }
        //TODO pojawia sie migniecie do poprawki lub usunąć
    }
}
