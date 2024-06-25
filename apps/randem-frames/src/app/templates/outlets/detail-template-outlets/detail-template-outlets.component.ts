import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ResponsiveClassDirective } from '@randem-frames/ui-rl';

@Component({
    selector: 'randem-frames-detail-template-outlets',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './detail-template-outlets.component.html',
    styleUrl: './detail-template-outlets.component.scss',
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [
        {
            directive: ResponsiveClassDirective,
        },
    ],
})
export class DetailTemplateOutletsComponent {
    constructor(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        directive: ResponsiveClassDirective
    ) {
        //
    }
}
