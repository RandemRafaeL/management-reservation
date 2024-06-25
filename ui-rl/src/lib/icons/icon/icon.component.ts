import { Component, Input } from '@angular/core';
import { iconCollection } from './icon-collection';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'rl-icon',
    template: `<div class="w-6 h-6" [innerHTML]="safeIconHtml"></div>`,
})
export class IconComponent {
    constructor(private sanitizer: DomSanitizer) {}
    @Input() set iconName(name: RlIconType) {
        this.updateHtmlIconToSafe(name);
    }

    safeIconHtml!: SafeHtml;

    icons = iconCollection;
    protected readonly iconCollection = iconCollection;

    private updateHtmlIconToSafe(name: RlIconType) {
        this.safeIconHtml = this.sanitizer.bypassSecurityTrustHtml(iconCollection[name]);
    }
}

export type RlIconType = keyof typeof iconCollection;
