import { Component, Input, signal } from '@angular/core';

@Component({
    selector: 'randem-frames-selection-item',
    templateUrl: './selectionItem.component.html',
    styleUrl: './selectionItem.component.scss',
})
export class SelectionItemComponent {
    @Input() set image(imageUrl: string) {
        this.imageUrl_.set(imageUrl);
    }

    @Input() set name(name: string) {
        this.name_.set(name);
    }

    imageUrl_ = signal('');
    name_ = signal('');
}
